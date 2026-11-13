/**
 * Futurely chatbot quality eval (golden set).
 *
 *   node scripts/chat-quality-eval.js            (or: npm run eval-chat)
 *   node scripts/chat-quality-eval.js --verbose  (print the failing answers)
 *   CHECK_BASE_URL=http://localhost:3000 node scripts/chat-quality-eval.js
 *
 * Scores every RAG answer against the response contract shipped in
 * app/api/chat/route.ts:
 *   - conciseness  (word budget per question type)
 *   - grounding    (must mention the expected entity/fact)
 *   - navigation   (1+ portal link for data questions)
 *   - formatting   (Direct answer opener, no code fences, no "#" overflow, no filler)
 *
 * Exit code 1 whenever any case fails, so it can gate CI / pre-release checks.
 */
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const BASE = process.env.CHECK_BASE_URL || 'http://localhost:3000';
const VERBOSE = process.argv.includes('--verbose');

function readEnvLocal() {
  const file = path.join(ROOT, '.env.local');
  const out = {};
  if (!fs.existsSync(file)) return out;
  for (const rawLine of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    const value = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (value) out[key] = value;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Golden set — one entry per question type the assistant must handle well.
// ---------------------------------------------------------------------------
const GOLDEN_CASES = [
  {
    tag: 'college-cutoff',
    query: 'BIT Sindri D2D cutoff',
    maxWords: 200,
    minLinks: 1,
    mustMatch: [/bit sindri/i, /(cutoff|closing rank|cut[\s-]?off|rank)/i]
  },
  {
    tag: 'pyq-link',
    query: 'D2D 2025 question paper PDF download',
    maxWords: 190,
    minLinks: 1,
    mustMatch: [/(pdf|paper)/i]
  },
  {
    tag: 'exam-fee',
    query: 'PMECE paramedical application fee',
    maxWords: 190,
    minLinks: 1,
    mustMatch: [/(paramedical|pmece)/i, /fee/i]
  },
  {
    tag: 'hinglish',
    query: 'GNM age limit kya hai?',
    maxWords: 190,
    minLinks: 1,
    mustMatch: [/gnm/i, /age/i]
  },
  {
    tag: 'comparison',
    query: 'Compare BIT Sindri vs UCET Hazaribagh for D2D',
    maxWords: 320,
    minLinks: 1,
    mustMatch: [/bit sindri/i, /ucet/i]
  },
  {
    tag: 'rank-predict',
    query: 'Rank 150 UR D2D me kaunsa college milega?',
    maxWords: 280,
    minLinks: 1,
    mustMatch: [/(rank|cutoff|college)/i]
  },
  {
    tag: 'syllabus',
    query: 'Diploma semester 3 CSE subjects',
    maxWords: 250,
    minLinks: 1,
    mustMatch: [/sem/i]
  },
  {
    tag: 'nursing',
    query: 'ANM exam pattern and marking scheme',
    maxWords: 220,
    minLinks: 1,
    mustMatch: [/anm/i]
  },
  {
    tag: 'greeting',
    query: 'Hello',
    maxWords: 110,
    minLinks: 0,
    mustMatch: [/(futurely|hello|hi|namaste|help)/i],
    skipDirectAnswerCheck: true
  },
  {
    tag: 'scope-guard',
    query: 'What is the weather forecast in Ranchi today?',
    maxWords: 170,
    minLinks: 0,
    mustMatch: [/(verified|knowledge base|explore|not)/i]
  },
  {
    tag: 'agriculture',
    query: 'JCECE agriculture PCMB group eligibility',
    maxWords: 240,
    minLinks: 1,
    mustMatch: [/(agriculture|jcece)/i]
  },
  {
    tag: 'polytechnic-le',
    query: 'DECE LE syllabus',
    maxWords: 240,
    minLinks: 1,
    mustMatch: [/(dece|lateral)/i]
  }
];

// Formatting/content violations the response contract forbids.
const FORBIDDEN_PATTERNS = [
  { pattern: /as an ai (language )?model/i, reason: 'AI disclaimer' },
  { pattern: /i hope this helps/i, reason: 'filler outro' },
  { pattern: /certainly[!,]/i, reason: 'filler opener' },
  { pattern: /^\s*(sure|of course)[,!]/im, reason: 'filler opener' },
  { pattern: /```/, reason: 'code fence (renderer cannot style it)' },
  { pattern: /^#{4,}\s/m, reason: 'heading deeper than ### (not rendered)' },
  { pattern: /<script/i, reason: 'raw HTML' }
];

function wordCount(text) {
  return String(text || '').replace(/[#*`>[\]()]/g, ' ').split(/\s+/).filter(Boolean).length;
}

function countPortalLinks(text) {
  const relative = String(text || '').match(/\]\((\/[^)\s]+)\)/g) || [];
  const absolute = String(text || '').match(/\]\((https?:\/\/[^)\s]+)\)/g) || [];
  return relative.length + Math.min(absolute.length, 3);
}

function evaluateAnswer(golden, text, engine) {
  const failures = [];
  const body = String(text || '');
  const isKbEngine = engine === 'database-ground-truth' || engine === 'catalog-navigation' || engine === 'scope-guard';
  // Deterministic KB fact sheets may be longer than LLM prose, but still capped so they cannot run away
  const wordBudget = isKbEngine ? (golden.kbMaxWords || 500) : golden.maxWords;

  if (!body.trim()) {
    failures.push('empty answer');
    return failures;
  }

  const words = wordCount(body);
  if (words > wordBudget) {
    failures.push(`too long: ${words} words (budget ${wordBudget})`);
  }

  const links = countPortalLinks(body);
  if (links < golden.minLinks) {
    failures.push(`missing portal link (${links}/${golden.minLinks})`);
  }

  for (const pattern of golden.mustMatch || []) {
    if (!pattern.test(body)) failures.push(`missing expected content: ${pattern}`);
  }

  for (const { pattern, reason } of FORBIDDEN_PATTERNS) {
    if (pattern.test(body)) failures.push(`formatting: ${reason}`);
  }

  if (!golden.skipDirectAnswerCheck && !isKbEngine) {
    const opensDirectly = /direct answer/i.test(body) || words <= 70;
    if (!opensDirectly) failures.push('no "Direct answer:" opener');
  }

  const firstLine = body.split('\n').find(line => line.trim()) || '';
  if (firstLine.length > 240) failures.push('first line too long (no concise opener)');

  return failures;
}

async function ask(query) {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 90000);
  try {
    const res = await fetch(`${BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        userQuery: query,
        messages: [{ role: 'user', content: query }],
        pathname: '/'
      })
    });
    const raw = await res.text();
    let payload;
    try {
      payload = JSON.parse(raw);
    } catch {
      payload = { text: raw, engine: 'unparsed' };
    }
    return { status: res.status, payload, ms: Date.now() - started };
  } catch (err) {
    return {
      status: 0,
      payload: {
        text: '',
        engine: 'request-failed',
        error: err.name === 'AbortError' ? 'timeout' : err.message
      },
      ms: Date.now() - started
    };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const envFile = readEnvLocal();
  const apiKey = process.env.OPENROUTER_API_KEY || envFile.OPENROUTER_API_KEY || '';
  const model = process.env.OPENROUTER_MODEL || envFile.OPENROUTER_MODEL || 'deepseek/deepseek-chat';

  console.log('\n=== Futurely chat quality eval ===');
  console.log(`endpoint : ${BASE}/api/chat`);
  console.log(`model    : ${model}`);
  console.log(`api key  : ${apiKey ? 'configured' : 'NOT configured (knowledge-base answers only)'}\n`);

  const results = [];
  let llmAnswers = 0;
  let tableAnswers = 0;
  let bulletAnswers = 0;
  let directAnswers = 0;

  for (const golden of GOLDEN_CASES) {
    const { status, payload, ms } = await ask(golden.query);
    const text = payload.text || '';
    const failures = status === 200
      ? evaluateAnswer(golden, text, payload.engine || 'unknown')
      : [`HTTP ${status}: ${payload.error || 'request failed'}`];

    const engine = payload.engine || 'unknown';
    if (engine === 'openrouter' || engine === 'gemini') llmAnswers += 1;
    if (/^\s*\|/m.test(text)) tableAnswers += 1;
    if (/^\s*-\s/m.test(text)) bulletAnswers += 1;
    if (/direct answer/i.test(text)) directAnswers += 1;

    results.push({
      golden,
      text,
      engine,
      ms,
      failures,
      words: wordCount(text),
      links: countPortalLinks(text)
    });

    const verdict = failures.length === 0 ? 'PASS' : 'FAIL';
    console.log(
      `[${verdict}] ${golden.tag.padEnd(15)} ${String(engine).padEnd(22)} ` +
      `${String(wordCount(text)).padStart(4)}w ${String(countPortalLinks(text))}L ${String(ms).padStart(6)}ms`
    );
    if (failures.length > 0) {
      console.log(`        -> ${failures.join(' | ')}`);
      if (VERBOSE) console.log(`        ${text.replace(/\n/g, ' | ').slice(0, 500)}`);
    }
  }

  const failed = results.filter(r => r.failures.length > 0).length;
  const totalWords = results.reduce((sum, r) => sum + r.words, 0);
  const avgMs = Math.round(results.reduce((sum, r) => sum + r.ms, 0) / results.length);

  console.log('\n--- summary ---');
  console.log(`cases            : ${results.length} (${results.length - failed} passed, ${failed} failed)`);
  console.log(`LLM answered     : ${llmAnswers}/${results.length}`);
  console.log(`avg answer length: ${Math.round(totalWords / results.length)} words`);
  console.log(`avg latency      : ${avgMs} ms`);
  console.log(
    `contract markers : direct-answer ${directAnswers}/${results.length} | ` +
    `bullets ${bulletAnswers}/${results.length} | tables ${tableAnswers}/${results.length}`
  );

  if (failed > 0) {
    console.log('\nFailing cases:');
    results.filter(r => r.failures.length > 0).forEach(r => {
      console.log(`  - ${r.golden.tag} ("${r.golden.query}")`);
      r.failures.forEach(f => console.log(`      ${f}`));
    });
    process.exitCode = 1;
  } else {
    console.log('\nAll golden cases satisfied the response contract.');
  }
}

main().catch(err => {
  console.error('chat-quality-eval failed:', err);
  process.exit(1);
});

/**
 * Futurely chatbot engine check.
 *
 *   node scripts/check-chat-engine.js      (or: npm run check-chat)
 *
 * 1. Reads OPENROUTER_API_KEY / OPENROUTER_MODEL from .env.local (shell env wins).
 * 2. Validates the key against https://openrouter.ai/api/v1/key
 * 3. Runs one tiny chat completion so key + model + network are all proven.
 * 4. Calls the running server's /api/chat and reports which engine answered
 *    (engine "openrouter" = LLM live, "database-ground-truth" = local KB only).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = process.env.CHECK_BASE_URL || 'http://localhost:3000';

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

async function withTimeout(label, ms, fn) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fn(controller.signal);
  } catch (err) {
    const reason = err.name === 'AbortError' ? `timed out after ${ms}ms` : err.message;
    console.log(`   x ${label}: ${reason}`);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function checkKey(apiKey) {
  console.log('1. Validating key with OpenRouter...');
  const keyJson = await withTimeout('key check', 15000, async (signal) => {
    const res = await fetch('https://openrouter.ai/api/v1/key', {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal
    });
    const body = await res.text();
    if (!res.ok) {
      console.log(`   x HTTP ${res.status}: ${body.slice(0, 200)}`);
      return null;
    }
    return JSON.parse(body);
  });
  if (keyJson && keyJson.data) {
    const d = keyJson.data;
    console.log(`   OK key valid - label: ${d.label || '(none)'}, free tier: ${d.is_free_tier}`);
    console.log(`      usage: $${Number(d.usage || 0).toFixed(4)}${d.limit ? ` / limit $${d.limit}` : ' (no limit set)'}`);
  }
}

async function checkCompletion(apiKey, model) {
  console.log(`\n2. Test completion with ${model}...`);
  const chat = await withTimeout('completion', 40000, async (signal) => {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://futurely.in',
        'X-Title': 'Futurely Education Assistant'
      },
      signal,
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: 'Reply with the single word: READY' }],
        max_tokens: 12,
        temperature: 0
      })
    });
    return { status: res.status, body: await res.text() };
  });

  if (!chat) return;
  if (chat.status === 200) {
    const parsed = JSON.parse(chat.body);
    const reply = parsed.choices?.[0]?.message?.content || '(empty)';
    console.log(`   OK ${model} replied: "${reply.trim().slice(0, 60)}"`);
    console.log(`      tokens: ${parsed.usage?.total_tokens ?? '?'}`);
  } else {
    console.log(`   x HTTP ${chat.status}: ${chat.body.slice(0, 300)}`);
    console.log('     -> if this is a model error, pick another id from https://openrouter.ai/models');
  }
}

async function checkLocalServer(apiKey, useHeaderKey) {
  console.log(`\n3. Asking the running server (${BASE}/api/chat)${useHeaderKey ? ' with x-openrouter-key header' : ''}...`);
  const local = await withTimeout('local /api/chat', 90000, async (signal) => {
    const res = await fetch(`${BASE}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(useHeaderKey && apiKey ? { 'x-openrouter-key': apiKey } : {})
      },
      signal,
      body: JSON.stringify({
        userQuery: 'BIT Sindri D2D cutoff',
        messages: [{ role: 'user', content: 'BIT Sindri D2D cutoff' }],
        pathname: '/'
      })
    });
    return { status: res.status, body: await res.text() };
  });

  if (!local) {
    console.log('   x server not reachable - start it with `npm run dev` and retry.');
    process.exitCode = 1;
    return;
  }
  if (local.status !== 200) {
    console.log(`   x HTTP ${local.status}: ${local.body.slice(0, 300)}`);
    process.exitCode = 1;
    return;
  }

  const payload = JSON.parse(local.body);
  console.log(`   engine: ${payload.engine}${payload.model ? `   model: ${payload.model}` : ''}`);
  console.log(`   reply : ${String(payload.text || '').replace(/\s+/g, ' ').slice(0, 160)}`);

  if (payload.engine === 'openrouter') {
    console.log('\nLLM engine is LIVE - OpenRouter + RAG context are answering.');
  } else if (apiKey) {
    console.log('\nThe server answered from the local knowledge base only.');
    console.log('   Your key exists but the server has not loaded it - restart `npm run dev` and retry.');
  } else {
    console.log('\nRunning on the local knowledge base (no key configured). Add the key to activate the LLM.');
  }
}

async function main() {
  const useHeaderKey = process.argv.includes('--with-key');
  const envFile = readEnvLocal();
  const apiKey = process.env.OPENROUTER_API_KEY || envFile.OPENROUTER_API_KEY || '';
  const model = process.env.OPENROUTER_MODEL || envFile.OPENROUTER_MODEL || 'deepseek/deepseek-chat';

  const maskedKey = apiKey ? `set - ${apiKey.length} chars, ends ...${apiKey.slice(-4)}` : 'NOT FOUND';

  console.log('\n=== Futurely chatbot engine check ===');
  console.log(`model      : ${model}`);
  console.log(`api key    : ${maskedKey}`);
  console.log(`local url  : ${BASE}/api/chat\n`);

  if (!apiKey) {
    console.log('1. Key validation   : SKIPPED (no OPENROUTER_API_KEY)');
    console.log('2. Model completion : SKIPPED');
    console.log('   -> add this line to .env.local, then restart `npm run dev`:\n');
    console.log('      OPENROUTER_API_KEY=sk-or-v1-...\n');
  } else {
    await checkKey(apiKey);
    await checkCompletion(apiKey, model);
  }

  await checkLocalServer(apiKey, useHeaderKey);
}

main().catch((err) => {
  console.error('check-chat-engine failed:', err);
  process.exit(1);
});

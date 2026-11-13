'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  Bot,
  MessageSquare,
  MessageCircle,
  X,
  Send,
  Sparkles,
  RefreshCw,
  User,
  ChevronDown,
  ExternalLink,
  BookOpen,
  GraduationCap,
  FileText,
  Award,
  Download,
  Building2,
  MapPin,
  TrendingUp,
  ArrowRight,
  Layers,
  Compass,
  Mic,
  MicOff,
  Languages,
  Radio,
  Copy,
  Check
} from 'lucide-react';
import Image from "next/image";

const SUGGESTED_QUICK_PROMPTS = [
  "📥 2025 D2D Question Paper PDF",
  "🎯 BIT Sindri D2D Cutoff 2026",
  "📜 D2D Document Verification List",
  "📚 Polytechnic Sem 1 Notes PDF",
  "🩺 ANM & GNM Nursing Exam Pattern",
  "🏫 GEC Chaibasa Fees & Seats",
  "📝 D2D Online Mock Test Series"
];

function getPageContextInfo(pathname) {
  if (!pathname || pathname === '/') return null;

  const path = pathname.toLowerCase();

  // Specific College Pages
  if (path.includes('bit-sindri')) {
    return { label: 'BIT Sindri Dhanbad', type: 'college', prompts: ["📊 Placement %, Package & Recruiter Stats", "🎯 Category Cutoff Ranks (BC-1/UR/EWS)", "💰 Fee Structure & Hostel Facilities", "🏫 Branch Seat Matrix"] };
  }
  if (path.includes('ucet-hazaribagh')) {
    return { label: 'UCET Hazaribagh', type: 'college', prompts: ["📊 UCET Placement & Avg Package", "🎯 Branch-wise Cutoff Ranks", "💰 Annual Fee Structure"] };
  }
  if (path.includes('gec-palamu')) {
    return { label: 'GEC Palamu', type: 'college', prompts: ["📊 GEC Palamu Profile & Seats", "🎯 Cutoff Ranks", "💰 Fee Structure"] };
  }
  if (path.includes('ramgarh-engineering')) {
    return { label: 'Ramgarh Engineering College', type: 'college', prompts: ["📊 PPP Seats vs Free Seats", "🎯 Category Cutoffs", "💰 Fee Structure"] };
  }
  if (path.includes('chaibasa-engineering')) {
    return { label: 'Chaibasa Engineering College', type: 'college', prompts: ["📊 CEC Chaibasa Facilities", "🎯 Cutoff Ranks", "💰 Fee Structure"] };
  }
  if (path.includes('dumka-engineering')) {
    return { label: 'Dumka Engineering College', type: 'college', prompts: ["📊 DEC Dumka Overview", "🎯 Cutoff Ranks", "💰 Fee Structure"] };
  }
  if (path.includes('gp-adityapur')) {
    return { label: 'Government Polytechnic Adityapur', type: 'college', prompts: ["📊 GP Adityapur Placements", "🎯 Civil / Electrical / Mech Cutoffs", "🏫 Total Seats & Facilities"] };
  }
  if (path.includes('gp-dhanbad')) {
    return { label: 'Government Polytechnic Dhanbad', type: 'college', prompts: ["📊 Mining & Mechanical Branch Details", "🎯 Category Cutoffs", "🏫 Campus Facilities"] };
  }
  if (path.includes('gp-ranchi')) {
    return { label: 'Government Polytechnic Ranchi', type: 'college', prompts: ["📊 GP Ranchi Branches & Seats", "🎯 Category Cutoffs", "💰 Fee Structure"] };
  }
  if (path.includes('gwp-jamshedpur')) {
    return { label: "Government Women's Polytechnic Jamshedpur", type: 'college', prompts: ["📊 Women's Polytechnic Branches", "🎯 Cutoff Ranks", "🏫 Hostel & Facilities"] };
  }
  if (path.includes('gwp-ranchi')) {
    return { label: "Government Women's Polytechnic Ranchi", type: 'college', prompts: ["📊 GWP Ranchi Overview", "🎯 Cutoffs", "🏫 Total Seats"] };
  }

  // Generic College path fallback
  if (path.startsWith('/btech-lateral-entry/') || path.startsWith('/diploma/') || path.startsWith('/btech/')) {
    const parts = path.split('/');
    const slug = parts[2] || '';
    const name = slug.replace(/-/g, ' ').toUpperCase();
    return { label: name, type: 'college', prompts: ["📊 Placement & Package Stats", "🎯 Cutoff Ranks", "💰 Fee Structure", "🏫 Total Seats"] };
  }

  // Exam Pages
  if (path.includes('jharkhand-paramedical') || path.includes('paramedical') || path.includes('pmece')) {
    return { label: 'Jharkhand Paramedical (PMECE 2026)', type: 'exam', prompts: ["📥 Download 2025 Paramedical Paper PDF", "🏥 Paramedical Courses & Tracks", "📚 PMECE Syllabus & Pattern", "💰 Application Fees & Shifts"] };
  }
  if (path.includes('jharkhand-agriculture') || path.includes('agriculture')) {
    return { label: 'Jharkhand Agriculture (JCECE 2026)', type: 'exam', prompts: ["📥 Download 2025 Agriculture Paper PDF", "🌾 7 Degree Courses & Eligibility", "📚 PCM / PCB / PCMB Groups", "💰 Application Fees & Helpline"] };
  }
  if (path.includes('jharkhand-d2d') || path.includes('/d2d')) {
    return { label: 'JCECEB D2D B.Tech LE Exam', type: 'exam', prompts: ["📥 Download 2025 D2D Paper PDF", "🎯 BIT Sindri Cutoff Rank", "📚 D2D Exam Pattern & Syllabus"] };
  }
  if (path.includes('polytechnic/lateral-entry') || path.includes('dece')) {
    return { label: 'DECE LE Polytechnic Lateral Entry', type: 'exam', prompts: ["📥 Download 2026 DECE LE Paper PDF", "📚 Syllabus & Marking Scheme", "🎯 College Cutoffs"] };
  }
  if (path.includes('polytechnic') || path.includes('pece')) {
    return { label: 'JCECEB PECE Polytechnic Entrance', type: 'exam', prompts: ["📥 Download 2025 PECE Paper PDF", "📚 10th Class Syllabus", "🎯 GP Adityapur Cutoff"] };
  }

  // Tool & Resource Pages
  if (path.includes('rank-predictor')) {
    return { label: 'Rank Predictor & JCECEB Counseling', type: 'tool', prompts: ["🎓 Predict My College for Rank 150", "📜 JCECEB Choice Preference Strategy", "📑 Verified Document Checklist"] };
  }

  return null;
}

function RankPredictorMiniWidget({ onPredict }) {
  const [exam, setExam] = useState('D2D');
  const [category, setCategory] = useState('UR');
  const [rank, setRank] = useState(150);

  return (
    <div className="mt-2.5 p-2.5 sm:p-3 bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-xl shadow-2xs text-slate-800">
      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
        <span className="text-[9px] sm:text-[10px] font-bold text-teal-800 uppercase tracking-wider bg-teal-100 px-1.5 py-0.5 rounded border border-teal-200">
          🎓 Instant Rank Predictor
        </span>
      </div>

      <div className="space-y-1.5 sm:space-y-2 text-xs">
        <div>
          <label className="text-[9.5px] sm:text-[10px] font-bold text-slate-600 block mb-0.5">Select Exam:</label>
          <select
            value={exam}
            onChange={(e) => setExam(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg p-1 sm:p-1.5 font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600 text-[11px] sm:text-xs"
          >
            <option value="D2D">JCECEB D2D (B.Tech Lateral Entry)</option>
            <option value="Polytechnic">JCECEB PECE (Polytechnic/Diploma)</option>
            <option value="B.Tech">JEE Main / State B.Tech</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          <div>
            <label className="text-[9.5px] sm:text-[10px] font-bold text-slate-600 block mb-0.5">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg p-1 sm:p-1.5 font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600 text-[11px] sm:text-xs"
            >
              <option value="UR">UR (General)</option>
              <option value="BC-I">BC-I</option>
              <option value="BC-II">BC-II</option>
              <option value="EWS">EWS</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="TFW">TFW</option>
            </select>
          </div>

          <div>
            <label className="text-[9.5px] sm:text-[10px] font-bold text-slate-600 block mb-0.5">Your CML Rank:</label>
            <input
              type="number"
              value={rank}
              onChange={(e) => setRank(parseInt(e.target.value) || 1)}
              className="w-full bg-white border border-slate-200 rounded-lg p-1 sm:p-1.5 font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-600 text-[11px] sm:text-xs"
            />
          </div>
        </div>

        <button
          onClick={() => onPredict(`Predict my college for ${exam} rank ${rank} in ${category}`)}
          className="w-full mt-1.5 sm:mt-2 bg-teal-700 hover:bg-teal-800 text-white font-bold py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-lg text-[11px] sm:text-xs transition-colors shadow-2xs flex items-center justify-center gap-1.5 active:scale-[0.98]"
        >
          <span>Predict Eligible Colleges</span>
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>
      </div>
    </div>
  );
}

// Dictionary of common terms spoken in exams/counseling
const HINDI_TO_ENGLISH_TERMS = [
  { hi: /कट\s*ऑफ|कटऑफ/gi, en: 'cutoff' },
  { hi: /सिलेबस|पाठ्यक्रम/gi, en: 'syllabus' },
  { hi: /क्वेश्चन\s*पेपर|प्रश्न\s*पत्र|पेपर/gi, en: 'question paper' },
  { hi: /प्रीवियस\s*इयर|पिछले\s*साल/gi, en: 'previous year' },
  { hi: /पॉलिटेक्निक/gi, en: 'polytechnic' },
  { hi: /डिप्लोमा/gi, en: 'diploma' },
  { hi: /लेटरल\s*एंट्री/gi, en: 'lateral entry' },
  { hi: /सिंदरी/gi, en: 'sindri' },
  { hi: /आदित्यपुर/gi, en: 'adityapur' },
  { hi: /धनबाद/gi, en: 'dhanbad' },
  { hi: /रांची/gi, en: 'ranchi' },
  { hi: /बोकारो/gi, en: 'bokaro' },
  { hi: /दुमका/gi, en: 'dumka' },
  { hi: /हजारीबाग/gi, en: 'hazaribagh' },
  { hi: /पलामू/gi, en: 'palamu' },
  { hi: /चाईबासा/gi, en: 'chaibasa' },
  { hi: /जमशेदपुर/gi, en: 'jamshedpur' },
  { hi: /काउंसलिंग|परामर्श/gi, en: 'counseling' },
  { hi: /एडमिशन|दाखिला|प्रवेश/gi, en: 'admission' },
  { hi: /रैंक/gi, en: 'rank' },
  { hi: /मेरिट\s*लिस्ट/gi, en: 'merit list' },
  { hi: /रिजल्ट|परिणाम/gi, en: 'result' },
  { hi: /परीक्षा|एग्जाम/gi, en: 'exam' },
  { hi: /फॉर्म|आवेदन/gi, en: 'form' },
  { hi: /फीस|शुल्क/gi, en: 'fee' },
  { hi: /स्कॉलरशिप|छात्रवृत्ति/gi, en: 'scholarship' },
  { hi: /डोमिसाइल|आवासीय\s*प्रमाण\s*पत्र/gi, en: 'domicile certificate' },
  { hi: /खतियान/gi, en: 'khatiyan' },
  { hi: /कास्ट\s*सर्टिफिकेट|जाति\s*प्रमाण\s*पत्र/gi, en: 'caste certificate' },
  { hi: /इनकम\s*सर्टिफिकेट|आय\s*प्रमाण\s*पत्र/gi, en: 'income certificate' },
  { hi: /बैक\s*पेपर|सप्लीमेंट्री/gi, en: 'back paper' },
  { hi: /कंप्यूटर\s*साइंस/gi, en: 'computer science' },
  { hi: /मैकेनिकल/gi, en: 'mechanical' },
  { hi: /इलेक्ट्रिकल/gi, en: 'electrical' },
  { hi: /सिविल/gi, en: 'civil' },
  { hi: /माइनिंग/gi, en: 'mining' },
  { hi: /धातु\s*विज्ञान|मेटलर्जी/gi, en: 'metallurgy' },
  { hi: /सरकारी\s*कॉलेज|गवर्नमेंट\s*कॉलेज/gi, en: 'government college' },
  { hi: /प्राइवेट\s*कॉलेज/gi, en: 'private college' },
  { hi: /टॉप\s*कॉलेज/gi, en: 'top college' },
  { hi: /किताब|बुक्स/gi, en: 'books' },
  { hi: /नोट्स/gi, en: 'notes' },
  { hi: /कैसे\s*मिलेगा|कैसे\s*होगा/gi, en: 'how to get' },
  { hi: /कितना\s*चाहिए|कितने\s*नंबर/gi, en: 'marks required' },
  { hi: /बताइए|बताओ|जानकारी\s*दीजिए/gi, en: 'details' },
  { hi: /क्या\s*है/gi, en: 'what is' },
  { hi: /मुझे\s*चाहिए/gi, en: 'i want' }
];

const DEVANAGARI_PHONETIC_MAP = {
  'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ऋ': 'ri', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
  'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng',
  'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny',
  'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
  'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
  'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
  'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h',
  'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'ृ': 'ri', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n', 'ँ': 'n', '्': '', 'ः': 'h', '़': ''
};

function convertVoiceTranscriptToEnglish(rawText) {
  if (!rawText) return '';
  let text = rawText;

  // 1. Replace known Hindi domain keywords with exact English words
  for (const item of HINDI_TO_ENGLISH_TERMS) {
    text = text.replace(item.hi, item.en);
  }

  // 2. Transliterate any remaining Hindi Devanagari characters into Roman English alphabet
  let converted = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (DEVANAGARI_PHONETIC_MAP[char] !== undefined) {
      converted += DEVANAGARI_PHONETIC_MAP[char];
    } else {
      converted += char;
    }
  }

  // 3. Clean whitespace and capitalize first letter
  const cleaned = converted.replace(/\s+/g, ' ').trim();
  if (cleaned.length === 0) return '';
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const contextInfo = getPageContextInfo(pathname);

  // Directly toggle chat window without delayed logo animation
  const handleOpenChat = () => {
    setIsOpen(true);
  };

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hello! I am your **Futurely AI Counselor**.\n\nI can help you with cutoff ranks, seat matrices, JCECEB document verification lists, direct page links, and **direct PDF downloads** for question papers, syllabus, & semester notes.\n\nHow can I guide your preparation today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceLang, setVoiceLang] = useState('en-IN'); // English (India) speech transcription for microphone
  const [isListening, setIsListening] = useState(false);
  const [speechNotice, setSpeechNotice] = useState(null);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Clean up speech recognition on unmount or minimize
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const showSpeechNotice = (msg) => {
    setSpeechNotice(msg);
    setTimeout(() => {
      setSpeechNotice(null);
    }, 4000);
  };

  // Speech-To-Text (Speech Recognition)
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showSpeechNotice('Voice input is not supported in this browser. Please use Chrome, Edge, or Android Browser.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = voiceLang || 'en-IN';
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          const englishSentence = convertVoiceTranscriptToEnglish(transcript);
          setInput(englishSentence);
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          showSpeechNotice('Microphone permission denied. Please allow mic access in your browser settings.');
        } else if (event.error !== 'no-speech') {
          showSpeechNotice(`Voice error: ${event.error}. Please try again.`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
      showSpeechNotice('Could not start microphone. Please try again.');
    }
  };

  const handleSend = async (customText) => {
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    }

    const rawText = customText || input;
    if (!rawText.trim() || isLoading) return;

    const textToSend = convertVoiceTranscriptToEnglish(rawText);
    if (!textToSend.trim()) return;

    const userMessage = { role: 'user', content: textToSend };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    if (!customText) setInput('');
    setIsLoading(true);

    let data = null;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            messages: updatedMessages,
            userQuery: textToSend,
            pathname: pathname || (typeof window !== 'undefined' ? window.location.pathname : '')
          })
        });

        clearTimeout(timeoutId);

        if (res.ok) {
          const responseText = await res.text();
          try {
            data = JSON.parse(responseText);
            break; // Success, exit retry loop
          } catch {
            data = { text: responseText || "Please explore our [B.Tech Lateral Entry Colleges](/btech-lateral-entry) or [Exam Prep](/exam-preparation) pages directly!" };
            break;
          }
        }
      } catch (fetchErr) {
        if (attempt === 0) {
          // Wait 400ms before retrying once
          await new Promise((r) => setTimeout(r, 400));
        }
      }
    }

    try {
      if (data && data.text) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.text, card: data.card || null }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: "Sorry, I could not retrieve that information right now. Please explore our [College Profiles](/btech-lateral-entry) or [Rank Predictor](/rank-predictor)!"
          }
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Network issue. Please check your connection and try again."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Chat cleared! Ask me anything about Futurely college data, cutoff ranks, document checklists, direct page links, or PDF question papers."
      }
    ]);
  };

  // Copy an assistant answer (markdown kept intact so it pastes cleanly into notes)
  const handleCopyAnswer = async (text, idx) => {
    try {
      await navigator.clipboard.writeText(String(text || ''));
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx((prev) => (prev === idx ? null : prev)), 1600);
    } catch {
      // Clipboard API unavailable (older/insecure context) — ignore silently
    }
  };

  // Formatter for headings, bold/italic, inline code, markdown links [Title](URL), lists, tables & linebreaks
  const renderFormattedContent = (content) => {
    if (!content) return null;
    const lines = content.split('\n');
    const renderedElements = [];

    // Helper to format inline tokens: [label](url) and **bold**
    const formatInline = (text, keyPrefix) => {
      if (!text) return null;
      const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
      const parts = text.split(tokenRegex);

      return parts.map((part, pIdx) => {
        if (!part) return null;

        // Check for markdown link [label](url)
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const label = linkMatch[1];
          const url = linkMatch[2];
          const isExternal = url.startsWith('http://') || url.startsWith('https://');
          const isPdf =
            url.includes('.pdf') ||
            url.includes('drive.google.com') ||
            label.toLowerCase().includes('pdf') ||
            label.toLowerCase().includes('download');

          return (
            <a
              key={`${keyPrefix}-lnk-${pIdx}`}
              href={url}
              target={isExternal ? '_blank' : '_self'}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className={`inline-flex items-center gap-1 font-semibold transition-all mx-0.5 my-0.5 px-1.5 sm:px-2 py-0.5 rounded-lg border text-[10.5px] sm:text-[11.5px] max-w-full break-all ${
                isPdf
                  ? 'bg-blue-50 hover:bg-blue-100 text-blue-900 border-blue-200 shadow-2xs hover:border-blue-300'
                  : 'bg-slate-50 hover:bg-blue-50 text-slate-800 border-slate-200 shadow-2xs hover:border-blue-300'
              }`}
            >
              {isPdf ? (
                <Download className="w-3 h-3 text-blue-600 shrink-0 inline" />
              ) : (
                <ExternalLink className="w-2.5 h-2.5 text-blue-600 shrink-0 inline" />
              )}
              <span className="truncate">{label}</span>
            </a>
          );
        }

        // Check for bold **text**
        if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) {
          const boldText = part.slice(2, -2);
          return (
            <strong key={`${keyPrefix}-b-${pIdx}`} className="font-semibold text-slate-900">
              {boldText}
            </strong>
          );
        }

        // Check for *italic* (single asterisk — never bold)
        if (part.length > 2 && part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
          return (
            <em key={`${keyPrefix}-i-${pIdx}`} className="italic text-slate-700">
              {part.slice(1, -1)}
            </em>
          );
        }

        // Check for inline `code`
        if (part.length > 2 && part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={`${keyPrefix}-c-${pIdx}`}
              className="px-1 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px] sm:text-[11px] text-slate-800"
            >
              {part.slice(1, -1)}
            </code>
          );
        }

        // Regular text
        return part;
      });
    };

    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();

      // Check for start of Markdown Table (line starts and ends with |)
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        const tableLines = [];
        while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
          tableLines.push(lines[i].trim());
          i++;
        }

        if (tableLines.length >= 2) {
          // Parse header, separator, and data rows
          const parseRow = (r) =>
            r
              .slice(1, -1)
              .split('|')
              .map((c) => c.trim());

          const headerCells = parseRow(tableLines[0]);
          const isSeparator = (r) => /^[:\-\|\s]+$/.test(r);
          
          let dataRowStartIndex = 1;
          if (tableLines.length > 1 && isSeparator(tableLines[1])) {
            dataRowStartIndex = 2;
          }

          const bodyRows = tableLines.slice(dataRowStartIndex).map((r) => parseRow(r));

          renderedElements.push(
            <div key={`tbl-${i}`} className="my-2 w-full overflow-x-auto rounded-md border border-slate-200 bg-white shadow-2xs">
              <table className="w-full text-left border-collapse text-[9.5px] sm:text-[11px] leading-tight">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-900 font-bold">
                    {headerCells.map((h, hIdx) => (
                      <th
                        key={hIdx}
                        className={`py-1 px-1.5 sm:py-1.5 sm:px-2.5 whitespace-nowrap ${
                          hIdx === 0 ? 'text-left font-semibold text-slate-900 sticky left-0 bg-slate-100 z-10 border-r border-slate-200 sm:border-r-0' : 'text-center text-slate-700'
                        }`}
                      >
                        {formatInline(h, `th-${hIdx}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {bodyRows.map((row, rIdx) => (
                    <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white hover:bg-teal-50/40' : 'bg-slate-50/70 hover:bg-teal-50/40'}>
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`py-1 px-1.5 sm:py-1.5 sm:px-2.5 ${
                            cIdx === 0
                              ? 'font-medium text-slate-800 whitespace-nowrap sticky left-0 bg-inherit z-10 border-r border-slate-100 sm:border-r-0'
                              : 'text-center text-slate-600 font-mono text-[9px] sm:text-[10px] whitespace-nowrap'
                          }`}
                        >
                          {cell === '-' ? (
                            <span className="text-slate-300">-</span>
                          ) : (
                            formatInline(cell, `td-${rIdx}-${cIdx}`)
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          continue;
        }
      }

      // Headings: ## / ### (a single # is tolerated)
      const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        renderedElements.push(
          <h4
            key={`h-${i}`}
            className={`mt-2 mb-1 font-bold text-slate-900 ${
              level >= 3 ? 'text-[11.5px] sm:text-[13px]' : 'text-[12px] sm:text-[13.5px]'
            }`}
          >
            {formatInline(headingMatch[2].trim(), `h-${i}`)}
          </h4>
        );
        i++;
        continue;
      }

      // Horizontal rule
      if (/^([-*_])\1{2,}$/.test(trimmed)) {
        renderedElements.push(<hr key={`hr-${i}`} className="my-2 border-slate-200" />);
        i++;
        continue;
      }

      // Grouped bullet list
      if (/^[-*+]\s+/.test(trimmed)) {
        const bulletItems = [];
        while (i < lines.length && /^[-*+]\s+/.test(lines[i].trim())) {
          bulletItems.push(lines[i].trim().replace(/^[-*+]\s+/, ''));
          i++;
        }
        renderedElements.push(
          <ul key={`ul-${i}`} className="ml-3.5 sm:ml-4 mb-1.5 space-y-0.5 list-disc marker:text-blue-500">
            {bulletItems.map((item, bIdx) => (
              <li key={bIdx} className="text-slate-700 leading-relaxed text-[11px] sm:text-xs">
                {formatInline(item, `ul-${i}-${bIdx}`)}
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // Grouped numbered list
      if (/^\d+[.)]\s+/.test(trimmed)) {
        const orderedItems = [];
        while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
          orderedItems.push(lines[i].trim().replace(/^\d+[.)]\s+/, ''));
          i++;
        }
        renderedElements.push(
          <ol key={`ol-${i}`} className="ml-3.5 sm:ml-4 mb-1.5 space-y-0.5 list-decimal marker:text-blue-600 marker:font-semibold">
            {orderedItems.map((item, oIdx) => (
              <li key={oIdx} className="text-slate-700 leading-relaxed text-[11px] sm:text-xs">
                {formatInline(item, `ol-${i}-${oIdx}`)}
              </li>
            ))}
          </ol>
        );
        continue;
      }

      if (!trimmed) {
        renderedElements.push(<div key={`sp-${i}`} className="h-1.5 sm:h-2" />);
      } else {
        renderedElements.push(
          <p key={`line-${i}`} className="mb-1 sm:mb-1.5 text-slate-700 leading-relaxed text-[11px] sm:text-xs">
            {formatInline(line, `line-${i}`)}
          </p>
        );
      }

      i++;
    }

    return renderedElements;
  };

  const renderCardComponent = (card) => {
    if (!card || !card.cardType) return null;

    switch (card.cardType) {
      case 'pdf_download':
        return (
          <div className="mt-2.5 p-2.5 sm:p-3 bg-gradient-to-br from-amber-50 to-orange-50/80 border border-amber-200/90 rounded-xl shadow-xs text-slate-800">
            <div className="flex items-center justify-between gap-1.5 mb-1.5 sm:mb-2">
              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-white px-1.5 sm:px-2 py-0.5 rounded-md">
                <Download className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Official Paper PDF
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-amber-900 bg-amber-100 px-1.5 sm:px-2 py-0.5 rounded-full border border-amber-200">
                {card.year}
              </span>
            </div>
            <h4 className="font-bold text-[11.5px] sm:text-xs text-slate-900 mb-1.5 sm:mb-2 leading-snug">{card.title}</h4>
            <a
              href={card.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-lg text-[11px] sm:text-xs transition-all shadow-2xs hover:shadow-xs group"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-y-0.5" />
              <span>Download Official PDF Now</span>
            </a>

            {card.otherYears && card.otherYears.length > 0 && (
              <div className="mt-2 pt-1.5 sm:mt-2.5 sm:pt-2 border-t border-amber-200/60">
                <span className="text-[9.5px] sm:text-[10px] font-semibold text-amber-900 block mb-1">Other Available Years:</span>
                <div className="flex flex-wrap gap-1">
                  {card.otherYears.map((py, pIdx) => (
                    <a
                      key={pIdx}
                      href={py.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 px-1.5 sm:px-2 py-0.5 rounded-md transition-colors"
                    >
                      <Download className="w-2.5 h-2.5 text-amber-600" />
                      <span>{py.year} Paper</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'pdf_list':
        return (
          <div className="mt-2.5 p-2.5 sm:p-3 bg-gradient-to-br from-amber-50 to-orange-50/80 border border-amber-200/90 rounded-xl shadow-xs text-slate-800">
            <div className="flex items-center justify-between gap-1.5 mb-1.5 sm:mb-2">
              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-amber-600 text-white px-1.5 sm:px-2 py-0.5 rounded-md">
                <Download className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Question Paper PDFs
              </span>
            </div>
            <h4 className="font-bold text-[11.5px] sm:text-xs text-slate-900 mb-1.5 sm:mb-2">{card.title}</h4>
            <div className="space-y-1 sm:space-y-1.5 mb-2">
              {card.pdfs?.slice(0, 5).map((pdf, idx) => (
                <a
                  key={idx}
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-white hover:bg-amber-100/80 border border-amber-200 p-1.5 px-2 rounded-lg text-[10.5px] sm:text-xs font-semibold text-slate-800 transition-colors"
                >
                  <span className="truncate pr-1.5 text-[10.5px] sm:text-[11px]">{pdf.name}</span>
                  <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-300 shrink-0">
                    <Download className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> PDF
                  </span>
                </a>
              ))}
            </div>
            <a
              href={card.route || '/resources'}
              className="block text-center text-[10px] sm:text-[11px] font-bold text-amber-800 hover:text-amber-900 hover:underline"
            >
              View All Question Papers & Resources →
            </a>
          </div>
        );

      case 'college_card':
        return (
          <div className="mt-2.5 p-2.5 sm:p-3.5 bg-gradient-to-br from-teal-50/90 via-emerald-50/40 to-slate-50 border border-teal-200/90 rounded-xl shadow-xs text-slate-800">
            <div className="flex items-start justify-between gap-1.5 mb-1.5">
              <div>
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-teal-700 text-white px-1.5 sm:px-2 py-0.5 rounded-md mb-1">
                  <Building2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {card.type} Institute
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">{card.name}</h4>
                <p className="text-[10px] sm:text-[11px] text-slate-600 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-teal-600" /> {card.city}, {card.state || 'Jharkhand'}
                </p>
              </div>
            </div>

            {(card.placementRate !== 'N/A' || card.avgPackageLPA !== 'N/A') && (
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 my-2 bg-white p-1.5 sm:p-2 rounded-lg border border-teal-100 shadow-2xs">
                {card.placementRate && card.placementRate !== 'N/A' && (
                  <div className="text-center border-r border-slate-100 pr-1">
                    <span className="text-[9px] sm:text-[10px] font-medium text-slate-500 uppercase tracking-tight block">Placements</span>
                    <span className="text-[11px] sm:text-xs font-black text-emerald-700 flex items-center justify-center gap-0.5">
                      <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {card.placementRate}%
                    </span>
                  </div>
                )}
                {card.avgPackageLPA && card.avgPackageLPA !== 'N/A' && (
                  <div className="text-center">
                    <span className="text-[9px] sm:text-[10px] font-medium text-slate-500 uppercase tracking-tight block">Avg Package</span>
                    <span className="text-[11px] sm:text-xs font-black text-teal-800">₹{card.avgPackageLPA} LPA</span>
                  </div>
                )}
              </div>
            )}

            {card.courses && card.courses.length > 0 && (
              <div className="mb-2">
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Key Branches:</span>
                <div className="flex flex-wrap gap-1">
                  {card.courses.map((c, cIdx) => (
                    <span key={cIdx} className="text-[9px] sm:text-[10px] font-medium bg-white border border-teal-200 text-teal-900 px-1.5 sm:px-2 py-0.5 rounded-md">
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <a
              href={card.route}
              className="w-full flex items-center justify-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white font-bold py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-lg text-[11px] sm:text-xs transition-all shadow-2xs hover:shadow-xs group mt-1.5 sm:mt-2"
            >
              <span>Explore Full College</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        );

      case 'college_comparison':
        return (
          <div className="mt-2.5 p-2.5 sm:p-3 bg-gradient-to-br from-indigo-50/80 to-teal-50/80 border border-indigo-200/80 rounded-xl shadow-xs text-slate-800">
            <div className="flex items-center justify-between gap-1.5 mb-1.5 sm:mb-2">
              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-indigo-700 text-white px-1.5 sm:px-2 py-0.5 rounded-md">
                <Layers className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Side-by-Side Comparison
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-2">
              {card.colleges?.map((col, idx) => (
                <div key={idx} className="bg-white p-1.5 sm:p-2 rounded-lg border border-indigo-100 flex flex-col justify-between">
                  <div>
                    <span className="text-[8.5px] sm:text-[9px] font-bold text-indigo-700 bg-indigo-50 px-1 py-0.5 rounded border border-indigo-200 inline-block mb-1">
                      {col.type}
                    </span>
                    <h5 className="font-bold text-[10px] sm:text-[11px] text-slate-900 line-clamp-2 leading-tight">{col.name}</h5>
                    <div className="mt-1.5 space-y-0.5 text-[9px] sm:text-[10px] text-slate-600">
                      <div>Placement: <strong className="text-emerald-700">{col.placementRate}%</strong></div>
                      <div>Avg Pkg: <strong className="text-teal-800">₹{col.avgPackageLPA} LPA</strong></div>
                    </div>
                  </div>
                  <a
                    href={col.route}
                    className="mt-2 text-center text-[9px] sm:text-[10px] font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 py-1 px-1 rounded border border-indigo-200 block transition-colors"
                  >
                    View Profile →
                  </a>
                </div>
              ))}
            </div>
          </div>
        );

      case 'college_list':
        return (
          <div className="mt-2.5 p-2.5 sm:p-3 bg-gradient-to-br from-slate-50 via-teal-50/40 to-emerald-50/40 border border-teal-200/90 rounded-xl shadow-xs text-slate-800">
            <div className="flex items-center justify-between gap-1.5 mb-1.5 sm:mb-2">
              <h4 className="font-bold text-[11.5px] sm:text-xs text-slate-900">{card.title}</h4>
              <span className="text-[9px] sm:text-[10px] font-bold bg-emerald-600 text-white px-1.5 sm:px-2 py-0.5 rounded-full shadow-2xs">
                {card.countBadge}
              </span>
            </div>

            <div className="space-y-1 sm:space-y-1.5 my-1.5 sm:my-2">
              {card.items?.map((item, idx) => (
                <a
                  key={idx}
                  href={item.route}
                  className="flex items-center justify-between bg-white hover:bg-teal-50/80 border border-slate-200 hover:border-teal-300 p-1.5 sm:p-2 rounded-lg transition-all group shadow-2xs"
                >
                  <span className="font-semibold text-[10.5px] sm:text-[11px] text-slate-800 group-hover:text-teal-800 truncate pr-1.5">
                    {item.name}
                  </span>
                  <span className="text-[8.5px] sm:text-[9px] font-bold bg-teal-100 text-teal-800 border border-teal-200 px-1 py-0.5 rounded shrink-0">
                    {item.badge}
                  </span>
                </a>
              ))}
            </div>

            <a
              href={card.route}
              className="w-full flex items-center justify-center gap-1 bg-teal-700 hover:bg-teal-800 text-white font-bold py-1.5 px-2.5 sm:px-3 rounded-lg text-[10.5px] sm:text-[11px] transition-all shadow-2xs mt-1.5 sm:mt-2"
            >
              <span>Explore Complete College Directory</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        );

      case 'exam_card':
        return (
          <div className="mt-2.5 p-2.5 sm:p-3.5 bg-gradient-to-br from-sky-50 via-teal-50/50 to-blue-50 border border-sky-200/90 rounded-xl shadow-xs text-slate-800">
            <div className="flex items-center justify-between gap-1.5 mb-1.5 sm:mb-2">
              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-sky-700 text-white px-1.5 sm:px-2 py-0.5 rounded-md">
                <BookOpen className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Official Exam Guide
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold bg-white text-sky-800 px-1.5 sm:px-2 py-0.5 rounded-full border border-sky-200">
                {card.mode}
              </span>
            </div>

            <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight mb-1.5 sm:mb-2">{card.name}</h4>

            <div className="bg-white p-1.5 sm:p-2 rounded-lg border border-sky-100 space-y-1 text-[10px] sm:text-[11px] mb-2">
              <div className="flex justify-between border-b border-slate-100 pb-0.5">
                <span className="text-slate-500 font-medium">Exam Duration:</span>
                <span className="font-bold text-slate-800">{card.duration}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-0.5">
                <span className="text-slate-500 font-medium">Pattern:</span>
                <span className="font-bold text-slate-800">{card.totalQs} Qs | {card.totalMarks} M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Syllabus Level:</span>
                <span className="font-bold text-teal-800">{card.syllabusLevel}</span>
              </div>
            </div>

            <a
              href={card.route}
              className="w-full flex items-center justify-center gap-1.5 bg-sky-700 hover:bg-sky-800 text-white font-bold py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-lg text-[11px] sm:text-xs transition-all shadow-2xs group"
            >
              <span>View Complete Exam Guide & PYQs</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        );

      case 'rank_predictor_widget':
        return <RankPredictorMiniWidget onPredict={(query) => handleSend(query)} />;

      case 'rank_prediction_result':
        return (
          <div className="mt-2.5 p-2.5 sm:p-3 bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-50 border border-emerald-200 rounded-xl shadow-2xs text-slate-800 space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-emerald-700 text-white px-1.5 sm:px-2 py-0.5 rounded-md">
                🎯 Predicted Options
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold bg-white text-emerald-800 border border-emerald-200 px-1.5 sm:px-2 py-0.5 rounded-full">
                Rank #{card.userRank} ({card.category})
              </span>
            </div>

            {card.topMatches && card.topMatches.length > 0 && (
              <div className="space-y-1 sm:space-y-1.5 mt-1.5 sm:mt-2">
                {card.topMatches.map((m, mIdx) => (
                  <div key={mIdx} className="bg-white p-1.5 sm:p-2 rounded-lg border border-emerald-100 flex items-center justify-between text-[11px] sm:text-xs gap-1.5">
                    <div className="min-w-0 flex-1">
                      <h5 className="font-bold text-slate-900 leading-tight truncate">{m.collegeName}</h5>
                      <p className="text-[10px] sm:text-[11px] text-teal-800 font-medium truncate">{m.branchName}</p>
                      <span className="text-[9px] sm:text-[10px] text-slate-500">Closing: Rank #{m.closingRank}</span>
                    </div>
                    <a
                      href={m.route}
                      className="text-[9.5px] sm:text-[10px] font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded shrink-0"
                    >
                      Profile →
                    </a>
                  </div>
                ))}
              </div>
            )}

            <a
              href={card.route || "/rank-predictor"}
              className="w-full flex items-center justify-center gap-1 bg-teal-800 hover:bg-teal-900 text-white font-bold py-1.5 px-2.5 sm:px-3 rounded-lg text-[10.5px] sm:text-xs transition-colors mt-1.5 sm:mt-2"
            >
              <span>Open Full Rank Predictor Page</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </a>
          </div>
        );

      case 'quick_links_card':
        return (
          <div className="mt-2.5 p-2.5 sm:p-3 bg-gradient-to-br from-teal-50/90 via-emerald-50/50 to-slate-50 border border-teal-200/90 rounded-xl shadow-xs text-slate-800">
            <div className="flex items-center justify-between gap-1.5 mb-1.5 sm:mb-2">
              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-teal-700 text-white px-1.5 sm:px-2 py-0.5 rounded-md">
                <Compass className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Quick Access Hub
              </span>
            </div>
            {card.title && <h4 className="font-bold text-[11.5px] sm:text-xs text-slate-900 mb-1.5 sm:mb-2 leading-snug">{card.title}</h4>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-1.5 sm:mb-2">
              {card.links?.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-white hover:bg-teal-50/90 border border-teal-100 hover:border-teal-300 rounded-lg text-xs font-semibold text-slate-800 transition-all shadow-2xs hover:shadow-xs group"
                >
                  <span className="text-xs sm:text-sm shrink-0">{link.icon || '📌'}</span>
                  <div className="flex flex-col min-w-0">
                    <span className="truncate text-[10.5px] sm:text-[11px] text-teal-950 group-hover:text-teal-700 font-bold">{link.label}</span>
                    {link.desc && <span className="truncate text-[9.5px] sm:text-[10px] text-slate-500 font-normal">{link.desc}</span>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        );

      case 'exam_directory_card':
        return (
          <div className="mt-2.5 p-2.5 sm:p-3 bg-gradient-to-br from-sky-50/90 via-indigo-50/40 to-slate-50 border border-sky-200/90 rounded-xl shadow-xs text-slate-800">
            <div className="flex items-center justify-between gap-1.5 mb-1.5 sm:mb-2">
              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-sky-700 text-white px-1.5 sm:px-2 py-0.5 rounded-md">
                <BookOpen className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Exam Directory
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold bg-white text-sky-800 px-1.5 sm:px-2 py-0.5 rounded-full border border-sky-200">
                All Streams
              </span>
            </div>
            <div className="space-y-1.5 mb-1">
              {card.categories?.map((cat, cIdx) => (
                <div key={cIdx} className="bg-white p-1.5 sm:p-2 rounded-lg border border-sky-100 shadow-2xs">
                  <span className="text-[9.5px] sm:text-[10px] font-bold text-sky-900 uppercase tracking-wide block mb-1 flex items-center gap-1">
                    <span>{cat.icon}</span> {cat.title}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cat.exams?.map((ex, eIdx) => (
                      <a
                        key={eIdx}
                        href={ex.url}
                        className="text-[9px] sm:text-[10px] font-medium bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md transition-colors inline-flex items-center gap-0.5 sm:gap-1"
                      >
                        <span className="truncate max-w-[120px] sm:max-w-none">{ex.name}</span>
                        <ArrowRight className="w-2.5 h-2.5 text-sky-600 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-5 sm:right-5 z-50 font-sans pointer-events-none" id="futurely-ai-chatbot-root">
      {/* Floating Toggle Button - Ultra-Polished Frosted Glass Capsule */}
      {!isOpen && (
        <div className="absolute bottom-3 right-3 sm:bottom-0 sm:right-0 pointer-events-auto">
          <button
            onClick={handleOpenChat}
            id="ai-chatbot-open-button"
            className="group relative flex items-center pl-3.5 pr-4 py-2 sm:py-2.5 rounded-full bg-white/95 hover:bg-white backdrop-blur-2xl border border-slate-200/90 hover:border-blue-400/90 shadow-[0_12px_32px_rgba(15,23,42,0.16),0_2px_6px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.25),0_4px_12px_rgba(37,99,235,0.12)] transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.97] cursor-pointer outline-none select-none"
            aria-label="Open AI Counselor Chat"
            title="Ask AI - Doubt Solver"
          >
            {/* Subtle Ambient Brand Aura on Hover */}
            <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-600/0 via-blue-500/20 to-indigo-600/0 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 pointer-events-none"></span>

            {/* Unified AI Sparkle Icon with Soft Indigo-Blue Glow Container */}
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/80 group-hover:from-blue-600 group-hover:to-indigo-600 text-blue-600 group-hover:text-white transition-all duration-300 shadow-2xs shrink-0">
              <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            </div>

            {/* Clear Typography Hierarchy (Bold Headline + Refined Subtext) */}
            <div className="pl-2.5 sm:pl-3 text-left leading-none flex flex-col justify-center gap-1">
              <div className="font-extrabold text-[13px] sm:text-[14px] text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                Ask AI
              </div>
              <div className="text-[10px] sm:text-[10.5px] text-slate-500 font-medium tracking-tight">
                Doubt Solver
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Chat Overlay Window: Full Screen Native App on Mobile, Floating Card on Desktop */}
      {isOpen && (
        <div
          id="ai-chatbot-window"
          className="pointer-events-auto chatbot-window-enter w-full h-[100dvh] sm:h-[600px] sm:w-[420px] sm:max-w-[420px] sm:max-h-[85vh] bg-white sm:rounded-3xl shadow-2xl border-0 sm:border sm:border-slate-200/90 flex flex-col overflow-hidden transition-all duration-300 fixed inset-0 sm:relative sm:inset-auto"
        >
          {/* Header - Transparent Logo & Crisp Typography */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white px-3.5 py-3 sm:py-3.5 flex items-center justify-between border-b border-blue-800/20 shadow-md shrink-0 pt-safe">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0">
                <Image width={48} height={48} src="/logo.png" alt="Futurely Logo" className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]" />
              </div>
              <div className="min-w-0">
                <h3 className="font-extrabold text-sm sm:text-[15px] tracking-tight text-white drop-shadow-sm truncate">Futurely AI Counselor</h3>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 ml-1">
              <button
                onClick={clearChat}
                title="Clear Chat History"
                className="p-1.5 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && window.speechSynthesis) {
                    try {
                      window.speechSynthesis.cancel();
                    } catch {
                      // ignore
                    }
                  }
                  if (isListening && recognitionRef.current) {
                    try {
                      recognitionRef.current.stop();
                    } catch {
                      // ignore
                    }
                    setIsListening(false);
                  }
                  setIsOpen(false);
                }}
                title="Close / Minimize"
                className="p-1.5 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors active:scale-95"
              >
                <ChevronDown className="w-5 h-5 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Page-Context Awareness Bar */}
          {contextInfo && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 px-2.5 sm:px-3 py-1 sm:py-1.5 flex items-center justify-between text-[10px] sm:text-[11px] text-blue-900 font-medium">
              <div className="flex items-center gap-1.5 truncate">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span className="truncate font-bold text-slate-800">
                  Viewing: <span className="text-blue-700">{contextInfo.label}</span>
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 px-1 sm:px-1.5 py-0.5 rounded shrink-0 flex items-center gap-1">
                <Compass className="w-2.5 h-2.5 text-blue-600" />
                Page Aware
              </span>
            </div>
          )}

          {/* Toast / Speech Notice Banner */}
          {speechNotice && (
            <div className="bg-orange-500 text-white text-[10px] sm:text-[11px] font-semibold px-3 py-1 text-center border-b border-orange-600 flex items-center justify-center gap-1 animate-in fade-in">
              <span>⚠️</span>
              <span>{speechNotice}</span>
            </div>
          )}

          {/* Quick Action Suggestion Bar */}
          <div className="bg-blue-50/50 border-b border-blue-100/80 px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none text-xs touch-pan-x">
            <span className="text-blue-900 font-bold text-[10px] sm:text-[11px] whitespace-nowrap flex items-center gap-1 shrink-0">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500 inline" /> Quick:
            </span>
            {(contextInfo?.prompts ? [...contextInfo.prompts, ...SUGGESTED_QUICK_PROMPTS] : SUGGESTED_QUICK_PROMPTS).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt.replace(/^[^\w\s]+/, '').trim())}
                className="whitespace-nowrap bg-white hover:bg-blue-600 hover:text-white text-slate-700 border border-blue-200/90 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-medium transition-all shadow-2xs hover:shadow-xs shrink-0 active:scale-95"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-2.5 sm:p-3.5 space-y-2.5 sm:space-y-3.5 bg-slate-50/60 [overflow-wrap:anywhere]">
            {messages.map((msg, idx) => {
              const isUser = msg.role === 'user';

              return (
                <div
                  key={idx}
                  className={`flex items-start gap-1.5 sm:gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold overflow-hidden ${
                      isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-blue-200/80 p-0.5 shadow-xs'
                    }`}
                  >
                    {isUser ? <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Image width={48} height={48} src="/logo.png" alt="Futurely Logo" className="w-full h-full object-contain" />}
                  </div>

                  <div
                    className={`max-w-[90%] sm:max-w-[88%] rounded-xl sm:rounded-2xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-[11px] sm:text-xs shadow-2xs break-words relative group ${
                      isUser
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs'
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    ) : (
                      <div className="text-slate-800 text-[11px] sm:text-[12px]">
                        {renderFormattedContent(msg.content)}
                        {msg.card && renderCardComponent(msg.card)}
                        <button
                          type="button"
                          onClick={() => handleCopyAnswer(msg.content, idx)}
                          title="Copy answer"
                          aria-label="Copy answer"
                          className="absolute top-1 right-1 p-1 rounded-md text-slate-400 hover:text-blue-700 hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                        >
                          {copiedIdx === idx ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border border-blue-200/80 p-0.5 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                  <Image width={48} height={48} src="/logo.png" alt="Futurely Logo" className="w-full h-full object-contain animate-pulse" />
                </div>
                <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl rounded-tl-none px-3.5 py-2 text-slate-500 shadow-2xs flex items-center gap-1.5">
                  <span className="flex gap-1 py-0.5">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Active Voice Listening Banner */}
          {isListening && (
            <div className="bg-rose-50 border-t border-rose-200 px-3 py-1.5 flex items-center justify-between text-xs text-rose-900 animate-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
                </span>
                <span className="font-bold text-[10.5px] sm:text-xs">
                  🎙️ Listening... Speak your query (transcribed in English)!
                </span>
              </div>
              <button
                onClick={toggleListening}
                className="text-[10px] font-bold bg-rose-600 text-white px-2 py-0.5 rounded hover:bg-rose-700 transition-colors"
              >
                Done
              </button>
            </div>
          )}

          {/* Input Area */}
          <div className="p-2.5 sm:p-3 bg-white border-t border-slate-200/90 flex items-center gap-2 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
            {/* Free Speech Recognition Mic Button */}
            <button
              onClick={toggleListening}
              type="button"
              className={`p-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center shrink-0 min-w-[38px] min-h-[38px] active:scale-95 ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse ring-2 ring-rose-300 shadow-rose-200'
                  : 'bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/90 hover:border-blue-300'
              }`}
              title={isListening ? "Stop Voice Input" : "Speak your question"}
            >
              {isListening ? (
                <MicOff className="w-4 h-4 text-white" />
              ) : (
                <Mic className="w-4 h-4 text-blue-600" />
              )}
            </button>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? "Listening... Speak your query..." : "Ask anything about syllabus, PYQs, cutoffs..."}
              rows={1}
              className="flex-1 bg-slate-50/80 hover:bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white resize-none min-h-[40px] max-h-24 leading-relaxed transition-all shadow-2xs"
            />

            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 text-white p-2.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center shrink-0 min-w-[38px] min-h-[38px] active:scale-95"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

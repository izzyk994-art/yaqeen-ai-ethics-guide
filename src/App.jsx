import React, { useState, useEffect } from "react";
import {
  Scale,
  BookOpen,
  ShieldCheck,
  Users,
  X,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Sparkles,
  Quote,
  HelpCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* DATA — sourced from "Toward an Islamic Ethics and Fiqh of          */
/* Artificial Intelligence," Yaqeen Institute for Islamic Research    */
/* ------------------------------------------------------------------ */

const PAPER_URL =
  "https://yaqeeninstitute.org/read/paper/toward-an-islamic-ethics-and-fiqh-of-artificial-intelligence";

const PILLARS = [
  {
    id: "truth",
    icon: BookOpen,
    title: "Preservation of Truth",
    arabic: "فقه الواقع",
    label: "Fiqh al-Waqiʿ — Jurisprudence of Reality",
    concept:
      "Scholars cannot issue meaningful guidance on AI without first understanding how it actually works. The paper insists on engaging empirical, technical reality before rendering ethical judgment — for instance, recognizing that large language models generate answers through statistical pattern matching, not genuine comprehension, which is decisive for whether their output belongs in a religious context.",
    quote:
      "Whoever does not understand the reality of creation and the obligation in religion will not understand God's rulings concerning His servants.",
    scholar: "Ibn al-Qayyim",
    citation: "Footnote 28 — Fiqh al-Waqiʿ (Considering Context and Reality)",
  },
  {
    id: "agency",
    icon: Users,
    title: "Human Agency & Consequence",
    arabic: "اعتبار المآلات",
    label: "Iʿtibar al-Maʾalat — Considering Consequences",
    concept:
      "Permissibility is never judged on immediate effect alone. The paper asks what a technology leads to over time: could AI tutoring erode the mentor–student bond, weaken independent thinking, or displace human teachers? This forward-looking lens includes sadd al-dharaʾiʿ — blocking a permissible-seeming path before it normalizes a greater harm, such as machines quietly assuming the place of human religious guidance.",
    quote:
      "Considering the consequences of actions is an established and intended principle in the Sharia.",
    scholar: "Al-Shatibi",
    citation: "Footnote 29 — Iʿtibar al-Maʾalat (Considering Consequences)",
  },
  {
    id: "harm",
    icon: ShieldCheck,
    title: "Harm Prevention",
    arabic: "درء المفاسد",
    label: "Darʾ al-Mafasid Muqaddam ʿala Jalb al-Masalih",
    concept:
      "When a benefit and a harm are bound together in the same technology, Islamic law does not average them — it gives structural priority to preventing harm. If an AI system could improve outcomes but also risks real damage, such as exposing children to harmful content, the paper holds that the harm is what governs the ruling, even at the cost of the benefit.",
    quote:
      "The foundation of the Sharia is wisdom and the safeguarding of people's interests in this world and the next. It is justice, mercy, benefit, and wisdom in its entirety.",
    scholar: "Ibn al-Qayyim",
    citation: "Footnote 20 — Foundations of Fiqh al-Muwazanat",
  },
];

const SCENARIOS = [
  {
    id: "translation",
    title: "AI for Translating & Indexing Classical Texts",
    short: "Cataloguing and cross-referencing the tradition",
    risk: "green",
    riskLabel: "Permissible — High Benefit",
    explanation:
      "Here AI functions as a tool (āla) with no autonomous claim to religious authority, serving preservation of knowledge (ḥifẓ al-dīn) and access to scholarship. Under tahqīq al-manāt this is a low-risk case — a search-and-index function, not a decision-making one — so the balance of maṣāliḥ over mafāsid favors clear permissibility.",
  },
  {
    id: "fatwa",
    title: "AI Chatbots Issuing Religious Rulings (Fatwas)",
    short: "Machines answering questions of Islamic law",
    risk: "red",
    riskLabel: "Impermissible — High Risk",
    explanation:
      "The paper is explicit that even where an AI cannot truly issue a ruling, letting AI-generated religious content circulate risks normalizing spiritual guidance from a machine — a harm sadd al-dharāʾiʿ exists to block before it takes root. Since darʾ al-mafāsid muqaddam ʿalā jalb al-maṣāliḥ, this speculative but serious harm to religious authority outweighs the convenience gained.",
  },
  {
    id: "media",
    title: "AI for Generating Educational Media",
    short: "Tutoring systems and generated learning content",
    risk: "yellow",
    riskLabel: "Caution — Strict Conditions Required",
    explanation:
      "Educational AI can genuinely improve outcomes, but the paper flags entangled risks: exposing children to harmful content, weakening independent thinking, or eroding the mentor–student relationship that transmits character, not just information. Iʿtibār al-maʾalāt demands these long-term effects be weighed, so use is conditional — permissible only with real safeguards, not by default.",
  },
];

const RISK_STYLES = {
  green: {
    ring: "ring-emerald-600/30",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-600",
    Icon: CheckCircle2,
  },
  yellow: {
    ring: "ring-amber-500/30",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
    Icon: AlertTriangle,
  },
  red: {
    ring: "ring-rose-600/30",
    bg: "bg-rose-50",
    text: "text-rose-700",
    dot: "bg-rose-600",
    Icon: XCircle,
  },
};

const QUIZ = [
  {
    id: "q1",
    question:
      "What does \"fiqh al-muwazanat\" refer to in this framework?",
    options: [
      "A blanket ban on AI technologies in Muslim communities",
      "A methodological framework for weighing competing benefits (maṣāliḥ) and harms (mafāsid)",
      "A technical standard for AI model transparency",
      "A fatwa specifically addressing social media use",
    ],
    correct: 1,
    explanation:
      "Fiqh al-muwazanat is the jurisprudence of balancing — a structured method for weighing competing interests when benefit and harm coexist.",
  },
  {
    id: "q2",
    question:
      "Why does the paper insist scholars understand how large language models actually generate responses?",
    options: [
      "It helps write better product marketing",
      "Because fiqh al-waqiʿ requires knowing that LLMs produce output via statistical pattern matching, not true comprehension, before ruling on their religious use",
      "It determines cloud server costs",
      "It is mandated by international AI regulation",
    ],
    correct: 1,
    explanation:
      "Fiqh al-waqiʿ — the jurisprudence of reality — demands scholars grasp AI's actual technical nature before issuing guidance, especially for religious contexts.",
  },
  {
    id: "q3",
    question:
      "Which maxim holds that Islamic law prioritizes preventing harm even at the cost of a benefit?",
    options: [
      "Al-yaqīn lā yazūlu bil-shakk",
      "Al-ʿāda muḥakkama",
      "Darʾ al-mafāsid muqaddam ʿalā jalb al-maṣāliḥ",
      "Al-ghunm bil-ghurm",
    ],
    correct: 2,
    explanation:
      "\"Preventing harm takes precedence over securing benefits\" — if an AI application offers benefit but poses real risk, the paper holds that preventing the harm governs the ruling.",
  },
];

/* ------------------------------------------------------------------ */
/* UI PRIMITIVES                                                      */
/* ------------------------------------------------------------------ */

function useGoogleFonts() {
  useEffect(() => {
    const id = "iaef-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="h-px w-8 bg-[#059669]" />
      <span className="text-xs tracking-[0.2em] uppercase text-[#059669] font-semibold">
        {children}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PILLAR DRAWER                                                      */
/* ------------------------------------------------------------------ */

function PillarDrawer({ pillar, onClose }) {
  if (!pillar) return null;
  const Icon = pillar.icon;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-sm animate-[fadeIn_.2s_ease-out]"
        onClick={onClose}
      />
      <div className="relative h-full w-full max-w-md bg-[#F8FAFC] shadow-2xl animate-[slideIn_.3s_ease-out] flex flex-col">
        <div className="bg-[#0F172A] px-6 py-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-300 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-xl bg-[#059669]/20 p-2.5 ring-1 ring-[#059669]/40">
              <Icon size={22} className="text-emerald-400" />
            </div>
            <span
              className="text-2xl text-emerald-400/80"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              {pillar.arabic}
            </span>
          </div>
          <h3
            className="text-2xl text-white leading-snug"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            {pillar.title}
          </h3>
          <p className="text-slate-400 text-sm mt-1">{pillar.label}</p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div>
            <SectionLabel>The Concept</SectionLabel>
            <p className="text-slate-700 leading-relaxed text-[15px]">
              {pillar.concept}
            </p>
          </div>

          <div className="rounded-xl bg-white ring-1 ring-slate-200 p-5 relative">
            <Quote
              size={28}
              className="text-emerald-600/20 absolute top-4 left-4"
            />
            <p
              className="text-slate-800 italic leading-relaxed text-[15px] pl-8 relative z-10"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              "{pillar.quote}"
            </p>
            <p className="text-right text-sm text-[#059669] font-semibold mt-3">
              — {pillar.scholar}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5 bg-slate-100 rounded-full px-3 py-1.5 ring-1 ring-slate-200">
              <BookOpen size={13} />
              {pillar.citation}
            </span>
          </div>

          <a
            href={PAPER_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#0F172A] hover:bg-[#1e293b] transition-colors text-white text-sm font-medium py-3"
          >
            Read the Full Paper <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN APP                                                            */
/* ------------------------------------------------------------------ */

export default function IslamicAIEthicsGuide() {
  useGoogleFonts();

  const [activePillar, setActivePillar] = useState(null);
  const [activeScenario, setActiveScenario] = useState(SCENARIOS[0].id);
  const [quizAnswers, setQuizAnswers] = useState({});

  const scenario = SCENARIOS.find((s) => s.id === activeScenario);
  const riskStyle = RISK_STYLES[scenario.risk];
  const RiskIcon = riskStyle.Icon;

  const score = QUIZ.reduce(
    (acc, q) => acc + (quizAnswers[q.id] === q.correct ? 1 : 0),
    0
  );
  const answeredCount = Object.keys(quizAnswers).length;

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-slate-800"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideIn { from { transform: translateX(100%) } to { transform: translateX(0) } }
        @keyframes riseIn { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>

      {/* ---------------- HERO ---------------- */}
      <header className="relative bg-[#0F172A] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #059669 0, transparent 45%), radial-gradient(circle at 80% 0%, #059669 0, transparent 40%)",
          }}
        />
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-14 relative">
          <div className="flex items-center gap-2 mb-6">
            <div className="rounded-full bg-[#059669]/15 p-2 ring-1 ring-[#059669]/40">
              <Scale size={18} className="text-emerald-400" />
            </div>
            <span className="text-emerald-400 text-xs tracking-[0.25em] uppercase font-semibold">
              Yaqeen Institute for Islamic Research
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl text-white leading-[1.1] max-w-2xl"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Interactive Guide: Islamic Ethics &amp; AI
          </h1>
          <p className="text-slate-400 text-base sm:text-lg mt-4 max-w-xl leading-relaxed">
            An interactive exploration of Yaqeen Institute's research,{" "}
            <span className="text-slate-300">
              "Toward an Islamic Ethics and Fiqh of Artificial Intelligence."
            </span>
          </p>
          <a
            href={PAPER_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-7 text-sm text-emerald-400 hover:text-emerald-300 transition-colors border-b border-emerald-400/30 pb-0.5"
          >
            Read the source paper <ExternalLink size={14} />
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6">
        {/* ---------------- PILLARS ---------------- */}
        <section className="py-14">
          <SectionLabel>Foundational Pillars</SectionLabel>
          <h2
            className="text-2xl sm:text-3xl text-[#0F172A] mb-8"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Three principles of the muwazanat framework
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePillar(p)}
                  className="text-left rounded-xl bg-white ring-1 ring-slate-200 p-6 hover:ring-[#059669]/50 hover:shadow-lg hover:shadow-emerald-900/5 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform" />
                  <div className="relative">
                    <div className="rounded-lg bg-[#0F172A] w-11 h-11 flex items-center justify-center mb-5">
                      <Icon size={20} className="text-emerald-400" />
                    </div>
                    <h3
                      className="text-lg text-[#0F172A] mb-1.5 leading-snug"
                      style={{ fontFamily: "Fraunces, serif" }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">{p.label}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#059669] group-hover:gap-2 transition-all">
                      Explore concept <ChevronRight size={14} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ---------------- SCENARIO CHECKER ---------------- */}
        <section className="py-14 border-t border-slate-200">
          <SectionLabel>Apply the Framework</SectionLabel>
          <h2
            className="text-2xl sm:text-3xl text-[#0F172A] mb-2"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Interactive scenario checker
          </h2>
          <p className="text-slate-500 mb-8 max-w-xl">
            Select a real-world AI use case to see how fiqh al-muwazanat
            weighs its benefits against its harms.
          </p>

          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {SCENARIOS.map((s) => {
              const active = s.id === activeScenario;
              const style = RISK_STYLES[s.risk];
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveScenario(s.id)}
                  className={`text-left rounded-xl p-4 ring-1 transition-all ${
                    active
                      ? "ring-transparent"
                      : "bg-white ring-slate-200 hover:ring-slate-300"
                  }`}
                  style={active ? { backgroundColor: "#0F172A" } : undefined}
                >
                  <span
                    className={`inline-block w-2 h-2 rounded-full mb-3 ${style.dot}`}
                  />
                  <p
                    className="text-sm font-medium leading-snug"
                    style={{ color: active ? "#FFFFFF" : "#0F172A" }}
                  >
                    {s.title}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: active ? "#94A3B8" : "#64748B" }}
                  >
                    {s.short}
                  </p>
                </button>
              );
            })}
          </div>

          <div
            key={scenario.id}
            className={`rounded-xl ring-1 ${riskStyle.ring} ${riskStyle.bg} p-6 sm:p-8`}
            style={{ animation: "riseIn .25s ease-out" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <RiskIcon size={26} className={riskStyle.text} />
              <span
                className={`text-sm sm:text-base font-bold tracking-wide ${riskStyle.text}`}
              >
                {scenario.riskLabel}
              </span>
            </div>
            <p className="text-slate-700 leading-relaxed text-[15px] mb-6">
              {scenario.explanation}
            </p>
            <a
              href={PAPER_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg transition-colors text-sm font-medium px-4 py-2.5"
              style={{ backgroundColor: "#0F172A", color: "#FFFFFF" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e293b")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0F172A")}
            >
              Read in Paper (PDF) <ExternalLink size={14} />
            </a>
          </div>
        </section>

        {/* ---------------- KNOWLEDGE CHECK ---------------- */}
        <section className="py-14 border-t border-slate-200">
          <SectionLabel>Test Your Understanding</SectionLabel>
          <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
            <h2
              className="text-2xl sm:text-3xl text-[#0F172A]"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Knowledge check
            </h2>
            {answeredCount === QUIZ.length && (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 ring-1 ring-emerald-200 text-emerald-700 text-sm font-semibold px-4 py-2">
                <Sparkles size={15} />
                {score} / {QUIZ.length} correct
              </span>
            )}
          </div>

          <div className="space-y-5">
            {QUIZ.map((q, qi) => {
              const answered = quizAnswers[q.id];
              return (
                <div
                  key={q.id}
                  className="rounded-xl bg-white ring-1 ring-slate-200 p-6"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0F172A] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {qi + 1}
                    </span>
                    <p className="text-[#0F172A] font-medium leading-snug pt-0.5">
                      {q.question}
                    </p>
                  </div>

                  <div className="space-y-2 pl-10">
                    {q.options.map((opt, oi) => {
                      const isCorrect = oi === q.correct;
                      const isPicked = answered === oi;
                      let cls =
                        "w-full text-left text-sm rounded-lg px-4 py-3 ring-1 transition-all flex items-center justify-between gap-2 ";
                      if (answered === undefined) {
                        cls +=
                          "ring-slate-200 hover:ring-[#059669]/50 hover:bg-emerald-50/40 text-slate-700";
                      } else if (isCorrect) {
                        cls += "ring-emerald-500 bg-emerald-50 text-emerald-800";
                      } else if (isPicked && !isCorrect) {
                        cls += "ring-rose-500 bg-rose-50 text-rose-800";
                      } else {
                        cls += "ring-slate-100 text-slate-400";
                      }
                      return (
                        <button
                          key={oi}
                          disabled={answered !== undefined}
                          onClick={() =>
                            setQuizAnswers((prev) => ({
                              ...prev,
                              [q.id]: oi,
                            }))
                          }
                          className={cls}
                        >
                          <span>{opt}</span>
                          {answered !== undefined && isCorrect && (
                            <CheckCircle2
                              size={16}
                              className="text-emerald-600 flex-shrink-0"
                            />
                          )}
                          {answered !== undefined &&
                            isPicked &&
                            !isCorrect && (
                              <XCircle
                                size={16}
                                className="text-rose-600 flex-shrink-0"
                              />
                            )}
                        </button>
                      );
                    })}
                  </div>

                  {answered !== undefined && (
                    <div
                      className="ml-10 mt-4 flex gap-2 text-sm text-slate-600 bg-slate-50 rounded-lg p-4 ring-1 ring-slate-100"
                      style={{ animation: "riseIn .2s ease-out" }}
                    >
                      <HelpCircle
                        size={16}
                        className="text-[#059669] flex-shrink-0 mt-0.5"
                      />
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <footer className="py-10 border-t border-slate-200 text-center text-xs text-slate-400">
          Based on "Toward an Islamic Ethics and Fiqh of Artificial
          Intelligence," Yaqeen Institute for Islamic Research. This guide is
          an educational companion, not a substitute for the full paper.
        </footer>
      </main>

      <PillarDrawer pillar={activePillar} onClose={() => setActivePillar(null)} />
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Sparkles,
  PanelRight,
  Search,
  X,
  Brain,
  MessageCircle,
  BookOpen,
  Target,
  NotebookPen,
  Star,
  CalendarDays,
  Bell,
  Wallet,
  GraduationCap,
  Flag,
  Mic,
  ArrowUp,
  ArrowRight,
  Send,
} from "lucide-react";
import jagguImg from "@/assets/jaggu-morning.png";
import { cn } from "@/lib/utils";

type Mood = {
  greeting: string;
  sub: string;
  emoji: string;
  glow: string;
};

function useTimeOfDay(): { period: string; mood: Mood } {
  const hour = new Date().getHours();
  return useMemo(() => {
    if (hour < 12)
      return {
        period: "morning",
        mood: {
          greeting: "Good Morning, Mahavir",
          sub: "Ready to make today count?",
          emoji: "☀️",
          glow: "rgba(245,158,11,0.25)",
        },
      };
    if (hour < 17)
      return {
        period: "afternoon",
        mood: {
          greeting: "Good Afternoon, Mahavir",
          sub: "Locked in. Let's keep the momentum.",
          emoji: "⚡",
          glow: "rgba(139,92,246,0.3)",
        },
      };
    if (hour < 21)
      return {
        period: "evening",
        mood: {
          greeting: "Good Evening, Mahavir",
          sub: "Time to wind down and reflect.",
          emoji: "🌇",
          glow: "rgba(167,139,250,0.28)",
        },
      };
    return {
      period: "night",
      mood: {
        greeting: "Good Night, Mahavir",
        sub: "Resting easy. I've got everything covered.",
        emoji: "🌙",
        glow: "rgba(99,102,241,0.25)",
      },
    };
  }, [hour]);
}

const archiveCategories = [
  { icon: Brain, label: "Memories", count: 42, emoji: "🧠" },
  { icon: MessageCircle, label: "Conversations", count: 128, emoji: "💬" },
  { icon: BookOpen, label: "Learnings", count: 17, emoji: "📚" },
  { icon: Target, label: "Goals", count: 6, emoji: "🎯" },
  { icon: NotebookPen, label: "Reflections", count: 23, emoji: "📝" },
  { icon: Star, label: "Favorites", count: 9, emoji: "⭐" },
];

const quickActions = [
  { icon: CalendarDays, label: "Plan My Day", hint: "5 tasks waiting" },
  { icon: Brain, label: "Remember Something", hint: "Capture a thought" },
  { icon: Bell, label: "Set Reminder", hint: "Never forget" },
  { icon: Wallet, label: "Financial Check", hint: "₹6,350 pending" },
  { icon: GraduationCap, label: "What Did I Learn?", hint: "3 new notes" },
  { icon: Flag, label: "Review Goals", hint: "On track" },
];

const memories = [
  { emoji: "📌", category: "Finance", date: "Today", title: "Rahul owes ₹500", preview: "Lent during the trip — remind on Friday." },
  { emoji: "💡", category: "Idea", date: "Yesterday", title: "Startup Idea", preview: "AI companion for solo founders. Validate market." },
  { emoji: "📚", category: "Learning", date: "2 days ago", title: "SQL Learning Roadmap", preview: "Joins → indexes → query optimization." },
  { emoji: "🛂", category: "Personal", date: "5 days ago", title: "Passport Renewal", preview: "Expires in 3 months. Book appointment." },
];

const chatExamples = [
  "How much did I spend on food?",
  "What are my priorities today?",
  "What did I learn from that startup video?",
];

export function CompanionScreen() {
  const { period, mood } = useTimeOfDay();
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [reflection, setReflection] = useState("");
  const [message, setMessage] = useState("");
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const transcriptTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (recording) {
      const words = "What are my priorities today and what should I focus on first".split(" ");
      let i = 0;
      setTranscript("");
      transcriptTimer.current = setInterval(() => {
        i++;
        setTranscript(words.slice(0, i).join(" "));
        if (i >= words.length) {
          if (transcriptTimer.current) clearInterval(transcriptTimer.current);
        }
      }, 220);
    }
    return () => {
      if (transcriptTimer.current) clearInterval(transcriptTimer.current);
    };
  }, [recording]);

  const stopRecording = () => {
    setRecording(false);
    if (transcript) setMessage(transcript);
    setTranscript("");
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* ambient background glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, rgba(139,92,246,0.16), transparent 70%), radial-gradient(50% 30% at 90% 20%, rgba(167,139,250,0.08), transparent 70%)",
        }}
      />

      {/* TOP APP BAR */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-[14px] bg-[var(--gradient-primary)] shadow-[0_0_18px_-2px_rgba(139,92,246,0.7)]">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight">MyOS</span>
          </div>
          <span className="font-heading text-sm font-semibold text-muted-foreground">Companion</span>
          <button
            onClick={() => setArchiveOpen(true)}
            aria-label="Open archive"
            className="grid h-10 w-10 place-items-center rounded-[14px] border border-border bg-elevated/60 text-foreground transition-all hover:border-primary/60 hover:bg-elevated hover:shadow-[0_0_18px_-4px_rgba(139,92,246,0.6)]"
          >
            <PanelRight className="h-5 w-5" />
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-2xl px-5 pb-40 pt-4">
        {/* SECTION 1 — JAGGU HERO */}
        <section className="relative flex flex-col items-center pt-6 text-center">
          <div className="relative">
            <div
              className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{ background: mood.glow }}
            />
            <motion.img
              src={jagguImg}
              alt="Jaggu the panda companion"
              width={1024}
              height={1024}
              className="animate-float h-52 w-52 select-none object-contain drop-shadow-[0_20px_40px_rgba(139,92,246,0.35)]"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
            <div className="absolute right-6 top-6 flex items-center gap-1.5 rounded-full border border-border bg-elevated/80 px-2.5 py-1 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-success" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span className="text-[11px] font-medium text-muted-foreground">Online</span>
            </div>
          </div>
          <motion.h1
            className="mt-2 font-heading text-2xl font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {mood.greeting} {mood.emoji}
          </motion.h1>
          <p className="mt-1.5 font-assistant text-[15px] text-muted-foreground">{mood.sub}</p>
        </section>

        {/* SECTION 2 — QUICK ACTIONS */}
        <SectionTitle className="mt-9">Quick Actions</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((a, i) => (
            <motion.button
              key={a.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="glass group flex flex-col items-start gap-3 rounded-[var(--radius-companion)] p-4 text-left transition-all hover:border-primary/50 hover:shadow-[0_8px_30px_-12px_rgba(139,92,246,0.5)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-primary/15 text-secondary transition-colors group-hover:bg-primary/25">
                <a.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-heading text-sm font-semibold">{a.label}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{a.hint}</span>
              </span>
            </motion.button>
          ))}
        </div>

        {/* SECTION 3 — RECENT MEMORIES */}
        <div className="mt-9 flex items-center justify-between">
          <SectionTitle className="mb-0">Recent Memories</SectionTitle>
          <button className="flex items-center gap-1 text-xs font-medium text-secondary hover:text-primary">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="mt-3 space-y-3">
          {memories.map((m, i) => (
            <motion.button
              key={m.title}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              whileTap={{ scale: 0.99 }}
              className="group flex w-full items-start gap-3 rounded-[var(--radius-companion)] border border-border bg-surface/80 p-4 text-left transition-all hover:border-primary/50 hover:bg-elevated"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-elevated text-lg">
                {m.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary">
                    {m.category}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{m.date}</span>
                </span>
                <span className="mt-1.5 block font-heading text-sm font-semibold">{m.title}</span>
                <span className="mt-0.5 block truncate text-xs text-muted-foreground">{m.preview}</span>
              </span>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.button>
          ))}
        </div>

        {/* SECTION 4 — DAILY REFLECTION */}
        <SectionTitle className="mt-9">Daily Reflection</SectionTitle>
        <div className="glass rounded-[var(--radius-companion)] p-5">
          <div className="flex items-center gap-3">
            <img src={jagguImg} alt="" className="h-10 w-10 object-contain" />
            <p className="font-assistant text-[15px] font-medium leading-snug">
              What was today's biggest win?
            </p>
          </div>
          <div className="mt-4 rounded-[16px] border border-border bg-background/60 p-1 focus-within:border-primary/60">
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              rows={2}
              placeholder="Write it down — even the small wins count…"
              className="w-full resize-none bg-transparent px-3 py-2 font-assistant text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
            />
            <div className="flex items-center justify-between px-2 pb-1">
              <span className="text-[11px] text-muted-foreground">Jaggu remembers this for you</span>
              <button
                disabled={!reflection.trim()}
                className="flex items-center gap-1.5 rounded-full bg-[var(--gradient-primary)] px-3.5 py-1.5 text-xs font-semibold text-white transition-opacity disabled:opacity-40"
              >
                Save <Send className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 5 — COMPANION INSIGHT */}
        <SectionTitle className="mt-9">Companion Insight</SectionTitle>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-[var(--radius-companion)] border border-primary/40 p-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.18), rgba(39,39,42,0.7))",
          }}
        >
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full blur-3xl"
            style={{ background: "rgba(139,92,246,0.4)" }}
          />
          <div className="relative flex items-start gap-3">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-primary/40 blur-md" />
              <img src={jagguImg} alt="Jaggu" className="relative h-12 w-12 object-contain" />
            </div>
            <div className="flex-1">
              <span className="font-heading text-xs font-semibold uppercase tracking-widest text-secondary">
                Jaggu noticed
              </span>
              <p className="mt-1 font-heading text-lg font-bold leading-snug">
                You have <span className="text-secondary">₹6,350</span> pending from reimbursements.
              </p>
              <p className="mt-1 font-assistant text-sm text-muted-foreground">
                Want me to draft a follow-up so you can claim it before month end?
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="rounded-full bg-[var(--gradient-primary)] px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_24px_-8px_rgba(139,92,246,0.8)]">
                  Draft follow-up
                </button>
                <button className="rounded-full border border-border bg-elevated/60 px-4 py-2 text-xs font-semibold text-foreground hover:bg-elevated">
                  Remind me later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* BOTTOM CHAT BAR */}
      <div className="fixed inset-x-0 bottom-0 z-30">
        <div className="pointer-events-none h-12 bg-gradient-to-t from-background to-transparent" />
        <div className="bg-background/80 px-5 pb-6 pt-1 backdrop-blur-xl">
          <div className="mx-auto max-w-2xl">
            {!recording && (
              <div className="no-scrollbar mb-2 flex gap-2 overflow-x-auto">
                {chatExamples.map((e) => (
                  <button
                    key={e}
                    onClick={() => setMessage(e)}
                    className="shrink-0 rounded-full border border-border bg-surface/80 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    {e}
                  </button>
                ))}
              </div>
            )}
            <motion.div
              animate={
                recording
                  ? { boxShadow: "0 0 0 2px rgba(139,92,246,0.6), 0 0 40px -8px rgba(139,92,246,0.7)" }
                  : { boxShadow: "0 0 0 1px rgba(63,63,70,0.6)" }
              }
              className="flex items-center gap-2 rounded-[20px] bg-elevated/80 p-2 backdrop-blur"
            >
              {recording ? (
                <div className="flex flex-1 items-center gap-3 px-3">
                  <div className="flex items-end gap-0.5">
                    {[0, 1, 2, 3, 4].map((b) => (
                      <motion.span
                        key={b}
                        className="w-1 rounded-full bg-secondary"
                        animate={{ height: [6, 18, 6] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: b * 0.12 }}
                      />
                    ))}
                  </div>
                  <span className="flex-1 truncate font-assistant text-sm text-foreground">
                    {transcript || "Listening…"}
                  </span>
                </div>
              ) : (
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask Jaggu anything..."
                  className="flex-1 bg-transparent px-3 font-assistant text-sm text-foreground placeholder:text-muted-foreground/80 focus:outline-none"
                />
              )}
              <button
                onClick={() => (recording ? stopRecording() : setRecording(true))}
                aria-label={recording ? "Stop recording" : "Voice input"}
                className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-[14px] transition-all",
                  recording
                    ? "bg-error text-white"
                    : "bg-primary/15 text-secondary hover:bg-primary/25"
                )}
              >
                {recording ? <X className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
              {!recording && (
                <button
                  disabled={!message.trim()}
                  aria-label="Send"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-[14px] bg-[var(--gradient-primary)] text-white transition-opacity disabled:opacity-40"
                >
                  <ArrowUp className="h-5 w-5" />
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* SLIDE-OUT ARCHIVE SIDEBAR */}
      <AnimatePresence>
        {archiveOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setArchiveOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col border-l border-border bg-surface"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div>
                  <h2 className="font-heading text-lg font-bold">My Archive</h2>
                  <p className="text-xs text-muted-foreground">Your second brain</p>
                </div>
                <button
                  onClick={() => setArchiveOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-[12px] border border-border bg-elevated/60 hover:bg-elevated"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="px-5 py-4">
                <div className="flex items-center gap-2 rounded-[14px] border border-border bg-background/60 px-3 py-2.5 focus-within:border-primary/60">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    placeholder="Search your memories…"
                    className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/70 focus:outline-none"
                  />
                </div>
              </div>

              <div className="no-scrollbar flex-1 space-y-2 overflow-y-auto px-5 pb-6">
                {archiveCategories.map((c) => (
                  <button
                    key={c.label}
                    className="group flex w-full items-center gap-3 rounded-[16px] border border-border bg-elevated/40 p-3.5 text-left transition-all hover:border-primary/50 hover:bg-elevated"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-primary/15 text-lg">
                      {c.emoji}
                    </span>
                    <span className="flex-1">
                      <span className="block font-heading text-sm font-semibold">{c.label}</span>
                      <span className="text-xs text-muted-foreground">{c.count} items</span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("mb-3 font-heading text-base font-bold tracking-tight", className)}>
      {children}
    </h2>
  );
}

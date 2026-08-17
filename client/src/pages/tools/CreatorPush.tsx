import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock, Zap, Share2, Image, Type, BarChart3, ChevronRight, Copy, Check, Send, Trash2, Plus, Sparkles } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PLATFORMS = ["Twitter/X", "Instagram", "TikTok", "Reddit", "OnlyFans", "Fansly", "ManyVids"] as const;
const CONTENT_TYPES = ["Teaser Clip", "PPV Promo", "Poll", "Story Preview", "Live Announcement", "Routine Update"] as const;

type Post = {
  id: string;
  date: string;
  time: string;
  platform: typeof PLATFORMS[number];
  type: typeof CONTENT_TYPES[number];
  caption: string;
  status: "scheduled" | "draft" | "sent";
};

const INITIAL_POSTS: Post[] = [
  { id: "1", date: "2026-07-24", time: "10:00", platform: "Twitter/X", type: "Teaser Clip", caption: "New drop arriving tonight... 🔥", status: "scheduled" },
  { id: "2", date: "2026-07-24", time: "14:30", platform: "Instagram", type: "Story Preview", caption: "Behind the scenes of today's shoot", status: "draft" },
  { id: "3", date: "2026-07-25", time: "09:00", platform: "TikTok", type: "Routine Update", caption: "POV: you just subscribed", status: "scheduled" },
  { id: "4", date: "2026-07-25", time: "18:00", platform: "Reddit", type: "PPV Promo", caption: "Full video dropping on OF this weekend", status: "draft" },
];

const OPTIMAL_TIMES: Record<string, string[]> = {
  "Twitter/X": ["9:00 AM", "12:00 PM", "6:00 PM"],
  "Instagram": ["11:00 AM", "2:00 PM", "8:00 PM"],
  "TikTok": ["7:00 AM", "12:00 PM", "9:00 PM"],
  "Reddit": ["8:00 AM", "1:00 PM", "7:00 PM"],
  "OnlyFans": ["10:00 AM", "3:00 PM", "10:00 PM"],
  "Fansly": ["10:00 AM", "4:00 PM", "11:00 PM"],
  "ManyVids": ["9:00 AM", "2:00 PM", "8:00 PM"],
};

export default function CreatorPush() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("Twitter/X");
  const [contentType, setContentType] = useState<string>("Teaser Clip");
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("2026-07-24");
  const [time, setTime] = useState("10:00");
  const [teaserIntensity, setTeaserIntensity] = useState(5);
  const [copied, setCopied] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [generatedCaptions, setGeneratedCaptions] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCaptionMutation = trpc.tools.generateCreatorPushCaption.useMutation();

  const addPost = () => {
    if (!caption.trim()) return;
    const newPost: Post = {
      id: Date.now().toString(),
      date,
      time,
      platform: selectedPlatform,
      type: contentType as any,
      caption,
      status: "draft",
    };
    setPosts([...posts, newPost]);
    setCaption("");
    setShowScheduleModal(false);
  };

  const removePost = (id: string) => setPosts(posts.filter(p => p.id !== id));

  const getOptimalTimes = (platform: string) => OPTIMAL_TIMES[platform] || OPTIMAL_TIMES["Twitter/X"];

  const calculateReachScore = (platform: string, hour: string) => {
    const h = parseInt(hour.split(":")[0]);
    const optimal = getOptimalTimes(platform).map(t => parseInt(t.split(":")[0]));
    const distance = Math.min(...optimal.map(o => Math.abs(o - h)));
    return Math.max(0, 100 - distance * 15);
  };

  const getWeekDays = () => {
    const days: { date: string; day: string }[] = [];
    const start = new Date("2026-07-20");
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push({
        date: d.toISOString().split("T")[0],
        day: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
      });
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <section className="relative overflow-hidden border-b border-slate-800 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-950/30 via-slate-950 to-pink-950/20" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5">
              <Calendar className="h-3.5 w-3.5 text-rose-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-rose-300">CreatorPush</span>
            </div>
            <h1 className="font-display text-4xl font-black leading-tight md:text-5xl">
              Content Calendar<br />
              <span className="text-rose-400">Built for Creators</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400 font-body">
              Schedule, optimize, and cross-post across every adult creator platform. AI-powered timing suggestions maximize engagement while you sleep.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container py-12 space-y-10 max-w-7xl">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Scheduled", value: posts.filter(p => p.status === "scheduled").length, icon: Calendar, color: "text-emerald-400" },
            { label: "Drafts", value: posts.filter(p => p.status === "draft").length, icon: FileText, color: "text-amber-400" },
            { label: "Platforms", value: new Set(posts.map(p => p.platform)).size, icon: Share2, color: "text-violet-400" },
            { label: "This Week", value: posts.length, icon: Clock, color: "text-blue-400" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="border border-slate-800 rounded-xl p-4 bg-slate-900/40">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                  <span className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold text-slate-100">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar & Queue */}
          <div className="lg:col-span-2 space-y-6">
            {/* Week Grid */}
            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-rose-400" />
                Week of July 20 — 26, 2026
              </h2>
              <div className="grid grid-cols-7 gap-2">
                {getWeekDays().map((day) => {
                  const dayPosts = posts.filter(p => p.date === day.date);
                  return (
                    <div key={day.date} className="border border-slate-800 rounded-lg p-2 min-h-[100px] bg-slate-950/50">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{day.day}</p>
                      <div className="space-y-1">
                        {dayPosts.map((post) => (
                          <div key={post.id} className={`text-[10px] p-1.5 rounded border truncate cursor-pointer ${
                            post.status === "scheduled" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" :
                            post.status === "sent" ? "border-blue-500/30 bg-blue-500/10 text-blue-300" :
                            "border-amber-500/30 bg-amber-500/10 text-amber-300"
                          }`}>
                            <div className="font-semibold truncate">{post.platform}</div>
                            <div className="text-slate-400 truncate">{post.time} • {post.type}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Post Queue */}
            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Type className="h-5 w-5 text-rose-400" />
                  Content Queue
                </h2>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowScheduleModal(true)} className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-colors">
                  <Plus size={14} /> Add Post
                </motion.button>
              </div>
              <div className="space-y-3">
                <AnimatePresence>
                  {posts.map((post) => (
                    <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-start gap-4 p-4 border border-slate-800 rounded-lg bg-slate-950/50">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-rose-300">{post.platform}</span>
                          <span className="text-[10px] text-slate-500">•</span>
                          <span className="text-xs text-slate-400">{post.type}</span>
                          <span className="text-[10px] text-slate-500">•</span>
                          <span className="text-xs text-slate-400">{post.date} @ {post.time}</span>
                        </div>
                        <p className="text-sm text-slate-300 truncate">{post.caption}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        post.status === "scheduled" ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" :
                        post.status === "sent" ? "border-blue-500/30 text-blue-400 bg-blue-500/10" :
                        "border-amber-500/30 text-amber-400 bg-amber-500/10"
                      }`}>{post.status}</span>
                      <button onClick={() => removePost(post.id)} className="p-1.5 border border-slate-800 rounded-lg hover:border-red-500/50 text-slate-500 hover:text-red-400 transition-all">
                        <Trash2 size={12} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Sidebar Tools */}
          <div className="space-y-6">
            {/* Optimal Posting Times */}
            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-400" />
                AI Optimal Times
              </h3>
              <div className="space-y-3">
                {getOptimalTimes(selectedPlatform).map((time, i) => (
                  <button key={i} onClick={() => setTime(time)} className={`w-full text-left p-3 rounded-lg border transition-all ${time === time ? "border-rose-500/30 bg-rose-500/10" : "border-slate-800 bg-slate-950/50 hover:border-slate-700"}`}>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-300">{time}</span>
                      <span className={`text-[10px] font-bold ${i === 0 ? "text-emerald-400" : i === 1 ? "text-amber-400" : "text-slate-500"}`}>{i === 0 ? "Peak" : i === 1 ? "High" : "Good"}</span>
                    </div>
                    <div className="mt-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${i === 0 ? "bg-emerald-500 w-full" : i === 1 ? "bg-amber-500 w-3/4" : "bg-slate-600 w-1/2"}`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Teaser Intensity */}
            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-pink-400" />
                Teaser Intensity
              </h3>
              <input type="range" min="1" max="10" value={teaserIntensity} onChange={(e) => setTeaserIntensity(Number(e.target.value))} className="w-full accent-rose-500" />
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-slate-500">Subtle</span>
                <span className="text-xs font-bold text-rose-400">{teaserIntensity}/10</span>
                <span className="text-[10px] text-slate-500">Explicit</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-3 text-center">Recommended: 6-8 for OF promos, 3-5 for Twitter</p>
            </div>

            {/* Quick Caption Suggestions */}
            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-white">Quick Hooks</h3>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={async () => {
                    setIsGenerating(true);
                    setGeneratedCaptions(null);
                    try {
                      const result = await generateCaptionMutation.mutateAsync({
                        platform: selectedPlatform,
                        contentType,
                        tone: "Playful & Flirty",
                        goal: "Engagement",
                        intensity: teaserIntensity,
                      });
                      setGeneratedCaptions(result.content);
                      toast.success("AI captions generated!");
                    } catch (err) {
                      toast.error("Failed to generate captions");
                    } finally {
                      setIsGenerating(false);
                    }
                  }}
                  disabled={isGenerating}
                  className="px-3 py-1 bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-bold rounded flex items-center gap-1 transition-colors disabled:opacity-50"
                >
                  <Sparkles size={10} /> AI Generate
                </motion.button>
              </div>

              {isGenerating && (
                <div className="py-4 text-center">
                  <div className="w-4 h-4 border-2 border-violet-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-[10px] text-slate-500">AI is crafting captions...</p>
                </div>
              )}

              {generatedCaptions && (
                <div className="mb-4 p-3 border border-violet-500/30 rounded-lg bg-violet-500/5">
                  <p className="text-[10px] text-violet-300 whitespace-pre-line">{generatedCaptions}</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedCaptions);
                      toast.success("Copied to clipboard!");
                    }}
                    className="mt-2 text-[10px] text-violet-400 hover:text-violet-300 flex items-center gap-1"
                  >
                    <Copy size={10} /> Copy captions
                  </button>
                </div>
              )}

              <div className="space-y-2">
                {[
                  "Something unexpected is coming...",
                  "You've never seen this angle before 🔥",
                  "Last chance before the vault closes",
                  "POV: you're the first to see this",
                ].map((hook, i) => (
                  <button key={i} onClick={() => setCaption(hook)} className="w-full text-left p-2.5 rounded-lg border border-slate-800 bg-slate-950/50 hover:border-rose-500/30 text-xs text-slate-400 hover:text-slate-200 transition-all">
                    {hook}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      <AnimatePresence>
        {showScheduleModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowScheduleModal(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-bold text-white mb-4">Schedule New Post</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Platform</label>
                    <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)} className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm font-body">
                      {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Content Type</label>
                    <select value={contentType} onChange={(e) => setContentType(e.target.value)} className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm font-body">
                      {CONTENT_TYPES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm font-body" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Time</label>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm font-body" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Caption</label>
                  <textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="What's on your mind?" className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm font-body h-24 resize-none" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setShowScheduleModal(false)} className="flex-1 py-2.5 border border-slate-700 rounded-lg text-slate-300 text-sm font-semibold hover:bg-slate-800 transition-colors">Cancel</button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={addPost} className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-sm font-bold transition-colors">Schedule Post</motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

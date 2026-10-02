import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, Settings, Code, Copy, Check, Send, Bot, User, Sparkles, Shield, Zap, Trash2, Plus } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TONES = ["Playful & Flirty", "Professional & Polished", "Dominant/CEO", "Sweet & Intimate", "Mysterious & Enigmatic", "Educational/Girlfriend Experience"] as const;
const PLATFORMS = ["Embeddable Widget", "Twitter/X DM", "Discord Bot", "Telegram Bot", "FanVAULT", "Custom API"] as const;

type Message = { role: "user" | "bot"; text: string };
type FAQ = { id: string; question: string; answer: string };

export default function FanBotPro() {
  const [botName, setBotName] = useState("Aria");
  const [tone, setTone] = useState<string>("Playful & Flirty");
  const [platform, setPlatform] = useState<string>("Embeddable Widget");
  const [personality, setPersonality] = useState("Friendly, attentive, remembers subscriber names, loves personalized interactions, but maintains professional boundaries.");
  const [faqs, setFaqs] = useState<FAQ[]>([
    { id: "1", question: "What are your rates?", answer: "My subscription is $15/month and includes daily posts, PPV specials, and 24/7 chat access." },
    { id: "2", question: "Do you do custom requests?", answer: "Yes! Send me a message with your idea and I'll get back to you within 24 hours." },
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([{ role: "bot", text: `Hey there! I'm ${botName} 💕 How can I help you today?` }]);
  const [chatInput, setChatInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"config" | "preview" | "embed">("config");
  const [isGenerating, setIsGenerating] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const generateChatResponse = trpc.tools.generateFanBotResponse.useMutation();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const addFAQ = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    setFaqs([...faqs, { id: Date.now().toString(), question: newQuestion, answer: newAnswer }]);
    setNewQuestion("");
    setNewAnswer("");
  };

  const removeFAQ = (id: string) => setFaqs(faqs.filter(f => f.id !== id));

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg: Message = { role: "user", text: chatInput };
    setChatMessages([...chatMessages, userMsg]);
    const userText = chatInput;
    setChatInput("");
    setIsGenerating(true);

    generateChatResponse.mutateAsync({
      botName,
      personality,
      tone,
      userMessage: userText,
      faqs: faqs.map(f => ({ question: f.question, answer: f.answer })),
    }).then((response) => {
      const botMsg: Message = { role: "bot", text: response.response };
      setChatMessages(prev => [...prev, botMsg]);
      toast.success("AI response generated");
    }).catch((err) => {
      console.error(err);
      const fallbackResponses = [
        "Thanks for asking! I'd love to help with that 😊",
        "You're so sweet! Here's what you need to know...",
        "I appreciate you being a loyal subscriber! 💕",
        "That's a great question. Let me explain...",
        "I love when you ask these things 🥰",
      ];
      const botMsg: Message = { role: "bot", text: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)] };
      setChatMessages(prev => [...prev, botMsg]);
      toast.error("AI response failed, using fallback");
    }).finally(() => {
      setIsGenerating(false);
    });
  };

  const embedCode = `<iframe src="https://blacklisted.studio/tools/fanbot-widget/${botName.toLowerCase()}" width="350" height="500" frameborder="0" style="border-radius: 16px; background: #0f172a;"></iframe>`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <section className="relative overflow-hidden border-b border-slate-800 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-slate-950 to-purple-950/20" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5">
              <Bot className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">FanBot Pro</span>
            </div>
            <h1 className="font-display text-4xl font-black leading-tight md:text-5xl">
              Build Your AI<br />
              <span className="text-violet-400">Fan Assistant</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400 font-body">
              Configure a custom AI chatbot that mimics your texting style, handles fan pre-sales, and manages tip menu inquiries 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container py-12 max-w-7xl">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-800 pb-0">
          {[
            { id: "config", label: "Configuration", icon: Settings },
            { id: "preview", label: "Live Preview", icon: MessageSquare },
            { id: "embed", label: "Embed Code", icon: Code },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${activeTab === tab.id ? "border-violet-500 text-violet-400" : "border-transparent text-slate-500 hover:text-slate-300"}`}>
                <Icon size={14} /> {tab.label}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Config Panel */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {activeTab === "config" && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                  {/* Bot Identity */}
                  <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-violet-400" />
                      Bot Identity
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-slate-300 mb-1 block">Bot Name</label>
                        <input type="text" value={botName} onChange={(e) => setBotName(e.target.value)} className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-violet-500" />
                      </div>
                      <div>
                        <label className="text-sm text-slate-300 mb-1 block">Personality Brief</label>
                        <textarea value={personality} onChange={(e) => setPersonality(e.target.value)} className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm h-24 resize-none focus:outline-none focus:border-violet-500" placeholder="Describe how your bot should act..." />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-slate-300 mb-1 block">Tone</label>
                          <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm">
                            {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-sm text-slate-300 mb-1 block">Deploy Platform</label>
                          <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm">
                            {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FAQ Editor */}
                  <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-violet-400" />
                      Knowledge Base
                    </h3>
                    <div className="space-y-3 mb-4">
                      {faqs.map((faq) => (
                        <div key={faq.id} className="p-3 border border-slate-800 rounded-lg bg-slate-950/50">
                          <div className="flex justify-between items-start mb-1">
                            <p className="text-xs font-semibold text-violet-300">Q: {faq.question}</p>
                            <button onClick={() => removeFAQ(faq.id)} className="text-slate-500 hover:text-red-400 transition-colors">
                              <Trash2 size={12} />
                            </button>
                          </div>
                          <p className="text-xs text-slate-400">A: {faq.answer}</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <input type="text" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} placeholder="Add a new FAQ question..." className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-body focus:outline-none focus:border-violet-500" />
                      <input type="text" value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} placeholder="Answer..." className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-body focus:outline-none focus:border-violet-500" />
                      <button onClick={addFAQ} className="w-full py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1">
                        <Plus size={12} /> Add FAQ
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "preview" && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="border border-slate-800 rounded-xl p-6 bg-slate-900/40 h-[600px] flex flex-col">
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-800">
                    <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{botName}</p>
                      <p className="text-[10px] text-emerald-400">Online • {tone}</p>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
                    <AnimatePresence>
                      {chatMessages.map((msg, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                          {msg.role === "bot" && <Bot className="h-5 w-5 text-violet-400 mt-1 flex-shrink-0" />}
                          <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${msg.role === "user" ? "bg-violet-600 text-white rounded-br-md" : "bg-slate-800 text-slate-200 rounded-bl-md border border-slate-700"}`}>
                            {msg.text}
                          </div>
                          {msg.role === "user" && <User className="h-5 w-5 text-slate-400 mt-1 flex-shrink-0" />}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <div ref={chatEndRef} />
                  </div>
                  <div className="flex gap-2 pt-4 border-t border-slate-800">
                    <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChatMessage()} placeholder="Type a message..." className="flex-1 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm font-body focus:outline-none focus:border-violet-500" />
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={sendChatMessage} disabled={isGenerating} className="p-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors disabled:opacity-50">
                      {isGenerating ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send size={16} />}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {activeTab === "embed" && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
                  <h3 className="text-lg font-semibold text-white mb-4">Embed Code</h3>
                  <p className="text-xs text-slate-400 mb-4">Paste this code into your website, link-in-bio page, or profile to embed your {botName} assistant.</p>
                  <div className="relative">
                    <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-xs text-emerald-400 overflow-x-auto font-mono leading-relaxed">
                      {embedCode}
                    </pre>
                    <button onClick={() => { navigator.clipboard.writeText(embedCode); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="absolute top-3 right-3 p-2 border border-slate-800 rounded-lg hover:border-slate-700 bg-slate-900 text-slate-400 hover:text-white transition-all flex items-center gap-1 text-xs font-semibold">
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="mt-4 p-4 border border-violet-500/20 rounded-lg bg-violet-500/5">
                    <p className="text-xs text-slate-400 mb-2">Integration Options:</p>
                    <div className="flex flex-wrap gap-2">
                      {["WordPress", "Wix", "Squarespace", "React", "HTML5", "Link in Bio"].map((opt) => (
                        <span key={opt} className="px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-[10px] text-slate-300">{opt}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[
                      { label: "24/7 Availability", desc: "Never miss a potential sale" },
                      { label: "Auto-Responses", desc: "Instant FAQ handling" },
                      { label: "Lead Capture", desc: "Collect fan details" },
                    ].map((feat) => (
                      <div key={feat.label} className="p-3 border border-slate-800 rounded-lg bg-slate-950/50 text-center">
                        <p className="text-xs font-semibold text-white">{feat.label}</p>
                        <p className="text-[10px] text-slate-500 mt-1">{feat.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right sidebar - Live Preview Desktop */}
          <div className="hidden lg:block">
            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40 h-full">
              <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Live Preview</h3>
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950 h-[500px] flex flex-col">
                <div className="flex items-center justify-between p-3 border-b border-slate-800 bg-slate-900/50">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[10px] text-slate-500">your-site.com/chat</span>
                </div>
                <div className="flex-1 p-4 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{botName}</p>
                      <p className="text-[10px] text-emerald-400">Active now</p>
                    </div>
                    <span className="ml-auto px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-400">Bot</span>
                  </div>
                  <div className="flex-1 space-y-3">
                    {chatMessages.slice(-4).map((msg, i) => (
                      <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[75%] p-2.5 rounded-xl text-[11px] ${msg.role === "user" ? "bg-violet-600 text-white" : "bg-slate-800 text-slate-200 border border-slate-700"}`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

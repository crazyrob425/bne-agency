import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Workflow, Zap, Play, Plus, Trash2, Settings, GitBranch, MessageSquare, Calendar, Users, ArrowRight, CheckCircle2, Crown } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Node {
  id: string;
  type: "trigger" | "action" | "delay" | "condition";
  label: string;
  description: string;
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  steps: number;
  icon: React.ElementType;
}

const TEMPLATES: WorkflowTemplate[] = [
  { id: "new-sub", name: "New Subscriber Flow", description: "Welcome DM → Add to list → Discord webhook", steps: 3, icon: Users },
  { id: "tip-thanks", name: "Tip Thank You", description: "Tip received → Auto-reply → Loyalty tag", steps: 3, icon: MessageSquare },
  { id: "re-engage", name: "Re-Engagement Loop", description: "7 days inactive → Send teaser → Offer discount", steps: 3, icon: Zap },
  { id: "content-push", name: "Content Push", description: "New post → Auto-schedule 3 platforms → Analytics check", steps: 4, icon: Calendar },
  { id: "ppv-funnel", name: "PPV Funnel", description: "Poll results → Targeted PPV offer → Follow-up sequence", steps: 4, icon: GitBranch },
  { id: "vip-tracker", name: "VIP Tracker", description: "High spender flag → Exclusive content alert → Personal check-in", steps: 3, icon: Crown },
];

const DEFAULT_NODES: Node[] = [
  { id: "1", type: "trigger", label: "New Subscriber", description: "When a new fan subscribes" },
  { id: "2", type: "action", label: "Send Welcome DM", description: "Deliver personalized greeting" },
  { id: "3", type: "delay", label: "Wait 24 Hours", description: "Allow fan to explore content" },
  { id: "4", type: "action", label: "Send Tip Menu", description: "Share your current tip menu" },
];

export default function AutoPilotStudio() {
  const [nodes, setNodes] = useState<Node[]>(DEFAULT_NODES);
  const [activeWorkflow, setActiveWorkflow] = useState<string>("new-sub");
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addNode = (type: Node["type"]) => {
    const labels: Record<Node["type"], string> = { trigger: "New Trigger", action: "New Action", delay: "Add Delay", condition: "Add Condition" };
    setNodes([...nodes, { id: Date.now().toString(), type, label: labels[type], description: "Configure this step..." }]);
  };

  const removeNode = (id: string) => setNodes(nodes.filter(n => n.id !== id));

  const runSimulation = () => {
    setIsRunning(true);
    setLogs([]);
    const steps = [
      "Trigger: New subscriber detected (user: fan_2847)",
      "Action: Sending welcome DM...",
      "Success: DM delivered in 0.3s",
      "Delay: Waiting 24 hours...",
      "Reminder set for: Tomorrow at 10:00 AM",
      "Action: Tip menu queued for delivery",
      "Workflow completed successfully ✓",
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i >= steps.length) { clearInterval(interval); setIsRunning(false); return; }
      setLogs(prev => [...prev, steps[i]]);
      i++;
    }, 600);
  };

  const getNodeColor = (type: Node["type"]) => {
    switch (type) {
      case "trigger": return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
      case "action": return "border-blue-500/30 bg-blue-500/10 text-blue-400";
      case "delay": return "border-amber-500/30 bg-amber-500/10 text-amber-400";
      case "condition": return "border-violet-500/30 bg-violet-500/10 text-violet-400";
    }
  };

  const getNodeIcon = (type: Node["type"]) => {
    switch (type) {
      case "trigger": return Zap;
      case "action": return Play;
      case "delay": return Clock;
      case "condition": return GitBranch;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <section className="relative overflow-hidden border-b border-slate-800 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-slate-950 to-violet-950/20" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5">
              <Workflow className="h-3.5 w-3.5 text-indigo-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300">AutoPilot Studio</span>
            </div>
            <h1 className="font-display text-4xl font-black leading-tight md:text-5xl">
              No-Code Workflow<br />
              <span className="text-indigo-400">Automation</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400 font-body">
              Build fan lifecycle automations without writing a single line of code. Welcome sequences, re-engagement loops, and VIP tracking — on autopilot.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container py-12 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Template Library */}
          <div className="lg:col-span-1 space-y-6">
            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <h3 className="text-sm font-semibold text-white mb-4">Workflow Templates</h3>
              <div className="space-y-3">
                {TEMPLATES.map((template) => {
                  const Icon = template.icon;
                  return (
                    <button key={template.id} onClick={() => { setActiveWorkflow(template.id); setNodes(DEFAULT_NODES); }} className={`w-full text-left p-4 rounded-lg border transition-all ${activeWorkflow === template.id ? "border-indigo-500/30 bg-indigo-500/10" : "border-slate-800 bg-slate-950/50 hover:border-slate-700"}`}>
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${activeWorkflow === template.id ? "bg-indigo-500/20" : "bg-slate-800"}`}>
                          <Icon size={16} className={activeWorkflow === template.id ? "text-indigo-400" : "text-slate-500"} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-200">{template.name}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{template.description}</p>
                          <p className="text-[10px] text-slate-600 mt-1">{template.steps} steps</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <h3 className="text-sm font-semibold text-white mb-4">Add Nodes</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { type: "trigger" as Node["type"], label: "Trigger" },
                  { type: "action" as Node["type"], label: "Action" },
                  { type: "delay" as Node["type"], label: "Delay" },
                  { type: "condition" as Node["type"], label: "Condition" },
                ].map((nodeType) => {
                  const Icon = nodeType.type === "trigger" ? Zap : nodeType.type === "action" ? Play : nodeType.type === "delay" ? Clock : GitBranch;
                  return (
                    <button key={nodeType.type} onClick={() => addNode(nodeType.type)} className="p-3 border border-slate-800 rounded-lg bg-slate-950/50 hover:border-indigo-500/30 text-center transition-all">
                      <Icon size={16} className="text-slate-400 mx-auto mb-1" />
                      <span className="text-[10px] text-slate-400">{nodeType.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Workflow Canvas */}
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40 min-h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-semibold text-white">Workflow Canvas</h3>
                <div className="flex gap-2">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={runSimulation} disabled={isRunning} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50">
                    <Play size={12} /> Run Simulation
                  </motion.button>
                  <button className="px-4 py-2 border border-slate-700 rounded-lg text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2">
                    <Settings size={12} /> Configure
                  </button>
                </div>
              </div>

              <div className="relative">
                {/* Vertical connector line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2" />

                <div className="space-y-4">
                  <AnimatePresence>
                    {nodes.map((node, index) => {
                      const Icon = getNodeIcon(node.type);
                      return (
                        <motion.div key={node.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="relative flex items-center gap-4">
                          <div className="flex-1 flex justify-end">
                            {index % 2 === 0 && (
                              <div className={`max-w-[80%] p-4 rounded-xl border ${getNodeColor(node.type)}`}>
                                <div className="flex items-center gap-2 mb-2">
                                  <Icon size={14} />
                                  <span className="text-xs font-bold uppercase tracking-wider">{node.type}</span>
                                </div>
                                <p className="text-sm font-semibold text-white">{node.label}</p>
                                <p className="text-[11px] opacity-70 mt-1">{node.description}</p>
                              </div>
                            )}
                          </div>

                          {/* Connector dot */}
                          <div className="relative z-10 w-8 h-8 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-slate-400">{index + 1}</span>
                          </div>

                          <div className="flex-1">
                            {index % 2 === 1 && (
                              <div className={`max-w-[80%] p-4 rounded-xl border ${getNodeColor(node.type)}`}>
                                <div className="flex items-center gap-2 mb-2">
                                  <Icon size={14} />
                                  <span className="text-xs font-bold uppercase tracking-wider">{node.type}</span>
                                </div>
                                <p className="text-sm font-semibold text-white">{node.label}</p>
                                <p className="text-[11px] opacity-70 mt-1">{node.description}</p>
                              </div>
                            )}
                          </div>

                          <button onClick={() => removeNode(node.id)} className="absolute -right-2 top-2 p-1.5 border border-slate-800 rounded-lg hover:border-red-500/50 text-slate-500 hover:text-red-400 transition-all bg-slate-900">
                            <Trash2 size={10} />
                          </button>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Execution Logs */}
            {logs.length > 0 && (
              <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-indigo-400" />
                  Execution Log
                </h3>
                <div className="space-y-2">
                  <AnimatePresence>
                    {logs.map((log, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-950/50 border border-slate-800">
                        <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                        <span className="text-xs text-slate-300 font-mono">{log}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Integrations */}
            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <h3 className="text-sm font-semibold text-white mb-4">Available Integrations</h3>
              <div className="flex flex-wrap gap-2">
                {["Twitter/X", "Discord", "Telegram", "OnlyFans", "Fansly", "ManyVids", "Stripe", "Email"].map((integration) => (
                  <span key={integration} className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950/50 text-[11px] text-slate-400 hover:border-indigo-500/30 hover:text-slate-200 transition-all cursor-default">
                    {integration}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

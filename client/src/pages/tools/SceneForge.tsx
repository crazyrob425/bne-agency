import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Camera, Type, Plus, Trash2, GripVertical, Sparkles, Clock, MapPin, Lightbulb, Download, Play } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Scene {
  id: string;
  title: string;
  description: string;
  location: string;
  lighting: string;
  poses: string;
  duration: string;
  order: number;
}

const DEFAULT_SCENES: Scene[] = [
  {
    id: "1",
    title: "Opening Tease",
    description: "Slow reveal, building anticipation with close-ups and lingering shots.",
    location: "Bedroom - Natural Light",
    lighting: "Soft window light, sheer curtains",
    poses: "Lying on bed, sitting at edge, standing by window",
    duration: "3-5 min",
    order: 1,
  },
  {
    id: "2",
    title: "Main Content",
    description: "Core performance piece with multiple angles and pacing variations.",
    location: "Studio Setup - Controlled",
    lighting: "Ring light + warm accent lights",
    poses: "Center frame, side angles, close-ups",
    duration: "8-12 min",
    order: 2,
  },
  {
    id: "3",
    title: "Closing Scene",
    description: "Wind down, call-to-action, personal sign-off.",
    location: "Same as opening for consistency",
    lighting: "Dimmed warm tones",
    poses: "Sitting, waving, blowing kiss",
    duration: "2-3 min",
    order: 3,
  },
];

export default function SceneForge() {
  const [scenes, setScenes] = useState<Scene[]>(DEFAULT_SCENES);
  const [niche, setNiche] = useState("GFE/Companionship");
  const [vibe, setVibe] = useState("Sensual & Intimate");
  const [setting, setSetting] = useState("Bedroom / Home Studio");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStoryboard, setGeneratedStoryboard] = useState<string | null>(null);

  const generateStoryboard = trpc.tools.generateSceneStoryboard.useMutation();

  const addScene = () => {
    const newScene: Scene = {
      id: Date.now().toString(),
      title: "New Scene",
      description: "Describe this scene...",
      location: "TBD",
      lighting: "Natural",
      poses: "",
      duration: "5 min",
      order: scenes.length + 1,
    };
    setScenes([...scenes, newScene]);
  };

  const removeScene = (id: string) => {
    setScenes(scenes.filter(s => s.id !== id));
  };

  const updateScene = (id: string, field: keyof Scene, value: string) => {
    setScenes(scenes.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const moveScene = (index: number, direction: "up" | "down") => {
    const newScenes = [...scenes];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newScenes.length) return;
    [newScenes[index], newScenes[newIndex]] = [newScenes[newIndex], newScenes[index]];
    newScenes.forEach((s, i) => s.order = i + 1);
    setScenes(newScenes);
  };

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    setGeneratedStoryboard(null);
    try {
      const result = await generateStoryboard.mutateAsync({
        niche,
        sceneCount: scenes.length,
        vibe,
        setting,
      });
      setGeneratedStoryboard(result.storyboard);
      toast.success("AI storyboard generated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate storyboard");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = () => {
    const text = scenes.map((s, i) =>
      `SCENE ${i + 1}: ${s.title}\n\n` +
      `Description: ${s.description}\n` +
      `Location: ${s.location}\n` +
      `Lighting: ${s.lighting}\n` +
      `Poses: ${s.poses}\n` +
      `Duration: ${s.duration}\n` +
      `---`
    ).join("\n\n");
    navigator.clipboard.writeText(text);
    toast.success("Storyboard copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <section className="relative overflow-hidden border-b border-slate-800 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/30 via-slate-950 to-rose-950/20" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5">
              <Camera className="h-3.5 w-3.5 text-orange-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-orange-300">SceneForge</span>
            </div>
            <h1 className="font-display text-4xl font-black leading-tight md:text-5xl">
              Content Shot<br />
              <span className="text-orange-400">Storyboard Planner</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400 font-body">
              Plan your shoots visually. Map out scenes, poses, lighting, and locations before you hit record. AI can generate scene ideas based on your niche.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container py-12 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Settings Panel */}
          <div className="space-y-6">
            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-orange-400" />
                Shoot Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Content Niche</label>
                  <select value={niche} onChange={(e) => setNiche(e.target.value)} className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm font-body">
                    <option>GFE/Companionship</option>
                    <option>FemDom/Findom</option>
                    <option>ASMR/Audio</option>
                    <option>BDSM/Kink</option>
                    <option>Cosplay/Fantasy</option>
                    <option>Fit/Athletic</option>
                    <option>POV/Amateur</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Vibe / Tone</label>
                  <select value={vibe} onChange={(e) => setVibe(e.target.value)} className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm font-body">
                    <option>Sensual & Intimate</option>
                    <option>Playful & Teasing</option>
                    <option>Hard Edge/Dominant</option>
                    <option>Mysterious/Anonymous</option>
                    <option>Educational/Guide Style</option>
                    <option>Raw & Authentic</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Setting / Location</label>
                  <input type="text" value={setting} onChange={(e) => setSetting(e.target.value)} className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm font-body" placeholder="e.g. Bedroom, Studio, Outdoor..." />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="w-full py-4 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Sparkles className="h-5 w-5" />
              {isGenerating ? "Generating Scenes..." : "Generate AI Storyboard"}
            </motion.button>

            {generatedStoryboard && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-orange-500/30 rounded-xl p-4 bg-orange-500/5"
              >
                <h4 className="text-sm font-semibold text-orange-300 mb-2">AI Generated Ideas</h4>
                <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">{generatedStoryboard}</p>
              </motion.div>
            )}

            <button onClick={handleExport} className="w-full py-3 border border-slate-700 rounded-lg text-slate-300 text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
              <Download className="h-4 w-4" /> Export Storyboard
            </button>
          </div>

          {/* Scene Timeline */}
          <div className="lg:col-span-2">
            <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Camera className="h-5 w-5 text-orange-400" />
                  Scene Timeline
                </h3>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={addScene} className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-colors">
                  <Plus size={14} /> Add Scene
                </motion.button>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {scenes.map((scene, index) => (
                    <motion.div
                      key={scene.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="border border-slate-800 rounded-lg p-4 bg-slate-950/50 relative"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-l-lg" />
                      <div className="flex items-start justify-between mb-3 pl-3">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">SCENE {scene.order}</span>
                          <input
                            type="text"
                            value={scene.title}
                            onChange={(e) => updateScene(scene.id, "title", e.target.value)}
                            className="bg-transparent text-sm font-semibold text-white border-b border-transparent hover:border-slate-700 focus:border-orange-500 outline-none px-1"
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => moveScene(index, "up")} disabled={index === 0} className="p-1 border border-slate-800 rounded hover:border-slate-600 text-slate-500 disabled:opacity-30">
                            <GripVertical size={12} />
                          </button>
                          <button onClick={() => moveScene(index, "down")} disabled={index === scenes.length - 1} className="p-1 border border-slate-800 rounded hover:border-slate-600 text-slate-500 disabled:opacity-30">
                            <GripVertical size={12} />
                          </button>
                          <button onClick={() => removeScene(scene.id)} className="p-1 border border-slate-800 rounded hover:border-red-500/50 text-slate-500 hover:text-red-400 transition-all ml-2">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 pl-3">
                        <div>
                          <label className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1">
                            <Type size={10} /> Description
                          </label>
                          <textarea
                            value={scene.description}
                            onChange={(e) => updateScene(scene.id, "description", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-300 mt-1 h-16 resize-none focus:outline-none focus:border-orange-500"
                            placeholder="What happens in this scene?"
                          />
                        </div>
                        <div className="space-y-2">
                          <div>
                            <label className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1">
                              <MapPin size={10} /> Location
                            </label>
                            <input
                              type="text"
                              value={scene.location}
                              onChange={(e) => updateScene(scene.id, "location", e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-300 mt-1 focus:outline-none focus:border-orange-500"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1">
                              <Lightbulb size={10} /> Lighting
                            </label>
                            <input
                              type="text"
                              value={scene.lighting}
                              onChange={(e) => updateScene(scene.id, "lighting", e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-300 mt-1 focus:outline-none focus:border-orange-500"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-[10px] text-slate-500 uppercase tracking-wider">Poses / Actions</label>
                          <input
                            type="text"
                            value={scene.poses}
                            onChange={(e) => updateScene(scene.id, "poses", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-300 mt-1 focus:outline-none focus:border-orange-500"
                            placeholder="e.g. Lying down, sitting up, close-ups..."
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center gap-1">
                            <Clock size={10} /> Duration
                          </label>
                          <input
                            type="text"
                            value={scene.duration}
                            onChange={(e) => updateScene(scene.id, "duration", e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-300 mt-1 focus:outline-none focus:border-orange-500"
                            placeholder="e.g. 5-8 min"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

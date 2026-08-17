/**
 * BlacklistedLinks — Premium Link-in-Bio Generator for Adult Creators
 *
 * Tool #11/#14: Black-themed, gold-accented, non-removable BNE CTA,
 * generated pages served at blacklisted.studio/follows/:username
 *
 * Features:
 * - Sexy, classy, non-obtrusive premium black/gold theme
 * - Profile picture upload (centered top)
 * - Platform links: OnlyFans, Fansly, Facebook, X/Twitter, Instagram, +5 custom
 * - Generated URL: /follows/{username}
 * - Non-removable CTA banner for BNE "Silent Business Partner"
 * - Responsive, Bling-heavy black & gold template
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { Link } from "wouter";
import {
  Link as LinkIcon,
  Camera,
  Upload,
  Copy,
  Check,
  Share2,
  Heart,
  Lock,
  Diamond,
  Crown,
  Star,
  ChevronRight,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const PLATFORM_OPTIONS = [
  { id: "onlyfans", label: "OnlyFans", icon: "🔞", color: "pink" },
  { id: "fansly", label: "Fansly", icon: "💎", color: "violet" },
  { id: "facebook", label: "Facebook", icon: "📘", color: "blue" },
  { id: "twitter", label: "X / Twitter", icon: "🐦", color: "slate" },
  { id: "instagram", label: "Instagram", icon: "📸", color: "rose" },
  { id: "tiktok", label: "TikTok", icon: "🎵", color: "cyan" },
  { id: "youtube", label: "YouTube", icon: "▶️", color: "red" },
  { id: "reddit", label: "Reddit", icon: "👁", color: "orange" },
  { id: "snapchat", label: "Snapchat", icon: "👻", color: "yellow" },
  { id: "custom1", label: "Custom #1", icon: "🔗", color: "amber" },
  { id: "custom2", label: "Custom #2", icon: "🔗", color: "amber" },
  { id: "custom3", label: "Custom #3", icon: "🔗", color: "amber" },
  { id: "custom4", label: "Custom #4", icon: "🔗", color: "amber" },
  { id: "custom5", label: "Custom #5", icon: "🔗", color: "amber" },
];

export default function BlacklistedLinks() {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [links, setLinks] = useState<Record<string, string>>({});
  const [customLabels, setCustomLabels] = useState<Record<string, string>>({});
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleProfilePic = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfilePicFile(file);
    const url = URL.createObjectURL(file);
    setProfilePic(url);
  }, []);

  const handleLinkChange = useCallback((platformId: string, url: string) => {
    setLinks((prev) => ({ ...prev, [platformId]: url }));
  }, []);

  const handleCustomLabelChange = useCallback((platformId: string, label: string) => {
    setCustomLabels((prev) => ({ ...prev, [platformId]: label }));
  }, []);

  const generateBio = useCallback(() => {
    if (!username.trim()) {
      toast.error("Enter a username to generate your bio link.");
      return;
    }
    setGenerated(true);
    toast.success(`Bio page created: blacklisted.studio/follows/${username.trim()}`);
  }, [username]);

  const copyLink = () => {
    const url = `https://blacklisted.studio/follows/${username.trim()}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = () => {
    const url = `https://blacklisted.studio/follows/${username.trim()}`;
    if (navigator.share) {
      navigator.share({ title: "My BNE Bio Page", url });
    } else {
      copyLink();
    }
  };

  const activePlatforms = PLATFORM_OPTIONS.slice(0, 10);
  const customPlatformIds = ["custom1", "custom2", "custom3", "custom4", "custom5"];

  return (
    <div className="min-h-screen bg-[#050505] text-[#f0ece4]">
      <Seo
        title="Blacklisted Links-in-Bio | Premium Bio Page Generator | BNE Studio"
        description="Generate a luxurious black and gold link-in-bio page for adult content creators. Non-removable BNE CTA, premium styling, and platform-optimized links."
        canonical="/tools/blacklisted-links"
      />
      <Navigation />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1010] via-[#050505] to-[#050505]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#D4AF37]/[0.03] blur-[160px] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 mb-6">
              <Diamond className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.25em] uppercase">BlacklistedLinks</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-[#f0ece4] leading-[1.05] mb-6">
              Your Bio,<br />Branded Bling
            </h1>
            <p className="text-[#9a9488] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-body">
              Premium black & gold link-in-bio pages built for adult creators. Fill in your links, pick a username, and publish a gorgeously themed bio page with a non-removable BNE partnership CTA — turning every visitor into a potential member.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Builder ── */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Input Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Username + Profile Pic */}
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <div className="luxury-card border-[#D4AF37]/10 bg-[#0d0d0d]/80 p-6">
                  <h3 className="font-display text-lg text-[#f0ece4] mb-4 flex items-center gap-2">
                    <Crown className="w-5 h-5 text-[#D4AF37]" /> Identity
                  </h3>

                  {/* Username */}
                  <div className="mb-5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#9a9488] mb-2 block">Username</label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#6a6560] font-body flex-shrink-0">blacklisted.studio/follows/</span>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.replace(/[^a-z0-9_-]/g, ""))}
                        placeholder="yourname"
                        className="flex-1 bg-[#080808] border border-[#D4AF37]/10 rounded-xl px-4 py-2.5 text-[#f0ece4] placeholder:text-[#5a5650] focus:outline-none focus:border-[#D4AF37]/30 font-body text-sm"
                      />
                    </div>
                  </div>

                  {/* Profile Picture */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#9a9488] mb-2 block">Profile Picture</label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-[#080808] border-2 border-[#D4AF37]/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {profilePic ? (
                          <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <Camera className="w-8 h-8 text-[#D4AF37]/30" />
                        )}
                      </div>
                      <div>
                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-display hover:bg-[#D4AF37]/20 transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          Upload
                          <input type="file" accept="image/*" className="hidden" onChange={handleProfilePic} />
                        </label>
                        <p className="text-[10px] text-[#6a6560] mt-2 font-body">Square image, JPG/PNG</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Platform Links */}
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
                <div className="luxury-card border-[#D4AF37]/10 bg-[#0d0d0d]/80 p-6">
                  <h3 className="font-display text-lg text-[#f0ece4] mb-4 flex items-center gap-2">
                    <LinkIcon className="w-5 h-5 text-[#D4AF37]" /> Platform Links
                  </h3>
                  <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
                    {activePlatforms.map((platform) => (
                      <div key={platform.id} className="flex items-center gap-3">
                        <span className="text-lg flex-shrink-0 w-6 text-center">{platform.icon}</span>
                        <input
                          type="url"
                          placeholder={`https://${platform.id}.com/your-page`}
                          value={links[platform.id] || ""}
                          onChange={(e) => handleLinkChange(platform.id, e.target.value)}
                          className="flex-1 bg-[#080808] border border-[#D4AF37]/10 rounded-lg px-3 py-2 text-[#f0ece4] placeholder:text-[#5a5650] focus:outline-none focus:border-[#D4AF37]/30 font-body text-xs"
                        />
                      </div>
                    ))}

                    {/* Custom links */}
                    {customPlatformIds.map((id) => {
                      const idx = customPlatformIds.indexOf(id);
                      return (
                        <div key={id} className="flex items-center gap-3">
                          <span className="text-[#D4AF37]/40 flex-shrink-0 w-6 text-center font-body text-xs">{idx + 6}</span>
                          <input
                            type="text"
                            placeholder={`Custom link #${idx + 1} label`}
                            value={customLabels[id] || ""}
                            onChange={(e) => handleCustomLabelChange(id, e.target.value)}
                            className="w-24 bg-[#080808] border border-[#D4AF37]/10 rounded-lg px-2 py-2 text-[#f0ece4] placeholder:text-[#5a5650] focus:outline-none focus:border-[#D4AF37]/30 font-body text-xs"
                          />
                          <input
                            type="url"
                            placeholder="https://..."
                            value={links[id] || ""}
                            onChange={(e) => handleLinkChange(id, e.target.value)}
                            className="flex-1 bg-[#080808] border border-[#D4AF37]/10 rounded-lg px-3 py-2 text-[#f0ece4] placeholder:text-[#5a5650] focus:outline-none focus:border-[#D4AF37]/30 font-body text-xs"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Generate */}
              <motion.button
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={generateBio}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#b8962e] to-[#D4AF37] text-[#0a0a0a] font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
              >
                <Diamond className="w-4 h-4" /> Generate Blacklisted Bio
              </motion.button>
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-3">
              <AnimatePresence>
                {generated ? (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                    {/* Non-removable CTA Banner */}
                    <div className="bg-gradient-to-r from-[#D4AF37]/10 via-[#0a0a0a] to-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                          <Lock className="w-4 h-4 text-[#D4AF37]" />
                        </div>
                        <div>
                          <p className="text-xs font-display text-[#f0ece4]">Silent Business Partner</p>
                          <p className="text-[10px] text-[#9a9488] font-body">This banner is non-removable on all BlacklistedLinks pages</p>
                        </div>
                      </div>
                      <Link href="/apply">
                        <motion.button className="px-4 py-2 rounded-full bg-[#D4AF37] text-[#0a0a0a] font-display text-[10px] font-bold uppercase tracking-wider hover:bg-[#b8962e] transition-colors">
                          Partner With Us
                        </motion.button>
                      </Link>
                    </div>

                    {/* Rendered Bio Page Preview */}
                    <div className="luxury-card border-[#D4AF37]/10 bg-[#0a0a0a] rounded-2xl overflow-hidden">
                      {/* Browser chrome */}
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#D4AF37]/10 bg-[#080808]">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        <span className="ml-3 text-xs text-[#6a6560] font-mono-lux">https://blacklisted.studio/follows/{username.trim() || "yourname"}</span>
                      </div>

                      {/* Bio page content */}
                      <div className="bg-gradient-to-b from-[#0d0a08] via-[#0a0a0a] to-[#0d0a08] p-8">
                        {/* Profile pic */}
                        <div className="flex flex-col items-center mb-6">
                          <div className="w-28 h-28 rounded-full bg-[#1a1a1a] border-[3px] border-[#D4AF37]/30 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                            {profilePic ? (
                              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                              <Camera className="w-10 h-10 text-[#D4AF37]/20" />
                            )}
                          </div>
                          <h2 className="font-display text-2xl text-[#f0ece4] mt-4 tracking-wide">@{username.trim() || "username"}</h2>
                          <div className="flex items-center gap-2 mt-2">
                            <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                            <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                            <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                            <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                            <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                          </div>
                        </div>

                        {/* Links */}
                        <div className="space-y-3 max-w-sm mx-auto">
                          {activePlatforms.filter((p) => links[p.id]).map((platform) => (
                            <motion.a
                              key={platform.id}
                              href={links[platform.id]}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.01, x: 4 }}
                              className="flex items-center gap-3 p-4 rounded-xl bg-[#1a1a1a]/80 border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all group no-underline"
                            >
                              <span className="text-xl flex-shrink-0">{platform.icon}</span>
                              <span className="flex-1 text-sm font-display text-[#f0ece4] group-hover:text-[#D4AF37] transition-colors">
                                {platform.label}
                              </span>
                              <ChevronRight className="w-4 h-4 text-[#D4AF37]/30 group-hover:text-[#D4AF37] transition-colors" />
                            </motion.a>
                          ))}
                          {customPlatformIds.filter((id) => links[id]).map((id) => {
                            const platform = PLATFORM_OPTIONS.find((p) => p.id === id);
                            return (
                              <motion.a
                                key={id}
                                href={links[id]}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.01, x: 4 }}
                                className="flex items-center gap-3 p-4 rounded-xl bg-[#1a1a1a]/80 border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all group no-underline"
                              >
                                <span className="text-xl flex-shrink-0">🔗</span>
                                <span className="flex-1 text-sm font-display text-[#f0ece4] group-hover:text-[#D4AF37] transition-colors">
                                  {customLabels[id] || platform?.label || "Link"}
                                </span>
                                <ChevronRight className="w-4 h-4 text-[#D4AF37]/30 group-hover:text-[#D4AF37] transition-colors" />
                              </motion.a>
                            );
                          })}
                        </div>
                      </div>

                      {/* Bottom CTA */}
                      <div className="p-6 bg-gradient-to-r from-[#D4AF37]/10 to-transparent border-t border-[#D4AF37]/10 text-center">
                        <p className="text-[#D4AF37] font-display text-sm mb-2 tracking-wider">
                          Discover exclusive content — Linktree alternative.
                        </p>
                        <p className="text-[#9a9488] text-xs font-body">
                          Powered by BNE Studio — Your Silent Business Partner
                        </p>
                        <a href="https://www.blacklisted.studio" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 text-xs font-display text-[#D4AF37] hover:text-[#f0ece4] transition-colors no-underline">
                          www.blacklisted.studio <ChevronRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button onClick={copyLink} className="flex-1 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center gap-2 text-[#D4AF37] font-display text-xs font-bold uppercase tracking-wider hover:bg-[#D4AF37]/20 transition-colors">
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? "Copied!" : "Copy Bio URL"}
                      </button>
                      <button onClick={shareLink} className="flex-1 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center gap-2 text-[#D4AF37] font-display text-xs font-bold uppercase tracking-wider hover:bg-[#D4AF37]/20 transition-colors">
                        <Share2 className="w-4 h-4" /> Share
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="luxury-card border-[#D4AF37]/10 bg-[#0d0d0d]/80 p-12 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-[#D4AF37]/5 border border-[#D4AF37]/10 mx-auto mb-6 flex items-center justify-center">
                      <LinkIcon className="w-10 h-10 text-[#D4AF37]/30" />
                    </div>
                    <h3 className="font-display text-xl text-[#f0ece4] mb-3">Your Bio Page Awaits</h3>
                    <p className="text-[#9a9488] font-body text-sm max-w-xs mx-auto leading-relaxed">
                      Fill in your username and platform links to generate a premium black & gold bio page at blacklisted.studio/follows/yourname
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FileText, Copy, Download, Check, Sparkles, Eye, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ClassifiedGenerator() {
  const [contactMethod, setContactMethod] = useState("SMS/Text Only");
  const [contactInfo, setContactInfo] = useState("");
  const [reviewSites, setReviewSites] = useState("No Reviews/Reviews Private");
  const [reviewSiteInfo, setReviewSiteInfo] = useState("");
  const [reviewsList, setReviewsList] = useState([
    { text: "", url: "", handle: "" },
    { text: "", url: "", handle: "" },
    { text: "", url: "", handle: "" }
  ]);
  const [meetingType, setMeetingType] = useState("Incall Only");
  const [incallLocation, setIncallLocation] = useState("");
  const [outcallLocations, setOutcallLocations] = useState("");
  const [outcallSurrounding, setOutcallSurrounding] = useState(false);
  const [outcallDeposit, setOutcallDeposit] = useState(false);
  
  const [serviceMenu, setServiceMenu] = useState("");
  const [noNoList, setNoNoList] = useState("");
  const [photoCount, setPhotoCount] = useState("No in-ad photos needed");
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [platformTarget, setPlatformTarget] = useState("SkipTheGames");
  const [includeDisclaimer, setIncludeDisclaimer] = useState(true);

  const [generatedAd, setGeneratedAd] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const generateAdMutation = trpc.tools.generateClassifiedAd.useMutation();

  const renderPreviewHTML = (text: string) => {
    return text
      // BBCode
      .replace(/\[b\](.*?)\[\/b\]/gi, '<strong>$1</strong>')
      .replace(/\[i\](.*?)\[\/i\]/gi, '<em>$1</em>')
      .replace(/\[u\](.*?)\[\/u\]/gi, '<u>$1</u>')
      .replace(/\[url=(.*?)\](.*?)\[\/url\]/gi, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #e11d48; text-decoration: underline;">$2</a>')
      .replace(/\[img\](.*?)\[\/img\]/gi, '<img src="$1" alt="Ad Image" style="max-width: 100%; border-radius: 8px; margin: 8px 0;" />')
      // Markdown
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; border-radius: 8px; margin: 8px 0;" />')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #e11d48; text-decoration: underline;">$1</a>')
      // Newlines
      .replace(/\n/g, '<br/>');
  };

  const handlePhotoUrlChange = (index: number, url: string) => {
    const newUrls = [...photoUrls];
    newUrls[index] = url;
    setPhotoUrls(newUrls);
  };

  const handleReviewChange = (index: number, field: keyof typeof reviewsList[0], value: string) => {
    const newList = [...reviewsList];
    newList[index][field] = value;
    setReviewsList(newList);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedAd(null);
    setCopied(false);

    try {
      const numMatch = photoCount.match(/^(\d+)/);
      const numPhotos = numMatch ? parseInt(numMatch[1], 10) : 0;

      const result = await generateAdMutation.mutateAsync({
        contactMethod,
        contactInfo: contactMethod !== "No Contact Info (Platform Messaging)" ? contactInfo : undefined,
        reviewSites,
        reviewSiteInfo: reviewSites === "Yes - Reference Reviews" ? reviewSiteInfo : undefined,
        reviewsList: reviewSites === "Yes - Include Reviews" ? reviewsList.filter(r => r.text) : undefined,
        meetingType,
        incallLocation,
        outcallLocations,
        outcallSurrounding,
        outcallDeposit,
        serviceMenu,
        noNoList,
        photoCount,
        photoUrls: numPhotos > 0 ? photoUrls.slice(0, numPhotos) : undefined,
        platformTarget,
        includeDisclaimer,
      });
      setGeneratedAd(result.content);
      toast.success("Classified ad copy generated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to connect to the BNE AI Engine. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedAd) return;
    navigator.clipboard.writeText(generatedAd);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!generatedAd) return;
    const blob = new Blob([generatedAd], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bne_ad_${platformTarget.toLowerCase().replace(/[^a-z0-9]/g, "_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded ad copy as .txt file!");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800 py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-950/30 via-slate-950 to-violet-950/20" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5">
              <FileText className="h-3.5 w-3.5 text-rose-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-rose-300">
                Classified Ads Generator
              </span>
            </div>
            <h1 className="font-display text-4xl font-black leading-tight md:text-5xl">
              Ads That Convert<br />
              <span className="text-rose-400">Without Compromising You</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-400 font-body">
              Create high-conversion ads for SkipTheGames, TNABoard, and adult service directories.
              Built-in privacy controls protect your identity while maximizing client response.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container py-12 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* Ad configuration form */}
          <div className="border border-slate-800 rounded-xl p-6 bg-slate-900/40 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-2">Ad Configuration</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-300 mb-1 block">
                  What is your preferred contact method?
                </label>
                <select
                  value={contactMethod}
                  onChange={(e) => setContactMethod(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-rose-500"
                >
                  <option>SMS/Text Only</option>
                  <option>Voice Calls Only</option>
                  <option>By Phone or SMS</option>
                  <option>Email Only</option>
                  <option>Telegram</option>
                  <option>Signal</option>
                  <option>No Contact Info (Platform Messaging)</option>
                </select>
                {contactMethod !== "No Contact Info (Platform Messaging)" && (
                  <input
                    type="text"
                    placeholder={`Enter your ${contactMethod.split(' ')[0]} info...`}
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    className="w-full mt-3 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-rose-500"
                  />
                )}
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-1 block">
                  Are you listed on any review sites?
                </label>
                <select
                  value={reviewSites}
                  onChange={(e) => setReviewSites(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-rose-500"
                >
                  <option>No Reviews/Reviews Private</option>
                  <option>Yes - Include Reviews</option>
                  <option>Yes - Reference Reviews</option>
                </select>
                {reviewSites === "Yes - Reference Reviews" && (
                  <input
                    type="text"
                    placeholder="Username / URL / Site Name (e.g. Username on TER)"
                    value={reviewSiteInfo}
                    onChange={(e) => setReviewSiteInfo(e.target.value)}
                    className="w-full mt-3 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-rose-500"
                  />
                )}
                {reviewSites === "Yes - Include Reviews" && (
                  <div className="mt-4 space-y-4">
                    <p className="text-xs text-slate-400">Add up to 3 reviews to feature in your ad:</p>
                    {reviewsList.map((review, i) => (
                      <div key={i} className="space-y-2 p-3 bg-slate-900/60 rounded-lg border border-slate-700/50">
                        <textarea
                          placeholder={`Review #${i + 1} Quote`}
                          value={review.text}
                          onChange={(e) => handleReviewChange(i, 'text', e.target.value)}
                          className="w-full p-2.5 rounded-md bg-slate-800 border border-slate-700 text-white font-body text-xs focus:outline-none focus:border-rose-500"
                          rows={2}
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Reviewer Handle"
                            value={review.handle}
                            onChange={(e) => handleReviewChange(i, 'handle', e.target.value)}
                            className="w-1/2 p-2.5 rounded-md bg-slate-800 border border-slate-700 text-white font-body text-xs focus:outline-none focus:border-rose-500"
                          />
                          <input
                            type="url"
                            placeholder="Review URL (optional)"
                            value={review.url}
                            onChange={(e) => handleReviewChange(i, 'url', e.target.value)}
                            className="w-1/2 p-2.5 rounded-md bg-slate-800 border border-slate-700 text-white font-body text-xs focus:outline-none focus:border-rose-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-1 block">Meeting Type & Location</label>
                <select
                  value={meetingType}
                  onChange={(e) => setMeetingType(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-rose-500 mb-3"
                >
                  <option>Incall Only</option>
                  <option>Outcall Only</option>
                  <option>Incall & Outcall</option>
                </select>

                {(meetingType === "Incall Only" || meetingType === "Incall & Outcall") && (
                  <input
                    type="text"
                    placeholder="Incall City/Zip Code"
                    value={incallLocation}
                    onChange={(e) => setIncallLocation(e.target.value)}
                    className="w-full mb-3 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-rose-500"
                  />
                )}

                {(meetingType === "Outcall Only" || meetingType === "Incall & Outcall") && (
                  <div className="space-y-3 p-3 bg-slate-900/60 rounded-lg border border-slate-700/50">
                    <input
                      type="text"
                      placeholder="Cities willing to travel to..."
                      value={outcallLocations}
                      onChange={(e) => setOutcallLocations(e.target.value)}
                      className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-rose-500"
                    />
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={outcallSurrounding}
                        onChange={(e) => setOutcallSurrounding(e.target.checked)}
                        className="rounded border-slate-600 text-rose-500 focus:ring-rose-500 bg-slate-800"
                      />
                      <span className="text-sm text-slate-300 font-body">Include "surrounding areas"</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={outcallDeposit}
                        onChange={(e) => setOutcallDeposit(e.target.checked)}
                        className="rounded border-slate-600 text-rose-500 focus:ring-rose-500 bg-slate-800"
                      />
                      <span className="text-sm text-slate-300 font-body">Deposit required for outcalls for all new clients</span>
                    </label>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-1 block">Service Menu</label>
                <textarea
                  value={serviceMenu}
                  onChange={(e) => setServiceMenu(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-rose-500"
                  rows={4}
                  placeholder="List your services, general rates, and availability..."
                />
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-1 block">Your No-No List (Boundaries)</label>
                <textarea
                  value={noNoList}
                  onChange={(e) => setNoNoList(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-rose-500"
                  rows={3}
                  placeholder="What you don't offer or won't tolerate..."
                />
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-1 block">Photo Options</label>
                <select
                  value={photoCount}
                  onChange={(e) => {
                    setPhotoCount(e.target.value);
                    const match = e.target.value.match(/^(\d+)/);
                    const num = match ? parseInt(match[1], 10) : 0;
                    if (photoUrls.length < num) {
                      setPhotoUrls([...photoUrls, ...Array(num - photoUrls.length).fill("")]);
                    }
                  }}
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-rose-500"
                >
                  <option>No in-ad photos needed</option>
                  <option>1 pic</option>
                  <option>2 pics</option>
                  <option>3 pics</option>
                  <option>4 pics</option>
                  <option>5 pics</option>
                </select>
                
                {photoCount !== "No in-ad photos needed" && (
                  <div className="mt-3 space-y-3 bg-slate-900/80 p-4 rounded-lg border border-slate-700/50">
                    <div className="text-xs text-slate-400 mb-2 leading-relaxed">
                      <strong>Pro Tip:</strong> Need an adult-friendly image host? Upload your images to <a href="https://postimg.cc/" target="_blank" rel="noreferrer" className="text-rose-400 hover:underline">Postimages.org</a> (mark as adult content) or <a href="https://imgbb.com/" target="_blank" rel="noreferrer" className="text-rose-400 hover:underline">ImgBB</a> and paste the <strong>Direct Link</strong> URLs here. The AI will embed them correctly for your target platform using the proper markup.
                    </div>
                    {Array.from({ length: parseInt(photoCount.match(/^(\d+)/)?.[1] || "0", 10) }).map((_, i) => (
                      <input
                        key={i}
                        type="url"
                        placeholder={`Photo URL ${i + 1} (e.g. https://i.postimg.cc/...)`}
                        value={photoUrls[i] || ""}
                        onChange={(e) => handlePhotoUrlChange(i, e.target.value)}
                        className="w-full p-2.5 rounded-md bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-rose-500"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm text-slate-300 mb-1 block">Platform Target</label>
                <select
                  value={platformTarget}
                  onChange={(e) => setPlatformTarget(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white font-body text-sm focus:outline-none focus:border-rose-500"
                >
                  <option>SkipTheGames</option>
                  <option>TNABoard</option>
                  <option>Eros.com</option>
                  <option>CityVibe</option>
                  <option>Other</option>
                </select>
              </div>

              <label className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-700/50 cursor-pointer hover:bg-slate-800/80 transition-colors">
                <input
                  type="checkbox"
                  checked={includeDisclaimer}
                  onChange={(e) => setIncludeDisclaimer(e.target.checked)}
                  className="mt-1 shrink-0 h-4 w-4 rounded border-slate-600 text-rose-500 focus:ring-rose-500 bg-slate-800"
                />
                <span className="text-sm text-slate-300 font-body leading-tight">
                  <strong className="text-slate-200 block mb-0.5">Include Standard Legal Disclaimer</strong>
                  Automatically append: "This advertisement is strictly for time and companionship spent between two consenting adults..." to protect from illegal solicitations.
                </span>
              </label>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full py-3.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                <Sparkles className="h-4 w-4" />
                {isLoading ? "Drafting copy with BNE AI..." : "Generate Ad Copy"}
              </motion.button>
            </div>
          </div>

          {/* Ad preview display and Upsell */}
          <div className="space-y-6">
            <div className="border border-rose-500/30 rounded-xl p-6 bg-rose-500/5 min-h-[400px] flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-rose-400 mb-2 font-display">Generated Ad Preview</h2>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  <strong>Note:</strong> Your ad has been custom-formatted and encoded with the exact markup language required to look amazing on <strong>{platformTarget}</strong>.
                </p>
                
                <div className="border border-slate-700/60 rounded-lg p-5 bg-slate-900/60 min-h-[300px] max-h-[500px] overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {isLoading ? (
                    <div className="h-full py-16 flex flex-col items-center justify-center gap-3">
                      <div className="w-6 h-6 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
                      <p className="text-xs text-slate-500 font-body">Formulating hooks and screening copy...</p>
                    </div>
                  ) : generatedAd ? (
                    generatedAd
                  ) : (
                    <div className="text-slate-500 font-body">
                      <p className="mb-2">Your optimized ad copy will appear here...</p>
                      <p className="text-[11px] opacity-70">Configure your options on the left and click generate. We'll format the copy, lay out your menu, and insert professional boundary screening language automatically.</p>
                    </div>
                  )}
                </div>
              </div>

              {generatedAd && !isLoading && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setShowPreviewModal(true)}
                    className="flex-1 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5" /> Render Preview
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-rose-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied" : "Copy Text"}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex-1 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" /> Download (.txt)
                  </button>
                </div>
              )}
            </div>

            {/* BNE Managed Services Upsell */}
            <div className="border border-slate-800 rounded-xl p-6 bg-gradient-to-br from-slate-900 to-slate-950 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles className="w-24 h-24 text-rose-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">Want to put your bookings on autopilot?</h3>
              <p className="text-sm text-slate-400 mb-4 font-body leading-relaxed max-w-md">
                Generating ads is just the first step. Upgrade to our <span className="text-rose-400 font-semibold">Managed Booking & Vetting Services</span> and let BNE handle the rest:
              </p>
              <ul className="space-y-2 text-sm text-slate-300 mb-6 font-body">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" /> Professional Ad Posting & Management</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" /> Comprehensive Client Vetting & Scheduling</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" /> Appointment Reminders with GPS Driving Instructions</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" /> After-Date Follow-ups & Security Safety Services</li>
              </ul>
              <a 
                href="/services"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-slate-900 hover:bg-slate-200 font-bold transition-colors text-sm"
              >
                Explore In-Person Services
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Live Preview Modal */}
      <AnimatePresence>
        {showPreviewModal && generatedAd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowPreviewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/80">
                <h3 className="font-display font-bold text-lg text-rose-400">Live Ad Preview</h3>
                <button 
                  onClick={() => setShowPreviewModal(false)}
                  className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto bg-white text-slate-900 font-sans flex-1">
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderPreviewHTML(generatedAd) }}
                />
              </div>
              
              <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex justify-end gap-3">
                <button 
                  onClick={() => setShowPreviewModal(false)}
                  className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
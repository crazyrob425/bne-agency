/**
 * PortalContentReview — "Content Review" member module.
 *
 * The client uploads a photo/video to share privately with BNE staff for
 * fair, honest opinions and suggestions before it goes up for sale.
 * Bytes go to POST /api/members/upload (member-gated, 250 MB cap,
 * images/video only); metadata registers via trpc.members.createSubmission.
 * Staff decisions + feedback appear here.
 */
import { useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Check,
  Clock,
  FileImage,
  FileVideo,
  Inbox,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import Seo from "@/components/Seo";
import MemberGate from "./MemberGate";

const STATUS_STYLE: Record<string, string> = {
  pending_review: "text-amber-300 bg-amber-950/50 border-amber-900",
  approved: "text-emerald-300 bg-emerald-950/50 border-emerald-900",
  needs_changes: "text-red-300 bg-red-950/50 border-red-900",
};

function fmtSize(n: number) {
  if (n > 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(n / 1024))} KB`;
}

function ReviewInner() {
  const utils = trpc.useUtils();
  const listQuery = trpc.members.mySubmissions.useQuery();
  const createMut = trpc.members.createSubmission.useMutation({
    onSuccess: () => {
      setTitle("");
      setNotes("");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      utils.members.mySubmissions.invalidate();
    },
  });

  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/members/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      await createMut.mutateAsync({
        filePath: data.filePath,
        fileName: data.fileName,
        mimeType: data.mimeType,
        fileSize: data.fileSize,
        title: title.trim() || undefined,
        notes: notes.trim() || undefined,
      });
    } catch (e: any) {
      setError(e.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const busy = uploading || createMut.isPending;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-200">
      <Seo title="Content Review" description="Share content with staff for feedback before sale." noIndex noFollow />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Link href="/portal" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" /> My portal
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <Inbox className="w-6 h-6 text-emerald-400" />
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-400/90">Content Review</p>
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-2">Get staff eyes on it first</h1>
        <p className="text-zinc-400 max-w-2xl mb-8">
          Upload a photo or video to share <em className="text-zinc-300 not-italic font-medium">privately</em> with
          BNE staff for fair, honest opinions and suggestions before you put it up for sale.
          Only you and staff can see these files — never a public link.
        </p>

        {/* Upload card */}
        <div className="border border-zinc-800 rounded-2xl bg-zinc-950/70 p-6 mb-10">
          <h2 className="text-lg font-bold text-white mb-4 inline-flex items-center gap-2">
            <Upload className="w-5 h-5 text-emerald-400" /> New submission
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Title (optional)</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Halloween set — 12 pics"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-700"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">File</label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full text-sm text-zinc-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-emerald-600 file:text-black file:text-sm file:font-bold hover:file:bg-emerald-500"
              />
              <p className="text-[11px] text-zinc-600 mt-1.5">Photos or video, up to 250 MB.</p>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              What do you want feedback on? (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Lighting? Pricing? Which 3 are strongest? Be specific — you'll get better notes."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-700"
            />
          </div>
          {error && <p className="text-sm text-red-400 mb-3">{error}</p>}
          <button
            onClick={submit}
            disabled={!file || busy}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-sm font-bold text-black transition"
          >
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? "Uploading…" : createMut.isPending ? "Submitting…" : "Send for review"}
          </button>
        </div>

        {/* My submissions */}
        <h2 className="text-lg font-bold text-white mb-4">My submissions</h2>
        <div className="border border-zinc-800 rounded-2xl bg-zinc-950/70 overflow-hidden">
          {listQuery.isLoading && (
            <div className="p-10 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-zinc-500" /></div>
          )}
          {(listQuery.data ?? []).length === 0 && !listQuery.isLoading && (
            <p className="p-10 text-center text-sm text-zinc-500">Nothing submitted yet — your feedback will land here.</p>
          )}
          {(listQuery.data ?? []).map((s) => {
            const isVideo = (s.mimeType ?? "").startsWith("video/");
            return (
              <div key={s.id} className="border-b border-zinc-800/60 last:border-0 px-5 py-4">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-zinc-500">{isVideo ? <FileVideo className="w-6 h-6" /> : <FileImage className="w-6 h-6" />}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{s.title || s.fileName}</p>
                    <p className="text-xs text-zinc-500">{fmtSize(s.fileSize)} · submitted {new Date(s.submittedAt).toLocaleString()}</p>
                  </div>
                  <span className={`text-[11px] font-bold uppercase tracking-wide border rounded px-2 py-1 inline-flex items-center gap-1 ${STATUS_STYLE[s.status] ?? ""}`}>
                    {s.status === "pending_review" ? <Clock className="w-3 h-3" /> : s.status === "approved" ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    {s.status.replace("_", " ")}
                  </span>
                </div>
                {s.staffFeedback && (
                  <div className="mt-2 ml-10 p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
                    <p className="text-[11px] uppercase tracking-wider text-emerald-400/80 font-bold mb-1">Staff feedback</p>
                    <p className="text-sm text-zinc-300 whitespace-pre-wrap">{s.staffFeedback}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function PortalContentReview() {
  return (
    <MemberGate module="content-sharing">
      <ReviewInner />
    </MemberGate>
  );
}

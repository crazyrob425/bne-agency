/**
 * ContentReview — admin review queue for client content submissions,
 * plus the Leak Shield fingerprint registry.
 *
 * Staff watch submitted photos/video (served through the gated
 * /api/members/files/:id endpoint), approve them or send them back with
 * written feedback. The registry tab lists every fingerprinted export.
 */
import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Check,
  Clock,
  Eye,
  FileVideo,
  FileImage,
  Fingerprint,
  Inbox,
  Loader2,
  Send,
  X,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import Seo from "@/components/Seo";
import AdminGate from "./AdminGate";
import BlindPreview from "@/components/BlindPreview";
import VerifySuspectImage from "./VerifySuspectImage";

type Tab = "queue" | "registry";

const STATUS_STYLE: Record<string, string> = {
  pending_review: "text-amber-300 bg-amber-950/50 border-amber-900",
  approved: "text-emerald-300 bg-emerald-950/50 border-emerald-900",
  needs_changes: "text-red-300 bg-red-950/50 border-red-900",
};

function fmtDate(d: string | Date | null) {
  if (!d) return "—";
  return new Date(d).toLocaleString();
}

function fmtSize(n: number) {
  if (n > 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(n / 1024))} KB`;
}

export default function ContentReview() {
  const [tab, setTab] = useState<Tab>("queue");
  const [openId, setOpenId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const utils = trpc.useUtils();

  const queueQuery = trpc.members.listSubmissions.useQuery(undefined, {
    enabled: tab === "queue",
  });
  const registryQuery = trpc.members.allFingerprints.useQuery(undefined, {
    enabled: tab === "registry",
  });
  const reviewMut = trpc.members.reviewSubmission.useMutation({
    onSuccess: () => {
      setOpenId(null);
      setFeedback("");
      utils.members.listSubmissions.invalidate();
    },
  });

  const decide = (id: number, status: "approved" | "needs_changes") => {
    reviewMut.mutate({ id, status, staffFeedback: feedback.trim() || undefined });
  };

  const open = (queueQuery.data ?? []).find((s) => s.id === openId) ?? null;

  return (
    <AdminGate>
      <div className="min-h-screen bg-[#0a0a0f] text-zinc-200">
        <Seo title="Content Review" description="Review client content submissions." noIndex noFollow />
        <div className="max-w-6xl mx-auto px-6 py-10">
          <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" /> Operations Console
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <Inbox className="w-6 h-6 text-sky-400" />
            <p className="text-xs uppercase tracking-[0.25em] text-sky-400/90">Restricted · Administrators only</p>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Content Review</h1>
          <p className="text-zinc-400 max-w-2xl mb-8">
            Client uploads shared for staff feedback before sale. Watch, then approve
            or send back with honest notes. Files are served through a gated endpoint —
            never a public URL.
          </p>

          <div className="flex gap-2 mb-6">
            {(
              [
                { key: "queue", label: "Review queue", icon: Inbox },
                { key: "registry", label: "Fingerprint registry", icon: Fingerprint },
              ] as const
            ).map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                  tab === t.key
                    ? "bg-sky-950/50 border-sky-800 text-sky-200"
                    : "border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                <t.icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
          </div>

          {tab === "queue" && (
            <div className="border border-zinc-800 rounded-2xl bg-zinc-950/70 overflow-hidden">
              {queueQuery.isLoading && (
                <div className="p-10 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-zinc-500" /></div>
              )}
              {(queueQuery.data ?? []).length === 0 && !queueQuery.isLoading && (
                <p className="p-10 text-center text-sm text-zinc-500">No submissions yet.</p>
              )}
              {(queueQuery.data ?? []).map((s) => {
                const isVideo = (s.mimeType ?? "").startsWith("video/");
                const expanded = openId === s.id;
                return (
                  <div key={s.id} className="border-b border-zinc-800/60 last:border-0">
                    <button
                      onClick={() => { setOpenId(expanded ? null : s.id); setFeedback(s.staffFeedback ?? ""); }}
                      className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-zinc-900/50 transition"
                    >
                      <span className="text-zinc-500">{isVideo ? <FileVideo className="w-6 h-6" /> : <FileImage className="w-6 h-6" />}</span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-semibold text-white truncate">
                          {s.title || s.fileName}
                        </span>
                        <span className="block text-xs text-zinc-500 truncate">
                          {s.submitterName || s.submitterEmail || "Unknown client"} · {fmtSize(s.fileSize)} · {fmtDate(s.submittedAt)}
                        </span>
                      </span>
                      <span className={`text-[11px] font-bold uppercase tracking-wide border rounded px-2 py-1 ${STATUS_STYLE[s.status] ?? ""}`}>
                        {s.status.replace("_", " ")}
                      </span>
                    </button>

                    {expanded && open && (
                      <div className="px-5 pb-6 pt-1 grid md:grid-cols-2 gap-6">
                        <div>
                          <BlindPreview trackingLabel={`REVIEW-${s.id}`}>
                          {isVideo ? (
                            <video src={`/api/members/files/${s.id}`} controls className="w-full rounded-xl border border-zinc-800 max-h-[420px] bg-black" />
                          ) : (
                            <img src={`/api/members/files/${s.id}`} alt={s.fileName} className="w-full rounded-xl border border-zinc-800 max-h-[420px] object-contain bg-black" />
                          )}
                          </BlindPreview>
                          {s.notes && (
                            <div className="mt-3 p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
                              <p className="text-[11px] uppercase tracking-wider text-zinc-500 mb-1">Client note</p>
                              <p className="text-sm text-zinc-300 whitespace-pre-wrap">{s.notes}</p>
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                            Staff feedback
                          </label>
                          <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            rows={6}
                            placeholder="Fair, honest notes — what works, what to reshoot, pricing thoughts…"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-700 mb-4"
                          />
                          {s.reviewedAt && (
                            <p className="text-xs text-zinc-600 mb-3 inline-flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" /> Last reviewed {fmtDate(s.reviewedAt)}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => decide(s.id, "approved")}
                              disabled={reviewMut.isPending}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm font-bold text-black disabled:opacity-40"
                            >
                              <Check className="w-4 h-4" /> Approve
                            </button>
                            <button
                              onClick={() => decide(s.id, "needs_changes")}
                              disabled={reviewMut.isPending}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-900 text-red-300 hover:bg-red-950/40 text-sm font-bold disabled:opacity-40"
                            >
                              <X className="w-4 h-4" /> Needs changes
                            </button>
                            {reviewMut.isPending && <Loader2 className="w-5 h-5 animate-spin text-zinc-500 self-center" />}
                          </div>
                          <p className="text-xs text-zinc-600 mt-3 inline-flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" /> The client sees your status + feedback in their portal.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {tab === "registry" && (
            <>
            <VerifySuspectImage registry={(registryQuery.data ?? []) as { watermarkId: string; fileName: string | null; ownerName: string | null; ownerEmail: string | null }[]} />
            <div className="border border-zinc-800 rounded-2xl bg-zinc-950/70 overflow-hidden">
              {registryQuery.isLoading && (
                <div className="p-10 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-zinc-500" /></div>
              )}
              {(registryQuery.data ?? []).length === 0 && !registryQuery.isLoading && (
                <div className="p-10 text-center">
                  <Fingerprint className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                  <p className="text-sm text-zinc-500">No fingerprinted exports yet. They register automatically when a client exports from the Studio Editor.</p>
                </div>
              )}
              {(registryQuery.data ?? []).length > 0 && (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800 text-left text-xs uppercase tracking-wider text-zinc-500">
                      <th className="px-5 py-3">Tracking ID</th>
                      <th className="px-5 py-3">File</th>
                      <th className="px-5 py-3">Owner</th>
                      <th className="px-5 py-3">SHA-256</th>
                      <th className="px-5 py-3">Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(registryQuery.data ?? []).map((f) => (
                      <tr key={f.id} className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-900/40">
                        <td className="px-5 py-3 font-mono font-bold text-emerald-300">{f.watermarkId}</td>
                        <td className="px-5 py-3 text-zinc-300 truncate max-w-[220px]">{f.fileName}</td>
                        <td className="px-5 py-3 text-zinc-400">{f.ownerName || f.ownerEmail || "—"}</td>
                        <td className="px-5 py-3 font-mono text-xs text-zinc-500">{(f.fileHash ?? "").slice(0, 16)}…</td>
                        <td className="px-5 py-3 text-zinc-500 text-xs">{fmtDate(f.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className="px-5 py-4 border-t border-zinc-800">
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Each tracking ID is burned into the export's watermark and splash screen and stored here
                  with its hashes. When a leaked file surfaces, match its watermark ID or perceptual hash
                  against this registry to trace it back to the source asset.
                </p>
              </div>
            </div>
            </>
          )}

          {tab === "queue" && (
            <p className="text-xs text-zinc-600 mt-4 inline-flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5" /> Decisions notify the client through their portal — no separate email needed.
            </p>
          )}
        </div>
      </div>
    </AdminGate>
  );
}

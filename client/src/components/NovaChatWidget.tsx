import { useState, useRef, useCallback } from "react";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { AIChatBox, Message } from "./AIChatBox";
import { cn } from "@/lib/utils";

// Updated after the Worker deploys — the public chat API endpoint.
const NOVA_API_URL = "https://blacklisted-nova-chat.shaun-jordan.workers.dev";

const SUGGESTED = [
  "What does Blacklisted Studio actually do?",
  "How do I pick a profitable niche?",
  "Tell me about Blacklisted University",
  "What is the chatter service?",
];

type Notice = string | null;

export function NovaChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isLoading) return;

      const userMsg: Message = { role: "user", content: trimmed };
      const history = messages
        .filter((m) => m.role !== "system")
        .map((m) => ({ role: m.role, content: m.content }));
      setMessages((prev) => [...prev, userMsg, { role: "assistant", content: "" }]);
      setIsLoading(true);
      setNotice(null);

      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        const res = await fetch(`${NOVA_API_URL}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history }),
          signal: ctrl.signal,
        });
        if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

        const appendToken = (token: string) =>
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last && last.role === "assistant") {
              next[next.length - 1] = {
                ...last,
                content: last.content + token,
              };
            }
            return next;
          });

        const contentType = res.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
          // Worker has no server-side provider: it handed us the assembled
          // messages to complete directly in the browser (each visitor's IP
          // carries its own Pollinations quota; CORS is open).
          const data = await res.json();
          if (data?.notice) setNotice(data.notice);
          const providers = Array.isArray(data?.direct)
            ? data.direct
            : data?.direct
              ? [data.direct]
              : [];
          if (!providers.length) throw new Error("no direct fallback");
          let answered = false;
          let lastErr: any = null;
          for (const p of providers) {
            if (!p?.url || !p?.body) continue;
            try {
              if (p.format === "horde") {
                // AI Horde: async submit -> poll status until done.
                const sub = await fetch(p.url, {
                  method: "POST",
                  headers: { "Content-Type": "application/json", apikey: "0000000000" },
                  body: JSON.stringify(p.body),
                  signal: ctrl.signal,
                });
                if (!sub.ok) throw new Error(`horde submit HTTP ${sub.status}`);
                const { id } = await sub.json();
                if (!id) throw new Error("horde: no job id");
                let text: string | null = null;
                for (let i = 0; i < 20; i++) {
                  await new Promise((r) => setTimeout(r, 3000));
                  const st = await fetch(`${p.statusUrl}${id}`, {
                    headers: { apikey: "0000000000" },
                    signal: ctrl.signal,
                  });
                  if (!st.ok) throw new Error(`horde status HTTP ${st.status}`);
                  const sj = await st.json();
                  if (sj.done) {
                    text = sj.generations?.[0]?.text || null;
                    break;
                  }
                }
                if (typeof text === "string" && text.trim()) {
                  appendToken(text.trim());
                  answered = true;
                  break;
                }
                throw new Error("horde: timed out");
              }
              const dRes = await fetch(p.url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(p.body),
                signal: ctrl.signal,
              });
              if (!dRes.ok || !dRes.body) throw new Error(`inference HTTP ${dRes.status}`);
              const reader = dRes.body.getReader();
              const decoder = new TextDecoder();
              let buf = "";
              let done = false;
              let gotToken = false;
              while (!done) {
                const { value, done: d } = await reader.read();
                done = d;
                buf += decoder.decode(value, { stream: !done });
                const parts = buf.split("\n\n");
                buf = parts.pop() || "";
                for (const part of parts) {
                  for (const rawLine of part.split("\n")) {
                    const line = rawLine.trim();
                    if (!line.startsWith("data:")) continue;
                    const payload = line.slice(5).trim();
                    if (payload === "[DONE]") {
                      done = true;
                      break;
                    }
                    try {
                      const evt = JSON.parse(payload);
                      const delta = evt?.choices?.[0]?.delta?.content;
                      if (typeof delta === "string" && delta) {
                        gotToken = true;
                        appendToken(delta);
                      }
                    } catch {
                      /* ignore malformed chunk */
                    }
                  }
                }
              }
              if (gotToken) {
                answered = true;
                break;
              }
              throw new Error("empty reply");
            } catch (e: any) {
              if (e?.name === "AbortError") throw e;
              lastErr = e;
              continue; // try next provider
            }
          }
          if (!answered) throw lastErr || new Error("all inference providers failed");
        } else {
          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let buf = "";
          let done = false;

          while (!done) {
            const { value, done: d } = await reader.read();
            done = d;
            buf += decoder.decode(value, { stream: !done });
            const parts = buf.split("\n\n");
            buf = parts.pop() || "";
            for (const part of parts) {
              const line = part.trim();
              if (!line.startsWith("data:")) continue;
              const payload = line.slice(5).trim();
              if (payload === "[DONE]") {
                done = true;
                break;
              }
              try {
                const evt = JSON.parse(payload);
                if (typeof evt.token === "string") appendToken(evt.token);
                else if (typeof evt.notice === "string") setNotice(evt.notice);
                else if (typeof evt.error === "string")
                  appendToken(`\n\n*(Roxy hit a snag: ${evt.error})*`);
              } catch {
                /* ignore malformed chunk */
              }
            }
          }
        }
      } catch (e: any) {
        if (e?.name !== "AbortError") {
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last && last.role === "assistant" && !last.content) {
              next[next.length - 1] = {
                ...last,
                content:
                  "*(Roxy's having trouble connecting right now — try again in a moment.)*",
              };
            }
            return next;
          });
        }
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [isLoading, messages]
  );

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-3">
      {open && (
        <div className="w-[380px] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-2xl border bg-background shadow-2xl">
          <div className="flex items-center gap-2 border-b px-4 py-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="size-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold leading-none">Roxy</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Blacklisted Studio host · 18+
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent"
              aria-label="Close chat"
            >
              <X className="size-4" />
            </button>
          </div>
          {notice && (
            <div className="border-b bg-muted/50 px-4 py-2 text-[11px] text-muted-foreground">
              {notice}
            </div>
          )}
          <AIChatBox
            messages={messages}
            onSendMessage={sendMessage}
            isLoading={isLoading}
            placeholder="Talk to Roxy…"
            height="480px"
            className="border-0 shadow-none rounded-none"
            emptyStateMessage="Hey — I'm Roxy. Ask me about the studio, niches, or the game."
            suggestedPrompts={SUGGESTED}
          />
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex size-14 items-center justify-center rounded-full shadow-xl transition-transform hover:scale-105",
          open
            ? "bg-muted text-foreground"
            : "bg-primary text-primary-foreground"
        )}
        aria-label={open ? "Close Roxy chat" : "Chat with Roxy"}
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </div>
  );
}

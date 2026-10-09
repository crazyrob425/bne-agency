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

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buf = "";
        let done = false;

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
                appendToken(`\n\n*(Nova hit a snag: ${evt.error})*`);
            } catch {
              /* ignore malformed chunk */
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
                  "*(Nova's having trouble connecting right now — try again in a moment.)*",
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
              <p className="text-sm font-semibold leading-none">Nova</p>
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
            placeholder="Talk to Nova…"
            height="480px"
            className="border-0 shadow-none rounded-none"
            emptyStateMessage="Hey — I'm Nova. Ask me about the studio, niches, or the game."
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
        aria-label={open ? "Close Nova chat" : "Chat with Nova"}
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </div>
  );
}

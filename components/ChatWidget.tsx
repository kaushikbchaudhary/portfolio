"use client";

import { useEffect, useRef, useState } from "react";
import { ChatIcon, CloseIcon, SendIcon } from "./Icons";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What's Kaushik's tech stack?",
  "Tell me about the AI project",
  "Is he open to freelance work?"
];

const GREETING: Message = {
  role: "assistant",
  content: "Hi! I'm an AI assistant trained on Kaushik's portfolio. Ask me about his experience, projects or skills."
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const history = [...messages, { role: "user" as const, content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    const setReply = (reply: string) =>
      setMessages((prev) => [...prev.slice(0, -1), { role: "assistant", content: reply }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The greeting is UI-only, so it isn't sent to the model.
        body: JSON.stringify({ messages: history.slice(1) })
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        setReply(data?.error ?? "Something went wrong. Please try again.");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setReply(reply);
      }
      if (!reply) setReply("Sorry, I couldn't come up with an answer. Please try rephrasing.");
    } catch {
      setReply("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open ? (
        <div
          role="dialog"
          aria-label="Chat with AI assistant"
          className="fixed inset-x-3 bottom-20 z-50 flex max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:inset-x-auto sm:right-6 sm:w-96"
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
            <div>
              <p className="text-sm font-semibold">Ask about Kaushik</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">AI answers can be inaccurate</p>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed " +
                    (m.role === "user"
                      ? "bg-indigoBrand text-white"
                      : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100")
                  }
                >
                  {m.content || <span className="animate-pulse">Thinking…</span>}
                </div>
              </div>
            ))}

            {messages.length === 1 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700 transition-colors hover:border-indigoBrand hover:text-indigoBrand dark:border-slate-700 dark:text-slate-300"
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 border-t border-slate-200 p-3 dark:border-slate-800"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={1}
              maxLength={1000}
              placeholder="Ask a question…"
              aria-label="Your message"
              className="max-h-28 flex-1 resize-none rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-indigoBrand dark:border-slate-700"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={loading || !input.trim()}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white transition-colors hover:bg-indigoBrand disabled:opacity-40 dark:bg-white dark:text-slate-900"
            >
              <SendIcon className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        aria-label={open ? "Close chat" : "Open AI chat"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-50 inline-flex h-12 items-center gap-2 rounded-full bg-slate-900 px-4 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-indigoBrand dark:bg-white dark:text-slate-900 dark:hover:bg-indigo-200 sm:right-6"
      >
        {open ? <CloseIcon className="h-5 w-5" /> : <ChatIcon className="h-5 w-5" />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask AI"}</span>
      </button>
    </>
  );
}

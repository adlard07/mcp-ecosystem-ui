'use client';

import { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', text: 'Hi! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // auto-scroll to newest message
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: 'user', text },
    ]);
    setInput('');
    setIsTyping(true);

    // --- Mock bot reply (replace with real API call) ---
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'bot',
          text: `You said: "${text}". (Connect this to your backend to get real replies.)`,
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="w-full max-w-2xl h-[600px] max-h-[80vh] flex flex-col bg-white rounded-2xl shadow-xl border border-black/10 overflow-hidden">
      {/* Header */}
      <header className="px-5 py-3 bg-black text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[#F24405] flex items-center justify-center text-sm font-bold">
            AI
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Assistant</p>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
              Online
            </p>
          </div>
        </div>
        <button
          type="button"
          className="text-xs px-3 py-1.5 rounded-md border border-white/20 hover:border-[#F24405] hover:text-[#F24405] transition"
        >
          Clear
        </button>
      </header>
      

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-5 space-y-3 bg-[#F2F0E4]"
      >
        {messages.map((m) =>
          m.role === 'user' ? (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[75%] bg-[#F24405] text-white text-sm rounded-2xl rounded-br-sm px-4 py-2.5 shadow-sm">
                {m.text}
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex justify-start">
              <div className="max-w-[75%] bg-white text-black text-sm rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm border border-black/5">
                {m.text}
              </div>
            </div>
          )
        )}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-black/5 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1">
              <span className="w-1.5 h-1.5 bg-[#F24405] rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-[#F24405] rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-[#F24405] rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={handleSend}
        className="border-t border-black/10 bg-white p-3 flex items-center gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 bg-[#F2F0E4] text-black placeholder-gray-500 rounded-full px-4 py-2.5 text-sm border border-transparent focus:outline-none focus:border-[#F24405] focus:ring-2 focus:ring-[#F24405]/30"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="h-10 w-10 rounded-full bg-[#F24405] text-white flex items-center justify-center hover:bg-[#d63a02] disabled:opacity-40 disabled:cursor-not-allowed transition active:scale-95"
          aria-label="Send message"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
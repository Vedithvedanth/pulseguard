import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  HelpCircle,
  TrendingDown,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { usePulseGuard } from '../context/PulseGuardContext';

export const AskPulseGuardDrawer: React.FC = () => {
  const { chatOpen, setChatOpen, chatMessages, isChatLoading, sendChatMessage, risks } = usePulseGuard();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickChips = [
    'What is my biggest risk?',
    'Why is my inventory risky?',
    'What should I do today?',
    'Which supplier is becoming unreliable?',
    'How much revenue could I lose?',
    'What happens if I do nothing?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatLoading]);

  if (!chatOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isChatLoading) return;
    const msg = inputText;
    setInputText('');
    sendChatMessage(msg);
  };

  const handleChipClick = (chipText: string) => {
    sendChatMessage(chipText);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col text-slate-100">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 backdrop-blur">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md shadow-amber-500/20">
            <Bot className="w-4 h-4 text-slate-950" />
          </div>
          <div>
            <div className="font-bold text-sm text-white flex items-center gap-1.5">
              <span>Ask PulseGuard</span>
              <span className="text-[10px] bg-amber-400/10 text-amber-300 border border-amber-400/20 px-1.5 py-0.2 rounded font-mono">
                Copilot
              </span>
            </div>
            <div className="text-[11px] text-slate-400">Grounded on Heritage Bites 90-Day Telemetry</div>
          </div>
        </div>

        <button
          onClick={() => setChatOpen(false)}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[90%] rounded-2xl p-4 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
              }`}
            >
              {msg.sender === 'assistant' ? (
                <div className="space-y-2">
                  <div
                    className="prose prose-invert prose-xs max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: msg.text
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n\n/g, '<br/><br/>')
                        .replace(/\n/g, '<br/>'),
                    }}
                  />

                  {/* Grounded Evidence Tag */}
                  <div className="pt-2 border-t border-slate-850 text-[10px] text-slate-400 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-amber-400">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Data-Grounded • Verified Signals</span>
                    </span>
                    <span className="font-mono text-slate-500">{msg.timestamp}</span>
                  </div>
                </div>
              ) : (
                <div>{msg.text}</div>
              )}
            </div>
          </div>
        ))}

        {isChatLoading && (
          <div className="flex items-center gap-2 text-xs text-amber-400 bg-slate-950 p-3 rounded-xl border border-slate-800 max-w-[80%]">
            <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
            <span>Analyzing 90-day correlation matrix with Gemini 3.8 Flash...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Chips */}
      <div className="p-3 border-t border-slate-850 bg-slate-950/60 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          {quickChips.map((chip, i) => (
            <button
              key={i}
              onClick={() => handleChipClick(chip)}
              className="text-[11px] bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 px-2.5 py-1 rounded-full transition cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask about inventory, suppliers, lost revenue..."
          className="flex-1 bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isChatLoading}
          className={`p-2.5 rounded-xl transition ${
            inputText.trim() && !isChatLoading
              ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer shadow-md shadow-amber-500/20'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

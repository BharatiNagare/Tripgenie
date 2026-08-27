import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  MessageSquare, 
  MapPin, 
  Utensils, 
  Languages, 
  CloudRain, 
  Compass,
  CornerDownLeft
} from 'lucide-react';
import { Itinerary, ConciergeMessage } from '../types';

interface ConciergeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  itinerary: Itinerary | null;
}

export const ConciergeDrawer: React.FC<ConciergeDrawerProps> = ({
  isOpen,
  onClose,
  itinerary,
}) => {
  const [messages, setMessages] = useState<ConciergeMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: itinerary
        ? `Hello! I'm your **TripGenie Concierge** for **${itinerary.destination}**. Ask me anything about your ${itinerary.days.length}-day trip—like neighborhood recommendations, local transit passes, translation assistance, or rainy day backups!`
        : `Hello! I'm your **TripGenie AI Travel Assistant**. How can I help you plan your next journey today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: itinerary
        ? [
            { label: '🍜 Local Dinner Spots', actionPrompt: `Suggest 3 authentic local dinner spots near Day 1 evening in ${itinerary.destination}` },
            { label: '🌧️ Rainy Day Alternatives', actionPrompt: `What are top indoor/museum activities if it rains in ${itinerary.destination}?` },
            { label: '🚇 Transit Pass Advice', actionPrompt: `What is the cheapest and most convenient metro/train pass for ${itinerary.destination}?` },
            { label: '🗣️ Essential Phrases', actionPrompt: `Teach me 5 critical polite phrases in the local language for ordering food.` },
          ]
        : [
            { label: 'Top Destinations for Summer', actionPrompt: 'What are the top 3 international destinations for a summer vacation?' },
            { label: 'Budget Backpacking Tips', actionPrompt: 'How can I travel in Europe on a student budget?' },
          ],
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ConciergeMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat-concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          itinerary,
          chatHistory: messages.slice(-5),
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();

      const assistantMsg: ConciergeMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || "I'm happy to help you explore your itinerary!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: data.quickActions || [],
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Concierge chat error:', err);
      const errorMsg: ConciergeMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `Here is a helpful tip for **${itinerary?.destination || 'your trip'}**: Always double-check Google Maps for live station transfers, carry a compact power bank, and verify reservation requirements at popular venues!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: [
          { label: 'Check Top Sights', actionPrompt: `What are the top landmarks in ${itinerary?.destination || 'the city'}?` },
        ],
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white flex items-center justify-between border-b border-teal-900">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm font-display text-white">TripGenie Concierge</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-teal-200/80">
                {itinerary ? `Context: ${itinerary.destination}` : 'Global Travel Advisor'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Concierge"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-teal-600 text-white rounded-tr-none shadow-xs'
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/80 shadow-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">
                      {msg.text.split('\n').map((line, lIdx) => {
                        // Simple bold formatting
                        const parts = line.split(/(\*\*.*?\*\*)/g);
                        return (
                          <p key={lIdx} className={lIdx > 0 ? 'mt-1.5' : ''}>
                            {parts.map((part, pIdx) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return (
                                  <strong key={pIdx} className="font-bold">
                                    {part.slice(2, -2)}
                                  </strong>
                                );
                              }
                              return part;
                            })}
                          </p>
                        );
                      })}
                    </div>
                    <span
                      className={`text-[9px] block mt-1.5 ${
                        isUser ? 'text-teal-200 text-right' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Quick follow-up action pills */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.quickActions.map((qa, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => handleSendMessage(qa.actionPrompt)}
                          className="text-[11px] font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-left"
                        >
                          {qa.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-2xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 bg-white rounded-2xl rounded-tl-none border border-slate-200 shadow-xs flex items-center gap-2 text-xs text-slate-500">
                <div className="w-3.5 h-3.5 border-2 border-teal-600/30 border-t-teal-600 rounded-full animate-spin" />
                <span>TripGenie is consulting destination data...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputQuery);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={itinerary ? `Ask about ${itinerary.destination}, food, transit, tips...` : 'Ask travel question...'}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-500 focus:bg-white font-medium"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="p-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-xl transition-all cursor-pointer shrink-0 shadow-xs"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[10px] text-slate-400 text-center mt-1.5">
            Contextual AI Travel Concierge &middot; Powered by Gemini 3.7 Flash
          </p>
        </div>
      </div>
    </div>
  );
};

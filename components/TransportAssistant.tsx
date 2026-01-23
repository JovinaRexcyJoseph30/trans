
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const TransportAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am the JIT Library Assistant. I can help you find books, check timings, or shelf locations. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
      const response = await sendMessageToGemini(userMsg, history);
      if (response) setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, the library database is currently offline.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={`fixed bottom-8 right-8 p-4 bg-brand-navy text-white rounded-full shadow-lg z-40 ${isOpen ? 'hidden' : 'flex'} items-center gap-2 hover:scale-105 transition-all`}>
        <MessageSquare className="w-6 h-6" />
        <span className="font-medium pr-1 hidden sm:block">Library Help</span>
      </button>

      <div className={`fixed bottom-6 right-6 w-[90vw] sm:w-[380px] h-[550px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col z-50 transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        <div className="p-4 bg-brand-navy rounded-t-2xl flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Bot className="w-6 h-6" /></div>
            <div><h3 className="font-bold text-sm">Library Support</h3><div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span><span className="text-xs opacity-70">AI Active</span></div></div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-brand-blue text-white rounded-br-none' : 'bg-white text-slate-700 rounded-bl-none border border-slate-200 shadow-sm'}`}>{msg.text}</div>
            </div>
          ))}
          {isLoading && <div className="flex justify-start"><div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3"><Loader2 className="w-4 h-4 text-brand-blue animate-spin" /><span className="text-xs text-slate-500">Searching catalog...</span></div></div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t border-slate-100 bg-white rounded-b-2xl">
          <div className="relative">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask about books or timings..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-brand-blue" />
            <button onClick={handleSend} disabled={!input.trim() || isLoading} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-navy text-white rounded-lg"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransportAssistant;

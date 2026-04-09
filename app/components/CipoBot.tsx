'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function CipoBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Cargar historial de sesión
  useEffect(() => {
    let sid = sessionStorage.getItem('cipo-session-id');
    if (!sid) {
      sid = Math.random().toString(36).substring(2, 10).toUpperCase();
      sessionStorage.setItem('cipo-session-id', sid);
    }
    setSessionId(sid);

    const savedMessages = sessionStorage.getItem('cipo-chat');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([
        {
          role: 'assistant',
          content: '¡Hola! Soy CipoBot, tu asistente inteligente de Constructora Cipo. ¿En qué te puedo ayudar hoy? Puedes preguntarme sobre nuestros servicios, cómo cotizar, o solicitar contacto.'
        }
      ]);
    }
  }, []);

  // Guardar historial de sesión
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('cipo-chat', JSON.stringify(messages));
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const clearChat = () => {
    sessionStorage.removeItem('cipo-chat');
    const newSid = Math.random().toString(36).substring(2, 10).toUpperCase();
    sessionStorage.setItem('cipo-session-id', newSid);
    setSessionId(newSid);

    setMessages([
      {
        role: 'assistant',
        content: '¡Hola! Soy CipoBot, tu asistente inteligente de Constructora Cipo. ¿En qué te puedo ayudar hoy? Puedes preguntarme sobre nuestros servicios, cómo cotizar, o solicitar contacto.'
      }
    ]);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage], sessionId }),
      });

      const data = await response.json();

      if (response.status === 429) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message || data.error }]);
        return;
      }

      if (!response.ok) throw new Error('Error en el chat');

      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Lo siento, tuve un problema de conexión. Por favor inténtalo de nuevo más tarde o contáctate al WhatsApp directamente.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="cipo-chat-container" className="fixed bottom-6 right-6 flex flex-col items-end z-[2000]">
      {isOpen && (
        <div className="w-[90vw] max-w-[400px] h-[500px] mb-4 bg-[#0f0f18] border border-[rgba(251,191,36,0.3)] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 animate-fade-in-up">
          {/* Header */}
          <div className="px-6 py-5 bg-[#020205] border-b border-[rgba(251,191,36,0.3)] flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-gold-gradient flex items-center justify-center text-[#020205] font-bold text-xl shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                  CB
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#020205] rounded-full shadow-sm"></span>
              </div>
              <div>
                <h3 className="font-bold text-gold-gradient text-lg leading-tight uppercase tracking-tight">CipoBot</h3>
                <p className="text-[var(--color-foreground)] opacity-70 text-[0.65rem] uppercase tracking-widest font-bold">
                  Asistente Virtual
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                title="Limpiar chat"
                className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-full transition-all text-[var(--color-foreground)] opacity-70 group/trash"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/trash:scale-110 transition-transform"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Cerrar chat"
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-[var(--color-foreground)] opacity-70"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-transparent">
            {messages.map((msg, idx) => (
              <div key={`${msg.role}-${idx}`} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`} style={{ animationDelay: `${idx * 0.05}s` }}>
                <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-[0.95rem] leading-relaxed shadow-sm ${msg.role === 'user'
                  ? 'bg-gold-gradient text-[#020205] rounded-tr-none font-medium'
                  : 'bg-[#1a1a2e] border border-[rgba(251,191,36,0.2)] text-[var(--color-foreground)] rounded-tl-none'
                  }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fade-in-up">
                <div className="bg-[#1a1a2e] border border-[rgba(251,191,36,0.2)] px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-[#fbbf24] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#fbbf24] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-1.5 h-1.5 bg-[#fbbf24] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-[#020205] border-t border-[rgba(251,191,36,0.3)]">
            <div className="relative flex items-center group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu consulta aquí..."
                className="w-full pl-5 pr-14 py-3 bg-[#0f0f18] border border-[rgba(251,191,36,0.3)] rounded-xl text-[var(--color-foreground)] outline-none focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] transition-all placeholder:text-[var(--color-foreground)] placeholder:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                title="Enviar mensaje"
                className="absolute right-2 p-2 text-[#fbbf24] hover:bg-white/10 rounded-lg transition-all disabled:opacity-30 disabled:hover:bg-transparent"
              >
                {isLoading ? (
                  <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Abrir Asistente CipoBot"
        className="w-16 h-16 rounded-full bg-gold-gradient text-[#020205] shadow-[0_4px_25px_rgba(251,191,36,0.4)] flex items-center justify-center hover:scale-105 transition-all active:scale-95 group relative mb-2"
      >
        <div className="absolute inset-0 rounded-full bg-[#fbbf24] animate-pulse-gold opacity-100"></div>
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          {isOpen ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          )}
        </div>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 z-20">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
          </span>
        )}
      </button>
    </div>
  );
}

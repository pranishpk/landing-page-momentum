import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, Theme } from '../types';

interface ChatbotProps {
  theme: Theme;
}

const Chatbot: React.FC<ChatbotProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am Momentum Media\'s AI assistant. How can we help you grow your business today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const stream = await sendMessageToGemini(userMsg.text);
      
      let fullResponse = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = { role: 'model', text: fullResponse };
          return newHistory;
        });
      }
    } catch (error) {
      console.error("Chat error", error);
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, but I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const isDark = theme === Theme.DARK;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className={`mb-4 w-80 sm:w-96 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform origin-bottom-right ${
          isDark 
            ? 'bg-slate-800 border border-slate-700' 
            : 'bg-white border border-stone-200'
        }`}>
          {/* Header */}
          <div className={`p-4 flex justify-between items-center ${
            isDark ? 'bg-slate-900 text-lime-400' : 'bg-stone-100 text-stone-800'
          }`}>
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-full ${isDark ? 'bg-lime-400/20' : 'bg-stone-200'}`}>
                <Bot size={18} className={isDark ? 'text-lime-400' : 'text-stone-700'} />
              </div>
              <span className="font-bold text-sm">Momentum AI</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:opacity-70 transition-opacity"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className={`h-80 overflow-y-auto p-4 space-y-4 ${
            isDark ? 'bg-slate-800' : 'bg-white'
          }`}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? (isDark ? 'bg-lime-500 text-slate-900 rounded-br-none' : 'bg-stone-800 text-white rounded-br-none')
                    : (isDark ? 'bg-slate-700 text-slate-100 rounded-bl-none' : 'bg-stone-100 text-stone-800 rounded-bl-none')
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className={`p-3 rounded-2xl rounded-bl-none text-sm ${isDark ? 'bg-slate-700' : 'bg-stone-100'}`}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms'}}></div>
                    </div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={`p-3 border-t flex items-center gap-2 ${
            isDark ? 'border-slate-700 bg-slate-900' : 'border-stone-100 bg-stone-50'
          }`}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about our services..."
              className={`flex-1 bg-transparent outline-none text-sm px-2 ${
                isDark ? 'text-white placeholder-slate-500' : 'text-stone-800 placeholder-stone-400'
              }`}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className={`p-2 rounded-full transition-all ${
                isDark 
                  ? 'text-lime-400 hover:bg-slate-800 disabled:opacity-50' 
                  : 'text-stone-800 hover:bg-stone-200 disabled:opacity-50'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 ${
          isDark 
            ? 'bg-lime-400 text-slate-900 hover:bg-lime-300' 
            : 'bg-stone-900 text-white hover:bg-stone-700'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default Chatbot;

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AskAIPage() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<{role: 'user'|'model', text: string}[]>([{
        role: 'model',
        text: "Welcome to B.N.E. AI Assistant. I can help you with adult marketing, content creation advice, etiquette, safety, legal issues, or using B.N.E. tools and services to maximize your reach. How can I assist you today?"
    }]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;
        
        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
        setLoading(true);

        try {
            // Need token assuming auth required but let's just make a fetch call
            const res = await fetch('/api/ask-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    history: messages.map(m => ({ role: m.role, text: m.text })),
                    message: userMsg
                })
            });
            const data = await res.json();
            if (data.result) {
                setMessages(prev => [...prev, {role: 'model', text: data.result}]);
            } else {
                setMessages(prev => [...prev, {role: 'model', text: "Sorry, I ran into a system error."}]);
            }
        } catch (err) {
            setMessages(prev => [...prev, {role: 'model', text: "Connection error."}]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col h-full bg-[#0A0A0A] font-sans">
             <div className="bg-[#121212] border border-[#2A2A2A] rounded p-4 mb-4 shrink-0 flex items-center justify-between">
                 <div>
                     <h2 className="text-sm font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                         <Bot className="w-5 h-5" /> Ask B.N.E. AI
                     </h2>
                     <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Get expert advice on content, marketing, and the B.N.E. ecosystem.</p>
                 </div>
                 <Sparkles className="w-5 h-5 text-purple-500 opacity-50" />
             </div>

             <div className="flex-1 overflow-y-auto mb-4 border border-[#2A2A2A] rounded bg-[#121212] p-4 space-y-4" ref={scrollRef}>
                 {messages.map((m, i) => (
                     <div key={i} className={`flex gap-3 max-w-3xl ${m.role === 'user' ? 'ml-auto' : ''}`}>
                         {m.role === 'model' && <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center shrink-0 border border-purple-500/30"><Bot className="w-4 h-4 text-purple-400"/></div>}
                         <div className={`p-3 rounded-lg text-sm whitespace-pre-wrap ${m.role === 'user' ? 'bg-[#2A2A2A] text-white border border-[#3A3A3A]' : 'bg-[#1A1A1A] text-gray-300 border border-[#2A2A2A]'}`}>
                             {m.text}
                         </div>
                         {m.role === 'user' && <div className="w-8 h-8 rounded-full bg-[#EAB308]/20 flex items-center justify-center shrink-0 border border-[#EAB308]/30"><User className="w-4 h-4 text-[#EAB308]"/></div>}
                     </div>
                 ))}
                 {loading && (
                     <div className="flex gap-3 max-w-3xl">
                         <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center shrink-0 border border-purple-500/30"><Bot className="w-4 h-4 text-purple-400"/></div>
                         <div className="p-3 rounded-lg text-sm bg-[#1A1A1A] text-gray-500 border border-[#2A2A2A] italic">
                             Thinking...
                         </div>
                     </div>
                 )}
             </div>

             <div className="shrink-0 bg-[#121212] border border-[#2A2A2A] rounded p-2 flex items-center gap-2">
                 <input 
                     type="text" 
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                     placeholder="Ask about marketing hooks, safety, or using B.N.E. tools..."
                     className="flex-1 bg-transparent text-sm text-white px-3 py-2 focus:outline-none placeholder:text-gray-600"
                 />
                 <button 
                     onClick={handleSend}
                     disabled={loading || !input.trim()}
                     className="p-2 bg-purple-600 hover:bg-purple-500 disabled:bg-[#2A2A2A] disabled:text-gray-500 text-white rounded transition-colors"
                 >
                     <Send className="w-4 h-4" />
                 </button>
             </div>
        </div>
    )
}

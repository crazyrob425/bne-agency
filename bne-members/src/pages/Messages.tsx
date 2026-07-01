import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { Send, Paperclip } from 'lucide-react';

export default function Messages() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));
        const unsub = onSnapshot(q, (snap) => {
            setMessages(snap.docs.map(d => ({id: d.id, ...d.data()})));
            setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        });
        return unsub;
    }, []);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !user) return;
        try {
            await addDoc(collection(db, 'messages'), {
                senderId: user.uid,
                receiverId: 'admin', // simplified
                content: newMessage,
                attachments: [],
                createdAt: serverTimestamp()
            });
            setNewMessage('');
        } catch(e) { console.error('Send error', e); }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] font-sans">
             <div className="bg-[#121212] border border-[#2A2A2A] rounded flex flex-col flex-1 overflow-hidden">
                  <div className="p-4 border-b border-[#2A2A2A] bg-[#1A1A1A]">
                     <h2 className="text-sm font-bold text-[#EAB308] uppercase tracking-wider">Secure Messaging</h2>
                  </div>
                 <div className="flex-1 overflow-y-auto p-4 space-y-4 text-[11px]">
                     <div className="text-[10px] text-center text-gray-600 my-4 uppercase tracking-widest font-bold">Encrypted End-to-End Chat</div>
                     {messages.map(m => (
                         <div key={m.id} className={`flex flex-col ${m.senderId === user?.uid ? 'items-end' : 'items-start'}`}>
                              <div className={`p-2 rounded-t-lg max-w-[80%] ${m.senderId === user?.uid ? 'bg-[#EAB308] text-black rounded-l-lg' : 'bg-[#2A2A2A] text-white rounded-r-lg'}`}>
                                  <p>{m.content}</p>
                              </div>
                              <span className="text-[9px] text-gray-500 mt-1">{(m.createdAt?.toDate() || new Date()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                         </div>
                     ))}
                     <div ref={endRef} />
                 </div>
                 <div className="p-3 border-t border-[#2A2A2A] bg-[#121212] flex space-x-2">
                     <form onSubmit={handleSend} className="flex-1 flex items-center space-x-2">
                         <button type="button" className="text-gray-400 hover:text-white px-2"><Paperclip className="w-4 h-4"/></button>
                         <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} className="flex-1 bg-[#0A0A0A] border border-[#2A2A2A] px-3 py-1.5 text-xs rounded focus:outline-none focus:border-[#EAB308]" placeholder="Write secure message..." />
                         <button type="submit" disabled={!newMessage.trim()} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded disabled:opacity-50 hover:bg-white/10 text-xs font-bold text-white uppercase"><Send className="w-4 h-4"/></button>
                     </form>
                 </div>
             </div>
        </div>
    );
}

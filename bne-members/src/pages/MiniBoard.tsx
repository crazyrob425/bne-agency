import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, query, getDocs, orderBy, serverTimestamp } from 'firebase/firestore';
import { UserCircle, MapPin, Search } from 'lucide-react';

export default function MiniBoard() {
    const { user, dbUser } = useAuth();
    const [ads, setAds] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [newAd, setNewAd] = useState({ title: '', category: 'co-star', location: '', description: ''});
    
    const fetchAds = async () => {
        const q = query(collection(db, 'classifieds'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        setAds(snap.docs.map(d => ({id: d.id, ...d.data()})));
    };

    useEffect(() => {
        fetchAds();
    }, []);

    const handleCreate = async () => {
        if (!user || !dbUser) return;
        setLoading(true);
        try {
            await addDoc(collection(db, 'classifieds'), {
                 ownerId: user.uid,
                 ownerPersona: dbUser.persona || user.email,
                 title: newAd.title,
                 description: newAd.description,
                 category: newAd.category,
                 location: newAd.location,
                 createdAt: serverTimestamp()
            });
            setShowNew(false);
            setNewAd({ title: '', category: 'co-star', location: '', description: ''});
            fetchAds();
        } catch(e) { console.error('Error creating ad', e); }
        setLoading(false);
    };

    return (
        <div className="space-y-6 flex flex-col h-full font-sans">
            <div className="flex justify-between items-center bg-[#121212] border border-[#2A2A2A] rounded p-4">
               <div>
                   <h2 className="text-sm font-bold text-[#EAB308] uppercase tracking-wider">Vetted Member Network</h2>
                   <p className="text-[10px] text-gray-500">Secure internal board for vetted BNE members seeking dates, co-stars, locations, and staff.</p>
               </div>
               <button onClick={() => setShowNew(!showNew)} className="text-[10px] border border-[#EAB308]/30 bg-[#EAB308]/10 text-[#EAB308] px-3 py-1 font-bold rounded uppercase hover:bg-[#EAB308]/20 transition-colors">
                   {showNew ? 'Cancel' : 'Post Listing'}
               </button>
            </div>

            {showNew && (
                <div className="bg-[#121212] border border-[#2A2A2A] p-4 rounded space-y-4 max-w-2xl">
                     <h3 className="font-bold text-[10px] text-[#EAB308] uppercase tracking-widest border-b border-[#2A2A2A] pb-2">New Posting</h3>
                     <div className="grid grid-cols-2 gap-4">
                         <div>
                             <label className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1 block">Title</label>
                             <input type="text" className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#EAB308] text-gray-300" value={newAd.title} onChange={e => setNewAd({...newAd, title: e.target.value})} placeholder="Looking for collab..." />
                         </div>
                         <div>
                             <label className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1 block">Category</label>
                             <select className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#EAB308] text-gray-300" value={newAd.category} onChange={e => setNewAd({...newAd, category: e.target.value})}>
                                 <option value="co-star">Co-Star / Model</option>
                                 <option value="location">Shooting Location</option>
                                 <option value="prop">Props / Equipment</option>
                                 <option value="security">Security</option>
                                 <option value="driver">Driver</option>
                             </select>
                         </div>
                     </div>
                     <div>
                         <label className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1 block">Location / Zip Code</label>
                         <input type="text" className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#EAB308] text-gray-300" value={newAd.location} onChange={e => setNewAd({...newAd, location: e.target.value})} placeholder="e.g. 90210" />
                     </div>
                     <div>
                         <label className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1 block">Description</label>
                         <textarea className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#EAB308] text-gray-300 h-24" value={newAd.description} onChange={e => setNewAd({...newAd, description: e.target.value})} placeholder="Provide details about what you need..."></textarea>
                     </div>
                     <button disabled={loading} onClick={handleCreate} className="bg-[#EAB308]/10 hover:bg-[#EAB308]/20 border border-[#EAB308]/30 px-4 py-2 rounded text-[#EAB308] text-[10px] uppercase font-bold tracking-widest transition-colors">
                        Publish to Board
                     </button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ads.map(ad => (
                    <div key={ad.id} className="bg-[#121212] border border-[#2A2A2A] p-4 rounded flex flex-col h-48">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 uppercase tracking-widest">{ad.category}</span>
                            <div className="flex items-center text-[9px] text-gray-500 uppercase"><MapPin className="w-3 h-3 mr-1"/> {ad.location}</div>
                        </div>
                        <h4 className="text-sm font-bold text-[#EAB308] mb-1 truncate">{ad.title}</h4>
                        <p className="text-[11px] text-gray-400 mb-2 flex-1 overflow-hidden">{ad.description}</p>
                        
                        <div className="pt-2 border-t border-[#2A2A2A] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <UserCircle className="w-4 h-4 text-gray-500" />
                                <span className="text-[10px] font-bold text-gray-300">{ad.ownerPersona}</span>
                            </div>
                            {user?.uid !== ad.ownerId && (
                                <button className="text-[9px] text-blue-400 border border-blue-400/30 px-2 py-0.5 rounded uppercase font-bold hover:bg-blue-400/10 transition-colors">
                                   DM
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {ads.length === 0 && <div className="text-center p-10 border border-[#2A2A2A] rounded bg-[#121212] text-gray-500 text-[10px] uppercase font-bold tracking-widest">No active postings found.</div>}
        </div>
    )
}

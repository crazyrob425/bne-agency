import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

export default function AccountPage() {
    const { user, dbUser } = useAuth();
    const [loading, setLoading] = useState(false);
    
    // Form state
    const [persona, setPersona] = useState(dbUser?.persona || '');
    const [contactInfo, setContactInfo] = useState(dbUser?.contactInfo || '');

    useEffect(() => {
        if (dbUser) {
           setPersona(dbUser.persona || '');
           setContactInfo(dbUser.contactInfo || '');
        }
    }, [dbUser]);

    const handleUpdate = async () => {
       if (!user) return;
       setLoading(true);
       try {
           await updateDoc(doc(db, 'users', user.uid), {
               persona,
               contactInfo
           });
           alert("Profile updated successfully!");
       } catch(e) { console.error('Error updating profile', e); }
       setLoading(false);
    };

    return (
        <div className="space-y-6 max-w-2xl font-sans h-full flex flex-col">
            <div className="bg-[#121212] border border-[#2A2A2A] rounded p-4">
               <h2 className="text-sm font-bold text-[#EAB308] uppercase tracking-wider mb-2">Account Administration</h2>
               <p className="text-[10px] text-gray-500 uppercase tracking-widest">Manage your profile securely</p>
            </div>
            
            <div className="bg-[#121212] border border-[#2A2A2A] p-4 rounded space-y-4">
                 <div>
                     <label className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1 block">Public Persona</label>
                     <p className="text-[9px] text-gray-600 mb-2">This name is shown to other members on the Co-Star Board.</p>
                     <input type="text" className="w-full max-w-md bg-[#0A0A0A] border border-[#2A2A2A] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#EAB308] text-gray-300" value={persona} onChange={e => setPersona(e.target.value)} placeholder="e.g. Lexi" />
                 </div>
                 
                 <div>
                     <label className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1 block">Encrypted Contact Information</label>
                     <p className="text-[9px] text-gray-600 mb-2">Private contact info for admin use and emergency contacts.</p>
                     <textarea className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#EAB308] text-gray-300 h-24" value={contactInfo} onChange={e => setContactInfo(e.target.value)} placeholder="Phone, telegram, alternate emails..."></textarea>
                 </div>
                 
                 <div className="pt-4 border-t border-[#2A2A2A]">
                     <button disabled={loading} onClick={handleUpdate} className="bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20 px-4 py-2 rounded text-[10px] font-bold tracking-widest flex items-center gap-2 hover:bg-[#EAB308]/20 transition-colors uppercase">
                        {loading ? <Loader2 className="w-3 h-3 animate-spin"/> : null} 
                        Save Adjustments
                     </button>
                 </div>
            </div>

            <div className="bg-red-900/10 border border-red-900/30 p-4 rounded">
                 <h3 className="text-[10px] font-bold text-red-500 mb-2 uppercase tracking-widest">Danger Zone</h3>
                 <p className="text-[10px] text-gray-500 mb-4">Requesting account cancellation will queue your account for admin review. Once cancelled, your account will be suspended for 90 days before permanent deletion.</p>
                 <button className="bg-red-900/20 hover:bg-red-900/40 border border-red-900/50 text-red-400 font-bold px-4 py-2 rounded text-[10px] uppercase tracking-widest transition-colors">
                     Request Account Cancellation
                 </button>
            </div>
        </div>
    )
}

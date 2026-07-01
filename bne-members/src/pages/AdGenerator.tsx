import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp } from 'firebase/firestore';
import { Loader2, Plus, RefreshCw, Copy, Check, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function AdGenerator() {
    const { user, dbUser } = useAuth();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [savedAds, setSavedAds] = useState<any[]>([]);
    
    // Form state
    const [formData, setFormData] = useState({
        persona: dbUser?.persona || '',
        age: '',
        city: '',
        description: '',
        favorites: '',
        hardNos: '',
        extraInfo: '',
        urls: [] as string[]
    });

    const [generatedHtml, setGeneratedHtml] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!user) return;
        const fetchAds = async () => {
            const q = query(collection(db, 'adTemplates'), where('ownerId', '==', user.uid), orderBy('createdAt', 'desc'));
            const snap = await getDocs(q);
            setSavedAds(snap.docs.map(d => ({id: d.id, ...d.data()})));
        }
        fetchAds();
    }, [user]);

    const handleGenerate = async () => {
        setLoading(true);
        try {
           const res = await fetch('/api/generate-ad', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': `Bearer temp`
               },
               body: JSON.stringify({ answers: formData })
           });
           const data = await res.json();
           if (data.error) throw new Error(data.error);

           setGeneratedHtml(data.result);
           setStep(3);
        } catch(e) {
           console.error(e);
           alert("Error generating ad");
        }
        setLoading(false);
    }

    const handleSave = async () => {
       if (!user) return;
       try {
          const docRef = await addDoc(collection(db, 'adTemplates'), {
              ownerId: user.uid,
              title: `${formData.persona} - ${new Date().toLocaleDateString()}`,
              htmlContent: generatedHtml,
              createdAt: serverTimestamp()
          });
          setSavedAds([...savedAds, { id: docRef.id, title: `${formData.persona} - ${new Date().toLocaleDateString()}`, htmlContent: generatedHtml }]);
          alert("Saved to templates!");
       } catch(e) {
           console.error(e);
       }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="space-y-6 flex flex-col h-full font-sans">
            <div className="flex items-center justify-between bg-[#121212] border border-[#2A2A2A] rounded p-4">
                <h2 className="text-sm font-bold text-[#EAB308] uppercase tracking-wider">Classified Ad Generator AI</h2>
                {step === 1 && <button onClick={() => setStep(2)} className="bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20 px-3 py-1.5 rounded text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 hover:bg-[#EAB308]/20 transition-colors"><Plus className="w-3 h-3"/> New Ad Setup</button>}
                {step > 1 && <button onClick={() => setStep(1)} className="text-[10px] text-gray-500 hover:text-white uppercase font-bold tracking-widest">Cancel / Back</button>}
            </div>

            {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#121212] border border-[#2A2A2A] p-4 rounded h-64 flex flex-col">
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-[#2A2A2A] pb-2">Saved Ads (Top 5)</h3>
                        <div className="space-y-2 overflow-y-auto flex-1">
                            {savedAds.slice(0, 5).map(ad => (
                                <div key={ad.id} className="bg-[#0A0A0A] border border-[#2A2A2A] p-2 rounded flex items-center justify-between group">
                                    <div className="overflow-hidden">
                                        <p className="text-xs font-bold text-gray-200 truncate">{ad.title}</p>
                                        <p className="text-[9px] text-gray-500 uppercase">Includes Formatted HTML</p>
                                    </div>
                                    <button onClick={() => copyToClipboard(ad.htmlContent)} className="text-[9px] text-blue-400 border border-blue-400/30 px-2 py-1 rounded uppercase font-bold hover:bg-blue-400/10 transition-colors">Copy</button>
                                </div>
                            ))}
                            {savedAds.length === 0 && <div className="text-center p-4 border border-[#2A2A2A] border-dashed rounded text-gray-500 text-[10px] uppercase font-bold tracking-widest">No saved ads yet.</div>}
                        </div>
                    </div>
                    
                    <div className="bg-[#121212] border border-[#2A2A2A] p-4 rounded h-64 flex flex-col">
                        <h3 className="text-[10px] font-bold text-[#EAB308] uppercase tracking-widest mb-3">System Features Active</h3>
                        <ul className="text-gray-400 space-y-2 text-[11px] list-none p-0 flex-1">
                            <li className="flex items-center gap-2 border-b border-[#2A2A2A] pb-2"><Check className="w-3 h-3 text-green-500"/> 100% compliant with classified TOS</li>
                            <li className="flex items-center gap-2 border-b border-[#2A2A2A] pb-2"><Check className="w-3 h-3 text-green-500"/> Automatically injects 2257 Record disclaimers</li>
                            <li className="flex items-center gap-2 border-b border-[#2A2A2A] pb-2"><Check className="w-3 h-3 text-green-500"/> Secure inclusion of your hosted Files</li>
                            <li className="flex items-center gap-2"><Check className="w-3 h-3 text-green-500"/> AI rewriting for high-converting copy</li>
                        </ul>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="bg-[#121212] border border-[#2A2A2A] p-4 rounded flex-1 overflow-y-auto">
                    <div className="flex justify-between items-center mb-4 border-b border-[#2A2A2A] pb-2">
                        <h3 className="text-[10px] font-bold text-[#EAB308] uppercase tracking-widest">Generation Phase I: Data Interrogation</h3>
                        <span className="text-[9px] bg-blue-600/20 text-blue-400 border border-blue-600/30 px-2 py-0.5 rounded uppercase font-bold">AI Refinement Pending</span>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Persona Name</label>
                                <input type="text" className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#EAB308] text-gray-200" value={formData.persona} onChange={e => setFormData({...formData, persona: e.target.value})} placeholder="e.g. Lexi" />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Age</label>
                                <input type="text" className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#EAB308] text-gray-200" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} placeholder="e.g. 23" />
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Location / General Area</label>
                            <input type="text" className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#EAB308] text-gray-200" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="Downtown LA" />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Body Type & Description</label>
                            <textarea className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#EAB308] text-gray-200 h-20" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Brunette, petite, natural..." />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Favorites Menu (Services)</label>
                            <textarea className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#EAB308] text-gray-200 h-20" value={formData.favorites} onChange={e => setFormData({...formData, favorites: e.target.value})} placeholder="List your specialties..." />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Hard No's (Boundaries)</label>
                            <input type="text" className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#EAB308] text-gray-200" value={formData.hardNos} onChange={e => setFormData({...formData, hardNos: e.target.value})} placeholder="Greek, bare, etc." />
                        </div>
                        <div className="pt-4 flex justify-end gap-3 border-t border-[#2A2A2A]">
                            <button onClick={() => setStep(1)} className="px-3 py-1.5 text-[10px] text-gray-500 hover:text-white uppercase font-bold tracking-widest border border-transparent">Cancel</button>
                            <button disabled={loading} onClick={handleGenerate} className="bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20 px-4 py-1.5 rounded text-[10px] font-bold tracking-widest flex items-center gap-2 hover:bg-[#EAB308]/20 transition-colors uppercase">
                                {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />} Execute Generation
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="bg-[#121212] border border-[#2A2A2A] p-4 rounded flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-4 border-b border-[#2A2A2A] pb-2">
                        <h3 className="text-[10px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-2"><Check className="w-4 h-4"/> AI Generation Complete</h3>
                        <div className="flex gap-2">
                             <button onClick={() => setStep(2)} className="text-[9px] text-gray-400 hover:text-white border border-[#3A3A3A] bg-[#2A2A2A] px-2 py-1 rounded uppercase font-bold">Edit Inputs</button>
                             <button onClick={handleSave} className="text-[9px] text-[#EAB308] border border-[#EAB308]/30 bg-[#EAB308]/10 px-2 py-1 rounded uppercase font-bold hover:bg-[#EAB308]/20">Save to Vault</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
                       <div className="flex flex-col">
                           <div className="flex justify-between items-end mb-2">
                                <label className="text-[10px] uppercase font-bold text-gray-500">Raw HTML Code Output</label>
                                <button onClick={() => copyToClipboard(generatedHtml)} className="text-[9px] text-blue-400 border border-blue-400/30 px-2 py-0.5 rounded uppercase font-bold hover:bg-blue-400/10 transition-colors flex items-center gap-1">{copied ? 'COPIED!' : 'COPY CODE'}</button>
                           </div>
                           <textarea readOnly className="flex-1 w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded p-4 text-gray-400 font-mono text-[10px] focus:outline-none" value={generatedHtml}></textarea>
                       </div>
                       
                       <div className="flex flex-col">
                           <label className="text-[10px] uppercase font-bold text-gray-500 mb-2">Visual Preview Stage</label>
                           <div className="flex-1 bg-white text-black border border-[#2A2A2A] rounded p-4 overflow-y-auto w-full prose prose-sm prose-p:text-black text-sm">
                               <div dangerouslySetInnerHTML={{ __html: generatedHtml }} />
                           </div>
                       </div>
                    </div>
                </div>
            )}
        </div>
    )
}

import { useState, useEffect } from 'react';
import { getAccessToken, loginWithGoogle } from '../lib/firebase';
import { FileText, RefreshCw } from 'lucide-react';

interface KeepNote {
    name: string;
    body?: { text?: { text?: string } };
    title?: string;
    createTime?: string;
}

export default function KeepNotes() {
    const [notes, setNotes] = useState<KeepNote[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchNotes = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = await getAccessToken();
            if (!token) {
                // Not authenticated for Google APIs specifically or token missing
                setError('Google authentication required to view Keep Notes.');
                setLoading(false);
                return;
            }

            const res = await fetch('https://keep.googleapis.com/v1/notes', {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            if (!res.ok) {
                if (res.status === 401 || res.status === 403) {
                     setError('You must grant the Google Keep permission to view notes.');
                } else {
                     setError(`Failed to fetch notes: ${res.statusText}`);
                }
                setLoading(false);
                return;
            }

            const data = await res.json();
            setNotes(data.notes || []);
        } catch (err: any) {
            setError(err.message || 'An error occurred fetching notes.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleGrantAccess = async () => {
        try {
            await loginWithGoogle();
            fetchNotes();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="space-y-6 flex flex-col font-sans h-full">
            <div className="flex justify-between items-center bg-[#121212] border border-[#2A2A2A] rounded p-4">
                 <div>
                     <h2 className="text-sm font-bold text-[#34A853] uppercase tracking-wider flex items-center gap-2">
                         <FileText className="w-5 h-5" /> Google Keep Workspace
                     </h2>
                     <p className="text-[10px] text-gray-500 mt-1">Directly view and reference your Google Keep notes.</p>
                 </div>
                 <button onClick={fetchNotes} className="p-2 border border-[#2A2A2A] bg-[#1A1A1A] hover:bg-[#2A2A2A] rounded transition-colors text-gray-400 hover:text-white">
                     <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                 </button>
            </div>

            {error && (
                <div className="bg-[#1A1A1A] border-l-4 border-rose-500 p-4">
                    <p className="text-sm text-gray-300">{error}</p>
                    <button 
                         onClick={handleGrantAccess} 
                         className="mt-4 px-4 py-2 border border-[#34A853] text-[#34A853] hover:bg-[#34A853]/10 text-xs font-bold uppercase rounded"
                    >
                         Grant Keep Access
                    </button>
                </div>
            )}

            {!error && !loading && notes.length === 0 && (
                 <div className="flex-1 flex items-center justify-center border border-[#2A2A2A] rounded bg-[#121212]">
                     <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">No notes found or loading.</p>
                 </div>
            )}

            {!error && notes.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max overflow-y-auto">
                    {notes.map(note => (
                        <div key={note.name} className="bg-[#121212] border border-[#2A2A2A] p-4 rounded-md flex flex-col h-full hover:border-[#34A853]/50 transition-colors">
                             <h3 className="text-sm font-bold text-gray-200 mb-2 truncate">
                                 {note.title || 'Untitled Note'}
                             </h3>
                             <p className="text-xs text-gray-400 whitespace-pre-wrap flex-1 overflow-y-auto max-h-48 scrollbar-thin">
                                 {note.body?.text?.text || 'No text content'}
                             </p>
                             {note.createTime && (
                                <p className="text-[9px] text-gray-600 mt-4 text-right">
                                    {new Date(note.createTime).toLocaleDateString()}
                                </p>
                             )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

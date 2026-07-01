import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Home() {
    const { user, dbUser } = useAuth();
    
    return (
        <div className="space-y-6 flex flex-col h-full font-sans">
            <div className="bg-[#121212] border border-[#2A2A2A] p-6 rounded relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#EAB308]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                
                <h1 className="text-xl font-bold tracking-tighter text-white mb-1 relative z-10">Welcome back, <span className="text-[#EAB308]">{dbUser?.persona || user?.email?.split('@')[0]}</span></h1>
                <p className="text-xs text-gray-400 max-w-xl relative z-10 mb-6">Access your exclusive B.N.E. resources, manage your secure messages, and generate high-impact classified ads.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                    <Link to="/storage" className="bg-[#0A0A0A] border border-[#2A2A2A] hover:border-[#EAB308]/50 p-4 rounded flex flex-col items-start space-y-3 transition-colors">
                        <div className="text-[10px] bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20 px-2 py-1 uppercase font-bold tracking-widest rounded">Step 1</div>
                        <div>
                            <h3 className="text-sm font-bold text-white mb-1">Host your Media</h3>
                            <p className="text-[11px] text-gray-500 leading-relaxed">Upload images to get secure URLs for your ads.</p>
                        </div>
                    </Link>
                    <Link to="/classified-gen" className="bg-[#0A0A0A] border border-[#2A2A2A] hover:border-[#EAB308]/50 p-4 rounded flex flex-col items-start space-y-3 transition-colors">
                        <div className="text-[10px] bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20 px-2 py-1 uppercase font-bold tracking-widest rounded">Step 2</div>
                        <div>
                            <h3 className="text-sm font-bold text-white mb-1">Generate Ads</h3>
                            <p className="text-[11px] text-gray-500 leading-relaxed">Use AI to generate and format perfect classified ads.</p>
                        </div>
                    </Link>
                    <Link to="/messages" className="bg-[#0A0A0A] border border-[#2A2A2A] hover:border-[#EAB308]/50 p-4 rounded flex flex-col items-start space-y-3 transition-colors">
                        <div className="text-[10px] bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20 px-2 py-1 uppercase font-bold tracking-widest rounded">Step 3</div>
                        <div>
                            <h3 className="text-sm font-bold text-white mb-1">Secure Messaging</h3>
                            <p className="text-[11px] text-gray-500 leading-relaxed">Private communication with BNE Staff and Members.</p>
                        </div>
                    </Link>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="bg-[#121212] border border-[#2A2A2A] p-4 rounded h-48 flex flex-col">
                     <h2 className="text-sm font-bold text-[#EAB308] uppercase tracking-wider mb-4">Latest Co-Star Board Postings</h2>
                     <div className="flex-1 bg-[#0A0A0A] border border-[#2A2A2A] rounded flex items-center justify-center">
                         <p className="text-gray-500 text-xs">Check the Co-Star Board for new collaboration opportunities.</p>
                     </div>
                 </div>
                 <div className="bg-[#121212] border border-[#2A2A2A] p-4 rounded h-48 flex flex-col">
                     <h2 className="text-sm font-bold text-[#EAB308] uppercase tracking-wider mb-4">Recent Messages</h2>
                     <div className="flex-1 bg-[#0A0A0A] border border-[#2A2A2A] rounded flex items-center justify-center">
                         <p className="text-gray-500 text-xs">No new messages.</p>
                     </div>
                 </div>
            </div>
        </div>
    );
}

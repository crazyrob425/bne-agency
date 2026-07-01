import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import AdGenerator from './pages/AdGenerator';
import FilePortal from './pages/FilePortal';
import MiniBoard from './pages/MiniBoard';
import AccountPage from './pages/AccountPage';
import AdminDashboard from './pages/AdminDashboard';
import Messages from './pages/Messages';
import KeepNotes from './pages/KeepNotes';
import AskAIPage from './pages/AskAIPage';

const Login = () => {
    const { login, authError } = useAuth();
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0] font-sans flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-[#121212] border border-[#2A2A2A] rounded flex flex-col overflow-hidden">
                <div className="p-8 text-center border-b border-[#2A2A2A]">
                    <h1 className="text-3xl font-bold tracking-tighter text-white">B.N.E. <span className="text-[#EAB308] font-light">PORTAL</span></h1>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Blacklisted Niche Entertainment</p>
                </div>
                <div className="p-8 bg-[#0F0F0F]">
                   <p className="text-xs text-center text-gray-400 mb-6 font-mono">ENCRYPTED LOGIN REQUIRED</p>
                   
                   {authError && (
                     <div className="bg-rose-900/20 border-l-4 border-rose-500 p-3 mb-4">
                       <p className="text-xs text-rose-300 font-mono">{authError}</p>
                     </div>
                   )}
                   
                   <button 
                      onClick={login}
                      className="w-full bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20 font-bold py-3 px-4 rounded text-sm hover:bg-[#EAB308]/20 transition-colors uppercase tracking-wider"
                   >
                       Authenticate via Google
                   </button>
                </div>
            </div>
            
            <div className="mt-8 flex items-center space-x-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Secure Connection Active</span>
            </div>
        </div>
    );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, dbUser } = useAuth();
    if (!user) return <Navigate to="/login" />;
    
    // Check suspension/archived logic here
    if (dbUser?.status === 'suspended') {
       return <div className="p-8 text-center text-rose-500">Account Suspended. Contact Admin.</div>;
    }
    return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
        <BrowserRouter basename="/members">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                    <Route index element={<Home />} />
                    {/* Placeholder routes */}
                    <Route path="messages" element={<Messages />} />
                    <Route path="storage" element={<FilePortal />} />
                    <Route path="classified-gen" element={<AdGenerator />} />
                    <Route path="mini-board" element={<MiniBoard />} />
                    <Route path="account" element={<AccountPage />} />
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="notes" element={<KeepNotes />} />
                    <Route path="ask-ai" element={<AskAIPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
}

import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../lib/firebase';
import { LogOut, Home, MessageSquare, Files, Settings, UserCircle, Briefcase } from 'lucide-react';

export default function Layout() {
  const { user, dbUser, isSpoofing, setOverrideUser, hasPermission } = useAuth();

  return (
    <div className="flex w-full h-screen bg-[#0A0A0A] text-[#E0E0E0] font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 bg-[#121212] border-r border-[#2A2A2A] flex flex-col hidden md:flex">
        <div className="p-6 border-b border-[#2A2A2A]">
          <h1 className="text-xl font-bold tracking-tighter text-white">B.N.E. <span className="text-[#EAB308] font-light">PORTAL</span></h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Blacklisted Niche Entertainment</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2 px-2">Navigation</div>
          
          <Link to="/" className="w-full flex items-center space-x-3 text-gray-400 px-3 py-2 hover:bg-[#1A1A1A] rounded transition-colors">
            <Home className="w-4 h-4" /> <span className="text-sm">Command Center</span>
          </Link>
          
          {hasPermission('messaging') && (
            <Link to="/messages" className="w-full flex items-center space-x-3 text-gray-400 px-3 py-2 hover:bg-[#1A1A1A] rounded transition-colors">
              <MessageSquare className="w-4 h-4" /> <span className="text-sm">Secure Inbox</span>
            </Link>
          )}

          {hasPermission('vault') && (
            <Link to="/storage" className="w-full flex items-center space-x-3 text-gray-400 px-3 py-2 hover:bg-[#1A1A1A] rounded transition-colors">
              <Files className="w-4 h-4" /> <span className="text-sm">Vault Storage</span>
            </Link>
          )}

          {hasPermission('tools') && (
            <Link to="/classified-gen" className="w-full flex items-center space-x-3 text-gray-400 px-3 py-2 hover:bg-[#1A1A1A] rounded transition-colors">
              <Briefcase className="w-4 h-4" /> <span className="text-sm">Ad Studio AI</span>
            </Link>
          )}
          
          <Link to="/notes" className="w-full flex items-center space-x-3 text-[#34A853] px-3 py-2 hover:bg-[#1A1A1A] rounded transition-colors">
            <Files className="w-4 h-4" /> <span className="text-sm border-l-2 border-[#34A853] pl-2">Google Keep</span>
          </Link>

          <Link to="/mini-board" className="w-full flex items-center space-x-3 text-gray-400 px-3 py-2 hover:bg-[#1A1A1A] rounded transition-colors">
            <UserCircle className="w-4 h-4" /> <span className="text-sm">Vetted Multi-Date</span>
          </Link>

          <div className="pt-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2 px-2">Account Admin</div>

          <Link to="/account" className="w-full flex items-center space-x-3 text-gray-400 px-3 py-2 hover:bg-[#1A1A1A] rounded transition-colors">
            <Settings className="w-4 h-4" /> <span className="text-sm">Settings & Subs</span>
          </Link>

          {(dbUser?.role === 'admin' || hasPermission('admin')) && (
             <>
                <Link to="/admin" className="w-full flex items-center space-x-3 text-rose-400 px-3 py-2 hover:bg-rose-950/30 rounded transition-colors">
                  <Settings className="w-4 h-4" /> <span className="text-sm">Admin Access</span>
                </Link>
                <Link to="/ask-ai" className="w-full flex items-center space-x-3 text-purple-400 px-3 py-2 hover:bg-purple-900/30 rounded transition-colors">
                  <MessageSquare className="w-4 h-4" /> <span className="text-sm">Ask BNE AI</span>
                </Link>
             </>
          )}
        </nav>

        <div className="p-4 border-t border-[#2A2A2A] bg-[#0F0F0F]">
          <div className="flex items-center space-x-3 flex-1 overflow-hidden">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-[#EAB308] to-[#F59E0B] flex items-center justify-center font-bold text-black text-xs">
              {dbUser?.persona?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold truncate" title={dbUser?.persona || user?.email || ""}>{dbUser?.persona || user?.email}</p>
                  {user?.email === 'blacklistedrob@gmail.com' && (
                      <span className="bg-[#EAB308] text-black text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest shrink-0">OWNER</span>
                  )}
                  {dbUser?.role === 'admin' && user?.email !== 'blacklistedrob@gmail.com' && (
                      <span className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest shrink-0">Admin</span>
                  )}
              </div>
              <p className="text-[10px] text-green-500 uppercase flex items-center gap-1">
                 {dbUser?.role === 'admin' ? 'ADMIN : ACCESS GRANTED' : 'PRO MEMBER'}
              </p>
            </div>
            <button onClick={logout} className="p-2 hover:bg-[#1A1A1A] rounded text-gray-500 hover:text-white" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full bg-[#0A0A0A]">
         <header className="h-16 bg-[#121212] border-b border-[#2A2A2A] flex items-center justify-between px-4 md:px-6 shrink-0">
           <div className="flex items-center space-x-4">
             <span className="text-[10px] md:text-xs font-mono text-gray-500">STATUS: <span className="text-green-500 uppercase">Secure Link</span></span>
           </div>
           
           <div className="flex items-center space-x-4 md:space-x-6">
             {/* Mobile Navigation Dropdown Alternative / Logout */}
             <div className="md:hidden flex space-x-2">
                 <Link to="/" className="text-gray-400 p-2"><Home className="w-4 h-4" /></Link>
                 <button onClick={logout} className="text-gray-400 p-2"><LogOut className="w-4 h-4" /></button>
             </div>
           </div>
         </header>
         {isSpoofing && (
             <div className="bg-rose-600 text-white px-4 py-2 flex items-center justify-between text-xs font-bold uppercase shrink-0">
                <span>Currently Spoofing User: {user?.email}</span>
                <button onClick={() => setOverrideUser(null)} className="px-3 py-1 bg-black/20 hover:bg-black/40 rounded transition-colors">Exit Portal</button>
             </div>
         )}
         <div className="flex-1 p-4 md:p-6 overflow-hidden overflow-y-auto">
            <Outlet />
         </div>
         {/* Footer per mockup */}
         <footer className="h-10 shrink-0 bg-[#0A0A0A] border-t border-[#2A2A2A] px-6 hidden md:flex items-center justify-between">
           <div className="flex items-center space-x-4">
             <span className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">System Build: 4.1.0-STABLE</span>
           </div>
           <div className="flex items-center space-x-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">Admin Monitor: ACTIVE</span>
           </div>
         </footer>
      </main>
    </div>
  );
}

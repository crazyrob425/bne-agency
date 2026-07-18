import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, Activity, Clock, ShieldAlert, Settings, X } from 'lucide-react';
import { toast } from 'sonner';

const COLORS = ['#10B981', '#EAB308', '#EF4444', '#3B82F6'];

const mockRetentionData = [
  { month: 'Jan', active: 120, churned: 5 },
  { month: 'Feb', active: 135, churned: 3 },
  { month: 'Mar', active: 142, churned: 8 },
  { month: 'Apr', active: 138, churned: 12 },
  { month: 'May', active: 165, churned: 4 },
  { month: 'Jun', active: 180, churned: 2 },
];

const mockExpirationData = [
  { group: '0-7 Days', users: 12 },
  { group: '8-14 Days', users: 24 },
  { group: '15-30 Days', users: 45 },
  { group: '30+ Days', users: 110 },
];

export default function AdminDashboard() {
    const { user, dbUser, setOverrideUser } = useAuth();
    const [users, setUsers] = useState<any[]>([]);
    const [applications, setApplications] = useState<any[]>([]);
    const [newEmail, setNewEmail] = useState('');
    const [adding, setAdding] = useState(false);
    const [editingUser, setEditingUser] = useState<any | null>(null);
    const [editPermissions, setEditPermissions] = useState<Record<string, boolean>>({});
    const [savingPermissions, setSavingPermissions] = useState(false);

    useEffect(() => {
        if (dbUser?.role !== 'admin') return;
        const fetchUsers = async () => {
            const q = query(collection(db, 'users'));
            const snap = await getDocs(q);
            setUsers(snap.docs.map(d => ({id: d.id, ...d.data()})));
        };
        const fetchPgUsers = async () => {
            try {
                const res = await fetch('/api/admin/users');
                const data = await res.json();
                if (data.users) {
                    // Merge Postgres users with Firestore users
                    setUsers(prev => {
                        const firebaseIds = new Set(prev.map(u => u.email?.toLowerCase()));
                        const pgUsers = data.users.filter((u: any) => !firebaseIds.has(u.email?.toLowerCase()));
                        return [...prev, ...pgUsers.map((u: any) => ({ ...u, id: u.id.toString() }))];
                    });
                }
            } catch(e) { console.error('Error fetching Postgres users', e); }
        };
        const fetchApps = async () => {
            try {
                const res = await fetch('/api/admin/applications');
                const data = await res.json();
                if (data.applications) setApplications(data.applications);
            } catch(e) { console.error('Error fetching applications', e); }
        };
        fetchUsers();
        fetchPgUsers();
        fetchApps();
    }, [dbUser]);

    const handleUpdateStatus = async (userId: string, newStatus: string) => {
        try {
            await updateDoc(doc(db, 'users', userId), { status: newStatus });
            setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
        } catch(e) { console.error('Error updating status', e); }
    };

    const handleAddMember = async () => {
        if(!newEmail || !newEmail.includes('@')) return;
        setAdding(true);
        try {
             const uid = 'invite_' + new Date().getTime(); // Temporary ID, when they actually sign in Google Auth makes a real one, but they can be manually migrated or we just let them log in. For a robust system, we would just whitelist emails in a separate collection.
             
             // Quick implementation: adding directly to users might not link to their actual Google Auth UID unless we use Admin SDK, 
             // but we can simulate the "Onboard" by creating a placeholder.
             await setDoc(doc(db, 'users_whitelist', newEmail.toLowerCase()), {
                 email: newEmail.toLowerCase(),
                 status: 'active',
                 createdAt: new Date().toISOString()
             });
             alert('Added to whitelist. When they log in, they will be granted member access.');
             setNewEmail('');
        } catch(e) {
             console.error('Error adding member', e);
        } finally {
             setAdding(false);
        }
    };

    const handleEditPermissions = (u: any) => {
        setEditingUser(u);
        setEditPermissions(u.membersPermissions || {
            dashboard: true,
            vault: false,
            tools: false,
            admin: false,
            messaging: false,
            billing: false,
        });
    };

    const handleSavePermissions = async () => {
        if (!editingUser) return;
        setSavingPermissions(true);
        try {
            const userId = typeof editingUser.id === 'string' ? parseInt(editingUser.id) : editingUser.id;
            const endpoint = `/api/admin/users/${userId}/permissions`;
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    membersAccessGranted: true,
                    permissions: editPermissions,
                }),
            });
            if (res.ok) {
                setUsers(users.map(u => u.id === editingUser.id ? { ...u, membersAccessGranted: 1, membersPermissions: editPermissions } : u));
                setEditingUser(null);
                toast?.success('Permissions updated successfully');
            }
        } catch (e) {
            console.error('Error saving permissions:', e);
        } finally {
            setSavingPermissions(false);
        }
    };

    if (dbUser?.role !== 'admin') return <div className="p-10 text-center text-rose-500">Access Denied. Admins Only.</div>;

    return (
        <div className="space-y-6 font-sans flex flex-col h-full">
            <div className="bg-[#121212] border border-[#2A2A2A] rounded p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <div>
                     <h2 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-1">System Administration Monitor</h2>
                     <p className="text-[10px] text-gray-500 uppercase tracking-widest">Manage BNE members, account statuses, and system settings.</p>
                 </div>
                 
                 <div className="flex items-center gap-2 bg-[#0A0A0A] p-2 rounded border border-[#2A2A2A]">
                     <input 
                        type="email" 
                        placeholder="New member email..." 
                        className="bg-transparent text-xs text-white px-2 py-1 outline-none min-w-[150px]"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                     />
                     <button 
                        onClick={handleAddMember}
                        disabled={adding}
                        className="text-[10px] bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-widest px-3 py-1.5 rounded transition-colors"
                     >
                         {adding ? '...' : 'Whitelist User'}
                     </button>
                 </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#121212] border border-[#2A2A2A] rounded p-4 flex flex-col items-center justify-center text-center">
                    <Users className="w-5 h-5 text-blue-400 mb-2" />
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Total Members</p>
                    <p className="text-2xl font-bold text-white">{users.length || 1}</p>
                </div>
                <div className="bg-[#121212] border border-[#2A2A2A] rounded p-4 flex flex-col items-center justify-center text-center">
                    <Activity className="w-5 h-5 text-green-400 mb-2" />
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Most Active</p>
                    <p className="text-xs font-bold text-white mt-1 truncate w-full max-w-[120px]">{users.slice(0,1)[0]?.email || 'N/A'}</p>
                </div>
                <div className="bg-[#121212] border border-[#2A2A2A] rounded p-4 flex flex-col items-center justify-center text-center">
                    <Clock className="w-5 h-5 text-purple-400 mb-2" />
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Newest Member</p>
                    <p className="text-xs font-bold text-white mt-1 truncate w-full max-w-[120px]">{users[users.length - 1]?.email || 'N/A'}</p>
                </div>
                <div className="bg-[#121212] border border-[#2A2A2A] rounded p-4 flex flex-col items-center justify-center text-center overflow-hidden">
                    <ShieldAlert className="w-5 h-5 text-rose-400 mb-2" />
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Recent Logins (Top 3)</p>
                    <div className="mt-1 space-y-1 w-full">
                        {users.slice(0,3).map((u, i) => (
                           <p key={i} className="text-[9px] text-gray-300 truncate w-full">{u.email}</p>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <div className="bg-[#121212] border border-[#2A2A2A] rounded p-4 lg:col-span-2">
                     <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Member Retention (6 Mo)</h3>
                     <div className="h-64 w-full">
                         <ResponsiveContainer width="100%" height="100%">
                             <LineChart data={mockRetentionData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                 <Line type="monotone" dataKey="active" stroke="#10B981" strokeWidth={2} />
                                 <Line type="monotone" dataKey="churned" stroke="#EF4444" strokeWidth={2} />
                                 <CartesianGrid stroke="#2A2A2A" strokeDasharray="3 3" vertical={false} />
                                 <XAxis dataKey="month" stroke="#666" tick={{fontSize: 10}} />
                                 <YAxis stroke="#666" tick={{fontSize: 10}} />
                                 <RechartsTooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#2A2A2A', fontSize: '12px' }} />
                                 <Legend wrapperStyle={{ fontSize: '10px' }} />
                             </LineChart>
                         </ResponsiveContainer>
                     </div>
                 </div>

                 <div className="space-y-6">
                     <div className="bg-[#121212] border border-[#2A2A2A] rounded p-4">
                         <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Account Status</h3>
                         <div className="h-32 w-full">
                             <ResponsiveContainer width="100%" height="100%">
                                 <PieChart>
                                     <Pie 
                                         data={[
                                             { name: 'Active', value: users.filter(u => u.status === 'active').length || 1 },
                                             { name: 'Suspended', value: users.filter(u => u.status === 'suspended').length || 0 },
                                             { name: 'Archived', value: users.filter(u => u.status === 'archived').length || 0 }
                                         ]}
                                         innerRadius={30}
                                         outerRadius={45}
                                         paddingAngle={5}
                                         dataKey="value"
                                     >
                                         {[
                                             { name: 'Active', value: users.filter(u => u.status === 'active').length || 1 },
                                             { name: 'Suspended', value: users.filter(u => u.status === 'suspended').length || 0 },
                                             { name: 'Archived', value: users.filter(u => u.status === 'archived').length || 0 }
                                         ].map((entry, index) => (
                                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                         ))}
                                     </Pie>
                                     <RechartsTooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#2A2A2A', fontSize: '10px' }} />
                                 </PieChart>
                             </ResponsiveContainer>
                         </div>
                     </div>
                     
                     <div className="bg-[#121212] border border-[#2A2A2A] rounded p-4">
                         <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Upcoming Renewals</h3>
                         <div className="h-32 w-full">
                             <ResponsiveContainer width="100%" height="100%">
                                 <BarChart data={mockExpirationData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                                     <CartesianGrid stroke="#2A2A2A" strokeDasharray="3 3" vertical={false} />
                                     <XAxis dataKey="group" stroke="#666" tick={{fontSize: 9}} />
                                     <YAxis stroke="#666" tick={{fontSize: 9}} />
                                     <RechartsTooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#2A2A2A', fontSize: '10px' }} cursor={{fill: '#2A2A2A'}} />
                                     <Bar dataKey="users" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                                 </BarChart>
                             </ResponsiveContainer>
                         </div>
                     </div>
                 </div>
            </div>

            <div className="bg-[#121212] border border-[#2A2A2A] rounded overflow-hidden flex-1 overflow-y-auto w-full">
                  <table className="w-full text-left text-[10px] text-gray-400">
                      <thead className="bg-[#1A1A1A] border-b border-[#2A2A2A] text-gray-500 font-bold uppercase tracking-widest">
                          <tr>
                              <th className="px-4 py-3">Email Record</th>
                              <th className="px-4 py-3">System Role</th>
                              <th className="px-4 py-3">Connection Status</th>
                              <th className="px-4 py-3 text-right">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2A2A2A]">
                           {users.map(u => (
                               <tr key={u.id} className="hover:bg-[#1A1A1A] transition-colors">
                                   <td className="px-4 py-3 font-mono text-gray-300">{u.email}</td>
                                   <td className="px-4 py-3">
                                      <span className={`px-2 py-0.5 rounded font-bold uppercase tracking-widest border ${u.role === 'admin' ? 'bg-red-900/20 border-red-900/50 text-red-400' : 'bg-gray-800/50 border-gray-700 text-gray-400'}`}>{u.role}</span>
                                   </td>
                                   <td className="px-4 py-3">
                                       <select 
                                           className={`bg-[#0A0A0A] border border-[#2A2A2A] rounded px-2 py-1 focus:outline-none focus:border-[#EAB308] uppercase font-bold tracking-widest ${u.status === 'active' ? 'text-green-500' : u.status === 'suspended' ? 'text-[#EAB308]' : 'text-red-500'}`}
                                           value={u.status}
                                           onChange={(e) => handleUpdateStatus(u.id, e.target.value)}
                                       >
                                           <option value="active">ACTIVE</option>
                                           <option value="suspended">SUSPENDED (90D)</option>
                                           <option value="archived">ARCHIVED</option>
                                       </select>
                                   </td>
                                   <td className="px-4 py-3 text-right flex justify-end gap-2">
                                       <button 
                                           onClick={() => setOverrideUser(u.id)}
                                           className="text-purple-400 border border-purple-400/30 px-2 py-1 rounded uppercase font-bold tracking-widest hover:bg-purple-900/30 transition-colors"
                                       >
                                           Use Portal As...
                                       </button>
                                       <button className="text-blue-400 border border-blue-400/30 px-2 py-1 rounded uppercase font-bold tracking-widest hover:bg-blue-400/10 transition-colors">Message</button>
                                   </td>
                               </tr>
                           ))}
                      </tbody>
                  </table>
             </div>

              <div className="bg-[#121212] border border-[#2A2A2A] rounded overflow-hidden flex-1 overflow-y-auto w-full mt-6">
                   <div className="p-4 border-b border-[#2A2A2A]">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Members Portal Access Control</h3>
                      <p className="text-[10px] text-gray-600 mt-1">Manage who has access to the members-only portal and which tools they can use.</p>
                   </div>
                   <table className="w-full text-left text-[10px] text-gray-400">
                       <thead className="bg-[#1A1A1A] border-b border-[#2A2A2A] text-gray-500 font-bold uppercase tracking-widest">
                           <tr>
                               <th className="px-4 py-3">User</th>
                               <th className="px-4 py-3">Email</th>
                               <th className="px-4 py-3">Login Method</th>
                               <th className="px-4 py-3">Members Access</th>
                               <th className="px-4 py-3">Permissions</th>
                               <th className="px-4 py-3 text-right">Actions</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-[#2A2A2A]">
                            {users.map(u => (
                                <tr key={u.id} className="hover:bg-[#1A1A1A] transition-colors">
                                    <td className="px-4 py-3 font-bold text-white">{u.name || 'N/A'}</td>
                                    <td className="px-4 py-3 text-gray-300">{u.email}</td>
                                    <td className="px-4 py-3">
                                       <span className="px-2 py-0.5 rounded font-bold uppercase tracking-widest border bg-gray-800/50 border-gray-700 text-gray-400">{u.loginMethod || 'unknown'}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <select 
                                            className={`bg-[#0A0A0A] border border-[#2A2A2A] rounded px-2 py-1 focus:outline-none focus:border-[#EAB308] uppercase font-bold tracking-widest ${u.membersAccessGranted ? 'text-green-500' : 'text-red-500'}`}
                                            value={u.membersAccessGranted ? 'granted' : 'revoked'}
                                            onChange={async (e) => {
                                                const granted = e.target.value === 'granted';
                                                try {
                                                    const endpoint = granted ? '/api/admin/users/' + u.id + '/grant-access' : '/api/admin/users/' + u.id + '/revoke-access';
                                                    await fetch(endpoint, { method: 'POST' });
                                                    setUsers(users.map(x => x.id === u.id ? { ...x, membersAccessGranted: granted ? 1 : 0 } : x));
                                                } catch(err) { console.error(err); }
                                            }}
                                        >
                                            <option value="granted">GRANTED</option>
                                            <option value="revoked">REVOKED</option>
                                        </select>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-wrap gap-1">
                                            {(u.membersPermissions && typeof u.membersPermissions === 'object' ? Object.entries(u.membersPermissions).filter(([,v]: [any, any]) => v).map(([k]) => k) : []).map(p => (
                                                <span key={p} className="px-1.5 py-0.5 rounded bg-emerald-900/30 text-emerald-400 border border-emerald-900/50 text-[8px] uppercase">{p}</span>
                                            ))}
                                            {(!u.membersPermissions || Object.keys(u.membersPermissions || {}).length === 0) && (
                                                <span className="text-[9px] text-gray-600">No custom permissions</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-right flex justify-end gap-2">
                                        <button 
                                            onClick={() => handleEditPermissions(u)}
                                            className="text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-1 rounded uppercase font-bold tracking-widest hover:bg-[#D4AF37]/10 transition-colors"
                                        >
                                            Edit Permissions
                                        </button>
                                        <button 
                                            onClick={() => setOverrideUser(u.id)}
                                            className="text-purple-400 border border-purple-400/30 px-2 py-1 rounded uppercase font-bold tracking-widest hover:bg-purple-900/30 transition-colors"
                                        >
                                            Use Portal As...
                                        </button>
                                    </td>
                                </tr>
                            ))}
                       </tbody>
                   </table>
              </div>

              <div className="bg-[#121212] border border-[#2A2A2A] rounded overflow-hidden flex-1 overflow-y-auto w-full mt-6">
                   <div className="p-4 border-b border-[#2A2A2A]">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Onboarding Applications</h3>
                   </div>
                  <table className="w-full text-left text-[10px] text-gray-400">
                      <thead className="bg-[#1A1A1A] border-b border-[#2A2A2A] text-gray-500 font-bold uppercase tracking-widest">
                          <tr>
                              <th className="px-4 py-3">Stage Name</th>
                              <th className="px-4 py-3">Email</th>
                              <th className="px-4 py-3">Revenue Paths</th>
                              <th className="px-4 py-3">Date</th>
                              <th className="px-4 py-3 text-right">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2A2A2A]">
                           {applications.map(app => (
                               <tr key={app.id} className="hover:bg-[#1A1A1A] transition-colors">
                                   <td className="px-4 py-3 font-bold text-white">{app.stageName}</td>
                                   <td className="px-4 py-3 text-gray-300">{app.email}</td>
                                   <td className="px-4 py-3">
                                      <div className="flex flex-wrap gap-1">
                                          {(() => {
                                              let paths = [];
                                              try {
                                                  paths = typeof app.revenuePaths === 'string' ? JSON.parse(app.revenuePaths) : (app.revenuePaths || []);
                                              } catch(e) {}
                                              return (Array.isArray(paths) ? paths : []).map((p: string) => (
                                                  <span key={p} className="px-1.5 py-0.5 rounded bg-violet-900/30 text-violet-400 border border-violet-900/50 text-[8px] uppercase">{p}</span>
                                              ));
                                          })()}
                                      </div>
                                   </td>
                                   <td className="px-4 py-3">{new Date(app.createdAt).toLocaleDateString()}</td>
                                   <td className="px-4 py-3 text-right flex justify-end gap-2">
                                       <button className="text-blue-400 border border-blue-400/30 px-2 py-1 rounded uppercase font-bold tracking-widest hover:bg-blue-400/10 transition-colors">
                                           View Details
                                       </button>
                                   </td>
                               </tr>
                           ))}
                           {applications.length === 0 && (
                               <tr>
                                   <td colSpan={5} className="px-4 py-8 text-center text-gray-600 italic">No applications found.</td>
                               </tr>
                           )}
                       </tbody>
                   </table>
              </div>
         </div>

         {/* Permissions Editor Modal */}
         {editingUser && (
             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                 <div className="w-full max-w-lg rounded-2xl border border-[#2A2A2A] bg-[#0B0B0D] p-6 shadow-2xl">
                     <div className="flex items-center justify-between mb-6">
                         <div>
                             <h3 className="text-lg font-bold text-white">Edit Permissions</h3>
                             <p className="text-xs text-gray-500">{editingUser.email}</p>
                         </div>
                         <button onClick={() => setEditingUser(null)} className="text-gray-500 hover:text-white">
                             <X className="h-5 w-5" />
                         </button>
                     </div>
                     
                     <div className="space-y-4">
                         <div className="flex items-center justify-between p-3 bg-[#15151A] rounded-lg">
                             <div>
                                 <p className="text-sm font-bold text-white">Members Portal Access</p>
                                 <p className="text-[10px] text-gray-500">Grant or revoke access to the members-only portal</p>
                             </div>
                             <label className="relative inline-flex items-center cursor-pointer">
                                 <input
                                     type="checkbox"
                                     checked={editPermissions.dashboard ?? true}
                                     onChange={(e) => setEditPermissions({ ...editPermissions, dashboard: e.target.checked })}
                                     className="sr-only peer"
                                 />
                                 <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D4AF37]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                             </label>
                         </div>

                         <div className="border-t border-[#2A2A2A] pt-4">
                             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tool Permissions</p>
                             <div className="grid grid-cols-2 gap-3">
                                 {[
                                     { key: 'vault', label: 'File Vault', desc: 'Access to file storage' },
                                     { key: 'tools', label: 'AI Tools', desc: 'Ad generator, ask AI' },
                                     { key: 'messaging', label: 'Messages', desc: 'Internal messaging' },
                                     { key: 'billing', label: 'Billing', desc: 'Invoice management' },
                                     { key: 'admin', label: 'Admin Panel', desc: 'User management' },
                                 ].map(perm => (
                                     <label key={perm.key} className="flex items-center gap-3 p-3 bg-[#15151A] rounded-lg cursor-pointer hover:bg-[#1A1A1A] transition-colors">
                                         <input
                                             type="checkbox"
                                             checked={editPermissions[perm.key] || false}
                                             onChange={(e) => setEditPermissions({ ...editPermissions, [perm.key]: e.target.checked })}
                                             className="accent-[#D4AF37]"
                                         />
                                         <div>
                                             <p className="text-xs font-bold text-white">{perm.label}</p>
                                             <p className="text-[10px] text-gray-500">{perm.desc}</p>
                                         </div>
                                     </label>
                                 ))}
                             </div>
                         </div>
                     </div>

                     <div className="flex gap-3 mt-6">
                         <button
                             onClick={() => setEditingUser(null)}
                             className="flex-1 h-10 rounded-lg border border-[#2A2A2A] text-gray-400 text-xs font-bold uppercase tracking-widest hover:border-[#D4AF37]/30 hover:text-[#D4AF37] transition-colors"
                         >
                             Cancel
                         </button>
                         <button
                             onClick={handleSavePermissions}
                             disabled={savingPermissions}
                             className="flex-1 h-10 rounded-lg bg-[#D4AF37] text-[#000] text-xs font-black uppercase tracking-widest disabled:opacity-60 hover:bg-[#FFD700] transition-colors"
                         >
                             {savingPermissions ? 'Saving...' : 'Save Permissions'}
                         </button>
                     </div>
                 </div>
             </div>
         )}
     )
}

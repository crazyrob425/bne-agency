import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, Activity, Clock, ShieldAlert } from 'lucide-react';

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

    useEffect(() => {
        if (dbUser?.role !== 'admin') return;
        const fetchUsers = async () => {
            const q = query(collection(db, 'users'));
            const snap = await getDocs(q);
            setUsers(snap.docs.map(d => ({id: d.id, ...d.data()})));
        };
        const fetchApps = async () => {
            try {
                const res = await fetch('/api/admin/applications');
                const data = await res.json();
                if (data.applications) setApplications(data.applications);
            } catch(e) { console.error('Error fetching applications', e); }
        };
        fetchUsers();
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
    )
}

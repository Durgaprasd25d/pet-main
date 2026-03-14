import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/apiService';
import { User as UserIcon, Trash2, ShieldCheck, Mail, Phone, CheckCircle2, Clock } from 'lucide-react';

const ConfirmModal = ({ title, message, onConfirm, onCancel, confirmLabel = 'Confirm', confirmClass = 'bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20' }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
    <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 flex flex-col items-center gap-5">
      <div className="text-center">
        <h3 className="text-lg font-black text-slate-900 mb-1">{title}</h3>
        <p className="text-sm text-slate-500">{message}</p>
      </div>
      <div className="flex gap-3 w-full">
        <button onClick={onCancel} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all">
          Cancel
        </button>
        <button onClick={onConfirm} className={`flex-1 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${confirmClass}`}>
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
);

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // { type: 'verify'|'delete', user }

  const fetchUsers = async () => {
    try {
      const data = await dashboardService.getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleVerify = async () => {
    try {
      const result = await dashboardService.verifyUser(modal.user._id);
      setUsers(prev => prev.map(u => u._id === modal.user._id ? { ...u, isVerified: result.isVerified } : u));
    } catch (err) {
      console.error("Failed to toggle user verification", err);
    } finally {
      setModal(null);
    }
  };

  const handleDelete = async () => {
    try {
      await dashboardService.deleteUser(modal.user._id);
      setUsers(prev => prev.filter(u => u._id !== modal.user._id));
    } catch (err) {
      console.error("Failed to delete user", err);
    } finally {
      setModal(null);
    }
  };

  return (
    <div className="p-10 mt-16 ml-64 min-h-screen bg-slate-50/50">
      {modal?.type === 'verify' && (
        <ConfirmModal
          title={modal.user.isVerified ? 'Unverify User?' : 'Verify User?'}
          message={modal.user.isVerified
            ? `Remove verified status from "${modal.user.name}"?`
            : `Mark "${modal.user.name}" as a verified user?`}
          onConfirm={handleVerify}
          onCancel={() => setModal(null)}
          confirmLabel={modal.user.isVerified ? 'Yes, Unverify' : 'Yes, Verify'}
          confirmClass={modal.user.isVerified
            ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20'
            : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20'}
        />
      )}
      {modal?.type === 'delete' && (
        <ConfirmModal
          title="Delete User?"
          message={`This will permanently remove "${modal.user.name}" from the system.`}
          onConfirm={handleDelete}
          onCancel={() => setModal(null)}
          confirmLabel="Yes, Delete"
        />
      )}

      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Community</h1>
          <p className="text-slate-500 font-medium mt-1">Oversight and management of all registered pet owners.</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200 text-sm font-black text-slate-700 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <UserIcon size={18} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-none mb-1">Total Users</p>
            <p className="text-lg leading-none">{users.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Profile Name</th>
                <th className="px-8 py-5">Contact</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="4" className="px-8 py-20 text-center text-slate-300 font-bold italic">Synchronizing user data...</td></tr>
              ) : users.map((user) => (
                <tr key={user._id} className="group hover:bg-slate-50/80 transition-all duration-200">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-black text-base shadow-sm group-hover:scale-110 transition-transform duration-300">
                        {user.name ? user.name.charAt(0).toUpperCase() : <UserIcon size={22} />}
                      </div>
                      <div>
                        <p className="font-black text-slate-800 tracking-tight leading-tight">{user.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 capitalize">{user.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                        <Mail size={12} className="text-slate-300" /> {user.email}
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                          <Phone size={12} className="text-slate-300" /> {user.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    {user.isVerified ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-200">
                        <CheckCircle2 size={11} /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-50 text-amber-600 border border-amber-200">
                        <Clock size={11} /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setModal({ type: 'verify', user })}
                        title={user.isVerified ? 'Unverify User' : 'Verify User'}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border transition-all ${
                          user.isVerified
                            ? 'text-amber-600 bg-amber-50 border-amber-200 hover:bg-amber-500 hover:text-white hover:border-amber-500'
                            : 'text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-500 hover:text-white hover:border-emerald-500'
                        }`}
                      >
                        <ShieldCheck size={14} />
                        {user.isVerified ? 'Unverify' : 'Verify'}
                      </button>
                      <button
                        onClick={() => setModal({ type: 'delete', user })}
                        title="Delete User"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black text-red-500 bg-red-50 border border-red-200 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;

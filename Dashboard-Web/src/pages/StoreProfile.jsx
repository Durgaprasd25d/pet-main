import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/apiService';
import { Store, MapPin, Phone, Mail, Globe, Clock, Save, Building } from 'lucide-react';

const StoreProfile = ({ user }) => {
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    clinicName: user?.clinicName || '', // Reusing clinicName field for store name if needed
    about: user?.about || '',
    address: user?.address || '',
    price: user?.price || '',
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        clinicName: user.clinicName || '',
        about: user.about || '',
        address: user.address || '',
        price: user.price || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dashboardService.updateProfile(profile);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Profile update failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 mt-16 ml-64 min-h-screen bg-slate-50/50">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Store Profile</h1>
        <p className="text-slate-500 font-medium mt-1">Configure how your pet store appears to customers.</p>
      </div>

      <div className="max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Building size={20} />
                </div>
                <h2 className="font-black text-slate-800 uppercase tracking-widest text-sm">General Information</h2>
              </div>
              {saved && <span className="text-emerald-500 font-bold text-xs flex items-center gap-1 animate-pulse"><Save size={14} /> Changes Saved Successfully</span>}
            </div>
            
            <div className="p-8 grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Store Appearance Name</label>
                <input 
                  type="text" 
                  value={profile.clinicName}
                  onChange={e => setProfile({ ...profile, clinicName: e.target.value })}
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold"
                  placeholder="e.g. Paws & Whiskers Premium Store"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Owner Name</label>
                <input 
                  type="text" 
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Contact Email</label>
                <input 
                  type="email" 
                  readOnly
                  value={profile.email}
                  className="w-full px-5 py-3 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Contact Phone</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    type="text" 
                    value={profile.phone}
                    onChange={e => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full pl-12 pr-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">City/Location</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    type="text" 
                    value={profile.location}
                    onChange={e => setProfile({ ...profile, location: e.target.value })}
                    className="w-full pl-12 pr-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
             <div className="p-8 border-b border-slate-100 bg-slate-50/30">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                   <Store size={20} />
                 </div>
                 <h2 className="font-black text-slate-800 uppercase tracking-widest text-sm">Store Bio & Details</h2>
               </div>
             </div>
             <div className="p-8 space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">About Store</label>
                  <textarea 
                    value={profile.about}
                    onChange={e => setProfile({ ...profile, about: e.target.value })}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold h-32 resize-none"
                    placeholder="Describe your store specialties..."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Full Physical Address</label>
                  <input 
                    type="text" 
                    value={profile.address}
                    onChange={e => setProfile({ ...profile, address: e.target.value })}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold"
                  />
                </div>
             </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-2xl shadow-xl shadow-primary/20 font-black tracking-tight hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
          >
            {loading ? 'Synchronizing Pipeline...' : 'Commit Profile Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StoreProfile;

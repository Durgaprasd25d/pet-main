import React from 'react';
import { Shield, Calendar, Users, Heart, AlertCircle, ShoppingBag, Activity } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
      <Icon size={24} className="text-white" />
    </div>
    <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{label}</p>
    <p className="text-2xl font-black text-slate-900 mt-1">{value}</p>
  </div>
);

export const VetDashboard = ({ user }) => (
  <div className="p-10 mt-16 ml-64 min-h-screen bg-slate-50/50">
    <div className="mb-10 bg-indigo-600 rounded-3xl p-10 text-white shadow-xl">
      <h1 className="text-3xl font-black mb-2">Veterinarian Panel</h1>
      <p className="text-indigo-100 font-medium">Welcome, Dr. {user?.name}. Manage your appointments and patients.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <StatCard label="Today's Appointments" value="8" icon={Calendar} color="bg-indigo-500" />
      <StatCard label="Total Patients" value="142" icon={Activity} color="bg-rose-500" />
      <StatCard label="Medical Reports" value="24" icon={Shield} color="bg-emerald-500" />
    </div>
    <div className="mt-10 bg-white p-10 rounded-3xl border border-slate-200 text-center">
      <Activity size={48} className="mx-auto text-slate-200 mb-4" />
      <h3 className="text-lg font-black text-slate-800">Patient Feed Coming Soon</h3>
      <p className="text-slate-400 text-sm">We are integrating live pet health data.</p>
    </div>
  </div>
);

export const NGODashboard = ({ user }) => (
  <div className="p-10 mt-16 ml-64 min-h-screen bg-slate-50/50">
    <div className="mb-10 bg-rose-600 rounded-3xl p-10 text-white shadow-xl">
      <h1 className="text-3xl font-black mb-2">NGO Dashboard</h1>
      <p className="text-rose-100 font-medium">Welcome, {user?.name}. Track adoptions and reports.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <StatCard label="Pending Adoptions" value="14" icon={Heart} color="bg-rose-500" />
      <StatCard label="Lost Pet Reports" value="5" icon={AlertCircle} color="bg-amber-500" />
      <StatCard label="Active Campaigns" value="3" icon={Users} color="bg-indigo-500" />
    </div>
    <div className="mt-10 bg-white p-10 rounded-3xl border border-slate-200 text-center">
      <Heart size={48} className="mx-auto text-slate-200 mb-4" />
      <h3 className="text-lg font-black text-slate-800">Adoption Flow Coming Soon</h3>
      <p className="text-slate-400 text-sm">Managing shelters has never been easier.</p>
    </div>
  </div>
);

export const StoreDashboard = ({ user }) => (
  <div className="p-10 mt-16 ml-64 min-h-screen bg-slate-50/50">
    <div className="mb-10 bg-emerald-600 rounded-3xl p-10 text-white shadow-xl">
      <h1 className="text-3xl font-black mb-2">Pet Store Manager</h1>
      <p className="text-emerald-100 font-medium">Welcome, {user?.name}. Manage your inventory and services.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <StatCard label="Total Products" value="84" icon={ShoppingBag} color="bg-emerald-500" />
      <StatCard label="Active Bookings" value="12" icon={Calendar} color="bg-blue-500" />
      <StatCard label="Customer Contacts" value="56" icon={Users} color="bg-purple-500" />
    </div>
    <div className="mt-10 bg-white p-10 rounded-3xl border border-slate-200 text-center">
      <ShoppingBag size={48} className="mx-auto text-slate-200 mb-4" />
      <h3 className="text-lg font-black text-slate-800">Inventory Management Coming Soon</h3>
      <p className="text-slate-400 text-sm">Add your pet products and salon services.</p>
    </div>
  </div>
);

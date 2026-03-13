import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/apiService';
import { Stethoscope, Building2, MapPin, Phone, Info, Clock, DollarSign, Save, CheckCircle2 } from 'lucide-react';

const ClinicManagement = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    specialty: '',
    clinicName: '',
    about: '',
    address: '',
    availability: ['Mon - Fri', '09:00 AM - 06:00 PM'],
    price: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setFormData({
      name: user.name || '',
      phone: user.phone || '',
      specialty: user.specialty || '',
      clinicName: user.clinicName || '',
      about: user.about || '',
      address: user.address || '',
      availability: user.availability || ['Mon - Fri', '09:00 AM - 06:00 PM'],
      price: user.price || ''
    });
    setLoading(false);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.clinicName || formData.clinicName.length < 3) {
      newErrors.clinicName = "Clinic name must be at least 3 characters";
    }
    if (!formData.specialty) {
      newErrors.specialty = "Specialty is required";
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }
    if (!formData.address || formData.address.length < 10) {
      newErrors.address = "Please provide a complete address (min 10 chars)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleAvailabilityChange = (index, value) => {
    const updatedAvailability = [...formData.availability];
    updatedAvailability[index] = value;
    setFormData({ ...formData, availability: updatedAvailability });
  };

  const handleCancel = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setFormData({
      name: user.name || '',
      phone: user.phone || '',
      specialty: user.specialty || '',
      clinicName: user.clinicName || '',
      about: user.about || '',
      address: user.address || '',
      availability: user.availability || ['Mon - Fri', '09:00 AM - 06:00 PM'],
      price: user.price || ''
    });
    setErrors({});
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setSaving(true);
    setSuccess(false);
    try {
      await dashboardService.updateProfile(formData);
      setSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert("Failed to update clinic info");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 mt-16 ml-64 text-slate-400 italic font-bold">Loading portal settings...</div>;

  return (
    <div className="p-10 mt-16 ml-64 min-h-screen bg-slate-50/50">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight tracking-tight">Clinic Profile</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your professional identity and facility information.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <Stethoscope size={20} className="text-primary" /> Core Information
              </h2>
              <div className="flex items-center gap-4">
                {success && (
                  <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100 transition-all animate-in fade-in slide-in-from-right-4">
                    <CheckCircle2 size={14} /> Synced
                  </div>
                )}
                {!isEditing ? (
                  <button 
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button 
                    type="button"
                    onClick={handleCancel}
                    className="text-xs font-black text-slate-400 hover:text-slate-600 transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
            
            <div className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-3 flex items-center gap-2">
                    <Building2 size={12} /> Clinic Entity Name
                  </label>
                  <input 
                    name="clinicName"
                    value={formData.clinicName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full bg-slate-50 border ${errors.clinicName ? 'border-rose-400 ring-4 ring-rose-400/10' : 'border-slate-200'} rounded-2xl px-5 py-3.5 font-bold text-slate-700 outline-none ${!isEditing ? 'opacity-70 cursor-not-allowed border-dashed' : 'focus:border-primary shadow-inner'} transition-all`}
                    placeholder="e.g. PetCare Wellness Center"
                  />
                  {errors.clinicName && <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-2">{errors.clinicName}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-3 flex items-center gap-2">
                    <Stethoscope size={12} /> Professional Specialty
                  </label>
                  <input 
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full bg-slate-50 border ${errors.specialty ? 'border-rose-400 ring-4 ring-rose-400/10' : 'border-slate-200'} rounded-2xl px-5 py-3.5 font-bold text-slate-700 outline-none ${!isEditing ? 'opacity-70 cursor-not-allowed border-dashed' : 'focus:border-primary shadow-inner'} transition-all`}
                    placeholder="e.g. Senior Surgeon / Radiologist"
                  />
                  {errors.specialty && <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-2">{errors.specialty}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-3 flex items-center gap-2">
                    <Phone size={12} /> Contact Mobile
                  </label>
                  <input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full bg-slate-50 border ${errors.phone ? 'border-rose-400 ring-4 ring-rose-400/10' : 'border-slate-200'} rounded-2xl px-5 py-3.5 font-bold text-slate-700 outline-none ${!isEditing ? 'opacity-70 cursor-not-allowed border-dashed' : 'focus:border-primary shadow-inner'} transition-all`}
                    placeholder="+91 XXXXX XXXXX"
                  />
                  {errors.phone && <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-2">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-3 flex items-center gap-2">
                    <DollarSign size={12} /> Consultation Price Range
                  </label>
                  <input 
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 font-bold text-slate-700 outline-none ${!isEditing ? 'opacity-70 cursor-not-allowed border-dashed' : 'focus:border-primary shadow-inner'} transition-all`}
                    placeholder="e.g. $25 - $50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-3 flex items-center gap-2">
                  <MapPin size={12} /> Physical Clinic Address
                </label>
                <input 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full bg-slate-50 border ${errors.address ? 'border-rose-400 ring-4 ring-rose-400/10' : 'border-slate-200'} rounded-2xl px-5 py-3.5 font-bold text-slate-700 outline-none ${!isEditing ? 'opacity-70 cursor-not-allowed border-dashed' : 'focus:border-primary shadow-inner'} transition-all`}
                  placeholder="Street, Landmark, City, State"
                />
                {errors.address && <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-2">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-3 flex items-center gap-2">
                    <Clock size={12} /> Duty Days
                  </label>
                  <input 
                    value={formData.availability[0]}
                    onChange={(e) => handleAvailabilityChange(0, e.target.value)}
                    disabled={!isEditing}
                    className={`w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 font-bold text-slate-700 outline-none ${!isEditing ? 'opacity-70 cursor-not-allowed border-dashed' : 'focus:border-primary shadow-inner'} transition-all`}
                    placeholder="e.g. Mon - Sat"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-3 flex items-center gap-2">
                    <Clock size={12} /> Consultation Hours
                  </label>
                  <input 
                    value={formData.availability[1]}
                    onChange={(e) => handleAvailabilityChange(1, e.target.value)}
                    disabled={!isEditing}
                    className={`w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 font-bold text-slate-700 outline-none ${!isEditing ? 'opacity-70 cursor-not-allowed border-dashed' : 'focus:border-primary shadow-inner'} transition-all`}
                    placeholder="e.g. 10:00 AM - 08:00 PM"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-3 flex items-center gap-2">
                  <Info size={12} /> Professional Bio / About Clinic
                </label>
                <textarea 
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-700 outline-none ${!isEditing ? 'opacity-70 cursor-not-allowed border-dashed' : 'focus:border-primary shadow-inner'} transition-all min-h-[150px]`}
                  placeholder="Describe your clinic, experience, and services..."
                ></textarea>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  disabled={saving || !isEditing}
                  className={`w-full ${isEditing ? 'bg-primary shadow-primary/20 hover:scale-[1.02]' : 'bg-slate-200 cursor-not-allowed shadow-none'} text-white py-5 rounded-3xl font-black shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70`}
                >
                  <Save size={20} />
                  {saving ? 'Synchronizing with Database...' : isEditing ? 'Save & Publish Clinic Profile' : 'Profile Locked - Click Edit to Change'}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Profile Health</h3>
            <div className="space-y-6">
              {[
                { label: 'Clinic Verification', status: 'verified', color: 'text-emerald-500' },
                { label: 'Mobile Linked', status: formData.phone ? 'Active' : 'Missing', color: formData.phone ? 'text-emerald-500' : 'text-rose-500' },
                { label: 'GPS Geolocation', status: formData.address ? 'Active' : 'Missing', color: formData.address ? 'text-emerald-500' : 'text-rose-500' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                  <span className="text-xs font-bold text-slate-500">{item.label}</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8">
            <h3 className="text-primary font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info size={16} /> Data Disclosure
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
              "The information provided here will be visible to pet owners on the mobile application for locating your clinic and understanding your services."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicManagement;

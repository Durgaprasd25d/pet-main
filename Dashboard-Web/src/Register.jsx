import React, { useState } from 'react';
import { Mail, Lock, User, Loader2, ShieldCheck, ChevronDown } from 'lucide-react';
import { dashboardService } from './services/apiService';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'vet'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const roles = [
    { value: 'vet', label: 'Veterinarian', description: 'Healthcare & Medical Panel' },
    { value: 'ngo', label: 'Shelter / NGO', description: 'Adoptions & Lost/Found Panel' },
    { value: 'store', label: 'Pet Store', description: 'Services & Products Panel' },
    { value: 'admin', label: 'Admin', description: 'Full System Management' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await dashboardService.register(formData.name, formData.email, formData.password, formData.role);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-center">
        <div className="bg-white p-12 rounded-3xl shadow-2xl border border-slate-100 max-w-sm">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">Registration Successful!</h2>
          <p className="text-slate-500 font-medium mb-6">Redirecting you to login...</p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full animate-[progress_3s_linear]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row">
        
        {/* Sidebar Info */}
        <div className="md:w-1/3 bg-primary p-8 text-white hidden md:flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain brightness-0 invert" />
            </div>
            <h2 className="text-2xl font-black leading-tight mb-4">Join the Ecosystem</h2>
            <p className="text-white/70 text-sm font-medium">Register your business or organization to start managing services on PetCare.</p>
          </div>
          <div className="text-xs text-white/40 font-bold uppercase tracking-widest">
            Dashboard v2.0
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 p-8 md:p-12">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Create Account</h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">Select your role and fill details</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-100 animate-shake">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary/30 focus:bg-white transition-all font-medium text-slate-700"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary/30 focus:bg-white transition-all font-medium text-slate-700"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary/30 focus:bg-white transition-all font-medium text-slate-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">System Role</label>
              <div className="relative group">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-12 pr-10 py-3.5 bg-primary/5 border-2 border-primary/10 rounded-2xl focus:outline-none focus:border-primary/30 focus:bg-white transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                >
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>
                      {role.label} — {role.description}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-primary group-hover:translate-y-[-40%] transition-transform pointer-events-none" size={18} />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-black text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Creating Account...</span>
                </>
              ) : (
                'Create Business Account'
              )}
            </button>

            <p className="text-center text-sm font-bold text-slate-400 pt-4">
              Already have an account? <Link to="/login" className="text-primary hover:underline">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

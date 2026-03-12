import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Dog, 
  Calendar, 
  User as UserIcon, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Heart,
  AlertOctagon,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { dashboardService } from './services/apiService';
import Login from './Login';

// Import Pages
import UsersManagement from './pages/UsersManagement';
import PetsManagement from './pages/PetsManagement';
import AppointmentsManagement from './pages/AppointmentsManagement';
import AdoptionManagement from './pages/AdoptionManagement';
import LostFoundManagement from './pages/LostFoundManagement';
import CommunityManagement from './pages/CommunityManagement';

const SidebarItem = ({ icon: Icon, label, href, active }) => (
  <Link 
    to={href}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-primary text-white shadow-md shadow-primary/20' 
        : 'text-slate-500 hover:bg-slate-100'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

const Sidebar = ({ onLogout }) => {
  const location = useLocation();
  return (
    <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col p-4 fixed left-0 top-0 overflow-y-auto z-20">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">P</div>
        <span className="text-xl font-bold tracking-tight">PetCare Admin</span>
      </div>
      
      <nav className="flex-1 space-y-1">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/" active={location.pathname === '/'} />
        <SidebarItem icon={UserIcon} label="Users" href="/users" active={location.pathname === '/users'} />
        <SidebarItem icon={Dog} label="Pets" href="/pets" active={location.pathname === '/pets'} />
        <SidebarItem icon={Calendar} label="Appointments" href="/appointments" active={location.pathname === '/appointments'} />
        
        <div className="pt-6 pb-2 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ecosystem</div>
        <SidebarItem icon={Heart} label="Adoptions" href="/adoptions" active={location.pathname === '/adoptions'} />
        <SidebarItem icon={AlertOctagon} label="Lost & Found" href="/lost-found" active={location.pathname === '/lost-found'} />
        <SidebarItem icon={MessageSquare} label="Community" href="/community" active={location.pathname === '/community'} />
        
        <div className="pt-6 pb-2 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">System</div>
        <SidebarItem icon={Settings} label="Settings" href="/settings" active={location.pathname === '/settings'} />
      </nav>

      <div className="mt-auto pt-4 border-t border-slate-100">
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg w-full transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};



const Topbar = ({ user }) => (
  <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-10">
    <div className="relative w-96">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      <input 
        type="text" 
        placeholder="Search everything..." 
        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
      />
    </div>

    <div className="flex items-center gap-4">
      <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative">
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
      <div className="h-8 w-px bg-slate-200 mx-2"></div>
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-slate-900">{user?.name || 'Admin User'}</p>
          <p className="text-xs text-slate-500">Super Admin</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 overflow-hidden">
          {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : null}
        </div>
      </div>
    </div>
  </div>
);

const DashboardHome = () => {
  const [stats, setStats] = useState({ totalPets: 0, appointments: 0, activeUsers: 856, newReports: 12 });
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [s, a] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getRecentAppointments()
        ]);
        setStats(s);
        setAppointments(a);
      } catch (err) {
        console.error("Dashboard data fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 mt-16 ml-64 min-h-screen bg-slate-50">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500">Real-time insights from your pet care platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Pets', value: stats.totalPets, icon: Dog, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Appointments', value: stats.appointments, icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'Active Users', value: stats.activeUsers, icon: UserIcon, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'New Reports', value: stats.newReports, icon: Bell, color: 'text-amber-500', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded">+5%</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900">{loading ? '...' : stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-slate-900">Recent Appointments</h2>
          <button className="text-primary text-sm font-bold hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Pet</th>
                <th className="px-6 py-4">Vet</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments.length > 0 ? appointments.map((appt, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{appt.petId?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-slate-500">{appt.vetId?.name || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${appt.status === 'scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono text-xs">{new Date(appt.date).toLocaleDateString()}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-400 italic">No recent appointments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setUser(JSON.parse(localStorage.getItem('user')));
    navigate('/');
  };

  const handleLogout = () => {
    dashboardService.logout();
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar onLogout={handleLogout} />
      <Topbar user={user} />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/users" element={<UsersManagement />} />
          <Route path="/pets" element={<PetsManagement />} />
          <Route path="/appointments" element={<AppointmentsManagement />} />
          <Route path="/adoptions" element={<AdoptionManagement />} />
          <Route path="/lost-found" element={<LostFoundManagement />} />
          <Route path="/community" element={<CommunityManagement />} />
          <Route path="/settings" element={<div className="p-8 mt-16 ml-64">Settings Page</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </div>
    </div>
  );
}

export default App;

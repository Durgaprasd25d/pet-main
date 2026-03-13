import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/apiService';
import { Calendar, CheckCircle, XCircle, Clock, User, Dog } from 'lucide-react';

const AppointmentsManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');

  const fetchAppointments = async () => {
    try {
      const data = await dashboardService.getAppointments();
      setAppointments(data);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const upcomingAppointments = appointments
    .filter(appt => appt.status === 'scheduled')
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const pastAppointments = appointments
    .filter(appt => appt.status === 'completed')
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const displayAppointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments;

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await dashboardService.cancelAppointment(id);
        fetchAppointments();
      } catch (err) {
        alert("Failed to cancel appointment");
      }
    }
  };

  const handleComplete = async (id) => {
    try {
      await dashboardService.completeAppointment(id);
      fetchAppointments();
    } catch (err) {
      alert("Failed to complete appointment");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'cancelled': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="p-8 mt-16 ml-64 min-h-screen bg-slate-50">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-500">Monitor and manage veterinary visits.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-2 rounded-lg text-sm font-black transition-all ${activeTab === 'upcoming' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Upcoming ({upcomingAppointments.length})
          </button>
          <button 
            onClick={() => setActiveTab('past')}
            className={`px-6 py-2 rounded-lg text-sm font-black transition-all ${activeTab === 'past' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Past Records ({pastAppointments.length})
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Pet & Owner</th>
                <th className="px-6 py-4">Vet / Clinic</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-400 font-medium italic">Loading your schedule...</td></tr>
              ) : displayAppointments.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-16 text-center text-slate-400 font-medium italic">No {activeTab} appointments found.</td></tr>
              ) : displayAppointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200/50">
                        <Dog size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{appt.petId?.name || 'N/A'}</p>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Owner: {appt.petId?.ownerId?.name || 'Private'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-slate-700">{appt.vetId?.name}</div>
                    <div className="text-xs font-medium text-slate-400">{appt.vetId?.clinicName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-700 font-bold">
                      <Calendar size={14} className="text-primary" />
                      {new Date(appt.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 mt-1 uppercase tracking-widest">
                      <Clock size={12} />
                      {appt.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(appt.status)}`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {appt.status === 'scheduled' && activeTab === 'upcoming' && (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleComplete(appt._id)}
                          className="p-2.5 text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all hover:scale-110 active:scale-95" 
                          title="Mark as Completed"
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button 
                          onClick={() => handleCancel(appt._id)}
                          className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-all hover:scale-110 active:scale-95" 
                          title="Cancel Appointment"
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    )}
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

export default AppointmentsManagement;

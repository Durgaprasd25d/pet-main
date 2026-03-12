import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/apiService';
import { Calendar, CheckCircle, XCircle, Clock, User, Dog } from 'lucide-react';

const AppointmentsManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const getStatusStyle = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-50 text-blue-600 border-blue-100';
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
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-blue-600">
            Upcoming: {appointments.filter(a => a.status === 'upcoming').length}
          </div>
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
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-400">Loading appointments...</td></tr>
              ) : appointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <Dog size={16} />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{appt.petId?.name || 'N/A'}</p>
                        <p className="text-xs text-slate-500">{appt.petId?.ownerId?.name || 'Private Owner'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-700">{appt.vetId?.name}</div>
                    <div className="text-xs text-slate-500">{appt.vetId?.clinicName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-700 font-medium">
                      <Calendar size={14} className="text-slate-400" />
                      {new Date(appt.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <Clock size={12} className="text-slate-400" />
                      {appt.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusStyle(appt.status)}`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {appt.status === 'upcoming' && (
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors" title="Mark as Completed">
                          <CheckCircle size={18} />
                        </button>
                        <button 
                          onClick={() => handleCancel(appt._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
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

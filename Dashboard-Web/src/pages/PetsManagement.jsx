import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/apiService';
import { Dog, Trash2, ExternalLink, Calendar, User } from 'lucide-react';

const PetsManagement = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPets = async () => {
    try {
      const data = await dashboardService.getPets();
      setPets(data);
    } catch (err) {
      console.error("Failed to fetch pets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      try {
        await dashboardService.deletePet(id);
        setPets(pets.filter(p => p._id !== id));
      } catch (err) {
        alert("Failed to delete pet");
      }
    }
  };

  return (
    <div className="p-10 mt-16 ml-64 min-h-screen bg-slate-50/50">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Pet Registry</h1>
          <p className="text-slate-500 font-medium mt-1">Lifecycle management for all platform members.</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200 text-sm font-black text-slate-700 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Dog size={18} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-none mb-1">Total Members</p>
            <p className="text-lg leading-none">{pets.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Pet Details</th>
                <th className="px-8 py-5">Classification</th>
                <th className="px-8 py-5">Verified Owner</th>
                <th className="px-8 py-5">Account Status</th>
                <th className="px-8 py-5 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="5" className="px-8 py-20 text-center text-slate-300 font-bold italic">Gathering pet data...</td></tr>
              ) : pets.map((pet) => (
                <tr key={pet._id} className="group hover:bg-slate-50/80 transition-all duration-200">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <img src={pet.image || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=100"} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-black text-slate-800 text-lg tracking-tight leading-tight">{pet.name}</p>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">{pet.gender} • {pet.age} Years</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="space-y-1">
                      <div className="text-sm font-black text-slate-700">{pet.type}</div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-tight">{pet.breed}</div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-bold">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                        <User size={12} className="text-slate-400" />
                      </div>
                      {pet.ownerId?.name || 'Undefined Owner'}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-600 border border-emerald-200">
                      Active
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white hover:shadow-lg rounded-xl transition-all border border-transparent hover:border-slate-100">
                        <ExternalLink size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(pet._id)}
                        className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white hover:shadow-lg rounded-xl transition-all border border-transparent hover:border-slate-100"
                      >
                        <Trash2 size={18} />
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

export default PetsManagement;

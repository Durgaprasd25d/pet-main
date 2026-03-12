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
    <div className="p-8 mt-16 ml-64 min-h-screen bg-slate-50">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pet Registry</h1>
          <p className="text-slate-500">View and manage all pets registered on the platform.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 flex items-center gap-2">
          <Dog size={16} className="text-primary" />
          Active Pets: {pets.length}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Pet</th>
                <th className="px-6 py-4">Type & Breed</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-400">Loading pets...</td></tr>
              ) : pets.map((pet) => (
                <tr key={pet._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden">
                        <img src={pet.image || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=100"} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{pet.name}</p>
                        <p className="text-xs text-slate-500">{pet.gender}, {pet.age} years</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-slate-700">{pet.type}</div>
                      <div className="text-xs text-slate-500">{pet.breed}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <User size={14} className="text-slate-400" />
                      {pet.ownerId?.name || 'Unknown Owner'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                        <ExternalLink size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(pet._id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
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

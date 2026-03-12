import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/apiService';
import { Heart, Trash2, Check, X, User, Info } from 'lucide-react';

const AdoptionManagement = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdoptions = async () => {
    try {
      const data = await dashboardService.getAdoptions();
      setAdoptions(data);
    } catch (err) {
      console.error("Failed to fetch adoptions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdoptions();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this listing?")) {
      try {
        await dashboardService.deleteAdoption(id);
        setAdoptions(adoptions.filter(a => a._id !== id));
      } catch (err) {
        alert("Action failed");
      }
    }
  };

  return (
    <div className="p-8 mt-16 ml-64 min-h-screen bg-slate-50">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Adoption Listings</h1>
          <p className="text-slate-500">Review and moderate pets for adoption.</p>
        </div>
        <div className="bg-rose-50 px-4 py-2 rounded-lg border border-rose-100 text-sm font-semibold text-rose-600 flex items-center gap-2">
          <Heart size={16} fill="currentColor" />
          Active Listings: {adoptions.length}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center text-slate-400">Loading listings...</div>
        ) : adoptions.map((item) => (
          <div key={item._id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-48 h-48 md:h-auto overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{item.name}</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">{item.type} • {item.breed}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleDelete(item._id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <User size={14} />
                  <span>Shelter: {item.shelter}</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-xs font-bold bg-primary text-white rounded-md hover:bg-indigo-600 transition-colors">
                    View Applications
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdoptionManagement;

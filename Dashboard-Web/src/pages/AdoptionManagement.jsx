import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/apiService';
import { Heart, Trash2, Pencil, Plus, User, X, Clock, Save } from 'lucide-react';

// ── Confirm Delete Modal ────────────────────────────────────────────────────
const ConfirmModal = ({ petName, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
    <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 flex flex-col items-center gap-5">
      <div className="text-center">
        <h3 className="text-lg font-black text-slate-900 mb-1">Delete Listing?</h3>
        <p className="text-sm text-slate-500">This will permanently remove <strong>{petName}</strong> from adoption listings.</p>
      </div>
      <div className="flex gap-3 w-full">
        <button onClick={onCancel} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all">Cancel</button>
        <button onClick={onConfirm} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-all shadow-md shadow-red-500/20">Yes, Delete</button>
      </div>
    </div>
  </div>
);

// ── Edit Modal ──────────────────────────────────────────────────────────────
const EditModal = ({ pet, onSave, onClose }) => {
  const [form, setForm] = useState({
    name: pet.name || '',
    type: pet.type || 'Dog',
    breed: pet.breed || '',
    age: pet.age || '',
    gender: pet.gender || 'Male',
    description: pet.description || '',
    healthStatus: pet.healthStatus || '',
    vaccinationStatus: pet.vaccinationStatus || '',
    personality: pet.personality || '',
    location: pet.location || '',
    status: pet.status || 'available',
  });
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const f = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    if (imageFile) formData.append('image', imageFile);
    await onSave(pet._id, formData);
    setSaving(false);
  };

  const inputCls = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all";
  const labelCls = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-lg font-black text-slate-900">Edit Adoption Listing</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelCls}>Pet Name</label>
              <input type="text" value={form.name} onChange={f('name')} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Type</label>
              <select value={form.type} onChange={f('type')} className={inputCls}>
                <option>Dog</option><option>Cat</option><option>Bird</option><option>Rabbit</option><option>Other</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Breed</label>
              <input type="text" value={form.breed} onChange={f('breed')} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Age</label>
              <input type="text" value={form.age} onChange={f('age')} className={inputCls} placeholder="e.g. 2 Years" />
            </div>
            <div>
              <label className={labelCls}>Gender</label>
              <select value={form.gender} onChange={f('gender')} className={inputCls}>
                <option>Male</option><option>Female</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select value={form.status} onChange={f('status')} className={inputCls}>
                <option value="available">Available</option>
                <option value="pending">Pending</option>
                <option value="adopted">Adopted</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Location</label>
              <input type="text" value={form.location} onChange={f('location')} className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Health Status</label>
            <input type="text" value={form.healthStatus} onChange={f('healthStatus')} className={inputCls} placeholder="e.g. Fit & Healthy" />
          </div>
          <div>
            <label className={labelCls}>Vaccination Status</label>
            <input type="text" value={form.vaccinationStatus} onChange={f('vaccinationStatus')} className={inputCls} placeholder="e.g. Fully Vaccinated" />
          </div>
          <div>
            <label className={labelCls}>Personality</label>
            <input type="text" value={form.personality} onChange={f('personality')} className={inputCls} placeholder="e.g. Friendly, Playful" />
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea rows={3} value={form.description} onChange={f('description')} className={`${inputCls} resize-none`} placeholder="Write about the pet..." />
          </div>
          <div>
            <label className={labelCls}>Update Photo (optional)</label>
            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className={inputCls} />
          </div>
        </div>
        <div className="flex gap-3 p-6 pt-0">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all">Cancel</button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 disabled:opacity-60"
          >
            <Save size={15} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main Component ──────────────────────────────────────────────────────────
const AdoptionManagement = ({ user }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editPet, setEditPet] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [newPet, setNewPet] = useState({
    name: '', type: 'Dog', breed: '', age: '', gender: 'Male',
    description: '', healthStatus: '', vaccinationStatus: '', personality: '', location: '',
  });
  const [imageFile, setImageFile] = useState(null);

  const fetchPets = async () => {
    try {
      const data = await dashboardService.getShelterPets();
      setPets(data);
    } catch (err) {
      console.error("Failed to fetch shelter pets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPets(); }, []);

  const handleAddPet = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newPet).forEach(key => formData.append(key, newPet[key]));
    if (imageFile) formData.append('image', imageFile);
    try {
      await dashboardService.createAdoptionPet(formData);
      setShowAddModal(false);
      fetchPets();
      setNewPet({ name: '', type: 'Dog', breed: '', age: '', gender: 'Male', description: '', healthStatus: '', vaccinationStatus: '', personality: '', location: '' });
      setImageFile(null);
    } catch { alert("Failed to add pet"); }
  };

  const handleSaveEdit = async (id, formData) => {
    try {
      await dashboardService.updateAdoptionPet(id, formData);
      setEditPet(null);
      fetchPets();
    } catch { alert("Failed to update pet"); }
  };

  const handleDelete = async () => {
    try {
      await dashboardService.deleteAdoptionPet(deleteTarget._id);
      setDeleteTarget(null);
      fetchPets();
    } catch { alert("Failed to delete pet"); }
  };

  const statusColor = (s) => s === 'available' ? 'bg-emerald-100 text-emerald-600' : s === 'adopted' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600';

  return (
    <div className="p-8 mt-16 ml-64 min-h-screen bg-slate-50">
      {/* Edit Modal */}
      {editPet && <EditModal key={editPet._id} pet={editPet} onSave={handleSaveEdit} onClose={() => setEditPet(null)} />}

      {/* Delete Confirm */}
      {deleteTarget && <ConfirmModal petName={deleteTarget.name} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}

      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Adoption Listings</h1>
          <p className="text-slate-500">Manage your pets available for adoption.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-all"
        >
          <Plus size={20} /> List New Pet
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center text-slate-400">Loading your pets...</div>
        ) : pets.length === 0 ? (
          <div className="col-span-full py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-center">
            <Heart size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-bold">No pets listed yet. Start by adding one!</p>
          </div>
        ) : pets.map((pet) => (
          <div key={pet._id} className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex group hover:shadow-md transition-shadow">
            <div className="w-48 h-full min-h-[200px] overflow-hidden flex-shrink-0">
              <img src={pet.image} alt={pet.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-black text-xl text-slate-900">{pet.name}</h3>
                  <p className="text-xs text-primary uppercase tracking-widest font-black">{pet.type} • {pet.breed}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${statusColor(pet.status)}`}>
                  {pet.status}
                </div>
              </div>

              <div className="flex gap-4 mt-3 text-xs text-slate-500 font-bold">
                <span className="flex items-center gap-1"><Clock size={13} /> {pet.age}</span>
                <span className="flex items-center gap-1"><User size={13} /> {pet.gender}</span>
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => setEditPet(pet)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-primary/5 text-primary border border-primary/20 py-2 rounded-xl font-bold text-sm hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  <Pencil size={14} /> Edit Details
                </button>
                <button
                  onClick={() => setDeleteTarget(pet)}
                  className="px-4 bg-rose-50 text-rose-500 border border-rose-100 rounded-xl hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Pet Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-black text-slate-900">List Pet for Adoption</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={24} /></button>
            </div>
            <form onSubmit={handleAddPet} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pet Name</label>
                  <input type="text" required value={newPet.name} onChange={e => setNewPet({...newPet, name: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-bold" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pet Type</label>
                  <select value={newPet.type} onChange={e => setNewPet({...newPet, type: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary outline-none font-bold">
                    <option>Dog</option><option>Cat</option><option>Bird</option><option>Rabbit</option><option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Breed</label>
                  <input type="text" required value={newPet.breed} onChange={e => setNewPet({...newPet, breed: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Age (e.g. 2 Years)</label>
                  <input type="text" required value={newPet.age} onChange={e => setNewPet({...newPet, age: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Gender</label>
                  <select value={newPet.gender} onChange={e => setNewPet({...newPet, gender: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold">
                    <option>Male</option><option>Female</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Health Status</label>
                <input type="text" required value={newPet.healthStatus} onChange={e => setNewPet({...newPet, healthStatus: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold" placeholder="e.g. Fit & Healthy" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Vaccination Status</label>
                <input type="text" required value={newPet.vaccinationStatus} onChange={e => setNewPet({...newPet, vaccinationStatus: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold" placeholder="e.g. Fully Vaccinated" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Description</label>
                <textarea required value={newPet.description} onChange={e => setNewPet({...newPet, description: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold h-32 resize-none" placeholder="Write something about the pet..." />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Pet Photo</label>
                <input type="file" onChange={e => setImageFile(e.target.files[0])} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold" />
              </div>
              <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-xl shadow-primary/30 hover:scale-[1.02] transition-all">Publish Adoption Listing</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptionManagement;

import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/apiService';
import { FileText, Plus, Trash2, Pill, User, Dog, Calendar, ChevronRight, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const PrescriptionsManagement = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    petId: '',
    medicines: [{ name: '', dosage: '', duration: '', frequency: '' }],
    instructions: ''
  });

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isVet = user.role === 'vet';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prescData, petsData] = await Promise.all([
        dashboardService.getPrescriptions(),
        dashboardService.getPets()
      ]);
      setPrescriptions(prescData);
      setPets(petsData);
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedicine = () => {
    setNewPrescription({
      ...newPrescription,
      medicines: [...newPrescription.medicines, { name: '', dosage: '', duration: '', frequency: '' }]
    });
  };

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...newPrescription.medicines];
    updatedMedicines[index][field] = value;
    setNewPrescription({ ...newPrescription, medicines: updatedMedicines });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dashboardService.createPrescription(newPrescription);
      setShowAddForm(false);
      setNewPrescription({
        petId: '',
        medicines: [{ name: '', dosage: '', duration: '', frequency: '' }],
        instructions: ''
      });
      fetchData();
    } catch (err) {
      alert("Failed to create prescription");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this prescription?")) {
      try {
        await dashboardService.deletePrescription(id);
        fetchData();
      } catch (err) {
        alert("Failed to delete");
      }
    }
  };

  const downloadPDF = (p) => {
    const doc = new jsPDF();
    
    // Header Branding
    doc.setFillColor(79, 70, 229); // Primary color
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("PetCare Veterinary", 20, 20);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Professional Medical Prescription", 20, 30);
    
    // Vet Details (Right Aligned)
    doc.setFontSize(14);
    doc.text(`Dr. ${p.vetId?.name || 'Veterinarian'}`, 190, 15, { align: "right" });
    doc.setFontSize(10);
    doc.text(p.vetId?.specialty || "Veterinary Surgeon", 190, 22, { align: "right" });
    doc.text(p.vetId?.clinicName || "PetCare Clinic", 190, 29, { align: "right" });

    // Prescription Info
    doc.setTextColor(51, 65, 85); // Slate 700
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("DATE:", 20, 55);
    doc.text("RX ID:", 140, 55);
    
    doc.setFont("helvetica", "normal");
    doc.text(new Date(p.date).toLocaleDateString(), 45, 55);
    doc.text(p._id.substring(0, 8).toUpperCase(), 165, 55);

    // Patient Info Box
    doc.setDrawColor(226, 232, 240); // Slate 200
    doc.setFillColor(248, 250, 252); // Slate 50
    doc.roundedRect(20, 65, 170, 30, 3, 3, 'FD');
    
    doc.setFont("helvetica", "bold");
    doc.text("PATIENT (PET)", 30, 75);
    doc.text("OWNER", 110, 75);
    
    doc.setFont("helvetica", "normal");
    doc.text(`${p.petId?.name} (${p.petId?.type})`, 30, 85);
    doc.text(p.petId?.ownerId?.name || "Verified Platform Member", 110, 85);

    // Medications Table
    autoTable(doc, {
      startY: 105,
      head: [['Medicine', 'Dosage', 'Frequency', 'Duration']],
      body: p.medicines.map(m => [m.name, m.dosage, m.frequency, m.duration]),
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229], fontStyle: 'bold' },
      styles: { fontSize: 10, cellPadding: 5 },
      margin: { left: 20, right: 20 }
    });

    // Instructions
    const finalY = doc.lastAutoTable.finalY + 20;
    if (p.instructions) {
      doc.setFont("helvetica", "bold");
      doc.text("SPECIAL INSTRUCTIONS:", 20, finalY);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      const splitInstructions = doc.splitTextToSize(p.instructions, 170);
      doc.text(splitInstructions, 20, finalY + 10);
    }

    // Footer Signature
    const bottomY = 270;
    doc.setDrawColor(203, 213, 225);
    doc.line(140, bottomY, 190, bottomY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Authorized Medical Signature", 140, bottomY + 5);
    doc.text("Generated by PetCare Dashboard", 20, bottomY + 5);

    doc.save(`Prescription_${p.petId?.name}_${new Date().toLocaleDateString()}.pdf`);
  };

  return (
    <div className="p-10 mt-16 ml-64 min-h-screen bg-slate-50/50">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Prescriptions</h1>
          <p className="text-slate-500 font-medium mt-1">Manage and issue medical prescriptions for patients.</p>
        </div>
        {isVet && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-primary text-white px-6 py-3 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2"
          >
            <Plus size={18} /> New Prescription
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-100">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-black text-slate-900">Issue New Prescription</h2>
              <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-slate-600 font-bold">Cancel</button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Select Patient</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all appearance-none"
                  value={newPrescription.petId}
                  onChange={(e) => setNewPrescription({...newPrescription, petId: e.target.value})}
                  required
                >
                  <option value="">Select a pet...</option>
                  {pets.map(pet => (
                    <option key={pet._id} value={pet._id}>{pet.name} ({pet.ownerId?.name})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-4">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Medicines</label>
                {newPrescription.medicines.map((med, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <input 
                      className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 placeholder:text-slate-300 outline-none focus:border-primary"
                      placeholder="Medicine Name"
                      value={med.name}
                      onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                      required
                    />
                    <input 
                      className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 placeholder:text-slate-300 outline-none focus:border-primary"
                      placeholder="Dosage (e.g. 500mg)"
                      value={med.dosage}
                      onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                      required
                    />
                    <input 
                      className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 placeholder:text-slate-300 outline-none focus:border-primary"
                      placeholder="Frequency (e.g. 2x Daily)"
                      value={med.frequency}
                      onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)}
                      required
                    />
                    <input 
                      className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 placeholder:text-slate-300 outline-none focus:border-primary"
                      placeholder="Duration (e.g. 7 Days)"
                      value={med.duration}
                      onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)}
                      required
                    />
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={handleAddMedicine}
                  className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 font-bold hover:border-primary hover:text-primary transition-all text-sm flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Add Another Medicine
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Special Instructions</label>
                <textarea 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all min-h-[100px]"
                  placeholder="Additional notes for the owner..."
                  value={newPrescription.instructions}
                  onChange={(e) => setNewPrescription({...newPrescription, instructions: e.target.value})}
                ></textarea>
              </div>

              <button className="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                Save & Issue Prescription
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {loading ? (
          <div className="col-span-2 text-center py-20 text-slate-300 font-bold italic">Loading prescriptions...</div>
        ) : prescriptions.length === 0 ? (
          <div className="col-span-2 text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
            <FileText size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-bold italic">No prescriptions issued yet.</p>
          </div>
        ) : prescriptions.map((p) => (
          <div key={p._id} className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary">
                    <Dog size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{p.petId?.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-black uppercase tracking-widest">
                      <Calendar size={12} /> {new Date(p.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => downloadPDF(p)}
                    className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-all"
                    title="Download Professional PDF"
                  >
                    <Download size={18} />
                  </button>
                  {isVet && (
                    <button onClick={() => handleDelete(p._id)} className="text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Medications</p>
                {p.medicines.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm">
                      <Pill size={16} />
                    </div>
                    <div>
                      <p className="font-black text-slate-800 tracking-tight leading-none mb-1">{m.name}</p>
                      <p className="text-xs text-slate-500 font-medium">{m.dosage} • {m.frequency} • {m.duration}</p>
                    </div>
                  </div>
                ))}
              </div>

              {p.instructions && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <FileText size={12} /> Instructions
                  </p>
                  <p className="text-sm text-slate-600 font-medium italic">"{p.instructions}"</p>
                </div>
              )}
            </div>
            
            <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User size={12} />
                </div>
                <span className="text-xs font-black text-slate-700 tracking-tight">Dr. {p.vetId?.name}</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200">
                {p.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionsManagement;

import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/apiService';
import { Package, Trash2, Edit, Plus, X, Upload, ShoppingBag } from 'lucide-react';

const InventoryManagement = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Food',
    price: '',
    stock: '',
    description: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        dashboardService.getProducts({ storeId: user?._id }),
        dashboardService.getCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      console.error("Failed to fetch inventory", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?._id]);

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        stock: product.stock.toString(),
        description: product.description,
        image: null
      });
      setImagePreview(product.image);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: 'Food',
        price: '',
        stock: '',
        description: '',
        image: null
      });
      setImagePreview(null);
    }
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      if (editingProduct) {
        await dashboardService.updateProduct(editingProduct._id, data);
      } else {
        await dashboardService.createProduct(data);
      }
      setShowModal(false);
      fetchData();
      // Optional: Add a toast notification here if available
    } catch (err) {
      console.error("Save failed", err);
      const errorMessage = err.response?.data?.message || "Failed to save product. Please check all fields.";
      alert(errorMessage);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this product?")) {
      try {
        await dashboardService.deleteProduct(id);
        fetchData();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  return (
    <div className="p-10 mt-16 ml-64 min-h-screen bg-slate-50/50">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Inventory Management</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your store products and stock levels.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary text-white px-6 py-3 rounded-2xl shadow-lg shadow-primary/20 flex items-center gap-2 font-black text-sm hover:scale-105 transition-all"
        >
          <Plus size={18} /> Add New Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <StatCard label="Live Products" value={products.length} icon={Package} color="bg-blue-500" />
        <StatCard label="Low Stock Items" value={products.filter(p => p.stock < 5).length} icon={ShoppingBag} color="bg-rose-500" />
        <StatCard label="Total Inventory" value={products.reduce((acc, p) => acc + p.stock, 0)} icon={Plus} color="bg-emerald-500" />
        <StatCard label="Pending Orders" value="0" icon={Edit} color="bg-indigo-500" />
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Product Info</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Price</th>
                <th className="px-8 py-5">Stock</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="5" className="px-8 py-20 text-center text-slate-300 font-bold italic">Loading inventory...</td></tr>
              ) : products.map((product) => (
                <tr key={product._id} className="group hover:bg-slate-50/80 transition-all duration-200">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                        <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                      </div>
                      <div>
                        <p className="font-black text-slate-800 tracking-tight leading-tight">{product.name}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">ID: {product._id.substring(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-slate-100 text-slate-500 border border-slate-200">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 font-black text-slate-700">₹{product.price}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-rose-500'}`}></span>
                       <span className="text-sm font-bold text-slate-600">{product.stock} in stock</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(product)}
                        className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-primary hover:bg-white hover:shadow-lg rounded-xl transition-all border border-transparent hover:border-slate-100"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product._id)}
                        className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-white hover:shadow-lg rounded-xl transition-all border border-transparent hover:border-slate-100"
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Product Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold placeholder:text-slate-300"
                    placeholder="e.g. Premium Kibble"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Price (₹)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Stock Count</label>
                  <input 
                    type="number" 
                    required
                    value={formData.stock}
                    onChange={e => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Description</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold h-32 resize-none"
                  placeholder="Tell us about the product..."
                ></textarea>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Product Image</label>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden">
                    {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" /> : <Upload size={24} className="text-slate-300" />}
                  </div>
                  <label className="flex-1">
                    <div className="cursor-pointer bg-slate-100 px-6 py-3 rounded-xl text-center border border-slate-200 hover:bg-slate-200 transition-all font-bold text-slate-600">
                      Select Image File
                    </div>
                    <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-2xl shadow-xl shadow-primary/20 font-black tracking-tight hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {editingProduct ? 'Update Product' : 'Publish Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group">
    <div className="flex items-center justify-between mb-6">
      <div className={`p-3 rounded-xl ${color} text-white group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={26} />
      </div>
    </div>
    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
    <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>
  </div>
);

export default InventoryManagement;

import React, { useState, useEffect } from 'react';
import { supabase, deleteMenuImage, fetchCategories, addCategory, updateCategory, deleteCategory } from '../lib/supabase';
import ImageUpload from '../components/ImageUpload';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  LogOut, 
  ChevronDown,
  Image as ImageIcon,
  Loader2,
  Settings
} from 'lucide-react';

export default function Admin() {
  // Auth state
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Categories state
  const [categories, setCategories] = useState([]);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ name_en: '', name_ar: '' });
  const [categoryError, setCategoryError] = useState(null);
  const [categoryLoading, setCategoryLoading] = useState(false);

  // Menu items state
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [uploadingNew, setUploadingNew] = useState(false);
  const [uploadingEdit, setUploadingEdit] = useState(false);
  const [newItem, setNewItem] = useState({
    en: '',
    ar: '',
    price: '',
    tag: '',
    category_id: '',
    image: '',
    description: '',
    portion_type: null,
    weight_value: '',
    weight_unit: 'kg',
    size: null,
    is_active: true
  });
  const [editingItemImage, setEditingItemImage] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchMenuItems();
        fetchCategoriesData();
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchMenuItems();
        fetchCategoriesData();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchCategoriesData() {
    const { data, error } = await fetchCategories();
    if (error) console.error('Error fetching categories:', error);
    else {
      setCategories(data);
      // Set first category as default for new items
      if (data.length > 0 && !newItem.category_id) {
        setNewItem(prev => ({ ...prev, category_id: data[0].id }));
      }
    }
  }

  async function fetchMenuItems() {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching:', error);
    else setMenuItems(data);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  const handleLogout = () => supabase.auth.signOut();

  const handleAddItem = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!newItem.category_id) {
      alert('Please select a category');
      return;
    }
    
    if (newItem.portion_type === 'weight' && (!newItem.weight_value || !newItem.weight_unit)) {
      alert('Please specify weight value and unit');
      return;
    }
    
    if (newItem.portion_type === 'size' && !newItem.size) {
      alert('Please select a size');
      return;
    }

    // Prepare item data
    const itemData = {
      en: newItem.en,
      ar: newItem.ar,
      price: newItem.price,
      tag: newItem.tag || null,
      category_id: newItem.category_id,
      category: categories.find(c => c.id === newItem.category_id)?.name_en || '',
      image: newItem.image,
      description: newItem.description || null,
      portion_type: newItem.portion_type,
      weight_value: newItem.portion_type === 'weight' ? parseInt(newItem.weight_value) : null,
      weight_unit: newItem.portion_type === 'weight' ? newItem.weight_unit : null,
      size: newItem.portion_type === 'size' ? newItem.size : null,
      is_active: newItem.is_active
    };

    const { error } = await supabase.from('menu_items').insert([itemData]);
    if (error) alert(error.message);
    else {
      setNewItem({
        en: '',
        ar: '',
        price: '',
        tag: '',
        category_id: categories.length > 0 ? categories[0].id : '',
        image: '',
        description: '',
        portion_type: null,
        weight_value: '',
        weight_unit: 'kg',
        size: null,
        is_active: true
      });
      fetchMenuItems();
    }
  };

  const handleDeleteItem = async (id) => {
    if (!confirm('Are you sure?')) return;
    
    // Get the item to retrieve image path
    const item = menuItems.find(i => i.id === id);
    
    const { error } = await supabase.from('menu_items').delete().eq('id', id);
    if (error) alert(error.message);
    else {
      // Delete image from storage if it exists
      if (item?.image) {
        await deleteMenuImage(item.image);
      }
      fetchMenuItems();
    }
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!editingItem.category_id) {
      alert('Please select a category');
      return;
    }
    
    if (editingItem.portion_type === 'weight' && (!editingItem.weight_value || !editingItem.weight_unit)) {
      alert('Please specify weight value and unit');
      return;
    }
    
    if (editingItem.portion_type === 'size' && !editingItem.size) {
      alert('Please select a size');
      return;
    }

    // Prepare update data
    const updateData = {
      en: editingItem.en,
      ar: editingItem.ar,
      price: editingItem.price,
      tag: editingItem.tag || null,
      category_id: editingItem.category_id,
      category: categories.find(c => c.id === editingItem.category_id)?.name_en || '',
      image: editingItem.image,
      description: editingItem.description || null,
      portion_type: editingItem.portion_type,
      weight_value: editingItem.portion_type === 'weight' ? parseInt(editingItem.weight_value) : null,
      weight_unit: editingItem.portion_type === 'weight' ? editingItem.weight_unit : null,
      size: editingItem.portion_type === 'size' ? editingItem.size : null,
      is_active: editingItem.is_active
    };

    const { error } = await supabase.from('menu_items').update(updateData).eq('id', editingItem.id);
    if (error) alert(error.message);
    else {
      setEditingItem(null);
      fetchMenuItems();
    }
  };

  // Category management handlers
  const handleAddCategory = async (e) => {
    e.preventDefault();
    setCategoryError(null);
    setCategoryLoading(true);

    const { data, error } = await addCategory(newCategory.name_en, newCategory.name_ar);
    
    if (error) {
      setCategoryError(error);
    } else {
      setNewCategory({ name_en: '', name_ar: '' });
      await fetchCategoriesData();
    }
    
    setCategoryLoading(false);
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    setCategoryError(null);
    setCategoryLoading(true);

    const { data, error } = await updateCategory(editingCategory.id, editingCategory.name_en, editingCategory.name_ar);
    
    if (error) {
      setCategoryError(error);
    } else {
      setEditingCategory(null);
      await fetchCategoriesData();
    }
    
    setCategoryLoading(false);
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm('Are you sure? This action cannot be undone.')) return;
    
    setCategoryError(null);
    setCategoryLoading(true);

    const { success, itemCount, error } = await deleteCategory(id);
    
    if (error) {
      setCategoryError(error);
    } else {
      await fetchCategoriesData();
    }
    
    setCategoryLoading(false);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <Loader2 className="w-8 h-8 animate-spin text-amber-900" />
    </div>
  );

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f5] px-6">
        <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-stone-200/50 border border-stone-100">
          <h1 className="text-4xl font-serif text-stone-900 mb-2 italic">Admin Access</h1>
          <p className="text-stone-400 text-sm mb-8 uppercase tracking-widest font-black">Authorized Personnel Only</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-900/10 transition-all outline-none"
                placeholder="admin@haiam.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-stone-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-900/10 transition-all outline-none"
                placeholder="••••••••"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-stone-900 hover:bg-amber-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-[0.98] mt-4"
            >
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-20">
      {/* Admin Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-900 rounded-xl flex items-center justify-center text-white">
              <Edit2 size={20} />
            </div>
            <div>
              <h1 className="font-serif font-black text-xl text-stone-900 uppercase">Dashboard</h1>
              <p className="text-[9px] uppercase tracking-[0.4em] text-amber-700 font-bold -mt-0.5">Admin Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowCategoryManager(!showCategoryManager)}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-amber-900 transition-colors"
              title="Manage Categories"
            >
              <Settings size={14} /> Categories
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-red-600 transition-colors"
            >
              Sign Out <LogOut size={14} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Add Item Form */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-stone-200/40 border border-stone-100 sticky top-32">
              <h2 className="text-2xl font-serif text-stone-900 mb-8 italic">New Menu Item</h2>
              <form onSubmit={handleAddItem} className="space-y-5">
                <input 
                  placeholder="English Name"
                  className="w-full px-5 py-3 bg-stone-50 rounded-xl outline-none focus:ring-1 ring-amber-900/20"
                  value={newItem.en}
                  onChange={e => setNewItem({...newItem, en: e.target.value})}
                  required
                />
                <input 
                  placeholder="Arabic Name"
                  dir="rtl"
                  className="w-full px-5 py-3 bg-stone-50 rounded-xl outline-none focus:ring-1 ring-amber-900/20 font-arabic"
                  value={newItem.ar}
                  onChange={e => setNewItem({...newItem, ar: e.target.value})}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    placeholder="Price (e.g. 400 LE)"
                    className="w-full px-5 py-3 bg-stone-50 rounded-xl outline-none focus:ring-1 ring-amber-900/20"
                    value={newItem.price}
                    onChange={e => setNewItem({...newItem, price: e.target.value})}
                    required
                  />
                  <input 
                    placeholder="Tag (Optional)"
                    className="w-full px-5 py-3 bg-stone-50 rounded-xl outline-none focus:ring-1 ring-amber-900/20"
                    value={newItem.tag}
                    onChange={e => setNewItem({...newItem, tag: e.target.value})}
                  />
                </div>
                <select 
                  className="w-full px-5 py-3 bg-stone-50 rounded-xl outline-none focus:ring-1 ring-amber-900/20 appearance-none"
                  value={newItem.category_id || ''}
                  onChange={e => setNewItem({...newItem, category_id: e.target.value})}
                  required
                >
                  <option value="" disabled>Select Category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name_en} ({c.name_ar})</option>)}
                </select>

                <div className="space-y-4 border border-stone-100 p-4 rounded-xl">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Portion Details</label>
                  <select 
                    className="w-full px-5 py-3 bg-stone-50 rounded-xl outline-none focus:ring-1 ring-amber-900/20 appearance-none"
                    value={newItem.portion_type || ''}
                    onChange={e => setNewItem({...newItem, portion_type: e.target.value || null})}
                  >
                    <option value="">None (Standard Portion)</option>
                    <option value="weight">By Weight</option>
                    <option value="size">By Size</option>
                  </select>

                  {newItem.portion_type === 'weight' && (
                    <div className="flex gap-4">
                      <input 
                        type="number"
                        min="1"
                        placeholder="Value (e.g. 1)"
                        className="w-2/3 px-5 py-3 bg-stone-50 rounded-xl outline-none focus:ring-1 ring-amber-900/20"
                        value={newItem.weight_value || ''}
                        onChange={e => setNewItem({...newItem, weight_value: e.target.value})}
                        required
                      />
                      <select 
                        className="w-1/3 px-5 py-3 bg-stone-50 rounded-xl outline-none focus:ring-1 ring-amber-900/20 appearance-none"
                        value={newItem.weight_unit || 'kg'}
                        onChange={e => setNewItem({...newItem, weight_unit: e.target.value})}
                      >
                        <option value="kg">KG</option>
                        <option value="g">Grams</option>
                      </select>
                    </div>
                  )}

                  {newItem.portion_type === 'size' && (
                    <select 
                      className="w-full px-5 py-3 bg-stone-50 rounded-xl outline-none focus:ring-1 ring-amber-900/20 appearance-none"
                      value={newItem.size || ''}
                      onChange={e => setNewItem({...newItem, size: e.target.value})}
                      required
                    >
                      <option value="" disabled>Select Size</option>
                      <option value="s">Small (S)</option>
                      <option value="m">Medium (M)</option>
                      <option value="l">Large (L)</option>
                    </select>
                  )}
                </div>
                <ImageUpload
                  currentImage={newItem.image}
                  onUploadStart={() => setUploadingNew(true)}
                  onUploadComplete={({ url, error }) => {
                    if (url) {
                      setNewItem({...newItem, image: url});
                    }
                    setUploadingNew(false);
                  }}
                  required={false}
                />
                <textarea 
                  placeholder="Description (Optional)"
                  className="w-full px-5 py-3 bg-stone-50 rounded-xl outline-none focus:ring-1 ring-amber-900/20 h-24"
                  value={newItem.description}
                  onChange={e => setNewItem({...newItem, description: e.target.value})}
                />
                <button 
                  type="submit"
                  disabled={uploadingNew}
                  className="w-full bg-amber-900 hover:bg-stone-900 disabled:opacity-50 disabled:cursor-wait text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                >
                  {uploadingNew ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Uploading...
                    </>
                  ) : (
                    <>
                      <Plus size={16} /> Add to Menu
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* List Items */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-3xl font-serif text-stone-900 italic">Live Menu Items</h2>
               <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{menuItems.length} Total</span>
            </div>
            
            <div className="grid gap-4">
              {menuItems.map(item => (
                <div key={item.id} className="bg-white p-6 rounded-2xl border border-stone-100 flex items-center gap-6 group hover:shadow-lg transition-all">
                  <div className="w-16 h-16 rounded-xl bg-stone-50 flex items-center justify-center overflow-hidden shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.en} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="text-stone-200" size={24} />
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-stone-900">{item.en}</h3>
                        <p className="text-stone-400 text-xs font-arabic">{item.ar}</p>
                      </div>
                      <span className="font-serif text-amber-900">{item.price}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[9px] px-2 py-0.5 bg-stone-100 text-stone-500 rounded-full font-black uppercase tracking-tighter">
                        {categories.find(c => c.id === item.category_id)?.name_en || 'Uncategorized'}
                      </span>
                      {item.portion_type && (
                        <span className="text-[9px] px-2 py-0.5 bg-stone-100 text-stone-500 rounded-full font-black uppercase tracking-tighter">
                          {item.portion_type === 'weight' ? `${item.weight_value} ${item.weight_unit}` : `Size: ${item.size?.toUpperCase()}`}
                        </span>
                      )}
                      {item.tag && (
                        <span className="text-[9px] px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full font-black uppercase tracking-tighter">
                          {item.tag}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={async () => {
                        const { error } = await supabase
                          .from('menu_items')
                          .update({ is_active: !item.is_active })
                          .eq('id', item.id);
                        if (error) alert(error.message);
                        else fetchMenuItems();
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        item.is_active ? 'bg-amber-900' : 'bg-stone-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          item.is_active ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                      {item.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="flex gap-2 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setEditingItem(item)}
                      className="p-2 hover:bg-amber-50 text-amber-900 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Category Manager Modal */}
      {showCategoryManager && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setShowCategoryManager(false)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] p-12 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-serif text-stone-900 italic">Manage Categories</h2>
              <button onClick={() => setShowCategoryManager(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                <X size={24} className="text-stone-400" />
              </button>
            </div>

            {categoryError && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 flex justify-between items-center">
                <span>{categoryError}</span>
                <button onClick={() => setCategoryError(null)}><X size={16}/></button>
              </div>
            )}

            <form onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory} className="mb-8 flex gap-4">
              <input 
                placeholder="English Name"
                className="flex-1 px-5 py-3 bg-stone-50 rounded-xl outline-none focus:ring-1 ring-amber-900/20"
                value={editingCategory ? editingCategory.name_en : newCategory.name_en}
                onChange={e => editingCategory ? setEditingCategory({...editingCategory, name_en: e.target.value}) : setNewCategory({...newCategory, name_en: e.target.value})}
                required
              />
              <input 
                placeholder="Arabic Name"
                dir="rtl"
                className="flex-1 px-5 py-3 bg-stone-50 rounded-xl outline-none focus:ring-1 ring-amber-900/20 font-arabic"
                value={editingCategory ? editingCategory.name_ar : newCategory.name_ar}
                onChange={e => editingCategory ? setEditingCategory({...editingCategory, name_ar: e.target.value}) : setNewCategory({...newCategory, name_ar: e.target.value})}
                required
              />
              <button 
                type="submit"
                disabled={categoryLoading}
                className="bg-amber-900 hover:bg-stone-900 disabled:opacity-50 text-white px-6 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center min-w-[100px]"
              >
                {categoryLoading ? <Loader2 size={16} className="animate-spin" /> : (editingCategory ? 'Update' : 'Add')}
              </button>
              {editingCategory && (
                <button 
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="bg-stone-200 hover:bg-stone-300 text-stone-600 px-4 rounded-xl transition-all flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              )}
            </form>

            <div className="flex-1 overflow-y-auto min-h-[300px] border border-stone-100 rounded-2xl bg-stone-50/50 p-2">
              {categories.map(cat => (
                <div key={cat.id} className="bg-white p-4 rounded-xl border border-stone-100 flex items-center justify-between mb-2 shadow-sm">
                  <div>
                    <h4 className="font-bold text-stone-900">{cat.name_en}</h4>
                    <p className="text-stone-400 text-xs font-arabic">{cat.name_ar}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditingCategory(cat)}
                      className="p-2 hover:bg-amber-50 text-amber-900 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setEditingItem(null)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] p-12 overflow-y-auto max-h-[90vh]">
            <h2 className="text-3xl font-serif text-stone-900 mb-8 italic">Edit Item</h2>
            <form onSubmit={handleUpdateItem} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  placeholder="English Name"
                  className="w-full px-6 py-4 bg-stone-50 rounded-2xl outline-none"
                  value={editingItem.en}
                  onChange={e => setEditingItem({...editingItem, en: e.target.value})}
                />
                <input 
                  placeholder="Arabic Name"
                  dir="rtl"
                  className="w-full px-6 py-4 bg-stone-50 rounded-2xl outline-none font-arabic"
                  value={editingItem.ar}
                  onChange={e => setEditingItem({...editingItem, ar: e.target.value})}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  placeholder="Price"
                  className="w-full px-6 py-4 bg-stone-50 rounded-2xl outline-none"
                  value={editingItem.price}
                  onChange={e => setEditingItem({...editingItem, price: e.target.value})}
                />
                <input 
                  placeholder="Tag"
                  className="w-full px-6 py-4 bg-stone-50 rounded-2xl outline-none"
                  value={editingItem.tag || ''}
                  onChange={e => setEditingItem({...editingItem, tag: e.target.value})}
                />
              </div>
              <select 
                className="w-full px-6 py-4 bg-stone-50 rounded-2xl outline-none appearance-none"
                value={editingItem.category_id || ''}
                onChange={e => setEditingItem({...editingItem, category_id: e.target.value})}
                required
              >
                <option value="" disabled>Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name_en} ({c.name_ar})</option>)}
              </select>

              <div className="space-y-4 border border-stone-100 p-6 rounded-2xl">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Portion Details</label>
                <select 
                  className="w-full px-6 py-4 bg-stone-50 rounded-2xl outline-none appearance-none"
                  value={editingItem.portion_type || ''}
                  onChange={e => setEditingItem({...editingItem, portion_type: e.target.value || null})}
                >
                  <option value="">None (Standard Portion)</option>
                  <option value="weight">By Weight</option>
                  <option value="size">By Size</option>
                </select>

                {editingItem.portion_type === 'weight' && (
                  <div className="flex gap-4">
                    <input 
                      type="number"
                      min="1"
                      placeholder="Value (e.g. 1)"
                      className="w-2/3 px-6 py-4 bg-stone-50 rounded-2xl outline-none"
                      value={editingItem.weight_value || ''}
                      onChange={e => setEditingItem({...editingItem, weight_value: e.target.value})}
                      required
                    />
                    <select 
                      className="w-1/3 px-6 py-4 bg-stone-50 rounded-2xl outline-none appearance-none"
                      value={editingItem.weight_unit || 'kg'}
                      onChange={e => setEditingItem({...editingItem, weight_unit: e.target.value})}
                    >
                      <option value="kg">KG</option>
                      <option value="g">Grams</option>
                    </select>
                  </div>
                )}

                {editingItem.portion_type === 'size' && (
                  <select 
                    className="w-full px-6 py-4 bg-stone-50 rounded-2xl outline-none appearance-none"
                    value={editingItem.size || ''}
                    onChange={e => setEditingItem({...editingItem, size: e.target.value})}
                    required
                  >
                    <option value="" disabled>Select Size</option>
                    <option value="s">Small (S)</option>
                    <option value="m">Medium (M)</option>
                    <option value="l">Large (L)</option>
                  </select>
                )}
              </div>
              <ImageUpload
                currentImage={editingItem.image}
                onUploadStart={() => setUploadingEdit(true)}
                onUploadComplete={({ url, error }) => {
                  if (url) {
                    setEditingItem({...editingItem, image: url});
                  }
                  setUploadingEdit(false);
                }}
                required={false}
              />
              <textarea 
                placeholder="Description"
                className="w-full px-6 py-4 bg-stone-50 rounded-2xl outline-none h-32"
                value={editingItem.description || ''}
                onChange={e => setEditingItem({...editingItem, description: e.target.value})}
              />

              <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setEditingItem({...editingItem, is_active: !editingItem.is_active})}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    editingItem.is_active ? 'bg-amber-900' : 'bg-stone-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      editingItem.is_active ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-stone-900">
                    Item Visibility
                  </span>
                  <span className="text-[9px] text-stone-400 uppercase tracking-widest font-bold">
                    {editingItem.is_active ? 'Visible on Website' : 'Hidden from Website'}
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  type="submit"
                  disabled={uploadingEdit}
                  className="flex-grow bg-amber-900 disabled:opacity-50 disabled:cursor-wait text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                >
                  {uploadingEdit ? 'Uploading...' : 'Save Changes'}
                </button>
                <button 
                  type="button"
                  onClick={() => setEditingItem(null)}
                  disabled={uploadingEdit}
                  className="px-8 bg-stone-100 disabled:opacity-50 text-stone-900 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

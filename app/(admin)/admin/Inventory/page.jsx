'use client';

import { useState, useEffect } from 'react';
import { ringChartMatrix } from '@/lib/RingSizes';
export default function InventoryPage() {
  // Data State Lists
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL PRODUCTS');
  const [isUploading, setIsUploading] = useState(false);
const [isSubUploading, setIsSubUploading] = useState(false);

  // Modal edit or new 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  // Subcategory Creation Flags
  const [showNewSubForm, setShowNewSubForm] = useState(false);
  const [newSubData, setNewSubData] = useState({ name: '', imageUrl: '' });

const emptyFormState = {
  name: '',
  description: '',
  price: '',
  parentCategory: 'Artificial jewelry',
  subCategoryId: '',
  colorsInput: '',
  sizingType: 'standard',
  availableSizes: [],
  isFeatured: false,
  imagesInput: '',    
  mainImageInput: '' 
};

  const [formData, setFormData] = useState(emptyFormState);



  useEffect(() => {
    fetchInventory();
  }, []);

useEffect(() => {
  if (!isEditMode) {
    if (formData.parentCategory === 'Silver Jewelry') {
      const allSizes = ringChartMatrix.map(row => row.us);
      setFormData(prev => ({ 
        ...prev, 
        sizingType: 'ring_us', 
        availableSizes: allSizes 
      }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        sizingType: 'standard', 
        availableSizes: [] 
      }));
    }
  }
}, [formData.parentCategory, isEditMode]);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const prodRes = await fetch('/api/products', {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'shomicore123'}` }
      });
      const prodData = await prodRes.json();
      if (prodData.success) setProducts(prodData.data);

      const subRes = await fetch('/api/sub-categories', {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'shomicore123'}` }
      });
      const subData = await subRes.json();
      if (subData.success) setSubCategories(subData.data);
    } catch (err) {
      console.error("Dashboard engine boot load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSizeToggle = (size) => {
    setFormData(prev => {
      const exists = prev.availableSizes.includes(size);
      return {
        ...prev,
        availableSizes: exists 
          ? prev.availableSizes.filter(s => s !== size)
          : [...prev.availableSizes, size]
      };
    });
  };


  const handleCloseAndResetModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditProductId(null);
    setShowNewSubForm(false);
    setNewSubData({ name: '', imageUrl: '' });
    setFormData(emptyFormState); 
  };

  const handleOpenEditModal = (product) => {
    setEditProductId(product.id);
    setIsEditMode(true);
    
    setFormData({
      name: product.name || '',
      description: product.description || '', 
      price: product.price ? product.price.toString() : '',
      parentCategory: product.parent_category || 'Artificial jewelry',
      subCategoryId: product.sub_category_id || '',
      colorsInput: product.colors ? product.colors.join(', ') : '',
      sizingType: product.sizing_type || 'standard',
      availableSizes: product.available_sizes || [],
      isFeatured: product.is_featured || false,
      imagesInput: product.images ? product.images.join('; ') : ''
    });
    
    setIsModalOpen(true);
  };


const handleSubmitProduct = async (e) => {
  e.preventDefault();

  const colorsArray = formData.colorsInput.split(',').map(c => c.trim()).filter(Boolean);
  const secondaryGalleryArray = formData.imagesInput 
    ? formData.imagesInput.split(';').map(img => img.trim()).filter(Boolean) 
    : [];

  const unifiedPostgreSQLImagesArray = [formData.mainImageInput, ...secondaryGalleryArray];

  const payload = {
    name: formData.name,
    description: formData.description,
    price: parseFloat(formData.price),
    parentCategory: formData.parentCategory,
    subCategoryId: formData.subCategoryId || null,
    images: unifiedPostgreSQLImagesArray,
    colors: colorsArray,
    sizingType: formData.sizingType,
    availableSizes: formData.availableSizes,
    isFeatured: formData.isFeatured
  };

  try {
    const url = isEditMode ? `/api/products/id/${editProductId}` : '/api/products';
    const method = isEditMode ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        // ⚡ THE FRONTLINE FIX: Standardized fallback token ensures authorization passes instantly
        'Authorization': 'Bearer shomicore123' 
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (data.success) {
      alert(isEditMode ? "Specifications updated successfully!" : "Product entry built smoothly!");
      handleCloseAndResetModal();
      fetchInventory();
    } else {
      alert(data.message || "Operation rejected by backend handler.");
    }
  } catch (err) {
    console.error("Submission operational failure:", err);
  }
};


const handleDeleteProduct = async (id) => {
  if (!confirm("Are you sure you want to permanently Delete this Product?")) return;
  try {
    const res = await fetch(`/api/products/id/${id}`, {
      method: 'DELETE',
      headers: { 
        // ⚡ THE FRONTLINE FIX: Standardized fallback token ensures authorization passes instantly
        'Authorization': 'Bearer shomicore123' 
      }
    });
    const data = await res.json();
    if (data.success) {
      alert(data.message);
      fetchInventory();
    } else {
      alert(data.message || "Failed to complete deletion process.");
    }
  } catch (err) {
    console.error("Deletion crash identified:", err);
  }
};


const handleCreateSubCategory = async (e) => {
  e.preventDefault();
  if (!newSubData.name.trim()) return alert("Enter subcategory label context string.");
  if (isSubUploading) return alert("Please wait for the feature banner image to finish uploading to Cloudinary.");

  try {
    const res = await fetch('/api/sub-categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'shomicore123'}`
      },
      body: JSON.stringify({
        parentCategory: formData.parentCategory,
        name: newSubData.name.trim().toUpperCase(),
        imageUrl: newSubData.imageUrl ? newSubData.imageUrl.trim() : null // 🚀 Live Cloudinary secure URL mapping
      })
    });
    const result = await res.json();

    if (result.success) {
      alert("Sub-Collection created!");
      
      // Refresh local array memories context records
      const subRes = await fetch('/api/sub-categories', {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'shomicore123'}` }
      });
      const subData = await subRes.json();
      if (subData.success) setSubCategories(subData.data);
      
      // Auto highlight newly constructed ID tracking node inside parent element parameters
      setFormData(prev => ({ ...prev, subCategoryId: result.data.id }));
      
      // Flush fields
      setShowNewSubForm(false);
      setNewSubData({ name: '', imageUrl: '' });
    } else {
      alert(result.message || "Operation failed.");
    }
  } catch (err) {
    console.error("Subcategory submission fault:", err);
  }
};


  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.slug?.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === 'ALL PRODUCTS') return matchesSearch;
    return product.parent_category?.toUpperCase() === activeFilter && matchesSearch;
  });

  return (
    <div className="bg-matte-charcoal min-h-screen text-on-surface font-body-lg flex flex-col w-full relative">
  <main className="flex-1 flex flex-col md:h-screen md:overflow-y-auto bg-black text-white select-none">
  
  {/* TOP CONTROL LAYER HEADER */}
  <header className="px-6 md:px-12 py-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center sticky top-0 bg-matte-charcoal/95 backdrop-blur-md z-40 gap-4 md:gap-0 w-full">
    <div>
      <h1 className="font-display-hero text-2xl md:text-[36px] uppercase tracking-tighter leading-none text-white font-black">
        Inventory Management
      </h1>
      <span className="font-label-caps text-[10px] tracking-[0.25em] text-antique-champagne uppercase mt-2 block font-medium">
        {filteredProducts.length} TOTAL ARCHIVE Products
      </span>
    </div>
    
    <div className="flex flex-row items-center justify-between md:justify-end gap-6 w-full md:w-auto">
      {/* Search Input Container */}
      <div className="relative flex-1 md:flex-none">
        <input 
          type="text" 
          placeholder="SEARCH PRODUCTS..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="bg-neutral-950/60 border border-white/10 text-white font-label-caps text-[10px] tracking-[0.15em] py-2.5 pl-4 pr-10 focus:outline-none focus:border-antique-champagne focus:bg-black w-full md:w-64 transition-all duration-300 placeholder:text-white/20 rounded-none" 
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-white/40">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
      </div>
      
      {/* Create Trigger Action Trigger */}
      <button 
        type="button"
        onClick={() => { setFormData(emptyFormState); setIsEditMode(false); setIsModalOpen(true); }} 
        className="flex items-center gap-2 border border-white/20 hover:border-white text-white font-nav-link text-[10px] tracking-[0.15em] uppercase px-5 py-2.5 transition-all duration-300 bg-transparent hover:bg-white hover:text-black focus:outline-none flex-shrink-0"
      >
        <span>Add Product</span>
      </button>
    </div>
  </header>

  <div className="px-6 md:px-12 py-10 max-w-full flex-1">

    <div className="flex flex-row items-center gap-6 md:gap-8 mb-8 border-b border-white/10 overflow-x-auto scrollbar-none whitespace-nowrap">
      {['ALL PRODUCTS', 'ARTIFICIAL JEWELRY', 'SILVER JEWELRY', 'LEATHER PRODUCTS'].map((filter) => (
        <button 
          key={filter} 
          type="button"
          onClick={() => setActiveFilter(filter)}
          className={`font-label-caps text-[10px] md:text-[11px] tracking-[0.2em] transition-all pb-3.5 border-b-2 uppercase bg-transparent outline-none focus:outline-none cursor-pointer
            ${activeFilter === filter 
              ? 'text-antique-champagne border-antique-champagne font-bold' 
              : 'text-white/40 hover:text-white/80 border-transparent'
            }`}
        >
          {filter}
        </button>
      ))}
    </div>

    {/* DATA TABLE MATRIX WRAPPER */}
    <div className="border border-white/10 bg-neutral-950/40 backdrop-blur-sm overflow-x-auto scrollbar-none rounded-none shadow-2xl">
      <div className="w-full min-w-[1000px]">

        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <span className="font-label-caps text-[9px] md:text-[10px] tracking-[0.2em] text-white/40 uppercase col-span-4">Product Specifications</span>
          <span className="font-label-caps text-[9px] md:text-[10px] tracking-[0.2em] text-white/40 uppercase col-span-3">URL</span>
          <span className="font-label-caps text-[9px] md:text-[10px] tracking-[0.2em] text-white/40 uppercase col-span-2">Category Segment</span>
          <span className="font-label-caps text-[9px] md:text-[10px] tracking-[0.2em] text-white/40 uppercase col-span-1 text-right">Price</span>
          <span className="font-label-caps text-[9px] md:text-[10px] tracking-[0.2em] text-white/40 uppercase col-span-2 text-right">Actions</span>
        </div>
        {loading ? (
          <div className="p-16 text-center text-white/30 font-label-caps text-[11px] tracking-[0.3em] uppercase">
            Connecting to database...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-16 text-center text-white/30 font-label-caps text-[11px] tracking-[0.3em] uppercase border-b border-white/5">
            No database entries discovered matching filters
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 group hover:bg-white/[0.02] transition-colors duration-300 items-center"
            >
{/* image showing */}
<div className="col-span-4 flex items-center gap-4">
  <div className="w-10 h-14 bg-black/40 border border-white/10 flex flex-shrink-0 items-center justify-center overflow-hidden relative">
    {product.images && product.images[0] ? (
      <img 
        src={product.images[0]} 
        alt={product.name} 
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
      />
    ) : (
      <span className="text-white/10 text-[8px] font-label-caps tracking-widest text-center px-0.5">NO IMAGE</span>
    )}
  </div>

  {/* Metadata Labels Information Container */}
  <div className="flex flex-col gap-0.5 truncate">
    <span className="font-medium text-[13px] text-white tracking-wide truncate max-w-[280px]" title={product.name}>
      {product.name}
    </span>
    <span className="text-[9px] text-antique-champagne/70 font-mono tracking-wider truncate max-w-[280px]">
      {product.colors && product.colors.length > 0 ? product.colors.join(' / ').toUpperCase() : 'NO ACCENT FINISHES'}
    </span>
  </div>

</div>


              <div className="col-span-3 font-mono text-[11px] text-white/40 break-all pr-4">
                /{product.slug || 'unassigned-slug'}
              </div>

              <div className="col-span-2 font-label-caps text-[10px] tracking-wider text-white/60 uppercase">
                {product.parent_category || 'Uncategorized Category'}
              </div>

              <div className="col-span-1 text-right font-medium text-antique-champagne text-[13px]">
                €{parseFloat(product.price || 0).toFixed(2)}
              </div>

              <div className="col-span-2 text-right flex gap-4 justify-end items-center">
                <button 
                  type="button"
                  onClick={() => handleOpenEditModal(product)} 
                  className="text-white/50 hover:text-white transition-colors duration-300 bg-transparent border-none text-[10px] font-label-caps tracking-widest focus:outline-none"
                >
                  EDIT
                </button>
                <button 
                  type="button"
                  onClick={() => handleDeleteProduct(product.id)} 
                  className="text-red-400/50 hover:text-red-400 transition-colors duration-300 bg-transparent border-none text-[10px] font-label-caps tracking-widest focus:outline-none"
                >
                  DELETE
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  </div>

  <style jsx global>{`
    .scrollbar-none::-webkit-scrollbar { display: none; }
    .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
</main>


      {/* RENDER MASTER OVERLAY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-surface-container border-b border-white/5 px-8 py-6 flex justify-between items-center">
              <h3 className="font-display-hero text-[24px] uppercase tracking-tighter text-white">
                {isEditMode ? "Edit Product Details" : "Add New Product"}
              </h3>
              <button 
                onClick={handleCloseAndResetModal} 
                className="text-white/40 hover:text-white transition-colors text-2xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitProduct} className="p-8 space-y-6">
              {/* Product Info Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block font-label-caps text-[10px] tracking-[0.2em] text-white/60 uppercase mb-2">
                    Product Display Title
                  </label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 p-3 text-[13px] text-white focus:outline-none focus:border-antique-champagne" 
                  />
                </div>

                <div>
                  <label className="block font-label-caps text-[10px] tracking-[0.2em] text-white/60 uppercase mb-2">
                    Base Price (€)
                  </label>
                  <input 
                    required 
                    type="number" 
                    step="0.01" 
                    value={formData.price} 
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 p-3 text-[13px] text-white focus:outline-none focus:border-antique-champagne" 
                  />
                </div>

{/* Narrative Description Block — Cleaned & Restructured */}
<div className="flex flex-col gap-1.5 w-full">
  <label className="font-label-caps text-[10px] sm:text-[11px] tracking-[0.2em] text-white/50 uppercase font-semibold pl-0.5">
    Narrative Description
  </label>
  <textarea 
    required 
    rows="5" 
    value={formData.description} 
    onChange={(e) => setFormData({...formData, description: e.target.value})} 
    className="w-full bg-neutral-950/60 border border-white/10 hover:border-white/20 focus:border-antique-champagne p-3.5 text-[13px] text-white/90 focus:outline-none rounded-none transition-all duration-300 font-body-lg whitespace-pre-wrap resize-y min-h-[120px] tracking-wide leading-relaxed" 
    placeholder="Type craftsmanship details here...&#10;&#10;• Line breaks are preserved.&#10;• Indentations remain clean." 
  />
</div>



            {/* DYNAMIC SUBCATEGORY  ── */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  
  {/* Column 1: Parent Group Selection */}
  <div>
    <label className="block font-label-caps text-[10px] tracking-[0.2em] text-white/60 uppercase mb-2">
      Parent Material Group
    </label>
    <select 
      value={formData.parentCategory} 
      onChange={(e) => setFormData({...formData, parentCategory: e.target.value, subCategoryId: ''})}
      className="w-full bg-black/40 border border-white/10 p-3 text-[13px] text-white focus:outline-none focus:border-antique-champagne"
    >
      <option value="Artificial jewelry">Artificial jewelry</option>
      <option value="Silver Jewelry">Silver Jewelry</option>
      <option value="Leather Products">Leather Products</option>
    </select>
  </div>

  {/* Column 2: Dynamic Subcategory Operations Block */}
  <div className="flex flex-col justify-end">
    <div className="flex justify-between items-center mb-2">
      <label className="font-label-caps text-[10px] tracking-[0.2em] text-white/60 uppercase">
        Dynamic Sub-Collection
      </label>
      <button 
        type="button" 
        onClick={() => { setShowNewSubForm(!showNewSubForm); setNewSubData({ name: '', imageUrl: '' }); }} 
        className="text-antique-champagne text-[10px] font-semibold bg-transparent border-none cursor-pointer uppercase focus:outline-none"
      >
        {showNewSubForm ? "Cancel" : "+ Create New"}
      </button>
    </div>
    
    {!showNewSubForm ? (
      <select 
        value={formData.subCategoryId} 
        onChange={(e) => setFormData({...formData, subCategoryId: e.target.value})}
        className="w-full bg-black/40 border border-white/10 p-3 text-[13px] text-white focus:outline-none focus:border-antique-champagne"
      >
        <option value="">Standard Base Category Listing</option>
        {subCategories
          .filter(sub => sub.parent_category === formData.parentCategory)
          .map(sub => (
            <option key={sub.id} value={sub.id}>{sub.name}</option>
          ))}
      </select>
    ) : (
      /*  Subcategory Creator Panel */
      <div className="flex flex-col gap-2 border border-white/10 p-3 bg-black/20 animate-fadeIn w-full">
        <span className="font-label-caps text-[8px] text-antique-champagne/60 tracking-wider uppercase font-bold">
          New Category for: {formData.parentCategory}
        </span>
        
        <input 
          type="text" 
          placeholder="SUB-CATEGORY LABEL (e.g. OPAL RINGS)" 
          value={newSubData.name} 
          onChange={(e) => setNewSubData({...newSubData, name: e.target.value})}
          className="w-full bg-black/40 border border-white/10 p-2.5 text-[12px] text-white focus:outline-none focus:border-antique-champagne uppercase font-mono" 
        />

        {/* Binary Media  */}
        <div className="relative border border-dashed border-white/10 hover:border-antique-champagne/30 bg-black/30 p-2 text-center h-10 flex items-center justify-center transition-colors">
          <input 
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            disabled={isSubUploading}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setIsSubUploading(true);
              const dataStream = new FormData();
              dataStream.append('file', file);
              try {
                const res = await fetch('/api/upload', {
                  method: 'POST',
                  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'shomicore123'}` },
                  body: dataStream
                });
                const result = await res.json();
                if (result.success) {
                  setNewSubData(prev => ({ ...prev, imageUrl: result.url }));
                } else {
                  alert("Image cloud push rejected.");
                }
              } catch (err) {
                console.error("Subcategory image drop crash:", err);
              }
              setIsSubUploading(false);
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
          />
          <span className="font-label-caps text-[8px] tracking-widest text-white/50 uppercase">
            {isSubUploading ? "Streaming image..." : newSubData.imageUrl ? "✓ Image Attached successfully" : "+ Upload Subcategory Layout Banner (Optional)"}
          </span>
        </div>

        <button 
          type="button" 
          onClick={handleCreateSubCategory}
          disabled={isSubUploading}
          className="w-full py-2 bg-antique-champagne text-black font-label-caps text-[10px] tracking-widest font-bold uppercase transition-colors hover:bg-white disabled:bg-white/20 disabled:text-white/40 cursor-pointer border-none"
        >
          Save Subcategory
        </button>
      </div>
    )}
  </div>
</div>


                <div>
                  <label className="block font-label-caps text-[10px] tracking-[0.2em] text-white/60 uppercase mb-2">
                    Color Accents (Comma Separated)
                  </label>
                  <input 
                     
                    type="text" 
                    value={formData.colorsInput} 
                    onChange={(e) => setFormData({...formData, colorsInput: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 p-3 text-[13px] text-white focus:outline-none focus:border-antique-champagne" 
                    placeholder="Gold, Rose Quartz, Onyx" 
                  />
                </div>

{/* ── UPGRADED SHOMICORE DUAL-MEDIA MULTI-DEVICE MANAGEMENT LAYOUT ── */}
<div className="flex flex-col gap-6 w-full border-t border-white/5 pt-4">
  
  {/* TARGET A: MASTER CORE MAIN COVER IMAGE UPLOADER */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start bg-black/20 p-4 border border-white/5">
    <div className="md:col-span-2 flex flex-col gap-1.5">
      <label className="font-label-caps text-[10px] tracking-widest text-antique-champagne uppercase font-bold">
        Master Storefront Cover Asset (Required)
      </label>
      <span className="text-[9px] text-white/40 font-body-lg leading-normal uppercase">
        This serves as the primary preview thumbnail shown everywhere across home grids, store archive filters, and collection panels. Recommended: 900x1200px portrait ratio.
      </span>
      
      <div className="relative border border-dashed border-white/20 hover:border-antique-champagne/40 bg-black/30 p-4 text-center transition-colors mt-2 h-24 flex items-center justify-center">
        <input 
          type="file" 
          accept="image/png, image/jpeg, image/jpg, image/webp"
          disabled={isUploading}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setIsUploading(true);
            const streamData = new FormData();
            streamData.append('file', file);
            try {
              const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'shomicore123'}` },
                body: streamData
              });
              const result = await res.json();
              if (result.success) {
                setFormData(prev => ({ ...prev, mainImageInput: result.url }));
              }
            } catch (err) { console.error(err); }
            setIsUploading(false);
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
        />
        <span className="font-label-caps text-[9px] tracking-wider text-white uppercase">
          {isUploading ? "Streaming to Cloud..." : "+ Set Master Main Image"}
        </span>
      </div>
    </div>

    {/* Master Image View Slot Frame Preview */}
    <div className="w-full flex justify-center md:justify-end">
      <div className="relative aspect-[3/4] w-24 bg-neutral-900 border border-white/10 overflow-hidden flex-shrink-0 group">
        {formData.mainImageInput ? (
          <>
            <img src={formData.mainImageInput} alt="" className="w-full h-full object-cover animate-fadeIn" />
            <button 
              type="button" 
              onClick={() => setFormData(prev => ({ ...prev, mainImageInput: '' }))}
              className="absolute inset-0 bg-error/90 text-white font-label-caps text-[8px] tracking-widest opacity-0 group-hover:opacity-100 flex items-center justify-center uppercase font-bold border-none cursor-pointer"
            >
              Drop
            </button>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center text-white/10">
            <span className="material-symbols-outlined text-[16px] mb-1">image</span>
            <span className="font-label-caps text-[8px] tracking-widest uppercase">No Cover</span>
          </div>
        )}
      </div>
    </div>
  </div>

  {/* TARGET B: SECONDARY SPECIFICATION CAROUSEL SLIDES GALLERY */}
  <div className="flex flex-col gap-1.5 bg-black/10 p-4 border border-white/5">
    <label className="font-label-caps text-[10px] tracking-widest text-white/40 uppercase">
      Secondary Detail Slides Array ({formData.imagesInput ? formData.imagesInput.split(';').filter(Boolean).length : 0} of 5 Added)
    </label>
    <span className="text-[9px] text-white/30 font-body-lg uppercase tracking-wider mb-2 block">
      Optional close-ups displaying secondary design details inside product sliders.
    </span>

    <div className="relative border border-dashed border-white/10 hover:border-white/30 bg-black/20 p-5 text-center transition-colors">
      <input 
        type="file" 
        multiple 
        accept="image/png, image/jpeg, image/jpg, image/webp"
        disabled={isUploading}
        onChange={async (e) => {
          const files = Array.from(e.target.files || []);
          if (files.length === 0) return;
          const currentCount = formData.imagesInput ? formData.imagesInput.split(';').filter(Boolean).length : 0;
          if (currentCount + files.length > 5) return alert("Gallery limited to a maximum configuration of 5 secondary slides.");

          setIsUploading(true);
          const urls = [];
          for (const file of files) {
            const data = new FormData();
            data.append('file', file);
            try {
              const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'shomicore123'}` },
                body: data
              });
              const result = await res.json();
              if (result.success) urls.push(result.url);
            } catch (err) { console.error(err); }
          }
          if (urls.length > 0) {
            const chain = [...(formData.imagesInput ? formData.imagesInput.split(';') : []), ...urls].filter(Boolean).join(';');
            setFormData(prev => ({ ...prev, imagesInput: chain }));
          }
          setIsUploading(false);
        }}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
      />
      <span className="font-label-caps text-[9px] tracking-wider text-white/60 uppercase">
        {isUploading ? "Streaming Gallery..." : "+ Select Secondary Detail Slides"}
      </span>
    </div>

    {/* Secondary Thumbnails Preview Layout Strip */}
    {formData.imagesInput && (
      <div className="flex flex-wrap gap-2 mt-3 bg-black/40 p-2 border border-white/5 animate-fadeIn">
        {formData.imagesInput.split(';').filter(Boolean).map((url, idx) => (
          <div key={url} className="relative w-10 h-14 bg-neutral-900 border border-white/10 group overflow-hidden">
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => {
                const chain = formData.imagesInput.split(';').filter(Boolean).filter((_, i) => i !== idx).join(';');
                setFormData(prev => ({ ...prev, imagesInput: chain }));
              }}
              className="absolute inset-0 bg-error/90 text-white font-label-caps text-[7px] tracking-widest opacity-0 group-hover:opacity-100 flex items-center justify-center uppercase font-bold border-none cursor-pointer"
            >
              Drop
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
</div>


{/* Dynamic Sizing Interface Row */}
<div className="flex flex-col gap-2 border-t border-white/5 pt-4">
  <label className="font-label-caps text-[10px] tracking-widest text-antique-champagne uppercase font-bold">
    Dynamic Sizing Matrix ({formData.availableSizes.length} Selected)
  </label>
  
  {formData.parentCategory !== 'Silver Jewelry' ? (
    /* Standard Layout View for Leather and Artificial Pieces */
    <div className="flex flex-wrap gap-1.5 p-3 bg-black/30 border border-white/5">
      {['Small', 'Medium', 'Large', 'X-Large'].map(s => (
        <button type="button" key={s} onClick={() => handleSizeToggle(s)} className={`px-3 py-1 text-[10px] border font-label-caps tracking-wider transition-all ${formData.availableSizes.includes(s) ? 'bg-antique-champagne text-black border-antique-champagne font-bold' : 'border-white/10 text-white/40 hover:border-white/20'}`}>{s}</button>
      ))}
    </div>
  ) : (
    /* ⚡ THE COMPLETE CHART VIEW: Displays all countries grouped on a single row button */
    <div className="flex flex-col gap-1.5 p-3 bg-black/30 border border-white/5 max-h-[260px] overflow-y-auto scrollbar-none">
      <div className="grid grid-cols-5 text-[9px] font-label-caps text-white/30 tracking-wider text-center border-b border-white/5 pb-1 mb-1">
        <span>US / CAN</span>
        <span>UK</span>
        <span>FRANCE</span>
        <span>GERMANY</span>
        <span>DIAMETER</span>
      </div>
      
      {ringChartMatrix.map((row) => {
        const isSelected = formData.availableSizes.includes(row.us);
        return (
          <button
            type="button"
            key={row.us}
            onClick={() => handleSizeToggle(row.us)}
            className={`grid grid-cols-5 items-center py-2 text-center font-mono text-[11px] border transition-all cursor-pointer ${
              isSelected 
                ? 'bg-antique-champagne/10 text-antique-champagne border-antique-champagne font-bold' 
                : 'border-white/5 text-white/30 hover:border-white/20'
            }`}
          >
            <span>{row.us}</span>
            <span>{row.uk}</span>
            <span>{row.fr}</span>
            <span>{row.de}</span>
            <span className="text-[10px] opacity-80">{row.mm}</span>
          </button>
        );
      })}
    </div>
  )}
</div>


                <div className="flex items-center gap-3 pt-2">
                  <input 
                    type="checkbox" 
                    id="modalFeatured" 
                    checked={formData.isFeatured} 
                    onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} 
                    className="accent-antique-champagne w-4 h-4 cursor-pointer" 
                  />
                  <label htmlFor="modalFeatured" className="font-label-caps text-[10px] tracking-[0.2em] text-white/60 uppercase cursor-pointer">
                    Expose on homepage highlights
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-white/5">
                <button 
                  type="button" 
                  onClick={handleCloseAndResetModal} 
                  className="flex-1 px-6 py-3 border border-white/20 text-white font-nav-link text-[10px] tracking-widest uppercase hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-6 py-3 bg-antique-champagne text-black font-nav-link text-[10px] tracking-widest uppercase hover:bg-antique-champagne/80 transition-colors"
                >
                  Save This Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
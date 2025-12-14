'use client';

import { useState, useEffect } from 'react';
import { MdAdd, MdSearch, MdExpandMore } from 'react-icons/md';
import InventoryTable, { Product } from '@/components/InventoryTable';
import AddProductModal from '@/components/AddProductModal';
import { fetchProducts, deleteProduct } from '@/utils/api';

export default function InventoryPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [stockStatusFilter, setStockStatusFilter] = useState('');

    const loadProducts = async () => {
        const data = await fetchProducts();
        setProducts(data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
            loadProducts();
        }
    };

    const handleEdit = (product: Product) => {
        // TODO: Implement edit functionality
        console.log('Edit product:', product);
        alert('Edit functionality coming soon!');
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = categoryFilter ? product.category === categoryFilter : true;

        let matchesStock = true;
        if (stockStatusFilter === 'instock') matchesStock = product.stockQuantity > 10;
        if (stockStatusFilter === 'lowstock') matchesStock = product.stockQuantity > 0 && product.stockQuantity <= 10;
        if (stockStatusFilter === 'outstock') matchesStock = product.stockQuantity === 0;

        return matchesSearch && matchesCategory && matchesStock;
    });

    return (
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto">
                <div className="layout-container max-w-full mx-auto p-4 flex flex-col gap-4">
                    {/* Page Heading */}
                    <div className="flex flex-wrap items-end justify-between gap-3">
                        <div className="flex flex-col gap-0.5">
                            <h2 className="text-2xl font-black tracking-tight text-slate-900">Inventory</h2>
                            <p className="text-slate-500 text-xs">Manage your printing supplies, paper stock, and ink levels.</p>
                        </div>
                        <button
                            className="flex items-center justify-center gap-1.5 rounded-lg h-9 px-3 bg-primary hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <MdAdd className="text-base" />
                            <span>Add Product</span>
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="bg-surface-light p-3 rounded-lg shadow-sm border border-slate-200">
                        <div className="flex flex-col md:flex-row gap-3">
                            <label className="flex flex-col flex-1 min-w-[200px]">
                                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Search</span>
                                <div className="relative group">
                                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                                        <MdSearch className="text-[16px]" />
                                    </span>
                                    <input
                                        className="w-full pl-8 pr-3 py-1.5 bg-background-light border border-slate-200 rounded text-xs text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 h-8"
                                        placeholder="Search by product name, SKU..."
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </label>
                            <label className="flex flex-col w-full md:w-56">
                                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Category</span>
                                <div className="relative">
                                    <select
                                        className="w-full pl-3 pr-8 py-1.5 bg-background-light border border-slate-200 rounded text-xs text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none transition-all cursor-pointer h-8"
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                    >
                                        <option value="">All Categories</option>
                                        <option value="Paper">Paper Stock</option>
                                        <option value="Ink">Ink & Toner</option>
                                        <option value="Binding">Binding Supplies</option>
                                        <option value="Lamination">Lamination</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                        <MdExpandMore className="text-[16px]" />
                                    </span>
                                </div>
                            </label>
                            <label className="flex flex-col w-full md:w-40">
                                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Stock Status</span>
                                <div className="relative">
                                    <select
                                        className="w-full pl-3 pr-8 py-1.5 bg-background-light border border-slate-200 rounded text-xs text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none transition-all cursor-pointer h-8"
                                        value={stockStatusFilter}
                                        onChange={(e) => setStockStatusFilter(e.target.value)}
                                    >
                                        <option value="">Any Status</option>
                                        <option value="instock">In Stock</option>
                                        <option value="lowstock">Low Stock</option>
                                        <option value="outstock">Out of Stock</option>
                                    </select>
                                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                        <MdExpandMore className="text-[16px]" />
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Table Section */}
                    <InventoryTable
                        products={filteredProducts}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                </div>
            </div>

            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onProductAdded={loadProducts}
            />
        </main>
    );
}

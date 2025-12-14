'use client';

import { useState, useEffect } from 'react';
import { MdAdd, MdSearch, MdExpandMore } from 'react-icons/md';
import InventoryTable, { Product } from '@/components/InventoryTable';
import AddProductModal from '@/components/AddProductModal';
import { fetchProducts } from '@/utils/api';

export default function InventoryPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadProducts = async () => {
        const data = await fetchProducts();
        setProducts(data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto">
                <div className="layout-container max-w-[1200px] mx-auto px-6 py-8 flex flex-col gap-8">
                    {/* Page Heading */}
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-3xl font-black tracking-tight text-slate-900">Inventory</h2>
                            <p className="text-slate-500 text-base">Manage your printing supplies, paper stock, and ink levels.</p>
                        </div>
                        <button
                            className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-primary hover:bg-blue-700 text-white text-sm font-bold shadow-sm transition-colors cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <MdAdd className="text-lg" />
                            <span>Add Product</span>
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="bg-surface-light p-4 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex flex-col md:flex-row gap-4">
                            <label className="flex flex-col flex-1 min-w-[200px]">
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Search</span>
                                <div className="relative group">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                        <MdSearch className="text-[20px]" />
                                    </span>
                                    <input
                                        className="w-full pl-10 pr-4 py-2.5 bg-background-light border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                                        placeholder="Search by product name, SKU..."
                                        type="text"
                                    />
                                </div>
                            </label>
                            <label className="flex flex-col w-full md:w-64">
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Category</span>
                                <div className="relative">
                                    <select className="w-full pl-4 pr-10 py-2.5 bg-background-light border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none transition-all cursor-pointer">
                                        <option value="">All Categories</option>
                                        <option value="paper">Paper Stock</option>
                                        <option value="ink">Ink & Toner</option>
                                        <option value="binding">Binding Supplies</option>
                                        <option value="lamination">Lamination</option>
                                    </select>
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                        <MdExpandMore className="text-[20px]" />
                                    </span>
                                </div>
                            </label>
                            <label className="flex flex-col w-full md:w-48">
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Stock Status</span>
                                <div className="relative">
                                    <select className="w-full pl-4 pr-10 py-2.5 bg-background-light border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none transition-all cursor-pointer">
                                        <option value="">Any Status</option>
                                        <option value="instock">In Stock</option>
                                        <option value="lowstock">Low Stock</option>
                                        <option value="outstock">Out of Stock</option>
                                    </select>
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                        <MdExpandMore className="text-[20px]" />
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Table Section */}
                    <InventoryTable products={products} />
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

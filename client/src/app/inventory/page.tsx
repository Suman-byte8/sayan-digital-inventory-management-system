'use client';
import { useState, useEffect } from 'react';
import { Product } from '@/components/InventoryTable';
import InventoryTable from '@/components/InventoryTable';
import AddProductModal from '@/components/AddProductModal';
import EditProductModal from '@/components/EditProductModal';
import CategoryManagerModal from '@/components/CategoryManagerModal';
import { fetchProducts, deleteProduct, fetchCategories, Category } from '@/utils/api';

export default function InventoryPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [stockStatusFilter, setStockStatusFilter] = useState('');

    const loadProducts = async () => {
        const fetchedProducts = await fetchProducts();
        setProducts(Array.isArray(fetchedProducts) ? fetchedProducts : []);
    };

    const loadCategories = async () => {
        const fetchedCategories = await fetchCategories();
        setCategories(Array.isArray(fetchedCategories) ? fetchedCategories : []);
    };

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

    const handleAddProduct = () => {
        setIsAddModalOpen(true);
    };

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleDeleteProduct = async (productId: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(productId);
            setProducts(products.filter(p => p._id !== productId));
        }
    };

    const filteredProducts = products.filter(product => {
        return (
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (categoryFilter ? product.category === categoryFilter : true) &&
            (stockStatusFilter ? (stockStatusFilter === 'in-stock' ? product.inStock : !product.inStock) : true)
        );
    });

    return (
        <div className="flex flex-col h-screen w-full mx-auto">
            <header className="bg-white shadow-sm z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsCategoryModalOpen(true)}
                                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                                Manage Categories
                            </button>
                            <button
                                onClick={handleAddProduct}
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                                Add Product
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-1/3 p-2 border border-gray-300 rounded-md"
                            />
                            <div className="flex gap-4">
                                <select
                                    value={categoryFilter}
                                    onChange={e => setCategoryFilter(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={stockStatusFilter}
                                    onChange={e => setStockStatusFilter(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="in-stock">In Stock</option>
                                    <option value="out-of-stock">Out of Stock</option>
                                </select>
                            </div>
                        </div>
                        <InventoryTable
                            products={filteredProducts}
                            onEdit={handleEditProduct}
                            onDelete={handleDeleteProduct}
                        />
                    </div>
                </div>
            </main>
            <AddProductModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onProductAdded={() => {
                    setIsAddModalOpen(false);
                    loadProducts();
                }}
            />
            <EditProductModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onProductUpdated={() => {
                    setIsEditModalOpen(false);
                    loadProducts();
                }}
                product={selectedProduct}
            />
            <CategoryManagerModal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                onCategoriesUpdated={loadCategories}
            />
        </div>
    );
}

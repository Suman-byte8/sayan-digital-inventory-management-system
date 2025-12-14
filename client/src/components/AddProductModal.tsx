'use client';

import { useState } from 'react';
import { MdClose, MdExpandMore } from 'react-icons/md';
import { createProduct } from '@/utils/api';

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProductAdded: () => void;
}

const AddProductModal = ({ isOpen, onClose, onProductAdded }: AddProductModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        buyingPrice: '',
        sellingPrice: '',
        inStock: true,
    });

    const [imageFile, setImageFile] = useState<File | null>(null);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleToggle = () => {
        setFormData(prev => ({ ...prev, inStock: !prev.inStock }));
    };

    const handleSubmit = async () => {
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('category', formData.category);
            data.append('description', formData.description);
            data.append('buyingPrice', formData.buyingPrice);
            data.append('sellingPrice', formData.sellingPrice);
            data.append('inStock', String(formData.inStock));

            if (imageFile) {
                data.append('image', imageFile);
            }

            await createProduct(data);
            onProductAdded();
            onClose();
        } catch (error) {
            console.error('Failed to add product', error);
            // Handle error (e.g., show toast)
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop / Overlay */}
            <div
                aria-hidden="true"
                className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div className="relative w-full max-w-lg transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all border border-gray-100 max-h-[90vh] flex flex-col">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 bg-gray-50">
                    <h3 className="text-xl font-bold leading-6 text-slate-900">Add New Product</h3>
                    <button
                        className="rounded-md bg-transparent p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                        type="button"
                        onClick={onClose}
                    >
                        <span className="sr-only">Close</span>
                        <MdClose className="text-2xl" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="px-5 py-4 space-y-4 overflow-y-auto flex-1">
                    {/* Product Name */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="product-name">Product Name</label>
                        <div className="relative rounded-lg shadow-sm">
                            <input
                                autoFocus
                                className="block w-full rounded-lg border-0 py-2.5 pl-4 pr-10 text-slate-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                id="product-name"
                                name="name"
                                placeholder="e.g., Glossy A4 Flyer"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="product-image">Product Image</label>
                        <input
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                            id="product-image"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="category">Category</label>
                        <div className="relative">
                            <select
                                className="block w-full rounded-lg border-0 py-2.5 pl-4 pr-10 text-slate-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 appearance-none"
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option disabled value="">Select a category</option>
                                <option value="business-cards">Business Cards</option>
                                <option value="flyers">Flyers & Brochures</option>
                                <option value="banners">Banners & Signage</option>
                                <option value="stationery">Stationery</option>
                            </select>
                            {/* Custom Arrow Icon */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <MdExpandMore className="text-gray-500" />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="description">Description</label>
                        <textarea
                            className="block w-full rounded-lg border-0 py-2.5 text-slate-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 resize-none"
                            id="description"
                            name="description"
                            placeholder="Enter product specifications, paper weight, etc."
                            rows={3}
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    {/* Pricing Row */}
                    <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                        {/* Actual Price */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="actual-price">Actual Cost</label>
                            <div className="relative rounded-lg shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                    className="block w-full rounded-lg border-0 py-2.5 pl-7 pr-4 text-slate-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    id="actual-price"
                                    name="buyingPrice"
                                    placeholder="0.00"
                                    type="text"
                                    value={formData.buyingPrice}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {/* Selling Price */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="selling-price">Selling Price</label>
                            <div className="relative rounded-lg shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                    className="block w-full rounded-lg border-0 py-2.5 pl-7 pr-4 text-slate-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    id="selling-price"
                                    name="sellingPrice"
                                    placeholder="0.00"
                                    type="text"
                                    value={formData.sellingPrice}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Stock Toggle */}
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium leading-6 text-slate-900">In Stock</span>
                            <span className="text-xs text-gray-500">Available for immediate orders</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                checked={formData.inStock}
                                className="sr-only peer"
                                type="checkbox"
                                onChange={handleToggle}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 px-5 py-4 bg-gray-50 border-t border-gray-200">
                    <button
                        className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                        type="button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm transition-colors"
                        type="button"
                        onClick={handleSubmit}
                    >
                        Save Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;

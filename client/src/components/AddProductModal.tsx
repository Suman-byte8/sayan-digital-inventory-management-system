'use client';

import { useState, useEffect, useRef } from 'react';
import { MdClose, MdExpandMore, MdCloudUpload, MdDelete } from 'react-icons/md';
import { createProduct, fetchCategories, Category } from '@/utils/api';

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
        quantity: '0',
        inStock: true,
    });

    const [categories, setCategories] = useState<Category[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            const getCategories = async () => {
                try {
                    const fetchedCategories = await fetchCategories();
                    // Ensure it's always an array
                    setCategories(Array.isArray(fetchedCategories) ? fetchedCategories : []);
                } catch (error) {
                    console.error('Failed to fetch categories', error);
                    setCategories([]);
                }
            };
            getCategories();
        } else {
            // Reset state when modal closes
            setFormData({
                name: '',
                category: '',
                description: '',
                buyingPrice: '',
                sellingPrice: '',
                quantity: '0',
                inStock: true,
            });
            setImageFile(null);
            setImagePreview(null);
            setIsDragging(false);
        }
    }, [isOpen]);

    // Clean up object URL to avoid memory leaks
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFile = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        if (e.clipboardData.files && e.clipboardData.files[0]) {
            handleFile(e.clipboardData.files[0]);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
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
            data.append('quantity', formData.quantity);
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onPaste={handlePaste}>
            {/* Modal Backdrop / Overlay */}
            <div
                aria-hidden="true"
                className="fixed inset-0 backdrop-blur-sm transition-opacity"
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

                    {/* Image Upload (Drag & Drop) */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium leading-6 text-slate-900">Product Image</label>

                        {!imagePreview ? (
                            <div
                                className={`mt-1 flex justify-center rounded-lg border border-dashed px-6 py-10 transition-colors cursor-pointer ${isDragging
                                    ? 'border-primary bg-primary/5'
                                    : 'border-gray-300 hover:bg-gray-50'
                                    }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className="text-center">
                                    <MdCloudUpload className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                        <span className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-dark">
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                ref={fileInputRef}
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </span>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    <p className="text-xs leading-5 text-gray-400 mt-1">Or paste (Ctrl+V) directly</p>
                                </div>
                            </div>
                        ) : (
                            <div className="relative mt-2 rounded-lg border border-gray-200 overflow-hidden group">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-48 object-contain bg-gray-50"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="p-2 bg-white rounded-full text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                                        title="Remove image"
                                    >
                                        <MdDelete className="text-xl" />
                                    </button>
                                </div>
                            </div>
                        )}
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
                                {categories.map((category) => (
                                    <option key={category._id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
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

                    {/* Stock Quantity */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="quantity">Stock Quantity</label>
                        <div className="relative rounded-lg shadow-sm">
                            <input
                                className="block w-full rounded-lg border-0 py-2.5 pl-4 pr-10 text-slate-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                id="quantity"
                                name="quantity"
                                placeholder="0"
                                type="number"
                                min="0"
                                value={formData.quantity}
                                onChange={handleChange}
                            />
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

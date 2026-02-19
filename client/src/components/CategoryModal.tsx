'use client';

import { useState, useEffect } from 'react';
import { MdClose, MdAdd, MdEdit, MdDelete, MdCategory } from 'react-icons/md';
import { fetchCategories, createCategory, updateCategory, deleteCategory, Category } from '@/utils/api';

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCategoryCreated?: () => void;
}

export default function CategoryModal({ isOpen, onClose, onCategoryCreated }: CategoryModalProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            loadCategories();
        }
    }, [isOpen]);

    const loadCategories = async () => {
        const data = await fetchCategories();
        setCategories(data.filter((c: Category) => c.isActive));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        try {
            if (editingId) {
                await updateCategory(editingId, { name, description });
            } else {
                await createCategory({ name, description });
            }
            setName('');
            setDescription('');
            setEditingId(null);
            await loadCategories();
            if (onCategoryCreated) onCategoryCreated();
        } catch (error: any) {
            alert(error.response?.data?.error || 'Failed to save category');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (category: Category) => {
        setName(category.name);
        setDescription(category.description || '');
        setEditingId(category._id);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category?')) return;

        try {
            await deleteCategory(id);
            await loadCategories();
            if (onCategoryCreated) onCategoryCreated();
        } catch (error) {
            alert('Failed to delete category');
        }
    };

    const handleCancel = () => {
        setName('');
        setDescription('');
        setEditingId(null);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-3">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
                {/* Header */}
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Manage Categories</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Create and organize product categories</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <MdClose className="text-[20px]" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 overflow-y-auto flex-1">
                    {/* Add/Edit Form */}
                    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            {editingId ? <MdEdit className="text-[16px]" /> : <MdAdd className="text-[16px]" />}
                            {editingId ? 'Edit Category' : 'Add New Category'}
                        </h4>

                        <div className="grid grid-cols-1 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Category Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 h-9 rounded-lg border-slate-200 bg-white text-sm focus:border-primary focus:ring-primary/20 transition-all"
                                    placeholder="e.g. Electronics"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border-slate-200 bg-white text-sm focus:border-primary focus:ring-primary/20 transition-all"
                                    placeholder="Optional description..."
                                    rows={2}
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 mt-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-primary hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Saving...' : editingId ? 'Update' : 'Add Category'}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Categories List */}
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <MdCategory className="text-[16px]" />
                            Existing Categories ({categories.length})
                        </h4>

                        {categories.length === 0 ? (
                            <p className="text-sm text-slate-500 text-center py-8">No categories yet. Create one above!</p>
                        ) : (
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <div
                                        key={category._id}
                                        className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-shadow"
                                    >
                                        <div className="flex-1">
                                            <h5 className="font-semibold text-sm text-slate-900">{category.name}</h5>
                                            {category.description && (
                                                <p className="text-xs text-slate-500 mt-0.5">{category.description}</p>
                                            )}

                                        </div>

                                        <div className="flex gap-1 ml-3">
                                            <button
                                                onClick={() => handleEdit(category)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                title="Edit"
                                            >
                                                <MdEdit className="text-[16px]" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                title="Delete"
                                            >
                                                <MdDelete className="text-[16px]" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

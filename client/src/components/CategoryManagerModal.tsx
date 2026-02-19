import React, { useState, useEffect } from 'react';
import { MdClose, MdAdd, MdEdit, MdDelete, MdSave, MdCancel } from 'react-icons/md';
import { Category, fetchCategories, createCategory, updateCategory, deleteCategory } from '@/utils/api';

interface CategoryManagerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCategoriesUpdated: () => void;
}

export default function CategoryManagerModal({ isOpen, onClose, onCategoriesUpdated }: CategoryManagerModalProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editCategoryName, setEditCategoryName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            loadCategories();
        }
    }, [isOpen]);

    const loadCategories = async () => {
        setIsLoading(true);
        try {
            const data = await fetchCategories();
            setCategories(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Failed to load categories');
            setCategories([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;
        try {
            await createCategory({ name: newCategoryName });
            setNewCategoryName('');
            loadCategories();
            onCategoriesUpdated();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to add category');
        }
    };

    const handleStartEdit = (category: Category) => {
        setEditingId(category._id);
        setEditCategoryName(category.name);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditCategoryName('');
    };

    const handleSaveEdit = async (id: string) => {
        if (!editCategoryName.trim()) return;
        try {
            await updateCategory(id, { name: editCategoryName });
            setEditingId(null);
            loadCategories();
            onCategoriesUpdated();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to update category');
        }
    };

    const handleDeleteCategory = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;
        try {
            await deleteCategory(id);
            loadCategories();
            onCategoriesUpdated();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to delete category');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="fixed inset-0 backdrop-blur-[2px] transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            ></div>

            <div className="relative w-full max-w-lg bg-white rounded-lg shadow-xl overflow-hidden transform transition-all flex flex-col max-h-[90vh]">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex-1 overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Manage Categories</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                            <MdClose className="h-6 w-6" />
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-2 bg-red-50 text-red-500 text-sm rounded border border-red-200">
                            {error}
                        </div>
                    )}

                    {/* Add New Category */}
                    <div className="flex gap-2 mb-6">
                        <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="New category name"
                            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        />
                        <button
                            onClick={handleAddCategory}
                            disabled={!newCategoryName.trim()}
                            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark disabled:opacity-50 flex items-center gap-1"
                        >
                            <MdAdd /> Add
                        </button>
                    </div>

                    {/* Category List */}
                    <div className="max-h-60 overflow-y-auto border rounded-md divide-y divide-gray-200">
                        {isLoading ? (
                            <div className="p-4 text-center text-gray-500">Loading...</div>
                        ) : categories.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">No categories found</div>
                        ) : (
                            categories.map((category) => (
                                <div key={category._id} className="p-3 flex items-center justify-between hover:bg-gray-50">
                                    {editingId === category._id ? (
                                        <div className="flex-1 flex gap-2 items-center">
                                            <input
                                                type="text"
                                                value={editCategoryName}
                                                onChange={(e) => setEditCategoryName(e.target.value)}
                                                className="flex-1 p-1 border border-gray-300 rounded text-sm"
                                                autoFocus
                                            />
                                            <button onClick={() => handleSaveEdit(category._id)} className="text-green-600 hover:text-green-700">
                                                <MdSave className="text-xl" />
                                            </button>
                                            <button onClick={handleCancelEdit} className="text-gray-500 hover:text-gray-600">
                                                <MdCancel className="text-xl" />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="text-gray-700 font-medium">{category.name}</span>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleStartEdit(category)} className="text-blue-600 hover:text-blue-700 p-1">
                                                    <MdEdit className="text-lg" />
                                                </button>
                                                <button onClick={() => handleDeleteCategory(category._id)} className="text-red-600 hover:text-red-700 p-1">
                                                    <MdDelete className="text-lg" />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

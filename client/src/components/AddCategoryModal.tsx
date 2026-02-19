
'use client';

import { useState } from 'react';
import { MdClose } from 'react-icons/md';

const AddCategoryModal = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        // TODO: Implement API call to create a new category
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                aria-hidden="true"
                className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
            ></div>

            <div className="relative w-full max-w-lg transform rounded-xl bg-white text-left shadow-2xl transition-all border border-gray-100 max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 bg-gray-50">
                    <h3 className="text-xl font-bold leading-6 text-slate-900">Add New Category</h3>
                    <button
                        className="rounded-md bg-transparent p-1 text-gray-400 hover:text-gray-500 focus:outline-none"
                        type="button"
                    >
                        <span className="sr-only">Close</span>
                        <MdClose className="text-2xl" />
                    </button>
                </div>

                <div className="px-5 py-4 space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="category-name">Category Name</label>
                        <input
                            autoFocus
                            className="block w-full rounded-lg border-0 py-2.5 pl-4 pr-10 text-slate-900 ring-1 ring-inset ring-gray-300"
                            id="category-name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium leading-6 text-slate-900" htmlFor="category-description">Description</label>
                        <textarea
                            className="block w-full rounded-lg border-0 py-2.5 text-slate-900 ring-1 ring-inset ring-gray-300"
                            id="category-description"
                            name="description"
                            rows={3}
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 px-5 py-4 bg-gray-50 border-t border-gray-200">
                    <button
                        className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-gray-300 rounded-lg"
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        className="px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg"
                        type="button"
                        onClick={handleSubmit}
                    >
                        Add Category
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCategoryModal;

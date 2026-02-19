'use client';

import { useState, useEffect } from 'react';
import { MdAdd, MdSearch, MdEdit, MdDelete, MdPerson, MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { fetchSuppliers, deleteSupplier } from '@/utils/api';
import AddSupplierModal from '@/components/AddSupplierModal';

export default function SuppliersPage() {
    const [suppliers, setSuppliers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState<any>(null);

    const loadSuppliers = async () => {
        setLoading(true);
        try {
            const data = await fetchSuppliers();
            setSuppliers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to load suppliers', error);
            setSuppliers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSuppliers();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this supplier?')) {
            try {
                await deleteSupplier(id);
                loadSuppliers();
            } catch (error) {
                console.error('Failed to delete supplier', error);
            }
        }
    };

    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50">
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-full mx-auto px-4 pt-6 pb-3 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
                            <p className="text-sm text-gray-500">Manage your product suppliers</p>
                        </div>
                        <button
                            onClick={() => {
                                setEditingSupplier(null);
                                setIsModalOpen(true);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm font-medium"
                        >
                            <MdAdd size={20} />
                            Add Supplier
                        </button>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-gray-200 bg-gray-50/50">
                            <div className="relative max-w-md">
                                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search suppliers..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider">Contact Person</th>
                                        <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider">Contact Info</th>
                                        <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider">Address</th>
                                        <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                                Loading suppliers...
                                            </td>
                                        </tr>
                                    ) : filteredSuppliers.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                                No suppliers found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredSuppliers.map((supplier) => (
                                            <tr key={supplier._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-900">{supplier.name}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <MdPerson className="text-gray-400" />
                                                        {supplier.contactPerson || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1 text-xs text-gray-500">
                                                        {supplier.email && (
                                                            <div className="flex items-center gap-1">
                                                                <MdEmail className="text-gray-400" /> {supplier.email}
                                                            </div>
                                                        )}
                                                        {supplier.phone && (
                                                            <div className="flex items-center gap-1">
                                                                <MdPhone className="text-gray-400" /> {supplier.phone}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-500 truncate max-w-xs">
                                                    {supplier.address || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setEditingSupplier(supplier);
                                                                setIsModalOpen(true);
                                                            }}
                                                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        >
                                                            <MdEdit size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(supplier._id)}
                                                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            <MdDelete size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <AddSupplierModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSupplierAdded={loadSuppliers}
                editingSupplier={editingSupplier}
            />
        </main>
    );
}

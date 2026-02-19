'use client';

import { useState, useEffect } from 'react';
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer as apiDeleteCustomer } from '@/utils/api';
import {
    MdChevronRight,
    MdAdd,
    MdSearch,
    MdFilterList,
    MdSort,
    MdMoreVert,
    MdClose,
    MdPerson,
    MdCall,
    MdEmail,
    MdBusiness,
    MdLocationOn,
    MdSave,
    MdChat,
    MdDelete,
    MdEdit
} from 'react-icons/md';
import CustomerLink from '@/components/CustomerLink';
import AddCustomerModal from '@/components/AddCustomerModal';

interface Customer {
    id: string;
    name: string;
    initials: string;
    initialsColor: string;
    company: string;
    email: string;
    phone: string;
    address: string;
    lastOrder: string;
    totalDue: number;
    status: 'Active' | 'Inactive';
}

export default function CustomersPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingCustomerId, setEditingCustomerId] = useState<string | null>(null);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');

    const [editingCustomer, setEditingCustomer] = useState<any>(null);

    const loadCustomers = async () => {
        const data = await fetchCustomers();
        const customerArray = Array.isArray(data) ? data : [];
        const mappedCustomers = customerArray.map((c: any) => ({
            id: c._id,
            name: c.name,
            initials: c.name.substring(0, 2).toUpperCase(),
            initialsColor: 'text-blue-600 bg-blue-100',
            company: c.company || 'N/A',
            email: c.email,
            phone: c.phone,
            address: c.address || '',
            lastOrder: 'N/A',
            totalDue: 0,
            status: c.status || 'Active'
        }));
        setCustomers(mappedCustomers);
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    const handleSaveCustomer = async (savedCustomer: any) => {
        await loadCustomers();
        handleCloseModal();
    };

    const handleEditClick = (customer: Customer) => {
        setEditingCustomer(customer);
        setIsEditMode(true);
        setIsModalOpen(true);
        setActiveDropdown(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        setEditingCustomer(null);
    };

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const handleDeleteCustomer = async (id: string) => {
        if (confirm('Are you sure you want to delete this customer?')) {
            try {
                await apiDeleteCustomer(id);
                setCustomers(customers.filter(c => c.id !== id));
                setActiveDropdown(null);
            } catch (error) {
                alert('Error deleting customer');
            }
        }
    };

    const toggleDropdown = (id: string) => {
        if (activeDropdown === id) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(id);
        }
    };

    const filteredCustomers = customers.filter(customer => {
        const matchesSearch =
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.includes(searchTerm);

        const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-full mx-auto px-4 pt-6 pb-3 flex flex-col gap-4">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-slate-500 text-xs">
                        <a href="/" className="hover:text-primary transition-colors">Dashboard</a>
                        <MdChevronRight className="text-[14px]" />
                        <span className="text-slate-900 font-medium">Customers</span>
                    </nav>

                    {/* Page Heading */}
                    <div className="flex flex-wrap items-end justify-between gap-3">
                        <div className="flex flex-col gap-0.5">
                            <h2 className="text-2xl font-black tracking-tight text-slate-900">Customers</h2>
                            <p className="text-slate-500 text-xs">Manage your client relationships and history.</p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center justify-center gap-1.5 rounded-lg h-9 px-4 bg-primary hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
                        >
                            <MdAdd className="text-[16px]" />
                            <span>Add New Customer</span>
                        </button>
                    </div>

                    {/* Search & Filters */}
                    <div className="flex flex-col md:flex-row gap-3 py-3 items-center justify-between">
                        <div className="relative w-full md:max-w-md group">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                <MdSearch className="text-[18px]" />
                            </span>
                            <input
                                className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 shadow-sm"
                                placeholder="Search customers by name, email, or company..."
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as any)}
                                className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 text-xs font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm outline-none"
                            >
                                <option value="All">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                            <button className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 text-xs font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                                <MdSort className="text-[16px]" />
                                <span>Sort</span>
                            </button>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="p-3 w-10">
                                            <input className="rounded border-gray-300 text-primary focus:ring-primary bg-white h-3.5 w-3.5" type="checkbox" />
                                        </th>
                                        <th className="p-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Customer Name</th>
                                        <th className="p-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                                        <th className="p-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Contact Info</th>
                                        <th className="p-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Last Order</th>
                                        <th className="p-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider text-right">Total Due</th>
                                        <th className="p-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider text-center">Status</th>
                                        <th className="p-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {filteredCustomers.map((customer) => (
                                        <tr key={customer.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="p-3">
                                                <input className="rounded border-gray-300 text-primary focus:ring-primary bg-white h-3.5 w-3.5" type="checkbox" />
                                            </td>

                                            <td className="p-3">
                                                <div className="flex items-center gap-2">
                                                    <div className={`size-7 rounded-full flex items-center justify-center text-[10px] font-bold ${customer.initialsColor}`}>{customer.initials}</div>
                                                    <CustomerLink name={customer.name} customerId={customer.id} className="text-xs font-medium text-slate-900" />
                                                </div>
                                            </td>
                                            <td className="p-3 text-xs text-slate-600">{customer.company}</td>
                                            <td className="p-3">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-slate-900">{customer.email}</span>
                                                    <span className="text-[10px] text-slate-500">{customer.phone}</span>
                                                </div>
                                            </td>
                                            <td className="p-3 text-xs text-slate-500">{customer.lastOrder}</td>
                                            <td className="p-3 text-xs font-semibold text-slate-900 text-right">${customer.totalDue.toFixed(2)}</td>
                                            <td className="p-3 text-center">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${customer.status === 'Active'
                                                    ? 'bg-green-100 text-green-700 border-green-200'
                                                    : 'bg-slate-100 text-slate-700 border-slate-200'
                                                    }`}>
                                                    {customer.status}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right relative">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        className="flex items-center gap-1 px-2.5 py-1 rounded border border-slate-200 bg-white text-[10px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                                                        onClick={() => alert(`Reminder sent to ${customer.name}`)}
                                                    >
                                                        <MdChat className="text-[14px]" />
                                                        Reminder
                                                    </button>
                                                    <div className="relative">
                                                        <button
                                                            className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition-colors"
                                                            onClick={() => toggleDropdown(customer.id)}
                                                        >
                                                            <MdMoreVert className="text-[18px]" />
                                                        </button>
                                                        {activeDropdown === customer.id && (
                                                            <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-slate-100 z-10 py-1 animate-in fade-in zoom-in-95 duration-100">
                                                                <button
                                                                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                                                                    onClick={() => handleEditClick(customer)}
                                                                >
                                                                    <MdEdit className="text-[14px]" />
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                                    onClick={() => handleDeleteCustomer(customer.id)}
                                                                >
                                                                    <MdDelete className="text-[14px]" />
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between bg-white">
                            <p className="text-[10px] text-slate-500">Showing <span className="font-medium text-slate-900">{filteredCustomers.length}</span> customers</p>
                            <div className="flex items-center gap-1.5">
                                <button className="px-3 py-1.5 rounded border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50">Previous</button>
                                <button className="px-3 py-1.5 rounded border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:bg-slate-50">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add/Edit Customer Modal */}
            <AddCustomerModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSuccess={handleSaveCustomer}
                editCustomer={editingCustomer}
            />
        </main>
    );
}

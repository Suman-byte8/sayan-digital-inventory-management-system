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

    const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
        name: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        status: 'Active',
        initials: '',
        initialsColor: 'text-blue-600 bg-blue-100',
        lastOrder: 'N/A',
        totalDue: 0
    });

    const loadCustomers = async () => {
        const data = await fetchCustomers();
        const mappedCustomers = data.map((c: any) => ({
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

    const handleSaveCustomer = async () => {
        if (!newCustomer.name || !newCustomer.email) {
            alert('Please fill in at least Name and Email');
            return;
        }

        try {
            if (isEditMode && editingCustomerId) {
                await updateCustomer(editingCustomerId, {
                    name: newCustomer.name,
                    email: newCustomer.email,
                    phone: newCustomer.phone,
                    address: newCustomer.address,
                    company: newCustomer.company,
                    status: newCustomer.status
                });
            } else {
                await createCustomer({
                    name: newCustomer.name,
                    email: newCustomer.email,
                    phone: newCustomer.phone,
                    address: newCustomer.address,
                    company: newCustomer.company,
                    status: newCustomer.status
                });
            }

            await loadCustomers();
            handleCloseModal();
        } catch (error) {
            alert(`Error ${isEditMode ? 'updating' : 'creating'} customer`);
        }
    };

    const handleEditClick = (customer: Customer) => {
        setNewCustomer({
            name: customer.name,
            company: customer.company === 'N/A' ? '' : customer.company,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            status: customer.status,
            initials: customer.initials,
            initialsColor: customer.initialsColor,
            lastOrder: customer.lastOrder,
            totalDue: customer.totalDue
        });
        setEditingCustomerId(customer.id);
        setIsEditMode(true);
        setIsModalOpen(true);
        setActiveDropdown(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        setEditingCustomerId(null);
        setNewCustomer({
            name: '',
            company: '',
            email: '',
            phone: '',
            address: '',
            status: 'Active',
            initials: '',
            initialsColor: 'text-blue-600 bg-blue-100',
            lastOrder: 'N/A',
            totalDue: 0
        });
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

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            <button className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 text-xs font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                                <MdFilterList className="text-[16px]" />
                                <span>Filter</span>
                            </button>
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
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-3 sm:p-4">
                    <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl flex flex-col max-h-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{isEditMode ? 'Edit Customer' : 'Add New Customer'}</h3>
                                <p className="text-xs text-slate-500 mt-0.5">{isEditMode ? 'Update customer details.' : 'Enter customer details to create a new profile.'}</p>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <MdClose className="text-[20px]" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-4 overflow-y-auto">
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className="block">
                                        <span className="text-xs font-semibold text-slate-700 mb-1.5 block">Full Name</span>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                                <MdPerson className="text-[18px]" />
                                            </span>
                                            <input
                                                type="text"
                                                className="w-full pl-9 pr-3 h-10 rounded-lg border-slate-200 bg-slate-50 text-sm focus:bg-white focus:border-primary focus:ring-primary/20 transition-all"
                                                placeholder="e.g. John Doe"
                                                value={newCustomer.name}
                                                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                                            />
                                        </div>
                                    </label>
                                    <label className="block">
                                        <span className="text-xs font-semibold text-slate-700 mb-1.5 block">Company Name</span>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                                <MdBusiness className="text-[18px]" />
                                            </span>
                                            <input
                                                type="text"
                                                className="w-full pl-9 pr-3 h-10 rounded-lg border-slate-200 bg-slate-50 text-sm focus:bg-white focus:border-primary focus:ring-primary/20 transition-all"
                                                placeholder="e.g. Acme Corp"
                                                value={newCustomer.company}
                                                onChange={(e) => setNewCustomer({ ...newCustomer, company: e.target.value })}
                                            />
                                        </div>
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className="block">
                                        <span className="text-xs font-semibold text-slate-700 mb-1.5 block">Email Address</span>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                                <MdEmail className="text-[18px]" />
                                            </span>
                                            <input
                                                type="email"
                                                className="w-full pl-9 pr-3 h-10 rounded-lg border-slate-200 bg-slate-50 text-sm focus:bg-white focus:border-primary focus:ring-primary/20 transition-all"
                                                placeholder="john@example.com"
                                                value={newCustomer.email}
                                                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                                            />
                                        </div>
                                    </label>
                                    <label className="block">
                                        <span className="text-xs font-semibold text-slate-700 mb-1.5 block">Phone Number</span>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                                <MdCall className="text-[18px]" />
                                            </span>
                                            <input
                                                type="tel"
                                                className="w-full pl-9 pr-3 h-10 rounded-lg border-slate-200 bg-slate-50 text-sm focus:bg-white focus:border-primary focus:ring-primary/20 transition-all"
                                                placeholder="+1 (555) 000-0000"
                                                value={newCustomer.phone}
                                                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                                            />
                                        </div>
                                    </label>
                                </div>

                                <label className="block">
                                    <span className="text-xs font-semibold text-slate-700 mb-1.5 block">Address</span>
                                    <div className="relative">
                                        <span className="absolute left-3 top-3 text-slate-400">
                                            <MdLocationOn className="text-[18px]" />
                                        </span>
                                        <textarea
                                            className="w-full pl-9 pr-3 py-2.5 min-h-[100px] rounded-lg border-slate-200 bg-slate-50 text-sm focus:bg-white focus:border-primary focus:ring-primary/20 transition-all resize-y"
                                            placeholder="Enter full billing address..."
                                            value={newCustomer.address}
                                            onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                                        ></textarea>
                                    </div>
                                </label>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            id="status-active"
                                            name="status"
                                            value="Active"
                                            checked={newCustomer.status === 'Active'}
                                            onChange={(e) => setNewCustomer({ ...newCustomer, status: 'Active' })}
                                            className="rounded-full border-slate-300 text-primary focus:ring-primary h-3.5 w-3.5"
                                        />
                                        <label htmlFor="status-active" className="text-[10px] font-medium text-slate-700 cursor-pointer">Active</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            id="status-inactive"
                                            name="status"
                                            value="Inactive"
                                            checked={newCustomer.status === 'Inactive'}
                                            onChange={(e) => setNewCustomer({ ...newCustomer, status: 'Inactive' })}
                                            className="rounded-full border-slate-300 text-primary focus:ring-primary h-3.5 w-3.5"
                                        />
                                        <label htmlFor="status-inactive" className="text-[10px] font-medium text-slate-700 cursor-pointer">Inactive</label>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                            <button
                                onClick={handleCloseModal}
                                className="px-5 h-9 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveCustomer}
                                className="px-5 h-9 rounded-lg bg-primary text-white text-xs font-bold hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all flex items-center gap-2"
                            >
                                <MdSave className="text-[16px]" />
                                {isEditMode ? 'Update Customer' : 'Save Customer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

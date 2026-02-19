'use client';

import { useState, useEffect } from 'react';
import {
    MdClose,
    MdPerson,
    MdBusiness,
    MdEmail,
    MdCall,
    MdLocationOn,
    MdSave
} from 'react-icons/md';
import { createCustomer, updateCustomer } from '@/utils/api';

interface Customer {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    address: string;
    status: 'Active' | 'Inactive';
}

interface AddCustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (customer: any) => void;
    editCustomer?: any;
}

export default function AddCustomerModal({ isOpen, onClose, onSuccess, editCustomer }: AddCustomerModalProps) {
    const [customer, setCustomer] = useState<Partial<Customer>>({
        name: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        status: 'Active'
    });
    const [noAddress, setNoAddress] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (editCustomer) {
            setCustomer({
                name: editCustomer.name || '',
                company: editCustomer.company === 'N/A' ? '' : editCustomer.company,
                email: editCustomer.email || '',
                phone: editCustomer.phone || '',
                address: editCustomer.address || '',
                status: editCustomer.status || 'Active'
            });
            setNoAddress(editCustomer.address === 'N/A');
        } else {
            setCustomer({
                name: '',
                company: '',
                email: '',
                phone: '',
                address: '',
                status: 'Active'
            });
            setNoAddress(false);
        }
    }, [editCustomer, isOpen]);

    const handleSave = async () => {
        if (!customer.name || !customer.phone) {
            alert('Please fill in at least Name and Phone Number');
            return;
        }

        setIsSaving(true);
        const finalCustomer = {
            ...customer,
            address: noAddress ? 'N/A' : customer.address
        };

        try {
            let savedCustomer;
            if (editCustomer) {
                savedCustomer = await updateCustomer(editCustomer.id || editCustomer._id, finalCustomer);
            } else {
                savedCustomer = await createCustomer(finalCustomer);
            }
            onSuccess(savedCustomer);
            onClose();
        } catch (error: any) {
            console.error('Error saving customer:', error);
            const errorMessage = error.response?.data?.message;
            if (errorMessage === 'Mobile number already exists') {
                alert('Mobile number already exists. Please use a different number or search for the existing customer.');
            } else if (errorMessage === 'Email address already exists') {
                alert('Email address already exists. Please use a different email or search for the existing customer.');
            } else if (errorMessage?.includes('Duplicate field error')) {
                alert(errorMessage);
            } else {
                alert(`Error ${editCustomer ? 'updating' : 'creating'} customer`);
            }
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-3 sm:p-4">
            <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl flex flex-col max-h-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Modal Header */}
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">{editCustomer ? 'Edit Customer' : 'Add New Customer'}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{editCustomer ? 'Update customer details.' : 'Enter customer details to create a new profile.'}</p>
                    </div>
                    <button
                        onClick={onClose}
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
                                        value={customer.name}
                                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                                    />
                                </div>
                            </label>
                            <label className="block">
                                <span className="text-xs font-semibold text-slate-700 mb-1.5 block">Company Name <span className="text-slate-400 font-normal">(Optional)</span></span>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                        <MdBusiness className="text-[18px]" />
                                    </span>
                                    <input
                                        type="text"
                                        className="w-full pl-9 pr-3 h-10 rounded-lg border-slate-200 bg-slate-50 text-sm focus:bg-white focus:border-primary focus:ring-primary/20 transition-all"
                                        placeholder="e.g. Acme Corp"
                                        value={customer.company}
                                        onChange={(e) => setCustomer({ ...customer, company: e.target.value })}
                                    />
                                </div>
                            </label>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label className="block">
                                <span className="text-xs font-semibold text-slate-700 mb-1.5 block">Email Address <span className="text-slate-400 font-normal">(Optional)</span></span>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                        <MdEmail className="text-[18px]" />
                                    </span>
                                    <input
                                        type="email"
                                        className="w-full pl-9 pr-3 h-10 rounded-lg border-slate-200 bg-slate-50 text-sm focus:bg-white focus:border-primary focus:ring-primary/20 transition-all"
                                        placeholder="john@example.com"
                                        value={customer.email}
                                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
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
                                        value={customer.phone}
                                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                                    />
                                </div>
                            </label>
                        </div>

                        <label className="block">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs font-semibold text-slate-700 block">Address <span className="text-slate-400 font-normal">(Optional)</span></span>
                                <label className="flex items-center gap-1.5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={noAddress}
                                        onChange={(e) => {
                                            setNoAddress(e.target.checked);
                                            if (e.target.checked) setCustomer({ ...customer, address: '' });
                                        }}
                                        className="rounded border-slate-300 text-primary focus:ring-primary h-3.5 w-3.5"
                                    />
                                    <span className="text-[10px] font-medium text-slate-500">No Address</span>
                                </label>
                            </div>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-slate-400">
                                    <MdLocationOn className="text-[18px]" />
                                </span>
                                <textarea
                                    className={`w-full pl-9 pr-3 py-2.5 min-h-[100px] rounded-lg border-slate-200 bg-slate-50 text-sm focus:bg-white focus:border-primary focus:ring-primary/20 transition-all resize-y ${noAddress ? 'opacity-50 pointer-events-none' : ''}`}
                                    placeholder={noAddress ? 'Address not required' : 'Enter full billing address...'}
                                    value={customer.address}
                                    disabled={noAddress}
                                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
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
                                    checked={customer.status === 'Active'}
                                    onChange={() => setCustomer({ ...customer, status: 'Active' })}
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
                                    checked={customer.status === 'Inactive'}
                                    onChange={() => setCustomer({ ...customer, status: 'Inactive' })}
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
                        onClick={onClose}
                        className="px-5 h-9 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-5 h-9 rounded-lg bg-primary text-white text-xs font-bold hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        <MdSave className="text-[16px]" />
                        {isSaving ? 'Saving...' : (editCustomer ? 'Update Customer' : 'Save Customer')}
                    </button>
                </div>
            </div>
        </div>
    );
}

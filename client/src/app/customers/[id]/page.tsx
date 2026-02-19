'use client';

import { useState, useEffect } from 'react';
import {
    MdMenu,
    MdChevronRight,
    MdSearch,
    MdNotifications,
    MdEdit,
    MdAdd,
    MdMail,
    MdCall,
    MdLanguage,
    MdLocalShipping,
    MdReceiptLong,
    MdFilterList,
    MdDownload,
    MdImage,
    MdVisibility,
    MdArrowForward,
    MdBadge,
    MdCalendarMonth,
    MdPerson
} from 'react-icons/md';
import { useParams } from 'next/navigation';
import { fetchCustomerById } from '@/utils/api';

interface Customer {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    company?: string;
    status: 'Active' | 'Inactive';
    createdAt: string;
}

interface Order {
    _id: string;
    orderDate: string;
    totalAmount: number;
    status: 'pending' | 'completed' | 'cancelled';
    products: any[];
}

export default function CustomerProfilePage() {
    const params = useParams();
    const customerId = params.id as string;
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchCustomerById(customerId);
                setCustomer(data.customer);
                setOrders(data.orders);
            } catch (error) {
                console.error('Error loading customer data:', error);
            } finally {
                setLoading(false);
            }
        };
        if (customerId) loadData();
    }, [customerId]);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!customer) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-slate-500">Customer not found</p>
            </div>
        );
    }

    return (
        <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50/50">
            <div className="flex-1 overflow-y-auto scroll-smooth">
                <div className="max-w-6xl mx-auto p-4 md:p-6 flex flex-col gap-6">
                    {/* Header Section */}
                    <section className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex gap-4 items-center">
                            <div className="size-16 md:size-20 rounded-lg bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                                {customer.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h1 className="text-xl md:text-2xl font-bold text-slate-900">{customer.name}</h1>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium border ${customer.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                                        {customer.status}
                                    </span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-slate-500 text-xs">
                                    <span className="flex items-center gap-1"><MdBadge className="text-[16px]" /> ID: #{customer._id.substring(0, 8)}</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span className="flex items-center gap-1"><MdCalendarMonth className="text-[16px]" /> Since {new Date(customer.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                                    {customer.company && (
                                        <>
                                            <span className="hidden sm:inline">•</span>
                                            <span className="flex items-center gap-1"><MdPerson className="text-[16px]" /> Company: {customer.company}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <button className="flex-1 md:flex-none items-center justify-center gap-1.5 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 hover:bg-slate-50 transition-colors">
                                <MdEdit className="text-[16px]" />
                                Edit
                            </button>
                            <button className="flex-1 md:flex-none items-center justify-center gap-1.5 px-3 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg text-xs font-medium shadow-sm transition-colors">
                                <MdAdd className="text-[16px]" />
                                New Order
                            </button>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column: Contact & Address */}
                        <div className="flex flex-col gap-6 lg:col-span-1">
                            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                                <h3 className="font-bold text-sm text-slate-900 mb-3">Contact Details</h3>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-start gap-2">
                                        <div className="bg-blue-50 p-1.5 rounded-lg text-primary">
                                            <MdMail className="text-[16px]" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 mb-0.5">Email Address</p>
                                            <a className="text-xs font-medium text-slate-900 hover:text-primary transition-colors" href={`mailto:${customer.email}`}>{customer.email}</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="bg-blue-50 p-1.5 rounded-lg text-primary">
                                            <MdCall className="text-[16px]" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 mb-0.5">Phone Number</p>
                                            <a className="text-xs font-medium text-slate-900 hover:text-primary transition-colors" href={`tel:${customer.phone}`}>{customer.phone}</a>
                                        </div>
                                    </div>
                                    {customer.company && (
                                        <div className="flex items-start gap-2">
                                            <div className="bg-blue-50 p-1.5 rounded-lg text-primary">
                                                <MdLanguage className="text-[16px]" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-500 mb-0.5">Company</p>
                                                <span className="text-xs font-medium text-slate-900">{customer.company}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-bold text-sm text-slate-900">Address</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                                        <div className="flex items-center gap-1.5 mb-1.5">
                                            <MdLocalShipping className="text-slate-500 text-[16px]" />
                                            <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Billing & Shipping</span>
                                        </div>
                                        <p className="text-xs text-slate-900 leading-relaxed whitespace-pre-line">
                                            {customer.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Order History */}
                        <div className="flex flex-col gap-6 lg:col-span-2">
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full min-h-[400px]">
                                <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-bold text-sm text-slate-900">Order History</h3>
                                        <div className="hidden sm:flex bg-slate-50 rounded-lg p-0.5">
                                            <button className="px-2 py-0.5 bg-white shadow-sm rounded text-[10px] font-medium text-slate-900">All Orders</button>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded-lg">
                                            <MdFilterList className="text-[18px]" />
                                        </button>
                                        <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded-lg">
                                            <MdDownload className="text-[18px]" />
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto flex-1">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-100">
                                                <th className="py-2 px-4 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                                                <th className="py-2 px-4 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                                <th className="py-2 px-4 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                                <th className="py-2 px-4 text-[10px] font-semibold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                                                <th className="py-2 px-4 text-[10px] font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {orders.length > 0 ? (
                                                orders.map((order) => (
                                                    <tr key={order._id} className="hover:bg-slate-50 transition-colors group">
                                                        <td className="py-3 px-4 text-xs font-medium text-primary cursor-pointer hover:underline">#ORD-{order._id.substring(order._id.length - 6).toUpperCase()}</td>
                                                        <td className="py-3 px-4 text-xs text-slate-900">{new Date(order.orderDate).toLocaleDateString()}</td>
                                                        <td className="py-3 px-4">
                                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${order.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' : order.status === 'pending' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                                                                <span className={`size-1 rounded-full ${order.status === 'completed' ? 'bg-green-500' : order.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
                                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4 text-xs font-medium text-slate-900 text-right">${order.totalAmount.toFixed(2)}</td>
                                                        <td className="py-3 px-4 text-right">
                                                            <button className="text-slate-500 hover:text-primary transition-colors">
                                                                <MdVisibility className="text-[18px]" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="py-8 text-center text-slate-500 text-xs">No orders found for this customer.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="p-3 border-t border-slate-100 flex justify-center">
                                    <button className="text-xs font-medium text-slate-500 hover:text-primary flex items-center gap-1 transition-colors">
                                        View All Orders <MdArrowForward className="text-[16px]" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

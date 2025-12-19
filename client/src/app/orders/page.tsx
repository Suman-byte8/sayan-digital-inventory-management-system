'use client';

import { useState, useEffect } from 'react';
import { fetchOrders } from '@/utils/api';
import NewOrderModal from '@/components/NewOrderModal';
import {
    MdAdd,
    MdPendingActions,
    MdPrint,
    MdPayments,
    MdSearch,
    MdExpandMore,
    MdFilterList,
    MdMoreVert,
    MdChevronLeft,
    MdChevronRight
} from 'react-icons/md';

export default function OrdersPage() {
    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        const loadOrders = async () => {
            const data = await fetchOrders();
            setOrders(data);
        };
        loadOrders();
    }, []);

    return (
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
            {/* Top Bar / Header */}
            <header className="flex-shrink-0 bg-surface-light border-b border-slate-200">
                <div className="max-w-full mx-auto px-4 py-3">
                    <div className="flex flex-wrap justify-between items-center gap-3">
                        <div className="flex flex-col gap-0.5">
                            <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-tight">Customer Orders</h2>
                            <p className="text-slate-500 text-xs font-normal">Track and manage printing jobs efficiently</p>
                        </div>
                        <button
                            onClick={() => setIsNewOrderModalOpen(true)}
                            className="flex items-center justify-center gap-1.5 cursor-pointer overflow-hidden rounded-lg h-9 px-3 bg-primary hover:bg-blue-700 text-white text-xs font-bold leading-normal tracking-wide transition-colors shadow-sm"
                        >
                            <MdAdd className="text-[16px]" />
                            <span>New Order</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
                <div className="max-w-full mx-auto flex flex-col gap-4 pb-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="flex flex-col gap-1 rounded-lg p-3 border border-slate-200 bg-surface-light shadow-sm">
                            <div className="flex justify-between items-start">
                                <p className="text-slate-500 text-xs font-medium">Orders Pending</p>
                                <span className="p-1 rounded-md bg-orange-100 text-orange-500">
                                    <MdPendingActions className="text-[16px]" />
                                </span>
                            </div>
                            <div className="flex items-baseline gap-2 mt-1">
                                <p className="text-slate-900 text-2xl font-bold">0</p>
                                <span className="text-slate-400 text-[10px] font-medium px-1.5 py-0.5 rounded">No data</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 rounded-lg p-3 border border-slate-200 bg-surface-light shadow-sm">
                            <div className="flex justify-between items-start">
                                <p className="text-slate-500 text-xs font-medium">In Production</p>
                                <span className="p-1 rounded-md bg-blue-100 text-primary">
                                    <MdPrint className="text-[16px]" />
                                </span>
                            </div>
                            <div className="flex items-baseline gap-2 mt-1">
                                <p className="text-slate-900 text-2xl font-bold">0</p>
                                <span className="text-slate-400 text-[10px] font-medium px-1.5 py-0.5 rounded">No data</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 rounded-lg p-3 border border-slate-200 bg-surface-light shadow-sm">
                            <div className="flex justify-between items-start">
                                <p className="text-slate-500 text-xs font-medium">Revenue Today</p>
                                <span className="p-1 rounded-md bg-emerald-100 text-emerald-600">
                                    <MdPayments className="text-[16px]" />
                                </span>
                            </div>
                            <div className="flex items-baseline gap-2 mt-1">
                                <p className="text-slate-900 text-2xl font-bold">$0.00</p>
                                <span className="text-slate-400 text-[10px] font-medium px-1.5 py-0.5 rounded">No data</span>
                            </div>
                        </div>
                    </div>

                    {/* Filters & Search Toolbar */}
                    <div className="flex flex-col lg:flex-row gap-3 justify-between items-start lg:items-center bg-surface-light p-3 rounded-lg border border-slate-200 shadow-sm">
                        {/* Search */}
                        <label className="flex flex-col min-w-[280px] w-full lg:w-auto h-9">
                            <div className="flex w-full flex-1 items-center rounded-lg h-full bg-background-light border border-transparent focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                <div className="text-slate-400 flex items-center justify-center pl-2.5">
                                    <MdSearch className="text-[18px]" />
                                </div>
                                <input
                                    className="w-full bg-transparent border-none text-xs text-slate-900 placeholder:text-slate-400 focus:ring-0 px-2.5 outline-none"
                                    placeholder="Search by Order ID, Customer..."
                                />
                            </div>
                        </label>
                        {/* Filter Chips */}
                        <div className="flex flex-wrap gap-2 items-center w-full lg:w-auto">
                            <div className="relative group">
                                <button className="flex h-8 items-center justify-between gap-x-1.5 rounded bg-background-light border border-transparent hover:border-slate-200 px-2.5 transition-colors">
                                    <span className="text-slate-900 text-xs font-medium">Status: All</span>
                                    <MdExpandMore className="text-slate-900 text-[16px]" />
                                </button>
                            </div>
                            <div className="relative group">
                                <button className="flex h-8 items-center justify-between gap-x-1.5 rounded bg-background-light border border-transparent hover:border-slate-200 px-2.5 transition-colors">
                                    <span className="text-slate-900 text-xs font-medium">Date: Last 30 Days</span>
                                    <MdExpandMore className="text-slate-900 text-[16px]" />
                                </button>
                            </div>
                            <div className="relative group">
                                <button className="flex h-8 items-center justify-between gap-x-1.5 rounded bg-background-light border border-transparent hover:border-slate-200 px-2.5 transition-colors">
                                    <span className="text-slate-900 text-xs font-medium">Payment: All</span>
                                    <MdExpandMore className="text-slate-900 text-[16px]" />
                                </button>
                            </div>
                            <div className="h-5 w-px bg-slate-200 hidden lg:block mx-0.5"></div>
                            <button className="flex items-center justify-center size-8 rounded bg-background-light hover:bg-slate-200 transition-colors text-slate-500">
                                <MdFilterList className="text-[16px]" />
                            </button>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="bg-surface-light border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-background-light border-b border-slate-200">
                                        <th className="p-2.5 w-10">
                                            <input className="rounded border-gray-300 text-primary focus:ring-primary bg-white h-3.5 w-3.5" type="checkbox" />
                                        </th>
                                        <th className="p-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                                        <th className="p-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                                        <th className="p-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Job Details</th>
                                        <th className="p-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                        <th className="p-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                                        <th className="p-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="p-2.5 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {orders.map((order) => (
                                        <tr key={order._id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="p-2.5">
                                                <input className="rounded border-gray-300 text-primary focus:ring-primary bg-white h-3.5 w-3.5" type="checkbox" />
                                            </td>
                                            <td className="p-2.5">
                                                <a className="text-xs font-semibold text-primary hover:underline" href="#">#{order._id.substring(0, 8)}</a>
                                            </td>
                                            <td className="p-2.5">
                                                <div className="flex items-center gap-2">
                                                    <div className="size-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                                        {order.customer?.name?.substring(0, 2).toUpperCase() || 'NA'}
                                                    </div>
                                                    <span className="text-xs font-medium text-slate-900">{order.customer?.name || 'Unknown'}</span>
                                                </div>
                                            </td>
                                            <td className="p-2.5 text-xs text-slate-500">
                                                {order.products?.length || 0} Items
                                            </td>
                                            <td className="p-2.5 text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className="p-2.5 text-xs font-semibold text-slate-900 text-right">${order.totalAmount?.toFixed(2)}</td>
                                            <td className="p-2.5">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-800">
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-2.5">
                                                <button className="text-slate-500 hover:text-slate-900 p-1 rounded hover:bg-slate-100">
                                                    <MdMoreVert className="text-[16px]" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        <div className="px-4 py-2.5 border-t border-slate-200 flex items-center justify-between bg-background-light">
                            <div className="flex items-center gap-2">
                                <p className="text-[10px] text-slate-500">Showing <span className="font-semibold text-slate-900">1-10</span> of <span className="font-semibold text-slate-900">450</span> orders</p>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <button className="p-1 rounded-md text-slate-500 hover:bg-slate-200 disabled:opacity-50">
                                    <MdChevronLeft className="text-[16px]" />
                                </button>
                                <button className="px-2 py-0.5 rounded bg-primary text-white text-xs font-medium">1</button>
                                <button className="px-2 py-0.5 rounded text-slate-900 hover:bg-slate-200 text-xs font-medium">2</button>
                                <button className="px-2 py-0.5 rounded text-slate-900 hover:bg-slate-200 text-xs font-medium">3</button>
                                <span className="text-slate-500 px-0.5 text-xs">...</span>
                                <button className="px-2 py-0.5 rounded text-slate-900 hover:bg-slate-200 text-xs font-medium">45</button>
                                <button className="p-1 rounded-md text-slate-500 hover:bg-slate-200">
                                    <MdChevronRight className="text-[16px]" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <NewOrderModal
                isOpen={isNewOrderModalOpen}
                onClose={() => setIsNewOrderModalOpen(false)}
            />
        </main>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { fetchOrders, updateOrder, deleteOrder } from '@/utils/api';
import NewOrderModal from '@/components/NewOrderModal';
import { useSettings } from '@/context/SettingsContext';
import { useMemo } from 'react';
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
    MdChevronRight,
    MdDelete
} from 'react-icons/md';

export default function OrdersPage() {
    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalOrders, setTotalOrders] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('All');
    const [paymentStatus, setPaymentStatus] = useState('All');
    const [dateRange, setDateRange] = useState('Last 30 Days');

    const { settings } = useSettings();
    const currencySymbol = useMemo(() => {
        if (!settings?.currency) return '$';
        switch (settings.currency) {
            case 'INR': return '₹';
            case 'USD': return '$';
            case 'EUR': return '€';
            case 'GBP': return '£';
            default: return '$';
        }
    }, [settings?.currency]);

    const loadOrders = async () => {
        setLoading(true);
        try {
            const params: any = {
                page: currentPage,
                limit: 10,
                search,
                status,
                paymentStatus
            };

            // Handle date range (simplified for now)
            if (dateRange === 'Today') {
                params.startDate = new Date().setHours(0, 0, 0, 0);
            } else if (dateRange === 'Last 7 Days') {
                params.startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
            }

            const data = await fetchOrders(params);
            setOrders(data.orders);
            setTotalOrders(data.total);
            setTotalPages(data.pages);
        } catch (error) {
            console.error('Error loading orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, [currentPage, status, paymentStatus, dateRange]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
        loadOrders();
    };

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            await updateOrder(id, { status: newStatus });
            loadOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleDeleteOrder = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await deleteOrder(id);
                loadOrders();
            } catch (error) {
                console.error('Error deleting order:', error);
            }
        }
    };

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
                                <p className="text-slate-900 text-2xl font-bold">{Array.isArray(orders) ? orders.filter(o => o.status === 'pending').length : 0}</p>
                                <span className="text-slate-400 text-[10px] font-medium px-1.5 py-0.5 rounded">
                                    {totalOrders > 0 && Array.isArray(orders) ? `${((orders.filter(o => o.status === 'pending').length / orders.length) * 100).toFixed(0)}%` : '0%'}
                                </span>
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
                                <p className="text-slate-900 text-2xl font-bold">{Array.isArray(orders) ? orders.filter(o => o.status === 'completed').length : 0}</p>
                                <span className="text-slate-400 text-[10px] font-medium px-1.5 py-0.5 rounded">
                                    {totalOrders > 0 && Array.isArray(orders) ? `${((orders.filter(o => o.status === 'completed').length / orders.length) * 100).toFixed(0)}%` : '0%'}
                                </span>
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
                                <p className="text-slate-900 text-2xl font-bold">
                                    {currencySymbol}{orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                                <span className="text-slate-400 text-[10px] font-medium px-1.5 py-0.5 rounded">This page</span>
                            </div>
                        </div>
                    </div>

                    {/* Filters & Search Toolbar */}
                    <div className="flex flex-col lg:flex-row gap-3 justify-between items-start lg:items-center bg-surface-light p-3 rounded-lg border border-slate-200 shadow-sm">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="flex flex-col min-w-[280px] w-full lg:w-auto h-9">
                            <div className="flex w-full flex-1 items-center rounded-lg h-full bg-background-light border border-transparent focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                <div className="text-slate-400 flex items-center justify-center pl-2.5">
                                    <MdSearch className="text-[18px]" />
                                </div>
                                <input
                                    className="w-full bg-transparent border-none text-xs text-slate-900 placeholder:text-slate-400 focus:ring-0 px-2.5 outline-none"
                                    placeholder="Search by Order ID, Customer..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </form>
                        {/* Filter Chips */}
                        <div className="flex flex-wrap gap-2 items-center w-full lg:w-auto">
                            <div className="relative group">
                                <select
                                    value={status}
                                    onChange={(e) => { setStatus(e.target.value); setCurrentPage(1); }}
                                    className="flex h-8 items-center justify-between gap-x-1.5 rounded bg-background-light border border-transparent hover:border-slate-200 px-2.5 transition-colors text-slate-900 text-xs font-medium outline-none appearance-none cursor-pointer pr-8"
                                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
                                >
                                    <option value="All">Status: All</option>
                                    <option value="pending">Status: Pending</option>
                                    <option value="completed">Status: Completed</option>
                                    <option value="cancelled">Status: Cancelled</option>
                                </select>
                            </div>
                            <div className="relative group">
                                <select
                                    value={dateRange}
                                    onChange={(e) => { setDateRange(e.target.value); setCurrentPage(1); }}
                                    className="flex h-8 items-center justify-between gap-x-1.5 rounded bg-background-light border border-transparent hover:border-slate-200 px-2.5 transition-colors text-slate-900 text-xs font-medium outline-none appearance-none cursor-pointer pr-8"
                                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
                                >
                                    <option value="All Time">Date: All Time</option>
                                    <option value="Today">Date: Today</option>
                                    <option value="Last 7 Days">Date: Last 7 Days</option>
                                    <option value="Last 30 Days">Date: Last 30 Days</option>
                                </select>
                            </div>
                            <div className="relative group">
                                <select
                                    value={paymentStatus}
                                    onChange={(e) => { setPaymentStatus(e.target.value); setCurrentPage(1); }}
                                    className="flex h-8 items-center justify-between gap-x-1.5 rounded bg-background-light border border-transparent hover:border-slate-200 px-2.5 transition-colors text-slate-900 text-xs font-medium outline-none appearance-none cursor-pointer pr-8"
                                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1rem' }}
                                >
                                    <option value="All">Payment: All</option>
                                    <option value="paid">Payment: Paid</option>
                                    <option value="unpaid">Payment: Unpaid</option>
                                    <option value="partial">Payment: Partial</option>
                                </select>
                            </div>
                            <div className="h-5 w-px bg-slate-200 hidden lg:block mx-0.5"></div>
                            <button
                                onClick={() => {
                                    setSearch('');
                                    setStatus('All');
                                    setPaymentStatus('All');
                                    setDateRange('Last 30 Days');
                                    setCurrentPage(1);
                                }}
                                className="flex items-center justify-center size-8 rounded bg-background-light hover:bg-slate-200 transition-colors text-slate-500"
                                title="Reset Filters"
                            >
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
                                        <th className="p-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Phone</th>
                                        <th className="p-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Job Details</th>
                                        <th className="p-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                                        <th className="p-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                        <th className="p-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                                        <th className="p-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="p-2.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {orders.map((order) => (
                                        <tr key={order._id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="p-2.5">
                                                <input className="rounded border-gray-300 text-primary focus:ring-primary bg-white h-3.5 w-3.5" type="checkbox" />
                                            </td>
                                            <td className="p-2.5">
                                                <a className="text-xs font-semibold text-primary hover:underline" href={`/orders/${order._id}`}>#{order._id.substring(0, 8)}</a>
                                            </td>
                                            <td className="p-2.5">
                                                <div className="flex items-center gap-2">
                                                    <div className="size-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                                        {order.customer?.name?.substring(0, 2).toUpperCase() || 'NA'}
                                                    </div>
                                                    <span className="text-xs font-medium text-slate-900">{order.customer?.name || 'Unknown'}</span>
                                                </div>
                                            </td>
                                            <td className="p-2.5 text-xs text-slate-500">{order.customer?.phone || 'N/A'}</td>
                                            <td className="p-2.5 text-xs text-slate-500">
                                                {order.products?.length || 0} Items
                                            </td>
                                            <td className="p-2.5 text-xs text-slate-500 max-w-[150px] truncate" title={order.notes}>
                                                {order.notes || 'No description'}
                                            </td>
                                            <td className="p-2.5 text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className="p-2.5 text-xs font-semibold text-slate-900 text-right">{currencySymbol}{order.totalAmount?.toFixed(2)}</td>
                                            <td className="p-2.5">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'delivered' ? 'bg-blue-100 text-blue-800' :
                                                        order.status === 'hold' ? 'bg-orange-100 text-orange-800' :
                                                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                                'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-2.5">
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => handleUpdateStatus(order._id, 'delivered')}
                                                        className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 text-[10px] font-bold transition-colors"
                                                        title="Mark as Delivered"
                                                    >
                                                        Delivered
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(order._id, 'pending')}
                                                        className="px-1.5 py-0.5 rounded bg-yellow-50 text-yellow-600 hover:bg-yellow-100 text-[10px] font-bold transition-colors"
                                                        title="Mark as Pending"
                                                    >
                                                        Pending
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(order._id, 'completed')}
                                                        className="px-1.5 py-0.5 rounded bg-green-50 text-green-600 hover:bg-green-100 text-[10px] font-bold transition-colors"
                                                        title="Mark as Done"
                                                    >
                                                        Done
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(order._id, 'hold')}
                                                        className="px-1.5 py-0.5 rounded bg-orange-50 text-orange-600 hover:bg-orange-100 text-[10px] font-bold transition-colors"
                                                        title="Mark as Hold"
                                                    >
                                                        Hold
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteOrder(order._id)}
                                                        className="p-1 rounded text-red-500 hover:bg-red-50 transition-colors"
                                                        title="Delete Order"
                                                    >
                                                        <MdDelete className="text-[16px]" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination */}
                        <div className="px-4 py-2.5 border-t border-slate-200 flex items-center justify-between bg-background-light">
                            <div className="flex items-center gap-2">
                                <p className="text-[10px] text-slate-500">
                                    Showing <span className="font-semibold text-slate-900">{(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, totalOrders)}</span> of <span className="font-semibold text-slate-900">{totalOrders}</span> orders
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="p-1 rounded-md text-slate-500 hover:bg-slate-200 disabled:opacity-50"
                                >
                                    <MdChevronLeft className="text-[16px]" />
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-2 py-0.5 rounded text-xs font-medium ${currentPage === i + 1 ? 'bg-primary text-white' : 'text-slate-900 hover:bg-slate-200'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="p-1 rounded-md text-slate-500 hover:bg-slate-200 disabled:opacity-50"
                                >
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

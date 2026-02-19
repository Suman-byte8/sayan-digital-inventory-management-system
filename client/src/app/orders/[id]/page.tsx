'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchOrders, updateOrder, deleteOrder } from '@/utils/api';
import { useSettings } from '@/context/SettingsContext';
import { useMemo } from 'react';
import {
    MdArrowBack,
    MdPerson,
    MdPhone,
    MdEmail,
    MdLocationOn,
    MdReceipt,
    MdCalendarToday,
    MdAccessTime,
    MdCheckCircle,
    MdPending,
    MdCancel,
    MdLocalShipping,
    MdPauseCircleFilled,
    MdDelete
} from 'react-icons/md';

export default function OrderDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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

    const loadOrder = async () => {
        try {
            setLoading(true);
            // We reuse fetchOrders with search param for ID as a quick way if fetchOrderById is not ready
            // But better to use a dedicated fetch if available. 
            // Since we updated fetchOrders to handle params, we can use it.
            const data = await fetchOrders({ search: id });
            if (data.orders && data.orders.length > 0) {
                setOrder(data.orders[0]);
            }
        } catch (error) {
            console.error('Error loading order details:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) loadOrder();
    }, [id]);

    const handleUpdateStatus = async (newStatus: string) => {
        try {
            await updateOrder(id as string, { status: newStatus });
            loadOrder();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await deleteOrder(id as string);
                router.push('/orders');
            } catch (error) {
                console.error('Error deleting order:', error);
            }
        }
    };

    if (loading) return <div className="flex items-center justify-center h-full">Loading...</div>;
    if (!order) return <div className="flex items-center justify-center h-full">Order not found</div>;

    return (
        <main className="flex-1 p-6 bg-slate-50 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-full hover:bg-white transition-colors shadow-sm border border-slate-200"
                        >
                            <MdArrowBack className="text-xl text-slate-600" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Order #{order._id.substring(0, 8)}</h1>
                            <p className="text-sm text-slate-500">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-50 transition-colors font-medium shadow-sm"
                        >
                            <MdDelete /> Delete
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Order Info & Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Status Card */}
                        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900 mb-4">Order Status</h2>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { label: 'Pending', value: 'pending', icon: MdPending, color: 'yellow' },
                                    { label: 'In Production', value: 'completed', icon: MdCheckCircle, color: 'green' },
                                    { label: 'Delivered', value: 'delivered', icon: MdLocalShipping, color: 'blue' },
                                    { label: 'On Hold', value: 'hold', icon: MdPauseCircleFilled, color: 'orange' },
                                    { label: 'Cancelled', value: 'cancelled', icon: MdCancel, color: 'red' }
                                ].map((s) => (
                                    <button
                                        key={s.value}
                                        onClick={() => handleUpdateStatus(s.value)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all font-medium ${order.status === s.value
                                            ? `bg-${s.color}-50 border-${s.color}-200 text-${s.color}-700 ring-2 ring-${s.color}-500 ring-offset-2`
                                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <s.icon className="text-lg" />
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100">
                                <h2 className="text-lg font-bold text-slate-900">Order Items</h2>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Product</th>
                                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase text-center">Quantity</th>
                                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase text-right">Price</th>
                                        <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {order.products.map((item: any, idx: number) => (
                                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                                                        <MdReceipt className="text-xl" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900">{item.name || item.product?.name || 'Unknown Product'}</p>
                                                        <p className="text-xs text-slate-500">{item.product?.category || 'General'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 text-center font-medium">{item.quantity}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600 text-right font-medium">{currencySymbol}{item.price.toFixed(2)}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">{currencySymbol}{(item.quantity * item.price).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-slate-50">
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-sm font-bold text-slate-900 text-right">Grand Total</td>
                                        <td className="px-6 py-4 text-lg font-black text-primary text-right">{currencySymbol}{order.totalAmount.toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        {/* Notes Card */}
                        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900 mb-4">Order Description / Notes</h2>
                            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 text-sm leading-relaxed min-h-[100px]">
                                {order.notes || 'No description provided for this order.'}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Customer Info */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <MdPerson className="text-primary" /> Customer Details
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {order.customer?.name?.substring(0, 2).toUpperCase() || 'NA'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">{order.customer?.name || 'Unknown Customer'}</p>
                                        <p className="text-xs text-slate-500">Customer ID: {order.customer?._id?.substring(0, 8)}</p>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-3 text-slate-600">
                                        <MdPhone className="text-lg text-slate-400" />
                                        <span className="text-sm font-medium">{order.customer?.phone || 'No phone provided'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600">
                                        <MdEmail className="text-lg text-slate-400" />
                                        <span className="text-sm font-medium">{order.customer?.email || 'No email provided'}</span>
                                    </div>
                                    <div className="flex items-start gap-3 text-slate-600">
                                        <MdLocationOn className="text-lg text-slate-400 mt-0.5" />
                                        <span className="text-sm font-medium leading-relaxed">{order.customer?.address || 'No address provided'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-primary to-blue-600 rounded-xl p-6 text-white shadow-lg">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <MdReceipt /> Payment Info
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-white/80 text-sm">
                                    <span>Payment Status</span>
                                    <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-bold uppercase text-[10px]">
                                        {order.paymentStatus}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pt-3 border-t border-white/20">
                                    <span className="font-medium">Total Amount</span>
                                    <span className="text-xl font-black">{currencySymbol}{order.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

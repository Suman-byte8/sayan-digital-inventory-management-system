'use client';

import { useState, useEffect } from 'react';
import {
    MdClose,
    MdSearch,
    MdPersonAdd,
    MdAdd,
    MdDelete,
    MdSave
} from 'react-icons/md';

interface OrderItem {
    id: string;
    productName: string;
    quantity: number;
    price: number;
}

interface NewOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NewOrderModal({ isOpen, onClose }: NewOrderModalProps) {
    const [customerSearch, setCustomerSearch] = useState('');
    const [items, setItems] = useState<OrderItem[]>([
        { id: '1', productName: 'Business Cards (Matte, 500x)', quantity: 1, price: 120.00 }
    ]);
    const [paymentStatus, setPaymentStatus] = useState('unpaid');
    const [notes, setNotes] = useState('');

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setCustomerSearch('');
            setItems([{ id: '1', productName: 'Business Cards (Matte, 500x)', quantity: 1, price: 120.00 }]);
            setPaymentStatus('unpaid');
            setNotes('');
        }
    }, [isOpen]);

    const handleAddItem = () => {
        const newItem: OrderItem = {
            id: Date.now().toString(),
            productName: 'New Item',
            quantity: 1,
            price: 0
        };
        setItems([...items, newItem]);
    };

    const handleRemoveItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const updateItem = (id: string, field: keyof OrderItem, value: string | number) => {
        setItems(items.map(item => {
            if (item.id === id) {
                return { ...item, [field]: value };
            }
            return item;
        }));
    };

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.10;
    const grandTotal = subtotal + tax;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl my-auto relative flex flex-col max-h-[95vh] animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 flex-shrink-0">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Add New Order</h3>
                        <p className="text-xs text-slate-500">Create a new order for a customer</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-900 transition-colors"
                    >
                        <MdClose className="text-[20px]" />
                    </button>
                </div>

                <div className="p-5 overflow-y-auto custom-scrollbar">
                    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5 relative">
                                <label className="text-xs font-semibold text-slate-900">Customer</label>
                                <div className="relative">
                                    <input
                                        className="w-full rounded-md border-slate-200 bg-slate-50 text-xs px-3 py-2 focus:ring-primary focus:border-primary pr-8"
                                        placeholder="Search or select customer..."
                                        type="text"
                                        value={customerSearch}
                                        onChange={(e) => setCustomerSearch(e.target.value)}
                                    />
                                    <MdSearch className="absolute right-2.5 top-2 text-slate-400 text-[16px]" />
                                </div>
                            </div>
                            <div className="flex items-end">
                                <button className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-primary text-primary hover:bg-blue-50 text-xs font-medium transition-colors" type="button">
                                    <MdPersonAdd className="text-[16px]" />
                                    Add New Customer
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-slate-900">Order Items</label>
                                <button
                                    className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
                                    type="button"
                                    onClick={handleAddItem}
                                >
                                    <MdAdd className="text-[14px]" /> Add Item
                                </button>
                            </div>

                            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 flex flex-col gap-2">
                                <div className="hidden md:grid grid-cols-12 gap-3 text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-0.5">
                                    <div className="col-span-6">Product / Service</div>
                                    <div className="col-span-2 text-right">Qty</div>
                                    <div className="col-span-2 text-right">Price</div>
                                    <div className="col-span-2 text-right">Total</div>
                                </div>

                                {items.map((item) => (
                                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center group relative border-b border-dashed border-slate-200 last:border-0 pb-2 last:pb-0">
                                        <div className="col-span-1 md:col-span-6">
                                            <label className="md:hidden text-[10px] text-slate-500 mb-0.5 block">Product</label>
                                            <input
                                                className="w-full rounded-md border-slate-200 bg-white text-xs px-2.5 py-1.5 focus:ring-primary focus:border-primary"
                                                value={item.productName}
                                                onChange={(e) => updateItem(item.id, 'productName', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-span-1 md:col-span-2">
                                            <label className="md:hidden text-[10px] text-slate-500 mb-0.5 block">Qty</label>
                                            <input
                                                className="w-full rounded-md border-slate-200 bg-white text-xs px-2.5 py-1.5 text-right focus:ring-primary focus:border-primary"
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="col-span-1 md:col-span-2">
                                            <label className="md:hidden text-[10px] text-slate-500 mb-0.5 block">Price</label>
                                            <div className="relative">
                                                <span className="absolute left-2.5 top-1.5 text-slate-500 text-xs">$</span>
                                                <input
                                                    className="w-full rounded-md border-slate-200 bg-white text-xs pl-5 pr-2.5 py-1.5 text-right focus:ring-primary focus:border-primary"
                                                    type="number"
                                                    value={item.price}
                                                    onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-2">
                                            <label className="md:hidden text-[10px] text-slate-500">Total</label>
                                            <span className="text-xs font-semibold text-slate-900">${(item.quantity * item.price).toFixed(2)}</span>
                                            <button
                                                className="text-red-500 hover:bg-red-50 p-1 rounded transition-all ml-1"
                                                type="button"
                                                onClick={() => handleRemoveItem(item.id)}
                                            >
                                                <MdDelete className="text-[16px]" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-900">Payment Status</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-1.5 cursor-pointer">
                                            <input
                                                className="text-primary focus:ring-primary bg-white border-slate-300 w-3.5 h-3.5"
                                                name="payment_status"
                                                type="radio"
                                                checked={paymentStatus === 'unpaid'}
                                                onChange={() => setPaymentStatus('unpaid')}
                                            />
                                            <span className="text-xs text-slate-900">Unpaid / Due</span>
                                        </label>
                                        <label className="flex items-center gap-1.5 cursor-pointer">
                                            <input
                                                className="text-primary focus:ring-primary bg-white border-slate-300 w-3.5 h-3.5"
                                                name="payment_status"
                                                type="radio"
                                                checked={paymentStatus === 'paid'}
                                                onChange={() => setPaymentStatus('paid')}
                                            />
                                            <span className="text-xs text-slate-900">Paid</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-900">Order Notes</label>
                                    <textarea
                                        className="w-full rounded-md border-slate-200 bg-slate-50 text-xs px-3 py-2 focus:ring-primary focus:border-primary placeholder:text-slate-400"
                                        placeholder="Internal notes about this order..."
                                        rows={2}
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 h-fit">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500">Subtotal</span>
                                    <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500">Tax (10%)</span>
                                    <span className="font-medium text-slate-900">${tax.toFixed(2)}</span>
                                </div>
                                <div className="h-px bg-slate-200 my-0.5"></div>
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span className="text-slate-900">Grand Total</span>
                                    <span className="text-primary">${grandTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="px-5 py-3 border-t border-slate-200 bg-white flex justify-end gap-2.5 rounded-b-xl flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-slate-200 text-slate-900 text-xs font-medium hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            alert('Order saved!');
                            onClose();
                        }}
                        className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        Save Order
                    </button>
                </div>
            </div>
        </div>
    );
}

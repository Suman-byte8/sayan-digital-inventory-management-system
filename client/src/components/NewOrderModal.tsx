'use client';

import { useState, useEffect } from 'react';
import {
    MdClose,
    MdSearch,
    MdPersonAdd,
    MdAdd,
    MdDelete,
    MdSave,
    MdCheckCircle
} from 'react-icons/md';
import { searchCustomerByPhone, createOrder, fetchProducts } from '@/utils/api';
import AddCustomerModal from './AddCustomerModal';
import { Product } from './InventoryTable';

interface OrderItem {
    id: string;
    productId: string;
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
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [items, setItems] = useState<OrderItem[]>([]);
    const [paymentStatus, setPaymentStatus] = useState('unpaid');
    const [notes, setNotes] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
    const [activeProductSearch, setActiveProductSearch] = useState<string | null>(null);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setCustomerSearch('');
            setSelectedCustomer(null);
            setSearchResults([]);
            setItems([]);
            setPaymentStatus('unpaid');
            setNotes('');
            setIsSaving(false);
            loadProducts();
        }
    }, [isOpen]);

    const loadProducts = async () => {
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleCustomerSearch = async () => {
        if (!customerSearch) return;
        setIsSearching(true);
        try {
            const results = await searchCustomerByPhone(customerSearch);
            if (results.length === 1) {
                setSelectedCustomer(results[0]);
                setSearchResults([]);
            } else {
                setSearchResults(results);
                setSelectedCustomer(null);
            }
        } catch (error) {
            console.error('Customer not found');
            setSelectedCustomer(null);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const selectCustomer = (customer: any) => {
        setSelectedCustomer(customer);
        setCustomerSearch(customer.phone);
        setSearchResults([]);
    };

    const handleSaveOrder = async () => {
        if (!selectedCustomer) {
            alert('Please select a customer first (search by phone)');
            return;
        }

        if (items.length === 0) {
            alert('Please add at least one item');
            return;
        }

        const invalidItems = items.filter(item => !item.productName);
        if (invalidItems.length > 0) {
            alert('Please enter a product name for all items in the list');
            return;
        }

        setIsSaving(true);
        try {
            const orderData = {
                customer: selectedCustomer._id,
                products: items.map(item => ({
                    product: item.productId || undefined,
                    name: item.productName,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: grandTotal,
                status: paymentStatus === 'paid' ? 'completed' : 'pending',
                paymentStatus: paymentStatus,
                notes: notes
            };

            await createOrder(orderData);
            alert('Order saved successfully!');
            onClose();
        } catch (error) {
            alert('Error saving order');
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddItem = () => {
        const newItem: OrderItem = {
            id: Date.now().toString(),
            productId: '',
            productName: '',
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

    const handleProductSelect = (itemId: string, product: Product) => {
        setItems(items.map(item => {
            if (item.id === itemId) {
                return {
                    ...item,
                    productId: product._id,
                    productName: product.name,
                    price: product.sellingPrice
                };
            }
            return item;
        }));
        setActiveProductSearch(null);
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
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5 relative">
                                <label className="text-xs font-semibold text-slate-900">Customer Phone</label>
                                <div className="relative flex gap-2">
                                    <div className="relative flex-1">
                                        <input
                                            className="w-full rounded-md border-slate-200 bg-slate-50 text-xs px-3 py-2 focus:ring-primary focus:border-primary pr-8"
                                            placeholder="Enter phone number or name..."
                                            type="text"
                                            value={customerSearch}
                                            onChange={(e) => {
                                                setCustomerSearch(e.target.value);
                                                if (e.target.value === '') setSearchResults([]);
                                            }}
                                            onKeyDown={(e) => e.key === 'Enter' && handleCustomerSearch()}
                                        />
                                        <MdSearch className="absolute right-2.5 top-2 text-slate-400 text-[16px]" />

                                        {/* Customer Search Results Dropdown */}
                                        {searchResults.length > 0 && (
                                            <div className="absolute z-[70] left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-48 overflow-y-auto custom-scrollbar">
                                                {searchResults.map((cust) => (
                                                    <button
                                                        key={cust._id}
                                                        type="button"
                                                        onClick={() => selectCustomer(cust)}
                                                        className="w-full text-left px-3 py-2 hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors"
                                                    >
                                                        <div className="text-xs font-bold text-slate-900">{cust.name}</div>
                                                        <div className="text-[10px] text-slate-500">{cust.phone} • {cust.company}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleCustomerSearch}
                                        disabled={isSearching}
                                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-md text-xs font-medium transition-colors"
                                    >
                                        {isSearching ? '...' : 'Search'}
                                    </button>
                                </div>
                                {selectedCustomer && (
                                    <div className="mt-1 flex items-center gap-2 text-[10px] text-green-600 font-medium bg-green-50 px-2 py-1 rounded border border-green-100">
                                        <MdCheckCircle className="text-[14px]" />
                                        <span>Customer: {selectedCustomer.name} ({selectedCustomer.company})</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-end">
                                <button
                                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-primary text-primary hover:bg-blue-50 text-xs font-medium transition-colors"
                                    type="button"
                                    onClick={() => setIsAddCustomerModalOpen(true)}
                                >
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
                                        <div className="col-span-1 md:col-span-6 relative">
                                            <label className="md:hidden text-[10px] text-slate-500 mb-0.5 block">Product</label>
                                            <div className="relative">
                                                <input
                                                    className="w-full rounded-md border-slate-200 bg-white text-xs px-2.5 py-1.5 focus:ring-primary focus:border-primary"
                                                    placeholder="Search product..."
                                                    value={item.productName}
                                                    onChange={(e) => {
                                                        // Update name and clear ID to allow custom entry
                                                        setItems(items.map(i => {
                                                            if (i.id === item.id) {
                                                                return { ...i, productName: e.target.value, productId: '' };
                                                            }
                                                            return i;
                                                        }));
                                                        setActiveProductSearch(item.id);
                                                    }}
                                                    onFocus={() => setActiveProductSearch(item.id)}
                                                />

                                                {/* Product Search Results Dropdown */}
                                                {activeProductSearch === item.id && item.productName && (
                                                    <div className="absolute z-[70] left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-48 overflow-y-auto custom-scrollbar">
                                                        {products
                                                            .filter(p => p.name.toLowerCase().includes(item.productName.toLowerCase()))
                                                            .map((prod) => (
                                                                <button
                                                                    key={prod._id}
                                                                    type="button"
                                                                    onClick={() => handleProductSelect(item.id, prod)}
                                                                    className="w-full text-left px-3 py-2 hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors"
                                                                >
                                                                    <div className="text-xs font-bold text-slate-900">{prod.name}</div>
                                                                    <div className="text-[10px] text-slate-500">${prod.sellingPrice} • {prod.category}</div>
                                                                </button>
                                                            ))}
                                                    </div>
                                                )}
                                            </div>
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
                    </div>
                </div>

                <AddCustomerModal
                    isOpen={isAddCustomerModalOpen}
                    onClose={() => setIsAddCustomerModalOpen(false)}
                    onSuccess={(newCust) => {
                        setSelectedCustomer(newCust);
                        setCustomerSearch(newCust.phone);
                    }}
                />

                <div className="px-5 py-3 border-t border-slate-200 bg-white flex justify-end gap-2.5 rounded-b-xl flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-slate-200 text-slate-900 text-xs font-medium hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveOrder}
                        disabled={isSaving}
                        className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                    >
                        <MdSave className="text-[16px]" />
                        {isSaving ? 'Saving...' : 'Save Order'}
                    </button>
                </div>
            </div>
        </div>
    );
}

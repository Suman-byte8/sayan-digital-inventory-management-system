'use client';

import {
    MdChevronRight,
    MdPerson,
    MdInventory2,
    MdSearch,
    MdAdd,
    MdPrint,
    MdDelete,
    MdChat,
    MdReceiptLong,
    MdCheckCircle,
    MdPersonAdd,
    MdDownload,
    MdShare
} from 'react-icons/md';

import { useState, useEffect, useRef } from 'react';
import { fetchInvoices, fetchProducts, searchCustomerByPhone, createOrder, createInvoice } from '@/utils/api';
import { Product } from '@/components/InventoryTable';
import AddCustomerModal from '@/components/AddCustomerModal';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface InvoiceItem {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

export default function InvoicePage() {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [customerSearch, setCustomerSearch] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [items, setItems] = useState<InvoiceItem[]>([]);
    const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
    const [activeProductSearch, setActiveProductSearch] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const invoiceRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [invoicesData, productsData] = await Promise.all([
                fetchInvoices(),
                fetchProducts()
            ]);
            setInvoices(invoicesData);
            setProducts(productsData);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (customerSearch.length >= 3) {
                handleCustomerSearch();
            } else if (customerSearch.length === 0) {
                setSearchResults([]);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [customerSearch]);

    const handleCustomerSearch = async () => {
        if (!customerSearch) return;
        setIsSearching(true);
        try {
            const results = await searchCustomerByPhone(customerSearch);
            // Backend now returns empty array instead of 404
            setSearchResults(results);
        } catch (error) {
            console.error('Error searching customer:', error);
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

    const handleAddItem = () => {
        const newItem: InvoiceItem = {
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

    const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
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

    const handleDownloadPDF = async () => {
        if (!invoiceRef.current) return;

        try {
            const canvas = await html2canvas(invoiceRef.current, {
                scale: 2,
                logging: true,
                useCORS: true,
                allowTaint: true,
                onclone: (clonedDoc) => {
                    const elements = clonedDoc.getElementsByTagName('*');
                    for (let i = 0; i < elements.length; i++) {
                        const el = elements[i] as HTMLElement;
                        const style = window.getComputedStyle(el);

                        // Properties that might contain colors
                        const props = ['color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'outlineColor', 'fill', 'stroke'];

                        props.forEach(prop => {
                            const val = (el.style as any)[prop] || style.getPropertyValue(prop.replace(/([A-Z])/g, '-$1').toLowerCase());
                            if (val && (val.includes('lab(') || val.includes('oklch(') || val.includes('oklab('))) {
                                // Force a safe fallback
                                if (prop === 'backgroundColor' || prop === 'fill') {
                                    (el.style as any)[prop] = '#ffffff';
                                } else {
                                    (el.style as any)[prop] = '#334155'; // A nice slate-700 hex
                                }
                            }
                        });

                        // Disable transitions/animations
                        el.style.transition = 'none';
                        el.style.animation = 'none';
                    }
                }
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`invoice-${Date.now()}.pdf`);
        } catch (error: any) {
            console.error('Error generating PDF:', error);
            if (error instanceof Error) {
                console.error('Error Message:', error.message);
                console.error('Error Stack:', error.stack);
            }
            alert('Failed to generate PDF. Check console for details.');
        }
    };

    const handleWhatsAppShare = () => {
        if (!selectedCustomer || !selectedCustomer.phone) {
            alert('Please select a customer with a phone number');
            return;
        }

        const message = `Hi ${selectedCustomer.name}, here is your invoice for $${grandTotal.toFixed(2)}. Please find the attached PDF.`;
        const whatsappUrl = `https://wa.me/${selectedCustomer.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleClearForm = () => {
        if (window.confirm('Are you sure you want to clear the form?')) {
            setSelectedCustomer(null);
            setCustomerSearch('');
            setItems([]);
            setActiveProductSearch(null);
        }
    };

    const handleGenerateInvoice = async () => {
        if (!selectedCustomer) {
            alert('Please select a customer first');
            return;
        }
        if (items.length === 0) {
            alert('Please add at least one item');
            return;
        }
        const invalidItems = items.filter(item => !item.productName);
        if (invalidItems.length > 0) {
            alert('Please enter a product name for all items');
            return;
        }

        setIsGenerating(true);
        try {
            // 1. Create Order
            const orderData = {
                customer: selectedCustomer._id,
                products: items.map(item => ({
                    product: item.productId || undefined,
                    name: item.productName,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: grandTotal,
                status: 'pending',
                paymentStatus: 'unpaid',
                notes: 'Generated via Invoice Page'
            };
            const order = await createOrder(orderData);

            // 2. Create Invoice
            const invoiceData = {
                order: order._id,
                amount: grandTotal,
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Due in 7 days
            };
            await createInvoice(invoiceData);

            alert('Invoice generated successfully! Downloading PDF...');

            // 3. Auto-download PDF
            await handleDownloadPDF();

            // Note: Form data is intentionally NOT cleared here so user can continue editing or re-download
            loadData(); // Reload invoices list in background
        } catch (error) {
            console.error('Error generating invoice:', error);
            alert('Failed to generate invoice');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50">
            {/* Top Navigation / Breadcrumbs */}
            <header className="px-4 py-2 lg:px-6 border-b border-slate-200 bg-white">
                <div className="max-w-full mx-auto flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[10px]">
                        <a className="text-slate-500 hover:text-primary font-medium transition-colors" href="/">Home</a>
                        <MdChevronRight className="text-[12px] text-slate-400" />
                        <a className="text-slate-500 hover:text-primary font-medium transition-colors" href="/invoice">Invoices</a>
                        <MdChevronRight className="text-[12px] text-slate-400" />
                        <span className="text-primary font-medium">New Invoice</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold tracking-tight text-slate-900">New Invoice</h1>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] text-slate-500 font-medium">Auto-Generated ID</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <div className="flex-1 overflow-auto px-4 py-4 lg:px-6 w-full">
                <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
                    {/* Left Column: Input Zone */}
                    <div className="lg:col-span-5 flex flex-col gap-3">
                        {/* Customer Section */}
                        <section className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                            <h2 className="text-sm font-bold mb-3 flex items-center gap-2 text-slate-900">
                                <MdPerson className="text-primary text-[18px]" />
                                Customer Details
                            </h2>

                            <div className="flex flex-col gap-3">
                                <div className="relative">
                                    <label className="text-[10px] font-medium text-slate-700 mb-0.5 block">Search Customer (Phone)</label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <input
                                                className="w-full rounded border-slate-300 bg-slate-50 text-slate-900 focus:border-primary focus:ring-primary h-8 px-2 text-[10px]"
                                                placeholder="Enter phone number..."
                                                value={customerSearch}
                                                onChange={(e) => {
                                                    setCustomerSearch(e.target.value);
                                                }}
                                            />
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
                                            onClick={handleCustomerSearch}
                                            disabled={isSearching}
                                            className="px-3 h-8 bg-slate-100 hover:bg-slate-200 rounded text-[10px] font-medium transition-colors"
                                        >
                                            {isSearching ? '...' : 'Search'}
                                        </button>
                                    </div>
                                </div>

                                {selectedCustomer ? (
                                    <div className="bg-green-50 border border-green-100 rounded p-2">
                                        <div className="flex items-center gap-2 text-green-700 font-bold text-xs mb-1">
                                            <MdCheckCircle />
                                            {selectedCustomer.name}
                                        </div>
                                        <p className="text-[10px] text-slate-600">{selectedCustomer.email}</p>
                                        <p className="text-[10px] text-slate-600">{selectedCustomer.phone}</p>
                                        <p className="text-[10px] text-slate-600">{selectedCustomer.address}</p>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsAddCustomerModalOpen(true)}
                                        className="w-full h-8 border border-dashed border-slate-300 rounded text-slate-500 hover:text-primary hover:border-primary hover:bg-slate-50 text-[10px] font-medium flex items-center justify-center gap-1 transition-colors"
                                    >
                                        <MdPersonAdd /> Add New Customer
                                    </button>
                                )}
                            </div>
                        </section>

                        {/* Product Entry Section */}
                        <section className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-sm font-bold flex items-center gap-2 text-slate-900">
                                    <MdInventory2 className="text-primary text-[18px]" />
                                    Add Products
                                </h2>
                                <button
                                    onClick={handleAddItem}
                                    className="text-[10px] text-primary font-bold hover:underline flex items-center gap-1"
                                >
                                    <MdAdd /> Add Item
                                </button>
                            </div>

                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="bg-slate-50 p-2 rounded border border-slate-200 relative group">
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="absolute top-1 right-1 text-slate-400 hover:text-red-500 p-1"
                                        >
                                            <MdDelete />
                                        </button>
                                        <div className="grid grid-cols-12 gap-2">
                                            <div className="col-span-12 relative">
                                                <label className="text-[9px] font-medium text-slate-500 block mb-0.5">Product</label>
                                                <input
                                                    className="w-full rounded border border-slate-200 bg-white text-xs px-2 py-1 focus:ring-primary focus:border-primary"
                                                    placeholder="Search or enter product..."
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
                                                {activeProductSearch === item.id && item.productName && (
                                                    <div className="absolute z-[60] left-0 right-0 mt-1 bg-white border border-slate-200 rounded shadow-lg max-h-32 overflow-y-auto custom-scrollbar">
                                                        {products
                                                            .filter(p => p.name.toLowerCase().includes(item.productName.toLowerCase()))
                                                            .map((prod) => (
                                                                <button
                                                                    key={prod._id}
                                                                    onClick={() => handleProductSelect(item.id, prod)}
                                                                    className="w-full text-left px-2 py-1.5 hover:bg-slate-50 border-b border-slate-100 last:border-0 text-[10px]"
                                                                >
                                                                    <div className="font-bold text-slate-900">{prod.name}</div>
                                                                    <div className="text-slate-500">${prod.sellingPrice}</div>
                                                                </button>
                                                            ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-span-4">
                                                <label className="text-[9px] font-medium text-slate-500 block mb-0.5">Qty</label>
                                                <input
                                                    type="number"
                                                    className="w-full rounded border-slate-200 bg-white text-xs px-2 py-1 text-right"
                                                    value={item.quantity}
                                                    onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                                                />
                                            </div>
                                            <div className="col-span-4">
                                                <label className="text-[9px] font-medium text-slate-500 block mb-0.5">Price</label>
                                                <input
                                                    type="number"
                                                    className="w-full rounded border-slate-200 bg-white text-xs px-2 py-1 text-right"
                                                    value={item.price}
                                                    onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                                                />
                                            </div>
                                            <div className="col-span-4 text-right">
                                                <label className="text-[9px] font-medium text-slate-500 block mb-0.5">Total</label>
                                                <div className="text-xs font-bold text-slate-900 py-1">
                                                    ${(item.quantity * item.price).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {items.length === 0 && (
                                    <div className="text-center py-4 text-[10px] text-slate-400 italic">
                                        No items added. Click "Add Item" to start.
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Preview Zone */}
                    <div className="lg:col-span-7 flex flex-col h-full">
                        {/* Invoice Paper Container */}
                        <div
                            ref={invoiceRef}
                            className="pdf-safe bg-white rounded-lg shadow-lg border border-slate-200 flex flex-col grow relative overflow-hidden"
                        >


                            {/* Top Decorative Bar */}
                            <div className="h-1 w-full bg-primary"></div>
                            <div className="p-5 flex-1 flex flex-col">
                                {/* Invoice Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <div className="w-7 h-7 rounded bg-primary flex items-center justify-center text-white">
                                                <MdPrint className="text-[16px]" />
                                            </div>
                                            <span className="text-base font-bold tracking-tight text-slate-900">Sayan Digital</span>
                                        </div>
                                        <p className="text-[10px] text-slate-500">123 Printing Press Lane<br />New York, NY 10012<br />contact@Sayan Digital.com</p>
                                    </div>
                                    <div className="text-right">
                                        <h3 className="text-xl font-bold text-slate-900 mb-0.5">INVOICE</h3>
                                        <p className="text-[10px] text-primary font-medium">#DRAFT</p>
                                        <p className="text-[10px] text-slate-500 mt-0.5">Date: {new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>
                                {/* Bill To Section */}
                                <div className="mb-5 p-2.5 bg-slate-50 rounded border border-slate-100 min-h-[80px]">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Bill To</p>
                                    {selectedCustomer ? (
                                        <>
                                            <h4 className="text-xs font-bold text-slate-900">{selectedCustomer.name}</h4>
                                            <p className="text-[10px] text-slate-600">{selectedCustomer.email}</p>
                                            <p className="text-[10px] text-slate-600">{selectedCustomer.phone}</p>
                                            <p className="text-[10px] text-slate-600">{selectedCustomer.address}</p>
                                        </>
                                    ) : (
                                        <p className="text-[10px] text-slate-400 italic">Select a customer to view details</p>
                                    )}
                                </div>
                                {/* Items Table */}
                                <div className="overflow-x-auto mb-5">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-200">
                                                <th className="py-1.5 px-2 text-[9px] font-semibold text-slate-500 uppercase tracking-wider w-1/2">Item Description</th>
                                                <th className="py-1.5 px-2 text-[9px] font-semibold text-slate-500 uppercase tracking-wider text-right">Qty</th>
                                                <th className="py-1.5 px-2 text-[9px] font-semibold text-slate-500 uppercase tracking-wider text-right">Rate</th>
                                                <th className="py-1.5 px-2 text-[9px] font-semibold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-[10px] text-slate-700">
                                            {items.length > 0 ? (
                                                items.map((item) => (
                                                    <tr key={item.id} className="border-b border-slate-100 last:border-0">
                                                        <td className="py-2 px-2">{item.productName || 'New Item'}</td>
                                                        <td className="py-2 px-2 text-right">{item.quantity}</td>
                                                        <td className="py-2 px-2 text-right">${item.price.toFixed(2)}</td>
                                                        <td className="py-2 px-2 text-right font-medium">${(item.quantity * item.price).toFixed(2)}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr className="border-b border-slate-100">
                                                    <td colSpan={4} className="py-4 text-center text-slate-400 italic">
                                                        No items added yet
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {/* Summary Block */}
                                <div className="mt-auto flex justify-end">
                                    <div className="w-full max-w-[200px] space-y-1.5">
                                        <div className="flex justify-between text-[10px] text-slate-600">
                                            <span>Subtotal</span>
                                            <span className="font-medium tabular-nums">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-[10px] text-slate-600">
                                            <span>Tax (10%)</span>
                                            <span className="font-medium tabular-nums">${tax.toFixed(2)}</span>
                                        </div>
                                        <div className="pt-1.5 border-t border-slate-200 flex justify-between items-center">
                                            <span className="text-xs font-bold text-slate-900">Grand Total</span>
                                            <span className="text-sm font-bold text-primary tabular-nums">${grandTotal.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Sticky Action Bar */}
                            <div className="bg-slate-50 border-t border-slate-200 p-2.5 px-5 flex flex-wrap gap-2 items-center justify-between no-print">
                                <button
                                    onClick={handleClearForm}
                                    className="text-[10px] font-medium text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
                                >
                                    <MdDelete className="text-[14px]" /> Clear Form
                                </button>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleWhatsAppShare}
                                        className="h-8 px-3 rounded border border-green-600 text-green-700 hover:bg-green-50 font-medium text-[10px] flex items-center gap-1.5 transition-colors"
                                    >
                                        <MdShare className="text-[14px]" />
                                        WhatsApp
                                    </button>
                                    <button
                                        onClick={handleGenerateInvoice}
                                        disabled={isGenerating}
                                        className="h-8 px-4 rounded bg-primary hover:bg-blue-700 text-white font-medium text-[10px] shadow-sm flex items-center gap-1.5 transition-colors disabled:opacity-50"
                                    >
                                        <MdReceiptLong className="text-[14px]" />
                                        {isGenerating ? 'Generating...' : 'Generate & Download'}
                                    </button>
                                </div>
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
        </main>
    );
}

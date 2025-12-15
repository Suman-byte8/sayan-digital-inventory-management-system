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
    MdReceiptLong
} from 'react-icons/md';

export default function InvoicePage() {
    return (
        <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50">
            {/* Top Navigation / Breadcrumbs */}
            <header className="px-4 py-2 lg:px-6 border-b border-slate-200 bg-white">
                <div className="max-w-full mx-auto flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[10px]">
                        <a className="text-slate-500 hover:text-primary font-medium transition-colors" href="#">Home</a>
                        <MdChevronRight className="text-[12px] text-slate-400" />
                        <a className="text-slate-500 hover:text-primary font-medium transition-colors" href="#">Invoices</a>
                        <MdChevronRight className="text-[12px] text-slate-400" />
                        <span className="text-primary font-medium">New Invoice</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold tracking-tight text-slate-900">New Invoice</h1>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] text-slate-500 font-medium">Order #INV-2023-001</span>
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
                            {/* Tabs */}
                            <div className="mb-3 border-b border-slate-200">
                                <div className="flex gap-4">
                                    <button className="pb-2 border-b-2 border-transparent text-slate-500 hover:text-slate-700 font-medium text-[10px] transition-colors">
                                        Existing Customer
                                    </button>
                                    <button className="pb-2 border-b-2 border-primary text-primary font-bold text-[10px]">
                                        New Customer
                                    </button>
                                </div>
                            </div>
                            {/* Form Inputs */}
                            <div className="space-y-2.5">
                                <label className="block">
                                    <span className="text-[10px] font-medium text-slate-700 mb-0.5 block">Full Name</span>
                                    <input className="w-full rounded border-slate-300 bg-slate-50 text-slate-900 focus:border-primary focus:ring-primary h-8 px-2 text-[10px]" placeholder="e.g. Acme Printing Co." type="text" />
                                </label>
                                <div className="grid grid-cols-2 gap-2.5">
                                    <label className="block">
                                        <span className="text-[10px] font-medium text-slate-700 mb-0.5 block">WhatsApp / Phone</span>
                                        <input className="w-full rounded border-slate-300 bg-slate-50 text-slate-900 focus:border-primary focus:ring-primary h-8 px-2 text-[10px]" placeholder="+1 (555) 000-0000" type="tel" />
                                    </label>
                                    <label className="block">
                                        <span className="text-[10px] font-medium text-slate-700 mb-0.5 block">Email</span>
                                        <input className="w-full rounded border-slate-300 bg-slate-50 text-slate-900 focus:border-primary focus:ring-primary h-8 px-2 text-[10px]" placeholder="billing@acme.com" type="email" />
                                    </label>
                                </div>
                                <label className="block">
                                    <span className="text-[10px] font-medium text-slate-700 mb-0.5 block">Billing Address</span>
                                    <textarea className="w-full rounded border-slate-300 bg-slate-50 text-slate-900 focus:border-primary focus:ring-primary min-h-[50px] p-2 text-[10px] resize-none" placeholder="123 Main St, City, Country"></textarea>
                                </label>
                            </div>
                        </section>
                        {/* Product Entry Section */}
                        <section className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
                            <h2 className="text-sm font-bold mb-3 flex items-center gap-2 text-slate-900">
                                <MdInventory2 className="text-primary text-[18px]" />
                                Add Products
                            </h2>
                            <div className="space-y-2.5">
                                <label className="block relative">
                                    <span className="text-[10px] font-medium text-slate-700 mb-0.5 block">Search Inventory</span>
                                    <MdSearch className="absolute left-2.5 top-[26px] text-slate-400 text-[14px]" />
                                    <input className="w-full rounded border-slate-300 bg-slate-50 text-slate-900 focus:border-primary focus:ring-primary h-8 pl-8 pr-2 text-[10px]" placeholder="Type to search (e.g., 'A4 Paper')..." type="text" />
                                </label>
                                <div className="grid grid-cols-12 gap-2.5">
                                    <div className="col-span-4">
                                        <label className="block">
                                            <span className="text-[10px] font-medium text-slate-700 mb-0.5 block">Qty</span>
                                            <input className="w-full rounded border-slate-300 bg-slate-50 text-slate-900 focus:border-primary focus:ring-primary h-8 px-2 text-[10px]" type="number" defaultValue="1" />
                                        </label>
                                    </div>
                                    <div className="col-span-4">
                                        <label className="block">
                                            <span className="text-[10px] font-medium text-slate-700 mb-0.5 block">Price</span>
                                            <div className="relative">
                                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-[10px]">$</span>
                                                <input className="w-full rounded border-slate-300 bg-slate-50 text-slate-900 focus:border-primary focus:ring-primary h-8 pl-5 pr-2 text-[10px]" type="number" defaultValue="0.00" />
                                            </div>
                                        </label>
                                    </div>
                                    <div className="col-span-4 flex items-end">
                                        <button className="w-full h-8 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded flex items-center justify-center gap-1.5 transition-colors border border-primary/20 text-[10px]">
                                            <MdAdd className="text-[14px]" /> Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    {/* Right Column: Preview Zone */}
                    <div className="lg:col-span-7 flex flex-col h-full">
                        {/* Invoice Paper Container */}
                        <div className="bg-white rounded-lg shadow-lg border border-slate-200 flex flex-col grow relative overflow-hidden">
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
                                        <p className="text-[10px] text-primary font-medium">#INV-2023-001</p>
                                        <p className="text-[10px] text-slate-500 mt-0.5">Date: Oct 24, 2023</p>
                                    </div>
                                </div>
                                {/* Bill To Section */}
                                <div className="mb-5 p-2.5 bg-slate-50 rounded border border-slate-100">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Bill To</p>
                                    <h4 className="text-xs font-bold text-slate-900">Acme Printing Co.</h4>
                                    <p className="text-[10px] text-slate-600">billing@acme.com</p>
                                    <p className="text-[10px] text-slate-600">+1 (555) 000-0000</p>
                                    <p className="text-[10px] text-slate-600">123 Main St, City, Country</p>
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
                                                <th className="py-1.5 px-2 w-6"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-[10px] text-slate-700">
                                            {/* Item 1 */}
                                            <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                                                <td className="py-2.5 px-2">
                                                    <p className="font-medium text-slate-900">Premium Glossy Paper (A4)</p>
                                                    <p className="text-[9px] text-slate-500">500 sheets pack</p>
                                                </td>
                                                <td className="py-2.5 px-2 text-right tabular-nums">2</td>
                                                <td className="py-2.5 px-2 text-right tabular-nums">$15.00</td>
                                                <td className="py-2.5 px-2 text-right font-medium tabular-nums">$30.00</td>
                                                <td className="py-2.5 px-2 text-center">
                                                    <button className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                                        <MdDelete className="text-[14px]" />
                                                    </button>
                                                </td>
                                            </tr>
                                            {/* Item 2 */}
                                            <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                                                <td className="py-2.5 px-2">
                                                    <p className="font-medium text-slate-900">Business Cards Printing</p>
                                                    <p className="text-[9px] text-slate-500">Matte Finish, Double Sided</p>
                                                </td>
                                                <td className="py-2.5 px-2 text-right tabular-nums">1000</td>
                                                <td className="py-2.5 px-2 text-right tabular-nums">$0.08</td>
                                                <td className="py-2.5 px-2 text-right font-medium tabular-nums">$80.00</td>
                                                <td className="py-2.5 px-2 text-center">
                                                    <button className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                                        <MdDelete className="text-[14px]" />
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {/* Summary Block */}
                                <div className="mt-auto flex justify-end">
                                    <div className="w-full max-w-[200px] space-y-1.5">
                                        <div className="flex justify-between text-[10px] text-slate-600">
                                            <span>Subtotal</span>
                                            <span className="font-medium tabular-nums">$110.00</span>
                                        </div>
                                        <div className="flex justify-between text-[10px] text-slate-600">
                                            <span>Tax (10%)</span>
                                            <span className="font-medium tabular-nums">$11.00</span>
                                        </div>
                                        <div className="pt-1.5 border-t border-slate-200 flex justify-between items-center">
                                            <span className="text-xs font-bold text-slate-900">Grand Total</span>
                                            <span className="text-sm font-bold text-primary tabular-nums">$121.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Sticky Action Bar */}
                            <div className="bg-slate-50 border-t border-slate-200 p-2.5 px-5 flex flex-wrap gap-2 items-center justify-between">
                                <button className="text-[10px] font-medium text-slate-500 hover:text-slate-800 transition-colors">
                                    Save as Draft
                                </button>
                                <div className="flex gap-2">
                                    <button className="h-8 px-3 rounded border border-green-600 text-green-700 hover:bg-green-50 font-medium text-[10px] flex items-center gap-1.5 transition-colors">
                                        <MdChat className="text-[14px]" />
                                        WhatsApp
                                    </button>
                                    <button className="h-8 px-4 rounded bg-primary hover:bg-blue-700 text-white font-medium text-[10px] shadow-sm flex items-center gap-1.5 transition-colors">
                                        <MdReceiptLong className="text-[14px]" />
                                        Generate Invoice
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

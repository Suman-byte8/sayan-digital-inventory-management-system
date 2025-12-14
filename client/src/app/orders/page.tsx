'use client';

import { useState } from 'react';
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
                                <p className="text-slate-900 text-2xl font-bold">12</p>
                                <span className="text-emerald-600 text-[10px] font-medium bg-emerald-100 px-1.5 py-0.5 rounded">+4%</span>
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
                                <p className="text-slate-900 text-2xl font-bold">8</p>
                                <span className="text-emerald-600 text-[10px] font-medium bg-emerald-100 px-1.5 py-0.5 rounded">+12%</span>
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
                                <p className="text-slate-900 text-2xl font-bold">$2,450</p>
                                <span className="text-emerald-600 text-[10px] font-medium bg-emerald-100 px-1.5 py-0.5 rounded">+8%</span>
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
                                    {/* Row 1 */}
                                    <tr className="hover:bg-slate-50 transition-colors group">
                                        <td className="p-2.5">
                                            <input className="rounded border-gray-300 text-primary focus:ring-primary bg-white h-3.5 w-3.5" type="checkbox" />
                                        </td>
                                        <td className="p-2.5">
                                            <a className="text-xs font-semibold text-primary hover:underline" href="#">#ORD-7829</a>
                                        </td>
                                        <td className="p-2.5">
                                            <div className="flex items-center gap-2">
                                                <div className="size-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">AC</div>
                                                <span className="text-xs font-medium text-slate-900">Acme Corp</span>
                                            </div>
                                        </td>
                                        <td className="p-2.5 text-xs text-slate-500">
                                            500x Business Cards
                                            <span className="block text-[10px] text-slate-500">Matte Finish</span>
                                        </td>
                                        <td className="p-2.5 text-xs text-slate-500">Oct 24, 2023</td>
                                        <td className="p-2.5 text-xs font-semibold text-slate-900 text-right">$120.00</td>
                                        <td className="p-2.5">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-800">
                                                In Production
                                            </span>
                                        </td>
                                        <td className="p-2.5">
                                            <button className="text-slate-500 hover:text-slate-900 p-1 rounded hover:bg-slate-100">
                                                <MdMoreVert className="text-[16px]" />
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Row 2 */}
                                    <tr className="hover:bg-slate-50 transition-colors group">
                                        <td className="p-2.5">
                                            <input className="rounded border-gray-300 text-primary focus:ring-primary bg-white h-3.5 w-3.5" type="checkbox" />
                                        </td>
                                        <td className="p-2.5">
                                            <a className="text-xs font-semibold text-primary hover:underline" href="#">#ORD-7828</a>
                                        </td>
                                        <td className="p-2.5">
                                            <div className="flex items-center gap-2">
                                                <div className="bg-center bg-no-repeat bg-cover rounded-full size-6" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCGgcn3V_A3CjCT7g9u4_t3ELVALBONJ4Zwh_oZSH4HNou3nQYScUHda-EO-RWkxtDBcozKSYB74gDlL3Zf2faRkFPLo8GyHhSTBR-DzwVZO3_iF36RZwR9_3ZZB35rSeU1pC98HcgZpuKMumQGkfHc9lg8g4-6p3Ih-HIx4AYkT0eMe_sB0_SiWUgaixBFTHKV3c4GGfN_8QAUFfzDGtdWkCVwawbI4x84rjkNyixH9kzdr9XZxgN2gR5nEqwvJOiAJB4DPRXMPVo")' }}></div>
                                                <span className="text-xs font-medium text-slate-900">Sarah Jenkins</span>
                                            </div>
                                        </td>
                                        <td className="p-2.5 text-xs text-slate-500">
                                            20x A3 Posters
                                            <span className="block text-[10px] text-slate-500">Glossy</span>
                                        </td>
                                        <td className="p-2.5 text-xs text-slate-500">Oct 23, 2023</td>
                                        <td className="p-2.5 text-xs font-semibold text-slate-900 text-right">$85.50</td>
                                        <td className="p-2.5">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-800">
                                                Ready for Pickup
                                            </span>
                                        </td>
                                        <td className="p-2.5">
                                            <button className="text-slate-500 hover:text-slate-900 p-1 rounded hover:bg-slate-100">
                                                <MdMoreVert className="text-[16px]" />
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Row 3 */}
                                    <tr className="hover:bg-slate-50 transition-colors group">
                                        <td className="p-2.5">
                                            <input className="rounded border-gray-300 text-primary focus:ring-primary bg-white h-3.5 w-3.5" type="checkbox" />
                                        </td>
                                        <td className="p-2.5">
                                            <a className="text-xs font-semibold text-primary hover:underline" href="#">#ORD-7827</a>
                                        </td>
                                        <td className="p-2.5">
                                            <div className="flex items-center gap-2">
                                                <div className="size-6 rounded-full bg-purple-200 flex items-center justify-center text-[10px] font-bold text-purple-700">TS</div>
                                                <span className="text-xs font-medium text-slate-900">TechSolutions Inc.</span>
                                            </div>
                                        </td>
                                        <td className="p-2.5 text-xs text-slate-500">
                                            1000x Flyers
                                            <span className="block text-[10px] text-slate-500">Double Sided</span>
                                        </td>
                                        <td className="p-2.5 text-xs text-slate-500">Oct 23, 2023</td>
                                        <td className="p-2.5 text-xs font-semibold text-slate-900 text-right">$350.00</td>
                                        <td className="p-2.5">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-orange-100 text-orange-800">
                                                Pending Payment
                                            </span>
                                        </td>
                                        <td className="p-2.5">
                                            <button className="text-slate-500 hover:text-slate-900 p-1 rounded hover:bg-slate-100">
                                                <MdMoreVert className="text-[16px]" />
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Row 4 */}
                                    <tr className="hover:bg-slate-50 transition-colors group">
                                        <td className="p-2.5">
                                            <input className="rounded border-gray-300 text-primary focus:ring-primary bg-white h-3.5 w-3.5" type="checkbox" />
                                        </td>
                                        <td className="p-2.5">
                                            <a className="text-xs font-semibold text-primary hover:underline" href="#">#ORD-7826</a>
                                        </td>
                                        <td className="p-2.5">
                                            <div className="flex items-center gap-2">
                                                <div className="bg-center bg-no-repeat bg-cover rounded-full size-6" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCrsxiAa0b55f62O5N0GBJFTwYx7JE7nUy_1ZJ-c-k_Qmi-CxtIcwJ5g133hrJkHFjBp1v-y80i9QuBlNP_gGzlrx5J09QbrIqlH04oRlb4mukTLV9DMtKT3Rkw41IZjia9guLONNl-OZhZnZ-cD80bTK2FvxP7WyoLNsz4eDlaacn8dFh3Gt-8KVbt2ok-xGo4ZofpRS7CxyO4lgQaFbg647OhLMnbtdoy4l0-Rburxvk8JcfbkbERbTrE9ZfOo2ZZhHLByUsdzEs")' }}></div>
                                                <span className="text-xs font-medium text-slate-900">Michael Brown</span>
                                            </div>
                                        </td>
                                        <td className="p-2.5 text-xs text-slate-500">
                                            Custom Banner (5x2ft)
                                            <span className="block text-[10px] text-slate-500">Vinyl</span>
                                        </td>
                                        <td className="p-2.5 text-xs text-slate-500">Oct 22, 2023</td>
                                        <td className="p-2.5 text-xs font-semibold text-slate-900 text-right">$65.00</td>
                                        <td className="p-2.5">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800">
                                                Cancelled
                                            </span>
                                        </td>
                                        <td className="p-2.5">
                                            <button className="text-slate-500 hover:text-slate-900 p-1 rounded hover:bg-slate-100">
                                                <MdMoreVert className="text-[16px]" />
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Row 5 */}
                                    <tr className="hover:bg-slate-50 transition-colors group">
                                        <td className="p-2.5">
                                            <input className="rounded border-gray-300 text-primary focus:ring-primary bg-white h-3.5 w-3.5" type="checkbox" />
                                        </td>
                                        <td className="p-2.5">
                                            <a className="text-xs font-semibold text-primary hover:underline" href="#">#ORD-7825</a>
                                        </td>
                                        <td className="p-2.5">
                                            <div className="flex items-center gap-2">
                                                <div className="size-6 rounded-full bg-pink-200 flex items-center justify-center text-[10px] font-bold text-pink-700">BA</div>
                                                <span className="text-xs font-medium text-slate-900">Bakery Delight</span>
                                            </div>
                                        </td>
                                        <td className="p-2.5 text-xs text-slate-500">
                                            200x Menus
                                            <span className="block text-[10px] text-slate-500">Laminated</span>
                                        </td>
                                        <td className="p-2.5 text-xs text-slate-500">Oct 21, 2023</td>
                                        <td className="p-2.5 text-xs font-semibold text-slate-900 text-right">$210.00</td>
                                        <td className="p-2.5">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-800">
                                                Completed
                                            </span>
                                        </td>
                                        <td className="p-2.5">
                                            <button className="text-slate-500 hover:text-slate-900 p-1 rounded hover:bg-slate-100">
                                                <MdMoreVert className="text-[16px]" />
                                            </button>
                                        </td>
                                    </tr>
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

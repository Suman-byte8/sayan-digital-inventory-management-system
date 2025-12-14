'use client';

import { useState } from 'react';
import {
    MdChevronRight,
    MdAdd,
    MdSearch,
    MdKeyboardArrowDown,
    MdChat,
    MdMoreVert,
    MdPersonAdd,
    MdClose,
    MdPerson,
    MdCall,
    MdCheckCircle,
    MdPending,
    MdSave
} from 'react-icons/md';

export default function CustomersPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
            <div className="flex-none px-8 pt-8 pb-4 flex flex-col gap-6">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <a className="hover:text-primary transition-colors font-medium" href="#">Home</a>
                    <MdChevronRight className="text-[16px] text-slate-400" />
                    <span className="font-medium text-slate-900">Customers Directory</span>
                </div>
                <div className="flex flex-wrap justify-between items-end gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-black tracking-tight text-slate-900">Customers Directory</h1>
                        <p className="text-slate-500 text-base">Manage your client base and view payment status.</p>
                    </div>
                    <button
                        className="bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all active:scale-95"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <MdAdd className="text-[20px]" />
                        Add New Customer
                    </button>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-slate-200 mt-2">
                    <div className="relative w-full max-w-lg">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            <MdSearch className="text-[20px]" />
                        </span>
                        <input
                            className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                            placeholder="Search customers by name, email, or company..."
                            type="text"
                        />
                    </div>
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-primary/50 transition-colors whitespace-nowrap">
                            Status: Due & Paid
                            <MdKeyboardArrowDown className="text-[18px]" />
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-primary/50 transition-colors whitespace-nowrap">
                            Spent: High to Low
                            <MdKeyboardArrowDown className="text-[18px]" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-auto px-8 pb-4">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-w-[900px]">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10 backdrop-blur-sm">
                            <tr>
                                <th className="p-4 w-12 text-center">
                                    <input className="rounded border-slate-300 bg-white text-primary focus:ring-primary h-4 w-4 transition duration-150 ease-in-out" type="checkbox" />
                                </th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact Info</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Order</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Due</th>
                                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment Status</th>
                                <th className="p-4 w-48 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr className="group bg-red-50/60 hover:bg-red-100/60 transition-colors cursor-pointer">
                                <td className="p-4 text-center">
                                    <input className="rounded border-slate-300 bg-white text-primary focus:ring-primary h-4 w-4 transition duration-150 ease-in-out" type="checkbox" />
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-cover bg-center shadow-sm" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCowbVcx9MoXZD1wjYypNjND7J3Std6z9B4Yq2KJp791SKdwaofKUg5BUf9knMtDEhXlwY9YNaO7dpBxqDosFkS4obiZzwKuI8dGCr0-pdnzVfTQVEGmYPuxl5HGp6YI4prM-4yBbYcZeY2Q7NEP0WExsPfNAJshEORpOzkEjgXuNR-aGkmkbbXoE7Oxahcy-YgnGKzkJd1sqhNwuunlOHJ2OMrtvRbCizpJg4BXMldFCyTtrwsuo4nQSn0NJmRvoDqpPeU9Hn-1nQ')" }}></div>
                                        <div>
                                            <p className="font-semibold text-slate-900 group-hover:text-primary transition-colors">Alice Johnson</p>
                                            <p className="text-sm text-slate-500">Creative Print Co.</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-slate-700 font-medium">alice@creativeprint.com</span>
                                        <span className="text-xs text-slate-500">+1 (555) 012-3456</span>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-slate-600">Oct 24, 2023</td>
                                <td className="p-4 font-bold text-red-600">$4,250.00</td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                                        Due
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-md text-xs font-bold border border-green-200 transition-colors shadow-sm" title="Send WhatsApp Reminder">
                                            <MdChat className="text-[16px]" />
                                            Reminder
                                        </button>
                                        <button className="p-1.5 rounded-md hover:bg-slate-200/50 text-slate-400 hover:text-slate-600 transition-colors">
                                            <MdMoreVert className="text-[20px]" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="group hover:bg-blue-50/50 transition-colors cursor-pointer">
                                <td className="p-4 text-center">
                                    <input className="rounded border-slate-300 bg-white text-primary focus:ring-primary h-4 w-4 transition duration-150 ease-in-out" type="checkbox" />
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-cover bg-center shadow-sm" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVtWNKDzEGw_BZ2vXlwpxU-zPabX15eL7O7iMv4oEdP7DtiFkH6yxSPS2p_iQdvnu2syy0Faeell9y5hb4Jb6CqE-aVvX5nw6rYwZ7sJ71a8uqJ66J1yIktUeg5zI72KzLQRR4grOe3w1DGE-fyGYGqH2uqD4jEF8eGGdLT1XV50kc7ApHdtVdorpWF9kIQ-Gm3jC02Ru2yytFZ9Cz06u4UINCbRXQ5AunX3SrAaChKVLNA9BkazTeYnXNgf_dL5ulhSuNzK6pFFE')" }}></div>
                                        <div>
                                            <p className="font-semibold text-slate-900 group-hover:text-primary transition-colors">Marcus Chen</p>
                                            <p className="text-sm text-slate-500">TechFlow Inc.</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-slate-700 font-medium">m.chen@techflow.io</span>
                                        <span className="text-xs text-slate-500">+1 (555) 987-6543</span>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-slate-600">Nov 02, 2023</td>
                                <td className="p-4 font-bold text-slate-900">$0.00</td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                                        Paid
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-1.5 rounded-md hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors">
                                            <MdMoreVert className="text-[20px]" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="group bg-red-50/60 hover:bg-red-100/60 transition-colors cursor-pointer">
                                <td className="p-4 text-center">
                                    <input className="rounded border-slate-300 bg-white text-primary focus:ring-primary h-4 w-4 transition duration-150 ease-in-out" type="checkbox" />
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm shadow-sm">
                                            JD
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900 group-hover:text-primary transition-colors">John Doe</p>
                                            <p className="text-sm text-slate-500">Freelance</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-slate-700 font-medium">john.doe@gmail.com</span>
                                        <span className="text-xs text-slate-500">+1 (555) 111-2222</span>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-slate-600">Aug 15, 2023</td>
                                <td className="p-4 font-bold text-red-600">$150.00</td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                                        Due
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-md text-xs font-bold border border-green-200 transition-colors shadow-sm" title="Send WhatsApp Reminder">
                                            <MdChat className="text-[16px]" />
                                            Reminder
                                        </button>
                                        <button className="p-1.5 rounded-md hover:bg-slate-200/50 text-slate-400 hover:text-slate-600 transition-colors">
                                            <MdMoreVert className="text-[20px]" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="group hover:bg-blue-50/50 transition-colors cursor-pointer">
                                <td className="p-4 text-center">
                                    <input className="rounded border-slate-300 bg-white text-primary focus:ring-primary h-4 w-4 transition duration-150 ease-in-out" type="checkbox" />
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-cover bg-center shadow-sm" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAjgI3X7bSmO8-0TiFwpk3FvZ9GTbsw-WlAvctI83dX_rtAYtOOtehikqumgPCEmh0kWPH5Y05MbhS2-aoCCgEKwr2cZSHDT-u6Uj_i_0ef-8nmra4gtNih8VLVUcsb5qQhSlCZsXPn7nfjJBC9MRjpBeITpIAIAimbts036RlZPxNDp7jbifer3LqRpNnjeLAB_mN0Xu0bhpsJQ8fzMLe5Z6S1Mwh2UzP8Qu0DCEIkII1--cq-S-zomkIzn3vvmhmFdSDRlxiU-J4')" }}></div>
                                        <div>
                                            <p className="font-semibold text-slate-900 group-hover:text-primary transition-colors">Sarah Wilson</p>
                                            <p className="text-sm text-slate-500">Wilson Design</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-slate-700 font-medium">sarah@wilsondesign.com</span>
                                        <span className="text-xs text-slate-500">+1 (555) 333-4444</span>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-slate-600">Oct 30, 2023</td>
                                <td className="p-4 font-bold text-slate-900">$0.00</td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                                        Paid
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-1.5 rounded-md hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors">
                                            <MdMoreVert className="text-[20px]" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="group hover:bg-blue-50/50 transition-colors cursor-pointer">
                                <td className="p-4 text-center">
                                    <input className="rounded border-slate-300 bg-white text-primary focus:ring-primary h-4 w-4 transition duration-150 ease-in-out" type="checkbox" />
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-cover bg-center shadow-sm" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAWCv4ct-TQ-dSetWv3OvNprDBWnYa0W4nNkGEtr6IqmZD9JliFM27A5m6XD9N9AT_HysFEgZX64xq1uzMtvTOvHrmBjVO2Fuls7YTykRXi4GhLgGgCfxObMh_BPPdy_h5DoKnD3IQvOT67iIcUNfNZVLNo17hGIvYpadCB7ibApwT0eJpWCHWP8xCBpdkx6zsnHdFAUk4jU8tyh4_hqcbPqgAL3g4eKIc_5h4ympEcEV7h7GHi6c19Q_a9nQ9PmEXsgnEBBZNyILk')" }}></div>
                                        <div>
                                            <p className="font-semibold text-slate-900 group-hover:text-primary transition-colors">David Kim</p>
                                            <p className="text-sm text-slate-500">NextGen Solutions</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-slate-700 font-medium">david.k@nextgen.com</span>
                                        <span className="text-xs text-slate-500">+1 (555) 777-8888</span>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-slate-600">Sep 12, 2023</td>
                                <td className="p-4 font-bold text-slate-900">$0.00</td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                                        Paid
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-1.5 rounded-md hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors">
                                            <MdMoreVert className="text-[20px]" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between py-4 px-1">
                    <p className="text-sm text-slate-500">Showing <span className="font-bold text-slate-900">1-5</span> of <span className="font-bold text-slate-900">450</span> customers</p>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            Previous
                        </button>
                        <button className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm transition-opacity">
                    {/* Modal Content */}
                    <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200 border border-gray-100">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                            <div>
                                <h2 className="text-xl font-bold leading-tight tracking-tight text-[#111318]">Add New Customer</h2>
                                <p className="text-sm text-gray-500 mt-1">Create a new order and customer profile</p>
                            </div>
                            <button
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <MdClose className="text-[24px]" />
                            </button>
                        </div>
                        {/* Modal Body (Scrollable) */}
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <form className="space-y-6">
                                {/* Customer Info Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Name */}
                                    <div className="flex flex-col md:col-span-2">
                                        <label className="text-sm font-medium leading-normal mb-2 text-[#111318]">
                                            Customer Name <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                <MdPerson className="text-[20px]" />
                                            </span>
                                            <input
                                                autoFocus
                                                className="w-full h-12 rounded-lg border border-[#dcdfe5] bg-white pl-11 pr-4 text-base text-[#111318] placeholder:text-[#636f88] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow"
                                                placeholder="e.g. John Doe"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    {/* Phone */}
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium leading-normal mb-2 text-[#111318]">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                <MdCall className="text-[20px]" />
                                            </span>
                                            <input
                                                className="w-full h-12 rounded-lg border border-[#dcdfe5] bg-white pl-11 pr-4 text-base text-[#111318] placeholder:text-[#636f88] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow"
                                                placeholder="(555) 123-4567"
                                                type="tel"
                                            />
                                        </div>
                                    </div>
                                    {/* WhatsApp */}
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium leading-normal mb-2 text-[#111318] flex justify-between items-center">
                                            <span>WhatsApp Number</span>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                <MdChat className="text-[20px]" />
                                            </span>
                                            <input
                                                className="w-full h-12 rounded-lg border border-[#dcdfe5] bg-white pl-11 pr-4 text-base text-[#111318] placeholder:text-[#636f88] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow"
                                                placeholder="(555) 123-4567"
                                                type="tel"
                                            />
                                        </div>
                                        {/* Helper Checkbox */}
                                        <div className="mt-2 flex items-center gap-2">
                                            <input
                                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                id="same-number"
                                                type="checkbox"
                                            />
                                            <label className="text-xs text-gray-500 cursor-pointer select-none" htmlFor="same-number">Use same as phone number</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-px bg-gray-100 w-full my-4"></div>
                                {/* Order Details Section */}
                                <div className="space-y-5">
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium leading-normal mb-2 text-[#111318]">
                                            Product Details <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            className="w-full min-h-[120px] rounded-lg border border-[#dcdfe5] bg-white p-4 text-base text-[#111318] placeholder:text-[#636f88] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow resize-y"
                                            placeholder="Describe the ordered items (e.g. 500 Business Cards, Matte Finish, 350gsm)..."
                                        ></textarea>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
                                        {/* Price */}
                                        <div className="flex flex-col">
                                            <label className="text-sm font-medium leading-normal mb-2 text-[#111318]">
                                                Total Price
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                                <input
                                                    className="w-full h-12 rounded-lg border border-[#dcdfe5] bg-white pl-8 pr-4 text-base text-[#111318] placeholder:text-[#636f88] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow"
                                                    placeholder="0.00"
                                                    step="0.01"
                                                    type="number"
                                                />
                                            </div>
                                        </div>
                                        {/* Payment Status Toggle */}
                                        <div className="flex flex-col">
                                            <label className="text-sm font-medium leading-normal mb-2 text-[#111318]">
                                                Payment Status
                                            </label>
                                            <div className="grid grid-cols-2 gap-3 h-12">
                                                <label className="cursor-pointer relative group">
                                                    <input className="peer sr-only" name="payment_status" type="radio" value="paid" />
                                                    <div className="w-full h-full flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 font-medium transition-all peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 group-hover:border-gray-300">
                                                        <MdCheckCircle className="text-[18px] mr-1.5" />
                                                        Paid
                                                    </div>
                                                </label>
                                                <label className="cursor-pointer relative group">
                                                    <input defaultChecked className="peer sr-only" name="payment_status" type="radio" value="due" />
                                                    <div className="w-full h-full flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 font-medium transition-all peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 group-hover:border-gray-300">
                                                        <MdPending className="text-[18px] mr-1.5" />
                                                        Due
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* Modal Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between sm:justify-end gap-3 rounded-b-2xl">
                            <button
                                className="flex-1 sm:flex-none h-10 px-6 rounded-lg border border-gray-300 bg-white text-[#111318] text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button className="flex-1 sm:flex-none h-10 px-6 rounded-lg bg-primary text-white text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm shadow-blue-500/30 transition-all flex items-center justify-center gap-2">
                                <MdSave className="text-[18px]" />
                                Save Customer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

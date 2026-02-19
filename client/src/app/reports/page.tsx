'use client';

import { useState, useEffect } from 'react';
import { fetchSalesReport, fetchInventoryReport } from '@/utils/api';
import { MdDownload, MdDateRange, MdInventory, MdAttachMoney } from 'react-icons/md';

export default function ReportsPage() {
    const [activeTab, setActiveTab] = useState<'sales' | 'inventory'>('sales');
    const [salesData, setSalesData] = useState<any[]>([]);
    const [inventoryData, setInventoryData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        if (activeTab === 'sales') {
            loadSales();
        } else {
            loadInventory();
        }
    }, [activeTab]);

    const loadSales = async () => {
        setLoading(true);
        try {
            const data = await fetchSalesReport(startDate, endDate);
            setSalesData(data);
        } catch (error) {
            console.error('Failed to load sales report', error);
        } finally {
            setLoading(false);
        }
    };

    const loadInventory = async () => {
        setLoading(true);
        try {
            const data = await fetchInventoryReport();
            setInventoryData(data);
        } catch (error) {
            console.error('Failed to load inventory report', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        // Simple CSV export implementation
        const data = activeTab === 'sales' ? (Array.isArray(salesData) ? salesData : []) : (Array.isArray(inventoryData) ? inventoryData : []);
        if (!data || data.length === 0) return;

        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(row => Object.values(row).map(val =>
            typeof val === 'object' ? JSON.stringify(val) : val
        ).join(','));
        const csv = [headers, ...rows].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${activeTab}-report-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50">
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-full mx-auto px-4 pt-6 pb-3 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
                            <p className="text-sm text-gray-500">Generate and view system reports</p>
                        </div>
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm text-sm font-medium"
                        >
                            <MdDownload size={20} />
                            Export CSV
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 bg-white rounded-t-xl">
                        <button
                            onClick={() => setActiveTab('sales')}
                            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'sales'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <MdAttachMoney size={18} />
                            Sales Report
                        </button>
                        <button
                            onClick={() => setActiveTab('inventory')}
                            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'inventory'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <MdInventory size={18} />
                            Inventory Report
                        </button>
                    </div>

                    {/* Filters for Sales */}
                    {activeTab === 'sales' && (
                        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-end gap-4 shadow-sm">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">End Date</label>
                                <input
                                    type="date"
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={loadSales}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                            >
                                Apply Filter
                            </button>
                        </div>
                    )}

                    {/* Data Table */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                                    <tr>
                                        {activeTab === 'sales' ? (
                                            <>
                                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider">Order ID</th>
                                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider">Customer</th>
                                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-right">Amount</th>
                                            </>
                                        ) : (
                                            <>
                                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider">Product Name</th>
                                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider">Category</th>
                                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-right">Buying Price</th>
                                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-right">Selling Price</th>
                                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-right">Quantity</th>
                                                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wider text-center">Status</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                                Loading data...
                                            </td>
                                        </tr>
                                    ) : (activeTab === 'sales' 
                                        ? (Array.isArray(salesData) ? salesData : []) 
                                        : (Array.isArray(inventoryData) ? inventoryData : [])
                                    ).length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                                No data found.
                                            </td>
                                        </tr>
                                    ) : (
                                        (activeTab === 'sales' 
                                            ? (Array.isArray(salesData) ? salesData : []) 
                                            : (Array.isArray(inventoryData) ? inventoryData : [])
                                        ).map((item: any) => (
                                            <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                                {activeTab === 'sales' ? (
                                                    <>
                                                        <td className="px-6 py-4 font-medium text-gray-900">#{item._id.substring(0, 8)}</td>
                                                        <td className="px-6 py-4 text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                                                        <td className="px-6 py-4">{item.customer?.name || 'Unknown'}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                                item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-gray-100 text-gray-800'
                                                                }`}>
                                                                {item.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right font-medium">${item.totalAmount?.toFixed(2)}</td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                                        <td className="px-6 py-4 text-gray-500">{item.category}</td>
                                                        <td className="px-6 py-4 text-right text-gray-500">${item.buyingPrice?.toFixed(2)}</td>
                                                        <td className="px-6 py-4 text-right font-medium">${item.sellingPrice?.toFixed(2)}</td>
                                                        <td className="px-6 py-4 text-right">{item.quantity}</td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${item.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                                }`}>
                                                                {item.inStock ? 'In Stock' : 'Out of Stock'}
                                                            </span>
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

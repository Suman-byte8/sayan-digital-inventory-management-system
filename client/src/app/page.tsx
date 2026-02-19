'use client';

import { useState, useEffect } from 'react';
import { fetchOrders, fetchDashboardStats } from '@/utils/api';
import NewOrderModal from '@/components/NewOrderModal';
import { MdCalendarToday, MdNotifications, MdAdd, MdPayments, MdTrendingUp, MdPendingActions, MdWarning, MdPrint, MdShoppingCart, MdInventory, MdPersonAdd } from 'react-icons/md';
import { useSettings } from '@/context/SettingsContext';

export default function Dashboard() {
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
    totalProducts: 0
  });
  const { settings } = useSettings();
  const currencySymbol = settings?.currency === 'INR' ? '₹' : settings?.currency === 'USD' ? '$' : settings?.currency === 'EUR' ? '€' : settings?.currency === 'GBP' ? '£' : '$';

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ordersData, statsData] = await Promise.all([
          fetchOrders({ limit: 5 }),
          fetchDashboardStats()
        ]);
        setRecentOrders(ordersData.orders || []);
        setStats(statsData);
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      }
    };
    loadData();
  }, []);

  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden relative">
      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-3 md:p-5 scroll-smooth">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          {/* Header */}
          <header className="flex flex-wrap justify-between items-end gap-3 pb-2 border-b border-gray-200">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard</h2>
              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                <MdCalendarToday className="text-[14px]" />
                <span>{new Date().toLocaleDateString()}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span>Overview</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center justify-center bg-white border border-gray-200 rounded-lg h-9 w-9 text-gray-500 hover:text-primary hover:border-primary transition-colors cursor-pointer">
                <MdNotifications className="text-lg" />
              </button>
              <button
                onClick={() => setIsNewOrderModalOpen(true)}
                className="bg-primary hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <MdAdd className="text-[16px]" /> New Order
              </button>
            </div>
          </header>

          {/* KPI Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Total Revenue */}
            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm flex flex-col gap-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <MdPayments className="text-4xl text-primary" />
              </div>
              <p className="text-gray-500 text-xs font-medium">Total Revenue</p>
              <p className="text-gray-900 text-xl font-bold tracking-tight">{currencySymbol}{(stats.totalRevenue || 0).toFixed(2)}</p>
              <div className="flex items-center gap-1 text-green-600 text-[10px] font-medium">
                <MdTrendingUp />
                <span>+0%</span>
              </div>
            </div>
            {/* Pending Orders */}
            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm flex flex-col gap-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <MdPendingActions className="text-4xl text-amber-500" />
              </div>
              <p className="text-gray-500 text-xs font-medium">Pending Orders</p>
              <p className="text-gray-900 text-xl font-bold tracking-tight">{stats.pendingOrders}</p>
              <p className="text-slate-400 text-[10px] font-medium">Orders to process</p>
            </div>
            {/* Low Stock Alerts */}
            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm flex flex-col gap-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <MdWarning className="text-4xl text-red-500" />
              </div>
              <p className="text-gray-500 text-xs font-medium">Low Stock Alerts</p>
              <p className="text-gray-900 text-xl font-bold tracking-tight">{stats.lowStockProducts} Items</p>
              <p className="text-slate-400 text-[10px] font-medium">Needs attention</p>
            </div>
            {/* Active Printers */}
            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm flex flex-col gap-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <MdPrint className="text-4xl text-blue-500" />
              </div>
              <p className="text-gray-500 text-xs font-medium">Total Products</p>
              <p className="text-gray-900 text-xl font-bold tracking-tight">{stats.totalProducts}</p>
              <p className="text-slate-400 text-[10px] font-medium">In inventory</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Sales Overview Chart */}
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm p-3 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Sales Overview</h3>
                  <p className="text-gray-500 text-[10px]">Last 7 Days Performance</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{currencySymbol}0.00</p>
                  <p className="text-slate-400 text-[10px] font-medium">No data</p>
                </div>
              </div>
              <div className="flex-1 min-h-[120px] w-full relative flex items-center justify-center bg-slate-50 rounded">
                <p className="text-xs text-slate-400">No sales data available</p>
              </div>
            </div>
            {/* Inventory Health Chart */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 flex flex-col">
              <div className="mb-3">
                <h3 className="text-sm font-bold text-gray-900">Inventory Health</h3>
                <p className="text-gray-500 text-[10px]">Critical Stock Levels</p>
              </div>
              <div className="flex-1 flex items-center justify-center bg-slate-50 rounded h-32">
                <p className="text-xs text-slate-400">No inventory data</p>
              </div>
            </div>
          </div>

          {/* Bottom Section: Recent Orders & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Recent Orders Table */}
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-base font-bold text-gray-900">Recent Orders</h3>
                <a className="text-xs font-medium text-primary hover:text-blue-700" href="/orders">View All</a>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-[10px] text-gray-500 uppercase bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 font-semibold">Order ID</th>
                      <th className="px-4 py-2 font-semibold">Customer</th>
                      <th className="px-4 py-2 font-semibold">Job Type</th>
                      <th className="px-4 py-2 font-semibold">Date</th>
                      <th className="px-4 py-2 font-semibold">Status</th>
                      <th className="px-4 py-2 font-semibold text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-slate-500 italic">No recent orders found</td>
                      </tr>
                    ) : (
                      recentOrders.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-2.5 font-medium text-gray-900">#{order._id.substring(0, 8)}</td>
                          <td className="px-4 py-2.5">{order.customer?.name || 'Unknown'}</td>
                          <td className="px-4 py-2.5">{order.products?.length || 0} Items</td>
                          <td className="px-4 py-2.5 text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td className="px-4 py-2.5">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-800">
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-right font-medium">{currencySymbol}{order.totalAmount?.toFixed(2)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Quick Actions & Alerts */}
            <div className="flex flex-col gap-3">
              {/* Quick Actions */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsNewOrderModalOpen(true)}
                    className="flex flex-col items-center justify-center gap-1.5 p-2 rounded border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <MdShoppingCart className="text-primary text-xl" />
                    <span className="text-[10px] font-medium text-gray-700">New Order</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-1.5 p-2 rounded border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                    <MdInventory className="text-primary text-xl" />
                    <span className="text-[10px] font-medium text-gray-700">Add Stock</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-1.5 p-2 rounded border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                    <MdPersonAdd className="text-primary text-xl" />
                    <span className="text-[10px] font-medium text-gray-700">New Client</span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-1.5 p-2 rounded border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                    <MdPrint className="text-primary text-xl" />
                    <span className="text-[10px] font-medium text-gray-700">Print Queue</span>
                  </button>
                </div>
              </div>
              {/* Low Stock List */}
              <div className="bg-white rounded-lg border border-red-200 shadow-sm p-4 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <MdWarning className="text-red-500 text-lg" />
                  <h3 className="text-sm font-bold text-gray-900">Critical Stock</h3>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="p-4 text-center text-xs text-slate-500 italic">
                    No critical stock alerts
                  </div>
                </div>
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

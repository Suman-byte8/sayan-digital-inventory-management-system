'use client';

import { useState } from 'react';
import NewOrderModal from '@/components/NewOrderModal';
import { MdCalendarToday, MdNotifications, MdAdd, MdPayments, MdTrendingUp, MdPendingActions, MdWarning, MdPrint, MdShoppingCart, MdInventory, MdPersonAdd } from 'react-icons/md';

export default function Dashboard() {
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);

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
                <span>Oct 24, 2023</span>
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
              <p className="text-gray-900 text-xl font-bold tracking-tight">$12,450</p>
              <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-medium">
                <MdTrendingUp className="text-[12px]" />
                <span>+12% vs last week</span>
              </div>
            </div>
            {/* Pending Orders */}
            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm flex flex-col gap-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <MdPendingActions className="text-4xl text-amber-500" />
              </div>
              <p className="text-gray-500 text-xs font-medium">Pending Orders</p>
              <p className="text-gray-900 text-xl font-bold tracking-tight">14</p>
              <p className="text-amber-600 text-[10px] font-medium">Needs Attention</p>
            </div>
            {/* Low Stock Alerts */}
            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm flex flex-col gap-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <MdWarning className="text-4xl text-red-500" />
              </div>
              <p className="text-gray-500 text-xs font-medium">Low Stock Alerts</p>
              <p className="text-gray-900 text-xl font-bold tracking-tight">3 Items</p>
              <p className="text-red-600 text-[10px] font-medium">Restock Immediately</p>
            </div>
            {/* Active Printers */}
            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm flex flex-col gap-1 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <MdPrint className="text-4xl text-blue-500" />
              </div>
              <p className="text-gray-500 text-xs font-medium">Active Printers</p>
              <p className="text-gray-900 text-xl font-bold tracking-tight">4/5</p>
              <p className="text-emerald-600 text-[10px] font-medium">Stable Operation</p>
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
                  <p className="text-lg font-bold text-gray-900">$4,200</p>
                  <p className="text-green-600 text-[10px] font-medium">+5.2%</p>
                </div>
              </div>
              <div className="flex-1 min-h-[120px] w-full relative flex items-end">
                {/* Custom SVG Chart replacement with primary color */}
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                  <defs>
                    <linearGradient id="gradientPrimary" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#195de6" stopOpacity="0.2"></stop>
                      <stop offset="100%" stopColor="#195de6" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                  <path d="M0 40 Q 10 35, 20 38 T 40 20 T 60 25 T 80 10 L 100 15 V 50 H 0 Z" fill="url(#gradientPrimary)"></path>
                  <path d="M0 40 Q 10 35, 20 38 T 40 20 T 60 25 T 80 10 L 100 15" fill="none" stroke="#195de6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75"></path>
                </svg>
              </div>
              <div className="flex justify-between mt-2 text-[9px] font-semibold text-gray-400 uppercase tracking-wider">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
            {/* Inventory Health Chart */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 flex flex-col">
              <div className="mb-3">
                <h3 className="text-sm font-bold text-gray-900">Inventory Health</h3>
                <p className="text-gray-500 text-[10px]">Critical Stock Levels</p>
              </div>
              <div className="flex-1 flex items-end justify-between gap-2 h-32 pb-1">
                {/* Bar 1 */}
                <div className="flex flex-col items-center gap-1 flex-1 group">
                  <div className="w-full bg-gray-100 rounded-t relative h-24 overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-emerald-500 h-full rounded-t transition-all group-hover:bg-emerald-400"></div>
                  </div>
                  <span className="text-[10px] font-medium text-gray-500">Paper</span>
                </div>
                {/* Bar 2 */}
                <div className="flex flex-col items-center gap-1 flex-1 group">
                  <div className="w-full bg-gray-100 rounded-t relative h-24 overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-cyan-500 h-[80%] rounded-t transition-all group-hover:bg-cyan-400"></div>
                  </div>
                  <span className="text-[10px] font-medium text-gray-500">Cyan</span>
                </div>
                {/* Bar 3 */}
                <div className="flex flex-col items-center gap-1 flex-1 group">
                  <div className="w-full bg-gray-100 rounded-t relative h-24 overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-pink-500 h-[30%] rounded-t animate-pulse"></div>
                  </div>
                  <span className="text-[10px] font-medium text-pink-600 font-bold">Mag</span>
                </div>
                {/* Bar 4 */}
                <div className="flex flex-col items-center gap-1 flex-1 group">
                  <div className="w-full bg-gray-100 rounded-t relative h-24 overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-yellow-400 h-[65%] rounded-t transition-all group-hover:bg-yellow-300"></div>
                  </div>
                  <span className="text-[10px] font-medium text-gray-500">Yell</span>
                </div>
                {/* Bar 5 */}
                <div className="flex flex-col items-center gap-1 flex-1 group">
                  <div className="w-full bg-gray-100 rounded-t relative h-24 overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-gray-800 h-[70%] rounded-t transition-all"></div>
                  </div>
                  <span className="text-[10px] font-medium text-gray-500">Key</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Recent Orders & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Recent Orders Table */}
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-base font-bold text-gray-900">Recent Orders</h3>
                <a className="text-xs font-medium text-primary hover:text-blue-700" href="#">View All</a>
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
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2.5 font-medium text-gray-900">#ORD-2481</td>
                      <td className="px-4 py-2.5">Acme Corp</td>
                      <td className="px-4 py-2.5">Brochures (500)</td>
                      <td className="px-4 py-2.5 text-gray-500">Oct 24</td>
                      <td className="px-4 py-2.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-800">
                          Processing
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium">$450.00</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2.5 font-medium text-gray-900">#ORD-2480</td>
                      <td className="px-4 py-2.5">Jane Doe Design</td>
                      <td className="px-4 py-2.5">Business Cards</td>
                      <td className="px-4 py-2.5 text-gray-500">Oct 23</td>
                      <td className="px-4 py-2.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium">$85.00</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2.5 font-medium text-gray-900">#ORD-2479</td>
                      <td className="px-4 py-2.5">TechStart Inc</td>
                      <td className="px-4 py-2.5">Banner (Large)</td>
                      <td className="px-4 py-2.5 text-gray-500">Oct 23</td>
                      <td className="px-4 py-2.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 text-amber-800">
                          Pending Proof
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium">$120.00</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2.5 font-medium text-gray-900">#ORD-2478</td>
                      <td className="px-4 py-2.5">Local Cafe</td>
                      <td className="px-4 py-2.5">Menus (Laminated)</td>
                      <td className="px-4 py-2.5 text-gray-500">Oct 22</td>
                      <td className="px-4 py-2.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium">$340.00</td>
                    </tr>
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
                  <div className="flex items-center justify-between p-1.5 rounded bg-red-50">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">Magenta Ink</p>
                        <p className="text-[10px] text-red-600">1 Unit Left</p>
                      </div>
                    </div>
                    <button className="text-[10px] font-medium text-primary hover:underline cursor-pointer">Reorder</button>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded bg-red-50">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">A4 Glossy Paper</p>
                        <p className="text-[10px] text-red-600">Low Supply</p>
                      </div>
                    </div>
                    <button className="text-[10px] font-medium text-primary hover:underline cursor-pointer">Reorder</button>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded bg-amber-50">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">300gsm Cardstock</p>
                        <p className="text-[10px] text-amber-600">Below 20%</p>
                      </div>
                    </div>
                    <button className="text-[10px] font-medium text-primary hover:underline cursor-pointer">Check</button>
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

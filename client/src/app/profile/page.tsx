'use client';

import {
    MdEdit,
    MdPerson,
    MdTune,
    MdSecurity,
    MdAdminPanelSettings,
    MdMail,
    MdCall,
    MdLightMode,
    MdDarkMode,
    MdSettingsSystemDaydream,
    MdKey,
    MdPhonelinkLock,
    MdDesktopMac,
    MdSmartphone,
    MdManageAccounts,
    MdSettingsApplications,
    MdBackup
} from 'react-icons/md';

export default function AdminProfilePage() {
    return (
        <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50/50">
            <div className="flex-1 overflow-y-auto scroll-smooth">
                <div className="max-w-5xl mx-auto p-4 md:p-6">
                    {/* Header */}
                    <div className="flex flex-col gap-1 mb-6">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span>System</span>
                            <span className="text-[10px] text-slate-400">/</span>
                            <span className="text-primary font-medium">Profile Settings</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin Settings</h1>
                                <p className="text-slate-500 text-xs mt-0.5">Manage your account security, personal details, and system access.</p>
                            </div>
                            <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm shadow-blue-500/20">
                                <span className="text-[16px]"><MdEdit /></span>
                                Save Changes
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Sidebar / Navigation */}
                        <div className="lg:col-span-3 flex flex-col gap-4 sticky top-4">
                            <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col items-center text-center shadow-sm">
                                <div className="relative mb-3 group cursor-pointer">
                                    <div className="size-20 rounded-full bg-slate-200 bg-cover bg-center border-4 border-white shadow-md" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjNU-E7ZdaUIoFflrpOJuJzdhfTP1HYoobwa_7eTH3VdLQFb3hAUZ0aJk3m3MrzeUL9cMssWkmN_JyJrSfDYM4w9Q_Xsd89pWo9_3zUkSTww_PWev28RrbiBqK4XEpLEZukJDBhNDSNM2qLmiSUgQ6XwYpVOU9Mey-qWpQjcp01FMnPrEAwGezMNfY5hKno-cUd43eFspE2YRkk2o1glbWXLx6pMSYK1Dq8srDDHryS7GszTFUQyZVF-wwjmrBUwldo__xrVDMeqM")' }}></div>
                                    <div className="absolute bottom-0 right-0 p-1 bg-primary rounded-full text-white shadow-sm group-hover:scale-110 transition-transform">
                                        <span className="text-[12px] flex"><MdEdit /></span>
                                    </div>
                                </div>
                                <h2 className="text-base font-bold text-slate-900">Jane Doe</h2>
                                <p className="text-xs text-slate-500 mb-2">jane.doe@printmaster.com</p>
                                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-primary text-[10px] font-bold uppercase tracking-wide border border-blue-100">Super Admin</span>
                            </div>
                            <nav className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                                <a className="flex items-center gap-2 px-3 py-2.5 bg-blue-50 border-l-4 border-primary text-primary font-bold text-xs" href="#general">
                                    <span className="text-[16px]"><MdPerson /></span>
                                    Personal Information
                                </a>
                                <a className="flex items-center gap-2 px-3 py-2.5 hover:bg-slate-50 border-l-4 border-transparent text-slate-600 hover:text-slate-900 transition-colors text-xs font-medium" href="#preferences">
                                    <span className="text-[16px]"><MdTune /></span>
                                    Account Preferences
                                </a>
                                <a className="flex items-center gap-2 px-3 py-2.5 hover:bg-slate-50 border-l-4 border-transparent text-slate-600 hover:text-slate-900 transition-colors text-xs font-medium" href="#security">
                                    <span className="text-[16px]"><MdSecurity /></span>
                                    Security & Login
                                </a>
                                <a className="flex items-center gap-2 px-3 py-2.5 hover:bg-slate-50 border-l-4 border-transparent text-slate-600 hover:text-slate-900 transition-colors text-xs font-medium" href="#admin-tools">
                                    <span className="text-[16px]"><MdAdminPanelSettings /></span>
                                    Administrative Tools
                                </a>
                            </nav>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-9 flex flex-col gap-6">
                            {/* Personal Information */}
                            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden" id="general">
                                <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                    <h3 className="text-sm font-bold text-slate-900">Personal Information</h3>
                                    <button className="text-[10px] font-bold text-primary hover:underline">Edit Info</button>
                                </div>
                                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-900">First Name</label>
                                        <input className="w-full h-9 rounded-lg border-slate-200 bg-white text-xs focus:ring-primary focus:border-primary" type="text" defaultValue="Jane" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-900">Last Name</label>
                                        <input className="w-full h-9 rounded-lg border-slate-200 bg-white text-xs focus:ring-primary focus:border-primary" type="text" defaultValue="Doe" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-900">Email Address</label>
                                        <div className="relative">
                                            <span className="absolute left-2.5 top-2.5 text-slate-400 text-[14px]"><MdMail /></span>
                                            <input className="w-full h-9 pl-8 rounded-lg border-slate-200 bg-slate-50 text-slate-500 text-xs cursor-not-allowed" disabled type="email" defaultValue="jane.doe@printmaster.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-900">Contact Phone</label>
                                        <div className="relative">
                                            <span className="absolute left-2.5 top-2.5 text-slate-400 text-[14px]"><MdCall /></span>
                                            <input className="w-full h-9 pl-8 rounded-lg border-slate-200 bg-white text-xs focus:ring-primary focus:border-primary" type="tel" defaultValue="+1 (555) 019-2834" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Account Preferences */}
                            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden" id="preferences">
                                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                                    <h3 className="text-sm font-bold text-slate-900">Account Preferences</h3>
                                </div>
                                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold text-slate-900">Interface Theme</label>
                                            <div className="flex items-center gap-2">
                                                <button className="flex-1 py-1.5 px-2 rounded-lg border-2 border-primary bg-blue-50 text-primary font-bold text-xs flex items-center justify-center gap-1.5">
                                                    <span className="text-[14px]"><MdLightMode /></span> Light
                                                </button>
                                                <button className="flex-1 py-1.5 px-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium text-xs flex items-center justify-center gap-1.5">
                                                    <span className="text-[14px]"><MdDarkMode /></span> Dark
                                                </button>
                                                <button className="flex-1 py-1.5 px-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium text-xs flex items-center justify-center gap-1.5">
                                                    <span className="text-[14px]"><MdSettingsSystemDaydream /></span> Auto
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold text-slate-900">Timezone</label>
                                            <select className="w-full h-9 rounded-lg border-slate-200 bg-white text-xs focus:ring-primary focus:border-primary">
                                                <option>(GMT-05:00) Eastern Time (US & Canada)</option>
                                                <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                                                <option>(GMT+00:00) London</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Notifications</h4>
                                        <div className="flex items-start gap-2">
                                            <div className="flex items-center h-4">
                                                <input defaultChecked className="w-3.5 h-3.5 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary" type="checkbox" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-900">System Alerts</span>
                                                <span className="text-[10px] text-slate-500">Receive alerts about server status and backups.</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="flex items-center h-4">
                                                <input defaultChecked className="w-3.5 h-3.5 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary" type="checkbox" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-900">Inventory Low Stock</span>
                                                <span className="text-[10px] text-slate-500">Get notified when paper or ink supplies are critical.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Security & Activity */}
                            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden" id="security">
                                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                                    <h3 className="text-sm font-bold text-slate-900">Security & Activity</h3>
                                </div>
                                <div className="p-4 flex flex-col gap-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
                                                    <span className="text-primary text-[16px]"><MdKey /></span> Password
                                                </div>
                                                <button className="text-[10px] text-primary font-bold hover:underline">Change</button>
                                            </div>
                                            <p className="text-[10px] text-slate-500 mb-2">Last changed 90 days ago. It's recommended to update it periodically.</p>
                                            <div className="flex gap-1">
                                                <div className="h-1 w-full bg-green-500 rounded-full"></div>
                                                <div className="h-1 w-full bg-green-500 rounded-full"></div>
                                                <div className="h-1 w-full bg-green-500 rounded-full"></div>
                                                <div className="h-1 w-full bg-slate-200 rounded-full"></div>
                                            </div>
                                            <p className="text-[10px] text-right text-green-600 mt-1 font-bold">Strong</p>
                                        </div>
                                        <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
                                                    <span className="text-primary text-[16px]"><MdPhonelinkLock /></span> 2-Factor Auth
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input defaultChecked className="sr-only peer" type="checkbox" />
                                                    <div className="w-7 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-green-500"></div>
                                                </label>
                                            </div>
                                            <p className="text-[10px] text-slate-500">Protect your account with an extra layer of security using an authenticator app.</p>
                                            <div className="mt-2 flex items-center gap-1.5">
                                                <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[9px] font-bold uppercase rounded">Enabled</span>
                                                <span className="text-[9px] text-slate-400">via Google Authenticator</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-900 mb-3">Active Sessions</h4>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center justify-between p-2.5 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                                                        <span className="text-[16px]"><MdDesktopMac /></span>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-900">Macbook Pro <span className="text-[10px] font-normal text-slate-400 mx-1">|</span> Chrome 120</p>
                                                        <p className="text-[10px] text-slate-500">New York, USA • <span className="text-green-600 font-bold">Active Now</span></p>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] text-slate-400 italic">Current Device</span>
                                            </div>
                                            <div className="flex items-center justify-between p-2.5 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                        <span className="text-[16px]"><MdSmartphone /></span>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-bold text-slate-900">iPhone 14 Pro <span className="text-[10px] font-normal text-slate-400 mx-1">|</span> App</p>
                                                        <p className="text-[10px] text-slate-500">New York, USA • Last active 2 hours ago</p>
                                                    </div>
                                                </div>
                                                <button className="text-[10px] font-bold text-red-600 hover:text-red-700 border border-red-200 hover:bg-red-50 px-2 py-1 rounded transition-colors">Revoke</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="text-xs font-bold text-slate-900">Recent Admin Activity</h4>
                                            <a className="text-[10px] font-bold text-primary hover:underline" href="#">View Full Logs</a>
                                        </div>
                                        <div className="overflow-x-auto rounded-lg border border-slate-200">
                                            <table className="w-full text-left border-collapse">
                                                <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 font-bold">
                                                    <tr>
                                                        <th className="px-3 py-2">Action</th>
                                                        <th className="px-3 py-2">Resource</th>
                                                        <th className="px-3 py-2">Date</th>
                                                        <th className="px-3 py-2 text-right">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 text-xs">
                                                    <tr className="bg-white">
                                                        <td className="px-3 py-2 font-medium text-slate-900">Update Inventory</td>
                                                        <td className="px-3 py-2 text-slate-500">Paper Stock (A4)</td>
                                                        <td className="px-3 py-2 text-slate-500">Today, 10:23 AM</td>
                                                        <td className="px-3 py-2 text-right"><span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700 text-[9px] font-bold uppercase">Success</span></td>
                                                    </tr>
                                                    <tr className="bg-white">
                                                        <td className="px-3 py-2 font-medium text-slate-900">User Role Change</td>
                                                        <td className="px-3 py-2 text-slate-500">User: mark_s</td>
                                                        <td className="px-3 py-2 text-slate-500">Yesterday, 4:15 PM</td>
                                                        <td className="px-3 py-2 text-right"><span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700 text-[9px] font-bold uppercase">Success</span></td>
                                                    </tr>
                                                    <tr className="bg-white">
                                                        <td className="px-3 py-2 font-medium text-slate-900">Export Report</td>
                                                        <td className="px-3 py-2 text-slate-500">Monthly Sales.pdf</td>
                                                        <td className="px-3 py-2 text-slate-500">Oct 24, 09:30 AM</td>
                                                        <td className="px-3 py-2 text-right"><span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 text-[9px] font-bold uppercase">Completed</span></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Admin Tools */}
                            <section id="admin-tools">
                                <h3 className="text-sm font-bold text-slate-900 mb-3 px-1">Administrative Shortcuts</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-primary transition-all cursor-pointer shadow-sm hover:shadow-md">
                                        <div className="size-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                            <span className="text-[20px]"><MdManageAccounts /></span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 mb-0.5 text-xs">User Access</h4>
                                        <p className="text-[10px] text-slate-500">Manage roles, permissions, and invite new staff members.</p>
                                    </div>
                                    <div className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-primary transition-all cursor-pointer shadow-sm hover:shadow-md">
                                        <div className="size-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-2 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                            <span className="text-[20px]"><MdSettingsApplications /></span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 mb-0.5 text-xs">System Config</h4>
                                        <p className="text-[10px] text-slate-500">Configure global settings for printers, paper units, and alerts.</p>
                                    </div>
                                    <div className="group bg-white p-4 rounded-xl border border-slate-200 hover:border-primary transition-all cursor-pointer shadow-sm hover:shadow-md">
                                        <div className="size-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mb-2 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                            <span className="text-[20px]"><MdBackup /></span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 mb-0.5 text-xs">Backup & Restore</h4>
                                        <p className="text-[10px] text-slate-500">View automated backups or trigger a manual system snapshot.</p>
                                    </div>
                                </div>
                            </section>

                            <div className="rounded-xl border border-red-100 bg-red-50/50 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                                <div>
                                    <h4 className="text-xs font-bold text-red-700">Deactivate Account</h4>
                                    <p className="text-[10px] text-red-600/80 mt-0.5">This will temporarily disable your admin access. You cannot undo this action yourself.</p>
                                </div>
                                <button className="whitespace-nowrap px-3 py-1.5 bg-white border border-red-200 text-red-600 text-xs font-bold rounded-lg hover:bg-red-50 transition-colors">
                                    Deactivate Access
                                </button>
                            </div>
                            <div className="h-8"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

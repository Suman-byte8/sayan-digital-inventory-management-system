'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    MdPrint,
    MdDashboard,
    MdInventory,
    MdShoppingCart,
    MdPeople,
    MdBarChart,
    MdSettings,
    MdDescription
} from 'react-icons/md';

const Sidebar = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <aside className="w-64 flex-shrink-0 flex flex-col bg-surface-light border-r border-slate-200 transition-all duration-300 h-screen">
            <div className="p-6 flex items-center gap-3">
                <div className="bg-primary/10 flex items-center justify-center rounded-xl size-10 text-primary">
                    <MdPrint className="text-2xl" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-base font-bold leading-tight">Sayan Digital</h1>
                    <p className="text-slate-500 text-xs font-normal">Admin Panel</p>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-2">
                <Link
                    href="/"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive('/')
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <MdDashboard className={`text-[20px] ${isActive('/') ? '' : 'group-hover:text-slate-900'}`} />
                    <span className={`text-sm font-medium ${isActive('/') ? '' : 'group-hover:text-slate-900'}`}>Dashboard</span>
                </Link>
                <Link
                    href="/inventory"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive('/inventory')
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <MdInventory className={`text-[20px] ${isActive('/inventory') ? '' : 'group-hover:text-slate-900'}`} />
                    <span className={`text-sm font-medium ${isActive('/inventory') ? '' : 'group-hover:text-slate-900'}`}>Inventory</span>
                </Link>
                <Link
                    href="/orders"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive('/orders')
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <MdShoppingCart className={`text-[20px] ${isActive('/orders') ? '' : 'group-hover:text-slate-900'}`} />
                    <span className={`text-sm font-medium ${isActive('/orders') ? '' : 'group-hover:text-slate-900'}`}>Orders</span>
                </Link>
                <Link
                    href="/customers"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive('/customers')
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <MdPeople className={`text-[20px] ${isActive('/customers') ? '' : 'group-hover:text-slate-900'}`} />
                    <span className={`text-sm font-medium ${isActive('/customers') ? '' : 'group-hover:text-slate-900'}`}>Customers</span>
                </Link>
                <Link
                    href="/invoice"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive('/invoice')
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <MdDescription className={`text-[20px] ${isActive('/invoice') ? '' : 'group-hover:text-slate-900'}`} />
                    <span className={`text-sm font-medium ${isActive('/invoice') ? '' : 'group-hover:text-slate-900'}`}>Invoice</span>
                </Link>

                <div className="mt-4 mb-1 px-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">System</p>
                </div>
                <Link
                    href="/profile"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive('/profile')
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <MdPeople className={`text-[20px] ${isActive('/profile') ? '' : 'group-hover:text-slate-900'}`} />
                    <span className={`text-sm font-medium ${isActive('/profile') ? '' : 'group-hover:text-slate-900'}`}>Admin Profile</span>
                </Link>
            </nav>

            <div className="p-4 border-t border-slate-200">
                <Link
                    href="/settings"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${isActive('/settings')
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <MdSettings className={`text-[20px] ${isActive('/settings') ? '' : 'group-hover:text-slate-900'}`} />
                    <span className={`text-sm font-medium ${isActive('/settings') ? '' : 'group-hover:text-slate-900'}`}>Settings</span>
                </Link>
                <div className="mt-4 flex items-center gap-3 px-3">
                    <div
                        className="size-8 rounded-full bg-slate-200 bg-center bg-cover"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCcpqXnVpMIq0FLI-hxWvLQJ_rTYaxhb9mT1KFv6Gpse3Wh_SwRhDMf6UfXzveYQqtKHs4hvIZDxFK_-H9LvzNYI1nv1H3IAkZlDOsPdAwGPHfmLRx4fAJgxu9qJeTOD_GZTgkXneQ54S7ZthN3-v_LdQlhT6vx2fVQoq9VWqMMVD_Bo3aP0eQJsZyrBtOWczR_TlCdwTSGMPtW3_gSSJAqLCGojBANq8KoWBgvXpf-76RHMEORaH272uvt1hdj6QupL6l-ncIX7r8")' }}
                    ></div>
                    <div className="flex flex-col">
                        <p className="text-xs font-semibold text-slate-900">Jane Doe</p>
                        <p className="text-[10px] text-slate-500">Manager</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBoxOpen } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { cn } from './ui/Button';

const Navbar = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/' },
        { name: 'Add Product', href: '/add' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            <motion.div
                                whileHover={{ rotate: 10 }}
                                className="bg-indigo-600 text-white p-2 rounded-lg shadow-lg shadow-indigo-500/30"
                            >
                                <FaBoxOpen className="text-xl" />
                            </motion.div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                Inventory
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        'relative px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                        isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    )}
                                >
                                    {item.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-600"
                                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar';

export default function ConditionalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading } = useAuth();
    const isLoginPage = pathname === '/login';

    // show loading state while checking auth
    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    // redirect to login if not authenticated and not on login page
    if (!user && !isLoginPage) {
        router.push('/login');
        return <div className="flex items-center justify-center h-screen">Redirecting...</div>;
    }

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            {children}
        </div>
    );
}

'use client'

import { useState } from 'react';
import Sidebar from '@/components/organisms/Sidebar';
import Header from '@/components/organisms/Header';

export default function DashboardLayout({ children }) {
    const [isSideOpen, setIsSideOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-mood-bg overflow-hidden">
            {/* Sidebar Kiri */}
            <Sidebar isOpen={isSideOpen} onClose={() => setIsSideOpen(false)} />
            {/* Konten Kanan (Header + Isi Halaman) */}
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <Header onOpenSidebar={() => setIsSideOpen(true)} />
                {/* Di sinilah file page.jsx akan disuntikkan */}
                <main className='flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full'>
                    {children}
                </main>
            </div>
        </div>
    );
}
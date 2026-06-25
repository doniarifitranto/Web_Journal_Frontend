'use client';

import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { Search, Bell, Menu } from "lucide-react";

export default function Header({ onOpenSidebar }) {
    const { user } = useAuth();
    const pathname = usePathname();

    const getPageTitle = () => {
        if (pathname == "/dashboard") {
            return "Dashboard";
        }
        const segment = pathname.split("/")[2];
        if (segment) {
            return segment.charAt(0).toUpperCase() + segment.slice(1);
        }
        return "Dashboard";
    };

    return (
        <header className="h-20 bg-mood-bg border-b border-neutral-border/60 px-4 md:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
            {/* Kiri: Tombol Menu HP & Breadcrumb */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onOpenSidebar}
                    className="p-2 rounded-xl bg-white border border-neutral-border text-sage-dark md:hidden hover:bg-sage-100"
                >
                    <Menu size={20} />
                </button>
                <div className="text-sm">
                    <span className="text-text-muted">Pages</span>
                    <span className="mx-2 text-neutral-border">/</span>
                    <span className="text-text-dark font-bold">{getPageTitle()}</span>
                </div>
            </div>

            {/* Kanan: Search, Notifikasi, dan Akun User */}
            <div className="flex items-center gap-3 md:gap-5 w-full md:w-auto justify-end">
                {/* Search Bar */}
                <div className="relative hidden sm:block w-64">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted/60" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-white border border-neutral-border rounded-full pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-sage-500 text-text-dark"
                    />
                </div>
                {/* Bell */}
                <button className="p-2.5 rounded-full bg-white border border-neutral-border text-sage-500 hover:bg-sage-100    transition-colors relative">
                    <Bell size={18} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-status-healthy rounded-full ring-2 ring-white" />
                </button>
                {/* User Profile */}
                <div className="flex items-center gap-3 pl-2 border-l border-neutral-border/80">
                    <div className="w-9 h-9 rounded-full bg-sage-700 flex items-center justify-center text-white font-bold text-sm shadow-xs">
                        {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="hidden lg:block text-left">
                        <p className="text-xs font-bold text-text-dark leading-tight">
                            {user?.username || 'Guest User'}
                        </p>
                        <p className="text-[10px] text-text-muted">Active Member</p>
                    </div>
                </div>
            </div>
        </header>
    );

}
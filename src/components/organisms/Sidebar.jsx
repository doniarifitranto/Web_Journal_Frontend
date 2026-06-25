'use client';

import { useState, useEffect } from "react"; // 1. Tambah useEffect untuk fetch data
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import {
    LayoutDashboard, BookOpen, BarChart2, History,
    Settings, LogOut, Plus
} from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
    const pathname = usePathname();
    const router = useRouter();
    const { setUser } = useAuth();

    // State baru untuk menampung daftar jurnal dari backend
    const [recentJournals, setRecentJournals] = useState([]);

    // 2. Fungsi Ambil Data Jurnal Terakhir dari Backend
    const fetchRecentJournals = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/journal/all', {
                withCredentials: true,
            });
            // Mengambil maksimal 3 jurnal terbaru untuk dipajang di sidebar quick access
            setRecentJournals(response.data.journals.slice(0, 3));
        } catch (error) {
            console.error("Gagal mengambil jurnal terbaru untuk sidebar:", error);
        }
    };

    useEffect(() => {
        // Jalankan fetch data hanya jika user sudah terautentikasi
        fetchRecentJournals();
    }, [pathname]); // Refresh data setiap ada perpindahan halaman (misal setelah submit jurnal baru)

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error("Gagal logout", error);
        }
    };

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { name: "Journal", icon: BookOpen, path: "/dashboard/journal" },
        { name: "Analytics", icon: BarChart2, path: "/dashboard/analytics" },
        { name: "History", icon: History, path: "/dashboard/history" },
    ];

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity" onClick={onClose} />
            )}

            <aside className={`fixed md:static top-0 left-0 z-50 w-64 h-screen bg-white border-r border-neutral-border flex flex-col justify-between p-6 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
                <div>
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-10 pl-2">
                        <div className="w-9 h-9 rounded-xl bg-sage-500 flex items-center justify-center text-white font-bold text-xl">
                            M
                        </div>
                        <span className="text-xl font-bold tracking-tight text-sage-dark">MoodLens</span>
                    </div>

                    {/* Main Menu */}
                    <p className="text-[11px] font-bold text-text-muted/60 tracking-wider uppercase mb-3 pl-2">Main Menu</p>
                    <nav className="space-y-1 mb-8">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.path;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    onClick={onClose}
                                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                            ? "bg-sage-100 text-sage-dark font-semibold shadow-xs"
                                            : "text-text-muted hover:bg-mood-bg hover:text-sage-dark"
                                        }`}
                                >
                                    <Icon size={18} className={isActive ? "text-sage-dark" : "text-text-muted"} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Journal Section */}
                    <div className="flex items-center justify-between mb-3 pl-2 pr-1">
                        <p className="text-[11px] font-bold text-text-muted/60 tracking-wider uppercase">Journal</p>
                        {/* 👇 3. TOMBOL TANDA TAMBAH SEKARANG JADI LINK NAVIGASI KE INPUT JURNAL 👇 */}
                        <Link href="/dashboard/journal" onClick={onClose} className="text-text-muted hover:text-sage-dark p-1 rounded-lg hover:bg-mood-bg transition-colors">
                            <Plus size={16} />
                        </Link>
                    </div>

                    {/* 👇 4. DAFTAR JURNAL DINAMIS DARI DATABASE 👇 */}
                    <div className="space-y-1">
                        {recentJournals.length > 0 ? (
                            recentJournals.map((journal) => (
                                <div
                                    key={journal._id}
                                    className="p-2.5 rounded-xl bg-mood-bg text-text-muted text-xs truncate hover:bg-sage-100/50 cursor-pointer transition-colors font-medium"
                                    onClick={() => {
                                        // Sementara mengarah ke rute history karena halaman detail belum dibuat
                                        router.push('/dashboard/history');
                                        onClose();
                                    }}
                                >
                                    {journal.title}
                                </div>
                            ))
                        ) : (
                            <p className="text-[11px] text-text-muted/50 pl-2 italic">No entries yet</p>
                        )}
                    </div>
                </div>

                {/* General / Bottom Menu */}
                <div>
                    <p className="text-[11px] font-bold text-text-muted/60 tracking-wider uppercase mb-3 pl-2">General</p>
                    <div className="space-y-1">
                        <Link href="/dashboard/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:bg-mood-bg hover:text-sage-dark">
                            <Settings size={18} /> Settings
                        </Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-status-burnout hover:bg-status-burnout/10 transition-colors">
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
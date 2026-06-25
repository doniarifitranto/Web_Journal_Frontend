'use client';

import { Download } from "lucide-react";
import ChartCard from "@/components/molecules/ChartCard";

export default function Analytics() {
    return (
        <div className="space-y-8 animate-fade-in">

            {/* Bagian Header & Tombol Export */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-text-dark">Analytics</h1>
                    <p className="text-text-muted text-sm mt-1">
                        Deep dive into your mood and wellbeing patterns
                    </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-border rounded-xl text-sm font-semibold text-text-dark hover:bg-sage-50 transition-colors shadow-xs">
                    <Download size={16} className="text-sage-600" />
                    Export Reports
                </button>
            </div>

            {/* GRID UTAMA: 2 Kolom (Berdasarkan Mockup User) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                
                <ChartCard title="Mood Trends">
                    [ Recharts: AreaChart ]
                </ChartCard>

                <ChartCard title="Stress Level Vs Average Mood">
                    [ Recharts: Stacked BarChart ]
                </ChartCard>

                <ChartCard title="Journal Activities">
                    [ Recharts: Simple BarChart ]
                </ChartCard>

                <ChartCard title="Sleep vs Mood">
                    [ Recharts: ScatterChart ]
                </ChartCard>

            </div>
        </div>
    );
}
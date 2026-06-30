'use client';

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Download } from "lucide-react";
import { ENDPOINTS } from "@/lib/api";
import ChartCard from "@/components/molecules/ChartCard";
import MoodTrendChart from "@/components/organisms/charts/MoodTrendChart";
import BurnoutTrendChart from "@/components/organisms/charts/BurnoutTrendChart";
import JournalActivityChart from "@/components/organisms/charts/JournalActivityChart";
import SentimentBurnoutScatter from "@/components/organisms/charts/SentimentBurnoutScatter";

export default function Analytics() {
    const [granularity, setGranularity] = useState("week");
    const [analyticsData, setAnalyticsData] = useState([]);
    const [dailyData, setDailyData] = useState([]); // khusus untuk ScatterChart (selalu day)
    const [trendData, setTrendData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (gran) => {
        try {
            setLoading(true);
            setError(null);
            const [analyticsRes, trendRes, dailyRes] = await Promise.all([
                axios.get(ENDPOINTS.analyticsData, {
                    params: { granularity: gran, periods: 12 },
                    withCredentials: true,
                }),
                axios.get(ENDPOINTS.dashboardTrend, {
                    params: { days: 30 },
                    withCredentials: true,
                }),
                // Fetch harian khusus untuk ScatterChart — formatnya harus cocok dengan trendData.date
                axios.get(ENDPOINTS.analyticsData, {
                    params: { granularity: "day", periods: 30 },
                    withCredentials: true,
                }),
            ]);
            setAnalyticsData(analyticsRes.data.data || []);
            setTrendData(trendRes.data.data || []);
            setDailyData(dailyRes.data.data || []);
        } catch (err) {
            console.error("Gagal memuat data analytics:", err);
            setError("Gagal memuat data. Pastikan backend berjalan.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(granularity);
    }, [fetchData, granularity]);

    // Join dailyData (granularity=day) dengan trendData agar format tanggal cocok:
    // dailyData.period = "2026-06-30"  ←→  trendData.date = "2026-06-30" ✅
    const scatterData = trendData
        .filter((t) => t.burnout_percentage !== null)
        .map((t) => {
            const match = dailyData.find((a) => a.period === t.date);
            return {
                date: t.date,
                burnout: t.burnout_percentage,
                sentiment: match?.avg_sentiment ?? null,
            };
        })
        .filter((d) => d.sentiment !== null);

    return (
        <div className="space-y-8 animate-fade-in">

            {/* Header & Export */}
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

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                    ⚠️ {error}
                </div>
            )}

            {/* Grid 2 kolom */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

                {/* 1. Mood Trends — avg_sentiment per periode */}
                <ChartCard
                    title="Mood Trends"
                    onGranularityChange={(g) => setGranularity(g)}
                >
                    {loading
                        ? <LoadingPlaceholder />
                        : <MoodTrendChart data={analyticsData} />
                    }
                </ChartCard>

                {/* 2. Burnout Probability Trend — burnout_percentage per hari */}
                <ChartCard title="Burnout Probability — Last 30 Days" hideFilter>
                    {loading
                        ? <LoadingPlaceholder />
                        : <BurnoutTrendChart data={trendData} />
                    }
                </ChartCard>

                {/* 3. Journal Activity — entry_count per periode */}
                <ChartCard
                    title="Journal Activity"
                    onGranularityChange={(g) => setGranularity(g)}
                >
                    {loading
                        ? <LoadingPlaceholder />
                        : <JournalActivityChart data={analyticsData} />
                    }
                </ChartCard>

                {/* 4. Sentiment vs Burnout — ScatterChart korelasi */}
                <ChartCard title="Sentiment vs Burnout Correlation" hideFilter>
                    {loading
                        ? <LoadingPlaceholder />
                        : <SentimentBurnoutScatter data={scatterData} />
                    }
                </ChartCard>

            </div>

            {/* Legend zona burnout */}
            <div className="flex items-center gap-6 text-xs text-text-muted px-1">
                <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-status-burnout inline-block" />
                    Burnout ≥ 70%
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-status-risk inline-block" />
                    At Risk 40–69%
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-status-healthy inline-block" />
                    Healthy &lt; 40%
                </span>
            </div>
        </div>
    );
}

function LoadingPlaceholder() {
    return (
        <div className="h-full flex items-center justify-center text-sm text-text-muted animate-pulse">
            Memuat grafik...
        </div>
    );
}
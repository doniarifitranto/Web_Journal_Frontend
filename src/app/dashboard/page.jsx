'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import DashboardStats from "@/components/organisms/DashboardStats";
import BurnoutChart from "@/components/organisms/BurnoutChart";
import RecommendationList from "@/components/organisms/RecommendationList";
import HeatmapCalendar from "@/components/organisms/HeatmapCalendar";
import RecentJournals from "@/components/organisms/RecentJournals";

export default function Dashboard() {
    // State untuk mengambil total jurnal dari MongoDB
    const [totalJournalCount, setTotalJournalCount] = useState(0);

    // Fetch data total journal when page loads
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/journal/all', {
                    withCredentials: true,
                });
                setTotalJournalCount(response.data.count || 0);
            } catch (error) {
                console.error("Gagal memuat statistik dashboard:", error);
            }
        };

        fetchDashboardData();
    }, []);

    const activities = [
        { title: "Mindful Breathing", duration: "5 mins" },
        { title: "Guided Meditation", duration: "10 mins" },
        { title: "Evening Reflection", duration: "3 mins" },
    ];

    // Sample heatmap pattern (25 squares) — replace with real data when available
    const heatmapData = Array.from({ length: 25 }).map((_, i) => {
        if (i % 7 === 0) return 'burnout';
        if (i % 5 === 0) return 'risk';
        if (i % 3 === 0) return 'healthy';
        return 'neutral';
    });

    // Recent journal entries sample data
    const recentEntries = [
        {
            statusKey: 'burnout',
            statusLabel: 'Burnout',
            snippet: "I've been feeling overwhelmed with deadlines. The pressure at work is relentless and I barely slept last night. Everything feels like too much right now.",
            date: '2026-09-06',
            sentiment: '-0.72',
            percent: 84
        },
        {
            statusKey: 'risk',
            statusLabel: 'At risk',
            snippet: "I've been feeling overwhelmed with deadlines. The pressure at work is relentless and I barely slept last night. Everything feels like too much right now.",
            date: '2026-09-05',
            sentiment: '-0.61',
            percent: 55
        },
        {
            statusKey: 'healthy',
            statusLabel: 'Healthy',
            snippet: "I felt productive today. I successfully completed my main goals and still had time for some light exercise. Although I felt tired in the afternoon, I was able to take a break and regain my focus.",
            date: '2026-09-04',
            sentiment: '0.81',
            percent: 76
        }
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-text-dark">Dashboard</h1>
                <p className="text-text-muted text-sm mt-1">Your well being overview based on your entries</p>
            </div>

            {/* ROW 1: Stat cards */}
            <DashboardStats totalJournalCount={totalJournalCount} />

            {/* ROW 2: Chart + Recommendations + Heatmap */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
                <BurnoutChart />
                <RecommendationList activities={activities} />
                <HeatmapCalendar heatmapData={heatmapData} />
            </div>

            {/* ROW 3: Recent Journal Entries */}
            <RecentJournals entries={recentEntries} />
        </div>
    );
}
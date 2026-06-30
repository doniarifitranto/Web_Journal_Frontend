import React from 'react';
import StatCard from '../molecules/StatCard';
import { BookOpen, TrendingUp, Flame, Smile } from "lucide-react";

export default function DashboardStats({ stats = null, loading = false }) {
    // Burnout probability display
    const burnoutProb = stats?.burnout_probability != null
        ? `${Math.round(stats.burnout_probability)}%`
        : "—";
    const burnoutChange = stats?.burnout_change_this_week != null
        ? `${stats.burnout_change_this_week > 0 ? "📉 +" : "📈 "}${Math.abs(stats.burnout_change_this_week).toFixed(1)}% this week`
        : "Belum ada data minggu lalu";
    const burnoutPositive = (stats?.burnout_change_this_week ?? 1) <= 0;

    // Sentiment display
    const avgSentiment = stats?.avg_sentiment_7d != null
        ? stats.avg_sentiment_7d.toFixed(2)
        : "—";
    const sentimentTrend = stats?.sentiment_trend ?? "stable";
    const sentimentLabel =
        sentimentTrend === "improving" ? "📈 Improving 7d" :
        sentimentTrend === "declining" ? "⚠️ Declining 7d" : "➡️ Stable 7d";
    const sentimentPositive = sentimentTrend === "improving";

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
                title="Total Journal"
                value={loading ? "..." : (stats?.total_journal?.toString() ?? "0")}
                change={loading ? "Memuat..." : `📈 ${stats?.total_journal ?? 0} total entries`}
                isPositive={true}
                icon={BookOpen}
                iconBg="bg-sage-100"
                iconColor="text-sage-dark"
            />
            <StatCard
                title="Burnout Probability"
                value={loading ? "..." : burnoutProb}
                change={loading ? "Memuat..." : burnoutChange}
                isPositive={burnoutPositive}
                icon={TrendingUp}
                iconBg="bg-status-burnout/20"
                iconColor="text-status-burnout"
            />
            <StatCard
                title="Current Streak"
                value={loading ? "..." : `${stats?.current_streak ?? 0}d`}
                change={loading ? "Memuat..." : (stats?.current_streak > 0 ? "🔥 Keep it up!" : "Mulai streak hari ini!")}
                isPositive={(stats?.current_streak ?? 0) > 0}
                icon={Flame}
                iconBg="bg-status-healthy/30"
                iconColor="text-sage-700"
            />
            <StatCard
                title="Avg Sentiment (7d)"
                value={loading ? "..." : avgSentiment}
                change={loading ? "Memuat..." : sentimentLabel}
                isPositive={sentimentPositive}
                icon={Smile}
                iconBg="bg-status-risk/30"
                iconColor="text-amber-700"
            />
        </div>
    );
}

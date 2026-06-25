import React from 'react';
import StatCard from '../molecules/StatCard';
import { BookOpen, TrendingUp, Flame, Smile } from "lucide-react";

export default function DashboardStats({ totalJournalCount = 0 }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
                title="Total Journal"
                value={totalJournalCount.toString()}
                change={`📈 ${totalJournalCount} total entries`}
                isPositive={true}
                icon={BookOpen}
                iconBg="bg-sage-100"
                iconColor="text-sage-dark"
            />
            <StatCard
                title="Burnout Probability"
                value="78%"
                change="📉 +3.45% this week"
                isPositive={false}
                icon={TrendingUp}
                iconBg="bg-status-burnout/20"
                iconColor="text-status-burnout"
            />
            <StatCard
                title="Current Streak"
                value="3d"
                change="🔥 Keep it up!"
                isPositive={true}
                icon={Flame}
                iconBg="bg-status-healthy/30"
                iconColor="text-sage-700"
            />
            <StatCard
                title="Avg Sentiment"
                value="-0.11"
                change="⚠️ Declining 30d"
                isPositive={false}
                icon={Smile}
                iconBg="bg-status-risk/30"
                iconColor="text-amber-700"
            />
        </div>
    );
}

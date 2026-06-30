"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ENDPOINTS } from "@/lib/api";
import DashboardStats from "@/components/organisms/DashboardStats";
import BurnoutChart from "@/components/organisms/DashboardChart";
import RecommendationList from "@/components/organisms/RecommendationList";
import HeatmapCalendar from "@/components/organisms/HeatmapCalendar";
import RecentJournals from "@/components/organisms/RecentJournals";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [recentEntries, setRecentEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch semua endpoint dashboard sekaligus
        const [statsRes, trendRes, calendarRes, recsRes, journalsRes] =
          await Promise.all([
            axios.get(ENDPOINTS.dashboardStats, { withCredentials: true }),
            axios.get(ENDPOINTS.dashboardTrend, { withCredentials: true }),
            axios.get(ENDPOINTS.dashboardCalendar, { withCredentials: true }),
            axios.get(ENDPOINTS.dashboardRecommendations, { withCredentials: true }),
            axios.get(ENDPOINTS.journal, {
              params: { limit: 3 },
              withCredentials: true,
            }),
          ]);

        setStats(statsRes.data);
        setTrendData(trendRes.data.data || []);
        setCalendarData(calendarRes.data.data || []);
        setRecommendations(recsRes.data.recommendations || []);

        // Mapping data jurnal dari backend ke format yang dipakai RecentJournals
        const mapped = (journalsRes.data.journals || []).map((j) => {
          const labelLower = j.burnout_label?.toLowerCase() ?? "healthy";
          const statusKey =
            labelLower === "burnout"
              ? "burnout"
              : labelLower === "at risk"
                ? "risk"
                : "healthy";
          return {
            statusKey,
            statusLabel: j.burnout_label,
            snippet: j.journal_text,
            date: new Date(j.createdAt).toLocaleDateString("id-ID"),
            sentiment: j.sentiment?.toFixed(2) ?? "0.00",
            percent: Math.round(j.burnout_percentage ?? 0),
          };
        });
        setRecentEntries(mapped);
      } catch (err) {
        console.error("Gagal memuat data dashboard:", err);
        setError("Gagal memuat data. Pastikan backend berjalan.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-text-dark">Dashboard</h1>
        <p className="text-text-muted text-sm mt-1">
          Your well being overview based on your entries
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          ⚠️ {error}
        </div>
      )}

      {/* ROW 1: Stat cards */}
      <DashboardStats stats={stats} loading={loading} />

      {/* ROW 2: Chart + Recommendations + Heatmap */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
        <BurnoutChart data={trendData} loading={loading} />
        <RecommendationList activities={recommendations} loading={loading} />
        <HeatmapCalendar heatmapData={calendarData} loading={loading} />
      </div>

      {/* ROW 3: Recent Journal Entries */}
      <RecentJournals entries={recentEntries} loading={loading} />
    </div>
  );
}

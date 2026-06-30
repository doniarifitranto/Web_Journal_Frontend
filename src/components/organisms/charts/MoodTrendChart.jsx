"use client";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  return (
    <div className="bg-white border border-neutral-border rounded-xl px-3 py-2 shadow-md text-xs">
      <p className="font-semibold text-text-dark mb-1">{label}</p>
      <p className={`font-bold ${val >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
        Sentiment: {val?.toFixed(3)}
      </p>
    </div>
  );
};

export default function MoodTrendChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-text-muted">
        Belum ada data mood
      </div>
    );
  }

  // Hitung apakah tren positif atau negatif
  const last = data[data.length - 1]?.avg_sentiment ?? 0;
  const gradientId = "moodGradient";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={last >= 0 ? "#5c8372" : "#ff9b9b"} stopOpacity={0.25} />
            <stop offset="95%" stopColor={last >= 0 ? "#5c8372" : "#ff9b9b"} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e4e7ec" vertical={false} />
        <XAxis
          dataKey="period"
          tick={{ fontSize: 11, fill: "#525967" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => v.replace(/^\d{4}-/, "")}
        />
        <YAxis
          domain={[-1, 1]}
          tick={{ fontSize: 11, fill: "#525967" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => v.toFixed(1)}
        />
        <ReferenceLine y={0} stroke="#e4e7ec" strokeDasharray="4 4" />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="avg_sentiment"
          name="Avg Sentiment"
          stroke={last >= 0 ? "#5c8372" : "#ff9b9b"}
          strokeWidth={2.5}
          fill={`url(#${gradientId})`}
          dot={{ r: 3, fill: last >= 0 ? "#5c8372" : "#ff9b9b", strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

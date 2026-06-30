"use client";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const color = val >= 70 ? "#ff9b9b" : val >= 40 ? "#fde073" : "#a6d8b6";
  const status = val >= 70 ? "Burnout" : val >= 40 ? "At Risk" : "Healthy";
  return (
    <div className="bg-white border border-neutral-border rounded-xl px-3 py-2 shadow-md text-xs">
      <p className="font-semibold text-text-dark mb-1">{label}</p>
      <p className="font-bold" style={{ color }}>{status}: {val?.toFixed(1)}%</p>
    </div>
  );
};

export default function BurnoutTrendChart({ data = [] }) {
  if (!data.length || data.every((d) => d.burnout_percentage === null)) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-text-muted">
        Belum ada data burnout
      </div>
    );
  }

  // Isi null dengan 0 agar grafik tidak terputus
  const filled = data.map((d) => ({
    ...d,
    burnout_percentage: d.burnout_percentage ?? 0,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={filled} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
        <defs>
          <linearGradient id="burnoutGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff9b9b" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#ff9b9b" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e4e7ec" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: "#525967" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => v.slice(5)}
          interval="preserveStartEnd"
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fontSize: 11, fill: "#525967" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        {/* Zona referensi */}
        <ReferenceLine y={70} stroke="#ff9b9b" strokeDasharray="4 4" label={{ value: "Burnout", position: "insideTopRight", fontSize: 10, fill: "#ff9b9b" }} />
        <ReferenceLine y={40} stroke="#fde073" strokeDasharray="4 4" label={{ value: "At Risk", position: "insideTopRight", fontSize: 10, fill: "#b8860b" }} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="burnout_percentage"
          name="Burnout %"
          stroke="#ff9b9b"
          strokeWidth={2.5}
          fill="url(#burnoutGrad)"
          dot={{ r: 3, fill: "#ff9b9b", strokeWidth: 0 }}
          activeDot={{ r: 5 }}
          connectNulls
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

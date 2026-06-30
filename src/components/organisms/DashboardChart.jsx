"use client";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const status = val >= 70 ? "Burnout" : val >= 40 ? "At Risk" : "Healthy";
  const color = val >= 70 ? "#ff9b9b" : val >= 40 ? "#b8860b" : "#5c8372";
  return (
    <div className="bg-white border border-neutral-border rounded-xl px-3 py-2 shadow-md text-xs">
      <p className="font-semibold text-text-dark mb-1">{label}</p>
      <p className="font-bold" style={{ color }}>{status}: {val?.toFixed(1)}%</p>
    </div>
  );
};

export default function BurnoutChart({ data = [], loading = false }) {
  const hasData = data.some((d) => d.burnout_percentage !== null);

  // Isi null dengan 0 supaya grafik tidak terputus
  const filled = data.map((d) => ({
    ...d,
    burnout_percentage: d.burnout_percentage ?? 0,
  }));

  return (
    <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-neutral-border flex flex-col h-full min-h-64">
      <div className="mb-4">
        <h3 className="font-bold text-text-dark">Burnout Probability — Last 14 Days</h3>
        <p className="text-xs text-text-muted mt-0.5">
          {loading ? "Memuat data..." : hasData ? "Tren burnout harian kamu" : "Belum ada data — mulai tulis jurnal!"}
        </p>
      </div>

      <div className="flex-1 min-h-48">
        {loading ? (
          <div className="h-full flex items-center justify-center text-sm text-text-muted animate-pulse">
            Memuat grafik...
          </div>
        ) : !hasData ? (
          <div className="h-full flex items-center justify-center border-2 border-dashed border-sage-100 rounded-xl text-sage-500 text-sm font-medium">
            Tulis jurnal pertamamu untuk melihat grafik ini
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filled} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="dashBurnoutGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff9b9b" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ff9b9b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e7ec" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#525967" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => v.slice(5)}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: "#525967" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              {/* Garis batas zona */}
              <ReferenceLine y={70} stroke="#ff9b9b" strokeDasharray="4 4"
                label={{ value: "Burnout", position: "insideTopRight", fontSize: 9, fill: "#ff9b9b" }} />
              <ReferenceLine y={40} stroke="#fde073" strokeDasharray="4 4"
                label={{ value: "At Risk", position: "insideTopRight", fontSize: 9, fill: "#b8860b" }} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="burnout_percentage"
                stroke="#ff9b9b"
                strokeWidth={2.5}
                fill="url(#dashBurnoutGrad)"
                dot={{ r: 3, fill: "#ff9b9b", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
                connectNulls
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

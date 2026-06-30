"use client";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, ZAxis,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const status = d.burnout >= 70 ? "Burnout" : d.burnout >= 40 ? "At Risk" : "Healthy";
  const statusColor = d.burnout >= 70 ? "#ff9b9b" : d.burnout >= 40 ? "#b8860b" : "#5c8372";
  return (
    <div className="bg-white border border-neutral-border rounded-xl px-3 py-2 shadow-md text-xs">
      <p className="font-semibold text-text-dark mb-1">{d.date}</p>
      <p className="text-text-muted">Sentiment: <span className={`font-bold ${d.sentiment >= 0 ? "text-emerald-600" : "text-rose-500"}`}>{d.sentiment?.toFixed(3)}</span></p>
      <p className="text-text-muted">Burnout: <span className="font-bold" style={{ color: statusColor }}>{d.burnout?.toFixed(1)}% ({status})</span></p>
    </div>
  );
};

const getDotColor = (burnout) => {
  if (burnout >= 70) return "#ff9b9b";
  if (burnout >= 40) return "#fde073";
  return "#a6d8b6";
};

export default function SentimentBurnoutScatter({ data = [] }) {
  if (!data.length) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-text-muted">
        Belum ada data korelasi
      </div>
    );
  }

  // Pisah data per zona burnout untuk warna berbeda
  const zones = {
    burnout: data.filter((d) => d.burnout >= 70),
    risk: data.filter((d) => d.burnout >= 40 && d.burnout < 70),
    healthy: data.filter((d) => d.burnout < 40),
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e4e7ec" />
        <XAxis
          type="number"
          dataKey="sentiment"
          domain={[-1, 1]}
          name="Sentiment"
          tick={{ fontSize: 11, fill: "#525967" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => v.toFixed(1)}
          label={{ value: "Avg Sentiment →", position: "insideBottomRight", offset: -5, fontSize: 10, fill: "#525967" }}
        />
        <YAxis
          type="number"
          dataKey="burnout"
          domain={[0, 100]}
          name="Burnout %"
          tick={{ fontSize: 11, fill: "#525967" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <ZAxis range={[40, 40]} />
        <ReferenceLine y={70} stroke="#ff9b9b" strokeDasharray="4 4" />
        <ReferenceLine y={40} stroke="#fde073" strokeDasharray="4 4" />
        <ReferenceLine x={0} stroke="#e4e7ec" strokeDasharray="4 4" />
        <Tooltip content={<CustomTooltip />} />

        <Scatter name="Burnout" data={zones.burnout} fill="#ff9b9b" opacity={0.85} />
        <Scatter name="At Risk" data={zones.risk} fill="#fde073" opacity={0.85} />
        <Scatter name="Healthy" data={zones.healthy} fill="#a6d8b6" opacity={0.85} />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

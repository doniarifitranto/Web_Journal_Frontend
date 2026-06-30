"use client";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-neutral-border rounded-xl px-3 py-2 shadow-md text-xs">
      <p className="font-semibold text-text-dark mb-1">{label}</p>
      <p className="font-bold text-sage-500">{payload[0].value} entries</p>
    </div>
  );
};

export default function JournalActivityChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-text-muted">
        Belum ada data aktivitas jurnal
      </div>
    );
  }

  const maxVal = Math.max(...data.map((d) => d.entry_count));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e4e7ec" vertical={false} />
        <XAxis
          dataKey="period"
          tick={{ fontSize: 11, fill: "#525967" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => v.replace(/^\d{4}-/, "")}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 11, fill: "#525967" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8f8f8" }} />
        <Bar dataKey="entry_count" name="Entries" radius={[6, 6, 0, 0]} maxBarSize={40}>
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={entry.entry_count === maxVal ? "#5c8372" : "#b4c6be"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

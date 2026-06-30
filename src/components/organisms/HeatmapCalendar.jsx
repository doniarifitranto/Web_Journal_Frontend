import React from 'react';

// Map burnout_label dari backend ke warna
const heatmapClasses = {
    'Burnout': 'bg-status-burnout/70',
    'Healthy': 'bg-status-healthy/70',
    'At risk': 'bg-status-risk/70',
    null: 'bg-sage-100 border border-dashed border-sage-200',
};

const dayLabels = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export default function HeatmapCalendar({ heatmapData = [], loading = false }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-neutral-border flex flex-col h-full">
            <h3 className="font-bold text-text-dark mb-4">Heatmap calendar this week</h3>
            {loading ? (
                <div className="flex-1 flex items-center justify-center text-sm text-text-muted">Memuat...</div>
            ) : (
                <div className="flex gap-2 mt-2 flex-wrap">
                    {heatmapData.map((item, idx) => {
                        const label = item?.burnout_label ?? null;
                        const dayIdx = new Date(item.date).getDay();
                        const colorClass = heatmapClasses[label] ?? heatmapClasses[null];
                        return (
                            <div key={idx} className="flex flex-col items-center gap-1">
                                <div
                                    className={`h-8 w-8 rounded-md ${colorClass} transition-all`}
                                    title={`${item.date}: ${label ?? 'No entry'}`}
                                />
                                <span className="text-[10px] text-text-muted">{dayLabels[dayIdx]}</span>
                            </div>
                        );
                    })}
                </div>
            )}
            {/* Legend */}
            <div className="flex items-center gap-3 mt-4 flex-wrap">
                {[
                    { label: 'Burnout', cls: 'bg-status-burnout/70' },
                    { label: 'At risk', cls: 'bg-status-risk/70' },
                    { label: 'Healthy', cls: 'bg-status-healthy/70' },
                    { label: 'No entry', cls: 'bg-sage-100 border border-dashed border-sage-200' },
                ].map(({ label, cls }) => (
                    <div key={label} className="flex items-center gap-1.5 text-[10px] text-text-muted">
                        <span className={`h-3 w-3 rounded-sm ${cls}`} />
                        {label}
                    </div>
                ))}
            </div>
        </div>
    );
}

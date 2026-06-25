import React from 'react';

// Heatmap color classes mapped to the theme variables in globals.css
const heatmapClasses = {
    burnout: 'bg-status-burnout/70',
    healthy: 'bg-status-healthy/70',
    risk: 'bg-status-risk/70',
    neutral: 'bg-sage-200'
};

export default function HeatmapCalendar({ heatmapData = [] }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-neutral-border flex flex-col h-full">
            <h3 className="font-bold text-text-dark mb-4">Heatmap calendar on this week</h3>
            <div className="grid grid-cols-5 gap-2 mt-2">
                {heatmapData.map((type, idx) => (
                    <div key={idx} className={`h-6 w-6 rounded-md ${heatmapClasses[type] || heatmapClasses.neutral}`} />
                ))}
            </div>
        </div>
    );
}

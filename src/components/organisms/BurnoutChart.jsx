import React from 'react';

export default function BurnoutChart() {
    return (
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-neutral-border flex flex-col h-full">
            <div>
                <h3 className="font-bold text-text-dark mb-2">Burnout probability - Last 14 days</h3>
                <p className="text-xs text-text-muted mb-4">Load your data to see the graph</p>
            </div>
            <div className="flex-1 min-h-55 flex items-center justify-center border-2 border-dashed border-sage-100 rounded-xl text-sage-500 font-medium text-sm">
                [Area recharts line graph]
            </div>
        </div>
    );
}

import React, { useState } from 'react';

const FILTERS = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
];

export default function ChartCard({ title, children, onGranularityChange, hideFilter = false }) {
    const [activeFilter, setActiveFilter] = useState('week');

    const handleFilter = (value) => {
        setActiveFilter(value);
        onGranularityChange?.(value);
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-neutral-border flex flex-col h-[380px] shadow-xs">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-text-dark text-sm">{title}</h3>

                {/* Time Filter — sembunyikan jika tidak relevan */}
                {!hideFilter && (
                    <div className="flex bg-mood-bg rounded-lg p-1 text-xs font-medium">
                        {FILTERS.map(({ label, value }) => (
                            <button
                                key={value}
                                onClick={() => handleFilter(value)}
                                className={`px-3 py-1 rounded-md transition-all ${
                                    activeFilter === value
                                        ? 'bg-sage-200 text-sage-dark shadow-xs'
                                        : 'text-text-muted hover:text-text-dark'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Chart Area */}
            <div className="flex-1 w-full min-h-0">
                {children}
            </div>
        </div>
    );
}


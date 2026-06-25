import React, { useState } from 'react';

export default function ChartCard({ title, children }) {
    const [activeFilter, setActiveFilter] = useState('Week');
    const filters = ['Day', 'Week', 'Month'];

    return (
        <div className="bg-white p-6 rounded-2xl border border-neutral-border flex flex-col h-[380px] shadow-xs">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-text-dark text-sm">{title}</h3>
                
                {/* Time Filter */}
                <div className="flex bg-mood-bg rounded-lg p-1 text-xs font-medium">
                    {filters.map((filter) => (
                        <button 
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-3 py-1 rounded-md transition-all ${
                                activeFilter === filter 
                                    ? 'bg-sage-200 text-sage-dark shadow-xs' 
                                    : 'text-text-muted hover:text-text-dark'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Chart Area */}
            <div className="flex-1 w-full flex items-center justify-center border-2 border-dashed border-sage-100 rounded-xl bg-mood-bg/50 text-sage-500 text-sm font-medium">
                {children}
            </div>
        </div>
    );
}

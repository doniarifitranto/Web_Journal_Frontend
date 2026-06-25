import React from 'react';

export default function FilterTabs({ tabs, activeTab, onTabChange }) {
    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                        activeTab === tab 
                            ? 'bg-sage-dark text-white' 
                            : 'bg-white border border-neutral-border text-text-muted hover:bg-sage-50 hover:text-sage-dark'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}

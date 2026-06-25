import React from 'react';

export default function Badge({ status, label }) {
    // Normalize status to match keys
    const normalizedStatus = status?.toLowerCase().replace('at ', '');
    
    // Map status to classes based on the global CSS tokens
    const statusClasses = {
        burnout: 'bg-status-burnout/20 text-status-burnout',
        risk: 'bg-status-risk/20 text-amber-700',
        healthy: 'bg-status-healthy/20 text-sage-700'
    };

    // Get the class string or default to neutral gray if unknown
    const className = statusClasses[normalizedStatus] || 'bg-neutral-border/20 text-text-muted';

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${className}`}>
            {label || status}
        </span>
    );
}

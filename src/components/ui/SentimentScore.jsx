import React from 'react';

export default function SentimentScore({ score }) {
    const numericScore = parseFloat(score);
    // Based on the mockup/dashboard, negative is red (burnout color), positive is green (sage/healthy color)
    const isNegative = numericScore < 0;
    const className = isNegative ? 'text-status-burnout font-semibold' : 'text-status-healthy font-semibold';

    return (
        <span className={className}>
            {score}
        </span>
    );
}

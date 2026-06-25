import React from 'react';

export default function Button({ 
    children, 
    type = "button", 
    disabled = false, 
    isLoading = false, 
    className = "", 
    ...props 
}) {
    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            className={`w-full bg-sage-dark text-white font-medium rounded-xl py-3.5 hover:bg-sage-700 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
            {...props}
        >
            {isLoading ? 'Loading...' : children}
        </button>
    );
}

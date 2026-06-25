import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
    return (
        <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted/60" />
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-white border border-neutral-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-all text-text-dark placeholder:text-text-muted/60"
            />
        </div>
    );
}

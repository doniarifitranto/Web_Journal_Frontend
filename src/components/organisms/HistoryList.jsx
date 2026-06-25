import React from 'react';
import HistoryAccordionItem from './HistoryAccordionItem';
import { FileText } from 'lucide-react';

export default function HistoryList({ data, isLoading, onEdit, onDelete }) {
    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-700"></div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="bg-white border border-neutral-border border-dashed rounded-2xl flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="w-16 h-16 bg-sage-50 rounded-full flex items-center justify-center text-sage-400 mb-4">
                    <FileText size={32} />
                </div>
                <h3 className="text-lg font-bold text-text-dark mb-1">No Journal Entries Found</h3>
                <p className="text-sm text-text-muted max-w-sm">
                    We couldn't find any journal entries matching your current filters. Try adjusting your search or filter.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {data.map((entry) => (
                <HistoryAccordionItem 
                    key={entry._id} 
                    entry={entry} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                />
            ))}
        </div>
    );
}

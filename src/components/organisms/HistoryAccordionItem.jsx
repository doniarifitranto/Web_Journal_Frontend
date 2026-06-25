import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit2, Trash2, Calendar } from 'lucide-react';
import Badge from '../ui/Badge';
import SentimentScore from '../ui/SentimentScore';

export default function HistoryAccordionItem({ entry, onEdit, onDelete }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Format date DD-MM-YYYY
    const formattedDate = new Date(entry.createdAt || new Date()).toLocaleDateString('id-ID', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    }).replace(/\//g, '-');

    return (
        <div className="bg-white border border-neutral-border rounded-2xl overflow-hidden transition-all hover:border-sage-300">
            {/* Header / Condensed View */}
            <div 
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer bg-white hover:bg-sage-50/50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-start sm:items-center gap-4 flex-1">
                    <div className="hidden sm:flex p-3 rounded-xl bg-mood-bg text-sage-dark">
                        <Calendar size={20} />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-text-dark text-base">{entry.title}</h3>
                            <Badge status={entry.status} />
                        </div>
                        <div className="flex items-center gap-3 text-xs text-text-muted">
                            <span className="flex items-center gap-1"><Calendar size={12}/> {formattedDate}</span>
                            <span>•</span>
                            <span>Sentiment: <SentimentScore score={entry.sentiment_score} /></span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0">
                    <div className="text-right">
                        <div className={`text-xl font-bold ${
                            entry.status?.toLowerCase() === 'burnout' ? 'text-status-burnout' :
                            entry.status?.toLowerCase()?.includes('risk') ? 'text-amber-700' :
                            'text-sage-700'
                        }`}>
                            {entry.percentage || 0}%
                        </div>
                        <div className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Burnout Prob</div>
                    </div>
                    
                    <button className="text-text-muted hover:text-sage-dark p-2 rounded-lg hover:bg-mood-bg transition-colors">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                </div>
            </div>

            {/* Expanded Body */}
            {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-neutral-border/50 bg-sage-50/30 animate-fade-in">
                    <div className="mt-3 text-sm text-text-dark leading-relaxed whitespace-pre-wrap">
                        {entry.journal_text}
                    </div>
                    
                    <div className="flex items-center justify-end gap-3 mt-6">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onEdit(entry); }}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-200 rounded-xl hover:bg-sage-50 transition-colors"
                        >
                            <Edit2 size={16} /> Edit
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onDelete(entry._id); }}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-status-burnout bg-white border border-red-100 rounded-xl hover:bg-red-50 transition-colors"
                        >
                            <Trash2 size={16} /> Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

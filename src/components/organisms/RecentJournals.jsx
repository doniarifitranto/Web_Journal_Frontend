import React from 'react';

const statusBadge = {
    burnout: 'bg-status-burnout/20 text-status-burnout',
    risk: 'bg-status-risk/20 text-amber-700',
    healthy: 'bg-status-healthy/20 text-sage-700'
};

export default function RecentJournals({ entries = [], loading = false }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-neutral-border mt-4">
            <h3 className="font-bold text-text-dark mb-4">Recent Journal Entries</h3>
            {loading ? (
                <div className="text-sm text-text-muted text-center py-6">Memuat jurnal terbaru...</div>
            ) : entries.length === 0 ? (
                <div className="text-sm text-text-muted text-center py-6">Belum ada jurnal. Mulai tulis jurnal pertamamu!</div>
            ) : (
                <div className="space-y-4">
                    {entries.map((e, idx) => (
                        <div key={idx} className="flex items-start justify-between p-4 bg-white rounded-lg border border-neutral-border/60">
                            <div className="flex items-start gap-4">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${statusBadge[e.statusKey] || 'bg-gray-100 text-gray-500'}`}>
                                    {e.statusLabel}
                                </span>
                                <div className="max-w-[70ch]">
                                    <p className="text-sm text-text-dark line-clamp-2">{e.snippet}</p>
                                    <div className="text-xs text-text-muted mt-2">
                                        {e.date} — sentiment: <span className={`font-semibold ${Number(e.sentiment) < 0 ? 'text-status-burnout' : 'text-sage-700'}`}>{e.sentiment}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right ml-4 shrink-0">
                                <div className={`${e.statusKey === 'burnout' ? 'text-status-burnout' : e.statusKey === 'risk' ? 'text-amber-700' : 'text-sage-700'} text-2xl font-bold`}>
                                    {e.percent}%
                                </div>
                                <div className="text-xs text-text-muted">{e.statusLabel}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

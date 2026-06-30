import React from 'react';

export default function RecommendationList({ activities = [], loading = false }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-neutral-border flex flex-col h-full">
            <h3 className="font-bold text-text-dark mb-4">Recommendation Activities</h3>
            {loading ? (
                <div className="flex-1 flex items-center justify-center text-sm text-text-muted">Memuat...</div>
            ) : activities.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-sm text-text-muted">Belum ada rekomendasi</div>
            ) : (
                <div className="space-y-3 mt-2">
                    {activities.map((a, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-sage-100/50 border border-sage-200/40">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-sage-100 text-sage-dark">🍃</span>
                                <div className="text-sm font-medium text-sage-dark">
                                    {a.title}
                                    <div className="text-xs text-text-muted font-normal">{a.duration}</div>
                                    {a.reason && (
                                        <div className="text-xs text-sage-500 font-normal italic mt-0.5">{a.reason}</div>
                                    )}
                                </div>
                            </div>
                            <span className="text-sage-400 text-sm">&gt;</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

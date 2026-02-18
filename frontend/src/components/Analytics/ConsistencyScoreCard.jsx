import React from 'react';

const ConsistencyScoreCard = ({ score = 0, level = 'Poor' }) => {
    const safeScore = Math.max(0, Math.min(100, Number.isFinite(score) ? score : 0));

    const gradient = `conic-gradient(#22c55e ${safeScore * 3.6}deg, #020617 ${safeScore * 3.6}deg)`;

    return (
        <div className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
                <div className="space-y-1.5 pb-0">
                    <h3 className="text-base md:text-lg font-semibold text-white">Study Consistency</h3>
                    <p className="text-xs md:text-sm text-slate-400">
                        Your day-to-day commitment over time.
                    </p>
                </div>
                <div className="pt-3 space-y-2">
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-white">{safeScore}</span>
                        <span className="text-slate-500 text-sm">/ 100</span>
                    </div>
                    <p className="text-sm font-medium text-slate-300">
                        Level{' '}
                        <span
                            className={
                                level === 'Excellent'
                                    ? 'text-emerald-400'
                                    : level === 'Average'
                                        ? 'text-amber-400'
                                        : 'text-rose-400'
                            }
                        >
                            {level}
                        </span>
                    </p>
                </div>
            </div>
            <div className="w-full md:w-auto flex justify-start md:justify-end">
                <div
                    className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center border border-slate-800/80"
                    style={{ backgroundImage: gradient }}
                >
                    <div className="absolute inset-1 rounded-full bg-slate-950 flex flex-col items-center justify-center">
                        <span className="text-lg md:text-xl font-bold text-white">{safeScore}</span>
                        <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-500">
                            Score
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsistencyScoreCard;


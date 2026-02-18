import React from 'react';
import { Lightbulb } from 'lucide-react';

const RecommendationsList = ({ recommendations = [] }) => {
    return (
        <div className="glass-card p-6 space-y-4">
            <div className="flex flex-row items-center gap-2">
                <div className="p-1.5 rounded-lg bg-yellow-500/10">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-white">Smart Recommendations</h3>
                    <p className="text-xs md:text-sm text-slate-400">
                        Data-informed tips to improve your study performance.
                    </p>
                </div>
            </div>
            <div className="pt-1 space-y-3">
                {recommendations.length === 0 ? (
                    <p className="text-slate-500 text-sm italic">
                        Add and complete more study sessions to unlock personalized recommendations.
                    </p>
                ) : (
                    recommendations.map((rec, idx) => (
                        <div
                            key={idx}
                            className="border border-primary-600/40 bg-primary-600/5 rounded-lg px-3 py-2 text-sm text-slate-100"
                        >
                            {rec}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecommendationsList;


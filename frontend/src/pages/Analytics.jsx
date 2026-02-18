import { useState, useEffect } from 'react';
import api from '../utils/api';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { BarChart3, TrendingUp, Target, Award, Info } from 'lucide-react';

const Analytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const { data } = await api.get('/analytics');
                setAnalytics(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) return <div className="p-8 text-center text-slate-400">Loading Analytics...</div>;

    const COLORS = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

    const subjectStats = analytics?.subjectStats || {};
    const subjectData = Object.keys(subjectStats).map((subj, idx) => ({
        name: subj,
        duration: (subjectStats[subj].duration / 60).toFixed(1),
        rate: Math.round((subjectStats[subj].completed / subjectStats[subj].count) * 100)
    }));

    return (
        <div className="space-y-8 pb-10">
            <header>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <BarChart className="w-8 h-8 text-primary-500" />
                    Detailed Performance Analytics
                </h1>
                <p className="text-slate-400 mt-1">Deep dive into your learning patterns and efficiency.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Subject wise Time Allocation */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Subject Hours Breakdown</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={subjectData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="duration"
                                >
                                    {subjectData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Completion Rate Trends */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Subject Completion Rates (%)</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={subjectData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} />
                                <XAxis type="number" stroke="#94a3b8" fontSize={12} domain={[0, 100]} />
                                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={80} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                />
                                <Bar dataKey="rate" fill="#10b981" radius={[0, 4, 4, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Efficiency Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 border-l-4 border-primary-500">
                    <div className="flex items-center gap-3 mb-4">
                        <Target className="w-5 h-5 text-primary-500" />
                        <h3 className="font-semibold text-white uppercase text-xs tracking-widest">Efficiency Score</h3>
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">
                        {analytics?.completionRate}%
                    </div>
                    <p className="text-sm text-slate-400">Your average task completion efficiency based on logged sessions.</p>
                </div>

                <div className="glass-card p-6 border-l-4 border-purple-500">
                    <div className="flex items-center gap-3 mb-4">
                        <Award className="w-5 h-5 text-purple-500" />
                        <h3 className="font-semibold text-white uppercase text-xs tracking-widest">Top Subject</h3>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2 truncate">
                        {subjectData.sort((a, b) => b.duration - a.duration)[0]?.name || 'N/A'}
                    </div>
                    <p className="text-sm text-slate-400">The subject where you have invested the most study time recently.</p>
                </div>

                <div className="glass-card p-6 border-l-4 border-orange-500">
                    <div className="flex items-center gap-3 mb-4">
                        <TrendingUp className="w-5 h-5 text-orange-500" />
                        <h3 className="font-semibold text-white uppercase text-xs tracking-widest">Daily Average</h3>
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">
                        {(analytics?.totalHours / 7).toFixed(1)} <span className="text-lg text-slate-500 font-normal">hrs</span>
                    </div>
                    <p className="text-sm text-slate-400">Average time spent studying per day over the last week.</p>
                </div>
            </div>

            <div className="glass-card p-6 bg-primary-600/5 border-dashed border-primary-500/30">
                <div className="flex items-start gap-4">
                    <div className="bg-primary-500/10 p-2 rounded-lg">
                        <Info className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-1">Growth Recommendation</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Based on your {subjectData.length} subjects, you are showing {analytics?.completionRate > 70 ? 'exceptional' : 'steady'} progress.
                            {subjectData.length > 0 && subjectData.find(s => s.rate < 50) ?
                                ` Focusing on completing more tasks in ${subjectData.find(s => s.rate < 50).name} could boost your overall score.` :
                                ' Keep maintaining your current study rhythm.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;

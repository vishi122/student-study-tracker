import { LayoutDashboard, BookOpen, BarChart, History as HistoryIcon, LogOut, GraduationCap } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'Study Management', icon: BookOpen, path: '/studies' },
        { name: 'Analytics', icon: BarChart, path: '/analytics' },
        { name: 'Activity History', icon: HistoryIcon, path: '/history' },
    ];

    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 h-screen sticky top-0 hidden md:flex flex-col">
            <div className="p-6 flex items-center gap-3">
                <div className="bg-primary-600 p-2 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    StudyUp
                </span>
            </div>

            <nav className="flex-1 px-4 mt-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                ? 'bg-primary-600/10 text-primary-400 border border-primary-600/20'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 p-3 mb-4 rounded-lg bg-slate-800/50">
                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center font-bold text-white">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;

import React, { useState } from 'react';
import { Bell, Search, ChevronDown, Circle, LayoutDashboard, Activity, FileText, MessageSquare, BookOpen, Share2, Database, Settings, Search as SearchIcon, User, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PAGE_META: Record<string, { label: string; icon: React.FC<any> }> = {
  dashboard:        { label: 'Dashboard',         icon: LayoutDashboard },
  'machine-health': { label: 'Machine Health',    icon: Activity },
  assistant:        { label: 'AI Assistant',      icon: MessageSquare },
  documents:        { label: 'Documents',         icon: FileText },
  library:          { label: 'Document Library',  icon: BookOpen },
  evidence:         { label: 'Evidence Viewer',   icon: SearchIcon },
  'knowledge-graph':{ label: 'Knowledge Graph',  icon: Share2 },
  models:           { label: 'Model Performance', icon: Database },
  settings:         { label: 'Settings',          icon: Settings },
};

const NOTIFICATIONS = [
  { id: 1, msg: 'Pump-Sys-B: Vibration alert triggered', time: '2m ago', unread: true, severity: 'critical' },
  { id: 2, msg: 'IRB-6700-01: Temperature threshold exceeded', time: '14m ago', unread: true, severity: 'warning' },
  { id: 3, msg: 'Motor-X90: Maintenance manual updated', time: '2h ago', unread: false, severity: 'info' },
];

const TopNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [showNotifs, setShowNotifs] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [searchQ, setSearchQ] = useState('');

  const segment = location.pathname.split('/').filter(Boolean)[0] || 'dashboard';
  const meta = PAGE_META[segment] || { label: segment.charAt(0).toUpperCase() + segment.slice(1), icon: LayoutDashboard };
  const PageIcon = meta.icon;
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQ.trim()) {
      navigate(`/library?search=${encodeURIComponent(searchQ)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
      {/* Left — breadcrumb */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
        <span className="text-slate-400 text-xs font-medium">ABB Nexus</span>
        <span className="text-slate-300">/</span>
        <PageIcon className="w-4 h-4 text-slate-500" />
        <span className="text-sm font-semibold text-slate-800">{meta.label}</span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* System time */}
        <div className="hidden md:flex flex-col items-end mr-1">
          <span className="text-xs font-mono text-slate-700">{timeStr}</span>
          <span className="text-[10px] text-slate-400">{dateStr}</span>
        </div>

        {/* Global Search */}
        <form onSubmit={handleGlobalSearch} className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search manuals, machines…"
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            className="w-52 pl-9 pr-3 py-1.5 bg-slate-100 border border-transparent rounded-lg text-xs focus:outline-none focus:bg-white focus:border-slate-300 focus:ring-1 focus:ring-primary/30 transition-all"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </form>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifs(v => !v); setShowUser(false); }}
            className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Bell className="w-4.5 h-4.5 w-[18px] h-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-800">Notifications</p>
                <span className="text-xs text-primary font-medium cursor-pointer hover:underline" onClick={() => setShowNotifs(false)}>Dismiss</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {NOTIFICATIONS.map(n => (
                  <div
                    key={n.id}
                    onClick={() => { setShowNotifs(false); navigate(n.severity === 'critical' ? '/machine-health' : '/dashboard'); }}
                    className={`px-4 py-3 flex gap-3 hover:bg-slate-50 cursor-pointer ${n.unread ? 'bg-red-50/40' : ''}`}
                  >
                    <Circle className={`w-2 h-2 mt-1.5 shrink-0 ${n.severity === 'critical' ? 'fill-red-500 text-red-500' : n.severity === 'warning' ? 'fill-amber-500 text-amber-500' : 'fill-slate-300 text-slate-300'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-700 leading-snug">{n.msg}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* System status dot */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-semibold text-emerald-700">Systems Online</span>
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => { setShowUser(v => !v); setShowNotifs(false); }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">
              {user?.avatar || 'T'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-slate-800 leading-none">{user?.name || 'Technician'}</p>
              <p className="text-[10px] text-slate-400 leading-none mt-0.5">{user?.role || 'Field Engineer'}</p>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showUser && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                <p className="text-xs font-semibold text-slate-800">{user?.name || 'Technician'}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.email || 'technician@abb.com'}</p>
                {user?.authMode === 'DEMO_SSO' && (
                  <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider text-primary bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                    AUTH MODE: DEMO SSO
                  </span>
                )}
              </div>
              <div className="py-1 text-xs">
                <button
                  onClick={() => { setShowUser(false); navigate('/settings'); }}
                  className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" /> Profile & Account
                </button>
                <button
                  onClick={() => { setShowUser(false); navigate('/settings'); }}
                  className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" /> Settings & System
                </button>
                <div className="border-t border-slate-100 my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-500" /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;

import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, MessageSquare, Search,
  Activity, Share2, BookOpen, Database, Settings,
  ChevronLeft, ChevronRight, LogOut, User, Zap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
}

const navGroups = [
  {
    label: 'Operations',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { name: 'Machine Health', path: '/machine-health', icon: Activity },
      { name: 'Assistant', path: '/assistant', icon: MessageSquare },
    ],
  },
  {
    label: 'Knowledge',
    items: [
      { name: 'Documents', path: '/documents', icon: FileText },
      { name: 'Document Library', path: '/library', icon: BookOpen },
      { name: 'Evidence Viewer', path: '/evidence', icon: Search },
      { name: 'Knowledge Graph', path: '/knowledge-graph', icon: Share2 },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { name: 'Model Performance', path: '/models', icon: Database },
    ],
  },
  {
    label: 'System',
    items: [
      { name: 'Settings', path: '/settings', icon: Settings },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`bg-slate-900 text-slate-400 flex flex-col transition-all duration-300 ease-in-out shrink-0 ${
        collapsed ? 'w-[68px]' : 'w-[240px]'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center border-b border-slate-800 shrink-0 px-4 gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center shrink-0 shadow-sm">
          <Zap className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-white font-bold text-sm leading-tight whitespace-nowrap">ABB Nexus</p>
            <p className="text-slate-500 text-[10px] whitespace-nowrap">Maintenance Intelligence</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-1">
            {!collapsed && (
              <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                {group.label}
              </p>
            )}
            {collapsed && <div className="border-t border-slate-800 mx-3 my-2" />}
            <ul className="space-y-0.5 px-2">
              {group.items.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      title={collapsed ? item.name : undefined}
                      className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 relative
                        ${isActive
                          ? 'bg-slate-800 text-white'
                          : 'hover:bg-slate-800/60 hover:text-slate-200'
                        }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full" />
                      )}
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : 'text-slate-500 group-hover:text-slate-300'}`} />
                      {!collapsed && <span className="truncate">{item.name}</span>}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Profile Footer */}
      <div className="border-t border-slate-800 p-3">
        {!collapsed ? (
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-800/60 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
              {user?.avatar || 'T'}
            </div>
            <div className="flex-1 min-w-0" onClick={() => navigate('/settings')}>
              <p className="text-xs font-semibold text-slate-200 truncate">{user?.name || 'Technician'}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.role || 'Field Engineer'}</p>
            </div>
            <button
              onClick={handleLogout}
              title="Sign out"
              className="opacity-80 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-red-400 p-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              title="Sign out"
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-950/50 hover:text-red-400 flex items-center justify-center text-slate-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mt-2 w-full flex items-center justify-center p-1.5 rounded-lg hover:bg-slate-800 text-slate-600 hover:text-slate-300 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

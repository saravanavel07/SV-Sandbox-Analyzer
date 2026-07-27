import React from 'react';
import { 
  LayoutDashboard, 
  Terminal, 
  GitFork, 
  Workflow, 
  BarChart2, 
  FileText, 
  ShieldCheck, 
  Zap, 
  HardDrive,
  Activity
} from 'lucide-react';
import { ModuleTab } from '../types';

interface SidebarProps {
  activeTab: ModuleTab;
  onTabChange: (tab: ModuleTab) => void;
  vramSavingsPercent: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  vramSavingsPercent
}) => {
  const navItems: { id: ModuleTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'notebooks', label: 'Enterprise AI Notebooks', icon: Terminal, badge: 'PyTorch 2.3' },
    { id: 'pipelines', label: 'Pipeline & Quantization', icon: GitFork, badge: 'INT4 AWQ' },
    { id: 'agents', label: 'Multi-Agent Orchestrator', icon: Workflow, badge: 'DAG' },
    { id: 'analytics', label: 'Results & Analytics', icon: BarChart2 },
    { id: 'reports', label: 'Auto-Reports & Docs', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-[#0F1117] border-r border-[#1E2129] flex flex-col justify-between shrink-0 select-none relative z-10">
      {/* Navigation Links */}
      <div className="p-4 space-y-2">
        <div className="px-3 py-2 text-[10px] font-semibold tracking-wider text-slate-500 uppercase flex items-center justify-between">
          <span>Experimentation Modules</span>
          <span className="flex items-center space-x-1 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[9px] font-mono">LIVE</span>
          </span>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-medium transition-all group relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-purple-950/40 via-cyan-950/30 to-emerald-950/40 text-purple-200 border border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#14161C] border border-transparent'
              }`}
            >
              {isActive && (
                <>
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 via-cyan-400 via-purple-400 to-pink-500 rounded-r animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-shift pointer-events-none" />
                </>
              )}
              <div className="flex items-center space-x-2.5 z-10">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono z-10 ${
                  isActive ? 'bg-purple-500/25 text-purple-200 border border-purple-400/30' : 'bg-[#1E2129] text-slate-500'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Enterprise Quota & Environment Footer */}
      <div className="p-3 m-3 bg-[#14161C] rounded-xl border border-[#1E2129] space-y-3 relative overflow-hidden group">
        {/* Subtle moving shimmer ray */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent animate-shimmer pointer-events-none" />

        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center space-x-1.5">
            <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
            <span>VRAM Efficiency</span>
          </span>
          <span className="font-mono text-emerald-400 font-bold flex items-center space-x-1">
            <Zap className="w-3 h-3 text-emerald-400 animate-bounce" />
            <span>{vramSavingsPercent}%</span>
          </span>
        </div>

        {/* Live animated progress bar */}
        <div className="w-full bg-[#1E2129] h-2 rounded-full overflow-hidden p-0.5 border border-[#2D3139]">
          <div 
            className="bg-gradient-to-r from-emerald-500 via-cyan-400 to-indigo-500 h-full rounded-full transition-all duration-700 relative" 
            style={{ width: `${vramSavingsPercent}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
          </div>
        </div>

        <div className="pt-2 border-t border-[#1E2129] flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Cluster: Active</span>
          </div>
          <span className="text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded text-[10px] border border-slate-800">4x H100</span>
        </div>
      </div>
    </aside>
  );
};


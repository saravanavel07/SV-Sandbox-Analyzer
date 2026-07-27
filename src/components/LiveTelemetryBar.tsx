import React from 'react';
import { Activity, Cpu, Zap, Radio, Server, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const LiveTelemetryBar: React.FC = () => {
  const tickerItems = [
    { label: 'CLAUDE 3.5 SONNET', status: '42ms TTFT', highlight: 'PROMPT CACHED', color: 'text-emerald-400' },
    { label: 'GPT-4O CLUSTER', status: '184 tok/s', highlight: 'INT4 AWQ ACTIVE', color: 'text-cyan-400' },
    { label: 'GROK-2 VISION', status: '99.98% SLA', highlight: 'ONLINE', color: 'text-indigo-400' },
    { label: 'FABLE ULTRA 1.0', status: '14.2 GB VRAM', highlight: 'OPTIMIZED', color: 'text-amber-400' },
    { label: 'NVIDIA H100 SXM', status: 'GPU TEMP 54°C', highlight: 'CLUSTER HEALTHY', color: 'text-emerald-400' },
    { label: 'REDIS SEMANTIC CACHE', status: '84.2% HIT RATIO', highlight: 'ACTIVE', color: 'text-cyan-400' },
  ];

  return (
    <div className="w-full bg-[#080A0E] border-b border-[#1E2129] py-1.5 px-4 overflow-hidden relative select-none flex items-center justify-between text-xs font-mono z-30">
      {/* Animated subtle top border shimmer */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-purple-500/30 via-pink-500/30 via-emerald-500/30 to-cyan-500/30 animate-gradient-shift" />

      {/* Left Fixed Label */}
      <div className="flex items-center space-x-2 shrink-0 bg-[#080A0E] pr-3 z-10 border-r border-[#1E2129]">
        <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-500/15 via-purple-500/15 to-pink-500/15 border border-purple-500/30 text-purple-300 text-[10px] font-bold tracking-wider animate-pulse">
          <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
          <span>LIVE SPECTRUM</span>
        </div>
        <span className="text-[11px] text-slate-400 hidden sm:inline">TELEMETRY STREAM</span>
      </div>

      {/* Scrolling Ticker Stream */}
      <div className="flex-1 overflow-hidden relative mx-4">
        <div className="flex items-center space-x-8 animate-ticker whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2 text-[11px]">
              <span className="text-slate-400 font-bold">{item.label}:</span>
              <span className={`${item.color} font-mono`}>{item.status}</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#1E2129] text-slate-300 font-semibold border border-slate-700/50">
                {item.highlight}
              </span>
              <span className="text-slate-700">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Fixed Status Indicator */}
      <div className="hidden lg:flex items-center space-x-3 shrink-0 bg-[#0B0C10] pl-3 z-10 border-l border-[#1E2129]">
        <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
          <Server className="w-3.5 h-3.5 text-cyan-400" />
          <span>Nodes: <strong className="text-slate-200">12/12</strong></span>
        </div>
        <div className="flex items-center space-x-1 text-slate-400 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>ISO 27001</span>
        </div>
      </div>
    </div>
  );
};

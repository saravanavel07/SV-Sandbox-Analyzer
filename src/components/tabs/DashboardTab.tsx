import React from 'react';
import { 
  Zap, 
  Cpu, 
  HardDrive, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  Activity, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles, 
  Play, 
  Layers,
  BarChart3,
  Bot
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { ExperimentRecord, SystemMetrics, ModuleTab } from '../../types';

interface DashboardTabProps {
  metrics: SystemMetrics;
  experiments: ExperimentRecord[];
  onSelectTab: (tab: ModuleTab) => void;
  onRunBenchmark: () => void;
  onApplyOptimization: (opt: string) => void;
}

const PERFORMANCE_TREND_DATA = [
  { time: '10:00', throughputTokSec: 92, latencyMs: 280, vramGb: 38 },
  { time: '10:15', throughputTokSec: 110, latencyMs: 210, vramGb: 32 },
  { time: '10:30', throughputTokSec: 145, latencyMs: 120, vramGb: 22 },
  { time: '10:45', throughputTokSec: 184, latencyMs: 42, vramGb: 14.2 },
  { time: '11:00', throughputTokSec: 210, latencyMs: 38, vramGb: 14.2 },
];

export const DashboardTab: React.FC<DashboardTabProps> = ({
  metrics,
  experiments,
  onSelectTab,
  onRunBenchmark,
  onApplyOptimization
}) => {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Hero Welcome & Quick Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#0F111A] p-6 md:p-8 rounded-2xl border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] relative overflow-hidden group">
        {/* Animated Multi-Color Glow Background Aura */}
        <div className="absolute -right-10 -top-10 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 via-purple-500/15 to-pink-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-shift pointer-events-none" />
        
        <div className="space-y-2.5 z-10">
          <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-purple-400/40 text-purple-300 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              <span>SV Sandbox Enterprise Multi-Spectrum Platform</span>
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>AI Model Experimentation & Orchestration Hub</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Isolated enterprise playground for model quantization, prompt caching benchmarking, and multi-agent DAG workflow verification.
          </p>
        </div>

        <div className="flex items-center space-x-4 z-10 shrink-0">
          <button
            onClick={() => onSelectTab('notebooks')}
            className="px-5 py-3 rounded-xl bg-[#181B24] hover:bg-[#222634] text-slate-200 border border-purple-500/30 text-xs font-semibold transition-all hover:scale-105 shadow-md flex items-center space-x-2"
          >
            <span>Open Workbench</span>
          </button>

          <button
            onClick={onRunBenchmark}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 via-purple-600 to-pink-600 hover:brightness-110 text-white text-xs font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all hover:scale-105 flex items-center space-x-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run New Experiment</span>
          </button>
        </div>
      </div>

      {/* Metric KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6">
        {/* KPI 1 */}
        <div className="live-multi-card p-5 space-y-2 group hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold text-slate-400">
            <span>Active Runs</span>
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <div className="text-2xl font-serif italic text-white">{metrics.activeExperiments}</div>
          <div className="text-[10px] text-emerald-400 flex items-center font-mono">
            <TrendingUp className="w-3 h-3 mr-0.5" />
            <span>+3 this session</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="live-multi-card p-5 space-y-2 group hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold text-slate-400">
            <span>Avg TTFT Latency</span>
            <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
          </div>
          <div className="text-2xl font-serif italic text-cyan-300">
            {metrics.avgLatencyMs}<span className="text-xs not-italic text-slate-400 font-sans ml-1">ms</span>
          </div>
          <div className="text-[10px] text-emerald-400 flex items-center font-mono">
            <span>65% faster with cache</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="live-multi-card p-5 space-y-2 group hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold text-slate-400">
            <span>VRAM Savings</span>
            <HardDrive className="w-4 h-4 text-purple-400 animate-pulse" />
          </div>
          <div className="text-2xl font-serif italic text-purple-300">-{metrics.vramSavingsPercent}%</div>
          <div className="text-[10px] text-purple-300 font-mono">INT4 AWQ Precision</div>
        </div>

        {/* KPI 4 */}
        <div className="live-multi-card p-5 space-y-2 group hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold text-slate-400">
            <span>Cache Hit Ratio</span>
            <Zap className="w-4 h-4 text-pink-400 animate-bounce" />
          </div>
          <div className="text-2xl font-serif italic text-pink-300">{metrics.cacheHitRatio}%</div>
          <div className="text-[10px] text-pink-300 font-mono">Prompt Caching Layer</div>
        </div>

        {/* KPI 5 */}
        <div className="live-multi-card p-5 space-y-2 group hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold text-slate-400">
            <span>Cost Reduction</span>
            <DollarSign className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>
          <div className="text-2xl font-serif italic text-amber-300">-{metrics.avgCostSavings}%</div>
          <div className="text-[10px] text-amber-300 font-mono">vs FP16 Baseline</div>
        </div>

        {/* KPI 6 */}
        <div className="live-multi-card p-5 space-y-2 group hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold text-slate-400">
            <span>Tokens Served</span>
            <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <div className="text-2xl font-serif italic text-white">{metrics.totalTokensProcessed}</div>
          <div className="text-[10px] text-slate-400 font-mono">Total Sandbox Volume</div>
        </div>
      </div>

      {/* Charts & Recommendations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Curve Chart */}
        <div className="lg:col-span-2 live-multi-card p-6 md:p-7 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Real-Time Inference Throughput vs TTFT Latency</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">Effect of INT4 AWQ Quantization + Prompt Caching over time</p>
            </div>
            <div className="flex items-center space-x-4 text-xs font-mono">
              <span className="flex items-center space-x-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                <span>Throughput (tok/s)</span>
              </span>
              <span className="flex items-center space-x-1.5 text-purple-400">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span>
                <span>Latency (ms)</span>
              </span>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PERFORMANCE_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="throughputGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="latencyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D3139" opacity={0.6} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0C14', borderColor: '#3B82F6', borderRadius: '12px', fontSize: '12px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="throughputTokSec" name="Throughput (tok/s)" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#throughputGrad)" />
                <Area type="monotone" dataKey="latencyMs" name="TTFT Latency (ms)" stroke="#a855f7" strokeWidth={2.5} fillOpacity={1} fill="url(#latencyGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Assistant Optimization Engine */}
        <div className="live-multi-card p-6 md:p-7 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-purple-600/25 text-purple-300 border border-purple-500/40">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <h3 className="text-sm font-bold text-slate-100">AI Multi-Spectrum Advisor</h3>
            </div>

            <div className="p-4 bg-[#080A10] border border-purple-500/30 rounded-xl space-y-2.5">
              <div className="text-xs font-semibold text-purple-300 flex items-center justify-between">
                <span>INT4 AWQ Memory Drop</span>
                <span className="text-[10px] px-2 py-0.5 bg-purple-500/20 text-purple-200 rounded border border-purple-400/30 font-mono">1-Click Fix</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Switching your active pipeline from FP16 to INT4 AWQ reduces GPU VRAM footprint from 38.0 GB to 14.2 GB with &lt;0.1 perplexity impact.
              </p>
              <button
                onClick={() => onApplyOptimization('INT4 AWQ')}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center space-x-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Apply INT4 AWQ Precision</span>
              </button>
            </div>

            <div className="p-4 bg-[#080A10] border border-emerald-500/30 rounded-xl space-y-2.5">
              <div className="text-xs font-semibold text-emerald-300 flex items-center justify-between">
                <span>Prompt Caching Layer</span>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-200 rounded border border-emerald-400/30 font-mono">High Impact</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enable Prompt Caching on system instructions to cut TTFT from 180ms down to 42ms for repeated prompts.
              </p>
              <button
                onClick={() => onApplyOptimization('Prompt Caching')}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 hover:brightness-110 text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center space-x-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Enable Prompt Caching</span>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-[#1E2129] flex items-center justify-between text-xs text-slate-400">
            <span>Enterprise Multi-Model Engine</span>
            <button
              onClick={() => onSelectTab('analytics')}
              className="text-cyan-400 hover:underline flex items-center space-x-1 font-semibold"
            >
              <span>View Analytics</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Experiments Table */}
      <div className="live-multi-card p-6 md:p-7 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-pink-400 animate-pulse" />
              <span>Recent Sandbox Experiment Benchmarks</span>
            </h3>
            <p className="text-xs text-slate-400">Execution logs across models, quantization, and caching strategies</p>
          </div>

          <button
            onClick={() => onSelectTab('analytics')}
            className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center space-x-1"
          >
            <span>Compare Matrix</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#080A10] text-slate-400 font-semibold border-b border-[#1E2129]">
              <tr>
                <th className="p-3">Experiment Name</th>
                <th className="p-3">Model</th>
                <th className="p-3">Quantization</th>
                <th className="p-3">Caching Strategy</th>
                <th className="p-3">TTFT (ms)</th>
                <th className="p-3">Throughput</th>
                <th className="p-3">VRAM (GB)</th>
                <th className="p-3">Cost / 1M</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2129] font-mono text-[11px]">
              {experiments.map((exp) => (
                <tr key={exp.id} className="hover:bg-purple-950/20 transition-colors">
                  <td className="p-3 font-sans font-medium text-white flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>{exp.name}</span>
                  </td>
                  <td className="p-3 text-slate-200 font-semibold">{exp.model}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {exp.quantization}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300">{exp.caching}</td>
                  <td className="p-3 text-emerald-400 font-bold">{exp.ttftMs} ms</td>
                  <td className="p-3 text-cyan-400">{exp.throughputTokSec} tok/s</td>
                  <td className="p-3 text-slate-200">{exp.vramGb} GB</td>
                  <td className="p-3 text-amber-300">${exp.costPer1MTokens}</td>
                  <td className="p-3 font-sans">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                      {exp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

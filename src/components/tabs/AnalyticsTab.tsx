import React from 'react';
import { 
  BarChart2, 
  Download, 
  CheckCircle2, 
  TrendingUp, 
  HardDrive, 
  Zap, 
  DollarSign, 
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { ExperimentRecord } from '../../types';

interface AnalyticsTabProps {
  experiments: ExperimentRecord[];
  onAskAssistant: (prompt: string) => void;
}

const COMPARISON_CHART_DATA = [
  { name: 'FP16 Baseline', ttftMs: 280, vramGb: 38.0, throughputTokSec: 92, cost: 1.25 },
  { name: 'INT8 Dynamic', ttftMs: 120, vramGb: 21.5, throughputTokSec: 142, cost: 0.55 },
  { name: 'INT4 AWQ', ttftMs: 42, vramGb: 14.2, throughputTokSec: 184, cost: 0.31 },
  { name: 'GGUF Q4', ttftMs: 180, vramGb: 16.8, throughputTokSec: 92, cost: 0.42 },
];

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  experiments,
  onAskAssistant
}) => {
  const handleExportCSV = () => {
    const headers = ['Name', 'Model', 'Quantization', 'Caching', 'TTFT (ms)', 'Throughput (tok/s)', 'VRAM (GB)', 'Cost / 1M'];
    const rows = experiments.map(e => [
      `"${e.name}"`,
      `"${e.model}"`,
      `"${e.quantization}"`,
      `"${e.caching}"`,
      e.ttftMs,
      e.throughputTokSec,
      e.vramGb,
      e.costPer1MTokens
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AI_Studio_Sandbox_Analytics_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Title Bar */}
      <div className="live-multi-card p-6 md:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2.5">
            <BarChart2 className="w-5 h-5 text-emerald-400 animate-pulse" />
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span>Benchmark Analytics & Trade-off Matrix</span>
            </h2>
          </div>
          <p className="text-xs text-slate-300">
            Compare latency, memory footprint, throughput, and inference cost across quantization schemes.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-5 py-2.5 rounded-xl bg-[#181B24] hover:bg-[#222634] text-slate-200 border border-purple-500/30 text-xs font-semibold transition-all hover:scale-105 shadow-md flex items-center space-x-2 shrink-0"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export Analytics CSV</span>
        </button>
      </div>

      {/* Comparison Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Latency vs VRAM */}
        <div className="bg-slate-900/90 p-6 md:p-7 rounded-2xl border border-slate-800 space-y-5">
          <h3 className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>TTFT Latency (ms) vs VRAM Allocation (GB)</span>
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COMPARISON_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="ttftMs" name="TTFT Latency (ms)" fill="#a855f7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="vramGb" name="VRAM (GB)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Throughput vs Cost */}
        <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
            <Zap className="w-4 h-4 text-blue-400" />
            <span>Throughput (tokens/sec) vs Cost per 1M Tokens ($)</span>
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COMPARISON_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="throughputTokSec" name="Throughput (tok/s)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cost" name="Cost per 1M Tokens ($)" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detail Comparison Matrix Table */}
      <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Full Precision & Caching Comparison Matrix</span>
          </h3>

          <button
            onClick={() => onAskAssistant('Analyze the benchmark matrix and explain why INT4 AWQ is the most cost-effective scheme.')}
            className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI Analysis</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Quantization Scheme</th>
                <th className="p-3">TTFT Latency</th>
                <th className="p-3">GPU VRAM Footprint</th>
                <th className="p-3">Peak Throughput</th>
                <th className="p-3">Cost / 1M Tokens</th>
                <th className="p-3">Perplexity Delta</th>
                <th className="p-3">Prod Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-sans font-bold text-white">FP16 Baseline</td>
                <td className="p-3 text-slate-300">280 ms</td>
                <td className="p-3 text-slate-300">38.0 GB</td>
                <td className="p-3 text-slate-300">92 tok/s</td>
                <td className="p-3 text-slate-300">$1.25</td>
                <td className="p-3 text-slate-400">0.00 (Baseline)</td>
                <td className="p-3 font-sans text-slate-500">Uncompressed</td>
              </tr>

              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-sans font-bold text-white">INT8 Dynamic</td>
                <td className="p-3 text-emerald-400">120 ms</td>
                <td className="p-3 text-purple-400">21.5 GB (-43%)</td>
                <td className="p-3 text-blue-400">142 tok/s</td>
                <td className="p-3 text-teal-300">$0.55</td>
                <td className="p-3 text-emerald-400">+0.02</td>
                <td className="p-3 font-sans text-blue-400">High Accuracy Target</td>
              </tr>

              <tr className="hover:bg-slate-800/40 bg-purple-950/10">
                <td className="p-3 font-sans font-bold text-purple-300 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>INT4 AWQ (Active)</span>
                </td>
                <td className="p-3 text-emerald-400 font-bold">42 ms</td>
                <td className="p-3 text-purple-400 font-bold">14.2 GB (-62%)</td>
                <td className="p-3 text-blue-400 font-bold">184 tok/s</td>
                <td className="p-3 text-teal-300 font-bold">$0.31</td>
                <td className="p-3 text-emerald-400">+0.08</td>
                <td className="p-3 font-sans">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium">
                    ★ Enterprise Recommended
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-sans font-bold text-white">GGUF Q4_K_M</td>
                <td className="p-3 text-slate-300">180 ms</td>
                <td className="p-3 text-slate-300">16.8 GB</td>
                <td className="p-3 text-slate-300">92 tok/s</td>
                <td className="p-3 text-teal-300">$0.42</td>
                <td className="p-3 text-amber-400">+0.14</td>
                <td className="p-3 font-sans text-slate-400">Edge / CPU Offload</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

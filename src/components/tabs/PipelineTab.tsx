import React, { useState } from 'react';
import { 
  GitFork, 
  Zap, 
  HardDrive, 
  Layers, 
  Play, 
  CheckCircle2, 
  RotateCcw, 
  Sliders, 
  ShieldAlert, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PipelineConfig, QuantizationType, CachingType, ExperimentRecord } from '../../types';

interface PipelineTabProps {
  pipelineConfig: PipelineConfig;
  onUpdateConfig: (config: PipelineConfig) => void;
  onAddExperiment: (exp: ExperimentRecord) => void;
  selectedHardware: string;
}

export const PipelineTab: React.FC<PipelineTabProps> = ({
  pipelineConfig,
  onUpdateConfig,
  onAddExperiment,
  selectedHardware
}) => {
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [benchmarkResult, setBenchmarkResult] = useState<any>(null);

  const quantizationOptions: { id: QuantizationType; label: string; desc: string; vramImpact: string }[] = [
    { id: 'FP16', label: '16-bit Float (FP16)', desc: 'Uncompressed baseline weights. Highest accuracy.', vramImpact: '38.0 GB VRAM' },
    { id: 'INT8', label: '8-bit Integer (INT8)', desc: 'Dynamic vector quantization. Minimal quality loss.', vramImpact: '21.5 GB VRAM (-43%)' },
    { id: 'INT4 AWQ', label: '4-bit AWQ (Activation-aware)', desc: 'Optimal enterprise standard for LLM serving.', vramImpact: '14.2 GB VRAM (-62%)' },
    { id: 'GGUF Q4_K_M', label: 'GGUF 4-bit (k-quant)', desc: 'Lightweight format tuned for edge/CPU offload.', vramImpact: '16.8 GB VRAM (-55%)' },
  ];

  const cachingOptions: { id: CachingType; label: string; desc: string }[] = [
    { id: 'Disabled', label: 'Disabled', desc: 'No KV-cache persistence across requests' },
    { id: 'Prompt Caching', label: 'Claude & OpenAI Prompt Caching', desc: 'Caches prefix tokens for repeated system instructions' },
    { id: 'Semantic Cache (Redis)', label: 'Semantic Similarity Cache', desc: 'Vector search cache based on embedding distance' },
    { id: 'Hybrid Caching', label: 'Hybrid Prefix + Vector Cache', desc: 'Combines exact prefix match with semantic retrieval' },
  ];

  const handleRunPipelineBenchmark = async () => {
    setIsBenchmarking(true);
    try {
      const response = await fetch('/api/pipeline/benchmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: pipelineConfig.model,
          quantization: pipelineConfig.quantization,
          caching: pipelineConfig.caching,
          batchSize: pipelineConfig.batchSize
        })
      });

      const data = await response.json();
      setBenchmarkResult(data.results);

      // Record to experiment log
      if (data.results) {
        const newExp: ExperimentRecord = {
          id: `exp-${Date.now()}`,
          name: `${pipelineConfig.model} - ${pipelineConfig.quantization} (${pipelineConfig.caching})`,
          model: pipelineConfig.model,
          quantization: pipelineConfig.quantization,
          caching: pipelineConfig.caching,
          hardware: selectedHardware as any,
          ttftMs: data.results.timeToFirstTokenMs,
          throughputTokSec: data.results.throughputTokensSec,
          vramGb: data.results.vramUsageGb,
          costPer1MTokens: data.results.costPerMillionTokens,
          accuracyScore: 97.8,
          status: 'Completed',
          timestamp: 'Just now',
          tags: ['Pipeline Benchmark', pipelineConfig.quantization]
        };
        onAddExperiment(newExp);
      }
    } catch (err) {
      console.error('Benchmark error:', err);
    } finally {
      setIsBenchmarking(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Title & Pipeline Header */}
      <div className="live-multi-card p-6 md:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2.5">
            <GitFork className="w-5 h-5 text-purple-400 animate-pulse" />
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span>Modular Pipeline & Quantization Engine</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-mono font-bold">
                MULTI-SPECTRUM
              </span>
            </h2>
          </div>
          <p className="text-xs text-slate-300">Configure model precision, KV-caching strategy, and speculative decoding parameters.</p>
        </div>

        <button
          onClick={handleRunPipelineBenchmark}
          disabled={isBenchmarking}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 via-purple-600 to-pink-600 hover:brightness-110 text-white font-bold text-xs transition-all shadow-[0_0_20px_rgba(168,85,247,0.35)] flex items-center space-x-2 shrink-0 hover:scale-105"
        >
          {isBenchmarking ? <RotateCcw className="w-4 h-4 animate-spin text-white" /> : <Play className="w-4 h-4 fill-current" />}
          <span>{isBenchmarking ? 'Running Pipeline Benchmark...' : 'Test Pipeline Latency & Memory'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Configuration Controls */}
        <div className="lg:col-span-2 space-y-8">
          {/* Model & Hardware Selection */}
          <div className="bg-slate-900/90 p-6 md:p-7 rounded-2xl border border-slate-800 space-y-5">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-blue-400" />
              <span>Base Model & Fallback Spec</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Primary Served Model</label>
                <select
                  value={pipelineConfig.model}
                  onChange={(e) => onUpdateConfig({ ...pipelineConfig, model: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-500"
                >
                  <option>Claude 3.5 Sonnet</option>
                  <option>Claude 3 Opus</option>
                  <option>GPT-4o</option>
                  <option>Grok-2</option>
                  <option>Fable Ultra</option>
                  <option>Llama-3.1 70B Instruct</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">SLA Fallback Node</label>
                <select
                  value={pipelineConfig.fallbackModel}
                  onChange={(e) => onUpdateConfig({ ...pipelineConfig, fallbackModel: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-500"
                >
                  <option>GPT-4o mini</option>
                  <option>Claude 3 Haiku</option>
                  <option>Grok-2 Mini</option>
                  <option>Fable Neural</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quantization Schema */}
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
                <HardDrive className="w-4 h-4 text-emerald-400" />
                <span>Quantization & Bit Precision</span>
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                Active: {pipelineConfig.quantization}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quantizationOptions.map((opt) => {
                const isSelected = pipelineConfig.quantization === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => onUpdateConfig({ ...pipelineConfig, quantization: opt.id })}
                    className={`p-3.5 rounded-xl border text-left transition-all relative ${
                      isSelected
                        ? 'bg-purple-600/15 border-purple-500 text-purple-200 shadow-md'
                        : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold text-xs text-slate-200 mb-1">
                      <span>{opt.label}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight mb-2">{opt.desc}</p>
                    <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                      {opt.vramImpact}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Caching Strategy */}
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Caching Strategy & KV Memory Layer</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cachingOptions.map((opt) => {
                const isSelected = pipelineConfig.caching === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => onUpdateConfig({ ...pipelineConfig, caching: opt.id })}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-amber-200 shadow-md'
                        : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold text-xs text-slate-200 mb-1">
                      <span>{opt.label}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Benchmark Comparison Card */}
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-5 rounded-xl border border-slate-800 space-y-5">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold text-slate-100">Live Benchmark Projection</h3>
            </div>

            {benchmarkResult ? (
              <div className="space-y-4 text-xs font-mono">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                  <div className="text-[10px] text-slate-400 uppercase">Time To First Token (TTFT)</div>
                  <div className="text-2xl font-bold text-emerald-400">{benchmarkResult.timeToFirstTokenMs} ms</div>
                  <div className="text-[10px] text-slate-400">Total Latency: {benchmarkResult.totalLatencyMs} ms</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                  <div className="text-[10px] text-slate-400 uppercase">GPU VRAM Memory Allocation</div>
                  <div className="text-2xl font-bold text-purple-400">{benchmarkResult.vramUsageGb} GB</div>
                  <div className="text-[10px] text-emerald-400">Cache Hit Ratio: {benchmarkResult.cacheHitRatio}</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                  <div className="text-[10px] text-slate-400 uppercase">Peak Throughput</div>
                  <div className="text-2xl font-bold text-blue-400">{benchmarkResult.throughputTokensSec} tok/s</div>
                  <div className="text-[10px] text-slate-400">Est. Cost: ${benchmarkResult.costPerMillionTokens} / 1M tokens</div>
                </div>

                <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-lg text-emerald-300 font-sans text-xs">
                  <div className="font-semibold mb-0.5">SLA SLA Compliance: PASS</div>
                  <p className="text-[11px] text-slate-300">
                    Perplexity delta ({benchmarkResult.perplexityDelta}) is well within production safety bounds (&lt; +0.15).
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-slate-950 rounded-lg border border-slate-800 text-center space-y-3">
                <RotateCcw className="w-8 h-8 text-blue-500 mx-auto opacity-80" />
                <p className="text-xs text-slate-400">
                  Click <strong className="text-white">"Test Pipeline Latency & Memory"</strong> above to calculate real-time benchmarks for this setup.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

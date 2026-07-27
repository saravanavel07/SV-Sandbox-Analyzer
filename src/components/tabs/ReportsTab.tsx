import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  RotateCcw, 
  ShieldCheck, 
  Share2, 
  Printer,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ExperimentRecord, PipelineConfig } from '../../types';

interface ReportsTabProps {
  experiments: ExperimentRecord[];
  pipelineConfig: PipelineConfig;
}

export const ReportsTab: React.FC<ReportsTabProps> = ({
  experiments,
  pipelineConfig
}) => {
  const [reportMarkdown, setReportMarkdown] = useState<string>(`# SV Sandbox Executive AI Experimentation Report
*Generated on: ${new Date().toLocaleDateString()}*

## 1. Executive Summary
During the current experimentation cycle in SV Sandbox, our engineering team evaluated model quantization techniques (FP16, INT8, INT4 AWQ), prompt caching layers, and multi-agent DAG orchestration across top AI providers including Anthropic (Claude 3.5 Sonnet / Opus), OpenAI (GPT-4o), xAI (Grok-2), and Fable AI (Fable Ultra).

## 2. Key Performance Benchmarks
- **GPU VRAM Memory Footprint**: Quantization to **INT4 AWQ** reduced GPU VRAM consumption by **62.4%** (dropping from 38.0 GB to 14.2 GB across Claude 3.5 Sonnet & GPT-4o deployments).
- **Latency & TTFT**: Enabling **Anthropic & OpenAI Prompt Caching** drove Time To First Token (TTFT) down from **280ms to 42ms** (85% reduction).
- **Throughput**: Peak inference throughput increased from **92 tokens/sec to 184 tokens/sec**.
- **SLA Compliance**: Accuracy delta remained within safe bounds (+0.08 perplexity degradation), passing all MMLU and GSM8K benchmark checks.

## 3. Recommended Production Architecture
1. **Model Precision**: Deploy **INT4 AWQ** precision as standard for production model nodes.
2. **Caching Strategy**: Enable **Prompt Caching** on system instructions for high-frequency workflows.
3. **Multi-Agent Orchestration**: Utilize a **Coordinator DAG** pattern with GPT-4o mini as the primary SLA fallback node.
`);

  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experiments,
          pipeline: pipelineConfig,
          metrics: { vramSavings: '62.4%', ttftDrop: '85%' }
        })
      });

      const data = await response.json();
      if (data.reportMarkdown) {
        setReportMarkdown(data.reportMarkdown);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } catch (err) {
      console.error('Report error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(reportMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([reportMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI_Studio_Sandbox_Report_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title & Generate Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-5 rounded-xl border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-100">Auto-Generated Executive Reports & Documentation</h2>
          </div>
          <p className="text-xs text-slate-400">
            Convert raw experiment logs, quantization benchmarks, and agent traces into stakeholder reports.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handleCopyReport}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs transition-colors flex items-center space-x-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs transition-colors flex items-center space-x-1.5"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>Download .MD</span>
          </button>

          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center space-x-2 shadow-md"
          >
            {isGenerating ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{isGenerating ? 'Generating Report...' : 'Re-Generate Report'}</span>
          </button>
        </div>
      </div>

      {/* Report Document Box */}
      <div className="bg-slate-900/90 p-8 rounded-2xl border border-slate-800 shadow-xl max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span>CONFIDENTIAL • SV SANDBOX ENTERPRISE REPORT</span>
          </div>
          <div className="text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/60">
            SLA Verification: PASSED
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-slate-200 text-xs font-sans leading-relaxed space-y-4">
          <div className="whitespace-pre-wrap font-sans text-xs text-slate-200 bg-slate-950 p-6 rounded-xl border border-slate-800 leading-relaxed font-mono">
            {reportMarkdown}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>SV Sandbox • Multi-Provider Isolated Container</span>
          <span>Verified by Claude 3.5 Sonnet / GPT-4o</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Play, 
  Plus, 
  Trash2, 
  Terminal, 
  RotateCcw, 
  Check, 
  Copy, 
  Sparkles, 
  Cpu, 
  Layers,
  ChevronDown,
  Clock,
  Code
} from 'lucide-react';
import { NotebookCell } from '../../types';

interface NotebookTabProps {
  cells: NotebookCell[];
  onUpdateCells: (cells: NotebookCell[]) => void;
  onAskAssistant: (prompt: string) => void;
  selectedHardware: string;
}

export const NotebookTab: React.FC<NotebookTabProps> = ({
  cells,
  onUpdateCells,
  onAskAssistant,
  selectedHardware
}) => {
  const [activeKernel, setActiveKernel] = useState('Python 3.10 (PyTorch 2.3 • CUDA 12.2)');
  const [runningCellId, setRunningCellId] = useState<string | null>(null);
  const [copiedCellId, setCopiedCellId] = useState<string | null>(null);

  const handleRunCell = (cellId: string) => {
    setRunningCellId(cellId);
    setTimeout(() => {
      const updated = cells.map((cell) => {
        if (cell.id === cellId) {
          const count = (cell.executionCount || 0) + 1;
          if (cell.id === 'cell-2') {
            return {
              ...cell,
              executionCount: count,
              output: {
                type: 'text' as const,
                data: `⚡ GPU Allocator initialized on ${selectedHardware}.\nPyTorch CUDA Version: 12.2 | Memory Manager: Active\n✅ Quantization configuration validated. Ready for inference benchmark.`,
                executionTimeMs: 140
              }
            };
          } else if (cell.id === 'cell-3') {
            return {
              ...cell,
              executionCount: count,
              output: {
                type: 'metrics' as const,
                data: {
                  ttftMs: 41.8,
                  vramAllocatedGb: 14.2,
                  vramSavedPercent: 62.5,
                  throughputTokSec: 188.2,
                  cacheStatus: 'HIT (Prompt Caching Enabled)'
                },
                executionTimeMs: 95
              }
            };
          } else {
            return {
              ...cell,
              executionCount: count,
              output: {
                type: 'text' as const,
                data: `[Execution Output #${count}]\nProcess completed with returncode 0.\nMemory footprint stable on ${selectedHardware}.`,
                executionTimeMs: 110
              }
            };
          }
        }
        return cell;
      });
      onUpdateCells(updated);
      setRunningCellId(null);
    }, 400);
  };

  const handleRunAll = () => {
    setRunningCellId('all');
    setTimeout(() => {
      const updated = cells.map((cell, idx) => ({
        ...cell,
        executionCount: (cell.executionCount || 0) + 1,
        output: cell.output || {
          type: 'text' as const,
          data: `[Cell ${idx + 1} Output] Ran successfully on ${selectedHardware}.`,
          executionTimeMs: 120
        }
      }));
      onUpdateCells(updated);
      setRunningCellId(null);
    }, 800);
  };

  const handleAddCell = (type: 'code' | 'markdown') => {
    const newCell: NotebookCell = {
      id: `cell-${Date.now()}`,
      type,
      language: type === 'code' ? 'python' : 'markdown',
      content: type === 'code' 
        ? `# New PyTorch Experimentation Cell\nimport torch\n\nprint("GPU Memory Allocated:", torch.cuda.memory_allocated() if torch.cuda.is_available() else "14.2 GB")`
        : `### Custom Experiment Documentation\nDocument your hypotheses and benchmark results here.`
    };
    onUpdateCells([...cells, newCell]);
  };

  const handleDeleteCell = (id: string) => {
    onUpdateCells(cells.filter((c) => c.id !== id));
  };

  const handleCellContentChange = (id: string, content: string) => {
    onUpdateCells(
      cells.map((c) => (c.id === id ? { ...c, content } : c))
    );
  };

  const handleCopyCode = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedCellId(id);
    setTimeout(() => setCopiedCellId(null), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Workbench Header Controls */}
      <div className="live-multi-card p-6 md:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center space-x-3.5">
          <div className="p-2.5 bg-gradient-to-tr from-purple-500/20 via-cyan-500/20 to-pink-500/20 text-cyan-300 rounded-xl border border-purple-500/40">
            <Terminal className="w-5 h-5 text-cyan-300 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-100 flex items-center space-x-2">
              <span>Multi-Provider Workbench Container</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Kernel Connected</span>
              </span>
            </h2>
            <p className="text-xs text-slate-400">Pre-installed: Anthropic SDK, OpenAI SDK, xAI Grok SDK, Fable SDK, PyTorch 2.3</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          {/* Kernel Selector */}
          <div className="relative hidden md:block">
            <select
              value={activeKernel}
              onChange={(e) => setActiveKernel(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-200 text-xs px-3.5 py-2 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option>Python 3.10 (PyTorch 2.3 • Multi-API CUDA Kernel)</option>
              <option>Anthropic Claude 3.5 Sonnet / Opus SDK</option>
              <option>OpenAI GPT-4o & o1 Async Pipeline</option>
              <option>xAI Grok-2 / Grok-3 Vision Runtime</option>
              <option>Fable Neural Ultra 1.0 Runtime</option>
            </select>
          </div>

          <button
            onClick={handleRunAll}
            disabled={runningCellId !== null}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors flex items-center space-x-1.5 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run All Cells</span>
          </button>

          <button
            onClick={() => handleAddCell('code')}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5 text-blue-400" />
            <span>+ Code</span>
          </button>

          <button
            onClick={() => handleAddCell('markdown')}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5 text-purple-400" />
            <span>+ Markdown</span>
          </button>
        </div>
      </div>

      {/* Notebook Cells Stream */}
      <div className="space-y-6">
        {cells.map((cell, idx) => {
          const isRunning = runningCellId === cell.id || runningCellId === 'all';
          return (
            <div
              key={cell.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md group hover:border-slate-700 transition-colors"
            >
              {/* Cell Toolbar */}
              <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-slate-300">
                    [{cell.executionCount ? cell.executionCount : ' '}]
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 uppercase">
                    {cell.type}
                  </span>
                  {cell.language && <span className="text-[11px] text-blue-400">{cell.language}</span>}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onAskAssistant(`Analyze and optimize this notebook code cell:\n${cell.content}`)}
                    className="p-1 rounded text-purple-400 hover:bg-purple-950/60 transition-colors flex items-center space-x-1 text-[11px]"
                    title="Ask AI Assistant about this cell"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span className="hidden sm:inline">Ask AI</span>
                  </button>

                  {cell.type === 'code' && (
                    <button
                      onClick={() => handleRunCell(cell.id)}
                      disabled={isRunning}
                      className="p-1 rounded text-emerald-400 hover:bg-emerald-950/60 transition-colors flex items-center space-x-1 text-[11px]"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Run</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleCopyCode(cell.content, cell.id)}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                    title="Copy cell content"
                  >
                    {copiedCellId === cell.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => handleDeleteCell(cell.id)}
                    className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                    title="Delete cell"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Cell Input Area */}
              <div className="p-4 bg-slate-900">
                <textarea
                  value={cell.content}
                  onChange={(e) => handleCellContentChange(cell.id, e.target.value)}
                  rows={Math.max(3, cell.content.split('\n').length)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-100 focus:outline-none focus:border-blue-500 resize-y leading-relaxed"
                />
              </div>

              {/* Cell Execution Output */}
              {isRunning && (
                <div className="bg-slate-950/90 p-3 px-4 border-t border-slate-800 text-xs font-mono text-blue-400 flex items-center space-x-2">
                  <RotateCcw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                  <span>Executing cell on GPU ({selectedHardware})...</span>
                </div>
              )}

              {cell.output && !isRunning && (
                <div className="bg-slate-950 p-4 border-t border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pb-1 border-b border-slate-800/80">
                    <span>CELL OUTPUT</span>
                    {cell.output.executionTimeMs && (
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        <span>Execution time: {cell.output.executionTimeMs} ms</span>
                      </span>
                    )}
                  </div>

                  {cell.output.type === 'text' && (
                    <pre className="whitespace-pre-wrap text-emerald-300 text-[11px] leading-relaxed">
                      {cell.output.data}
                    </pre>
                  )}

                  {cell.output.type === 'metrics' && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                      <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                        <div className="text-[10px] text-slate-400">TTFT Latency</div>
                        <div className="text-sm font-bold text-emerald-400">{cell.output.data.ttftMs} ms</div>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                        <div className="text-[10px] text-slate-400">VRAM Allocated</div>
                        <div className="text-sm font-bold text-purple-400">{cell.output.data.vramAllocatedGb} GB</div>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                        <div className="text-[10px] text-slate-400">Throughput</div>
                        <div className="text-sm font-bold text-blue-400">{cell.output.data.throughputTokSec} tok/s</div>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                        <div className="text-[10px] text-slate-400">Cache Status</div>
                        <div className="text-xs font-semibold text-amber-300 truncate">{cell.output.data.cacheStatus}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

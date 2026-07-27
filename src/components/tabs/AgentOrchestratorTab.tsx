import React, { useState } from 'react';
import { 
  Workflow, 
  Play, 
  CheckCircle2, 
  RotateCcw, 
  Bot, 
  ArrowRight, 
  Plus, 
  Sparkles, 
  Layers, 
  Clock, 
  FileCode,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { AgentNode } from '../../types';

interface AgentOrchestratorTabProps {
  agents: AgentNode[];
  onUpdateAgents: (agents: AgentNode[]) => void;
  onAskAssistant: (prompt: string) => void;
}

export const AgentOrchestratorTab: React.FC<AgentOrchestratorTabProps> = ({
  agents,
  onUpdateAgents,
  onAskAssistant
}) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0]?.id || 'agent-coord');
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(-1);

  const selectedAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];

  const handleRunWorkflow = () => {
    setIsExecuting(true);
    setActiveStep(0);

    // Step 1: Coordinator
    setTimeout(() => {
      setActiveStep(1);
      // Step 2: Quantizer
      setTimeout(() => {
        setActiveStep(2);
        // Step 3: Evaluator
        setTimeout(() => {
          setIsExecuting(false);
          setActiveStep(-1);
        }, 800);
      }, 800);
    }, 800);
  };

  const handlePromptChange = (prompt: string) => {
    onUpdateAgents(
      agents.map((a) => (a.id === selectedAgentId ? { ...a, prompt } : a))
    );
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Visualizer Title */}
      <div className="live-multi-card p-6 md:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2.5">
            <Workflow className="w-5 h-5 text-purple-400 animate-pulse" />
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span>Multi-Agent DAG Workflow Orchestrator</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
                <span>LIVE DAG</span>
              </span>
            </h2>
          </div>
          <p className="text-xs text-slate-300">
            Graph-based agent topology showing message routing, sub-task division, and evaluation fallbacks.
          </p>
        </div>

        <button
          onClick={handleRunWorkflow}
          disabled={isExecuting}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 via-purple-600 to-pink-600 hover:brightness-110 text-white font-bold text-xs transition-all shadow-[0_0_20px_rgba(168,85,247,0.35)] flex items-center space-x-2 shrink-0 hover:scale-105"
        >
          {isExecuting ? <RotateCcw className="w-4 h-4 animate-spin text-white" /> : <Play className="w-4 h-4 fill-current" />}
          <span>{isExecuting ? 'Simulating Multi-Agent DAG...' : 'Execute Multi-Agent Workflow'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Interactive Graph Nodes */}
        <div className="lg:col-span-2 bg-slate-900/90 p-6 md:p-8 rounded-xl border border-slate-800 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Orchestration Topology (DAG View)</span>
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
              3 Agent Nodes
            </span>
          </div>

          {/* Node Graph Container */}
          <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 space-y-8 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              {agents.map((agent, index) => {
                const isSelected = selectedAgentId === agent.id;
                const isActiveInStep = activeStep === index;

                return (
                  <React.Fragment key={agent.id}>
                    {/* Node Card */}
                    <div
                      onClick={() => setSelectedAgentId(agent.id)}
                      className={`w-full md:w-56 p-4 rounded-xl border cursor-pointer transition-all relative ${
                        isActiveInStep
                          ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-xl scale-105'
                          : isSelected
                          ? 'bg-slate-800 border-blue-500 text-slate-100 shadow-md ring-2 ring-blue-500/20'
                          : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-1.5 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800">
                          <Bot className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                          {agent.latencyMs} ms
                        </span>
                      </div>

                      <h4 className="font-bold text-xs text-white mb-1">{agent.name}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mb-2">{agent.role}</p>

                      <div className="flex items-center justify-between text-[10px] pt-2 border-t border-slate-800 text-slate-500 font-mono">
                        <span>{agent.model}</span>
                        {isActiveInStep ? (
                          <span className="text-indigo-400 font-semibold animate-pulse">Running...</span>
                        ) : (
                          <span className="text-emerald-400 font-medium">Ready</span>
                        )}
                      </div>
                    </div>

                    {/* Arrow Connector */}
                    {index < agents.length - 1 && (
                      <div className="hidden md:flex flex-col items-center justify-center text-slate-600">
                        <ArrowRight className={`w-5 h-5 ${activeStep === index ? 'text-indigo-400 animate-bounce' : 'text-slate-600'}`} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Trace Timeline Log */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
            <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              Multi-Agent Communication Trace
            </div>

            <div className="space-y-2 text-slate-300 text-[11px]">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-indigo-400 font-semibold">[Orchestrator Agent]:</span> Decomposed incoming query into 2 specialized tasks. Passed task_id=881 to Quantization Agent.
                </div>
              </div>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-purple-400 font-semibold">[Quantizer Agent]:</span> AWQ INT4 schema applied. Latency reduced from 280ms to 42ms. Passed metrics payload to SLA Evaluator.
                </div>
              </div>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex items-start space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-emerald-400 font-semibold">[SLA Evaluator]:</span> GSM8K benchmarking score = 92.4%. Approved candidate for production serving.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Node Inspector & Prompt Editor */}
        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
            <Bot className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-100">Agent Node Inspector</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Agent Name</label>
              <input
                type="text"
                value={selectedAgent.name}
                disabled
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 font-semibold"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">System Prompt Instruction</label>
              <textarea
                value={selectedAgent.prompt}
                onChange={(e) => handlePromptChange(e.target.value)}
                rows={5}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 font-mono text-[11px] focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <div className="text-[10px] text-slate-400 font-mono">LATEST AGENT OUTPUT</div>
              <p className="text-[11px] text-emerald-300 font-mono leading-relaxed">{selectedAgent.outputs}</p>
            </div>

            <button
              onClick={() => onAskAssistant(`How can I optimize the system prompt for the ${selectedAgent.name}?`)}
              className="w-full py-2 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-800/80 font-medium text-xs transition-colors flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Ask AI to Refine Prompt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

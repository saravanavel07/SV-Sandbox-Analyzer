import React, { useState } from 'react';
import { 
  Sparkles, 
  Cpu, 
  Download, 
  Bot, 
  ChevronDown, 
  Radio, 
  Play, 
  CheckCircle2, 
  Globe,
  Zap,
  Key
} from 'lucide-react';
import { HardwareType } from '../types';

interface HeaderProps {
  selectedHardware: HardwareType;
  onHardwareChange: (hw: HardwareType) => void;
  onToggleAssistant: () => void;
  isAssistantOpen: boolean;
  onQuickRunExperiment: () => void;
  onExportReport: () => void;
  activeWorkspace: string;
  onWorkspaceChange: (ws: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedHardware,
  onHardwareChange,
  onToggleAssistant,
  isAssistantOpen,
  onQuickRunExperiment,
  onExportReport,
  activeWorkspace,
  onWorkspaceChange
}) => {
  const [showHwDropdown, setShowHwDropdown] = useState(false);
  const [showWsDropdown, setShowWsDropdown] = useState(false);

  const hardwareOptions: HardwareType[] = [
    'NVIDIA H100 SXM (80GB)',
    'NVIDIA A100 (80GB)',
    'Google TPU v5e',
    'NVIDIA L4 (24GB)'
  ];

  const workspaceOptions = [
    'Enterprise Production Sandbox',
    'Staging Cluster - us-central1',
    'AI Research Lab - europe-west1',
    'Dev Isolation Workspace'
  ];

  return (
    <header className="h-16 bg-[#0B0D14]/90 backdrop-blur-md border-b border-[#1E2129] px-6 md:px-8 flex items-center justify-between sticky top-0 z-40 text-slate-100 shadow-xl relative overflow-hidden">
      {/* Animated Multi-Color Bottom Border Ray */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-cyan-400 via-purple-500 via-pink-500 to-amber-400 bg-[length:200%_auto] animate-gradient-shift" />
      {/* Left Title & Live-Motion Green/Blue Brand Logo */}
      <div className="flex items-center space-x-4 md:space-x-6">
        {/* Animated Live-Motion Multi-Colored Triangle Brand Logo */}
        <div className="relative flex items-center justify-center w-11 h-11 group cursor-pointer" title="SV Sandbox Multi-Colored Live Motion Triangle Emblem">
          {/* Outer rotating multi-colored rainbow spectrum glowing aura */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-emerald-500 via-cyan-400 via-purple-500 via-pink-500 to-amber-400 animate-[spin_6s_linear_infinite] opacity-90 blur-[4px] group-hover:opacity-100 transition-opacity animate-multi-spectrum" />
          
          {/* Dark container box */}
          <div className="absolute inset-[2px] rounded-xl bg-[#090C12] flex items-center justify-center border border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.4)] overflow-hidden">
            
            {/* SVG Glowing Multi-Color Triangle with Live Animation */}
            <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="multiTriangleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="25%" stopColor="#06B6D4" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="75%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
                <linearGradient id="innerMultiTriangleGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#EC4899" stopOpacity="0.7" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
                </linearGradient>
                <filter id="multiGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="1.8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Outer Animated Rotating Triangle Contour */}
              <path
                d="M12 3L21 19H3L12 3Z"
                stroke="url(#multiTriangleGrad)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#multiGlow)"
                className="animate-[pulse_2.5s_ease-in-out_infinite] animate-multi-spectrum"
              />

              {/* Inner Translucent Filled Multi-Spectrum Triangle */}
              <path
                d="M12 7.5L17.5 17H6.5L12 7.5Z"
                fill="url(#innerMultiTriangleGrad)"
                className="animate-pulse"
              />

              {/* Live Orbiting Core Nodes in Multi-Colors */}
              <circle cx="12" cy="12.5" r="2" fill="#EC4899" className="animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite]" />
              <circle cx="12" cy="12.5" r="2.2" fill="#8B5CF6" />
              <circle cx="12" cy="12.5" r="1.2" fill="#F59E0B" />
            </svg>

            {/* Live multi-spectrum radar sweep overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/15 via-purple-500/10 via-cyan-500/10 to-emerald-500/15 animate-[spin_4s_linear_infinite] pointer-events-none" />
          </div>
        </div>
        
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-base md:text-lg tracking-tight text-white flex items-center gap-1.5">
              <span>SV Sandbox</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/30 uppercase tracking-wide flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              AI Hub
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden sm:block">
            Enterprise Model Experimentation & Multi-Agent Orchestration
          </p>
        </div>

        {/* Workspace Selector */}
        <div className="relative hidden lg:block ml-4 border-l border-[#1E2129] pl-4">
          <button
            onClick={() => setShowWsDropdown(!showWsDropdown)}
            className="flex items-center space-x-2 text-xs bg-[#14161C] hover:bg-[#1E2129] text-slate-200 px-3 py-1.5 rounded-lg border border-[#2D3139] transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-medium text-slate-200">{activeWorkspace}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showWsDropdown && (
            <div className="absolute top-full mt-1 left-4 w-64 bg-[#0F1117] border border-[#2D3139] rounded-xl shadow-2xl z-50 py-1">
              <div className="px-3 py-1.5 text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                Select Workspace
              </div>
              {workspaceOptions.map((ws) => (
                <button
                  key={ws}
                  onClick={() => {
                    onWorkspaceChange(ws);
                    setShowWsDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#1E2129] transition-colors ${
                    activeWorkspace === ws ? 'text-emerald-400 font-semibold bg-emerald-500/10' : 'text-slate-300'
                  }`}
                >
                  <span>{ws}</span>
                  {activeWorkspace === ws && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Hardware Selector */}
        <div className="relative">
          <button
            onClick={() => setShowHwDropdown(!showHwDropdown)}
            className="flex items-center space-x-1.5 text-xs bg-[#14161C] hover:bg-[#1E2129] text-slate-200 px-2.5 py-1.5 rounded-lg border border-[#2D3139] transition-colors"
            title="Active Hardware Cluster Target"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline font-medium">{selectedHardware.split(' ')[1] || selectedHardware}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showHwDropdown && (
            <div className="absolute top-full mt-1 right-0 w-60 bg-[#0F1117] border border-[#2D3139] rounded-xl shadow-2xl z-50 py-1">
              <div className="px-3 py-1.5 text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                Hardware Target
              </div>
              {hardwareOptions.map((hw) => (
                <button
                  key={hw}
                  onClick={() => {
                    onHardwareChange(hw);
                    setShowHwDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#1E2129] transition-colors ${
                    selectedHardware === hw ? 'text-emerald-400 font-semibold bg-emerald-500/10' : 'text-slate-300'
                  }`}
                >
                  <span>{hw}</span>
                  {selectedHardware === hw && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* API Status Badge */}
        <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 text-xs font-mono" title="Active API Keys: ANTHROPIC_API_KEY, OPENAI_API_KEY, GROK_API_KEY, FABLE_API_KEY">
          <Key className="w-3.5 h-3.5 text-amber-400" />
          <span>Claude / OpenAI / Grok / Fable</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>

        {/* Run Quick Experiment */}
        <button
          onClick={onQuickRunExperiment}
          className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-medium text-xs shadow-sm transition-all active:scale-95"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span className="hidden md:inline">Run Benchmark</span>
        </button>

        {/* Export Report */}
        <button
          onClick={onExportReport}
          className="hidden md:flex items-center space-x-1.5 bg-[#14161C] hover:bg-[#1E2129] text-slate-200 px-3 py-1.5 rounded-lg font-medium text-xs border border-[#2D3139] transition-all"
        >
          <Download className="w-3.5 h-3.5 text-indigo-400" />
          <span>Report</span>
        </button>

        {/* Toggle AI Assistant */}
        <button
          onClick={onToggleAssistant}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all border ${
            isAssistantOpen 
              ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-950/50' 
              : 'bg-[#14161C] hover:bg-[#1E2129] text-indigo-300 border-[#2D3139]'
          }`}
        >
          <Bot className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold">AI Assistant</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </button>
      </div>
    </header>
  );
};


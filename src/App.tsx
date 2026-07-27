import React, { useState } from 'react';
import { Header } from './components/Header';
import { LiveTelemetryBar } from './components/LiveTelemetryBar';
import { Sidebar } from './components/Sidebar';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { SpaceMoleculeCanvas } from './components/SpaceMoleculeCanvas';
import { DashboardTab } from './components/tabs/DashboardTab';
import { NotebookTab } from './components/tabs/NotebookTab';
import { PipelineTab } from './components/tabs/PipelineTab';
import { AgentOrchestratorTab } from './components/tabs/AgentOrchestratorTab';
import { AnalyticsTab } from './components/tabs/AnalyticsTab';
import { ReportsTab } from './components/tabs/ReportsTab';

import { 
  ModuleTab, 
  HardwareType, 
  ExperimentRecord, 
  NotebookCell, 
  PipelineConfig, 
  AgentNode, 
  SystemMetrics 
} from './types';

import { 
  INITIAL_METRICS, 
  INITIAL_EXPERIMENTS, 
  INITIAL_NOTEBOOK_CELLS, 
  INITIAL_PIPELINE_CONFIG, 
  INITIAL_AGENT_NODES 
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ModuleTab>('dashboard');
  const [selectedHardware, setSelectedHardware] = useState<HardwareType>('NVIDIA H100 SXM (80GB)');
  const [activeWorkspace, setActiveWorkspace] = useState<string>('Enterprise Production Sandbox');
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Core Application Data State
  const [metrics, setMetrics] = useState<SystemMetrics>(INITIAL_METRICS);
  const [experiments, setExperiments] = useState<ExperimentRecord[]>(INITIAL_EXPERIMENTS);
  const [notebookCells, setNotebookCells] = useState<NotebookCell[]>(INITIAL_NOTEBOOK_CELLS);
  const [pipelineConfig, setPipelineConfig] = useState<PipelineConfig>(INITIAL_PIPELINE_CONFIG);
  const [agentNodes, setAgentNodes] = useState<AgentNode[]>(INITIAL_AGENT_NODES);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleHardwareChange = (hw: HardwareType) => {
    setSelectedHardware(hw);
    showToast(`Hardware target updated to ${hw.split(' ')[0] || hw}`);
  };

  const handleWorkspaceChange = (ws: string) => {
    setActiveWorkspace(ws);
    showToast(`Workspace switched to ${ws}`);
  };

  const handleQuickRunExperiment = () => {
    // Add new experiment log
    const newExp: ExperimentRecord = {
      id: `exp-${Date.now()}`,
      name: `${pipelineConfig.model} - ${pipelineConfig.quantization} Benchmark`,
      model: pipelineConfig.model,
      quantization: pipelineConfig.quantization,
      caching: pipelineConfig.caching,
      hardware: selectedHardware,
      ttftMs: Math.floor(35 + Math.random() * 20),
      throughputTokSec: Math.floor(170 + Math.random() * 40),
      vramGb: pipelineConfig.quantization === 'INT4 AWQ' ? 14.2 : 21.5,
      costPer1MTokens: 0.31,
      accuracyScore: 98.2,
      status: 'Completed',
      timestamp: 'Just now',
      tags: ['Live Benchmark', pipelineConfig.quantization]
    };

    setExperiments((prev) => [newExp, ...prev]);
    setMetrics((prev) => ({
      ...prev,
      activeExperiments: prev.activeExperiments + 1,
      totalTokensProcessed: '15.2M'
    }));
    showToast('🚀 Live Benchmark completed! New record logged.');
  };

  const handleApplyOptimization = (optType: string) => {
    if (optType === 'INT4 AWQ') {
      setPipelineConfig((prev) => ({ ...prev, quantization: 'INT4 AWQ' }));
      showToast('✅ Applied INT4 AWQ Quantization to Pipeline!');
    } else if (optType === 'Prompt Caching') {
      setPipelineConfig((prev) => ({ ...prev, caching: 'Prompt Caching' }));
      showToast('✅ Prompt Caching Layer Enabled!');
    } else if (optType === 'apply_quantization') {
      setPipelineConfig((prev) => ({ ...prev, quantization: 'INT4 AWQ' }));
      showToast('✅ INT4 AWQ Applied from AI Assistant request!');
    }
  };

  const handleAskAssistant = (prompt: string) => {
    setIsAssistantOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white relative overflow-hidden">
      {/* Live Moving Space & Molecules Canvas Engine */}
      <SpaceMoleculeCanvas />

      {/* Dynamic Multi-Spectrum Live Motion Background Canvas */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Animated Multi-Spectrum Glowing Orbs */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] animate-[pulse_7s_ease-in-out_infinite]" />
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-purple-500/12 rounded-full blur-[150px] animate-[pulse_9s_ease-in-out_infinite_2s]" />
        <div className="absolute top-2/3 left-1/4 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px] animate-[pulse_11s_ease-in-out_infinite_4s]" />
        <div className="absolute -bottom-40 right-1/3 w-[650px] h-[650px] bg-pink-500/10 rounded-full blur-[160px] animate-[pulse_10s_ease-in-out_infinite_1s]" />
        
        {/* Live Motion Multi-Color Ray Stream */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/15 via-purple-950/15 via-pink-950/10 to-cyan-950/15 animate-gradient-shift opacity-60" />

        {/* Subtle Scanline Animation */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-40 animate-scanline pointer-events-none opacity-30" />

        {/* Subtle Enterprise Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:36px_36px]" />
      </div>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-indigo-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl border border-indigo-400/30 flex items-center space-x-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <Header
        selectedHardware={selectedHardware}
        onHardwareChange={handleHardwareChange}
        onToggleAssistant={() => setIsAssistantOpen(!isAssistantOpen)}
        isAssistantOpen={isAssistantOpen}
        onQuickRunExperiment={handleQuickRunExperiment}
        onExportReport={() => setActiveTab('reports')}
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={handleWorkspaceChange}
      />

      {/* Live Motion Enterprise Telemetry Ticker Bar */}
      <LiveTelemetryBar />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          vramSavingsPercent={metrics.vramSavingsPercent}
        />

        {/* Center Content View */}
        <main className="flex-1 overflow-y-auto bg-[#0A0B0E]">
          {activeTab === 'dashboard' && (
            <DashboardTab
              metrics={metrics}
              experiments={experiments}
              onSelectTab={(tab) => setActiveTab(tab)}
              onRunBenchmark={handleQuickRunExperiment}
              onApplyOptimization={handleApplyOptimization}
            />
          )}

          {activeTab === 'notebooks' && (
            <NotebookTab
              cells={notebookCells}
              onUpdateCells={setNotebookCells}
              onAskAssistant={handleAskAssistant}
              selectedHardware={selectedHardware}
            />
          )}

          {activeTab === 'pipelines' && (
            <PipelineTab
              pipelineConfig={pipelineConfig}
              onUpdateConfig={setPipelineConfig}
              onAddExperiment={(exp) => setExperiments((prev) => [exp, ...prev])}
              selectedHardware={selectedHardware}
            />
          )}

          {activeTab === 'agents' && (
            <AgentOrchestratorTab
              agents={agentNodes}
              onUpdateAgents={setAgentNodes}
              onAskAssistant={handleAskAssistant}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsTab
              experiments={experiments}
              onAskAssistant={handleAskAssistant}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsTab
              experiments={experiments}
              pipelineConfig={pipelineConfig}
            />
          )}
        </main>

        {/* Embedded AI Assistant Side Drawer */}
        <AIAssistantDrawer
          isOpen={isAssistantOpen}
          onClose={() => setIsAssistantOpen(false)}
          activeTab={activeTab}
          pipelineConfig={pipelineConfig}
          selectedHardware={selectedHardware}
          onApplyAction={handleApplyOptimization}
        />
      </div>
    </div>
  );
}

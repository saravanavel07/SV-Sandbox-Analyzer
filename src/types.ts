export type ModuleTab = 'dashboard' | 'notebooks' | 'pipelines' | 'agents' | 'analytics' | 'reports';

export type QuantizationType = 'FP16' | 'INT8' | 'INT4 AWQ' | 'GGUF Q4_K_M';
export type CachingType = 'Disabled' | 'Prompt Caching' | 'Semantic Cache (Redis)' | 'Hybrid Caching';
export type HardwareType = 'NVIDIA H100 SXM (80GB)' | 'NVIDIA A100 (80GB)' | 'Google TPU v5e' | 'NVIDIA L4 (24GB)';

export interface ExperimentRecord {
  id: string;
  name: string;
  model: string;
  quantization: QuantizationType;
  caching: CachingType;
  hardware: HardwareType;
  ttftMs: number;
  throughputTokSec: number;
  vramGb: number;
  costPer1MTokens: number;
  accuracyScore: number; // 0 - 100
  status: 'Completed' | 'Running' | 'Failed';
  timestamp: string;
  tags: string[];
}

export interface NotebookCell {
  id: string;
  type: 'code' | 'markdown';
  language?: 'python' | 'markdown';
  content: string;
  output?: {
    type: 'text' | 'json' | 'metrics' | 'error';
    data: any;
    executionTimeMs?: number;
  };
  isRunning?: boolean;
  executionCount?: number;
}

export interface PipelineConfig {
  name: string;
  model: string;
  quantization: QuantizationType;
  caching: CachingType;
  hardware: HardwareType;
  batchSize: number;
  temperature: number;
  topP: number;
  maxTokens: number;
  systemPrompt: string;
  fallbackModel: string;
  enableSpeculativeDecoding: boolean;
  enableContextTruncation: boolean;
}

export interface AgentNode {
  id: string;
  name: string;
  role: string;
  model: string;
  status: 'idle' | 'thinking' | 'active' | 'success' | 'error';
  latencyMs: number;
  prompt: string;
  outputs?: string;
  connections: string[]; // target node IDs
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  suggestions?: string[];
  codeSnippet?: string;
  timestamp: string;
  isThinking?: boolean;
}

export interface SystemMetrics {
  activeExperiments: number;
  avgLatencyMs: number;
  vramSavingsPercent: number;
  totalTokensProcessed: string;
  cacheHitRatio: number; // percentage
  avgCostSavings: number; // percentage
}

import { ExperimentRecord, NotebookCell, PipelineConfig, AgentNode, SystemMetrics } from '../types';

export const INITIAL_METRICS: SystemMetrics = {
  activeExperiments: 12,
  avgLatencyMs: 142,
  vramSavingsPercent: 62.4,
  totalTokensProcessed: '14.8M',
  cacheHitRatio: 84.6,
  avgCostSavings: 71.2,
};

export const INITIAL_EXPERIMENTS: ExperimentRecord[] = [
  {
    id: 'exp-001',
    name: 'Claude 3.5 Sonnet - INT4 AWQ Benchmarking',
    model: 'Claude 3.5 Sonnet',
    quantization: 'INT4 AWQ',
    caching: 'Prompt Caching',
    hardware: 'NVIDIA H100 SXM (80GB)',
    ttftMs: 38,
    throughputTokSec: 192,
    vramGb: 14.2,
    costPer1MTokens: 0.30,
    accuracyScore: 99.1,
    status: 'Completed',
    timestamp: '10 mins ago',
    tags: ['Anthropic', 'INT4 AWQ', 'High Speed']
  },
  {
    id: 'exp-002',
    name: 'GPT-4o Multi-Agent Support Swarm',
    model: 'GPT-4o',
    quantization: 'FP16',
    caching: 'Semantic Cache (Redis)',
    hardware: 'NVIDIA A100 (80GB)',
    ttftMs: 62,
    throughputTokSec: 215,
    vramGb: 28.5,
    costPer1MTokens: 0.25,
    accuracyScore: 98.2,
    status: 'Completed',
    timestamp: '28 mins ago',
    tags: ['OpenAI', 'Multi-Agent', 'Low Latency']
  },
  {
    id: 'exp-003',
    name: 'Grok-2 Speculative Reasoning Benchmark',
    model: 'Grok-2',
    quantization: 'INT8',
    caching: 'Hybrid Caching',
    hardware: 'NVIDIA H100 SXM (80GB)',
    ttftMs: 95,
    throughputTokSec: 168,
    vramGb: 24.0,
    costPer1MTokens: 0.40,
    accuracyScore: 97.6,
    status: 'Completed',
    timestamp: '1 hour ago',
    tags: ['xAI Grok', 'Speculative', 'Fast TTFT']
  },
  {
    id: 'exp-004',
    name: 'Fable Ultra Neural Reasoning Test',
    model: 'Fable Ultra',
    quantization: 'GGUF Q4_K_M',
    caching: 'Disabled',
    hardware: 'NVIDIA L4 (24GB)',
    ttftMs: 140,
    throughputTokSec: 110,
    vramGb: 15.4,
    costPer1MTokens: 0.35,
    accuracyScore: 96.5,
    status: 'Completed',
    timestamp: '3 hours ago',
    tags: ['Fable AI', 'Edge', 'GGUF']
  },
  {
    id: 'exp-005',
    name: 'Claude 3 Opus Deep Evaluation',
    model: 'Claude 3 Opus',
    quantization: 'FP16',
    caching: 'Prompt Caching',
    hardware: 'NVIDIA H100 SXM (80GB)',
    ttftMs: 85,
    throughputTokSec: 130,
    vramGb: 38.0,
    costPer1MTokens: 1.10,
    accuracyScore: 99.8,
    status: 'Completed',
    timestamp: '5 hours ago',
    tags: ['Anthropic', 'Opus', 'High Accuracy']
  }
];

export const INITIAL_NOTEBOOK_CELLS: NotebookCell[] = [
  {
    id: 'cell-1',
    type: 'markdown',
    content: `# Multi-Provider Workbench - Enterprise AI Experimentation
**Supported Providers**: Anthropic (Claude 3.5 Sonnet / Opus), OpenAI (GPT-4o), xAI (Grok-2), Fable AI (Fable Ultra)
**Environment**: PyTorch 2.3 | CUDA 12.2 | Hugging Face | Multi-API SDKs`
  },
  {
    id: 'cell-2',
    type: 'code',
    language: 'python',
    content: `import torch
import anthropic
import openai
import xai
import fable_sdk
import time

print("⚡ Initializing Multi-Provider AI SDK Allocator...")
print("🔑 Active Keys Loaded: ANTHROPIC_API_KEY, OPENAI_API_KEY, GROK_API_KEY, FABLE_API_KEY")

# Define INT4 AWQ Quantization Configuration
quantization_config = {
    "load_in_4bit": True,
    "bnb_4bit_compute_dtype": "bfloat16",
    "bnb_4bit_quant_type": "nf4",
    "use_double_quant": True
}
print("✅ Multi-Provider Spec Loaded: Claude 3.5 Sonnet, GPT-4o, Grok-2, Fable Ultra INT4 AWQ.")`,
    output: {
      type: 'text',
      data: `⚡ Initializing Multi-Provider AI SDK Allocator...\n🔑 Active Keys Loaded: ANTHROPIC_API_KEY, OPENAI_API_KEY, GROK_API_KEY, FABLE_API_KEY\n✅ Multi-Provider Spec Loaded: Claude 3.5 Sonnet, GPT-4o, Grok-2, Fable Ultra INT4 AWQ.`,
      executionTimeMs: 320
    },
    executionCount: 1
  },
  {
    id: 'cell-3',
    type: 'code',
    language: 'python',
    content: `# Benchmark Claude 3.5 Sonnet & GPT-4o Throughput and TTFT
prompt = "Analyze quantum key distribution protocols with Claude 3.5 Sonnet & GPT-4o parallel streaming."

start_time = time.time()
vram_before = torch.cuda.memory_allocated() if torch.cuda.is_available() else 14.2

time.sleep(0.038) # 38ms TTFT
ttft_ms = (time.time() - start_time) * 1000

print(f"⏱️ Time To First Token (TTFT): {ttft_ms:.2f} ms")
print(f"💾 VRAM Allocation: {vram_before:.1f} GB (62% reduction vs FP16 baseline)")
print(f"🚀 Peak Throughput: 192.5 tokens/sec (Claude 3.5 Sonnet INT4 AWQ)")`,
    output: {
      type: 'metrics',
      data: {
        ttftMs: 38.2,
        vramAllocatedGb: 14.2,
        vramSavedPercent: 62.5,
        throughputTokSec: 192.5,
        cacheStatus: 'HIT (Claude & OpenAI Prompt Cache Enabled)'
      },
      executionTimeMs: 110
    },
    executionCount: 2
  }
];

export const INITIAL_PIPELINE_CONFIG: PipelineConfig = {
  name: 'Enterprise Multi-Provider Reasoning Pipeline',
  model: 'Claude 3.5 Sonnet',
  quantization: 'INT4 AWQ',
  caching: 'Prompt Caching',
  hardware: 'NVIDIA H100 SXM (80GB)',
  batchSize: 4,
  temperature: 0.2,
  topP: 0.95,
  maxTokens: 2048,
  systemPrompt: 'You are an enterprise AI reasoning agent. Process queries with high accuracy, low latency, and structured JSON outputs.',
  fallbackModel: 'GPT-4o mini',
  enableSpeculativeDecoding: true,
  enableContextTruncation: true,
};

export const INITIAL_AGENT_NODES: AgentNode[] = [
  {
    id: 'agent-coord',
    name: 'Orchestrator Agent (Claude 3 Opus)',
    role: 'Decomposes complex requests & routes tasks to specialist models',
    model: 'Claude 3 Opus',
    status: 'success',
    latencyMs: 28,
    prompt: 'Analyze user intent and partition workload into Sub-tasks for GPT-4o and Grok-2.',
    outputs: 'Routed 3 sub-tasks: [Data Cleaning -> GPT-4o Quantizer], [Evaluation -> Grok-2 Evaluator], [Safety -> Fable Guard].',
    connections: ['agent-quant', 'agent-eval']
  },
  {
    id: 'agent-quant',
    name: 'Quantization Optimizer (GPT-4o)',
    role: 'Applies AWQ / INT8 quantization schemas & calculates VRAM',
    model: 'GPT-4o',
    status: 'success',
    latencyMs: 42,
    prompt: 'Check model layers and recommend minimum bit precision for target latency < 40ms.',
    outputs: 'Optimal precision: INT4 AWQ with Group Size 128. VRAM usage dropped from 38GB to 14.2GB.',
    connections: ['agent-eval']
  },
  {
    id: 'agent-eval',
    name: 'SLA Evaluator (Grok-2)',
    role: 'Runs MMLU / GSM8K benchmark subset to ensure no accuracy loss',
    model: 'Grok-2',
    status: 'success',
    latencyMs: 52,
    prompt: 'Verify perplexity and GSM8K score on quantized Claude 3.5 Sonnet candidate.',
    outputs: 'Perplexity Delta: +0.06 | GSM8K Score: 94.2% (Passed SLA check > 90%). Approved for Prod.',
    connections: []
  }
];

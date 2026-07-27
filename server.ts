import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize GoogleGenAI client lazy / safely
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. API calls will use simulated responses.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Assistant Endpoint for Sandbox
app.post("/api/assistant/chat", async (req, res) => {
  try {
    const { message, history = [], context = {} } = req.body;

    const ai = getGenAI();
    if (!ai) {
      // Fallback response for multi-provider sandbox mode
      return res.json({
        reply: `[SV Sandbox Assistant Active] You asked: "${message}".\n\nBased on your current context (${context.activeTab || "Dashboard"}) on target ${context.hardware || 'NVIDIA H100'}, here is the multi-provider optimization analysis:\n\n1. **Claude 3.5 Sonnet / Opus (Anthropic)**: Applying INT4 AWQ reduces VRAM from 38 GB to 14.2 GB on H100 nodes while preserving prompt reasoning quality.\n2. **GPT-4o (OpenAI)**: Enabling Prompt Caching for system prompts drops TTFT latency from 280ms to 42ms (85% reduction).\n3. **Grok-2 (xAI) & Fable Ultra**: Configure multi-agent DAG coordinator nodes for high-throughput parallel execution.`,
        suggestions: [
          "Apply INT4 AWQ Quantization to current pipeline",
          "Enable Claude & OpenAI Prompt Caching",
          "Export multi-provider experiment report"
        ],
        action: null
      });
    }

    const systemInstruction = `You are the SV Sandbox Enterprise Multi-Provider AI Assistant.
You guide engineers and architects in testing AI models across Anthropic (Claude 3.5 Sonnet, Claude 3 Opus), OpenAI (GPT-4o, o1-preview), xAI (Grok-2), Fable AI (Fable Ultra), model quantization (FP16, INT8, INT4 AWQ), prompt/semantic caching, and multi-agent DAG orchestration.

Current Context:
- Active Tab/Module: ${context.activeTab || 'Overview'}
- Current Pipeline: ${JSON.stringify(context.pipeline || {})}
- Active Hardware Target: ${context.hardware || 'NVIDIA H100 SXM 80GB'}
- Last Experiment Metrics: ${JSON.stringify(context.metrics || {})}

Response Guidelines:
- Provide authoritative, technical, and concise guidance.
- Focus on multi-provider model benchmarking (Claude 3.5 Sonnet, GPT-4o, Grok-2, Fable Ultra).
- Include structured code or configuration recommendations when helpful.
- Suggest concrete 1-click actions the user can take in the UI (e.g. "Apply INT4 Quantization", "Run Notebook Cell #2", "Generate Report").
- Maintain a professional enterprise engineering tone.`;

    // Construct prompt with history
    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      history.slice(-6).forEach((h: any) => {
        contents.push({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text || h.content || '' }]
        });
      });
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contents.length === 1 ? message : contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I processed your request, but received no text response.";

    // Generate smart follow-up suggestions
    let suggestions = [
      "How does INT4 AWQ affect output quality?",
      "Compare Prompt Caching vs Semantic Caching",
      "Benchmark throughput on NVIDIA H100 vs TPU v5e"
    ];

    if (context.activeTab === 'Pipelines') {
      suggestions = [
        "Optimize pipeline for streaming latency",
        "Add a fallback model node to this agent DAG",
        "Enable speculative decoding in pipeline config"
      ];
    } else if (context.activeTab === 'Notebooks') {
      suggestions = [
        "Run Hugging Face model evaluation script",
        "Insert PyTorch INT8 dynamic quantization cell",
        "Analyze memory leak in GPU tensor allocation"
      ];
    }

    res.json({
      reply: replyText,
      suggestions,
      action: null
    });

  } catch (error: any) {
    console.error("Error in /api/assistant/chat:", error);
    res.status(500).json({ error: error.message || "Failed to process assistant prompt" });
  }
});

// Benchmark Endpoint
app.post("/api/pipeline/benchmark", (req, res) => {
  const { model = "Gemini 1.5 Pro", quantization = "FP16", caching = "Enabled (Prompt Cache)", batchSize = 4 } = req.body;

  let baseLatencyMs = 420;
  let baseVramGb = 32;
  let baseThroughput = 85;
  let baseCostPer1M = 1.25;

  if (quantization === "INT8") {
    baseLatencyMs *= 0.75;
    baseVramGb *= 0.55;
    baseThroughput *= 1.4;
  } else if (quantization === "INT4 AWQ") {
    baseLatencyMs *= 0.58;
    baseVramGb *= 0.38;
    baseThroughput *= 1.85;
  }

  if (caching.includes("Prompt Cache")) {
    baseLatencyMs *= 0.35; // 65% faster for cached prompts
    baseCostPer1M *= 0.25;  // 75% cheaper
  }

  res.json({
    model,
    quantization,
    caching,
    results: {
      timeToFirstTokenMs: Math.round(baseLatencyMs * 0.3),
      totalLatencyMs: Math.round(baseLatencyMs),
      vramUsageGb: Number(baseVramGb.toFixed(1)),
      throughputTokensSec: Math.round(baseThroughput * (batchSize / 2)),
      costPerMillionTokens: Number(baseCostPer1M.toFixed(3)),
      cacheHitRatio: caching.includes("Enabled") ? "84.2%" : "0%",
      perplexityDelta: quantization === "INT4 AWQ" ? "+0.08" : quantization === "INT8" ? "+0.02" : "0.00 (Baseline)"
    }
  });
});

// Executive Report Auto-Generation Endpoint
app.post("/api/reports/generate", async (req, res) => {
  try {
    const { experiments = [], pipeline = {}, metrics = {} } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        reportMarkdown: `# SVsandbox Executive Multi-Provider AI Experimentation Report
*Generated on: ${new Date().toLocaleDateString()}*

## 1. Executive Summary
During the current benchmark cycle in SVsandbox, our engineering team evaluated multi-agent orchestration, INT4 AWQ model quantization, and prompt caching strategies across leading AI model providers including Anthropic (Claude 3.5 Sonnet / Opus), OpenAI (GPT-4o), xAI (Grok-2), and Fable AI (Fable Ultra).

## 2. Key Findings & Performance Metrics
- **Quantization Efficiency**: Transitioning from FP16 to INT4 AWQ reduced GPU VRAM footprint by **62.5%** (dropping from 38 GB to 14.2 GB) with negligible perplexity degradation (+0.08) across Claude 3.5 Sonnet & GPT-4o deployments.
- **Caching Speedup**: Enabling Anthropic & OpenAI Prompt Caching resulted in an **84.2% cache hit ratio**, driving Time-To-First-Token (TTFT) down from 280ms to 42ms.
- **Cost Reduction**: Overall inference token spend reduced by **72%** for high-frequency system prompt execution.

## 3. Recommended Production Architecture
1. Deploy model nodes with **INT4 AWQ quantization** on NVIDIA H100 SXM clusters.
2. Place a **Redis-backed Semantic Cache** layer in front of the Agent Orchestrator.
3. Configure DAG fallback routing to GPT-4o mini for SLA compliance.
`
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Generate a sleek, professional executive Markdown report summarizing these AI Sandbox experimentation results:
Pipeline Config: ${JSON.stringify(pipeline)}
Metrics Summary: ${JSON.stringify(metrics)}
Recent Experiments: ${JSON.stringify(experiments)}

Include Executive Summary, Quantization & Memory Analysis, Caching Efficiency Breakdown, Multi-Agent Orchestration Reliability, and Strategic Next Steps for enterprise deployment.`,
    });

    res.json({ reportMarkdown: response.text });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to generate report" });
  }
});

// Vite & Static Server Setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

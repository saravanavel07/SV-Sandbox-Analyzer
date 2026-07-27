# SV Sandbox - Advanced AI Experimentation & Multi-Agent Orchestration Hub

![SV Sandbox Banner](https://img.shields.io/badge/SV%20Sandbox-v1.0.0-emerald?style=for-the-badge)
![Multi-Provider Powered](https://img.shields.io/badge/Multi--Provider-Claude%20%7C%20GPT--4o%20%7C%20Grok%20%7C%20Fable-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-Enterprise-cyan?style=for-the-badge)

**SV Sandbox** is a company-grade AI innovation platform designed for model experimentation, multi-agent orchestration, precision quantization analysis, and prompt caching benchmarking. Featuring a unique futuristic visual identity built around a live-motion green-and-cyan animated glowing triangle emblem, **SV Sandbox** empowers research teams and AI engineers to prototype, optimize, and deploy high-performance model workflows across top model providers (Claude 3.5 Sonnet / Opus, GPT-4o, Grok-2, Fable Ultra).

---

## 🌟 Key Objectives & Brand Identity

- **Futuristic Live-Motion Brand Identity**: Glowing animated emerald, cyan, and multi-spectrum brand emblem, live telemetry bar, and a real-time moving space molecules background canvas.
- **Enterprise Dark Aesthetics**: High-contrast, sleek interface with deep space galactic canvas, moving atomic/molecular nodes with glowing orbital rings and particle connections, animated ambient glows, emerald (`#10B981`), cyan (`#06B6D4`), purple (`#8B5CF6`), and pink accents.
- **Data-Driven Optimization**: Real-time measurement of VRAM footprint, TTFT (Time To First Token) latency drops, and cost reductions across quantization modes.
- **Interactive Multi-Agent Canvas**: Non-pipeline graph layout displaying real-time agent communications, token budgets, and fallback orchestration.

---

## 🚀 Core Features

### 1. Intelligent AI Assistant (Gemini 3.6)
- **Context-Aware Agent**: Built-in side drawer assistant connected to experiment logs and pipeline configurations.
- **Adaptive Recommendations**: 1-click execution for model optimizations (e.g., INT4 AWQ precision, Prompt Caching).
- **Code & Syntax Generator**: Auto-generates Python and TypeScript code snippets for model deployment.

### 2. Advanced Experimentation Workbench & Notebooks
- **Interactive Notebook Cells**: Run live Python code blocks with simulated PyTorch / HuggingFace model benchmarks.
- **Quantization Simulator**: Test FP16, INT8, and INT4 AWQ precision with real-time memory and perplexity comparisons.
- **Resource Allocation**: Simulate GPU cluster provisioning (1x A100 80GB, 4x H100 80GB, TPU v5p-8).

### 3. Multi-Agent DAG Orchestrator
- **Visual Collaboration Graph**: Dynamic topology display featuring Autonomous Researcher, Code Synthesizer, Evaluator, and Safety Guard nodes.
- **Agent Controls**: Step-by-step execution, agent temperature adjustments, and communication logs.
- **SLA Fallbacks**: Automatic fallback triggering when latency or accuracy thresholds are breached.

### 4. Enterprise Analytics & Performance Matrix
- **Throughput & TTFT Curves**: Interactive Recharts area graphs measuring tokens/sec vs. response latency.
- **VRAM Savings Tracking**: Visualize up to 62.4% memory footprint reductions with INT4 AWQ quantization.
- **Cost Engine**: Real-time token cost calculator projecting savings across model families.

### 5. Enterprise Reports & Compliance
- **Auto-Generated Executive Summary**: Produce comprehensive markdown reports detailing benchmark metrics and architecture guidelines.
- **1-Click Export & Print**: Export reports to PDF/Print or copy clean markdown for team documentation.
- **Audit Trails & Security Isolation**: Environment cluster isolation and workspace switching.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 18, TypeScript, Vite
- **Styling & UI**: Tailwind CSS, Lucide React Icons
- **Visual Analytics**: Recharts
- **Backend & AI Server**: Express.js, `@google/genai` (Gemini 3.6)
- **Effects**: Canvas Confetti

---

## 📁 Project Structure

```
.
├── metadata.json              # Application metadata & configuration
├── package.json               # Dependencies & scripts
├── server.ts                  # Express server entry point & Gemini API proxy
├── src/
│   ├── App.tsx                # Main container component & tab manager
│   ├── index.css              # Tailwind CSS imports & global styles
│   ├── main.tsx               # React DOM root entry point
│   ├── types.ts               # Global TypeScript definitions
│   ├── components/
│   │   ├── Header.tsx         # Navigation header with live-motion SVsandbox logo
│   │   ├── Sidebar.tsx        # Navigation sidebar & VRAM quota gauge
│   │   ├── LiveTelemetryBar.tsx # Real-time streaming spectrum telemetry bar
│   │   ├── SpaceMoleculeCanvas.tsx # Animated moving space molecules & atomic bond canvas
│   │   ├── AIAssistantDrawer.tsx # Context-aware AI assistant drawer
│   │   └── tabs/
│   │       ├── DashboardTab.tsx        # Overview KPI metrics & performance charts
│   │       ├── NotebookTab.tsx         # Interactive Python code benchmark cells
│   │       ├── AgentOrchestratorTab.tsx # Multi-agent graph visualizer
│   │       ├── PipelineTab.tsx         # Quantization & caching pipeline builder
│   │       ├── AnalyticsTab.tsx        # Model comparison matrix & Recharts
│   │       └── ReportsTab.tsx          # Markdown executive report generator
│   └── data/                  # Mock benchmark data & default configurations
└── README.md                  # Project documentation
```

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- `npm` package manager
- Google Gemini API Key (optional for live AI assistant responses)

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd /path/to/project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create or edit `.env` (or set `GEMINI_API_KEY` in environment):
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```

---

## 🛡️ Enterprise Compliance & Security

SVsandbox is architected with enterprise data security in mind:
- **Server-Side API Keys**: Gemini API keys are processed strictly on the Express backend (`server.ts`) and never exposed to the client.
- **Sandbox Isolation**: Workspaces run in isolated cloud environments to protect experiment logs and fine-tuned model weights.

---

## 📜 License

Created for Enterprise AI Experimentation. All rights reserved.

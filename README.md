# SV Sandbox Analyzer

A modern AI experimentation workspace for benchmarking models, exploring quantization strategies, orchestrating multi-agent workflows, and generating executive reports from live sandbox performance data.

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-97.8%25-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express" alt="Express" />
</p>

## Overview

SV Sandbox Analyzer is a single-page, enterprise-inspired dashboard for evaluating AI workloads across hardware, model variants, quantization modes, and prompt optimization strategies. It combines:

- live experiment tracking
- notebook-style benchmark simulations
- multi-agent orchestration views
- analytics dashboards
- markdown report generation
- embedded AI assistant guidance

This project is designed as a polished, presentation-friendly AI ops interface that shows how teams can experiment with inference performance and optimization decisions in a sandbox environment.

## Highlights

### Benchmarking and model analysis
- Compare models and deployment configurations
- Simulate throughput, latency, and VRAM efficiency
- Review quantization trade-offs such as FP16, INT8, and INT4 AWQ
- Track prompt caching benefits and operational cost impact

### Multi-agent orchestration
- Visualize a DAG-style workflow of specialized AI agents
- Monitor agent behavior, fallback logic, and task routing
- Coordinate experiments across research, synthesis, evaluation, and safety review

### Interactive workspace
- Dashboard-driven control plane for experiments
- Notebook-style section for execution and documentation
- Report generation with export-ready summaries
- Real-time telemetry and animated UI presentation

### AI assistant integration
- Embedded assistant panel for optimization recommendations
- One-click actions for quantization or caching adjustments
- Context-aware prompts tailored to active workflow

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- Express.js
- Google GenAI SDK
- Lucide icons
- Canvas confetti

## Project Structure

```text
.
├── index.html
├── metadata.json
├── package.json
├── server.ts
├── tsconfig.json
├── vite.config.ts
├── bun.lock
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── types.ts
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── LiveTelemetryBar.tsx
│   │   ├── SpaceMoleculeCanvas.tsx
│   │   ├── AIAssistantDrawer.tsx
│   │   └── tabs/
│   │       ├── DashboardTab.tsx
│   │       ├── NotebookTab.tsx
│   │       ├── PipelineTab.tsx
│   │       ├── AgentOrchestratorTab.tsx
│   │       ├── AnalyticsTab.tsx
│   │       └── ReportsTab.tsx
│   └── data/
├── README.md
└── dist/ (generated after build)
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or bun
- Optional: Google Gemini API key for assistant-enabled backend requests

### Install dependencies

```bash
npm install
```

Or with Bun:

```bash
bun install
```

### Start the app in development mode

```bash
npm run dev
```

The app launches with the Express server and frontend via Vite.

### Production build

```bash
npm run build
```

Then start the built server:

```bash
npm start
```

## Environment Configuration

Create a `.env` file in the project root if you want to enable live Gemini-backed AI responses:

```env
GEMINI_API_KEY=your_api_key_here
```

## Available Scripts

```bash
npm run dev        # start local development environment
npm run build      # build the frontend and server bundle
npm run start      # run production build
npm run clean      # remove generated build artifacts
npm run lint       # TypeScript validation
```

## Use Cases

This project is well suited for:

- AI product demos
- inference optimization workshops
- LLM hardware benchmarking previews
- enterprise AI experimentation dashboards
- internal model performance presentations

## Notes

This repository is intentionally designed as a polished developer experience and visual demo, blending product UI with AI experimentation concepts. It is useful both as a launchpad for further engineering and as a showcase for AI orchestration workflows.

## License

This project is provided as-is for experimentation and demo use.

---

Built for exploring how AI systems can be measured, optimized, and presented in a premium sandbox experience.

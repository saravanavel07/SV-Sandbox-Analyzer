import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Terminal, 
  Check, 
  Code, 
  Zap, 
  RefreshCw,
  Play,
  Copy,
  ChevronRight
} from 'lucide-react';
import { AssistantMessage, ModuleTab, PipelineConfig } from '../types';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ModuleTab;
  pipelineConfig: PipelineConfig;
  selectedHardware: string;
  onApplyAction: (actionType: string, payload?: any) => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  pipelineConfig,
  selectedHardware,
  onApplyAction
}) => {
  const [selectedEngine, setSelectedEngine] = useState<string>('Claude 3.5 Sonnet');
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Hello! I am your embedded **SV Sandbox Multi-Provider Assistant**.\n\nI can help you set up model quantization (FP16 vs INT4 AWQ), configure prompt/semantic caching, orchestrate multi-agent DAG workflows, and benchmark models across Anthropic (Claude 3.5 Sonnet / Opus), OpenAI (GPT-4o), xAI (Grok-2), and Fable AI (Fable Ultra).`,
      suggestions: [
        'How can INT4 AWQ reduce VRAM for Claude 3.5 Sonnet & GPT-4o?',
        'Compare Claude 3 Opus vs GPT-4o on complex reasoning tasks',
        'Show me an Anthropic & OpenAI prompt caching benchmark script'
      ],
      timestamp: 'Just now'
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const userQuery = textToSend || input;
    if (!userQuery.trim() || isLoading) return;

    const userMsg: AssistantMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userQuery,
          history: messages.map((m) => ({ role: m.sender, text: m.text })),
          context: {
            activeTab,
            pipeline: pipelineConfig,
            hardware: selectedHardware
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const assistantMsg: AssistantMessage = {
        id: `msg-resp-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Request processed successfully.',
        suggestions: data.suggestions || [
          'Run benchmark test on current configuration',
          'Export experiment logs to report'
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Assistant API error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-err-${Date.now()}`,
          sender: 'assistant',
          text: `I encountered an error querying the model: ${err.message || 'Network error'}. Standard Sandbox advice: Try applying INT4 AWQ quantization to drop memory consumption by ~62%.`,
          suggestions: ['Apply INT4 AWQ Quantization', 'Try Prompt Caching'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 md:w-[420px] bg-[#0A0C14] border-l border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)] z-50 flex flex-col justify-between">
      {/* Multi-Spectrum Left Border Ray */}
      <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-emerald-500 via-cyan-400 via-purple-500 via-pink-500 to-amber-400 animate-gradient-shift" />

      {/* Header */}
      <div className="p-4 border-b border-[#1E2129] flex items-center justify-between bg-[#080A10]/90 backdrop-blur-md">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-500/20 via-pink-500/20 to-cyan-500/20 text-purple-300 border border-purple-400/40">
            <Bot className="w-5 h-5 text-pink-300 animate-bounce" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100 flex items-center space-x-1.5">
              <span>SV Sandbox AI Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </h3>
            <div className="flex items-center space-x-2 mt-0.5">
              <select
                value={selectedEngine}
                onChange={(e) => setSelectedEngine(e.target.value)}
                className="bg-[#121520] border border-purple-500/30 text-purple-300 text-[10px] font-mono rounded-lg px-2 py-0.5 focus:outline-none"
              >
                <option>Claude 3.5 Sonnet</option>
                <option>Claude 3 Opus</option>
                <option>GPT-4o</option>
                <option>Grok-2</option>
                <option>Fable Ultra</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#1E2129] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 mb-1">
                {isUser ? (
                  <>
                    <span>You</span>
                    <User className="w-3 h-3 text-indigo-400" />
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">{selectedEngine} Assistant</span>
                  </>
                )}
                <span>• {msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[90%] p-3 rounded-2xl border leading-relaxed shadow-sm ${
                  isUser
                    ? 'bg-indigo-600 text-white border-indigo-500 rounded-tr-none'
                    : 'bg-[#14161C] text-slate-200 border-[#1E2129] rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">
                  {msg.text.split('```').map((part, index) => {
                    if (index % 2 === 1) {
                      // Code block
                      return (
                        <div key={index} className="my-2 bg-[#0A0B0E] p-2.5 rounded-lg font-mono text-[11px] border border-[#1E2129] text-emerald-300 overflow-x-auto relative group">
                          <button
                            onClick={() => copyToClipboard(part, `${msg.id}-${index}`)}
                            className="absolute top-1.5 right-1.5 p-1 rounded bg-[#1E2129] text-slate-400 hover:text-white"
                          >
                            {copiedId === `${msg.id}-${index}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                          <code>{part.trim()}</code>
                        </div>
                      );
                    }
                    return <span key={index}>{part}</span>;
                  })}
                </div>

                {/* Direct Action Trigger Buttons */}
                {msg.text.includes('INT4 AWQ') && !isUser && (
                  <div className="mt-2.5 pt-2 border-t border-[#1E2129] flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">Action: Apply quantization to pipeline</span>
                    <button
                      onClick={() => onApplyAction('apply_quantization', 'INT4 AWQ')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-[11px] flex items-center space-x-1"
                    >
                      <Zap className="w-3 h-3" />
                      <span>Apply INT4 AWQ</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Follow-up Suggestions */}
              {msg.suggestions && msg.suggestions.length > 0 && !isUser && (
                <div className="mt-2 space-y-1.5 w-full">
                  <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block">Suggested Questions</span>
                  {msg.suggestions.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(sug)}
                      className="w-full text-left p-2 rounded-xl bg-[#14161C] hover:bg-[#1E2129] border border-[#1E2129] text-indigo-300 text-[11px] flex items-center justify-between transition-colors group"
                    >
                      <span className="truncate">{sug}</span>
                      <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center space-x-2 text-indigo-400 p-2.5 bg-[#14161C] rounded-xl border border-[#1E2129] text-xs">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>{selectedEngine} is analyzing model context...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-[#1E2129] bg-[#0A0B0E]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about quantization, caching, notebooks, or agents..."
            className="flex-1 bg-[#14161C] border border-[#2D3139] rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-[#1E2129] text-white disabled:text-slate-600 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

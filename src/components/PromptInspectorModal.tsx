import React, { useState } from 'react';
import { X, Cpu, Copy, Check, Sparkles, Layers, ShieldCheck, Terminal, BookOpen } from 'lucide-react';
import { PromptMetrics } from '../types';

interface PromptInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics?: PromptMetrics;
}

export const PromptInspectorModal: React.FC<PromptInspectorModalProps> = ({
  isOpen,
  onClose,
  metrics,
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const defaultSystemPrompt = `You are TripGenie, an expert AI Travel Planner, Geographer, and Master Concierge.
Your mission is to generate an authentic, realistic, geographically optimized day-by-day travel itinerary.
Core Principles:
1. GEOGRAPHIC CLUSTERING: Group morning, afternoon, and evening activities in nearby neighborhoods to minimize transit waste.
2. REALISTIC PACING: Match the requested pace ('relaxed' = 2-3 activities/day, 'balanced' = 3-4 activities/day, 'fast-paced' = 4-5 activities/day).
3. BUDGET REALISM: Reflect realistic costs matching the budget tier and party size.
4. SPECIFICITY: Mention exact venue names, dish names, viewpoints, and practical insider tips.
5. STRUCTURED JSON: Respond strictly with the required JSON schema.`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-indigo-200 space-y-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-display text-slate-900">
                  AI Architecture &amp; Prompt Engineering Lab
                </h3>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                  Academic Project
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Inspection panel for model selection, system prompt framing, and schema enforcement
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1 text-xs">
          {/* Tech Stack Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Foundation Model</span>
              <strong className="text-sm font-bold text-indigo-900 font-display block">gemini-3.7-flash</strong>
              <span className="text-[10px] text-emerald-600 font-semibold">Fast multimodal reasoning</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">SDK Standard</span>
              <strong className="text-sm font-bold text-indigo-900 font-display block">@google/genai v2.4</strong>
              <span className="text-[10px] text-slate-500 font-semibold">Server-Side Proxy Architecture</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Output Enforcer</span>
              <strong className="text-sm font-bold text-indigo-900 font-display block">Type.OBJECT Schema</strong>
              <span className="text-[10px] text-slate-500 font-semibold">100% deterministic parsing</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Frontend Stack</span>
              <strong className="text-sm font-bold text-indigo-900 font-display block">React 19 + Tailwind</strong>
              <span className="text-[10px] text-slate-500 font-semibold">Motion animations & Lucide</span>
            </div>
          </div>

          {/* Academic Key Highlights */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Prompt Engineering Techniques Utilized</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <strong className="text-slate-800 font-semibold block">1. Role &amp; Persona Definition</strong>
                <p className="text-slate-600 leading-relaxed">
                  System instructions establish domain-specific authority (&ldquo;TripGenie Master Geographer&rdquo;) which activates spatial associations and prevents hallucinated travel timelines.
                </p>
              </div>

              <div className="space-y-1">
                <strong className="text-slate-800 font-semibold block">2. In-Context CoT Spatial Clustering</strong>
                <p className="text-slate-600 leading-relaxed">
                  Directs the model to mentally evaluate physical distances between consecutive venues before ordering them in morning, afternoon, and evening slots.
                </p>
              </div>

              <div className="space-y-1">
                <strong className="text-slate-800 font-semibold block">3. Structured Schema Constraint</strong>
                <p className="text-slate-600 leading-relaxed">
                  Supplies strict nested `responseSchema` parameters preventing markdown fences or malformed JSON payloads from breaking the UI rendering engine.
                </p>
              </div>

              <div className="space-y-1">
                <strong className="text-slate-800 font-semibold block">4. Multi-Modal Contextual Concierge</strong>
                <p className="text-slate-600 leading-relaxed">
                  Maintains active itinerary state in session memory so conversational queries (&ldquo;Where can I eat lunch near stop 2?&rdquo;) are answered with zero user re-prompting.
                </p>
              </div>
            </div>
          </div>

          {/* System Prompt Code Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-slate-600" />
                <span>System Instruction Blueprint</span>
              </span>
              <button
                onClick={() => handleCopy(metrics?.systemInstructionUsed || defaultSystemPrompt, 'sys')}
                className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copiedSection === 'sys' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'sys' ? 'Copied' : 'Copy Prompt'}</span>
              </button>
            </div>
            <pre className="p-3.5 bg-slate-900 text-teal-300 rounded-2xl font-mono text-[11px] leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto border border-slate-800">
              {metrics?.systemInstructionUsed || defaultSystemPrompt}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

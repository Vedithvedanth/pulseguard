import React from 'react';
import { Bot, Cpu, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { DEMO_AGENT_ARCHITECTURE } from '../data/heritageBitesDemo';
import { usePulseGuard } from '../context/PulseGuardContext';

export const AgentArchitectureModal: React.FC = () => {
  const { setChatOpen } = usePulseGuard();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Bot className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                6-Agent Orchestration Architecture
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              PulseGuard AI decomposes business failure prediction into specialized deterministic and generative agents. This prevents hallucinations and separates statistical outlier math from causal reasoning.
            </p>
          </div>

          <button
            onClick={() => setChatOpen(true)}
            className="flex items-center gap-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-lg shadow-sm transition cursor-pointer self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chat with Agent 6 (Advisor)</span>
          </button>
        </div>
      </div>

      {/* Agents Flow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DEMO_AGENT_ARCHITECTURE.map((agent) => (
          <div
            key={agent.id}
            className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between shadow-md hover:border-slate-700 transition"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                    0{agent.agentNumber}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{agent.name.split('—')[1]?.trim() || agent.name}</h3>
                    <div className="text-[11px] text-slate-400">{agent.role}</div>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-300">
                  {agent.engineType}
                </span>
              </div>

              {/* Responsibilities */}
              <div className="space-y-1.5 mb-4 text-xs text-slate-300">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Core Responsibilities:
                </div>
                {agent.responsibilities.map((resp, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold shrink-0">•</span>
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Telemetry Output */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-xs">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                Latest Agent Finding:
              </span>
              <p className="text-slate-300 italic text-[11px] leading-relaxed">
                "{agent.lastFinding}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

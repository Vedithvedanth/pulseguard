import React from 'react';
import { Clock, AlertTriangle, CheckCircle, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { usePulseGuard } from '../context/PulseGuardContext';

export const RiskTimeline: React.FC = () => {
  const { risks, openModal } = usePulseGuard();
  const heroRisk = risks[0];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Failure Progression Timeline
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Chronological reconstruction of how normal operations transitioned into active failure vulnerability.
          </p>
        </div>

        <button
          onClick={() => openModal('what-if-do-nothing', heroRisk)}
          className="text-xs font-semibold text-red-300 bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 px-3.5 py-1.5 rounded-lg transition self-start sm:self-auto cursor-pointer"
        >
          View Inaction Outcome
        </button>
      </div>

      {/* Horizontal / Stacked Timeline Milestones */}
      <div className="relative">
        {/* Connecting Line */}
        <div className="hidden md:block absolute top-6 left-8 right-8 h-0.5 bg-slate-800 z-0" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
          {heroRisk.timeline.map((step, idx) => {
            const isLast = idx === heroRisk.timeline.length - 1;
            const isCurrent = step.stage === 'Current';

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex flex-col justify-between transition ${
                  isLast
                    ? 'bg-red-950/30 border-red-500/50'
                    : isCurrent
                    ? 'bg-amber-950/20 border-amber-500/40'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div>
                  {/* Step indicator circle */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                      {step.timeLabel}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isLast
                          ? 'bg-red-500 text-white animate-pulse'
                          : isCurrent
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </div>
                  </div>

                  <div className="text-xs font-bold text-white mb-1.5 flex items-center gap-1.5">
                    {step.isWarning && <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />}
                    <span>{step.status}</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {step.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-850 text-[10px] font-mono text-slate-500">
                  {step.stage} Stage
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

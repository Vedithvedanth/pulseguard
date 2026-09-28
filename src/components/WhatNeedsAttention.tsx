import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  Coins,
  ShieldAlert,
  Search,
  CheckCircle,
  GitBranch,
  Eye,
  Sliders,
} from 'lucide-react';
import { usePulseGuard } from '../context/PulseGuardContext';
import { RiskAlert, RiskSeverity } from '../types';

export const WhatNeedsAttention: React.FC = () => {
  const { risks, openModal, updateActionStatus, actions, setCurrentView } = usePulseGuard();
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'MODERATE'>('ALL');

  const filteredRisks = risks.filter((r) => {
    if (selectedFilter === 'ALL') return true;
    return r.severity === selectedFilter;
  });

  const getSeverityBadge = (sev: RiskSeverity) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'HIGH':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      case 'MODERATE':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              What Needs Attention?
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            AI-detected operational failure risks ranked by probability, business impact, and urgency.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          {(['ALL', 'CRITICAL', 'HIGH', 'MODERATE'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-2.5 py-1 rounded font-mono font-medium transition cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-slate-800 text-amber-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Risk Cards Feed */}
      <div className="space-y-4">
        {filteredRisks.map((risk) => {
          const matchingAction = actions.find((a) => a.riskId === risk.id);
          const isDone = matchingAction?.status === 'Completed';

          return (
            <div
              key={risk.id}
              className={`rounded-xl border p-5 transition ${
                risk.severity === 'CRITICAL' || risk.severity === 'HIGH'
                  ? 'bg-slate-950/80 border-slate-800 hover:border-amber-500/40'
                  : 'bg-slate-950/50 border-slate-800/80'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getSeverityBadge(risk.severity)}`}>
                      {risk.severity} RISK
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Score: <strong className="text-white">{risk.riskScore}/100</strong>
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-amber-400/90 font-medium">
                      Exhaustion window: {risk.timeToFailure}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {risk.title}
                  </h3>

                  {/* Why Signals Row */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs text-slate-400 font-medium">Why:</span>
                    {risk.whySignals.map((sig, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300 flex items-center gap-1"
                      >
                        <span>{sig.label}</span>
                        <strong className="text-amber-400 font-mono">{sig.change}</strong>
                      </span>
                    ))}
                  </div>

                  {/* Estimated Impact */}
                  <div className="text-xs text-slate-300 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <div>
                      Estimated Impact: <strong className="text-amber-300 font-bold">{risk.estimatedImpactDisplay}</strong> potential lost sales
                    </div>
                    <span className="text-slate-600 hidden sm:inline">•</span>
                    <div>
                      Affected Volume: <strong className="text-white">{risk.affectedOrdersEstimate}</strong>
                    </div>
                  </div>

                  {/* Recommended Action Snippet */}
                  {risk.recommendedActions.length > 0 && (
                    <div className="mt-3 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 flex items-start gap-2">
                      <span className="text-amber-400 font-bold shrink-0">Prescription:</span>
                      <span className="flex-1">{risk.recommendedActions[0].title}</span>
                    </div>
                  )}
                </div>

                {/* Right Action Buttons */}
                <div className="flex flex-wrap sm:flex-nowrap lg:flex-col items-stretch gap-2 shrink-0 lg:w-44">
                  <button
                    onClick={() => openModal('evidence', risk)}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 py-2 px-3 rounded-lg transition cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5 text-amber-400" />
                    <span>View Evidence</span>
                  </button>

                  <button
                    onClick={() => openModal('root-cause', risk)}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 py-2 px-3 rounded-lg transition cursor-pointer"
                  >
                    <GitBranch className="w-3.5 h-3.5 text-blue-400" />
                    <span>Root Cause Tree</span>
                  </button>

                  {matchingAction && (
                    <button
                      onClick={() => updateActionStatus(matchingAction.id, isDone ? 'Pending' : 'Completed')}
                      className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2 px-3 rounded-lg transition cursor-pointer ${
                        isDone
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{isDone ? 'Marked Done' : 'Take Action'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

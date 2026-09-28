import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Search,
  Filter,
  ArrowRight,
} from 'lucide-react';
import { usePulseGuard } from '../context/PulseGuardContext';
import { RiskAlert, RiskSeverity } from '../types';

export const AlertCenter: React.FC = () => {
  const { risks, openModal, updateActionStatus, actions } = usePulseGuard();
  const [activeTab, setActiveTab] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'MODERATE' | 'RESOLVED'>('ALL');

  const alerts = risks.filter((r) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'RESOLVED') return r.status === 'RESOLVED' || r.status === 'RESOLVING';
    return r.severity === activeTab && r.status === 'ACTIVE';
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Bell className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Operations Alert Center & Incident Stream
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-xl">
              Chronological log of AI-detected anomalies, cross-domain risk alerts, and operational event escalations.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
            {(['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'RESOLVED'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg font-mono font-medium transition cursor-pointer ${
                  activeTab === tab
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alert Feed */}
      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-12 text-center text-slate-400 text-sm">
            No alerts found in category <strong className="text-white">{activeTab}</strong>.
          </div>
        ) : (
          alerts.map((al) => {
            const matchingAction = actions.find((a) => a.riskId === al.id);
            const isDone = matchingAction?.status === 'Completed';

            return (
              <div
                key={al.id}
                className="bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-md hover:border-slate-700 transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        al.severity === 'CRITICAL'
                          ? 'bg-red-500/20 text-red-300 border-red-500/40'
                          : al.severity === 'HIGH'
                          ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}>
                        {al.severity}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        Score: <strong className="text-white">{al.riskScore}/100</strong>
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400">
                        Timestamp: {al.discoveredAt}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs font-mono text-amber-400">
                        Runway: {al.timeToFailure}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white">
                      {al.title}
                    </h3>

                    <div className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-850">
                      <span className="text-amber-400 font-bold">Reasoning: </span>
                      {al.aiReasoning}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 pt-1">
                      <div>
                        Estimated Impact: <strong className="text-amber-300 font-mono font-bold">{al.estimatedImpactDisplay}</strong>
                      </div>
                      <span className="text-slate-600">•</span>
                      <div>
                        Affected Orders: <strong className="text-white">{al.affectedOrdersEstimate}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="flex flex-wrap lg:flex-col gap-2 shrink-0 lg:w-44 self-end lg:self-start">
                    <button
                      onClick={() => openModal('evidence', al)}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 py-2 px-3 rounded-lg transition cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5 text-amber-400" />
                      <span>View Evidence</span>
                    </button>

                    <button
                      onClick={() => openModal('root-cause', al)}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 py-2 px-3 rounded-lg transition cursor-pointer"
                    >
                      <span>Root Cause Tree</span>
                    </button>

                    {matchingAction && (
                      <button
                        onClick={() => updateActionStatus(matchingAction.id, isDone ? 'Pending' : 'Completed')}
                        className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-bold py-2 px-3 rounded-lg transition cursor-pointer ${
                          isDone
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isDone ? 'Mitigated' : 'Take Action'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

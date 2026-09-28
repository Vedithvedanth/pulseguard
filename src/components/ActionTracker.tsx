import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  User,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { usePulseGuard } from '../context/PulseGuardContext';
import { ActionStatus, ActionItem } from '../types';

export const ActionTracker: React.FC = () => {
  const { actions, updateActionStatus, healthScores } = usePulseGuard();
  const [filter, setFilter] = useState<'ALL' | 'Pending' | 'In Progress' | 'Completed' | 'Dismissed'>('ALL');

  const filteredActions = actions.filter((act) => {
    if (filter === 'ALL') return true;
    return act.status === filter;
  });

  const completedCount = actions.filter((a) => a.status === 'Completed').length;
  const pendingCount = actions.filter((a) => a.status === 'Pending').length;

  const getStatusBadge = (st: ActionStatus) => {
    switch (st) {
      case 'Completed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'In Progress':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Dismissed':
        return 'bg-slate-800 text-slate-400 border-slate-700';
      default:
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CheckSquare className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Operational Action Management
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-xl">
              Close the loop from risk detection to executed business remediation. Marking actions complete dynamically recalculates the Business Health Score.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-center">
              <div className="text-xs text-slate-400">Completed</div>
              <div className="text-xl font-bold font-mono text-emerald-400">{completedCount}</div>
            </div>
            <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-center">
              <div className="text-xs text-slate-400">Pending</div>
              <div className="text-xl font-bold font-mono text-amber-400">{pendingCount}</div>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-800 text-xs">
          {(['ALL', 'Pending', 'In Progress', 'Completed', 'Dismissed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                filter === st
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st} {st !== 'ALL' && `(${actions.filter((a) => a.status === st).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Action Table / Cards */}
      <div className="space-y-3">
        {filteredActions.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-md hover:border-slate-700 transition"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Left Details */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getStatusBadge(item.status)}`}>
                    {item.status.toUpperCase()}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Priority: <strong className={item.priority === 'CRITICAL' ? 'text-red-400' : 'text-amber-400'}>{item.priority}</strong>
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    Deadline: <strong className="text-slate-200">{item.deadline}</strong>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">
                  {item.action}
                </h3>

                <div className="text-xs text-slate-400">
                  Target Risk: <strong className="text-slate-300">{item.riskTitle}</strong>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-1 text-slate-400">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Assignee: <strong className="text-white">{item.responsiblePerson}</strong></span>
                  </div>
                  <div className="text-amber-300">
                    Expected Benefit: <span>{item.expectedImpact}</span>
                  </div>
                </div>

                {item.actualOutcome && (
                  <div className="mt-2 text-xs bg-emerald-950/30 text-emerald-300 p-2.5 rounded-lg border border-emerald-500/30 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>{item.actualOutcome}</span>
                  </div>
                )}
              </div>

              {/* Status Change Buttons */}
              <div className="flex flex-wrap lg:flex-col gap-2 shrink-0 lg:w-40 self-end lg:self-center">
                {item.status !== 'Completed' ? (
                  <button
                    onClick={() => updateActionStatus(item.id, 'Completed')}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 py-2 px-3 rounded-lg shadow-sm transition cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark as Done</span>
                  </button>
                ) : (
                  <button
                    onClick={() => updateActionStatus(item.id, 'Pending')}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-950 border border-slate-800 py-1.5 px-3 rounded-lg transition cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reopen</span>
                  </button>
                )}

                {item.status === 'Pending' && (
                  <button
                    onClick={() => updateActionStatus(item.id, 'In Progress')}
                    className="flex-1 flex items-center justify-center gap-1 text-xs text-slate-300 bg-slate-950 hover:bg-slate-800 border border-slate-800 py-1.5 px-3 rounded-lg transition cursor-pointer"
                  >
                    <Play className="w-3 h-3 text-blue-400" />
                    <span>In Progress</span>
                  </button>
                )}

                {item.status !== 'Dismissed' && item.status !== 'Completed' && (
                  <button
                    onClick={() => updateActionStatus(item.id, 'Dismissed')}
                    className="flex-1 flex items-center justify-center gap-1 text-xs text-slate-500 hover:text-slate-300 py-1 px-3 rounded transition cursor-pointer"
                  >
                    <span>Snooze / Dismiss</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { X, AlertOctagon, TrendingDown, Users, Flame, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { usePulseGuard } from '../context/PulseGuardContext';

export const WhatIfDoNothingModal: React.FC = () => {
  const { activeModal, closeModal, activeModalRisk, updateActionStatus } = usePulseGuard();

  if (activeModal !== 'what-if-do-nothing' || !activeModalRisk) return null;

  const risk = activeModalRisk;
  const noAction = risk.whatIfDoNothing;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border-2 border-red-500/50 rounded-2xl max-w-2xl w-full shadow-2xl p-6 sm:p-7 relative my-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 mb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center animate-pulse">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-red-400 font-bold">Unaddressed Inaction Simulation</div>
              <h3 className="text-xl font-bold text-white tracking-tight">What Happens If You Do Nothing?</h3>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Urgent Warning Intro */}
        <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-4 mb-6 text-xs text-red-200 leading-relaxed">
          <strong className="text-red-300 font-semibold block text-sm mb-1">
            Projection: If No Remediation Is Taken Within 48 Hours
          </strong>
          Calculated based on current consumption velocity ({risk.timeToFailure} runway) and vendor dispatch timelines. These values represent conservative estimated projections.
        </div>

        {/* 4 Impact Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Estimated Lost Revenue</span>
              <TrendingDown className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-2xl font-black text-red-400 font-mono">
              {noAction.estimatedLostSales}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Direct unfulfilled ticket margins</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Impacted Diners</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400 font-mono">
              {noAction.affectedOrders}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Cancelled dine-in & delivery orders</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Risk Escalation Likelihood</span>
              <Flame className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-2xl font-black text-orange-400 font-mono">
              {noAction.probabilityOfEscalation}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Severity: {noAction.escalationSeverity}</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Failure Zero-Point</span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-lg font-bold text-purple-300 font-mono">
              {noAction.escalationTimeline}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Friday Night Peak Service</div>
          </div>
        </div>

        {/* Cascade of Operational Consequences */}
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 mb-6">
          <div className="text-xs font-mono uppercase text-slate-400 font-bold mb-3">
            Simulated Operational Cascade
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {noAction.consequences.map((c, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-400 font-bold shrink-0">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Trigger Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            Mitigation cost: estimated <strong className="text-white">₹1,200</strong> express courier fee.
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={closeModal}
              className="flex-1 sm:flex-initial text-xs font-medium text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              Dismiss
            </button>
            <button
              onClick={() => {
                updateActionStatus('act-1', 'Completed');
                closeModal();
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 rounded-lg shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <span>Execute Prescribed Order (35% Boost)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

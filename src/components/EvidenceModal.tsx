import React from 'react';
import { X, Search, ShieldCheck, Database, FileCheck, CheckCircle2, TrendingUp, Clock, AlertTriangle, MessageSquare } from 'lucide-react';
import { usePulseGuard } from '../context/PulseGuardContext';

export const EvidenceModal: React.FC = () => {
  const { activeModal, closeModal, activeModalRisk } = usePulseGuard();

  if (activeModal !== 'evidence' || !activeModalRisk) return null;

  const risk = activeModalRisk;
  const ev = risk.evidence;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full shadow-2xl p-6 sm:p-7 relative my-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 mb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-slate-400">Verifiable Data Evidence</div>
              <h3 className="text-xl font-bold text-white tracking-tight">{risk.title}</h3>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explainability Callout (Anti-Magic principle) */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 mb-6 text-xs text-amber-200 leading-relaxed flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-amber-300 text-sm mb-1">
              Zero Hallucinations: Recommendations Derived Exclusively from Grounded Business Data
            </div>
            PulseGuard never presents ungrounded forecasts. The alert below is deterministically synthesized from your POS sales records, physical stock audits, delivery receiving dockets, and customer reviews.
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Sales Velocity</span>
              <TrendingUp className="w-3.5 h-3.5 text-red-400" />
            </div>
            <div className="text-xl font-mono font-bold text-red-400">{ev.salesChange}</div>
            <div className="text-[11px] text-slate-400 mt-1">POS Order Logs</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Supplier Delay</span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl font-mono font-bold text-amber-400">{ev.supplierDelay}</div>
            <div className="text-[11px] text-slate-400 mt-1">Receiving Bay Stamps</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Current Buffer</span>
              <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
            </div>
            <div className="text-xl font-mono font-bold text-orange-400">{ev.inventoryChange}</div>
            <div className="text-[11px] text-slate-400 mt-1">ERP Stock Counts</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Complaints</span>
              <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-xl font-mono font-bold text-purple-400">{ev.complaintsChange}</div>
            <div className="text-[11px] text-slate-400 mt-1">Zomato & Google Reviews</div>
          </div>
        </div>

        {/* Detailed Evidence Telemetry Table */}
        <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden mb-6">
          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs font-mono uppercase text-slate-400 font-bold">
            Underlying Telemetry Verification Points
          </div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="px-4 py-2.5">Observed Metric</th>
                <th className="px-4 py-2.5">Current Value</th>
                <th className="px-4 py-2.5">Historical Baseline</th>
                <th className="px-4 py-2.5">Operational Variance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              {ev.dataPoints.map((dp, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40">
                  <td className="px-4 py-3 font-sans font-medium text-white">{dp.metric}</td>
                  <td className="px-4 py-3 font-bold text-amber-300">{dp.value}</td>
                  <td className="px-4 py-3 text-slate-400">{dp.baseline}</td>
                  <td className="px-4 py-3 text-red-400 font-bold">{dp.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Confidence Statement (Section 20 requirement) */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-white">Model Confidence Level:</span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-mono font-bold">
                {risk.confidence.percentage}% ({risk.confidence.level})
              </span>
            </div>
            <div className="text-slate-400 italic">
              "{risk.confidence.reason}"
            </div>
          </div>

          <button
            onClick={closeModal}
            className="text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-lg transition shrink-0 cursor-pointer"
          >
            Acknowledge Evidence
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import {
  X,
  Printer,
  FileText,
  ShieldCheck,
  Building2,
  TrendingDown,
  Truck,
  MessageSquare,
  AlertTriangle,
  CheckSquare,
} from 'lucide-react';
import { usePulseGuard } from '../context/PulseGuardContext';

export const ExecutiveReportModal: React.FC = () => {
  const { activeModal, closeModal, businessName, branch, healthScores, risks, suppliers, actions, complaintThemes } = usePulseGuard();

  if (activeModal !== 'report') return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full shadow-2xl p-6 sm:p-8 relative my-8 text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Modal Controls */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <FileText className="w-4 h-4" />
            <span>PULSEGUARD AI • EXECUTIVE OPERATIONS RISK AUDIT</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-1.5 rounded-lg shadow-sm transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Report</span>
            </button>
            <button
              onClick={closeModal}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="space-y-6">
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="text-xs font-mono uppercase text-slate-400">SME Early-Warning Intelligence Audit</div>
              <h1 className="text-2xl font-black text-white tracking-tight">{businessName}</h1>
              <div className="text-xs text-slate-400 mt-0.5">{branch}</div>
            </div>

            <div className="sm:text-right text-xs text-slate-400">
              <div>Audit Date: <strong className="text-slate-200">{currentDate}</strong></div>
              <div>Telemetry Sample: <strong className="text-slate-200">90 Operational Days</strong></div>
              <div>Audit Engine: <strong className="text-amber-400">PulseGuard AI v3.8</strong></div>
            </div>
          </div>

          {/* Section 1: Business Health Score Composite */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="text-xs font-mono uppercase text-slate-400 font-bold mb-3">
              1. Business Health Composite Evaluation
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-black font-mono text-amber-400">
                  {healthScores.overall} <span className="text-sm text-slate-500 font-normal">/ 100</span>
                </div>
                <div className="text-xs text-slate-300">
                  <div className="font-bold text-white">Operational Posture: Needs Proactive Attention</div>
                  <div className="text-slate-400 text-[11px]">Primary vulnerabilities concentrated in inventory buffer depth and vendor delivery reliability.</div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2 text-center text-xs font-mono">
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-400">Revenue</div>
                  <div className="font-bold text-white">{healthScores.revenue}</div>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-400">Inventory</div>
                  <div className="font-bold text-red-400">{healthScores.inventory}</div>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-400">Customer</div>
                  <div className="font-bold text-white">{healthScores.customer}</div>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-400">Supplier</div>
                  <div className="font-bold text-red-400">{healthScores.supplier}</div>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-400">Ops</div>
                  <div className="font-bold text-white">{healthScores.operations}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Top Operational Risks & Financial Exposures */}
          <div>
            <div className="text-xs font-mono uppercase text-slate-400 font-bold mb-3">
              2. Top Operational Vulnerabilities & Exposure Projections
            </div>
            <div className="space-y-3">
              {risks.slice(0, 3).map((r, i) => (
                <div key={r.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-white text-sm">
                      #{i + 1}. {r.title}
                    </span>
                    <span className="font-mono font-bold text-amber-400">
                      Score: {r.riskScore}/100 • Potential Loss: {r.estimatedImpactDisplay}
                    </span>
                  </div>
                  <p className="text-slate-300 mb-2 leading-relaxed">{r.aiReasoning}</p>
                  <div className="text-slate-400 text-[11px] bg-slate-900 p-2 rounded border border-slate-850">
                    <strong className="text-amber-400">Recommended Mitigation:</strong> {r.recommendedActions[0]?.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Supplier Scorecard */}
          <div>
            <div className="text-xs font-mono uppercase text-slate-400 font-bold mb-3">
              3. Supplier Reliability Scorecard
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {suppliers.map((s) => (
                <div key={s.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">{s.name} ({s.category})</div>
                    <div className="text-[11px] text-slate-400">Avg Lead Lag: {s.averageDelayDays} days</div>
                  </div>
                  <div className="text-right font-mono">
                    <div className={`font-bold ${s.reliability < 70 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {s.reliability}%
                    </div>
                    <div className="text-[10px] text-slate-500">{s.trend}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Human Sign-off block */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
            <div className="text-xs font-mono uppercase text-slate-400 font-bold mb-2">
              4. Human Verification & Manager Sign-Off
            </div>
            <p className="text-slate-400 mb-4 leading-relaxed">
              In accordance with PulseGuard Responsible AI Principles, AI predictions represent probabilistic failure estimates. Irreversible operational commitments require sign-off from the store general manager or head chef.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-3 border-t border-slate-800 text-slate-400 font-mono text-[11px]">
              <div>
                <div>General Manager Signature: ______________________</div>
                <div className="mt-1">Vedith • Heritage Bites Indiranagar</div>
              </div>
              <div className="text-right">
                <div>Audit Status: CONFIRMED & ACTIVE</div>
                <div className="mt-1">Generated: {currentDate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

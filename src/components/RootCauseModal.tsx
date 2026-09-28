import React from 'react';
import { X, GitBranch, ArrowDown, TrendingUp, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { usePulseGuard } from '../context/PulseGuardContext';

export const RootCauseModal: React.FC = () => {
  const { activeModal, closeModal, activeModalRisk } = usePulseGuard();

  if (activeModal !== 'root-cause' || !activeModalRisk) return null;

  const risk = activeModalRisk;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full shadow-2xl p-6 sm:p-7 relative my-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 mb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-slate-400">Visual Root-Cause DAG Analysis</div>
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

        {/* Causal Explanation Intro */}
        <p className="text-sm text-slate-300 mb-6 bg-slate-950 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
          PulseGuard constructs a directional causal graph linking raw operational telemetry. A single indicator alone is often harmless; the critical failure emerges when demand surge, vendor delivery lag, and buffer depletion compound simultaneously.
        </p>

        {/* Visual Root Cause Tree */}
        <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-6 flex flex-col items-center">
          {/* Top Target Risk Node */}
          <div className="bg-gradient-to-r from-red-950/80 to-slate-900 border-2 border-red-500/50 rounded-xl p-4 text-center max-w-md w-full shadow-lg shadow-red-950/40">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-red-400 block mb-1">
              Projected Operational Failure
            </span>
            <div className="text-base font-bold text-white">
              {risk.title}
            </div>
            <div className="text-xs text-red-300 font-mono mt-1">
              Estimated Runway: <strong>{risk.timeToFailure}</strong> • Score: <strong>{risk.riskScore}/100</strong>
            </div>
          </div>

          {/* Connected SVG Connectors / Down Arrows */}
          <div className="w-full flex justify-around my-2">
            <div className="flex flex-col items-center">
              <div className="h-6 w-0.5 bg-slate-700" />
              <ArrowDown className="w-4 h-4 text-slate-500 -mt-1" />
            </div>
            <div className="flex flex-col items-center">
              <div className="h-6 w-0.5 bg-slate-700" />
              <ArrowDown className="w-4 h-4 text-slate-500 -mt-1" />
            </div>
            <div className="flex flex-col items-center">
              <div className="h-6 w-0.5 bg-slate-700" />
              <ArrowDown className="w-4 h-4 text-slate-500 -mt-1" />
            </div>
          </div>

          {/* Tier 2: The Three Independent Operational Drivers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {/* Driver 1: Demand */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Demand Driver
                  </span>
                  <span className="text-xs font-mono font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded">
                    +31%
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5">Weekend Consumption Surge</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Footfall and aggregator orders for chicken biryani & curries jumped from 145 to 190 portions/weekend.
                </p>
              </div>

              {/* Sub-drivers */}
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 text-[11px] text-slate-300">
                <span className="text-slate-400 block font-mono text-[10px] mb-1">Root Factors:</span>
                • Local sports tournament screening<br />
                • High organic repeat diner volume
              </div>
            </div>

            {/* Driver 2: Supplier Delay */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Supply Chain Driver
                  </span>
                  <span className="text-xs font-mono font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded">
                    +18% Lag
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5">FreshPoultry Delivery Delay</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Average delivery lead time drifted from 0.8 days to 2.7 days across the last 3 purchase orders.
                </p>
              </div>

              {/* Sub-drivers */}
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 text-[11px] text-slate-300">
                <span className="text-slate-400 block font-mono text-[10px] mb-1">Root Factors:</span>
                • Regional cold-chain route consolidation<br />
                • Processing plant maintenance delay
              </div>
            </div>

            {/* Driver 3: Inventory Buffer */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-orange-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Inventory Driver
                  </span>
                  <span className="text-xs font-mono font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded">
                    −24%
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5">Safety Stock Below Threshold</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  On-hand poultry stock sits at 132 kg against recommended 175 kg safety threshold.
                </p>
              </div>

              {/* Sub-drivers */}
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 text-[11px] text-slate-300">
                <span className="text-slate-400 block font-mono text-[10px] mb-1">Root Factors:</span>
                • Accelerated burn rate (55 kg/day)<br />
                • Reorder point wasn't adjusted for surge
              </div>
            </div>
          </div>

          {/* Convergence Result Bar */}
          <div className="w-full mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Causal Chain verified via 90-day POS transactional logs and supplier docket stamps.</span>
            </div>
            <button
              onClick={closeModal}
              className="text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
            >
              Close Causal Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

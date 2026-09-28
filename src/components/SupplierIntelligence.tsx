import React from 'react';
import {
  Truck,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Clock,
  Phone,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { usePulseGuard } from '../context/PulseGuardContext';

export const SupplierIntelligence: React.FC = () => {
  const { suppliers, openModal } = usePulseGuard();

  const getTrendBadge = (trend: string) => {
    switch (trend) {
      case 'Declining':
        return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'Watchlist':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      default:
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Truck className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Supplier Lead-Time & Reliability Intelligence
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              Tracks vendor fulfillment consistency, receiving dock delivery variance, and identifies emerging supply disruptions before they cause out-of-stock events.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <span className="text-slate-400">Composite Supplier Score:</span>
            <strong className="text-amber-400 font-mono text-base">43/100</strong>
            <span className="text-[10px] text-red-400 font-bold bg-red-500/10 px-1.5 py-0.5 rounded">At Risk</span>
          </div>
        </div>
      </div>

      {/* Supplier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {suppliers.map((sup) => (
          <div
            key={sup.id}
            className={`rounded-2xl border p-6 transition shadow-md ${
              sup.trend === 'Declining'
                ? 'bg-slate-900 border-red-500/40 shadow-red-950/20'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            {/* Top Row */}
            <div className="flex items-start justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
              <div>
                <div className="text-[11px] text-slate-400 font-mono uppercase">{sup.category}</div>
                <h3 className="text-lg font-bold text-white">{sup.name}</h3>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getTrendBadge(sup.trend)}`}>
                Trend: {sup.trend}
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <div className="text-[11px] text-slate-400 mb-0.5">Reliability</div>
                <div className={`text-xl font-bold font-mono ${sup.reliability < 70 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {sup.reliability}%
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <div className="text-[11px] text-slate-400 mb-0.5">Avg Delay</div>
                <div className="text-xl font-bold font-mono text-amber-400">
                  {sup.averageDelayDays}d
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                <div className="text-[11px] text-slate-400 mb-0.5">Evaluated</div>
                <div className="text-xl font-bold font-mono text-white">
                  {sup.deliveriesEvaluated} POs
                </div>
              </div>
            </div>

            {/* Recent Deliveries Trace */}
            <div className="mb-5">
              <div className="text-xs text-slate-400 font-medium mb-2">Recent Receiving Logs:</div>
              <div className="flex flex-wrap gap-2">
                {sup.lastDeliveries.map((del, dIdx) => (
                  <div
                    key={dIdx}
                    className="text-xs font-mono bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 flex items-center gap-1.5"
                  >
                    <span className="text-slate-400">{del.date}:</span>
                    <span className={del.status === 'CRITICAL' ? 'text-red-400 font-bold' : del.status === 'LATE' ? 'text-amber-400' : 'text-emerald-400'}>
                      +{del.delayDays}d
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendation Banner */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/90 text-xs mb-4">
              <div className="text-amber-400 font-bold mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                AI Recommendation:
              </div>
              <div className="text-slate-300 leading-relaxed">{sup.recommendation}</div>
            </div>

            {/* Footer Contact */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-850">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-slate-400" />
                <span>{sup.contact}</span>
              </span>
              <span className="text-slate-500 font-mono text-[10px]">Verified Vendor</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

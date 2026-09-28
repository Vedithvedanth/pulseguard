import React from 'react';
import {
  Activity,
  DollarSign,
  Boxes,
  Users,
  Truck,
  Cog,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { usePulseGuard } from '../context/PulseGuardContext';

export const BusinessHealthCard: React.FC = () => {
  const { healthScores, businessName } = usePulseGuard();

  const getStatus = (score: number) => {
    if (score < 50) return { label: 'CRITICAL', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30', bar: 'bg-red-500' };
    if (score < 65) return { label: 'HIGH RISK', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30', bar: 'bg-orange-500' };
    if (score < 75) return { label: 'MODERATE', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30', bar: 'bg-amber-500' };
    return { label: 'HEALTHY', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30', bar: 'bg-emerald-500' };
  };

  const overallStatus = getStatus(healthScores.overall);

  const pillars = [
    { label: 'Revenue Stability', score: healthScores.revenue, icon: DollarSign, description: 'Weekend surges offsetting weekday dips' },
    { label: 'Inventory Health', score: healthScores.inventory, icon: Boxes, description: 'Poultry buffer 24% under safety reorder' },
    { label: 'Customer Sentiment', score: healthScores.customer, icon: Users, description: '4.4★ avg; stockout complaints rising' },
    { label: 'Supplier Reliability', score: healthScores.supplier, icon: Truck, description: 'FreshPoultry lag dragging composite index' },
    { label: 'Operational Stability', score: healthScores.operations, icon: Cog, description: 'Kitchen prep and delivery packing steady' },
  ];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        {/* Left: Overall Health Score Gauge */}
        <div className="flex items-center gap-5">
          <div className="relative flex items-center justify-center">
            {/* Circular Progress Ring */}
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="7"
                className="text-slate-800"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="7"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * healthScores.overall) / 100}
                className={healthScores.overall < 70 ? 'text-amber-400' : 'text-emerald-400'}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-black text-white font-mono leading-none">
                {healthScores.overall}
              </span>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5">/ 100</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Composite Business Health
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${overallStatus.bg} ${overallStatus.color}`}>
                {overallStatus.label}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {businessName} Operations Pulse
            </h3>
            <p className="text-xs text-slate-400 max-w-md mt-0.5">
              Weighted composite across 5 operational dimensions. Re-evaluated every 15 minutes against POS and inventory telemetry.
            </p>
          </div>
        </div>

        {/* Quick status summary chip */}
        <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
          <Activity className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="text-xs">
            <div className="text-slate-300 font-medium">Stress Point: <strong className="text-red-400 font-bold">Supplier (43) & Inventory (51)</strong></div>
            <div className="text-slate-400 text-[11px]">Executing recommended poultry orders will elevate overall score to 78.</div>
          </div>
        </div>
      </div>

      {/* 5 Domain Breakdown Meters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-6">
        {pillars.map((pil, idx) => {
          const st = getStatus(pil.score);
          const Icon = pil.icon;
          return (
            <div
              key={idx}
              className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/90 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                    <span>{pil.label}</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${st.bg} ${st.color}`}>
                    {st.label}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-2xl font-black text-white font-mono">{pil.score}</span>
                  <span className="text-[10px] text-slate-400">Target: 80+</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${st.bar}`}
                    style={{ width: `${pil.score}%` }}
                  />
                </div>
              </div>

              <div className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                {pil.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  Coins,
  ShieldCheck,
  Search,
  Sparkles,
  GitBranch,
  Layers,
  HelpCircle,
  CheckCircle,
} from 'lucide-react';
import { usePulseGuard } from '../context/PulseGuardContext';

export const HeroAlertDiscovery: React.FC = () => {
  const { risks, openModal, updateActionStatus, actions } = usePulseGuard();
  const heroRisk = risks.find((r) => r.isHero) || risks[0];

  const primaryAction = actions.find((a) => a.id === 'act-1') || actions[0];
  const isPrimaryActionDone = primaryAction.status === 'Completed';

  // Animation step simulation for visual discovery on load
  const [discoveryStep, setDiscoveryStep] = useState<number>(3); // 1 = scanning, 2 = correlating, 3 = revealed

  useEffect(() => {
    // Fast progressive unveil
    setDiscoveryStep(1);
    const t1 = setTimeout(() => setDiscoveryStep(2), 350);
    const t2 = setTimeout(() => setDiscoveryStep(3), 750);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative rounded-2xl border-2 border-red-500/40 bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/30 p-6 sm:p-7 shadow-2xl shadow-red-950/30 overflow-hidden">
      {/* Background ambient pulse */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Discovery Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <span className="flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500"></span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
              PRIORITY RISK ALERT #01
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Discovered: {heroRisk.discoveredAt}
            </span>
          </div>
        </div>

        {/* Confidence & Score Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Confidence: <strong className="text-white">{heroRisk.confidence.percentage}%</strong> ({heroRisk.confidence.level})</span>
          </div>

          <div className="flex items-center gap-1 text-xs font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/40 px-3 py-1 rounded-md">
            <span>RISK SCORE:</span>
            <span className="text-sm font-extrabold text-white">{heroRisk.riskScore}</span>
            <span className="text-slate-400 text-[10px]">/ 100</span>
          </div>
        </div>
      </div>

      {/* Alert Title & Time to failure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8">
          <div className="flex flex-wrap items-baseline gap-3 mb-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {heroRisk.title}
            </h2>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed mb-5 font-normal">
            <strong className="text-amber-300">AI Reasoning:</strong> "{heroRisk.aiReasoning}"
          </p>

          {/* 4 Multi-Signal Convergence Badges (Explainable Data Evidence) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
                <span>Weekend Demand</span>
                <TrendingUp className="w-3 h-3 text-red-400" />
              </div>
              <div className="text-lg font-bold text-red-400 font-mono">+31%</div>
              <div className="text-[10px] text-slate-400">4-week surge</div>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
                <span>Supplier Delay</span>
                <Clock className="w-3 h-3 text-amber-400" />
              </div>
              <div className="text-lg font-bold text-amber-400 font-mono">+18%</div>
              <div className="text-[10px] text-slate-400">FreshPoultry (2.7d lag)</div>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
                <span>Current Stock</span>
                <AlertTriangle className="w-3 h-3 text-orange-400" />
              </div>
              <div className="text-lg font-bold text-orange-400 font-mono">−24%</div>
              <div className="text-[10px] text-slate-400">Below safety reorder</div>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 mb-1 flex items-center justify-between">
                <span>Complaints Spike</span>
                <HelpCircle className="w-3 h-3 text-purple-400" />
              </div>
              <div className="text-lg font-bold text-purple-400 font-mono">+17%</div>
              <div className="text-[10px] text-slate-400">"Dish unavailable"</div>
            </div>
          </div>

          {/* Action Recommendation Banner */}
          <div className="bg-slate-950/90 rounded-xl border border-amber-500/40 p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-mono uppercase text-amber-400 font-bold mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Prescribed Immediate Action:
                </div>
                <div className="text-sm font-semibold text-white">
                  Increase next poultry order by 35% and contact FreshPoultry Farms today.
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Expected benefit: Restores inventory buffer back to 210 kg, avoiding Friday night stockout.
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => updateActionStatus('act-1', isPrimaryActionDone ? 'Pending' : 'Completed')}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg transition cursor-pointer ${
                    isPrimaryActionDone
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{isPrimaryActionDone ? 'Action Completed' : 'Execute Order Action'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Impact & Quick Modals Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {/* Financial Exposure Card */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
              Estimated Financial Exposure
            </span>
            <div className="text-2xl font-black text-amber-400 font-mono">
              {heroRisk.estimatedImpactDisplay}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Across <strong className="text-slate-200">{heroRisk.affectedOrdersEstimate}</strong> during peak weekend shifts.
            </div>
            <div className="mt-2 pt-2 border-t border-slate-900 text-[11px] text-slate-400 italic">
              *Calculated: 73+ orders × ₹260 average menu ticket margin.
            </div>
          </div>

          {/* Quick Deep Dive Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
            <button
              onClick={() => openModal('evidence', heroRisk)}
              className="flex items-center justify-between text-xs font-medium text-slate-200 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 p-2.5 rounded-lg transition cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>View Verifiable Evidence</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => openModal('root-cause', heroRisk)}
              className="flex items-center justify-between text-xs font-medium text-slate-200 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 p-2.5 rounded-lg transition cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <GitBranch className="w-3.5 h-3.5 text-blue-400" />
                <span>Visual Root Cause Tree</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => openModal('what-if-do-nothing', heroRisk)}
              className="flex items-center justify-between text-xs font-medium text-red-200 bg-red-950/30 hover:bg-red-900/40 border border-red-500/30 p-2.5 rounded-lg transition cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span>What If I Do Nothing?</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-red-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

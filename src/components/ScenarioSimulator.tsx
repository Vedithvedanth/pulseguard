import React from 'react';
import {
  Sliders,
  TrendingUp,
  Clock,
  Boxes,
  RotateCcw,
  AlertTriangle,
  ShieldAlert,
  Flame,
  CheckCircle2,
  DollarSign,
} from 'lucide-react';
import { usePulseGuard } from '../context/PulseGuardContext';

export const ScenarioSimulator: React.FC = () => {
  const { scenarioParams, setScenarioParam, resetScenarioParams, scenarioResult } = usePulseGuard();

  const getRiskColor = (prob: number) => {
    if (prob >= 80) return 'text-red-400 bg-red-500/10 border-red-500/30';
    if (prob >= 60) return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
    if (prob >= 40) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sliders className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                "What-If?" Scenario Stress-Test Sandbox
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              Modify demand surges, vendor delivery friction, and inventory buffers to simulate how operational risks evolve in real time.
            </p>
          </div>

          <button
            onClick={resetScenarioParams}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 px-3 py-1.5 rounded-lg transition self-start sm:self-auto cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Variables</span>
          </button>
        </div>
      </div>

      {/* Simulator Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sliders */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-6">
          <div className="text-xs font-mono uppercase text-slate-400 border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>Operational Levers</span>
            <span className="text-[11px] text-amber-400">Target: Heritage Bites Poultry Chain</span>
          </div>

          {/* Lever 1: Demand Change */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red-400" />
                <span>Demand Surge</span>
              </label>
              <span className="font-mono text-sm font-bold text-red-400 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                +{scenarioParams.demandChange}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="10"
              value={scenarioParams.demandChange}
              onChange={(e) => setScenarioParam('demandChange', Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Current (0%)</span>
              <span>+10%</span>
              <span>+20% (Weekend Rush)</span>
              <span>+30%</span>
              <span>+50% (Festival Spike)</span>
            </div>
          </div>

          {/* Lever 2: Supplier Delay */}
          <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Supplier Delivery Delay (FreshPoultry Farms)</span>
              </label>
              <span className="font-mono text-sm font-bold text-amber-400 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                +{scenarioParams.supplierDelayDays} {scenarioParams.supplierDelayDays === 1 ? 'day' : 'days'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="4"
              step="1"
              value={scenarioParams.supplierDelayDays}
              onChange={(e) => setScenarioParam('supplierDelayDays', Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>On Time (0d)</span>
              <span>+1 Day</span>
              <span>+2 Days</span>
              <span>+3 Days</span>
              <span>+4 Days (Full Bottleneck)</span>
            </div>
          </div>

          {/* Lever 3: Current Stock / Safety Buffer */}
          <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-white flex items-center gap-2">
                <Boxes className="w-4 h-4 text-blue-400" />
                <span>Inventory Safety Buffer Reinforcement</span>
              </label>
              <span className="font-mono text-sm font-bold text-blue-400 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                {scenarioParams.inventoryBufferChange >= 0 ? `+${scenarioParams.inventoryBufferChange}%` : `${scenarioParams.inventoryBufferChange}%`}
              </span>
            </div>
            <input
              type="range"
              min="-20"
              max="40"
              step="10"
              value={scenarioParams.inventoryBufferChange}
              onChange={(e) => setScenarioParam('inventoryBufferChange', Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>-20% (Depleted)</span>
              <span>0% (Current 132kg)</span>
              <span>+10%</span>
              <span>+20%</span>
              <span>+40% (Reordered Safe Buffer)</span>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="pt-4 border-t border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-2 font-mono uppercase">Quick Test Scenarios:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setScenarioParam('demandChange', 0);
                  setScenarioParam('supplierDelayDays', 2);
                  setScenarioParam('inventoryBufferChange', 0);
                }}
                className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                Supplier Delay +2 Days
              </button>
              <button
                onClick={() => {
                  setScenarioParam('demandChange', 20);
                  setScenarioParam('supplierDelayDays', 0);
                  setScenarioParam('inventoryBufferChange', 0);
                }}
                className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                Demand +20% (Weekend Rush)
              </button>
              <button
                onClick={() => {
                  setScenarioParam('demandChange', 30);
                  setScenarioParam('supplierDelayDays', 2);
                  setScenarioParam('inventoryBufferChange', -10);
                }}
                className="text-xs bg-red-950/30 hover:bg-red-900/40 text-red-300 border border-red-500/30 px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                Worst-Case Convergence (+30% Demand, +2d Delay)
              </button>
              <button
                onClick={() => {
                  setScenarioParam('demandChange', 0);
                  setScenarioParam('supplierDelayDays', 0);
                  setScenarioParam('inventoryBufferChange', 35);
                }}
                className="text-xs bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                Recommended Order (+35% Stock Buffer)
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Simulated Outcome */}
        <div className="lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-slate-400 border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Simulated Operational Outcome</span>
              <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-mono">
                Monte-Carlo Approximation
              </span>
            </div>

            {/* Probability Big Gauge */}
            <div className="my-6 text-center">
              <span className="text-xs text-slate-400 block mb-1">
                Projected Stockout Probability
              </span>
              <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white mb-2">
                <span className={scenarioResult.simulatedProbability >= 70 ? 'text-red-400' : scenarioResult.simulatedProbability >= 50 ? 'text-amber-400' : 'text-emerald-400'}>
                  {scenarioResult.simulatedProbability}%
                </span>
              </div>
              <div className="inline-block text-xs font-semibold px-3 py-1 rounded-full border border-slate-800 bg-slate-950 text-slate-300">
                {scenarioResult.statusChange}
              </div>
            </div>

            {/* Key Output Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 mb-1">Time to Exhaustion</div>
                <div className="text-xl font-bold font-mono text-white">
                  {scenarioResult.simulatedTimeToExhaustion}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Based on active burn rate</div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 mb-1">Simulated Risk Score</div>
                <div className="text-xl font-bold font-mono text-amber-400">
                  {scenarioResult.simulatedRiskScore} <span className="text-xs text-slate-400">/ 100</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Severity weight</div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 col-span-2">
                <div className="text-[11px] text-slate-400 mb-1">Simulated Revenue at Risk</div>
                <div className="text-2xl font-bold font-mono text-red-400">
                  ₹{scenarioResult.simulatedRevenueAtRisk.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Missed diner ticket sales if stockout occurs prior to next delivery dock receipt.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Simulation Notice:</strong> Values are algorithmic stress-test projections based on Heritage Bites historical consumption velocities. Use this sandbox to evaluate replenishment order margins before placing supplier orders.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

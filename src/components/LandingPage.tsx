import React from 'react';
import {
  ShieldAlert,
  ArrowRight,
  Sparkles,
  TrendingDown,
  AlertTriangle,
  Clock,
  Coins,
  CheckCircle2,
  ChevronRight,
  Database,
  Search,
  Brain,
  Wrench,
  UtensilsCrossed,
  Store,
  Factory,
  Truck,
  ShoppingBag,
  Stethoscope,
} from 'lucide-react';
import { usePulseGuard } from '../context/PulseGuardContext';

export const LandingPage: React.FC = () => {
  const { loadDemoBusiness, openModal } = usePulseGuard();

  const industries = [
    { name: 'Restaurant & Food', icon: UtensilsCrossed, active: true, tag: 'Full Demo Live' },
    { name: 'Retail Stores', icon: Store, active: false, tag: 'Coming Soon' },
    { name: 'Manufacturing', icon: Factory, active: false, tag: 'Coming Soon' },
    { name: 'Logistics & 3PL', icon: Truck, active: false, tag: 'Coming Soon' },
    { name: 'E-commerce', icon: ShoppingBag, active: false, tag: 'Coming Soon' },
    { name: 'Clinics & Health', icon: Stethoscope, active: false, tag: 'Coming Soon' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Top Banner Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <ShieldAlert className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                PulseGuard <span className="text-amber-400 font-mono text-sm px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">AI</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openModal('import-csv')}
              className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition"
            >
              Analyze My CSV
            </button>
            <button
              onClick={loadDemoBusiness}
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-4 py-2 rounded-lg shadow-md hover:shadow-amber-500/25 transition cursor-pointer"
            >
              <span>Try Demo Business</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-medium mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>AI Operations Early-Warning Intelligence for SMEs</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Know what’s going wrong <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-red-400">
              before it becomes expensive.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            PulseGuard AI analyzes your fragmented sales, inventory, supplier delays, and customer reviews to predict operational failures, reveal root causes, and prescribe proactive business actions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-14">
            <button
              onClick={loadDemoBusiness}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 text-base font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-7 py-3.5 rounded-xl shadow-xl shadow-amber-500/25 transition cursor-pointer"
            >
              <span>Try Demo Business (Heritage Bites)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => openModal('import-csv')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-base font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-6 py-3.5 rounded-xl transition cursor-pointer"
            >
              <Database className="w-4 h-4 text-amber-400" />
              <span>Analyze My Business</span>
            </button>
          </div>

          {/* Interactive Contrast Card (The Core Difference) */}
          <div className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl p-6 sm:p-8 text-left">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">The Core Shift in Operations Intelligence</span>
              <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-medium">Explainable & Root-Cause Driven</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-500" />
                  Traditional BI Dashboard (Tells you what happened)
                </div>
                <div className="text-slate-300 font-mono text-sm bg-slate-900 p-3 rounded border border-slate-800 mb-3">
                  "Raw chicken inventory decreased 28% week-over-week."
                </div>
                <p className="text-xs text-slate-400">
                  Leaves the manager guessing: Why did it drop? Is it an issue? Will we run out? What action should be taken today?
                </p>
              </div>

              <div className="bg-amber-950/20 p-5 rounded-xl border border-amber-500/30 relative">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  PulseGuard AI (Early Warning & Causal Prescription)
                </div>
                <div className="text-amber-200 font-mono text-sm bg-slate-900/90 p-3 rounded border border-amber-500/40 mb-3">
                  "Chicken inventory is likely to run out in <span className="text-red-400 font-bold underline">2.4 days</span> because weekend demand increased <span className="text-amber-300 font-bold">+31%</span> while supplier delivery time increased <span className="text-orange-400 font-bold">+18%</span>. Estimated lost revenue: <span className="text-amber-300 font-bold">₹18,400–₹25,000</span>."
                </div>
                <div className="flex items-center justify-between text-xs text-amber-300/80 pt-1">
                  <span>Prescribed Action: Boost PO by 35% & activate backup vendor.</span>
                  <span className="font-semibold text-amber-400">Confidence: 87%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 bg-slate-900/50 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">The Operational Blindspot</h2>
            <h3 className="text-3xl font-bold text-white tracking-tight">Small businesses discover problems when it is already too late.</h3>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              Disparate spreadsheets, POS tablets, supplier chats, and delivery apps hide critical failure signals in plain sight.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: TrendingDown,
                title: 'Sales Decline After the Fact',
                desc: 'You only notice the dip during month-end reconciliation when margin has already evaporated.',
              },
              {
                icon: AlertTriangle,
                title: 'Emergency Stockouts',
                desc: 'Kitchen runs out of chicken or takeaway boxes mid-rush on Friday evening, forcing cancelled orders.',
              },
              {
                icon: Clock,
                title: 'Creeping Supplier Delays',
                desc: 'A primary vendor slips from 0.8 days to 2.7 days delivery time, quietly draining your buffer.',
              },
              {
                icon: ShieldAlert,
                title: 'Negative Review Surges',
                desc: 'Frustrated customers complain online about unavailable dishes before the owner even knows.',
              },
              {
                icon: Coins,
                title: 'Hidden Wastage & Spoilage',
                desc: 'Refrigeration temperature breaches go unnoticed until seafood spoilages rack up thousands in loss.',
              },
              {
                icon: Brain,
                title: 'Dashboards with No Advice',
                desc: 'Existing charts display 50 historical line graphs, but never tell the owner what to do today.',
              },
            ].map((prob, i) => (
              <div key={i} className="bg-slate-950 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition">
                <div className="w-9 h-9 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center mb-3">
                  <prob.icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-white text-base mb-1.5">{prob.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{prob.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Flow */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">The Closed-Loop Engine</h2>
            <h3 className="text-3xl font-bold text-white tracking-tight">From Raw Data to Averted Loss in 5 Steps</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              { step: '01', title: 'DATA', icon: Database, desc: 'Connects sales POS, inventory counts, delivery slips, supplier delays & reviews.' },
              { step: '02', title: 'DETECT', icon: Search, desc: 'Statistical anomaly engine flags z-score outliers, lead-time drifts & burn acceleration.' },
              { step: '03', title: 'PREDICT', icon: AlertTriangle, desc: 'Probabilistic failure models calculate time-to-exhaustion & financial loss at risk.' },
              { step: '04', title: 'EXPLAIN', icon: Brain, desc: 'Generates transparent visual root-cause trees connecting verified data points.' },
              { step: '05', title: 'ACT', icon: Wrench, desc: 'Prescribes sequenced mitigations with assignees, deadlines, and real-time tracking.' },
            ].map((st, idx) => (
              <div key={idx} className="relative bg-slate-900/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-amber-400">{st.step}</span>
                    <st.icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <h4 className="font-bold text-white text-lg tracking-tight mb-2">{st.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
                </div>
                {idx < 4 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-amber-400/50">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Industry Selector */}
      <section className="py-16 bg-slate-900/40 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">Architected for Scalability</h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Built for Diverse SME Operating Models</h3>
            <p className="mt-2 text-slate-400 text-xs sm:text-sm">
              Our demo focuses on restaurant operations (Heritage Bites), with pluggable ontology models for other sectors.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {industries.map((ind, i) => (
              <div
                key={i}
                onClick={ind.active ? loadDemoBusiness : undefined}
                className={`p-4 rounded-xl border transition flex flex-col items-center text-center ${
                  ind.active
                    ? 'bg-amber-950/20 border-amber-500/50 cursor-pointer shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950/50 border-slate-800 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2.5 ${ind.active ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
                  <ind.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-white mb-1.5">{ind.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${ind.active ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
                  {ind.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Experience the 3-Minute Hackathon Demo
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Load Heritage Bites with 90 days of sales, inventory, and supply chain telemetry to see PulseGuard discover the hidden chicken stockout in real-time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={loadDemoBusiness}
              className="flex items-center gap-2 text-base font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-3.5 rounded-xl shadow-xl shadow-amber-500/25 transition cursor-pointer"
            >
              <span>Launch Live Demo Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero external setup required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Full 90-day multi-signal dataset included</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Explainable AI with verifiable evidence</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-slate-300">PulseGuard AI</span>
            <span>—</span>
            <span>Know what’s going wrong before it becomes expensive.</span>
          </div>
          <div>Built for Small and Medium Businesses • Hackathon Edition</div>
        </div>
      </footer>
    </div>
  );
};

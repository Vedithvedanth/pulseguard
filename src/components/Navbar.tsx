import React, { useState } from 'react';
import {
  ShieldAlert,
  RotateCcw,
  Sparkles,
  FileSpreadsheet,
  FileText,
  Sliders,
  Bell,
  Truck,
  MessageSquare,
  CheckSquare,
  Bot,
  LayoutDashboard,
  ChevronDown,
  Building2,
  Check,
} from 'lucide-react';
import { usePulseGuard } from '../context/PulseGuardContext';
import { IndustryType } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    businessName,
    businessType,
    setBusinessType,
    branch,
    resetDemo,
    openModal,
    setChatOpen,
    chatOpen,
    risks,
  } = usePulseGuard();

  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);

  const industries: { name: IndustryType; status: 'active' | 'coming-soon' }[] = [
    { name: 'Restaurant', status: 'active' },
    { name: 'Retail', status: 'coming-soon' },
    { name: 'Manufacturing', status: 'coming-soon' },
    { name: 'Logistics', status: 'coming-soon' },
    { name: 'E-commerce', status: 'coming-soon' },
    { name: 'Healthcare', status: 'coming-soon' },
  ];

  const activeCriticalAlerts = risks.filter((r) => r.status === 'ACTIVE' && (r.severity === 'CRITICAL' || r.severity === 'HIGH')).length;

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-30 shadow-md">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition">
              <ShieldAlert className="w-4 h-4 text-slate-950 font-bold" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5 leading-none">
                PulseGuard <span className="text-amber-400 font-mono text-xs px-1 py-0.2 rounded bg-amber-400/10 border border-amber-400/20">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 hidden sm:inline-block leading-tight mt-0.5">
                Know what's going wrong before it becomes expensive
              </span>
            </div>
          </div>

          {/* Industry & Location Selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setIndustryDropdownOpen(!industryDropdownOpen)}
              className="flex items-center gap-1.5 text-xs bg-slate-950 border border-slate-800 hover:border-slate-700 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white transition cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-white">{businessName}</span>
              <span className="text-slate-400">({businessType})</span>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>

            {industryDropdownOpen && (
              <div className="absolute left-0 mt-1 w-64 rounded-xl bg-slate-950 border border-slate-800 shadow-2xl py-2 z-50">
                <div className="px-3 py-1 text-[11px] font-mono uppercase text-slate-400 border-b border-slate-800 mb-1">
                  Active Demo Profile
                </div>
                <div className="px-3 py-2 text-xs text-slate-200">
                  <div className="font-bold text-white">{businessName}</div>
                  <div className="text-[11px] text-slate-400">{branch}</div>
                </div>

                <div className="px-3 py-1 text-[11px] font-mono uppercase text-slate-400 border-t border-slate-800 mt-1 mb-1">
                  Industry Mode
                </div>
                {industries.map((ind) => (
                  <div
                    key={ind.name}
                    onClick={() => {
                      if (ind.status === 'active') {
                        setBusinessType(ind.name);
                        setIndustryDropdownOpen(false);
                      }
                    }}
                    className={`px-3 py-1.5 text-xs flex items-center justify-between transition ${
                      ind.status === 'active'
                        ? 'text-white hover:bg-slate-900 cursor-pointer font-medium'
                        : 'text-slate-500 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {ind.name === businessType ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <div className="w-3.5" />}
                      <span>{ind.name}</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${ind.status === 'active' ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-900 text-slate-500'}`}>
                      {ind.status === 'active' ? 'Live Demo' : 'Coming Soon'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          {/* Reset Demo button */}
          <button
            onClick={resetDemo}
            title="Reset Heritage Bites 90-day demo dataset"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 px-2.5 py-1.5 rounded-lg transition cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 text-slate-400" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>

          {/* Import CSV */}
          <button
            onClick={() => openModal('import-csv')}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 px-2.5 py-1.5 rounded-lg transition cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Import CSV</span>
          </button>

          {/* Report Button */}
          <button
            onClick={() => openModal('report')}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 px-2.5 py-1.5 rounded-lg transition cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Risk Report</span>
          </button>

          {/* Ask PulseGuard Copilot Button */}
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border transition shadow-sm cursor-pointer ${
              chatOpen
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span>Ask PulseGuard</span>
          </button>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="border-t border-slate-800/80 bg-slate-950/60 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 h-10 text-xs">
          {[
            { id: 'dashboard', label: 'Operations Dashboard', icon: LayoutDashboard },
            { id: 'what-if', label: 'What-If? Simulator', icon: Sliders },
            { id: 'alerts', label: 'Alert Center', icon: Bell, badge: activeCriticalAlerts },
            { id: 'actions', label: 'Action Tracker', icon: CheckSquare },
            { id: 'suppliers', label: 'Supplier Intelligence', icon: Truck },
            { id: 'sentiment', label: 'Customer Sentiment', icon: MessageSquare },
            { id: 'agents', label: '6-Agent Architecture', icon: Bot },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = currentView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-amber-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {typeof tab.badge === 'number' && tab.badge > 0 && (
                  <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

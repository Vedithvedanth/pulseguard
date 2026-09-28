import React from 'react';
import {
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  Star,
  Users,
  Search,
  Sparkles,
} from 'lucide-react';
import { usePulseGuard } from '../context/PulseGuardContext';

export const CustomerSentiment: React.FC = () => {
  const { complaintThemes } = usePulseGuard();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Customer Sentiment & Complaint Theme Intelligence
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              NLP semantic clustering analyzes reviews from Google Maps, Swiggy, and Zomato to extract early operational failure themes before rating degradation sets in.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <span className="text-slate-400">Average Diner Rating:</span>
            <strong className="text-amber-400 font-mono text-base flex items-center gap-1">
              <span>4.4</span>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </strong>
            <span className="text-xs text-slate-500 font-mono">(90-Day Avg)</span>
          </div>
        </div>
      </div>

      {/* Themes Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {complaintThemes.map((theme, tIdx) => (
          <div
            key={tIdx}
            className={`rounded-2xl border p-6 transition shadow-md ${
              theme.theme.includes('Chicken') || theme.theme.includes('Unavailable')
                ? 'bg-slate-900 border-red-500/40 shadow-red-950/20'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400">Semantic Theme #{tIdx + 1}</span>
                <h3 className="text-base font-bold text-white">{theme.theme}</h3>
              </div>
              <div className="text-right">
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                  theme.percentageChange.startsWith('+') && !theme.percentageChange.includes('2%')
                    ? 'text-red-400 bg-red-500/10 border-red-500/30'
                    : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                }`}>
                  {theme.percentageChange}
                </span>
                <div className="text-[11px] text-slate-400 mt-0.5">{theme.count} mentions</div>
              </div>
            </div>

            {/* 4-Week Trajectory Bar Visualization */}
            <div className="mb-5">
              <div className="text-xs text-slate-400 mb-2 font-mono flex items-center justify-between">
                <span>4-Week Occurrence Trend:</span>
                <span className="text-slate-300 font-mono">{theme.weeklyTrend.join(' → ')} instances</span>
              </div>
              <div className="grid grid-cols-4 gap-2 h-14 items-end bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                {theme.weeklyTrend.map((count, wIdx) => {
                  const maxCount = Math.max(...theme.weeklyTrend, 1);
                  const heightPercent = Math.max(15, (count / maxCount) * 100);
                  const isLast = wIdx === theme.weeklyTrend.length - 1;
                  return (
                    <div key={wIdx} className="flex flex-col items-center justify-end h-full">
                      <div
                        className={`w-full rounded-md transition-all ${
                          isLast && count > 5 ? 'bg-red-500' : 'bg-amber-500/60'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                      <span className="text-[9px] font-mono text-slate-400 mt-1">W{wIdx + 1} ({count})</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Insight */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs mb-4">
              <div className="text-amber-400 font-bold mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pattern Discovery:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{theme.aiInsight}</p>
            </div>

            {/* Sample Reviews */}
            <div>
              <div className="text-xs font-semibold text-slate-400 mb-2">Verified Customer Mentions:</div>
              <div className="space-y-2">
                {theme.sampleReviews.map((rev, rIdx) => (
                  <div
                    key={rIdx}
                    className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 text-xs"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span className="font-medium text-slate-300">{rev.channel}</span>
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-200 italic">"{rev.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

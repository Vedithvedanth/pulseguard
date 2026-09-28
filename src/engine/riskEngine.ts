import { HealthScoreBreakdown, RiskSeverity } from '../types';

export interface AnomalyReport {
  anomalyType: 'INVENTORY' | 'SALES' | 'SUPPLIER' | 'CUSTOMER' | 'OPERATIONS';
  title: string;
  metric: string;
  observedValue: number;
  expectedBaseline: number;
  deviationPercent: number;
  zScore: number;
  severity: RiskSeverity;
}

export function calculateRiskScore(
  probabilityPercent: number, // 0 - 100
  impactRupees: number, // e.g. 20000
  urgencyWeight: number // 1 to 1.5
): { score: number; severity: RiskSeverity } {
  // Normalize impact against typical SME daily gross exposure threshold (~₹30,000 max scale)
  const normalizedImpact = Math.min(100, (impactRupees / 25000) * 100);
  const rawScore = (probabilityPercent * 0.45) + (normalizedImpact * 0.40) + (urgencyWeight * 15);
  const score = Math.min(100, Math.max(0, Math.round(rawScore)));

  let severity: RiskSeverity = 'LOW';
  if (score >= 75) severity = 'CRITICAL';
  else if (score >= 50) severity = 'HIGH';
  else if (score >= 25) severity = 'MODERATE';

  return { score, severity };
}

export function calculateDaysOfSupply(
  currentStockUnits: number,
  dailyBurnRate: number
): { daysRemaining: number; isStockoutImminent: boolean } {
  if (dailyBurnRate <= 0) return { daysRemaining: 999, isStockoutImminent: false };
  const days = Math.round((currentStockUnits / dailyBurnRate) * 10) / 10;
  return {
    daysRemaining: days,
    isStockoutImminent: days < 3.0,
  };
}

export function recomputeHealthScores(
  base: HealthScoreBreakdown,
  completedActionsCount: number,
  activeCriticalRisksCount: number
): HealthScoreBreakdown {
  // Positive delta as actions are executed
  const actionBonus = completedActionsCount * 6;
  const riskPenalty = activeCriticalRisksCount * 5;

  const inventory = Math.min(95, Math.max(30, base.inventory + actionBonus - riskPenalty));
  const supplier = Math.min(95, Math.max(30, base.supplier + Math.round(actionBonus * 0.8)));
  const operations = Math.min(95, Math.max(40, base.operations + Math.round(actionBonus * 0.5)));
  const revenue = Math.min(98, Math.max(40, base.revenue + Math.round(actionBonus * 0.4)));
  const customer = Math.min(98, Math.max(40, base.customer + Math.round(actionBonus * 0.6)));

  const overall = Math.round(
    (revenue * 0.25) +
    (inventory * 0.25) +
    (customer * 0.20) +
    (supplier * 0.15) +
    (operations * 0.15)
  );

  return {
    overall,
    revenue,
    inventory,
    customer,
    supplier,
    operations,
  };
}

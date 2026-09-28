import { ScenarioParameters, ScenarioResult } from '../types';

export function runScenarioSimulation(params: ScenarioParameters): ScenarioResult {
  const { demandChange, supplierDelayDays, inventoryBufferChange } = params;

  // Base chicken stock parameters for Heritage Bites:
  // Base daily burn rate: 55 kg/day (recent accelerated rate)
  // Base stock: 132 kg
  // Base lead time: 2.7 days
  const effectiveBurnRate = 55 * (1 + demandChange / 100);
  const effectiveStock = 132 * (1 + inventoryBufferChange / 100);
  const effectiveLeadTime = 2.7 + supplierDelayDays;

  // Stockout time in days
  const daysToExhaustion = Math.max(0.2, effectiveStock / effectiveBurnRate);

  // Buffer coverage gap: if lead time exceeds days to exhaustion
  const coverageGap = effectiveLeadTime - daysToExhaustion;

  // Probability calculation
  let probability = 42; // baseline baseline normal without recent surges

  if (coverageGap > 0) {
    // Lead time exceeds current stock
    probability = Math.min(99, Math.round(50 + (coverageGap * 18) + (demandChange * 0.4)));
  } else {
    // Buffer exceeds lead time
    probability = Math.max(8, Math.round(42 - (Math.abs(coverageGap) * 14)));
  }

  // Cap within 5% - 98%
  probability = Math.min(98, Math.max(8, probability));

  // Risk score calculation
  const urgencyFactor = daysToExhaustion < 2 ? 1.5 : daysToExhaustion < 4 ? 1.2 : 0.8;
  const simulatedRiskScore = Math.min(
    99,
    Math.max(12, Math.round((probability * 0.5) + (daysToExhaustion < 2 ? 35 : 15) + (urgencyFactor * 10)))
  );

  // Revenue exposure
  const dailyChickenRevenue = 11000;
  const simulatedRevenueAtRisk = Math.round(
    Math.min(48000, Math.max(0, (effectiveLeadTime - daysToExhaustion) * dailyChickenRevenue * (1 + demandChange / 100)))
  );

  let statusChange = 'Normal Operational Margin';
  if (simulatedRiskScore >= 80) {
    statusChange = 'CRITICAL: Stockout Imminent Before Restock';
  } else if (simulatedRiskScore >= 60) {
    statusChange = 'HIGH: Vulnerable to Minor Shipment Variance';
  } else if (simulatedRiskScore >= 40) {
    statusChange = 'MODERATE: Acceptable Short-Term Buffer';
  } else {
    statusChange = 'LOW: Well Buffered Above Safety Reorder Point';
  }

  return {
    simulatedProbability: probability,
    simulatedRiskScore,
    simulatedTimeToExhaustion: `${daysToExhaustion.toFixed(1)} days`,
    simulatedRevenueAtRisk: simulatedRevenueAtRisk > 0 ? simulatedRevenueAtRisk : 2400,
    statusChange,
  };
}

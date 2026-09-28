export type IndustryType =
  | 'Restaurant'
  | 'Retail'
  | 'Manufacturing'
  | 'Logistics'
  | 'E-commerce'
  | 'Healthcare'
  | 'Other';

export type RiskSeverity = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';

export type ActionStatus = 'Pending' | 'In Progress' | 'Completed' | 'Dismissed';

export interface HealthScoreBreakdown {
  overall: number;
  revenue: number;
  inventory: number;
  customer: number;
  supplier: number;
  operations: number;
}

export interface WhySignal {
  label: string;
  change: string;
  trend: 'up' | 'down' | 'warning';
}

export interface RootCauseNode {
  id: string;
  title: string;
  detail: string;
  metric?: string;
  subNodes?: string[];
}

export interface RiskEvidence {
  salesChange: string;
  supplierDelay: string;
  inventoryChange: string;
  complaintsChange: string;
  dataPoints: Array<{ metric: string; value: string; baseline: string; impact: string }>;
  explanation: string;
}

export interface ConfidenceMetric {
  level: 'High' | 'Medium' | 'Low';
  percentage: number;
  reason: string;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  benefit: string;
  urgency: 'HIGH' | 'MEDIUM' | 'LOW';
  assignee: string;
  deadline: string;
}

export interface WhatIfDoNothingOutcome {
  estimatedLostSales: string;
  affectedOrders: string;
  customerChurnRisk: string;
  escalationTimeline: string;
  escalationSeverity: RiskSeverity;
  probabilityOfEscalation: number;
  consequences: string[];
}

export interface TimelineMilestone {
  timeLabel: string;
  stage: 'Past' | '2 Weeks Ago' | '4 Days Ago' | 'Current' | 'Predicted';
  status: string;
  description: string;
  isWarning?: boolean;
}

export interface RiskAlert {
  id: string;
  title: string;
  category: 'INVENTORY' | 'SUPPLIER' | 'REVENUE' | 'CUSTOMER' | 'DELIVERY' | 'OPERATIONS';
  riskScore: number; // 0-100
  severity: RiskSeverity;
  probability: number; // 0-100%
  timeToFailure: string; // e.g. "2.4 days"
  estimatedImpactMin: number;
  estimatedImpactMax: number;
  estimatedImpactDisplay: string; // e.g. "₹18,400–₹25,000"
  affectedOrdersEstimate: string;
  whySignals: WhySignal[];
  rootCauses: RootCauseNode[];
  evidence: RiskEvidence;
  confidence: ConfidenceMetric;
  recommendedActions: RecommendedAction[];
  whatIfDoNothing: WhatIfDoNothingOutcome;
  timeline: TimelineMilestone[];
  status: 'ACTIVE' | 'RESOLVING' | 'RESOLVED' | 'DISMISSED';
  isHero?: boolean;
  discoveredAt: string;
  aiReasoning: string;
}

export interface ActionItem {
  id: string;
  riskId: string;
  riskTitle: string;
  action: string;
  responsiblePerson: string;
  deadline: string;
  status: ActionStatus;
  expectedImpact: string;
  actualOutcome?: string;
  priority: RiskSeverity;
  createdAt: string;
}

export interface SupplierItem {
  id: string;
  name: string;
  category: string;
  reliability: number; // 0 - 100%
  averageDelayDays: number;
  trend: 'Stable' | 'Declining' | 'Improving' | 'Watchlist';
  deliveriesEvaluated: number;
  lastDeliveries: Array<{ date: string; delayDays: number; status: 'ON_TIME' | 'LATE' | 'CRITICAL' }>;
  recommendation: string;
  contact: string;
}

export interface CustomerComplaintTheme {
  theme: string;
  count: number;
  weeklyTrend: number[];
  percentageChange: string;
  sampleReviews: Array<{ date: string; rating: number; text: string; channel: string }>;
  aiInsight: string;
}

export interface ScenarioParameters {
  demandChange: number; // percentage, e.g. 0, 10, 20, 30
  supplierDelayDays: number; // days, e.g. 0, 1, 2, 3
  inventoryBufferChange: number; // percentage, e.g. -20, 0, 10, 20
}

export interface ScenarioResult {
  simulatedProbability: number;
  simulatedRiskScore: number;
  simulatedTimeToExhaustion: string;
  simulatedRevenueAtRisk: number;
  statusChange: string;
}

export interface AgentPersona {
  id: string;
  agentNumber: number;
  name: string;
  role: string;
  responsibilities: string[];
  engineType: 'Statistical & Deterministic' | 'Predictive Probabilistic' | 'Generative Synthesis' | 'Decision Optimization';
  status: 'ACTIVE' | 'ANALYZING' | 'COMPLETED';
  lastFinding: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  evidenceTags?: string[];
  suggestedAction?: string;
  source?: string;
}

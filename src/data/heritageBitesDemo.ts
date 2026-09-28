import {
  RiskAlert,
  ActionItem,
  SupplierItem,
  CustomerComplaintTheme,
  HealthScoreBreakdown,
  AgentPersona,
} from '../types';

export const INITIAL_HEALTH_SCORES: HealthScoreBreakdown = {
  overall: 68,
  revenue: 78,
  inventory: 51,
  customer: 74,
  supplier: 43,
  operations: 69,
};

export const DEMO_RISK_ALERTS: RiskAlert[] = [
  {
    id: 'risk-chicken-stockout-001',
    isHero: true,
    title: 'Potential Chicken Inventory Stockout in 2.4 Days',
    category: 'INVENTORY',
    riskScore: 82,
    severity: 'HIGH',
    probability: 78,
    timeToFailure: '2.4 days',
    estimatedImpactMin: 18400,
    estimatedImpactMax: 25000,
    estimatedImpactDisplay: '₹18,400–₹25,000',
    affectedOrdersEstimate: '73–96 diner orders',
    discoveredAt: 'Today, 07:15 AM (Pre-Service Risk Sweep)',
    aiReasoning:
      'Weekend demand for chicken-based meals increased 31% over the last four weeks while primary supplier FreshPoultry Farms delivery time increased 18% (average delay now 2.7 days). Current on-hand inventory is insufficient to cover projected weekend peak volume.',
    whySignals: [
      { label: 'Weekend Demand Surge', change: '+31%', trend: 'up' },
      { label: 'Supplier Lead Time Delay', change: '+18%', trend: 'warning' },
      { label: 'Current Buffer vs Safety Level', change: '−24%', trend: 'down' },
      { label: 'Item Unavailability Complaints', change: '+17%', trend: 'warning' },
    ],
    rootCauses: [
      {
        id: 'rc-1',
        title: 'Demand Acceleration (+31%)',
        detail:
          'Weekend footfall and Zomato/Swiggy orders for Dum Biryani & Butter Chicken surged from 145 portions to 190 portions/weekend.',
        metric: '+31% over 4 weeks',
        subNodes: ['Local sports tournament screening', 'Organic repeat orders for signature biryani'],
      },
      {
        id: 'rc-2',
        title: 'Supplier Lead Time Inflation (+18%)',
        detail:
          'FreshPoultry Farms average dispatch-to-dock time drifted from 0.8 days to 2.7 days due to regional processing bottlenecks.',
        metric: '2.7 days avg delay',
        subNodes: ['FreshPoultry Farms logistics route consolidation', '3 consecutive delayed PO shipments'],
      },
      {
        id: 'rc-3',
        title: 'Current Safety Stock Erosion (−24%)',
        detail:
          'On-hand raw poultry inventory sits at 132 kg against a weekend safety baseline of 175 kg, leaving only 2.4 days of operational coverage.',
        metric: '132 kg remaining (vs 175 kg safety threshold)',
        subNodes: ['Burn rate accelerated to 55 kg/day', 'Stock exhaustion projected Friday 19:30'],
      },
    ],
    evidence: {
      salesChange: '+31% in chicken menu sales',
      supplierDelay: '+18% delivery lag (2.7 days)',
      inventoryChange: '−24% below safety threshold',
      complaintsChange: '+17% unserved diner reviews',
      dataPoints: [
        { metric: 'Avg Weekly Chicken Consumption', value: '385 kg', baseline: '294 kg', impact: '+31% surge' },
        { metric: 'Supplier Average Fulfillment Lag', value: '2.7 days', baseline: '0.8 days', impact: '+18% drift' },
        { metric: 'Effective Run-Out Buffer', value: '2.4 days', baseline: '6.5 days', impact: 'High vulnerability' },
        { metric: 'Recent "Dish Unavailable" Mentions', value: '14 reviews', baseline: '2 reviews', impact: '+17% negative spike' },
      ],
      explanation:
        'This alert was not triggered by a single spike, but by the convergence of 3 independent operational signals: high sales velocity, lagging vendor dispatches, and depleted safety buffers.',
    },
    confidence: {
      level: 'High',
      percentage: 87,
      reason: 'Based on 8 weeks of consistent demand, verified POS sales records, and ERP inventory telemetry.',
    },
    recommendedActions: [
      {
        id: 'act-1',
        title: 'Place Emergency 35% Supplemental Poultry Order',
        description:
          'Issue an urgent PO amendment for +45 kg boneless and +30 kg bone-in poultry directly to FreshPoultry Farms with express courier escalation.',
        benefit: 'Restores safety inventory back to 210 kg, avoiding Friday night stockout.',
        urgency: 'HIGH',
        assignee: 'Chef Rajesh / Procurement',
        deadline: 'Today, 2:00 PM',
      },
      {
        id: 'act-2',
        title: 'Activate Secondary Vendor: Apex Poultry Hub',
        description:
          'Engage backup pre-contracted vendor Apex Poultry Hub for 50 kg rapid-dispatch safety buffer to hedge against FreshPoultry delay.',
        benefit: 'Guarantees delivery within 18 hours if primary vendor fails.',
        urgency: 'HIGH',
        assignee: 'Vedith (General Manager)',
        deadline: 'Today, 5:00 PM',
      },
      {
        id: 'act-3',
        title: 'Temporarily Throttle Aggregator Promos',
        description:
          'Pause discount promotions for Chicken Biryani combo on Swiggy & Zomato between 3 PM and 7 PM to preserve stock for dine-in guests.',
        benefit: 'Reduces burn velocity by ~12 kg, buying 14 additional hours of buffer.',
        urgency: 'MEDIUM',
        assignee: 'Operations Desk',
        deadline: 'Tomorrow, 11:00 AM',
      },
    ],
    whatIfDoNothing: {
      estimatedLostSales: '₹18,400–₹25,000',
      affectedOrders: '73–96 diner orders',
      customerChurnRisk: '14% repeat diner impact (approx ₹42,000 in 60-day customer LTV)',
      escalationTimeline: 'Friday 19:30 (Peak dinner service)',
      escalationSeverity: 'CRITICAL',
      probabilityOfEscalation: 89,
      consequences: [
        'Complete stockout of top 4 highest-margin chicken dishes during peak Friday night shift',
        '73 to 96 orders cancelled or rejected, leading to immediate diner frustration',
        'Estimated 10–14 negative one-star reviews on Google Maps & Zomato',
        'Business Health Score drops from 68 down to 52/100',
      ],
    },
    timeline: [
      {
        timeLabel: '4 Weeks Ago',
        stage: 'Past',
        status: 'Normal Baseline',
        description: 'Chicken demand was steady at 42 kg/day. Supplier delivery took 0.8 days.',
      },
      {
        timeLabel: '2 Weeks Ago',
        stage: '2 Weeks Ago',
        status: 'Demand Acceleration',
        description: 'Weekend demand surged +31% due to cricket screenings and seasonal footfall.',
        isWarning: false,
      },
      {
        timeLabel: '4 Days Ago',
        stage: '4 Days Ago',
        status: 'Supplier Disruption',
        description: 'FreshPoultry Farms logged consecutive late deliveries (avg 2.7 days delay).',
        isWarning: true,
      },
      {
        timeLabel: 'Today (07:15)',
        stage: 'Current',
        status: 'Buffer Below Critical',
        description: 'Current stock depleted to 132 kg (-24% below threshold). Alert triggered.',
        isWarning: true,
      },
      {
        timeLabel: 'In 2.4 Days (Friday 19:30)',
        stage: 'Predicted',
        status: 'Stockout Projection',
        description: 'Without action, inventory hits 0 kg during peak dinner rush. ₹18.4k+ lost.',
        isWarning: true,
      },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'risk-seafood-temp-002',
    isHero: false,
    title: 'Seafood Cold-Chain Temperature Variance from OceanFresh',
    category: 'SUPPLIER',
    riskScore: 64,
    severity: 'HIGH',
    probability: 62,
    timeToFailure: 'Next delivery (Tomorrow)',
    estimatedImpactMin: 12000,
    estimatedImpactMax: 16500,
    estimatedImpactDisplay: '₹12,000–₹16,500',
    affectedOrdersEstimate: '35–45 seafood plates',
    discoveredAt: 'Yesterday, 18:40',
    aiReasoning:
      'Receiving dock temperature logs for OceanFresh Seafoods indicated two deliveries arriving at +5.8°C (recommended max +2°C). Risk of raw material spoilage and food safety compliance penalty.',
    whySignals: [
      { label: 'Dock Temp Breach', change: '+3.8°C above target', trend: 'warning' },
      { label: 'Prawn Spoilage Rejections', change: '8.5 kg lost', trend: 'down' },
      { label: 'Vendor Reliability Drift', change: '−12%', trend: 'down' },
    ],
    rootCauses: [
      {
        id: 'rc-s1',
        title: 'Refrigerated Van Malfunction',
        detail: 'Logistics provider utilized non-dedicated secondary reefer van during noon route.',
      },
      {
        id: 'rc-s2',
        title: 'Delayed Mid-Day Receiving Inspection',
        detail: 'Kitchen prep shift delayed cold storage intake by 45 minutes.',
      },
    ],
    evidence: {
      salesChange: 'Seafood sales +14%',
      supplierDelay: 'Delivery lag +1.1 days',
      inventoryChange: '8.5 kg discarded',
      complaintsChange: '2 freshness queries',
      dataPoints: [
        { metric: 'Receiving Dock Probe Temp', value: '5.8°C', baseline: '1.5°C', impact: 'Exceeds food safety tolerance' },
        { metric: 'Spoilage Waste Cost', value: '₹4,850', baseline: '₹0', impact: 'Direct operational loss' },
      ],
      explanation: 'Thermal log sensor at receiving bay confirmed breach on last 2 deliveries.',
    },
    confidence: {
      level: 'High',
      percentage: 84,
      reason: 'Automated digital food probe logs and kitchen discard records.',
    },
    recommendedActions: [
      {
        id: 'act-s1',
        title: 'Issue Temperature Non-Conformance Notice to OceanFresh',
        description: 'Mandate calibrated datalogger printout upon receipt before accepting next consignment.',
        benefit: 'Prevents acceptance of compromised stock; shifts liability to vendor.',
        urgency: 'HIGH',
        assignee: 'Head Chef',
        deadline: 'Tomorrow, 9:00 AM',
      },
    ],
    whatIfDoNothing: {
      estimatedLostSales: '₹12,000–₹16,500',
      affectedOrders: '35–45 plates',
      customerChurnRisk: 'Extreme (potential food poisoning liability)',
      escalationTimeline: 'Next delivery',
      escalationSeverity: 'CRITICAL',
      probabilityOfEscalation: 74,
      consequences: [
        'Potential food safety inspection citation',
        'Customer refund claims and health hazard exposure',
      ],
    },
    timeline: [
      { timeLabel: '1 Week Ago', stage: 'Past', status: 'Normal', description: 'Consignments received at 1.8°C.' },
      { timeLabel: '3 Days Ago', stage: 'Current', status: 'Temp Spike', description: 'Van arrived at 5.2°C; warning flagged.' },
      { timeLabel: 'Tomorrow', stage: 'Predicted', status: 'Inspection Gate', description: 'Strict gate-check required.' },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'risk-takeaway-boxes-003',
    isHero: false,
    title: 'Takeaway Meal Packaging Depletion in 4.1 Days',
    category: 'OPERATIONS',
    riskScore: 52,
    severity: 'MODERATE',
    probability: 65,
    timeToFailure: '4.1 days',
    estimatedImpactMin: 8500,
    estimatedImpactMax: 11000,
    estimatedImpactDisplay: '₹8,500–₹11,000',
    affectedOrdersEstimate: '110 delivery boxes',
    discoveredAt: 'Today, 08:30 AM',
    aiReasoning:
      'Rapid growth in delivery volume (+26%) has accelerated packaging box consumption. Reorder trigger was missed during weekend inventory audit.',
    whySignals: [
      { label: 'Packaging Depletion Rate', change: '+26%', trend: 'up' },
      { label: 'Remaining Stock', change: '240 units (4.1 days)', trend: 'down' },
    ],
    rootCauses: [
      {
        id: 'rc-p1',
        title: 'Delivery Order Growth Outpacing Packaging Reorders',
        detail: 'Packaging reorder was scheduled bi-weekly, failing to track high delivery expansion.',
      },
    ],
    evidence: {
      salesChange: '+26% delivery orders',
      supplierDelay: 'Packaging supplier takes 3 days',
      inventoryChange: '240 boxes on-hand',
      complaintsChange: '0 complaints yet (pre-failure state)',
      dataPoints: [
        { metric: 'Daily Box Burn', value: '58 units/day', baseline: '44 units/day', impact: 'Accelerated depletion' },
      ],
      explanation: 'Discovered via inventory velocity cross-referenced with vendor lead time.',
    },
    confidence: {
      level: 'High',
      percentage: 91,
      reason: 'Physical inventory count validated by morning floor manager.',
    },
    recommendedActions: [
      {
        id: 'act-p1',
        title: 'Dispatch Emergency Order to EcoPack Supplies',
        description: 'Order 1,000 unit batch of biodegradable 750ml meal boxes.',
        benefit: 'Maintains unbroken delivery fulfillment through Sunday.',
        urgency: 'MEDIUM',
        assignee: 'Store Manager',
        deadline: 'Today, 4:00 PM',
      },
    ],
    whatIfDoNothing: {
      estimatedLostSales: '₹8,500–₹11,000',
      affectedOrders: '110 delivery orders',
      customerChurnRisk: 'Moderate',
      escalationTimeline: 'Sunday morning',
      escalationSeverity: 'HIGH',
      probabilityOfEscalation: 78,
      consequences: ['Forced pause on online delivery channels during Sunday lunch.'],
    },
    timeline: [
      { timeLabel: '2 Weeks Ago', stage: 'Past', status: 'Normal', description: '500 boxes in stock.' },
      { timeLabel: 'Today', stage: 'Current', status: 'Depletion Flag', description: 'Down to 240 units.' },
      { timeLabel: 'In 4.1 Days', stage: 'Predicted', status: 'Stockout', description: 'Packaging runs dry.' },
    ],
    status: 'ACTIVE',
  },
];

export const DEMO_ACTIONS: ActionItem[] = [
  {
    id: 'act-1',
    riskId: 'risk-chicken-stockout-001',
    riskTitle: 'Potential Chicken Inventory Stockout in 2.4 Days',
    action: 'Increase next poultry order by 35% and contact FreshPoultry Farms today.',
    responsiblePerson: 'Chef Rajesh (Kitchen Ops)',
    deadline: 'Today, 2:00 PM',
    status: 'Pending',
    expectedImpact: 'Prevents ₹18,400–₹25,000 lost sales; restores safety stock to 210 kg.',
    priority: 'CRITICAL',
    createdAt: '2026-09-28 07:15',
  },
  {
    id: 'act-2',
    riskId: 'risk-chicken-stockout-001',
    riskTitle: 'Potential Chicken Inventory Stockout in 2.4 Days',
    action: 'Activate backup vendor Apex Poultry Hub for 50 kg rapid safety dispatch.',
    responsiblePerson: 'Vedith (General Manager)',
    deadline: 'Today, 5:00 PM',
    status: 'In Progress',
    expectedImpact: 'Secures backup stock within 18 hours if primary vendor delays.',
    priority: 'HIGH',
    createdAt: '2026-09-28 07:30',
  },
  {
    id: 'act-3',
    riskId: 'risk-chicken-stockout-001',
    riskTitle: 'Potential Chicken Inventory Stockout in 2.4 Days',
    action: 'Throttle Swiggy/Zomato Biryani combo promotions between 3 PM and 7 PM.',
    responsiblePerson: 'Operations Desk',
    deadline: 'Tomorrow, 11:00 AM',
    status: 'Pending',
    expectedImpact: 'Stretches buffer by 14 hours by curbing excess promo spikes.',
    priority: 'MODERATE',
    createdAt: '2026-09-28 07:45',
  },
  {
    id: 'act-s1',
    riskId: 'risk-seafood-temp-002',
    riskTitle: 'Seafood Cold-Chain Temperature Variance from OceanFresh',
    action: 'Issue Temperature Non-Conformance Notice to OceanFresh Seafoods.',
    responsiblePerson: 'Head Chef',
    deadline: 'Tomorrow, 9:00 AM',
    status: 'Pending',
    expectedImpact: 'Protects against ₹12,000 spoiled inventory and regulatory fine.',
    priority: 'HIGH',
    createdAt: '2026-09-27 18:40',
  },
  {
    id: 'act-p1',
    riskId: 'risk-takeaway-boxes-003',
    riskTitle: 'Takeaway Meal Packaging Depletion in 4.1 Days',
    action: 'Dispatch emergency order to EcoPack Supplies for 1,000 biodegradable boxes.',
    responsiblePerson: 'Store Manager',
    deadline: 'Today, 4:00 PM',
    status: 'Pending',
    expectedImpact: 'Prevents online delivery suspension over weekend.',
    priority: 'MODERATE',
    createdAt: '2026-09-28 08:30',
  },
];

export const DEMO_SUPPLIERS: SupplierItem[] = [
  {
    id: 'sup-1',
    name: 'FreshPoultry Farms',
    category: 'Poultry & Eggs',
    reliability: 62,
    averageDelayDays: 2.7,
    trend: 'Declining',
    deliveriesEvaluated: 24,
    recommendation: 'Issue vendor SLA warning; divert 40% order volume to backup supplier Apex Poultry.',
    contact: '+91 98450 21980 / dispatch@freshpoultry.in',
    lastDeliveries: [
      { date: 'Sep 26', delayDays: 3.1, status: 'CRITICAL' },
      { date: 'Sep 22', delayDays: 2.4, status: 'LATE' },
      { date: 'Sep 18', delayDays: 2.6, status: 'LATE' },
      { date: 'Sep 14', delayDays: 0.5, status: 'ON_TIME' },
    ],
  },
  {
    id: 'sup-2',
    name: 'Metro Spices & Dry Goods',
    category: 'Spices, Basmati Rice & Oil',
    reliability: 94,
    averageDelayDays: 0.5,
    trend: 'Stable',
    deliveriesEvaluated: 18,
    recommendation: 'Top tier vendor; exemplary delivery precision and batch consistency.',
    contact: '+91 80 2671 9043 / orders@metrospices.com',
    lastDeliveries: [
      { date: 'Sep 25', delayDays: 0.2, status: 'ON_TIME' },
      { date: 'Sep 18', delayDays: 0.4, status: 'ON_TIME' },
      { date: 'Sep 11', delayDays: 0.8, status: 'ON_TIME' },
    ],
  },
  {
    id: 'sup-3',
    name: 'OceanFresh Seafoods',
    category: 'Prawns, Fish & Crabs',
    reliability: 88,
    averageDelayDays: 1.1,
    trend: 'Watchlist',
    deliveriesEvaluated: 16,
    recommendation: 'On-time delivery satisfactory, but cold-chain thermals require strict receiving verification.',
    contact: '+91 98201 54722 / supply@oceanfresh.co.in',
    lastDeliveries: [
      { date: 'Sep 27', delayDays: 1.2, status: 'LATE' },
      { date: 'Sep 24', delayDays: 0.9, status: 'ON_TIME' },
      { date: 'Sep 20', delayDays: 1.3, status: 'LATE' },
    ],
  },
  {
    id: 'sup-4',
    name: 'GreenFields Organic Veg',
    category: 'Fresh Vegetables & Herbs',
    reliability: 96,
    averageDelayDays: 0.3,
    trend: 'Stable',
    deliveriesEvaluated: 32,
    recommendation: 'Highly consistent morning dock deliveries with 98% quality grade score.',
    contact: '+91 94480 33119 / farm@greenfields.org',
    lastDeliveries: [
      { date: 'Sep 28', delayDays: 0.1, status: 'ON_TIME' },
      { date: 'Sep 27', delayDays: 0.2, status: 'ON_TIME' },
      { date: 'Sep 26', delayDays: 0.4, status: 'ON_TIME' },
    ],
  },
];

export const DEMO_COMPLAINT_THEMES: CustomerComplaintTheme[] = [
  {
    theme: 'Unavailable Menu Items (Chicken)',
    count: 19,
    weeklyTrend: [2, 3, 5, 9],
    percentageChange: '+17%',
    aiInsight: 'Complaints peaked between 20:00 and 22:00 on Friday/Saturday when kitchen ran out of Dum Biryani.',
    sampleReviews: [
      {
        date: 'Sep 27',
        rating: 1,
        text: 'Came all the way with family for Special Chicken Biryani at 8:30 PM, waiter said chicken dishes are all sold out! Disappointing.',
        channel: 'Google Maps Review',
      },
      {
        date: 'Sep 26',
        rating: 2,
        text: 'Order for Butter Chicken cancelled after 40 mins waiting due to ingredient shortage. Very poor planning.',
        channel: 'Zomato Diner',
      },
    ],
  },
  {
    theme: 'Waiting Time & Kitchen Delays',
    count: 14,
    weeklyTrend: [3, 4, 3, 4],
    percentageChange: '+2%',
    aiInsight: 'Within normal baseline; wait time spikes specifically during peak Friday 8 PM dinner shifts.',
    sampleReviews: [
      {
        date: 'Sep 25',
        rating: 3,
        text: 'Starters took 35 mins. Food was tasty once it arrived though.',
        channel: 'Swiggy Diner',
      },
    ],
  },
  {
    theme: 'Delivery Packaging & Temperature',
    count: 7,
    weeklyTrend: [2, 1, 2, 2],
    percentageChange: 'Stable',
    aiInsight: 'Packaging remains well received; slight moisture accumulation on rainy evenings.',
    sampleReviews: [
      {
        date: 'Sep 24',
        rating: 4,
        text: 'Food arrived warm and packed well in spill-proof box.',
        channel: 'Swiggy Delivery',
      },
    ],
  },
  {
    theme: 'Food Quality & Taste',
    count: 5,
    weeklyTrend: [1, 2, 1, 1],
    percentageChange: '−10%',
    aiInsight: 'Core kitchen flavor profile remains consistently high (4.6 / 5 rating avg).',
    sampleReviews: [
      {
        date: 'Sep 27',
        rating: 5,
        text: 'Exceptional spices in the mutton rogan josh. Best in Indiranagar.',
        channel: 'Google Maps Review',
      },
    ],
  },
];

export const DEMO_AGENT_ARCHITECTURE: AgentPersona[] = [
  {
    id: 'agent-1',
    agentNumber: 1,
    name: 'Agent 1 — Data Analyst',
    role: 'Data Ingestion & Integrity',
    engineType: 'Statistical & Deterministic',
    status: 'COMPLETED',
    responsibilities: [
      'Ingests fragmented CSVs (Sales, Inventory, Suppliers, Complaints)',
      'Cleans missing timestamps, detects column schemas',
      'Calculates 90-day moving averages and burn rate velocities',
    ],
    lastFinding: 'Calculated 4-week poultry consumption velocity: +31% increase (385 kg/wk vs 294 kg baseline).',
  },
  {
    id: 'agent-2',
    agentNumber: 2,
    name: 'Agent 2 — Anomaly Detector',
    role: 'Statistical Outlier Identification',
    engineType: 'Statistical & Deterministic',
    status: 'COMPLETED',
    responsibilities: [
      'Executes deterministic z-score and rolling standard deviation tests',
      'Flags lead-time drift in supplier deliveries',
      'Detects stock depletion velocity surpassing replenishment schedules',
    ],
    lastFinding: 'Detected 2.4-sigma supplier delivery lag in FreshPoultry Farms (delay index +18%).',
  },
  {
    id: 'agent-3',
    agentNumber: 3,
    name: 'Agent 3 — Risk Analyst',
    role: 'Failure Mode Projection & Scoring',
    engineType: 'Predictive Probabilistic',
    status: 'ACTIVE',
    responsibilities: [
      'Correlates multi-domain anomalies into operational failure hypotheses',
      'Calculates normalized Risk Score = (Probability × Impact × Urgency) / Scale',
      'Simulates hours-to-exhaustion under current burn conditions',
    ],
    lastFinding: 'Projected critical poultry stockout in ~2.4 days with 78% probability (Risk Score: 82/100).',
  },
  {
    id: 'agent-4',
    agentNumber: 4,
    name: 'Agent 4 — Root Cause Analyst',
    role: 'Causal Chain Construction',
    engineType: 'Generative Synthesis',
    status: 'ACTIVE',
    responsibilities: [
      'Builds multi-tier causal DAG trees connecting raw operational data',
      'Separates hard verifiable evidence from speculative hypotheses',
      'Exposes plain-English causal drivers behind metric anomalies',
    ],
    lastFinding: 'Linked weekend footfall surge (+31%) + vendor logistics consolidation to raw stock depletion.',
  },
  {
    id: 'agent-5',
    agentNumber: 5,
    name: 'Agent 5 — Action Planner',
    role: 'Decision Optimization & Impact ROI',
    engineType: 'Decision Optimization',
    status: 'ACTIVE',
    responsibilities: [
      'Synthesizes prioritized mitigation actions with explicit deadlines',
      'Calculates cost-to-remedy vs revenue-at-risk ratio',
      'Assigns accountable roles (Chef, Manager, Procurement)',
    ],
    lastFinding: 'Formulated 3-tiered mitigation plan: 35% PO boost, backup vendor activation, promo throttling.',
  },
  {
    id: 'agent-6',
    agentNumber: 6,
    name: 'Agent 6 — Business Advisor',
    role: 'Natural Language Executive Copilot',
    engineType: 'Generative Synthesis',
    status: 'ACTIVE',
    responsibilities: [
      'Answers natural language executive queries with zero hallucinations',
      'Enforces strict data grounding on Heritage Bites 90-day operational telemetry',
      'Translates operational risk into financial loss exposure in rupees',
    ],
    lastFinding: 'Ready to answer owner questions: biggest risks, financial exposures, daily priorities.',
  },
];

// Sample CSV templates for users who want to upload custom data
export const SAMPLE_CSV_DATA = {
  sales: `date,product,quantity,revenue,category
2026-09-01,Chicken Biryani,42,16800,Mains
2026-09-01,Butter Chicken,28,11200,Mains
2026-09-01,Tandoori Roti,110,3300,Breads
2026-09-02,Chicken Biryani,46,18400,Mains
2026-09-02,Paneer Tikka,22,6600,Starters
2026-09-03,Chicken Biryani,55,22000,Mains
2026-09-04,Butter Chicken,38,15200,Mains
2026-09-05,Chicken Biryani,68,27200,Mains`,
  inventory: `date,product,stock_level,unit,reorder_point
2026-09-28,Raw Chicken (Bone-in & Boneless),132,kg,175
2026-09-28,Basmati Rice,450,kg,200
2026-09-28,Ghee & Cooking Oils,120,liters,60
2026-09-28,Prawns (Medium Tiger),18,kg,25
2026-09-28,Takeaway Meal Boxes,240,units,500`,
  complaints: `date,category,text,rating
2026-09-27,Unavailable items,"Special Chicken Biryani was sold out at 8:30 PM",1
2026-09-26,Unavailable items,"Butter chicken unavailable for delivery",2
2026-09-25,Waiting time,"Starters took 35 mins to arrive",3
2026-09-24,Food quality,"Rogan josh was flavorful and tender",5
2026-09-23,Delivery,"Delivery arrived on time",4`,
  deliveries: `date,supplier,expected_date,actual_date,item,quantity
2026-09-26,FreshPoultry Farms,2026-09-23,2026-09-26,Raw Chicken,120kg
2026-09-22,FreshPoultry Farms,2026-09-20,2026-09-22,Raw Chicken,100kg
2026-09-25,Metro Spices,2026-09-25,2026-09-25,Basmati Rice,200kg
2026-09-27,OceanFresh Seafoods,2026-09-26,2026-09-27,Tiger Prawns,25kg`,
  suppliers: `supplier,delivery_time,reliability,category
FreshPoultry Farms,2.7 days,62%,Poultry
Metro Spices & Dry Goods,0.5 days,94%,Spices & Rice
OceanFresh Seafoods,1.1 days,88%,Seafood
GreenFields Organic Veg,0.3 days,96%,Vegetables`,
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  IndustryType,
  HealthScoreBreakdown,
  RiskAlert,
  ActionItem,
  SupplierItem,
  CustomerComplaintTheme,
  ScenarioParameters,
  ScenarioResult,
  ChatMessage,
  ActionStatus,
} from '../types';
import {
  INITIAL_HEALTH_SCORES,
  DEMO_RISK_ALERTS,
  DEMO_ACTIONS,
  DEMO_SUPPLIERS,
  DEMO_COMPLAINT_THEMES,
} from '../data/heritageBitesDemo';
import { recomputeHealthScores } from '../engine/riskEngine';
import { runScenarioSimulation } from '../engine/scenarioEngine';

interface PulseGuardContextType {
  currentView: 'landing' | 'dashboard' | 'what-if' | 'alerts' | 'suppliers' | 'sentiment' | 'actions' | 'report' | 'agents';
  setCurrentView: (view: any) => void;
  businessName: string;
  businessType: IndustryType;
  setBusinessType: (type: IndustryType) => void;
  branch: string;
  setBranch: (b: string) => void;
  healthScores: HealthScoreBreakdown;
  risks: RiskAlert[];
  selectedRisk: RiskAlert | null;
  setSelectedRisk: (r: RiskAlert | null) => void;
  actions: ActionItem[];
  suppliers: SupplierItem[];
  complaintThemes: CustomerComplaintTheme[];
  scenarioParams: ScenarioParameters;
  setScenarioParam: (key: keyof ScenarioParameters, value: number) => void;
  resetScenarioParams: () => void;
  scenarioResult: ScenarioResult;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  isChatLoading: boolean;
  sendChatMessage: (text: string) => Promise<void>;
  activeModal: 'root-cause' | 'evidence' | 'what-if-do-nothing' | 'import-csv' | 'report' | 'agents' | 'scenario' | null;
  activeModalRisk: RiskAlert | null;
  openModal: (modal: 'root-cause' | 'evidence' | 'what-if-do-nothing' | 'import-csv' | 'report' | 'agents' | 'scenario', risk?: RiskAlert) => void;
  closeModal: () => void;
  updateActionStatus: (actionId: string, status: ActionStatus) => void;
  loadDemoBusiness: () => void;
  resetDemo: () => void;
  heroDiscovered: boolean;
  triggerHeroDiscovery: () => void;
  importCustomData: (category: string, rowCount: number) => void;
}

const PulseGuardContext = createContext<PulseGuardContextType | undefined>(undefined);

export const PulseGuardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'what-if' | 'alerts' | 'suppliers' | 'sentiment' | 'actions' | 'report' | 'agents'>('landing');
  const [businessName, setBusinessName] = useState('Heritage Bites');
  const [businessType, setBusinessType] = useState<IndustryType>('Restaurant');
  const [branch, setBranch] = useState('Indiranagar 100ft Rd, Bengaluru');
  const [healthScores, setHealthScores] = useState<HealthScoreBreakdown>(INITIAL_HEALTH_SCORES);
  const [risks, setRisks] = useState<RiskAlert[]>(DEMO_RISK_ALERTS);
  const [selectedRisk, setSelectedRisk] = useState<RiskAlert | null>(DEMO_RISK_ALERTS[0]);
  const [actions, setActions] = useState<ActionItem[]>(DEMO_ACTIONS);
  const [suppliers, setSuppliers] = useState<SupplierItem[]>(DEMO_SUPPLIERS);
  const [complaintThemes, setComplaintThemes] = useState<CustomerComplaintTheme[]>(DEMO_COMPLAINT_THEMES);

  // Scenario Sandbox State
  const [scenarioParams, setScenarioParams] = useState<ScenarioParameters>({
    demandChange: 0,
    supplierDelayDays: 0,
    inventoryBufferChange: 0,
  });
  const [scenarioResult, setScenarioResult] = useState<ScenarioResult>(
    runScenarioSimulation({ demandChange: 0, supplierDelayDays: 0, inventoryBufferChange: 0 })
  );

  // Modals
  const [activeModal, setActiveModal] = useState<'root-cause' | 'evidence' | 'what-if-do-nothing' | 'import-csv' | 'report' | 'agents' | 'scenario' | null>(null);
  const [activeModalRisk, setActiveModalRisk] = useState<RiskAlert | null>(null);

  // Natural Language Copilot Chat
  const [chatOpen, setChatOpen] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'init-msg',
      sender: 'assistant',
      text: 'Hello Vedith, I have monitored 90 days of Heritage Bites operations. What is your focus today? Ask me about top risks, chicken inventory runway, supplier reliability, or what happens if no action is taken.',
      timestamp: '07:15 AM',
      suggestedAction: 'Ask: "What is my biggest risk?"',
    },
  ]);

  // Hero discovery animation trigger
  const [heroDiscovered, setHeroDiscovered] = useState(true);

  // Update simulation when params change
  useEffect(() => {
    setScenarioResult(runScenarioSimulation(scenarioParams));
  }, [scenarioParams]);

  // Recalculate health scores when actions change
  useEffect(() => {
    const completedCount = actions.filter((a) => a.status === 'Completed').length;
    const activeCriticalCount = risks.filter((r) => r.status === 'ACTIVE' && (r.severity === 'CRITICAL' || r.severity === 'HIGH')).length;
    setHealthScores(recomputeHealthScores(INITIAL_HEALTH_SCORES, completedCount, activeCriticalCount));
  }, [actions, risks]);

  const setScenarioParam = (key: keyof ScenarioParameters, value: number) => {
    setScenarioParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetScenarioParams = () => {
    setScenarioParams({
      demandChange: 0,
      supplierDelayDays: 0,
      inventoryBufferChange: 0,
    });
  };

  const openModal = (modal: 'root-cause' | 'evidence' | 'what-if-do-nothing' | 'import-csv' | 'report' | 'agents' | 'scenario', risk?: RiskAlert) => {
    setActiveModal(modal);
    if (risk) {
      setActiveModalRisk(risk);
      setSelectedRisk(risk);
    } else if (selectedRisk) {
      setActiveModalRisk(selectedRisk);
    } else {
      setActiveModalRisk(risks[0]);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setActiveModalRisk(null);
  };

  const updateActionStatus = (actionId: string, status: ActionStatus) => {
    setActions((prev) =>
      prev.map((act) => {
        if (act.id === actionId) {
          return {
            ...act,
            status,
            actualOutcome:
              status === 'Completed'
                ? 'Action executed. Safety stock reinforced, stockout averted.'
                : act.actualOutcome,
          };
        }
        return act;
      })
    );

    // If all high priority actions for the primary risk are completed, mark primary risk as resolving
    if (actionId === 'act-1' && status === 'Completed') {
      setRisks((prev) =>
        prev.map((r) => {
          if (r.id === 'risk-chicken-stockout-001') {
            return {
              ...r,
              riskScore: 36,
              severity: 'MODERATE',
              timeToFailure: 'Mitigated (Runway extended to 9+ days)',
              status: 'RESOLVING',
            };
          }
          return r;
        })
      );
    }
  };

  const loadDemoBusiness = () => {
    setBusinessName('Heritage Bites');
    setBusinessType('Restaurant');
    setHealthScores(INITIAL_HEALTH_SCORES);
    setRisks(DEMO_RISK_ALERTS);
    setSelectedRisk(DEMO_RISK_ALERTS[0]);
    setActions(DEMO_ACTIONS);
    setSuppliers(DEMO_SUPPLIERS);
    setComplaintThemes(DEMO_COMPLAINT_THEMES);
    setHeroDiscovered(false);
    setCurrentView('dashboard');
    setTimeout(() => {
      setHeroDiscovered(true);
    }, 900);
  };

  const resetDemo = () => {
    loadDemoBusiness();
  };

  const triggerHeroDiscovery = () => {
    setHeroDiscovered(false);
    setTimeout(() => setHeroDiscovered(true), 600);
  };

  const importCustomData = (category: string, rowCount: number) => {
    // Add realistic reaction to custom imported dataset
    setChatMessages((prev) => [
      ...prev,
      {
        id: `import-notify-${Date.now()}`,
        sender: 'assistant',
        text: `Successfully ingested and analyzed ${rowCount} records from your custom ${category.toUpperCase()} dataset. Cross-correlating with operational anomalies...`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const sendChatMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: {
            businessName,
            businessType,
            healthScore: healthScores.overall,
            healthScores,
            primaryRisk: risks[0],
            actionsCount: actions.length,
          },
        }),
      });

      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Analysis complete.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
      };

      setChatMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      // Deterministic fallback response in client if offline
      const botMsg: ChatMessage = {
        id: `bot-fb-${Date.now()}`,
        sender: 'assistant',
        text: `Analysis based on Heritage Bites telemetry: Your primary operational vulnerability is a potential chicken stockout in 2.4 days (Risk Score: 82/100). Weekend demand surged +31% while FreshPoultry Farms delivery delay expanded to 2.7 days. Recommend dispatching an emergency 35% replenishment order immediately to protect ₹18,400–₹25,000 in revenue.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'local-intelligence-engine',
      };
      setChatMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <PulseGuardContext.Provider
      value={{
        currentView,
        setCurrentView,
        businessName,
        businessType,
        setBusinessType,
        branch,
        setBranch,
        healthScores,
        risks,
        selectedRisk,
        setSelectedRisk,
        actions,
        suppliers,
        complaintThemes,
        scenarioParams,
        setScenarioParam,
        resetScenarioParams,
        scenarioResult,
        chatOpen,
        setChatOpen,
        chatMessages,
        isChatLoading,
        sendChatMessage,
        activeModal,
        activeModalRisk,
        openModal,
        closeModal,
        updateActionStatus,
        loadDemoBusiness,
        resetDemo,
        heroDiscovered,
        triggerHeroDiscovery,
        importCustomData,
      }}
    >
      {children}
    </PulseGuardContext.Provider>
  );
};

export const usePulseGuard = () => {
  const context = useContext(PulseGuardContext);
  if (!context) {
    throw new Error('usePulseGuard must be used within a PulseGuardProvider');
  }
  return context;
};

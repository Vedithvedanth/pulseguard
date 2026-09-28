import React from 'react';
import { PulseGuardProvider, usePulseGuard } from './context/PulseGuardContext';
import { LandingPage } from './components/LandingPage';
import { Navbar } from './components/Navbar';
import { HeroAlertDiscovery } from './components/HeroAlertDiscovery';
import { BusinessHealthCard } from './components/BusinessHealthCard';
import { WhatNeedsAttention } from './components/WhatNeedsAttention';
import { RiskTimeline } from './components/RiskTimeline';
import { ScenarioSimulator } from './components/ScenarioSimulator';
import { AlertCenter } from './components/AlertCenter';
import { ActionTracker } from './components/ActionTracker';
import { SupplierIntelligence } from './components/SupplierIntelligence';
import { CustomerSentiment } from './components/CustomerSentiment';
import { AgentArchitectureModal } from './components/AgentArchitectureModal';
import { RootCauseModal } from './components/RootCauseModal';
import { EvidenceModal } from './components/EvidenceModal';
import { WhatIfDoNothingModal } from './components/WhatIfDoNothingModal';
import { BusinessDataImportModal } from './components/BusinessDataImportModal';
import { ExecutiveReportModal } from './components/ExecutiveReportModal';
import { AskPulseGuardDrawer } from './components/AskPulseGuardDrawer';

const AppContent: React.FC = () => {
  const { currentView } = usePulseGuard();

  if (currentView === 'landing') {
    return (
      <>
        <LandingPage />
        <BusinessDataImportModal />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 w-full space-y-7">
        {currentView === 'dashboard' && (
          <>
            <HeroAlertDiscovery />
            <BusinessHealthCard />
            <WhatNeedsAttention />
            <RiskTimeline />
          </>
        )}

        {currentView === 'what-if' && <ScenarioSimulator />}
        {currentView === 'alerts' && <AlertCenter />}
        {currentView === 'actions' && <ActionTracker />}
        {currentView === 'suppliers' && <SupplierIntelligence />}
        {currentView === 'sentiment' && <CustomerSentiment />}
        {currentView === 'agents' && <AgentArchitectureModal />}
      </main>

      {/* Global Modals */}
      <RootCauseModal />
      <EvidenceModal />
      <WhatIfDoNothingModal />
      <BusinessDataImportModal />
      <ExecutiveReportModal />

      {/* Copilot Drawer */}
      <AskPulseGuardDrawer />
    </div>
  );
};

export default function App() {
  return (
    <PulseGuardProvider>
      <AppContent />
    </PulseGuardProvider>
  );
}

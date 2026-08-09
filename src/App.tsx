import React, { useState, useEffect } from 'react';
import { ActiveTab, WorkingPaper } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { RepresentationView } from './views/RepresentationView';
import { EconomyView } from './views/EconomyView';
import { PrecedentsView } from './views/PrecedentsView';
import { ParticipateView } from './views/ParticipateView';
import { ResourcesView } from './views/ResourcesView';
import { AiShuraAssistant } from './components/AiShuraAssistant';
import { DocumentReaderModal } from './components/DocumentReaderModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<WorkingPaper | null>(null);

  // Sync window hash for deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ActiveTab;
      if (['home', 'about', 'representation', 'economy', 'precedents', 'participate', 'resources'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  return (
    <div className="min-h-screen bg-[#07130e] text-slate-100 flex flex-col font-sans selection:bg-[#d8aa28] selection:text-[#07130e]">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={handleTabChange}
            onOpenAiAssistant={() => setAiAssistantOpen(true)}
            onSelectPaper={(paper) => setSelectedPaper(paper)}
          />
        )}

        {activeTab === 'about' && (
          <AboutView setActiveTab={handleTabChange} />
        )}

        {activeTab === 'representation' && (
          <RepresentationView setActiveTab={handleTabChange} />
        )}

        {activeTab === 'economy' && (
          <EconomyView setActiveTab={handleTabChange} />
        )}

        {activeTab === 'precedents' && (
          <PrecedentsView setActiveTab={handleTabChange} />
        )}

        {activeTab === 'participate' && (
          <ParticipateView setActiveTab={handleTabChange} />
        )}

        {activeTab === 'resources' && (
          <ResourcesView
            setActiveTab={handleTabChange}
            onSelectPaper={(paper) => setSelectedPaper(paper)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={handleTabChange}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
      />

      {/* AI Shūrā Assistant Modal */}
      <AiShuraAssistant
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
      />

      {/* Working Paper Full Reader Modal */}
      <DocumentReaderModal
        paper={selectedPaper}
        onClose={() => setSelectedPaper(null)}
      />
    </div>
  );
}

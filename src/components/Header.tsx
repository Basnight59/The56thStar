import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { Sparkles, Bot, Menu, X, Globe, Scale, Calculator, BookOpen, Users, FileText, Info } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAiAssistant: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenAiAssistant }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Globe className="w-4 h-4" /> },
    { id: 'about', label: 'What Is It?', icon: <Info className="w-4 h-4" /> },
    { id: 'representation', label: 'Why Representation?', icon: <Scale className="w-4 h-4" /> },
    { id: 'economy', label: 'Economic Capacity', icon: <Calculator className="w-4 h-4" /> },
    { id: 'precedents', label: 'Precedents', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'participate', label: 'Participate', icon: <Users className="w-4 h-4" /> },
    { id: 'resources', label: 'Resources', icon: <FileText className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c1a14]/95 backdrop-blur-md border-b border-[#223d32] text-slate-100">
      {/* Constitutional Notice Ticker */}
      <div className="bg-[#07130e] text-[#e1ca72] text-xs py-1.5 px-4 border-b border-[#1b3127] font-medium flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2 max-w-6xl mx-auto w-full">
          <span className="bg-[#d8aa28] text-[#07130e] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0">
            Shūrā Notice
          </span>
          <p className="truncate text-slate-300">
            <span className="text-[#f1ca54] font-semibold">CONSTITUTIONAL NOTICE:</span> No individual or organization claims authority to answer these questions for the Diaspora. The answer must emerge through Shūrā.
          </p>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d8aa28] to-[#9e7912] p-0.5 shadow-lg shadow-[#d8aa28]/10 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-[#0c1a14] rounded-[10px] flex items-center justify-center text-[#f1ca54] font-extrabold text-xl">
              ⭐
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#f1ca54] transition-colors">
                The 56th Star
              </span>
              <span className="text-[10px] font-mono uppercase bg-[#183327] text-[#81c7a5] px-2 py-0.5 rounded border border-[#274f3d]">
                v0.1 POC
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans tracking-wide">
              Sixth Region Constitutional Consultation • Sphinx Analysis
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-150 ${
                  isActive
                    ? 'bg-[#183327] text-[#f1ca54] border border-[#2e5946] shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-[#13261d]'
                }`}
              >
                <span className={isActive ? 'text-[#f1ca54]' : 'text-slate-400'}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* AI Shūrā Assistant Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-2 bg-gradient-to-r from-[#d8aa28] to-[#b38814] text-[#07130e] hover:from-[#e1ba42] hover:to-[#c4981a] font-bold text-xs sm:text-sm px-3.5 py-2 rounded-lg shadow-md hover:shadow-lg shadow-[#d8aa28]/20 transition-all active:scale-95 cursor-pointer"
            title="Ask AI Shūrā Advisor"
          >
            <Bot className="w-4 h-4 text-[#07130e]" />
            <span className="hidden sm:inline">AI Shūrā Advisor</span>
            <span className="sm:hidden">AI Advisor</span>
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#07130e]" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-[#13261d] border border-[#223d32] text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#f1ca54]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0c1a14] border-b border-[#223d32] px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-left transition-colors ${
                  isActive
                    ? 'bg-[#183327] text-[#f1ca54] border border-[#2e5946]'
                    : 'text-slate-300 hover:bg-[#13261d] hover:text-white'
                }`}
              >
                <span className={isActive ? 'text-[#f1ca54]' : 'text-slate-400'}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

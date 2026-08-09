import React from 'react';
import { ActiveTab, WorkingPaper } from '../types';
import { LEGITIMACY_CHAIN } from '../data/legitimacyChain';
import { WORKING_PAPERS } from '../data/papers';
import { ArrowRight, Sparkles, Scale, Calculator, Users, BookOpen, ShieldCheck, CheckCircle2, ChevronRight, FileText, Globe } from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAiAssistant: () => void;
  onSelectPaper: (paper: WorkingPaper) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab, onOpenAiAssistant, onSelectPaper }) => {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0e241b] via-[#081811] to-[#0c1a14] border border-[#214233] p-8 sm:p-12 lg:p-16 text-center space-y-8 shadow-2xl">
        {/* Subtle Background Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#d8aa28]/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="inline-flex items-center gap-2 bg-[#142d22] border border-[#d8aa28]/40 text-[#f1ca54] px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#d8aa28]" />
          <span>A Sphinx Analysis Proof-of-Concept</span>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
            THE 56TH STAR
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-[#e2ede8] font-light leading-snug">
            Could the African Union’s Sixth Region evolve from an advisory constituency into a substantive institutional voice?
          </p>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            This is not an announcement. It is an invitation to decide.
          </p>
        </div>

        {/* Hero Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setActiveTab('about')}
            className="bg-gradient-to-r from-[#d8aa28] to-[#b38814] hover:from-[#e1ba42] hover:to-[#c4981a] text-[#07130e] font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-[#d8aa28]/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Read the Invitation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('participate')}
            className="bg-[#0e261c] hover:bg-[#16382a] border border-[#234d38] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <Users className="w-4 h-4 text-[#f1ca54]" />
            <span>Join Consultation Registry</span>
          </button>
          <button
            onClick={onOpenAiAssistant}
            className="bg-[#122c20] hover:bg-[#1b3d2c] border border-[#2d5945] text-[#f1ca54] font-bold text-sm px-6 py-3.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#d8aa28]" />
            <span>AI Shūrā Assistant</span>
          </button>
        </div>

        {/* Hero Quote */}
        <blockquote className="pt-8 border-t border-[#183528] max-w-3xl mx-auto font-serif italic text-base sm:text-lg text-[#f4d777] leading-relaxed">
          “No one speaks for 150+ million people until those people have been given a meaningful opportunity to speak for themselves.”
        </blockquote>
      </section>

      {/* Central Question Callout */}
      <section className="bg-[#0b1b14] border border-[#1e3b2e] rounded-2xl p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-[#f1ca54] font-mono text-xs font-bold uppercase tracking-wider">
          <Globe className="w-4 h-4 text-[#d8aa28]" />
          <span>The Constitutional Inquiry</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          The Central Question
        </h2>
        <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
          The African Union recognizes the African Diaspora as its Sixth Region. The consultation asks whether the relationship should remain principally consultative or develop toward meaningful representation, institutional standing, economic coordination, and — if the people choose — a pathway toward recognized international personality.
        </p>
        <div className="bg-[#07130e] border-l-4 border-[#d8aa28] p-4 rounded-r-lg text-xs text-slate-300 font-mono">
          <strong className="text-[#f1ca54]">Open by design:</strong> Preliminary architecture serves Shūrā; it does not predetermine the conclusion.
        </div>
      </section>

      {/* Five Dimensions of Consultation */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase text-[#f1ca54] font-bold tracking-wider">
            Consultation Scope
          </span>
          <h2 className="font-serif text-3xl font-bold text-white">
            Five Dimensions Under Consultation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            {
              title: 'Recognition',
              desc: 'Clarify historical and institutional standing under international public law.',
              icon: <Scale className="w-5 h-5 text-emerald-400" />
            },
            {
              title: 'Representation',
              desc: 'Examine advisory versus substantive political voice in Pan-African forums.',
              icon: <Users className="w-5 h-5 text-amber-400" />
            },
            {
              title: 'Restoration',
              desc: 'Study lawful pathways for return, land settlement, repair, and cultural restoration.',
              icon: <ShieldCheck className="w-5 h-5 text-[#d8aa28]" />
            },
            {
              title: 'Development',
              desc: 'Model capital, expertise, innovation, and intellectual asset mobilization.',
              icon: <Calculator className="w-5 h-5 text-sky-400" />
            },
            {
              title: 'Legacy',
              desc: 'Build enduring institutions designed for multi-generational continuity.',
              icon: <BookOpen className="w-5 h-5 text-rose-400" />
            }
          ].map((dim, idx) => (
            <div
              key={idx}
              className="bg-[#0b1b14] border border-[#1d3a2c] hover:border-[#d8aa28]/50 p-6 rounded-xl space-y-3 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#07130e] border border-[#1b382a] flex items-center justify-center">
                {dim.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#f1ca54] transition-colors">
                {dim.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {dim.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Economic Calculator Feature Card */}
        <div className="bg-gradient-to-br from-[#0c2419] to-[#07150f] border border-[#1e4231] p-6 rounded-2xl space-y-4 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-[#183829] flex items-center justify-center text-[#f1ca54]">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-white">
              Economic Scenario Model
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Model a multi-billion dollar voluntary civic development pool across 160M diaspora members.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('economy')}
            className="text-xs text-[#f1ca54] font-bold flex items-center gap-1.5 hover:underline pt-2"
          >
            <span>Open Interactive Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Precedents Card */}
        <div className="bg-gradient-to-br from-[#0c2419] to-[#07150f] border border-[#1e4231] p-6 rounded-2xl space-y-4 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-[#183829] flex items-center justify-center text-[#f1ca54]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-white">
              Comparative Precedents
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Study Holy See, Sovereign Order of Malta, Ireland, and pre-state models of international personality.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('precedents')}
            className="text-xs text-[#f1ca54] font-bold flex items-center gap-1.5 hover:underline pt-2"
          >
            <span>Explore Legal Analogy Study</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Working Papers Card */}
        <div className="bg-gradient-to-br from-[#0c2419] to-[#07150f] border border-[#1e4231] p-6 rounded-2xl space-y-4 shadow-lg md:col-span-2 lg:col-span-1">
          <div className="w-10 h-10 rounded-xl bg-[#183829] flex items-center justify-center text-[#f1ca54]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-white">
              Sphinx Working Papers
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Access the foundational legal, macroeconomic, and technological research repository.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('resources')}
            className="text-xs text-[#f1ca54] font-bold flex items-center gap-1.5 hover:underline pt-2"
          >
            <span>Browse Research Papers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Featured Working Papers Row */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-[#f1ca54] font-bold tracking-wider">
              Research Repository
            </span>
            <h2 className="font-serif text-2xl font-bold text-white">
              Featured Working Papers
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('resources')}
            className="text-xs text-[#f1ca54] hover:underline font-bold flex items-center gap-1"
          >
            <span>View All Papers</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WORKING_PAPERS.slice(0, 2).map((paper) => (
            <div
              key={paper.id}
              onClick={() => onSelectPaper(paper)}
              className="bg-[#0b1b14] border border-[#1d3a2c] hover:border-[#d8aa28]/60 p-6 rounded-2xl space-y-3 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#f1ca54] bg-[#07130e] px-2.5 py-0.5 rounded border border-[#183326] font-bold">
                  {paper.category}
                </span>
                <span className="text-slate-400">{paper.datePublished}</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#f1ca54] transition-colors">
                {paper.title}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2">
                {paper.summary}
              </p>
              <div className="text-xs font-bold text-[#f1ca54] flex items-center gap-1 pt-1">
                <span>Read Full Paper →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

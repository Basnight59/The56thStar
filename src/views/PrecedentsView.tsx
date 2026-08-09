import React from 'react';
import { ActiveTab } from '../types';
import { PrecedentsViewer } from '../components/PrecedentsViewer';
import { BookOpen } from 'lucide-react';

interface PrecedentsViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const PrecedentsView: React.FC<PrecedentsViewProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-12 py-8">
      {/* Page Header */}
      <div className="bg-[#0b1b14] border border-[#1e3b2e] rounded-3xl p-8 sm:p-12 space-y-4 text-center">
        <div className="inline-flex items-center gap-2 bg-[#142d22] border border-[#d8aa28]/40 text-[#f1ca54] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-[#d8aa28]" />
          <span>Legal & Historical Precedents</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
          Comparative Legal Analysis
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Analogies for study, not interchangeable legal precedents. Examining how non-territorial entities achieve recognized international personality.
        </p>
      </div>

      {/* Embedded Precedents Viewer */}
      <section>
        <PrecedentsViewer />
      </section>
    </div>
  );
};

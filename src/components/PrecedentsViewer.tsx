import React, { useState } from 'react';
import { PRECEDENTS } from '../data/precedents';
import { PrecedentItem } from '../types';
import { BookOpen, Scale, ShieldAlert, FileText, CheckCircle, ExternalLink, Info } from 'lucide-react';

export const PrecedentsViewer: React.FC = () => {
  const [selectedPrecedent, setSelectedPrecedent] = useState<PrecedentItem>(PRECEDENTS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Non-Territorial Statehood', 'Diaspora Political Evolution', 'Institutional Pre-Statehood'];

  const filtered = PRECEDENTS.filter(p => activeCategory === 'All' || p.category === activeCategory);

  return (
    <div className="bg-[#0b1b14] border border-[#1e3b2e] rounded-2xl p-6 sm:p-8 space-y-8 text-slate-100 shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1d382c] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#f1ca54] font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4 text-[#d8aa28]" />
            <span>Comparative Constitutional Education</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Paths to International Personality
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Studying historical analogies, legal mechanisms, and non-territorial precedents to inform Sixth Region constitutional design.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#07130e] p-1.5 rounded-xl border border-[#1a3328]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-[#183527] text-[#f1ca54] border border-[#d8aa28]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Comparative Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* List of Precedent Cards */}
        <div className="lg:col-span-5 space-y-4">
          {filtered.map((item) => {
            const isSelected = selectedPrecedent.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedPrecedent(item)}
                className={`p-5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-[#142d22] border-[#d8aa28] shadow-lg shadow-[#d8aa28]/10'
                    : 'bg-[#07130e] border-[#183326] hover:bg-[#0f241a] hover:border-[#224736]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#f1ca54] uppercase bg-[#0e2118] px-2 py-0.5 rounded border border-[#1b3b2c]">
                    {item.category}
                  </span>
                  {isSelected && <span className="text-xs font-bold text-[#f1ca54]">Active Study →</span>}
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* Detail Analysis Panel */}
        <div className="lg:col-span-7 bg-[#07130e] border border-[#1d3a2c] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#183326] pb-4 space-y-1">
            <div className="text-xs font-mono text-[#d8aa28] uppercase font-bold tracking-wider">
              {selectedPrecedent.category}
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              {selectedPrecedent.title}
            </h3>
            <p className="text-sm text-slate-300 italic">
              {selectedPrecedent.subtitle}
            </p>
          </div>

          {/* Lessons */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Core Institutional Lesson</span>
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed bg-[#0b1b14] p-4 rounded-lg border border-[#163326]">
              {selectedPrecedent.lesson}
            </p>
          </div>

          {/* Limits */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Constitutional Limits & Distinctions</span>
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-[#171208] p-4 rounded-lg border border-[#382b13]">
              {selectedPrecedent.limits}
            </p>
          </div>

          {/* Relevance */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#f1ca54] uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-[#d8aa28]" />
              <span>Applicability to Sixth Region</span>
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedPrecedent.relevance}
            </p>
          </div>

          {/* Key Reference Documents */}
          <div className="space-y-2 pt-2 border-t border-[#183326]">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
              Key Documents for Law & History Scholars
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedPrecedent.keyDocs.map((doc, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-[#0e2118] text-slate-300 border border-[#1b3b2c] px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#d8aa28]" />
                  <span>{doc}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

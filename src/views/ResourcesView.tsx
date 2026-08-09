import React, { useState } from 'react';
import { ActiveTab, WorkingPaper } from '../types';
import { WORKING_PAPERS } from '../data/papers';
import { LegitimacyChain } from '../components/LegitimacyChain';
import { KnowledgeBaseManager } from '../components/KnowledgeBaseManager';
import { FileText, Search, BookOpen, User, Calendar, ArrowRight, FolderPlus } from 'lucide-react';

interface ResourcesViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectPaper: (paper: WorkingPaper) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ setActiveTab, onSelectPaper }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showKbUploader, setShowKbUploader] = useState(false);

  const categories = ['All', 'Foundation Documents', 'Economic Analysis', 'Constitutional Framework', 'Research Archive'];

  const filteredPapers = WORKING_PAPERS.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.toLowerCase().includes(search.toLowerCase()) ||
      p.fullText.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-12 py-8">
      {/* Page Header */}
      <div className="bg-[#0b1b14] border border-[#1e3b2e] rounded-3xl p-8 sm:p-12 space-y-4 text-center">
        <div className="inline-flex items-center gap-2 bg-[#142d22] border border-[#d8aa28]/40 text-[#f1ca54] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5 text-[#d8aa28]" />
          <span>Sphinx Analysis Working Library</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
          Working Papers & Knowledge Repository
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Open-access research papers and proprietary dataset uploads for peer critique, public review, and constitutional refinement.
        </p>
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => setShowKbUploader(!showKbUploader)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#d8aa28] to-[#b88f1d] hover:from-[#e8b933] hover:to-[#c79c24] text-[#07130e] font-bold font-mono px-5 py-2.5 rounded-xl shadow-lg transition-all cursor-pointer text-xs"
          >
            <FolderPlus className="w-4 h-4" />
            <span>{showKbUploader ? 'Hide Knowledge Base Manager' : 'Upload / Paste Custom Research Datasets'}</span>
          </button>
        </div>
      </div>

      {/* Proprietary Research Knowledge Base Manager Section */}
      {showKbUploader && (
        <section className="animate-fadeIn">
          <KnowledgeBaseManager />
        </section>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-[#0b1b14] border border-[#1e3b2e] rounded-2xl p-6 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search working papers by title, keyword, or concept..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#07130e] border border-[#1d3a2c] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#d8aa28] transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-[#07130e] p-1.5 rounded-xl border border-[#1a3328] w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#183527] text-[#f1ca54] border border-[#d8aa28]/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPapers.map((paper) => (
          <div
            key={paper.id}
            onClick={() => onSelectPaper(paper)}
            className="bg-[#0b1b14] border border-[#1d3a2c] hover:border-[#d8aa28]/60 p-6 rounded-2xl space-y-4 cursor-pointer transition-all group shadow-md"
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#f1ca54] bg-[#07130e] px-2.5 py-0.5 rounded border border-[#183326] font-bold">
                {paper.category}
              </span>
              <span className="text-slate-400 font-mono">{paper.id.toUpperCase()}</span>
            </div>

            <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#f1ca54] transition-colors">
              {paper.title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
              {paper.summary}
            </p>

            <div className="pt-2 border-t border-[#163326] flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#d8aa28]" />
                {paper.author}
              </span>
              <span className="text-[#f1ca54] font-bold group-hover:underline flex items-center gap-1">
                Read Paper <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Embedded Knowledge Base Manager if not toggled above */}
      {!showKbUploader && (
        <section className="bg-[#0b1b14] border border-[#1e3b2e] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#183527] pb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#f1ca54]">
                Proprietary Research Dataset Manager
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Upload or paste custom proprietary research papers and legal notes. The AI Shūrā Advisor automatically consults all enabled documents.
              </p>
            </div>
          </div>
          <KnowledgeBaseManager />
        </section>
      )}

      {/* Legitimacy Chain Section Embedded */}
      <section className="pt-8">
        <LegitimacyChain />
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { LEGITIMACY_CHAIN } from '../data/legitimacyChain';
import { LegitimacyStep } from '../types';
import { ShieldCheck, CheckCircle2, Clock, AlertCircle, ArrowRight, ChevronRight, Check } from 'lucide-react';

export const LegitimacyChain: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<LegitimacyStep | null>(LEGITIMACY_CHAIN[0]);
  const [filter, setFilter] = useState<'All' | 'Completed' | 'In Progress' | 'Upcoming'>('All');

  const filteredSteps = LEGITIMACY_CHAIN.filter(s => filter === 'All' || s.status === filter);

  const getStatusBadge = (status: LegitimacyStep['status']) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="flex items-center gap-1 text-[11px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </span>
        );
      case 'In Progress':
        return (
          <span className="flex items-center gap-1 text-[11px] font-mono font-bold bg-amber-950/80 text-amber-400 border border-amber-800/60 px-2.5 py-0.5 rounded-full animate-pulse">
            <Clock className="w-3 h-3" />
            In Progress
          </span>
        );
      case 'Upcoming':
        return (
          <span className="flex items-center gap-1 text-[11px] font-mono font-bold bg-slate-900 text-slate-400 border border-slate-700 px-2.5 py-0.5 rounded-full">
            <AlertCircle className="w-3 h-3" />
            Upcoming
          </span>
        );
    }
  };

  return (
    <div className="bg-[#0b1b14] border border-[#1e3b2e] rounded-2xl p-6 sm:p-8 space-y-8 text-slate-100 shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1d382c] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#f1ca54] font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-[#d8aa28]" />
            <span>Sovereign Process Validation</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            The 9-Step Legitimacy Chain
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Legitimacy cannot be declared by fiat. It must be constructed step-by-step through research, peer critique, public consultation, and ratification.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#07130e] p-1.5 rounded-xl border border-[#1a3328]">
          {(['All', 'Completed', 'In Progress', 'Upcoming'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === f
                  ? 'bg-[#183527] text-[#f1ca54] border border-[#d8aa28]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-slate-400">
          <span>Legitimacy Sequence Progress</span>
          <span className="text-[#f1ca54] font-bold">Step 2 & 3 Active in Parallel</span>
        </div>
        <div className="grid grid-cols-9 gap-1 sm:gap-2">
          {LEGITIMACY_CHAIN.map((step) => {
            let color = 'bg-[#13281f] text-slate-500 border-[#1c382b]';
            if (step.status === 'Completed') color = 'bg-emerald-600 text-white border-emerald-400';
            if (step.status === 'In Progress') color = 'bg-[#d8aa28] text-[#07130e] border-[#f1ca54] font-black shadow-md shadow-[#d8aa28]/20';

            return (
              <button
                key={step.stepNumber}
                onClick={() => setSelectedStep(step)}
                className={`h-10 rounded-lg border font-mono text-xs sm:text-sm font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${color} ${
                  selectedStep?.stepNumber === step.stepNumber ? 'ring-2 ring-white scale-105' : ''
                }`}
                title={`Step ${step.stepNumber}: ${step.title}`}
              >
                <span>{step.stepNumber}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid: Step List + Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredSteps.map((step) => {
            const isSelected = selectedStep?.stepNumber === step.stepNumber;
            return (
              <div
                key={step.stepNumber}
                onClick={() => setSelectedStep(step)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#142d22] border-[#d8aa28] shadow-lg shadow-[#d8aa28]/10'
                    : 'bg-[#07130e] border-[#183326] hover:bg-[#0f241a] hover:border-[#224736]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      step.status === 'Completed'
                        ? 'bg-emerald-500 text-[#07130e]'
                        : step.status === 'In Progress'
                        ? 'bg-[#d8aa28] text-[#07130e]'
                        : 'bg-[#183326] text-slate-400'
                    }`}
                  >
                    {step.stepNumber}
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-white">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {step.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-[#f1ca54] translate-x-1' : 'text-slate-600'}`} />
              </div>
            );
          })}
        </div>

        {/* Selected Step Detail Panel */}
        <div className="lg:col-span-7">
          {selectedStep ? (
            <div className="bg-[#07130e] border border-[#1d3a2c] rounded-xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#183326] pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#d8aa28] text-[#07130e] font-mono font-black text-lg flex items-center justify-center">
                    {selectedStep.stepNumber}
                  </span>
                  <div>
                    <span className="text-xs font-mono uppercase text-[#f1ca54] tracking-wider block">
                      Legitimacy Step {selectedStep.stepNumber} of 9
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      {selectedStep.title}
                    </h3>
                  </div>
                </div>
                <div>{getStatusBadge(selectedStep.status)}</div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                  Scope & Activity
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-[#0b1b14] p-4 rounded-lg border border-[#163326]">
                  {selectedStep.description}
                </p>
              </div>

              {/* Rationale */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                  Constitutional Rationale
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{selectedStep.rationale}"
                </p>
              </div>

              {/* Key Deliverables */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                  Key Deliverables & Artifacts
                </h4>
                <div className="space-y-2">
                  {selectedStep.keyDeliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-xs text-slate-200 bg-[#0e2118] p-3 rounded-lg border border-[#1b3b2c]"
                    >
                      <div className="w-4 h-4 rounded bg-[#d8aa28]/20 border border-[#d8aa28]/50 flex items-center justify-center shrink-0 text-[#f1ca54]">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#07130e] border border-[#1d3a2c] rounded-xl p-8 text-center text-slate-500 font-mono text-xs">
              Select a step to view detailed rationale and deliverables.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

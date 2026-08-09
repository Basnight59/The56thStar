import React from 'react';
import { ActiveTab } from '../types';
import { ConsultationRegistry } from '../components/ConsultationRegistry';
import { Users, ShieldCheck, ArrowRight, BookOpen, Code, Scale } from 'lucide-react';

interface ParticipateViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const ParticipateView: React.FC<ParticipateViewProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-12 py-8">
      {/* Page Header */}
      <div className="bg-[#0b1b14] border border-[#1e3b2e] rounded-3xl p-8 sm:p-12 space-y-4 text-center">
        <div className="inline-flex items-center gap-2 bg-[#142d22] border border-[#d8aa28]/40 text-[#f1ca54] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
          <Users className="w-3.5 h-3.5 text-[#d8aa28]" />
          <span>Shūrā Participation Pathways</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
          Participate in Consultation
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Participation does not require agreement. Critique, rejection, alternative models, and dissent belong in the official record.
        </p>
      </div>

      {/* Three Pathways */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase text-[#f1ca54] font-bold tracking-wider">
            Consultation Architecture
          </span>
          <h2 className="font-serif text-3xl font-bold text-white">
            Three Parallel Shūrā Tiers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0b1b14] border border-[#1d3a2c] p-6 rounded-2xl space-y-3">
            <span className="text-xs font-mono text-[#f1ca54] font-bold uppercase bg-[#07130e] px-2.5 py-0.5 rounded border border-[#183326]">
              Tier 1 • Technical
            </span>
            <h3 className="font-serif text-xl font-bold text-white">
              Technical Review Panel
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Scholars, jurists, economists, historians, actuaries, technologists, and educators conducting peer critique on working papers.
            </p>
          </div>

          <div className="bg-[#0b1b14] border border-[#1d3a2c] p-6 rounded-2xl space-y-3">
            <span className="text-xs font-mono text-[#f1ca54] font-bold uppercase bg-[#07130e] px-2.5 py-0.5 rounded border border-[#183326]">
              Tier 2 • Institutional
            </span>
            <h3 className="font-serif text-xl font-bold text-white">
              Institutional Dialogue
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Existing Sixth Region organizations, universities, professional bodies, civil society, and religious and community institutions.
            </p>
          </div>

          <div className="bg-[#0b1b14] border border-[#1d3a2c] p-6 rounded-2xl space-y-3">
            <span className="text-xs font-mono text-[#f1ca54] font-bold uppercase bg-[#07130e] px-2.5 py-0.5 rounded border border-[#183326]">
              Tier 3 • Public Shūrā
            </span>
            <h3 className="font-serif text-xl font-bold text-white">
              Global Public Review
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Broad-based public consultation across North America, Caribbean, Latin America, Europe, Middle East, and Africa-based returnee hubs.
            </p>
          </div>
        </div>
      </section>

      {/* Embedded Registration Form & Registry */}
      <section>
        <ConsultationRegistry />
      </section>
    </div>
  );
};

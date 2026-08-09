import React from 'react';
import { ActiveTab } from '../types';
import { Info, CheckCircle2, XCircle, ShieldCheck, Scale, Globe, ArrowRight } from 'lucide-react';

interface AboutViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-12 py-8">
      {/* Page Header */}
      <div className="bg-[#0b1b14] border border-[#1e3b2e] rounded-3xl p-8 sm:p-12 space-y-4 text-center">
        <div className="inline-flex items-center gap-2 bg-[#142d22] border border-[#d8aa28]/40 text-[#f1ca54] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
          <Info className="w-3.5 h-3.5 text-[#d8aa28]" />
          <span>Proof of Concept • Version 0.1</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
          What Is The 56th Star Initiative?
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          A research-led invitation to constitutional dialogue concerning the African Union’s Sixth Region.
        </p>
      </div>

      {/* The Symbol Explanation */}
      <section className="bg-[#07130e] border border-[#1d3a2c] rounded-2xl p-8 space-y-4">
        <div className="flex items-center gap-2 text-[#f1ca54] font-mono text-xs font-bold uppercase tracking-wider">
          <Globe className="w-4 h-4 text-[#d8aa28]" />
          <span>The Symbolic & Legal Basis</span>
        </div>
        <h2 className="font-serif text-2xl font-bold text-white">
          Why "The 56th Star"?
        </h2>
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
          The African Union currently consists of <strong>55 member states</strong> on the African continent. In 2003, the AU formally designated the African Diaspora as its official <strong>Sixth Region</strong>. 
        </p>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          “The 56th Star” is offered as one concrete exercise of the participation invited by <strong>Article 3(q) of the AU Constitutive Act</strong>, which encourages the full participation of the African Diaspora as an important constituent of the continent. It is not a claim that a new sovereign territorial state already exists, but a constitutional inquiry: <em>Could the Sixth Region eventually develop into a recognized, substantive 56th institutional voice of Africa?</em>
        </p>
        <div className="bg-[#0e2118] border-l-4 border-[#d8aa28] p-4 rounded-r-lg text-xs text-slate-300 font-mono mt-2">
          <strong className="text-[#f1ca54]">Uncharted Waters Posture:</strong> These materials contain working assumptions developed in largely uncharted institutional space and are submitted for professional examination, challenge, and refinement under the Shūrā Mandate.
        </div>
      </section>

      {/* What It Does vs What It Does Not Do */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase text-[#f1ca54] font-bold tracking-wider">
            Scope Boundaries
          </span>
          <h2 className="font-serif text-3xl font-bold text-white">
            Clear Constitutional Scope
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* What It Does */}
          <div className="bg-[#0b1b14] border border-emerald-500/30 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-serif text-xl font-bold border-b border-emerald-500/20 pb-3">
              <CheckCircle2 className="w-6 h-6 shrink-0" />
              <h3>What The Initiative Does</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-200">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Invites Shūrā:</strong> Convenes worldwide open consultation across diaspora regions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Publishes Research:</strong> Releases open working papers on law, economics, and history.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Models Scenarios:</strong> Provides transparent actuarial tools for voluntary capital pools.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Engages Existing Bodies:</strong> Dialogues with AU ECOSOCC, diaspora ministries, and civil society.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Preserves TTL Audit:</strong> Maintains cryptographic public ledgers and open source code.</span>
              </li>
            </ul>
          </div>

          {/* What It Does NOT Do */}
          <div className="bg-[#190c0d] border border-rose-500/30 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-serif text-xl font-bold border-b border-rose-500/20 pb-3">
              <XCircle className="w-6 h-6 shrink-0" />
              <h3>What The Initiative Does NOT Do</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-200">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>No Self-Appointed Authority:</strong> Claims no universal mandate to speak for all 150M+ diaspora members.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>No Citizenship Issuance:</strong> Does not issue passports, legal status, or replace municipal identity.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>No Government by Fiat:</strong> Rejects un-ratified declarations of provisional statehood.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>No Mandatory Taxation:</strong> All economic models rely strictly on voluntary civic contributions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>No Genetic Harvesting:</strong> Strictly forbids raw DNA or intrusive biometric data collection.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Governance Philosophy & TTL */}
      <section className="bg-[#07130e] border border-[#1d3a2c] rounded-2xl p-8 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#f1ca54] font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#d8aa28]" />
            <span>Foundational Protocol</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">
            TTL Governance: Truth, Transparency, Legacy
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#0b1b14] p-5 rounded-xl border border-[#183326] space-y-2">
            <h4 className="font-serif text-lg font-bold text-[#f1ca54]">Truth (T)</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Grounded in primary legal sources, rigorous actuarial modeling, historical honesty, and rejection of performative marketing.
            </p>
          </div>
          <div className="bg-[#0b1b14] p-5 rounded-xl border border-[#183326] space-y-2">
            <h4 className="font-serif text-lg font-bold text-[#f1ca54]">Transparency (T)</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every consultation record, survey tally, code commit, and fund covenant is open to public audit and critique.
            </p>
          </div>
          <div className="bg-[#0b1b14] p-5 rounded-xl border border-[#183326] space-y-2">
            <h4 className="font-serif text-lg font-bold text-[#f1ca54]">Legacy (L)</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Building constitutional institutions and capital vaults designed to survive their founders for multi-generational continuity.
            </p>
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <button
            onClick={() => setActiveTab('participate')}
            className="bg-gradient-to-r from-[#d8aa28] to-[#b38814] hover:from-[#e1ba42] hover:to-[#c4981a] text-[#07130e] font-extrabold text-sm px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Participate in Shūrā Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

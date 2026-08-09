import React from 'react';
import { ActiveTab } from '../types';
import { SurveyWidget } from '../components/SurveyWidget';
import { Scale, Users, Building2, ShieldCheck, Check, ArrowRight } from 'lucide-react';

interface RepresentationViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const RepresentationView: React.FC<RepresentationViewProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-12 py-8">
      {/* Page Header */}
      <div className="bg-[#0b1b14] border border-[#1e3b2e] rounded-3xl p-8 sm:p-12 space-y-4 text-center">
        <div className="inline-flex items-center gap-2 bg-[#142d22] border border-[#d8aa28]/40 text-[#f1ca54] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5 text-[#d8aa28]" />
          <span>Sixth Region Governance</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
          Why Substantive Representation?
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Recognition without decision rights raises a fundamental constitutional question about democratic representation.
        </p>
      </div>

      {/* The Governance Dilemma */}
      <section className="bg-[#07130e] border border-[#1d3a2c] rounded-2xl p-8 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-[#f1ca54] font-bold tracking-wider">
            Comparative Analysis
          </span>
          <h2 className="font-serif text-2xl font-bold text-white">
            Advisory Status vs Substantive Representation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0b1b14] border border-[#1b3528] p-6 rounded-xl space-y-3">
            <h3 className="font-serif text-lg font-bold text-slate-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
              Current Status: Advisory Bodies
            </h3>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-slate-500 font-bold">•</span>
                <span>Civil society consultations with non-binding recommendations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-500 font-bold">•</span>
                <span>No direct voting power in AU Assembly or legislative councils.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-500 font-bold">•</span>
                <span>Fragmented regional councils without self-governing funds.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-500 font-bold">•</span>
                <span>Vulnerable to administrative changes without constituent recall mechanisms.</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#0c2419] border border-[#d8aa28]/40 p-6 rounded-xl space-y-3 shadow-lg">
            <h3 className="font-serif text-lg font-bold text-[#f1ca54] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d8aa28]" />
              Proposed: Accountable Representation
            </h3>
            <ul className="space-y-2 text-xs text-slate-200 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#f1ca54] font-bold">•</span>
                <span>Directly elected or delegated representatives with defined constituent mandates.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f1ca54] font-bold">•</span>
                <span>Binding vote or veto rights on Sixth Region policy and fund covenants.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f1ca54] font-bold">•</span>
                <span>Independent Sovereign Fund governance audited via TTL ledgers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f1ca54] font-bold">•</span>
                <span>Clear constitutional rules for election, term limits, and recall.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase text-[#f1ca54] font-bold tracking-wider">
            Institutional Pillars
          </span>
          <h2 className="font-serif text-3xl font-bold text-white">
            Four Pillars of Sixth Region Governance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Political Voice',
              desc: 'Transparent democratic mandate giving the diaspora structured representation in Pan-African forums.'
            },
            {
              title: 'Economic Institutions',
              desc: 'Self-governing sovereign development funds, investment vaults, and professional trade networks.'
            },
            {
              title: 'Constitutional Standing',
              desc: 'Clear legal charter defining rights, responsibilities, accountability safeguards, and recall rules.'
            },
            {
              title: 'Intergenerational Continuity',
              desc: 'Durable institutions engineered to outlive initial founders and serve future generations.'
            }
          ].map((pillar, idx) => (
            <div key={idx} className="bg-[#0b1b14] border border-[#1d3a2c] p-6 rounded-xl space-y-2">
              <span className="text-xs font-mono text-[#f1ca54] font-bold">Pillar 0{idx + 1}</span>
              <h3 className="font-serif text-lg font-bold text-white">{pillar.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Embedded Opinion Gauging Survey */}
      <section>
        <SurveyWidget />
      </section>
    </div>
  );
};

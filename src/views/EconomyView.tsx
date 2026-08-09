import React from 'react';
import { ActiveTab } from '../types';
import { EconomicCalculator } from '../components/EconomicCalculator';
import { Calculator, TrendingUp, DollarSign, Building2, ShieldCheck, ArrowRight } from 'lucide-react';

interface EconomyViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const EconomyView: React.FC<EconomyViewProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-12 py-8">
      {/* Page Header */}
      <div className="bg-[#0b1b14] border border-[#1e3b2e] rounded-3xl p-8 sm:p-12 space-y-4 text-center">
        <div className="inline-flex items-center gap-2 bg-[#142d22] border border-[#d8aa28]/40 text-[#f1ca54] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
          <Calculator className="w-3.5 h-3.5 text-[#d8aa28]" />
          <span>Macroeconomic Self-Determination</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
          Beyond Remittances
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Remittance flows measure consumption transfers, not the full asset base and strategic capital potential of the global Sixth Region.
        </p>
      </div>

      {/* Conceptual Differentiator */}
      <section className="bg-[#07130e] border border-[#1d3a2c] rounded-2xl p-8 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-[#f1ca54] font-bold tracking-wider">
            Economic Distinction
          </span>
          <h2 className="font-serif text-2xl font-bold text-white">
            Two Fundamentally Different Financial Metrics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0b1b14] border border-[#1b3528] p-6 rounded-xl space-y-3">
            <h3 className="font-serif text-lg font-bold text-slate-400">
              1. Family Remittance Transfers (~$100B/yr)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Family-to-family transfers for basic household consumption, medical care, and school fees. Essential for household survival, but individual and uncoordinated.
            </p>
          </div>

          <div className="bg-[#0c2419] border border-[#d8aa28]/40 p-6 rounded-xl space-y-3 shadow-lg">
            <h3 className="font-serif text-lg font-bold text-[#f1ca54]">
              2. Sixth Region Asset Capacity ($2.5T+ Gross Income)
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed">
              The aggregate earnings, corporate assets, pensions, tech patents, endowments, and voluntary investment power of 150M+ diaspora members pooled for strategic development.
            </p>
          </div>
        </div>
      </section>

      {/* Embedded Economic Calculator */}
      <section>
        <EconomicCalculator />
      </section>
    </div>
  );
};

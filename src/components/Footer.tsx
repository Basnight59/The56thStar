import React from 'react';
import { ActiveTab } from '../types';
import { Globe, ShieldCheck, Scale, FileText, Users, ArrowUp } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAiAssistant: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenAiAssistant }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navTo = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07130e] text-slate-400 border-t border-[#1b3127] pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#d8aa28] flex items-center justify-center text-[#07130e] font-bold text-lg">
                ⭐
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                The 56th Star Initiative
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              A Sphinx Analysis proof-of-concept for Sixth Region constitutional consultation. 
              Facilitating self-governance, economic models, and institutional standing for the African Diaspora.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#f1ca54] bg-[#0e2118] border border-[#1b3b2c] p-2.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#d8aa28]" />
              <span>TTL Protocol: Truth • Transparency • Legacy</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Constitutional Focus
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navTo('home')} className="hover:text-[#f1ca54] transition-colors">
                  Central Question
                </button>
              </li>
              <li>
                <button onClick={() => navTo('about')} className="hover:text-[#f1ca54] transition-colors">
                  What Is The 56th Star?
                </button>
              </li>
              <li>
                <button onClick={() => navTo('representation')} className="hover:text-[#f1ca54] transition-colors">
                  Why Representation?
                </button>
              </li>
              <li>
                <button onClick={() => navTo('economy')} className="hover:text-[#f1ca54] transition-colors">
                  Beyond Remittances
                </button>
              </li>
            </ul>
          </div>

          {/* Research & Data */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Research & Action
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navTo('precedents')} className="hover:text-[#f1ca54] transition-colors">
                  Comparative Precedents
                </button>
              </li>
              <li>
                <button onClick={() => navTo('participate')} className="hover:text-[#f1ca54] transition-colors">
                  Consultation Registry
                </button>
              </li>
              <li>
                <button onClick={() => navTo('resources')} className="hover:text-[#f1ca54] transition-colors">
                  Working Papers Library
                </button>
              </li>
              <li>
                <button onClick={onOpenAiAssistant} className="text-[#f1ca54] font-semibold hover:underline flex items-center gap-1">
                  AI Shūrā Assistant →
                </button>
              </li>
            </ul>
          </div>

          {/* Principles */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Governance Standards
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Decisions emerge solely through uncoerced Shūrā. No individual, entity, or corporation claims sovereign authority over the diaspora.
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-slate-400 font-mono block">
                Published by Sphinx Analysis
              </span>
              <span className="text-[11px] text-slate-500 font-mono block">
                SPHINX Global Enterprises Corp.
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="bg-[#0b1a13] border border-[#1b3528] rounded-xl p-5 text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2 text-[#f1ca54] font-bold uppercase tracking-wider">
            <Scale className="w-4 h-4 shrink-0" />
            <span>Constitutional & Legal Notice (AU Constitutive Act Art. 3(q))</span>
          </div>
          <p className="leading-relaxed">
            The 56th Star Initiative is offered as a research proof-of-concept and public invitation to constitutional dialogue pursuant to Article 3(q) of the African Union Constitutive Act. These materials contain working assumptions developed in largely uncharted institutional space, submitted for professional examination, challenge, and refinement under the Shūrā Mandate. It does not constitute a declared state government, does not confer legal citizenship, and does not replace official national passport credentials or sovereign municipal registrations. All economic calculations are illustrative scenario models for research purposes only and do not represent investment solicitations, banking products, or tax liabilities.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#182e23] text-xs text-slate-500 font-mono">
          <p>
            © {new Date().getFullYear()} The 56th Star Initiative • Sphinx Analysis. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-[#f1ca54] transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

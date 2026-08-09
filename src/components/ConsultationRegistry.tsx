import React, { useState, useEffect } from 'react';
import { ConsultationRecord } from '../types';
import { Users, CheckCircle, ShieldCheck, Download, Trash2, Info, ArrowRight, Lock, MessageSquare } from 'lucide-react';

export const ConsultationRegistry: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    region: 'North America' as ConsultationRecord['region'],
    interest: 'Constitutional Law / Jurisprudence' as ConsultationRecord['interest'],
    comments: '',
    agreeTerms: false
  });

  const [records, setRecords] = useState<ConsultationRecord[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [activeView, setActiveView] = useState<'form' | 'registry'>('form');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('56star-consultation');
      if (stored) {
        setRecords(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse saved registrations:', e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.agreeTerms) return;

    const newRecord: ConsultationRecord = {
      id: 'reg-' + Date.now(),
      name: formData.name,
      email: formData.email,
      region: formData.region,
      interest: formData.interest,
      comments: formData.comments,
      agreeTerms: formData.agreeTerms,
      createdAt: new Date().toISOString()
    };

    const updated = [newRecord, ...records];
    setRecords(updated);
    try {
      localStorage.setItem('56star-consultation', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }

    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      region: 'North America',
      interest: 'Constitutional Law / Jurisprudence',
      comments: '',
      agreeTerms: false
    });
  };

  const handleClearLocal = () => {
    if (window.confirm('Clear locally saved consultation records from this browser?')) {
      localStorage.removeItem('56star-consultation');
      setRecords([]);
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(records, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `56th_star_consultation_registry_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="bg-[#0b1b14] border border-[#1e3b2e] rounded-2xl p-6 sm:p-8 space-y-8 text-slate-100 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1d382c] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#f1ca54] font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4 text-[#d8aa28]" />
            <span>Sixth Region Consultation Registry</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Register for Shūrā & Public Review
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Participation does not require agreement. Critique, rejection, alternative models, and dissent belong in the official record.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-[#07130e] p-1.5 rounded-xl border border-[#1a3328]">
          <button
            onClick={() => { setActiveView('form'); setSubmitted(false); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'form'
                ? 'bg-[#183527] text-[#f1ca54] border border-[#d8aa28]/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Registration Form
          </button>
          <button
            onClick={() => setActiveView('registry')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeView === 'registry'
                ? 'bg-[#183527] text-[#f1ca54] border border-[#d8aa28]/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Local Registry</span>
            {records.length > 0 && (
              <span className="bg-[#d8aa28] text-[#07130e] px-1.5 py-0.2 rounded-full text-[10px] font-extrabold">
                {records.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeView === 'form' ? (
        submitted ? (
          /* Submission Success State */
          <div className="bg-[#0e261b] border border-emerald-500/40 rounded-xl p-8 text-center space-y-4 max-w-2xl mx-auto shadow-2xl">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Shūrā Registration Saved Locally
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Thank you for contributing your voice to the Sixth Region consultation record. Your entry has been stored in your browser's local registry.
            </p>
            <div className="bg-[#07130e] p-4 rounded-lg border border-[#1b3528] text-xs text-slate-400 font-mono space-y-1 text-left">
              <div className="text-[#f1ca54] font-bold">Registration Entry Logged</div>
              <div>Privacy Note: Prototype stores data in local browser storage only.</div>
              <div>Total Local Registrations: {records.length}</div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setSubmitted(false)}
                className="bg-[#183527] hover:bg-[#214734] text-[#f1ca54] border border-[#d8aa28]/40 px-4 py-2 rounded-lg text-xs font-bold transition-colors"
              >
                Submit Another Entry
              </button>
              <button
                onClick={() => setActiveView('registry')}
                className="bg-[#07130e] hover:bg-[#12241b] text-slate-300 border border-[#213f30] px-4 py-2 rounded-lg text-xs font-bold transition-colors"
              >
                View Saved Local Registry ({records.length})
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Kwame Mensah"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#07130e] border border-[#1d3a2c] rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#d8aa28] transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                  Email Address <span className="text-amber-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. kwame@example.org"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#07130e] border border-[#1d3a2c] rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#d8aa28] transition-colors"
                />
              </div>

              {/* Region */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                  Primary Region of Residence
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value as ConsultationRecord['region'] })}
                  className="w-full bg-[#07130e] border border-[#1d3a2c] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d8aa28] transition-colors"
                >
                  <option value="North America">North America</option>
                  <option value="Caribbean">Caribbean</option>
                  <option value="Latin America">Latin America</option>
                  <option value="Europe">Europe</option>
                  <option value="Middle East / Asia-Pacific">Middle East / Asia-Pacific</option>
                  <option value="Africa-based / Returnee">Africa-based / Returnee</option>
                </select>
              </div>

              {/* Primary Focus */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                  Primary Domain of Focus
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value as ConsultationRecord['interest'] })}
                  className="w-full bg-[#07130e] border border-[#1d3a2c] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d8aa28] transition-colors"
                >
                  <option value="Constitutional Law / Jurisprudence">Constitutional Law / Jurisprudence</option>
                  <option value="Economics / Actuarial Science">Economics / Actuarial Science</option>
                  <option value="History / Education">History / Education</option>
                  <option value="Psychology / Social Cohesion">Psychology / Social Cohesion</option>
                  <option value="Technology / AI">Technology / AI</option>
                  <option value="Community Organizing">Community Organizing</option>
                </select>
              </div>
            </div>

            {/* Open Comments */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#d8aa28]" />
                <span>Comments, Critique or Dissent (Optional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Share your technical critique, constitutional suggestions, or historical perspective..."
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                className="w-full bg-[#07130e] border border-[#1d3a2c] rounded-lg p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#d8aa28] transition-colors"
              />
            </div>

            {/* Checkbox */}
            <div className="bg-[#07130e] p-4 rounded-xl border border-[#1a3328] space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-1 w-4 h-4 accent-[#d8aa28] bg-[#0c1a14] rounded border-[#244737]"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  I understand this registration is for <strong>Shūrā consultation only</strong>. It does not confer citizenship, legal status, or passport entitlements, and implies no financial obligation.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#d8aa28] to-[#b38814] hover:from-[#e1ba42] hover:to-[#c4981a] text-[#07130e] font-extrabold text-sm py-3.5 rounded-xl shadow-lg shadow-[#d8aa28]/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Register Consultation Interest</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )
      ) : (
        /* Registry Audit View */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#07130e] p-4 rounded-xl border border-[#1a3328]">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-[#d8aa28]" />
              <div>
                <h4 className="font-serif text-base font-bold text-white">
                  Local Browser Consultation Audit ({records.length})
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  Stored strictly in your local browser storage (`localStorage`).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {records.length > 0 && (
                <>
                  <button
                    onClick={handleExportJson}
                    className="flex items-center gap-1.5 text-xs bg-[#183527] hover:bg-[#204533] border border-[#2e5946] text-[#f1ca54] px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export JSON</span>
                  </button>
                  <button
                    onClick={handleClearLocal}
                    className="flex items-center gap-1.5 text-xs bg-[#241113] hover:bg-[#381619] border border-[#4d1f23] text-rose-300 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Local</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {records.length === 0 ? (
            <div className="text-center py-12 bg-[#07130e] rounded-xl border border-[#183024] space-y-3">
              <Users className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm text-slate-400 font-medium">
                No local consultation entries found yet.
              </p>
              <button
                onClick={() => setActiveView('form')}
                className="text-xs text-[#f1ca54] hover:underline font-bold"
              >
                Register your interest first →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {records.map((rec) => (
                <div key={rec.id} className="bg-[#07130e] border border-[#1a3328] p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between border-b border-[#14281f] pb-2">
                    <span className="font-serif text-sm font-bold text-white">
                      {rec.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#f1ca54] bg-[#14291f] px-2 py-0.5 rounded border border-[#214233]">
                      {rec.region}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    Focus: <span className="text-[#81c7a5]">{rec.interest}</span>
                  </div>
                  {rec.comments && (
                    <p className="text-xs text-slate-400 italic bg-[#0b1b14] p-2 rounded border border-[#162e22]">
                      "{rec.comments}"
                    </p>
                  )}
                  <div className="text-[10px] font-mono text-slate-500 pt-1">
                    Submitted: {new Date(rec.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

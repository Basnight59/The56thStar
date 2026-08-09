import React, { useState } from 'react';
import { WorkingPaper } from '../types';
import { X, FileText, Download, Copy, Check, Calendar, User, BookOpen } from 'lucide-react';

interface DocumentReaderModalProps {
  paper: WorkingPaper | null;
  onClose: () => void;
}

export const DocumentReaderModal: React.FC<DocumentReaderModalProps> = ({ paper, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!paper) return null;

  const handleCopy = () => {
    const fullTextCopy = `${paper.title.toUpperCase()}\nAuthor: ${paper.author}\nPublished: ${paper.datePublished}\nCategory: ${paper.category}\n\n${paper.fullText}`;
    navigator.clipboard.writeText(fullTextCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const fullTextCopy = `${paper.title.toUpperCase()}\nAuthor: ${paper.author}\nPublished: ${paper.datePublished}\nCategory: ${paper.category}\n\n${paper.fullText}`;
    const element = document.createElement('a');
    const file = new Blob([fullTextCopy], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${paper.id}_${paper.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#0b1b14] border border-[#214233] rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="bg-[#07130e] p-6 border-b border-[#1b3528] flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#f1ca54] uppercase bg-[#0e2118] px-2.5 py-0.5 rounded border border-[#1b3b2c] font-bold">
                {paper.category}
              </span>
              <span className="text-xs font-mono text-slate-400">Ref: {paper.id.toUpperCase()}</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
              {paper.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono pt-1">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#d8aa28]" />
                {paper.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#d8aa28]" />
                {paper.datePublished}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#12241b] hover:bg-[#1a382a] text-slate-400 hover:text-white border border-[#214233] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 font-sans">
          {/* Executive Summary */}
          <div className="bg-[#07130e] p-4 sm:p-5 rounded-xl border border-[#1b3528] space-y-2">
            <h4 className="text-xs font-bold text-[#f1ca54] uppercase tracking-wider font-mono flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#d8aa28]" />
              <span>Abstract & Core Thesis</span>
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed">
              {paper.summary}
            </p>
          </div>

          {/* Key Takeaways */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
              Key Strategic Takeaways
            </h4>
            <div className="space-y-2">
              {paper.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 bg-[#0e2118] p-3 rounded-lg border border-[#1b3b2c]">
                  <span className="text-[#f1ca54] font-bold font-mono">0{idx + 1}.</span>
                  <span className="leading-relaxed">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Full Text Document */}
          <div className="space-y-3 pt-2 border-t border-[#1a3328]">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
              Full Working Paper Text
            </h4>
            <div className="bg-[#07130e] p-5 rounded-xl border border-[#1d3a2c] font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap selection:bg-[#d8aa28] selection:text-[#07130e]">
              {paper.fullText}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-[#07130e] p-4 sm:p-6 border-t border-[#1b3528] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 font-mono">
            Sphinx Analysis Repository • Open Peer Review
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs bg-[#12241b] hover:bg-[#1c3a2b] border border-[#234735] text-slate-300 px-3.5 py-2 rounded-lg font-semibold transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 text-xs bg-[#183527] hover:bg-[#204533] border border-[#d8aa28]/40 text-[#f1ca54] px-3.5 py-2 rounded-lg font-bold transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download .TXT</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

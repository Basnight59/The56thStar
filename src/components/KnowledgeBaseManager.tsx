import React, { useState, useRef, ChangeEvent } from 'react';
import { 
  FileText, Upload, Plus, Trash2, CheckCircle2, XCircle, 
  Copy, Download, RefreshCw, Eye, Sparkles, BookOpen, Layers, ShieldCheck 
} from 'lucide-react';
import { 
  CustomResearchDoc, 
  getCustomResearchDocs, 
  addCustomResearchDoc, 
  toggleCustomResearchDoc, 
  deleteCustomResearchDoc, 
  resetCustomResearchDocsToDefault 
} from '../data/customKnowledgeStore';

interface KnowledgeBaseManagerProps {
  onDocsChanged?: () => void;
}

export const KnowledgeBaseManager: React.FC<KnowledgeBaseManagerProps> = ({ onDocsChanged }) => {
  const [docs, setDocs] = useState<CustomResearchDoc[]>(() => getCustomResearchDocs());
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'upload'>('list');
  
  // Form State for Pasting
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Initiative History & Legal Rationale');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  // Preview State
  const [previewDoc, setPreviewDoc] = useState<CustomResearchDoc | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showNotif = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleToggle = (id: string) => {
    const updated = toggleCustomResearchDoc(id);
    setDocs(updated);
    if (onDocsChanged) onDocsChanged();
  };

  const handleDelete = (id: string) => {
    const updated = deleteCustomResearchDoc(id);
    setDocs(updated);
    showNotif('Research document removed from knowledge base.');
    if (onDocsChanged) onDocsChanged();
  };

  const handleReset = () => {
    if (confirm('Reset custom research knowledge base to default Sphinx Analysis documents?')) {
      const updated = resetCustomResearchDocsToDefault();
      setDocs(updated);
      showNotif('Knowledge base reset to default proprietary research notes.');
      if (onDocsChanged) onDocsChanged();
    }
  };

  const handlePasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Please provide both a document title and content.');
      return;
    }

    addCustomResearchDoc({
      title: title.trim(),
      category: category.trim() || 'Custom Research',
      author: author.trim() || 'Research Contributor',
      content: content.trim(),
      enabled: true
    });

    const refreshed = getCustomResearchDocs();
    setDocs(refreshed);
    setTitle('');
    setContent('');
    setAuthor('');
    setActiveTab('list');
    showNotif(`Successfully added "${title.trim()}" to knowledge base.`);
    if (onDocsChanged) onDocsChanged();
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    let loadedCount = 0;
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const textContent = event.target?.result as string;
        if (textContent) {
          const docTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
          addCustomResearchDoc({
            title: docTitle.charAt(0).toUpperCase() + docTitle.slice(1),
            category: 'Uploaded Document',
            author: `Source: ${file.name}`,
            sourceFilename: file.name,
            content: textContent,
            enabled: true
          });
          loadedCount++;

          if (loadedCount === files.length) {
            const refreshed = getCustomResearchDocs();
            setDocs(refreshed);
            setActiveTab('list');
            showNotif(`Imported ${loadedCount} document(s) into knowledge base.`);
            if (onDocsChanged) onDocsChanged();
          }
        }
      };
      reader.readAsText(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopyAll = () => {
    const activeDocs = docs.filter(d => d.enabled);
    const combined = activeDocs.map(d => `=== DOCUMENT: ${d.title} (${d.category}) ===\n${d.content}`).join('\n\n');
    navigator.clipboard.writeText(combined);
    showNotif('Copied all active research documents to clipboard.');
  };

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(docs, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `56th_star_knowledge_base_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotif('Exported knowledge base JSON.');
  };

  const activeCount = docs.filter(d => d.enabled).length;
  const totalWords = docs.filter(d => d.enabled).reduce((acc, d) => acc + d.wordCount, 0);

  return (
    <div className="bg-[#081811] border border-[#1b3d2e] rounded-xl p-4 sm:p-5 space-y-4 text-slate-200 font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#183527] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#d8aa28]" />
            <h3 className="font-serif font-bold text-base text-[#f1ca54]">
              Proprietary Research Knowledge Base
            </h3>
            <span className="bg-[#183527] text-[#81c7a5] font-mono text-[10px] px-2 py-0.5 rounded border border-[#274f3d]">
              {activeCount} Active / {docs.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Upload or paste custom research papers, legal memos, and historical context for the AI Shūrā Advisor.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1 bg-[#0e241b] hover:bg-[#183a2c] text-slate-300 border border-[#1d4231] px-2.5 py-1.5 rounded transition-colors"
            title="Copy all active research text"
          >
            <Copy className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Copy All</span>
          </button>
          <button
            onClick={handleDownloadJson}
            className="flex items-center gap-1 bg-[#0e241b] hover:bg-[#183a2c] text-slate-300 border border-[#1d4231] px-2.5 py-1.5 rounded transition-colors"
            title="Export as JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Export</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 bg-[#0e241b] hover:bg-[#183a2c] text-slate-400 hover:text-slate-200 border border-[#1d4231] px-2.5 py-1.5 rounded transition-colors"
            title="Reset to defaults"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Notification toast */}
      {notification && (
        <div className="bg-[#183527] border border-[#2e5946] text-[#81c7a5] text-xs px-3 py-2 rounded-lg flex items-center justify-between font-mono animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#f1ca54]" />
            <span>{notification}</span>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#183527] pb-2 text-xs font-mono">
        <button
          onClick={() => setActiveTab('list')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
            activeTab === 'list'
              ? 'bg-[#183527] text-[#f1ca54] font-bold border border-[#2e5946]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#0e2118]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Research Documents ({docs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('add')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
            activeTab === 'add'
              ? 'bg-[#183527] text-[#f1ca54] font-bold border border-[#2e5946]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#0e2118]'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Paste Text Document</span>
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
            activeTab === 'upload'
              ? 'bg-[#183527] text-[#f1ca54] font-bold border border-[#2e5946]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#0e2118]'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Files (.txt, .md, .json)</span>
        </button>
      </div>

      {/* Tab 1: Document List */}
      {activeTab === 'list' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono bg-[#07130e] p-2.5 rounded-lg border border-[#163326]">
            <span>Active context payload: <strong className="text-[#f1ca54]">{totalWords.toLocaleString()} words</strong> across {activeCount} document(s).</span>
            <span className="text-[11px] text-[#81c7a5]">✓ Auto-synced to Gemini AI Shūrā Advisor</span>
          </div>

          {docs.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs font-mono space-y-2">
              <p>No research documents in knowledge base.</p>
              <button
                onClick={() => setActiveTab('add')}
                className="text-[#f1ca54] underline hover:text-white"
              >
                Paste your research text now
              </button>
            </div>
          ) : (
            <div className="grid gap-2.5 max-h-[300px] overflow-y-auto pr-1">
              {docs.map((doc) => (
                <div
                  key={doc.id}
                  className={`p-3 rounded-lg border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    doc.enabled
                      ? 'bg-[#0e2218] border border-[#1e4433] text-slate-200'
                      : 'bg-[#07130e]/60 border border-[#12281e] text-slate-500'
                  }`}
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <FileText className={`w-4 h-4 shrink-0 ${doc.enabled ? 'text-[#d8aa28]' : 'text-slate-600'}`} />
                      <h4 className="font-medium text-xs sm:text-sm truncate text-white">
                        {doc.title}
                      </h4>
                      <span className="bg-[#153123] text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded shrink-0">
                        {doc.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                      <span>Author: {doc.author || 'User'}</span>
                      <span>•</span>
                      <span>{doc.wordCount} words</span>
                      <span>•</span>
                      <span>Added: {doc.addedAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="p-1.5 rounded bg-[#153123] hover:bg-[#1f4532] text-slate-300 transition-colors"
                      title="Preview content"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleToggle(doc.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold border transition-colors ${
                        doc.enabled
                          ? 'bg-[#183527] text-[#81c7a5] border-[#2e5946] hover:bg-[#1f4532]'
                          : 'bg-[#1c1312] text-slate-500 border-[#3d2321] hover:bg-[#281a18]'
                      }`}
                    >
                      {doc.enabled ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-[#d8aa28]" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-slate-500" />
                          <span>Disabled</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="p-1.5 rounded bg-[#1c1312] hover:bg-[#321918] text-red-400 border border-[#3d2321] transition-colors"
                      title="Delete document"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Paste Form */}
      {activeTab === 'add' && (
        <form onSubmit={handlePasteSubmit} className="space-y-3 font-sans text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-mono uppercase text-slate-300 font-bold">Document Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Legal Analysis of AU Sixth Region Charter & Capital Mechanics"
                className="w-full bg-[#07130e] border border-[#1d4231] rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#d8aa28]"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-slate-300 font-bold">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Constitutional Law"
                className="w-full bg-[#07130e] border border-[#1d4231] rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#d8aa28]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase text-slate-300 font-bold">Author / Source Organization</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Sphinx Global Enterprises Corp. / Diaspora Legal Taskforce"
              className="w-full bg-[#07130e] border border-[#1d4231] rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#d8aa28]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase text-slate-300 font-bold">Raw Proprietary Research Content *</label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste raw research text, memo details, background specifications, or constitutional notes here..."
              className="w-full bg-[#07130e] border border-[#1d4231] rounded-lg p-3 text-white placeholder-slate-500 font-mono text-xs focus:outline-none focus:border-[#d8aa28] leading-relaxed"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('list')}
              className="px-4 py-2 rounded-lg bg-[#0e2118] hover:bg-[#163527] text-slate-300 font-mono text-xs border border-[#1d4231]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#d8aa28] to-[#b88f1d] hover:from-[#e5b834] hover:to-[#c79b24] text-[#07130e] font-bold font-mono text-xs shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Save Research Entry to Knowledge Base</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Upload Files */}
      {activeTab === 'upload' && (
        <div className="space-y-4 font-sans text-xs">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#234e3a] hover:border-[#d8aa28] bg-[#07130e] rounded-xl p-8 text-center cursor-pointer transition-colors space-y-3"
          >
            <Upload className="w-8 h-8 text-[#d8aa28] mx-auto animate-pulse" />
            <div>
              <p className="text-sm font-bold text-white">Click or drag research files to upload</p>
              <p className="text-xs text-slate-400 mt-1">Supports plain text (.txt), Markdown (.md), JSON (.json), CSV (.csv)</p>
            </div>
            <span className="inline-block bg-[#183527] text-[#81c7a5] font-mono text-[11px] px-3 py-1 rounded border border-[#2e5946]">
              Browse Local Files
            </span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              multiple
              accept=".txt,.md,.json,.csv"
              className="hidden"
            />
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1b14] border border-[#214233] rounded-xl max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden text-slate-200">
            <div className="p-4 bg-[#07130e] border-b border-[#1b3528] flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-base text-[#f1ca54]">
                  {previewDoc.title}
                </h4>
                <p className="text-xs font-mono text-slate-400">
                  {previewDoc.category} • Author: {previewDoc.author || 'User'} • {previewDoc.wordCount} words
                </p>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>
            <div className="p-5 overflow-y-auto font-mono text-xs leading-relaxed whitespace-pre-wrap bg-[#07130e]/80 text-slate-300">
              {previewDoc.content}
            </div>
            <div className="p-3 bg-[#07130e] border-t border-[#1b3528] flex justify-end">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-1.5 rounded bg-[#183527] text-[#f1ca54] font-mono text-xs border border-[#2e5946]"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

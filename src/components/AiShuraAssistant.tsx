import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Bot, User, Send, Sparkles, X, RotateCcw, Database, BookOpen, ChevronRight, CheckCircle2, FolderPlus, Layers } from 'lucide-react';
import { SHURA_KNOWLEDGE_BASE } from '../data/shuraKnowledgeBase';
import { KnowledgeBaseManager } from './KnowledgeBaseManager';
import { getFormattedCustomKnowledgeForAi, getCustomResearchDocs } from '../data/customKnowledgeStore';

interface AiShuraAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiShuraAssistant: React.FC<AiShuraAssistantProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [viewMode, setViewMode] = useState<'chat' | 'customKb' | 'systemKb'>('chat');
  const [activeKbTab, setActiveKbTab] = useState<'foundation' | 'legitimacy' | 'economic' | 'precedents' | 'shura' | 'boundaries'>('foundation');
  const [customDocCount, setCustomDocCount] = useState<number>(() => getCustomResearchDocs().filter(d => d.enabled).length);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Peace and greetings. I am your AI Constitutional Advisor for "The 56th Star Initiative", grounded in our official system Knowledge Base and your proprietary research datasets. I can answer questions about Sixth Region history, AU Constitutive Act Art. 3(q), the 9-step Legitimacy Chain, economic capacity models, or comparative legal precedents. How may I assist your Shūrā consultation today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'What is the 56th Star Initiative?',
    'Explain the Economic Capacity model vs remittances.',
    'What are the 9 steps of the Legitimacy Chain?',
    'How does Shūrā differ from Western Parliamentary systems?',
    'What non-territorial precedents apply to the Sixth Region?'
  ];

  const updateDocCount = () => {
    setCustomDocCount(getCustomResearchDocs().filter(d => d.enabled).length);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && viewMode === 'chat') {
      scrollToBottom();
    }
  }, [messages, isOpen, viewMode]);

  if (!isOpen) return null;

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    if (viewMode !== 'chat') {
      setViewMode('chat');
    }

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      role: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      // Build history for backend
      const history = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.role, text: m.text }));

      // Fetch formatted custom research knowledge base text
      const customKnowledge = getFormattedCustomKnowledgeForAi();

      const res = await fetch('/api/shura-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend.trim(),
          history,
          customKnowledge
        })
      });

      const data = await res.json();

      if (data.text) {
        const aiMsg: ChatMessage = {
          id: 'ai-' + Date.now(),
          role: 'model',
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        throw new Error(data.error || 'No text returned from Shūrā AI Advisor.');
      }
    } catch (err: any) {
      console.error('Shura AI Error:', err);
      // Friendly fallback response grounded in KB
      const fallbackMsg: ChatMessage = {
        id: 'ai-err-' + Date.now(),
        role: 'model',
        text: `Thank you for your query regarding "${textToSend}". Under the 56th Star Initiative raw knowledge base (AU Constitutive Act Art. 3(q)), the Sixth Region represents 150M-160M+ African Diaspora members. Key dimensions include the 9-Step Legitimacy Chain, the Macroeconomic Capacity Model ($1.8T-$3.2T gross income base), and Non-Territorial Precedents (Holy See, Sovereign Order of Malta). Please explore our raw knowledge base manager tab to view active proprietary research documents.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: 'Conversation reset. Grounded in our raw data knowledge base, how may I assist your Shūrā consultation regarding Sixth Region governance?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#0b1b14] border border-[#214233] rounded-2xl max-w-4xl w-full h-[90vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-[#07130e] p-4 sm:p-5 border-b border-[#1b3528] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d8aa28] to-[#9e7912] p-0.5 shadow-md">
              <div className="w-full h-full bg-[#0c1a14] rounded-[10px] flex items-center justify-center text-[#f1ca54]">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-white">
                  AI Shūrā Advisor
                </h3>
                <span className="text-[10px] font-mono uppercase bg-[#183527] text-[#81c7a5] px-2 py-0.5 rounded border border-[#274f3d]">
                  Grounded Research Advisor
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans">
                Constitutional Consultation • Proprietary Sphinx Research
              </p>
            </div>
          </div>

          {/* Mode Navigation Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setViewMode('chat')}
              className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border transition-colors ${
                viewMode === 'chat'
                  ? 'bg-[#d8aa28] text-[#07130e] border-[#f1ca54] font-bold'
                  : 'bg-[#12241b] text-slate-300 border-[#214233] hover:bg-[#1a382a]'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Chat View</span>
            </button>

            <button
              onClick={() => setViewMode('customKb')}
              className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border transition-colors relative ${
                viewMode === 'customKb'
                  ? 'bg-[#d8aa28] text-[#07130e] border-[#f1ca54] font-bold'
                  : 'bg-[#12241b] text-[#f1ca54] border-[#214233] hover:bg-[#1a382a]'
              }`}
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>Upload / Custom Research</span>
              {customDocCount > 0 && (
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${viewMode === 'customKb' ? 'bg-[#07130e] text-[#f1ca54]' : 'bg-[#d8aa28] text-[#07130e]'}`}>
                  {customDocCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setViewMode('systemKb')}
              className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border transition-colors ${
                viewMode === 'systemKb'
                  ? 'bg-[#d8aa28] text-[#07130e] border-[#f1ca54] font-bold'
                  : 'bg-[#12241b] text-slate-300 border-[#214233] hover:bg-[#1a382a]'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>System KB</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2 rounded-lg bg-[#12241b] hover:bg-[#1a382a] text-slate-400 hover:text-white border border-[#214233] transition-colors"
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#12241b] hover:bg-[#1a382a] text-slate-400 hover:text-white border border-[#214233] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Suggested Prompts Bar (when in Chat View) */}
        {viewMode === 'chat' && (
          <div className="bg-[#081811] border-b border-[#183326] px-4 py-2.5 overflow-x-auto flex items-center gap-2 text-xs scrollbar-none">
            <span className="text-[10px] font-mono uppercase text-[#d8aa28] font-bold shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Quick Shūrā Topics:
            </span>
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className="bg-[#0e241b] hover:bg-[#16382a] border border-[#1b3d2e] text-slate-300 hover:text-[#f1ca54] px-3 py-1 rounded-full whitespace-nowrap transition-colors shrink-0 font-medium text-[11px]"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Main Content Area */}
        {viewMode === 'customKb' ? (
          /* PROPRIETARY RESEARCH / CUSTOM KNOWLEDGE BASE MANAGER VIEW */
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#091610]">
            <KnowledgeBaseManager onDocsChanged={updateDocCount} />
          </div>
        ) : viewMode === 'systemKb' ? (
          /* SYSTEM RAW KNOWLEDGE BASE EXPLORER VIEW */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#091610]">
            {/* KB Navigation Sidebar */}
            <div className="w-full md:w-64 bg-[#07130e] border-b md:border-b-0 md:border-r border-[#1b3528] p-3 space-y-1 text-xs font-mono shrink-0 overflow-y-auto">
              <div className="text-[10px] uppercase text-slate-500 font-bold px-2 py-1 flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-[#d8aa28]" /> Core KB Sections
              </div>
              <button
                onClick={() => setActiveKbTab('foundation')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                  activeKbTab === 'foundation' ? 'bg-[#183527] text-[#f1ca54] font-bold border border-[#2e5946]' : 'text-slate-300 hover:bg-[#0e2118]'
                }`}
              >
                <span>1. Foundation & AU Art. 3(q)</span>
                <ChevronRight className="w-3 h-3 opacity-60" />
              </button>
              <button
                onClick={() => setActiveKbTab('legitimacy')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                  activeKbTab === 'legitimacy' ? 'bg-[#183527] text-[#f1ca54] font-bold border border-[#2e5946]' : 'text-slate-300 hover:bg-[#0e2118]'
                }`}
              >
                <span>2. 9-Step Legitimacy Chain</span>
                <ChevronRight className="w-3 h-3 opacity-60" />
              </button>
              <button
                onClick={() => setActiveKbTab('economic')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                  activeKbTab === 'economic' ? 'bg-[#183527] text-[#f1ca54] font-bold border border-[#2e5946]' : 'text-slate-300 hover:bg-[#0e2118]'
                }`}
              >
                <span>3. Macroeconomic Model</span>
                <ChevronRight className="w-3 h-3 opacity-60" />
              </button>
              <button
                onClick={() => setActiveKbTab('precedents')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                  activeKbTab === 'precedents' ? 'bg-[#183527] text-[#f1ca54] font-bold border border-[#2e5946]' : 'text-slate-300 hover:bg-[#0e2118]'
                }`}
              >
                <span>4. Legal Precedents</span>
                <ChevronRight className="w-3 h-3 opacity-60" />
              </button>
              <button
                onClick={() => setActiveKbTab('shura')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                  activeKbTab === 'shura' ? 'bg-[#183527] text-[#f1ca54] font-bold border border-[#2e5946]' : 'text-slate-300 hover:bg-[#0e2118]'
                }`}
              >
                <span>5. Shūrā & TTL Protocol</span>
                <ChevronRight className="w-3 h-3 opacity-60" />
              </button>
              <button
                onClick={() => setActiveKbTab('boundaries')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                  activeKbTab === 'boundaries' ? 'bg-[#183527] text-[#f1ca54] font-bold border border-[#2e5946]' : 'text-slate-300 hover:bg-[#0e2118]'
                }`}
              >
                <span>6. Scope & Disclaimers</span>
                <ChevronRight className="w-3 h-3 opacity-60" />
              </button>
            </div>

            {/* KB Detail Panel */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 font-sans text-sm text-slate-200">
              {activeKbTab === 'foundation' && (
                <div className="space-y-4">
                  <div className="border-b border-[#1b3528] pb-3">
                    <h4 className="font-serif text-xl font-bold text-[#f1ca54]">
                      {SHURA_KNOWLEDGE_BASE.foundationAndRationale.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {SHURA_KNOWLEDGE_BASE.foundationAndRationale.summary}
                    </p>
                  </div>
                  <ul className="space-y-2 text-slate-300 leading-relaxed">
                    {SHURA_KNOWLEDGE_BASE.foundationAndRationale.details.map((item, idx) => (
                      <li key={idx} className="bg-[#0e2118] border border-[#1b3d2e] p-3 rounded-lg flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#d8aa28] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeKbTab === 'legitimacy' && (
                <div className="space-y-4">
                  <div className="border-b border-[#1b3528] pb-3">
                    <h4 className="font-serif text-xl font-bold text-[#f1ca54]">
                      {SHURA_KNOWLEDGE_BASE.legitimacyChain.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {SHURA_KNOWLEDGE_BASE.legitimacyChain.summary}
                    </p>
                  </div>
                  <div className="grid gap-3">
                    {SHURA_KNOWLEDGE_BASE.legitimacyChain.steps.map((step) => (
                      <div key={step.stepNumber} className="bg-[#0e2118] border border-[#1b3d2e] p-3.5 rounded-lg space-y-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#f1ca54] font-bold">Step {step.stepNumber}: {step.name}</span>
                          <span className="bg-[#183527] text-[#81c7a5] px-2 py-0.5 rounded text-[10px] border border-[#274f3d]">
                            {step.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed pt-1">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeKbTab === 'economic' && (
                <div className="space-y-4">
                  <div className="border-b border-[#1b3528] pb-3">
                    <h4 className="font-serif text-xl font-bold text-[#f1ca54]">
                      {SHURA_KNOWLEDGE_BASE.economicCapacityModel.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {SHURA_KNOWLEDGE_BASE.economicCapacityModel.summary}
                    </p>
                  </div>
                  <ul className="space-y-2 text-slate-300 leading-relaxed">
                    {SHURA_KNOWLEDGE_BASE.economicCapacityModel.details.map((item, idx) => (
                      <li key={idx} className="bg-[#0e2118] border border-[#1b3d2e] p-3 rounded-lg flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#d8aa28] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeKbTab === 'precedents' && (
                <div className="space-y-4">
                  <div className="border-b border-[#1b3528] pb-3">
                    <h4 className="font-serif text-xl font-bold text-[#f1ca54]">
                      {SHURA_KNOWLEDGE_BASE.comparativePrecedents.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {SHURA_KNOWLEDGE_BASE.comparativePrecedents.summary}
                    </p>
                  </div>
                  <div className="grid gap-3">
                    {SHURA_KNOWLEDGE_BASE.comparativePrecedents.cases.map((c, idx) => (
                      <div key={idx} className="bg-[#0e2118] border border-[#1b3d2e] p-4 rounded-lg space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#f1ca54] font-bold">{c.subject}</span>
                          <span className="text-slate-400">{c.principle}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {c.keyLesson}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeKbTab === 'shura' && (
                <div className="space-y-4">
                  <div className="border-b border-[#1b3528] pb-3">
                    <h4 className="font-serif text-xl font-bold text-[#f1ca54]">
                      {SHURA_KNOWLEDGE_BASE.shuraAndTTL.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {SHURA_KNOWLEDGE_BASE.shuraAndTTL.summary}
                    </p>
                  </div>
                  <ul className="space-y-2 text-slate-300 leading-relaxed">
                    {SHURA_KNOWLEDGE_BASE.shuraAndTTL.principles.map((item, idx) => (
                      <li key={idx} className="bg-[#0e2118] border border-[#1b3d2e] p-3 rounded-lg flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#d8aa28] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeKbTab === 'boundaries' && (
                <div className="space-y-4">
                  <div className="border-b border-[#1b3528] pb-3">
                    <h4 className="font-serif text-xl font-bold text-[#f1ca54]">
                      {SHURA_KNOWLEDGE_BASE.scopeBoundaries.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {SHURA_KNOWLEDGE_BASE.scopeBoundaries.summary}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-[#1c1110] border border-[#422220] p-4 rounded-lg space-y-2">
                      <h5 className="font-mono text-xs font-bold text-red-400 uppercase">What The Initiative Is NOT:</h5>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {SHURA_KNOWLEDGE_BASE.scopeBoundaries.isNot.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-red-400 font-bold">✕</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-[#0e2118] border border-[#1b3d2e] p-4 rounded-lg space-y-2">
                      <h5 className="font-mono text-xs font-bold text-[#f1ca54] uppercase">What The Initiative IS:</h5>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {SHURA_KNOWLEDGE_BASE.scopeBoundaries.is.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-[#d8aa28] font-bold">✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* CHAT LOG VIEW */
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 font-sans bg-[#091610]">
            {messages.map((msg) => {
              const isAi = msg.role === 'model';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-2xl ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                      isAi
                        ? 'bg-[#183527] border border-[#2e5946] text-[#f1ca54]'
                        : 'bg-[#d8aa28] text-[#07130e]'
                    }`}
                  >
                    {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`p-4 rounded-2xl space-y-1 text-xs sm:text-sm leading-relaxed ${
                      isAi
                        ? 'bg-[#0e2218] border border-[#1b3a2c] text-slate-200 rounded-tl-none'
                        : 'bg-gradient-to-r from-[#d8aa28] to-[#b88f1d] text-[#07130e] font-medium rounded-tr-none shadow-md'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <div className={`text-[10px] font-mono text-right ${isAi ? 'text-slate-500' : 'text-[#2e2305]'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-3 mr-auto bg-[#0e2218] border border-[#1b3a2c] p-4 rounded-2xl rounded-tl-none text-xs text-slate-400">
                <Bot className="w-4 h-4 text-[#d8aa28] animate-bounce" />
                <span className="font-mono">Consulting 56th Star System & Proprietary Research KB...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input Bar */}
        <div className="bg-[#07130e] p-4 border-t border-[#1b3528]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask a question about Sixth Region constitutional consultation..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 bg-[#0c1a14] border border-[#1f3d2f] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#d8aa28] transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-[#d8aa28] to-[#b38814] hover:from-[#e1ba42] hover:to-[#c4981a] text-[#07130e] p-3 rounded-xl font-bold transition-all disabled:opacity-50 cursor-pointer shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 px-1">
            <span>Grounded in Sphinx Raw KB & {customDocCount} Custom Research Doc(s)</span>
            <span>Shūrā Protocol v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};



/**
 * Custom Knowledge Base Store
 * Supports uploading, pasting, storing, and loading proprietary research datasets
 * for the AI Shūrā Advisor. Stored in localStorage.
 */

export interface CustomResearchDoc {
  id: string;
  title: string;
  category: string;
  content: string;
  author?: string;
  addedAt: string;
  sourceFilename?: string;
  enabled: boolean;
  wordCount: number;
}

const STORAGE_KEY = '56th_star_custom_research_kb_v1';

export const DEFAULT_PROPRIETARY_RESEARCH: CustomResearchDoc[] = [
  {
    id: 'doc-sphinx-genesis-01',
    title: 'Sphinx Analysis Genesis & Article 3(q) Development Context',
    category: 'Initiative Origins & Legal Rationale',
    author: 'Sphinx Global Enterprises Corp.',
    addedAt: '2026-08-01',
    enabled: true,
    wordCount: 380,
    content: `GENESIS OF THE 56TH STAR INITIATIVE (SPHINX ANALYSIS PROPRIETARY MEMORANDUM)

1. HISTORICAL CONTEXT & MOTIVATION:
The 56th Star Initiative was conceived by Sphinx Analysis to address a structural void in Pan-African diaspora governance. While the African Union (AU) declared the Diaspora as its official "Sixth Region" in 2003, two decades passed without an institutional mechanism capable of aggregating sovereign diaspora capital, organizing legal defense, or establishing formal legislative representation.

2. CONSTITUTIONAL ANCHOR (AU CONSTITUTIVE ACT ART. 3(q)):
Article 3(q) explicitly charges the Union with inviting "the full participation of the African Diaspora as an important constituent of our continent." The 56th Star Initiative operationalizes this invitation not through unratified state declarations, but as a open constitutional research exercise under the Shūrā Mandate (mutual consultation).

3. DEVELOPMENT ARCHITECTURE:
- Uncharted Waters Posture: Acknowledges working in non-precedented non-territorial legal space.
- Actuarial & Macroeconomic Realism: Shifts focus away from family remittances ($100B/yr) toward aggregate gross diaspora wealth ($1.8T-$3.2T gross income base).
- Structural Separation: Strictly separates research/consultation from sovereign state claims or commercial investment products.`
  },
  {
    id: 'doc-capital-covenants-02',
    title: 'Sovereign Capital Vaults & Anti-Predatory Debt Covenants',
    category: 'Actuarial & Capital Structure',
    author: 'Sphinx Research Group',
    addedAt: '2026-08-03',
    enabled: true,
    wordCount: 310,
    content: `PROPRIETARY RESEARCH: CAPITAL VAULT SPECIFICATIONS & ANTI-PREDATORY COVENANTS

1. VOLUNTARY CIVIC POOL MECHANICS:
Instead of relying on commercial loans or predatory structural adjustment programs, the 56th Star model demonstrates how small, voluntary monthly contributions ($5 - $50/mo) across the 150M+ diaspora base create self-sustaining capital pools ($3.84B+ annually at 10% workforce participation).

2. FIVE-TIERED CAPITAL ALLOCATION MODEL:
- Tier A (25%): STEM, Artificial Intelligence, & Technical Innovation Endowments
- Tier B (20%): Global Diaspora Legal Defense & Human Rights Vault
- Tier C (20%): Strategic Trade Logistics & Sovereign Supply Line Infrastructure
- Tier D (15%): Health Autonomy, Botanical Medicine, & Pandemic Defense
- Tier E (20%): TTL Governance, Cryptographic Ledger Audits, & Administrative Operations

3. SAFEGUARD COVENANTS:
All vault allocations operate under irrevocable TTL (Truth, Transparency, Legacy) covenants requiring public multi-signature cryptographic proof of reserves, zero speculative leverage, and non-extractable community endowment rules.`
  }
];

export function getCustomResearchDocs(): CustomResearchDoc[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Seed with default proprietary research notes
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROPRIETARY_RESEARCH));
      return DEFAULT_PROPRIETARY_RESEARCH;
    }
    return JSON.parse(stored);
  } catch (err) {
    console.error('Failed to load custom research docs:', err);
    return DEFAULT_PROPRIETARY_RESEARCH;
  }
}

export function saveCustomResearchDocs(docs: CustomResearchDoc[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  } catch (err) {
    console.error('Failed to save custom research docs:', err);
  }
}

export function addCustomResearchDoc(doc: Omit<CustomResearchDoc, 'id' | 'addedAt' | 'wordCount'>): CustomResearchDoc {
  const docs = getCustomResearchDocs();
  const wordCount = doc.content.trim().split(/\s+/).filter(Boolean).length;
  const newDoc: CustomResearchDoc = {
    ...doc,
    id: 'doc-usr-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    addedAt: new Date().toISOString().split('T')[0],
    wordCount
  };
  const updated = [newDoc, ...docs];
  saveCustomResearchDocs(updated);
  return newDoc;
}

export function toggleCustomResearchDoc(id: string): CustomResearchDoc[] {
  const docs = getCustomResearchDocs();
  const updated = docs.map(d => d.id === id ? { ...d, enabled: !d.enabled } : d);
  saveCustomResearchDocs(updated);
  return updated;
}

export function deleteCustomResearchDoc(id: string): CustomResearchDoc[] {
  const docs = getCustomResearchDocs();
  const updated = docs.filter(d => d.id !== id);
  saveCustomResearchDocs(updated);
  return updated;
}

export function resetCustomResearchDocsToDefault(): CustomResearchDoc[] {
  saveCustomResearchDocs(DEFAULT_PROPRIETARY_RESEARCH);
  return DEFAULT_PROPRIETARY_RESEARCH;
}

export function getFormattedCustomKnowledgeForAi(): string {
  const docs = getCustomResearchDocs().filter(d => d.enabled);
  if (docs.length === 0) return '';

  let text = `=== PROPRIETARY RESEARCH DATASET (${docs.length} Active Custom Documents) ===\n\n`;
  docs.forEach((doc, idx) => {
    text += `[DOC ${idx + 1}]: ${doc.title}\n`;
    text += `Category: ${doc.category} | Author/Source: ${doc.author || 'User Upload'} | Added: ${doc.addedAt}\n`;
    text += `Content:\n${doc.content.trim()}\n\n`;
  });
  return text;
}

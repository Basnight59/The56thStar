export interface ConsultationRecord {
  id: string;
  name: string;
  email: string;
  region: 'North America' | 'Caribbean' | 'Latin America' | 'Europe' | 'Middle East / Asia-Pacific' | 'Africa-based / Returnee';
  interest: 'Constitutional Law / Jurisprudence' | 'Economics / Actuarial Science' | 'History / Education' | 'Psychology / Social Cohesion' | 'Technology / AI' | 'Community Organizing';
  comments?: string;
  agreeTerms: boolean;
  createdAt: string;
}

export interface PrecedentItem {
  id: string;
  title: string;
  subtitle: string;
  lesson: string;
  limits: string;
  relevance: string;
  keyDocs: string[];
  category: 'Non-Territorial Statehood' | 'Diaspora Political Evolution' | 'Institutional Pre-Statehood';
}

export interface WorkingPaper {
  id: string;
  title: string;
  category: 'Foundation Documents' | 'Economic Analysis' | 'Constitutional Framework' | 'Research Archive';
  summary: string;
  datePublished: string;
  keyTakeaways: string[];
  fullText: string;
  author: string;
}

export interface LegitimacyStep {
  stepNumber: number;
  title: string;
  description: string;
  rationale: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  keyDeliverables: string[];
}

export interface CalculatorState {
  populationMillions: number;
  participationPercent: number;
  monthlyContributionUSD: number;
}

export interface SurveyQuestion {
  id: string;
  question: string;
  description: string;
  options: {
    id: string;
    label: string;
    votes: number;
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export type ActiveTab = 'home' | 'about' | 'representation' | 'economy' | 'precedents' | 'participate' | 'resources';

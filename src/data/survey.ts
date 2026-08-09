import { SurveyQuestion } from '../types';

export const INITIAL_SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 'q1',
    question: 'Should the Sixth Region seek direct, voting representation in AU legislative and decision-making organs?',
    description: 'Currently, the diaspora holds advisory status primarily through ECOSOCC.',
    options: [
      { id: 'q1-o1', label: 'Yes — Full voting representation and parliamentary seats', votes: 1420 },
      { id: 'q1-o2', label: 'Yes — Special observer status with veto on diaspora affairs', votes: 680 },
      { id: 'q1-o3', label: 'Maintain current advisory & civil society mechanisms', votes: 210 },
      { id: 'q1-o4', label: 'Establish independent non-territorial institution first', votes: 890 }
    ]
  },
  {
    id: 'q2',
    question: 'What should be the primary economic focus of a voluntary Sixth Region Sovereign Fund?',
    description: 'If a voluntary civic contribution pool is established, where should resources be prioritized?',
    options: [
      { id: 'q2-o1', label: 'Pan-African Youth STEM & Artificial Intelligence Endowments', votes: 1150 },
      { id: 'q2-o2', label: 'Legal Defense & Land Sovereignty Repatriation Fund', votes: 940 },
      { id: 'q2-o3', label: 'Pan-African Health, Food Security & Infrastructure Bonds', votes: 780 },
      { id: 'q2-o4', label: 'Diaspora Micro-Finance & Small Business Capital Vaults', votes: 530 }
    ]
  },
  {
    id: 'q3',
    question: 'How should delegate selection for a global Constituent Assembly be structured?',
    description: 'Ensuring democratic legitimacy and broad representation across regions.',
    options: [
      { id: 'q3-o1', label: 'Direct digital vote among registered consultation participants', votes: 1650 },
      { id: 'q3-o2', label: 'Proportional regional caucuses (North America, Caribbean, Europe, etc.)', votes: 820 },
      { id: 'q3-o3', label: 'Hybrid model: 50% regional delegates + 50% technical scholars', votes: 1040 }
    ]
  }
];

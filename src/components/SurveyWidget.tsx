import React, { useState, useEffect } from 'react';
import { INITIAL_SURVEY_QUESTIONS } from '../data/survey';
import { SurveyQuestion } from '../types';
import { Vote, CheckCircle2, BarChart2, MessageSquare, Info } from 'lucide-react';

export const SurveyWidget: React.FC = () => {
  const [questions, setQuestions] = useState<SurveyQuestion[]>(INITIAL_SURVEY_QUESTIONS);
  const [votedMap, setVotedMap] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem('56star-survey-votes');
      if (stored) {
        setVotedMap(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load survey votes:', e);
    }
  }, []);

  const handleVote = (questionId: string, optionId: string) => {
    if (votedMap[questionId]) return; // Already voted

    const updatedMap = { ...votedMap, [questionId]: optionId };
    setVotedMap(updatedMap);
    try {
      localStorage.setItem('56star-survey-votes', JSON.stringify(updatedMap));
    } catch (e) {
      console.error('Failed to save vote:', e);
    }

    // Increment count locally
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            options: q.options.map(opt =>
              opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
            )
          };
        }
        return q;
      })
    );
  };

  return (
    <div className="bg-[#0b1b14] border border-[#1e3b2e] rounded-2xl p-6 sm:p-8 space-y-8 text-slate-100 shadow-xl">
      {/* Header */}
      <div className="border-b border-[#1d382c] pb-6">
        <div className="flex items-center gap-2 text-[#f1ca54] font-mono text-xs font-bold uppercase tracking-wider mb-1">
          <Vote className="w-4 h-4 text-[#d8aa28]" />
          <span>Shūrā Public Sentiment Survey</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          Constitutional Opinion Gauging
        </h2>
        <p className="text-sm text-slate-300 mt-1">
          Vote on key constitutional questions. Your input informs the synthesis report for the upcoming Regional Shūrā assemblies.
        </p>
      </div>

      {/* Questions Stack */}
      <div className="space-y-8">
        {questions.map((q, qIdx) => {
          const userVotedOption = votedMap[q.id];
          const totalVotes = q.options.reduce((sum, opt) => sum + opt.votes, 0);

          return (
            <div key={q.id} className="bg-[#07130e] p-6 rounded-xl border border-[#1a3328] space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#f1ca54] font-bold">Question {qIdx + 1} of {questions.length}</span>
                  <span className="text-slate-400">{totalVotes.toLocaleString()} Total Votes</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  {q.question}
                </h3>
                <p className="text-xs text-slate-400">
                  {q.description}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {q.options.map((option) => {
                  const isSelected = userVotedOption === option.id;
                  const pct = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;

                  return (
                    <div
                      key={option.id}
                      onClick={() => !userVotedOption && handleVote(q.id, option.id)}
                      className={`p-4 rounded-xl border transition-all ${
                        userVotedOption
                          ? isSelected
                            ? 'bg-[#153123] border-[#d8aa28]'
                            : 'bg-[#0a1812] border-[#152e22] opacity-80'
                          : 'bg-[#0d1e16] border-[#1b382a] hover:bg-[#12281d] cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 text-xs sm:text-sm font-medium mb-2">
                        <span className="flex items-center gap-2 text-slate-200">
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-[#d8aa28] bg-[#d8aa28] text-[#07130e]' : 'border-slate-600'
                          }`}>
                            {isSelected && <CheckCircle2 className="w-3 h-3" />}
                          </span>
                          <span>{option.label}</span>
                        </span>

                        <span className="font-mono text-[#f1ca54] font-bold shrink-0">
                          {pct}% ({option.votes})
                        </span>
                      </div>

                      {/* Vote Bar */}
                      <div className="w-full bg-[#07130e] h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isSelected ? 'bg-gradient-to-r from-[#d8aa28] to-[#f1ca54]' : 'bg-[#1f4231]'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {userVotedOption && (
                <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Vote recorded locally in browser. Thank you for participating in Shūrā.</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

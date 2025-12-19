import React, { useState } from 'react';
import { Sparkles, Loader2, Target, Briefcase, Share2 } from 'lucide-react';
import { Theme } from '../types';
import { generateCampaignIdeas, CampaignIdea } from '../services/geminiService';

interface AICampaignGeneratorProps {
  theme: Theme;
}

const AICampaignGenerator: React.FC<AICampaignGeneratorProps> = ({ theme }) => {
  const [industry, setIndustry] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<CampaignIdea[]>([]);
  const [generated, setGenerated] = useState(false);

  const isDark = theme === Theme.DARK;
  const accentText = isDark ? 'text-lime-400' : 'text-stone-900';
  const buttonClass = isDark 
    ? 'bg-lime-400 text-slate-900 hover:bg-lime-300' 
    : 'bg-stone-900 text-white hover:bg-stone-700';

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry || !goal) return;

    setLoading(true);
    setIdeas([]);
    setGenerated(false);

    try {
      const results = await generateCampaignIdeas(industry, goal);
      setIdeas(results);
      setGenerated(true);
    } catch (error) {
      console.error("Failed to generate ideas", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`rounded-3xl p-8 md:p-12 transition-all duration-500 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-stone-50 border border-stone-200'}`}>
      <div className="text-center mb-10">
        <div className={`inline-flex items-center justify-center p-3 rounded-full mb-4 ${isDark ? 'bg-lime-400/10 text-lime-400' : 'bg-stone-200 text-stone-800'}`}>
          <Sparkles size={24} />
        </div>
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 font-serif`}>AI Strategy Generator</h2>
        <p className={`max-w-xl mx-auto ${isDark ? 'text-gray-400' : 'text-stone-600'}`}>
          Experience the power of Momentum Media's AI. Enter your details below to get 3 instant, high-impact campaign concepts tailored to your business.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="max-w-2xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-stone-400'}`}>
              <Briefcase size={18} />
            </div>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Industry (e.g., Real Estate, Fashion)"
              className={`w-full pl-12 pr-4 py-4 rounded-xl outline-none transition-all border ${
                isDark 
                  ? 'bg-slate-900/50 border-gray-700 focus:border-lime-400 text-white placeholder-gray-600' 
                  : 'bg-white border-stone-300 focus:border-stone-800 text-stone-900 placeholder-stone-400'
              }`}
            />
          </div>
          <div className="flex-1 relative group">
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-stone-400'}`}>
              <Target size={18} />
            </div>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Goal (e.g., Lead Gen, Brand Awareness)"
              className={`w-full pl-12 pr-4 py-4 rounded-xl outline-none transition-all border ${
                isDark 
                  ? 'bg-slate-900/50 border-gray-700 focus:border-lime-400 text-white placeholder-gray-600' 
                  : 'bg-white border-stone-300 focus:border-stone-800 text-stone-900 placeholder-stone-400'
              }`}
            />
          </div>
          <button 
            type="submit"
            disabled={loading || !industry || !goal}
            className={`px-8 py-4 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px] ${buttonClass}`}
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Generate'}
          </button>
        </div>
      </form>

      {ideas.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
          {ideas.map((idea, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${
                isDark 
                  ? 'bg-slate-800/50 border-white/10 hover:border-lime-400/50' 
                  : 'bg-white border-stone-200 hover:border-stone-400 shadow-sm'
              }`}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <h3 className={`text-xl font-bold mb-3 ${accentText}`}>{idea.title}</h3>
              <p className={`text-sm mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-stone-600'}`}>
                {idea.description}
              </p>
              <div>
                <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${isDark ? 'text-gray-500' : 'text-stone-400'}`}>
                  Suggested Channels
                </span>
                <div className="flex flex-wrap gap-2">
                  {idea.channels.map((channel, cIdx) => (
                    <span 
                      key={cIdx}
                      className={`text-xs px-2 py-1 rounded-md ${
                        isDark 
                          ? 'bg-white/10 text-gray-300' 
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AICampaignGenerator;

import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { Theme } from '../types';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

const SERVICES_LIST = [
  "Performance Marketing", "SEO Optimization", "Social Media Management",
  "Content Creation", "Web Design & Dev", "Lead Generation", 
  "Email Marketing", "Brand Strategy"
];

const BUDGET_RANGES = [
  "₹20k - ₹50k", "₹50k - ₹1 Lakh", "₹1 Lakh - ₹3 Lakhs", "₹3 Lakhs+"
];

const ProposalModal: React.FC<ProposalModalProps> = ({ isOpen, onClose, theme }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    services: [] as string[],
    budget: '',
    goals: ''
  });

  if (!isOpen) return null;

  const isDark = theme === Theme.DARK;
  
  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      onClose();
      setStep(1);
      alert("Thank you! Your custom proposal request has been received. We will contact you shortly.");
    }, 1000);
  };

  const modalBg = isDark ? 'bg-slate-900' : 'bg-[#F5F5DC]';
  const textPrimary = isDark ? 'text-white' : 'text-stone-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-stone-600';
  const borderClass = isDark ? 'border-gray-700' : 'border-stone-300';
  const inputBg = isDark ? 'bg-slate-800' : 'bg-white';
  const accentColor = isDark ? 'text-lime-400' : 'text-stone-900';
  const accentBg = isDark ? 'bg-lime-400 text-slate-900 hover:bg-lime-300' : 'bg-stone-900 text-white hover:bg-stone-700';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className={`relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${modalBg} ${textPrimary}`}>
        
        {/* Header */}
        <div className={`p-6 border-b ${borderClass} flex justify-between items-center`}>
          <div>
            <h2 className={`text-2xl font-serif font-bold ${accentColor}`}>Custom Proposal</h2>
            <p className={`text-sm ${textSecondary}`}>Let's build a strategy tailored to your growth.</p>
          </div>
          <button onClick={onClose} className={`p-2 rounded-full hover:bg-white/10 transition-colors`}>
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-700">
            <div 
                className={`h-full transition-all duration-500 ${isDark ? 'bg-lime-400' : 'bg-stone-900'}`} 
                style={{ width: `${(step / 3) * 100}%` }}
            />
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
                
                {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                        <h3 className="text-xl font-bold">Client Details</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold tracking-wider opacity-70">Full Name</label>
                                <input 
                                    required
                                    type="text" 
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    className={`w-full p-4 rounded-xl outline-none border focus:border-opacity-100 border-opacity-20 ${inputBg} ${borderClass} focus:border-current`}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold tracking-wider opacity-70">Work Email</label>
                                <input 
                                    required
                                    type="email" 
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                    className={`w-full p-4 rounded-xl outline-none border focus:border-opacity-100 border-opacity-20 ${inputBg} ${borderClass} focus:border-current`}
                                    placeholder="john@company.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold tracking-wider opacity-70">Company Name</label>
                                <input 
                                    type="text" 
                                    value={formData.company}
                                    onChange={e => setFormData({...formData, company: e.target.value})}
                                    className={`w-full p-4 rounded-xl outline-none border focus:border-opacity-100 border-opacity-20 ${inputBg} ${borderClass} focus:border-current`}
                                    placeholder="Acme Inc."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold tracking-wider opacity-70">Website URL</label>
                                <input 
                                    type="url" 
                                    value={formData.website}
                                    onChange={e => setFormData({...formData, website: e.target.value})}
                                    className={`w-full p-4 rounded-xl outline-none border focus:border-opacity-100 border-opacity-20 ${inputBg} ${borderClass} focus:border-current`}
                                    placeholder="https://acme.com"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-8 animate-fade-in">
                        <h3 className="text-xl font-bold">Scope of Work</h3>
                        
                        <div className="space-y-4">
                            <label className="text-xs uppercase font-bold tracking-wider opacity-70">Services Required</label>
                            <div className="grid grid-cols-2 gap-3">
                                {SERVICES_LIST.map(service => (
                                    <button
                                        key={service}
                                        type="button"
                                        onClick={() => handleServiceToggle(service)}
                                        className={`p-3 rounded-lg text-sm text-left transition-all border ${
                                            formData.services.includes(service)
                                            ? (isDark ? 'bg-lime-400 text-slate-900 border-lime-400' : 'bg-stone-900 text-white border-stone-900')
                                            : `${inputBg} ${borderClass} hover:border-opacity-50`
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            {service}
                                            {formData.services.includes(service) && <CheckCircle2 size={16} />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                             <label className="text-xs uppercase font-bold tracking-wider opacity-70">Monthly Budget Range</label>
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {BUDGET_RANGES.map(range => (
                                    <button
                                        key={range}
                                        type="button"
                                        onClick={() => setFormData({...formData, budget: range})}
                                        className={`p-3 rounded-lg text-sm text-center transition-all border ${
                                            formData.budget === range
                                            ? (isDark ? 'bg-lime-400 text-slate-900 border-lime-400' : 'bg-stone-900 text-white border-stone-900')
                                            : `${inputBg} ${borderClass} hover:border-opacity-50`
                                        }`}
                                    >
                                        {range}
                                    </button>
                                ))}
                             </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 animate-fade-in">
                        <h3 className="text-xl font-bold">Goals & Context</h3>
                         <div className="space-y-2">
                            <label className="text-xs uppercase font-bold tracking-wider opacity-70">What are your primary business goals?</label>
                            <textarea 
                                rows={5}
                                value={formData.goals}
                                onChange={e => setFormData({...formData, goals: e.target.value})}
                                className={`w-full p-4 rounded-xl outline-none border focus:border-opacity-100 border-opacity-20 ${inputBg} ${borderClass} focus:border-current`}
                                placeholder="E.g., Increase online sales by 20%, improve brand awareness in Tier 1 cities, launch a new product line..."
                            />
                        </div>
                    </div>
                )}

            </form>
        </div>

        {/* Footer Actions */}
        <div className={`p-6 border-t ${borderClass} flex justify-between`}>
            {step > 1 ? (
                <button 
                    onClick={() => setStep(step - 1)}
                    className={`px-6 py-3 rounded-full font-bold opacity-70 hover:opacity-100 transition-opacity`}
                >
                    Back
                </button>
            ) : (
                <div />
            )}

            {step < 3 ? (
                <button 
                    onClick={() => setStep(step + 1)}
                    className={`px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-transform active:scale-95 ${accentBg}`}
                >
                    Next Step <ArrowRight size={18} />
                </button>
            ) : (
                <button 
                    onClick={handleSubmit}
                    className={`px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-transform active:scale-95 ${accentBg}`}
                >
                    Submit Request <CheckCircle2 size={18} />
                </button>
            )}
        </div>

      </div>
    </div>
  );
};

export default ProposalModal;
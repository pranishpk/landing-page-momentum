import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Instagram, Facebook, Linkedin, Phone, Mail, ArrowRight, ArrowUpRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Theme } from './types';
import { SERVICES, PACKAGES, MARQUEE_ITEMS, LOGO_URL } from './constants';
import Chatbot from './components/Chatbot';
import IntroAnimation from './components/IntroAnimation';
import ProposalModal from './components/ProposalModal';
import AICampaignGenerator from './components/AICampaignGenerator';

function App() {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const [showIntro, setShowIntro] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProposalOpen, setIsProposalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  };

  const isDark = theme === Theme.DARK;

  // Dynamic Styles
  const bgClass = isDark ? 'bg-dark-bg' : 'bg-textured';
  const textClass = isDark ? 'text-dark-text' : 'text-light-text';
  const accentText = isDark ? 'text-dark-accent' : 'text-light-accent';
  const accentBg = isDark ? 'bg-dark-accent' : 'bg-light-accent';
  const navClass = isDark 
    ? (scrolled ? 'bg-dark-bg/90 backdrop-blur-md shadow-lg border-b border-white/5' : 'bg-transparent') 
    : (scrolled ? 'bg-[#F5F5DC]/90 backdrop-blur-md shadow-lg border-b border-stone-200' : 'bg-transparent');
  const buttonPrimary = isDark 
    ? 'bg-dark-accent text-slate-900 hover:bg-white hover:text-slate-900' 
    : 'bg-stone-900 text-white hover:bg-light-accent hover:text-stone-900';
  const buttonSecondary = isDark
    ? 'border border-dark-accent text-dark-accent hover:bg-dark-accent hover:text-slate-900'
    : 'border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      
      <ProposalModal 
        isOpen={isProposalOpen} 
        onClose={() => setIsProposalOpen(false)} 
        theme={theme} 
      />
      
      <div className={`min-h-screen transition-colors duration-500 ${bgClass} ${textClass} ${isDark ? 'font-sans' : 'font-serif'}`}>
        
        {/* Navigation */}
        <nav className={`fixed w-full z-40 transition-all duration-300 ${navClass}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex-shrink-0 cursor-pointer flex items-center gap-3" onClick={() => scrollToSection('hero')}>
                <div className={`w-10 h-10 rounded-full overflow-hidden border-2 ${isDark ? 'border-lime-400' : 'border-stone-900'}`}>
                    <img src={LOGO_URL} alt="Momentum Media" className="w-full h-full object-cover" />
                </div>
                <span className={`font-logo font-medium uppercase tracking-widest text-xl md:text-2xl ${accentText}`}>Momentum Media</span>
              </div>
              
              {/* Desktop Menu */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  {['Home', 'About', 'Services', 'Packages', 'Contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase())}
                      className={`relative group px-3 py-2 text-sm font-medium transition-colors ${isDark ? 'hover:text-dark-accent' : 'hover:text-light-accent'}`}
                    >
                      {item}
                      <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${isDark ? 'bg-dark-accent' : 'bg-light-accent'}`}></span>
                    </button>
                  ))}
                  <button onClick={toggleTheme} className={`p-2 rounded-full transition-transform hover:rotate-90 ${isDark ? 'hover:bg-white/10' : 'hover:bg-stone-200'}`}>
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-4">
                <button onClick={toggleTheme} className={`p-2 rounded-full ${isDark ? 'hover:bg-white/10' : 'hover:bg-stone-200'}`}>
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${isDark ? 'text-white' : 'text-stone-800'}`}
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={`md:hidden absolute w-full ${isDark ? 'bg-dark-bg/95 border-b border-white/10' : 'bg-[#F5F5DC]/95 border-b border-stone-200'}`}>
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                {['Home', 'About', 'Services', 'Packages', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase())}
                    className={`block w-full px-3 py-4 text-base font-medium border-b ${isDark ? 'border-white/5 hover:text-dark-accent' : 'border-stone-200 hover:text-light-accent'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Gradients */}
            {isDark && (
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-lime-500/10 blur-[100px]" />
            )}
            {!isDark && (
                 <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-yellow-500/10 blur-[100px]" />
            )}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in">
              <span className="block">Capture Demand.</span>
              <span className={`block mt-2 ${accentText}`}>Create Growth.</span>
            </h1>
            <p className={`mt-4 max-w-2xl mx-auto text-xl md:text-2xl ${isDark ? 'text-gray-400' : 'text-stone-600'} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
              Shape demand today and scale your business tomorrow.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <button 
                onClick={() => setIsProposalOpen(true)}
                className={`px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${buttonPrimary}`}
              >
                Get Your Custom Proposal
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 ${buttonSecondary}`}
              >
                Request a Callback
              </button>
            </div>
          </div>
        </section>

        {/* Marquee Section */}
        <section className={`py-4 overflow-hidden whitespace-nowrap ${isDark ? 'bg-white/5' : 'bg-stone-200/50'}`}>
          <div className="inline-block animate-marquee">
            {MARQUEE_ITEMS.map((item, i) => (
              <span key={i} className={`mx-8 text-lg font-bold uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-stone-500'}`}>
                {item} •
              </span>
            ))}
             {MARQUEE_ITEMS.map((item, i) => (
              <span key={`dup-${i}`} className={`mx-8 text-lg font-bold uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-stone-500'}`}>
                {item} •
              </span>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className={`text-sm font-bold uppercase tracking-widest mb-2 ${accentText}`}>Who We Are</h2>
                <h3 className="text-4xl font-bold mb-6">Redefining Digital Success</h3>
                <p className={`mb-6 text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-stone-600'}`}>
                  Momentum Media isn't just an agency; we are your strategic growth partner. 
                  Founded on the principles of data-driven creativity, we bridge the gap between 
                  brand storytelling and performance marketing.
                </p>
                <p className={`mb-8 text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-stone-600'}`}>
                  Our mission is simple: <strong>Create</strong> compelling narratives, <strong>Connect</strong> with your ideal audience, and <strong>Acquire</strong> loyal customers.
                </p>
                <div className={`p-6 border-l-4 ${isDark ? 'border-lime-400 bg-white/5' : 'border-stone-800 bg-white/50'}`}>
                    <p className="italic font-serif text-xl">"In the digital age, momentum is everything. Once you have it, you become unstoppable."</p>
                    <p className={`mt-4 font-bold ${accentText}`}>- The Founder</p>
                </div>
              </div>
              <div className="relative group">
                {/* Vignette Effect Container */}
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-md mx-auto shadow-2xl">
                    <div className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 ${isDark ? 'bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80' : 'bg-gradient-to-t from-[#F5F5DC] via-transparent to-transparent opacity-60'}`}></div>
                    {/* Placeholder for Founder Image */}
                    <img 
                        src="https://picsum.photos/600/800?grayscale" 
                        alt="Founder" 
                        className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                {/* Decorative Element behind */}
                <div className={`absolute -bottom-6 -right-6 w-full h-full rounded-2xl -z-10 border-2 ${isDark ? 'border-lime-400/30' : 'border-stone-800/20'}`}></div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Generator Section */}
        <section id="ai-tools" className={`py-20 ${isDark ? 'bg-white/[0.02]' : 'bg-stone-100/50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AICampaignGenerator theme={theme} />
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className={`py-24 ${isDark ? 'bg-white/5' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className={`text-sm font-bold uppercase tracking-widest mb-2 ${accentText}`}>Our Expertise</h2>
              <h3 className="text-4xl font-bold">Comprehensive Digital Solutions</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service) => {
                // Dynamic Icon Rendering
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const IconComponent = (Icons as any)[service.iconName];

                return (
                  <div 
                    key={service.id}
                    className={`group p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-stone-50 hover:bg-stone-100 shadow-sm'}`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors ${isDark ? 'bg-lime-400/10 text-lime-400 group-hover:bg-lime-400 group-hover:text-slate-900' : 'bg-stone-200 text-stone-800 group-hover:bg-stone-800 group-hover:text-white'}`}>
                      {IconComponent && <IconComponent size={24} />}
                    </div>
                    <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                    <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-stone-600'}`}>
                      {service.description}
                    </p>
                    <a href="#contact" className={`inline-flex items-center text-sm font-bold tracking-wide uppercase transition-colors ${isDark ? 'text-lime-400 hover:text-white' : 'text-stone-800 hover:text-stone-500'}`}>
                      Learn More <ArrowRight size={16} className="ml-2" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section id="packages" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className={`text-sm font-bold uppercase tracking-widest mb-2 ${accentText}`}>Pricing</h2>
              <h3 className="text-4xl font-bold">Growth Packages</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {PACKAGES.map((pkg) => (
                <div 
                  key={pkg.id}
                  className={`relative p-8 rounded-3xl flex flex-col ${
                    pkg.recommended 
                      ? (isDark ? 'bg-white/10 border-2 border-lime-400' : 'bg-white border-2 border-stone-800 shadow-xl scale-105 z-10')
                      : (isDark ? 'bg-white/5 border border-white/10' : 'bg-stone-50 border border-stone-200')
                  }`}
                >
                  {pkg.recommended && (
                    <span className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${isDark ? 'bg-lime-400 text-slate-900' : 'bg-stone-800 text-white'}`}>
                      Most Popular
                    </span>
                  )}
                  <h4 className="text-2xl font-bold mb-2">{pkg.title}</h4>
                  <div className="flex items-baseline mb-6">
                    <span className={`text-4xl font-bold ${accentText}`}>{pkg.price}</span>
                    <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-stone-500'}`}>/month</span>
                  </div>
                  <ul className="flex-1 space-y-4 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className={`mt-1 mr-3 rounded-full p-0.5 ${isDark ? 'bg-lime-400/20 text-lime-400' : 'bg-stone-200 text-stone-800'}`}>
                            <Icons.Check size={12} strokeWidth={3} />
                        </div>
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-stone-600'}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-full font-bold transition-all ${
                    pkg.recommended 
                       ? buttonPrimary 
                       : buttonSecondary
                  }`}>
                    Choose Plan
                  </button>
                  <p className="text-xs text-center mt-4 opacity-50">*Excludes Ad Spend</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-24 ${isDark ? 'bg-slate-900' : 'bg-stone-900 text-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid md:grid-cols-2 gap-16">
                <div>
                   <h2 className={`text-5xl font-bold mb-8 font-serif italic ${isDark ? 'text-lime-400' : 'text-light-accent'}`}>Let's talk business.</h2>
                   <p className="text-xl text-gray-400 mb-10">
                     Ready to scale? Schedule a consultation or reach out directly.
                   </p>
                   
                   <div className="space-y-6">
                      <div className="flex items-center gap-4">
                         <div className={`p-3 rounded-full ${isDark ? 'bg-white/10' : 'bg-white/20'}`}>
                            <Phone size={24} className={isDark ? 'text-lime-400' : 'text-white'} />
                         </div>
                         <span className="text-lg font-medium">+91 98765 43210</span>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className={`p-3 rounded-full ${isDark ? 'bg-white/10' : 'bg-white/20'}`}>
                            <Mail size={24} className={isDark ? 'text-lime-400' : 'text-white'} />
                         </div>
                         <span className="text-lg font-medium">hello@momentummedia.com</span>
                      </div>
                   </div>

                   <div className="flex gap-4 mt-12">
                      {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                        <a key={i} href="#" className={`p-3 rounded-full border transition-all hover:scale-110 ${isDark ? 'border-gray-700 hover:border-lime-400 hover:text-lime-400' : 'border-gray-600 hover:border-white hover:bg-white/10'}`}>
                           <Icon size={24} />
                        </a>
                      ))}
                   </div>
                </div>

                <div className={`p-8 rounded-3xl ${isDark ? 'bg-white/5' : 'bg-white/5'}`}>
                   <form className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-sm font-bold uppercase text-gray-400">First Name</label>
                            <input type="text" className="w-full bg-transparent border-b border-gray-600 py-2 focus:border-lime-400 outline-none transition-colors" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-sm font-bold uppercase text-gray-400">Last Name</label>
                            <input type="text" className="w-full bg-transparent border-b border-gray-600 py-2 focus:border-lime-400 outline-none transition-colors" />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-bold uppercase text-gray-400">Email</label>
                         <input type="email" className="w-full bg-transparent border-b border-gray-600 py-2 focus:border-lime-400 outline-none transition-colors" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-bold uppercase text-gray-400">Service Interest</label>
                         <select className="w-full bg-transparent border-b border-gray-600 py-2 focus:border-lime-400 outline-none transition-colors text-gray-400">
                            <option>Performance Marketing</option>
                            <option>SEO</option>
                            <option>Web Design</option>
                         </select>
                      </div>
                      <button type="button" className={`w-full py-4 rounded-full font-bold mt-4 flex items-center justify-center gap-2 transition-all ${isDark ? 'bg-lime-400 text-slate-900 hover:bg-lime-300' : 'bg-white text-slate-900 hover:bg-gray-200'}`}>
                         Send Message <ArrowUpRight size={20} />
                      </button>
                   </form>
                </div>
             </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-8 text-center text-sm ${isDark ? 'bg-slate-950 text-gray-500' : 'bg-stone-950 text-stone-500'}`}>
           <p>© {new Date().getFullYear()} Momentum Media. All rights reserved.</p>
        </footer>

        {/* Chatbot */}
        <Chatbot theme={theme} />

      </div>
    </>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import { LOGO_URL } from '../constants';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'enter' | 'pulse' | 'exit'>('enter');

  useEffect(() => {
    // Sequence:
    // 0ms: Enter (Fade in + Scale down slightly)
    // 1000ms: Pulse (Heartbeat effect)
    // 2500ms: Exit (Fade out)
    // 3000ms: Complete

    const pulseTimer = setTimeout(() => setStage('pulse'), 1000);
    const exitTimer = setTimeout(() => setStage('exit'), 2500);
    const completeTimer = setTimeout(onComplete, 3000);

    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (stage === 'exit' && false) return null; // Logic handled by opacity class

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ease-out ${stage === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative flex flex-col items-center justify-center">
        {/* Glow Effect */}
        <div className={`absolute inset-0 bg-lime-400/20 blur-[60px] rounded-full transition-all duration-1000 ${stage === 'pulse' ? 'scale-150 opacity-100' : 'scale-100 opacity-50'}`} />
        
        {/* Logo Image */}
        <img 
          src={LOGO_URL} 
          alt="Momentum Media" 
          className={`relative w-48 h-48 rounded-full shadow-2xl object-cover border-4 border-lime-400/50 transition-all duration-1000 ${
            stage === 'enter' ? 'scale-90 opacity-0' : 
            stage === 'pulse' ? 'scale-110 opacity-100' : 
            'scale-100 opacity-100'
          }`}
          style={{
             animation: stage === 'pulse' ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'
          }}
        />
      </div>
    </div>
  );
};

export default IntroAnimation;
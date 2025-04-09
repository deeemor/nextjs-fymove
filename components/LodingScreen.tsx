"use client";

import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onComplete, 
  duration = 2000 
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = 100 / (duration / 20);
        const newProgress = Math.min(prev + increment, 100);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 500);
        }
        
        return newProgress;
      });
    }, 20);
    
    return () => clearInterval(interval);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500"
      style={{
        opacity: progress >= 100 ? 0 : 1,
        background: "linear-gradient(135deg, rgb(37, 99, 235) 0%, rgb(147, 51, 234) 100%)",
        pointerEvents: progress >= 100 ? 'none' : 'auto'
      }}
    >
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <Activity className="w-16 h-16 text-white animate-pulse" />
        </div>
        <div className="absolute inset-0">
          <svg className="w-24 h-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="rgba(255,255,255,0.2)" 
              strokeWidth="8" 
            />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="white" 
              strokeWidth="8" 
              strokeDasharray="283" 
              strokeDashoffset={283 * (1 - progress / 100)}
              strokeLinecap="round"
              transform="rotate(-90 50 50)" 
              className="transition-all duration-300 ease-out"
            />
          </svg>
        </div>
      </div>
      
      <h2 className="text-4xl font-bold text-white mb-8">Loading</h2>
      
      <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="mt-4 text-white/80">{Math.round(progress)}% - Loading your experience...</p>
    </div>
  );
};

export default LoadingScreen;
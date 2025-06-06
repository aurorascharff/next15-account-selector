'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

export default function KeyPressed() {
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [showKeyHighlight, setShowKeyHighlight] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      setLastKey(event.key);
      setShowKeyHighlight(true);
      setTimeout(() => {
        setShowKeyHighlight(false);
      }, 100);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="fixed top-6 right-8 flex flex-row items-center gap-2 sm:top-2 sm:right-6">
      <div className={cn('bg-gray h-4 w-4 rounded-full shadow-lg', showKeyHighlight && 'bg-primary')} />
      <p className="text-end">{lastKey || 'Key pressed'}</p>
    </div>
  );
}

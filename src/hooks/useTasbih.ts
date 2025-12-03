import { useState, useEffect, useCallback } from 'react';

const TASBIH_KEY = 'prayer-app-tasbih';

interface TasbihState {
  count: number;
  target: number;
  totalCount: number;
}

const defaultState: TasbihState = {
  count: 0,
  target: 33,
  totalCount: 0,
};

export function useTasbih() {
  const [state, setState] = useState<TasbihState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(TASBIH_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setState({ ...defaultState, ...parsed });
      } catch (e) {
        console.error('Failed to parse tasbih state:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(TASBIH_KEY, JSON.stringify(state));
    }
  }, [state, isLoaded]);

  const increment = useCallback(() => {
    setState(prev => ({
      ...prev,
      count: prev.count + 1,
      totalCount: prev.totalCount + 1,
    }));
    
    // Vibrate if available
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  }, []);

  const reset = useCallback(() => {
    setState(prev => ({
      ...prev,
      count: 0,
    }));
  }, []);

  const resetAll = useCallback(() => {
    setState({
      ...defaultState,
      totalCount: 0,
    });
  }, []);

  const setTarget = useCallback((target: number) => {
    setState(prev => ({ ...prev, target }));
  }, []);

  return {
    count: state.count,
    target: state.target,
    totalCount: state.totalCount,
    isLoaded,
    increment,
    reset,
    resetAll,
    setTarget,
  };
}

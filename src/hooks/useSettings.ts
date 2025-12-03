import { useState, useEffect } from 'react';
import { Settings, City } from '@/types/prayer';
import { defaultCity } from '@/data/cities';

const SETTINGS_KEY = 'prayer-app-settings';

const defaultSettings: Settings = {
  city: defaultCity,
  notifications: {
    Fajr: true,
    Sunrise: false,
    Dhuhr: true,
    Asr: true,
    Maghrib: true,
    Isha: true,
  },
  theme: 'system',
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (e) {
        console.error('Failed to parse settings:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }
  }, [settings, isLoaded]);

  const updateCity = (city: City) => {
    setSettings(prev => ({ ...prev, city }));
  };

  const toggleNotification = (prayer: keyof Settings['notifications']) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [prayer]: !prev.notifications[prayer],
      },
    }));
  };

  const setTheme = (theme: Settings['theme']) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  return {
    settings,
    isLoaded,
    updateCity,
    toggleNotification,
    setTheme,
  };
}

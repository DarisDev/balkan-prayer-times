import { useState, useEffect, useCallback } from 'react';
import { PrayerTimes, PrayerTimesResponse, City } from '@/types/prayer';
import { getPrayerTimes, getNextPrayer, getTimeRemaining } from '@/services/prayerApi';

const PRAYER_ORDER = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export function usePrayerTimes(city: City) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [hijriDate, setHijriDate] = useState<string>('');
  const [gregorianDate, setGregorianDate] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; isToday: boolean } | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  const fetchTimes = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getPrayerTimes(city.latitude, city.longitude);
      const timings = response.data.timings;
      
      setPrayerTimes({
        Fajr: timings.Fajr,
        Sunrise: timings.Sunrise,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha,
      });
      
      const hijri = response.data.date.hijri;
      setHijriDate(`${hijri.day} ${hijri.month.en} ${hijri.year}`);
      
      const greg = response.data.date.gregorian;
      setGregorianDate(`${greg.weekday.en}, ${greg.day} ${greg.month.en} ${greg.year}`);
      
    } catch (e) {
      setError('Failed to load prayer times');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [city.latitude, city.longitude]);

  useEffect(() => {
    fetchTimes();
  }, [fetchTimes]);

  // Update next prayer and time remaining
  useEffect(() => {
    if (!prayerTimes) return;

    const updateNextPrayer = () => {
      const next = getNextPrayer(prayerTimes as unknown as Record<string, string>, PRAYER_ORDER);
      setNextPrayer(next);
      
      if (next) {
        setTimeRemaining(getTimeRemaining(next.time, next.isToday));
      }
    };

    updateNextPrayer();
    const interval = setInterval(updateNextPrayer, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [prayerTimes]);

  return {
    prayerTimes,
    hijriDate,
    gregorianDate,
    loading,
    error,
    nextPrayer,
    timeRemaining,
    refetch: fetchTimes,
  };
}

import { PrayerTimesResponse } from '@/types/prayer';

const API_BASE = 'https://api.aladhan.com/v1';

export async function getPrayerTimes(
  latitude: number,
  longitude: number,
  date?: Date
): Promise<PrayerTimesResponse> {
  const d = date || new Date();
  const dateStr = `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
  
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    method: '13', // Diyanet İşleri Başkanlığı, Turkey - used in Balkans region
  });
  
  const response = await fetch(`${API_BASE}/timings/${dateStr}?${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch prayer times');
  }
  
  return response.json();
}

export function getNextPrayer(
  times: Record<string, string>,
  prayerOrder: string[]
): { name: string; time: string; isToday: boolean } | null {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  for (const prayer of prayerOrder) {
    const [hours, minutes] = times[prayer].split(':').map(Number);
    const prayerMinutes = hours * 60 + minutes;
    
    if (prayerMinutes > currentTime) {
      return { name: prayer, time: times[prayer], isToday: true };
    }
  }
  
  // If all prayers have passed, next prayer is Fajr tomorrow
  return { name: prayerOrder[0], time: times[prayerOrder[0]], isToday: false };
}

export function getTimeRemaining(targetTime: string, isToday: boolean): string {
  const now = new Date();
  const [hours, minutes] = targetTime.split(':').map(Number);
  
  let target = new Date();
  target.setHours(hours, minutes, 0, 0);
  
  if (!isToday) {
    target.setDate(target.getDate() + 1);
  }
  
  const diff = target.getTime() - now.getTime();
  
  if (diff <= 0) return '0h 0m';
  
  const totalMinutes = Math.floor(diff / 60000);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  
  if (h > 0) {
    return `${h}h ${m}m`;
  }
  return `${m}m`;
}

export function formatTime12h(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

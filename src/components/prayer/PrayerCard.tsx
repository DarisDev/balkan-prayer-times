import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { formatTime12h } from '@/services/prayerApi';
import { PrayerName } from '@/types/prayer';
import { Sun, Sunrise, CloudSun, Cloud, Sunset, Moon } from 'lucide-react';

interface PrayerCardProps {
  name: PrayerName;
  time: string;
  isNext: boolean;
  arabicName: string;
}

const prayerIcons: Record<PrayerName, React.ReactNode> = {
  Fajr: <Sunrise className="w-5 h-5" />,
  Sunrise: <Sun className="w-5 h-5" />,
  Dhuhr: <CloudSun className="w-5 h-5" />,
  Asr: <Cloud className="w-5 h-5" />,
  Maghrib: <Sunset className="w-5 h-5" />,
  Isha: <Moon className="w-5 h-5" />,
};

const arabicNames: Record<PrayerName, string> = {
  Fajr: 'الفجر',
  Sunrise: 'الشروق',
  Dhuhr: 'الظهر',
  Asr: 'العصر',
  Maghrib: 'المغرب',
  Isha: 'العشاء',
};

export function PrayerCard({ name, time, isNext }: PrayerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex items-center justify-between p-4 rounded-xl transition-all duration-300',
        isNext
          ? 'bg-primary text-primary-foreground shadow-elevated'
          : 'bg-card text-card-foreground shadow-card hover:shadow-elevated'
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'p-2 rounded-lg',
            isNext ? 'bg-primary-foreground/20' : 'bg-primary/10'
          )}
        >
          {prayerIcons[name]}
        </div>
        <div>
          <p className="font-semibold">{name}</p>
          <p
            className={cn(
              'text-sm font-arabic',
              isNext ? 'text-primary-foreground/80' : 'text-muted-foreground'
            )}
          >
            {arabicNames[name]}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold">{formatTime12h(time)}</p>
        {isNext && (
          <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
            Next
          </span>
        )}
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { formatTime12h } from '@/services/prayerApi';
import { Clock, MapPin } from 'lucide-react';

interface NextPrayerHeroProps {
  prayerName: string;
  time: string;
  timeRemaining: string;
  city: string;
  hijriDate: string;
}

export function NextPrayerHero({
  prayerName,
  time,
  timeRemaining,
  city,
  hijriDate,
}: NextPrayerHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-2xl gradient-islamic p-6 text-primary-foreground shadow-elevated"
    >
      {/* Islamic geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10 islamic-pattern" />
      
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-foreground/10 rounded-full blur-2xl" />
      
      <div className="relative z-10">
        {/* Location and Date */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm opacity-90">
            <MapPin className="w-4 h-4" />
            <span>{city}</span>
          </div>
          <div className="text-sm font-arabic opacity-90">{hijriDate}</div>
        </div>

        {/* Main content */}
        <div className="text-center">
          <p className="text-sm uppercase tracking-wider opacity-80 mb-2">
            Next Prayer
          </p>
          <h2 className="text-4xl font-bold mb-1">{prayerName}</h2>
          <p className="text-2xl font-light mb-4">{formatTime12h(time)}</p>

          {/* Countdown */}
          <motion.div
            key={timeRemaining}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <Clock className="w-4 h-4" />
            <span className="font-semibold">{timeRemaining} remaining</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

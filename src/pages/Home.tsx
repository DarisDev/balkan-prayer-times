import { PageContainer } from '@/components/layout/PageContainer';
import { NextPrayerHero } from '@/components/prayer/NextPrayerHero';
import { PrayerCard } from '@/components/prayer/PrayerCard';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { useSettings } from '@/hooks/useSettings';
import { PrayerName } from '@/types/prayer';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const prayerOrder: PrayerName[] = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export default function Home() {
  const { settings } = useSettings();
  const {
    prayerTimes,
    hijriDate,
    gregorianDate,
    loading,
    error,
    nextPrayer,
    timeRemaining,
    refetch,
  } = usePrayerTimes(settings.city);

  if (loading) {
    return (
      <PageContainer>
        <div className="space-y-4">
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-6 w-32" />
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      </PageContainer>
    );
  }

  if (error || !prayerTimes) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <p className="text-muted-foreground mb-4">{error || 'Failed to load prayer times'}</p>
          <button
            onClick={refetch}
            className="flex items-center gap-2 text-primary hover:underline"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="islamic-pattern">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Next Prayer Hero */}
        {nextPrayer && (
          <NextPrayerHero
            prayerName={nextPrayer.name}
            time={nextPrayer.time}
            timeRemaining={timeRemaining}
            city={settings.city.name}
            hijriDate={hijriDate}
          />
        )}

        {/* Gregorian Date */}
        <p className="text-sm text-muted-foreground text-center">
          {gregorianDate}
        </p>

        {/* Prayer Times List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Prayer Times</h2>
          {prayerOrder.map((prayer, index) => (
            <motion.div
              key={prayer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <PrayerCard
                name={prayer}
                time={prayerTimes[prayer]}
                isNext={nextPrayer?.name === prayer}
                arabicName=""
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageContainer>
  );
}

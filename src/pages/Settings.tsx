import { PageContainer } from '@/components/layout/PageContainer';
import { CitySelector } from '@/components/settings/CitySelector';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { ThemeSelector } from '@/components/settings/ThemeSelector';
import { useSettings } from '@/hooks/useSettings';
import { motion } from 'framer-motion';
import { Info, Heart } from 'lucide-react';

export default function Settings() {
  const { settings, updateCity, toggleNotification, setTheme } = useSettings();

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Customize your experience</p>
        </div>

        {/* City Selection */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 px-1">
            Location
          </h2>
          <CitySelector
            selectedCity={settings.city}
            onSelectCity={updateCity}
          />
        </div>

        {/* Notifications */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 px-1">
            Notifications
          </h2>
          <NotificationSettings
            notifications={settings.notifications}
            onToggle={toggleNotification}
          />
        </div>

        {/* Theme */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 px-1">
            Appearance
          </h2>
          <ThemeSelector theme={settings.theme} onSelectTheme={setTheme} />
        </div>

        {/* About */}
        <div className="bg-card rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 gradient-islamic rounded-lg flex items-center justify-center">
              <Info className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Prayer Times</p>
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            A beautiful prayer times app for the Balkans region. Accurate prayer
            times, Qibla direction, and Tasbih counter.
          </p>
          <div className="flex items-center gap-1 mt-4 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-destructive fill-destructive" />
            <span>for Muslims in the Balkans</span>
          </div>
        </div>

        {/* Credits */}
        <div className="text-center text-xs text-muted-foreground pb-4">
          <p>Prayer times powered by AlAdhan API</p>
          <p className="mt-1">Using Muslim World League calculation method</p>
        </div>
      </motion.div>
    </PageContainer>
  );
}

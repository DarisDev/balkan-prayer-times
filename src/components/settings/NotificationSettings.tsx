import { Bell, BellOff } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Settings } from '@/types/prayer';
import { cn } from '@/lib/utils';

interface NotificationSettingsProps {
  notifications: Settings['notifications'];
  onToggle: (prayer: keyof Settings['notifications']) => void;
}

const prayers: { key: keyof Settings['notifications']; label: string; arabic: string }[] = [
  { key: 'Fajr', label: 'Fajr', arabic: 'الفجر' },
  { key: 'Sunrise', label: 'Sunrise', arabic: 'الشروق' },
  { key: 'Dhuhr', label: 'Dhuhr', arabic: 'الظهر' },
  { key: 'Asr', label: 'Asr', arabic: 'العصر' },
  { key: 'Maghrib', label: 'Maghrib', arabic: 'المغرب' },
  { key: 'Isha', label: 'Isha', arabic: 'العشاء' },
];

export function NotificationSettings({
  notifications,
  onToggle,
}: NotificationSettingsProps) {
  return (
    <div className="bg-card rounded-xl shadow-card overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-islamic rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Prayer Notifications</p>
            <p className="text-sm text-muted-foreground">
              Get reminded before each prayer
            </p>
          </div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {prayers.map((prayer) => (
          <div
            key={prayer.key}
            className="flex items-center justify-between p-4"
          >
            <div className="flex items-center gap-3">
              {notifications[prayer.key] ? (
                <Bell className="w-5 h-5 text-primary" />
              ) : (
                <BellOff className="w-5 h-5 text-muted-foreground" />
              )}
              <div>
                <p className="font-medium text-foreground">{prayer.label}</p>
                <p className="text-sm text-muted-foreground font-arabic">
                  {prayer.arabic}
                </p>
              </div>
            </div>
            <Switch
              checked={notifications[prayer.key]}
              onCheckedChange={() => onToggle(prayer.key)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

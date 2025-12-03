import { Sun, Moon, Monitor } from 'lucide-react';
import { Settings } from '@/types/prayer';
import { cn } from '@/lib/utils';

interface ThemeSelectorProps {
  theme: Settings['theme'];
  onSelectTheme: (theme: Settings['theme']) => void;
}

const themes: { value: Settings['theme']; label: string; icon: React.ReactNode }[] = [
  { value: 'light', label: 'Light', icon: <Sun className="w-5 h-5" /> },
  { value: 'dark', label: 'Dark', icon: <Moon className="w-5 h-5" /> },
  { value: 'system', label: 'System', icon: <Monitor className="w-5 h-5" /> },
];

export function ThemeSelector({ theme, onSelectTheme }: ThemeSelectorProps) {
  return (
    <div className="bg-card rounded-xl shadow-card p-4">
      <p className="font-semibold text-foreground mb-4">Theme</p>
      <div className="grid grid-cols-3 gap-2">
        {themes.map((t) => (
          <button
            key={t.value}
            onClick={() => onSelectTheme(t.value)}
            className={cn(
              'flex flex-col items-center gap-2 p-4 rounded-xl transition-all',
              theme === t.value
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {t.icon}
            <span className="text-sm font-medium">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

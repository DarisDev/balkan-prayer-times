import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TasbihCounterProps {
  count: number;
  target: number;
  totalCount: number;
  onIncrement: () => void;
  onReset: () => void;
  onOpenSettings: () => void;
}

export function TasbihCounter({
  count,
  target,
  totalCount,
  onIncrement,
  onReset,
  onOpenSettings,
}: TasbihCounterProps) {
  const progress = Math.min((count / target) * 100, 100);
  const isComplete = count >= target;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Stats */}
      <div className="flex gap-8 mb-8 text-center">
        <div>
          <p className="text-3xl font-bold text-foreground">{target}</p>
          <p className="text-sm text-muted-foreground">Target</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-foreground">{totalCount}</p>
          <p className="text-sm text-muted-foreground">Total</p>
        </div>
      </div>

      {/* Main Counter Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onIncrement}
        className={cn(
          'relative w-56 h-56 rounded-full flex items-center justify-center',
          'shadow-elevated transition-all duration-300',
          isComplete
            ? 'bg-accent animate-pulse-glow'
            : 'gradient-islamic hover:shadow-glow'
        )}
      >
        {/* Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-primary-foreground/20"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="48%"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className={isComplete ? 'text-accent-foreground' : 'text-accent'}
            strokeDasharray={`${2 * Math.PI * 48}`}
            strokeDashoffset={`${2 * Math.PI * 48 * (1 - progress / 100)}`}
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
          />
        </svg>

        {/* Count Display */}
        <AnimatePresence mode="wait">
          <motion.span
            key={count}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'text-6xl font-bold',
              isComplete ? 'text-accent-foreground' : 'text-primary-foreground'
            )}
          >
            {count}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Instruction */}
      <p className="mt-6 text-muted-foreground text-sm">Tap to count</p>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          className="rounded-full w-12 h-12"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onOpenSettings}
          className="rounded-full w-12 h-12"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Dhikr Suggestions */}
      <div className="mt-12 grid grid-cols-3 gap-3 w-full max-w-sm">
        {[
          { text: 'SubhanAllah', arabic: 'سبحان الله' },
          { text: 'Alhamdulillah', arabic: 'الحمد لله' },
          { text: 'Allahu Akbar', arabic: 'الله أكبر' },
        ].map((dhikr) => (
          <div
            key={dhikr.text}
            className="bg-card rounded-xl p-3 text-center shadow-card"
          >
            <p className="font-arabic text-lg text-foreground">{dhikr.arabic}</p>
            <p className="text-xs text-muted-foreground mt-1">{dhikr.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

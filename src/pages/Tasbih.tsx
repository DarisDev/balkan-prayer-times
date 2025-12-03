import { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { TasbihCounter } from '@/components/tasbih/TasbihCounter';
import { useTasbih } from '@/hooks/useTasbih';
import { motion } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const targetOptions = [33, 99, 100, 500, 1000];

export default function Tasbih() {
  const { count, target, totalCount, increment, reset, resetAll, setTarget } = useTasbih();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-foreground">Tasbih</h1>
          <p className="text-muted-foreground">Digital Dhikr Counter</p>
        </div>

        <TasbihCounter
          count={count}
          target={target}
          totalCount={totalCount}
          onIncrement={increment}
          onReset={reset}
          onOpenSettings={() => setSettingsOpen(true)}
        />

        {/* Settings Sheet */}
        <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
          <SheetContent side="bottom" className="rounded-t-3xl">
            <SheetHeader className="pb-4">
              <SheetTitle>Tasbih Settings</SheetTitle>
            </SheetHeader>
            
            <div className="space-y-6 pb-8">
              {/* Target Selection */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">
                  Count Target
                </p>
                <div className="flex flex-wrap gap-2">
                  {targetOptions.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTarget(t)}
                      className={cn(
                        'px-4 py-2 rounded-xl font-medium transition-all',
                        target === t
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset All */}
              <div>
                <Button
                  variant="destructive"
                  onClick={() => {
                    resetAll();
                    setSettingsOpen(false);
                  }}
                  className="w-full"
                >
                  Reset All Counts
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </motion.div>
    </PageContainer>
  );
}

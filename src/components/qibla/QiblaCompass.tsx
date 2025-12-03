import { motion } from 'framer-motion';
import { Compass, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QiblaCompassProps {
  qiblaDirection: number;
  compassHeading: number | null;
  qiblaRotation: number;
  compassSupported: boolean;
  permissionGranted: boolean;
  onRequestCompass: () => void;
}

export function QiblaCompass({
  qiblaDirection,
  compassHeading,
  qiblaRotation,
  compassSupported,
  permissionGranted,
  onRequestCompass,
}: QiblaCompassProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Qibla Direction Info */}
      <div className="text-center mb-8">
        <p className="text-muted-foreground text-sm mb-2">Qibla Direction</p>
        <p className="text-4xl font-bold text-foreground">{Math.round(qiblaDirection)}°</p>
        {compassHeading !== null && (
          <p className="text-sm text-muted-foreground mt-1">
            Compass: {Math.round(compassHeading)}°
          </p>
        )}
      </div>

      {/* Compass */}
      <div className="relative w-72 h-72">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-border bg-card shadow-elevated" />
        
        {/* Degree Markers */}
        <svg className="absolute inset-0 w-full h-full">
          {[...Array(36)].map((_, i) => {
            const angle = i * 10;
            const isCardinal = angle % 90 === 0;
            return (
              <line
                key={i}
                x1="50%"
                y1="4%"
                x2="50%"
                y2={isCardinal ? '10%' : '7%'}
                stroke="currentColor"
                strokeWidth={isCardinal ? 2 : 1}
                className="text-muted-foreground"
                transform={`rotate(${angle} 144 144)`}
              />
            );
          })}
        </svg>

        {/* Cardinal Directions */}
        <div className="absolute inset-0">
          <span className="absolute top-6 left-1/2 -translate-x-1/2 font-bold text-lg text-foreground">
            N
          </span>
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-semibold text-muted-foreground">
            S
          </span>
          <span className="absolute left-6 top-1/2 -translate-y-1/2 font-semibold text-muted-foreground">
            W
          </span>
          <span className="absolute right-6 top-1/2 -translate-y-1/2 font-semibold text-muted-foreground">
            E
          </span>
        </div>

        {/* Qibla Arrow */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: qiblaRotation }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Arrow pointing up (will be rotated to point to Qibla) */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-primary" />
              <div className="w-1 h-20 bg-primary rounded-full" />
            </div>
            
            {/* Kaaba Icon at center */}
            <div className="absolute w-16 h-16 bg-primary rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-2xl">🕋</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center max-w-xs">
        {!permissionGranted ? (
          <>
            <p className="text-muted-foreground text-sm mb-4">
              Enable compass for real-time direction
            </p>
            <Button onClick={onRequestCompass} className="gap-2">
              <Compass className="w-4 h-4" />
              Enable Compass
            </Button>
          </>
        ) : compassHeading !== null ? (
          <p className="text-muted-foreground text-sm">
            Point your phone towards the direction shown
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">
            Hold your phone flat and rotate until the arrow points up
          </p>
        )}
      </div>

      {/* Kaaba Info */}
      <div className="mt-8 bg-card rounded-xl p-4 shadow-card max-w-sm w-full">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 gradient-islamic rounded-lg flex items-center justify-center">
            <Navigation className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Kaaba, Mecca</p>
            <p className="text-sm text-muted-foreground">
              21.4225° N, 39.8262° E
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

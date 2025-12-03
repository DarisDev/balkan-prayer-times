import { PageContainer } from '@/components/layout/PageContainer';
import { QiblaCompass } from '@/components/qibla/QiblaCompass';
import { useQibla } from '@/hooks/useQibla';
import { useSettings } from '@/hooks/useSettings';
import { motion } from 'framer-motion';

export default function Qibla() {
  const { settings } = useSettings();
  const {
    qiblaDirection,
    compassHeading,
    qiblaRotation,
    compassSupported,
    permissionGranted,
    requestCompass,
  } = useQibla(settings.city.latitude, settings.city.longitude);

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">Qibla Direction</h1>
          <p className="text-muted-foreground">
            From {settings.city.name}, {settings.city.country}
          </p>
        </div>

        <QiblaCompass
          qiblaDirection={qiblaDirection}
          compassHeading={compassHeading}
          qiblaRotation={qiblaRotation}
          compassSupported={compassSupported}
          permissionGranted={permissionGranted}
          onRequestCompass={requestCompass}
        />
      </motion.div>
    </PageContainer>
  );
}

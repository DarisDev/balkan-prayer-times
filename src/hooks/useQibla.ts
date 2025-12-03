import { useState, useEffect, useCallback } from 'react';

const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

function calculateQiblaDirection(lat: number, lng: number): number {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  const kaabaLatRad = (KAABA_LAT * Math.PI) / 180;
  const kaabaLngRad = (KAABA_LNG * Math.PI) / 180;

  const y = Math.sin(kaabaLngRad - lngRad);
  const x =
    Math.cos(latRad) * Math.tan(kaabaLatRad) -
    Math.sin(latRad) * Math.cos(kaabaLngRad - lngRad);

  let qibla = (Math.atan2(y, x) * 180) / Math.PI;
  qibla = (qibla + 360) % 360;

  return qibla;
}

export function useQibla(latitude: number, longitude: number) {
  const [qiblaDirection, setQiblaDirection] = useState<number>(0);
  const [compassHeading, setCompassHeading] = useState<number | null>(null);
  const [compassSupported, setCompassSupported] = useState<boolean>(false);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  useEffect(() => {
    const direction = calculateQiblaDirection(latitude, longitude);
    setQiblaDirection(direction);
  }, [latitude, longitude]);

  const requestCompass = useCallback(async () => {
    // Check if DeviceOrientationEvent is available
    if (!window.DeviceOrientationEvent) {
      setCompassSupported(false);
      return;
    }

    // For iOS 13+, we need to request permission
    if (
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      try {
        const permission = await (
          DeviceOrientationEvent as any
        ).requestPermission();
        if (permission === 'granted') {
          setPermissionGranted(true);
          setCompassSupported(true);
          startCompass();
        }
      } catch (e) {
        console.error('Compass permission denied:', e);
        setCompassSupported(false);
      }
    } else {
      // For Android and older iOS
      setCompassSupported(true);
      setPermissionGranted(true);
      startCompass();
    }
  }, []);

  const startCompass = useCallback(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      let heading: number | null = null;

      // For iOS
      if ((event as any).webkitCompassHeading !== undefined) {
        heading = (event as any).webkitCompassHeading;
      }
      // For Android
      else if (event.alpha !== null) {
        heading = 360 - event.alpha;
      }

      if (heading !== null) {
        setCompassHeading(heading);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  // Calculate the rotation needed to point to Qibla
  const qiblaRotation = compassHeading !== null 
    ? qiblaDirection - compassHeading 
    : qiblaDirection;

  return {
    qiblaDirection,
    compassHeading,
    qiblaRotation,
    compassSupported,
    permissionGranted,
    requestCompass,
  };
}

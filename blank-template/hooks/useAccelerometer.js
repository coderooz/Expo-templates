import { useEffect, useState } from 'react';
import { Accelerometer } from 'expo-sensors';

export default function useAccelerometer() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    Accelerometer.addListener(setData);
    Accelerometer.setUpdateInterval(1000);

    return () => {
      Accelerometer.removeAllListeners();
    };
  }, []);

  return data;
}

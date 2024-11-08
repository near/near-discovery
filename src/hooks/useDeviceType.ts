import { useEffect, useState } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

const getDeviceType = (): DeviceType => {
  const mobileBreakpoint = 600;
  const tabletBreakpoint = 1000;
  const width = window.innerWidth;
  if (width <= mobileBreakpoint) {
    return 'mobile';
  } else if (width <= tabletBreakpoint) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    setDeviceType(getDeviceType());
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceType;
};

export default useDeviceType;

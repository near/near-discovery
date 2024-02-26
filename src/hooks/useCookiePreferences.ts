import { useEffect, useState } from 'react';

export function useCookiePreferences() {
  const [cookieData, setCookieData] = useState<boolean>();
  useEffect(() => {
    const cookiesAcknowledged = !!localStorage.getItem('cookiesAcknowledged') || false;
    setCookieData(cookiesAcknowledged);
  }, []);

  return cookieData;
}

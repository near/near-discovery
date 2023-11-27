import { useCallback, useEffect, useState } from 'react';

/**
 * Show or hide the banner
 */
export function useBanner() {
  const [isBannerVisible, setBanner] = useState<boolean>(false);

  useEffect(() => {
    const bannerState = localStorage.getItem('hintVisible');
    const banner = bannerState ? JSON.parse(bannerState) : true;
    setBanner(banner);
  }, []);

  const setBanners = useCallback((newBannerState: boolean) => {
    localStorage.setItem('hintVisible', JSON.stringify(newBannerState));
    setBanner(newBannerState);
  }, []);

  return [isBannerVisible, setBanners] as const;
}

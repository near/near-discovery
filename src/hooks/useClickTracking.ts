import { useCallback, useEffect } from 'react';

import { recordClick, recordTouchStart } from '@/utils/analytics';

export function useClickTracking() {
  const onClickEvent = useCallback((event: PointerEvent) => {
    switch (event.pointerType) {
      case 'mouse':
        recordClick(event);
        break;
      case 'touch':
        recordTouchStart(event);
        break;
      default:
        recordClick(event);
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('pointerdown', onClickEvent);

    return () => {
      window.removeEventListener('pointerdown', onClickEvent);
    };
  }, [onClickEvent]);
}

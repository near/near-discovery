import { useCallback, useState } from 'react';

import { usePriceStore } from '@/stores/price';

const DELAY = 1000 * 60 * 5;
export default function () {
  const setPriceStore = usePriceStore((store) => store.set);
  const [pending, setPending] = useState(false);
  const initializePrice = useCallback(async () => {
    if (pending) return;
    setPending(true);
    try {
      const res = await fetch('https://test-api.dapdap.net/get-token-price-by-dapdap');
      const data = await res.json();
      setPriceStore({
        price: data.data,
      });
      setTimeout(() => {
        initializePrice();
      }, DELAY);
    } finally {
      setPending(false);
    }
  }, [pending]);

  return { initializePrice };
}

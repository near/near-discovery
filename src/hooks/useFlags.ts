import { useCallback,useState } from 'react';

/**
 * Use Application flags
 *
 * `const [flags, setFlags] = useFlags();`
 *
 * Warning: setFlags causes page reload
 */

type Flags = {
  bosLoaderUrl?: string;
};

export function useFlags() {
  const [rawFlags, setRawFlags] = useState<Flags>(
    localStorage.getItem('flags') ? JSON.parse(localStorage.getItem('flags') || '') : {},
  );

  const setFlags = useCallback((newFlags: Flags) => {
    setRawFlags((f) => {
      const updated = { ...f, ...newFlags };
      localStorage.setItem('flags', JSON.stringify(updated));

      alert('Saved flags');

      // reload for changes to take effect
      location.reload();

      // may not be reachable
      return updated;
    });
  }, []);

  return [rawFlags, setFlags] as const;
}

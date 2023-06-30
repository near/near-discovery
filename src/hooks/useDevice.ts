import { useEffect, useState } from 'react';


export function useDevice() {
  const [matches, setMatches] = useState(true);

  useEffect(() => {
    setMatches(window.matchMedia('(min-width: 1200px)').matches);
  }, []);

  useEffect(() => {
    window.matchMedia('(min-width: 1200px)').addEventListener('change', (e) => setMatches(e.matches));
  }, []);

  return matches ? "desktop" : "mobile";
};

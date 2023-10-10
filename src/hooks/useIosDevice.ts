function detectIos() {
  if (typeof window === 'undefined') return;

  const isIosDevice = /iP(hone|od|ad)/.test(navigator.userAgent);
  let versionOfIos = 0;

  const versionMatch = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);

  if (versionMatch) {
    versionOfIos = Number(`${versionMatch[1]}.${versionMatch[2]}`);

    if (isNaN(versionOfIos)) {
      /*
        We need to ensure that we never return "NaN". It isn't referentially stable and
        causes infinite loops inside logic like useEffect().
      */
      versionOfIos = 0;
    }
  }

  return {
    isIosDevice,
    versionOfIos,
  };
}

export function useIosDevice() {
  const result = detectIos();

  return {
    isIosDevice: result?.isIosDevice,
    versionOfIos: result?.versionOfIos,
  };
}

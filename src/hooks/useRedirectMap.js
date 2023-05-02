import { useCallback, useEffect,useState } from "react";

import { useFlags } from "./useFlags";

/**
 * @returns [shouldWaitForMap, redirectMap, loaderError, loaderUrl]
 */
export default function useRedirectMap() {
  const [flags] = useFlags();
  const loaderUrl = flags?.bosLoaderUrl || process.env.LOCAL_COMPONENT_LOADER;

  const [redirectMap, setRedirectMap] = useState();
  const [loaderError, setloaderError] = useState();

  /**
   * Fetch local component versions if a local loader
   * is provided. must be provided as {components: { <path>: { code : <code>}}}
   */
  const fetchRedirectMap = useCallback(async () => {
    if (!loaderUrl) return;

    try {
      const res = await fetch(loaderUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await res.json();
      setRedirectMap(data.components);
    } catch (e) {
      console.error(e);
      setloaderError(true);
    }
  }, []);

  useEffect(() => {
    loaderUrl && fetchRedirectMap();
  }, [loaderUrl]);

  const shouldWaitForMap = !!loaderUrl;

  return [shouldWaitForMap, redirectMap, loaderError, loaderUrl];
}

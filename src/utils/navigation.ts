import type { NextRouter } from "next/router";

const ignoreRedirectPaths = [
  "/",
  "/signin",
  "/signup",
];

export const getRedirectQueryParams = (router: NextRouter): string => {
  const {
    query,
    asPath
  } = router;
  
  // remove unwanted hidden query param from next router
  delete query?.arbitrary;

  // recreating pathname from asPath to avoid /arbitrary path from router.pathname
  const path = asPath.split('?')[0];

  if (ignoreRedirectPaths.includes(path)) return "";

  const queryParams = {
    ...query,
    redirect: path,
  };

  return Object.keys(queryParams).length > 0
    ? `?${new URLSearchParams(queryParams).toString()}`
    : "";
};
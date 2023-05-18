// routes which may include additional path segments
// e.g. /about/contact-us, /papers/nightshade
const extendableRoutes: Record<string, string> = {
  about: 'https://pages.near.org/about',
  blog: 'https://pages.near.org/blog',
  developers: 'https://pages.near.org/developers',
  learn: 'https://pages.near.org/learn',
  papers: 'https://pages.near.org/papers',
};

// routes which are extendable but may have some paths
// already defined as dedicated pages so we do not attempt
// to generate them at build time and instead generate
// on demand at runtime
const extendableFallbacks: Record<string, string> = {
  ecosystem: 'https://pages.near.org/ecosystem',
  use: 'https://pages.near.org/use',
};

const finiteRoutes: Record<string, string> = {
  activate: 'https://pages.near.org/activate',
  brand: 'https://pages.near.org/brand',
  bridge: 'https://pages.near.org/bridge',
  'case-studies': 'https://pages.near.org/case-studies',
  'community-calendly': 'https://pages.near.org/community-calendly',
  defi: 'https://pages.near.org/defi',
  'educate-old': 'https://pages.near.org/educate-old',
  education: 'https://pages.near.org/education',
  events: 'https://pages.near.org/events',
  examples: 'https://pages.near.org/examples',
  lisbon: 'https://pages.near.org/lisbon',
  meetings: 'https://pages.near.org/meetings',
  metabuild: 'https://pages.near.org/metabuild',
  miami: 'https://pages.near.org/miami',
  'nbx22-showcase': 'https://pages.near.org/nbx22-showcase',
  'near-developer-program-terms-conditions': 'https://pages.near.org/near-developer-program-terms-conditions',
  nearconpitchfest: 'https://pages.near.org/nearconpitchfest',
  news: 'https://pages.near.org/about/press-center',
  'newsletter-thank-you': 'https://pages.near.org/newsletter-thank-you',
  nyc: 'https://pages.near.org/nyc',
  owc: 'https://pages.near.org/owc',
  privacy: 'https://pages.near.org/privacy/',
  sailgpsf: 'https://pages.near.org/sailgpsf',
  sf: 'https://pages.near.org/sf',
  spill: 'https://pages.near.org/spill',
  stakewars: 'https://pages.near.org/stakewars',
  'use-cases': 'https://pages.near.org/use-cases',
  'v3-developers': 'https://pages.near.org/v3-developers',
  'v3-use': 'https://pages.near.org/v3-use',
  'work-with-us': 'https://pages.near.org/work-with-us',
};

import IframeResizer from 'iframe-resizer-react';
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import { useClearCurrentComponent } from '@/hooks/useClearCurrentComponent';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      ...[...Object.keys(extendableRoutes), ...Object.keys(finiteRoutes)].map((route) => ({
        params: { arbitrary: [route] },
      })),
    ],
    fallback: 'blocking', // will cause pages to be statically generated on-demand when first requested
  };
};

type StaticProps = {
  notFound?: boolean;
  url?: string;
};

// compute the iframe url from the path segments
export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  if (!context.params?.arbitrary || !Array.isArray(context.params.arbitrary) || context.params.arbitrary.length === 0) {
    return {
      notFound: true,
    };
  }

  if (finiteRoutes[context.params.arbitrary[0]]) {
    return {
      props: {
        url: finiteRoutes[context.params.arbitrary[0]],
      },
    };
  }

  // logic is the same here for pre-generated extendable routes and fallbacks
  const extendableRouteConfig =
    extendableRoutes[context.params.arbitrary[0]] || extendableFallbacks[context.params.arbitrary[0]];
  if (extendableRouteConfig) {
    return {
      props: {
        url:
          extendableRouteConfig +
          (context.params.arbitrary.length > 1 ? '/' + context.params.arbitrary.slice(1).join('/') : ''),
      },
    };
  }

  return {
    notFound: true,
  };
};

const IframePage: NextPageWithLayout = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  useClearCurrentComponent();

  return <IframeResizer src={props.url} style={{ width: '1px', minWidth: '100%' }} checkOrigin={false} />;
};

IframePage.getLayout = useDefaultLayout;

export default IframePage;

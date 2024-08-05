const SEARCH_API_KEY_APPS = 'fc7644a5da5306311e8e9418c24fddc4';
const APPLICATION_ID_APPS = 'B6PI9UKKJT';
const INDEX_APPS = 'replica_prod_near-social-feed';
const API_URL_APPS = `https://${APPLICATION_ID_APPS}-dsn.algolia.net/1/indexes/${INDEX_APPS}/query?`;

const SEARCH_API_KEY_DOCS = '6b114c851c9921e654b5a1ffa8cffb93';
const APPLICATION_ID_DOCS = '0LUM67N2P2';
const INDEX_DOCS = 'near';
const API_URL_DOCS = `https://${APPLICATION_ID_DOCS}-dsn.algolia.net/1/indexes/${INDEX_DOCS}/query?`;

const URLS_INFO = {
  Docs: {
    SEARCH_API_KEY: SEARCH_API_KEY_DOCS,
    APPLICATION_ID: APPLICATION_ID_DOCS,
    INDEX: INDEX_DOCS,
    API_URL: API_URL_DOCS,
  },
  Apps: {
    SEARCH_API_KEY: SEARCH_API_KEY_APPS,
    APPLICATION_ID: APPLICATION_ID_APPS,
    INDEX: INDEX_APPS,
    API_URL: API_URL_APPS,
  },
  Components: {
    SEARCH_API_KEY: SEARCH_API_KEY_APPS,
    APPLICATION_ID: APPLICATION_ID_APPS,
    INDEX: INDEX_APPS,
    API_URL: API_URL_APPS,
  },
};

type Facet = 'Docs' | 'Apps' | 'Components';

interface URLS {
  [key: string]: {
    API_URL: string;
    SEARCH_API_KEY: string;
    APPLICATION_ID: string;
  };
}

declare const URLS: URLS;

interface SearchBody {
  query: string;
  page: number;
  optionalFilters: string[];
  clickAnalytics: boolean;
  filters?: string;
}

export const fetchSearchHits = async (facet: Facet, query: string, page = 0) => {
  const body: SearchBody = {
    query,
    page,
    optionalFilters: ['categories:nearcatalog<score=1>', 'categories:widget<score=2>'],
    clickAnalytics: true,
  };
  if (facet === 'Components') {
    body.filters = 'categories:widget AND NOT author:hypefairy.near AND NOT _tags:hidden';
  }

  const response = await fetch(URLS_INFO[facet].API_URL, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'X-Algolia-Api-Key': URLS_INFO[facet].SEARCH_API_KEY,
      'X-Algolia-Application-Id': URLS_INFO[facet].APPLICATION_ID,
    },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch search hits: ${response.statusText}`);
  }

  return await response.json();
};

import useDebounce from '@/hooks/useDebounce';
import * as S from './styles';
import { useEffect, useRef, useState } from 'react';

import { AppsResults } from './Search/AppsResults';
import { ComponentsResults } from './Search/ComponentsResults';
import { DocsResults } from './Search/DocsResults';

const SEARCH_API_KEY_APPS = 'fc7644a5da5306311e8e9418c24fddc4';
const APPLICATION_ID_APPS = 'B6PI9UKKJT';
const INDEX_APPS = 'replica_prod_near-social-feed';
const API_URL_APPS = `https://${APPLICATION_ID_APPS}-dsn.algolia.net/1/indexes/${INDEX_APPS}/query?`;

const SEARCH_API_KEY_DOCS = '6b114c851c9921e654b5a1ffa8cffb93';
const APPLICATION_ID_DOCS = '0LUM67N2P2';
const INDEX_DOCS = 'near';
const API_URL_DOCS = `https://${APPLICATION_ID_DOCS}-dsn.algolia.net/1/indexes/${INDEX_DOCS}/query?`;

const URLS = {
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

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('docs');
  const [docs, setDocs] = useState([]);
  const [apps, setApps] = useState([]);
  const [components, setComponents] = useState([]);
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 250);
  const componentRef = useRef(null);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchResults();
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        setIsFocus(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const docsComponents = (rawResp) => {
    return rawResp.hits.map((item, index) => {
      return <DocsResults key={index} item={item}></DocsResults>;
    });
  };

  const appsComponents = (rawResp) => {
    return Object.values(rawResp).map((item, index) => {
      return <AppsResults key={index} item={item}></AppsResults>;
    });
  };

  const componentComponents = (rawResp) => {
    return rawResp.hits.map((item, index) => {
      return <ComponentsResults key={index} item={item}></ComponentsResults>;
    });
  };

  const fetchResults = async () => {
    const [docs, apps, components] = await Promise.all([
      fetchSearchHits('Docs', debouncedSearchTerm),
      fetchCatalog(debouncedSearchTerm),
      fetchSearchHits('Components', debouncedSearchTerm),
    ]);

    setDocs(docsComponents(docs));
    setApps(appsComponents(apps));
    setComponents(componentComponents(components));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleOnClick = () => {
    setIsFocus(true);
  };

  const handleClear = () => {
    setSearchTerm('');
    setDocs([]);
    setApps([]);
    setComponents([]);
    setIsFocus(false);
  };

  const fetchSearchHits = async (facet, query) => {
    const body = {
      query,
      page: 0,
      optionalFilters: ['categories:nearcatalog<score=1>', 'categories:widget<score=2>'],
      clickAnalytics: true,
    };

    const response = await fetch(URLS[facet].API_URL, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Algolia-Api-Key': URLS[facet].SEARCH_API_KEY,
        'X-Algolia-Application-Id': URLS[facet].APPLICATION_ID,
      },
      method: 'POST',
    });

    return await response.json();
  };

  const fetchCatalog = async (query) => {
    const response = await fetch(`https://nearcatalog.xyz/wp-json/nearcatalog/v1/search?kw=${query}`);

    return await response.json();
  };

  return (
    <S.SearchWrapper ref={componentRef}>
      <S.SearchContainer onClick={() => handleOnClick()} $isFocus={isFocus}>
        <S.SearchIcon className="ph ph-magnifying-glass" $isFocus={isFocus} />
        <S.SearchInput type="text" value={searchTerm} onChange={handleSearch} placeholder="Search..." />
        {searchTerm && <i onClick={handleClear} className="ph ph-x-circle"></i>}
      </S.SearchContainer>

      <S.ResultsPopup $show={isFocus}>
        <S.TabContainer>
          <S.Tab $active={activeTab === 'docs'} onClick={() => handleTabChange('docs')} $isFirst={true}>
            Docs
          </S.Tab>
          <S.Tab $active={activeTab === 'apps'} onClick={() => handleTabChange('apps')}>
            Apps
          </S.Tab>
          <S.Tab $active={activeTab === 'components'} onClick={() => handleTabChange('components')} $isLast={true}>
            Components
          </S.Tab>
        </S.TabContainer>

        <S.ResultItem>
          {activeTab === 'docs' && docs}
          {activeTab === 'apps' && apps}
          {activeTab === 'components' && components}
          {!(docs.length || apps.length || components.length) && !searchTerm && 'Type in to search'}
          {!(docs.length || apps.length || components.length) && searchTerm && 'Searching...'}
        </S.ResultItem>
      </S.ResultsPopup>
    </S.SearchWrapper>
  );
};

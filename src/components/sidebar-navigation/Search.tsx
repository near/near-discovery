import useDebounce from '@/hooks/useDebounce';
import * as S from './styles';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin-bottom: 8px;
`;

const Tile = styled.div`
  display: flex;
  width: 100%;
`;
const ImageContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 16px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Name = styled.h2`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const Tagline = styled.p`
  margin: 8px 0 0 8px;
  font-size: 14px;
  color: #666;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  background: #f0f0f0;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 12px;
  color: #333;
  &:hover {
    cursor: pointer;
  }
`;

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
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('docs');
  const [docs, setDocs] = useState([]);
  const [apps, setApps] = useState([]);
  const [components, setComponents] = useState([]);
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 250);
  const router = useRouter();

  const redirect = (url: string) => () => router.push(url);
  const tabs = {
    docs: {
      label: 'Docs',
      component: docs,
    },
    apps: {
      label: 'Apps',
      component: apps,
    },
    components: {
      label: 'Components',
      component: components,
    },
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchResults();
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [debouncedSearchTerm]);

  const convertUrl = (url) => url.replace(/^https:\/\/docs\.near\.org\/(.+)$/, '/documentation/$1');

  const docsComponents = (rawResp) => {
    return rawResp.hits.map((item) => {
      return (
        // <Link href={convertUrl(item.url)}>
        <S.CardDocs key={item.hierarchy.lvl0} onClick={redirect(convertUrl(item.url))}>
          <S.TitleDocs>{item.hierarchy.lvl0}</S.TitleDocs>
          <S.SubtitleDocs>{item.hierarchy.lvl1}</S.SubtitleDocs>
          <S.ContentDocs>{item.content ? item.content.substr(0, 80) : ''}</S.ContentDocs>
        </S.CardDocs>
        // </Link>
      );
    });
  };

  const appsComponents = (rawResp) => {
    return Object.values(rawResp).map((item) => {
      return (
        // <Link href={`/nearcatalog.near/widget/Index?id=${item.slug}`} passHref>
        <Card key={item.profile.name}>
          <Tile>
            <ImageContainer>
              <Image src={item.profile.image.url} alt={item.profile.name} />
            </ImageContainer>
            <div>
              <Name onClick={redirect(`/nearcatalog.near/widget/Index?id=${item.slug}`)}>{item.profile.name}</Name>

              <TagContainer>
                {Object.entries(item.profile.tags).map(([key, value]) => (
                  <Tag key={key} onClick={redirect(`/nearcatalog.near/widget/Index?cat=${value}`)}>
                    {value}
                  </Tag>
                ))}
              </TagContainer>
            </div>
          </Tile>
          <Tile>
            <Tagline>{item.profile.tagline}</Tagline>
          </Tile>
        </Card>
        // </Link>
      );
    });
  };

  const fetchResults = async () => {
    const docs = await fetchSearchHits('Docs', debouncedSearchTerm);
    setDocs(docsComponents(docs));
    console.log('Search', docs);
    const apps = await fetchCatalog(debouncedSearchTerm);
    // console.log("fetchResults Apps", apps.values());
    setApps(appsComponents(apps));

    const mockResults = [
      `${activeTab} Resultado 1 para "${searchTerm}"`,
      `${activeTab} Resultado 2 para "${searchTerm}"`,
      `${activeTab} Resultado 3 para "${searchTerm}"`,
    ];

    // setApps(mockResults);
    setComponents(mockResults);
    setShowResults(true);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleClear = () => {
    setSearchTerm('');
    setShowResults(false);
  };

  // const fetchSearchHits = (facet, query, { pageNumber, configs, optionalFilters }) => {
  //   let body = {
  //     query,
  //     page: pageNumber ?? 0,
  //     optionalFilters: optionalFilters ?? ["categories:nearcatalog<score=1>", "categories:widget<score=2>"],
  //     clickAnalytics: true,
  //     ...configs,
  //   };

  const fetchSearchHits = async (facet, query) => {
    const body = {
      query,
      page: 0,
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
    <S.SearchWrapper>
      <S.SearchIcon>🔍</S.SearchIcon>
      <S.SearchInput type="text" placeholder="Buscar..." value={searchTerm} onChange={handleSearch} />
      {searchTerm && <S.ClearButton onClick={handleClear}>×</S.ClearButton>}

      <S.ResultsPopup $show={showResults}>
        <S.TabContainer>
          <S.Tab $active={activeTab === 'docs'} onClick={() => handleTabChange('docs')}>
            Docs
          </S.Tab>
          <S.Tab $active={activeTab === 'apps'} onClick={() => handleTabChange('apps')}>
            Apps
          </S.Tab>
          <S.Tab $active={activeTab === 'components'} onClick={() => handleTabChange('components')}>
            Components
          </S.Tab>
        </S.TabContainer>

        <S.ResultItem>{tabs[activeTab].component}</S.ResultItem>
      </S.ResultsPopup>
    </S.SearchWrapper>
  );
};

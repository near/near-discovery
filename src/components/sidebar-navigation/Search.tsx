import useDebounce from '@/hooks/useDebounce';
import * as S from './styles';
import { useEffect, useRef, useState } from 'react';

import { AppsResults } from './Search/AppsResults';
import { ComponentsResults } from './Search/ComponentsResults';
import { DocsResults } from './Search/DocsResults';
import Link from 'next/link';
import { fetchSearchHits } from '@/utils/angoliaSearchApi';
import { fetchCatalog } from '@/utils/catalogSearchApi';

const TABS = ['Docs', 'Apps', 'Components'] as const;
type TabType = (typeof TABS)[number];

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 250);
  const componentRef = useRef<HTMLDivElement>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<TabType>('Docs');
  const [results, setResults] = useState<Record<TabType, React.ReactNode | null>>({
    Docs: null,
    Apps: null,
    Components: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchResults();
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchResults();
    } else {
      setResults({ Docs: null, Apps: null, Components: null });
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
        setIsFocus(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchResults = async () => {
    setIsLoading(true);

    const [docs, apps, components] = await Promise.all([
      fetchSearchHits('Docs', debouncedSearchTerm),
      fetchCatalog(debouncedSearchTerm),
      fetchSearchHits('Components', debouncedSearchTerm),
    ]);

    setResults({
      Docs: renderResults('Docs', docs),
      Apps: renderResults('Apps', apps),
      Components: renderResults('Components', components),
    });

    setIsLoading(false);
  };

  const renderResults = (type: TabType, rawResp: any) => {
    if (!rawResp || (Array.isArray(rawResp.hits) && !rawResp.hits.length)) {
      return <div>No results found for &quot;{debouncedSearchTerm}&quot;</div>;
    }

    switch (type) {
      case 'Docs':
        return rawResp.hits.map((item: any, index: number) => <DocsResults key={index} item={item} />);
      case 'Apps':
        return Object.values(rawResp).map((item: any, index: number) => <AppsResults key={index} item={item} />);
      case 'Components':
        return rawResp.hits.map((item: any, index: number) => <ComponentsResults key={index} item={item} />);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId);
  };

  const handleOnClick = () => {
    setIsFocus(true);
  };

  const handleClear = () => {
    setSearchTerm('');
    setResults({ Docs: null, Apps: null, Components: null });
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
          <S.Tab $active={activeTab === 'Docs'} onClick={() => handleTabChange('Docs')} $isFirst={true}>
            Docs
          </S.Tab>
          <S.Tab $active={activeTab === 'Apps'} onClick={() => handleTabChange('Apps')}>
            Apps
          </S.Tab>
          <S.Tab $active={activeTab === 'Components'} onClick={() => handleTabChange('Components')} $isLast={true}>
            Components
          </S.Tab>
        </S.TabContainer>

        <S.ResultItem>
          {isLoading ? 'Searching...' : searchTerm ? results[activeTab] : 'Type in to search'}
        </S.ResultItem>
        <S.Footer>
          <Link href={`/search?query=${searchTerm}`}>See all results </Link>
        </S.Footer>
      </S.ResultsPopup>
    </S.SearchWrapper>
  );
};

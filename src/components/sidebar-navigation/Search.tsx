import * as HoverCard from '@radix-ui/react-hover-card';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

import { Input } from '@/components/lib/Input';
import useDebounce from '@/hooks/useDebounce';
import { fetchSearchHits } from '@/utils/algoliaSearchApi';
import { fetchCatalog } from '@/utils/catalogSearchApi';

import { AppsResults } from './Search/AppsResults';
import { ComponentsResults } from './Search/ComponentsResults';
import { DocsResults } from './Search/DocsResults';
import * as S from './styles';

const TABS = ['Docs', 'Apps', 'Components'] as const;
type TabType = (typeof TABS)[number];

export const Search = ({ inputRef }: { inputRef: any }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 250);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isCursorOutside, setIsCursorOutside] = useState(false);

  const [activeTab, setActiveTab] = useState<TabType>('Docs');
  const [results, setResults] = useState<Record<TabType, React.ReactNode | null>>({
    Docs: null,
    Apps: null,
    Components: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const renderResults = useCallback(
    (type: TabType, rawResp: any) => {
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
    },
    [debouncedSearchTerm],
  );

  const fetchResults = useCallback(async () => {
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
  }, [debouncedSearchTerm, renderResults]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchResults();
    }
  }, [debouncedSearchTerm, fetchResults]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchResults();
    } else {
      setResults({ Docs: null, Apps: null, Components: null });
    }
  }, [debouncedSearchTerm, fetchResults]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId);
  };

  const handleFocusChange = () => {
    setIsFocus(!isFocus);
  };

  const handleOnBlur = () => {
    setIsFocus(!isCursorOutside);
  };

  const handleInteractOutside = (value: any) => {
    console.log({ value });
    setIsCursorOutside(!value);
  };

  const showTypeAheadDropdown = isFocus && !!searchTerm;

  return (
    <S.SearchWrapper ref={inputRef}>
      <HoverCard.Root
        openDelay={200}
        closeDelay={300}
        open={showTypeAheadDropdown}
        onOpenChange={handleInteractOutside}
      >
        <HoverCard.Trigger asChild>
          <Input
            placeholder="Search..."
            type="search"
            name="search"
            onInput={handleSearch}
            value={searchTerm}
            onFocus={handleFocusChange}
            onBlur={handleOnBlur}
          />
        </HoverCard.Trigger>
        <HoverCard.Content
          asChild
          side="bottom"
          align="start"
          alignOffset={-40}
          sideOffset={10}
          hideWhenDetached={true}
        >
          <S.ResultsPopup>
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

            <S.ResultItem onClick={handleFocusChange}>
              {isLoading ? 'Searching...' : searchTerm ? results[activeTab] : 'Type in to search'}
            </S.ResultItem>
            <S.Footer onClick={handleFocusChange}>
              <Link href={`/search?query=${searchTerm}`}>See all results </Link>
            </S.Footer>
          </S.ResultsPopup>
        </HoverCard.Content>
      </HoverCard.Root>
    </S.SearchWrapper>
  );
};

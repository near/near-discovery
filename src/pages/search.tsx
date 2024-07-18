import Pagination from '@/components/Pagination';
import { AppsResults } from '@/components/sidebar-navigation/Search/AppsResults';
import { ComponentsResults } from '@/components/sidebar-navigation/Search/ComponentsResults';
import { DocsResults } from '@/components/sidebar-navigation/Search/DocsResults';
import useDebounce from '@/hooks/useDebounce';
import { useDefaultLayout } from '@/hooks/useLayout';
import { fetchSearchHits } from '@/utils/angoliaSearchApi';
import { fetchCatalog } from '@/utils/catalogSearchApi';
import type { NextPageWithLayout } from '@/utils/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-bottom: 30px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 25px;
  padding: 10px 15px;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  font-size: 16px;
  outline: none;
  margin-left: 10px;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const Tab = styled.button<{
  active: boolean;
}>`
  background: ${(props) => (props.active ? '#eee' : 'transparent')};
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #eee;
  }
`;

const TABS = ['Docs', 'Apps', 'Components'] as const;
type TabType = (typeof TABS)[number];

const SearchPage: NextPageWithLayout = () => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
  const [activeTab, setActiveTab] = useState<TabType>('Docs');
  const [results, setResults] = useState<Record<TabType, React.ReactNode | null>>({
    Docs: null,
    Apps: null,
    Components: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 250);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchResults();
    } else {
      setResults({ Docs: null, Apps: null, Components: null });
    }
  }, [debouncedSearchTerm]);

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
      return <Subtitle>No results found for &quot;{debouncedSearchTerm}&quot;</Subtitle>;
    }

    switch (type) {
      case 'Docs':
        return (
          <>
            {rawResp.hits.map((item: any, index: number) => (
              <DocsResults key={index} item={item} />
            ))}
            <Pagination
              currentPage={rawResp.page + 1}
              totalPages={rawResp.nbPages}
              onPageChange={(page) => handlePageChange(type, page)}
            />
          </>
        );
      case 'Apps':
        return Object.values(rawResp).map((item: any, index: number) => <AppsResults key={index} item={item} />);
      case 'Components':
        return (
          <>
            {rawResp.hits.map((item: any, index: number) => (
              <ComponentsResults key={index} item={item} />
            ))}
            <Pagination
              currentPage={rawResp.page + 1}
              totalPages={rawResp.nbPages}
              onPageChange={(page) => handlePageChange(type, page)}
            />
          </>
        );
    }
  };

  const handlePageChange = async (type: TabType, page: number) => {
    const newResults = await fetchSearchHits(type, debouncedSearchTerm, page - 1);
    setResults((prev) => ({ ...prev, [type]: renderResults(type, newResults) }));
  };

  const handleClear = () => {
    setSearchTerm('');
    setResults({ Docs: null, Apps: null, Components: null });
  };

  return (
    <SearchContainer>
      <Title>Search</Title>
      <Subtitle>Explore and find everything on the Blockchain Operating System</Subtitle>

      <SearchBox>
        <div className="ph ph-magnifying-glass" />
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && <i onClick={handleClear} className="ph ph-x-circle"></i>}
      </SearchBox>

      <TabContainer>
        {TABS.map((tab) => (
          <Tab key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
            {tab}
          </Tab>
        ))}
      </TabContainer>

      {isLoading ? 'Searching...' : searchTerm ? results[activeTab] : 'Type in to search'}
    </SearchContainer>
  );
};
SearchPage.getLayout = useDefaultLayout;

export default SearchPage;

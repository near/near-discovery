import { useRouter } from 'next/router';
import styled from 'styled-components';

export const CardDocs = styled.a`
  width: 100%;
  display: block;
  border-radius: 8px;
  padding: 16px 0;
  text-decoration: none;
  text-align: left;
  max-width: 500px;

  &:hover {
    cursor: pointer;
    text-decoration: none;
  }
`;

export const TitleDocs = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  font-weight: bold;
`;

export const SubtitleDocs = styled.h3`
  font-size: 14px;
  font-weight: normal;
  margin: 4px 0 12px;
`;

export const ContentDocs = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;
  line-height: 1.4;
`;

interface Item {
  url: string;
  url_without_anchor: string;
  anchor: string;
  content: null | string;
  type: string;
  hierarchy: {
    lvl0: string;
    lvl1: string;
  };
  objectID: string;
  _highlightResult: {
    hierarchy: {
      lvl0: HighlightResultItem;
      lvl1: HighlightResultItem;
    };
    hierarchy_camel: [
      {
        lvl0: HighlightResultItem;
        lvl1: HighlightResultItem;
      },
    ];
  };
}

interface HighlightResultItem {
  value: string;
  matchLevel: 'none' | 'full' | 'partial';
  fullyHighlighted?: boolean;
  matchedWords: string[];
}

interface DocsResultsProps {
  item: Item;
}

export const DocsResults: React.FC<DocsResultsProps> = ({ item }) => {
  const router = useRouter();
  const redirect = (url: string) => () => router.push(url);
  const convertUrl = (url: string) => url.replace(/^https:\/\/docs\.near\.org\/(.+)$/, '/documentation/$1');

  return (
    <CardDocs onClick={redirect(convertUrl(item.url))}>
      <TitleDocs>{item.hierarchy.lvl0}</TitleDocs>
      <SubtitleDocs>{item.hierarchy.lvl1}</SubtitleDocs>
      <ContentDocs>{item.content ? item.content.substr(0, 80) : ''}</ContentDocs>
    </CardDocs>
  );
};

import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const ListItem = styled.div`
  background: white;
  border-radius: 10px;
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-right: 15px;
  cursor: pointer;
`;

const WidgetName = styled.div`
  font-weight: bold;
  width: 120px;
  text-overflow: ellipsis;
  cursor: pointer;
`;

const Author = styled.div`
  color: #888;
  font-size: 0.9em;
  width: 120px;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
`;

const Icon = styled.i`
  cursor: pointer;
`;
interface Item {
  author: string;
  widget_name: string;
  code: string;
  receipt_hash: string;
  receipt_date: number;
  receipt_block_height: number;
  indexed_date: number;
  categories: string[];
  image: {
    ipfs_cid: string;
  };
  content: string;
  name: string;
  profile_name: string;
  tags: string[];
  objectID: string;
  _snippetResult: {
    content: {
      value: string;
      matchLevel: string;
    };
  };
  _highlightResult: {
    author: HighlightResult;
    widget_name: HighlightResult;
    content: HighlightResult;
    name: HighlightResult;
    tags: HighlightResult[];
  };
}

interface HighlightResult {
  value: string;
  matchLevel: string;
  fullyHighlighted?: boolean;
  matchedWords: string[];
}

interface ComponentsResultsProps {
  item: Item;
}

export const ComponentsResults: React.FC<ComponentsResultsProps> = ({ item }) => {
  const router = useRouter();
  const redirect = (url: string) => () => router.push(url);
  return (
    <ListItem>
      <Logo
        onClick={redirect(`/near/widget/ComponentDetailsPage?src=${item.author}/widget/${item.widget_name}`)}
        src={`https://ipfs.near.social/ipfs/${item?.image?.ipfs_cid}`}
      ></Logo>
      <WidgetName onClick={redirect(`/near/widget/ComponentDetailsPage?src=${item.author}/widget/${item.widget_name}`)}>
        {item.name || item.profile_name}
      </WidgetName>
      <Author onClick={redirect(`/near/widget/ProfilePage?accountId=${item.author}`)}>@{item.author}</Author>
      <Icon className="ph ph-arrow-right" onClick={redirect(`/${item.author}/widget/${item.widget_name}`)}></Icon>
    </ListItem>
  );
};

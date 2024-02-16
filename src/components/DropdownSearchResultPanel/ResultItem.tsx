import { memo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import {
  LoadingWrapper,
  StyledResultItemContainer,
  StyledResultTitle,
  StyledResultItem,
  StyledResultItemTitle,
  StyledResultItemImg,
  StyledMore,
} from './styles';

const ResultItem = ({ title, loading, items, onClick }: any) => {
  const [showAll, setShowAll] = useState(false);
  return (
    <StyledResultItemContainer>
      <StyledResultTitle>
        <div>{title}</div>
        <StyledMore onClick={() => setShowAll(!showAll)}>{showAll ? 'Close' : 'View More'}</StyledMore>
      </StyledResultTitle>

      {items &&
        (showAll ? items : items.slice(0, 5)).map((item: any, index: number) => (
          <StyledResultItem
            key={item.name + index}
            onClick={() => {
              onClick(item);
            }}
            data-bp="3001-005"
          >
            <StyledResultItemImg src={item.logo} alt="" />
            <StyledResultItemTitle>{item.name}</StyledResultItemTitle>
          </StyledResultItem>
        ))}
      {loading && (
        <LoadingWrapper className="flex-align">
          <Skeleton width="30px" height="30px" containerClassName="skeleton" />
          <Skeleton width="216px" height="18px" containerClassName="skeleton" />
        </LoadingWrapper>
      )}
    </StyledResultItemContainer>
  );
};

export default memo(ResultItem);

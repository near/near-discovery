import { memo } from 'react';
import styled from 'styled-components';
import ArrowIcon from '@/components/Icons/ArrowIcon';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
`;
const Item = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;
  text-align: left;
  align-items: center;
`;
const DownArrow = styled.div`
  color: #979abe;
`;
const ItemLogo = styled.img`
  width: 26px;
  height: 26px;
`;
const ItemSymbol = styled.div`
  font-size: 16px;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const ItemEmptyLogo = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: #373a53;
`;
const ItemEmptyLabel = styled.div`
  font-size: 16px;
  color: #fff;
`;

interface Item {
  icon: string;
  symbol: string;
}

const Select = ({ item }: { item?: Item }) => {
  return (
    <Container>
      <Item>
        {item ? (
          <>
            <ItemLogo src={item.icon} />
            <ItemSymbol>{item.symbol}</ItemSymbol>
          </>
        ) : (
          <>
            <ItemEmptyLogo />
            <ItemEmptyLabel>Select</ItemEmptyLabel>
          </>
        )}
      </Item>
      <DownArrow>
        <ArrowIcon />
      </DownArrow>
    </Container>
  );
};

export default memo(Select);

import { memo } from 'react';
import styled from 'styled-components';
import dexs from '@/config/bridge/dexs';
import { Trade } from '../types';

const Container = styled.div`
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #373a53;
  border-radius: 16px;
  background-color: rgba(55, 58, 83, 0.5);
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RouteWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const RouteIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 10px;
`;
const RouteName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #979abe;
`;
const Tags = styled.div`
  display: flex;
  gap: 4px;
`;
const Tag = styled.div`
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 400;

  &.best {
    color: #6affe4;
    background-color: rgba(106, 255, 228, 0.2);
  }
  &.fast {
    color: #a4b2ff;
    background-color: rgba(164, 178, 255, 0.2);
  }
`;
const Amount = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;
const Desc = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #979abe;
`;

const Route = ({ trade }: { trade: Trade }) => {
  const dex = dexs[trade.dex];
  return (
    <Container>
      <Flex>
        <RouteWrapper>
          <RouteIcon src={dex?.icon} />
          <RouteName>{dex?.name}</RouteName>
        </RouteWrapper>
        <Tags>
          <Tag className="best">Best Return</Tag>
          <Tag className="fast">Fastest</Tag>
        </Tags>
      </Flex>
      <Flex>
        <Amount>~{trade?.amount}</Amount>
        <Desc>
          ~{trade?.time}｜Gas {trade?.gasCost}
        </Desc>
      </Flex>
    </Container>
  );
};

export default memo(Route);

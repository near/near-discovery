import { memo } from 'react';
import styled from 'styled-components';
import Checkbox from '@/components/Checkbox';

import dexs from '@/config/bridge/dexs';

import type { Trade } from '../types';

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
  margin-bottom: 10px;
  cursor: pointer;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RouteWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100px;
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

const StyledCheckBox = styled.div`
  margin-left: 5px;
`;

const Route = (
  { trade, selected, onSelected } : 
  { trade: Trade, selected: boolean, onSelected: (chain: Trade) => void;}) => {
  const route = trade.route
  const dex = dexs[trade.dex];

  const bridgeDetail: any = {}

  if (route) {
    if (route.steps && route.steps.length) {
      const toolDetails = route.steps[0].toolDetails
      bridgeDetail.icon = toolDetails.logoURI
      bridgeDetail.name = toolDetails.name
    }
  } else if (dex) {
    bridgeDetail.icon = dex.icon
    bridgeDetail.name = dex.name
  }

  return (
    <Container onClick={() => onSelected(trade)} style={{ border: selected ? '1px solid #ebf479' : 0 }}>
      <Flex>
        <RouteWrapper>
          <RouteIcon src={bridgeDetail.icon} />
          <RouteName title={bridgeDetail.name}>{bridgeDetail.name}</RouteName>
        </RouteWrapper>
        <Flex>
          <Tags>
            {
              trade.tags?.map((tag, index) => {
                return tag.indexOf('Best') > -1 ? <Tag className="best">{ tag }</Tag> : <Tag className="fast">{ tag }</Tag>
              })
            }
          </Tags>
          <StyledCheckBox><Checkbox checked={selected} round /></StyledCheckBox>
        </Flex>
        
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

import { memo } from 'react';
import styled from 'styled-components';

import ArrowIcon from '@/components/Icons/ArrowIcon';

import type { Trade } from '../types';
import Route from './Route';

const Container = styled.div`
  margin-top: 10px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;
const Label = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #979abe;
`;
const AmountWrapper = styled.div`
  display: flex;
  gap: 5px;
  color: #979abe;
  align-items: center;
`;
const Amount = styled.div`
  font-size: 12px;
  font-weight: 400;
`;
const AmountArrow = styled.div`
  transform: rotate(-90deg);
`;
const Content = styled.div`
  margin-top: 10px;
`;

const Routes = ({ 
  trades, selectedTradeIndex, onSelected
 } : { 
  trades?: Trade[];
  selectedTradeIndex: number;
  onSelected: (index: number) => void
}) => {
  return (
    <Container>
      {/* <Header>
        <Label>Select Bridge Route</Label>
        <AmountWrapper>
          <Amount>1 Routes</Amount>
          <AmountArrow>
            <ArrowIcon size={10} />
          </AmountArrow>
        </AmountWrapper>
      </Header> */}
      {trades && (
        <Content>
          {
            trades ? trades.map((trade, index) => 
            <Route onSelected={() => {
              onSelected(index)
            }} selected={ selectedTradeIndex === index } trade={trade} />): null
          }
        </Content>
      )}
    </Container>
  );
};

export default memo(Routes);

import { memo, useState } from 'react';
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
  cursor: pointer;
`;
const Amount = styled.div`
  font-size: 12px;
  font-weight: 400;
`;
const AmountArrow = styled.div`
  transform: rotate(-90deg);
`;

const AmountArrowMore = styled.div`
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

  const [showMore, setShowMore] = useState<boolean>(false)

  return (
    <Container>
      {trades && trades.length ? (
        <>
          <Header>
            <Label>Select Bridge Route</Label>
            <AmountWrapper onClick={() => {
              setShowMore(!showMore)
            }}>
              <Amount>{trades?.length} Routes</Amount>
              {
                showMore ? 
                <AmountArrowMore>
                  <ArrowIcon size={10} />
                </AmountArrowMore> : 
                <AmountArrow>
                  <ArrowIcon size={10} />
                </AmountArrow>
              }
            </AmountWrapper>
          </Header>
          <Content>
              {
                trades.map((trade, index) => {
                  return (
                    index === 0 || showMore ? <Route key={trade.amount + index} onSelected={() => {
                      onSelected(index)
                    }} selected={ selectedTradeIndex === index } trade={trade} 
                    /> : null
                  )
                })
              }
            </Content>
        </>
      ) : null}
    </Container>
  );
};

export default memo(Routes);

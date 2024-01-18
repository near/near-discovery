import { memo } from 'react';

import iconCoin from '@/assets/images/icon_coin.svg';
import Image from 'next/image';
import { CHAIN_LIST } from '../../constants';
import {
  QueryNameStatusType
} from '../../types';
import {
  StyledChain,
  StyledChainList,
  StyledChainListWrapper,
  StyledFlex,
  StyledGetPriceOff,
  StyledQueryResult,
  StyledReward,
  StyledRewardText,
  StyledStatus,
  StyledStatusWrapper,
  StyledSvg,
  StyledText,
  StyledWrapper
} from './styles';

const QueryResult = ({ label, status, onClaim }: { label: string, status: QueryNameStatusType, onClaim: any }) => {
  const handleClaim = function () {
    onClaim && onClaim()
  }
  return (
    <StyledQueryResult>
      <StyledStatusWrapper className={status === 2 ? 'success' : ''}>
        <StyledFlex $gap='11px'>
          <StyledChainListWrapper>
            <StyledChainList>
              {
                CHAIN_LIST.map((chain, index) => {
                  return (
                    <StyledChain key={index}>
                      <Image src={chain.icon} width={20} height={20} alt='chain' />
                    </StyledChain>
                  )
                })
              }
            </StyledChainList>
          </StyledChainListWrapper>
          <StyledText $size='16px' $weight='700'>{label}</StyledText>
        </StyledFlex>
        {
          status === 2 ? (
            <StyledStatus onClick={() => handleClaim()}>Claim</StyledStatus>
          ) : (
            <StyledStatus>Taken</StyledStatus>
          )
        }

      </StyledStatusWrapper>
      {
        status === 2 && (
          <StyledFlex $direction='column' $gap='20px' style={{ marginTop: 18 }}>
            <StyledGetPriceOff>Get price on 60% off</StyledGetPriceOff>
            <StyledFlex $direction='column' $gap='21px'>
              <StyledText $size='16px' $weight='700'>You’ll also get on DapDap</StyledText>
              <StyledReward>
                <StyledSvg>
                  <Image src={iconCoin} alt='iconCoin' />
                </StyledSvg>
                <StyledRewardText>+200 PTS</StyledRewardText>
              </StyledReward>
            </StyledFlex>
          </StyledFlex>
        )
      }
    </StyledQueryResult>
  );
};

export default memo(QueryResult);

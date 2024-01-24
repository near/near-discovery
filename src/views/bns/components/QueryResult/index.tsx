import { memo } from 'react';

import iconCoin from '@/assets/images/icon_coin.svg';
import Image from 'next/image';
import { CHAIN_LIST } from '../../constants';
import type {
  QueryNameStatusType
} from '../../types';
import {
  StyledChain,
  StyledChainList,
  StyledChainListWrapper,
  StyledFlex,
  StyledGetPriceOff,
  StyledLabelWrapper,
  StyledPriceOff,
  StyledQueryResult,
  StyledReward,
  StyledRewardText,
  StyledStatus,
  StyledStatusContent,
  StyledStatusWrapper,
  StyledSvg,
  StyledText,
  StyledWrapper
} from './styles';

const QueryResult = ({ label, status, onClaim }: { label: string, status: QueryNameStatusType, onClaim: any }) => {
  const handleClaim = function () {
    onClaim && onClaim()
  }
  return label.length > 0 ? (
    <StyledQueryResult>
      {
        label.length < 3 ? (
          <StyledWrapper style={{ width: 432, opacity: 0.5 }}>
            <StyledText $size='15px' $weight='600'>
              Minimum of 3 characters
            </StyledText>
          </StyledWrapper>
        ) : (
          <StyledStatusWrapper className={status === 2 ? 'success' : ''}>
            <StyledStatusContent>
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
                <StyledLabelWrapper>
                  <StyledText style={{ width: 'max-content' }} $size='16px' $weight='700'>{label}</StyledText>
                </StyledLabelWrapper>
              </StyledFlex>
              {
                status === 2 ? (
                  <StyledStatus onClick={() => handleClaim()}>Claim</StyledStatus>
                ) : (
                  <StyledStatus>Taken</StyledStatus>
                )
              }
            </StyledStatusContent>
          </StyledStatusWrapper>
        )
      }

      {
        status === 2 && (
          <StyledFlex $direction='column' $gap='20px' style={{ marginTop: 18 }}>
            <StyledFlex $justify='flex-end' style={{ width: '100%' }}>
              <StyledGetPriceOff>Get price on <StyledPriceOff>60% off</StyledPriceOff></StyledGetPriceOff>
            </StyledFlex>
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
    </StyledQueryResult >
  ) : <></>;
};

export default memo(QueryResult);

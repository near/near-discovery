import { memo } from 'react';
import {
  StyledBnsName,
  StyledBnsNames,
  StyledFlex,
  StyledHead,
  StyledPrimary,
  StyledText
} from './styles';

import bnsAvatar from '@/assets/images/bns_avatar.svg';
import Image from 'next/image';
import { COIN_TYLE_LIST, COIN_TYLE_MAP } from '../../constants';
const YourBnsNames = ({ bnsNames, onClick }: any) => {
  const handleClick = function (bnsName: any) {
    onClick && onClick(bnsName)
  }
  return (
    <StyledBnsNames>
      <StyledHead>Your BNS Names ({bnsNames.length})</StyledHead>
      <StyledFlex $justify='flex-start' $gap='13px' $wrap='wrap'>
        {
          bnsNames.map((bnsName: any, index: number) => {
            const filterCoinTypeList = COIN_TYLE_LIST.filter(coinType => bnsName.addresses && bnsName.addresses[coinType])
            return (
              <StyledBnsName key={index} onClick={() => handleClick(bnsName)}>
                {bnsName.isPrimaryName && <StyledPrimary>Primary</StyledPrimary>}
                <Image src={bnsAvatar} width={50} height={50} alt='bnsAvatar' />
                <StyledText $size='18px' $weight='700' $line='120%'>{bnsName.name}</StyledText>
                <StyledFlex $gap='6px'>
                  {
                    filterCoinTypeList.map(coinType => {
                      const coin = COIN_TYLE_MAP[coinType]
                      return <Image src={coin.icon} width={18} height={18} key={coinType} alt='coinType' />
                    })
                  }
                </StyledFlex>
              </StyledBnsName>
            )
          })
        }
      </StyledFlex>

    </StyledBnsNames>
  );
};

export default memo(YourBnsNames);

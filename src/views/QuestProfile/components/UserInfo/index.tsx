import {
  StyledContainer,
  StyledContent,
  StyledBg,
  StyledSmallCircle,
  StyledBigCircle,
  StyledAvatar,
  StyledAddress,
  StyledLabels,
  StyledLabel,
  StyledCoin,
  StyledMedal,
  StyledSteps,
  StyledName,
} from './styles';

import { memo } from 'react';
import { ellipsAccount } from '@/utils/account';

const UserInfo = () => {
  return (
    <StyledContainer>
      <StyledContent>
        <StyledAvatar />
        <StyledName>@dappmeup</StyledName>
        <StyledAddress>{ellipsAccount('0xC25d79fc4970479B88068Ce8891eD9bE5799210D')}</StyledAddress>
        <StyledLabels>
          <StyledLabel>
            <StyledCoin $size={21} />
            <span style={{ color: '#EBF479' }}>535 PTS</span>
          </StyledLabel>
          <StyledLabel>
            <StyledMedal $size={22} />
            <span>Rank #2345</span>
          </StyledLabel>
          <StyledLabel>
            <StyledSteps $size={25} />
            <span>Beginner</span>
          </StyledLabel>
        </StyledLabels>
      </StyledContent>
      <StyledBg />
      <StyledSmallCircle />
      <StyledBigCircle />
    </StyledContainer>
  );
};

export default memo(UserInfo);

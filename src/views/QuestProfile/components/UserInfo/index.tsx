import { memo } from 'react';

import useAccount from '@/hooks/useAccount';
import { ellipsAccount } from '@/utils/account';

import Socials from './Socials';
import {
  StyledAddress,
  StyledAvatar,
  StyledBg,
  StyledBigCircle,
  StyledCoin,
  StyledContainer,
  StyledContent,
  StyledInfo,
  StyledLabel,
  StyledLabels,
  StyledLabelsWrapper,
  StyledMedal,
  StyledName,
  StyledSmallCircle,
  StyledAvatarBox,
  StyledSteps,
} from './styles';

const UserInfo = ({ info, onSuccess }: any) => {
  const { account } = useAccount();
  return (
    <StyledContainer>
      <StyledContent>
        <StyledInfo>
          {info.avatar ? <StyledAvatar src={info.avatar} /> : <StyledAvatarBox />}

          <div>
            <StyledName>{info.username}</StyledName>
            <StyledAddress>{ellipsAccount(account)}</StyledAddress>
          </div>
        </StyledInfo>
        <StyledLabelsWrapper>
          <StyledLabels>
            <StyledLabel>
              <StyledCoin $size={21} />
              <span style={{ color: '#EBF479' }}>{info.reward} PTS</span>
            </StyledLabel>
            <StyledLabel>
              <StyledMedal $size={22} />
              <span>Rank #{info.rank}</span>
            </StyledLabel>
            {/* <StyledLabel>
            <StyledSteps $size={25} />
            <span>Beginner</span>
          </StyledLabel> */}
          </StyledLabels>
          {/* <Socials info={info} onSuccess={onSuccess} /> */}
        </StyledLabelsWrapper>
      </StyledContent>
      <StyledBg />

      <StyledSmallCircle />
      <StyledBigCircle />
    </StyledContainer>
  );
};

export default memo(UserInfo);

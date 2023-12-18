import { memo } from 'react';
import { ellipsAccount } from '@/utils/account';
import Socials from './Socials';
import useAccount from '@/hooks/useAccount';
import {
  StyledAddress,
  StyledAvatar,
  StyledBg,
  StyledBigCircle,
  StyledCoin,
  StyledContainer,
  StyledContent,
  StyledLabel,
  StyledLabels,
  StyledMedal,
  StyledName,
  StyledSmallCircle,
  StyledSteps,
  StyledInfo,
  StyledLabelsWrapper,
} from './styles';

const UserInfo = ({ info, onSuccess }: any) => {
  const { account } = useAccount();
  return (
    <StyledContainer>
      <StyledContent>
        <StyledInfo>
          <StyledAvatar src={info.avatar} />
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
          <Socials info={info} onSuccess={onSuccess} />
        </StyledLabelsWrapper>
      </StyledContent>
      <StyledBg />
      <StyledSmallCircle />
      <StyledBigCircle />
    </StyledContainer>
  );
};

export default memo(UserInfo);

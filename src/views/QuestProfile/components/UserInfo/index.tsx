import { memo } from 'react';

import useAccount from '@/hooks/useAccount';
import { ellipsAccount } from '@/utils/account';

import {
  StyledAddress,
  StyledAvatar,
  StyledAvatarBox,
  StyledAvatarContainer,
  StyledBg,
  StyledBigCircle,
  StyledCoin,
  StyledContainer,
  StyledContent,
  StyledInfo,
  StyledKol,
  StyledLabel,
  StyledLabels,
  StyledLabelsWrapper,
  StyledMedal,
  StyledName,
  StyledNameWrapper,
  StyledSmallCircle
} from './styles';

const UserInfo = ({ info, onSuccess }: any) => {
  const { account } = useAccount();
  return (
    <StyledContainer>
      <StyledContent>
        <StyledInfo>
          <StyledAvatarContainer>
            {info.avatar ? <StyledAvatar src={info.avatar} /> : <StyledAvatarBox />}
            {
              info?.is_kol && (
                <StyledKol>
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="32" viewBox="0 0 64 32" fill="none">
                    <path d="M56.6101 24.7894C62.4469 21.5557 64.6653 13.953 61.6641 7.8143C58.6476 1.64441 51.4454 -0.816426 45.5691 2.43915C43.384 3.64972 38.4009 4.82897 31.9258 4.87183C25.5314 4.91416 20.2292 3.83361 17.7587 2.66772C11.6975 -0.192841 4.66018 2.74699 2.01566 9.09679C-0.617081 15.4183 2.03945 22.8645 8.06309 25.7073C14.9043 28.9359 24.0353 30.1483 32.0747 30.0951C40.0339 30.0424 49.4838 28.7375 56.6101 24.7894Z" fill="#EBF479" stroke="#262836" stroke-width="2" stroke-linecap="round"/>
                    <path d="M8.42202 19.9258C7.59124 19.1096 10.4789 11.1599 11.8752 7.41301C12.7262 5.12937 17.4383 7.07324 17.8075 7.47838C18.5474 8.29028 16.228 10.0984 15.6918 12.7489C17.8611 11.1257 20.4162 8.55413 21.1874 8.63778C22.1515 8.74235 25.896 12.53 24.8596 12.9751C24.0305 13.3312 20.5727 15.1954 17.5118 16.1643C20.1869 18.1271 24.6044 20.0276 24.5288 21.1405C24.4184 22.766 20.9489 24.1037 18.8521 23.8277C17.0758 23.5939 15.7662 19.8071 14.9907 18.0788C14.8701 18.9949 15.1254 21.9687 14.4065 22.5204C13.4015 23.2919 9.07686 21.8195 8.42202 19.9258Z" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M32.7622 25.4242C36.9357 25.4242 40.3189 21.9126 40.3189 17.5809C40.3189 13.2492 36.9357 9.73764 32.7622 9.73764C28.5888 9.73764 25.2056 13.2492 25.2056 17.5809C25.2056 21.9126 28.5888 25.4242 32.7622 25.4242ZM32.9374 20.402C34.0051 20.402 34.8707 19.1037 34.8707 17.5022C34.8707 15.9006 34.0051 14.6023 32.9374 14.6023C31.8698 14.6023 31.0042 15.9006 31.0042 17.5022C31.0042 19.1037 31.8698 20.402 32.9374 20.402Z" fill="black"/>
                    <path d="M55.429 20.7117C52.0662 22.12 47.9734 22.6197 45.3005 22.8443C44.7988 22.8864 44.343 22.5504 44.2653 22.0581C43.8562 19.4678 43.1081 12.7458 41.9742 9.48153C41.3768 7.75962 47.4426 7.12456 48.514 7.53892C49.5854 7.95329 47.856 17.3828 48.4699 17.8927C48.9888 18.3238 54.4313 14.1292 55.7792 15.3775C56.2478 15.8115 56.63 20.2087 55.429 20.7117Z" fill="black"/>
                  </svg>
                </StyledKol>
              )
            }
          </StyledAvatarContainer>

          <StyledNameWrapper>
            <StyledName>{info.username}</StyledName>
            <StyledAddress>{ellipsAccount(account)}</StyledAddress>
          </StyledNameWrapper>
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

import Timer from '../Timer';
import {
  StyledCampaipnContainer,
  StyledBox,
  StyledHeader,
  StyledTitle,
  StyledHeartBox,
  StyledDesc,
  StyledTags,
  StyledTag,
  StyledCoin,
  JoinedAccountsBox,
  JoinedAccounts,
  JoinedAccountsAmount,
} from './styles';

import { memo } from 'react';

const Campaign = () => {
  return (
    <StyledCampaipnContainer>
      <StyledBox>
        <div>
          <StyledHeader>
            <StyledTitle>Quest Campaign</StyledTitle>
            <StyledHeartBox>
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
                <path
                  d="M8.50419 15C8.28039 15 8.07318 14.9117 7.91569 14.7671L1.51685 8.56799C1.03435 8.10292 0.65186 7.54977 0.391498 6.94054C0.131136 6.33132 -0.00192296 5.67811 2.09967e-05 5.01874C2.09967e-05 3.67773 0.538784 2.41702 1.51685 1.46949C2.49491 0.521949 3.79623 0 5.18043 0C6.40716 0 7.56757 0.409529 8.50419 1.16435C10.5349 -0.473769 13.5768 -0.377409 15.4832 1.47752C16.4544 2.41906 17 3.69568 17 5.02677C17 6.35785 16.4544 7.63447 15.4832 8.57602L9.09268 14.7671C8.9352 14.9197 8.71969 15 8.50419 15ZM5.18043 1.606C4.23553 1.606 3.35693 1.95931 2.68555 2.60974C2.02245 3.25214 1.64946 4.11135 1.64946 5.02677C1.64946 5.94218 2.01417 6.79336 2.68555 7.44379L8.4959 13.0728L14.298 7.45182C14.6251 7.13498 14.8846 6.7588 15.0617 6.34477C15.2388 5.93074 15.3299 5.48697 15.3299 5.03881C15.3299 4.59065 15.2388 4.14689 15.0617 3.73286C14.8846 3.31883 14.6251 2.94265 14.298 2.6258C13.6349 1.9834 12.748 1.62206 11.8031 1.62206C10.8582 1.62206 9.97957 1.97537 9.30819 2.6258L9.06782 2.85867C8.99113 2.93311 8.90005 2.99217 8.79978 3.03247C8.69951 3.07276 8.59202 3.0935 8.48347 3.0935C8.37491 3.0935 8.26742 3.07276 8.16715 3.03247C8.06688 2.99217 7.9758 2.93311 7.89911 2.85867L7.65874 2.6258C7.01223 1.95931 6.12534 1.606 5.18043 1.606Z"
                  fill="white"
                />
              </svg>
            </StyledHeartBox>
          </StyledHeader>
          <StyledDesc>By finishing all quests in this campaign, you will get 100 extra PTS.</StyledDesc>
        </div>
        <StyledTags>
          <StyledTag style={{ padding: '0px 10px 0px 6px' }}>
            <StyledCoin $size={20} />
            <span style={{ color: '#EBF479' }}>Extra 100 PTS</span>
          </StyledTag>
          <StyledTag>
            <span>10 Qusts:</span>
            <span style={{ color: 'var(--onboarding-color' }}>4 #onboarding</span>
            <span style={{ color: 'var(--social-color' }}>3 #social</span>
            <span style={{ color: 'var(--engage-color' }}>3 #engage</span>
          </StyledTag>
          <StyledTag>2023/11/13 - 2023/11/19 00:00 UTC</StyledTag>
        </StyledTags>
      </StyledBox>
      <StyledBox>
        <Timer />
        <JoinedAccountsBox>
          <JoinedAccounts>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
              <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" fill="#1E2028" stroke="#373A53" />
              <ellipse cx="9.002" cy="15.001" rx="1.5" ry="1.5" fill="white" />
              <ellipse cx="15.006" cy="15.001" rx="1.5" ry="1.5" fill="white" />
              <ellipse cx="21.002" cy="15.001" rx="1.5" ry="1.5" fill="white" />
            </svg>
          </JoinedAccounts>
          <JoinedAccountsAmount>12K+</JoinedAccountsAmount>
        </JoinedAccountsBox>
      </StyledBox>
    </StyledCampaipnContainer>
  );
};

export default memo(Campaign);

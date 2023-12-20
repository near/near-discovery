import { memo, useEffect } from 'react';

import Loading from '@/components/Icons/Loading';

import { formatPeriodDate, formatTotalUsers } from '../../helpers';
import useLike from '../../hooks/useLike';
import Timer from '../Timer';
import {
  JoinedAccounts,
  JoinedAccountsAmount,
  JoinedAccountsBox,
  LoadingWrapper,
  StyledBox,
  StyledCampaipnContainer,
  StyledCampaipnsContainer,
  StyledCoin,
  StyledDesc,
  StyledHeader,
  StyledHeartBox,
  StyledTag,
  StyledTags,
  StyledTitle,
} from './styles';

const Campaign = ({ campaign, categories }: { campaign: any; categories: any }) => {
  const { like, handleLike } = useLike(campaign.id, 'quest_campaign');
  return (
    <StyledCampaipnContainer>
      <StyledBox>
        <div>
          <StyledHeader>
            <StyledTitle>{campaign.name}</StyledTitle>
            <StyledHeartBox
              whileHover={{ opacity: 0.9 }}
              whileTap={{ opacity: 0.7 }}
              onClick={() => {
                handleLike(!like);
              }}
            >
              {!like ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
                  <path
                    d="M8.50419 15C8.28039 15 8.07318 14.9117 7.91569 14.7671L1.51685 8.56799C1.03435 8.10292 0.65186 7.54977 0.391498 6.94054C0.131136 6.33132 -0.00192296 5.67811 2.09967e-05 5.01874C2.09967e-05 3.67773 0.538784 2.41702 1.51685 1.46949C2.49491 0.521949 3.79623 0 5.18043 0C6.40716 0 7.56757 0.409529 8.50419 1.16435C10.5349 -0.473769 13.5768 -0.377409 15.4832 1.47752C16.4544 2.41906 17 3.69568 17 5.02677C17 6.35785 16.4544 7.63447 15.4832 8.57602L9.09268 14.7671C8.9352 14.9197 8.71969 15 8.50419 15ZM5.18043 1.606C4.23553 1.606 3.35693 1.95931 2.68555 2.60974C2.02245 3.25214 1.64946 4.11135 1.64946 5.02677C1.64946 5.94218 2.01417 6.79336 2.68555 7.44379L8.4959 13.0728L14.298 7.45182C14.6251 7.13498 14.8846 6.7588 15.0617 6.34477C15.2388 5.93074 15.3299 5.48697 15.3299 5.03881C15.3299 4.59065 15.2388 4.14689 15.0617 3.73286C14.8846 3.31883 14.6251 2.94265 14.298 2.6258C13.6349 1.9834 12.748 1.62206 11.8031 1.62206C10.8582 1.62206 9.97957 1.97537 9.30819 2.6258L9.06782 2.85867C8.99113 2.93311 8.90005 2.99217 8.79978 3.03247C8.69951 3.07276 8.59202 3.0935 8.48347 3.0935C8.37491 3.0935 8.26742 3.07276 8.16715 3.03247C8.06688 2.99217 7.9758 2.93311 7.89911 2.85867L7.65874 2.6258C7.01223 1.95931 6.12534 1.606 5.18043 1.606Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.91579 16.0243C8.07327 16.1735 8.28049 16.2646 8.50429 16.2646C8.7198 16.2646 8.9353 16.1818 9.09279 16.0243L15.4834 9.63364C16.4546 8.66175 17.0002 7.34399 17.0002 5.97001C17.0002 4.59603 16.4546 3.27827 15.4834 2.30638C13.577 0.391678 10.535 0.292213 8.50429 1.98312C7.56766 1.20398 6.40723 0.78125 5.1805 0.78125C3.79627 0.78125 2.49494 1.32002 1.51686 2.29809C0.53879 3.27617 2.09969e-05 4.5775 2.09969e-05 5.96172C-0.00192298 6.64235 0.131138 7.3166 0.391503 7.94546C0.651868 8.57432 1.03437 9.1453 1.51686 9.62535L7.91579 16.0243ZM4.82472 7.47007C5.77793 8.4813 7.11242 9.0698 8.50493 9.0698C9.1968 9.06964 9.88111 8.9259 10.5146 8.64769C11.148 8.36948 11.7169 7.96284 12.1851 7.45349C12.3335 7.29192 12.4116 7.07801 12.4023 6.85883C12.393 6.63966 12.297 6.43316 12.1354 6.28478C11.9738 6.13639 11.7599 6.05827 11.5407 6.06759C11.3216 6.07692 11.1151 6.17293 10.9667 6.33451C10.3367 7.02248 9.43327 7.42034 8.49664 7.42034C7.55172 7.42034 6.6814 7.03905 6.03488 6.3428C5.88539 6.18232 5.67828 6.0878 5.4591 6.08003C5.35058 6.07618 5.24236 6.09374 5.14062 6.13172C5.03888 6.16969 4.94562 6.22734 4.86616 6.30135C4.7867 6.37537 4.7226 6.46431 4.67751 6.56311C4.63243 6.6619 4.60724 6.7686 4.60339 6.87713C4.59562 7.0963 4.67523 7.30959 4.82472 7.47007Z"
                    fill="#FF6B8E"
                  />
                </svg>
              )}
            </StyledHeartBox>
          </StyledHeader>
          <StyledDesc>{campaign.description}</StyledDesc>
        </div>
        <StyledTags>
          <StyledTag style={{ padding: '0px 10px 0px 6px' }}>
            <StyledCoin $size={20} />
            <span style={{ color: '#EBF479' }}>Extra {campaign.reward} PTS</span>
          </StyledTag>
          <StyledTag>
            <span>{campaign.quests.total} Quests:</span>
            {campaign.quests.total_category.map(
              ({ total, quest_category_id }: { total: number; quest_category_id: number }) => (
                <>
                  <span style={{ color: `var(--${categories[quest_category_id]?.name}-color` }} key={quest_category_id}>
                    {total} #{categories[quest_category_id]?.name}
                  </span>
                </>
              ),
            )}
          </StyledTag>
          <StyledTag>{formatPeriodDate(campaign.start_time, campaign.end_time)} UTC</StyledTag>
        </StyledTags>
      </StyledBox>
      <StyledBox>
        {campaign.end_time && <Timer endTime={Number(campaign.end_time)} />}
        <JoinedAccountsBox>
          {campaign.total_users > 5 && (
            <>
              <JoinedAccounts>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" fill="#1E2028" stroke="#373A53" />
                  <ellipse cx="9.002" cy="15.001" rx="1.5" ry="1.5" fill="white" />
                  <ellipse cx="15.006" cy="15.001" rx="1.5" ry="1.5" fill="white" />
                  <ellipse cx="21.002" cy="15.001" rx="1.5" ry="1.5" fill="white" />
                </svg>
              </JoinedAccounts>
            </>
          )}
          <JoinedAccountsAmount>{formatTotalUsers(campaign.total_users)}</JoinedAccountsAmount>
        </JoinedAccountsBox>
      </StyledBox>
    </StyledCampaipnContainer>
  );
};

const Campaigns = ({ onLoad, loading, campaigns, categoryLoading, categories }: any) => {
  useEffect(() => {
    if (!loading && campaigns.length) {
      onLoad(campaigns[0].id);
    }
  }, [loading, campaigns]);
  return (
    <StyledCampaipnsContainer>
      {loading || categoryLoading ? (
        <LoadingWrapper>
          <Loading size={30} />
        </LoadingWrapper>
      ) : (
        campaigns.map((campaign: any) => <Campaign key={campaign.id} campaign={campaign} categories={categories} />)
      )}
    </StyledCampaipnsContainer>
  );
};

export default memo(Campaigns);

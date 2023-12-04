import {
  StyledContainer,
  StyledType,
  StyledHeader,
  StyledHeartBox,
  StyledDesc,
  StyledIconBox,
  StyledIcon,
  StyledRewardBox,
  StyledTimeBox,
  StyledLabel,
  StyledRewardsAndTimeBox,
  StyledQuestInfo,
  StyledQuestInfoItemBox,
  StyledQuestInfoItem,
  StyledQuestInfoIcon,
  StyledQuestInfoLabel,
  StyledQuestInfoValue,
  StyledTitle,
  StyledCoin,
  StyledParticipants,
  JoinedAccountsBox,
  JoinedAccounts,
  JoinedAccountsAmount,
} from './styles';

import { memo } from 'react';
import useLike from '@/views/Quest/hooks/useLike';
import { formatTotalUsers, formatPeriodDate } from '@/views/Quest/helpers';

const Details = ({ quest, category }: { quest: any; category: any }) => {
  const { like, handleLike } = useLike(quest.id, 'quest');

  return (
    <StyledContainer>
      <StyledType style={{ color: `var(--${category.name}-color` }}>#{category.name}</StyledType>
      <StyledHeader>
        <StyledTitle>{quest.name}</StyledTitle>
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
      <StyledDesc>{quest.description}</StyledDesc>
      <StyledIconBox>{quest.logo && <StyledIcon src={quest.logo} />}</StyledIconBox>
      <StyledRewardsAndTimeBox>
        <div>
          <StyledLabel>Reward</StyledLabel>
          <StyledRewardBox>
            <StyledCoin $size={20} />
            <span>{quest.reward} PTS</span>
          </StyledRewardBox>
        </div>
        <div>
          <StyledLabel>Time</StyledLabel>
          <StyledTimeBox>{formatPeriodDate(quest.start_time, quest.end_time)} UTC</StyledTimeBox>
        </div>
      </StyledRewardsAndTimeBox>
      <StyledQuestInfo>
        <StyledLabel>Quest info</StyledLabel>
        <StyledQuestInfoItemBox style={{ marginTop: '18px' }}>
          <StyledQuestInfoItem>
            <StyledQuestInfoIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M1.48769 18C0.919638 18 0.410637 17.7244 0.154731 17.28C-0.0561807 16.9116 -0.0505564 16.4925 0.16598 16.1297L1.66205 13.3228C1.79141 13.0781 2.03044 12.9319 2.30041 12.9319H15.7116C15.9844 12.9319 16.2262 13.0838 16.3415 13.3256L17.8376 16.1325C18.0513 16.4869 18.0541 16.9031 17.846 17.2716C17.5929 17.7216 17.0811 18 16.513 18H1.48769ZM16.4174 16.5431L15.2673 14.3803H2.74191L1.59174 16.5431H16.4174ZM2.98376 12.4706C2.87971 12.4706 2.76722 12.4397 2.6463 12.3806C2.47476 12.2906 2.35103 12.1416 2.29478 11.9531C2.23854 11.7675 2.25822 11.5734 2.3454 11.4019L4.35609 7.61906C4.46858 7.38 4.71324 7.22813 4.99445 7.22813H13.0232C13.2903 7.22813 13.535 7.37719 13.6615 7.61906L15.6722 11.3991C15.7313 11.4919 15.7622 11.61 15.7622 11.7394C15.7622 11.9326 15.6855 12.1178 15.5489 12.2545C15.4123 12.3911 15.227 12.4678 15.0339 12.4678L2.98376 12.4706ZM13.8246 11.0138L12.5817 8.67937H5.42471L4.18174 11.0138H13.8246ZM5.66937 6.76969C5.55126 6.76969 5.43315 6.74156 5.33191 6.69094C5.16037 6.60094 5.03663 6.45188 4.98039 6.26344C4.92415 6.07781 4.94383 5.88375 5.03101 5.71219L7.68006 0.70875C7.95284 0.27 8.44778 0 8.97084 0H9.03552C9.55577 0 10.0535 0.27 10.3347 0.703125L13.0007 5.70094C13.0541 5.805 13.0794 5.92031 13.0794 6.04125C13.0794 6.23444 13.0027 6.41972 12.8661 6.55633C12.7295 6.69294 12.5442 6.76969 12.3511 6.76969H5.66937ZM11.1418 5.32406L9.08895 1.47375C9.06172 1.46476 9.03327 1.46001 9.00459 1.45969C8.97365 1.45969 8.94834 1.46531 8.92022 1.47375L6.86735 5.32688H11.1418V5.32406Z"
                  fill="#EBF479"
                />
              </svg>
            </StyledQuestInfoIcon>
            <div>
              <StyledQuestInfoLabel>Difficulty</StyledQuestInfoLabel>
              <StyledQuestInfoValue>{quest.difficulty}</StyledQuestInfoValue>
            </div>
          </StyledQuestInfoItem>
          <StyledQuestInfoItem>
            <StyledQuestInfoIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10.6868 3.54635V0.890373C10.6868 0.654231 10.7806 0.427761 10.9476 0.260784C11.1145 0.0938068 11.3409 0 11.577 0H15.1099C15.346 0 15.5724 0.0938068 15.7393 0.260784C15.9062 0.427761 16 0.654231 16 0.890373V15.1096C16 15.3458 15.9062 15.5722 15.7393 15.7392C15.5724 15.9062 15.346 16 15.1099 16H0.890125C0.654049 16 0.427642 15.9062 0.260712 15.7392C0.0937807 15.5722 5.07194e-09 15.3458 0 15.1096V11.5633C5.07194e-09 11.3271 0.0937807 11.1007 0.260712 10.9337C0.427642 10.7667 0.654049 10.6729 0.890125 10.6729H3.57296V8.02404C3.57296 7.7879 3.66674 7.56143 3.83367 7.39445C4.00061 7.22747 4.22701 7.13367 4.46309 7.13367H7.12367V4.43584C7.12367 4.1997 7.21745 3.97323 7.38438 3.80625C7.55131 3.63927 7.77772 3.54546 8.0138 3.54546H10.6868V3.54635ZM14.2197 1.78075H12.4671V4.43673C12.4671 4.67287 12.3733 4.89934 12.2064 5.06632C12.0395 5.23329 11.813 5.3271 11.577 5.3271H8.90392V8.02404C8.90392 8.26018 8.81014 8.48665 8.64321 8.65363C8.47628 8.82061 8.24987 8.91441 8.0138 8.91441H5.35321V11.5633C5.35321 11.7994 5.25943 12.0259 5.0925 12.1929C4.92557 12.3598 4.69916 12.4536 4.46309 12.4536H1.78025V14.2193H14.2197V1.78075Z"
                  fill="#EBF479"
                />
              </svg>
            </StyledQuestInfoIcon>
            <div>
              <StyledQuestInfoLabel>Step Required</StyledQuestInfoLabel>
              <StyledQuestInfoValue>{quest.total_action} steps</StyledQuestInfoValue>
            </div>
          </StyledQuestInfoItem>
        </StyledQuestInfoItemBox>
        <StyledQuestInfoItemBox>
          <StyledQuestInfoItem>
            <StyledQuestInfoIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                <path
                  d="M3.75 0C3.02065 0 2.32118 0.289731 1.80546 0.805456C1.28973 1.32118 1 2.02065 1 2.75V17.5H0.75C0.551088 17.5 0.360322 17.579 0.21967 17.7197C0.0790178 17.8603 0 18.0511 0 18.25C0 18.4489 0.0790178 18.6397 0.21967 18.7803C0.360322 18.921 0.551088 19 0.75 19H14.25C14.4489 19 14.6397 18.921 14.7803 18.7803C14.921 18.6397 15 18.4489 15 18.25C15 18.0511 14.921 17.8603 14.7803 17.7197C14.6397 17.579 14.4489 17.5 14.25 17.5H14V15.697C14.4185 15.9121 14.8853 16.0161 15.3555 15.9988C15.8258 15.9816 16.2837 15.8438 16.6853 15.5986C17.087 15.3534 17.4188 15.0091 17.649 14.5987C17.8793 14.1883 18.0001 13.7256 18 13.255V7.417C18 6.82198 17.807 6.24301 17.45 5.767L16.35 4.3C16.2307 4.14087 16.053 4.03567 15.8561 4.00754C15.6592 3.97941 15.4591 4.03065 15.3 4.15C15.1409 4.26935 15.0357 4.44702 15.0075 4.64393C14.9794 4.84085 15.0307 5.04087 15.15 5.2L16.25 6.667C16.412 6.883 16.5 7.147 16.5 7.417V13.255C16.5 13.5852 16.3688 13.9019 16.1353 14.1353C15.9019 14.3688 15.5852 14.5 15.255 14.5C14.9248 14.5 14.6081 14.3688 14.3747 14.1353C14.1412 13.9019 14.01 13.5852 14.01 13.255V11.5C14.0099 11.4595 14.0066 11.419 14 11.379V2.75C14 2.02065 13.7103 1.32118 13.1945 0.805456C12.6788 0.289731 11.9793 0 11.25 0H3.75ZM4 3.75C4 3.55109 4.07902 3.36032 4.21967 3.21967C4.36032 3.07902 4.55109 3 4.75 3H10.25C10.4489 3 10.6397 3.07902 10.7803 3.21967C10.921 3.36032 11 3.55109 11 3.75V7.25C11 7.44891 10.921 7.63968 10.7803 7.78033C10.6397 7.92098 10.4489 8 10.25 8H4.75C4.55109 8 4.36032 7.92098 4.21967 7.78033C4.07902 7.63968 4 7.44891 4 7.25V3.75Z"
                  fill="#EBF479"
                />
              </svg>
            </StyledQuestInfoIcon>
            <div>
              <StyledQuestInfoLabel>Gas Required</StyledQuestInfoLabel>
              <StyledQuestInfoValue>{quest.gas_required}</StyledQuestInfoValue>
            </div>
          </StyledQuestInfoItem>
          <StyledQuestInfoItem>
            <StyledQuestInfoIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 0C3.58571 0 0 3.58571 0 8C0 12.4143 3.58571 16 8 16C12.4143 16 16 12.4143 16 8C16 3.58571 12.4143 0 8 0ZM11.4143 10.7857L7.58571 8.57143H7.42857V3.42857H8.57143V7.82857L11.9857 9.8L11.4143 10.7857Z"
                  fill="#EBF479"
                />
              </svg>
            </StyledQuestInfoIcon>
            <div>
              <StyledQuestInfoLabel>Time Required</StyledQuestInfoLabel>
              <StyledQuestInfoValue>{quest.time_required}</StyledQuestInfoValue>
            </div>
          </StyledQuestInfoItem>
        </StyledQuestInfoItemBox>
      </StyledQuestInfo>
      <StyledParticipants>
        <StyledLabel>Participants</StyledLabel>
        <JoinedAccountsBox style={{ marginTop: '16px' }}>
          {quest.total_user !== 0 && (
            <>
              <JoinedAccounts>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" fill="#1E2028" stroke="#373A53" />
                  <ellipse cx="9.002" cy="15.001" rx="1.5" ry="1.5" fill="white" />
                  <ellipse cx="15.006" cy="15.001" rx="1.5" ry="1.5" fill="white" />
                  <ellipse cx="21.002" cy="15.001" rx="1.5" ry="1.5" fill="white" />
                </svg>
              </JoinedAccounts>
              <JoinedAccountsAmount>{formatTotalUsers(quest.total_users)}</JoinedAccountsAmount>
            </>
          )}
        </JoinedAccountsBox>
      </StyledParticipants>
    </StyledContainer>
  );
};

export default memo(Details);

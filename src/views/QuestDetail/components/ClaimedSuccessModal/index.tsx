import { useState } from 'react';
import CloseIcon from '@/components/Icons/Close';
import { StyledCoin } from '@/views/Quest/styles';
import Modal from '@/views/Landing/Modal';
import QuestItem from '@/views/Quest/components/QuestItem';
import {
  StyledContent,
  StyledIcon,
  StyledTitle,
  StyledDesc,
  StyledCloseIcon,
  StyledMoreHints,
  StyledButtons,
  StyledLeftButton,
  StyledRecommendList,
  StyledRecommendListWrapper,
} from './styles';

export default function ClaimedSuccessModal({
  open,
  reward,
  recommends,
  onClose,
}: {
  open: boolean;
  reward?: number;
  recommends: any;
  onClose: VoidFunction;
}) {
  const [current, setCurrent] = useState(0);

  return (
    <Modal
      display={open}
      width={451}
      content={
        <StyledContent>
          <StyledCloseIcon>
            <CloseIcon onClose={onClose} />
          </StyledCloseIcon>
          <StyledIcon src="/images/success.gif" />
          <StyledTitle>Congrats!</StyledTitle>
          <StyledDesc>
            <span>You’ve got {reward}</span> <StyledCoin $size={21} />
            <span>PTS</span>
          </StyledDesc>
          <StyledMoreHints>Do more quests and get more rewards</StyledMoreHints>
          <StyledRecommendListWrapper>
            <StyledRecommendList
              style={{
                transform: `translateX(-${current * 420}px)`,
              }}
            >
              {recommends.map((recommend: any) => (
                <QuestItem
                  quest={recommend}
                  key={recommend.id}
                  onClick={() => {
                    onClose();
                  }}
                />
              ))}
            </StyledRecommendList>
          </StyledRecommendListWrapper>
          <StyledButtons>
            <StyledLeftButton
              $disabled={current === 0}
              onClick={() => {
                if (current <= 0) return;
                setCurrent((prev) => prev - 1);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                <rect x="1" y="1" width="36" height="36" rx="12" fill="#393A4C" stroke="white" strokeOpacity="0.2" />
                <path d="M23 12L16 19L23 26" stroke="#979ABE" stroke-width="2" strokeLinecap="round" />
              </svg>
            </StyledLeftButton>
            <StyledLeftButton
              $disabled={current === recommends.length - 1}
              onClick={() => {
                if (current >= recommends.length - 1) {
                  return;
                }
                setCurrent((prev) => prev + 1);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                <rect x="1" y="1" width="36" height="36" rx="12" fill="#393A4C" stroke="white" strokeOpacity="0.2" />
                <path d="M16 12L23 19L16 26" stroke="#979ABE" stroke-width="2" strokeLinecap="round" />
              </svg>
            </StyledLeftButton>
          </StyledButtons>
        </StyledContent>
      }
    />
  );
}

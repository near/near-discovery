import { memo, useState } from 'react';
import Loading from '@/components/Icons/Loading';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import useRewardsClaim from '@/hooks/useRewardsClaim';
import useQuestInfo from '@/views/QuestDetail/hooks/useQuestInfo';

import {
  StyledContainer,
  StyledLeftPanel,
  StyledTitle,
  StyledDesc,
  StyledStep,
  StyledStepHeader,
  StyledStepTitle,
  StyledStepCoins,
  StyledStepDesc,
  StyledButtons,
  StyledClaimButton,
  StyledSkipButton,
  StyledRightPanel,
  StyledRightImg,
} from './styles';
import SuccessModal from './SuccessModal';
import { steps, bgs } from './config';

const LandingView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const step = Number(searchParams.get('step') || '1');
  const { loading, handleClaim } = useRewardsClaim(() => {});
  const [success, setSuccess] = useState(false);
  const { loading: infoLoading, info } = useQuestInfo('', 'landing');
  return (
    <>
      <StyledContainer>
        <StyledLeftPanel>
          <StyledTitle>3 Steps to Earn DapDap PTS</StyledTitle>
          <StyledDesc>
            Welcome! Follow us to explore DapDap in just 3 steps, play with dapdap and get lots of points rewards.
          </StyledDesc>
          {steps.map((_step, i) => (
            <StyledStep key={_step.title} $disable={step !== i + 1}>
              <StyledStepHeader>
                <StyledStepTitle>
                  Step {i + 1}. {_step.title}
                </StyledStepTitle>
                <StyledStepCoins>+{_step.rewards}PTS</StyledStepCoins>
              </StyledStepHeader>
              <StyledStepDesc>{_step.desc}</StyledStepDesc>
            </StyledStep>
          ))}
          <StyledButtons>
            <StyledClaimButton
              disabled={loading}
              whileHover={{ opacity: 0.8 }}
              whileTap={{ opacity: 0.6 }}
              style={{ width: '70%' }}
              onClick={() => {
                handleClaim('');
              }}
            >
              {loading && <Loading mr="5px" />}
              {step === 3 ? `Claim ${steps[step - 1].rewards} PTS` : 'Continue'}
            </StyledClaimButton>
            <StyledSkipButton
              onClick={() => {
                router.push('/');
              }}
              whileHover={{ opacity: 0.8 }}
              whileTap={{ opacity: 0.6 }}
            >
              Skip
            </StyledSkipButton>
          </StyledButtons>
        </StyledLeftPanel>
        <StyledRightPanel>{step !== 1 && <StyledRightImg src={bgs[step]} />}</StyledRightPanel>
      </StyledContainer>
      <SuccessModal
        open={success}
        onClose={() => {
          setSuccess(false);
        }}
      />
    </>
  );
};

export default memo(LandingView);

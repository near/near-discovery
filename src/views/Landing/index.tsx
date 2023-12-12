import { useRouter } from 'next/navigation';
import { memo, useEffect, useState } from 'react';

import Loading from '@/components/Icons/Loading';
import Spinner from '@/components/Spinner';
import useRewardsClaim from '@/hooks/useRewardsClaim';
import useQuestInfo from '@/views/QuestDetail/hooks/useQuestInfo';

import Bridge from './Bridge';
import { bgs,steps } from './config';
import useReport from './hooks/useReport';
import {
  StyledButtons,
  StyledClaimButton,
  StyledContainer,
  StyledDesc,
  StyledLeftPanel,
  StyledRightImg,
  StyledRightPanel,
  StyledSkipButton,
  StyledStep,
  StyledStepCoins,
  StyledStepDesc,
  StyledStepHeader,
  StyledStepTitle,
  StyledTitle,
} from './styles';
import SuccessModal from './SuccessModal';

const LandingView = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [continuable, setContinuable] = useState(false);
  const { loading, handleClaim } = useRewardsClaim(() => {
    setSuccess(true);
  });
  const [success, setSuccess] = useState(false);
  const { loading: infoLoading, info } = useQuestInfo('', 'landing');
  const { handleReport } = useReport();
  useEffect(() => {
    if (step < 2) return;
    setContinuable(true);
  }, [step]);

  useEffect(() => {
    if (info?.quest) {
      setStep((info.quest.action_completed || 0) + 1);
    }
  }, [info]);
  return (
    <>
      {infoLoading ? (
        <Spinner />
      ) : (
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
                  disabled={loading || !continuable}
                  whileHover={{ opacity: 0.8 }}
                  whileTap={{ opacity: 0.6 }}
                  style={{ width: '70%' }}
                  onClick={() => {
                    if (loading || !continuable) return;
                    if (step === 1) {
                      setStep(2);
                      return;
                    }
                    if (step === 2) {
                      handleReport('landing?step=2');
                      setStep(3);
                      return;
                    }
                    if (step === 3) {
                      handleClaim(info.quest.id);
                      handleReport('landing?step=3');
                    }
                  }}
                >
                  {loading && <Loading mr="5px" />}
                  {step === 3 ? 'Claim 140 PTS' : 'Continue'}
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
            {step === 1 && (
              <Bridge
                onSuccess={() => {
                  setContinuable(true);
                }}
              />
            )}
            <StyledRightPanel>{step !== 1 && <StyledRightImg src={bgs[step]} />}</StyledRightPanel>
          </StyledContainer>
        </>
      )}
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

import { useRouter } from 'next/navigation';
import { memo, useEffect, useState } from 'react';

import Loading from '@/components/Icons/Loading';
import Spinner from '@/components/Spinner';
import useRewardsClaim from '@/hooks/useRewardsClaim';
import useQuestInfo from '@/views/QuestDetail/hooks/useQuestInfo';
import ProcessBar from '@/views/Quest/components/ProcessBar';

import Bridge from './Bridge';
import { bgs, steps } from './config';
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
  StyledCoin,
  StyledProcessBars,
} from './styles';
import SuccessModal from './SuccessModal';

const LandingView = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
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
    if (info?.actions) {
      let _step = 0;
      info.actions.forEach((action: any) => {
        if (action.status === 'completed') {
          _step++;
        }
      });
      setStep(_step + 1 || 1);
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
              <StyledTitle>
                <div> 3 Steps to Earn DapDap </div> <StyledCoin $size={31} className="coin" />
                <div className="coin_color">{info?.quest?.reward} PTS</div>
              </StyledTitle>
              <StyledDesc>
                Welcome! Follow us to explore DapDap in just 3 steps, play with dapdap and get lots of points rewards.
              </StyledDesc>
              {steps.map((_step, i) => (
                <StyledStep key={_step.title} $disable={step !== i + 1}>
                  <StyledStepHeader>
                    <StyledStepTitle>
                      Step {i + 1}. {_step.title}
                    </StyledStepTitle>
                    {step - 1 > i && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                        <circle cx="11.5" cy="11.5" r="11" fill="#EBF479" stroke="#EBF479" />
                        <path
                          d="M8 11.5L10.6667 14L16 9"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    )}

                    {/* <StyledStepCoins>+{_step.rewards}PTS</StyledStepCoins> */}
                  </StyledStepHeader>
                  <StyledStepDesc>{_step.desc}</StyledStepDesc>
                </StyledStep>
              ))}
              <StyledProcessBars>
                {info?.actions.map((action: any, i: number) => (
                  <ProcessBar size={4} value={i < step - 1 ? 100 : 0} noBorder={true} key={action.id} />
                ))}
              </StyledProcessBars>
              <StyledButtons>
                <StyledClaimButton
                  disabled={loading || !continuable}
                  whileHover={{ opacity: 0.8 }}
                  whileTap={{ opacity: 0.6 }}
                  style={{ width: '70%' }}
                  onClick={() => {
                    if (loading || !continuable) return;
                    if (step === 2) {
                      handleReport('landing?step=2');
                      setStep(3);
                      return;
                    }
                    if (step === 3) {
                      handleReport('landing?step=3');
                      setStep(4);
                      return;
                    }
                    if (step === 4) {
                      handleClaim(info.quest.id);
                    }
                  }}
                >
                  {loading && <Loading mr="5px" />}
                  {step === 4 ? 'Claim 140 PTS' : 'Continue'}
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
            {step === 1 ? (
              <div style={{ width: '500px' }}>
                <Bridge
                  onSuccess={() => {
                    setContinuable(true);
                    setStep(2);
                  }}
                />
              </div>
            ) : (
              <StyledRightPanel>
                <StyledRightImg src={bgs[step]} />
              </StyledRightPanel>
            )}
          </StyledContainer>
        </>
      )}
      <SuccessModal
        open={success}
        reward={info?.quest?.reward}
        onClose={() => {
          setSuccess(false);
        }}
      />
    </>
  );
};

export default memo(LandingView);

import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Layout } from '../utils/const';
import { ONBOARDING_STORAGE, onboardingComponents, onboardingDisable, onboardingSteps } from '../utils/onboarding';
import ArrowSmall from './icons/arrow-small.svg';
import OnboardingWelcome from './OnboardingWelcome';

const Wrapper = styled.div``;

const Tooltip = styled.div`
  width: 300px;

  position: absolute;
  z-index: 90;

  background: #161615;
  border-radius: 12px;
  padding: 20px 14px;

  .title {
    color: #ededec;
    line-height: 150%;
    font-weight: 600;
  }

  .desc {
    color: #a1a09a;
    font-size: 14px;
    line-height: 150%;
    margin-top: 12px;
  }

  .closeIcon {
    position: absolute;
    font-size: 26px;
    top: 0px;
    right: 6px;
    color: #999;
    cursor: pointer;
    border-radius: 100%;

    &:hover {
      color: #fff;
    }
  }

  .buttons {
    display: flex;
    margin-top: 24px;

    .right {
      margin-left: auto;
    }
    .left {
      button {
        padding-right: 16px;
        background: transparent;
        color: #999;
      }
    }

    button {
      height: 36px;
      line-height: 32px;
      padding: 0 12px;
      background: #ffffff;
      border-radius: 50px;
      font-size: 12px;
      color: #1b1b18;
      border: 0px;

      :hover {
        opacity: 0.9;
      }

      img {
        margin: -2px 4px 0;

        &.revert {
          transform: rotate(180deg);
        }
      }
    }
  }
`;

const OnBoarding = ({
  onboarding,
  refs,
  setCurrentStep,
  currentStep,
  refEditor,
  refSearch,
  setLayoutState,
  cache,
  near,
  closeFile,
  setDisable,
  selectFile,
}) => {
  const [tooltipPosition, setTooltipPosition] = useState({});
  const [adjustPosition, setAdjustPosition] = useState({ x: 0, y: 0 });
  const router = useRouter();
  zE('webWidget', 'hide');

  const getPosition = useCallback(() => {
    setTooltipPosition(() =>
      Object.keys(onboardingSteps).reduce(
        (x, key) => ({
          ...x,
          [key]: {
            x: refs[key].current?.offsetLeft,
            y: refs[key].current?.offsetTop,
          },
        }),
        {},
      ),
    );
  }, [refs]);

  useEffect(() => {
    getPosition();
  }, [currentStep, getPosition]);

  useEffect(() => {
    window.addEventListener('resize', getPosition);
  }, [getPosition]);

  const enableStep = useCallback(
    (name) =>
      setDisable((state) => ({
        ...state,
        [name]: false,
      })),
    [setDisable],
  );

  const disableAll = useCallback(() => setDisable(onboardingDisable), [setDisable]);

  // glowing
  useEffect(() => {
    Object.keys(onboardingSteps).map((key) => {
      if (refs[key].current) {
        refs[key].current.className = '';
      }
    });

    if ([2, 3, 8].includes(currentStep)) {
      return;
    }

    if (refs[`step${currentStep}`]?.current) {
      refs[`step${currentStep}`].current.className = 'glow';
    }
  }, [currentStep, refs]);

  useEffect(() => {
    if (!onboarding) {
      return;
    }

    setLayoutState(Layout.Split);

    // select proper component
    if (currentStep === 1) {
      selectFile(onboardingComponents.starter);
    }
    if (currentStep > 1) {
      selectFile(onboardingComponents.starterFork);
    }

    // disable
    if (currentStep === 1) {
      enableStep('forkButton');
    } else if (currentStep === 4) {
      enableStep('renderPreviewButton');
    } else if (currentStep === 6) {
      enableStep('search');
    } else if (currentStep === 7) {
      enableStep('search');
    } else if (currentStep === 9) {
      enableStep('renderPreviewButton');
    } else if (currentStep === 10) {
      enableStep('onboardingPublishButton');
      enableStep('publishButton');
    } else {
      disableAll();
    }

    // additional actions for step
    if (currentStep === 1) {
      closeFile({
        type: onboardingComponents.starterFork.type,
        name: onboardingComponents.starterFork.name,
      });
    }

    // AdjustPosition
    if (currentStep === 2 || currentStep === 3 || currentStep === 8) {
      setAdjustPosition({ x: refEditor.current.offsetWidth - 70, y: -16 });
    } else if (currentStep === 6) {
      setAdjustPosition({ x: refSearch.current.offsetWidth - 600, y: 0 });
    } else if (currentStep === 7) {
      setAdjustPosition({ x: refSearch.current.offsetWidth - 400, y: 48 });
    } else {
      setAdjustPosition({ x: 0, y: 0 });
    }
  }, [
    currentStep,
    cache,
    near,
    onboarding,
    setLayoutState,
    selectFile,
    enableStep,
    disableAll,
    closeFile,
    refEditor,
    refSearch,
  ]);

  const handleNext = () => updateStep(currentStep + 1);

  const handlePrev = () => updateStep(currentStep - 1);

  const updateStep = (step) => {
    setCurrentStep(step);
    localStorage.setItem(ONBOARDING_STORAGE, JSON.stringify({ step }));
  };

  const finishOnboarding = () => {
    setCurrentStep(0);
    router.push('/sandbox');
  };

  return (
    <Wrapper>
      {onboarding && (
        <>
          {!currentStep && <OnboardingWelcome handleNext={handleNext} />}
          {Object.keys(onboardingSteps).map((key) => {
            if (!tooltipPosition[key]) {
              return <></>;
            }

            const top = tooltipPosition[key].y + onboardingSteps[key].tooltipAdjust.y + adjustPosition.y;

            const left = tooltipPosition[key].x + onboardingSteps[key].tooltipAdjust.x + adjustPosition.x;

            const step = onboardingSteps[key];

            return (
              key === `step${currentStep}` && (
                <Tooltip style={{ top, left }}>
                  <div>{step.component}</div>
                  <div className="buttons">
                    <div className="left">
                      <button onClick={handlePrev}>
                        <Image src={ArrowSmall} className="revert" alt="" />
                        Back
                      </button>
                    </div>
                    <div className="right">
                      {step.button && (
                        <button onClick={handleNext}>
                          {step.button} <Image src={ArrowSmall} alt="" />
                        </button>
                      )}

                      {currentStep === 10 && (
                        <button onClick={finishOnboarding}>
                          Finish onboarding <Image src={ArrowSmall} alt="" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="closeIcon" title="Exit Onboarding flow" onClick={finishOnboarding}>
                    <i className="bi bi-x" />
                  </div>
                </Tooltip>
              )
            );
          })}
        </>
      )}
    </Wrapper>
  );
};

export default OnBoarding;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  onboardingComponents,
  onboardingDisable,
  onboardingSteps,
  ONBOARDING_STORAGE,
} from "../utils/onboarding";
import OnboardingWelcome from "./OnboardingWelcome";
import { useHistory } from "react-router-dom";

import ArrowSmall from "./icons/arrow-small.svg";
import { Layout } from "../utils/const";

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

  .buttons {
    display: flex;
    margin-top: 24px;

    .right {
      margin-left: auto;
    }
    .left {
      button {
        padding-right: 16px;
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

export default ({
  onboarding,
  refs,
  setCurrentStep,
  currentStep,
  reloadFile,
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
  const history = useHistory();

  const getPosition = () => {
    setTooltipPosition(() =>
      Object.keys(onboardingSteps).reduce(
        (x, key) => ({
          ...x,
          [key]: {
            x: refs[key].current?.offsetLeft,
            y: refs[key].current?.offsetTop,
          },
        }),
        {}
      )
    );
  };

  useEffect(() => {
    getPosition();
  }, [currentStep]);

  useEffect(() => {
    window.addEventListener("resize", getPosition);
  }, []);

  const enableStep = (name) =>
    setDisable((state) => ({
      ...state,
      [name]: false,
    }));

  const disableAll = () => setDisable(onboardingDisable);

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
      enableStep("forkButton");
    } else if (currentStep === 4) {
      enableStep("renderPreviewButton");
    } else if (currentStep === 6) {
      enableStep("search");
    } else if (currentStep === 7) {
      enableStep("search");
    } else if (currentStep === 9) {
      enableStep("renderPreviewButton");
    } else if (currentStep === 10) {
      enableStep("onboardingPublishButton");
      enableStep("publishButton");
    } else {
      disableAll();
    }

    // additional actions for step
    if (currentStep === 1) {
      reloadFile();
      closeFile(onboardingComponents.starterFork);
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
  }, [currentStep, cache, near]);

  const handleNext = () => updateStep(currentStep + 1);

  const handlePrev = () => updateStep(currentStep - 1);

  const updateStep = (step) => {
    setCurrentStep(step);
    localStorage.setItem(ONBOARDING_STORAGE, JSON.stringify({ step }));
  };

  const finishOnboarding = () => {
    setCurrentStep(0);
    history.push("/sandbox");
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

            const top =
              tooltipPosition[key].y +
              onboardingSteps[key].tooltipAdjust.y +
              adjustPosition.y;

            const left =
              tooltipPosition[key].x +
              onboardingSteps[key].tooltipAdjust.x +
              adjustPosition.x;

            const step = onboardingSteps[key];

            return (
              key === `step${currentStep}` && (
                <Tooltip style={{ top, left }}>
                  <div>{step.component}</div>
                  <div className="buttons">
                    <div className="left">
                      <button onClick={handlePrev}>
                        <img src={ArrowSmall} className="revert" />
                        Back
                      </button>
                    </div>
                    <div className="right">
                      {step.button && (
                        <button onClick={handleNext}>
                          {step.button} <img src={ArrowSmall} />
                        </button>
                      )}

                      {currentStep === 10 && (
                        <button onClick={finishOnboarding}>
                          Finish onboarding <img src={ArrowSmall} />
                        </button>
                      )}
                    </div>
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

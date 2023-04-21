import React, { useRef } from "react";
import Step1 from "../OnBoarding/Step1";
import Step2 from "../OnBoarding/Step2";
import Step3 from "../OnBoarding/Step3";
import Step4 from "../OnBoarding/Step4";
import Step5 from "../OnBoarding/Step5";
import Step6 from "../OnBoarding/Step6";
import Step7 from "../OnBoarding/Step7";
import Step8 from "../OnBoarding/Step8";
import Step9 from "../OnBoarding/Step9";
import Step10 from "../OnBoarding/Step10";

export const onboardingDisable = {
  search: true,
  fileTab: true,
  openCreateButton: true,
  renameButton: true,
  publishDraftAsMainButton: true,
  onboardingPublishButton: true,
  publishButton: true,
  saveDraftButton: true,
  forkButton: true,
  renderPreviewButton: true,
  openInNewTabButton: true,

  changeViewButton: true,
  // propsTab: true,
  // metadataTab: true,
};

export const ONBOARDING_STORAGE = "onboarding-v0";

export const onboardingSteps = {
  step1: {
    component: <Step1 />,
    button: "",
    tooltipAdjust: {
      x: -306,
      y: 50,
    },
  },
  step2: {
    component: <Step2 />,
    button: "Continue",
    tooltipAdjust: {
      x: 40,
      y: 100,
    },
  },
  step3: {
    component: <Step3 />,
    button: "Confirm Paste",
    tooltipAdjust: {
      x: 40,
      y: 100,
    },
  },
  step4: {
    component: <Step4 />,
    button: "",
    tooltipAdjust: {
      x: -306,
      y: 50,
    },
  },
  step5: {
    component: <Step5 />,
    button: "Discover Components",
    tooltipAdjust: {
      x: 12,
      y: 100,
    },
  },
  step6: {
    component: <Step6 />,
    button: "Confirm Searched",
    tooltipAdjust: {
      x: 0,
      y: 100,
    },
  },
  step7: {
    component: <Step7 />,
    button: "Confirm Code Copy",
    tooltipAdjust: {
      x: 0,
      y: 100,
    },
  },
  step8: {
    component: <Step8 />,
    button: "Confirm Code Paste",
    tooltipAdjust: {
      x: 40,
      y: 100,
    },
  },
  step9: {
    component: <Step9 />,
    button: "",
    tooltipAdjust: {
      x: -306,
      y: 50,
    },
  },
  step10: {
    component: <Step10 />,
    button: "",
    tooltipAdjust: {
      x: -306,
      y: 50,
    },
  },
};

export const generateRefs = () => {
  return Object.keys(onboardingSteps).reduce((x, key) => {
    return {
      ...x,
      [key]: useRef(),
    };
  }, {});
};

export const getStepLocalStorage = () => {
  return (
    JSON.parse(localStorage.getItem(ONBOARDING_STORAGE)) || {
      step: 0,
    }
  );
};

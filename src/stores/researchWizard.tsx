import { create } from 'zustand';

import { ExperienceComponent } from '@/components/research-form-wizard/FormPages/Experience';
import FollowUpComponent from '@/components/research-form-wizard/FormPages/FollowUp';
import { Motivation } from '@/components/research-form-wizard/FormPages/Motivation';
import UserType from '@/components/research-form-wizard/FormPages/UserType';

interface ResearchStep {
  title: string;
  component: () => JSX.Element;
  progressDescription?: string | null;
  question: string;
  question2?: string;
}

const formSteps: ResearchStep[] = [
  {
    title: 'motivation',
    component: () => <Motivation />,
    progressDescription: 'Your interests',
    question: 'What brings you here today?',
  },
  {
    title: 'user type',
    component: () => <UserType />,
    progressDescription: 'About you',
    question: 'Which of the following best describes you?',
  },
  {
    title: 'Experience',
    component: () => <ExperienceComponent />,
    progressDescription: 'Experience',
    question: 'How many years of development experience do you have?',
    question2: 'How many years of web3 experience do you have?',
  },
  {
    title: 'Follow Up',
    component: () => <FollowUpComponent />,
    progressDescription: null,
    question: 'Are you interested in participating in helping us with research?',
  },
];

export type ResearchWizardState = {
  currentStepIndex: number;
  nextDisabled: boolean;
  formSteps: any[];
  currentStepSubmission: any;
  isResearchFormDismissed: boolean;
  set: (state: Partial<ResearchWizardState>) => void;
};

type ResearchWizardStore = ResearchWizardState & {
  set: (state: Partial<ResearchWizardState>) => void;
};

export const useResearchWizardStore = create<ResearchWizardStore>((set) => ({
  currentStepIndex: 0,
  nextDisabled: true,
  formSteps,
  currentStepSubmission: {},
  isResearchFormDismissed: false,
  set: (state: Partial<ResearchWizardState>) =>
    set((previousState: Partial<ResearchWizardState>) => ({ ...previousState, ...state })),
}));

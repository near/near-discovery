import { create } from 'zustand';

import { ExperienceComponent } from '@/components/research-form-wizard/FormPages/Experience';
import { Motivation } from '@/components/research-form-wizard/FormPages/Motivation';
import UserType from '@/components/research-form-wizard/FormPages/UserType';
import FollowUpComponent from '@/components/research-form-wizard/FormPages/FollowUp';

interface ResearchStep {
  title: string;
  component: () => JSX.Element;
  progressDescription?: string | null;
}

const formSteps: ResearchStep[] = [
  {
    title: 'motivation',
    component: () => <Motivation />,
    progressDescription: 'Your interests',
  },
  {
    title: 'user type',
    component: () => <UserType />,
    progressDescription: 'About you',
  },
  {
    title: 'Experience',
    component: () => <ExperienceComponent />,
    progressDescription: 'Experience',
  },
  {
    title: 'Follow Up',
    component: () => <FollowUpComponent />,
    progressDescription: null,
  },
];

export type ResearchWizardState = {
  currentStepIndex: number;
  nextDisabled: boolean;
  formSteps: any[];
  currentStepSubmission: any;
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
  set: (state: Partial<ResearchWizardState>) =>
    set((previousState: Partial<ResearchWizardState>) => ({ ...previousState, ...state })),
}));

import { Motivation } from '@/components/research-form-wizard/Motivation';
import { create } from 'zustand';

interface ResearchStep {
  title: string;
  component: () => JSX.Element;
  progressDescription?: string;
}

const formSteps: ResearchStep[] = [
  {
    title: 'motivation',
    component: () => <Motivation />,
    progressDescription: 'Your interests',
  },
  {
    title: 'user type',
    component: () => <div>Step 2</div>,
    progressDescription: 'About you',
  },
  {
    title: 'Step 3',
    component: () => <div>Step 3</div>,
    progressDescription: 'Experience',
  },
];

export type ResearchWizardState = {
  currentStepIndex: number;
  nextDisabled: boolean;
  formSteps: any[];
  set: (state: Partial<ResearchWizardState>) => void;
};

type ResearchWizardStore = ResearchWizardState & {
  set: (state: Partial<ResearchWizardState>) => void;
};

export const useResearchWizardStore = create<ResearchWizardStore>((set) => ({
  currentStepIndex: 0,
  nextDisabled: true,
  formSteps,
  set: (state: Partial<ResearchWizardState>) =>
    set((previousState: Partial<ResearchWizardState>) => ({ ...previousState, ...state })),
}));

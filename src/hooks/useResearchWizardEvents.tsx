import { useEffect, useState } from 'react';

import { useResearchWizardStore } from '@/stores/researchWizard';

export function useResearchWizardEvents() {
  const set = useResearchWizardStore((state) => state.set);
  const [showMobileResearchForm, setShowMobileResearchForm] = useState<boolean>(false);

  const setIsResearchFormDismissed = (isResearchFormDismissed: boolean) => {
    set({ isResearchFormDismissed });
  };

  useEffect(() => {
    const isResearchFormDismissed = !!localStorage.getItem('researchFormDismissed') || false;
    set({ isResearchFormDismissed });
  }, [set]);

  return {
    showMobileResearchForm,
    setShowMobileResearchForm,
    setIsResearchFormDismissed,
  };
}

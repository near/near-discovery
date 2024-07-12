import { useState, useEffect } from 'react';

export function useResearchWizardEvents() {
  const [isResearchFormDismissed, setIsResearchFormDismissed] = useState<boolean>();
  const [showMobileResearchForm, setShowMobileResearchForm] = useState<boolean>(false);

  useEffect(() => {
    const isResearchFormDismissed = !!localStorage.getItem('researchFormDismissed') || false;
    setIsResearchFormDismissed(isResearchFormDismissed);
  }, []);

  return {
    isResearchFormDismissed,
    showMobileResearchForm,
    setShowMobileResearchForm,
    setIsResearchFormDismissed,
  };
}

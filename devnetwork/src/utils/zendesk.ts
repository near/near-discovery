/*
  NOTE: Styling of Zendesk widget is done via DOM traversal as the widget configuration
  does not allow for custom styling.
*/

export const styleZendesk = () => {
  const zwFrame = document.getElementById('launcher') as HTMLIFrameElement | null;

  if (!zwFrame || !zwFrame.contentDocument) return;

  const zwEmbed = zwFrame.contentDocument.getElementById('Embed') as HTMLElement | null;

  const zwButton = zwEmbed?.querySelector('[data-testid="launcher"]') as HTMLElement | null;
  const zwIcon = zwButton?.querySelector('[data-testid="Icon"]') as HTMLElement | null;
  const zwLabel = zwButton?.querySelector('[data-testid="launcher-label"]') as HTMLElement | null;

  if (!zwButton || !zwIcon || !zwLabel) return;

  zwButton.style.opacity = '0.8';
  zwButton.style.padding = '.92857rem';
  zwIcon.style.paddingRight = '0';
  zwLabel.remove();
};

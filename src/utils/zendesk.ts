/*
  NOTE: Styling of Zendesk widget is done via DOM traversal as the widget configuration 
  does not allow for custom styling.
*/

export function styleZendesk() {
  const zwFrame = document.getElementById('launcher') as HTMLIFrameElement | null;

  if (!zwFrame || !zwFrame.contentDocument) return;

  const zwEmbed = zwFrame.contentDocument.getElementById('Embed') as HTMLElement | null;
  const zwButton = zwEmbed?.getElementsByTagName('button')[0] as HTMLElement | null;
  const zwIcon = zwEmbed?.getElementsByClassName('Icon')[0] as HTMLElement | null;

  if (!zwEmbed || !zwButton || !zwIcon) return;

  zwEmbed.style.opacity = '0.8';
  zwButton.style.paddingRight = '1rem';
  zwButton.style.paddingLeft = '1rem';
  zwIcon.style.paddingRight = '0px';
}

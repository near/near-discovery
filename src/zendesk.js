export default function styleZendesk() {
  const zwFrame = document.getElementById("launcher");
  const zwEmbed = zwFrame.contentDocument.getElementById("Embed");
  const zwButton = zwEmbed.getElementsByTagName("button")[0];
  zwEmbed.style.opacity = 0.8;
  zwButton.style.paddingRight = "1rem";
  zwButton.style.paddingLeft = "1rem";
  zwEmbed.getElementsByClassName("Icon")[0].style.paddingRight = "0px";
}

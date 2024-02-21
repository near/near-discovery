export const goHomeWithFresh = () => {
  const homePath = window.location.origin;
  window.location.href = homePath;
};

export const handlePageFlashPrevent = () => {
  if (navigator.userAgent !== 'ReactSnap') {
    const pageFlashPrevent = document.getElementById('page-flash-prevent');
    if (pageFlashPrevent) {
      pageFlashPrevent.remove();
    }
  }
};

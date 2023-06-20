import { useCallback } from 'react';

/**
 * Usage:
 * const [blockScroll, allowScroll] = useScrollBlock();
 */
export function useScrollBlock() {
  const blockScroll = useCallback(() => {
    if (typeof document === 'undefined') return;

    const { body, documentElement } = document;

    if (!body || !body.style) return;

    const scrollBarWidth = window.innerWidth - documentElement.clientWidth;
    const bodyPaddingRight = parseInt(window.getComputedStyle(body).getPropertyValue('padding-right')) || 0;

    /**
     * 1. Fixes a bug in iOS and desktop Safari whereby setting
     *    `overflow: hidden` on the html/body does not prevent scrolling.
     * 2. Fixes a bug in desktop Safari where `overflowY` does not prevent
     *    scroll if an `overflow-x` style is also applied to the body.
     */
    documentElement.style.position = 'relative'; /* [1] */
    documentElement.style.overflow = 'hidden'; /* [2] */
    body.style.position = 'relative'; /* [1] */
    body.style.overflow = 'hidden'; /* [2] */
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;
  }, []);

  const allowScroll = useCallback(() => {
    if (typeof document === 'undefined') return;

    const { body, documentElement } = document;

    documentElement.style.position = '';
    documentElement.style.overflow = '';
    body.style.position = '';
    body.style.overflow = '';
    body.style.paddingRight = '';
  }, []);

  return [blockScroll, allowScroll];
}

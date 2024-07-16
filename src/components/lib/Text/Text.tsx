import styled, { css } from 'styled-components';

type FontSize = 'text-xs' | 'text-s' | 'text-base' | 'text-l' | 'text-xl' | 'text-2xl' | 'text-3xl' | 'text-hero';

export const Text = styled.p<{
  color?: string;
  size?: FontSize;
  mobileSize?: FontSize;
  weight?: string;
  clampLines?: number;
}>`
  font: ${(p) => (p.size ? `var(--${p.size})` : `var(--text-base)`)};
  font-weight: ${(p) => p.weight} !important;
  color: ${(p) => (p.color === 'white' ? 'white' : `var(--${p.color ?? 'sand12'})`)};
  margin: 0;

  -webkit-line-clamp: ${(p) => p.clampLines};
  ${(p) =>
    p.clampLines
      ? css`
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          word-break: break-word;
        `
      : undefined}

  @media (max-width: 900px) {
    font: var(--${(p) => p.mobileSize ?? p.size ?? 'text-base'});
  }
`;

export const H1 = styled.h1`
  font: var(--text-hero);
  letter-spacing: -3px;
  text-align: center;
  color: var(--black);
  margin: 0;

  @media (max-width: 900px) {
    font-size: 48px;
  }
`;

export const H2 = styled.h2`
  font: var(--text-hero);
  font-size: 56px;
  line-height: 1.3;
  color: var(--black);
  margin: 0;

  @media (max-width: 900px) {
    font-size: 36px;
  }
`;

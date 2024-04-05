import styled from 'styled-components';

type Props = {
  color?: string;
  font?: 'text-xs' | 'text-s' | 'text-base' | 'text-l' | 'text-xl' | 'text-2xl' | 'text-3xl' | 'text-hero';
  weight?: string;
};

export const Text = styled.p<Props>`
  font: ${(p) => (p.font ? `var(--${p.font})` : `var(--text-base)`)};
  font-weight: ${(p) => p.weight ?? '400'};
  color: ${(p) => (p.color ? `var(--${p.color})` : `currentColor`)};
  margin: 0;
`;

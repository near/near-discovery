import styled from 'styled-components';

export const Grid = styled.div<{
  alignItems?: string;
  columns?: string;
  mobileGap?: string;
  gap?: string;
}>`
  display: grid;
  gap: ${(p) => p.gap};
  grid-template-columns: ${(p) => p.columns};
  align-items: ${(p) => p.alignItems};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: ${(p) => p.mobileGap ?? p.gap};
  }
`;

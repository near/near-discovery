import styled from 'styled-components';

export const Flex = styled.div<{
  alignItems?: string;
  direction?: string;
  gap?: string;
  justifyContent?: string;
  mobileAlignItems?: string;
  mobileGap?: string;
  mobileStack?: boolean;
  wrap?: string;
}>`
  display: flex;
  gap: ${(p) => p.gap};
  align-items: ${(p) => p.alignItems};
  justify-content: ${(p) => p.justifyContent};
  flex-direction: ${(p) => p.direction ?? 'row'};
  flex-wrap: ${(p) => p.wrap ?? 'nowrap'};

  ${(p) =>
    p.mobileStack &&
    `
    @media (max-width: 900px) {
      flex-direction: column;
    }
  `}

  @media (max-width: 900px) {
    gap: ${(p) => p.mobileGap ?? p.gap};
    align-items: ${(p) => p.mobileAlignItems ?? p.alignItems};
  }
`;

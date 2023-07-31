import styled from 'styled-components';
import { LARGE_SCREEN, MEDIUM_SCREEN, SMALL_SCREEN } from '@/components/ref-org/RefStyleVar';

export const StyledT1 = styled.div`
  font-size: 60px;
  line-height: 1.2;
  font-weight: 700;

  @media (max-width: ${MEDIUM_SCREEN}) {
    font-size: 42px;
  }

  @media (max-width: ${SMALL_SCREEN}) {
    font-size: 32px;
  }
`;

export const StyledT2 = styled.div`
  font-size: 42px;
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: ${MEDIUM_SCREEN}) {
    font-size: 34px;
  }

  @media (max-width: ${SMALL_SCREEN}) {
    font-size: 22px;
  }
`;

export const StyledT3 = styled.div`
  font-size: 26px;
  line-height: 1.2;
  font-weight: 400;

  @media (max-width: ${MEDIUM_SCREEN}) {
    font-size: 22px;
  }

  @media (max-width: ${SMALL_SCREEN}) {
    font-size: 18px;
  }
`;

export const StyledT4 = styled.div`
  font-size: 20px;
  font-weight: 400;

  @media (max-width: ${MEDIUM_SCREEN}) {
    font-size: 18px;
  }

  @media (max-width: ${SMALL_SCREEN}) {
    font-size: 16px;
  }
`;

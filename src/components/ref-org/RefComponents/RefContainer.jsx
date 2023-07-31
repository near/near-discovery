import styled from 'styled-components';
import { LARGE_SCREEN, MEDIUM_SCREEN } from '@/components/ref-org/RefStyleVar';

const RefContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  max-width: 1150px;
  padding-left: 60px;
  padding-right: 60px;
  margin: 0 auto;
  flex-direction: column;

  @media (max-width: ${LARGE_SCREEN}) {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media (max-width: ${MEDIUM_SCREEN}) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export default RefContainer;

import styled from 'styled-components';

import { LARGE_SCREEN, MEDIUM_SCREEN } from '@/components/near/NearStyleVar';

const NearContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  max-width: 1150px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;
  flex-direction: column;
`;

export default NearContainer;

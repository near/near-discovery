import styled from 'styled-components';

import { Text } from '@/components/lib/Text';
import type { NextPageWithLayout } from '@/utils/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 1rem;
`;

const BlockedPage: NextPageWithLayout = () => {
  return (
    <Container>
      <Text as="h3" font="text-xl">
        near.org is not currently available in your region.
      </Text>
    </Container>
  );
};

export default BlockedPage;

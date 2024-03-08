import styled from 'styled-components';
import { useSimpleLayout } from '@/hooks/useLayout';
import { useRouter } from 'next/router';
import type { NextPageWithLayout } from '@/utils/types';

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  color: #fff;
  font-size: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  width: 164px;
  height: 46px;
  border-radius: 10px;
  background: #ebf479;
  padding: 0px 18px;
  color: #000;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-top: 20px;
`;

const NotFoundPage: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <StyledContainer>
      <div> 404 Page Not Found!</div>
      <StyledButton
        onClick={() => {
          router.replace('/');
        }}
      >
        Back to Home
      </StyledButton>
    </StyledContainer>
  );
};

NotFoundPage.getLayout = useSimpleLayout;

export default NotFoundPage;

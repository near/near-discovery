import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useLayoutStore } from '@/stores/layout';

const StyledContainer = styled.div`
  padding: 17px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-shrink: 0;
`;

export const StyledProfileButton = styled(motion.button)`
  border-radius: 10px;
  border: 1px solid #373a53;
  background: linear-gradient(0deg, #373a53, #373a53),
    linear-gradient(0deg, rgba(55, 58, 83, 0.5), rgba(55, 58, 83, 0.5));
  width: 300px;
  height: 46px;
  flex-shrink: 0;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
`;

export default function Footer() {
  const router = useRouter();
  const setLayoutStore = useLayoutStore((store) => store.set);
  return (
    <StyledContainer>
      <StyledProfileButton
        whileHover={{ opacity: 0.8 }}
        whileTap={{ opacity: 0.6 }}
        onClick={() => {
          router.push('/profile');
          setLayoutStore({ showAccountSider: false });
        }}
        data-bp="30012-001"
      >
        My Profile
      </StyledProfileButton>
    </StyledContainer>
  );
}

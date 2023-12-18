import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import useAccount from '@/hooks/useAccount';
import useAuth from '@/hooks/useAuth';
import { useLayoutStore } from '@/stores/layout';

const StyledContainer = styled.div`
  margin: 0px 14px;
  border-top: 1px solid #373a53;
  padding: 20px 11px 25px 7px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

export const StyledProfileButton = styled(motion.button)`
  border-radius: 10px;
  border: 1px solid #373a53;
  background: rgba(0, 0, 0, 0.5);
  width: 246px;
  height: 46px;
  flex-shrink: 0;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
`;

export const StyledDisconnectButton = styled(motion.div)`
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  cursor: pointer;
  position: relative;
  .tips {
    padding: 10px;
    border-radius: 8px;
    background-color: rgba(55, 58, 83, 0.5);
    font-size: 16px;
    line-height: 16px;
    font-weight: 500;
    color: #ff61d3;
    position: absolute;
    top: -41px;
    right: 0px;
    display: none;
  }
  &:hover .tips {
    display: block;
  }
`;

export default function Footer() {
  const { account } = useAccount();
  const { connect, logout } = useAuth();
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
      >
        My Profile
      </StyledProfileButton>
      <StyledDisconnectButton
        whileHover={{ opacity: 0.8 }}
        whileTap={{ opacity: 0.6 }}
        onClick={async () => {
          if (account) {
            await logout();
            setLayoutStore({ showAccountSider: false });
          } else {
            connect();
          }
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="1" y="1" width="46" height="46" rx="10" fill="black" fillOpacity="0.5" stroke="#373A53" />
          <path
            d="M20.8732 19.7113C20.5504 19.3888 20.0663 19.3888 19.7435 19.7113C19.4207 20.0338 19.4207 20.5176 19.7435 20.8402L27.732 28.8229C27.8934 28.9842 28.0951 29.0648 28.2968 29.0648C28.4986 29.0648 28.7003 28.9842 28.8617 28.8229C29.1844 28.5004 29.1844 28.0166 28.8617 27.694L20.8732 19.7113ZM24.1412 27.8553L23.415 28.581C23.1326 28.8632 22.8501 29.0648 22.487 29.1857C21.8012 29.468 21.0346 29.468 20.3487 29.1857C19.9856 29.0245 19.7032 28.8229 19.4207 28.581C19.1383 28.2988 18.9366 28.0166 18.8156 27.6537C18.6945 27.3312 18.6138 26.9683 18.6138 26.6055C18.6138 26.2426 18.6945 25.8798 18.8156 25.5572C18.9769 25.1944 19.1787 24.9122 19.4207 24.63L20.147 23.9042C20.4697 23.5817 20.4697 23.0979 20.147 22.7754C19.8242 22.4528 19.3401 22.4528 19.0173 22.7754L18.2911 23.5011C17.8876 23.9042 17.5245 24.4284 17.3228 24.9525C17.121 25.4766 17 26.041 17 26.6055C17 27.1699 17.121 27.7343 17.3228 28.2585C17.5648 28.8229 17.8876 29.3067 18.2911 29.7099C18.6945 30.113 19.219 30.4759 19.7435 30.6775C20.268 30.8791 20.8329 31 21.3977 31C21.9625 31 22.5274 30.8791 23.0519 30.6775C23.6167 30.4356 24.1009 30.113 24.5043 29.7099L25.2305 28.9842C25.5533 28.6616 25.5533 28.1778 25.2305 27.8553C24.9481 27.5328 24.464 27.5328 24.1412 27.8553ZM30.6772 19.7516C30.4352 19.1872 30.1124 18.7034 29.7089 18.3002C29.3055 17.897 28.781 17.5342 28.2565 17.3326C27.2075 16.8891 25.9971 16.8891 24.9078 17.3326C24.3429 17.5745 23.8588 17.897 23.4553 18.3002L22.7291 19.0259C22.4063 19.3485 22.4063 19.8323 22.7291 20.1548C23.0519 20.4773 23.536 20.4773 23.8588 20.1548L24.585 19.4291C24.8674 19.1469 25.1499 18.9453 25.513 18.8243C26.1988 18.5421 26.9654 18.5421 27.6513 18.8243C28.0144 18.9856 28.2968 19.1872 28.5793 19.4291C28.8617 19.7113 29.0634 19.9935 29.1844 20.3564C29.3055 20.6789 29.3862 21.0418 29.3862 21.4046C29.3862 21.7675 29.3055 22.1303 29.1844 22.4528C29.0231 22.8157 28.8213 23.0979 28.5793 23.3801L27.853 24.1058C27.5303 24.4284 27.5303 24.9122 27.853 25.2347C28.0144 25.396 28.2161 25.4766 28.4179 25.4766C28.6196 25.4766 28.8213 25.396 28.9827 25.2347L29.7089 24.509C30.1124 24.1058 30.4755 23.5817 30.6772 23.0576C30.879 22.5335 31 21.969 31 21.4046C31 20.8402 30.879 20.2757 30.6772 19.7516Z"
            fill="#979ABE"
          />
        </svg>
        <div className="tips">Disconnect</div>
      </StyledDisconnectButton>
    </StyledContainer>
  );
}

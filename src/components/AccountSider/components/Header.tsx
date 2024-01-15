import { memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useAccount from '@/hooks/useAccount';
import useAuth from '@/hooks/useAuth';
import { useLayoutStore } from '@/stores/layout';
import AccountItem from './AccountItem';
import SubtractItem from './SubtractItem';

const StyledHeader = styled.div`
  width: 100%;
  padding-left: var(--padding-x);
  padding-right: var(--padding-x);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

export const StyledDisconnectButton = styled(motion.div)`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  cursor: pointer;
  position: relative;
  margin-left: 14px;
  .tips {
    padding: 10px;
    border-radius: 8px;
    background-color: rgba(55, 58, 83, 0.5);
    font-size: 16px;
    line-height: 16px;
    font-weight: 500;
    color: #ff61d3;
    position: absolute;
    top: 100%;
    right: 0px;
    display: none;
  }
  &:hover .tips {
    display: block;
  }
`;


const StyledCloseWidget = styled.div`
  display: flex;
`

const Header = ({ showCodes, setShowCodes }: { showCodes: boolean; setShowCodes: (show: boolean) => void }) => {
  const { account } = useAccount();
  const { connect, logout } = useAuth();
  const setLayoutStore = useLayoutStore((store) => store.set);
  
  return (
    <StyledHeader>
      <AccountItem />
      <StyledCloseWidget>
        <SubtractItem showCodes={showCodes} setShowCodes={setShowCodes} />
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
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
            <rect x="1" y="1" width="32" height="32" rx="8" fill="#373A53" fill-opacity="0.5" stroke="#373A53"/>
            <path d="M13.4265 12.0986C13.0576 11.73 12.5043 11.73 12.1354 12.0986C11.7666 12.4672 11.7666 13.0202 12.1354 13.3888L21.2651 22.5119C21.4496 22.6962 21.6801 22.7883 21.9107 22.7883C22.1412 22.7883 22.3718 22.6962 22.5562 22.5119C22.9251 22.1433 22.9251 21.5904 22.5562 21.2217L13.4265 12.0986ZM17.1614 21.406L16.3314 22.2354C16.0086 22.558 15.6859 22.7883 15.2709 22.9266C14.487 23.2491 13.611 23.2491 12.8271 22.9266C12.4121 22.7423 12.0893 22.5119 11.7666 22.2354C11.4438 21.9129 11.2133 21.5904 11.0749 21.1757C10.9366 20.8071 10.8444 20.3924 10.8444 19.9777C10.8444 19.563 10.9366 19.1483 11.0749 18.7797C11.2594 18.365 11.4899 18.0425 11.7666 17.7199L12.5965 16.8906C12.9654 16.522 12.9654 15.969 12.5965 15.6004C12.2277 15.2318 11.6744 15.2318 11.3055 15.6004L10.4755 16.4298C10.0144 16.8906 9.59942 17.4896 9.36888 18.0886C9.13833 18.6875 9 19.3326 9 19.9777C9 20.6228 9.13833 21.2678 9.36888 21.8668C9.64553 22.5119 10.0144 23.0648 10.4755 23.5256C10.9366 23.9863 11.536 24.401 12.1354 24.6314C12.7349 24.8618 13.3804 25 14.0259 25C14.6715 25 15.317 24.8618 15.9164 24.6314C16.562 24.3549 17.1153 23.9863 17.5764 23.5256L18.4063 22.6962C18.7752 22.3276 18.7752 21.7747 18.4063 21.406C18.0836 21.0374 17.5303 21.0374 17.1614 21.406ZM24.6311 12.1447C24.3545 11.4996 23.9856 10.9467 23.5245 10.486C23.0634 10.0252 22.464 9.61051 21.8646 9.38013C20.6657 8.87329 19.2824 8.87329 18.0375 9.38013C17.3919 9.65659 16.8386 10.0252 16.3775 10.486L15.5476 11.3153C15.1787 11.6839 15.1787 12.2369 15.5476 12.6055C15.9164 12.9741 16.4697 12.9741 16.8386 12.6055L17.6686 11.7761C17.9914 11.4536 18.3141 11.2232 18.7291 11.085C19.513 10.7624 20.389 10.7624 21.1729 11.085C21.5879 11.2693 21.9107 11.4996 22.2334 11.7761C22.5562 12.0986 22.7867 12.4212 22.9251 12.8359C23.0634 13.2045 23.1556 13.6192 23.1556 14.0338C23.1556 14.4485 23.0634 14.8632 22.9251 15.2318C22.7406 15.6465 22.5101 15.969 22.2334 16.2916L21.4035 17.121C21.0346 17.4896 21.0346 18.0425 21.4035 18.4111C21.5879 18.5954 21.8184 18.6875 22.049 18.6875C22.2795 18.6875 22.5101 18.5954 22.6945 18.4111L23.5245 17.5817C23.9856 17.121 24.4006 16.522 24.6311 15.923C24.8617 15.324 25 14.6789 25 14.0338C25 13.3888 24.8617 12.7437 24.6311 12.1447Z" fill="#979ABE"/>
          </svg>
          <div className="tips">Disconnect</div>
        </StyledDisconnectButton>
      </StyledCloseWidget>
      
    </StyledHeader>
  );
};

export default memo(Header);

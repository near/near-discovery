import Link from 'next/link';

import { useState } from 'react';
import styled from 'styled-components';
import DropdownMenuPanel from '@/components/DropdownMenuPanel';
import AccountItem from '@/components/AccountSider/components/AccountItem';
import DropdownSearchResultPanel from '@/components/DropdownSearchResultPanel';
import Chain from '@/components/AccountSider/components/Chain';

import useAccount from '@/hooks/useAccount';
import { useLayoutStore } from '@/stores/layout';

const LoginContainer = styled.div`
  width: auto;
  align-items: center;
  display: flex;
  gap: 10px;
`;
const AccountWrapper = styled.div<{ disabled?: boolean }>`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const Container = styled.div`
  position: relative;
  color: #979abe;
  padding: 20px 36px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 50;
  background: #16181d;
  border-bottom: 1px solid #21232a;

  .container-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;
  }
`;

const LogoContainer = styled.div`
  width: auto;
  align-items: center;
  img {
    height: 32px;
  }
`;

const MenuContainer = styled.div`
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 30;
  flex: 1;
  display: flex;
  justify-content: center;
  font-family: Gantari;
  font-size: 18px;
  font-weight: 500;

  gap: 50px;
  /* margin: 0 24% 0 14%; */
  align-items: center;
`;

const Search = styled.div`
  width: 100%;
  position: relative;
  input {
    width: 100%;
    height: 48px;
    line-height: 48px;
    background: transparent;
    border: 1px solid #343743;
    padding-right: 24px;
    border-radius: 50px;
    padding: 16px 16px 16px 50px;
    color: #ffffff;
    background: linear-gradient(0deg, #282a33, #282a33), linear-gradient(0deg, #343743, #343743);
  }
  input:focus {
    outline: none;
    color: #ffffff;
    border: 1px solid #343743;
    background: linear-gradient(0deg, #282a33, #282a33), linear-gradient(0deg, #343743, #343743);
    box-shadow: none;
  }
  .switch-icon-img {
    position: absolute;
    left: 20px;
    top: 16px;
    margin-left: 0;
    cursor: pointer;
  }
  .switch-icon {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
  .switch-icon-img {
    transition: 0.3s;
    opacity: 0;
  }
  .switch-icon-img.show {
    opacity: 1;
  }
  .search-icon {
    position: absolute;
    left: 18px;
    top: 16px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const InputCloseIcon = styled.div`
  position: absolute;
  cursor: pointer;
  right: 12px;
  top: 10px;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;

const logoUrl = 'https://assets.dapdap.net/images/logo.png';

const ExpandIcon = 'https://assets.dapdap.net/images/bafkreiam7p4ewrfedupruquxtsgrj7x2m425tky6htqdalbxa6l74hstpi.svg';

const CloseIcon = 'https://assets.dapdap.net/images/bafkreier3j4otvsg2hp6bwgqsenjkecslv4vsn6mdjhyskdgfn5uqilkyu.svg';

export const DesktopNavigationTop = () => {
  const setLayoutStore = useLayoutStore((store) => store.set);
  const { account } = useAccount();

  const [searchContent, setSearchContent] = useState('');

  const [showMenuContent, setShowMenuContent] = useState(false);

  return (
    <Container>
      <div className="container-nav">
        <Link href="/">
          <LogoContainer>
            <img src={logoUrl} alt="" />
          </LogoContainer>
        </Link>
        <MenuContainer>
          <Search>
            <InputWrapper>
              <input
                type="text"
                placeholder="search dapps, chains..."
                value={searchContent}
                onChange={(e) => setSearchContent(e.target.value)}
                autoFocus
                id="nav-top-search"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="15"
                viewBox="0 0 21 15"
                fill="none"
                className="search-icon"
              >
                <circle cx="7.01829" cy="7.01829" r="6.01829" stroke="#EBF479" stroke-width="2" />
                <rect
                  x="14.9138"
                  y="9.64978"
                  width="6.141"
                  height="2.63186"
                  rx="1.31593"
                  transform="rotate(30 14.9138 9.64978)"
                  fill="#EBF479"
                />
              </svg>
              {searchContent && (
                <InputCloseIcon
                  onClick={() => {
                    setSearchContent('');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#303142" />
                    <path
                      d="M13.444 12L16.7799 8.66415C17.0307 8.41332 17.0735 8.0494 16.8756 7.85157L16.1482 7.12424C15.9503 6.92632 15.5869 6.96974 15.3356 7.22041L12.0001 10.5561L8.66433 7.22049C8.41349 6.96941 8.04957 6.92632 7.85165 7.12449L7.12431 7.8519C6.92648 8.04949 6.96931 8.4134 7.22048 8.66423L10.5563 12L7.22048 15.336C6.96973 15.5866 6.92631 15.9503 7.12431 16.1482L7.85165 16.8756C8.04957 17.0735 8.41349 17.0306 8.66433 16.7799L12.0003 13.4439L15.3357 16.7794C15.587 17.0307 15.9504 17.0735 16.1483 16.8756L16.8757 16.1482C17.0735 15.9503 17.0307 15.5866 16.78 15.3356L13.444 12Z"
                      fill="#979ABE"
                    />
                  </svg>
                </InputCloseIcon>
              )}
            </InputWrapper>
            <div className="switch-icon" onClick={() => setShowMenuContent(!showMenuContent)}>
              <img src={CloseIcon} alt="" className={`switch-icon-img ${showMenuContent && 'show'}`} />
              <img src={ExpandIcon} alt="" className={`switch-icon-img ${!showMenuContent && 'show'}`} />
            </div>
            <DropdownSearchResultPanel
              searchText={searchContent}
              setSearchContent={setSearchContent}
              show={searchContent}
            />
          </Search>
        </MenuContainer>
        {account ? (
          <LoginContainer>
            <Chain showName={false} />
            <AccountWrapper
              onClick={() => {
                setLayoutStore({ showAccountSider: true });
              }}
            >
              <AccountItem showCopy={false} logoSize={28} />
            </AccountWrapper>
          </LoginContainer>
        ) : (
          <div />
        )}
      </div>

      {showMenuContent && <DropdownMenuPanel show={showMenuContent} setShow={setShowMenuContent} />}
    </Container>
  );
};

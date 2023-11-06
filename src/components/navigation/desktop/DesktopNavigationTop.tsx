import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AccountItem from '@/components/AccountSider/components/AccountItem';
import Chain from '@/components/AccountSider/components/Chain';
import { menuData } from '@/data/menuData';
import useAccount from '@/hooks/useAccount';
import { useLayoutStore } from '@/stores/layout';
import { useSearchParams } from 'next/navigation';
import { dapps } from '@/config/dapps';

const BackRoute = styled.div`
  /* position: absolute; */
  width: 100%;

  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 6px;

  .back-icon {
    padding-left: 100px;
    padding-right: 8px;
  }

  .dapp-logo {
    width: 32px;
    height: 32px;
    cursor: pointer;
  }

  .dapp-name {
    font-size: 16px;
    font-style: italic;
    font-weight: 900;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: var(--button-color);
  }
`;

const backIcon = (
  <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 12L2 6.5L7 1" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
  </svg>
);

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
  color: #979abe;
  padding: 20px 36px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
  background: #16181d;
  border-bottom: 1px solid #21232a;

  .container-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;
  }
  .container-submenu {
    display: none;
    align-items: center;
    margin-top: 30px;
    z-index: 1;
    padding-bottom: 20px;
    margin: 0 -36px;
    padding: 20px 36px;
    &.show {
      display: flex;
      border-bottom: 1px solid #343838;
      animation: slideDown 0.5s ease forwards;
    }
    .submenu-item {
      margin: 5px 0;
      text-align: center;
      opacity: 0.5;
      background: #373a53;
      border-radius: 10px;
      padding: 4px 8px 4px 4px;
      font-size: 14px;
      margin-right: 14px;
      color: #ffffff;
      text-decoration: none;
      height: 32px;
      line-height: 26px;
      display: flex;
      .submenu-item-icon {
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        align-items: center;
        border-radius: 10px;
        margin-right: 10px;
        flex-shrink: 0;
      }
      .submenu-item-title {
        flex-grow: 1;
        white-space: nowrap;
      }
      &:hover {
        opacity: 1;
      }
      &.active {
        background-color: #ebf479;
        color: #181a27;
        opacity: 1;
      }
    }
    .submenu-item-disable {
      cursor: not-allowed;
      &:hover {
        opacity: 0.5;
      }
    }
  }
  @keyframes slideDown {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LogoContainer = styled.div`
  width: auto;
  align-items: center;
`;

const MenuContainer = styled.div`
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

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
  img {
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
`;

const MenuContent = styled.div`
  display: none;
  padding-top: 40px;
  margin: 0 10%;
  color: #ffffff;
  display: flex;
  font-family: Gantari;
  .menu-content-item {
    h1 {
      font-size: 20px;
      font-weight: 700;
    }
    p {
      font-size: 14px;
      font-weight: 400;
      color: #979abe;
      margin-bottom: 20px;
    }

    .item-list-ingle {
      display: inline-block;
      margin-top: 16px;
      width: 50%;
      font-size: 16px;
    }
  }
  &.show {
    display: flex;
    animation: slideDown 0.5s ease forwards;
  }
  @keyframes slideDown {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const logoUrl = 'https://ipfs.near.social/ipfs/bafkreig5ka5mpgawcpswpfqinzpyuxl7wmfbs7xeln3l7udigzvbtotlle';

const SearchIcon = (
  <img src="https://ipfs.near.social/ipfs/bafkreih4njnef5mt7zzwx3l42lhkvw53aanyaxp24hvmiqv6m37fosfsim" alt="" />
);

const ExpandIcon = 'https://ipfs.near.social/ipfs/bafkreiam7p4ewrfedupruquxtsgrj7x2m425tky6htqdalbxa6l74hstpi';

const CloseIcon = 'https://ipfs.near.social/ipfs/bafkreigws2l7qkqzlqlt7dr4v6ncbdske4xvktr2ipbwk7mqyent7bbfza';

export const DesktopNavigationTop = () => {
  const setLayoutStore = useLayoutStore((store) => store.set);
  const { account } = useAccount();
  const router = useRouter();

  const query = router.query;
  // console.log('query: ', query, currentPath);

  const dappRoute = query.dappRoute;

  const dappConfig = dapps.find((item) => typeof dappRoute === 'string' && item.dappRoute.indexOf(dappRoute) > -1);

  const search = useSearchParams();

  const dappLogo = search.get('logo') || dappConfig?.logo;

  const name = search.get('name') || dappConfig?.name;

  const [showMenuContent, setShowMenuContent] = useState(false);

  return (
    <Container>
      <div className="container-nav">
        <LogoContainer>
          <img src={logoUrl} alt="" />
        </LogoContainer>
        <MenuContainer>
          <Search>
            <input type="text" placeholder="search dapps, chains..." autoFocus />
            {SearchIcon}
            <div className="switch-icon" onClick={() => setShowMenuContent(!showMenuContent)}>
              <img src={showMenuContent ? CloseIcon : ExpandIcon} alt="" />
            </div>
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

      {dappLogo && name && (
        <BackRoute>
          <Link className="back-icon" href="/">
            {backIcon}
          </Link>

          <img className="dapp-logo" src={dappLogo} />

          <div className="dapp-name">{name}</div>
        </BackRoute>
      )}

      {showMenuContent && (
        <MenuContent className={showMenuContent ? 'show' : ''}>
          <div className="menu-content-item">
            <h1>Explore Dapps</h1>
            <p>Filter by token TBD/native token, blockchains, mainfeatures.</p>
            <div className="item-list-ingle">Dex</div>
            <div className="item-list-ingle">Staking</div>
            <div className="item-list-ingle">Lending</div>
            <div className="item-list-ingle">Liquidity</div>
            <div className='content-item-arrow'>
              
            </div>
          </div>
        </MenuContent>
      )}
    </Container>
  );
};

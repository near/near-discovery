import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import AccountItem from '@/components/AccountSider/components/AccountItem';
import Chain from '@/components/AccountSider/components/Chain';
import { QUEST_PATH } from '@/config/quest';
import useAccount from '@/hooks/useAccount';
import { useLayoutStore } from '@/stores/layout';
import { get } from '@/utils/http';
import useCategoryDappList from '@/views/Quest/hooks/useCategoryDappList';

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
  .search-results {
    width: 100%;
    position: absolute;
    top: 55px;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: rgb(48, 49, 66);
    color: rgba(151, 154, 190, 1);
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 12px;
    max-height: 600px;
    overflow: auto;
    padding: 20px 30px;
    .search-results-item {
      a {
        text-decoration: none;
      }
      .results-item-title {
        p {
          font-size: 12px;
          display: inline-block;
        }
        .item-title-right {
          float: right;
          cursor: pointer;
        }
      }
      .results-item-list {
        display: flex;
        img {
          position: inherit;
          width: 30px;
          height: 30px;
        }
        p {
          font-size: 14px;
          color: #ffffff;
          margin-top: 6px;
          margin-left: 10px;
        }
      }
    }
  }
`;

const MaskLayer = styled.div`
  position: fixed;
  top: 80px;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  backdrop-filter: blur(6px);
`;

const MenuContent = styled.div`
  z-index: 100;
  position: absolute;
  left: 0;
  top: 78px;
  background: #16181d;
  width: 100%;
  display: none;
  padding: 40px 12% 28px 12%;
  color: #ffffff;
  display: flex;
  font-family: Gantari;
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
  .menu-content-item {
    display: flex;
    margin-right: 60px;
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
    a {
      color: #ffffff;
      text-decoration: none;
      height: fit-content;
    }

    .item-list-ingle {
      display: inline-block;
      margin-top: 16px;
      width: 50%;
      font-size: 16px;
    }

    .content-item-arrow {
      display: inline-block;
      margin-left: 12px;
      img {
        margin-top: 24px;
      }
    }
  }
  .menu-content-deep {
    padding-left: 60px;
    border-left: 1px solid #383b48;
    a {
      color: #ffffff;
      text-decoration: none;
    }
    .contenr-deep-item {
      display: flex;
      margin-bottom: 36px;
      .deep-item-left {
        margin-right: 20px;
        line-height: 62px;
        width: 42px;
        flex-shrink: 0;
      }
      .deep-item-text {
        h1 {
          font-size: 20px;
          font-weight: 700;
          display: inline-block;
        }
        p {
          font-size: 14px;
          font-weight: 400;
          color: #979abe;
        }
        .current-version {
          color: #ebf479;
          display: inline-block;
          margin-left: 6px;
          padding: 4px 14px 4px 8px;
          background: rgba(55, 58, 83, 0.5);
          border-radius: 10px;
          display: inline-block;
          font-family: Gantari;
          font-size: 12px;
          font-style: italic;
          font-weight: 400;
          line-height: 14px;
          letter-spacing: 0em;
          text-align: left;
          white-space: nowrap;
          img {
            width: 12px;
            height: 12px;
            margin-right: 4px;
          }
        }
      }
    }
    .deep-item-special {
      opacity: 0.5;
      margin-bottom: 0;
    }
  }
`;

const logoUrl = 'https://assets.dapdap.net/images/logo.png';

const SearchIcon = (
  <img src="https://assets.dapdap.net/images/bafkreih4njnef5mt7zzwx3l42lhkvw53aanyaxp24hvmiqv6m37fosfsim.svg" alt="" />
);

const ExpandIcon = 'https://assets.dapdap.net/images/bafkreiam7p4ewrfedupruquxtsgrj7x2m425tky6htqdalbxa6l74hstpi.svg';

const CloseIcon = 'https://assets.dapdap.net/images/bafkreier3j4otvsg2hp6bwgqsenjkecslv4vsn6mdjhyskdgfn5uqilkyu.svg';

const ArrowIcon = 'https://assets.dapdap.net/images/bafkreibrhom3ayevbwnd5e2u65w3qqgqgzk7qumggejceoy5t7ozydu7gm.svg';

const DeepDive = 'https://assets.dapdap.net/images/bafkreicrbwiivaavc7dnlyfr72mnuvd36fhpwrw2yxvwp2afebbkso7d6m.svg';

const Shotcuts = 'https://assets.dapdap.net/images/bafkreideqs5vzneww4ejycligpml3prkr5wd6rhkalsyhyxcfo7mcdegyq.svg';

const Portfolio = 'https://assets.dapdap.net/images/bafkreidtkanbzjdnycy2c3cie32jv2lglg7vsbhvodtlztk7e5sftyrece.svg';

const lockUrl = 'https://assets.dapdap.net/images/bafkreigkzmvkujzp5ned6vk55vr6w2vy3lwcbyr4dw35nyddsxtgxy4hcq.svg';

export const DesktopNavigationTop = () => {
  const setLayoutStore = useLayoutStore((store) => store.set);
  const { account } = useAccount();
  const router = useRouter();
  const [networkList, setNetworkList] = useState<any[]>([]);
  const { loading, categories } = useCategoryDappList();
  const categoryArray = Object.values(categories);
  const [searchContent, setSearchContent] = useState('');
  const [searchResults, setSearchResults] = useState<any | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [showNetworkAll, setShowNetworkAll] = useState(false);
  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        const resultNetwork = await get(`${QUEST_PATH}/api/network/list`);
        setNetworkList(resultNetwork.data || []);
      } catch (error) {
        console.error('Error fetching resultNetwork data:', error);
      }
    };
    fetchNetworkData();
  }, []);

  useEffect(() => {
    const fetchSearchData = async () => {
      if (searchContent) {
        try {
          const result = await get(`${QUEST_PATH}/api/search?content=${searchContent}`);
          setSearchResults(result.data);
        } catch (error) {
          console.error('Error fetching search data:', error);
        }
      }
    };
    fetchSearchData();
  }, [searchContent]);

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
            <input
              type="text"
              placeholder="search dapps, chains..."
              value={searchContent}
              onChange={(e) => setSearchContent(e.target.value)}
              autoFocus
              id="nav-top-search"
            />
            {SearchIcon}
            <div className="switch-icon" onClick={() => setShowMenuContent(!showMenuContent)}>
              <img src={showMenuContent ? CloseIcon : ExpandIcon} alt="" />
            </div>
            {searchContent && (
              <div className="search-results">
                <div className="search-results-item">
                  <div className="results-item-title">
                    <p>Dapp</p>
                    <p className="item-title-right" onClick={() => setShowAll(!showAll)}>
                      {showAll ? 'Close' : 'View More'}
                    </p>
                  </div>
                  {searchResults &&
                    (showAll ? searchResults.dapps : searchResults.dapps.slice(0, 5)).map(
                      (item: any, index: number) => (
                        <Link
                          key={index}
                          href={`/dapps-details?dapp_id=${item.id}`}
                          onClick={() => setSearchContent('')}
                        >
                          <div className="results-item-list">
                            <img src={item.logo} alt="" />
                            <p>{item.name}</p>
                          </div>
                        </Link>
                      ),
                    )}
                </div>
                <div className="search-results-item">
                  <div className="results-item-title">
                    <p>Blockchain</p>
                    <p className="item-title-right" onClick={() => setShowNetworkAll(!showNetworkAll)}>
                      {showNetworkAll ? 'Close' : 'View More'}
                    </p>
                  </div>
                  {searchResults &&
                    (showNetworkAll ? searchResults.networks : searchResults.networks.slice(0, 5)).map(
                      (item: any, index: number) => (
                        <Link key={index} href={`/chains-details?id=${item.id}`} onClick={() => setSearchContent('')}>
                          <div className="results-item-list">
                            <img src={item.logo} alt="" />
                            <p>{item.name}</p>
                          </div>
                        </Link>
                      ),
                    )}
                </div>
                <div className="search-results-item">
                  <div className="results-item-title">
                    <p>Quest</p>
                  </div>
                  {searchResults &&
                    (showAll ? searchResults.quests : searchResults.quests).map((item: any, index: number) => (
                      <Link key={index} href={`/quest/detail?id=${item.id}`} onClick={() => setSearchContent('')}>
                        <div className="results-item-list">
                          <img src={item.logo} alt="" />
                          <p>{item.name}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}
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

      {showMenuContent && (
        <>
          <MaskLayer onClick={() => setShowMenuContent(false)} />
          <MenuContent className={showMenuContent ? 'show' : ''}>
            <div className="menu-content-item">
              <div className="content-item-text">
                <h1>Explore Dapps</h1>
                <p>Filter by token TBD/native token, blockchains, mainfeatures.</p>
                {categoryArray &&
                  categoryArray.map((item: any, index: number) => {
                    return (
                      <div
                        className="item-list-ingle"
                        key={index}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setShowMenuContent(false);
                          router.push({
                            pathname: '/alldapps',
                            query: { category: item.id },
                          });
                        }}
                      >
                        {item.name}
                      </div>
                    );
                  })}
              </div>
              <Link href="/alldapps" onClick={() => setShowMenuContent(false)}>
                <div className="content-item-arrow">
                  <img src={ArrowIcon} alt="" />
                </div>
              </Link>
            </div>
            <div className="menu-content-item">
              <div className="content-item-text">
                <h1>Explore Blockchains</h1>
                <p>Discover 18 Layer 2 Blockchains across the most popular web3 ecosystems.</p>
                {networkList &&
                  networkList.map((child, index) => (
                    <Link href={`/chains-details?id=${child.id}`} key={index} onClick={() => setShowMenuContent(false)}>
                      <div className="item-list-ingle">{child.name}</div>
                    </Link>
                  ))}
              </div>
              <Link href="/blockchains" onClick={() => setShowMenuContent(false)}>
                <div className="content-item-arrow">
                  <img src={ArrowIcon} alt="" />
                </div>
              </Link>
            </div>
            <div className="menu-content-deep">
              <Link href="/warmup " onClick={() => setShowMenuContent(false)}>
                <div className="contenr-deep-item">
                  <div className="deep-item-left">
                    <img src={DeepDive} alt="" />
                  </div>
                  <div className="deep-item-text">
                    <h1>DeepDive</h1>
                    <p> DeepDive the hotest L2 Blockcchain to get more intension of reward.</p>
                  </div>
                </div>
              </Link>
              <Link href="/all-in-one" onClick={() => setShowMenuContent(false)}>
                <div className="contenr-deep-item">
                  <div className="deep-item-left">
                    <img src={Shotcuts} alt="" />
                  </div>
                  <div className="deep-item-text">
                    <h1>Shotcuts</h1>
                    <p>Shortcuts integrate common functions and the most popular dapps.</p>
                  </div>
                </div>
              </Link>
              <div className="contenr-deep-item deep-item-special">
                <div className="deep-item-left">
                  <img src={Portfolio} alt="" />
                </div>
                <div className="deep-item-text">
                  <h1>Portfolio</h1>
                  <div className="current-version">
                    <img src={lockUrl} alt="" />
                    Lv.3
                  </div>
                  <p>Access your assets and positions directly from your portfolio after Lv.3.</p>
                </div>
              </div>
            </div>
          </MenuContent>
        </>
      )}
    </Container>
  );
};

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import chains from '@/config/chains';
import { dapps } from '@/config/dapps';
import { menuData } from '@/data/menuData';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const pageLeftBg = 'https://ipfs.near.social/ipfs/bafkreib4gjasib7bgfxtjajhgapcxmc2fibrz47felojxdh7z4u5m7yix4';
const pageBottomBg = 'https://ipfs.near.social/ipfs/bafkreib4gjasib7bgfxtjajhgapcxmc2fibrz47felojxdh7z4u5m7yix4';
const docsIcon = 'https://ipfs.near.social/ipfs/bafkreiae3ujempvwh2mowlpqoitmz7ohcawkrx2u26cezeit443ni475oe';
const teleIcon = 'https://ipfs.near.social/ipfs/bafkreihsnpk5thlrjlk3jakd6vximvtdcqknsikhdu7fgpkw2jusmjptgq';
const HelpIcon = 'https://ipfs.near.social/ipfs/bafkreighqgtfiphvdd32lg3io3k447ola32na3ovjppdrhtvfurccbekke';

const SearchIcon = (
  <img src="https://ipfs.near.social/ipfs/bafkreih4njnef5mt7zzwx3l42lhkvw53aanyaxp24hvmiqv6m37fosfsim" alt="" />
);

const gridIcon = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="5.60005" height="5.60005" rx="1" fill="currentColor" />
    <rect y="6.3999" width="5.60005" height="5.60005" rx="1" fill="currentColor" />
    <rect x="6.39976" width="5.60005" height="5.60005" rx="1" fill="currentColor" />
    <rect x="6.39976" y="6.3999" width="5.60005" height="5.60005" rx="1" fill="currentColor" />
  </svg>
);

const tableIcon = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="12" height="2.4" rx="1.2" fill="currentColor" />
    <rect y="4.7998" width="12" height="2.4" rx="1.2" fill="currentColor" />
    <rect y="9.59961" width="12" height="2.4" rx="1.2" fill="currentColor" />
  </svg>
);

const NewHomePage = styled.div`
  margin: 0 -36px;
  padding: 0 36px;
  background-image: url(${pageLeftBg});
  background-repeat: no-repeat;
  /* background-size: 228px 228px; */
  background-position: 0 -60px;
  color: #979abe;
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
`;

const NewHomePageLeft = styled.div`
  width: 20%;
  height: 100%;
`;

const PageLeftItem = styled.div`
  margin-bottom: 45px;
  .page-netWork-list {
    display: flex;
    flex-wrap: wrap;
    .netWork-list-item {
      margin-right: 12px;
      margin-bottom: 12px;
      flex-basis: auto;
      border: 1px solid #5e617e;
      border-radius: 10px;
      padding: 4px 8px 4px 4px;
      color: #ffffff;
      display: flex;
      cursor: pointer;
      img {
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        align-items: center;
        border-radius: 8px;
        margin-right: 10px;
      }
    }
    .active {
      background: rgba(235, 244, 121, 1);
      color: rgba(24, 26, 39, 1);
    }
  }
  .page-function-list {
    display: flex;
    flex-wrap: wrap;
    .function-list-item {
      margin-right: 12px;
      margin-bottom: 12px;
      flex-basis: auto;
      border: 1px solid #5e617e;
      border-radius: 8px;
      padding: 6px 20px;
      color: #ffffff;
      display: flex;
      cursor: pointer;
    }
    .bridge {
      border: 1px solid rgba(227, 233, 157, 1);
    }
    .dex {
      border: 1px solid rgba(172, 252, 237, 1);
    }
    .lending {
      border: 1px solid rgba(173, 255, 181, 1);
    }
    .liquidity {
      border: 1px solid rgba(170, 214, 255, 1);
    }
    .staking {
      border: 1px solid rgba(193, 191, 255, 1);
    }
    .yield {
      border: 1px solid rgba(249, 181, 230, 1);
    }
    .bridgeActive {
      background: rgba(227, 233, 157, 1);
      color: rgba(0, 0, 0, 1);
    }
    .dexActive {
      background: rgba(172, 252, 237, 1);
      color: rgba(0, 0, 0, 1);
    }
    .lendingActive {
      background: rgba(173, 255, 181, 1);
      color: rgba(0, 0, 0, 1);
    }
    .liquidityActive {
      background: rgba(170, 214, 255, 1);
      color: rgba(0, 0, 0, 1);
    }
    .stakingActive {
      background: rgba(193, 191, 255, 1);
      color: rgba(0, 0, 0, 1);
    }
    .yieldActive {
      background: rgba(249, 181, 230, 1);
      color: rgba(0, 0, 0, 1);
    }
  }
  .page-medal-list {
    display: flex;
    flex-wrap: wrap;
    .medal-list-item {
      margin-right: 12px;
      margin-bottom: 12px;
      flex-basis: auto;
      border: 1px solid #5e617e;
      border-radius: 8px;
      padding: 6px 20px;
      color: #ffffff;
      display: flex;
      cursor: pointer;
    }
    .active {
      background: rgba(235, 244, 121, 1);
      color: rgba(24, 26, 39, 1);
    }
  }
`;

const LeftItemTitle = styled.div`
  font-size: 16px;
  margin-bottom: 18px;
`;

const NewHomePageRight = styled.div`
  margin-left: 40px;
  width: 90%;
  .page-right-content {
    width: 90%;
    position: relative;
    .page-right-tab {
      border: 1px solid rgba(52, 56, 56, 1);
      background-color: #151515;
      padding: 5px;
      border-radius: 32px;
      color: rgba(255, 255, 255, 1);
      display: flex;
      width: fit-content;
      margin-bottom: 30px;
      .right-tab-item {
        font-size: 20px;
        font-weight: 700;
        padding: 8px 24px;
        cursor: pointer;
        border-radius: 32px;
      }
      .active {
        background: #ebf479;
        color: #000000;
      }
    }
    .page-right-switch {
      position: absolute;
      right: 0;
      top: 0;
      border: 1px solid #5e617e;
      padding: 4px;
      display: flex;
      border-radius: 8px;
      .right-switch-item {
        font-size: 12px;
        color: #5e617e;
        border-radius: 6px;
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        align-items: center;
      }
      .active {
        background: #5e617e;
        color: #000000;
      }
    }
  }
  .tbd-content {
    .tbd-content-item {
      display: inline-block;
      text-decoration: none;
      color: #979abe;
      width: 300px;
      height: 215px;
      margin-right: 24px;
      margin-bottom: 28px;
      background: linear-gradient(180deg, #373a53 0%, #13141b 100%);
      border-radius: 20px;
      padding: 20px;
      .content-item-title {
        display: flex;
        margin-bottom: 16px;
        .item-title-icon {
          margin-right: 14px;
          width: 72px;
          height: 72px;
          img {
            width: 100%;
          }
        }
        .item-title-text {
          h1 {
            font-size: 20px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 4px;
          }
          p {
            font-size: 12px;
            margin-bottom: 6px;
          }
          .title-text-icon {
            display: flex;
            img {
              width: 20px;
              height: 20px;
              margin-right: 4px;
            }
          }
        }
      }
      .content-item-text {
        text-align: left;
        margin-bottom: 20px;
        height: 50px;
        p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 14px;
          line-height: 17px;
          letter-spacing: 0em;
        }
      }
      .content-item-tag {
        display: flex;
        .item-tag-item {
          margin-right: 10px;
          padding: 2px 8px;
          font-size: 12px;
          color: #000000;
          border-radius: 30px;
        }
        .Dexes {
          background: #acfced;
        }
        .Bridge {
          background: #e3e99d;
        }
        .Lending {
          background: #adffb5;
        }
        .Liquidity {
          background: #aad6ff;
        }
        .Staking {
          background: #c1bfff;
        }
        .Yield {
          background: #f9b5e6;
        }
      }
    }
  }
  .tbd-table-content {
    width: 90%;
    border: 1px solid rgba(52, 56, 56, 1);
    border-radius: 32px;
    padding: 20px;
    background: linear-gradient(180deg, #141414 0%, #141414 100%), linear-gradient(0deg, #343838, #343838);
    color: rgba(151, 154, 190, 1);
    font-weight: 400;
    table {
      tbody tr {
        cursor: pointer;
      }

      width: 100%;
      tr th {
        font-weight: 400;
      }
      tr td {
        border-bottom: 1px solid rgba(52, 56, 56, 1);
        padding: 12px 2px;
        img {
          width: 42px;
          margin-right: 10px;
        }
        h1 {
          font-family: Gantari;
          font-size: 16px;
          font-weight: 700;
          line-height: 19px;
          letter-spacing: 0em;
          text-align: left;
          display: inline-block;
          color: #ffffff;
        }
        .content-item-tag {
          display: flex;
          .item-tag-item {
            margin-right: 10px;
            padding: 2px 8px;
            font-size: 12px;
            color: #000000;
            border-radius: 30px;
          }
          .Dexes {
            background: #acfced;
          }
          .Bridge {
            background: #e3e99d;
          }
          .Lending {
            background: #adffb5;
          }
          .Liquidity {
            background: #aad6ff;
          }
          .Staking {
            background: #c1bfff;
          }
          .Yield {
            background: #f9b5e6;
          }
        }
      }
    }
  }
`;

const Search = styled.div`
  margin-bottom: 26px;
  input {
    width: 90%;
    height: 48px;
    line-height: 48px;
    background: transparent;
    border: 1px #373a53 solid;
    padding-right: 24px;
    border-radius: 12px;
    padding: 16px;
    color: #ffffff;
  }
  input:focus {
    outline: none;
    color: #ffffff;
    border: 1px solid rgba(235, 244, 121, 0.3);
    background: #0d0e12;
    box-shadow: none;
  }
  img {
    margin-left: -36px;
    cursor: pointer;
  }
`;

const NewHomePageFooter = styled.div`
  display: flex;
  position: absolute;
  bottom: -50px;
  left: 25px;
  .page-connect-item {
    margin-right: 14px;
    img {
      width: 19px;
      margin-bottom: 14px;
    }
    p {
      font-size: 14px;
      color: rgba(94, 97, 126, 1);
    }
  }
`;

const NewHomePageContent: NextPageWithLayout = () => {
  const components = useBosComponents();

  const [selectedMenu, setSelectedMenu] = useState(() => {
    return '';
  });
  const handleMenuClick = (path: string) => {
    if (selectedMenu === path) {
      setSelectedMenu('');
    } else {
      setSelectedMenu(path);
    }
  };

  const [selectedMedalMenu, setSelectedMedalMenu] = useState(() => {
    return '';
  });
  const handleMedalMenuClick = (path: string) => {
    setSelectedMedalMenu(path);
  };

  const [selectedView, setSelectedView] = useState('grid');
  const handlesetSelectedView = (name: string) => {
    setSelectedView(name);
  };

  const [selectedTab, setSelectedTab] = useState(() => {
    return 'TBD';
  });
  const handleTabClick = (path: string) => {
    setSelectedTab(path);
  };

  const [selectedFunction, setSelectedFunction] = useState<string[]>(() => {
    return [];
  });
  const handleFunctionClick = (functionType: string) => {
    if (selectedFunction.includes(functionType)) {
      setSelectedFunction(selectedFunction.filter((type) => type !== functionType));
    } else {
      setSelectedFunction([...selectedFunction, functionType]);
    }
  };

  const [searchValue, setSearchValue] = useState('');

  const router = useRouter();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    setSearchValue(keyword);
  };
  const filteredDapps = dapps.filter(
    ({ name, tags, on_chain_ids }) =>
      name.toLowerCase().includes(searchValue.toLowerCase()) &&
      (selectedFunction.length === 0 || tags.some((tags) => selectedFunction.includes(tags))) &&
      (selectedMenu === '' || on_chain_ids.includes(parseInt(selectedMenu))),
  );
  const sortedDapps = filteredDapps.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return (
    <NewHomePage>
      <NewHomePageLeft>
        <PageLeftItem>
          <LeftItemTitle>Network</LeftItemTitle>
          <div className="page-netWork-list">
            {Object.values(chains).map((child, index) => (
              <div
                className={`netWork-list-item ${selectedMenu === String(child.chainId) ? 'active' : ''}`}
                key={index}
                onClick={() => child.chainId && handleMenuClick(String(child.chainId))}
              >
                <img src={child.icon} alt="" />
                {child.chainName}
              </div>
            ))}
          </div>
        </PageLeftItem>
        <PageLeftItem>
          <LeftItemTitle>Function</LeftItemTitle>
          <div className="page-function-list">
            <div className="page-function-list">
              <div
                className={`function-list-item bridge ${selectedFunction.includes('Bridge') ? 'bridgeActive' : ''}`}
                onClick={() => handleFunctionClick('Bridge')}
              >
                Bridge
              </div>
              <div
                className={`function-list-item dex ${selectedFunction.includes('Dexes') ? 'dexActive' : ''}`}
                onClick={() => handleFunctionClick('Dexes')}
              >
                Dex
              </div>
              <div
                className={`function-list-item lending ${selectedFunction.includes('Lending') ? 'lendingActive' : ''}`}
                onClick={() => handleFunctionClick('Lending')}
              >
                Lending
              </div>
              <div
                className={`function-list-item liquidity ${
                  selectedFunction.includes('Liquidity') ? 'liquidityActive' : ''
                }`}
                onClick={() => handleFunctionClick('Liquidity')}
              >
                Liquidity
              </div>
              <div
                className={`function-list-item staking ${selectedFunction.includes('Staking') ? 'stakingActive' : ''}`}
                onClick={() => handleFunctionClick('Staking')}
              >
                Staking
              </div>
              <div
                className={`function-list-item yield ${selectedFunction.includes('Yield') ? 'yieldActive' : ''}`}
                onClick={() => handleFunctionClick('Yield')}
              >
                Yield
              </div>
            </div>
          </div>
        </PageLeftItem>
        {/* <PageLeftItem>
          <LeftItemTitle>Medal Quest</LeftItemTitle>
          <div className="page-medal-list">
            <div
              className={`medal-list-item ${selectedMedalMenu === 'Both' ? 'active' : ''}`}
              onClick={() => handleMedalMenuClick('Both')}
            >
              Both
            </div>
            <div
              className={`medal-list-item ${selectedMedalMenu === 'Yes' ? 'active' : ''}`}
              onClick={() => handleMedalMenuClick('Yes')}
            >
              Yes
            </div>
            <div
              className={`medal-list-item ${selectedMedalMenu === 'No' ? 'active' : ''}`}
              onClick={() => handleMedalMenuClick('No')}
            >
              No
            </div>
          </div>
        </PageLeftItem> */}
      </NewHomePageLeft>

      <NewHomePageRight>
        <Search>
          <input type="text" placeholder="search..." value={searchValue} onChange={handleSearch} autoFocus />
          {SearchIcon}
        </Search>
        <div className="page-right-content">
          <div className="page-right-tab">
            <div
              className={`right-tab-item ${selectedTab === 'TBD' ? 'active' : ''}`}
              onClick={() => handleTabClick('TBD')}
            >
              Token-TBD🔥
            </div>
            <div
              className={`right-tab-item ${selectedTab === 'token' ? 'active' : ''}`}
              onClick={() => handleTabClick('token')}
            >
              Native token
            </div>
          </div>
          <div className="page-right-switch">
            <div
              className={`right-switch-item ${selectedView === 'grid' ? 'active' : ''}`}
              onClick={() => handlesetSelectedView('grid')}
            >
              {gridIcon}
            </div>
            <div
              className={`right-switch-item ${selectedView === 'table' ? 'active' : ''}`}
              onClick={() => handlesetSelectedView('table')}
            >
              {tableIcon}
            </div>
          </div>
        </div>
        {selectedTab == 'TBD' ? (
          <>
            {selectedView === 'grid' ? (
              <div className="tbd-content">
                {sortedDapps
                  .filter((dapp) => dapp.TBD_TOKEN === 'Y')
                  .map((dapp, index) => {
                    const href = dapp.dappRoute || '/';
                    return (
                      <Link className="tbd-content-item" key={index} href={href}>
                        <div className="content-item-title">
                          <div className="item-title-icon">
                            <img src={dapp.logo} alt="" />
                          </div>
                          <div className="item-title-text">
                            <h1>{dapp.name}</h1>
                            <p>Token TBD🔥</p>
                            <div className="title-text-icon">
                              {dapp.on_chain_ids.map((chainId, index) => (
                                <img key={index} src={chains[chainId].icon} alt="" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="content-item-text">
                          <p>{dapp.description}</p>
                        </div>
                        <div className="content-item-tag">
                          {dapp.tags.map((tag, index) => (
                            <div className={`item-tag-item ${tag}`} key={index}>
                              {tag}
                            </div>
                          ))}
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : (
              <div className="tbd-table-content">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Native token</th>
                      <th>Network</th>
                      <th>Function</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedDapps
                      .filter((dapp) => dapp.TBD_TOKEN === 'Y')
                      .map((dapp, index) => (
                        <tr
                          key={index}
                          onClick={(e) => {
                            const href = dapp.dappRoute || '/';
                            router.push(href);
                          }}
                        >
                          <td>
                            <img src={dapp.logo} alt="" />
                            <h1> {dapp.name}</h1>
                          </td>
                          <td>TBD🔥</td>
                          <td>
                            <div className="title-text-icon">
                              {dapp.on_chain_ids.map((chainId, index) => (
                                <img
                                  key={index}
                                  src={chains[chainId].icon}
                                  alt=""
                                  style={{ width: '20px', height: '20px' }}
                                />
                              ))}
                            </div>
                          </td>
                          <td>
                            <div className="content-item-tag">
                              {dapp.tags.map((tag, index) => (
                                <div className={`item-tag-item ${tag}`} key={index}>
                                  {tag}
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : null}
        {selectedTab == 'token' ? (
          <>
            {selectedView === 'grid' ? (
              <div className="tbd-content">
                {sortedDapps
                  .filter((dapp) => dapp.TBD_TOKEN === 'N')
                  .map((dapp, index) => (
                    <Link className="tbd-content-item" key={index} href={dapp.dappRoute || '/'}>
                      <div className="content-item-title">
                        <div className="item-title-icon">
                          <img src={dapp.logo} alt="" />
                        </div>
                        <div className="item-title-text">
                          <h1 style={{ marginBottom: '12px' }}>{dapp.name}</h1>
                          {/* <p>Token TBD🔥</p> */}
                          <div className="title-text-icon">
                            {dapp.on_chain_ids.map((chainId, index) => (
                              <img key={index} src={chains[chainId].icon} alt="" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="content-item-text">
                        <p>{dapp.description}</p>
                      </div>
                      <div className="content-item-tag">
                        {dapp.tags.map((tag, index) => (
                          <div className={`item-tag-item ${tag}`} key={index}>
                            {tag}
                          </div>
                        ))}
                      </div>
                    </Link>
                  ))}
              </div>
            ) : (
              <div className="tbd-table-content">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      {/* <th>Native token</th> */}
                      <th>Network</th>
                      <th>Function</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedDapps
                      .filter((dapp) => dapp.TBD_TOKEN === 'N')
                      .map((dapp, index) => (
                        <tr
                          key={index}
                          onClick={(e) => {
                            const href = dapp.dappRoute || '/';
                            router.push(href);
                          }}
                        >
                          <td>
                            <img src={dapp.logo} alt="" />
                            <h1> {dapp.name}</h1>
                          </td>
                          {/* <td>TBD🔥</td> */}
                          <td>
                            <div className="title-text-icon">
                              {dapp.on_chain_ids.map((chainId, index) => (
                                <img
                                  key={index}
                                  src={chains[chainId].icon}
                                  alt=""
                                  style={{ width: '20px', height: '20px' }}
                                />
                              ))}
                            </div>
                          </td>
                          <td>
                            <div className="content-item-tag">
                              {dapp.tags.map((tag, index) => (
                                <div className={`item-tag-item ${tag}`} key={index}>
                                  {tag}
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : null}
      </NewHomePageRight>

      {/* <NewHomePageFooter>
        <div className="page-connect-item">
          <img src={docsIcon} alt="" />
          <p>Docs</p>
        </div>
        <div className="page-connect-item" style={{ marginRight: '24px' }}>
          <img src={teleIcon} alt="" />
        </div>
        <div className="page-connect-item">
          <img src={HelpIcon} alt="" />
          <p>Help & Feedback</p>
        </div>
      </NewHomePageFooter> */}
    </NewHomePage>
  );
};

NewHomePageContent.getLayout = useDefaultLayout;

export default NewHomePageContent;

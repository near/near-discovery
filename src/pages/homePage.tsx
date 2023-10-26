import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { menuData } from '@/data/menuData';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const NewHomePage: NextPageWithLayout = () => {
  const components = useBosComponents();

  const netWorkBg = 'https://ipfs.near.social/ipfs/bafkreib4gjasib7bgfxtjajhgapcxmc2fibrz47felojxdh7z4u5m7yix4';

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
    color: #979abe;
    width: 100%;
    height: 100vh;
    display: flex;
  `;

  const NewHomePageLeft = styled.div`
    width: 20%;
    height: 100%;
    position: relative;
    .home-page-connect {
      display: flex;
      position: absolute;
      bottom: -48px;
      left: 0;
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
    }
  `;

  const PageLeftItem = styled.div`
    /* background-image: url(${netWorkBg});
      background-repeat: no-repeat;
      background-size: cover; */
    margin-bottom: 45px;
    .page-netWork-list {
      display: flex;
      flex-wrap: wrap;
      .netWork-list-item {
        margin-right: 12px;
        margin-bottom: 12px;
        flex-basis: auto;
        border: 1px solid #5e617e;
        border-radius: 8px;
        padding: 4px 8px 4px 4px;
        color: #ffffff;
        display: flex;
        cursor: pointer;
        .list-item-icon {
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          align-items: center;
          border-radius: 10px;
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
      .Dex {
        background: linear-gradient(0deg, rgba(165, 95, 255, 0.3), rgba(165, 95, 255, 0.3));
        border: 1px solid #a55fff;
      }
      .Lending {
        background: linear-gradient(0deg, rgba(255, 191, 25, 0.3), rgba(255, 191, 25, 0.3));
        border: 1px solid rgba(255, 191, 25, 1);
      }
      .Liquidity {
        background: linear-gradient(0deg, rgba(33, 148, 255, 0.3), rgba(33, 148, 255, 0.3));
        border: 1px solid rgba(33, 148, 255, 1);
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
    width: 80%;
    .page-right-content {
      width: 80%;
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
  `;
  const Search = styled.div`
    margin-bottom: 26px;
    input {
      width: 80%;
      height: 48px;
      line-height: 48px;
      background: transparent;
      border: 1px #373a53 solid;
      padding-right: 24px;
      border-radius: 12px;
      padding: 16px;
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
  const [selectedMenu, setSelectedMenu] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('selectedMenu') || '';
    }
    return '';
  });

  const handleMenuClick = (path: string) => {
    setSelectedMenu(path);
  };

  const [selectedMedalMenu, setSelectedMedalMenu] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('selectedMedalMenu') || '';
    }
    return '';
  });

  const handleMedalMenuClick = (path: string) => {
    setSelectedMedalMenu(path);
  };

  const [selectedTab, setSelectedTab] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('selectedTab') || '';
    }
    return '';
  });

  const handleTabClick = (path: string) => {
    setSelectedTab(path);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('selectedMenu', selectedMenu);
      window.localStorage.setItem('selectedMedalMenu', selectedMedalMenu);
      window.localStorage.setItem('selectedTab', selectedTab);
    }
  }, [selectedMenu, selectedMedalMenu, selectedTab]);

  return (
    <NewHomePage>
      <NewHomePageLeft>
        <PageLeftItem>
          <LeftItemTitle>Network</LeftItemTitle>
          <div className="page-netWork-list">
            {menuData[2]?.children?.map((child, index) => (
              <div
                className={`netWork-list-item ${selectedMenu === child.path ? 'active' : ''}`}
                key={index}
                onClick={() => child.path && handleMenuClick(child.path)}
              >
                <div className="list-item-icon" style={{ backgroundColor: child.bgColor }}>
                  <img src={child.icon} alt="" />
                </div>
                {child.title}
              </div>
            ))}
          </div>
        </PageLeftItem>
        <PageLeftItem>
          <LeftItemTitle>Function</LeftItemTitle>
          <div className="page-function-list">
            <div className="function-list-item Dex">Dex</div>
            <div className="function-list-item Lending">Lending</div>
            <div className="function-list-item Liquidity">Liquidity</div>
            <div className="function-list-item">Staking</div>
          </div>
        </PageLeftItem>
        <PageLeftItem>
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
        </PageLeftItem>

        <div className="home-page-connect">
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
        </div>
      </NewHomePageLeft>
      <NewHomePageRight>
        <Search>
          <input type="text" />
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
            <div className="right-switch-item active">{gridIcon}</div>
            <div className="right-switch-item">{tableIcon}</div>
          </div>
        </div>
        {selectedTab == 'TBD' ? (
          <>
            <p>Token-TBD🔥</p>
          </>
        ) : null}
        {selectedTab == 'token' ? (
          <>
            <p>Native token</p>
          </>
        ) : null}
      </NewHomePageRight>
    </NewHomePage>
  );
};

NewHomePage.getLayout = useDefaultLayout;

export default NewHomePage;

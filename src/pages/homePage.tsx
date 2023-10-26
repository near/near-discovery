import styled from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { menuData } from '@/data/menuData';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import { useState } from 'react';

const NewHomePage: NextPageWithLayout = () => {
  const components = useBosComponents();

  const netWorkBg = 'https://ipfs.near.social/ipfs/bafkreib4gjasib7bgfxtjajhgapcxmc2fibrz47felojxdh7z4u5m7yix4';

  const docsIcon = 'https://ipfs.near.social/ipfs/bafkreiae3ujempvwh2mowlpqoitmz7ohcawkrx2u26cezeit443ni475oe';
  const teleIcon = 'https://ipfs.near.social/ipfs/bafkreihsnpk5thlrjlk3jakd6vximvtdcqknsikhdu7fgpkw2jusmjptgq';
  const HelpIcon = 'https://ipfs.near.social/ipfs/bafkreighqgtfiphvdd32lg3io3k447ola32na3ovjppdrhtvfurccbekke';

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
  const NewHomePageRight = styled.div``;

  const [selectedMenu, setSelectedMenu] = useState('');

  const handleMenuClick = (path: string) => {
    setSelectedMenu(path);
  };

  const [selectedMedalMenu, setSelectedMedalMenu] = useState('');

  const handleMedalMenuClick = (path: string) => {
    setSelectedMedalMenu(path);
  };

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
      <NewHomePageRight></NewHomePageRight>
    </NewHomePage>
  );
};

NewHomePage.getLayout = useDefaultLayout;

export default NewHomePage;

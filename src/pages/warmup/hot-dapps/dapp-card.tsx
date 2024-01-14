import { styled } from 'styled-components';

import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const DappCardWrapper = styled.a`
  padding: 20px 8px;
  display: flex;
  align-items: center;
  text-decoration: none;

  gap: 6px;
  width: 240px;
  height: 108px;
  border-radius: 20px;

  .icon-wrapper {
    width: 72px;
    height: 72px;
    border-radius: 20px;
  }

  .dapp-detail {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .dapp-name {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: #ffffff;
    /* white-space: nowrap; */
  }

  .dapp-creator {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: left;
    color: #979abe;
  }
  @media (max-width: 900px) {
    width: 165px;
    height: 150px;
    display: inline-block;
    text-align: center;
    .icon-wrapper {
      width: 50px;
      height: 50px;
    }
    .dapp-name {
      text-align: center;
      font-size: 16px;
    }
    .dapp-creator {
      font-size: 12px;
      text-align: center;
    }
  }
`;

const DappCard: NextPageWithLayout = (props) => {
  const { background, dappName, creator, widgetSrc, ipfs_cid } = props;
  return (
    <DappCardWrapper
      href={widgetSrc}
      style={{
        background: background,
      }}
    >
      {ipfs_cid ? (
        <img src={`https://ipfs.near.social/ipfs/${ipfs_cid}`} className="icon-wrapper"></img>
      ) : (
        <div className="icon-wrapper"></div>
      )}

      <div className="dapp-detail">
        <div className="dapp-name">{dappName}</div>

        <div className="dapp-creator">@{creator}</div>
      </div>
    </DappCardWrapper>
  );
};

DappCard.getLayout = useDefaultLayout;

export default DappCard;

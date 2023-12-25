import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

import SearchConfig from './config';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  z-index: 10;
  .input-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    gap: 32px;

    .input-search-wrapper {
      position: relative;
      width: 100%;
      .clear-icon {
        display: none;
      }
    }

    .search-wrapper {
      position: absolute;
      right: 12px;
      top: 12px;
    }

    .input-records {
      background: none;
      color: #ebf479;
      border: 1px solid rgba(55, 58, 83, 1);
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
      text-align: left;
      outline: none;
      font-size: 20px;
      font-weight: 500;
      line-height: 24px;
      padding: 14px;
      width: 100%;
      border-radius: 8px;
      ::placeholder {
        color: rgba(235, 244, 121, 0.3);
      }
    }

    .input-button {
      width: 169px;
      height: 54px;
      border-radius: 16px;
      background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
      text-align: center;
      color: #02051e;
      flex-shrink: 0;
      cursor: pointer;
      vertical-align: middle;
      padding-top: 20px;
      padding-bottom: 20px;

      font-size: 20px;
      font-weight: 700;
      line-height: 15px;
      letter-spacing: 0em;
      text-align: center;

      :hover {
        text-decoration: none;
      }
    }
  }

  .search-hint-list {
    position: absolute;
    top: 68px;
    z-index: 999;
    width: calc(100% - 200px);
    border-radius: 16px;
    background: #373a53;

    padding: 20px 0px;

    .search-hint-item {
      padding: 20px 32px;
      align-items: center;
      color: white;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      .highlight {
        color: #ebf479;
      }
      .dex-name {
        display: flex;
        align-items: center;
        gap: 8px;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: left;
        .dex-name-icon {
          width: 26px;
          height: 26px;
          border-radius: 8px;
        }
      }
    }
    .search-hint-item:hover {
      background: rgba(24, 26, 39, 0.3);
    }
  }

  @media (max-width: 900px) {
    height: 65vh;
    .input-wrapper {
      .input-records {
        border-bottom: 1px solid #e9f456;
        border-top: none;
        border-left: none;
        border-right: none;
        border-radius: 0;
        padding: 14px 36px 14px 14px;
      }
      .input-button {
        width: 162px;
        height: 50px;
        position: fixed;
        bottom: 30px;
        right: 20px;
        line-height: 14px;
        font-size: 16px;
      }
      .input-search-wrapper {
        position: relative;
        width: 100%;
        .clear-icon {
          display: block;
          cursor: pointer;
          position: absolute;
          top: 12px;
          right: 0;
          width: 26px;
          height: 26px;
          line-height: 26px;
          text-align: center;
          align-items: center;
          border-radius: 8px;
          background: rgba(55, 58, 83, 0.5);
          img {
            width: 10px;
            height: 10px;
          }
        }
      }
    }
    .search-hint-list {
      width: 100%;
      overflow: auto;
      height: 45vh;
      background: rgba(30, 32, 47, 1);
      border-radius: 0;
      .search-hint-item {
        padding: 0;
        margin-bottom: 30px;
        display: grid;
      }
    }
  }
`;

const closeIcon = 'https://ipfs.near.social/ipfs/bafkreiay565opvpvtxexcxkfo7cif3ecn4znoarnutcvhjggiczjpuvbbq';

const iconsMap = {
  'ZkEvm-bridge': (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="26" height="26" rx="8" transform="matrix(1 0 0 -1 0 26)" fill="url(#paint0_linear_0_141)" />
      <path
        d="M8.47059 8.5V6.82609L7.80227 6.41856C7.48913 6.22761 7.0966 6.2234 6.77944 6.40759L4.4978 7.73264C4.18964 7.91161 4 8.24104 4 8.5974V11.3067C4 11.6443 4.17038 11.9591 4.45305 12.1438L6.77804 13.6628C7.09445 13.8695 7.50037 13.8802 7.8272 13.6904L10.0904 12.3761C10.3986 12.1971 10.5882 11.8677 10.5882 11.5113V6.45334C10.5882 6.09264 10.7825 5.75989 11.0966 5.58255L12.184 4.96859C12.5053 4.78718 12.9004 4.79744 13.2118 4.99527L14.1244 5.57495C14.4133 5.75842 14.5882 6.07686 14.5882 6.41906V7.47225C14.5882 7.81445 14.4133 8.13288 14.1244 8.31636L13.187 8.91181C12.8888 9.10123 12.5127 9.11924 12.1978 8.9592L11.2941 8.5V10.1739L12.221 10.6449C12.5233 10.7985 12.8829 10.7885 13.1762 10.6182L15.5022 9.26736C15.8104 9.08839 16 8.75896 16 8.4026V5.4887C16 5.13234 15.8104 4.80291 15.5022 4.62395L13.1912 3.28185C12.8898 3.10679 12.5189 3.10133 12.2125 3.26744L9.69994 4.62931C9.37738 4.80414 9.17647 5.14157 9.17647 5.50847V10.5809C9.17647 10.9231 9.00149 11.2416 8.71264 11.4251L7.80004 12.0047C7.48859 12.2026 7.0935 12.2128 6.77221 12.0314L5.68481 11.4175C5.37072 11.2401 5.17647 10.9074 5.17647 10.5467V9.56203C5.17647 9.20133 5.37072 8.86859 5.68481 8.69124L6.78299 8.0712C7.09857 7.89302 7.48585 7.89952 7.79527 8.0882L8.47059 8.5Z"
        fill="white"
      />
      <path d="M18 19L14 16.6244L18 10V19Z" fill="white" />
      <path d="M18 23L14 17L18 19.5082V23Z" fill="white" />
      <path d="M18 19L22 16.6244L18 10V19Z" fill="white" />
      <path d="M18 23L22 17L18 19.5082V23Z" fill="white" />
      <path d="M7 15C7 19 11.5 21 14 19.6947" stroke="white" stroke-width="1.5" />
      <defs>
        <linearGradient id="paint0_linear_0_141" x1="13" y1="0" x2="13" y2="26" gradientUnits="userSpaceOnUse">
          <stop stop-color="#982ECC" />
          <stop offset="1" stop-color="#7C3FE4" />
        </linearGradient>
      </defs>
    </svg>
  ),

  'zkEVM-bridge': (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dex-name-icon"
    >
      <rect width="26" height="26" rx="8" transform="matrix(1 0 0 -1 0 26)" fill="url(#paint0_linear_0_141)" />
      <path
        d="M8.47059 8.5V6.82609L7.80227 6.41856C7.48913 6.22761 7.0966 6.2234 6.77944 6.40759L4.4978 7.73264C4.18964 7.91161 4 8.24104 4 8.5974V11.3067C4 11.6443 4.17038 11.9591 4.45305 12.1438L6.77804 13.6628C7.09445 13.8695 7.50037 13.8802 7.8272 13.6904L10.0904 12.3761C10.3986 12.1971 10.5882 11.8677 10.5882 11.5113V6.45334C10.5882 6.09264 10.7825 5.75989 11.0966 5.58255L12.184 4.96859C12.5053 4.78718 12.9004 4.79744 13.2118 4.99527L14.1244 5.57495C14.4133 5.75842 14.5882 6.07686 14.5882 6.41906V7.47225C14.5882 7.81445 14.4133 8.13288 14.1244 8.31636L13.187 8.91181C12.8888 9.10123 12.5127 9.11924 12.1978 8.9592L11.2941 8.5V10.1739L12.221 10.6449C12.5233 10.7985 12.8829 10.7885 13.1762 10.6182L15.5022 9.26736C15.8104 9.08839 16 8.75896 16 8.4026V5.4887C16 5.13234 15.8104 4.80291 15.5022 4.62395L13.1912 3.28185C12.8898 3.10679 12.5189 3.10133 12.2125 3.26744L9.69994 4.62931C9.37738 4.80414 9.17647 5.14157 9.17647 5.50847V10.5809C9.17647 10.9231 9.00149 11.2416 8.71264 11.4251L7.80004 12.0047C7.48859 12.2026 7.0935 12.2128 6.77221 12.0314L5.68481 11.4175C5.37072 11.2401 5.17647 10.9074 5.17647 10.5467V9.56203C5.17647 9.20133 5.37072 8.86859 5.68481 8.69124L6.78299 8.0712C7.09857 7.89302 7.48585 7.89952 7.79527 8.0882L8.47059 8.5Z"
        fill="white"
      />
      <path d="M18 19L14 16.6244L18 10V19Z" fill="white" />
      <path d="M18 23L14 17L18 19.5082V23Z" fill="white" />
      <path d="M18 19L22 16.6244L18 10V19Z" fill="white" />
      <path d="M18 23L22 17L18 19.5082V23Z" fill="white" />
      <path d="M7 15C7 19 11.5 21 14 19.6947" stroke="white" stroke-width="1.5" />
      <defs>
        <linearGradient id="paint0_linear_0_141" x1="13" y1="0" x2="13" y2="26" gradientUnits="userSpaceOnUse">
          <stop stop-color="#982ECC" />
          <stop offset="1" stop-color="#7C3FE4" />
        </linearGradient>
      </defs>
    </svg>
  ),

  'native bridge': (
    <img
      className="dex-name-icon"
      src="https://ipfs.near.social/ipfs/bafkreigu2kdqzug45li74xcdhokazx7gv2yopml6x5bwrnjrkx2qsjrsni"
    />
  ),

  QuickSwap: (
    <img
      className="dex-name-icon"
      src="https://ipfs.near.social/ipfs/bafkreien6yavqvx5ots2i26ooakiwux77osuzz4fc6qxexvvd7dsoc6274"
    />
  ),
  Balancer: (
    <img
      className="dex-name-icon"
      src="https://ipfs.near.social/ipfs/bafkreihimomheiwsinao75pw5zxrt36i77fyq72jmpg4irubqjlk6txb6q"
    />
  ),
  'Pancake Swap': (
    <img
      className="dex-name-icon"
      src="https://repository-images.githubusercontent.com/440462673/6872d684-f7ed-463c-9a5c-76542eddbcc4"
    />
  ),

  '0vix': (
    <img
      className="dex-name-icon"
      src="https://ipfs.near.social/ipfs/bafkreigyodedyhiqmstq3g5edcqw25yyari4y3rcbsnqtxldb2zb2vpah4"
    />
  ),
  Gamma: (
    <img
      className="dex-name-icon"
      src="https://ipfs.near.social/ipfs/bafkreial4i3eb5uuxkhecn7nwos76km3qvb7jzxmups57rkxizr5i7dyaa"
    />
  ),
};

const InputSearch: NextPageWithLayout = () => {
  const [state, setState] = useState({
    text: '',
    selectClose: false,
    dexName: '',
    assetId: '',
  });
  const [hintList, setHintList] = useState<any[]>([]);
  let link = '';
  const onSaveParams = (text: string) => {
    const arr = text.split(/\s+/);

    const isBridge = arr[0].toLowerCase() === 'bridge';

    const isSwap = arr[0].toLowerCase() === 'swap';

    if (isBridge) {
      const [action_type, symbol, from, chain] = arr;
      localStorage.setItem(
        'zk-evm-bridge-params',
        JSON.stringify({
          symbol,
          chain,
        }),
      );
    }

    if (isSwap) {
      const [action_type, amount, symbol, on, dexName] = arr;
      localStorage.setItem(
        'zk-evm-swap-params',
        JSON.stringify({
          amount,
          symbol,
          dexName: state.dexName || dexName,
          assetId: state.assetId || (hintList.length > 0 ? hintList[0].address : null),
        }),
      );
    }
  };
  const parseString = hintList?.length === 1 ? hintList[0]?.full : state.text;

  // if (state?.hintList?.length === 1) {
  //   onSaveParams(state.hintList[0].full);
  // }

  const arr = parseString && parseString.split(/\s+/);

  const isBridge = arr && arr[0].toLowerCase() === 'bridge';

  const isSwap = arr && arr[0].toLowerCase() === 'swap';

  const isBorrow = arr && arr[0].toLowerCase() === 'borrow';

  const isRepay = arr && arr[0].toLowerCase() === 'repay';

  const isSupply = arr && arr[0].toLowerCase() === 'supply';

  const isWithdraw = arr && arr[0].toLowerCase() === 'withdraw';

  const isDepositGamma = arr && arr[0].toLowerCase() === 'deposit';

  const isWithdrawGamma = isWithdraw && arr?.[2] && arr?.[2]?.toLowerCase() === 'gamma';

  if (isBridge && (!!state.selectClose || hintList?.length === 1)) {
    link = '/guessme.near/widget/ZKEVMSwap.zkevm-bridge';
  }
  if (isSwap && (!!state.selectClose || hintList?.length === 1)) {
    link = '/guessme.near/widget/ZKEVMSwap.zkevm-swap';
  }

  if (isDepositGamma) {
    link = '/guessme.near/widget/ZKEVM.GAMMA?tab=deposit';
  }

  if (isWithdrawGamma) {
    link = '/guessme.near/widget/ZKEVM.GAMMA?tab=withdraw';
  }

  if ((isRepay || isBorrow) && (!!state.selectClose || hintList?.length === 1)) {
    link = `/bluebiu.near/widget/0vix.Lending?tab=borrow`;
  }

  if ((isSupply || (isWithdraw && !isWithdrawGamma)) && (!!state.selectClose || hintList?.length === 1)) {
    link = '/bluebiu.near/widget/0vix.Lending?tab=supply';
  }

  return (
    <Wrapper>
      <div className="input-wrapper">
        <div className="input-search-wrapper">
          <input
            className="input-records"
            placeholder="e.g. Swap 100 USDC"
            value={state.text}
            onChange={(e) => {
              setState({
                ...state,
                text: e.target.value,
                selectClose: false,
              });
            }}
          />

          {state.text && (
            <div
              className="clear-icon"
              onClick={() => {
                setState({
                  ...state,
                  text: '',
                });
              }}
            >
              <img src={closeIcon} alt="" />
            </div>
          )}

          <div className="search-wrapper">{/* Assuming searchIcon is defined */}</div>
        </div>

        {!!link && (
          <a className="input-button" href={link}>
            Execute
          </a>
        )}
        {!link && (
          <div
            className="input-button"
            style={{
              opacity: 0.3,
            }}
          >
            Execute
          </div>
        )}
      </div>

      <SearchConfig
        onLoad={(newHintList: any) => {
          if (JSON.stringify(newHintList) !== JSON.stringify(hintList)) {
            setHintList(newHintList);
          }
        }}
        search={state.text}
      />

      {!!state.text && hintList.length > 0 && !state.selectClose && (
        <div className="search-hint-list">
          {hintList.slice(0, 8).map((item) => {
            if (!item.matched) return <div key={item.full + 'full'}></div>;
            return (
              <div
                className="search-hint-item"
                key={item.full}
                onClick={() => {
                  setState({
                    text: item.full,
                    dexName: item.dappName,
                    selectClose: true,
                    assetId: item.address,
                  });
                  setHintList([]);
                  onSaveParams(item.full);
                }}
              >
                <div className="search-hint-content">
                  <span className="highlight">{item.highlight}</span>
                  {item.left}
                </div>
                <div className="dex-name">
                  {item.dappName && iconsMap[item.dappName as keyof typeof iconsMap]}
                  {item.dappName}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Wrapper>
  );
};

InputSearch.getLayout = useDefaultLayout;

export default InputSearch;

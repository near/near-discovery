import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { ethers } from 'ethers';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import type { NextPageWithLayout } from '@/utils/types';

const arrow = (
  <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L4 4L1 7" stroke="#979ABE" strokeLinecap="round" />
  </svg>
);

const narrowUrl = 'https://ipfs.near.social/ipfs/bafkreien4qagdjuudb6yj53wutsj4f6zfodrgv4ztftzjgkvcdtjnjk564';

const checkMark = 'https://ipfs.near.social/ipfs/bafkreig7b3k2jhkk6znb56pdsaj2f4mzadbxdac37lypsbdgwkj2obxu4y';

interface SelectBgProps {
  bgColor: string;
}
const SelectBg: React.FC<SelectBgProps> = ({ bgColor }) => (
  <svg width="720" height="241" viewBox="0 0 720 241" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.5" filter="url(#filter0_f_510_1870)">
      <ellipse cx="360" cy="120.5" rx="280" ry="40.5" fill={bgColor} />
    </g>
    <defs>
      <filter
        id="filter0_f_510_1870"
        x="0"
        y="0"
        width="720"
        height="241"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="40" result="effect1_foregroundBlur_510_1870" />
      </filter>
    </defs>
  </svg>
);

const Container = styled.div`
  margin: 0 8%;
  color: #ffffff;
  position: relative;
  .top-login-select {
    margin-right: 16px;
    background: rgba(21, 22, 23, 1);
    border-radius: 12px;
    padding: 4px;
    display: flex;
    z-index: 2;
    width: fit-content;
    cursor: pointer;
    position: relative;

    .select-item-wrapper {
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }
    .selsect-item-img {
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border-radius: 8px;
      margin-right: 8px;
    }
    .selsect-item-text {
      padding-top: 16px;
      margin-right: 10px;
      p {
        font-size: 16px;
        font-weight: 700;
        color: #ffffff;
      }
    }
    .selsect-item-icon {
      background: linear-gradient(0deg, rgba(48, 49, 66, 0.5), rgba(48, 49, 66, 0.5));
      border: 1px solid rgba(55, 58, 83, 1);
      border-radius: 6px;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 16px;
    }
    .login-select-popup {
      position: absolute;
      top: 60px;
      left: 0;
      background: #303142;
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
      border-radius: 12px;
      padding: 12px;
      width: 249px;
      .select-popups-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        border-radius: 8px;
        .flex-grow {
          flex-grow: 1;
        }
        .popup-item-img {
          width: 32px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          border-radius: 8px;
          margin-right: 8px;
        }
        .popups-item-text {
          font-size: 14px;
          font-weight: 400;
          color: #fff;
        }
      }
      .select-popups-item:hover {
        background: #2a2a3a;
      }
      .selected {
        background: #2a2a3a;
      }
    }
  }
  .content-page {
    z-index: 1;
    width: 100%;
    position: absolute;
  }
  .select-bg-icon {
    z-index: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    .select-bg-content {
      width: 560px;
      height: 80px;
      position: relative;
      img {
        width: 124px;
        opacity: 0.1;
        position: absolute;
        left: 7%;
      }
      .select-bg {
        position: absolute;
        right: 20%;
        top: -60%;
      }
    }
  }
`;
const BreadCrumbs = styled.div`
  color: #979abe;
  font-size: 14px;
  margin-bottom: 32px;
  a {
    text-decoration: none;
    color: #979abe;
    display: inline-block;
    cursor: pointer;
  }
  svg {
    margin: 0 8px;
  }
  span {
    color: #ffffff;
  }
`;
const popupsData: {
  [key: string]: {
    title: string;
    path: string;
    icon: string;
    bgColor: string;
    selectBgColor: string;
    chainId: number;
    rpcUrls: string[];
  };
} = {
  arbitrum: {
    title: 'Arbitrum',
    path: 'arbitrum',
    icon: 'https://ipfs.near.social/ipfs/bafkreicxdjysr5urjg2hfpfts2b7ptb6q3fge7ncuhzw4puqybi4dwlbdu',
    bgColor: '#3564AB',
    selectBgColor: '#3564AB',
    chainId: 42161,
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
  },
  avalanche: {
    title: 'Avalanche',
    path: 'avalanche',
    icon: 'https://ipfs.near.social/ipfs/bafkreifdm3vpor4xyh2y7ibcr4dsy262qgesegy7slrfjbo4imohqd4sfq',
    bgColor: '#AF1616',
    selectBgColor: '#AF1616',
    chainId: 43114,
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  },
  base: {
    title: 'BASE',
    path: 'base',
    icon: 'https://ipfs.near.social/ipfs/bafkreientyvw2l6v2jvtcq5pptg5xftj2dyobnk3yaykbu5mb6tpomzc3q',
    bgColor: '#0038FF',
    selectBgColor: '#0038FF',
    chainId: 8453,
    rpcUrls: ['https://developer-access-mainnet.base.org'],
  },
  bsc: {
    title: 'BSC',
    path: 'bsc',
    icon: 'https://ipfs.near.social/ipfs/bafkreiczurnr4ai5epzfovu4btugbrfsoc57d42wnz22kdjmogz3ewfgcm',
    bgColor: '#FFBF19',
    selectBgColor: '#FFBF19',
    chainId: 56,
    rpcUrls: ['https://binance.llamarpc.com'],
  },
  gnosis: {
    title: 'Gnosis',
    path: 'gnosis',
    icon: 'https://ipfs.near.social/ipfs/bafkreiazsyndhevopspbjue3ztz5r5mypuzpa5gjragm3hdg6ey33rfheu',
    bgColor: '#04795B',
    selectBgColor: '#04795B',
    chainId: 100,
    rpcUrls: ['https://rpc.ankr.com/gnosis'],
  },
  linea: {
    title: 'Linea',
    path: 'linea',
    icon: 'https://ipfs.near.social/ipfs/bafkreiek2q3da5dpzt7jlvdp5y4b7xh2tsdb5syh75b3amfwhb7x6vi7oa',
    bgColor: '#131313',
    selectBgColor: '#35bde3',
    chainId: 59144,
    rpcUrls: ['https://linea.blockpi.network/v1/rpc/public'],
  },
  mantle: {
    title: 'Mantle',
    path: 'mantle',
    icon: 'https://ipfs.near.social/ipfs/bafkreiboehkc3sfdmzzsv7abvhssavcicom3mjjm4wje3zgm3nzg5w4kbu',
    bgColor: '#000000',
    selectBgColor: 'rgb(0,255,224)',
    chainId: 5000,
    rpcUrls: ['https://mantle-mainnet.public.blastapi.io'],
  },
  metis: {
    title: 'Metis',
    path: 'metis',
    icon: 'https://ipfs.near.social/ipfs/bafkreiaekamkcbf7ixg3w6wl25zd4orgkmshxkz36vncpomenfu3ryymty',
    bgColor: '#000000',
    selectBgColor: '#00dacc',
    chainId: 1088,
    rpcUrls: ['https://andromeda.metis.io/?owner=1088'],
  },
  optimism: {
    title: 'Optimism',
    path: 'optimism',
    icon: 'https://ipfs.near.social/ipfs/bafkreihejurzfytybrvjy2b5vie5eppb4erhaimhtv25koseml3vhv3lse',
    bgColor: '#CA0C0C',
    selectBgColor: '#CA0C0C',
    chainId: 10,
    rpcUrls: ['https://rpc.ankr.com/optimism'],
  },
  'polygon-zkevm': {
    title: 'Polygon zkEVM',
    path: 'polygon-zkevm',
    icon: 'https://ipfs.near.social/ipfs/bafkreielam3balduseacp3gulszhxiwzf7hcyoaau6goxdwgsavqfou5hi',
    bgColor: '#A55FFF',
    selectBgColor: '#A55FFF',
    chainId: 1101,
    rpcUrls: ['https://zkevm-rpc.com'],
  },
  polygon: {
    title: 'Polygon',
    path: 'polygon',
    icon: 'https://ipfs.near.social/ipfs/bafkreicq7b2rylubg6pli3mgxjdpml4rdju2upxq25a6nd35xepiqakgfy',
    bgColor: '#5C28D8',
    selectBgColor: '#5C28D8',
    chainId: 137,
    rpcUrls: ['https://polygon.llamarpc.com'],
  },
  zkSync: {
    title: 'zkSync',
    path: 'zkSync',
    icon: 'https://ipfs.near.social/ipfs/bafkreicwo7gbj23ay4r6w5wwdwllyaxd6eo4w2cngr64sp26z5wmke7xju',
    bgColor: '#FFFFFF',
    selectBgColor: '#3b6bdc',
    chainId: 324,
    rpcUrls: ['https://mainnet.era.zksync.io'],
  },
};
const AllInOne: NextPageWithLayout = () => {
  const router = useRouter();
  const chain = (router.query.chain as string) || 'arbitrum';
  const currentChain = popupsData[chain] || popupsData['arbitrum'];
  const components = useBosComponents();
  const [isSelectItemClicked, setIsSelectItemClicked] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const handleSelectItemClick = () => {
    setIsSelectItemClicked(!isSelectItemClicked);
  };
  const handleItemClick = (path: string) => {
    const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
    const currentChain = popupsData[path];
    etherProvider
      .send('wallet_switchEthereumChain', [{ chainId: `0x${Number(currentChain.chainId).toString(16)}` }])
      .then(() => {
        router.push(`/all-in-one/${currentChain.title.toLowerCase()}`);
      })
      .catch((err) => {
        const chain = {
          chainId: `0x${Number(currentChain.chainId).toString(16)}`,
          chainName: currentChain.title,
          rpcUrls: [currentChain.rpcUrls],
        };

        etherProvider.send('wallet_addEthereumChain', [chain]).then((res) => {
          router.push(`/all-in-one/${currentChain.title.toLowerCase()}`);
        });
      });

    setIsSelectItemClicked(false);
  };

  return (
    <Container key={chain}>
      <BreadCrumbs>
        <Link href="/">Home</Link>
        {arrow}
        <span>{currentChain.title} ShortCut</span>
      </BreadCrumbs>

      <div className="top-login-select">
        <div className="select-item-wrapper" onClick={handleSelectItemClick}>
          <div
            className="selsect-item-img"
            style={{
              backgroundColor: currentChain.bgColor,
            }}
          >
            <img src={currentChain.icon} alt="" />
          </div>
          <div className="selsect-item-text">
            <p> {currentChain.title}</p>
          </div>
          <div className="selsect-item-icon">
            <img
              style={{ transform: isSelectItemClicked ? 'rotate(180deg)' : 'rotate(0deg)' }}
              src={narrowUrl}
              alt=""
            />
          </div>
        </div>

        {isSelectItemClicked && (
          <div className="login-select-popup">
            {Object.values(popupsData).map((item) => (
              <div
                className={`select-popups-item ${chain === item.path ? 'selected' : ''}`}
                key={item.path}
                onClick={() => handleItemClick(item.path)}
              >
                <div className="popup-item-img" style={{ backgroundColor: item.bgColor }}>
                  <img src={item.icon} alt="" />
                </div>
                <div className="popups-item-text">{item.title}</div>
                <div className="flex-grow"></div>
                {chain === item.path && (
                  <div className="check-mark">
                    <img src={checkMark} alt="check-mark" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="select-bg-icon">
        <div className="select-bg-content">
          <img src={currentChain.icon} alt="" />
          <div className="select-bg">
            <SelectBg bgColor={currentChain.selectBgColor} />
          </div>
        </div>
      </div>
      <div className="content-page">
        <ComponentWrapperPage
          src={(components as any)[chain]}
          meta={{ title: 'Connect with the NEAR community.', description: 'Become part of the NEAR community.' }}
        />
      </div>
    </Container>
  );
};

AllInOne.getLayout = useDefaultLayout;

export default AllInOne;

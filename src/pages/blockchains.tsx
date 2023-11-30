import { ethers } from 'ethers';
import Link from 'next/link';
import styled from 'styled-components';

import chains from '@/config/chains';
import { ethereum } from '@/config/tokens/ethereum';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const arrow = (
  <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L4 4L1 7" stroke="#979ABE" strokeLinecap="round" />
  </svg>
);
const blockchainsBg = 'https://ipfs.near.social/ipfs/bafkreic3dbmrzuihpcmtgjbxvc7ipyu7hvfvsrhlvfv4uwibwhedfh7vmi';
const diagonaltop = 'https://ipfs.near.social/ipfs/bafkreiewy27itzs3bq2et7bxmnv3dlt6rtwofiszkms3baroobjqq6wh5a';
const leftarrow = 'https://ipfs.near.social/ipfs/bafkreihvymef5y4q6a5lpnwea4fcygi4wrrb2tbzitswc3xnaufs6qnzjy';
const arrowBlock = 'https://ipfs.near.social/ipfs/bafkreihv4t6xu7bzjxeqdi7do4qdbncolgyhk3d4c53vbsu22xkv3hrrge';
const chainsconetentImg = 'https://ipfs.near.social/ipfs/bafkreifk3lg7hueyd54w4pqibjejewq6k37cbupfkbmrfb43hal2ofohfq';
const BlockchainsPage = styled.div`
  color: #ffffff;
  padding: 0 12% 80px 12%;
  position: relative;
`;

const BreadCrumbs = styled.div`
  color: #979abe;
  font-size: 14px;
  margin-bottom: -4%;
  margin-left: -4%;
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

const BlockchainsBanner = styled.div`
  width: 100%;
  height: 448px;
  position: relative;
  background-image: url(${blockchainsBg});
  background-repeat: no-repeat;
  background-size: 94%;
  background-position-x: 50%;
  background-position-y: 26%;
  display: flex;
  align-items: center;
  .blockchainsBanner-title {
    color: #ffe7e7;
    h1 {
      font-size: 42px;
      font-weight: 700;
    }
    p {
      font-size: 16px;
      font-weight: 400;
      margin-top: 12px;
      width: 50%;
    }
  }
`;

const BlockchainsConetent = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  .blockchains-conetent-item {
    width: 32%;
    flex-basis: calc(32% - 20px);
    margin-bottom: 30px;
    margin-right: 15px;
    margin-left: 15px;
    background: #21232a;
    border: 1px solid #21232a;
    border-radius: 20px;
    padding: 19px 12px 38px 12px;
    position: relative;
    @media (max-width:1250px) {
      flex-basis: calc(45% - 20px);
    }
    &:hover{
      border: 1px #ebf479 solid;
      .list-item-bottom{
        display: inline-block;
      }
    }
    a {
      color: #ffffff;
      text-decoration: none;
    }
    .content-item-title {
      display: flex;
      margin-bottom: 18px;
      .item-title-img {
        margin-right: 16px;
        img {
          width: 72px;
          height: 72px;
        }
      }
      .item-title-right {
        h1 {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
        }
        p {
          border: 1px solid #373a53;
          background: linear-gradient(0deg, rgba(55, 58, 83, 0.5), rgba(55, 58, 83, 0.5));
          color: #979abe;
          border-radius: 8px;
          padding: 6px 12px;
          font-weight: 500;
          cursor: pointer;
        }
      }
    }
    p {
      color: #979abe;
      font-size: 14px;
      font-weight: 300;
    }
    .body-paragraph {
      width: 100%;
      height: 85px;
      margin-bottom: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .minor-paragraph {
      margin-bottom: 6px;
    }
    h3 {
      font-weight: 400;
      font-size: 16px;
      margin-bottom: 20px;
    }
    h4 {
      font-size: 16px;
      color: #ebf479;
      a{
        color: #ebf479;
      }
      img {
        margin-left: 8px;
      }
    }
    .list-item-bottom {
      text-align: center;
      display: none;
      height: 28px;
      line-height: 28px;
      left: 0;
      border-radius: 0 0 20px 20px;
      background: #ebf479e5;
      position: absolute;
      bottom: 0;
      width: 100%;
      color: #000000;
      img {
        width: 16px;
        height: 16px;
        margin-left: 10px;
      }
      a {
        color: #000000;
      }
    }
  }
  .conetent-item-img {
    padding: 0;
    background-color: transparent;
    border: none;
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &:hover {
      border: none;
    }
  }
`;

const Footer = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: -36px;
  left: 0;
  display: flex;
  color: rgba(151, 154, 190, 1);
  font-size: 14px;
  font-weight: 400;
  padding: 0 10%;
  .footer-item {
    flex: 1;
    text-align: center;
  }
  .footer-center {
    img {
      margin-right: 32px;
    }
  }
`;

const BlockchainsColumn: NextPageWithLayout = () => {

  const addMetaMask = async ({ index, chainId, chainName, rpcUrls }: { index: number; chainId: number; chainName: string; rpcUrls: string[] }) => {

    const etherProvider = new ethers.providers.Web3Provider(window.ethereum);

    etherProvider
      .send('wallet_switchEthereumChain', [{ chainId: `0x${Number(chainId).toString(16)}` }])
      .catch((err) => {
        const chain = {
          chainId: `0x${Number(chainId).toString(16)}`,
          chainName: chainName,
          rpcUrls: rpcUrls,
        };

        if (err.code === 4902) {
          etherProvider.send('wallet_addEthereumChain', [chain]);
        }
      });
  }
  return (
    <BlockchainsPage>
      <BreadCrumbs>
        <Link href="/">Home</Link>
        {arrow}
        <span>L2 Blockchains</span>
      </BreadCrumbs>
      <BlockchainsBanner>
        <div className="blockchainsBanner-title">
          <h1>List of Layer 2 Blockchains</h1>
          <p>
            Discover 18 Layer 2 Blockchains across the most popular web3 ecosystems. Also explore related collections
            including Layer 1 Blockchains (L1s), Sidechains, Testnets.
          </p>
        </div>
      </BlockchainsBanner>

      <BlockchainsConetent>
        {Object.values(chains).map((child, index) => (
          <>
            <div className="blockchains-conetent-item" key={index}>
              <div className="content-item-title">
                <div className="item-title-img">
                  <img src={child.icon} alt="" />
                </div>
                <div className="item-title-right">
                  <h1>{child.chainName}</h1>
                  <p onClick={() => addMetaMask({ index, chainId: child.chainId, chainName: child.chainName,  rpcUrls: child.rpcUrls })}>
                    Add to MetaMask <img src={diagonaltop} alt="" />
                  </p>
                </div>
              </div>
              <p className="body-paragraph">
                Polygon zkEVM Beta is the leading ZK scaling solution that is equivalent to Ethereum Virtual Machine:
                The vast majority of existing smart contracts, developer tools and wallets work seamlessly.
              </p>
              <p className="minor-paragraph">Technology</p>
              <h3>ZK Rollup</h3>
              <p className="minor-paragraph">Native Token</p>
              <h3>TBD🔥</h3>
              <h4>
                <Link href="/chains-details">Learn more</Link>
                <img src={leftarrow} alt="" />
              </h4>
              {child.chainName === 'Polygon zkEVM' && (
                <div className="list-item-bottom">
                  <Link href="/warmup">
                    Deep Dive
                    <img src={arrowBlock} alt="" />
                  </Link>
                </div>
              )}
            </div>
            {index === 4 && (
              <div className="blockchains-conetent-item conetent-item-img">
                <img src={chainsconetentImg} alt="" />
              </div>
            )}
          </>
        ))}
      </BlockchainsConetent>
      <Footer>
        <div className="footer-item footer-left">
          Made with ❤️ by DapXDap team.
          <br /> Bulit on BOS & NEAR Protocol
        </div>
        <div className="footer-item footer-center">
          <div className="footer-center-img">
            <img
              src="https://ipfs.near.social/ipfs/bafkreic2ou5l3zhdefbhswd6jomuhzmvyu5oqpbom3d3vo3djoeywxmyay"
              alt=""
            />
            <img
              src="https://ipfs.near.social/ipfs/bafkreibaof45e2fwgaphbengfh5molv6dwjkcp4zrwkixyqm3mrc3x7jhm"
              alt=""
            />
            <img
              src="https://ipfs.near.social/ipfs/bafkreif3gh6hszingmncy6kg3en6xoumceepw4ys3dq3dbjd7rkn7zfb74"
              alt=""
            />
            <img
              src="https://ipfs.near.social/ipfs/bafkreifyzh5mqbh6z6utj7z4dp2eelhaa654mnt6mut4oxml3mw56fqoxm"
              alt=""
            />
          </div>
        </div>
        <div className="footer-item footer-right">Copyright 2023 DapXDap</div>
      </Footer>
    </BlockchainsPage>
  );
};

BlockchainsColumn.getLayout = useDefaultLayout;

export default BlockchainsColumn;

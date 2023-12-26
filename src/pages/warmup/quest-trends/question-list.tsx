import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useDefaultLayout } from '@/hooks/useLayout';
import { get } from '@/utils/http';
import type { NextPageWithLayout } from '@/utils/types';
import { QUEST_PATH } from '@/config/quest';

const Container = styled.div`
  margin: 0 8%;
  .title {
    display: flex;
    align-items: center;
    padding-left: 0px;
    margin-top: 20px;
    img {
      width: 28px;
      margin-right: 10px;
    }
    span {
      font-size: 40px;
      color: #fff;
      font-weight: 700;
    }
  }
  .search-area {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    transform: translateY(-10px);
    .description {
      font-size: 20px;
      color: #979abe;
      font-weight: 500;
    }
    .search {
      display: flex;
      align-items: center;
      jusitfy-content: space-between;
      border-bottom: 1px solid #373a53;
      input {
        font-size: 20px;
        font-weight: 500;
        color: #fff;
        outline: none;
        background: none;
        border: none;
        &:focus {
          box-shadow: none;
        }
      }
    }
  }
  .noData {
    display: flex;
    justify-content: center;
    font-size: 18px;
    color: #4f5375;
    font-weight: 500;
    margin-top: 100px;
  }
  @media (max-width: 900px) {
    position: absolute;
    top: 18%;
    height: 44vh;
    width: 89%;
    overflow: auto;
    .title {
      img {
        width: 23px;
      }
      span {
        font-family: Gantari;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 0em;
        text-align: left;
      }
    }
    .search-area {
      display: none;
    }
  }
`;
const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px 20px;
  margin-top: 36px;
  .itemDiv {
    width: 250px;
  }
  @media (max-width: 900px) {
    margin-top: 28px;
    gap: 16px;
    .itemDiv {
      width: 100%;
    }
  }
`;

const ListItem = styled.div`
  width: 250px;
  .body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 108px;
    border-radius: 20px;
    background-color: #373a53;
    padding: 12px 20px;
    &:hover {
      text-decoration: none;
    }
    .item-title {
      font-size: 16px;
      color: #fff;
      font-weight: 700;
      flex-wrap: wrap;
      text-align: center;
      .num {
        font-size: 14px;
        color: #979abe;
        margin: 0 3px;
      }
    }
    .platform {
      margin-top: 8px;
      img {
        width: 26px;
        height: 26px;
        margin-right: 5px;
      }
      span {
        font-size: 14px;
        color: #979abe;
      }
    }
    .count_number {
      display: none;
    }
  }
  .foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #979abe;
    margin-top: 12px;
    padding: 0 12px;
  }
  @media (max-width: 900px) {
    width: 100%;
    .body {
      background-color: transparent;
      border-bottom: 1px solid rgba(55, 58, 83, 1);
      height: 72px;
      border-radius: 0;
      align-items: flex-start;
      justify-content: end;
      padding: 12px 0;
      position: relative;
      .item-title {
        text-align: left;
      }
      .platform img {
        width: 20px;
        height: 20px;
      }
      .count_number {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        span {
          font-family: Gantari;
          font-size: 12px;
          font-weight: 400;
          line-height: 14px;
          letter-spacing: 0em;
          text-align: right;
          color: rgba(151, 154, 190, 1);
        }
      }
    }
    .foot {
      display: none;
    }
  }
`;

const Back = styled.a`
  display: flex;
  align-items: center;
  img {
    margin-right: 14px;
    cursor: pointer;
  }
  span {
    color: #979abe;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
  }
  &:hover {
    text-decoration: none;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

const template_icons = {
  ZkEvm: 'https://ipfs.near.social/ipfs/bafkreiftqxncp4pt36z5mcfzizbkccoufksmz2f4zhnproxv4krfb5qmsm',
  'ZkEvm-bridge': 'https://ipfs.near.social/ipfs/bafkreigu2kdqzug45li74xcdhokazx7gv2yopml6x5bwrnjrkx2qsjrsni',
  AAVE: 'https://ipfs.near.social/ipfs/bafkreibveumzusupe5rvk4nffzdipquvatfg5lagg7c6jaor2b3hgigw5e',
  'native bridge': 'https://ipfs.near.social/ipfs/bafkreigu2kdqzug45li74xcdhokazx7gv2yopml6x5bwrnjrkx2qsjrsni',
  zkEVM: 'https://ipfs.near.social/ipfs/bafkreiftqxncp4pt36z5mcfzizbkccoufksmz2f4zhnproxv4krfb5qmsm',
  'zkEVM-bridge': 'https://ipfs.near.social/ipfs/bafkreigu2kdqzug45li74xcdhokazx7gv2yopml6x5bwrnjrkx2qsjrsni',
  'Pancake Swap': '	https://ipfs.near.social/ipfs/bafkreihxgii2nb7l3vcewru2zldbmjclgbu5ack3obalprqbsx5bj5ufom',
  QuickSwap: '	https://ipfs.near.social/ipfs/bafkreien6yavqvx5ots2i26ooakiwux77osuzz4fc6qxexvvd7dsoc6274',
  Balancer: 'https://ipfs.near.social/ipfs/bafkreihimomheiwsinao75pw5zxrt36i77fyq72jmpg4irubqjlk6txb6q',
  Gamma: 'https://ipfs.near.social/ipfs/bafkreial4i3eb5uuxkhecn7nwos76km3qvb7jzxmups57rkxizr5i7dyaa',
  '0vix Lending': 'https://ipfs.near.social/ipfs/bafkreigyodedyhiqmstq3g5edcqw25yyari4y3rcbsnqtxldb2zb2vpah4',
  '0vix': 'https://ipfs.near.social/ipfs/bafkreigyodedyhiqmstq3g5edcqw25yyari4y3rcbsnqtxldb2zb2vpah4',
};

const SwapTokens = [
  {
    address: '0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9',
    chainId: 1101,
    symbol: 'WETH',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295',
  },
  {
    address: '0xa2036f0538221a77a3937f1379699f44945018d0',
    chainId: 1101,
    symbol: 'MATIC',
    extra: true,
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png',
  },
  {
    address: '0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4',
    chainId: 1101,
    symbol: 'DAI',
    extra: true,
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png?1687143508',
  },
  {
    address: '0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035',
    chainId: 1101,
    symbol: 'USDC',
    decimals: 6,
    logoURI: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
  },

  {
    address: '0x1E4a5963aBFD975d8c9021ce480b42188849D41d',
    chainId: 1101,
    symbol: 'USDT',
    decimals: 6,
    logoURI: 'https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663',
  },
  {
    address: '0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1',
    chainId: 1101,
    symbol: 'WBTC',
    decimals: 8,
    extra: true,
    logoURI: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744',
  },
];

const QuestionList: NextPageWithLayout = () => {
  const [hotActionList, setHotActionList] = useState<any[]>([]);
  const [searchActionList, setSearchActionList] = useState<any[]>([]);
  const [keywords, setKeywords] = useState('');

  useEffect(() => {
    const fetchHotActionList = async () => {
      try {
        const resultNetwork = await get(`${QUEST_PATH}/api/action/get-hot-action?hot_number=20&chain_id=1101`);
        setHotActionList(resultNetwork.data);
        setSearchActionList(resultNetwork.data);
      } catch (error) {
        console.error('Error fetching resultNetwork data:', error);
      }
    };
    fetchHotActionList();
  }, []);

  function searchBykeyWords(e: { target: { value: string } }) {
    const value = e.target.value.toLowerCase();
    const search_result = hotActionList.filter((action) => {
      const { action_title } = action;
      return action_title.toLowerCase().includes(value);
    });
    setSearchActionList(search_result);
    setKeywords(value);
  }
  function get_item_title(action: { action_title: any }) {
    const { action_title } = action;
    const title_low = action_title.toLowerCase();
    const key_low = keywords.toLowerCase();
    const start_key_index = title_low.indexOf(key_low);
    const end_key_index = start_key_index + key_low.length;

    const result: any = [];
    const arr = action_title.split(' ');
    arr.forEach((split: any) => {
      if (split !== null && split !== undefined) {
        const start_split_index = action_title.indexOf(split);
        const end_split_index = start_split_index + split.length;
        const start_index = Math.max(start_key_index, start_split_index);
        const end_index = Math.min(end_key_index, end_split_index);
        if (end_index > start_index) {
          result.push(<span style={{ color: '#E9F456' }}>{split}</span>, ' ');
        } else {
          if (Number(split)) {
            result.push(<label className="num">{split}</label>, ' ');
          } else {
            result.push(split, ' ');
          }
        }
      }
    });

    return result;
  }
  function get_link(action: any) {
    let link;
    const arr = action.action_title.split(/\s+/);
    const isBridge = arr[0].toLowerCase() === 'bridge';
    const isSwap = arr[0].toLowerCase() === 'swap';
    const isLending = ['repay', 'supply', 'borrow'].includes(arr[0].toLowerCase());
    if (isBridge) {
      link = '/guessme.near/widget/ZKEVMSwap.zkevm-bridge?source=question_list';
    }
    if (isSwap) {
      link = '/guessme.near/widget/ZKEVMSwap.zkevm-swap?source=question_list';
    }
    if (isLending) {
      link = `/guessme.near/widget/ZKEVM.AAVE${arr[0].toLowerCase() == 'supply' ? '' : '?tab=borrow'}`;
    }
    return link;
  }
  function onSaveParams(action: any) {
    const arr = action.action_title.split(/\s+/);
    const isBridge = arr[0].toLowerCase() === 'bridge';
    const isSwap = arr[0].toLowerCase() === 'swap';
    if (isBridge) {
      const [action_type, symbol, from, chain] = arr;
      localStorage.setItem(symbol, chain);
    }

    if (isSwap) {
      const [action_type, amount, symbol, on, dexName1, dexName2, assetId] = arr;
      const token = SwapTokens.find((item) => item.symbol === symbol);
      //   console.log('token: ', token);

      localStorage.setItem(
        amount,
        symbol,
        // dexName1: dexName1 + (dexName2 ? ' ' + dexName2 : ''),
        // assetId: token.address,
      );
    }
  }
  return (
    <Container>
      <Back href="/warmup">
        <img src="https://ipfs.near.social/ipfs/bafkreig7ezlwthp2u6gsoifpvbsjcepuyvtx33uyjaentqwvcoh64unvd4"></img>
        <span>Back</span>
      </Back>
      <div className="title">
        <img src="https://ipfs.near.social/ipfs/bafkreiaerml7c2sfbojxg64lms25qappcgoevsrfmquxagfbowhm45gyey"></img>
        <span>Quest Trends</span>
      </div>
      <div className="search-area">
        <div className="description">Top 20 quest by users</div>
        <div className="search">
          <input onChange={searchBykeyWords}></input>
          <img src="https://ipfs.near.social/ipfs/bafkreia4oaaolx3jppkacw3rqxqtn66imuleqghejdq5xopmxjhtxflibm"></img>
        </div>
      </div>
      <List>
        {searchActionList.map((action, index) => {
          return (
            <ListItem key={index}>
              <div className="itemDiv" onClick={() => onSaveParams(action)}>
                <a className="body" href={get_link(action)}>
                  <div className="item-title">{get_item_title(action)}</div>
                  <div className="platform">
                    <img src={template_icons[action.template as keyof typeof template_icons]}></img>
                    <span>{action.template}</span>
                  </div>
                  <div className="count_number">
                    <span>{action.count_number}</span>
                  </div>
                </a>
              </div>
              <div className="foot">
                <span>Total Execution</span>
                <span>{action.count_number}</span>
              </div>
            </ListItem>
          );
        })}
      </List>
      {searchActionList.length == 0 ? <p className="noData">No result found</p> : null}
    </Container>
  );
};

QuestionList.getLayout = useDefaultLayout;

export default QuestionList;

import Big from 'big.js';
import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

import {
  AllNetWorkTab,
  CheckBox,
  HoldingTable,
  HoldingTitle,
  NetWorkTab,
  NetworkTabWrapper,
  PortfolioTabs,
  Profile,
  ProtocolArrowWrapper,
  ProtocolCard,
  ProtocolSelectBox,
  ProtocolTable,
  SortArrowDownWrapper,
  Wrapper,
  YourAssetsTitle,
} from '@/components/portfolio';
import { IconSeries } from '@/components/portfolio/icons';
import {
  AllNetWorkIcon,
  ArrowDone,
  DefaultProfileIcon,
  MetaMaskIcon,
  ProtocolArrowDown,
  sortArrowDown,
} from '@/components/portfolio/imgs';
import { useEthersProviderContext } from '@/data/web3';
import useEthersSender from '@/hooks/useEthersSender';
import { useDefaultLayout } from '@/hooks/useLayout';
import {
  formateAddress,
  formateValue,
  formateValueWithThousandSeparator,
  formateValueWithThousandSeparatorAndFont,
} from '@/utils/formate';
import type { NextPageWithLayout } from '@/utils/types';

const PortfolioDailyData = () => {
  const ChartContainer = styled.div`
    color: #fff;
    width: 425px;
    height: 100px;
  `;

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <ChartContainer
      style={{
        position: 'relative',
        top: '100px',
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={200}
          height={60}
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgba(99, 195, 65, 0.1)" />
              <stop offset="50%" stopColor="rgba(99, 195, 65, 0)" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="transparent" />
          <XAxis dataKey="name" tick={false} axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tick={false} tickLine={false} />
          <Tooltip />
          <Area type="linear" dataKey="uv" stroke="#63C341" fill="url(#gradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

type colorKeyEnums = 'default' | 'Staked' | 'Deposit' | 'Liquidity Pool' | 'Lending';

const colorConfig = {
  default: {
    titleColor: '#ACFCED',
    titleBg: 'rgba(172,252,237,0.3)',
  },

  Staked: {
    titleColor: '#ACFCED',
    titleBg: 'rgba(172,252,237,0.3)',
  },

  Deposit: {
    titleColor: '#ACFCED',
    titleBg: 'rgba(172,252,237,0.3)',
  },

  'Liquidity Pool': {
    titleColor: '#4594FF',
    titleBg: 'rgba(86,150,236,0.3)',
  },
  Lending: {
    titleColor: '#FFBF19',
    titleBg: 'rgba(255,191,25,0.3)',
  },
};

const ChainList = ['op', 'eth', 'metis', 'era', 'bsc', 'base', 'mnt', 'avax', 'pze', 'matic', 'xdai', 'linea', 'arb'];

const useAllPorfolioDataList = () => {
  const [sortBy, setSortBy] = useState<'usd_value' | 'price' | 'amount'>('usd_value');

  const allChainsBalance = {
    total_usd_value: 1726.1749728283191,
    chain_list: [
      {
        id: 'hmy',
        community_id: 1666600000,
        name: 'Harmony',
        native_token_id: 'hmy',
        logo_url: 'https://static.debank.com/image/chain/logo_url/hmy/b3bfb4681f81a85e25c28e150dcbfe51.png',
        wrapped_token_id: '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'brise',
        community_id: 32520,
        name: 'Bitgert',
        native_token_id: 'brise',
        logo_url: 'https://static.debank.com/image/chain/logo_url/brise/4f6c040cf49f4d8c4eabbad7cd2f4ae4.png',
        wrapped_token_id: '0x0eb9036cbe0f052386f36170c6b07ef0a0e3f710',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'linea',
        community_id: 59144,
        name: 'Linea',
        native_token_id: 'linea',
        logo_url: 'https://static.debank.com/image/chain/logo_url/linea/32d4ff2cf92c766ace975559c232179c.png',
        wrapped_token_id: '0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f',
        is_support_pre_exec: true,
        usd_value: 36.9101240530139,
      },
      {
        id: 'wemix',
        community_id: 1111,
        name: 'WEMIX',
        native_token_id: 'wemix',
        logo_url: 'https://static.debank.com/image/chain/logo_url/wemix/d1ba88d1df6cca0b0cb359c36a09c054.png',
        wrapped_token_id: '0x7d72b22a74a216af4a002a1095c8c707d6ec1c5f',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'xdai',
        community_id: 100,
        name: 'Gnosis Chain',
        native_token_id: 'xdai',
        logo_url: 'https://static.debank.com/image/chain/logo_url/xdai/43c1e09e93e68c9f0f3b132976394529.png',
        wrapped_token_id: '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d',
        is_support_pre_exec: true,
        usd_value: 4.493398358444592,
      },
      {
        id: 'rose',
        community_id: 42262,
        name: 'Oasis Emerald',
        native_token_id: 'rose',
        logo_url: 'https://static.debank.com/image/chain/logo_url/rose/33ade55b0f3efa10e9eec002c6417257.png',
        wrapped_token_id: '0x21c718c22d52d0f3a789b752d4c2fd5908a8a733',
        is_support_pre_exec: false,
        usd_value: 0,
      },
      {
        id: 'tlos',
        community_id: 40,
        name: 'Telos',
        native_token_id: 'tlos',
        logo_url: 'https://static.debank.com/image/chain/logo_url/telos/f9f7493def4c08ed222540bebd8ce87a.png',
        wrapped_token_id: '0xd102ce6a4db07d247fcc28f366a623df0938ca9e',
        is_support_pre_exec: false,
        usd_value: 0,
      },
      {
        id: 'aurora',
        community_id: 1313161554,
        name: 'Aurora',
        native_token_id: 'aurora',
        logo_url: 'https://static.debank.com/image/chain/logo_url/aurora/da491099bb44690eda122cdd67c5c610.png',
        wrapped_token_id: '0xc9bdeed33cd01541e1eed10f90519d2c06fe3feb',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'base',
        community_id: 8453,
        name: 'Base',
        native_token_id: 'base',
        logo_url: 'https://static.debank.com/image/chain/logo_url/base/ccc1513e4f390542c4fb2f4b88ce9579.png',
        wrapped_token_id: '0x4200000000000000000000000000000000000006',
        is_support_pre_exec: true,
        usd_value: 202.2528622703993,
      },
      {
        id: 'celo',
        community_id: 42220,
        name: 'Celo',
        native_token_id: 'celo',
        logo_url: 'https://static.debank.com/image/chain/logo_url/celo/41da5c1d3c0945ae822a1f85f02c76cf.png',
        wrapped_token_id: '0x471ece3750da237f93b8e339c536989b8978a438',
        is_support_pre_exec: true,
        usd_value: 0.0,
      },
      {
        id: 'fuse',
        community_id: 122,
        name: 'Fuse',
        native_token_id: 'fuse',
        logo_url: 'https://static.debank.com/image/chain/logo_url/fuse/36dfb6fe8e9770367976dd4d2286a9ef.png',
        wrapped_token_id: '0x0be9e53fd7edac9f859882afdda116645287c629',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'loot',
        community_id: 5151706,
        name: 'Loot',
        native_token_id: 'loot',
        logo_url: 'https://static.debank.com/image/chain/logo_url/loot/0f098333a1a4f474115b05862e680573.png',
        wrapped_token_id: '0x4fa214c9e33d481996bec77c443245fbaee85670',
        is_support_pre_exec: false,
        usd_value: 0,
      },
      {
        id: 'klay',
        community_id: 8217,
        name: 'Klaytn',
        native_token_id: 'klay',
        logo_url: 'https://static.debank.com/image/chain/logo_url/klay/1df018b8493cb97c50b7e390ef63cba4.png',
        wrapped_token_id: '0xe4f05a66ec68b54a58b17c22107b02e0232cc817',
        is_support_pre_exec: true,
        usd_value: 0.0,
      },
      {
        id: 'btt',
        community_id: 199,
        name: 'BitTorrent',
        native_token_id: 'btt',
        logo_url: 'https://static.debank.com/image/chain/logo_url/btt/2130a8d57ff2a0f3d50a4ec9432897c6.png',
        wrapped_token_id: '0x197a4ed2b1bb607e47a144b9731d7d34f86e9686',
        is_support_pre_exec: true,
        usd_value: 0.0,
      },
      {
        id: 'fx',
        community_id: 530,
        name: 'Function X',
        native_token_id: 'fx',
        logo_url: 'https://static.debank.com/image/chain/logo_url/fx/6fee82420b2394e0b68d7d7e692a0a01.png',
        wrapped_token_id: '0x80b5a32e4f032b2a058b4f29ec95eefeeb87adcd',
        is_support_pre_exec: false,
        usd_value: 0,
      },
      {
        id: 'palm',
        community_id: 11297108109,
        name: 'Palm',
        native_token_id: 'palm',
        logo_url: 'https://static.debank.com/image/chain/logo_url/palm/ece828c59e643b8a8a13aa99145ae7d7.png',
        wrapped_token_id: '0xf98cabf0a963452c5536330408b2590567611a71',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'nova',
        community_id: 42170,
        name: 'Arbitrum Nova',
        native_token_id: 'nova',
        logo_url: 'https://static.debank.com/image/chain/logo_url/nova/06eb2b7add8ba443d5b219c04089c326.png',
        wrapped_token_id: '0x722e8bdd2ce80a4422e880164f2079488e115365',
        is_support_pre_exec: true,
        usd_value: 0.0,
      },
      {
        id: 'cro',
        community_id: 25,
        name: 'Cronos',
        native_token_id: 'cro',
        logo_url: 'https://static.debank.com/image/chain/logo_url/cro/f947000cc879ee8ffa032793808c741c.png',
        wrapped_token_id: '0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'pgn',
        community_id: 424,
        name: 'PGN',
        native_token_id: 'pgn',
        logo_url: 'https://static.debank.com/image/chain/logo_url/pgn/55e8dbdfeb4ca88443e04206da3fcb7f.png',
        wrapped_token_id: '',
        is_support_pre_exec: false,
        usd_value: 0,
      },
      {
        id: 'fsn',
        community_id: 32659,
        name: 'Fusion',
        native_token_id: 'fsn',
        logo_url: 'https://static.debank.com/image/chain/logo_url/fsn/047789979f0b5733602b29517753bdf3.png',
        wrapped_token_id: '0x0c05c5710af74d36b4d3bd5460475c20ceca8fe3',
        is_support_pre_exec: false,
        usd_value: 0,
      },
      {
        id: 'lyx',
        community_id: 42,
        name: 'LUKSO',
        native_token_id: 'lyx',
        logo_url: 'https://static.debank.com/image/chain/logo_url/lyx/dbe6eef57e66817e61297d9b188248ed.png',
        wrapped_token_id: '',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'rsk',
        community_id: 30,
        name: 'RSK',
        native_token_id: 'rsk',
        logo_url: 'https://static.debank.com/image/chain/logo_url/rsk/ff47def89fba98394168bf5f39920c8c.png',
        wrapped_token_id: '0x542fda317318ebf1d3deaf76e0b632741a7e677d',
        is_support_pre_exec: false,
        usd_value: 0,
      },
      {
        id: 'tomb',
        community_id: 6969,
        name: 'TOMB Chain',
        native_token_id: 'tomb',
        logo_url: 'https://static.debank.com/image/chain/logo_url/tomb/eee88f95c46faa10762514b44655a6a1.png',
        wrapped_token_id: '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'arb',
        community_id: 42161,
        name: 'Arbitrum',
        native_token_id: 'arb',
        logo_url: 'https://static.debank.com/image/chain/logo_url/arb/854f629937ce94bebeb2cd38fb336de7.png',
        wrapped_token_id: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
        is_support_pre_exec: true,
        usd_value: 246.5436032409305,
      },
      {
        id: 'kava',
        community_id: 2222,
        name: 'Kava',
        native_token_id: 'kava',
        logo_url: 'https://static.debank.com/image/chain/logo_url/kava/b26bf85a1a817e409f9a3902e996dc21.png',
        wrapped_token_id: '0xc86c7c0efbd6a49b35e8714c5f59d99de09a225b',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'ron',
        community_id: 2020,
        name: 'Ronin',
        native_token_id: 'ron',
        logo_url: 'https://static.debank.com/image/chain/logo_url/ron/6e0f509804bc83bf042ef4d674c1c5ee.png',
        wrapped_token_id: '0xe514d9deb7966c8be0ca922de8a064264ea6bcd4',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'wan',
        community_id: 888,
        name: 'Wanchain',
        native_token_id: 'wan',
        logo_url: 'https://static.debank.com/image/chain/logo_url/wan/f3aa8b31414732ea5e026e05665146e6.png',
        wrapped_token_id: '0xdabd997ae5e4799be47d6e69d9431615cba28f48',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'mobm',
        community_id: 1284,
        name: 'Moonbeam',
        native_token_id: 'mobm',
        logo_url: 'https://static.debank.com/image/chain/logo_url/mobm/a8442077d76b258297181c3e6eb8c9cc.png',
        wrapped_token_id: '0xacc15dc74880c9944775448304b263d191c6077f',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'sbch',
        community_id: 10000,
        name: 'SmartBch',
        native_token_id: 'sbch',
        logo_url: 'https://static.debank.com/image/chain/logo_url/sbch/d78ac780803e7f0a17b73558f423502e.png',
        wrapped_token_id: '0x3743ec0673453e5009310c727ba4eaf7b3a1cc04',
        is_support_pre_exec: false,
        usd_value: 0,
      },
      {
        id: 'metis',
        community_id: 1088,
        name: 'Metis',
        native_token_id: 'metis',
        logo_url: 'https://static.debank.com/image/chain/logo_url/metis/b289da32db4d860ebf6fb46a6e41dcfc.png',
        wrapped_token_id: '0x75cb093e4d61d2a2e65d8e0bbb01de8d89b53481',
        is_support_pre_exec: true,
        usd_value: 2.049027209219594,
      },
      {
        id: 'sdn',
        community_id: 336,
        name: 'Shiden',
        native_token_id: 'sdn',
        logo_url: 'https://static.debank.com/image/chain/logo_url/sdn/0baaa4ee7cb16feed71119b062ccd277.png',
        wrapped_token_id: '0x0f933dc137d21ca519ae4c7e93f87a4c8ef365ef',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'kcc',
        community_id: 321,
        name: 'KCC',
        native_token_id: 'kcc',
        logo_url: 'https://static.debank.com/image/chain/logo_url/kcc/3a5a4ef7d5f1db1e53880d70219d75b6.png',
        wrapped_token_id: '0x4446fc4eb47f2f6586f9faab68b3498f86c07521',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'manta',
        community_id: 169,
        name: 'Manta Pacific',
        native_token_id: 'manta',
        logo_url: 'https://static.debank.com/image/chain/logo_url/manta/0e25a60b96a29d6a5b9e524be7565845.png',
        wrapped_token_id: '0x0dc808adce2099a9f62aa87d9670745aba741746',
        is_support_pre_exec: false,
        usd_value: 0,
      },
      {
        id: 'mtr',
        community_id: 82,
        name: 'Meter',
        native_token_id: 'mtr',
        logo_url: 'https://static.debank.com/image/chain/logo_url/mtr/2dc6f079f52ca22778eb684e1ce650b3.png',
        wrapped_token_id: '0x160361ce13ec33c993b5cca8f62b6864943eb083',
        is_support_pre_exec: false,
        usd_value: 0,
      },
      {
        id: 'shib',
        community_id: 109,
        name: 'Shibarium',
        native_token_id: 'shib',
        logo_url: 'https://static.debank.com/image/chain/logo_url/shib/4ec79ed9ee4988dfdfc41e1634a447be.png',
        wrapped_token_id: '0x213c25900f365f1be338df478cd82bef7fd43f85',
        is_support_pre_exec: false,
        usd_value: 0.0,
      },
      {
        id: 'era',
        community_id: 324,
        name: 'zkSync Era',
        native_token_id: 'era',
        logo_url: 'https://static.debank.com/image/chain/logo_url/era/2cfcd0c8436b05d811b03935f6c1d7da.png',
        wrapped_token_id: '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91',
        is_support_pre_exec: false,
        usd_value: 220.41949194116506,
      },
      {
        id: 'doge',
        community_id: 2000,
        name: 'Dogechain',
        native_token_id: 'doge',
        logo_url: 'https://static.debank.com/image/chain/logo_url/doge/2538141079688a7a43bc22c7b60fb45f.png',
        wrapped_token_id: '0xb7ddc6414bf4f5515b52d8bdd69973ae205ff101',
        is_support_pre_exec: false,
        usd_value: 0,
      },
      {
        id: 'sgb',
        community_id: 19,
        name: 'Songbird',
        native_token_id: 'sgb',
        logo_url: 'https://static.debank.com/image/chain/logo_url/sgb/619f46d574d62a50bdfd9f0e2f47ddc1.png',
        wrapped_token_id: '0x02f0826ef6ad107cfc861152b32b52fd11bab9ed',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'astar',
        community_id: 592,
        name: 'Astar',
        native_token_id: 'astar',
        logo_url: 'https://static.debank.com/image/chain/logo_url/astar/398c7e0014bdada3d818367a7273fabe.png',
        wrapped_token_id: '0xaeaaf0e2c81af264101b9129c00f4440ccf0f720',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'zora',
        community_id: 7777777,
        name: 'Zora',
        native_token_id: 'zora',
        logo_url: 'https://static.debank.com/image/chain/logo_url/zora/de39f62c4489a2359d5e1198a8e02ef1.png',
        wrapped_token_id: '0x4200000000000000000000000000000000000006',
        is_support_pre_exec: false,
        usd_value: 0,
      },
      {
        id: 'pze',
        community_id: 1101,
        name: 'Polygon zkEVM',
        native_token_id: 'pze',
        logo_url: 'https://static.debank.com/image/chain/logo_url/pze/a2276dce2d6a200c6148fb975f0eadd3.png',
        wrapped_token_id: '0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9',
        is_support_pre_exec: false,
        usd_value: 126.0093129829513,
      },
      {
        id: 'movr',
        community_id: 1285,
        name: 'Moonriver',
        native_token_id: 'movr',
        logo_url: 'https://static.debank.com/image/chain/logo_url/movr/4b0de5a711b437f187c0d0f15cc0398b.png',
        wrapped_token_id: '0x98878b06940ae243284ca214f92bb71a2b032b8a',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'flr',
        community_id: 14,
        name: 'Flare',
        native_token_id: 'flr',
        logo_url: 'https://static.debank.com/image/chain/logo_url/flr/9ee03d5d7036ad9024e81d55596bb4dc.png',
        wrapped_token_id: '0x1d80c49bbbcd1c0911346656b529df9e5c2f783d',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'mada',
        community_id: 2001,
        name: 'Milkomeda C1',
        native_token_id: 'mada',
        logo_url: 'https://static.debank.com/image/chain/logo_url/mada/cdc4b1112c2c5a2757cbda33f4476b7f.png',
        wrapped_token_id: '0xae83571000af4499798d1e3b0fa0070eb3a3e3f9',
        is_support_pre_exec: false,
        usd_value: 0,
      },
      {
        id: 'dfk',
        community_id: 53935,
        name: 'DFK',
        native_token_id: 'dfk',
        logo_url: 'https://static.debank.com/image/chain/logo_url/dfk/233867c089c5b71be150aa56003f3f7a.png',
        wrapped_token_id: '0xccb93dabd71c8dad03fc4ce5559dc3d89f67a260',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'eth',
        community_id: 1,
        name: 'Ethereum',
        native_token_id: 'eth',
        logo_url: 'https://static.debank.com/image/chain/logo_url/eth/42ba589cd077e7bdd97db6480b0ff61d.png',
        wrapped_token_id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        is_support_pre_exec: true,
        usd_value: 396.57391292578484,
      },
      {
        id: 'cfx',
        community_id: 1030,
        name: 'Conflux',
        native_token_id: 'cfx',
        logo_url: 'https://static.debank.com/image/chain/logo_url/cfx/eab0c7304c6820b48b2a8d0930459b82.png',
        wrapped_token_id: '0x14b2d3bc65e74dae1030eafd8ac30c533c976a9b',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'tenet',
        community_id: 1559,
        name: 'Tenet',
        native_token_id: 'tenet',
        logo_url: 'https://static.debank.com/image/chain/logo_url/tenet/803be22e467ee9a5abe00d69a9c3ea4f.png',
        wrapped_token_id: '0xd6cb8a253e12893b0cf39ca78f7d858652cca1fe',
        is_support_pre_exec: false,
        usd_value: 0,
      },
      {
        id: 'matic',
        community_id: 137,
        name: 'Polygon',
        native_token_id: 'matic',
        logo_url: 'https://static.debank.com/image/chain/logo_url/matic/52ca152c08831e4765506c9bd75767e8.png',
        wrapped_token_id: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
        is_support_pre_exec: true,
        usd_value: 14.456613096503837,
      },
      {
        id: 'evmos',
        community_id: 9001,
        name: 'EvmOS',
        native_token_id: 'evmos',
        logo_url: 'https://static.debank.com/image/chain/logo_url/evmos/26e038b4d5475d5a4b92f7fc08bdabc9.png',
        wrapped_token_id: '0xd4949664cd82660aae99bedc034a0dea8a0bd517',
        is_support_pre_exec: false,
        usd_value: 0,
      },
      {
        id: 'okt',
        community_id: 66,
        name: 'OKC',
        native_token_id: 'okt',
        logo_url: 'https://static.debank.com/image/chain/logo_url/okt/428bf6035abb3863c9f5c1a10dc3afd3.png',
        wrapped_token_id: '0x8f8526dbfd6e38e3d8307702ca8469bae6c56c15',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'heco',
        community_id: 128,
        name: 'HECO',
        native_token_id: 'heco',
        logo_url: 'https://static.debank.com/image/chain/logo_url/heco/db5152613c669e0cc8624d466d6c94ea.png',
        wrapped_token_id: '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'boba',
        community_id: 288,
        name: 'Boba',
        native_token_id: 'boba',
        logo_url: 'https://static.debank.com/image/chain/logo_url/boba/e43d79cd8088ceb3ea3e4a240a75728f.png',
        wrapped_token_id: '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'core',
        community_id: 1116,
        name: 'CORE',
        native_token_id: 'core',
        logo_url: 'https://static.debank.com/image/chain/logo_url/core/ccc02f660e5dd410b23ca3250ae7c060.png',
        wrapped_token_id: '0x40375c92d9faf44d2f9db9bd9ba41a3317a2404f',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'op',
        community_id: 10,
        name: 'Optimism',
        native_token_id: 'op',
        logo_url: 'https://static.debank.com/image/chain/logo_url/op/01ae734fe781c9c2ae6a4cc7e9244056.png',
        wrapped_token_id: '0x4200000000000000000000000000000000000006',
        is_support_pre_exec: true,
        usd_value: 40.23550663173428,
      },
      {
        id: 'opbnb',
        community_id: 204,
        name: 'opBNB',
        native_token_id: 'opbnb',
        logo_url: 'https://static.debank.com/image/chain/logo_url/opbnb/07e2e686e363a842d0982493638e1285.png',
        wrapped_token_id: '0x4200000000000000000000000000000000000006',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'bsc',
        community_id: 56,
        name: 'BNB Chain',
        native_token_id: 'bsc',
        logo_url: 'https://static.debank.com/image/chain/logo_url/bsc/bc73fa84b7fc5337905e527dadcbc854.png',
        wrapped_token_id: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
        is_support_pre_exec: true,
        usd_value: 13.14236118127962,
      },
      {
        id: 'eos',
        community_id: 17777,
        name: 'EOS EVM',
        native_token_id: 'eos',
        logo_url: 'https://static.debank.com/image/chain/logo_url/eos/7e3122a9ce6f9d522e6d5519d43b6a72.png',
        wrapped_token_id: '0xc00592aa41d32d137dc480d9f6d0df19b860104f',
        is_support_pre_exec: false,
        usd_value: 0,
      },
      {
        id: 'oas',
        community_id: 248,
        name: 'Oasys',
        native_token_id: 'oas',
        logo_url: 'https://static.debank.com/image/chain/logo_url/oas/69e424154c30984ff4d5ba916591ac2a.png',
        wrapped_token_id: '0x5200000000000000000000000000000000000001',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'mnt',
        community_id: 5000,
        name: 'Mantle',
        native_token_id: 'mnt',
        logo_url: 'https://static.debank.com/image/chain/logo_url/mnt/0af11a52431d60ded59655c7ca7e1475.png',
        wrapped_token_id: '0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8',
        is_support_pre_exec: true,
        usd_value: 345.49174828732083,
      },
      {
        id: 'etc',
        community_id: 61,
        name: 'Ethereum Classic',
        native_token_id: 'etc',
        logo_url: 'https://static.debank.com/image/chain/logo_url/etc/7ccf90ee6822ab440fb603337da256fa.png',
        wrapped_token_id: '0x82a618305706b14e7bcf2592d4b9324a366b6dad',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'pls',
        community_id: 369,
        name: 'Pulse',
        native_token_id: 'pls',
        logo_url: 'https://static.debank.com/image/chain/logo_url/pls/aa6be079fa9eb568e02150734ebb3db0.png',
        wrapped_token_id: '0xa1077a294dde1b09bb078844df40758a5d0f9a27',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'ftm',
        community_id: 250,
        name: 'Fantom',
        native_token_id: 'ftm',
        logo_url: 'https://static.debank.com/image/chain/logo_url/ftm/14133435f89637157a4405e954e1b1b2.png',
        wrapped_token_id: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
        is_support_pre_exec: true,
        usd_value: 0.0,
      },
      {
        id: 'scrl',
        community_id: 534352,
        name: 'Scroll',
        native_token_id: 'scrl',
        logo_url: 'https://static.debank.com/image/chain/logo_url/scrl/1fa5c7e0bfd353ed0a97c1476c9c42d2.png',
        wrapped_token_id: '0x5300000000000000000000000000000000000004',
        is_support_pre_exec: false,
        usd_value: 0,
      },
      {
        id: 'canto',
        community_id: 7700,
        name: 'Canto',
        native_token_id: 'canto',
        logo_url: 'https://static.debank.com/image/chain/logo_url/canto/47574ef619e057d2c6bbce1caba57fb6.png',
        wrapped_token_id: '0x826551890dc65655a0aceca109ab11abdbd7a07b',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'step',
        community_id: 1234,
        name: 'Step',
        native_token_id: 'step',
        logo_url: 'https://static.debank.com/image/chain/logo_url/step/db79600b8feafe17845617ca9c606dbe.png',
        wrapped_token_id: '0xb58a9d5920af6ac1a9522b0b10f55df16686d1b6',
        is_support_pre_exec: true,
        usd_value: 0,
      },
      {
        id: 'avax',
        community_id: 43114,
        name: 'Avalanche',
        native_token_id: 'avax',
        logo_url: 'https://static.debank.com/image/chain/logo_url/avax/4d1649e8a0c7dec9de3491b81807d402.png',
        wrapped_token_id: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
        is_support_pre_exec: true,
        usd_value: 77.59701064957147,
      },
      {
        id: 'iotx',
        community_id: 4689,
        name: 'IoTeX',
        native_token_id: 'iotx',
        logo_url: 'https://static.debank.com/image/chain/logo_url/iotx/d3be2cd8677f86bd9ab7d5f3701afcc9.png',
        wrapped_token_id: '0xa00744882684c3e4747faefd68d283ea44099d03',
        is_support_pre_exec: false,
        usd_value: 0,
      },
      {
        id: 'ckb',
        community_id: 71402,
        name: 'Godwoken',
        native_token_id: 'ckb',
        logo_url: 'https://static.debank.com/image/chain/logo_url/ckb/e821893503104870d5e73f56dbd73746.png',
        wrapped_token_id: '0xc296f806d15e97243a08334256c705ba5c5754cd',
        is_support_pre_exec: false,
        usd_value: 0,
      },
    ],
  };

  const protocolList = [
    {
      id: 'arb_pendle2',
      chain: 'arb',
      name: 'Pendle V2',
      site_url: 'https://app.pendle.finance',
      logo_url: 'https://static.debank.com/image/project/logo_url/pendle2/d5cfacd3b8f7e0ec161c0de9977cabbd.png',
      has_supported_portfolio: true,
      tvl: 52687373.149780825,
      portfolio_item_list: [
        {
          stats: {
            asset_usd_value: 1.0023615896374367,
            debt_usd_value: 0,
            net_usd_value: 1.0023615896374367,
          },
          asset_dict: {
            '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9': 0.7405919109101613,
            '0x7d180a4f451fc15b543b5d1ba7dda6b3014a4c49': 0.2672551115822327,
            '0x6694340fc020c5e6b96567843da2df01b2ce1eb6': 0.000273957796799444,
            '0x0c880f6761f1af8d9aa9c466984b80dab9a8c9e8': 0.002658688671572035,
          },
          asset_token_list: [
            {
              id: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
              chain: 'arb',
              name: 'Tether USD',
              symbol: 'USDT',
              display_symbol: null,
              optimized_symbol: 'USDT',
              decimals: 6,
              logo_url: 'https://static.debank.com/image/coin/logo_url/usdt/23af7472292cb41dc39b3f1146ead0fe.png',
              protocol_id: 'arb_rhino',
              price: 1.000155,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1630432123.0,
              amount: 0.7405919109101613,
            },
            {
              id: '0x7d180a4f451fc15b543b5d1ba7dda6b3014a4c49',
              chain: 'arb',
              name: 'PT Stargate USDT 27JUN2024',
              symbol: 'PT-Stargate USDT-27JUN2024',
              display_symbol: null,
              optimized_symbol: 'PT-Stargate USDT-27JUN2024',
              decimals: 6,
              logo_url: null,
              protocol_id: 'arb_pendle2',
              price: 0.9704803980242734,
              is_verified: false,
              is_core: false,
              is_wallet: false,
              time_at: 1679627765.0,
              amount: 0.2672551115822327,
            },
            {
              id: '0x6694340fc020c5e6b96567843da2df01b2ce1eb6',
              chain: 'arb',
              name: 'StargateToken',
              symbol: 'STG',
              display_symbol: null,
              optimized_symbol: 'STG',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/arb_token/logo_url/0x6694340fc020c5e6b96567843da2df01b2ce1eb6/55886c6280173254776780fd8340cca7.png',
              protocol_id: 'arb_stargate',
              price: 0.4474,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1647502704.0,
              amount: 0.000273957796799444,
            },
            {
              id: '0x0c880f6761f1af8d9aa9c466984b80dab9a8c9e8',
              chain: 'arb',
              name: 'Pendle',
              symbol: 'PENDLE',
              display_symbol: null,
              optimized_symbol: 'PENDLE',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/arb_token/logo_url/0x0c880f6761f1af8d9aa9c466984b80dab9a8c9e8/b9351f830cd0a6457e489b8c685f29ad.png',
              protocol_id: 'arb_pendle2',
              price: 0.814864569746244,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1671422822.0,
              amount: 0.002658688671572035,
            },
          ],
          update_at: 1698139216.0,
          name: 'Liquidity Pool',
          detail_types: ['common'],
          detail: {
            supply_token_list: [
              {
                id: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
                chain: 'arb',
                name: 'Tether USD',
                symbol: 'USDT',
                display_symbol: null,
                optimized_symbol: 'USDT',
                decimals: 6,
                logo_url: 'https://static.debank.com/image/coin/logo_url/usdt/23af7472292cb41dc39b3f1146ead0fe.png',
                protocol_id: 'arb_rhino',
                price: 1.000155,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1630432123.0,
                amount: 0.7405919109101613,
              },
              {
                id: '0x7d180a4f451fc15b543b5d1ba7dda6b3014a4c49',
                chain: 'arb',
                name: 'PT Stargate USDT 27JUN2024',
                symbol: 'PT-Stargate USDT-27JUN2024',
                display_symbol: null,
                optimized_symbol: 'PT-Stargate USDT-27JUN2024',
                decimals: 6,
                logo_url: null,
                protocol_id: 'arb_pendle2',
                price: 0.9704803980242734,
                is_verified: false,
                is_core: false,
                is_wallet: false,
                time_at: 1679627765.0,
                amount: 0.2672551115822327,
              },
            ],
            reward_token_list: [
              {
                id: '0x6694340fc020c5e6b96567843da2df01b2ce1eb6',
                chain: 'arb',
                name: 'StargateToken',
                symbol: 'STG',
                display_symbol: null,
                optimized_symbol: 'STG',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/arb_token/logo_url/0x6694340fc020c5e6b96567843da2df01b2ce1eb6/55886c6280173254776780fd8340cca7.png',
                protocol_id: 'arb_stargate',
                price: 0.4474,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1647502704.0,
                amount: 0.000273957796799444,
              },
              {
                id: '0x0c880f6761f1af8d9aa9c466984b80dab9a8c9e8',
                chain: 'arb',
                name: 'Pendle',
                symbol: 'PENDLE',
                display_symbol: null,
                optimized_symbol: 'PENDLE',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/arb_token/logo_url/0x0c880f6761f1af8d9aa9c466984b80dab9a8c9e8/b9351f830cd0a6457e489b8c685f29ad.png',
                protocol_id: 'arb_pendle2',
                price: 0.814864569746244,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1671422822.0,
                amount: 0.002658688671572035,
              },
            ],
          },
          proxy_detail: {},
          pool: {
            id: '0x0a21291a184cf36ad3b0a0def4a17c12cbd66a14',
            chain: 'arb',
            project_id: 'arb_pendle2',
            adapter_id: 'pendle_liquidity',
            controller: '0x0a21291a184cf36ad3b0a0def4a17c12cbd66a14',
            index: null,
            time_at: 1679627781,
          },
        },
        {
          stats: {
            asset_usd_value: 3.010955228375076e-5,
            debt_usd_value: 0,
            net_usd_value: 3.010955228375076e-5,
          },
          asset_dict: {
            '0x0aded315d2e51f676a2aa8d2bc6a79c88e0f1c1a': 0.000999,
          },
          asset_token_list: [
            {
              id: '0x0aded315d2e51f676a2aa8d2bc6a79c88e0f1c1a',
              chain: 'arb',
              name: 'YT Stargate USDT 27JUN2024',
              symbol: 'YT-Stargate USDT-27JUN2024',
              display_symbol: null,
              optimized_symbol: 'YT-Stargate USDT-27JUN2024',
              decimals: 6,
              logo_url: null,
              protocol_id: 'arb_pendle2',
              price: 0.030139691975726485,
              is_verified: false,
              is_core: false,
              is_wallet: false,
              time_at: 1679627765.0,
              amount: 0.000999,
            },
          ],
          update_at: 1698139216.0,
          name: 'Deposit',
          detail_types: ['common'],
          detail: {
            supply_token_list: [
              {
                id: '0x0aded315d2e51f676a2aa8d2bc6a79c88e0f1c1a',
                chain: 'arb',
                name: 'YT Stargate USDT 27JUN2024',
                symbol: 'YT-Stargate USDT-27JUN2024',
                display_symbol: null,
                optimized_symbol: 'YT-Stargate USDT-27JUN2024',
                decimals: 6,
                logo_url: null,
                protocol_id: 'arb_pendle2',
                price: 0.030139691975726485,
                is_verified: false,
                is_core: false,
                is_wallet: false,
                time_at: 1679627765.0,
                amount: 0.000999,
              },
            ],
          },
          proxy_detail: {},
          pool: {
            id: '0x0aded315d2e51f676a2aa8d2bc6a79c88e0f1c1a',
            chain: 'arb',
            project_id: 'arb_pendle2',
            adapter_id: 'pendle_deposited',
            controller: '0x0aded315d2e51f676a2aa8d2bc6a79c88e0f1c1a',
            index: null,
            time_at: 1679627765,
          },
        },
        {
          stats: {
            asset_usd_value: 0.09572236003470927,
            debt_usd_value: 0,
            net_usd_value: 0.09572236003470927,
          },
          asset_dict: {
            '0x1684b747cd46858ae6312a7074353d2101154ef7': 0.10001102517929267,
          },
          asset_token_list: [
            {
              id: '0x1684b747cd46858ae6312a7074353d2101154ef7',
              chain: 'arb',
              name: 'PT gDAI 28MAR2024',
              symbol: 'PT-gDAI-28MAR2024',
              display_symbol: null,
              optimized_symbol: 'PT-gDAI-28MAR2024',
              decimals: 18,
              logo_url: null,
              protocol_id: 'arb_pendle2',
              price: 0.9571180763631312,
              is_verified: false,
              is_core: false,
              is_wallet: false,
              time_at: 1678175030.0,
              amount: 0.10001102517929267,
            },
          ],
          update_at: 1698139216.0,
          name: 'Deposit',
          detail_types: ['common'],
          detail: {
            supply_token_list: [
              {
                id: '0x1684b747cd46858ae6312a7074353d2101154ef7',
                chain: 'arb',
                name: 'PT gDAI 28MAR2024',
                symbol: 'PT-gDAI-28MAR2024',
                display_symbol: null,
                optimized_symbol: 'PT-gDAI-28MAR2024',
                decimals: 18,
                logo_url: null,
                protocol_id: 'arb_pendle2',
                price: 0.9571180763631312,
                is_verified: false,
                is_core: false,
                is_wallet: false,
                time_at: 1678175030.0,
                amount: 0.10001102517929267,
              },
            ],
          },
          proxy_detail: {},
          pool: {
            id: '0x1684b747cd46858ae6312a7074353d2101154ef7',
            chain: 'arb',
            project_id: 'arb_pendle2',
            adapter_id: 'pendle_deposited',
            controller: '0x1684b747cd46858ae6312a7074353d2101154ef7',
            index: null,
            time_at: 1678175030,
          },
        },
        {
          stats: {
            asset_usd_value: 0.9381305677579325,
            debt_usd_value: 0,
            net_usd_value: 0.9381305677579325,
          },
          asset_dict: {
            '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f': 8.448833823811256e-6,
            '0x82af49447d8a07e3bd95bd0d56f35241523fbab1': 0.00014569191394862938,
            '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8': 0.21543311501663281,
            '0xf97f4df75117a78c1a5a0dbb814af92458539fb4': 0.0012742551372403107,
            '0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0': 0.001397928521988464,
            '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9': 0.015065826076403742,
            '0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a': 3.1975771628918585e-10,
            '0x17fc002b466eec40dae837fc4be5c67993ddbd6f': 0.027647929356042458,
            '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1': 0.027778020778710312,
            '0xaf88d065e77c8cc2239327c5edb3a432268e5831': 0.07524883048428659,
          },
          asset_token_list: [
            {
              id: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
              chain: 'arb',
              name: 'Wrapped BTC',
              symbol: 'WBTC',
              display_symbol: null,
              optimized_symbol: 'WBTC',
              decimals: 8,
              logo_url:
                'https://static.debank.com/image/arb_token/logo_url/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f/d3c52e7c7449afa8bd4fad1c93f50d93.png',
              protocol_id: '',
              price: 34446.5,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1623867469.0,
              amount: 8.448833823811256e-6,
            },
            {
              id: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
              chain: 'arb',
              name: 'Wrapped Ether',
              symbol: 'WETH',
              display_symbol: null,
              optimized_symbol: 'WETH',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/arb_token/logo_url/0x82af49447d8a07e3bd95bd0d56f35241523fbab1/61844453e63cf81301f845d7864236f6.png',
              protocol_id: '',
              price: 1828.93,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1622346702.0,
              amount: 0.00014569191394862938,
            },
            {
              id: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
              chain: 'arb',
              name: 'USD Coin (Arb1)',
              symbol: 'USDC',
              display_symbol: 'USDC(Bridged)',
              optimized_symbol: 'USDC(Bridged)',
              decimals: 6,
              logo_url: 'https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png',
              protocol_id: 'arb_tracer',
              price: 1.0,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1623868379.0,
              amount: 0.21543311501663281,
            },
            {
              id: '0xf97f4df75117a78c1a5a0dbb814af92458539fb4',
              chain: 'arb',
              name: 'ChainLink Token',
              symbol: 'LINK',
              display_symbol: null,
              optimized_symbol: 'LINK',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/arb_token/logo_url/0xf97f4df75117a78c1a5a0dbb814af92458539fb4/69425617db0ef93a7c21c4f9b81c7ca5.png',
              protocol_id: '',
              price: 10.501624881785883,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1623867040.0,
              amount: 0.0012742551372403107,
            },
            {
              id: '0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0',
              chain: 'arb',
              name: 'Uniswap',
              symbol: 'UNI',
              display_symbol: null,
              optimized_symbol: 'UNI',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/arb_token/logo_url/0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0/fcee0c46fc9864f48ce6a40ed1cdd135.png',
              protocol_id: 'arb_uniswap3',
              price: 4.363395662983691,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1623867248.0,
              amount: 0.001397928521988464,
            },
            {
              id: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
              chain: 'arb',
              name: 'Tether USD',
              symbol: 'USDT',
              display_symbol: null,
              optimized_symbol: 'USDT',
              decimals: 6,
              logo_url: 'https://static.debank.com/image/coin/logo_url/usdt/23af7472292cb41dc39b3f1146ead0fe.png',
              protocol_id: 'arb_rhino',
              price: 1.000155,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1630432123.0,
              amount: 0.015065826076403742,
            },
            {
              id: '0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a',
              chain: 'arb',
              name: 'Magic Internet Money',
              symbol: 'MIM',
              display_symbol: null,
              optimized_symbol: 'MIM',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/arb_token/logo_url/0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a/7d0c0fb6eab1b7a8a9bfb7dcc04cb11e.png',
              protocol_id: 'arb_multichain',
              price: 0.9975207468554901,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1631595191.0,
              amount: 3.1975771628918585e-10,
            },
            {
              id: '0x17fc002b466eec40dae837fc4be5c67993ddbd6f',
              chain: 'arb',
              name: 'Frax',
              symbol: 'FRAX',
              display_symbol: null,
              optimized_symbol: 'FRAX',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/arb_token/logo_url/0x17fc002b466eec40dae837fc4be5c67993ddbd6f/4f323e33bfffa864c577e7bd2a3257c9.png',
              protocol_id: 'arb_frax',
              price: 0.9993261061309677,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1632766868.0,
              amount: 0.027647929356042458,
            },
            {
              id: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
              chain: 'arb',
              name: 'Dai Stablecoin',
              symbol: 'DAI',
              display_symbol: null,
              optimized_symbol: 'DAI',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/arb_token/logo_url/0xda10009cbd5d07dd0cecc66161fc93d7c9000da1/549c4205dbb199f1b8b03af783f35e71.png',
              protocol_id: '',
              price: 0.99995,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1632133487.0,
              amount: 0.027778020778710312,
            },
            {
              id: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
              chain: 'arb',
              name: 'USD Coin',
              symbol: 'USDC',
              display_symbol: null,
              optimized_symbol: 'USDC',
              decimals: 6,
              logo_url:
                'https://static.debank.com/image/arb_token/logo_url/0xaf88d065e77c8cc2239327c5edb3a432268e5831/fffcd27b9efff5a86ab942084c05924d.png',
              protocol_id: '',
              price: 1.0,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1667248932.0,
              amount: 0.07524883048428659,
            },
          ],
          update_at: 1698139216.0,
          name: 'Staked',
          detail_types: ['common'],
          detail: {
            supply_token_list: [
              {
                id: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
                chain: 'arb',
                name: 'Wrapped BTC',
                symbol: 'WBTC',
                display_symbol: null,
                optimized_symbol: 'WBTC',
                decimals: 8,
                logo_url:
                  'https://static.debank.com/image/arb_token/logo_url/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f/d3c52e7c7449afa8bd4fad1c93f50d93.png',
                protocol_id: '',
                price: 34446.5,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1623867469.0,
                amount: 8.448833823811256e-6,
              },
              {
                id: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
                chain: 'arb',
                name: 'Wrapped Ether',
                symbol: 'WETH',
                display_symbol: null,
                optimized_symbol: 'WETH',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/arb_token/logo_url/0x82af49447d8a07e3bd95bd0d56f35241523fbab1/61844453e63cf81301f845d7864236f6.png',
                protocol_id: '',
                price: 1828.93,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1622346702.0,
                amount: 0.00014569191394862938,
              },
              {
                id: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
                chain: 'arb',
                name: 'USD Coin (Arb1)',
                symbol: 'USDC',
                display_symbol: 'USDC(Bridged)',
                optimized_symbol: 'USDC(Bridged)',
                decimals: 6,
                logo_url: 'https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png',
                protocol_id: 'arb_tracer',
                price: 1.0,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1623868379.0,
                amount: 0.21543311501663281,
              },
              {
                id: '0xf97f4df75117a78c1a5a0dbb814af92458539fb4',
                chain: 'arb',
                name: 'ChainLink Token',
                symbol: 'LINK',
                display_symbol: null,
                optimized_symbol: 'LINK',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/arb_token/logo_url/0xf97f4df75117a78c1a5a0dbb814af92458539fb4/69425617db0ef93a7c21c4f9b81c7ca5.png',
                protocol_id: '',
                price: 10.501624881785883,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1623867040.0,
                amount: 0.0012742551372403107,
              },
              {
                id: '0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0',
                chain: 'arb',
                name: 'Uniswap',
                symbol: 'UNI',
                display_symbol: null,
                optimized_symbol: 'UNI',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/arb_token/logo_url/0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0/fcee0c46fc9864f48ce6a40ed1cdd135.png',
                protocol_id: 'arb_uniswap3',
                price: 4.363395662983691,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1623867248.0,
                amount: 0.001397928521988464,
              },
              {
                id: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
                chain: 'arb',
                name: 'Tether USD',
                symbol: 'USDT',
                display_symbol: null,
                optimized_symbol: 'USDT',
                decimals: 6,
                logo_url: 'https://static.debank.com/image/coin/logo_url/usdt/23af7472292cb41dc39b3f1146ead0fe.png',
                protocol_id: 'arb_rhino',
                price: 1.000155,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1630432123.0,
                amount: 0.015065826076403742,
              },
              {
                id: '0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a',
                chain: 'arb',
                name: 'Magic Internet Money',
                symbol: 'MIM',
                display_symbol: null,
                optimized_symbol: 'MIM',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/arb_token/logo_url/0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a/7d0c0fb6eab1b7a8a9bfb7dcc04cb11e.png',
                protocol_id: 'arb_multichain',
                price: 0.9975207468554901,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1631595191.0,
                amount: 3.1975771628918585e-10,
              },
              {
                id: '0x17fc002b466eec40dae837fc4be5c67993ddbd6f',
                chain: 'arb',
                name: 'Frax',
                symbol: 'FRAX',
                display_symbol: null,
                optimized_symbol: 'FRAX',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/arb_token/logo_url/0x17fc002b466eec40dae837fc4be5c67993ddbd6f/4f323e33bfffa864c577e7bd2a3257c9.png',
                protocol_id: 'arb_frax',
                price: 0.9993261061309677,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1632766868.0,
                amount: 0.027647929356042458,
              },
              {
                id: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
                chain: 'arb',
                name: 'Dai Stablecoin',
                symbol: 'DAI',
                display_symbol: null,
                optimized_symbol: 'DAI',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/arb_token/logo_url/0xda10009cbd5d07dd0cecc66161fc93d7c9000da1/549c4205dbb199f1b8b03af783f35e71.png',
                protocol_id: '',
                price: 0.99995,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1632133487.0,
                amount: 0.027778020778710312,
              },
              {
                id: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
                chain: 'arb',
                name: 'USD Coin',
                symbol: 'USDC',
                display_symbol: null,
                optimized_symbol: 'USDC',
                decimals: 6,
                logo_url:
                  'https://static.debank.com/image/arb_token/logo_url/0xaf88d065e77c8cc2239327c5edb3a432268e5831/fffcd27b9efff5a86ab942084c05924d.png',
                protocol_id: '',
                price: 1.0,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1667248932.0,
                amount: 0.07524883048428659,
              },
            ],
            description: 'SY GLP',
          },
          proxy_detail: {},
          pool: {
            id: '0x2066a650af4b6895f72e618587aad5e8120b7790',
            chain: 'arb',
            project_id: 'arb_pendle2',
            adapter_id: 'token_parse_staked_adapter',
            controller: '0x2066a650af4b6895f72e618587aad5e8120b7790',
            index: null,
            time_at: 1676971138,
          },
        },
        {
          stats: {
            asset_usd_value: 0.00428288850776904,
            debt_usd_value: 0,
            net_usd_value: 0.00428288850776904,
          },
          asset_dict: {
            '0x4a8e64c3a66ce0830e3bf2ea7863b013aa592114': 0.10001102517929267,
          },
          asset_token_list: [
            {
              id: '0x4a8e64c3a66ce0830e3bf2ea7863b013aa592114',
              chain: 'arb',
              name: 'YT gDAI 28MAR2024',
              symbol: 'YT-gDAI-28MAR2024',
              display_symbol: null,
              optimized_symbol: 'YT-gDAI-28MAR2024',
              decimals: 18,
              logo_url: null,
              protocol_id: 'arb_pendle2',
              price: 0.04282416363686885,
              is_verified: false,
              is_core: false,
              is_wallet: false,
              time_at: 1678175030.0,
              amount: 0.10001102517929267,
            },
          ],
          update_at: 1698139216.0,
          name: 'Deposit',
          detail_types: ['common'],
          detail: {
            supply_token_list: [
              {
                id: '0x4a8e64c3a66ce0830e3bf2ea7863b013aa592114',
                chain: 'arb',
                name: 'YT gDAI 28MAR2024',
                symbol: 'YT-gDAI-28MAR2024',
                display_symbol: null,
                optimized_symbol: 'YT-gDAI-28MAR2024',
                decimals: 18,
                logo_url: null,
                protocol_id: 'arb_pendle2',
                price: 0.04282416363686885,
                is_verified: false,
                is_core: false,
                is_wallet: false,
                time_at: 1678175030.0,
                amount: 0.10001102517929267,
              },
            ],
          },
          proxy_detail: {},
          pool: {
            id: '0x4a8e64c3a66ce0830e3bf2ea7863b013aa592114',
            chain: 'arb',
            project_id: 'arb_pendle2',
            adapter_id: 'pendle_deposited',
            controller: '0x4a8e64c3a66ce0830e3bf2ea7863b013aa592114',
            index: null,
            time_at: 1678175030,
          },
        },
        {
          stats: {
            asset_usd_value: 0.14575172856998997,
            debt_usd_value: 0,
            net_usd_value: 0.14575172856998997,
          },
          asset_dict: {
            '0x56051f8e46b67b4d286454995dbc6f5f3c433e34': 2.8931625033402963,
          },
          asset_token_list: [
            {
              id: '0x56051f8e46b67b4d286454995dbc6f5f3c433e34',
              chain: 'arb',
              name: 'YT GLP 28MAR2024',
              symbol: 'YT-GLP-28MAR2024',
              display_symbol: null,
              optimized_symbol: 'YT-GLP-28MAR2024',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/arb_token/logo_url/0x56051f8e46b67b4d286454995dbc6f5f3c433e34/bdc797feb424aa9f05436df00303e87b.png',
              protocol_id: 'arb_pendle2',
              price: 0.050377995844240527,
              is_verified: true,
              is_core: false,
              is_wallet: false,
              time_at: 1676971227.0,
              amount: 2.8931625033402963,
            },
          ],
          update_at: 1698139216.0,
          name: 'Deposit',
          detail_types: ['common'],
          detail: {
            supply_token_list: [
              {
                id: '0x56051f8e46b67b4d286454995dbc6f5f3c433e34',
                chain: 'arb',
                name: 'YT GLP 28MAR2024',
                symbol: 'YT-GLP-28MAR2024',
                display_symbol: null,
                optimized_symbol: 'YT-GLP-28MAR2024',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/arb_token/logo_url/0x56051f8e46b67b4d286454995dbc6f5f3c433e34/bdc797feb424aa9f05436df00303e87b.png',
                protocol_id: 'arb_pendle2',
                price: 0.050377995844240527,
                is_verified: true,
                is_core: false,
                is_wallet: false,
                time_at: 1676971227.0,
                amount: 2.8931625033402963,
              },
            ],
          },
          proxy_detail: {},
          pool: {
            id: '0x56051f8e46b67b4d286454995dbc6f5f3c433e34',
            chain: 'arb',
            project_id: 'arb_pendle2',
            adapter_id: 'pendle_deposited',
            controller: '0x56051f8e46b67b4d286454995dbc6f5f3c433e34',
            index: null,
            time_at: 1676971227,
          },
        },
        {
          stats: {
            asset_usd_value: 0.8389133409445206,
            debt_usd_value: 0,
            net_usd_value: 0.8389133409445206,
          },
          asset_dict: {
            '0x7d180a4f451fc15b543b5d1ba7dda6b3014a4c49': 0.864431,
          },
          asset_token_list: [
            {
              id: '0x7d180a4f451fc15b543b5d1ba7dda6b3014a4c49',
              chain: 'arb',
              name: 'PT Stargate USDT 27JUN2024',
              symbol: 'PT-Stargate USDT-27JUN2024',
              display_symbol: null,
              optimized_symbol: 'PT-Stargate USDT-27JUN2024',
              decimals: 6,
              logo_url: null,
              protocol_id: 'arb_pendle2',
              price: 0.9704803980242734,
              is_verified: false,
              is_core: false,
              is_wallet: false,
              time_at: 1679627765.0,
              amount: 0.864431,
            },
          ],
          update_at: 1698139216.0,
          name: 'Deposit',
          detail_types: ['common'],
          detail: {
            supply_token_list: [
              {
                id: '0x7d180a4f451fc15b543b5d1ba7dda6b3014a4c49',
                chain: 'arb',
                name: 'PT Stargate USDT 27JUN2024',
                symbol: 'PT-Stargate USDT-27JUN2024',
                display_symbol: null,
                optimized_symbol: 'PT-Stargate USDT-27JUN2024',
                decimals: 6,
                logo_url: null,
                protocol_id: 'arb_pendle2',
                price: 0.9704803980242734,
                is_verified: false,
                is_core: false,
                is_wallet: false,
                time_at: 1679627765.0,
                amount: 0.864431,
              },
            ],
          },
          proxy_detail: {},
          pool: {
            id: '0x7d180a4f451fc15b543b5d1ba7dda6b3014a4c49',
            chain: 'arb',
            project_id: 'arb_pendle2',
            adapter_id: 'pendle_deposited',
            controller: '0x7d180a4f451fc15b543b5d1ba7dda6b3014a4c49',
            index: null,
            time_at: 1679627765,
          },
        },
        {
          stats: {
            asset_usd_value: 0.08794482704192781,
            debt_usd_value: 0,
            net_usd_value: 0.08794482704192781,
          },
          asset_dict: {
            '0x96015d0fb97139567a9ba675951816a0bb719e3c': 0.08849849973146062,
          },
          asset_token_list: [
            {
              id: '0x96015d0fb97139567a9ba675951816a0bb719e3c',
              chain: 'arb',
              name: 'PT GLP 28MAR2024',
              symbol: 'PT-GLP-28MAR2024',
              display_symbol: null,
              optimized_symbol: 'PT-GLP-28MAR2024',
              decimals: 18,
              logo_url: null,
              protocol_id: 'arb_pendle2',
              price: 0.9937437053598324,
              is_verified: false,
              is_core: false,
              is_wallet: false,
              time_at: 1676971227.0,
              amount: 0.08849849973146062,
            },
          ],
          update_at: 1698139216.0,
          name: 'Deposit',
          detail_types: ['common'],
          detail: {
            supply_token_list: [
              {
                id: '0x96015d0fb97139567a9ba675951816a0bb719e3c',
                chain: 'arb',
                name: 'PT GLP 28MAR2024',
                symbol: 'PT-GLP-28MAR2024',
                display_symbol: null,
                optimized_symbol: 'PT-GLP-28MAR2024',
                decimals: 18,
                logo_url: null,
                protocol_id: 'arb_pendle2',
                price: 0.9937437053598324,
                is_verified: false,
                is_core: false,
                is_wallet: false,
                time_at: 1676971227.0,
                amount: 0.08849849973146062,
              },
            ],
          },
          proxy_detail: {},
          pool: {
            id: '0x96015d0fb97139567a9ba675951816a0bb719e3c',
            chain: 'arb',
            project_id: 'arb_pendle2',
            adapter_id: 'pendle_deposited',
            controller: '0x96015d0fb97139567a9ba675951816a0bb719e3c',
            index: null,
            time_at: 1676971227,
          },
        },
        {
          stats: {
            asset_usd_value: 1.1584852855617316,
            debt_usd_value: 0,
            net_usd_value: 1.1584852855617316,
          },
          asset_dict: {
            '0xbb33e51bdc598d710ff59fdf523e80ab7c882c83': 0.000637495251067499,
          },
          asset_token_list: [
            {
              id: '0xbb33e51bdc598d710ff59fdf523e80ab7c882c83',
              chain: 'arb',
              name: 'PT wstETH 28DEC2023',
              symbol: 'PT-wstETH-28DEC2023',
              display_symbol: null,
              optimized_symbol: 'PT-wstETH-28DEC2023',
              decimals: 18,
              logo_url: null,
              protocol_id: 'arb_pendle2',
              price: 1817.2453577055264,
              is_verified: false,
              is_core: false,
              is_wallet: false,
              time_at: 1689662350.0,
              amount: 0.000637495251067499,
            },
          ],
          update_at: 1698139216.0,
          name: 'Deposit',
          detail_types: ['common'],
          detail: {
            supply_token_list: [
              {
                id: '0xbb33e51bdc598d710ff59fdf523e80ab7c882c83',
                chain: 'arb',
                name: 'PT wstETH 28DEC2023',
                symbol: 'PT-wstETH-28DEC2023',
                display_symbol: null,
                optimized_symbol: 'PT-wstETH-28DEC2023',
                decimals: 18,
                logo_url: null,
                protocol_id: 'arb_pendle2',
                price: 1817.2453577055264,
                is_verified: false,
                is_core: false,
                is_wallet: false,
                time_at: 1689662350.0,
                amount: 0.000637495251067499,
              },
            ],
          },
          proxy_detail: {},
          pool: {
            id: '0xbb33e51bdc598d710ff59fdf523e80ab7c882c83',
            chain: 'arb',
            project_id: 'arb_pendle2',
            adapter_id: 'pendle_deposited',
            controller: '0xbb33e51bdc598d710ff59fdf523e80ab7c882c83',
            index: null,
            time_at: 1689662350,
          },
        },
      ],
    },
    {
      id: 'arb_gmx',
      chain: 'arb',
      name: 'GMX',
      site_url: 'https://gmx.io',
      logo_url: 'https://static.debank.com/image/project/logo_url/arb_gmx/1a57f390512f4fe108c2b7155dc1fb6d.png',
      has_supported_portfolio: true,
      tvl: 641337556.6514765,
      portfolio_item_list: [
        {
          stats: {
            asset_usd_value: 0.15361496640448216,
            debt_usd_value: 0,
            net_usd_value: 0.15361496640448216,
          },
          asset_dict: {
            '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f': 1.3764352455953654e-6,
            '0x82af49447d8a07e3bd95bd0d56f35241523fbab1': 2.3767711848953198e-5,
            '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8': 0.0351551304851353,
            '0xf97f4df75117a78c1a5a0dbb814af92458539fb4': 0.00020330969096359143,
            '0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0': 0.00022804703725569223,
            '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9': 0.0024620277764086096,
            '0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a': 5.218753217891915e-11,
            '0x17fc002b466eec40dae837fc4be5c67993ddbd6f': 0.004523962322485713,
            '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1': 0.004533855685358674,
            '0xaf88d065e77c8cc2239327c5edb3a432268e5831': 0.012268090431372893,
            '0xf42ae1d54fd613c9bb14810b0588faaa09a426ca': 0.0,
            arb: 3.61847593215e-7,
          },
          asset_token_list: [
            {
              id: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
              chain: 'arb',
              name: 'Wrapped BTC',
              symbol: 'WBTC',
              display_symbol: null,
              optimized_symbol: 'WBTC',
              decimals: 8,
              logo_url:
                'https://static.debank.com/image/arb_token/logo_url/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f/d3c52e7c7449afa8bd4fad1c93f50d93.png',
              protocol_id: '',
              price: 34446.5,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1623867469.0,
              amount: 1.3764352455953654e-6,
            },
            {
              id: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
              chain: 'arb',
              name: 'Wrapped Ether',
              symbol: 'WETH',
              display_symbol: null,
              optimized_symbol: 'WETH',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/arb_token/logo_url/0x82af49447d8a07e3bd95bd0d56f35241523fbab1/61844453e63cf81301f845d7864236f6.png',
              protocol_id: '',
              price: 1828.93,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1622346702.0,
              amount: 2.3767711848953198e-5,
            },
            {
              id: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
              chain: 'arb',
              name: 'USD Coin (Arb1)',
              symbol: 'USDC',
              display_symbol: 'USDC(Bridged)',
              optimized_symbol: 'USDC(Bridged)',
              decimals: 6,
              logo_url: 'https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png',
              protocol_id: 'arb_tracer',
              price: 1.0,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1623868379.0,
              amount: 0.0351551304851353,
            },
            {
              id: '0xf97f4df75117a78c1a5a0dbb814af92458539fb4',
              chain: 'arb',
              name: 'ChainLink Token',
              symbol: 'LINK',
              display_symbol: null,
              optimized_symbol: 'LINK',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/arb_token/logo_url/0xf97f4df75117a78c1a5a0dbb814af92458539fb4/69425617db0ef93a7c21c4f9b81c7ca5.png',
              protocol_id: '',
              price: 10.501624881785883,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1623867040.0,
              amount: 0.00020330969096359143,
            },
            {
              id: '0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0',
              chain: 'arb',
              name: 'Uniswap',
              symbol: 'UNI',
              display_symbol: null,
              optimized_symbol: 'UNI',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/arb_token/logo_url/0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0/fcee0c46fc9864f48ce6a40ed1cdd135.png',
              protocol_id: 'arb_uniswap3',
              price: 4.363395662983691,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1623867248.0,
              amount: 0.00022804703725569223,
            },
            {
              id: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
              chain: 'arb',
              name: 'Tether USD',
              symbol: 'USDT',
              display_symbol: null,
              optimized_symbol: 'USDT',
              decimals: 6,
              logo_url: 'https://static.debank.com/image/coin/logo_url/usdt/23af7472292cb41dc39b3f1146ead0fe.png',
              protocol_id: 'arb_rhino',
              price: 1.000155,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1630432123.0,
              amount: 0.0024620277764086096,
            },
            {
              id: '0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a',
              chain: 'arb',
              name: 'Magic Internet Money',
              symbol: 'MIM',
              display_symbol: null,
              optimized_symbol: 'MIM',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/arb_token/logo_url/0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a/7d0c0fb6eab1b7a8a9bfb7dcc04cb11e.png',
              protocol_id: 'arb_multichain',
              price: 0.9975207468554901,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1631595191.0,
              amount: 5.218753217891915e-11,
            },
            {
              id: '0x17fc002b466eec40dae837fc4be5c67993ddbd6f',
              chain: 'arb',
              name: 'Frax',
              symbol: 'FRAX',
              display_symbol: null,
              optimized_symbol: 'FRAX',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/arb_token/logo_url/0x17fc002b466eec40dae837fc4be5c67993ddbd6f/4f323e33bfffa864c577e7bd2a3257c9.png',
              protocol_id: 'arb_frax',
              price: 0.9993261061309677,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1632766868.0,
              amount: 0.004523962322485713,
            },
            {
              id: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
              chain: 'arb',
              name: 'Dai Stablecoin',
              symbol: 'DAI',
              display_symbol: null,
              optimized_symbol: 'DAI',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/arb_token/logo_url/0xda10009cbd5d07dd0cecc66161fc93d7c9000da1/549c4205dbb199f1b8b03af783f35e71.png',
              protocol_id: '',
              price: 0.99995,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1632133487.0,
              amount: 0.004533855685358674,
            },
            {
              id: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
              chain: 'arb',
              name: 'USD Coin',
              symbol: 'USDC',
              display_symbol: null,
              optimized_symbol: 'USDC',
              decimals: 6,
              logo_url:
                'https://static.debank.com/image/arb_token/logo_url/0xaf88d065e77c8cc2239327c5edb3a432268e5831/fffcd27b9efff5a86ab942084c05924d.png',
              protocol_id: '',
              price: 1.0,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1667248932.0,
              amount: 0.012268090431372893,
            },
            {
              id: '0xf42ae1d54fd613c9bb14810b0588faaa09a426ca',
              chain: 'arb',
              name: 'Escrowed GMX',
              symbol: 'esGMX',
              display_symbol: null,
              optimized_symbol: 'esGMX',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/arb_token/logo_url/0xf42ae1d54fd613c9bb14810b0588faaa09a426ca/28fd1e74e9f42ad073992bc8359a073a.png',
              protocol_id: 'arb_gmx',
              price: 0,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1626958493.0,
              amount: 0.0,
            },
            {
              id: 'arb',
              chain: 'arb',
              name: 'ETH',
              symbol: 'ETH',
              display_symbol: null,
              optimized_symbol: 'ETH',
              decimals: 18,
              logo_url: 'https://static.debank.com/image/arb_token/logo_url/arb/d61441782d4a08a7479d54aea211679e.png',
              protocol_id: '',
              price: 1828.93,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1622131200.0,
              amount: 3.61847593215e-7,
            },
          ],
          update_at: 1698139216.0,
          name: 'Staked',
          detail_types: ['common'],
          detail: {
            supply_token_list: [
              {
                id: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
                chain: 'arb',
                name: 'Wrapped BTC',
                symbol: 'WBTC',
                display_symbol: null,
                optimized_symbol: 'WBTC',
                decimals: 8,
                logo_url:
                  'https://static.debank.com/image/arb_token/logo_url/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f/d3c52e7c7449afa8bd4fad1c93f50d93.png',
                protocol_id: '',
                price: 34446.5,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1623867469.0,
                amount: 1.3764352455953654e-6,
              },
              {
                id: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
                chain: 'arb',
                name: 'Wrapped Ether',
                symbol: 'WETH',
                display_symbol: null,
                optimized_symbol: 'WETH',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/arb_token/logo_url/0x82af49447d8a07e3bd95bd0d56f35241523fbab1/61844453e63cf81301f845d7864236f6.png',
                protocol_id: '',
                price: 1828.93,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1622346702.0,
                amount: 2.3767711848953198e-5,
              },
              {
                id: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
                chain: 'arb',
                name: 'USD Coin (Arb1)',
                symbol: 'USDC',
                display_symbol: 'USDC(Bridged)',
                optimized_symbol: 'USDC(Bridged)',
                decimals: 6,
                logo_url: 'https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png',
                protocol_id: 'arb_tracer',
                price: 1.0,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1623868379.0,
                amount: 0.0351551304851353,
              },
              {
                id: '0xf97f4df75117a78c1a5a0dbb814af92458539fb4',
                chain: 'arb',
                name: 'ChainLink Token',
                symbol: 'LINK',
                display_symbol: null,
                optimized_symbol: 'LINK',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/arb_token/logo_url/0xf97f4df75117a78c1a5a0dbb814af92458539fb4/69425617db0ef93a7c21c4f9b81c7ca5.png',
                protocol_id: '',
                price: 10.501624881785883,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1623867040.0,
                amount: 0.00020330969096359143,
              },
              {
                id: '0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0',
                chain: 'arb',
                name: 'Uniswap',
                symbol: 'UNI',
                display_symbol: null,
                optimized_symbol: 'UNI',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/arb_token/logo_url/0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0/fcee0c46fc9864f48ce6a40ed1cdd135.png',
                protocol_id: 'arb_uniswap3',
                price: 4.363395662983691,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1623867248.0,
                amount: 0.00022804703725569223,
              },
              {
                id: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
                chain: 'arb',
                name: 'Tether USD',
                symbol: 'USDT',
                display_symbol: null,
                optimized_symbol: 'USDT',
                decimals: 6,
                logo_url: 'https://static.debank.com/image/coin/logo_url/usdt/23af7472292cb41dc39b3f1146ead0fe.png',
                protocol_id: 'arb_rhino',
                price: 1.000155,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1630432123.0,
                amount: 0.0024620277764086096,
              },
              {
                id: '0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a',
                chain: 'arb',
                name: 'Magic Internet Money',
                symbol: 'MIM',
                display_symbol: null,
                optimized_symbol: 'MIM',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/arb_token/logo_url/0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a/7d0c0fb6eab1b7a8a9bfb7dcc04cb11e.png',
                protocol_id: 'arb_multichain',
                price: 0.9975207468554901,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1631595191.0,
                amount: 5.218753217891915e-11,
              },
              {
                id: '0x17fc002b466eec40dae837fc4be5c67993ddbd6f',
                chain: 'arb',
                name: 'Frax',
                symbol: 'FRAX',
                display_symbol: null,
                optimized_symbol: 'FRAX',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/arb_token/logo_url/0x17fc002b466eec40dae837fc4be5c67993ddbd6f/4f323e33bfffa864c577e7bd2a3257c9.png',
                protocol_id: 'arb_frax',
                price: 0.9993261061309677,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1632766868.0,
                amount: 0.004523962322485713,
              },
              {
                id: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
                chain: 'arb',
                name: 'Dai Stablecoin',
                symbol: 'DAI',
                display_symbol: null,
                optimized_symbol: 'DAI',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/arb_token/logo_url/0xda10009cbd5d07dd0cecc66161fc93d7c9000da1/549c4205dbb199f1b8b03af783f35e71.png',
                protocol_id: '',
                price: 0.99995,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1632133487.0,
                amount: 0.004533855685358674,
              },
              {
                id: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
                chain: 'arb',
                name: 'USD Coin',
                symbol: 'USDC',
                display_symbol: null,
                optimized_symbol: 'USDC',
                decimals: 6,
                logo_url:
                  'https://static.debank.com/image/arb_token/logo_url/0xaf88d065e77c8cc2239327c5edb3a432268e5831/fffcd27b9efff5a86ab942084c05924d.png',
                protocol_id: '',
                price: 1.0,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1667248932.0,
                amount: 0.012268090431372893,
              },
            ],
            reward_token_list: [
              {
                id: '0xf42ae1d54fd613c9bb14810b0588faaa09a426ca',
                chain: 'arb',
                name: 'Escrowed GMX',
                symbol: 'esGMX',
                display_symbol: null,
                optimized_symbol: 'esGMX',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/arb_token/logo_url/0xf42ae1d54fd613c9bb14810b0588faaa09a426ca/28fd1e74e9f42ad073992bc8359a073a.png',
                protocol_id: 'arb_gmx',
                price: 0,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1626958493.0,
                amount: 0.0,
              },
              {
                id: 'arb',
                chain: 'arb',
                name: 'ETH',
                symbol: 'ETH',
                display_symbol: null,
                optimized_symbol: 'ETH',
                decimals: 18,
                logo_url: 'https://static.debank.com/image/arb_token/logo_url/arb/d61441782d4a08a7479d54aea211679e.png',
                protocol_id: '',
                price: 1828.93,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1622131200.0,
                amount: 3.61847593215e-7,
              },
            ],
          },
          proxy_detail: {},
          pool: {
            id: '0x1addd80e6039594ee970e5872d247bf0414c8903:0x4e971a87900b931ff39d1aad67697f49835400b6',
            chain: 'arb',
            project_id: 'arb_gmx',
            adapter_id: 'gmx_staking',
            controller: '0x1addd80e6039594ee970e5872d247bf0414c8903',
            index: '0x4e971a87900b931ff39d1aad67697f49835400b6',
            time_at: 1628757069,
          },
        },
      ],
    },
    {
      id: 'aave3',
      chain: 'eth',
      name: 'Aave V3',
      site_url: 'https://app.aave.com',
      logo_url: 'https://static.debank.com/image/project/logo_url/aave3/07bc2403c8c357d2317db15d64872314.png',
      has_supported_portfolio: true,
      tvl: 2519496441.1399055,
      portfolio_item_list: [
        {
          stats: {
            asset_usd_value: 1.110129,
            debt_usd_value: 0.49128061947553026,
            net_usd_value: 0.6188483805244697,
          },
          asset_dict: {
            '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': 1.110129,
            eth: -0.0001090236349370474,
            '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f': -4.728485394832e-6,
            '0xba100000625a3754423978a60c9317c58a424e3d': -2.38521589422e-7,
            '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984': -0.01003244662335775,
            '0x5a98fcbea516cf06857215779fd812ca3bef1b32': -0.004088035092993069,
            '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72': -1.1811393e-11,
            '0x111111111117dc0aa78b770fa6a738034120c302': -1.0677514064e-8,
            '0x853d955acef822db058eb8505911ed77f175b99e': -1.7857002127781e-5,
            '0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f': -0.000349146684184387,
            '0xd33526068d116ce69f19a9ee46f0bd304f21a51f': -0.010071304391317138,
          },
          asset_token_list: [
            {
              id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
              chain: 'eth',
              name: 'USD Coin',
              symbol: 'USDC',
              display_symbol: null,
              optimized_symbol: 'USDC',
              decimals: 6,
              logo_url: 'https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png',
              protocol_id: '',
              price: 1.0,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1533324504.0,
              amount: 1.110129,
            },
            {
              id: 'eth',
              chain: 'eth',
              name: 'ETH',
              symbol: 'ETH',
              display_symbol: null,
              optimized_symbol: 'ETH',
              decimals: 18,
              logo_url: 'https://static.debank.com/image/token/logo_url/eth/935ae4e4d1d12d59a99717a24f2540b5.png',
              protocol_id: '',
              price: 1828.93,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1483200000.0,
              amount: -0.0001090236349370474,
            },
            {
              id: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
              chain: 'eth',
              name: 'Synthetix Network Token',
              symbol: 'SNX',
              display_symbol: null,
              optimized_symbol: 'SNX',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/eth_token/logo_url/0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f/fb568c26c7902169572abe8fa966e791.png',
              protocol_id: 'synthetix',
              price: 2.3129513571326967,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1565329008.0,
              amount: -4.728485394832e-6,
            },
            {
              id: '0xba100000625a3754423978a60c9317c58a424e3d',
              chain: 'eth',
              name: 'Balancer',
              symbol: 'BAL',
              display_symbol: null,
              optimized_symbol: 'BAL',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/eth_token/logo_url/0xba100000625a3754423978a60c9317c58a424e3d/52990c207f4001bd9090dfd90e54374a.png',
              protocol_id: 'balancer',
              price: 3.4069358355362804,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1592616779.0,
              amount: -2.38521589422e-7,
            },
            {
              id: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
              chain: 'eth',
              name: 'Uniswap',
              symbol: 'UNI',
              display_symbol: null,
              optimized_symbol: 'UNI',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/eth_token/logo_url/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984/fcee0c46fc9864f48ce6a40ed1cdd135.png',
              protocol_id: 'uniswap3',
              price: 4.363395662983691,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1600107086.0,
              amount: -0.01003244662335775,
            },
            {
              id: '0x5a98fcbea516cf06857215779fd812ca3bef1b32',
              chain: 'eth',
              name: 'Lido DAO Token',
              symbol: 'LDO',
              display_symbol: null,
              optimized_symbol: 'LDO',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/eth_token/logo_url/0x5a98fcbea516cf06857215779fd812ca3bef1b32/3a1a90da5ccd4849de3e83755f1fd8b5.png',
              protocol_id: 'lido',
              price: 1.7938972628184213,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1608242396.0,
              amount: -0.004088035092993069,
            },
            {
              id: '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72',
              chain: 'eth',
              name: 'Ethereum Name Service',
              symbol: 'ENS',
              display_symbol: null,
              optimized_symbol: 'ENS',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/eth_token/logo_url/0xc18360217d8f7ab5e7c516566761ea12ce7f9d72/034d454d78d7be7f9675066fdb63e114.png',
              protocol_id: 'ens',
              price: 7.785966691418764,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1635800117.0,
              amount: -1.1811393e-11,
            },
            {
              id: '0x111111111117dc0aa78b770fa6a738034120c302',
              chain: 'eth',
              name: '1INCH Token',
              symbol: '1INCH',
              display_symbol: null,
              optimized_symbol: '1INCH',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/eth_token/logo_url/0x111111111117dc0aa78b770fa6a738034120c302/2441b15b32406dc7d163ba4c1c6981d3.png',
              protocol_id: '1inch2',
              price: 0.2895445008029117,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1608747211.0,
              amount: -1.0677514064e-8,
            },
            {
              id: '0x853d955acef822db058eb8505911ed77f175b99e',
              chain: 'eth',
              name: 'Frax',
              symbol: 'FRAX',
              display_symbol: null,
              optimized_symbol: 'FRAX',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/eth_token/logo_url/0x853d955acef822db058eb8505911ed77f175b99e/4f323e33bfffa864c577e7bd2a3257c9.png',
              protocol_id: 'frax',
              price: 0.9996577338984929,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1608140520.0,
              amount: -1.7857002127781e-5,
            },
            {
              id: '0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f',
              chain: 'eth',
              name: 'Gho Token',
              symbol: 'GHO',
              display_symbol: null,
              optimized_symbol: 'GHO',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/eth_token/logo_url/0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f/f6cc1d86bdf590208ab77700488d25c3.png',
              protocol_id: '',
              price: 0.9697093667425924,
              is_verified: false,
              is_core: true,
              is_wallet: true,
              time_at: 1689420227.0,
              amount: -0.000349146684184387,
            },
            {
              id: '0xd33526068d116ce69f19a9ee46f0bd304f21a51f',
              chain: 'eth',
              name: 'Rocket Pool Protocol',
              symbol: 'RPL',
              display_symbol: null,
              optimized_symbol: 'RPL',
              decimals: 18,
              logo_url:
                'https://static.debank.com/image/eth_token/logo_url/0xd33526068d116ce69f19a9ee46f0bd304f21a51f/0dac0c5e1dd543fb62581f0756e0b11f.png',
              protocol_id: 'rocketpool',
              price: 23.87047299652043,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1632980703.0,
              amount: -0.010071304391317138,
            },
          ],
          update_at: 1698139216.0,
          name: 'Lending',
          detail_types: ['lending'],
          detail: {
            supply_token_list: [
              {
                id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
                chain: 'eth',
                name: 'USD Coin',
                symbol: 'USDC',
                display_symbol: null,
                optimized_symbol: 'USDC',
                decimals: 6,
                logo_url: 'https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png',
                protocol_id: '',
                price: 1.0,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1533324504.0,
                amount: 1.110129,
              },
            ],
            borrow_token_list: [
              {
                id: 'eth',
                chain: 'eth',
                name: 'ETH',
                symbol: 'ETH',
                display_symbol: null,
                optimized_symbol: 'ETH',
                decimals: 18,
                logo_url: 'https://static.debank.com/image/token/logo_url/eth/935ae4e4d1d12d59a99717a24f2540b5.png',
                protocol_id: '',
                price: 1828.93,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1483200000.0,
                amount: 0.0001090236349370474,
              },
              {
                id: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
                chain: 'eth',
                name: 'Synthetix Network Token',
                symbol: 'SNX',
                display_symbol: null,
                optimized_symbol: 'SNX',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/eth_token/logo_url/0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f/fb568c26c7902169572abe8fa966e791.png',
                protocol_id: 'synthetix',
                price: 2.3129513571326967,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1565329008.0,
                amount: 4.728485394832e-6,
              },
              {
                id: '0xba100000625a3754423978a60c9317c58a424e3d',
                chain: 'eth',
                name: 'Balancer',
                symbol: 'BAL',
                display_symbol: null,
                optimized_symbol: 'BAL',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/eth_token/logo_url/0xba100000625a3754423978a60c9317c58a424e3d/52990c207f4001bd9090dfd90e54374a.png',
                protocol_id: 'balancer',
                price: 3.4069358355362804,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1592616779.0,
                amount: 2.38521589422e-7,
              },
              {
                id: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
                chain: 'eth',
                name: 'Uniswap',
                symbol: 'UNI',
                display_symbol: null,
                optimized_symbol: 'UNI',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/eth_token/logo_url/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984/fcee0c46fc9864f48ce6a40ed1cdd135.png',
                protocol_id: 'uniswap3',
                price: 4.363395662983691,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1600107086.0,
                amount: 0.01003244662335775,
              },
              {
                id: '0x5a98fcbea516cf06857215779fd812ca3bef1b32',
                chain: 'eth',
                name: 'Lido DAO Token',
                symbol: 'LDO',
                display_symbol: null,
                optimized_symbol: 'LDO',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/eth_token/logo_url/0x5a98fcbea516cf06857215779fd812ca3bef1b32/3a1a90da5ccd4849de3e83755f1fd8b5.png',
                protocol_id: 'lido',
                price: 1.7938972628184213,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1608242396.0,
                amount: 0.004088035092993069,
              },
              {
                id: '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72',
                chain: 'eth',
                name: 'Ethereum Name Service',
                symbol: 'ENS',
                display_symbol: null,
                optimized_symbol: 'ENS',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/eth_token/logo_url/0xc18360217d8f7ab5e7c516566761ea12ce7f9d72/034d454d78d7be7f9675066fdb63e114.png',
                protocol_id: 'ens',
                price: 7.785966691418764,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1635800117.0,
                amount: 1.1811393e-11,
              },
              {
                id: '0x111111111117dc0aa78b770fa6a738034120c302',
                chain: 'eth',
                name: '1INCH Token',
                symbol: '1INCH',
                display_symbol: null,
                optimized_symbol: '1INCH',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/eth_token/logo_url/0x111111111117dc0aa78b770fa6a738034120c302/2441b15b32406dc7d163ba4c1c6981d3.png',
                protocol_id: '1inch2',
                price: 0.2895445008029117,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1608747211.0,
                amount: 1.0677514064e-8,
              },
              {
                id: '0x853d955acef822db058eb8505911ed77f175b99e',
                chain: 'eth',
                name: 'Frax',
                symbol: 'FRAX',
                display_symbol: null,
                optimized_symbol: 'FRAX',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/eth_token/logo_url/0x853d955acef822db058eb8505911ed77f175b99e/4f323e33bfffa864c577e7bd2a3257c9.png',
                protocol_id: 'frax',
                price: 0.9996577338984929,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1608140520.0,
                amount: 1.7857002127781e-5,
              },
              {
                id: '0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f',
                chain: 'eth',
                name: 'Gho Token',
                symbol: 'GHO',
                display_symbol: null,
                optimized_symbol: 'GHO',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/eth_token/logo_url/0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f/f6cc1d86bdf590208ab77700488d25c3.png',
                protocol_id: '',
                price: 0.9697093667425924,
                is_verified: false,
                is_core: true,
                is_wallet: true,
                time_at: 1689420227.0,
                amount: 0.000349146684184387,
              },
              {
                id: '0xd33526068d116ce69f19a9ee46f0bd304f21a51f',
                chain: 'eth',
                name: 'Rocket Pool Protocol',
                symbol: 'RPL',
                display_symbol: null,
                optimized_symbol: 'RPL',
                decimals: 18,
                logo_url:
                  'https://static.debank.com/image/eth_token/logo_url/0xd33526068d116ce69f19a9ee46f0bd304f21a51f/0dac0c5e1dd543fb62581f0756e0b11f.png',
                protocol_id: 'rocketpool',
                price: 23.87047299652043,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1632980703.0,
                amount: 0.010071304391317138,
              },
            ],
            health_rate: 1.8189655497314938,
          },
          proxy_detail: {},
          pool: {
            id: '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2',
            chain: 'eth',
            project_id: 'aave3',
            adapter_id: 'aave3_proxy_lending',
            controller: '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2',
            index: null,
            time_at: 1672325495,
          },
        },
      ],
    },
    {
      id: 'arb_cream',
      chain: 'arb',
      name: 'Cream',
      site_url: 'https://app.cream.finance',
      logo_url: 'https://static.debank.com/image/project/logo_url/arb_cream/7674526d1fd388a2842be1fc7e21d26e.png',
      has_supported_portfolio: true,
      tvl: 8383.077869477864,
      portfolio_item_list: [
        {
          stats: {
            asset_usd_value: 0.23008420407642932,
            debt_usd_value: 0,
            net_usd_value: 0.23008420407642932,
          },
          asset_dict: {
            '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8': 0.23008420407642932,
          },
          asset_token_list: [
            {
              id: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
              chain: 'arb',
              name: 'USD Coin (Arb1)',
              symbol: 'USDC',
              display_symbol: 'USDC(Bridged)',
              optimized_symbol: 'USDC(Bridged)',
              decimals: 6,
              logo_url: 'https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png',
              protocol_id: 'arb_tracer',
              price: 1.0,
              is_verified: true,
              is_core: true,
              is_wallet: true,
              time_at: 1623868379.0,
              amount: 0.23008420407642932,
            },
          ],
          update_at: 1698139216.0,
          name: 'Lending',
          detail_types: ['lending'],
          detail: {
            supply_token_list: [
              {
                id: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
                chain: 'arb',
                name: 'USD Coin (Arb1)',
                symbol: 'USDC',
                display_symbol: 'USDC(Bridged)',
                optimized_symbol: 'USDC(Bridged)',
                decimals: 6,
                logo_url: 'https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png',
                protocol_id: 'arb_tracer',
                price: 1.0,
                is_verified: true,
                is_core: true,
                is_wallet: true,
                time_at: 1623868379.0,
                amount: 0.23008420407642932,
              },
            ],
          },
          proxy_detail: {},
          pool: {
            id: '0xbadac56c9aca307079e8b8fc699987aac89813ee',
            chain: 'arb',
            project_id: 'arb_cream',
            adapter_id: 'ib_lending',
            controller: '0xbadac56c9aca307079e8b8fc699987aac89813ee',
            index: null,
            time_at: 1630903214,
          },
        },
      ],
    },
  ];

  const allChainList = [
    {
      id: 'eos',
      community_id: 17777,
      name: 'EOS EVM',
      native_token_id: 'eos',
      logo_url: 'https://static.debank.com/image/chain/logo_url/eos/7e3122a9ce6f9d522e6d5519d43b6a72.png',
      wrapped_token_id: '0xc00592aa41d32d137dc480d9f6d0df19b860104f',
      is_support_pre_exec: false,
    },
    {
      id: 'sgb',
      community_id: 19,
      name: 'Songbird',
      native_token_id: 'sgb',
      logo_url: 'https://static.debank.com/image/chain/logo_url/sgb/619f46d574d62a50bdfd9f0e2f47ddc1.png',
      wrapped_token_id: '0x02f0826ef6ad107cfc861152b32b52fd11bab9ed',
      is_support_pre_exec: true,
    },
    {
      id: 'base',
      community_id: 8453,
      name: 'Base',
      native_token_id: 'base',
      logo_url: 'https://static.debank.com/image/chain/logo_url/base/ccc1513e4f390542c4fb2f4b88ce9579.png',
      wrapped_token_id: '0x4200000000000000000000000000000000000006',
      is_support_pre_exec: true,
    },
    {
      id: 'ckb',
      community_id: 71402,
      name: 'Godwoken',
      native_token_id: 'ckb',
      logo_url: 'https://static.debank.com/image/chain/logo_url/ckb/e821893503104870d5e73f56dbd73746.png',
      wrapped_token_id: '0xc296f806d15e97243a08334256c705ba5c5754cd',
      is_support_pre_exec: false,
    },
    {
      id: 'boba',
      community_id: 288,
      name: 'Boba',
      native_token_id: 'boba',
      logo_url: 'https://static.debank.com/image/chain/logo_url/boba/e43d79cd8088ceb3ea3e4a240a75728f.png',
      wrapped_token_id: '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000',
      is_support_pre_exec: true,
    },
    {
      id: 'flr',
      community_id: 14,
      name: 'Flare',
      native_token_id: 'flr',
      logo_url: 'https://static.debank.com/image/chain/logo_url/flr/9ee03d5d7036ad9024e81d55596bb4dc.png',
      wrapped_token_id: '0x1d80c49bbbcd1c0911346656b529df9e5c2f783d',
      is_support_pre_exec: true,
    },
    {
      id: 'eth',
      community_id: 1,
      name: 'Ethereum',
      native_token_id: 'eth',
      logo_url: 'https://static.debank.com/image/chain/logo_url/eth/42ba589cd077e7bdd97db6480b0ff61d.png',
      wrapped_token_id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      is_support_pre_exec: true,
    },
    {
      id: 'tomb',
      community_id: 6969,
      name: 'TOMB Chain',
      native_token_id: 'tomb',
      logo_url: 'https://static.debank.com/image/chain/logo_url/tomb/eee88f95c46faa10762514b44655a6a1.png',
      wrapped_token_id: '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000',
      is_support_pre_exec: true,
    },
    {
      id: 'mobm',
      community_id: 1284,
      name: 'Moonbeam',
      native_token_id: 'mobm',
      logo_url: 'https://static.debank.com/image/chain/logo_url/mobm/a8442077d76b258297181c3e6eb8c9cc.png',
      wrapped_token_id: '0xacc15dc74880c9944775448304b263d191c6077f',
      is_support_pre_exec: true,
    },
    {
      id: 'cfx',
      community_id: 1030,
      name: 'Conflux',
      native_token_id: 'cfx',
      logo_url: 'https://static.debank.com/image/chain/logo_url/cfx/eab0c7304c6820b48b2a8d0930459b82.png',
      wrapped_token_id: '0x14b2d3bc65e74dae1030eafd8ac30c533c976a9b',
      is_support_pre_exec: true,
    },
    {
      id: 'okt',
      community_id: 66,
      name: 'OKC',
      native_token_id: 'okt',
      logo_url: 'https://static.debank.com/image/chain/logo_url/okt/428bf6035abb3863c9f5c1a10dc3afd3.png',
      wrapped_token_id: '0x8f8526dbfd6e38e3d8307702ca8469bae6c56c15',
      is_support_pre_exec: true,
    },
    {
      id: 'mada',
      community_id: 2001,
      name: 'Milkomeda C1',
      native_token_id: 'mada',
      logo_url: 'https://static.debank.com/image/chain/logo_url/mada/cdc4b1112c2c5a2757cbda33f4476b7f.png',
      wrapped_token_id: '0xae83571000af4499798d1e3b0fa0070eb3a3e3f9',
      is_support_pre_exec: false,
    },
    {
      id: 'movr',
      community_id: 1285,
      name: 'Moonriver',
      native_token_id: 'movr',
      logo_url: 'https://static.debank.com/image/chain/logo_url/movr/4b0de5a711b437f187c0d0f15cc0398b.png',
      wrapped_token_id: '0x98878b06940ae243284ca214f92bb71a2b032b8a',
      is_support_pre_exec: true,
    },
    {
      id: 'fx',
      community_id: 530,
      name: 'Function X',
      native_token_id: 'fx',
      logo_url: 'https://static.debank.com/image/chain/logo_url/fx/6fee82420b2394e0b68d7d7e692a0a01.png',
      wrapped_token_id: '0x80b5a32e4f032b2a058b4f29ec95eefeeb87adcd',
      is_support_pre_exec: false,
    },
    {
      id: 'celo',
      community_id: 42220,
      name: 'Celo',
      native_token_id: 'celo',
      logo_url: 'https://static.debank.com/image/chain/logo_url/celo/41da5c1d3c0945ae822a1f85f02c76cf.png',
      wrapped_token_id: '0x471ece3750da237f93b8e339c536989b8978a438',
      is_support_pre_exec: true,
    },
    {
      id: 'btt',
      community_id: 199,
      name: 'BitTorrent',
      native_token_id: 'btt',
      logo_url: 'https://static.debank.com/image/chain/logo_url/btt/2130a8d57ff2a0f3d50a4ec9432897c6.png',
      wrapped_token_id: '0x197a4ed2b1bb607e47a144b9731d7d34f86e9686',
      is_support_pre_exec: true,
    },
    {
      id: 'ftm',
      community_id: 250,
      name: 'Fantom',
      native_token_id: 'ftm',
      logo_url: 'https://static.debank.com/image/chain/logo_url/ftm/14133435f89637157a4405e954e1b1b2.png',
      wrapped_token_id: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
      is_support_pre_exec: true,
    },
    {
      id: 'kcc',
      community_id: 321,
      name: 'KCC',
      native_token_id: 'kcc',
      logo_url: 'https://static.debank.com/image/chain/logo_url/kcc/3a5a4ef7d5f1db1e53880d70219d75b6.png',
      wrapped_token_id: '0x4446fc4eb47f2f6586f9faab68b3498f86c07521',
      is_support_pre_exec: true,
    },
    {
      id: 'zora',
      community_id: 7777777,
      name: 'Zora',
      native_token_id: 'zora',
      logo_url: 'https://static.debank.com/image/chain/logo_url/zora/de39f62c4489a2359d5e1198a8e02ef1.png',
      wrapped_token_id: '0x4200000000000000000000000000000000000006',
      is_support_pre_exec: false,
    },
    {
      id: 'dfk',
      community_id: 53935,
      name: 'DFK',
      native_token_id: 'dfk',
      logo_url: 'https://static.debank.com/image/chain/logo_url/dfk/233867c089c5b71be150aa56003f3f7a.png',
      wrapped_token_id: '0xccb93dabd71c8dad03fc4ce5559dc3d89f67a260',
      is_support_pre_exec: true,
    },
    {
      id: 'metis',
      community_id: 1088,
      name: 'Metis',
      native_token_id: 'metis',
      logo_url: 'https://static.debank.com/image/chain/logo_url/metis/b289da32db4d860ebf6fb46a6e41dcfc.png',
      wrapped_token_id: '0x75cb093e4d61d2a2e65d8e0bbb01de8d89b53481',
      is_support_pre_exec: true,
    },
    {
      id: 'era',
      community_id: 324,
      name: 'zkSync Era',
      native_token_id: 'era',
      logo_url: 'https://static.debank.com/image/chain/logo_url/era/2cfcd0c8436b05d811b03935f6c1d7da.png',
      wrapped_token_id: '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91',
      is_support_pre_exec: false,
    },
    {
      id: 'mtr',
      community_id: 82,
      name: 'Meter',
      native_token_id: 'mtr',
      logo_url: 'https://static.debank.com/image/chain/logo_url/mtr/2dc6f079f52ca22778eb684e1ce650b3.png',
      wrapped_token_id: '0x160361ce13ec33c993b5cca8f62b6864943eb083',
      is_support_pre_exec: false,
    },
    {
      id: 'bsc',
      community_id: 56,
      name: 'BNB Chain',
      native_token_id: 'bsc',
      logo_url: 'https://static.debank.com/image/chain/logo_url/bsc/bc73fa84b7fc5337905e527dadcbc854.png',
      wrapped_token_id: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      is_support_pre_exec: true,
    },
    {
      id: 'nova',
      community_id: 42170,
      name: 'Arbitrum Nova',
      native_token_id: 'nova',
      logo_url: 'https://static.debank.com/image/chain/logo_url/nova/06eb2b7add8ba443d5b219c04089c326.png',
      wrapped_token_id: '0x722e8bdd2ce80a4422e880164f2079488e115365',
      is_support_pre_exec: true,
    },
    {
      id: 'fsn',
      community_id: 32659,
      name: 'Fusion',
      native_token_id: 'fsn',
      logo_url: 'https://static.debank.com/image/chain/logo_url/fsn/047789979f0b5733602b29517753bdf3.png',
      wrapped_token_id: '0x0c05c5710af74d36b4d3bd5460475c20ceca8fe3',
      is_support_pre_exec: false,
    },
    {
      id: 'evmos',
      community_id: 9001,
      name: 'EvmOS',
      native_token_id: 'evmos',
      logo_url: 'https://static.debank.com/image/chain/logo_url/evmos/26e038b4d5475d5a4b92f7fc08bdabc9.png',
      wrapped_token_id: '0xd4949664cd82660aae99bedc034a0dea8a0bd517',
      is_support_pre_exec: false,
    },
    {
      id: 'pgn',
      community_id: 424,
      name: 'PGN',
      native_token_id: 'pgn',
      logo_url: 'https://static.debank.com/image/chain/logo_url/pgn/55e8dbdfeb4ca88443e04206da3fcb7f.png',
      wrapped_token_id: '',
      is_support_pre_exec: false,
    },
    {
      id: 'sbch',
      community_id: 10000,
      name: 'SmartBch',
      native_token_id: 'sbch',
      logo_url: 'https://static.debank.com/image/chain/logo_url/sbch/d78ac780803e7f0a17b73558f423502e.png',
      wrapped_token_id: '0x3743ec0673453e5009310c727ba4eaf7b3a1cc04',
      is_support_pre_exec: false,
    },
    {
      id: 'ron',
      community_id: 2020,
      name: 'Ronin',
      native_token_id: 'ron',
      logo_url: 'https://static.debank.com/image/chain/logo_url/ron/6e0f509804bc83bf042ef4d674c1c5ee.png',
      wrapped_token_id: '0xe514d9deb7966c8be0ca922de8a064264ea6bcd4',
      is_support_pre_exec: true,
    },
    {
      id: 'fuse',
      community_id: 122,
      name: 'Fuse',
      native_token_id: 'fuse',
      logo_url: 'https://static.debank.com/image/chain/logo_url/fuse/36dfb6fe8e9770367976dd4d2286a9ef.png',
      wrapped_token_id: '0x0be9e53fd7edac9f859882afdda116645287c629',
      is_support_pre_exec: true,
    },
    {
      id: 'hmy',
      community_id: 1666600000,
      name: 'Harmony',
      native_token_id: 'hmy',
      logo_url: 'https://static.debank.com/image/chain/logo_url/hmy/b3bfb4681f81a85e25c28e150dcbfe51.png',
      wrapped_token_id: '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a',
      is_support_pre_exec: true,
    },
    {
      id: 'palm',
      community_id: 11297108109,
      name: 'Palm',
      native_token_id: 'palm',
      logo_url: 'https://static.debank.com/image/chain/logo_url/palm/ece828c59e643b8a8a13aa99145ae7d7.png',
      wrapped_token_id: '0xf98cabf0a963452c5536330408b2590567611a71',
      is_support_pre_exec: true,
    },
    {
      id: 'doge',
      community_id: 2000,
      name: 'Dogechain',
      native_token_id: 'doge',
      logo_url: 'https://static.debank.com/image/chain/logo_url/doge/2538141079688a7a43bc22c7b60fb45f.png',
      wrapped_token_id: '0xb7ddc6414bf4f5515b52d8bdd69973ae205ff101',
      is_support_pre_exec: false,
    },
    {
      id: 'wemix',
      community_id: 1111,
      name: 'WEMIX',
      native_token_id: 'wemix',
      logo_url: 'https://static.debank.com/image/chain/logo_url/wemix/d1ba88d1df6cca0b0cb359c36a09c054.png',
      wrapped_token_id: '0x7d72b22a74a216af4a002a1095c8c707d6ec1c5f',
      is_support_pre_exec: true,
    },
    {
      id: 'opbnb',
      community_id: 204,
      name: 'opBNB',
      native_token_id: 'opbnb',
      logo_url: 'https://static.debank.com/image/chain/logo_url/opbnb/07e2e686e363a842d0982493638e1285.png',
      wrapped_token_id: '0x4200000000000000000000000000000000000006',
      is_support_pre_exec: true,
    },
    {
      id: 'iotx',
      community_id: 4689,
      name: 'IoTeX',
      native_token_id: 'iotx',
      logo_url: 'https://static.debank.com/image/chain/logo_url/iotx/d3be2cd8677f86bd9ab7d5f3701afcc9.png',
      wrapped_token_id: '0xa00744882684c3e4747faefd68d283ea44099d03',
      is_support_pre_exec: false,
    },
    {
      id: 'op',
      community_id: 10,
      name: 'Optimism',
      native_token_id: 'op',
      logo_url: 'https://static.debank.com/image/chain/logo_url/op/01ae734fe781c9c2ae6a4cc7e9244056.png',
      wrapped_token_id: '0x4200000000000000000000000000000000000006',
      is_support_pre_exec: true,
    },
    {
      id: 'pze',
      community_id: 1101,
      name: 'Polygon zkEVM',
      native_token_id: 'pze',
      logo_url: 'https://static.debank.com/image/chain/logo_url/pze/a2276dce2d6a200c6148fb975f0eadd3.png',
      wrapped_token_id: '0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9',
      is_support_pre_exec: false,
    },
    {
      id: 'wan',
      community_id: 888,
      name: 'Wanchain',
      native_token_id: 'wan',
      logo_url: 'https://static.debank.com/image/chain/logo_url/wan/f3aa8b31414732ea5e026e05665146e6.png',
      wrapped_token_id: '0xdabd997ae5e4799be47d6e69d9431615cba28f48',
      is_support_pre_exec: true,
    },
    {
      id: 'etc',
      community_id: 61,
      name: 'Ethereum Classic',
      native_token_id: 'etc',
      logo_url: 'https://static.debank.com/image/chain/logo_url/etc/7ccf90ee6822ab440fb603337da256fa.png',
      wrapped_token_id: '0x82a618305706b14e7bcf2592d4b9324a366b6dad',
      is_support_pre_exec: true,
    },
    {
      id: 'tlos',
      community_id: 40,
      name: 'Telos',
      native_token_id: 'tlos',
      logo_url: 'https://static.debank.com/image/chain/logo_url/telos/f9f7493def4c08ed222540bebd8ce87a.png',
      wrapped_token_id: '0xd102ce6a4db07d247fcc28f366a623df0938ca9e',
      is_support_pre_exec: false,
    },
    {
      id: 'shib',
      community_id: 109,
      name: 'Shibarium',
      native_token_id: 'shib',
      logo_url: 'https://static.debank.com/image/chain/logo_url/shib/4ec79ed9ee4988dfdfc41e1634a447be.png',
      wrapped_token_id: '0x213c25900f365f1be338df478cd82bef7fd43f85',
      is_support_pre_exec: false,
    },
    {
      id: 'rsk',
      community_id: 30,
      name: 'RSK',
      native_token_id: 'rsk',
      logo_url: 'https://static.debank.com/image/chain/logo_url/rsk/ff47def89fba98394168bf5f39920c8c.png',
      wrapped_token_id: '0x542fda317318ebf1d3deaf76e0b632741a7e677d',
      is_support_pre_exec: false,
    },
    {
      id: 'step',
      community_id: 1234,
      name: 'Step',
      native_token_id: 'step',
      logo_url: 'https://static.debank.com/image/chain/logo_url/step/db79600b8feafe17845617ca9c606dbe.png',
      wrapped_token_id: '0xb58a9d5920af6ac1a9522b0b10f55df16686d1b6',
      is_support_pre_exec: true,
    },
    {
      id: 'cro',
      community_id: 25,
      name: 'Cronos',
      native_token_id: 'cro',
      logo_url: 'https://static.debank.com/image/chain/logo_url/cro/f947000cc879ee8ffa032793808c741c.png',
      wrapped_token_id: '0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23',
      is_support_pre_exec: true,
    },
    {
      id: 'klay',
      community_id: 8217,
      name: 'Klaytn',
      native_token_id: 'klay',
      logo_url: 'https://static.debank.com/image/chain/logo_url/klay/1df018b8493cb97c50b7e390ef63cba4.png',
      wrapped_token_id: '0xe4f05a66ec68b54a58b17c22107b02e0232cc817',
      is_support_pre_exec: true,
    },
    {
      id: 'loot',
      community_id: 5151706,
      name: 'Loot',
      native_token_id: 'loot',
      logo_url: 'https://static.debank.com/image/chain/logo_url/loot/0f098333a1a4f474115b05862e680573.png',
      wrapped_token_id: '0x4fa214c9e33d481996bec77c443245fbaee85670',
      is_support_pre_exec: false,
    },
    {
      id: 'aurora',
      community_id: 1313161554,
      name: 'Aurora',
      native_token_id: 'aurora',
      logo_url: 'https://static.debank.com/image/chain/logo_url/aurora/da491099bb44690eda122cdd67c5c610.png',
      wrapped_token_id: '0xc9bdeed33cd01541e1eed10f90519d2c06fe3feb',
      is_support_pre_exec: true,
    },
    {
      id: 'astar',
      community_id: 592,
      name: 'Astar',
      native_token_id: 'astar',
      logo_url: 'https://static.debank.com/image/chain/logo_url/astar/398c7e0014bdada3d818367a7273fabe.png',
      wrapped_token_id: '0xaeaaf0e2c81af264101b9129c00f4440ccf0f720',
      is_support_pre_exec: true,
    },
    {
      id: 'oas',
      community_id: 248,
      name: 'Oasys',
      native_token_id: 'oas',
      logo_url: 'https://static.debank.com/image/chain/logo_url/oas/69e424154c30984ff4d5ba916591ac2a.png',
      wrapped_token_id: '0x5200000000000000000000000000000000000001',
      is_support_pre_exec: true,
    },
    {
      id: 'arb',
      community_id: 42161,
      name: 'Arbitrum',
      native_token_id: 'arb',
      logo_url: 'https://static.debank.com/image/chain/logo_url/arb/854f629937ce94bebeb2cd38fb336de7.png',
      wrapped_token_id: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
      is_support_pre_exec: true,
    },
    {
      id: 'linea',
      community_id: 59144,
      name: 'Linea',
      native_token_id: 'linea',
      logo_url: 'https://static.debank.com/image/chain/logo_url/linea/32d4ff2cf92c766ace975559c232179c.png',
      wrapped_token_id: '0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f',
      is_support_pre_exec: true,
    },
    {
      id: 'rose',
      community_id: 42262,
      name: 'Oasis Emerald',
      native_token_id: 'rose',
      logo_url: 'https://static.debank.com/image/chain/logo_url/rose/33ade55b0f3efa10e9eec002c6417257.png',
      wrapped_token_id: '0x21c718c22d52d0f3a789b752d4c2fd5908a8a733',
      is_support_pre_exec: false,
    },
    {
      id: 'sdn',
      community_id: 336,
      name: 'Shiden',
      native_token_id: 'sdn',
      logo_url: 'https://static.debank.com/image/chain/logo_url/sdn/0baaa4ee7cb16feed71119b062ccd277.png',
      wrapped_token_id: '0x0f933dc137d21ca519ae4c7e93f87a4c8ef365ef',
      is_support_pre_exec: true,
    },
    {
      id: 'lyx',
      community_id: 42,
      name: 'LUKSO',
      native_token_id: 'lyx',
      logo_url: 'https://static.debank.com/image/chain/logo_url/lyx/dbe6eef57e66817e61297d9b188248ed.png',
      wrapped_token_id: '',
      is_support_pre_exec: true,
    },
    {
      id: 'brise',
      community_id: 32520,
      name: 'Bitgert',
      native_token_id: 'brise',
      logo_url: 'https://static.debank.com/image/chain/logo_url/brise/4f6c040cf49f4d8c4eabbad7cd2f4ae4.png',
      wrapped_token_id: '0x0eb9036cbe0f052386f36170c6b07ef0a0e3f710',
      is_support_pre_exec: true,
    },
    {
      id: 'tenet',
      community_id: 1559,
      name: 'Tenet',
      native_token_id: 'tenet',
      logo_url: 'https://static.debank.com/image/chain/logo_url/tenet/803be22e467ee9a5abe00d69a9c3ea4f.png',
      wrapped_token_id: '0xd6cb8a253e12893b0cf39ca78f7d858652cca1fe',
      is_support_pre_exec: false,
    },
    {
      id: 'scrl',
      community_id: 534352,
      name: 'Scroll',
      native_token_id: 'scrl',
      logo_url: 'https://static.debank.com/image/chain/logo_url/scrl/1fa5c7e0bfd353ed0a97c1476c9c42d2.png',
      wrapped_token_id: '0x5300000000000000000000000000000000000004',
      is_support_pre_exec: false,
    },
    {
      id: 'kava',
      community_id: 2222,
      name: 'Kava',
      native_token_id: 'kava',
      logo_url: 'https://static.debank.com/image/chain/logo_url/kava/b26bf85a1a817e409f9a3902e996dc21.png',
      wrapped_token_id: '0xc86c7c0efbd6a49b35e8714c5f59d99de09a225b',
      is_support_pre_exec: true,
    },
    {
      id: 'avax',
      community_id: 43114,
      name: 'Avalanche',
      native_token_id: 'avax',
      logo_url: 'https://static.debank.com/image/chain/logo_url/avax/4d1649e8a0c7dec9de3491b81807d402.png',
      wrapped_token_id: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
      is_support_pre_exec: true,
    },
    {
      id: 'manta',
      community_id: 169,
      name: 'Manta Pacific',
      native_token_id: 'manta',
      logo_url: 'https://static.debank.com/image/chain/logo_url/manta/0e25a60b96a29d6a5b9e524be7565845.png',
      wrapped_token_id: '0x0dc808adce2099a9f62aa87d9670745aba741746',
      is_support_pre_exec: false,
    },
    {
      id: 'core',
      community_id: 1116,
      name: 'CORE',
      native_token_id: 'core',
      logo_url: 'https://static.debank.com/image/chain/logo_url/core/ccc02f660e5dd410b23ca3250ae7c060.png',
      wrapped_token_id: '0x40375c92d9faf44d2f9db9bd9ba41a3317a2404f',
      is_support_pre_exec: true,
    },
    {
      id: 'xdai',
      community_id: 100,
      name: 'Gnosis Chain',
      native_token_id: 'xdai',
      logo_url: 'https://static.debank.com/image/chain/logo_url/xdai/43c1e09e93e68c9f0f3b132976394529.png',
      wrapped_token_id: '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d',
      is_support_pre_exec: true,
    },
    {
      id: 'mnt',
      community_id: 5000,
      name: 'Mantle',
      native_token_id: 'mnt',
      logo_url: 'https://static.debank.com/image/chain/logo_url/mnt/0af11a52431d60ded59655c7ca7e1475.png',
      wrapped_token_id: '0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8',
      is_support_pre_exec: true,
    },
    {
      id: 'pls',
      community_id: 369,
      name: 'Pulse',
      native_token_id: 'pls',
      logo_url: 'https://static.debank.com/image/chain/logo_url/pls/aa6be079fa9eb568e02150734ebb3db0.png',
      wrapped_token_id: '0xa1077a294dde1b09bb078844df40758a5d0f9a27',
      is_support_pre_exec: true,
    },
    {
      id: 'matic',
      community_id: 137,
      name: 'Polygon',
      native_token_id: 'matic',
      logo_url: 'https://static.debank.com/image/chain/logo_url/matic/52ca152c08831e4765506c9bd75767e8.png',
      wrapped_token_id: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
      is_support_pre_exec: true,
    },
    {
      id: 'heco',
      community_id: 128,
      name: 'HECO',
      native_token_id: 'heco',
      logo_url: 'https://static.debank.com/image/chain/logo_url/heco/db5152613c669e0cc8624d466d6c94ea.png',
      wrapped_token_id: '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f',
      is_support_pre_exec: true,
    },
    {
      id: 'canto',
      community_id: 7700,
      name: 'Canto',
      native_token_id: 'canto',
      logo_url: 'https://static.debank.com/image/chain/logo_url/canto/47574ef619e057d2c6bbce1caba57fb6.png',
      wrapped_token_id: '0x826551890dc65655a0aceca109ab11abdbd7a07b',
      is_support_pre_exec: true,
    },
  ].filter((item) => ChainList.includes(item.id));

  const allChainMap = allChainList.reduce((pre, cur) => {
    return {
      ...pre,
      [cur.id]: cur,
    };
  }, {}) as any;

  console.log('allChainMap: ', allChainMap);

  const allTokenList = [
    {
      id: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
      chain: 'matic',
      name: 'Wrapped Matic',
      symbol: 'WMATIC',
      display_symbol: 'WMATIC',
      optimized_symbol: 'WMATIC',
      decimals: 18,
      logo_url:
        'https://static.debank.com/image/matic_token/logo_url/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270/f6e604ba0324726a3d687c618aa4f163.png',
      protocol_id: '',
      price: 0.635035,
      price_24h_change: 0.028018849750779857,
      is_verified: true,
      is_core: true,
      is_wallet: true,
      time_at: 1601030209.0,
      amount: 1.4,
      raw_amount: 1400000000000000000,
      raw_amount_hex_str: '0x136dcc951d8c0000',
    },
    {
      id: '0x0faab20e99657e1158f6b9dd60a4197a6ff7e4a5',
      chain: 'matic',
      name: '@ Synth sUSD',
      symbol: 'sUSD [Synthetix.cc]',
      display_symbol: null,
      optimized_symbol: 'sUSD [Synthetix.cc]',
      decimals: 18,
      logo_url: null,
      protocol_id: '',
      price: 0,
      price_24h_change: null,
      is_verified: false,
      is_core: false,
      is_wallet: false,
      time_at: 1697697750.0,
      amount: 685.0,
      raw_amount: 685000000000000000000,
      raw_amount_hex_str: '0x252248deb6e6940000',
    },
    {
      id: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      chain: 'matic',
      name: 'USD Coin (PoS)',
      symbol: 'USDC',
      display_symbol: null,
      optimized_symbol: 'USDC',
      decimals: 6,
      logo_url: 'https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png',
      protocol_id: '',
      price: 1.0,
      price_24h_change: 0.0,
      is_verified: true,
      is_core: true,
      is_wallet: true,
      time_at: 1601199611.0,
      amount: 1.000243,
      raw_amount: 1000243,
      raw_amount_hex_str: '0xf4333',
    },
    {
      id: '0x40379a439d4f6795b6fc9aa5687db461677a2dba',
      chain: 'matic',
      name: 'Real USD',
      symbol: 'USDR',
      display_symbol: null,
      optimized_symbol: 'USDR',
      decimals: 9,
      logo_url: 'https://static.debank.com/image/coin/logo_url/usdr/3547003d1109759667dfca20bece3d3c.png',
      protocol_id: 'matic_tangible',
      price: 0.569559955555666,
      price_24h_change: -0.011467685311822129,
      is_verified: false,
      is_core: true,
      is_wallet: true,
      time_at: 1690527924.0,
      amount: 1.525543326,
      raw_amount: 1525543326,
      raw_amount_hex_str: '0x5aedf19e',
    },
    {
      id: '0x60f57b625566a461ebc959d5314d0dcc1f4da0cd',
      chain: 'matic',
      name: '@SNXPool.com',
      symbol: '$ sUSD',
      display_symbol: null,
      optimized_symbol: '$ sUSD',
      decimals: 18,
      logo_url: null,
      protocol_id: '',
      price: 0,
      price_24h_change: null,
      is_verified: false,
      is_core: false,
      is_wallet: false,
      time_at: 1694527680.0,
      amount: 1165.0,
      raw_amount: 1165000000000000000000,
      raw_amount_hex_str: '0x3f279f6f90c2140000',
    },
  ];

  const supportedChainList: any[] = [];

  allChainList.forEach((chain) => {
    // if (findToken || findProtocol) {
    const this_chain_value = allChainsBalance.chain_list.find((chain_info) => {
      return chain_info.id === chain.id;
    });

    if (this_chain_value) {
      supportedChainList.push({
        ...this_chain_value,
        ...chain,
      });
    }
    // }
  });

  const totalUsdValueOfSupportedChains = supportedChainList.reduce((total, item) => total + item.usd_value, 0);

  const supportedChainsWithPercentage = supportedChainList.map((chain) => {
    return {
      ...chain,
      percentage: Big((chain.usd_value / totalUsdValueOfSupportedChains) * 100).toFixed(2),
    };
  });

  const parsedAllTokenList = allTokenList
    .map((token) => {
      return {
        ...token,
        chain_info: allChainMap[token.chain],
        usd_value: token.price * token.amount,
      };
    })
    .sort((a, b) => {
      // depend on sortBy, sort it

      if (sortBy === 'amount') {
        return b.amount - a.amount;
      } else if (sortBy === 'price') {
        return b.price - a.price;
      } else {
        return b.usd_value - a.usd_value;
      }
    });

  const parsedProtocolList = protocolList.map((protocol) => {
    const protocolNetUsdValue = protocol.portfolio_item_list.reduce(
      (total, item) => total + item.stats.net_usd_value,
      0,
    );

    const protocolRewardUsdValue = protocol.portfolio_item_list.reduce((total, item) => {
      const itemDetail = item.detail as any;

      if (!itemDetail.reward_token_list) {
        return total;
      } else {
        const reward_token_list = itemDetail.reward_token_list as any[];

        const total_reward_this_item = reward_token_list.reduce(
          (total, reward_item) => total + reward_item.price * reward_item.amount,
          0,
        );

        return total + total_reward_this_item;
      }
    }, 0);

    const protocol_usd_value = protocolNetUsdValue + protocolRewardUsdValue;

    return {
      ...protocol,
      protocol_usd_value,
      protocolRewardUsdValue,
      protocolNetUsdValue,
      chain_info: allChainMap[protocol.chain],
    };
  });

  return {
    parsedAllTokenList,
    supportedChainList: supportedChainsWithPercentage,
    allChainsBalance,
    sortBy,
    setSortBy,
    parsedProtocolList,
    totalUsdValueOfSupportedChains,
  };
};

const WalletComponent = (props: any) => {
  const {
    parsedAllTokenList,
    supportedChainList,
    totalUsdValueOfSupportedChains,
    allChainsBalance,
    setSortBy,
    sortBy,
    filterFunc,
  } = props.data;

  const value_all = parsedAllTokenList.filter(filterFunc).reduce((pre: any, cur: any) => {
    return pre.plus(cur.price * cur.amount);
  }, Big(0));

  return (
    <>
      <HoldingTitle>
        <div className="holding-text">Holding</div>

        <div className="holding-value">
          <span className="format-decimals">
            $
            <span className="integer-part">
              {formateValueWithThousandSeparatorAndFont(value_all.toFixed(), 4).integer}
            </span>
            <span className="decimal-part">
              {formateValueWithThousandSeparatorAndFont(value_all.toFixed(), 4).decimal}
            </span>
          </span>
        </div>
      </HoldingTitle>

      <HoldingTable>
        <thead>
          <tr>
            <th>Token</th>

            <th>
              <div
                className="frcs-gm"
                onClick={() => {
                  setSortBy('price');
                }}
              >
                <span>Price</span>{' '}
                <SortArrowDownWrapper active={sortBy === 'price'}> {sortArrowDown} </SortArrowDownWrapper>{' '}
              </div>{' '}
            </th>

            <th>
              <div
                className="frcs-gm"
                onClick={() => {
                  setSortBy('amount');
                }}
              >
                <span>Amount</span>{' '}
                <SortArrowDownWrapper active={sortBy === 'amount'}> {sortArrowDown} </SortArrowDownWrapper>{' '}
              </div>{' '}
            </th>

            <th>
              <div
                className="frcs-gm"
                onClick={() => {
                  setSortBy('usd_value');
                }}
              >
                <span>USD value</span>{' '}
                <SortArrowDownWrapper active={sortBy === 'usd_value'}> {sortArrowDown} </SortArrowDownWrapper>{' '}
              </div>{' '}
            </th>
          </tr>
        </thead>

        <tbody>
          {parsedAllTokenList.filter(filterFunc).map((token: any) => {
            return (
              <tr key={token.id}>
                <td>
                  <div className="frcs token-info">
                    <img src={token.logo_url || ''} className="token-icon" />

                    <div>
                      <div className="token-symbol">{token.symbol}</div>

                      <div className="chain-info">
                        <img src={token.chain_info.logo_url} className="chain-icon" />

                        <div className="chain-name"> {token.chain_info.name} </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>{formateValue(token.price, 2)}</td>
                <td>{formateValue(token.amount, 4)}</td>
                <td>${formateValueWithThousandSeparator(token.usd_value, 4)}</td>
              </tr>
            );
          })}
        </tbody>
      </HoldingTable>
    </>
  );
};

const ProtocolComponent = (props: any) => {
  const {
    parsedAllTokenList,
    parsedProtocolList,
    supportedChainList,
    allChainsBalance,
    setSortBy,
    sortBy,
    filterFunc,
  } = props.data;

  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const [isHide, setIsHide] = useState<boolean>(false);

  const [isExpand, setIsExpand] = useState<boolean>(false);

  return (
    <>
      <YourAssetsTitle>
        <div className="assets-text">Your Assets & Positions</div>

        <div
          className="asset-function-button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setOpenOptions((b) => !b);
          }}
        >
          <div className="dot" />

          <div className="dot" />

          <div className="dot" />

          {openOptions && (
            <ProtocolSelectBox
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <div className="function-item">
                <div>Hide</div>

                <div className="minimum-value-box">{'< $0.1'}</div>

                <CheckBox active={isHide}>
                  <div
                    onClick={() => {
                      setIsHide((h) => !h);
                    }}
                  ></div>
                </CheckBox>
              </div>

              <div className="function-item">
                <div>Expand</div>

                <CheckBox active={isExpand}>
                  <div
                    onClick={() => {
                      setIsExpand((h) => !h);
                    }}
                  ></div>
                </CheckBox>
              </div>
            </ProtocolSelectBox>
          )}
        </div>
      </YourAssetsTitle>

      {parsedProtocolList.filter(filterFunc).map((protocol: any, index: number) => {
        return (
          <ProtocolItem
            isHide={isHide}
            isExpand={isExpand}
            protocolItem={protocol}
            key={'protocol-' + index}
          ></ProtocolItem>
        );
      })}
    </>
  );
};

const ProtocolTableGenerator = ({
  columns,
  rows,
  name,
  showTitle,
}: {
  columns: string[];
  rows: (JSX.Element | string)[][];
  name: colorKeyEnums;
  showTitle: boolean;
}) => {
  console.log('colorConfig[name]  ', colorConfig[name] || colorConfig['default']);

  return (
    <ProtocolTable
      titleColor={(colorConfig[name] || colorConfig['default']).titleColor}
      titleBg={(colorConfig[name] || colorConfig['default']).titleBg}
    >
      <div className="type-title">{name}</div>

      <table>
        <thead>
          <tr>
            {columns.map((column, index) => {
              return <th key={column + index}>{column}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr key={index + '-row-tr' + index}>
                {row.map((item, index) => {
                  if (item === 'omit') return <></>;
                  return <td key={index + 'row-td'}>{item}</td>;
                })}
              </tr>
            );
          })}
        </tbody>{' '}
      </table>
    </ProtocolTable>
  );
};

const ProtocolItem = (props: any) => {
  const { isExpand, protocolItem, isHide } = props;

  const [thisCardExpand, setThisCardExpand] = useState<boolean>(false);

  useEffect(() => {
    setThisCardExpand(isExpand);
  }, [isExpand]);

  const groupedPortfolioItemList = protocolItem.portfolio_item_list.reduce((pre: any, cur: any) => {
    const name = cur.name;

    if (!pre[name]) {
      pre[name] = [];
    }

    pre[name].push(cur);

    return pre;
  }, {});

  const checkHideValue = (value: number) => {
    return isHide && value < 0.01;
  };

  if (!protocolItem.chain_info) return <></>;

  return (
    <ProtocolCard>
      <div className="protocol-title">
        <div className="title-filed">
          <div className="icon-filed">
            <img className="protocol-icon" src={protocolItem.logo_url} />
            <img className="chain-icon " src={protocolItem.chain_info?.logo_url} />
          </div>

          <div>
            <div className="protocol-name">{protocolItem.name}</div>

            <div className="chain-name">{protocolItem.chain_info.name}</div>
          </div>
        </div>

        <div className="value-filed">
          <span className="format-decimals">
            <span
              className="integer-part"
              style={{
                fontSize: '24px',
              }}
            >
              ${formateValueWithThousandSeparatorAndFont(protocolItem.protocol_usd_value, 4).integer}
            </span>
            <span
              className="decimal-part"
              style={{
                fontSize: '18px',
              }}
            >
              {formateValueWithThousandSeparatorAndFont(protocolItem.protocol_usd_value, 4).decimal}
            </span>
          </span>

          <ProtocolArrowWrapper
            onClick={() => {
              setThisCardExpand((b) => !b);
            }}
            isExpand={thisCardExpand}
          >
            {ProtocolArrowDown}
          </ProtocolArrowWrapper>
        </div>
      </div>

      {thisCardExpand &&
        Object.entries(groupedPortfolioItemList).map(([name, itemList]: [string, any], index: number) => {
          const renderList = [];

          if (name === 'Lending') {
            const item = itemList[0];

            const { supply_token_list, reward_token_list, borrow_token_list } = item.detail;

            if (supply_token_list) {
              renderList.push(
                <ProtocolTableGenerator
                  name={name}
                  showTitle={false}
                  columns={['Supplied', 'Balance', 'USD Value']}
                  rows={supply_token_list.map((token: any) => {
                    if (checkHideValue(token.amount * token.price)) return ['omit', 'omit', 'omit'];

                    return [
                      <div className="frcs" key={token.id}>
                        <img className="token-icon" src={token.logo_url} />
                        <div className="token-name">{token.name}</div>
                      </div>,
                      formateValue(token.amount, 4),
                      formateValueWithThousandSeparator(token.amount * token.price, 4),
                    ];
                  })}
                ></ProtocolTableGenerator>,
              );
            }

            if (reward_token_list) {
              renderList.push(
                <ProtocolTableGenerator
                  name={name}
                  showTitle={false}
                  columns={['Rewards', 'Balance', 'USD Value']}
                  rows={reward_token_list.map((token: any) => {
                    if (checkHideValue(token.amount * token.price)) return ['omit', 'omit', 'omit'];

                    return [
                      <div className="frcs" key={token.id}>
                        <img className="token-icon" src={token.logo_url} />
                        <div className="token-name">{token.name}</div>
                      </div>,
                      formateValue(token.amount, 4),
                      formateValueWithThousandSeparator(token.amount * token.price, 4),
                    ];
                  })}
                ></ProtocolTableGenerator>,
              );
            }

            if (borrow_token_list) {
              renderList.push(
                <ProtocolTableGenerator
                  name={name}
                  showTitle={false}
                  columns={['Borrowed', 'Balance', 'USD Value']}
                  rows={borrow_token_list.map((token: any) => {
                    if (checkHideValue(token.amount * token.price)) return ['omit', 'omit', 'omit'];
                    return [
                      <div className="frcs" key={token.id}>
                        <img className="token-icon" src={token.logo_url} />
                        <div className="token-name">{token.name}</div>
                      </div>,
                      formateValue(token.amount, 4),
                      `$${formateValueWithThousandSeparator(token.amount * token.price, 4)}`,
                    ];
                  })}
                />,
              );
            }
          }

          if (name === 'Liquidity Pool' || name === 'Staked' || name === 'Deposit') {
            const rows = itemList.map((item: any) => {
              const { supply_token_list, reward_token_list } = item.detail;

              const tokenSeries = (
                <div className={` ${name === 'Deposit' ? 'frcs' : 'fccc'}  token-series`}>
                  <IconSeries ulrs={supply_token_list.map((token: any) => token.logo_url)} />

                  <span className="symbo-series">
                    {supply_token_list.map((token: any, index: number) => (
                      <span key={'token-series-' + index}>{(index === 0 ? '' : '+') + token.symbol}</span>
                    ))}
                  </span>
                </div>
              );

              const balanceList = (
                <div className="fccc">
                  {supply_token_list.map((token: any) => {
                    return (
                      <div className="frcs balance-value" key={token.id + token.chain}>
                        <span>{formateValue(token.amount, 4)}</span>
                        <span>{token.symbol}</span>
                      </div>
                    );
                  })}
                </div>
              );

              const rewardList = !reward_token_list ? (
                'omit'
              ) : (
                <div className="fccc">
                  {reward_token_list.map((token: any) => {
                    return (
                      <div className="frcs reward-item" key={token.id + token.chain}>
                        {`${formateValue(token.amount, 4)} ${token.symbol} $(${formateValueWithThousandSeparator(
                          token.amount * token.price,
                          4,
                        )})`}
                      </div>
                    );
                  })}
                </div>
              );

              const usd_value = `$${formateValueWithThousandSeparator(item.stats.net_usd_value, 4)}`;

              if (checkHideValue(item.stats.net_usd_value)) return ['omit', 'omit', 'omit', 'omit'];

              return [tokenSeries, balanceList, rewardList, usd_value];
            });

            let columns = ['Position', 'Balance', 'Rewards', 'USD value'];

            // check if all rewars omit or not in rows

            const allRewardsOmit = rows.every((row: any) => row[2] === 'omit');

            if (allRewardsOmit) {
              columns = ['Position', 'Balance', 'USD value'];
            }

            renderList.push(
              <ProtocolTableGenerator
                name={name}
                showTitle={false}
                columns={columns}
                rows={rows}
              ></ProtocolTableGenerator>,
            );
          }

          if (renderList.length > 0) {
            return renderList.map((renderItem: any, index: number) => {
              return <>{renderItem}</>;
            });
          }

          return <></>;
        })}
    </ProtocolCard>
  );
};

const PortfolioPage: NextPageWithLayout = () => {
  const { sender, wallet, provider, connect } = useEthersSender();

  const [CurTab, setCurTab] = useState<'Wallet' | 'Protocol'>('Protocol');

  const [network, setNetwork] = useState<string>('all');

  const data = useAllPorfolioDataList();

  const {
    parsedAllTokenList,
    parsedProtocolList,
    totalUsdValueOfSupportedChains,
    supportedChainList,
    allChainsBalance,
    sortBy,
    setSortBy,
  } = data;

  const filterFunc = (token: any) => {
    return network === 'all' || token.chain === network;
  };

  return (
    <Wrapper>
      <div className="frcb">
        <Profile className="frcs">
          {DefaultProfileIcon}

          <div className="">
            <div className="address-filed ">
              <span>{formateAddress(sender)}</span>
              <div className="arrow-filed frcc">{ArrowDone}</div>
            </div>

            <div className="frcs metamask-filed">
              {MetaMaskIcon}
              <span>MetaMask</span>
            </div>
          </div>
        </Profile>

        <PortfolioDailyData></PortfolioDailyData>
      </div>

      <PortfolioTabs>
        {['Wallet', 'Protocol'].map((tab) => {
          const isActive = tab === CurTab.toString();
          return (
            <div
              key={tab}
              className={`item ${isActive ? 'active' : ''}`}
              onClick={() => {
                setCurTab(tab as 'Wallet' | 'Protocol');
              }}
            >
              {tab}

              {isActive && <div className="active-bar"></div>}
            </div>
          );
        })}
      </PortfolioTabs>

      <NetworkTabWrapper>
        <AllNetWorkTab
          onClick={() => {
            setNetwork('all');
          }}
        >
          {AllNetWorkIcon}

          <div>
            <div className="network-name">All Networks</div>
            <div className="usd-value">${formateValueWithThousandSeparator(totalUsdValueOfSupportedChains, 4)}</div>
          </div>
        </AllNetWorkTab>

        {supportedChainList.map((chain) => {
          return (
            <NetWorkTab
              active={network === chain.id}
              key={chain.community_id}
              onClick={() => {
                setNetwork(chain.id);
              }}
              className="frcs-gm"
            >
              {chain.logo_url ? (
                <img className="network-icon-chain" src={chain.logo_url} />
              ) : (
                <div className="default-icon network-icon">{chain.name[0]}</div>
              )}

              <div>
                <div className="network-name">{chain.name}</div>

                <div className="value-filed frcs-gm">
                  <div className="usd-value">${formateValueWithThousandSeparator(chain.usd_value, 2)}</div>
                  <div className="usd-value-percent">{chain.percentage}%</div>
                </div>
              </div>
            </NetWorkTab>
          );
        })}
      </NetworkTabWrapper>

      {CurTab === 'Wallet' && (
        <WalletComponent
          data={{
            ...data,
            network,
            filterFunc,
          }}
        ></WalletComponent>
      )}

      {CurTab === 'Protocol' && (
        <ProtocolComponent
          data={{
            ...data,
            network,
            filterFunc,
          }}
        ></ProtocolComponent>
      )}
    </Wrapper>
  );
};

PortfolioPage.getLayout = useDefaultLayout;

export default PortfolioPage;

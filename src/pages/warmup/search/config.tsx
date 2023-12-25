import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const SearchConfig: NextPageWithLayout = (props) => {
  const { search, onLoad } = props;

  if (!search) {
    onLoad([]);

    return <div />;
  }

  const [action, quantityOrSymbol, symbolOrOn, onOrNetwork, network] = search.split(/\s+/);

  const bridgeTokens = [
    // eth mainnet assets
    {
      address: '0x0000000000000000000000000000000000000000',
      chainId: 1,
      symbol: 'ETH',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    },
    {
      address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
      chainId: 1,
      symbol: 'MATIC',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png',
    },
    {
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      chainId: 1,
      symbol: 'USDC',
      decimals: 6,
      logoURI: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
    },
    {
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      symbol: 'DAI',
      decimals: 18,
      chainId: 1,
      logoURI: 'https://assets.coingecko.com/coins/images/9956/small/4943.png',
    },
    {
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      chainId: 1,
      symbol: 'USDT',
      decimals: 6,
      logoURI: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
    },
    {
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      chainId: 1,
      symbol: 'WBTC',
      decimals: 8,
      logoURI: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png',
    },

    // zkevm assets
    {
      address: '0x0000000000000000000000000000000000000000',
      chainId: 1101,
      symbol: 'ETH',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    },
    {
      address: '0xa2036f0538221a77A3937F1379699f44945018d0',
      chainId: 1101,
      symbol: 'MATIC',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png',
    },
    {
      address: '0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035',
      chainId: 1101,
      symbol: 'USDC',
      decimals: 6,
      logoURI: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
    },
  ];

  const SwapTokens = [
    {
      address: '0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9',
      chainId: 1101,
      symbol: 'WETH',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295',
    },
    {
      address: '0xa2036f0538221a77A3937F1379699f44945018d0',
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

  const Dexs = ['Pancake Swap', 'Balancer', 'QuickSwap'];

  const mapBridgeTokens = bridgeTokens.map((token) => {
    return {
      ...token,
      highlight: `Bridge ${token.symbol} from ${token.chainId === 1 ? 'Ethereum' : 'Polygon zkEVM'}`,
      network: token.chainId === 1 ? 'Ethereum' : 'Polygon zkEVM',
    };
  });

  const mapSwapTokensQuick = SwapTokens.map((token) => {
    return {
      ...token,
      highlight: `Swap 1 ${token.symbol} on QuickSwap`,
      network: 'QuickSwap',
      dappName: 'QuickSwap',
      chainName: 'zkEVM',
    };
  });

  const mapSwapTokensBalancer = SwapTokens.map((token) => {
    return {
      ...token,
      highlight: `Swap 1 ${token.symbol} on Balancer`,
      network: 'Balancer',
      dappName: 'Balancer',
      chainName: 'zkEVM',
    };
  });

  const mapSwapTokensPancake = SwapTokens.filter((t) => !t.extra).map((token) => {
    return {
      ...token,
      highlight: `Swap 1 ${token.symbol} on PancakeSwap`,
      network: 'PancakeSwap',
      dappName: 'Pancake Swap',
      chainName: 'zkEVM',
    };
  });

  const mapSwapTokens = [...mapSwapTokensBalancer, ...mapSwapTokensQuick, ...mapSwapTokensPancake];

  const isActonBridge = 'bridge'.includes(action.toLowerCase());

  const isActionSwap = 'swap'.includes(action.toLowerCase());

  const isActionSupply = 'supply'.includes(action.toLowerCase());

  const isActionBorrow = 'borrow'.includes(action.toLowerCase());

  const isActionRepay = 'repay'.includes(action.toLowerCase());

  const isActionWithdraw = 'withdraw'.includes(action.toLowerCase());

  const isDepositGamma = 'deposit'.includes(action.toLowerCase());

  if (
    !isActionSwap &&
    !isActonBridge &&
    !isActionBorrow &&
    !isActionSupply &&
    !isActionRepay &&
    !isActionWithdraw &&
    !isDepositGamma
  ) {
    onLoad([]);

    return <div />;
  }

  if (isActonBridge) {
    const hintList = mapBridgeTokens.map((token) => {
      const highlightArray = token.highlight.split(' ');

      const matchOnSymbol = quantityOrSymbol && token.symbol.toLowerCase().includes(quantityOrSymbol.toLowerCase());

      const matchOnNetwork = onOrNetwork && token.network.toLowerCase().includes(onOrNetwork.toLowerCase());

      // 0 bridge  1 symbol 2 on 3 network

      const highlight = highlightArray.reduce((acc, cur, index) => {
        if (index === 0) {
          return cur + ' ';
        }

        if (index === 1) {
          return acc + (matchOnSymbol ? cur + ' ' : '');
        }

        if (index === 3) {
          return acc + (matchOnNetwork ? `from ${cur} ` : '');
        }

        if (index === 4) {
          return acc + (matchOnNetwork ? cur : '');
        }

        return acc;
      }, '');

      return {
        ...token,
        highlight,
        full: token.highlight,
        left: token.highlight.substring(highlight.length, token.highlight.length),
        dappName: 'native bridge',
        matched: (matchOnSymbol || !quantityOrSymbol) && (matchOnNetwork || !onOrNetwork),
      };
    });

    const finalList = hintList.filter((t) => !!t.matched);

    onLoad(finalList);

    return <div />;
  }
  if (isActionSwap) {
    const hintList = mapSwapTokens.map((token) => {
      const positiveIntegerPattern = /^[1-9]\d*$/;

      if (positiveIntegerPattern.test(quantityOrSymbol)) {
        const tmpArr = token.highlight.split(' ');
        tmpArr[1] = quantityOrSymbol;
        token.highlight = tmpArr.join(' ');
      }

      const highlightArray = token.highlight.split(' ');

      const matchOnSymbol = symbolOrOn && token.symbol.toLowerCase().includes(symbolOrOn.toLowerCase());

      const matchOnAmount = positiveIntegerPattern.test(quantityOrSymbol);

      const matchOnNetwork = network && token.network.toLowerCase().includes(network.toLowerCase());

      // 0 swap  1 amount 2 symbol 3 on 4 network

      const highlight = highlightArray.reduce((acc, cur, index) => {
        if (index === 0) {
          return cur + ' ';
        }

        if (index === 1) {
          return acc + (matchOnAmount ? cur + ' ' : '');
        }

        if (index === 2) {
          return acc + (matchOnSymbol ? cur + ' ' : '');
        }

        if (index === 4) {
          return acc + (matchOnNetwork ? `on ${cur} ` : '');
        }

        return acc;
      }, '');

      return {
        ...token,
        highlight,
        left: token.highlight.substring(highlight.length, token.highlight.length),
        dappName: token.dappName || 'ZkEvm',
        full: token.highlight,

        matched: (matchOnSymbol || !symbolOrOn) && (matchOnNetwork || !network) && (matchOnAmount || !quantityOrSymbol),
      };
    });

    const finalList = hintList.filter((t) => !!t.matched);

    onLoad(finalList);

    return <div />;
  }

  if (isActionSupply) {
    const hintList = [
      {
        full: 'Supply on 0vix',
        highlight: 'Supply on 0vix',
        dexName: '0vix',
      },
    ];
    const matchOnDex = symbolOrOn && hintList[0].dexName.toLowerCase().includes(symbolOrOn.toLowerCase());

    const list = hintList.map((item) => {
      return {
        full: item.full,
        highlight: matchOnDex ? item.highlight : 'Supply',
        left: matchOnDex ? '' : 'on 0vix',
        dappName: item.dexName,
        matched: true,
      };
    });
    onLoad(list);
    return <div />;
  }

  if (isActionBorrow) {
    const hintList = [
      {
        full: 'Borrow on 0vix',
        highlight: 'Borrow on 0vix',
        dexName: '0vix',
      },
    ];
    const matchOnDex = symbolOrOn && hintList[0].dexName.toLowerCase().includes(symbolOrOn.toLowerCase());

    const list = hintList.map((item) => {
      return {
        full: item.full,
        highlight: matchOnDex ? item.highlight : 'Borrow',
        left: matchOnDex ? '' : 'on 0vix',
        dappName: item.dexName,
        matched: true,
      };
    });
    onLoad(list);
    return <div />;
  }

  if (isActionRepay) {
    const hintList = [
      {
        full: 'Repay on 0vix',
        highlight: 'Repay on 0vix',
        dexName: '0vix',
      },
    ];
    const matchOnDex = symbolOrOn && hintList[0].dexName.toLowerCase().includes(symbolOrOn.toLowerCase());

    const list = hintList.map((item) => {
      return {
        full: item.full,
        highlight: matchOnDex ? item.highlight : 'Repay',
        left: matchOnDex ? '' : 'on 0vix',
        dappName: item.dexName,
        matched: true,
      };
    });
    onLoad(list);

    return <div />;
  }

  if (isActionWithdraw) {
    const hintList = [
      {
        full: 'Withdraw on 0vix',
        highlight: 'Withdraw on 0vix',
        dexName: '0vix',
      },

      {
        full: 'Withdraw on Gamma',
        highlight: 'Withdraw on Gamma',
        dexName: 'Gamma',
      },
    ];

    const list = hintList.map((item) => {
      const matchOnDex = symbolOrOn && item.dexName.toLowerCase().includes(symbolOrOn.toLowerCase());

      return {
        full: item.full,
        highlight: matchOnDex ? item.highlight : 'Withdraw',
        left: matchOnDex ? '' : `on ${item.dexName}`,
        dappName: item.dexName,
        matched: matchOnDex || !symbolOrOn,
      };
    });
    onLoad(list);

    return <div />;
  }

  if (isDepositGamma) {
    const hintList = [
      {
        full: 'Deposit on Gamma',
        highlight: 'Deposit on Gamma',
        dexName: 'Gamma',
      },
    ];
    const matchOnDex = symbolOrOn && hintList[0].dexName.toLowerCase().includes(symbolOrOn.toLowerCase());

    const list = hintList.map((item) => {
      return {
        full: item.full,
        highlight: matchOnDex ? item.highlight : 'Deposit',
        left: matchOnDex ? '' : 'on Gamma',
        dappName: item.dexName,
        matched: true,
      };
    });
    onLoad(list);

    return <div />;
  }
  return <div />;
};

SearchConfig.getLayout = useDefaultLayout;

export default SearchConfig;

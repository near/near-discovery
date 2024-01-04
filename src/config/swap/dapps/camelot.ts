import { arbitrum } from '@/config/tokens/arbitrum';

const basic = {
  name: 'Camelot',
  logo: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxOTkuNyAyMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE5OS43IDIwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6I0ZBRkFGQTt9DQoJLnN0MXtmaWxsOiNGRkFGMUQ7fQ0KCS5zdDJ7ZmlsbDojMTYxNjE2O30NCjwvc3R5bGU+DQo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTE3LjEsMjAwdi04Mi4yYzE5LjYsMi4xLDMyLjksMTEuMSwzMi45LDExLjFsMTIuNS0xNC4xYy0yMC41LTE0LjYtNTAuOS0xNS4yLTUwLjktMTUuMmwtNS01NS4yDQoJYzMuMy0yLjIsNS41LTUuOSw1LjUtMTAuMmMwLTYuNy01LjUtMTIuMi0xMi4yLTEyLjJzLTEyLjIsNS41LTEyLjIsMTIuMmMwLDQuMywyLjIsOC4xLDUuNSwxMC4ybC01LDU1LjJjMCwwLTMwLjQsMC41LTUwLjksMTUuMg0KCWwxMi41LDE0LjFjMCwwLDEzLjMtOSwzMi45LTExLjFWMjAwQzYuMSwxNDMuMi0wLjIsNjAuNywwLDMzLjNjMC01LjcsMy40LTEwLjksOC42LTEzLjJDMjMuOSwxMy4zLDU4LjgsMCw5OS44LDANCgljNDEsMCw3NS45LDEzLjMsOTEuMiwyMC4xYzUuMiwyLjMsOC42LDcuNSw4LjYsMTMuMkMxOTkuOCw2MC43LDE5My41LDE0My4yLDExNy4xLDIwMHoiLz4NCjwvc3ZnPg0K',
  amountOutFn: 'bluebiu.near/widget/Arbitrum.Swap.CamelotAmountOut',
};

const networks = {
  42161: {
    factoryAddress: '0x6EcCab422D763aC031210895C81787E87B43A652',
    routerAddress: '0xc873fEcbd354f5A56E00E710B90EF4201db2448d',
    defaultCurrencies: {
      input: arbitrum['eth'],
      output: arbitrum['usdt'],
    },
    tokens: [
      arbitrum['eth'],
      arbitrum['grail'],
      arbitrum['arb'],
      arbitrum['usdc.e'],
      arbitrum['usdc'],
      arbitrum['usdt'],
      arbitrum['fctr'],
      arbitrum['winr'],
      arbitrum['pendle'],
      arbitrum['gmx'],
      arbitrum['trove'],
      arbitrum['jones dao'],
    ],
  },
};

export { basic, networks };

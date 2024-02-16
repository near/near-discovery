export const iconMap: any = {
  'native bridge': 'https://ipfs.near.social/ipfs/bafkreigawbz26l7mhfewlxwnjomos6njdkchnfnw2dnb6xtzf7j2t6jdxm',
  'Pancake Swap': 'https://repository-images.githubusercontent.com/440462673/6872d684-f7ed-463c-9a5c-76542eddbcc4',

  Gamma: 'https://ipfs.near.social/ipfs/bafkreial4i3eb5uuxkhecn7nwos76km3qvb7jzxmups57rkxizr5i7dyaa',
  QuickSwap: 'https://ipfs.near.social/ipfs/bafkreibzpvczmrw2jvua3lsuwmvb7ldlztsszbo4dd6jagfsqkk6ub5opa',
  Balancer: 'https://ipfs.near.social/ipfs/bafkreieg6jpfhxra6c3dspiijg6fj5ga5dpqcn4vmtzdceqa3nheredq5m',
};

export const WETH_ADDRESS = '0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9';
export const WETH_ABI = [
  {
    constant: false,
    inputs: [],
    name: 'deposit',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ internalType: 'uint256', name: 'wad', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
export const ALLOWANCE_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];
export const APPROVE_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
export const TOKEN_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];
export const ROUTER_ABI = [
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: 'data',
        type: 'bytes[]',
      },
    ],
    name: 'multicall',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'results',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'tokenIn',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'tokenOut',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountIn',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountOutMinimum',
            type: 'uint256',
          },
          {
            internalType: 'uint160',
            name: 'limitSqrtPrice',
            type: 'uint160',
          },
        ],
        internalType: 'struct ISwapRouter.ExactInputSingleParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'exactInputSingle',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountMinimum',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    name: 'unwrapWNativeToken',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountOutMin',
        type: 'uint256',
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'swapExactTokensForTokens',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountMinimum',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
    ],
    name: 'unwrapWETH9',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
];
export const SwapTokens = [
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
export const CHAIN_ID = 1101;
export const Tokens = {
  native: {
    chainId: CHAIN_ID,
    address: 'native',
    decimals: 18,
    symbol: 'ETH',
    name: 'Ether',
    icon: 'https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq',
  },
  '0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035': {
    chainId: CHAIN_ID,
    address: '0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035',
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin',
    icon: 'https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla',
  },
  '0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9': {
    chainId: CHAIN_ID,
    address: '0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    icon: 'https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4',
  },
  '0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1': {
    chainId: CHAIN_ID,
    address: '0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1',
    decimals: 8,
    symbol: 'WBTC',
    name: 'Wrapped BTC',
    icon: 'https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q',
  },
  '0xa2036f0538221a77a3937f1379699f44945018d0': {
    chainId: CHAIN_ID,
    address: '0xa2036f0538221a77a3937f1379699f44945018d0',
    decimals: 18,
    symbol: 'MATIC',
    name: 'Matic Token',
    icon: 'https://ipfs.near.social/ipfs/bafkreih5yowurclpyrr5bwzonh76ywld22riv4mjp2scne6ye7746dcjl4',
  },
  '0x1E4a5963aBFD975d8c9021ce480b42188849D41d': {
    chainId: CHAIN_ID,
    address: '0x1E4a5963aBFD975d8c9021ce480b42188849D41d',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
    icon: 'https://ipfs.near.social/ipfs/bafkreih45jy7ggj45ck34rf736kb67smsoa52wd7e46c2grh6etd3bhe5i',
  },
  '0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4': {
    chainId: CHAIN_ID,
    address: '0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4',
    decimals: 18,
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    icon: 'https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu',
  },
};
export const dexs = {
  QuickSwap: {
    name: 'QuickSwap',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgcng9IjEwIiBmaWxsPSIjMEYxMTI2Ii8+CjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgcng9IjEwIiBmaWxsPSJ1cmwoI3BhdHRlcm4wKSIvPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9InBhdHRlcm4wIiBwYXR0ZXJuQ29udGVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgd2lkdGg9IjEiIGhlaWdodD0iMSI+Cjx1c2UgeGxpbms6aHJlZj0iI2ltYWdlMF81MV82MTUiIHRyYW5zZm9ybT0ic2NhbGUoMC4wMzEyNSkiLz4KPC9wYXR0ZXJuPgo8aW1hZ2UgaWQ9ImltYWdlMF81MV82MTUiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDQUFBQUFnQ0FZQUFBQnplbnIwQUFBSzJtbERRMUJKUTBNZ1VISnZabWxzWlFBQVNJbVZsd2RVRTlrYWdPL01wQmRhQUFFcG9YZWtFMEJLNktFSTBrRlVRaEpJS0NFbUJCVlJVVmxjd2JXZ0lnTHFpcTZLS0xpNkFySVd4SUp0VWJEWERiSUlxT3Rpd1lhYW5jQWo3TzQ3Nzczei9uUHUzTy84ODkrLzNIUHZuSDhBb0lheFJhSmNXQTJBUEdHQk9EWTBnSjZja2tySER3SUlZQUVKbUFLRXpaR0ltREV4a1FDVnlmbnY4dTQyYW8zS0RYdUZyMzkvLzE5Rmc4dVRjQUNBMGxETzRFbzRlU2gzb09NWlJ5UXVBQUE1aU9wTkZ4YUlGSHdkWlUweG1pREt2eWs0YTRJL0tEaGpuREdVY1p2NDJFQ1U2UUFRS0d5Mk9Bc0FpaDJxcHhkeXNsQS9GRVVOamtLdVFJaHlNY3ErSEQ2YmkvSUpsTzN5OHZJVlBJU3lGV292QW9DSzdnNWdaUHpGWjliZi9HY28vYlBaV1VxZXFHdGNDRUVDaVNpWHZmai8zSnIvTFhtNTBza1lGdWlnOE1WaHNZcDQ2UDdkemNtUFVMSXdZMWIwSkF1NEV6a3BtQzhOUzVoa2ppUXdkWks1N0tBSTVkcmNXWkdUbkNrSVlTbjlGTERpSjVrbkNZNmJaSEYrckRKV3BqaVFPY2xzOFhoY0Vzb3lhVTZDVXMvbnNaVCtpL2p4U1pOY0tFaWNOY21TbkxpSUtadEFwVjRzalZYbXp4T0dCa3pGRFZIV25pZjVTNzBDbG5KdEFUOCtURms3ZXlwL25wQTU1Vk9Tck15Tnl3c0tuckpKVU5xTENnS1VzVVM1TVVwN1htNm9VaThwakZPdUxVQVA1OVRhR09VZVpyUERZeVlaQ0VBVVlBTU9YWFdTQUNqZ0xTcFFGQktZTDFvc0ZtVHhDK2hNOUxieDZDd2h4OEdPN3V6bzdBS0E0dTVPSEllUmErTjNFdEpWbjlLVmJRTEFEeXVYeTF1bWRHR1hBVGhTQVFEWmRVcG5pUjVVRmZUY1h3emdTTVdGRXpxTTRxSDRJcWdDVGFBTERORXZneFd3Qjg3QUhYZ0RmeEFNd2tFMGlBY3BZQjZhS3gva0FURllDSXJCQ2xBR0tzQUdzQVhVZ0oxZ045Z1BEb0Vqb0JXY0FHZkFCWEFGWEFlM3dBTWdBd1BnT1JnQjc4QVlCRUY0aUFyUklGM0lDREtIYkNGbmlBSDVRc0ZRSkJRTHBVRHBVQllraEtSUU1iUUtxb0Fxb1Jwb0Y5UUEvUWdkaDg1QWw2QWU2QjdVQncxRHI2RlBNQUpUWUUzWUFMYUFaOEFNbUFsSHdQSHdYRGdMWGdBWHdhWHdPcmdhcm9jUHdpM3dHZmdLZkF1V3djL2hVUVFnWkVRYk1VYnNFUVlTaUVRanFVZ21Ja2FXSWVWSUZWS1BOQ0h0U0JkeUE1RWhMNUNQR0J5R2hxRmo3REhlbURCTUFvYURXWUJaaGxtTHFjSHN4N1Jnem1GdVlQb3dJNWl2V0NwV0gydUw5Y0t5c01uWUxPeENiQm0yQ3JzWGV3eDdIbnNMTzRCOWg4UGh0SEdXT0E5Y0dDNEZsNDFiZ2x1TDI0NXJ4blhnZW5EOXVGRThIcStMdDhYNzRLUHhiSHdCdmd5L0RYOFFmeHJmaXgvQWZ5Q1FDVVlFWjBJSUlaVWdKS3drVkJFT0VFNFJlZ21EaERHaUd0R2M2RVdNSm5LSmk0bnJpWHVJN2NScnhBSGlHRW1kWkVueUljV1Rza2tyU05Xa0p0SjUwa1BTR3pLWmJFTDJKTThtQzhnbDVHcnlZZkpGY2gvNUkwV0RZa01KcEtSUnBKUjFsSDJVRHNvOXloc3FsV3BCOWFlbVVndW82NmdOMUxQVXg5UVBLalFWQnhXV0NsZGx1VXF0U290S3I4cExWYUtxdVNwVGRaNXFrV3FWNmxIVmE2b3YxSWhxRm1xQmFteTFaV3ExYXNmVjdxaU5xdFBVbmRTajFmUFUxNm9mVUwra1BxU0IxN0RRQ05iZ2FwUnE3Tlk0cTlGUFEyaW10RUFhaDdhS3RvZDJuamFnaWRPMDFHUnBabXRXYUI3UzdOWWMwZExRY3RWSzFGcWtWYXQxVWt1bWpXaGJhTE8wYzdYWGF4L1J2cTM5YVpyQk5PWTAzclExMDVxbTlVNTdyek5keDErSHAxT3UwNnh6UytlVExsMDNXRGRIZDZOdXErNGpQWXllamQ1c3ZZVjZPL1RPNjcyWXJqbmRlenBuZXZuMEk5UHY2OFA2TnZxeCtrdjBkK3RmMVI4MU1EUUlOUkFaYkRNNGEvRENVTnZRM3pEYmNMUGhLY05oSTVxUnI1SEFhTFBSYWFObmRDMDZrNTVMcjZhZm80OFk2eHVIR1V1TmR4bDNHNCtaV0pva21LdzBhVFo1WkVveVpaaG1tbTQyN1RRZE1UTXlpeklyTm1zMHUyOU9OR2VZODgyM21uZVp2N2V3dEVpeVdHM1JhakZrcVdQSnNpeXliTFI4YUVXMThyTmFZRlZ2ZGRNYVo4Mnd6ckhlYm4zZEJyWnhzK0hiMU5wY3M0VnQzVzBGdHR0dGUreXdkcDUyUXJ0NnV6djJGSHVtZmFGOW8zMmZnN1pEcE1OS2gxYUhselBNWnFUTzJEaWphOFpYUnpmSFhNYzlqZytjTkp6Q25WWTZ0VHU5ZHJaeDVqalhPdDkwb2JxRXVDeDNhWE41NVdycnluUGQ0WHJYamVZVzViYmFyZFB0aTd1SHU5aTl5WDNZdzh3ajNhUE80dzVEa3hIRFdNdTQ2SW4xRFBCYzdubkM4Nk9YdTFlQjF4R3ZQN3p0dlhPOEQzZ1B6YlNjeVp1NVoyYS9qNGtQMjJlWGo4eVg3cHZ1KzcydnpNL1lqKzFYNy9mRTM5U2Y2Ny9YZjVCcHpjeG1IbVMrREhBTUVBY2NDM2dmNkJXNE5MQWpDQWtLRFNvUDZnN1dDRTRJcmdsK0hHSVNraFhTR0RJUzZoYTZKTFFqREJzV0ViWXg3QTdMZ01WaE5iQkd3ajNDbDRhZmk2QkV4RVhVUkR5SnRJa1VSN1pId1ZIaFVadWlIczR5bnlXYzFSb05vbG5SbTZJZnhWakdMSWo1ZVRadWRzenMydGxQWTUxaWkyTzc0bWh4OCtNT3hMMkxENGhmSC84Z3dTcEJtdENacUpxWWx0aVErRDRwS0treVNaWThJM2xwOHBVVXZSUkJTbHNxUGpVeGRXL3E2SnpnT1Z2bURLUzVwWldsM1o1ck9YZlIzRXZ6OU9ibHpqczVYM1UrZS83UmRHeDZVdnFCOU0vc2FIWTllelNEbFZHWE1jSUo1R3psUE9mNmN6ZHpoM2srdkVyZVlLWlBabVhtVUpaUDFxYXNZYjRmdjRyL1FoQW9xQkc4eWc3TDNwbjlQaWM2WjErT1BEY3B0em1Qa0plZWQxeW9JY3dSbnNzM3pGK1UzeU95RlpXSlpBdThGbXhaTUNLT0VPK1ZRSks1a3JZQ1RiUkp1aXExa240ajdTdjBMYXd0L0xBd2NlSFJSZXFMaEl1dUxyWlp2R2J4WUZGSTBROUxNRXM0U3pxTGpZdFhGUGN0WlM3ZHRReGFsckdzYzducDh0TGxBeVdoSmZ0WGtGYmtyUGhscGVQS3lwVnZWeVd0YWk4MUtDMHA3ZjhtOUp2R01wVXljZG1kMWQ2cmQzNkwrVmJ3YmZjYWx6WGIxbnd0NTVaZnJuQ3NxS3I0dkphejl2SjNUdDlWZnlkZmw3bXVlNzM3K2gwYmNCdUVHMjV2OU51NHYxSzlzcWl5ZjFQVXBwYk45TTNsbTk5dW1iL2xVcFZyMWM2dHBLM1NyYkxxeU9xMmJXYmJObXo3WE1PdnVWVWJVTnRjcDErM3B1NzlkdTcyM2gzK081cDJHdXlzMlBucGU4SDNkM2VGN21xcHQ2aXYybzNiWGJqNzZaN0VQVjAvTUg1bzJLdTN0Mkx2bDMzQ2ZiTDlzZnZQTlhnME5CelFQN0MrRVc2VU5nNGZURHQ0L1ZEUW9iWW0rNlpkemRyTkZZZkJZZW5oWnorbS8zajdTTVNSenFPTW8wMC9tZjlVZDR4MnJMd0ZhbG5jTXRMS2I1VzFwYlQxSEE4LzN0bnUzWDdzWjRlZjk1MHdQbEY3VXV2aytsT2tVNlduNUtlTFRvOTJpRHBlbk1rNjA5ODV2L1BCMmVTek44L05QdGQ5UHVMOHhRc2hGODUyTWJ0T1gvUzVlT0tTMTZYamx4bVhXNis0WDJtNTZuYjEyQzl1dnh6cmR1OXV1ZVp4cmUyNjUvWDJucGs5cDNyOWVzL2NDTHB4NFNicjVwVmJzMjcxM0U2NGZmZE8yaDNaWGU3ZG9YdTU5MTdkTDd3LzlxRGtJZlpoK1NPMVIxV1A5Ui9YLzJyOWE3UE1YWGF5TDZqdjZwTzRKdy82T2YzUGY1UDg5bm1nOUNuMWFkV2cwV0REa1BQUWllR1E0ZXZQNWp3YmVDNTZQdmFpN0hmMTMrdGVXcjM4NlEvL1A2Nk9KSThNdkJLL2tyOWUrMGIzemI2M3JtODdSMk5HSDcvTGV6ZjJ2dnlEN29mOUh4a2Z1ejRsZlJvY1cvZ1ovN242aS9XWDlxOFJYeC9LOCtSeUVWdk1IbThGRUhUQW1aa0F2TjZIOXNZcEFORFF2cHcwWjZLM0hoZG80bjlnbk1CLzRvbitlMXpjQVdoQ0owVmI1TjhCd0ZGRk8rdVAraTRCSUJxZDQvMEI3T0tpSFA4U1NhYUw4NFF2bFVZQThNWnkrZXQ4QUlqbytCd3FsNC9GeU9WZjZ0Qmtid0p3YW1paXAxY0lEdTNsbTJqblg2dnllcitXbElCL3lFUy8vNWNhL3prRFJRYXU0Si96bi9SNkdmK3ZQbk92QUFBQU9HVllTV1pOVFFBcUFBQUFDQUFCaDJrQUJBQUFBQUVBQUFBYUFBQUFBQUFDb0FJQUJBQUFBQUVBQUFBZ29BTUFCQUFBQUFFQUFBQWdBQUFBQUk5T1FNa0FBQWM5U1VSQlZGZ0p4VmQ3VkZSMUh2ODRnTUJNekRBOEZIRFVPUzZ2aUN4cmEyMUJnOVhDc21RMWQ4dWpFclcyNW5iY090dXV0bjkwMnJMTzhiVFdtbVV1QitxVVlabXZ6ZGN1U0NUSHdKT3RydmtBa1dFRlNoaEJuZ01ETXpFTWV6Ky80WGU3TTQ2cGYrM3ZuUHY0ZmQvdjM3M0EvM21OdTFIOVJVVkZQOHZMeTd0MWNIRFFPand5RWtQK3NKQ1FicjFlMzF4ZVhuNW01Y3FWeDI1VTVqWHBxZlRVbVRQdkRnd01kQTBQRDQ5ZWJSRkhHdEtTNTVxQ3IwV1FsWlVWWmJQWlNnZWNReU5YVXhvTWZ2eEU3U2lOSVM5bFhFdFBVRHc5b0RlQkNpNzNEWTFXMTNlT2JpcHI4cnNJSTQ3Ry9tMVRxY3BHR1Q4V2phQTFjUGp3NFdYWjJka2ZoWWFHcXNiVm5PL0M3bVB0T05udUZMRFFFQi9PTStJUisyN1hDR1ltNlBGemZSTWFXdnZ3MnBvQ2xkZmo4YUMxdGZVcHE5VmFvZ0xIWG5TQmdFRGxuUTRYL3JDMURyL2JZVU9idzQwWkV3M2ltaFlWZ3RqeHdLTHA4VUlFbGIvMmFDcU8vNmNKVmQxbXdVTmVMam95YWRLa1lzb1dBTTB0UlBNT2hpby9QLytmMG5PYnZSOFBiVG1EQ01YTTJWWVQ0bThhRDdmSEM2ZmJnd3Y5STdndjNZelZlVmFZdzNYNDQ4UEpxS3c4aHZjT25vZDUray9SMXU5R1VZMGRjMU5OaUkwS2gwNm5nOFZpV2FSY1pRY09IR2lWZXYxUzBOYlcxcENZbUpoQ0pKVXZMcW5GbktsR21DSkQwVGZrRVlyNzNDUElTakZqeVQwSmlETkdDRG5PUVpkMy9WLy9ydHV3K1N1a3JuNE9NUkUvK01YVTdGcHhDMUlTZmJYb2REcTdsVGEyMXRUVTlKTlpUY0haczJmWFNPVU0zVzlMNjBWT3Rjb040YUY0cCtCbXJKcGpRVTFERDE1OGVhTXdJTnFVcTR1TmljZm5YMjdHS3c5TVJZNFNMU3JtUldNb1M2YkRZRERFRkJjWHJ4V015azJOQUt1VlNDSmUzdG1BNnUrY3lKNXN1TUp6aG54bDhXbU1yLzhDNjljOTdhMnZ2NkF6bVl4SS9vbEZ5aFJQUnVYOUx5L3A5cHkrTEF4WmxCNkRsMzZWcXVMeTdwOGJ6U2dJQTdTRnB3MDljNTA1eFlnYVc0OWdYREl6QVZtcFppZ1o4UnIwckl3ckZ6MXRhYnlBZ1FHWFVuZ1QwTzZKRk4xVDJlTHdTMFZMUzR2b0N0RkxTbUhNazRWWGRyb0xFd3poUWpLVlB6a3J3VHNsTmx4SHhUTG5DbElvYi96dlJVRVhIUitIYUgyb3FIYlN4TjJSSVVKKzVJc2oyRkw4RDh5OE93MHprMzZCajZ2dFNoUjh0ZUQxZW4rcE1KZUlDTWp3TTJ5L2VmK2N6aFR1SzZMTlQyVGdyVStQNHZtbHM0VWkzdGpUY2pXM1hNTGNSNTZIczdzVHViTm1ZUDZEczdCNFlaNWZkQmpSd3JlcUJNdGtpMFhVRUkya25MQ3dzSEhqT0NxcnE2c2RwQ0F4QzJhaUVtTWFVZlRVZE1ISXNCN2NYNDdHeGlhY2I3aUlubDRuek5FR3BLVmF3T0xiWEhJQ2ZRNG4rcDE5bUpnMGlnODNyY1c5cys4UXZMeVJmMG5KT1hRNDNXb2FhRUJPVGs0NlU1REVEVlBRNGZoZUZBd05ZTHR4Ylh4N0cvNjhiaitpRENheG41ak9Zak9oK1d3UHFvNmVVNVIrQlV0aUVreEdnN2d3Q3N5ZDh3eEtQbmdCankvTkZ6ejArQy96cDRoaFJoMHBpUUtNZ29LQ2FGRURNditkL2Q4TFRKZnk0SWg5N0oyVE9LRjRSK1dXZSs5RTdQUzdmSnhqZDlMMDFaNUUvOGw2UDdnMTR4NnNLRndQNitUSmFpU3kwbUtWdG02RjFDRVpoQUV5QXJxT0N3bzhSQ2duUWJzeWZLeVBMOGRnaDYvWTVOeVh6SHpTcU9IMmRyamFmSjBpY1RSaThiSS80ZkszbFJLRUIyZjR4allCMG1tL1ZrcEtNTU43dEFMeW9DRWhsZW9uV01URmZiQmx2TzEyVVFPQnVBRlhQUFo4ZGtnRloweTZDWEZSeWdHaUxEcTlkZXZXWHAweURNNUxDZzZVUzdWVnd1TkFJNEo1TC9tR0x0bEZBY3E5ZkxJMnR1Lzh3UUN6SVF4cGlRYUJaZ1NvVzBTZ3VibjVhMEt0VXhOdys2MnBhQzByRlo1cmpaQkNBNTgwclB1YlNyVkkyUTNhdGIvQ2x6N0N4SXdZT3ovc2RydU5NR0dBMiszZXpRMnRtajh2RzYyMTM2SnAyNFlySWtFYXVhUnhGMHMvRVhOZ2RLUVJ2VDJuSkZwOWVucGEvR2FIUlBUMjl1N2d1eGhFeWl4SUt6LzBlUjNISzN2MjVzejVrZzRKdCtTQU9SNGZtNkRDK01McXArY2NRdG8xTGlUWjE0NWp3SXYyTmd4MWJOZVNDSU00QTVnQzlURGk5MXR5Y3ZKU1VuNjRiYTlvbytoRXZXRHN0UStDNzRhWU9LRlE3djJram0wQ0RTRFlkdXBOUDlLbXBxYUQwNlpOZTRoQXRRc0tDd3RYY1JRVHlBR3k4TmRab0NJdWFZajBWdTRGVW5NTFZNNTZlR2JGblJvS1gvVlhWRlNzazBBMUFnUm9UMFcyeVFQNXExRjE2QnZWQU1rVTdCbW9uRFFNZjJmekIzNW5RMjF0N2RyTXpNelhwUXcxQWdUazV1YVdLaDJ4amU4c3lJcURXL0QwN3g5VkkwRjRzQlZNT2IwdjI3VUcybU9ib2RjcXB5dy9Bd2hJU1VsWlJrSytjNzM5eG5QWXMzZURhRStaRXNKWkQxUWNiYjdOcitpb09DTEpqSC90ZmxZZHc2U256T1hMbHkvaHUzYjVwVUNMNE45TlJucjZLamt5V1IvSGo5ZnBkdTA5Z3FxNmZqRjZaYy96SUtMU25Jd281VmpPUU43OXM5V3dNNVdNS2gzVHlyK3VkOVpFc0o4VC9uellHcjhiMVY3OEtRbGNwS09NNjFKMk5TSitML0NETlpnaGdRcmxuclIxZFhXdlhzOXYyVlZURU13Zy9qY3NXTEJnM3REUTBGMFJFUkdwUnFNeGxuUU9oNlBMNVhJMVJFWkcvbnZmdm4xbE4vS0gvRC93c3k4cHFET2lWUUFBQUFCSlJVNUVya0pnZ2c9PSIvPgo8L2RlZnM+Cjwvc3ZnPgo=',
    routerAddress: '0xF6Ad3CcF71Abb3E12beCf6b3D2a74C963859ADCd',
    uniType: 'v2',
    defaultCurrencies: {
      input: Tokens['native'],
      output: Tokens['0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035'],
    },
    tokens: [
      Tokens['native'],
      Tokens['0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035'],
      Tokens['0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9'],
      Tokens['0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1'],
      Tokens['0xa2036f0538221a77a3937f1379699f44945018d0'],
      Tokens['0x1E4a5963aBFD975d8c9021ce480b42188849D41d'],
      Tokens['0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4'],
    ],
  },
  Balancer: {
    name: 'Balancer',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgcng9IjEwIiBmaWxsPSJ1cmwoI3BhdHRlcm4wKSIvPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9InBhdHRlcm4wIiBwYXR0ZXJuQ29udGVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgd2lkdGg9IjEiIGhlaWdodD0iMSI+Cjx1c2UgeGxpbms6aHJlZj0iI2ltYWdlMF81MV82MzciIHRyYW5zZm9ybT0ic2NhbGUoMC4wMzEyNSkiLz4KPC9wYXR0ZXJuPgo8aW1hZ2UgaWQ9ImltYWdlMF81MV82MzciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDQUFBQUFnQ0FJQUFBRDhHTzJqQUFBSzJtbERRMUJKUTBNZ1VISnZabWxzWlFBQVNJbVZsd2RVRTlrYWdPL01wQmRhQUFFcG9YZWtFMEJLNktFSTBrRlVRaEpJS0NFbUJCVlJVVmxjd2JXZ0lnTHFpcTZLS0xpNkFySVd4SUp0VWJEWERiSUlxT3Rpd1lhYW5jQWo3TzQ3Nzczei9uUHUzTy84ODkrLzNIUHZuSDhBb0lheFJhSmNXQTJBUEdHQk9EWTBnSjZja2tySER3SUlZQUVKbUFLRXpaR0ltREV4a1FDVnlmbnY4dTQyYW8zS0RYdUZyMzkvLzE5Rmc4dVRjQUNBMGxETzRFbzRlU2gzb09NWlJ5UXVBQUE1aU9wTkZ4YUlGSHdkWlUweG1pREt2eWs0YTRJL0tEaGpuREdVY1p2NDJFQ1U2UUFRS0d5Mk9Bc0FpaDJxcHhkeXNsQS9GRVVOamtLdVFJaHlNY3ErSEQ2YmkvSUpsTzN5OHZJVlBJU3lGV292QW9DSzdnNWdaUHpGWjliZi9HY28vYlBaV1VxZXFHdGNDRUVDaVNpWHZmai8zSnIvTFhtNTBza1lGdWlnOE1WaHNZcDQ2UDdkemNtUFVMSXdZMWIwSkF1NEV6a3BtQzhOUzVoa2ppUXdkWks1N0tBSTVkcmNXWkdUbkNrSVlTbjlGTERpSjVrbkNZNmJaSEYrckRKV3BqaVFPY2xzOFhoY0Vzb3lhVTZDVXMvbnNaVCtpL2p4U1pOY0tFaWNOY21TbkxpSUtadEFwVjRzalZYbXp4T0dCa3pGRFZIV25pZjVTNzBDbG5KdEFUOCtURms3ZXlwL25wQTU1Vk9Tck15Tnl3c0tuckpKVU5xTENnS1VzVVM1TVVwN1htNm9VaThwakZPdUxVQVA1OVRhR09VZVpyUERZeVlaQ0VBVVlBTU9YWFdTQUNqZ0xTcFFGQktZTDFvc0ZtVHhDK2hNOUxieDZDd2h4OEdPN3V6bzdBS0E0dTVPSEllUmErTjNFdEpWbjlLVmJRTEFEeXVYeTF1bWRHR1hBVGhTQVFEWmRVcG5pUjVVRmZUY1h3emdTTVdGRXpxTTRxSDRJcWdDVGFBTERORXZneFd3Qjg3QUhYZ0RmeEFNd2tFMGlBY3BZQjZhS3gva0FURllDSXJCQ2xBR0tzQUdzQVhVZ0oxZ045Z1BEb0Vqb0JXY0FHZkFCWEFGWEFlM3dBTWdBd1BnT1JnQjc4QVlCRUY0aUFyUklGM0lDREtIYkNGbmlBSDVRc0ZRSkJRTHBVRHBVQllraEtSUU1iUUtxb0Fxb1Jwb0Y5UUEvUWdkaDg1QWw2QWU2QjdVQncxRHI2RlBNQUpUWUUzWUFMYUFaOEFNbUFsSHdQSHdYRGdMWGdBWHdhWHdPcmdhcm9jUHdpM3dHZmdLZkF1V3djL2hVUVFnWkVRYk1VYnNFUVlTaUVRanFVZ21Ja2FXSWVWSUZWS1BOQ0h0U0JkeUE1RWhMNUNQR0J5R2hxRmo3REhlbURCTUFvYURXWUJaaGxtTHFjSHN4N1Jnem1GdVlQb3dJNWl2V0NwV0gydUw5Y0t5c01uWUxPeENiQm0yQ3JzWGV3eDdIbnNMTzRCOWg4UGh0SEdXT0E5Y0dDNEZsNDFiZ2x1TDI0NXJ4blhnZW5EOXVGRThIcStMdDhYNzRLUHhiSHdCdmd5L0RYOFFmeHJmaXgvQWZ5Q1FDVVlFWjBJSUlaVWdKS3drVkJFT0VFNFJlZ21EaERHaUd0R2M2RVdNSm5LSmk0bnJpWHVJN2NScnhBSGlHRW1kWkVueUljV1Rza2tyU05Xa0p0SjUwa1BTR3pLWmJFTDJKTThtQzhnbDVHcnlZZkpGY2gvNUkwV0RZa01KcEtSUnBKUjFsSDJVRHNvOXloc3FsV3BCOWFlbVVndW82NmdOMUxQVXg5UVBLalFWQnhXV0NsZGx1VXF0U290S3I4cExWYUtxdVNwVGRaNXFrV3FWNmxIVmE2b3YxSWhxRm1xQmFteTFaV3ExYXNmVjdxaU5xdFBVbmRTajFmUFUxNm9mVUwra1BxU0IxN0RRQ05iZ2FwUnE3Tlk0cTlGUFEyaW10RUFhaDdhS3RvZDJuamFnaWRPMDFHUnBabXRXYUI3UzdOWWMwZExRY3RWSzFGcWtWYXQxVWt1bWpXaGJhTE8wYzdYWGF4L1J2cTM5YVpyQk5PWTAzclExMDVxbTlVNTdyek5keDErSHAxT3UwNnh6UytlVExsMDNXRGRIZDZOdXErNGpQWXllamQ1c3ZZVjZPL1RPNjcyWXJqbmRlenBuZXZuMEk5UHY2OFA2TnZxeCtrdjBkK3RmMVI4MU1EUUlOUkFaYkRNNGEvRENVTnZRM3pEYmNMUGhLY05oSTVxUnI1SEFhTFBSYWFObmRDMDZrNTVMcjZhZm80OFk2eHVIR1V1TmR4bDNHNCtaV0pva21LdzBhVFo1WkVveVpaaG1tbTQyN1RRZE1UTXlpeklyTm1zMHUyOU9OR2VZODgyM21uZVp2N2V3dEVpeVdHM1JhakZrcVdQSnNpeXliTFI4YUVXMThyTmFZRlZ2ZGRNYVo4Mnd6ckhlYm4zZEJyWnhzK0hiMU5wY3M0VnQzVzBGdHR0dGUreXdkcDUyUXJ0NnV6djJGSHVtZmFGOW8zMmZnN1pEcE1OS2gxYUhselBNWnFUTzJEaWphOFpYUnpmSFhNYzlqZytjTkp6Q25WWTZ0VHU5ZHJaeDVqalhPdDkwb2JxRXVDeDNhWE41NVdycnluUGQ0WHJYamVZVzViYmFyZFB0aTd1SHU5aTl5WDNZdzh3ajNhUE80dzVEa3hIRFdNdTQ2SW4xRFBCYzdubkM4Nk9YdTFlQjF4R3ZQN3p0dlhPOEQzZ1B6YlNjeVp1NVoyYS9qNGtQMjJlWGo4eVg3cHZ1KzcydnpNL1lqKzFYNy9mRTM5U2Y2Ny9YZjVCcHpjeG1IbVMrREhBTUVBY2NDM2dmNkJXNE5MQWpDQWtLRFNvUDZnN1dDRTRJcmdsK0hHSVNraFhTR0RJUzZoYTZKTFFqREJzV0ViWXg3QTdMZ01WaE5iQkd3ajNDbDRhZmk2QkV4RVhVUkR5SnRJa1VSN1pId1ZIaFVadWlIczR5bnlXYzFSb05vbG5SbTZJZnhWakdMSWo1ZVRadWRzenMydGxQWTUxaWkyTzc0bWh4OCtNT3hMMkxENGhmSC84Z3dTcEJtdENacUpxWWx0aVErRDRwS0treVNaWThJM2xwOHBVVXZSUkJTbHNxUGpVeGRXL3E2SnpnT1Z2bURLUzVwWldsM1o1ck9YZlIzRXZ6OU9ibHpqczVYM1UrZS83UmRHeDZVdnFCOU0vc2FIWTllelNEbFZHWE1jSUo1R3psUE9mNmN6ZHpoM2srdkVyZVlLWlBabVhtVUpaUDFxYXNZYjRmdjRyL1FoQW9xQkc4eWc3TDNwbjlQaWM2WjErT1BEY3B0em1Qa0plZWQxeW9JY3dSbnNzM3pGK1UzeU95RlpXSlpBdThGbXhaTUNLT0VPK1ZRSks1a3JZQ1RiUkp1aXExa240ajdTdjBMYXd0L0xBd2NlSFJSZXFMaEl1dUxyWlp2R2J4WUZGSTBROUxNRXM0U3pxTGpZdFhGUGN0WlM3ZHRReGFsckdzYzducDh0TGxBeVdoSmZ0WGtGYmtyUGhscGVQS3lwVnZWeVd0YWk4MUtDMHA3ZjhtOUp2R01wVXljZG1kMWQ2cmQzNkwrVmJ3YmZjYWx6WGIxbnd0NTVaZnJuQ3NxS3I0dkphejl2SjNUdDlWZnlkZmw3bXVlNzM3K2gwYmNCdUVHMjV2OU51NHYxSzlzcWl5ZjFQVXBwYk45TTNsbTk5dW1iL2xVcFZyMWM2dHBLM1NyYkxxeU9xMmJXYmJObXo3WE1PdnVWVWJVTnRjcDErM3B1NzlkdTcyM2gzK081cDJHdXlzMlBucGU4SDNkM2VGN21xcHQ2aXYybzNiWGJqNzZaN0VQVjAvTUg1bzJLdTN0Mkx2bDMzQ2ZiTDlzZnZQTlhnME5CelFQN0MrRVc2VU5nNGZURHQ0L1ZEUW9iWW0rNlpkemRyTkZZZkJZZW5oWnorbS8zajdTTVNSenFPTW8wMC9tZjlVZDR4MnJMd0ZhbG5jTXRMS2I1VzFwYlQxSEE4LzN0bnUzWDdzWjRlZjk1MHdQbEY3VXV2aytsT2tVNlduNUtlTFRvOTJpRHBlbk1rNjA5ODV2L1BCMmVTek44L05QdGQ5UHVMOHhRc2hGODUyTWJ0T1gvUzVlT0tTMTZYamx4bVhXNis0WDJtNTZuYjEyQzl1dnh6cmR1OXV1ZVp4cmUyNjUvWDJucGs5cDNyOWVzL2NDTHB4NFNicjVwVmJzMjcxM0U2NGZmZE8yaDNaWGU3ZG9YdTU5MTdkTDd3LzlxRGtJZlpoK1NPMVIxV1A5Ui9YLzJyOWE3UE1YWGF5TDZqdjZwTzRKdy82T2YzUGY1UDg5bm1nOUNuMWFkV2cwV0REa1BQUWllR1E0ZXZQNWp3YmVDNTZQdmFpN0hmMTMrdGVXcjM4NlEvL1A2Nk9KSThNdkJLL2tyOWUrMGIzemI2M3JtODdSMk5HSDcvTGV6ZjJ2dnlEN29mOUh4a2Z1ejRsZlJvY1cvZ1ovN242aS9XWDlxOFJYeC9LOCtSeUVWdk1IbThGRUhUQW1aa0F2TjZIOXNZcEFORFF2cHcwWjZLM0hoZG80bjlnbk1CLzRvbitlMXpjQVdoQ0owVmI1TjhCd0ZGRk8rdVAraTRCSUJxZDQvMEI3T0tpSFA4U1NhYUw4NFF2bFVZQThNWnkrZXQ4QUlqbytCd3FsNC9GeU9WZjZ0Qmtid0p3YW1paXAxY0lEdTNsbTJqblg2dnllcitXbElCL3lFUy8vNWNhL3prRFJRYXU0Si96bi9SNkdmK3ZQbk92QUFBQU9HVllTV1pOVFFBcUFBQUFDQUFCaDJrQUJBQUFBQUVBQUFBYUFBQUFBQUFDb0FJQUJBQUFBQUVBQUFBZ29BTUFCQUFBQUFFQUFBQWdBQUFBQUk5T1FNa0FBQUtwU1VSQlZFZ043VmJQYnlsUkZOWStHd2xkVklTb1JnaUpZQ0ZJYWtNclltM0R3dHJLenJZci80Q0ZoYi9BUmlMK2hRWWJpVlJVR20wMHRCWmE0a2VGUkVoRTZuMDZ5Y3lZdWRQbjhlemVUU2E1Yys0NTMzZm5uUFBkT3lmcjlWb2tNTHJkYmlhVHFkVnFyVmFyMld4K2ZuN1Nqbks1M0dnMEdnd0dtODBXRG9mVmFqVzl4SjJBZ0QvdTcrOERnUURYVmZnOUZBclY2M1UrRGl3aXZqV2J6UXBEQ2E2SXhlSjhQczlITytWSFBEdzg4STEvdEt4V3EwS2hRSERqY3lMWGY1VWZDaFJabWt3bWZEUkNpaWdubENFU2lVaWxVc0ttV0NaVU94cU5DaFVBVUNkNFdQNkVhYnZkYmpRYWIyOXZ3K0dRWGxZb0ZIcTkzbVF5NlhRNjJraWNrQWtXaTBVdWx5c1dpNlBSQ0JCMnUvM3k4cElUMytsMHF0WHE0K01qSEs2dnI0UEJvRVFpNGZoc1hqbFpTNlZTRG9jRExVRncvZEdFRUpmTGxVNm5PWUFNQVdwcnRWcC9CTmxwRVRUeitaeW1ZUWpRQmpzQjdPQ0VzdE1FakE3T3pzNTJpTjNKWmJsY01uNDAxY2ZIeDhYRkJiT3c3d3dneURZTnk2UUlKaWpsOXZaMmJ4cWNmZkY0bkYwQVlKTGI5T25wQ2JwSG01WktKWHpaRHg4RFVGVFY3WGI3L1g2aUpzZ0ViTVRwZFByKy9zNVdHYldxMVdwVktoVzU5MW54V3dUajhiaGNMbGNxRld3ZlI0WEZZc0h1T0NxREJtZXoyV0F3Z0hPdjEzdjVIdjErMytQeDNOemNPSjNPcTZ1cjgvTnpob0txQms2Q1BRNDRCb1UxZytMUThVZ3NoYndwY2l3VzIwTzZMRXpDRklBb09NQi9JY1hKWlBMcjY0dmdkWUFKZ09nUm1Vd20yanhIRytpQ1U1VGxhUGdpczlrc1FqWFF5OGZnQU94R1E2Z0RCSXpMNngvV0dWQm9IRXJTekZHQkF5U1JTS0R4RC9rYXI5ZUxHNFY5T1c4SmpZS0dndTd1N3ZCdjhmejgvUHI2aWtzTkF6OE5IR0pzVTZsVW9vd2FqUWEvWDFDbHorZmJrdGgzQUlHQUEzVGdLM01mSEFna0ZQNmZRQ2d6dFAzb0tmb054cWxNdUNzc242SUFBQUFBU1VWT1JLNUNZSUk9Ii8+CjwvZGVmcz4KPC9zdmc+Cg==',
    routerAddress: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
    uniType: 'v2',
    defaultCurrencies: {
      input: Tokens['native'],
      output: Tokens['0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035'],
    },
    tokens: [
      Tokens['native'],
      Tokens['0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035'],
      Tokens['0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9'],
      Tokens['0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1'],
      Tokens['0xa2036f0538221a77a3937f1379699f44945018d0'],
      Tokens['0x1E4a5963aBFD975d8c9021ce480b42188849D41d'],
      Tokens['0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4'],
    ],
  },
  'Pancake Swap': {
    name: 'Pancake Swap',
    logo: 'https://repository-images.githubusercontent.com/440462673/6872d684-f7ed-463c-9a5c-76542eddbcc4',
    factoryAddress: '0xFe8EC10Fe07A6a6f4A2584f8cD9FE232930eAF55',
    routerAddress: '0x89AE36E3B567b914a5E97E6488C6EB5b9C5d0231',
    uniType: 'v2',
    defaultCurrencies: {
      input: Tokens['native'],
      output: Tokens['0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035'],
    },
    tokens: [
      Tokens['native'],
      Tokens['0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035'],
      Tokens['0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9'],
      Tokens['0x1E4a5963aBFD975d8c9021ce480b42188849D41d'],
    ],
  },
};

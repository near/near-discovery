import Big from 'big.js';
import { Contract, utils } from 'ethers';
import type { ChangeEvent, FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';

import { ALLOWANCE_ABI, APPROVE_ABI, ROUTER_ABI, WETH_ABI } from './const';

const BridgeBtn = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: var(--button-color);
  color: var(--button-text-color);
  font-size: 16px;
  line-height: 1;
  border: none;
  transition: 0.5s;
  cursor: pointer;
  font-weight: 700;
  :hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const FootWrapper = styled.div`
  display: block;
  .clickExecution-popup-btn {
    display: flex;
    .popup-swap-input {
      width: 70%;
      position: relative;
      input {
        width: 100%;
        height: 48px;
        line-height: 48px;
        background: transparent;
        border: 1px solid rgba(235, 244, 121, 0.2);
        padding-right: 24px;
        border-radius: 12px;
        padding: 16px 56px 16px 16px;
        color: #ffffff;
        background: linear-gradient(0deg, #282a33, #282a33), linear-gradient(0deg, #343743, #343743);
      }
      input:focus {
        outline: none;
        color: #ffffff;
        border: 1px solid rgba(235, 244, 121, 0.2);
        background: none;
      }
      span {
        font-size: 14px;
        color: rgba(151, 154, 190, 1);
        position: absolute;
        right: 12px;
        top: 14px;
      }
    }
    .popup-swap-btn {
      width: 30%;
      margin-left: 12px;
      background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
      height: 48px;
      line-height: 48px;
      text-align: center;
      border-radius: 12px;
      font-size: 16px;
      color: rgba(2, 5, 30, 1);
    }

    .disabled {
      opacity: 0.5;
    }
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

type Currency = {
  address: string;
  symbol: string;
  decimals: number;
};
interface IProps {
  noPair: boolean;
  inputCurrency: Currency;
  outputCurrency: Currency;
  currencyCode: number;
  inputCurrencyAmount: number;
  outputCurrencyAmount: number;
  maxInputBalance: number;
  routerAddress: string;
  wethAddress: string;
  title: string;
  fee: string;
  uniType: string;
  chainName: any;
  handlerV2: any;
  handlerV3: any;
  handlerSolidly: any;
  handleSyncswap: any;
  stable: string;
  syncSwapPoolAddress: string;
  token: any;
  updateBalance: () => void;
}

const Bridge: FC<any> = ({
  noPair,
  inputCurrency,
  outputCurrency,
  currencyCode,
  inputCurrencyAmount,
  outputCurrencyAmount,
  maxInputBalance,
  routerAddress,
  wethAddress,
  title,
  fee,
  uniType,
  chainName,
  handlerV2,
  handlerV3,
  handlerSolidly,
  handleSyncswap,
  stable,
  syncSwapPoolAddress,
  updateBalance,
}) => {
  const { account, provider, chainId } = useAccount();
  const toast = useToast();
  const { addAction } = useAddAction('all-in-one');
  const [inputValue, setInputValue] = useState<any>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [btnText, setBtnText] = useState('Bridge');
  const [isApproved, setIsApproved] = useState(true);
  const [isApproving, setIsApproving] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [toastId, setToastId] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    if (Big(inputValue || 0).gt(Big(maxInputBalance || 0))) {
      setIsDisabled(true);
      setBtnText('Insufficient Balance');
    } else {
      if (!inputValue || inputValue == 0) {
        setIsDisabled(true);
        setBtnText('Bridge');
      } else {
        setIsDisabled(false);
        setBtnText('Bridge');
        if (inputCurrency.address !== 'native') {
          getAllowance();
        }
      }
    }
  }, [inputValue, maxInputBalance]);

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   console.info(e.target.value, parseFloat(e.target.value), value);
  //   setInputValue(value);
  // };

  // const getAllowance = async () => {
  //   // setBtnLoading(true);
  //   const TokenContract = new Contract(inputCurrency.address, ALLOWANCE_ABI, provider.getSigner());
  //   const allowanceRaw = await TokenContract.allowance(account, routerAddress);
  //   console.info(
  //     'allowanceRaw: ',
  //     allowanceRaw,
  //     allowanceRaw.toString(),
  //     utils.formatUnits(allowanceRaw._hex, inputCurrency.decimals),
  //   );
  //   // setBtnLoading(false);
  //   const isApprove = !Big(utils.formatUnits(allowanceRaw._hex, inputCurrency.decimals)).lt(Big(inputValue || 0));
  //   setIsApproved(isApprove);
  // };

  // const handleApprove = () => {
  //   const toastId = toast?.loading({
  //     title: `Approve ${inputValue} ${inputCurrency.symbol}`,
  //   });
  //   if (isApproving) return;

  //   setIsApproving(true);

  //   const TokenContract = new Contract(inputCurrency.address, APPROVE_ABI, provider.getSigner());

  //   TokenContract.approve(
  //     routerAddress,
  //     utils.parseUnits(Big(inputValue).toFixed(inputCurrency.decimals).toString(), inputCurrency.decimals),
  //   )
  //     .then((tx: any) => {
  //       tx.wait().then((res: any) => {
  //         console.info('approve-success', res);
  //         const { status, transactionHash } = res;
  //         toast?.dismiss(toastId);
  //         if (status !== 1) throw new Error('');

  //         setIsApproved(true);
  //         setIsApproving(false);
  //         toast?.success({
  //           title: 'Approve Successfully!',
  //           text: `Approved ${inputValue} ${inputCurrency.symbol}`,
  //           tx: transactionHash,
  //           chainId,
  //         });
  //       });
  //     })
  //     .catch((err: any) => {
  //       console.info('approve-error', err);

  //       setIsApproving(false);
  //       toast?.dismiss(toastId);
  //       toast?.fail({
  //         title: 'Approve Failed!',
  //         text: err?.message?.includes('user rejected transaction')
  //           ? 'User rejected transaction'
  //           : `Approved ${inputValue} ${inputCurrency.symbol}`,
  //       });
  //     });
  // };

  // function successCallback(tx: any, callback: () => void) {
  //   tx.wait()
  //     .then((res: any) => {
  //       updateBalance();
  //       const { status, transactionHash } = res;
  //       console.log('tx res', res);

  //       // TODO
  //       addAction?.({
  //         type: 'Swap',
  //         inputCurrencyAmount: inputValue,
  //         inputCurrency,
  //         outputCurrencyAmount,
  //         outputCurrency,
  //         template: title,
  //         status,
  //         transactionHash,
  //         // add: props.add,
  //       });
  //       toast?.dismiss(toastId);
  //       if (status !== 1) throw new Error('');
  //       callback?.();
  //       toast?.success({
  //         title: 'Swap Successfully!',
  //         text: `Swaped ${inputValue} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
  //         tx: transactionHash,
  //         chainId,
  //       });
  //     })
  //     .catch((err: any) => {
  //       toast?.fail({
  //         title: 'Swap Failed!',
  //         text: `Swaped ${inputValue} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
  //         //   tx: transactionHash,
  //         chainId,
  //       });
  //     });
  // }

  // const onError = (err: any) => {
  //   console.info('error00', err);
  //   setIsSwapping(false);
  //   setBtnText('Swap');

  //   //TODO close or refresh
  //   toast?.dismiss(toastId);
  //   toast?.fail({
  //     title: 'Swap Failed!',
  //     text: err?.message?.includes('user rejected transaction')
  //       ? 'User rejected transaction'
  //       : `Swaped ${inputValue} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
  //   });
  // };
  // TODO 1.获取某个链上，某个bi的余额，余额判断

  const tokens = [
    // eth testnet assets
    {
      address: '0x0000000000000000000000000000000000000000',
      chainId: 5,
      symbol: 'ETH',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    },
    {
      address: '0x4701Aa9471d7bfAc765D87dcb1Ea6BB23AD32733',
      chainId: 5,
      symbol: 'MATIC',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png',
    },
    {
      address: '0xd35cceead182dcee0f148ebac9447da2c4d449c4',
      chainId: 5,
      symbol: 'USDC',
      decimals: 6,
      logoURI: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
    },
    {
      address: '0xD7E55eB808693D5Ff81a3391c59886C7E0449f35',
      chainId: 5,
      symbol: 'DAI',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/9956/small/4943.png',
    },
    {
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      chainId: 5,
      symbol: 'UNI',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png',
    },
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
    // zkevm testnet assets
    {
      address: '0x0000000000000000000000000000000000000000',
      chainId: 1442,
      symbol: 'ETH',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    },
    {
      address: '0x8Ba0a934ef4C24e475C78072cCa3Ed306c1aBaDD',
      chainId: 1442,
      symbol: 'USDC',
      decimals: 6,
      logoURI: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
    },
    {
      address: '0x378588D64A464d61c646e5e86F4DA5277e65802C',
      chainId: 1442,
      symbol: 'UNI',
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png',
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

  const MAX_AMOUNT = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

  const isMainnet = chainId === 1 || chainId === 1101;

  const BRIDGE_CONTRACT_ADDRESS = isMainnet
    ? '0x2a3DD3EB832aF982ec71669E178424b10Dca2EDe'
    : '0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7';

  // const sender = ethers.send("eth_requestAccounts", [])[0];
  const sender = account;
  const bridgeAbi = [
    {
      inputs: [
        { internalType: 'uint32', name: 'destinationNetwork', type: 'uint32' },
        { internalType: 'address', name: 'destinationAddress', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'bool', name: 'forceUpdateGlobalExitRoot', type: 'bool' },
        { internalType: 'bytes', name: 'permitData', type: 'bytes' },
      ],
      name: 'bridgeAsset',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
  ];

  // useEffect(() => {
  //   if (!sender) return;
  //   Ethers.provider()
  //     .getNetwork()
  //     .then(({ chainId }) => {
  //       State.update({ chainId });
  //     })
  //     .catch((e) => {});
  // }, [sender]);

  const bridgeIface = new utils.Interface(bridgeAbi);

  const updateGasLimit = (params: any) => {
    const { amount, token, network } = params;
    if (network !== 'ethereum') return;
    const amountBig = utils.parseUnits(Big(amount).toString(), token.decimals);

    const bridgeContract = new Contract(BRIDGE_CONTRACT_ADDRESS, bridgeAbi, provider.getSigner());
    bridgeContract.estimateGas
      .bridgeAsset(1, sender, amountBig, token.address, true, '0x')
      .then((data) => {
        console.log('gasLimit', data);
      })
      .catch((e) => {
        console.log('gasLimit error', e);
      });
  };

  const handleBridge = (params: any) => {
    console.log('handleBridge', params);
    const { amount, token, network, permit } = params;
    const chainNames = chainId === 1 ? ['Ethereum', 'Polygon zkEVM'] : ['Polygon zkEVM', 'Ethereum'];
    const toastText = `Bridge ${amount} ${token.symbol} from ${chainNames[0]} to ${chainNames[1]}`;

    const toastId = toast?.loading({
      title: toastText,
    });
    const networkId = network === 'ethereum' ? 1 : 0;

    const amountBig = utils.parseUnits(Big(amount).toString(), token.decimals);
    // const permitData = permit || "0x";
    const permitData = '0x';

    const encodedData = bridgeIface.encodeFunctionData('bridgeAsset(uint32,address,uint256,address,bool,bytes)', [
      networkId,
      sender,
      amountBig,
      token.address,
      true,
      permitData,
    ]);

    updateGasLimit(params);

    provider
      .getSigner()
      .sendTransaction({
        to: BRIDGE_CONTRACT_ADDRESS,
        data: encodedData,
        value: token.symbol === 'ETH' ? amountBig : '0',
        gasLimit: 300000,
      })
      .then((tx: any) => {
        console.log('tx: ', tx);
        tx.wait()
          .then((receipt: any) => {
            const { transactionHash, status } = receipt;

            // TODO
            // props.addAction?.({
            //   type: "Bridge",
            //   fromChainId: chainId,
            //   toChainId: chainId === 1 ? 1101 : 1,
            //   token: token,
            //   amount: amount,
            //   template: "native bridge",
            //   add: state.add,
            //   status,
            //   transactionHash,
            // });
            toast?.dismiss(toastId);
            toast?.success({
              title: 'Bridge Successfully!',
              text: toastText,
              tx: transactionHash,
              chainId,
            });
          })
          .catch((err: any) => {
            console.log('txerror:', err);
            toast?.dismiss(toastId);
            toast?.fail({
              title: 'Bridge Failed!',
              text: toastText,
              tx: tx.hash,
              chainId,
            });
          });
      })
      .catch((err: any) => {
        toast?.dismiss(toastId);
        toast?.fail({
          title: 'Bridge Failed!',
          text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : toastText,
        });
      });
  };

  const handleName = (token: any) => {
    const abi = ['function name() external view returns (string)'];
    const erc20contract = new Contract(token.address, abi, provider);
    erc20contract
      .name()
      .then((name: any) => {
        setName(name);
      })
      .catch((e: any) => {
        console.log('name error', e);
      });
  };

  // 是否需要approve
  const handleIsContractAllowedToSpendToken = ({ token, amount }: any) => {
    console.log(token, amount);

    if (!amount) return;
    const abi = ['function allowance(address owner, address spender) external view returns (uint256)'];
    const erc20contract = new Contract(token.address, abi, provider);

    erc20contract
      .allowance(sender, BRIDGE_CONTRACT_ADDRESS)
      .then((data) => {
        const allowance = Number(utils.formatUnits(data, token.decimals));
        console.log('allowance: ', allowance);

        setIsContractAllowedToSpendToken(allowance >= Number(amount));
      })
      .catch((e) => {
        console.log('setIsContractAllowedToSpendToken', e);
      });
  };

  const handleNonce = (params: any) => {
    console.log('setNonce', params);
    const { token } = params;

    const abi = ['function nonces(address owner) external view returns (uint256)'];
    const erc20contract = new Contract(token.address, abi, provider);

    erc20contract
      .nonces(sender)
      .then((nonce: any) => {
        console.log('nonce', nonce);

        setNonce(nonce);
      })
      .catch((e: any) => {
        console.log('setNonce err:', e);
      });
  };

  const handlePermit = (params: any) => {
    console.log('handlePermit', params);
    const { amount, token, network } = params;

    const domain = {
      chainId,
      name: name,
      verifyingContract: token.address,
      version: '1',
    };

    const toastText = `Permit ${amount} ${token.symbol}`;

    const toastId = toast?.loading({
      title: toastText,
    });

    const types = {
      Permit: [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
      ],
    };

    const amountBig = utils.parseUnits(Big(amount).toString(), token.decimals);

    const values = {
      deadline: MAX_AMOUNT,
      nonce: nonce || 0,
      owner: sender,
      spender: BRIDGE_CONTRACT_ADDRESS,
      value: amountBig,
    };

    provider
      .getSigner()
      ._signTypedData(domain, types, values)
      .then((signature: any) => {
        const { r, s, v } = utils.splitSignature(signature);

        const erc20Abi = [
          {
            inputs: [
              {
                internalType: 'address',
                name: 'owner',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'spender',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'deadline',
                type: 'uint256',
              },
              {
                internalType: 'uint8',
                name: 'v',
                type: 'uint8',
              },
              {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32',
              },
              {
                internalType: 'bytes32',
                name: 's',
                type: 'bytes32',
              },
            ],
            name: 'permit',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ];

        const erc20Iface = new utils.Interface(erc20Abi);

        const permit = erc20Iface.encodeFunctionData('permit(address,address,uint256,uint256,uint8,bytes32,bytes32)', [
          sender,
          BRIDGE_CONTRACT_ADDRESS,
          amountBig,
          MAX_AMOUNT,
          v,
          r,
          s,
        ]);
        toast?.dismiss(toastId);
        handleBridge({ ...props, permit });
      })
      .catch((err: any) => {
        toast?.dismiss(toastId);
        toast?.fail({
          title: 'Permit Failed!',
          text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : toastText,
        });
      });
  };

  const approve = (params: any) => {
    console.log('approve params', params);
    const { token, network, amount } = params;
    if (isContractAllowedToSpendToken) return;

    const abi = ['function approve(address spender, uint256 amount) external returns (bool)'];
    const erc20contract = new Contract(token.address, abi, provider.getSigner());

    return erc20contract.approve(BRIDGE_CONTRACT_ADDRESS, Big(amount).times(Big(10).pow(token.decimals)).toFixed(0));
  };

  const onConfirm = (params: any) => {
    console.log('log confirm: ', params);
    const { token, network, amount } = params;
    if (token.symbol !== 'ETH' && network === 'ethereum') {
      // 以太坊上的非ETH
      const res = approve();
      console.log('approve res', res);
      if (res) {
        res
          .then((tx: any) => {
            console.log('approve resolve', tx);
            handlePermit();
          })
          .catch((e) => {});
      } else {
        console.log('approve rejected');
        handlePermit(params);
      }
    } else {
      handleBridge(params);
    }
  };

  const onChangeAmount = (params: any) => {
    console.log('onChangeAmount', params);
    handleIsContractAllowedToSpendToken(params);
  };

  const onUpdateToken = (params: any) => {
    console.log('onUpdateToken', params);
    handleIsContractAllowedToSpendToken(params);
    handleName(params.token);
    // setName(params.token);
    // setNonce(params);
    handleNonce(params);
  };

  // const renderBtn = () => {
  //   // others
  //   if (!isApproved) {
  //     return (
  //       <div className="popup-swap-btn">
  //         <BridgeBtn onClick={handleApprove} disabled={isApproving}>
  //           {isApproving ? ' Approving...' : ' Approve'}
  //         </BridgeBtn>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className={`popup-swap-btn ${isDisabled ? 'disabled' : ''}`}>
  //         <BridgeBtn onClick={() => {}} disabled={isSwapping || isDisabled}>
  //           Bridge
  //         </BridgeBtn>
  //       </div>
  //     );
  //   }
  // };

  return (
    <FootWrapper>
      <div className="clickExecution-popup-btn">
        <div className="popup-swap-input">
          <input
            ref={inputRef}
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            maxLength={String(maxInputBalance).length + 2}
            max={maxInputBalance}
            autoComplete="off"
          />
          <span>{currencyCode}</span>
        </div>
        {/* {renderBtn()} */}
        <div className={`popup-swap-btn ${isDisabled ? 'disabled' : ''}`}>
          <BridgeBtn onClick={onConfirm} disabled={isSwapping || isDisabled}>
            Bridge
          </BridgeBtn>
        </div>
      </div>
    </FootWrapper>
  );
};
export default Bridge;

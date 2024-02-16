import { useDebounce } from 'ahooks';
import Big from 'big.js';
import { Contract, utils } from 'ethers';
import type { ChangeEvent, FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { BaseButton } from '@/components';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';

import { ALLOWANCE_ABI, APPROVE_ABI, ROUTER_ABI, WETH_ABI } from './const';

const FootWrapper = styled.div`
  display: block;
  .bridge-btn {
    width: 130px;
  }
  .clickExecution-popup-btn {
    display: flex;
    gap: 10px;
    .popup-swap-input {
      flex-grow: 1;
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

enum BtnType {
  InsufficientBalance = 'InsufficientBalance',
  NeedApprove = 'NeedApprove',
  Bridge = 'Bridge',
}

interface IProps {
  token: any;
  maxInputBalance: number;
  updateBalance: () => void;
}

const Bridge: FC<IProps> = ({ token, maxInputBalance, updateBalance }) => {
  const { account, provider, chainId } = useAccount();
  const toast = useToast();
  const { addAction } = useAddAction('all-in-one');

  const [initInputValue, setInputValue] = useState<number | string>('');
  const inputValue = useDebounce(initInputValue, { wait: 500 });
  const [loading, setLoading] = useState(false);

  const [toastId, setToastId] = useState(0);

  const [tokenAllowance, setTokenAllowance] = useState(0);
  const [freshAllowance, setFreshAllowance] = useState(0);
  const [btnType, setBtnType] = useState<BtnType>(BtnType.Bridge);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState('');
  const [nonce, setNonce] = useState('');
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

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
  const network =
    chainId === 1 || chainId === 5 ? 'ethereum' : chainId === 1101 || chainId === 1442 ? 'polygon' : 'ethereum';
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
            updateBalance();

            addAction?.({
              type: 'Bridge',
              fromChainId: chainId,
              toChainId: chainId === 1 ? 1101 : 1,
              token: token,
              amount: amount,
              template: 'native bridge',
              add: true,
              status,
              transactionHash,
            });
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
        // setName(name);
      })
      .catch((e: any) => {
        console.log('name error', e);
      });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : '';
    setInputValue(value);
  };

  useEffect(() => {
    setAllowance();
  }, [freshAllowance]);
  const setAllowance = async () => {
    const allowance = await getAllowance();
    setTokenAllowance(allowance);
  };

  const getAllowance = async () => {
    const abi = ['function allowance(address owner, address spender) external view returns (uint256)'];
    const erc20contract = new Contract(token.address, abi, provider);

    try {
      const data = await erc20contract.allowance(sender, BRIDGE_CONTRACT_ADDRESS);

      const allowance = Number(utils.formatUnits(data, token.decimals));
      console.log('allowance: ', allowance);
      return allowance;
    } catch (error) {
      console.log('getallowanceerror: ', error);
      return 0;
    }
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

        // setNonce(nonce);
      })
      .catch((e: any) => {
        console.log('setNonce err:', e);
      });
  };

  const handlePermit = () => {
    const domain = {
      chainId,
      name: name,
      verifyingContract: token.address,
      version: '1',
    };

    const toastText = `Permit ${inputValue} ${token.symbol}`;

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

    const amountBig = utils.parseUnits(Big(inputValue).toString(), token.decimals);

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
        // handleBridge({ ...props, permit });
        handleBridge({ amount: inputValue, token, network: network, permit });
      })
      .catch((err: any) => {
        toast?.dismiss(toastId);
        toast?.fail({
          title: 'Permit Failed!',
          text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : toastText,
        });
      });
  };

  const handleApprove = () => {
    const abi = ['function approve(address spender, uint256 amount) external returns (bool)'];
    const erc20contract = new Contract(token.address, abi, provider.getSigner());

    return erc20contract.approve(
      BRIDGE_CONTRACT_ADDRESS,
      Big(inputValue).times(Big(10).pow(token.decimals)).toFixed(0),
    );
  };
  const clickApprove = async () => {
    setLoading(true);

    try {
      const tx = await handleApprove();
      const res = await tx.wait();
      if (res?.status === 1) {
        setFreshAllowance((n) => n + 1);
      }
    } catch (error) {
      console.log('approvetxerror:', error);
    } finally {
      setLoading(false);
    }
  };

  const onConfirm = () => {
    if (token.symbol !== 'ETH' && network === 'ethereum') {
      // 以太坊上的非ETH
      handlePermit();
      // const res = handleApprove();
      // console.log('approve res', res);
      // if (res) {
      //   res
      //     .then((tx: any) => {
      //       console.log('approve resolve', tx);
      //       handlePermit();
      //     })
      //     .catch((e: any) => {
      //       console.log('confirmerror:', e);
      //     });
      // } else {
      //   console.log('approve rejected');
      //   handlePermit();
      // }
    } else {
      handleBridge({ amount: inputValue, token, network: network });
    }
  };

  useEffect(() => {
    (async () => {
      if (Big(inputValue || 0).gt(Big(maxInputBalance || 0))) {
        setBtnType(BtnType.InsufficientBalance);
      } else {
        // if (Big(tokenAllowance).gt(Big(inputValue))) {
        if (tokenAllowance >= Number(inputValue)) {
          setBtnType(BtnType.Bridge);
        } else {
          setBtnType(BtnType.NeedApprove);
        }
      }
    })();
  }, [inputValue, maxInputBalance, tokenAllowance]);

  const renderBtn = () => {
    switch (btnType) {
      case BtnType.InsufficientBalance:
        return <BaseButton className="bridge-btn" disabled label={'Insufficient Balance'} size="large" />;
      case BtnType.NeedApprove:
        return (
          <BaseButton
            className="bridge-btn"
            onClick={clickApprove}
            loading={loading}
            // disabled={isSwapping || isDisabled}
            label="Approve"
            size="large"
          />
        );
      case BtnType.Bridge:
        return (
          <BaseButton
            className="bridge-btn"
            onClick={onConfirm}
            // disabled={isSwapping || isDisabled}
            label="Bridge"
            size="large"
          />
        );
    }
  };
  return (
    <FootWrapper>
      <div className="clickExecution-popup-btn">
        <div className="popup-swap-input">
          <input
            ref={inputRef}
            type="number"
            value={initInputValue}
            onChange={handleInputChange}
            maxLength={String(maxInputBalance).length + 2}
            max={maxInputBalance}
            autoComplete="off"
          />
          <span>{token?.symbol}</span>
        </div>

        {renderBtn()}
      </div>
    </FootWrapper>
  );
};
export default Bridge;

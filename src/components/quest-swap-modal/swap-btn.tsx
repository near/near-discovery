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

import { ALLOWANCE_ABI, APPROVE_ABI, QUOTE_ABI, QuoteContractAddress, ROUTER_ABI, WETH_ABI } from './const';

const ModalSwapBtnWrapper = styled.div`
  display: block;
  .swap-btn {
    width: 130px;
  }
  .clickExecution-popup-btn {
    display: flex;
    gap: 10px;
    .popup-swap-input {
      /* width: 70%; */
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
  updateBalance: () => void;
}

const SwapBtn: FC<any> = ({
  // noPair,
  inputCurrency,
  outputCurrency,
  currencyCode,
  // inputCurrencyAmount,
  // outputCurrencyAmount,
  maxInputBalance,
  routerAddress,
  wethAddress,
  title,
  // fee,
  uniType,
  updateBalance,
}) => {
  const { account, provider, chainId } = useAccount();
  const toast = useToast();
  const { addAction } = useAddAction('all-in-one');
  const [initInputValue, setInputValue] = useState<number | string>('');
  const inputValue = useDebounce(initInputValue, { wait: 1000 });
  const [isDisabled, setIsDisabled] = useState(true);
  const [btnText, setBtnText] = useState('Swap');
  const [isApproved, setIsApproved] = useState(true);
  const [isApproving, setIsApproving] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isWrapping, setIsWrapping] = useState(false);
  const [toastId, setToastId] = useState<any>();

  const inputRef = useRef<HTMLInputElement>(null);
  // 1: ETH=>WETH 2:WETH=>ETH 0: others
  const wrapType: any =
    inputCurrency.address === 'native' && outputCurrency.address === wethAddress
      ? 1
      : inputCurrency.address === wethAddress && outputCurrency.address === 'native'
        ? 2
        : 0;

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    (async () => {
      if (Big(inputValue || 0).gt(Big(maxInputBalance || 0))) {
        setIsDisabled(true);
        setBtnText('Insufficient Balance');
      } else {
        if (!inputValue || inputValue === 0 || isNaN(inputValue as number)) {
          setIsDisabled(true);
          setBtnText('Swap');
        } else {
          const outAmount = await calcOutAmount();
          console.log(' out: ', outAmount);
          if (Big(outAmount).lt('0.00000000001')) {
            setIsDisabled(true);
            setBtnText('Insufficient Liquidity');
          } else {
            setIsDisabled(false);
            setBtnText('Swap');
            if (inputCurrency.address !== 'native') {
              getAllowance();
            }
          }
        }
      }
    })();
  }, [inputValue, maxInputBalance]);

  const calcOutAmount = async () => {
    console.log('calc');

    if (!inputCurrency.address || !outputCurrency.address || !inputValue) {
      return 0;
    }

    if (wrapType) {
      return inputValue;
    }

    const currentCurrency = inputCurrency;
    const currentAmount = Big(inputValue).mul(0.995).toFixed(5);
    const outCurrency = outputCurrency;

    const iface = new utils.Interface(QUOTE_ABI);

    const path = [
      currentCurrency.address === 'native' ? wethAddress : currentCurrency.address,
      outCurrency.address === 'native' ? wethAddress : outCurrency.address,
    ];
    const pathBytes = '0x' + path.map((address) => address.substring(2)).join('');
    const inputs = [pathBytes, utils.parseUnits(currentAmount, currentCurrency.decimals)];
    const encodedData = iface.encodeFunctionData('quoteExactInput', inputs);

    try {
      const data = await provider.call({
        to: QuoteContractAddress,
        data: encodedData,
      });
      const decodedData = iface.decodeFunctionResult('quoteExactInput', data);

      const amountOut = decodedData[0];
      // const fee = decodedData[1];
      const estimate = Big(amountOut.toString()).div(Big(10).pow(outCurrency.decimals)).toFixed(18);

      return Big(estimate).gt(0.01) ? estimate : Big(estimate).toFixed(10);
    } catch (error) {
      console.error('CALL ERROR: ', error);
      return 0;
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : '';
    setInputValue(value);
  };

  const getAllowance = async () => {
    // setBtnLoading(true);
    const TokenContract = new Contract(inputCurrency.address, ALLOWANCE_ABI, provider.getSigner());
    const allowanceRaw = await TokenContract.allowance(account, routerAddress);
    // console.info(
    //   'allowanceRaw: ',
    //   allowanceRaw,
    //   allowanceRaw.toString(),
    //   utils.formatUnits(allowanceRaw._hex, inputCurrency.decimals),
    // );
    // setBtnLoading(false);
    const isApprove = !Big(utils.formatUnits(allowanceRaw._hex, inputCurrency.decimals)).lt(Big(inputValue || 0));
    setIsApproved(isApprove);
  };

  const handleApprove = () => {
    const toastId = toast?.loading({
      title: `Approve ${inputValue} ${inputCurrency.symbol}`,
    });
    if (isApproving) return;

    setIsApproving(true);

    const TokenContract = new Contract(inputCurrency.address, APPROVE_ABI, provider.getSigner());

    TokenContract.approve(
      routerAddress,
      utils.parseUnits(Big(inputValue).toFixed(inputCurrency.decimals).toString(), inputCurrency.decimals),
    )
      .then((tx: any) => {
        tx.wait().then((res: any) => {
          console.info('approve-success', res);
          const { status, transactionHash } = res;
          toast?.dismiss(toastId);
          if (status !== 1) throw new Error('');

          setIsApproved(true);
          setIsApproving(false);
          toast?.success({
            title: 'Approve Successfully!',
            text: `Approved ${inputValue} ${inputCurrency.symbol}`,
            tx: transactionHash,
            chainId,
          });
        });
      })
      .catch((err: any) => {
        console.info('approve-error', err);

        setIsApproving(false);
        toast?.dismiss(toastId);
        toast?.fail({
          title: 'Approve Failed!',
          text: err?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : `Approved ${inputValue} ${inputCurrency.symbol}`,
        });
      });
  };

  function successCallback(tx: any, callback: () => void) {
    tx.wait()
      .then((res: any) => {
        updateBalance();
        const { status, transactionHash } = res;
        console.log('tx res', res);

        addAction?.({
          type: 'Swap',
          inputCurrencyAmount: inputValue,
          inputCurrency,
          // outputCurrencyAmount,
          outputCurrency,
          template: title,
          status,
          transactionHash,
          add: true,
        });
        toast?.dismiss(toastId);
        if (status !== 1) throw new Error('');
        callback?.();
        toast?.success({
          title: 'Swap Successfully!',
          text: `Swaped ${inputValue} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
          tx: transactionHash,
          chainId,
        });
      })
      .catch((err: any) => {
        toast?.fail({
          title: 'Swap Failed!',
          text: `Swaped ${inputValue} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
          //   tx: transactionHash,
          chainId,
        });
      });
  }

  const handleWrap = (type: 1 | 2, handleSuccess: (tx: any) => void, handleError: (err: any) => void) => {
    const WethContract = new Contract(wethAddress, WETH_ABI, provider.getSigner());
    if (type === 1) {
      WethContract.deposit({
        value: utils.parseEther(Big(inputValue).toFixed(18).toString()),
      })
        .then((tx: any) => {
          handleSuccess?.(tx);
        })
        .catch((err: any) => {
          handleError?.(err);
        });
    } else {
      WethContract.withdraw(utils.parseEther(Big(inputValue).toFixed(18).toString()))
        .then((tx: any) => {
          handleSuccess?.(tx);
        })
        .catch((err: any) => {
          handleError?.(err);
        });
    }
  };

  const onError = (err: any) => {
    console.info('onError', err);
    setIsSwapping(false);
    setBtnText('Swap');

    toast?.dismiss(toastId);
    toast?.fail({
      title: 'Swap Failed!',
      text: err?.message?.includes('user rejected transaction')
        ? 'User rejected transaction'
        : `Swaped ${inputValue} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
    });
  };

  const handleSwap = () => {
    if (isDisabled) return false;
    if (isSwapping) return false;
    setIsSwapping(true);
    setBtnText('Swapping...');
    const id = toast?.loading({
      title: `Swap ${inputValue} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
    });
    setToastId(id);
    if (uniType === 'v2') {
      const type = inputCurrency.address === 'native' ? 1 : outputCurrency.address === 'native' ? 2 : 0;

      const deadline = new Big(Math.floor(Date.now() / 1000)).add(new Big(1800));

      const iface = new utils.Interface(ROUTER_ABI);
      console.info('iface: ', iface);

      const amount = utils.parseUnits(Big(inputValue).toFixed(inputCurrency.decimals), inputCurrency.decimals);

      const multicallParams: any[] = [];

      const _inputCurrencyAddress = inputCurrency.address === 'native' ? wethAddress : inputCurrency.address;
      const _outputCurrencyAddress = outputCurrency.address === 'native' ? wethAddress : outputCurrency.address;

      if (title === 'QuickSwap') {
        const inputs = [
          {
            tokenIn: _inputCurrencyAddress,
            tokenOut: _outputCurrencyAddress,
            recipient: type === 2 ? wethAddress : account,
            deadline: deadline.toFixed(),
            amountIn: amount,
            amountOutMinimum: '0',
            limitSqrtPrice: 0,
          },
        ];

        const encodedDataCallSwap = iface.encodeFunctionData('exactInputSingle', inputs);

        multicallParams.push(encodedDataCallSwap);

        if (type === 2) {
          multicallParams.push(iface.encodeFunctionData('unwrapWNativeToken', ['0', account]));
        }
      }

      if (title === 'Pancake Swap') {
        const encodedExactOutputSingleData = iface.encodeFunctionData('swapExactTokensForTokens', [
          amount,
          '0',
          [_inputCurrencyAddress, wethAddress, _outputCurrencyAddress],
          account,
        ]);
        if (type === 2) {
          multicallParams.push(iface.encodeFunctionData('unwrapWETH9', ['0', account]));
        }
        multicallParams.push(encodedExactOutputSingleData);
      }

      if (['QuickSwap', 'Pancake Swap'].includes(title)) {
        const RouterContract = new Contract(routerAddress, ROUTER_ABI, provider.getSigner());
        const options = {
          value: type === 1 ? amount : '0',
        };

        RouterContract.estimateGas
          .multicall(multicallParams, options)
          .then((gas) => {
            RouterContract.multicall(multicallParams, {
              ...options,
              gasLimit: gas,
            })
              .then((tx: any) => {
                console.info('tx: ', tx);
                successCallback(tx, () => {
                  setIsSwapping(false);
                  setBtnText('Swap');
                });
              })
              .catch((err: any) => {
                console.info('multicall_error', err);
                onError(err);
              });
          })
          .catch((err: any) => {
            console.info('estimateGas_error', err);
            onError(err);
          });
      }

      if (title === 'Balancer') {
        const pools = [
          [
            [
              '0xa2036f0538221a77a3937f1379699f44945018d0',
              '0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9',
              '0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035',
            ],
            '0xc951aebfa361e9d0063355b9e68f5fa4599aa3d1000100000000000000000017',
          ],
          [
            ['0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9', '0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4'],
            '0xa7f602cfaf75a566cb0ed110993ee81c27fa3f53000200000000000000000009',
          ],
          [
            [
              '0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9',
              '0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4',
              '0x1E4a5963aBFD975d8c9021ce480b42188849D41d',
            ],
            '0xe8ca7400eb61d5bdfc3f8f2ea99e687e0a4dbf78000100000000000000000019',
          ],
          [
            ['0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9', '0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035'],
            '0x53ddc1f1ef585b426c03674f278f8107f1524ade000200000000000000000012',
          ],
        ];

        const finalPool = pools
          .filter(
            (poolData) => poolData[0].includes(_inputCurrencyAddress) && poolData[0].includes(_outputCurrencyAddress),
          )
          .map((poolData) => poolData[1]);

        const _inputAddress =
          inputCurrency.address === 'native' ? '0x0000000000000000000000000000000000000000' : inputCurrency.address;
        const _outputAddress =
          outputCurrency.address === 'native' ? '0x0000000000000000000000000000000000000000' : outputCurrency.address;

        const assets = [_inputAddress, _outputAddress];
        const funds = [account, false, account, false];
        const swap_steps = [
          {
            poolId: finalPool[0],
            assetIn: _inputAddress,
            assetOut: _outputAddress,
            amount,
          },
        ];

        const token_indices: any = {};
        for (let i = 0; i < assets.length; i++) {
          token_indices[assets[i]] = i;
        }
        const swap_steps_struct = [];
        for (const step of swap_steps) {
          const swap_step_struct = [
            step['poolId'],
            token_indices[step['assetIn']],
            token_indices[step['assetOut']],
            step['amount'],
            '0x',
          ];
          swap_steps_struct.push(swap_step_struct);
        }
        const token_limits = [amount, 0];

        const SwapContract = new Contract(
          routerAddress,
          [
            {
              inputs: [
                {
                  internalType: 'enum IVault.SwapKind',
                  name: 'kind',
                  type: 'uint8',
                },
                {
                  components: [
                    {
                      internalType: 'bytes32',
                      name: 'poolId',
                      type: 'bytes32',
                    },
                    {
                      internalType: 'uint256',
                      name: 'assetInIndex',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'assetOutIndex',
                      type: 'uint256',
                    },
                    {
                      internalType: 'uint256',
                      name: 'amount',
                      type: 'uint256',
                    },
                    {
                      internalType: 'bytes',
                      name: 'userData',
                      type: 'bytes',
                    },
                  ],
                  internalType: 'struct IVault.BatchSwapStep[]',
                  name: 'swaps',
                  type: 'tuple[]',
                },
                {
                  internalType: 'contract IAsset[]',
                  name: 'assets',
                  type: 'address[]',
                },
                {
                  components: [
                    {
                      internalType: 'address',
                      name: 'sender',
                      type: 'address',
                    },
                    {
                      internalType: 'bool',
                      name: 'fromInternalBalance',
                      type: 'bool',
                    },
                    {
                      internalType: 'address payable',
                      name: 'recipient',
                      type: 'address',
                    },
                    {
                      internalType: 'bool',
                      name: 'toInternalBalance',
                      type: 'bool',
                    },
                  ],
                  internalType: 'struct IVault.FundManagement',
                  name: 'funds',
                  type: 'tuple',
                },
                {
                  internalType: 'int256[]',
                  name: 'limits',
                  type: 'int256[]',
                },
                {
                  internalType: 'uint256',
                  name: 'deadline',
                  type: 'uint256',
                },
              ],
              name: 'batchSwap',
              outputs: [
                {
                  internalType: 'int256[]',
                  name: 'assetDeltas',
                  type: 'int256[]',
                },
              ],
              stateMutability: 'payable',
              type: 'function',
            },
          ],
          provider.getSigner(),
        );

        const params = [0, swap_steps_struct, assets, funds, token_limits, deadline.toFixed()];
        const options = {
          value: type === 1 ? amount : '0',
        };

        SwapContract.estimateGas
          .batchSwap(...params, options)
          .then((gas) => {
            SwapContract.batchSwap(...params, {
              ...options,
              gasLimit: gas,
            })
              .then((tx: any) => {
                successCallback(tx, () => {
                  setIsSwapping(false);
                  setBtnText('Swap');
                });
              })
              .catch((err: any) => {
                onError(err);
              });
          })
          .catch((err) => {
            onError(err);
          });
      }
    }
  };

  const handleWrapClick = () => {
    const id = toast?.loading({
      title: `Swap ${inputValue} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
    });
    setToastId(id);
    setIsWrapping(true);
    handleWrap(
      wrapType,
      (res) => {
        successCallback(res, () => {
          setIsWrapping(false);
        });
      },
      (err) => {
        setIsWrapping(false);
        toast?.dismiss(toastId);
        toast?.fail({
          title: 'Swap Failed!',
          text: err?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : `Swaped ${inputValue} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
        });
      },
    );
  };

  const renderBtn = () => {
    if (wrapType) {
      // eth=> weth  weth=>eth
      return (
        <BaseButton
          className="swap-btn"
          onClick={handleWrapClick}
          disabled={isWrapping}
          label={wrapType === 1 ? (isWrapping ? 'Wrapping...' : 'Wrap') : isWrapping ? 'Unwrapping...' : 'Unwrap'}
          size="large"
        />
      );
    } else {
      // others
      if (!isApproved) {
        return (
          <BaseButton
            className="swap-btn"
            onClick={handleApprove}
            disabled={isApproving}
            label={isApproving ? ' Approving...' : ' Approve'}
            size="large"
          />
        );
      } else {
        return (
          <BaseButton
            className="swap-btn"
            onClick={handleSwap}
            disabled={isSwapping || isDisabled}
            label={btnText}
            size="large"
          />
        );
      }
    }
  };

  return (
    <ModalSwapBtnWrapper>
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
          <span>{currencyCode}</span>
        </div>
        {renderBtn()}
      </div>
    </ModalSwapBtnWrapper>
  );
};
export default SwapBtn;

import Big from 'big.js';
import { Contract, utils } from 'ethers';
import type { ChangeEvent, FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';

import { ALLOWANCE_ABI, APPROVE_ABI, ROUTER_ABI, WETH_ABI } from './const';
// TODO
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
  updateBalance: () => void;
}

const Bridge: FC<IProps> = ({
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
  const [inputValue, setInputValue] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [btnText, setBtnText] = useState('Bridge');
  const [isApproved, setIsApproved] = useState(true);
  const [isApproving, setIsApproving] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [toastId, setToastId] = useState(0);

  const inputRef = useRef(null);

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.info(e.target.value, parseFloat(e.target.value), value);
    setInputValue(value);
  };

  const getAllowance = async () => {
    // setBtnLoading(true);
    const TokenContract = new Contract(inputCurrency.address, ALLOWANCE_ABI, provider.getSigner());
    const allowanceRaw = await TokenContract.allowance(account, routerAddress);
    console.info(
      'allowanceRaw: ',
      allowanceRaw,
      allowanceRaw.toString(),
      utils.formatUnits(allowanceRaw._hex, inputCurrency.decimals),
    );
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
      .then((tx) => {
        tx.wait().then((res) => {
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
      .catch((err) => {
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

  function successCallback(tx, callback: () => void) {
    tx.wait()
      .then((res) => {
        updateBalance();
        const { status, transactionHash } = res;
        console.log('tx res', res);

        // TODO
        addAction?.({
          type: 'Swap',
          inputCurrencyAmount: inputValue,
          inputCurrency,
          outputCurrencyAmount,
          outputCurrency,
          template: title,
          status,
          transactionHash,
          // add: props.add,
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
      .catch((err) => {
        toast?.fail({
          title: 'Swap Failed!',
          text: `Swaped ${inputValue} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
          //   tx: transactionHash,
          chainId,
        });
      });
  }

  const onError = (err: any) => {
    console.info('error00', err);
    setIsSwapping(false);
    setBtnText('Swap');

    //TODO close or refresh
    toast?.dismiss(toastId);
    toast?.fail({
      title: 'Swap Failed!',
      text: err?.message?.includes('user rejected transaction')
        ? 'User rejected transaction'
        : `Swaped ${inputValue} ${inputCurrency.symbol} to ${outputCurrency.symbol}`,
    });
  };

  const renderBtn = () => {
    // others
    if (!isApproved) {
      return (
        <div className="popup-swap-btn">
          <BridgeBtn onClick={handleApprove} disabled={isApproving}>
            {isApproving ? ' Approving...' : ' Approve'}
          </BridgeBtn>
        </div>
      );
    } else {
      return (
        <div className={`popup-swap-btn ${isDisabled ? 'disabled' : ''}`}>
          <BridgeBtn onClick={() => {}} disabled={isSwapping || isDisabled}>
            {btnText}
          </BridgeBtn>
        </div>
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
            value={inputValue}
            onChange={handleInputChange}
            maxLength={String(maxInputBalance).length + 2}
            max={maxInputBalance}
            autoComplete="off"
          />
          <span>{currencyCode}</span>
        </div>
        {renderBtn()}
      </div>
    </FootWrapper>
  );
};
export default Bridge;

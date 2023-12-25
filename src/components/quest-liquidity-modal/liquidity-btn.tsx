import Big from 'big.js';
import { Contract, utils } from 'ethers';
import type { ChangeEvent, FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';

//TODO
import { ALLOWANCE_ABI, APPROVE_ABI, ROUTER_ABI, WETH_ABI } from './const';

const SwapButton = styled.button`
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
const ModalSwapBtnWrapper = styled.div`
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

const Liquidity: FC<any> = ({ inputCurrency, currencyCode, maxInputBalance, getAllowance }) => {
  const { account, provider, chainId } = useAccount();
  const toast = useToast();
  const { addAction } = useAddAction('all-in-one');
  const [inputValue, setInputValue] = useState<any>();
  const [isDisabled, setIsDisabled] = useState(true);
  const [btnText, setBtnText] = useState('Swap');
  const [isApproved, setIsApproved] = useState(true);
  const [isApproving, setIsApproving] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isWrapping, setIsWrapping] = useState(false);
  const [toastId, setToastId] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

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
        setBtnText('Swap');
      } else {
        setIsDisabled(false);
        setBtnText('Swap');
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
  const renderBtn = () => {
    return <div>btn</div>;
  };
  return (
    <ModalSwapBtnWrapper>
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
    </ModalSwapBtnWrapper>
  );
};
export default Liquidity;

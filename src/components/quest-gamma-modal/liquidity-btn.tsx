import Big from 'big.js';
import { Contract, utils } from 'ethers';
import type { ChangeEvent, FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { BaseButton } from '@/components';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';

// import { ALLOWANCE_ABI, APPROVE_ABI, ROUTER_ABI, WETH_ABI } from './const';

const ModalSwapBtnWrapper = styled.div`
  display: block;
  .w-100 {
    width: 100%;
  }
  .flex-grow {
    flex-grow: 1;
  }
  .br-10 {
    border-radius: 10px;
  }
  .input-section {
    display: flex;
    margin-bottom: 15px;
  }
  .foot-section {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .icon-plus {
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #979abe;
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
  }
`;

const InputWrapper = styled.div`
  /* width: 70%; */
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
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

const Comment = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  padding: 8px 0;
`;

interface IProps {
  pairId: string;
  token0Bal: number | string;
  token1Bal: number | string;
  token0: string;
  token1: string;
  decimals0: number;
  decimals1: number;
}
const addresses = {
  Chef: '0x1e2d8f84605d32a2cbf302e30bfd2387badf35dd',
  DAI: '0xc5015b9d9161dca7e18e32f6f25c4ad850731fd4',
  MATIC: '0xa2036f0538221a77a3937f1379699f44945018d0',
  'N MATIC-USDC': '0x19f4ebc0a1744b93a355c2320899276ae7f79ee5',
  'N USDC-WBTC': '0x9783c45564232c0aff8dc550a9c247c42e8c8b98',
  'N WETH-MATIC': '0x2f39293c9ed046822c014143fb18d5ae0479be93',
  'N WETH-USDC': '0x04c6b11e1ffe1f1032bd62adb343c9d07767489c',
  'N WETH-WBTC': '0x1cc4ee0cb063e9db36e51f5d67218ff1f8dbfa0f',
  USDC: '0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035',
  'USDC-DAI': '0xafad6e114cfbc8a19e91b8d7d04da740a7698595',
  USDT: '0x1e4a5963abfd975d8c9021ce480b42188849d41d',
  'USDT-DAI': '0xcd36b8a47a072e3e05e894b6ec89d294bec3d3ed',
  'USDT-USDC': '0x145d55ae4848f9782efcac785a655e3e5dce1bcd',
  'W MATIC-USDC': '0x8462e4173d63f8769f94bf7ae5bc1ac7ab5d96e3',
  'W USDC-WBTC': '0x83de646a7125ac04950fea7e322481d4be66c71d',
  'W WETH-MATIC': '0x5ada298913d53aa823824de69b4a6e790aed9327',
  'W WETH-USDC': '0xfb3a24c0f289e695ceb87b32fc18a2b8bd896167',
  'W WETH-WBTC': '0x64e78e990b2a45fad8b64b43e62a67d69a156042',
  WBTC: '0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1',
  WETH: '0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9',
  stMATIC: '0x83b874c1e09d316059d929da402dcb1a98e92082',
  'stMATIC-MATIC': '0x9616052273a598bc04bd1ad7f7a753157c24f77e',
};
type AddrType = typeof addresses;
type AddrKey = keyof AddrType;
const proxyAddress = '0x8480199e5d711399abb4d51bda329e064c89ad77';

const Btn: FC<IProps> = ({ pairId, token0Bal, token1Bal, token0, token1, decimals0, decimals1 }) => {
  const { account, provider, chainId } = useAccount();
  const toast = useToast();
  const { addAction } = useAddAction('all-in-one');
  //   const [toastId, setToastId] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [amount0, setAmount0] = useState<number | string>('');
  const [amount1, setAmount1] = useState<number | string>('');
  const [isToken0Approved, setIsToken0Approved] = useState(true);
  const [isToken1Approved, setIsToken1Approved] = useState(true);
  const [isToken0Approving, setIsToken0Approving] = useState(false);
  const [isToken1Approving, setIsToken1Approving] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');

  const hypeAddress = addresses[pairId as AddrKey];

  const isInSufficient = Number(amount0) > Number(token0Bal) || Number(amount1) > Number(token1Bal);

  const checkApproval = (token0Amount: string, token1Amount: string) => {
    const token0Wei = new Big(utils.parseUnits(token0Amount, decimals0).toString());
    const token1Wei = new Big(utils.parseUnits(token1Amount, decimals1).toString());

    const abi = ['function allowance(address, address) external view returns (uint256)'];

    const token0Contract = new Contract(addresses[token0 as AddrKey], abi, provider);

    token0Contract
      .allowance(account, hypeAddress)
      .then((allowance0: any) => {
        setIsToken0Approved(!new Big(allowance0.toString()).lt(token0Wei));
      })
      .catch((e: any) => console.log(e));

    const token1Contract = new Contract(addresses[token1 as AddrKey], abi, provider);

    token1Contract
      .allowance(account, hypeAddress)
      .then((allowance1: any) => {
        setIsToken1Approved(!new Big(allowance1.toString()).lt(token1Wei));
      })
      .catch((e: any) => console.log(e));
  };
  const getFromDepositAmount = (depositAmount: [number, number], tokenDecimal: number) => {
    const a = new Big(depositAmount[0].toString());
    const b = new Big(depositAmount[1].toString());

    if (a.eq(0) && b.eq(0)) return '0';

    let diff;
    let midpoint;
    if (a.gt(b)) {
      diff = a.minus(b);
      midpoint = diff.div(new Big(2)).plus(b);
    } else {
      diff = b.minus(a);
      midpoint = diff.div(new Big(2)).plus(a);
    }

    for (let i = tokenDecimal; i > 0; i--) {
      const midpointFixed = midpoint.div(new Big(10).pow(tokenDecimal)).toFixed(i);
      if (
        a.div(new Big(10).pow(tokenDecimal)).lte(midpointFixed) &&
        b.div(new Big(10).pow(tokenDecimal)).gte(midpointFixed)
      ) {
        return midpointFixed;
      }
    }

    return '0';
  };
  const handleToken0Change = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;

    setAmount0(amount);
    if (Number(amount) === 0) {
      setAmount1('');
      setIsToken0Approved(true);
      setIsToken1Approved(true);
      return;
    }
    setIsLoading(true);
    setIsError(false);
    setLoadingMsg('Computing deposit amount...');

    const token0Wei = utils.parseUnits(amount, decimals0).toString();
    // console.log(111111111, token0Wei, hypeAddress, addresses[token0]);

    const proxyAbi = ['function getDepositAmount(address, address, uint256) public view returns (uint256, uint256)'];
    const proxyContract = new Contract(proxyAddress, proxyAbi, provider);

    proxyContract
      .getDepositAmount(hypeAddress, addresses[token0 as AddrKey], token0Wei)
      .then((depositAmount: any) => {
        console.info(222222222, depositAmount);
        const amount1 = getFromDepositAmount(depositAmount, decimals1);

        setAmount1(amount1);

        setIsLoading(false);
        checkApproval(amount, amount1);
      })
      .catch((e: any) => {
        console.info(3333333333, e);
        setIsLoading(true);
        setIsError(true);
        setAmount1(0);
        setLoadingMsg('Something went wrong. Please try again.');
      });
  };

  const handleToken1Change = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    setAmount1(amount);
    if (Number(amount) === 0) {
      setAmount0('');
      setIsToken0Approved(true);
      setIsToken1Approved(true);

      return;
    }
    setIsLoading(true);
    setIsError(false);
    setLoadingMsg('Computing deposit amount...');

    const token1Wei = utils.parseUnits(amount, decimals1).toString();

    const proxyAbi = ['function getDepositAmount(address, address, uint256) public view returns (uint256, uint256)'];
    const proxyContract = new Contract(proxyAddress, proxyAbi, provider);

    proxyContract
      .getDepositAmount(hypeAddress, addresses[token1 as AddrKey], token1Wei)
      .then((depositAmount: any) => {
        const amount0 = getFromDepositAmount(depositAmount, decimals0);
        setAmount0(amount0);
        setIsLoading(false);

        checkApproval(amount0, amount);
      })
      .catch((e: any) => {
        setIsLoading(true);
        setIsError(true);
        setAmount0(0);
        setLoadingMsg('Something went wrong. Please try again.');
      });
  };

  const handleApprove = (isToken0: boolean) => {
    const _token = isToken0 ? token0 : token1;
    const payload = isToken0 ? { isToken0Approving: true } : { isToken1Approving: true };

    const amount = isToken0 ? Big(amount0).toFixed(decimals0) : Big(amount1).toFixed(decimals1);

    const toastId = toast?.loading({
      title: `Approve ${amount} ${_token}`,
    });
    if (isToken0) {
      setIsToken0Approving(true);
    } else {
      setIsToken1Approving(true);
    }
    setIsLoading(true);
    setLoadingMsg(`Approving ${_token}...`);

    const tokenWei = utils.parseUnits(amount, isToken0 ? decimals0 : decimals1);

    const abi = ['function approve(address, uint) public'];

    const tokenContract = new Contract(addresses[_token as AddrKey], abi, provider.getSigner());

    tokenContract
      .approve(hypeAddress, tokenWei)
      .then((tx: any) => tx.wait())
      .then((receipt: any) => {
        const payload = isToken0
          ? { isToken0Approved: true, isToken0Approving: false }
          : { isToken1Approved: true, isToken1Approving: false };

        if (isToken0) {
          setIsToken0Approved(true);
          setIsToken0Approving(false);
        } else {
          setIsToken1Approved(true);
          setIsToken1Approving(false);
        }
        setIsLoading(false);
        setLoadingMsg('');
        toast?.dismiss(toastId);
        toast?.success({
          title: 'Approve Successfully!',
          text: `Approve ${amount} ${_token}`,
          tx: receipt.transactionHash,
          // chainId: state.chainId,
        });
      })
      .catch((error: any) => {
        setIsError(true);
        setIsLoading(false);
        setLoadingMsg(error);
        setIsToken0Approving(false);
        setIsToken1Approving(false);

        toast?.dismiss(toastId);
        toast?.fail({
          title: 'Approve Failed!',
          text: error?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : `Approve ${amount} ${_token}`,
        });
      });
  };

  const handleDeposit = () => {
    const toastId = toast?.loading({
      title: `Depositing...`,
    });
    setIsLoading(true);
    setIsError(false);
    setLoadingMsg('Depositing...');

    const token0Wei = utils.parseUnits(amount0 as string, decimals0);
    const token1Wei = utils.parseUnits(amount1 as string, decimals1);

    const proxyAbi = [
      'function deposit(uint256, uint256,address,address,uint256[4] memory)  external returns (uint256)',
    ];

    const proxyContract = new Contract(proxyAddress, proxyAbi, provider.getSigner());

    proxyContract
      .deposit(token0Wei, token1Wei, account, hypeAddress, [0, 0, 0, 0])
      .then((tx: any) => {
        return tx.wait();
      })
      .then((receipt: any) => {
        const { status, transactionHash } = receipt;

        addAction?.({
          type: 'Liquidity',
          action: 'Deposit',
          token0,
          token1,
          amount: amount0,
          template: 'Gamma',
          status: status,
          add: true,
          transactionHash,
          extra_data: JSON.stringify({
            amount0,
            amount1,
            pairId,
          }),
        });
        setIsLoading(false);

        // State.update({
        //   isPostTx: true,
        // });
        // setTimeout(() => State.update({ isPostTx: false }), 10_000);

        toast?.dismiss(toastId);
        toast?.success({
          title: 'Deposit Successfully!',
        });
        // const { refetch } = props;
        // if (refetch) refetch();
      })
      .catch((error: any) => {
        setIsError(true);
        setIsLoading(false);
        setLoadingMsg(error);

        toast?.dismiss(toastId);
        toast?.fail({
          title: 'Deposit Failed!',
          text: error?.message?.includes('user rejected transaction') ? 'User rejected transaction' : '',
        });
      });
  };

  const renderFoot = () => {
    if (isInSufficient) return <BaseButton className="w-100" disabled label="InSufficient Balance" size="large" />;

    if (isToken0Approved && isToken1Approved && !isToken0Approving && !isToken1Approving) {
      return (
        <BaseButton
          className="w-100"
          disabled={isLoading || !amount0 || !amount1}
          onClick={handleDeposit}
          loading={isLoading}
          label="Deposit"
          size="large"
        />
      );
    } else {
      return (
        <>
          <BaseButton
            className="flex-grow"
            disabled={isToken0Approved || isToken0Approving}
            onClick={() => handleApprove(true)}
            loading={isToken0Approving}
            label={`${isToken0Approved ? 'Approved' : 'Approve'} ${token0}`}
            size="large"
          />
          <BaseButton
            className="flex-grow"
            disabled={isToken1Approved || isToken1Approving}
            onClick={() => handleApprove(false)}
            loading={isToken1Approving}
            label={`${isToken1Approved ? 'Approved' : 'Approve'} ${token1}`}
            size="large"
          />
        </>
      );
    }
  };
  return (
    <ModalSwapBtnWrapper>
      <div className="input-section">
        <InputWrapper>
          <input
            type="number"
            value={amount0}
            onChange={handleToken0Change}
            // maxLength={String(maxInputBalance).length + 2}
            // max={maxInputBalance}
          />
          <span>{token0}</span>
        </InputWrapper>
        <span className="icon-plus">+</span>
        <InputWrapper>
          <input
            type="number"
            value={amount1}
            onChange={handleToken1Change}
            // maxLength={String(maxInputBalance).length + 2}
            // max={maxInputBalance}
          />
          <span>{token1}</span>
        </InputWrapper>
      </div>

      <div className="foot-section">{renderFoot()}</div>
      {/* {isLoading && <Comment isError={isError}>{loadingMsg}</Comment>} */}
    </ModalSwapBtnWrapper>
  );
};
export default Btn;

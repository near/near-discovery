import chains from '@/config/chains';
import multicall from '@/config/contract/multicall';
import networks from '@/config/liquidity/networks';
import useAddAction from '@/hooks/useAddAction';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import useToast from '@/hooks/useToast';
import { usePriceStore } from '@/stores/price';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import { useSetChain } from '@web3-onboard/react';
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import SelectDapps from './SelectDapps';
import { VmComponent } from './VmComponent';
import {
  StyledButton,
  StyledButtonList,
  StyledContent,
  StyledInput,
  StyledInputWrapper,
  StyledItem,
  StyledLabel,
  StyledLoading,
  StyledPanel,
  StyledValue
} from './styles';



const iconCircle = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8" stroke="#1E2028" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

)
const proxyAddress = "0xFc13Ebe7FEB9595D70195E9168aA7F3acE153621"
const LiquidityPanel = ({ chainId, onLoad }: any) => {
  const toast = useToast();
  const { addAction } = useAddAction('one-click-execution');
  const network = networks[chainId];
  const [sender, setSender] = useState<string>('');
  const [{ settingChain, connectedChain }, setChain] = useSetChain();
  const [currentDapp, setCurrentDapp] = useState<any>(network.dapps[network.defaultDapp]);
  const [updater, setUpdater] = useState(1);
  const [amount0, setAmount0] = useState('0.01');
  const [amount1, setAmount1] = useState('');

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState('')
  const [isToken0Approved, setIsToken0Approved] = useState(false)
  const [isToken1Approved, setIsToken1Approved] = useState(false)
  const [isToken0Approving, setIsToken0Approving] = useState(false)
  const [isToken1Approving, setIsToken1Approving] = useState(false)


  const etherProvider = new ethers.providers.Web3Provider(window.ethereum);

  const [allData, setAllData] = useState<any>();
  const prices = usePriceStore((store) => store.price);
  const { currentPair, token0, token1, addresses, hypeAddress } = useMemo<any>(() => {
    const _currentPair = currentDapp.pairs.find((pair: any) => pair.id === currentDapp.defaultPair);

    const _addresses = currentDapp.addresses
    const _hypeAddress = _addresses[_currentPair.id]
    const _data = allData ? allData[_hypeAddress] : {}
    const _token0 = {
      address: currentDapp.addresses[_currentPair.token0],
      decimals: _data.decimals0,
      chainId,
      symbol: _currentPair.token0,
      icon: '',
    };
    const _token1 = {
      address: currentDapp.addresses[_currentPair.token1],
      decimals: _data.decimals1,
      chainId,
      symbol: _currentPair.token1,
      icon: '',
    };

    return {
      currentPair: _currentPair,
      token0: _token0,
      token1: _token1,
      addresses: _addresses,
      hypeAddress: _hypeAddress
    };
  }, [currentDapp, allData]);

  const { balance: balance0 } = useTokenBalance({
    currency: token0,
    updater,
  });
  const { balance: balance1 } = useTokenBalance({
    currency: token1,
    updater,
  });
  const isInSufficient = useMemo(() => {
    return Number(amount0) > Number(balance0) || Number(amount1) > Number(balance1);
  }, [amount0, amount1, balance0, balance1])

  const fetchAllData = useCallback(async () => {
    try {
      const response = await fetch(currentDapp.ALL_DATA_URL);
      const result = await response.json();
      setAllData(result);
    } catch (err) { }
  }, [currentDapp]);

  const getFromDepositAmount = (depositAmount, tokenDecimal) => {
    let a = new Big(depositAmount[0].toString());
    let b = new Big(depositAmount[1].toString());

    if (a.eq(0) && b.eq(0)) return "0";

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
      const midpointFixed = midpoint
        .div(new Big(10).pow(tokenDecimal))
        .toFixed(i);
      if (
        a.div(Big(10).pow(tokenDecimal)).lte(midpointFixed) &&
        b.div(Big(10).pow(tokenDecimal)).gte(midpointFixed)
      ) {
        return midpointFixed;
      }
    }

    return "0";
  };
  const checkApproval = (token0Amount, token1Amount) => {
    const token0Wei = ethers.utils.parseUnits(
      Big(token0Amount).toFixed(token0.decimals),
      token0.decimals
    );
    const token1Wei = ethers.utils.parseUnits(
      Big(token1Amount).toFixed(token1.decimals),
      token1.decimals
    );
    const abi = [
      "function allowance(address, address) external view returns (uint256)",
    ];

    const token0Contract = new ethers.Contract(
      addresses[token0.symbol],
      abi,
      etherProvider
    );

    token0Contract
      .allowance(sender, hypeAddress)
      .then((allowance0) => {
        setIsToken0Approved(!new Big(allowance0.toString()).lt(token0Wei))
      })
      .catch((e) => console.log(e));

    const token1Contract = new ethers.Contract(
      addresses[token0.symbol],
      abi,
      etherProvider
    );

    token1Contract
      .allowance(sender, hypeAddress)
      .then((allowance1) => {
        setIsToken1Approved(!new Big(allowance1.toString()).lt(token0Wei))
      })
      .catch((e) => console.log(e));
  };

  const handleTokenChange = (amount, symbol) => {
    symbol === token0.symbol ? setAmount0(amount) : setAmount1(amount)
    if (Number(amount) === 0) {
      symbol === token0.symbol ? setAmount1("") : setAmount0("")
      setIsToken0Approved(true)
      setIsToken1Approved(true)
      return;
    }
    setIsLoading(true)
    setIsError(false)
    setLoadingMsg("Computing deposit amount...")

    const decimals = symbol === token0.symbol ? token0.decimals : token1.decimals
    const otherDecimals = symbol === token0.symbol ? token1.decimals : token0.decimals

    console.log('====decimals', decimals, '===otherDecimals', otherDecimals)

    const tokenWei = ethers.utils.parseUnits(
      Big(amount).toFixed(decimals),
      decimals
    );

    const proxyAbi = [
      "function getDepositAmount(address, address, uint256) public view returns (uint256, uint256)",
    ];
    const proxyContract = new ethers.Contract(
      proxyAddress,
      proxyAbi,
      etherProvider
    );
    proxyContract
      .getDepositAmount(ethers.utils.getAddress(hypeAddress), addresses[symbol], tokenWei)
      .then((depositAmount) => {
        const otherAmount = getFromDepositAmount(depositAmount, otherDecimals);
        console.log('====depositAmount', depositAmount, '=====otherAmount', otherAmount)
        symbol === token0.symbol ? setAmount1(otherAmount) : setAmount0(otherAmount)
        setIsLoading(false)
        checkApproval(amount, otherAmount);
      })
      .catch((e) => {
        console.log('----e', e)
        setIsLoading(true)
        setIsError(true)
        symbol === token0.symbol ? setAmount1(0) : setAmount0(0)
        setLoadingMsg("Something went wrong. Please try again.")
      });
  };

  const handleApprove = (symbol) => {
    const isToken0 = symbol === token0.symbol

    const amount = isToken0 ? Big(amount0).toFixed(token0.decimals) : Big(amount1).toFixed(token1.decimals);
    const toastId = toast?.loading({
      title: `Approve ${amount} ${symbol}`,
    });

    setIsLoading(true)
    isToken0 ? setIsToken0Approving(true) : setIsToken1Approving(true)
    setLoadingMsg(`Approving ${symbol}...`)
    const tokenWei = ethers.utils.parseUnits(
      amount,
      isToken0 ? token0.decimals : token1.decimals
    );
    const abi = ["function approve(address, uint) public"];
    const tokenContract = new ethers.Contract(
      addresses[symbol],
      abi,
      etherProvider.getSigner()
    );

    tokenContract
      .approve(hypeAddress, tokenWei)
      .then((tx) => tx.wait())
      .then((receipt) => {
        if (isToken0) {
          setIsToken0Approved(true)
          setIsToken0Approving(false)
        } else {
          setIsToken1Approved(true)
          setIsToken1Approving(false)
        }
        setIsLoading(false)
        setLoadingMsg("")
        toast?.dismiss(toastId);
        toast?.success({
          title: "Approve Successfully!",
          text: `Approve ${amount} ${symbol}`,
          tx: receipt.transactionHash,
          chainId,
        });
      })
      .catch((error) => {
        setIsError(true)
        setIsLoading(false)
        setLoadingMsg(error)
        setIsToken0Approving(false)
        setIsToken1Approving(false)
        toast?.dismiss(toastId);
        toast?.fail({
          title: "Approve Failed!",
          text: error?.message?.includes("user rejected transaction")
            ? "User rejected transaction"
            : `Approve ${amount} ${symbol}`,
        });
      });
  };
  const handleDeposit = () => {
    const toastId = toast?.loading({
      title: `Depositing...`,
    });
    setIsLoading(true)
    setIsError(false)
    setLoadingMsg("Depositing...")

    const token0Wei = ethers.utils.parseUnits(
      Big(amount0).toFixed(token0.decimals),
      token0.decimals
    );
    const token1Wei = ethers.utils.parseUnits(
      Big(amount1).toFixed(token1.decimals),
      token1.decimals
    );

    const proxyAbi = [
      "function deposit(uint256, uint256,address,address,uint256[4] memory)  external returns (uint256)",
    ];

    const proxyContract = new ethers.Contract(
      proxyAddress,
      proxyAbi,
      etherProvider.getSigner()
    );
    proxyContract
      .deposit(token0Wei, token1Wei, sender, hypeAddress, [0, 0, 0, 0])
      .then((tx) => {
        return tx.wait();
      })
      .then((receipt) => {
        const { status, transactionHash } = receipt;

        addAction?.({
          type: "Liquidity",
          action: "Deposit",
          token0,
          token1,
          amount: amount0,
          template: "Gamma",
          status: status,
          transactionHash,
          chain_id: chainId,
        });
        setIsLoading(false)
        setUpdater(Date.now());

        toast?.dismiss(toastId);
        toast?.success({
          title: "Deposit Successfully!",
        });
      })
      .catch((error) => {
        setIsError(true)
        setIsLoading(false)
        setLoadingMsg(error)
        toast?.dismiss(toastId);
        toast?.fail({
          title: "Deposit Failed!",
          text: error?.message?.includes("user rejected transaction")
            ? "User rejected transaction"
            : "",
        });
      });
  };

  useEffect(() => {
    if (amount0) {
      // handleTokenChange(amount0, token0.symbol);
    }
    onLoad(`Deposit ${amount0} ${token0.symbol}-${token1.symbol}`);
  }, [amount0, currentDapp]);

  useEffect(() => {
    if (currentDapp.name === 'Gamma') fetchAllData();
  }, [currentDapp]);

  useEffect(() => {
    etherProvider.send('eth_requestAccounts', []).then((accounts) => {
      const currentAccount = accounts[0];
      const originalCaseAddress = ethers.utils.getAddress(currentAccount);
      setSender(originalCaseAddress.toString());
    });
  }, [])



  return (
    <StyledContent>
      <StyledPanel>
        <StyledItem>
          <StyledLabel>dApp</StyledLabel>
          <SelectDapps
            currentDapp={currentDapp}
            dapps={network.dapps}
            onSelect={(dapp: any) => {
              setCurrentDapp(dapp);
            }}
          />
        </StyledItem>
        <StyledItem>
          <StyledLabel>Pool</StyledLabel>
          <StyledValue>
            {currentPair.token0}/{currentPair.token1}
          </StyledValue>
        </StyledItem>
        <StyledItem style={{ height: '70px' }}>
          <StyledLabel>Suggest amount</StyledLabel>
          <div>
            <StyledInputWrapper>
              <StyledInput
                value={amount0}
                onChange={(ev: any) => {
                  if (isNaN(Number(ev.target.value))) return;
                  handleTokenChange(ev.target.value, token0.symbol)
                }}
              />
              <StyledValue>{currentPair.token0}</StyledValue>
            </StyledInputWrapper>
            <StyledInputWrapper style={{ marginTop: '10px' }}>
              <StyledInput
                value={amount1}
                onChange={(ev: any) => {
                  if (isNaN(Number(ev.target.value))) return;
                  handleTokenChange(ev.target.value, token1.symbol)
                }}
              />
              <StyledValue>{currentPair.token1}</StyledValue>
            </StyledInputWrapper>
          </div>
        </StyledItem>
        <StyledItem>
          <StyledLabel>Your balance</StyledLabel>
          <StyledValue>
            <span
              className="balance"
              onClick={() => {
                if (isNaN(Number(balance0)) || !balance0) return;
                setAmount0(balance0);
              }}
            >
              {balance0 ? formateValueWithThousandSeparatorAndFont(balance0, 4, true) : '-'}
            </span>{' '}
            {currentPair.token0} |{' '}
            <span
              className="balance"
              onClick={() => {
                if (isNaN(Number(balance1)) || !balance1) return;
                setAmount1(balance1);
              }}
            >
              {balance1 ? formateValueWithThousandSeparatorAndFont(balance1, 4, true) : '-'}
            </span>{' '}
            {currentPair.token1}
          </StyledValue>
        </StyledItem>
      </StyledPanel>
      {allData && (
        <VmComponent
          src="bluebiu.near/widget/Liquidity.Data.Gamma"
          props={{
            pairs: [currentPair],
            addresses: currentDapp.addresses,
            allData: allData,
            prices,
            curChain: chains[chainId],
            multicallAddress: multicall[chainId],
            LAST_SNAP_SHOT_DATA_URL: network.LAST_SNAP_SHOT_DATA_URL,
            onLoad: (_data: any) => {
              console.log(_data);
            },
          }}
        />
      )}
      {/* <StyledButton>Deposit</StyledButton> */}

      {network.chainId !== Number(connectedChain?.id) ? (
        <StyledButton
          onClick={() => {
            setChain({ chainId: `0x${Number(chainId).toString(16)}` });
          }}
        >
          {settingChain ? (
            <VmComponent
              src="bluebiu.near/widget/0vix.LendingLoadingIcon"
              props={{
                size: 16,
              }}
            />
          ) : (
            'Switch Network'
          )}
        </StyledButton>
      ) : (
        <StyledButtonList>
          {isInSufficient && <StyledButton disabled>InSufficient Balance</StyledButton>}
          {
            !isInSufficient &&
            (isToken0Approved &&
              isToken1Approved &&
              !isToken0Approving &&
              !isToken1Approving ? (

              <StyledButton disabled={isLoading || !amount0 || !amount1} onClick={handleDeposit}>
                {
                  isLoading ? (
                    <StyledLoading>{iconCircle}</StyledLoading>
                  ) : (
                    "Deposit"
                  )
                }
              </StyledButton>
            ) : (
              <>
                <StyledButton disabled={isToken0Approved || isToken0Approving} onClick={() => handleApprove(token0.symbol)}>{
                  isToken0Approving ? (
                    <StyledLoading>{iconCircle}</StyledLoading>
                  ) : (
                    <>
                      {isToken0Approved ? "Approved" : "Approve"} {currentPair.token0}
                    </>
                  )}
                </StyledButton>
                <StyledButton disabled={isToken1Approved || isToken1Approving} onClick={() => handleApprove(token1.symbol)}>{
                  isToken1Approving ? (
                    <StyledLoading>{iconCircle}</StyledLoading>
                  ) : (
                    <>
                      {isToken1Approved ? "Approved" : "Approve"} {currentPair.token1}
                    </>
                  )}
                </StyledButton>
              </>
            ))
          }
        </StyledButtonList>
      )}

    </StyledContent>
  );
};

export default memo(LiquidityPanel);

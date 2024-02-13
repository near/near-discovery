import chains from '@/config/chains';
import multicall from '@/config/contract/multicall';
import networks from '@/config/liquidity/networks';
import useAddAction from '@/hooks/useAddAction';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import useToast from '@/hooks/useToast';
import { usePriceStore } from '@/stores/price';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import { useSetChain } from '@web3-onboard/react';
import { useDebounceFn } from 'ahooks';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SelectDapps from './SelectDapps';
import { VmComponent } from './VmComponent';
import {
  StyledButton,
  StyledContent,
  StyledInput,
  StyledInputWrapper,
  StyledItem,
  StyledLabel,
  StyledPanel,
  StyledValue
} from './styles';

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
  const [allData, setAllData] = useState<any>();
  const [loading, setLoading] = useState(true);

  const onTokenChangeRef = useRef<any>()
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

  const { run: handleQuote } = useDebounceFn(
    () => {
      setLoading(true);
    },
    {
      wait: 500,
    },
  );
  const fetchAllData = useCallback(async () => {
    try {
      const response = await fetch(currentDapp.ALL_DATA_URL);
      const result = await response.json();
      setAllData(result);
    } catch (err) { }
  }, [currentDapp]);



  useEffect(() => {
    if (amount0) {
    }
    onLoad(`Deposit ${amount0} ${token0.symbol}-${token1.symbol}`);
  }, [amount0, currentDapp]);

  useEffect(() => {
    if (currentDapp.name === 'Gamma') fetchAllData();
  }, [currentDapp]);

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
                  onTokenChangeRef.current && onTokenChangeRef.current(ev.target.value, token0.symbol)
                }}
              />
              <StyledValue>{currentPair.token0}</StyledValue>
            </StyledInputWrapper>
            <StyledInputWrapper style={{ marginTop: '10px' }}>
              <StyledInput
                value={amount1}
                onChange={(ev: any) => {
                  if (isNaN(Number(ev.target.value))) return;
                  onTokenChangeRef.current && onTokenChangeRef.current(ev.target.value, token1.symbol)
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
      {/* {allData && (
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
      )} */}
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
      ) : allData && (
        <VmComponent
          src="bluebiu.near/widget/Liquidity.Gamma.DialogButton"
          props={{
            token0,
            token1,
            amount0,
            amount1,
            balance0,
            balance1,
            addresses,
            hypeAddress,
            currentDapp,
            chainId,
            setAmount0,
            setAmount1,
            currentPair,
            proxyAddress,
            onSuccess: () => {
              setUpdater(Date.now());
            },
            onLoad({
              onTokenChange
            }: any) {
              onTokenChangeRef.current = onTokenChange
            }
          }}
        />
      )}

    </StyledContent>
  );
};

export default memo(LiquidityPanel);

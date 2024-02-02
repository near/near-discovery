import { memo, useState, useEffect, useMemo, useCallback } from 'react';
import Big from 'big.js';
import chains from '@/config/chains';
import networks from '@/config/liquidity/networks';
import { useSetChain } from '@web3-onboard/react';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import useAccount from '@/hooks/useAccount';
import { usePriceStore } from '@/stores/price';
import { useDebounceFn } from 'ahooks';
import multicall from '@/config/contract/multicall';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import SelectDapps from './SelectDapps';
import { VmComponent } from './VmComponent';
import {
  StyledContent,
  StyledPanel,
  StyledItem,
  StyledLabel,
  StyledValue,
  StyledInputWrapper,
  StyledInput,
  StyledButton,
} from './styles';

const LiquidityPanel = ({ chainId, onLoad }: any) => {
  const network = networks[chainId];
  const [{ settingChain, connectedChain }, setChain] = useSetChain();
  const [currentDapp, setCurrentDapp] = useState<any>(network.dapps[network.defaultDapp]);
  const [updater, setUpdater] = useState(1);
  const [amount0, setAmount0] = useState('0.01');
  const [amount1, setAmount1] = useState('20');
  const [allData, setAllData] = useState<any>();
  const prices = usePriceStore((store) => store.price);
  const { currentPair, token0, token1 } = useMemo<any>(() => {
    const _currentPair = currentDapp.pairs.find((pair: any) => pair.id === currentDapp.defaultPair);
    const _token0 = {
      address: currentDapp.addresses[_currentPair.token0],
      decimals: _currentPair.decimals0,
      chainId,
      symbol: _currentPair.token0,
      icon: '',
    };
    const _token1 = {
      address: currentDapp.addresses[_currentPair.token1],
      decimals: _currentPair.decimals1,
      chainId,
      symbol: _currentPair.token1,
      icon: '',
    };
    return {
      currentPair: _currentPair,
      token0: _token0,
      token1: _token1,
    };
  }, [currentDapp]);

  const { balance: balance0 } = useTokenBalance({
    currency: token0,
    updater,
  });
  const { balance: balance1 } = useTokenBalance({
    currency: token1,
    updater,
  });

  const fetchAllData = useCallback(async () => {
    try {
      const response = await fetch(currentDapp.ALL_DATA_URL);
      const result = await response.json();
      setAllData(result);
    } catch (err) {}
  }, [currentDapp]);

  useEffect(() => {
    if (amount0) {
      // handleQuote();
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
                  setAmount0(ev.target.value);
                }}
              />
              <StyledValue>{currentPair.token0}</StyledValue>
            </StyledInputWrapper>
            <StyledInputWrapper style={{ marginTop: '10px' }}>
              <StyledInput
                value={amount1}
                onChange={(ev: any) => {
                  if (isNaN(Number(ev.target.value))) return;
                  setAmount1(ev.target.value);
                }}
              />
              <StyledValue>{currentPair.token0}</StyledValue>
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
      <StyledButton>Deposit</StyledButton>
    </StyledContent>
  );
};

export default memo(LiquidityPanel);

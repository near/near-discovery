import { memo, useEffect, useMemo, useState } from 'react';
import Big from 'big.js';
import { useSetChain } from '@web3-onboard/react';
import { useDebounceFn } from 'ahooks';
import networks from '@/config/swap/networks';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import useAccount from '@/hooks/useAccount';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import { multicall } from '@/utils/multicall';
import multicallConfig from '@/config/contract/multicall';
import weth from '@/config/contract/weth';
import { usePriceStore } from '@/stores/price';
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
  StyledButtonWrapper,
} from './styles';

const SwapPanel = ({ chainId, onLoad, defaultDapp, defaultAmount }: any) => {
  const network = networks[chainId];
  const [{ settingChain, connectedChain }, setChain] = useSetChain();
  const [currentDapp, setCurrentDapp] = useState<any>(network.dexs[defaultDapp || network.defalutDex]);
  const [amount, setAmount] = useState(defaultAmount || '0.01');
  const [updater, setUpdater] = useState(1);
  const [inputCurrency, outputCurrency] = useMemo(() => {
    return [currentDapp.defaultCurrencies.input, currentDapp.defaultCurrencies.output];
  }, [currentDapp]);
  const { balance } = useTokenBalance({ currency: inputCurrency, updater });
  const [loading, setLoading] = useState(true);
  const [trade, setTrade] = useState<any>({});
  const { account } = useAccount();
  const prices = usePriceStore((store) => store.price);

  const { run: handleQuote } = useDebounceFn(
    () => {
      setLoading(true);
    },
    {
      wait: 500,
    },
  );

  const gasUsd = useMemo(() => {
    if (!trade.gas || !prices[network.nativeCurrency.symbol]) return '-';
    return formateValueWithThousandSeparatorAndFont(
      Big(trade.gas || 0)
        .div(10 ** 18)
        .mul(prices[network.nativeCurrency.symbol] || 0)
        .toFixed(10),
      2,
      true,
    );
  }, [trade]);

  useEffect(() => {
    if (amount) {
      handleQuote();
    }
    onLoad(`Swap ${amount || 0.01} ${inputCurrency.symbol} to ${outputCurrency.symbol}`);
  }, [amount, currentDapp]);
  return (
    <StyledContent>
      <StyledPanel>
        <StyledItem>
          <StyledLabel>dApp</StyledLabel>
          <SelectDapps
            currentDapp={currentDapp}
            dapps={Object.values(network.dexs).filter((item: any) => !item.oneExecutionDisabled)}
            onSelect={(dapp: any) => {
              setCurrentDapp(dapp);
            }}
          />
        </StyledItem>
        <StyledItem>
          <StyledLabel>Swap pair</StyledLabel>
          <StyledValue>
            {inputCurrency.symbol} - {outputCurrency.symbol}
          </StyledValue>
        </StyledItem>
        <StyledItem>
          <StyledLabel>Suggest amount</StyledLabel>
          <StyledInputWrapper>
            <StyledInput
              value={amount}
              onChange={(ev: any) => {
                if (isNaN(Number(ev.target.value))) return;
                setAmount(ev.target.value);
              }}
            />
            <StyledValue>{inputCurrency.symbol}</StyledValue>
          </StyledInputWrapper>
        </StyledItem>
        <StyledItem>
          <StyledLabel>Your balance</StyledLabel>
          <StyledValue>
            <span
              className="balance"
              onClick={() => {
                if (isNaN(Number(balance)) || !balance) return;
                setAmount(balance);
              }}
            >
              {balance ? formateValueWithThousandSeparatorAndFont(balance, 4, true) : '-'}
            </span>{' '}
            {inputCurrency.symbol}
          </StyledValue>
        </StyledItem>
      </StyledPanel>
      <StyledItem>
        <StyledValue>
          <span className="label">Est. Output:</span> ~
          {trade.outputCurrencyAmount && amount
            ? formateValueWithThousandSeparatorAndFont(trade.outputCurrencyAmount, 2, true)
            : '-'}
          {outputCurrency.symbol}
        </StyledValue>
        <StyledValue>
          <span className="label">Gas Fees:</span> ${gasUsd}
        </StyledValue>
      </StyledItem>
      <StyledButtonWrapper>
        <VmComponent
          src="bluebiu.near/widget/Arbitrum.Swap.SwapButton"
          props={{
            routerAddress: currentDapp.routerAddress,
            wethAddress: weth[chainId],
            title: currentDapp.name,
            chainName: network.chainName,
            inputCurrency: inputCurrency,
            outputCurrency: outputCurrency,
            inputCurrencyAmount: amount,
            outputCurrencyAmount: trade.outputCurrencyAmount,
            maxInputBalance: balance,
            onSuccess: () => {
              setUpdater(Date.now());
            },
            onApprovedSuccess: () => {
              if (!trade.gas) handleQuote();
            },
            noPair: trade.noPair,
            loading: trade.loading,
            add: true,
            unsignedTx: trade.unsignedTx,
            chainId,
            gas: trade.gas,
            chainIdNotSupport: network.chainId !== Number(connectedChain?.id),
            onSwitchChain: setChain,
            switchingChain: settingChain,
          }}
        />
        <VmComponent
          src={currentDapp.amountOutFn}
          props={{
            updater: loading,
            inputCurrency: inputCurrency,
            outputCurrency: outputCurrency,
            inputCurrencyAmount: amount,
            account,
            wethAddress: weth[chainId],
            prices,
            ...currentDapp,
            slippage: '0.05',
            onLoad: (data: any) => {
              console.log('amountOutFn', data);
              setTrade(data);
              setLoading(false);
            },
            multicall,
            multicallAddress: multicallConfig[chainId],
          }}
        />
      </StyledButtonWrapper>
    </StyledContent>
  );
};

export default memo(SwapPanel);

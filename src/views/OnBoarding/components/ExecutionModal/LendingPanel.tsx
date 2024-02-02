import { memo, useState, useEffect, useMemo } from 'react';
import Big from 'big.js';
import networks from '@/config/lending/networks';
import { useSetChain } from '@web3-onboard/react';
import useTokenBalance from '@/hooks/useCurrencyBalance';
import useAccount from '@/hooks/useAccount';
import { useDebounceFn } from 'ahooks';
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
  StyledButtonWrapper,
  StyledButton,
} from './styles';

const LendingPanel = ({ chainId, onLoad, defaultDapp, defaultAmount }: any) => {
  const network = networks[chainId];
  const [{ settingChain, connectedChain }, setChain] = useSetChain();
  const [currentDapp, setCurrentDapp] = useState<any>(network?.dapps[defaultDapp || network.defaultDapp]);
  const [updater, setUpdater] = useState(defaultAmount || 1);
  const currentMarekt = useMemo(() => {
    if (!currentDapp) return '';
    return currentDapp.markets[currentDapp.defaultMarket];
  }, [currentDapp]);
  const [trade, setTrade] = useState<any>({});
  const [amount, setAmount] = useState('10');
  const { balance } = useTokenBalance({ currency: currentMarekt.underlyingToken, updater });
  const { account } = useAccount();
  const [loading, setLoading] = useState(true);

  const buttonClickable = useMemo(() => {
    return !Big(amount || 0).gt(balance || 0);
  }, [balance, amount]);

  const { run: handleQuote } = useDebounceFn(
    () => {
      setLoading(true);
    },
    {
      wait: 500,
    },
  );

  useEffect(() => {
    if (amount) {
      handleQuote();
    }
    onLoad(`Supply ${amount || 10} USDC`);
  }, [amount, currentDapp]);
  return (
    <StyledContent style={{ paddingBottom: '20px' }}>
      <StyledPanel>
        <StyledItem>
          <StyledLabel>dApp</StyledLabel>
          <SelectDapps
            currentDapp={currentDapp}
            dapps={Object.values(network.dapps)}
            onSelect={(dapp: any) => {
              setCurrentDapp(dapp);
            }}
          />
        </StyledItem>
        <StyledItem>
          <StyledLabel>Pool</StyledLabel>
          <StyledValue>{currentMarekt.underlyingToken.symbol}</StyledValue>
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
            <StyledValue>{currentMarekt.underlyingToken.symbol}</StyledValue>
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
            {currentMarekt.underlyingToken.symbol}
          </StyledValue>
        </StyledItem>
      </StyledPanel>
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
        <StyledButtonWrapper>
          <VmComponent
            src="bluebiu.near/widget/Avalanche.Lending.DialogButton"
            props={{
              disabled: !buttonClickable,
              actionText: 'Deposit',
              amount: amount,
              data: {
                dappName: currentDapp.name,
                ...currentMarekt,
                config: currentDapp,
              },
              chainId,
              unsignedTx: trade.unsignedTx,
              isError: trade.isError,
              gas: trade.gas,
              loading,
              onApprovedSuccess: () => {
                if (!trade.gas) handleQuote();
              },
              onSuccess: () => {
                setUpdater(Date.now());
              },
            }}
          />
        </StyledButtonWrapper>
      )}

      <VmComponent
        src={currentDapp.handler}
        props={{
          update: loading,
          data: {
            actionText: 'Deposit',
            ...currentMarekt,
            config: currentDapp,
          },
          amount: amount,
          account,
          onLoad: (_data: any) => {
            console.log(_data);
            setTrade(_data);
            setLoading(false);
          },
        }}
      />
    </StyledContent>
  );
};

export default memo(LendingPanel);

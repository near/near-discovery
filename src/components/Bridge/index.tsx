import Big from 'big.js';
import { utils } from 'ethers';
import { debounce } from 'lodash';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import useReport from '@/views/Landing/hooks/useReport';

import useAccount from '@/hooks/useAccount';
import useTokenBalance from './hooks/useTokenBalance';

import ExchangeIcon from '../Icons/ExchangeIcon';
import Button from './components/Button';
import Destination from './components/Destination';
import DialogChains from './components/DialogChains';
import DialogTokens from './components/DialogTokens';
import Input from './components/Input';
import Routes from './components/Routes';
import Select from './components/Select';
import useBestRoute from './hooks/useBestRoute';
import useBridge from './hooks/useBridge';
import useDestination from './hooks/useDestination';
import useTokensAndChains from './hooks/useTokensAndChains';
import { isNumeric } from './util';
import type { Chain, Token, Trade } from './types';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: transparent;
  color: red;
  padding-bottom: 40px;
`;
const Empty = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #979abe;
  text-align: center;
`;
const Label = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #979abe;
  margin-top: 10px;
`;

const LabelTopMinus = styled(Label)`
  margin-top: -30px;
`;

const StyledExchangeIcon = styled.div`
  color: #979abe;
  width: 30px;
  height: 30px;
  margin: 10px auto 0px;
  position: relative;
  z-index: 10;
`;

const Bridge = ({ onSuccess }: { onSuccess: () => void }) => {
  const [showTokenDialog, setShowTokenDialog] = useState<boolean>(false);
  const [showChainDialog, setShowChainDialog] = useState<boolean>(false);
  const [selectedTokenAddress, setSelectedTokenAddress] = useState<string>('');
  const [selectedChainId, setSelectedChainId] = useState<number>();
  const [selectableChains, setSelectableChains] = useState<Chain[]>([]);
  const [errorTips, setErrorTips] = useState<string>('');
  const [clickType, setClickType] = useState<'in' | 'out'>();
  const [updater, setUpdater] = useState<number>(0);
  const [amount, setAmount] = useState<string>();
  const [selectableTokens, setSelectableTokens] = useState<Token[]>([]);
  const [selectedTradeIndex, setSelectedTradeIndex] = useState<number>(-1);
  const { account, chainId } = useAccount();
  const { handleReport } = useReport();
  const { tokens, chains, lifiTokens } = useTokensAndChains();
  const { inputToken, outputToken, inputChain, outputChain, selectToken, selectChain, onExchange } = useBridge({
    chains,
    tokens,
    lifiTokens,
  });
  const { balance, loading } = useTokenBalance({ tokensByChain: inputToken });
  const { checked, setChecked, destination, setDestination } = useDestination();
  const { getBestRoute, gasCost, trades, setTrades, checking, swap, swaping } = useBestRoute();
  const handleSelectClick = useCallback(
    (type: 'chain' | 'token', clickType: string, item?: Token | Chain) => {
      if (type === 'chain') {
        setSelectableChains(Object.values(chains));
        setShowChainDialog(true);
      } else if (type === 'token') {
        const curChain = clickType === 'in' ? inputChain : outputChain;
        if (curChain) {
          setSelectableTokens(lifiTokens[curChain.chainId]);
          setShowTokenDialog(true);
        }
      }

      if (!item) return;
      if (item as Token) {
        setSelectedTokenAddress((item as Token).address || '');
      } else {
        setSelectedChainId(item.chainId);
      }
    },
    [inputChain, outputChain, clickType, inputToken, outputToken, chains],
  );

  const handleBestRoute = useCallback(() => {
    setTrades([]);
    setErrorTips('');
    setSelectedTradeIndex(-1);
    if (!inputChain || !outputChain || !outputToken || !inputToken) return;
    getBestRoute({
      chain: inputChain,
      inputToken,
      targetToken: outputToken,
      targetChain: outputChain,
      amount,
      destination: checked ? destination : undefined,
    });
  }, [inputChain, outputChain, outputToken, inputToken, amount, destination]);

  useEffect(() => {
    if (!amount || new Big(amount).eq(0)) {
      setErrorTips('Enter An Amount');
      return;
    }
    if (inputChain?.chainId === outputChain?.chainId) {
      setErrorTips('Select different network');
      return;
    }
    if (!inputChain || !outputChain) {
      setErrorTips('Select a network');
      return;
    }
    if (!inputToken || !outputToken) {
      setErrorTips('Select a token');
      return;
    }
    if (destination && !utils.isAddress(destination)) {
      setErrorTips('Change destination address');
      return;
    }

    if (!(trades && trades.length) && !checking) {
      // setErrorTips('Relayer: gas too low');
      setErrorTips('No route');
      return;
    }

    if (amount) {
      if (new Big(amount).gt(balance || 0)) {
        setErrorTips('Insufficient balance');
        return;
      }
    }

    // if (gasCost && new Big(gasCost).gt(balance || 0)) {
    //   setErrorTips('Not enough gas');
    //   return;
    // }

    if (trades && trades.length && selectedTradeIndex === -1) {
      // setErrorTips('Relayer: gas too low');
      setErrorTips('Select a route');
      return;
    }

    setErrorTips('');
  }, [inputChain, outputChain, amount, balance, destination, chainId, gasCost, trades, selectedTradeIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleBestRoute();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [inputChain, outputChain, amount, outputToken, inputToken, destination]);

  useEffect(() => {
    handleReport('wallet/bridge/view');
  }, []);

  const route = trades.length && selectedTradeIndex > -1 ? trades[selectedTradeIndex] : null;

  return (
    <Container>
      {!account && <Empty>Please connect wallet.</Empty>}
      {chainId && !chains[chainId] && (
        <Container>
          <Empty>Comming soon.</Empty>
        </Container>
      )}
      {account && chainId && chains[chainId] && (
        <>
          <>
            <Label>From</Label>
            <Select
              token={inputToken}
              chain={inputChain}
              onClick={(type: 'chain' | 'token', item?: Token | Chain) => {
                setClickType('in');
                handleSelectClick(type, 'in', item);
              }}
            />
          </>
          <StyledExchangeIcon onClick={onExchange}>
            <ExchangeIcon />
          </StyledExchangeIcon>
          <>
            <LabelTopMinus>To</LabelTopMinus>
            <Select
              token={outputToken}
              chain={outputChain}
              onClick={(type: 'chain' | 'token', item?: Token | Chain) => {
                setClickType('out');
                handleSelectClick(type, 'out', item);
              }}
            />
          </>
          <Input
            balance={balance}
            loading={loading}
            amount={amount}
            onChange={(value: string) => {
              if (value === '') {
                setAmount(value);
                return;
              }
              if (isNumeric(value)) {
                setAmount(value);
              }
            }}
          />
          <Destination
            checked={checked}
            setChecked={setChecked}
            destination={destination}
            setDestination={setDestination}
          />
          <Routes trades={trades} selectedTradeIndex={selectedTradeIndex} onSelected={setSelectedTradeIndex} />
          <Button
            errorTips={errorTips}
            inputToken={inputToken}
            outputToken={outputToken}
            amount={amount}
            inputChain={inputChain}
            outputChain={outputChain}
            destination={destination}
            chainId={chainId}
            checking={checking}
            swap={swap}
            route={route}
            swaping={swaping}
            onSuccess={(hash) => {
              setUpdater(Date.now());
              onSuccess();
              handleBestRoute();
            }}
            onFail={() => {
              handleBestRoute();
            }}
          />
        </>
      )}
      <DialogChains
        display={showChainDialog}
        chains={selectableChains}
        currentChainId={selectedChainId}
        onClose={() => {
          setShowChainDialog(false);
        }}
        onSelect={(chain: Chain) => {
          clickType && selectChain(clickType, chain);
        }}
      />
      <DialogTokens
        display={showTokenDialog}
        chains={chains}
        tokens={selectableTokens}
        currentToken={selectedTokenAddress}
        currentChainId={selectedChainId}
        onClose={() => {
          setShowTokenDialog(false);
        }}
        onSelect={(token: Token) => {
          clickType && selectToken(clickType, token);
          setShowTokenDialog(false);
        }}
      />
    </Container>
  );
};

export default memo(Bridge);

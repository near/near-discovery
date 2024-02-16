import { memo, useEffect, useMemo, useRef, useState } from 'react';
import Big from 'big.js';
import { useDebounceFn } from 'ahooks';

import { useSetChain } from '@web3-onboard/react';
import useToast from '@/hooks/useToast';
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

import type { Token } from '@/types';
import type { Route } from '@lifi/sdk';

import useAccount from '@/hooks/useAccount';
import useLifi, { chains, tokens } from '@/components/Bridge/hooks/useLifi'
import useTokenBalance from '@/components/Bridge/hooks/useTokenBalance'
import { formatException } from '@/components/Bridge/util/index'
import Loading from '@/components/Icons/Loading';
import { balanceFormated } from '@/utils/balance';


const fromChainId = 1

const BridgePanel = ({ chainId, onLoad }: any) => {
  const { swap, getQouteInfo } = useLifi()
  const { account } = useAccount()
  const [amount, setAmount] = useState('0.01')
  const [gasCostUSD, setGasCostUSD] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [isloading, setLoading] = useState(false)
  const [btnText, setBtnText] = useState('')
  const { fail, success } = useToast()

  const routeRef = useRef<Route | null>(null)
  const btnStatus = useRef(0)

  const [{ connectedChain }, setChain] = useSetChain();

  const fromChain = useMemo(() => {
    const filterChains = chains.filter(chain => chain.chainId === fromChainId)
    return filterChains[0]
  }, [])

  const fromToken = useMemo(() => {
    const chainTokens = tokens[fromChainId]
    const ethTokens = chainTokens.filter(token => token.symbol === 'ETH')
    return ethTokens[0]
  }, [])

  const toChain = useMemo(() => {
    const filterChains = chains.filter(chain => chain.chainId === chainId)
    return filterChains[0]
  }, [chainId])

  const toToken = useMemo(() => {
    const chainTokens = tokens[chainId]
    const ethTokens = chainTokens.filter(token => token.symbol === 'ETH')
    return ethTokens[0]
  }, [chainId])

  const nativeToken: Token = {
    chainId: fromChainId,
    address: toToken.address,
    name: toToken.name,
    symbol: toToken.symbol,
    icon: '',
    decimals: toToken.decimals,
  }

  const { balance, loading: balanceLoading, getBalance } = useTokenBalance({
    tokensByChain: nativeToken
  })


  const { run: handleQuote } = useDebounceFn(
    async () => {
      setLoading(true)
      setGasCostUSD('')
      setToAmount('')
      routeRef.current = null
      const routes = await getQouteInfo({
        chain: fromChain,
        token: fromToken,
        targetChain: toChain,
        targetToken: toToken,
        amount: new Big(amount).toString(),
        destination: account,
      })

      setLoading(false)

      if (routes && routes.length) {
        const currentRoute = routes[0]
        routeRef.current = currentRoute
        setGasCostUSD(currentRoute.gasCostUSD || '')
        setToAmount((currentRoute.toAmount ? new Big(currentRoute.toAmount || 0).div(Math.pow(10, toToken.decimals)).toFixed(4, 0) : '-') + '  ' + toToken.symbol)
      }
    },
    {
      wait: 500,
    },
  );

  useEffect(() => {
    getBalance()
    onLoad(`Swap ${balanceFormated(amount, 4)} ${toToken.symbol} to ${toToken.symbol}`)
  }, [chainId])

  useEffect(() => {
    if (amount && Number(amount) > 0) {
      handleQuote();
    }
    onLoad(`Swap ${balanceFormated(amount, 4)} ${toToken.symbol} to ${toToken.symbol}`)
  }, [amount]);

  useEffect(() => {
    if (Number(connectedChain?.id) !== fromChain.chainId) {
      setBtnText(`Switch network to ${fromChain.chainName}`)
      btnStatus.current = 1
      return
    } 

    if (!amount || Number(amount) === 0) {
      btnStatus.current = 2
      setBtnText(`Enter An Amount`)
      return
    }

    if (amount >= balance) {
      btnStatus.current = 3
      setBtnText(`Insufficient balance`)
      return 
    }

    if (!routeRef.current) {
      btnStatus.current = 4
      setBtnText('No route')
      return 
    }

    setBtnText(`Bridge`)
    btnStatus.current = 0

  }, [connectedChain, amount, balance, toAmount])

  const handleBridge = async () => {
    // Determine current chain
    if (btnStatus.current === 1) {
      setChain({ chainId: `0x${fromChain.chainId.toString(16)}` })
      return
    }

     // check amount
    if (btnStatus.current > 0) {
      return
    }

    if (!routeRef.current) {
      return
    }

    setLoading(true)
    btnStatus.current = 5

    try {
      await swap({
        chain: fromChain,
        token: fromToken,
        targetChain: toChain,
        targetToken: toToken,
        amount: new Big(amount).toString(),
        destination: account,
        route: routeRef.current as Route,
        actionName: 'quick_onboarding',
        onSuccess: (tx) => {
          success({
            title: 'Transaction successed',
          })

          setAmount('0.01')
          getBalance()
          routeRef.current = null

        },
      })
    } catch (err: any) {
      fail({
        title: err.name ? err.name : 'Transaction failed',
        text: formatException(err.message),
      })
    }

    setAmount('0.01')
    setGasCostUSD('0')
    
    btnStatus.current = 0
    setLoading(false)
  }

  return (
    <StyledContent>
      <StyledPanel>
      <StyledItem>
          <StyledLabel>dApp</StyledLabel>
          <StyledValue>
            <div className='iconWapper'>
             <img src="/images/apps/lifi.png" className='icon' />
             <span>Lifi</span>
            </div>
          </StyledValue>
        </StyledItem>

        <StyledItem>
          <StyledLabel>Bridge from</StyledLabel>
          <StyledValue>Ethereum</StyledValue>
        </StyledItem>
        <StyledItem>
          <StyledLabel>Bridge to</StyledLabel>
          <StyledValue>{toChain?.chainName}</StyledValue>
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
            <StyledValue>ETH</StyledValue>
          </StyledInputWrapper>
        </StyledItem>
        <StyledItem>
          <StyledLabel>Your balance</StyledLabel>
          <StyledValue>
            <span className="balance" onClick={() => setAmount(balance)}>{balanceLoading ? <Loading /> : balanceFormated(balance, 4)}</span> ETH
          </StyledValue>
        </StyledItem>
      </StyledPanel>
      <StyledItem>
        <StyledValue>
          <span className="label">Est. Output:</span> {toAmount ? toAmount : '~'}
        </StyledValue>
        <StyledValue>
          <span className="label">Gas Fees:</span> ${gasCostUSD}
        </StyledValue>
      </StyledItem>
      <StyledButton onClick={handleBridge}>{ isloading ?  <Loading /> : btnText }</StyledButton>
    </StyledContent>
  );
};

export default memo(BridgePanel);

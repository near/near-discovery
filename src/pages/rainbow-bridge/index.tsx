import { setEthProvider, setNearConnection, setSignerProvider } from '@near-eth/client';
import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect,useState } from 'react';

import MainWrapper from '@/components/sandbox/css/MainWrapper';
import { useEthersProviderContext } from '@/data/web3';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';
import { Erc20Abi,tokenList } from '@/pages/rainbow-bridge/components/config';
import {
  Button,
  Input,
  Separator,
  SwitchWrapper,
  TokenDark,
  TokenLight,
  Wrapper,
} from '@/pages/rainbow-bridge/components/rainbow-styled-components';
import { useAuthStore } from '@/stores/auth';
import { useVmStore } from '@/stores/vm';
import { flushEvents } from '@/utils/analytics';
import type { NextPageWithLayout } from '@/utils/types';

import { checkApprove, handleApprove } from './approve';
import { getBalance } from './balance';
import { ConnectButton } from './components/connect';
import { transfer } from './transfer';

const ethIcon = 'https://ipfs.near.social/ipfs/bafkreicxwo5knrruycnmm4m3ays5qidadxsgxcpgrz3ijikvpzql7l7pee';

const nearIcon = 'https://ipfs.near.social/ipfs/bafkreihnvs6cfknhtffsiloh5ea2qowajjcsndjh4by7bubbtyjia3yo6q';

const switchIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.0185 5.59976H0.981563C0.439 5.59976 4.29153e-05 5.20941 4.29153e-05 4.72692C4.29153e-05 4.24443 0.439 3.85408 0.981563 3.85408H10.6356L9.02696 2.4236C8.64254 2.08174 8.64254 1.52894 9.02696 1.1895C9.41139 0.84764 10.033 0.84764 10.4147 1.1895L13.6101 4.02865C13.8473 4.18867 14 4.44082 14 4.72692C14 5.20941 13.561 5.59976 13.0185 5.59976Z"
      fill="#787DA2"
    />
    <path
      d="M0.98152 9.33335H13.0184C13.561 9.33335 14 9.7237 14 10.2062C14 10.6887 13.561 11.079 13.0184 11.079H3.36443L4.97304 12.5095C5.35746 12.8514 5.35746 13.4042 4.97304 13.7436C4.58861 14.0855 3.96698 14.0855 3.58528 13.7436L0.389882 10.9045C0.152681 10.7444 0 10.4923 0 10.2062C0 9.7237 0.438958 9.33335 0.98152 9.33335Z"
      fill="#787DA2"
    />
  </svg>
);

const completeIconRight = (
  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 5.5H13M13 5.5L8.53125 1M13 5.5L8.53125 10" stroke="#979ABE" />
  </svg>
);

const TokenItem = (props: any) => {
  const {
    token,
    sender,
    onSelectToken,
    onlyShowHasBalance,
    sourceBridge,
    bothConnected,
    selectToken,
    accountId,
    wallet,
  } = props;

  const [nearBalance, setNearBalance] = useState<string>('');

  const { near } = useVmStore();

  const [ethBalance, setEthBalance] = useState<string>('');

  const [loadDone, setLoadDone] = useState<boolean>(false);

  const chainBalance = sourceBridge === 'near' ? nearBalance : ethBalance;

  const showToken = !onlyShowHasBalance || (!!loadDone && Big(chainBalance || 0).gt(0));

  const StyledToken = !bothConnected || Big(chainBalance || 0).eq(0) ? TokenDark : TokenLight;

  const tokenString = token.ethereum_address + '-' + token.near_address;

  useEffect(() => {
    getBalance(near, accountId, token, sender, wallet).then(({ nearbalance, ethBalance }) => {
      setNearBalance(nearbalance);
      setEthBalance(ethBalance);

      setLoadDone(true);
    });
  }, [tokenString, sender, near]);

  if (!showToken) return <div></div>;

  return (
    <StyledToken
      onClick={() => {
        if (!bothConnected || Big(chainBalance || 0).eq(0)) {
          return;
        }
        onSelectToken({
          token,
          nearBalance: nearBalance,
          ethBalance: ethBalance,
        });
      }}
      style={{
        background:
          !(!bothConnected || Number(chainBalance) === 0) && selectToken.symbol === token.symbol ? '#1e202f' : '',
        border:
          !(!bothConnected || Number(chainBalance) === 0) && selectToken.symbol === token.symbol
            ? '1px solid #00ffa3'
            : '',
      }}
    >
      <img className="token-icon" src={token.icon} />

      <span>{token.symbol}</span>
    </StyledToken>
  );
};

const RainbowBridge: NextPageWithLayout = () => {
  const ethersProviderContext = useEthersProviderContext();

  const accountId = useAuthStore((store) => store.accountId);

  const { provider, useConnectWallet } = ethersProviderContext;

  const [tab, setTab] = useState('new-transfer');

  const { near } = useVmStore();
  console.log('near1111: ', near);

  useEffect(() => {
    if (near && near.nearConnection) {
      setNearConnection(near.nearConnection);
    }

    if (provider) {
      const etherProvider = new ethers.providers.InfuraProvider(1);
      const signerProvider = new ethers.providers.Web3Provider(provider, 'any');
      setEthProvider(etherProvider);
      setSignerProvider(signerProvider);
    }
  }, [near, provider]);

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const signedIn = useAuthStore((store) => store.signedIn);
  const logOut = useAuthStore((store) => store.logOut);

  const { requestAuthentication } = useSignInRedirect();
  const [onlyShowHasBalance, setOnlyShowHasBalance] = useState<boolean>(true);

  const [amount, setAmount] = useState<string>('');

  const [from, setFrom] = useState<string>('near');

  const [nearBalance, setNearBalance] = useState<string>('');
  const [ethBalance, setEthBalance] = useState<string>('');

  const sender = wallet?.accounts?.[0]?.address || '';

  const defaultToken = tokenList[0];

  const [selectToken, setSelectToken] = useState(defaultToken);

  const [isApproved, setIsApproved] = useState<boolean>(true);

  const tokenString = selectToken.ethereum_address + '-' + selectToken.near_address;

  const bothConnected = accountId && !!sender;

  function handleSignIn() {
    flushEvents();
    requestAuthentication();
  }

  const formatBalance = (balance: string) => {
    if (!balance) return '-';
    if (Number(balance) === 0) return '0';
    if (Number(balance) < 0.0001) return '<0.0001';

    return new Big(balance).toFixed(4);
  };

  const ethereumBox = (
    <div className="choose-bridge-box">
      <div className="choose-bridge-box-select">
        <div className="choose-bridge-box-select-name">
          <img className="choose-bridge-box-icon" src={ethIcon} />

          <span>Ethereum</span>
        </div>

        <ConnectButton
          isConnected={!!wallet}
          onConnect={() => connect()}
          onDisConnect={() => (wallet ? disconnect(wallet) : null)}
        />
      </div>
    </div>
  );

  const nearBox = (
    <div className="choose-bridge-box">
      <div className="choose-bridge-box-select">
        <div className="choose-bridge-box-select-name">
          <img className="choose-bridge-box-icon" src={nearIcon} />

          <span>NEAR</span>
        </div>

        <ConnectButton isConnected={signedIn} onConnect={handleSignIn} onDisConnect={logOut} />
      </div>
    </div>
  );

  const inputOnChange = (e: any) => {
    const targetValue = e.target.value;
    if (targetValue !== '' && !targetValue.match(/^\d*(\.\d*)?$/)) {
      return;
    }

    const amount: string = targetValue.replace(/^0+/, '0'); // remove prefix 0

    setAmount(amount);
  };

  useEffect(() => {
    if (!wallet || !!nearBalance || !!ethBalance) return;

    getBalance(near, accountId, selectToken, sender, wallet).then(({ nearbalance, ethBalance }) => {
      setNearBalance(nearbalance);
      setEthBalance(ethBalance);
    });
  }, [tokenString, sender, near, nearBalance, ethBalance]);

  useEffect(() => {
    if (!provider) return;
    checkApprove(selectToken, amount, from, provider, sender, () => null).then((value) => {
      setIsApproved(value);
    });
  }, [amount, selectToken, from, provider]);

  const showTokensLine = (
    <div className="show-tokens-line">
      {onlyShowHasBalance ? 'Showing tokens with balances' : 'Showing all tokens'}

      <span
        className="show-tokens-line-expand"
        onClick={() => {
          setOnlyShowHasBalance((b) => !b);
        }}
      >
        {onlyShowHasBalance ? 'Show all tokens' : 'Hide tokens without balances'}
      </span>
    </div>
  );

  const chainBalance = from === 'near' ? nearBalance : ethBalance;

  const insufficientBalance =
    chainBalance !== '' && Big(chainBalance || 0).lt(amount || 0) && !!sender && Big(amount || 0).gt(0);

  const canBridge =
    !!sender && Big(chainBalance || 0).gte(amount || 0) && Big(amount || 0).gt(0) && !insufficientBalance;

  const buttonText = insufficientBalance ? 'Insufficient Balance' : !isApproved ? 'Approve' : 'Transfer';

  const onButtonClick = () => {
    if (insufficientBalance) {
      return;
    }

    if (!isApproved && provider) {
      return handleApprove(amount, selectToken, provider);
    }
    if (canBridge) {
      return transfer({
        token: selectToken,
        amount,
        sender,
        sourceBridge: from,
        accountId,
      });
    }
  };

  return (
    <MainWrapper>
      <Wrapper>
        <div className="new-transfer-title">
          <div className="transfer-left">New Transfer</div>

          <div
            className="transfer-right"
            onClick={() => {
              setTab('completed-transfers');
            }}
          >
            <span>Completed Transfers</span>

            {completeIconRight}
          </div>
        </div>

        <div className="choose-bridge-wrapper ">
          <div>
            <div className="bridge-title">From</div>

            {from === 'eth' ? ethereumBox : nearBox}
          </div>

          <SwitchWrapper
            onClick={() => {
              setFrom(from === 'near' ? 'eth' : 'near');
            }}
          >
            {switchIcon}
          </SwitchWrapper>

          <div>
            <div className="bridge-title">To</div>

            {from === 'near' ? ethereumBox : nearBox}
          </div>
        </div>

        <div className="choose-token-wrapper">
          <div className="bridge-title">Choose token</div>

          {bothConnected && showTokensLine}

          <div className="token-list-wrapper">
            {tokenList.map((token) => {
              const props = {
                token,
                sender,
                onlyShowHasBalance,
                onSelectToken: ({ token, nearBalance, ethBalance }: any) => {
                  setSelectToken(token);
                  setNearBalance(nearBalance);
                  setEthBalance(ethBalance);
                },
                sourceBridge: from,
                bothConnected,
                selectToken,
                accountId,
                wallet,
              };
              return <TokenItem {...props} key={`${token.ethereum_address}-${token.near_address}`} />;
            })}
          </div>

          <div
            className="bridge-title"
            style={{
              paddingTop: '24px',
            }}
          >
            Enter Amount
          </div>

          <div className="input-wrapper">
            <Input value={amount} onChange={inputOnChange} placeholder="0.0" />

            <div className="select-token">
              <img className="select-token-icon" src={selectToken.icon} />

              <span>{selectToken.symbol}</span>
            </div>
          </div>

          <Separator />

          {bothConnected && (
            <div className="price-and-balance-filed">
              <div className="price-filed">≈$</div>

              <div>
                Balance:{' '}
                <span
                  className="balance-value"
                  style={{
                    textDecoration: new Big(from === 'near' ? nearBalance || 0 : ethBalance || 0).eq(0)
                      ? 'none'
                      : 'underline',
                  }}
                  onClick={() => {
                    if (new Big(from === 'near' ? nearBalance || 0 : ethBalance || 0).eq(0)) {
                      return;
                    } else {
                      setAmount(chainBalance);
                    }
                  }}
                >
                  {from === 'near' ? formatBalance(nearBalance) : formatBalance(ethBalance)}
                </span>
              </div>
            </div>
          )}

          <Button
            style={{
              background: insufficientBalance ? '#FF61D3' : '#00ffe0',
              cursor: !canBridge ? 'not-allowed' : 'pointer',
              opacity: !canBridge ? 0.5 : 1,
            }}
            aria-disabled={!canBridge}
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </div>
      </Wrapper>
    </MainWrapper>
  );
};

RainbowBridge.getLayout = useDefaultLayout;

export default RainbowBridge;

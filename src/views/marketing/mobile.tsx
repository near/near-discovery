import { useConnectWallet } from '@web3-onboard/react';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { checkAddressIsInvited, getAccessToken, getBnsUserName, insertedAccessKey } from '@/apis';
import Loading from '@/components/Icons/Loading';
import { QUEST_PATH } from '@/config/quest';
import useCopy from '@/hooks/useCopy';
import { AUTH_TOKENS, get, getWithoutActive, post } from '@/utils/http';

import { Modal } from './components';
import * as Styles from './styles';

interface IProps {
  from: 'bg' | 'bgUser';
  inviteCode?: string;
  platform: 'bitget' | 'coin68';
}

const LandingMobile: FC<IProps> = ({ from, inviteCode, platform }) => {
  console.log('from:', from, 'inviteCode:', inviteCode);
  const { copy } = useCopy();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'fail'>('success');

  const [userStatus, setUserStatus] = useState<'uncheck' | 'new' | 'old'>('uncheck');

  const [advancedQuests, setAdvancedQuests] = useState<any>([]);
  const [basicQuests, setBasicQuests] = useState<any>([]);

  const [reward, setReward] = useState(0);

  const [fresh, setFresh] = useState(0);

  const [freshAnimate, setFreshAnimate] = useState<any>({});
  const [claimLoading, setClaimLoading] = useState(false);

  const logout = () => {
    window.localStorage.setItem(AUTH_TOKENS, '{}');
    insertedAccessKey('');
    deleteCookie('LOGIN_ACCOUNT');
    deleteCookie('AUTHED_ACCOUNT');
    deleteCookie('BNS_NAME');
  };
  const connectWallet = () => {
    connect();
  };
  const disConnect = async () => {
    wallet && (await disconnect(wallet));
    logout();
  };
  const goHome = () => {
    router.push('/');
  };

  useEffect(() => {
    if (wallet) {
      setAddress((wallet as any)['accounts'][0].address);
    }
  }, [wallet]);

  async function checkAccount() {
    const res = await get(`${QUEST_PATH}/api/activity/check_account?category=${platform}`);
    if ((res.code as number) !== 0) return;
    const status = res.data.is_activity ? 'new' : 'old';
    setUserStatus(status);
  }

  async function checkAddressWithActive() {
    const res: any = await getWithoutActive(`${QUEST_PATH}/api/invite/check-address/${address}`, platform);

    if ((res.code as number) !== 0) return;

    if (res.data.is_activated) {
      fetchAccessToken();
    }
  }

  async function checkAddress() {
    const res: any = await get(`${QUEST_PATH}/api/invite/check-address/${address}`);

    if ((res.code as number) !== 0) return;

    if (res.data.is_activated) {
      fetchAccessToken();
    } else {
      activeWithCode();
    }
  }

  async function activeWithCode() {
    const res: any = await post(`${QUEST_PATH}/api/invite/activate`, { address, code: inviteCode });

    if (res.data.is_success) {
      fetchAccessToken();
    }
  }
  async function fetchAccessToken() {
    await getAccessToken(address);
    setCookie('AUTHED_ACCOUNT', address);
    checkAccount();
  }

  async function fetchQuestList() {
    const res = await get(`${QUEST_PATH}/api/activity/quest_list?category=${platform}`);
    setFreshAnimate({});
    if ((res.code as number) !== 0) return;
    const { advanced_quests, basic_quests } = res.data;
    setAdvancedQuests(advanced_quests);
    setBasicQuests(basic_quests);
  }

  async function claimReward(id: number) {
    const res = await post(`${QUEST_PATH}/api/activity/claim`, { quest_id: id });
    console.log(666, res);

    if ((res.code as number) !== 0) return false;
    return true;
  }

  const handleFresh = () => {
    setFreshAnimate({ rotate: 360 });
    setFresh((n) => n + 1);
  };

  const handleClaim = async (data: any) => {
    if (data.status !== 'completed') return;
    if (data.is_claimed) return;
    if (claimLoading) return;
    setClaimLoading(true);
    try {
      const isSuc = await claimReward(data.id);
      setClaimLoading(false);
      if (isSuc) {
        setIsShowModal(true);
        setModalType('success');
        setReward(data.reward);

        handleFresh();
      }
    } catch (error) {
      setClaimLoading(false);
    }
  };

  const renderIcon = () => {
    if (Array.isArray(basicQuests) && basicQuests.length && basicQuests[0].is_claimed) {
      return <Styles.Fresh src="/images/marketing/done.svg" />;
    } else {
      return (
        <Styles.Fresh
          src="/images/marketing/fresh.svg"
          onClick={handleFresh}
          animate={freshAnimate}
          transition={freshAnimate?.rotate ? { ease: 'linear', duration: 0.8, repeat: Infinity } : {}}
        />
      );
    }
  };

  useEffect(() => {
    if (userStatus === 'uncheck') return;
    if (userStatus === 'new') {
      fetchQuestList();
    }
    if (userStatus === 'old') {
      setIsShowModal(true);
      setModalType('fail');
    }
  }, [userStatus, fresh]);

  useEffect(() => {
    if (address) {
      if (from === 'bg') {
        checkAddressWithActive();
      }
      if (from === 'bgUser') {
        checkAddress();
      }
    }
  }, [address]);

  const prefix = location.origin;

  return (
    <Styles.Container>
      <Styles.Banner className={`${platform === 'bitget' ? 'bitget' : 'coin68'}`}>
        <Styles.Logo>
          <Styles.Img src="/images/marketing/dap-logo.svg" />
          <Styles.Img src="/images/marketing/X.svg" />

          {platform === 'bitget' ? (
            <Styles.Img src="/images/marketing/bg-logo.svg" />
          ) : (
            <Styles.Img src="/images/marketing/coin68-logo.svg" />
          )}
        </Styles.Logo>
        <Styles.Intro>Ready to Claim Your Exclusive Rewards?</Styles.Intro>
        <Styles.Intro>Just complete a few simple quests!</Styles.Intro>
      </Styles.Banner>
      <Styles.Box>
        <Styles.CapWrap>
          <Styles.Cap src="/images/marketing/cap.svg"></Styles.Cap>
        </Styles.CapWrap>
        <Styles.Title>Join Now to Win DapDap PTS</Styles.Title>
        <Styles.Step>Step 1{renderIcon()}</Styles.Step>

        {wallet ? (
          <Styles.Button onClick={disConnect}>Disconnect</Styles.Button>
        ) : (
          <Styles.Button onClick={connectWallet}>Connect wallet</Styles.Button>
        )}
        {basicQuests?.length ? (
          basicQuests.map((item: any) => (
            <div key={item.id}>
              <Styles.Step>Step 2</Styles.Step>
              <Styles.Button className={item.status !== 'completed' ? 'blur' : ''} onClick={(e) => handleClaim(item)}>
                {claimLoading ? (
                  <Loading size={16} />
                ) : item.is_claimed ? (
                  'Reward Already Claimed'
                ) : (
                  <>
                    Claim your<Styles.Coin src="/images/marketing/coin.svg"></Styles.Coin> {item.reward} PTS
                  </>
                )}
              </Styles.Button>
            </div>
          ))
        ) : (
          <>
            <Styles.Step>Step 2</Styles.Step>
            <Styles.Button className={'blur'}>
              Claim your<Styles.Coin src="/images/marketing/coin.svg"></Styles.Coin> 200 PTS
            </Styles.Button>
          </>
        )}

        <Styles.Step>Step 3</Styles.Step>
        <Styles.Tips className={basicQuests[0]?.status !== 'completed' ? 'blur' : 'gradient'}>
          Want more rewards? <br />
          use computer to visit our website
          <Styles.CopyWrap
            onClick={() => {
              copy(`${prefix}`);
            }}
          >
            <Styles.CopyIcon src="/images/marketing/copy.svg" />
          </Styles.CopyWrap>
        </Styles.Tips>
      </Styles.Box>
      <Styles.Foot>
        <Styles.FootTxt onClick={goHome}>
          Ready to Ignite the Spark?
          <Styles.Star src="/images/marketing/star.png"></Styles.Star>
        </Styles.FootTxt>
      </Styles.Foot>
      <Modal type={modalType} open={isShowModal} onClose={() => setIsShowModal(false)} reward={reward}></Modal>
    </Styles.Container>
  );
};

export default memo(LandingMobile);

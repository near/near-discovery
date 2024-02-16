import { useConnectWallet } from '@web3-onboard/react';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { checkAddressIsInvited, getAccessToken, getBnsUserName, insertedAccessKey } from '@/apis';
import { QUEST_PATH } from '@/config/quest';
import useCopy from '@/hooks/useCopy';
import { ellipsAccount } from '@/utils/account';
import { AUTH_TOKENS, get, getWithoutActive, post } from '@/utils/http';
import useAuthBind from '@/views/QuestProfile/hooks/useAuthBind';
import useAuthConfig from '@/views/QuestProfile/hooks/useAuthConfig';

import { ModalPC, Tabs } from './components';
import useUserInfo from './hooks/useUserInfo';
import * as Styles from './invite-pc-styles';
interface IProps {
  // inviteCode?: string;
  kolName: string;
  platform: 'kol';
}

const questImgs = {
  discord_role: '/images/marketing/join.svg',
  twitter_retweet: '/images/marketing/retweet.svg',
  twitter_follow: '/images/marketing/follow.svg',
  twitter_like: '/images/marketing/like.svg',
};

const LandingPC: FC<IProps> = ({ kolName, platform }) => {
  console.log('kolName:', kolName);

  const { copy } = useCopy();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const router = useRouter();

  const [address, setAddress] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'fail'>('success');
  const config = useAuthConfig();

  // 老用户 全部模糊
  const [isBlur, setIsBlur] = useState(false);

  const [userStatus, setUserStatus] = useState<'uncheck' | 'new' | 'old'>('uncheck');

  const [advancedQuests, setAdvancedQuests] = useState<any[]>([]);
  const [basicQuests, setBasicQuests] = useState<any>([]);

  const [reward, setReward] = useState(0);
  const [rank, setRank] = useState(0);

  const [fresh, setFresh] = useState(0);
  const [updater, setUpdater] = useState(0);
  const [id, setId] = useState<string>();
  const { loading: userLoading, info: userInfo = {} } = useUserInfo({ id, updater });

  const [claimLoading, setClaimLoading] = useState(false);

  const [inviteNum, setInviteNum] = useState(0);
  const [inviteReward, setInviteReward] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
  const [codeList, setCodeList] = useState([]);

  const [spin1, setSpin1] = useState(false);
  const [spin2, setSpin2] = useState([false, false, false, false]);

  const [kolAvatar, setKolAvatar] = useState('');
  const [kolAddr, setKolAddr] = useState('');
  const {
    loading: binding,
    type,
    handleBind,
  } = useAuthBind({
    onSuccess: () => {
      // onSuccess(1);
      setUpdater(Date.now());
    },
    redirect_uri: `${window.location.origin}${window.location.pathname}`,
  });
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

  // header的activity: kol 参数加个name: kol的name  platform=kol
  async function checkAddressWithActive() {
    const res: any = await getWithoutActive(`${QUEST_PATH}/api/invite/check-address/${address}`, platform, {
      name: kolName,
    });

    if ((res.code as number) !== 0) return;

    if (res.data.is_activated) {
      fetchAccessToken();
    }
  }

  async function getKolInfo() {
    const res: any = await get(`${QUEST_PATH}/api/activity/kol`, { name: kolName });

    if ((res.code as number) !== 0) return;
    const { address, avatar } = res.data;
    setKolAddr(address);
    setKolAvatar(avatar);
  }

  // async function checkAddress() {
  //   const res: any = await get(`${QUEST_PATH}/api/invite/check-address/${address}`);

  //   if ((res.code as number) !== 0) return;

  //   if (res.data.is_activated) {
  //     fetchAccessToken();
  //   } else {
  //     activeWithCode();
  //   }
  // }

  // async function activeWithCode() {
  //   const res: any = await post(`${QUEST_PATH}/api/invite/activate`, { address, code: inviteCode });

  //   if (res.data.is_success) {
  //     fetchAccessToken();
  //   }
  // }

  async function fetchAccessToken() {
    await getAccessToken(address);
    setCookie('AUTHED_ACCOUNT', address);
    checkAccount();
  }

  async function fetchQuestList() {
    const res = await get(`${QUEST_PATH}/api/activity/quest_list?category=${platform}`);

    setSpin1(false);
    setSpin2([false, false, false, false]);
    if ((res.code as number) !== 0) return;

    const { advanced_quests, basic_quests } = res.data;
    setAdvancedQuests(advanced_quests);
    setBasicQuests(basic_quests);
  }

  async function fetchInviteList() {
    const res = await get(`${QUEST_PATH}/api/invite/list`);

    if ((res.code as number) !== 0) return;
    return res.data;
  }

  async function fetchInviteCodes() {
    //  获取邀请码
    const res = await get(`${QUEST_PATH}/api/invite/get-address-code/${address}`);

    if ((res.code as number) !== 0) return;
    return res.data.filter((item: any) => !item.is_used);
  }

  async function fetchTotalRewards() {
    // 总积分
    const res = await get(`${QUEST_PATH}/api/activity/reward?category=${platform}`);
    if ((res.code as number) !== 0) return;
    setSpin1(false);
    setSpin2([false, false, false, false]);
    setTotalReward(res.data?.reward || 0);
    setRank(res.data?.rank || 0);
  }

  async function checkQuest(id: number) {
    const res = await get(`${QUEST_PATH}/api/activity/check_quest?quest_id=${id}`);
    console.log(11111, res);

    // if ((res.code as number) !== 0) return;
  }

  const getInviteCodes = async () => {
    const list = await fetchInviteCodes();
    setCodeList(list);
  };
  const getInviteList = async () => {
    const inviteData = await fetchInviteList();

    setInviteNum(inviteData?.data?.length);
    setInviteReward(inviteData?.invite_reward);
  };

  async function claimReward(id: number) {
    const res = await post(`${QUEST_PATH}/api/activity/claim`, { quest_id: id });
    console.log(666, res);

    if ((res.code as number) !== 0) return false;
    return true;
  }

  const handleFresh = () => {
    setFresh((n) => n + 1);
    setUpdater(Date.now());
  };

  const handleClaim = async (data: any) => {
    if (!address) return;
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

  // userStatus === 'new' 可以做任务 old|uncheck不可以
  useEffect(() => {
    fetchQuestList();
    if (userStatus === 'uncheck') return;
    if (userStatus === 'new') {
      getInviteCodes();
    }
    if (userStatus === 'old') {
      setIsShowModal(true);
      setModalType('fail');
    }
  }, [userStatus, fresh]);

  useEffect(() => {
    if (kolName) {
      getKolInfo();
    }
  }, [kolName]);

  useEffect(() => {
    if (userStatus === 'new') {
      setIsBlur(false);
    }
    if (userStatus === 'old' || userStatus === 'uncheck' || !address) {
      setIsBlur(true);
    }
  }, [userStatus, address]);

  useEffect(() => {
    if (address) {
      setUpdater(Date.now());
      checkAddressWithActive();
      // if (from === 'bg') {
      //   checkAddressWithActive();
      // }
      // if (from === 'bgUser') {
      //   checkAddress();
      // }
    }
  }, [address]);

  useEffect(() => {
    if (isBlur) return;
    fetchTotalRewards();
    getInviteList();
  }, [updater, isBlur]);

  const renderButton = () => {
    if (address) {
      return basicQuests.map((item: any) => {
        if (userStatus === 'old')
          return (
            <Styles.Button className="blur" id={item.id}>
              Reward Already Claimed
            </Styles.Button>
          );
        return item.is_claimed ? (
          <Styles.Button id={item.id}>Reward Already Claimed</Styles.Button>
        ) : (
          <>
            <Styles.Button id={item.id} onClick={(e) => handleClaim(item)}>
              Claim your<Styles.Coin src="/images/marketing/coin.svg"></Styles.Coin> {item.reward} PTS
            </Styles.Button>

            <Styles.Fresh
              className={spin1 ? 'spin' : ''}
              src="/images/marketing/fresh.svg"
              onClick={() => {
                setSpin1(true);
                handleFresh();
              }}
            />
          </>
        );
      });
    } else {
      return (
        <Styles.Button onClick={connectWallet}>
          Connect wallet & Claim <Styles.Coin src="/images/marketing/coin.svg"></Styles.Coin> 200 PTS
        </Styles.Button>
      );
    }
  };

  const openSource = (action: any) => {
    if (isBlur) return;
    if (action.category === 'twitter_follow' && userInfo.twitter?.is_bind) {
      sessionStorage.setItem('_clicked_twitter_' + action.id, '1');
    }
    if (action.category.startsWith('twitter') && !userInfo.twitter?.is_bind) {
      const path = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${config.twitter_client_id}&redirect_uri=${window.location.href}&scope=tweet.read%20users.read%20follows.read%20like.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
      sessionStorage.setItem('_auth_type', 'twitter');
      window.open(path, '_blank');
      return;
    }

    if (action.category.startsWith('discord') && !userInfo.discord?.is_bind) {
      const path = `https://discord.com/oauth2/authorize?client_id=${config.discord_client_id}&response_type=code&redirect_uri=${window.location.href}&scope=identify`;
      sessionStorage.setItem('_auth_type', 'discord');
      window.open(path, '_blank');
      return;
    }

    // if (action.category.startsWith('telegram') && !userInfo.telegram?.is_bind) {
    //   if (window.Telegram) {
    //     window.Telegram.Login.auth({ bot_id: config.telegram_bot_id, request_access: true }, (data: any) => {
    //       if (data) {
    //         handleBind('telegram', { ...data, id: data.id.toString() });
    //       }
    //     });
    //   }
    //   return;
    // }
    window.open(action.source, '_blank', 'width=850,height=550');
  };

  const prefix = location.origin;

  return (
    <Styles.Container>
      <Styles.Banner>
        <Styles.Inviter>
          {kolAvatar ? <Styles.InviterAvatar src={kolAvatar} /> : null}

          <Styles.InviterContent>
            <Styles.InviterTitle>Inviter</Styles.InviterTitle>
            <Styles.InviterAddr>{ellipsAccount(kolAddr)}</Styles.InviterAddr>
          </Styles.InviterContent>
        </Styles.Inviter>
        <Styles.Intro>Join DapDap to earn points and more rewards</Styles.Intro>
        <Styles.BtnWrap>{renderButton()}</Styles.BtnWrap>
        {/* <Styles.AllRewards className={`${platform === 'bitget' ? 'bitget' : 'coin68'}`}>
          <Styles.AllRewardsLeft>
            <Styles.AllRewardsTitle>Your PTS</Styles.AllRewardsTitle>
            <Styles.AllRewardsPoints>
              <Styles.AllRewardsCoin src="/images/marketing/coin.svg" />
              {totalReward}
            </Styles.AllRewardsPoints>
          </Styles.AllRewardsLeft>
          <Styles.AllRewardsIcon src="/images/marketing/coin.svg" />
        </Styles.AllRewards> */}
      </Styles.Banner>

      {/* <Styles.TabsBox>
        <Tabs
          current={tab}
          onChange={(_tab) => {
            setTab(_tab);
          }}
        />
      </Styles.TabsBox> */}

      <Styles.Box>
        {/* <Styles.Quote>Complete the following quests to earn points</Styles.Quote> */}

        <Styles.Title>
          Exclusive Quests
          <Styles.SubTitle>
            <Styles.Coin src="/images/marketing/coin.svg"></Styles.Coin> +{' '}
            {advancedQuests?.filter((item) => item.is_claimed).length * 100} PTS
          </Styles.SubTitle>
        </Styles.Title>
        <Styles.CardBox className={isBlur ? 'blur' : ''}>
          {advancedQuests?.length
            ? advancedQuests.map((item, index) => (
                <Styles.Card key={item.id}>
                  <Styles.CardLeft onClick={(e) => openSource(item)}>
                    <Styles.CardIcon src={(questImgs as any)[item.category]} />
                    <div>
                      <Styles.CardTitle>{item.name}</Styles.CardTitle>
                      <Styles.Tag>
                        <Styles.Coin src="/images/marketing/coin.svg"></Styles.Coin>+{item.reward} PTS
                      </Styles.Tag>
                    </div>
                  </Styles.CardLeft>
                  <Styles.CardRight>
                    {item.status === 'completed' ? (
                      <Styles.CardDone src="/images/marketing/done.svg" />
                    ) : (
                      <Styles.Fresh
                        className={spin2[index] ? 'spin' : ''}
                        src="/images/marketing/fresh.svg"
                        onClick={async (e) => {
                          if (isBlur) return;
                          setSpin2((prev) => {
                            const temp = [...prev];
                            temp[index] = !temp[index];
                            return temp;
                          });
                          await checkQuest(item.id);
                          handleFresh();
                          e.stopPropagation();
                        }}
                      />
                    )}
                    {!item.is_claimed ? (
                      <Styles.CardBtn disabled={item.status !== 'completed'} onClick={(e) => handleClaim(item)}>
                        Claim
                      </Styles.CardBtn>
                    ) : null}
                  </Styles.CardRight>
                </Styles.Card>
              ))
            : null}
        </Styles.CardBox>
        <Styles.Title>Invite</Styles.Title>
        <Styles.InviteBox className={userStatus === 'new' ? '' : 'blur'}>
          <Styles.InviteHead>
            <div>
              <Styles.Text>Share your invitation link to more people and earn points</Styles.Text>
            </div>
          </Styles.InviteHead>
          <Styles.InviteBody>
            {codeList?.length
              ? codeList.map((item: any, index) => (
                  <Styles.List key={index}>
                    <Styles.ListOrder>{index + 1}.</Styles.ListOrder>
                    {`${prefix}/${platform}/${item?.code}`}
                    <Styles.CopyIcon
                      src="/images/marketing/copy.svg"
                      onClick={() => {
                        copy(`${prefix}/${platform}/${item?.code}`);
                      }}
                    ></Styles.CopyIcon>
                  </Styles.List>
                ))
              : null}
          </Styles.InviteBody>
        </Styles.InviteBox>
      </Styles.Box>

      <Styles.Foot>
        <Styles.FootTxt>Ready to Ignite the Spark?</Styles.FootTxt>
        <Styles.Star src="/images/marketing/star.png"></Styles.Star>
      </Styles.Foot>
      <Styles.Link onClick={goHome}>For more quests and more rewards, visit DapDap</Styles.Link>
      <ModalPC type={modalType} open={isShowModal} onClose={() => setIsShowModal(false)} reward={reward}></ModalPC>
    </Styles.Container>
  );
};

export default memo(LandingPC);

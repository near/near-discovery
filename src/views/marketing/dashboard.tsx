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
import * as Styles from './dashboard-styles';
import useUserInfo from './hooks/useUserInfo';
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

const Dashboard: FC<IProps> = ({ kolName, platform }) => {
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
  // const connectWallet = () => {
  //   connect();
  // };
  // const disConnect = async () => {
  //   wallet && (await disconnect(wallet));
  //   logout();
  // };
  // const goHome = () => {
  //   router.push('/');
  // };

  // useEffect(() => {
  //   if (wallet) {
  //     setAddress((wallet as any)['accounts'][0].address);
  //   }
  // }, [wallet]);

  // async function checkAccount() {
  //   const res = await get(`${QUEST_PATH}/api/activity/check_account?category=${platform}`);
  //   if ((res.code as number) !== 0) return;
  //   const status = res.data.is_activity ? 'new' : 'old';
  //   setUserStatus(status);
  // }

  // header的activity: kol 参数加个name: kol的name  platform=kol
  // async function checkAddressWithActive() {
  //   const res: any = await getWithoutActive(`${QUEST_PATH}/api/invite/check-address/${address}`, platform, {
  //     name: kolName,
  //   });

  //   if ((res.code as number) !== 0) return;

  //   if (res.data.is_activated) {
  //     fetchAccessToken();
  //   }
  // }

  // async function getKolInfo() {
  //   const res: any = await get(`${QUEST_PATH}/api/activity/kol`, { name: kolName });

  //   if ((res.code as number) !== 0) return;
  //   const { address, avatar } = res.data;
  //   setKolAddr(address);
  //   setKolAvatar(avatar);
  // }

  // async function fetchAccessToken() {
  //   await getAccessToken(address);
  //   setCookie('AUTHED_ACCOUNT', address);
  //   checkAccount();
  // }

  async function fetchQuestList() {
    const res = await get(`${QUEST_PATH}/api/activity/quest_list?category=${platform}`);

    setSpin1(false);
    setSpin2([false, false, false, false]);
    if ((res.code as number) !== 0) return;

    const { advanced_quests, basic_quests } = res.data;
    setAdvancedQuests(advanced_quests);
    setBasicQuests(basic_quests);
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

  // useEffect(() => {
  //   fetchQuestList();
  //   if (userStatus === 'uncheck') return;
  //   if (userStatus === 'new') {
  //     getInviteCodes();
  //   }
  //   if (userStatus === 'old') {
  //     setIsShowModal(true);
  //     setModalType('fail');
  //   }
  // }, [userStatus, fresh]);

  // useEffect(() => {
  //   if (kolName) {
  //     getKolInfo();
  //   }
  // }, [kolName]);

  // useEffect(() => {
  //   if (userStatus === 'new') {
  //     setIsBlur(false);
  //   }
  //   if (userStatus === 'old' || userStatus === 'uncheck' || !address) {
  //     setIsBlur(true);
  //   }
  // }, [userStatus, address]);

  // useEffect(() => {
  //   if (address) {
  //     // setUpdater(Date.now());
  //     // checkAddressWithActive();
  //     // if (from === 'bg') {
  //     //   checkAddressWithActive();
  //     // }
  //     // if (from === 'bgUser') {
  //     //   checkAddress();
  //     // }
  //   }
  // }, [address]);

  // useEffect(() => {
  //   if (isBlur) return;
  //   fetchTotalRewards();
  //   getInviteList();
  // }, [updater, isBlur]);

  // const openSource = (action: any) => {
  //   if (isBlur) return;
  //   if (action.category === 'twitter_follow' && userInfo.twitter?.is_bind) {
  //     sessionStorage.setItem('_clicked_twitter_' + action.id, '1');
  //   }
  //   if (action.category.startsWith('twitter') && !userInfo.twitter?.is_bind) {
  //     const path = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${config.twitter_client_id}&redirect_uri=${window.location.href}&scope=tweet.read%20users.read%20follows.read%20like.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
  //     sessionStorage.setItem('_auth_type', 'twitter');
  //     window.open(path, '_blank');
  //     return;
  //   }

  //   if (action.category.startsWith('discord') && !userInfo.discord?.is_bind) {
  //     const path = `https://discord.com/oauth2/authorize?client_id=${config.discord_client_id}&response_type=code&redirect_uri=${window.location.href}&scope=identify`;
  //     sessionStorage.setItem('_auth_type', 'discord');
  //     window.open(path, '_blank');
  //     return;
  //   }

  //   // if (action.category.startsWith('telegram') && !userInfo.telegram?.is_bind) {
  //   //   if (window.Telegram) {
  //   //     window.Telegram.Login.auth({ bot_id: config.telegram_bot_id, request_access: true }, (data: any) => {
  //   //       if (data) {
  //   //         handleBind('telegram', { ...data, id: data.id.toString() });
  //   //       }
  //   //     });
  //   //   }
  //   //   return;
  //   // }
  //   window.open(action.source, '_blank', 'width=850,height=550');
  // };

  // const prefix = location.origin;

  return (
    <Styles.Container>
      <Styles.Banner>
        <Styles.BannerContent>
          <Styles.Welcome>
            Welcome <Styles.KolName> @{kolName}</Styles.KolName>
            <Styles.Handclap src="/images/marketing/handclap.svg" />
          </Styles.Welcome>
          <Styles.BannerTitle>
            <Styles.KOL>KOL</Styles.KOL> Recommendation Program
          </Styles.BannerTitle>
          <Styles.Intro>Get 100 bonus points for every user you invite!</Styles.Intro>
          <Styles.StatWrap>
            <Styles.StatBox>
              <Styles.StatLeft>
                <Styles.StatIcon src="/images/marketing/follow.svg" />
                <Styles.StatDetail>
                  <Styles.DetailTitle>Invited people</Styles.DetailTitle>
                  <Styles.DetailCount>475</Styles.DetailCount>
                </Styles.StatDetail>
              </Styles.StatLeft>
              <Styles.StatLine />
              <Styles.StatRight>
                <Styles.StatIcon src="/images/marketing/coin.svg" />
                <Styles.StatDetail>
                  <Styles.DetailTitle>Your PTS</Styles.DetailTitle>
                  <Styles.DetailCount className="pts">200 PTS</Styles.DetailCount>
                </Styles.StatDetail>
              </Styles.StatRight>
            </Styles.StatBox>
            <Styles.FreshStat>
              <Styles.Fresh
                className={spin1 ? 'spin' : ''}
                src="/images/marketing/fresh.svg"
                onClick={() => {
                  setSpin1(true);
                  handleFresh();
                }}
              />
            </Styles.FreshStat>
          </Styles.StatWrap>
        </Styles.BannerContent>
      </Styles.Banner>

      <Styles.Box>
        <Styles.Title>Stage reward</Styles.Title>
        <Styles.Info>Upon reaching goals, unlock bonus points as a reward!</Styles.Info>

        {/* <Styles.CardBox className={isBlur ? 'blur' : ''}>
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
        </Styles.CardBox> */}

        <Styles.RewardList>
          <Styles.RewardQuest></Styles.RewardQuest>
          <Styles.RewardBox></Styles.RewardBox>
        </Styles.RewardList>

        <Styles.More>
          <Styles.MoreIcon src="/images/marketing/more.svg" />
          <Styles.MoreTxt>More content coming soon...</Styles.MoreTxt>
        </Styles.More>
      </Styles.Box>
      <ModalPC type={modalType} open={isShowModal} onClose={() => setIsShowModal(false)} reward={reward}></ModalPC>
    </Styles.Container>
  );
};

export default memo(Dashboard);

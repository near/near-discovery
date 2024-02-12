import { useConnectWallet } from '@web3-onboard/react';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { checkAddressIsInvited, getAccessToken, getBnsUserName, insertedAccessKey } from '@/apis';
import { QUEST_PATH } from '@/config/quest';
import useCopy from '@/hooks/useCopy';
import { AUTH_TOKENS, get, getWithoutActive, post } from '@/utils/http';

import { ModalPC, Tabs } from './components';
import Leaderboard from './components/Leaderboard';
import useLeaderboard from './hooks/useLeaderBoard';
import useUserInfo from './hooks/useUserInfo';
import * as Styles from './pc-styles';
interface IProps {
  from: 'bg' | 'bgUser';
  inviteCode?: string;
}

const questImgs = {
  discord_role: '/images/marketing/join.svg',
  twitter_retweet: '/images/marketing/retweet.svg',
  twitter_follow: '/images/marketing/follow.svg',
  twitter_like: '/images/marketing/like.svg',
};

const LandingPC: FC<IProps> = ({ from, inviteCode }) => {
  console.log('from:', from, 'inviteCode:', inviteCode);
  const { loading, list, page, info, maxPage, handlePageChange, handleRefresh } = useLeaderboard();
  const { copy } = useCopy();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const router = useRouter();
  const [tab, setTab] = useState<'Quests' | 'Leaderboard'>('Quests');
  const [address, setAddress] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'fail'>('success');

  const [userStatus, setUserStatus] = useState<'uncheck' | 'new' | 'old'>('uncheck');

  const [advancedQuests, setAdvancedQuests] = useState<any[]>([]);
  const [basicQuests, setBasicQuests] = useState<any>([]);

  const [reward, setReward] = useState(0);

  const [fresh, setFresh] = useState(0);
  const [updater, setUpdater] = useState(0);
  const [id, setId] = useState<string>();
  const { loading: userLoading, info: userInfo = {} } = useUserInfo({ id, from: tab, updater });

  const [claimLoading, setClaimLoading] = useState(false);

  const [expendAnimate, setExpendAnimate] = useState<any>({ height: 0 });

  const [inviteNum, setInviteNum] = useState(0);
  const [inviteReward, setInviteReward] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
  const [codeList, setCodeList] = useState([]);

  const [spin1, setSpin1] = useState(false);
  const [spin2, setSpin2] = useState([false, false, false, false]);
  const [spin3, setSpin3] = useState(false);

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
    const res = await get(`${QUEST_PATH}/api/activity/check_account?category=${'bitget'}`);
    if ((res.code as number) !== 0) return;
    const status = res.data.is_activity ? 'new' : 'old';
    setUserStatus(status);
  }

  async function checkAddressWithActive() {
    const res: any = await getWithoutActive(`${QUEST_PATH}/api/invite/check-address/${address}`, 'bitget');

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
    const res = await get(`${QUEST_PATH}/api/activity/quest_list?category=${'bitget'}`);

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
    const res = await get(`${QUEST_PATH}/api/invite/get-invited-info/${address}`);

    if ((res.code as number) !== 0) return;
    return res.data;
  }

  async function fetchTotalRewards() {
    // 总积分
    const res = await get(`${QUEST_PATH}/api/activity/reward?category=bitget`);
    if ((res.code as number) !== 0) return;
    setSpin1(false);
    setSpin2([false, false, false, false]);
    setTotalReward(res.data?.reward || 0);
  }

  const handleFreshInviteList = async () => {
    setSpin3(true);
    const inviteData = await fetchInviteList();
    setSpin3(false);
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

  useEffect(() => {
    if (userStatus === 'uncheck') return;
    if (userStatus === 'new') {
      fetchQuestList();
    }
    if (userStatus === 'old') {
      setIsShowModal(true);
      setModalType('fail');
      fetchQuestList(); // 老用户
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

  useEffect(() => {
    fetchTotalRewards();
  }, [updater]);

  const renderButton = () => {
    if (address) {
      return basicQuests.map((item: any) => {
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
          Connect wallet <Styles.Coin src="/images/marketing/coin.svg"></Styles.Coin> 200 PTS
        </Styles.Button>
      );
    }
  };

  const handleInvite = async () => {
    if (!expendAnimate.height) {
      const list = await fetchInviteCodes();
      setCodeList(list);
      setExpendAnimate({ height: 435, border: '1px solid #373a53' });
    } else {
      setExpendAnimate({ height: 0, border: 'none' });
    }
  };

  const openSource = (source: string) => {
    window.open(source, '_blank', 'width=850,height=550');
  };

  const prefix = location.origin;

  return (
    <Styles.Container>
      <Styles.Banner>
        <Styles.Logo>
          <Styles.DapImg src="/images/marketing/dap-logo.svg" />
          <Styles.XImg src="/images/marketing/X.svg" />
          <Styles.BgImg src="/images/marketing/bg-logo.svg" />
        </Styles.Logo>
        <Styles.Intro>Ready to Claim Your Exclusive Rewards?Just complete a few simple quests!</Styles.Intro>
        <Styles.AllRewards>
          <Styles.AllRewardsLeft>
            <Styles.AllRewardsTitle>Your PTS</Styles.AllRewardsTitle>
            <Styles.AllRewardsPoints>
              <Styles.AllRewardsCoin src="/images/marketing/coin.svg" />
              {totalReward}
            </Styles.AllRewardsPoints>
          </Styles.AllRewardsLeft>
          <Styles.AllRewardsIcon src="/images/marketing/coin.svg" />
        </Styles.AllRewards>
      </Styles.Banner>

      <Styles.TabsBox>
        <Tabs
          current={tab}
          onChange={(_tab) => {
            setTab(_tab);
          }}
        />
      </Styles.TabsBox>
      {tab === 'Quests' && (
        <Styles.Box>
          <Styles.Quote>Complete the following quests to earn points</Styles.Quote>
          <Styles.Title>Basic</Styles.Title>
          <Styles.Sub>Complete wallet connections to unlock more quests.</Styles.Sub>
          <Styles.Step>{renderButton()}</Styles.Step>
          <Styles.Title>
            Advanced
            <Styles.SubTitle>
              <Styles.Coin src="/images/marketing/coin.svg"></Styles.Coin> +{' '}
              {advancedQuests?.filter((item) => item.is_claimed).length * 100} PTS
            </Styles.SubTitle>
          </Styles.Title>
          <Styles.CardBox>
            {advancedQuests?.length
              ? advancedQuests.map((item, index) => (
                  <Styles.Card key={item.id} onClick={(e) => openSource(item.source)}>
                    <Styles.CardLeft>
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
                          onClick={() => {
                            setSpin2((prev) => {
                              const temp = [...prev];
                              temp[index] = !temp[index];
                              return temp;
                            });
                            handleFresh();
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
          <Styles.Title>
            Invite
            <Styles.SubTitle>
              <Styles.Coin src="/images/marketing/friend.svg"></Styles.Coin> + {inviteNum} PPL
              <Styles.Coin src="/images/marketing/coin.svg"></Styles.Coin> + {inviteNum * inviteReward} PTS
              <Styles.Fresh
                className={spin3 ? 'spin' : ''}
                src="/images/marketing/fresh.svg"
                onClick={handleFreshInviteList}
              />
            </Styles.SubTitle>
          </Styles.Title>
          <Styles.InviteBox>
            <Styles.InviteHead>
              <div>
                <Styles.Text>Share your invitation link to more people and earn points</Styles.Text>
                <Styles.Tag>
                  <Styles.Coin src="/images/marketing/coin.svg"></Styles.Coin>
                  +100 PTS
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none">
                    <path d="M7.54599 1.3187L1.18203 7.68266M7.54599 7.68266L1.18203 1.3187" stroke="#EBF479" />
                  </svg>{' '}
                  1 PPL
                </Styles.Tag>
              </div>
              <Styles.InviteBtn onClick={handleInvite}>
                Invite
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                  <path
                    d="M9 1C9 0.447715 8.55228 0 8 0C7.44772 0 7 0.447715 7 1L9 1ZM7.29289 13.7071C7.68342 14.0976 8.31658 14.0976 8.70711 13.7071L15.0711 7.34315C15.4616 6.95262 15.4616 6.31946 15.0711 5.92893C14.6805 5.53841 14.0474 5.53841 13.6569 5.92893L8 11.5858L2.34315 5.92893C1.95262 5.53841 1.31946 5.53841 0.928932 5.92893C0.538408 6.31946 0.538408 6.95262 0.928932 7.34315L7.29289 13.7071ZM7 1L7 13H9V1L7 1Z"
                    fill="black"
                  />
                </svg>
              </Styles.InviteBtn>
            </Styles.InviteHead>
            <Styles.InviteBody animate={expendAnimate}>
              {codeList?.length
                ? codeList.map((item: any, index) => (
                    <Styles.List key={index}>
                      <Styles.ListOrder>{index + 1}.</Styles.ListOrder>
                      {`${prefix}/bitget/${item?.code}`}
                      <Styles.CopyIcon
                        src="/images/marketing/copy.svg"
                        onClick={() => {
                          copy(`${prefix}/bitget/${item?.code}`);
                        }}
                      ></Styles.CopyIcon>
                    </Styles.List>
                  ))
                : null}
            </Styles.InviteBody>
          </Styles.InviteBox>
        </Styles.Box>
      )}
      {tab === 'Leaderboard' && (
        <Leaderboard
          {...{
            loading,
            list,
            page,
            info,
            maxPage,
            handlePageChange,
            userLoading,
            userInfo,
            handleRefresh: () => {
              handleRefresh();
              setUpdater(Date.now());
            },
          }}
        />
      )}

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

import { useConnectWallet } from '@web3-onboard/react';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { checkAddressIsInvited, getAccessToken, getBnsUserName, insertedAccessKey } from '@/apis';
import { QUEST_PATH } from '@/config/quest';
import useAccount from '@/hooks/useAccount';
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
  const { copy } = useCopy();

  const router = useRouter();
  const { account } = useAccount();
  const [address, setAddress] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'fail'>('success');

  const [reward, setReward] = useState(0);

  const [fresh, setFresh] = useState(0);
  const [updater, setUpdater] = useState(0);
  const [id, setId] = useState<string>();
  const { loading: userLoading, info: userInfo = {} } = useUserInfo({ id, updater });

  const [claimLoading, setClaimLoading] = useState(false);

  const [isCompleted, setIsCompleted] = useState({ 1: false, 2: false, 3: false });

  const [userData, setUserData] = useState<any>({});
  const [inviteNum, setInviteNum] = useState(0);
  const [inviteReward, setInviteReward] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
  const [codeList, setCodeList] = useState([]);

  const [spin1, setSpin1] = useState(false);
  const [spin2, setSpin2] = useState([false, false, false]);

  async function fetchKolInfo() {
    try {
      const res = await get(`${QUEST_PATH}/api/activity/kol/info`);
      setSpin1(false);
      if ((res.code as number) !== 0) return;

      setSpin2([false, false, false]);
      setUserData(res.data);
      if (res?.data?.total_invite >= 100) {
        setIsCompleted((prev) => ({ ...prev, 1: true }));
      }
      if (res?.data?.total_invite >= 1000) {
        setIsCompleted((prev) => ({ ...prev, 2: true }));
      }
      if (res?.data?.total_invite >= 10000) {
        setIsCompleted((prev) => ({ ...prev, 3: true }));
      }
    } catch (error) {
      setSpin1(false);
    }
  }

  async function claimReward(step: 1 | 2 | 3) {
    const res = await post(`${QUEST_PATH}/api/activity/kol/claim`, { step });

    if ((res.code as number) !== 0) return false;
    return true;
  }

  const handleFresh = () => {
    setFresh((n) => n + 1);
  };

  const handleClaim = async (step: any, pts: number) => {
    if (!address) return;

    // if (step === 1 && !(isCompleted as any)[step]) return;
    // if (step === 2 && !(isCompleted as any)[step]) return;
    // if (step === 3 && !(isCompleted as any)[step]) return;
    if (!(isCompleted as any)[step]) return;
    if (step === 1 && userData?.step1_is_claimed) return;
    if (step === 2 && userData?.step2_is_claimed) return;
    if (step === 3 && userData?.step3_is_claimed) return;

    if (claimLoading) return;
    setClaimLoading(true);
    try {
      const isSuc = await claimReward(step);
      setClaimLoading(false);
      if (isSuc) {
        setIsShowModal(true);
        setModalType('success');
        setReward(pts);
        handleFresh();
      }
    } catch (error) {
      setClaimLoading(false);
    }
  };

  useEffect(() => {
    if (account) {
      fetchKolInfo();
    }
  }, [account, fresh]);

  function calcListStyle(step: number) {
    if (step === 1) {
      return '';
    } else {
      return (isCompleted as any)[step] ? '' : 'blur';
    }
  }

  const quests = [
    { step: 1, total: 100, pts: 1000 },
    { step: 2, total: 1000, pts: 5000 },
    { step: 3, total: 10000, pts: 10000 },
  ];

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
                  <Styles.DetailCount>{userData?.total_invite}</Styles.DetailCount>
                </Styles.StatDetail>
              </Styles.StatLeft>
              <Styles.StatLine />
              <Styles.StatRight>
                <Styles.StatIcon src="/images/marketing/coin.svg" />
                <Styles.StatDetail>
                  <Styles.DetailTitle>Your PTS</Styles.DetailTitle>
                  <Styles.DetailCount className="pts">{userData?.total_invite_reward} PTS</Styles.DetailCount>
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

        {quests.map((item, index) => (
          <Styles.RewardList key={item.step} className={calcListStyle(item.step)}>
            <Styles.RewardQuest>
              <Styles.Head>
                <Styles.HeadLeft>
                  Stage <Styles.StepNum>{item.step}</Styles.StepNum> reward
                </Styles.HeadLeft>
                {(isCompleted as any)[item.step] ? (
                  <Styles.CardDone src="/images/marketing/done.svg" />
                ) : (
                  <Styles.Fresh
                    className={spin2[index] ? 'spin' : ''}
                    onClick={() => {
                      setSpin2((prev) => {
                        const temp = [...prev];
                        temp[index] = !temp[index];
                        return temp;
                      });
                      handleFresh();
                    }}
                    src="/images/marketing/fresh.svg"
                  />
                )}
              </Styles.Head>
              <Styles.Tips>
                Complete <Styles.TipCount>{item.total}</Styles.TipCount> new user invites and receive corresponding
                rewards
              </Styles.Tips>
              <Styles.Progress>
                <Styles.Inner
                  style={{
                    width: (isCompleted as any)[item.step] ? '100%' : `${(userData?.total_invite / item.total) * 100}%`,
                  }}
                ></Styles.Inner>
              </Styles.Progress>
              <Styles.Current>
                <Styles.Tag>
                  <Styles.Coin src="/images/marketing/coin.svg"></Styles.Coin>
                  +100 PTS
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none">
                    <path d="M7.54599 1.3187L1.18203 7.68266M7.54599 7.68266L1.18203 1.3187" stroke="#EBF479" />
                  </svg>{' '}
                  1 PPL
                </Styles.Tag>
                {!(isCompleted as any)[item.step] ? (
                  <Styles.People>
                    <Styles.PeopleIcon src="/images/marketing/follow.svg" />
                    <Styles.PeopleNum>{userData?.total_invite}</Styles.PeopleNum>
                  </Styles.People>
                ) : null}
              </Styles.Current>
            </Styles.RewardQuest>
            <Styles.RewardBox className={(isCompleted as any)[item.step] ? '' : 'blur'}>
              <Styles.Cap src="/images/marketing/cap.svg"></Styles.Cap>
              <Styles.ClaimBtn onClick={(e) => handleClaim(item.step, item.pts)}>
                Claim <Styles.CoinIcon src="/images/marketing/coin.svg" /> {item.pts} PTS
              </Styles.ClaimBtn>
            </Styles.RewardBox>
          </Styles.RewardList>
        ))}

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

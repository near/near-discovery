import { useConnectWallet } from '@web3-onboard/react';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { checkAddressIsInvited, getAccessToken, getBnsUserName, insertedAccessKey } from '@/apis';
import { QUEST_PATH } from '@/config/quest';
import useCopy from '@/hooks/useCopy';
import { AUTH_TOKENS, get, getWithoutActive, post } from '@/utils/http';
import useAuthBind from '@/views/QuestProfile/hooks/useAuthBind';
import useAuthConfig from '@/views/QuestProfile/hooks/useAuthConfig';

import * as Styles from './styles';
interface IProps {}

const Dashboard: FC<IProps> = ({}) => {
  const router = useRouter();

  const goHome = () => {
    router.push('/');
  };

  return (
    <Styles.Container>
      <Styles.MainTitle>
        Dashboard
        <Styles.MainExtra>
          {/* TODO DATE */}
          <Styles.MainDate>18 February, 2024 | Sunday 15：13 PM</Styles.MainDate>
          <Styles.Button
            $fz="16px"
            $width="116px"
            $height="48px"
            $color="#ebf479"
            $backgroundHover="#EBF479"
            $colorHover="#000"
          >
            Refresh
          </Styles.Button>
        </Styles.MainExtra>
      </Styles.MainTitle>
      <Styles.SubTitle>Users Data</Styles.SubTitle>
      <Styles.SubTitle>Chains & dApps Data</Styles.SubTitle>
      <Styles.SubTitle>$PTS Data</Styles.SubTitle>
      {/* https://recharts.org/zh-CN/examples/PieChartWithPaddingAngle */}
      <Styles.SubTitle>Hot Quests</Styles.SubTitle>
      <Styles.Foot>
        <Styles.Button
          $fz="18px"
          $width="300px"
          $height="60px"
          $background="#EBF479"
          $backgroundHover="#EBF479"
          onClick={goHome}
        >
          Go to DapDap
        </Styles.Button>
      </Styles.Foot>
      <Styles.Explore>Explore more Function...</Styles.Explore>
    </Styles.Container>
  );
};

export default memo(Dashboard);

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
  return (
    <Styles.Container>
      <Styles.MainTitle>
        Dashboard
        <Styles.MainExtra>
          {/* TODO DATE */}
          <Styles.MainDate>18 February, 2024 | Sunday 15：13 PM</Styles.MainDate>
          <Styles.Button $fz="16px" $width="116px" $height="48px">
            Refresh
          </Styles.Button>
        </Styles.MainExtra>
      </Styles.MainTitle>
      <Styles.SubTitle></Styles.SubTitle>
    </Styles.Container>
  );
};

export default memo(Dashboard);

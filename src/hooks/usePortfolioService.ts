import Big from 'big.js';
import React, { useEffect, useState } from 'react';

import useEthersSender from './useEthersSender';

interface NetCurve24hUserItem {
  timestamp: number;
  usd_value: number;
}

const DAPDAP_DEBANK_URL = 'https://test-api.dapdap.net/debank';

export const useNetCurve24h = () => {
  const { sender } = useEthersSender();

  const [netCurve24h, setNetCurve24h] = useState<NetCurve24hUserItem[]>();

  const [diff, setDiff] = useState<{ value: string; dir: 'desc' | 'asc' }>();

  const senderParams = JSON.stringify({
    id: sender,
  });

  useEffect(() => {
    if (!sender) return;

    fetch(`${DAPDAP_DEBANK_URL}?url=/v1/user/total_net_curve&params=${senderParams}`)
      .then((response) => response.json())
      .then((data) => {
        const value_list = data?.data;
        console.log('value_list: ', value_list);

        const first_item = value_list[0].usd_value;

        const last_item = value_list[value_list.length - 1].usd_value;

        // calculate percentage last_item to fist_item,

        const diffValue = Big(((last_item - first_item) / first_item) * 100);

        const diffDisplay = diffValue.toFixed(2) + '%';

        setDiff({
          value: diffDisplay,
          dir: diffValue.gt(0) ? 'asc' : 'desc',
        });

        setNetCurve24h(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sender]);

  return { netCurve24h, diff };
};

export const useTotalBalance = () => {
  const { sender } = useEthersSender();

  const senderParams = JSON.stringify({
    id: sender,
  });

  const [totalBalance, setTotalBalance] = useState<number>();

  const [allChainsBalance, setAllChainsBalance] = useState<AllChainBalanceInterface>({
    total_usd_value: 0,
    chain_list: [],
  });

  useEffect(() => {
    if (!sender) return;

    fetch(`${DAPDAP_DEBANK_URL}?url=/v1/user/total_balance&params=${senderParams}`)
      .then((response) => response.json())
      .then((data) => {
        setAllChainsBalance(data?.data);

        setTotalBalance(data?.data?.total_usd_value);
      });
  }, [sender]);

  return { totalBalance, allChainsBalance };
};

interface ChainListItem {
  id: string;
  community_id: number;
  name: string;
  native_token_id: string;
  logo_url: string;
  wrapped_token_id: string;
  is_support_pre_exec: boolean;
}

export interface AllChainBalanceInterface {
  total_usd_value: number;
  chain_list: ChainlistBalance[];
}

interface ChainlistBalance {
  id: string;
  community_id: number;
  name: string;
  native_token_id: string;
  logo_url: string;
  wrapped_token_id: string;
  is_support_pre_exec: boolean;
  usd_value: number;
}

interface UserTokenItemInterface {
  id: string;
  chain: string;
  name: string;
  symbol: string;
  display_symbol?: string;
  optimized_symbol: string;
  decimals: number;
  logo_url?: string;
  protocol_id: string;
  price: number;
  price_24h_change?: number;
  is_verified: boolean;
  is_core: boolean;
  is_wallet: boolean;
  time_at?: number;
  amount: number;
  raw_amount: number;
  raw_amount_hex_str: string;
}

export const useSenderPortfolioData = () => {
  const { sender } = useEthersSender();

  const [allChainList, setAllChainList] = useState<ChainListItem[]>([]);

  const [allTokenList, setAllTokenList] = useState<UserTokenItemInterface[]>([]);

  const [protocolList, setProtocolList] = useState<any[]>([]);

  const fetchAll = async () => {
    if (!sender) return undefined;

    const senderParams = JSON.stringify({
      id: sender,
    });

    const allChainList = fetch(`${DAPDAP_DEBANK_URL}?url=/v1/chain/list&params=""`).then((res) => res.json());

    const allTokenList = fetch(`${DAPDAP_DEBANK_URL}?url=/v1/user/all_token_list&params=${senderParams}`).then((res) =>
      res.json(),
    );

    const protocolList = fetch(
      `${DAPDAP_DEBANK_URL}?url=/v1/user/all_complex_protocol_list&params=${senderParams}`,
    ).then((res) => res.json());

    const fetchList = [allChainList, allTokenList, protocolList];

    return Promise.all(fetchList)
      .then((responses) => {
        if (responses[0].code == '0') {
          setAllChainList(responses[0].data);
        }
        if (responses[1].code == '0') {
          setAllTokenList(responses[1].data);
        }
        if (responses[2].code === '0') {
          setProtocolList(responses[2].data);
        }
      })
      .catch((err) => {
        console.log('err1111: ', err);
      });
  };

  useEffect(() => {
    fetchAll();
  }, [sender]);

  return { allChainList, allTokenList, protocolList };
};

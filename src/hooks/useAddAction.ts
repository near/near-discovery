import { useCallback } from 'react';

import { useChainsStore } from '@/stores/chains';
import { useUUIdStore } from '@/stores/uuid';
import { post } from '@/utils/http';

import useAccount from './useAccount';

export default function useAddAction(source: string) {
  const { account, chainId } = useAccount();
  const chains = useChainsStore((store: any) => store.chains);
  const uuid = useUUIdStore((store: any) => store.uuid);
  const addAction = useCallback(
    (data: any) => {
      let params: any = {};
      if (!chainId || !account) return;
      const currentChain = chains.find((chain: any) => chain.chain_id === chainId);
      console.info('addAction data: ', data);

      if (data.type === 'Swap') {
        params = {
          // action_title: `Swap ${Number(data.inputCurrencyAmount)} ${data.inputCurrency.symbol} on ${data.template}`,
          action_title: `Swap ${data.inputCurrency.symbol} on ${data.template}`,
          action_type: 'Swap',
          action_tokens: JSON.stringify([`${data.inputCurrency.symbol}`, `${data.outputCurrency.symbol}`]),
          action_amount: data?.inputCurrencyAmount ? data?.inputCurrencyAmount.toString() : '',
          account_id: account,
          account_info: uuid,
          template: data.template,
          action_status: data.status === 1 ? 'Success' : 'Failed',
          tx_id: data.transactionHash,
          action_network_id: currentChain.name,
          chain_id: chainId,
          action_switch: data.add ? 1 : 0,
          token_in_currency: data?.token_in_currency,
          token_out_currency: data?.token_out_currency,
        };
      }
      if (data.type === 'Bridge') {
        try {
          const fromChain = chains.find((chain: any) => chain.chain_id === data.fromChainId) || {
            name: 'Ethereum Mainnet',
          };
          const toChain = chains.find((chain: any) => chain.chain_id === data.toChainId) || {
            name: 'Ethereum Mainnet',
          };
          console.info('chains: ', fromChain, toChain, currentChain);
          params = {
            action_title: `Bridge ${data.amount} ${data.token.symbol} to ${toChain?.name}`,
            action_type: 'Bridge',
            action_tokens: JSON.stringify([`${data.token.symbol}`]),
            action_amount: data.amount,
            account_id: account,
            account_info: uuid,
            template: data.template,
            // action_network_id: currentChain?.name,
            action_network_id: fromChain?.name,
            action_switch: data.add ? 1 : 0,
            action_status: data.status === 1 ? 'Success' : 'Failed',
            tx_id: data.transactionHash,
            chain_id: data.fromChainId,
            to_chain_id: data.toChainId,
            extra_data: JSON.stringify({
              from: fromChain?.name,
              to: toChain?.name,
            }),
          };
          console.info('params:', params);
        } catch (error) {
          console.info('bridge err', error);
        }
      }
      if (data.type === 'Lending') {
        params = {
          action_title: `${data.action} ${data.token.symbol} on ${data.template}`,
          action_type: 'Lending',
          action_tokens: JSON.stringify([`${data.token.symbol}`]),
          action_amount: data.amount,
          account_id: account,
          account_info: uuid,
          template: data.template,
          action_switch: data.add ? 1 : 0,
          action_status: data.status === 1 ? 'Success' : 'Failed',
          tx_id: data.transactionHash,
          action_network_id: currentChain.name,
          chain_id: chainId,
        };
      }
      if (data.type === 'Liquidity') {
        params = {
          action_title: `${data.action} ${data.token0}-${data.token1} on ${data.template}`,
          action_type: data.action,
          action_tokens: JSON.stringify([data.token0, data.token1]),
          action_amount: data.amount,
          account_id: account,
          action_network_id: currentChain.name,
          account_info: uuid,
          template: data.template,
          action_status: data.status === 1 ? 'Success' : 'Failed',
          action_switch: data.add ? 1 : 0,
          tx_id: data.transactionHash,
          chain_id: chainId,
          extra_data: data.extra_data,
        };
      }
      console.info('addAction params: ', params);
      params.source = source;
      post('/api/action/add', params);
    },
    [chainId, account],
  );
  return { addAction };
}

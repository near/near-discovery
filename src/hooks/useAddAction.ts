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
      let params: any = { source };
      if (!chainId || !account) return;
      const currentChain = chains.find((chain: any) => chain.chain_id === chainId);
      if (data.type === 'Swap') {
        params = {
          action_title: `Swap ${Number(data.inputCurrencyAmount)} ${data.inputCurrency.symbol} on ${data.template}`,
          action_type: 'Swap',
          action_tokens: JSON.stringify([`${data.inputCurrency.symbol}`, `${data.outputCurrency.symbol}`]),
          action_amount: data.inputCurrencyAmount,
          account_id: account,
          account_info: uuid,
          template: data.template,
          action_status: data.status === 1 ? 'Success' : 'Failed',
          tx_id: data.transactionHash,
          action_network_id: currentChain.name,
          chain_id: chainId,
        };
      }
      if (data.type === 'Bridge') {
        const fromChain = chains.find((chain: any) => chain.chain_id === data.fromChainId);
        const toChain = chains.find((chain: any) => chain.chain_id === data.toChainId);
        params = {
          action_title: `Bridge ${data.token.symbol} from ${fromChain.name} to ${toChain.name}`,
          action_type: 'Bridge',
          action_tokens: JSON.stringify([`${data.token.symbol}`]),
          action_amount: data.amount,
          account_id: account,
          account_info: uuid,
          template: data.template,
          action_network_id: currentChain.name,
          action_switch: data.add ? 1 : 0,
          action_status: data.status === 1 ? 'Success' : 'Failed',
          tx_id: data.transactionHash,
          chain_id: data.fromChainId,
          to_chain_id: data.toChainId,
        };
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
        };
      }

      post('/api/action/add', params);
    },
    [chainId, account],
  );
  return { addAction };
}

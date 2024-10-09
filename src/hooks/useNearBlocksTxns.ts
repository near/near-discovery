import { useCallback, useContext, useEffect, useState } from 'react';

import { NearContext } from '@/components/WalletSelector';
import { network } from '@/utils/config';

export interface Txns {
  id: string;
  receipt_id: string;
  predecessor_account_id: string;
  receiver_account_id: string;
  receipt_kind: string;
  receipt_block: ReceiptBlock;
  receipt_outcome: ReceiptOutcome;
  transaction_hash: string;
  included_in_block_hash: string;
  block_timestamp: string;
  block: Block;
  receipt_conversion_tokens_burnt: string;
  actions: Action[];
  actions_agg: ActionsAgg;
  outcomes: Outcomes;
  outcomes_agg: OutcomesAgg;
}

export interface Action {
  action: string;
  method: string;
  deposit: number;
  fee: number;
  args: string;
}

export interface ActionsAgg {
  deposit: number;
}

export interface Block {
  block_height: number;
}

export interface Outcomes {
  status: boolean;
}

export interface OutcomesAgg {
  transaction_fee: number;
}

export interface ReceiptBlock {
  block_hash: string;
  block_height: number;
  block_timestamp: number;
}

export interface ReceiptOutcome {
  gas_burnt: number;
  tokens_burnt: number;
  executor_account_id: string;
  status: boolean;
}

const API_NEAR_BLOCKS = network.apiNearBlocks;

const useNearBlocksTxns = (contract: string, method: string) => {
  const [transactions, setTransactions] = useState<Txns[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { wallet, signedAccountId } = useContext(NearContext);

  const fetchTransactions = useCallback(
    async (delay = 0) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, delay));
        const response = await fetch(
          `${API_NEAR_BLOCKS}/v1/account/${contract}/txns?from=${signedAccountId}&method=${method}`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTransactions(data.txns.filter((txn: Txns) => txn.outcomes.status));
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    },
    [contract, method, signedAccountId],
  );

  useEffect(() => {
    if (!wallet || !signedAccountId) return;
    fetchTransactions();
  }, [contract, method, wallet, signedAccountId, fetchTransactions]);

  return { transactions, loading, error, reloadTokens: fetchTransactions };
};

export default useNearBlocksTxns;

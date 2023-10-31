import { act,getEthProvider, type Transfer } from '@near-eth/client';
import { bridgedETH, bridgedNEAR, naturalETH, naturalNEAR } from '@near-eth/near-ether';
import { bridgedNep141, naturalErc20 } from '@near-eth/nep141-erc20';

import { expandToken } from './utils';

export const unlock = async (transfer: Transfer) => {
  // if(transfer.type === '@near-eth/nep141-erc20/bridged-nep141/sendToEthereum'){
  //     bridgedNep141.
  // }
  act(transfer.id);
};

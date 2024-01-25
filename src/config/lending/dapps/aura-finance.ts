import { arbitrum } from '@/config/tokens/arbitrum';
import { avalanche } from '@/config/tokens/avalanche';
import { base } from '@/config/tokens/base';
import { bsc } from '@/config/tokens/bsc';
import { linea } from '@/config/tokens/linea';
import { metis } from '@/config/tokens/metis';
import { optimism } from '@/config/tokens/optimism';

const basic = {
  name: 'Aura Finance',
  // icon: '/images/apps/granary.png',
  // data: 'bluebiu.near/widget/Lending.Data.Radiant',
  // handler: 'bluebiu.near/widget/Lending.Handler.Radiant',
  // type: 'aave2',
};

const networks = {
  //Gnosis
  100: {},
};

export default { basic, networks };

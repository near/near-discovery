import lending from './lending';
import staking from './staking';
import swap from './swap';
import liquidity from './liquidity';

export default {
  ...swap,
  ...lending,
  ...staking,
  ...liquidity
} as { [key: string]: any };

import lending from './lending';
import staking from './staking';
import swap from './swap';

export default {
  ...swap,
  ...lending,
  ...staking,
} as { [key: string]: any };

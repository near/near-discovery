import lending from './lending';
import swap from './swap';

export default {
  ...swap,
  ...lending,
} as { [key: string]: any };

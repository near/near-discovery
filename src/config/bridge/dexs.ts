import type { SupportDex, Dex } from '@/components/Bridge/types';

export default {
  Stargate: {
    icon: '/stargate.svg',
    name: 'Stargate',
    tags: ['faster', 'best'],
  },
} as { [key in SupportDex]: Dex };

import type { Drops } from '@/utils/types';

import CreateTokenDrop from './CreateTokenDrop';
import ListTokenDrop from './ListTokenDrop';

const Linkdrops = ({ drops }: { drops: Drops[] }) => {
  return (
    <>
      <CreateTokenDrop />
      <ListTokenDrop drops={drops} />
    </>
  );
};

export default Linkdrops;

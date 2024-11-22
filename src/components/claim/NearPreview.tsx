import { Flex, Text } from '@near-pagoda/ui';
import Image from 'next/image';

import NearIconSvg from '@/assets/images/near-icon.svg';

const NearPreview = ({ amount }: { amount: string }) => {
  return (
    <Flex justify="space-between" align="center" style={{ flexDirection: 'column' }}>
      <Text size="text-xl">NEAR</Text>
      <Image src={NearIconSvg} alt="NEAR" width={50} height={50} />
      <Text>{amount} NEAR</Text>
    </Flex>
  );
};

export default NearPreview;

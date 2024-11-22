import { Flex, Text } from '@near-pagoda/ui';
import Image from 'next/image';

type FT = {
  decimals: number;
  icon: string;
  name: string;
  symbol: string;
  total_supply: string;
};

const FTPreview = ({ token }: { token: FT }) => {
  return (
    <Flex justify="space-between" align="center" style={{ flexDirection: 'column' }}>
      <Text size="text-xl">{token.name}</Text>
      <Image src={token.icon} alt={token.name} width={50} height={50} />
      <Text>
        {(BigInt(token.total_supply) / BigInt(10 ** token.decimals)).toString()} {token.symbol}
      </Text>
    </Flex>
  );
};

export default FTPreview;

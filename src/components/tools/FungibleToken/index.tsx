// https://dev.near.org/contractwizard.near/widget/ContractWizardUI
// curl https://api.fastnear.com/v1/account/here.tg/ft
// https://github.com/fastnear/fastnear-api-server-rs?tab=readme-ov-file#api-v1
// near call tkn.near create_token '{"args":{"owner_id": "maguila.near","total_supply": "1000000000","metadata":{"spec": "ft-1.0.0","name": "Test Token","symbol": "TTTEST","icon": "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7","decimals": 18}},"account_id": "maguila.near"}' --gas 300000000000000 --depositYocto 2234830000000000000000000 --accountId maguila.near --networkId mainnet
// https://docs.near.org/build/primitives/ft

import { Card, Flex, SvgIcon, Text, Title, Tooltip } from '@near-pagoda/ui';
import { CheckFat, ListNumbers, PlusCircle } from '@phosphor-icons/react';
import { useState } from 'react';
import CreateTokenForm from './CreateTokenForm';
import ListToken from './ListToken';


const formattedBalance = (balance: string, decimals = 24) => {
  const numericBalance = Number(balance);
  if (isNaN(numericBalance) || isNaN(decimals)) {
    return '0';
  }
  const result = numericBalance / Math.pow(10, decimals);
  return result % 1 === 0 ? result.toString() : result.toFixed(5).replace(/\.?0+$/, '');
};

const FungibleToken = ({ tokens }) => {

  return (
    <>
      <CreateTokenForm />
      <hr />
     <ListToken tokens={tokens}/>
    </>
  );
};
export default FungibleToken;


/*
<hr />
<Title>  </Title>
{tokens.map((token, index) => (
  <Card key={index} style={{ marginBottom: '8px' }}>
    <Flex align="center" justify="space-between">
      <Flex align="center" style={{ flex: "1" }} >
        <Text>{token.icon && <img width={25} height={25} alt={token.symbol} src={token.icon} />}</Text>
      </Flex>
      <Text style={{ flex: "1" }} size="text-l">{formattedBalance(token.balance, token.decimals)}</Text>

      <Flex justify="end" align='center' style={{ flex: "1" }}>
        <Text>{token.symbol}</Text>
        {/* {token.verified && ( *\/}
        <Tooltip content="It is verified">
          <SvgIcon icon={<CheckFat /> /*<SealCheck />*\/} size="m" color="violet8" />
        </Tooltip>
        {/* )} \/}
      </Flex>
    </Flex>
  </Card>
))}
*/
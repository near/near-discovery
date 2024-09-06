import { Accordion, Button } from '@near-pagoda/ui';

import TokenDrop from './TokenDrop';

export interface Drops {
  drop_id: string;
  owner_id: string;
  deposit_per_use: string;
  simple: Simple;
  config: null;
  metadata: string;
  registered_uses: number;
  required_gas: string;
  next_key_id: number;
  information: Information[];
}

export interface Information {
  drop_id: string;
  pk: string;
  cur_key_use: number;
  remaining_uses: number;
  last_used: number;
  allowance: number;
  key_id: number;
}

export interface Simple {
  lazy_register: null;
}

const getDropName = (drop: Drops) => {
  return drop ? JSON.parse(drop.metadata).dropName : "";
};

const Linkdrops = ({ drops }: { drops: Drops[] }) => {
  console.log("drops", drops);
  return (
    <div>
      <TokenDrop />
      <Accordion.Root type="multiple">
        {drops.map((drop) => {
          return (
            <Accordion.Item key={drop.drop_id} value={drop.drop_id}>
              <Accordion.Trigger>
                {getDropName(drop)} - Claimed {drop.next_key_id - drop.registered_uses}/{drop.next_key_id}
              </Accordion.Trigger>

              <Accordion.Content>
                {drop.private_keys.map((pk) => {
                  return (
                    <Button
                      label="click me"
                      href={'https://app.mynearwallet.com' + '/linkdrop/v2.keypom.near/' + pk}
                      target='_blank'
                    />
                  );
                })}
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
};

export default Linkdrops;

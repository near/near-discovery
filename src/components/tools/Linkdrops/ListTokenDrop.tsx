import { Accordion, Badge, Button, copyTextToClipboard, Flex, Text, Tooltip } from '@near-pagoda/ui';
import { Copy } from '@phosphor-icons/react';

import type { Drops } from '@/utils/types';

const getDropName = (drop: Drops) => {
  return drop ? JSON.parse(drop.metadata).dropName : '';
};

const ListTokenDrop = ({ drops }: { drops: Drops[] }) => {
  return (
    <Accordion.Root type="multiple">
      {drops.map((drop) => {
        return (
          <Accordion.Item key={drop.drop_id} value={drop.drop_id}>
            <Accordion.Trigger>
              {getDropName(drop)} - {drop.registered_uses} Remaining
            </Accordion.Trigger>
            <Accordion.Content>
              {drop.keys &&
                drop.keys.map((key) => {
                  return (
                    <Flex align="center" justify="space-between" key={key.private}>
                      <Text style={{ maxWidth: '10rem' }} clampLines={1}>
                        {key.private}
                      </Text>
                      <Badge label={'Unclaimed'} variant={'success'} />
                      <Tooltip content="Copy Account ID">
                        <Button
                          label="copy"
                          onClick={() => {
                            const url = 'https://app.mynearwallet.com' + '/linkdrop/v2.keypom.near/' + key.private;
                            copyTextToClipboard(url, url);
                          }}
                          size="small"
                          fill="outline"
                          icon={<Copy />}
                        />
                      </Tooltip>
                    </Flex>
                  );
                })}
            </Accordion.Content>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
};

export default ListTokenDrop;

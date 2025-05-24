import { parseNearAmount } from '@near-js/utils';
import { Accordion, Button, Flex, Form, Input, openToast, Text } from '@near-pagoda/ui';
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { network } from '@/config';
import generateAndStore from '@/utils/linkdrops';
import type { Collection, NFT } from '@/utils/types';

import Carousel from '../Shared/Carousel';

const KEYPOM_CONTRACT_ADDRESS = network.linkdrop;

type FormData = {
  dropName: string;
  amountPerLink: number;
  tokenId: string;
  senderId: string;
  contractId: string;
};

const getDeposit = (numberLinks: number): string => parseNearAmount((0.0426 * numberLinks).toString()) || '0';

const CreateNFTDrop = ({
  user_collections,
  reload,
}: {
  user_collections: Collection[];
  reload: (delay: number) => void;
}) => {
  const { signedAccountId, signAndSendTransactions } = useWalletSelector();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      senderId: signedAccountId || '',
    },
  });

  const [nftSelected, setNftSelected] = useState<NFT | undefined>(undefined);

  const fillForm = (nft: NFT) => {
    setNftSelected(nft);
    setValue('tokenId', nft.token_id);
    setValue('contractId', nft.contract_id);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const dropId = Date.now().toString();
    const args = {
      deposit_per_use: '2840000000000000000000',
      drop_id: dropId,
      metadata: JSON.stringify({
        dropName: data.dropName,
      }),
      public_keys: generateAndStore(data.dropName, 1),
      nft: {
        sender_id: data.senderId,
        contract_id: data.contractId,
      },
    };

    try {
      if (!signedAccountId) return;

      await signAndSendTransactions({
        transactions: [
          {
            receiverId: KEYPOM_CONTRACT_ADDRESS,
            signerId: signedAccountId,
            actions: [
              {
                type: 'FunctionCall',
                params: {
                  methodName: 'create_drop',
                  args,
                  gas: '300000000000000',
                  deposit: getDeposit(1),
                },
              },
            ],
          },
          {
            receiverId: data.contractId,
            signerId: signedAccountId,
            actions: [
              {
                type: 'FunctionCall',
                params: {
                  methodName: 'nft_transfer_call',
                  args: {
                    receiver_id: KEYPOM_CONTRACT_ADDRESS,
                    token_id: data.tokenId,
                    msg: dropId,
                  },
                  gas: '300000000000000',
                  deposit: '1',
                },
              },
            ],
          },
        ],
      });

      openToast({
        type: 'success',
        title: 'Linkdrop Created',
        description: 'Your drop has been created',
        duration: 5000,
      });

      reload(1000);
    } catch (error) {
      console.error(error);

      openToast({
        type: 'error',
        title: 'Error',
        description: 'Failed to create the drop',
        duration: 5000,
      });
    }
  };

  return (
    <Flex stack style={{ border: '1px solid var(--violet3)', padding: '1rem', borderRadius: '10px' }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Flex stack gap="l">
          <Input
            label="Token Drop name"
            placeholder="NEARCon Token Giveaway"
            error={errors.dropName?.message}
            {...register('dropName', { required: 'Token Drop name is required' })}
            disabled={!signedAccountId}
          />
          <Flex stack gap="s">
            <Text> Please select one of your NFTs to drop:</Text>
            <Accordion.Root type="multiple" style={{ margin: 0 }}>
              {user_collections.map((collection: Collection) =>
                Object.entries(collection).map(([contract, nfts]) => (
                  <Accordion.Item value={contract} key={`accordion-${contract}`}>
                    <Accordion.Trigger>{contract}</Accordion.Trigger>
                    <Accordion.Content>
                      <Carousel nfts={nfts} onSelect={fillForm} nftSelected={nftSelected} />
                    </Accordion.Content>
                  </Accordion.Item>
                )),
              )}
            </Accordion.Root>
          </Flex>
          <Input
            label="NFT contract address"
            placeholder="Select a Token"
            disabled
            error={errors.contractId?.message}
            {...register('contractId', {
              required: 'NFT contract address per link is required',
            })}
          />
          <Input
            label="Token ID"
            placeholder="Select a Token"
            disabled
            error={errors.tokenId?.message}
            {...register('tokenId', {
              required: 'Token ID per link is required',
            })}
          />

          <Button
            label="Create Drop"
            variant="affirmative"
            type="submit"
            loading={isSubmitting}
            disabled={!signedAccountId}
          />
        </Flex>
      </Form>
    </Flex>
  );
};

export default CreateNFTDrop;

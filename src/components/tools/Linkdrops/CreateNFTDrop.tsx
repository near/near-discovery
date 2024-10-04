import { Accordion, Button, Flex, Form, Input, openToast } from '@near-pagoda/ui';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import { useContext, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import useNFT from '@/hooks/useNFT';
import generateAndStore from '@/utils/linkdrops';

import { NearContext } from '../../WalletSelector';
import Carousel from '../Shared/Carousel';

const KEYPOM_CONTRACT_ADDRESS = 'v2.keypom.near';

type FormData = {
  dropName: string;
  amountPerLink: number;
  tokenId: string;
  senderId: string;
  contractId: string;
};

const getDeposit = (amountPerLink: number, numberLinks: number) =>
  parseNearAmount(((0.0426 + amountPerLink) * numberLinks).toString());

const CreateNFTDrop = ({ reload }: { reload: (delay: number) => void }) => {
  const { wallet, signedAccountId } = useContext(NearContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      senderId: signedAccountId,
    },
  });

  const [nftSelected, setNftSelected] = useState('');

  const contracts = useNFT();

  const fillForm = (origin: string, token_id: string) => {
    setNftSelected(token_id);
    setValue('tokenId', token_id);
    setValue('contractId', origin);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!wallet) throw new Error('Wallet has not initialized yet');
    const dropId = Date.now().toString();
    const args = {
      deposit_per_use: '0',
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

    await wallet.signAndSendTransactions({
      transactions: [
        {
          receiverId: KEYPOM_CONTRACT_ADDRESS,
          actions: [
            {
              type: 'FunctionCall',
              params: {
                methodName: 'create_drop',
                args,
                gas: '300000000000000',
                deposit: getDeposit(1, 1),
              },
            },
          ],
        },
        {
          receiverId: data.contractId,
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
                deposit: 1,
              },
            },
          ],
        },
      ],
    });

    openToast({
      type: 'success',
      title: 'Form Submitted',
      description: 'Your form has been submitted successfully',
      duration: 5000,
    });

    reload(1000);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Flex stack gap="l">
          <Input
            label="Token Drop name"
            placeholder="NEARCon Token Giveaway"
            error={errors.dropName?.message}
            {...register('dropName', { required: 'Token Drop name is required' })}
          />
          <Accordion.Root type="multiple">
            {contracts.map((nfts, index) => (
              <Accordion.Item value={index.toString()} key={`accordion-${nfts[0].contract_id}`}>
                <Accordion.Trigger>{nfts[0].contract_id}</Accordion.Trigger>
                <Accordion.Content>
                  <Carousel nfts={nfts} onSelect={fillForm} nftSelected={nftSelected} />
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
          <Input
            label="NFT contract address"
            placeholder="Enter a NFT contract address"
            disabled
            error={errors.contractId?.message}
            {...register('contractId', {
              required: 'NFT contract address per link is required',
            })}
          />
          <Input
            label="Token ID"
            placeholder="Enter a Token ID"
            disabled
            error={errors.tokenId?.message}
            {...register('tokenId', {
              required: 'Token ID per link is required',
            })}
          />

          <Button label="Create links" variant="affirmative" type="submit" loading={isSubmitting} />
        </Flex>
      </Form>
    </>
  );
};

export default CreateNFTDrop;

import { Accordion, Button, Flex, Form, Input, openToast, Text } from '@near-pagoda/ui';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import { useContext, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { NftImage } from '@/components/NTFImage';
import type { NFT } from '@/hooks/useNFT';
import useNFT from '@/hooks/useNFT';
import generateAndStore from '@/utils/linkdrops';

import { NearContext } from '../../WalletSelector';

const CarouselContainer = styled.div`
  display: flex;
  overflow-x: auto;
  width: 100%;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
`;

const ImgCard = styled.div<{
  selected: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin: 4px;
  border-radius: 6px;
  cursor: pointer;
  border: ${(p) => (p.selected ? 'solid 1px #878782' : '')};
`;

const KEYPOM_CONTRACT_ADDRESS = 'v2.keypom.near';

type FormData = {
  dropName: string;
  amountPerLink: number;
  tokenId: string;
  senderId: string;
  contractId: string;
};

const parseToNFTimage = (nft: NFT, origin: string) => {
  return {
    contractId: origin,
    tokenId: nft.token_id,
  };
};

const getDeposit = (amountPerLink: number, numberLinks: number) =>
  parseNearAmount(((0.0426 + amountPerLink) * numberLinks).toString());

const CreateNFTDrop = () => {
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

  const { tokens } = useNFT();

  const fillForm = (origin: string, nft: NFT) => () => {
    setNftSelected(nft.token_id);
    setValue('tokenId', nft.token_id);
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
            {tokens.map((token, index) => {
              return (
                <Accordion.Item value={index.toString()} key={`accordion-${token.origin}`}>
                  <Accordion.Trigger>{token.origin}</Accordion.Trigger>

                  <Accordion.Content>
                    <CarouselContainer>
                      {token.nfts.map((nft) => {
                        return (
                          <ImgCard
                            key={`Carousel-${nft.token_id}`}
                            onClick={fillForm(token.origin, nft)}
                            selected={nftSelected === nft.token_id}
                          >
                            <NftImage nft={parseToNFTimage(nft, token.origin)} alt={nft.metadata.title} />
                            <Text>{nft.metadata.title}</Text>
                          </ImgCard>
                        );
                      })}
                    </CarouselContainer>
                  </Accordion.Content>
                </Accordion.Item>
              );
            })}
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

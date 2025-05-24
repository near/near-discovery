import { parseNearAmount } from '@near-js/utils';
import { Button, Flex, Form, Input, openToast } from '@near-pagoda/ui';
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { network } from '@/config';
import generateAndStore from '@/utils/linkdrops';
import type { FT } from '@/utils/types';

import SelectFT from './SelectFT';

type FormData = {
  dropName: string;
  numberLinks: number;
  amountPerLink: number;
};

const KEYPOM_CONTRACT_ADDRESS = network.linkdrop;

const formatBalance = (balance: string, decimals = 24) => {
  const balanceStr = balance.toString();
  const integerPart = balanceStr.slice(0, -decimals) || '0';
  const decimalPart = balanceStr.slice(-decimals).padStart(decimals, '0');
  return Number(`${integerPart}.${decimalPart.slice(0, 2)}`);
};

const parseAmount = (amount: string, decimals: number) => {
  const [integer, decimal] = amount.split('.');
  const integerPart = integer || '0';
  const decimalPart = decimal || '0';
  return BigInt(integerPart + decimalPart.padEnd(decimals, '0'));
};

const depositForFT = (numberLinks: number) => {
  return parseNearAmount((0.0426 * numberLinks).toString());
};

const depositForNear = (amountPerLink: number, numberLinks: number) =>
  parseNearAmount(((0.0426 + amountPerLink) * numberLinks).toString());

const CreateTokenDrop = ({ user_fts, reload }: { user_fts: FT[]; reload: (delay: number) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      numberLinks: 1,
      amountPerLink: 0,
    },
  });

  const { signAndSendTransactions, signedAccountId } = useWalletSelector();
  const [token, setToken] = useState<FT>(user_fts[0]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const dropId = Date.now().toString();
    const nearAmount = token.contract_id === 'near' ? parseNearAmount(data.amountPerLink.toString()) : '0';
    const ftAmount =
      token.contract_id === 'near'
        ? '0'
        : parseAmount(data.amountPerLink.toString(), token.metadata.decimals).toString();
    const isFTDrop = token.contract_id !== 'near';

    const args = {
      deposit_per_use: nearAmount,
      drop_id: dropId,
      metadata: JSON.stringify({
        dropName: data.dropName,
      }),
      public_keys: generateAndStore(data.dropName, data.numberLinks),
      ft: isFTDrop
        ? {
            sender_id: signedAccountId,
            contract_id: token.contract_id,
            balance_per_use: ftAmount,
          }
        : undefined,
    };

    const transactions: any[] = [
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
              deposit: isFTDrop ? depositForFT(data.numberLinks) : depositForNear(data.amountPerLink, data.numberLinks),
            },
          },
        ],
      },
    ];

    if (isFTDrop) {
      const amount = BigInt(ftAmount) * BigInt(data.numberLinks);
      transactions.push({
        receiverId: token.contract_id,
        signerId: signedAccountId,
        actions: [
          {
            type: 'FunctionCall',
            params: {
              methodName: 'ft_transfer_call',
              args: {
                receiver_id: KEYPOM_CONTRACT_ADDRESS,
                amount: amount.toString(),
                msg: dropId,
              },
              gas: '300000000000000',
              deposit: '1',
            },
          },
        ],
      });
    }

    try {
      await signAndSendTransactions({ transactions });

      openToast({
        type: 'success',
        title: 'Linkdrop Created',
        description: 'Copy the link and share it with your friends',
        duration: 5000,
      });

      reload(1000);
    } catch (error) {
      console.log(error);

      openToast({
        type: 'error',
        title: 'Error',
        description: 'The linkdrop could not be created',
        duration: 5000,
      });
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Flex stack gap="l" style={{ border: '1px solid var(--violet3)', padding: '1rem', borderRadius: '10px' }}>
          <Input
            label="Token Drop name"
            placeholder="NEARCon Token Giveaway"
            error={errors.dropName?.message}
            {...register('dropName', { required: 'Token Drop name is required' })}
            disabled={!signedAccountId}
          />
          <Input
            label="Amount per link"
            number={{
              allowNegative: false,
              allowDecimal: true,
            }}
            assistive={`${formatBalance(token.balance, token.metadata.decimals)} available`}
            placeholder="Enter an amount"
            error={errors.amountPerLink?.message}
            {...register('amountPerLink', {
              min: {
                message: 'Must be greater than 0',
                value: 0.01,
              },
              max: {
                message: `Must be equal to or less than ${formatBalance(token.balance, token.metadata.decimals)}`,
                value: formatBalance(token.balance, token.metadata.decimals),
              },
              valueAsNumber: true,
              required: 'Amount per link is required',
            })}
            right={<SelectFT tokens={user_fts} setToken={setToken} />}
            disabled={!signedAccountId}
          />
          <Input
            label="Number of links"
            number={{ allowDecimal: false, allowNegative: false }}
            placeholder="1 - 30"
            error={errors.numberLinks?.message}
            {...register('numberLinks', {
              min: {
                message: 'Must be greater than 0',
                value: 1,
              },
              max: {
                message: `Must be equal to or less than 30`,
                value: 30,
              },
              valueAsNumber: true,
              required: 'Number of links is required',
            })}
            disabled={!signedAccountId}
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
    </>
  );
};

export default CreateTokenDrop;

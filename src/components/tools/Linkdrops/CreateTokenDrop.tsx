import { Button, Flex, Form, Input, openToast } from '@near-pagoda/ui';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import { useContext, useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { Token } from '@/hooks/useTokens';
import useTokens from '@/hooks/useTokens';
import { network } from '@/utils/config';
import generateAndStore from '@/utils/linkdrops';

import { NearContext } from '../../WalletSelector';
import SelectFT from './SelectFT';

type FormData = {
  dropName: string;
  numberLinks: number;
  amountPerLink: number;
};

const KEYPOM_CONTRACT_ADDRESS = network.linkdrop;

const formattedBalance = (balance: string, decimals = 24) => {
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

const getDeposit = (amountPerLink: number, numberLinks: number) =>
  parseNearAmount(((0.0426 + amountPerLink) * numberLinks).toString());

const CreateTokenDrop = ({ reload }: { reload: (delay: number) => void }) => {
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

  const { wallet, signedAccountId } = useContext(NearContext);
  const [balance, setBalance] = useState(0);
  const [token, setToken] = useState<Token>();
  const { tokens } = useTokens();

  useEffect(() => {
    if (!wallet || !signedAccountId || !tokens.length) return;
    setToken(tokens[0]);
  }, [wallet, signedAccountId, tokens]);

  useEffect(() => {
    if (!token) return;
    const balance = token.balance;
    const decimals = token.decimals;
    setBalance(formattedBalance(balance, decimals));
  }, [token]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!wallet) throw new Error('Wallet has not initialized yet');
    if (!token) throw new Error('Token has not been selected yet');
    const dropId = Date.now().toString();
    try {
      const nearAmount = token.contract_id === 'near' ? parseNearAmount(data.amountPerLink.toString()) : '0';
      const ftAmount =
        token.contract_id === 'near' ? '0' : parseAmount(data.amountPerLink.toString(), token.decimals).toString();
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
          actions: [
            {
              type: 'FunctionCall',
              params: {
                methodName: 'create_drop',
                args,
                gas: '300000000000000',
                deposit: getDeposit(isFTDrop ? 0 : data.amountPerLink, data.numberLinks),
              },
            },
          ],
        },
      ];

      if (isFTDrop) {
        const amount = BigInt(ftAmount) * BigInt(data.numberLinks);
        transactions.push({
          receiverId: token.contract_id,
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

      await wallet.signAndSendTransactions({ transactions });

      openToast({
        type: 'success',
        title: 'Form Submitted',
        description: 'Your form has been submitted successfully',
        duration: 5000,
      });
    } catch (error) {
      console.log(error);

      openToast({
        type: 'error',
        title: 'Error',
        description: 'Failed to submit form',
        duration: 5000,
      });
    } finally {
      reload(1000);
    }
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
          <Input
            label="Number of links"
            number={{ allowDecimal: false, allowNegative: false }}
            placeholder="1 - 50"
            error={errors.numberLinks?.message}
            {...register('numberLinks', {
              min: {
                message: 'Must be greater than 0',
                value: 1,
              },
              max: {
                message: `Must be equal to or less than 50`,
                value: 50,
              },
              valueAsNumber: true,
              required: 'Number of links is required',
            })}
            right={<SelectFT tokens={tokens} setToken={setToken} />}
          />
          <Input
            label="Amount per link"
            number={{
              allowNegative: false,
              allowDecimal: true,
            }}
            assistive={balance ? `${balance} available` : 'loading ...'}
            placeholder="Enter an amount"
            error={errors.amountPerLink?.message}
            {...register('amountPerLink', {
              min: {
                message: 'Must be greater than 0',
                value: 0.0000000001,
              },
              max: {
                message: `Must be equal to or less than ${balance}`,
                value: balance,
              },
              valueAsNumber: true,
              required: 'Amount per link is required',
            })}
          />
          <Button label="Create links" variant="affirmative" type="submit" loading={isSubmitting} />
        </Flex>
      </Form>
    </>
  );
};

export default CreateTokenDrop;

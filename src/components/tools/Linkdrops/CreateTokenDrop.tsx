import { Button, Flex, Form, Input, openToast, Text } from '@near-pagoda/ui';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import { useContext, useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import generateAndStore from '@/utils/linkdrops';

import { NearContext } from '../../WalletSelector';
import SelectFT from './SelectFT';
import useTokens from '@/hooks/useFT';
import { CopySimple } from '@phosphor-icons/react';

type FormData = {
  dropName: string;
  numberLinks: number;
  amountPerLink: number;
};

// balance is already formatted here (e.g. 1.2345)
function displayBalance(balance: number) {
  let display = Math.floor(balance * 100) / 100;

  if (balance < 1) {
    display = Math.floor(balance * 100000) / 100000;
    if (balance && !display) return '< 0.00001';
    return display;
  }

  return display;
}

const KEYPOM_CONTRACT_ADDRESS = 'v2.keypom.near';

const formattedBalance = (balance: string, decimals = 24) => {
  const balanceStr = balance.toString();
  const integerPart = balanceStr.slice(0, -decimals) || '0';
  const decimalPart = balanceStr.slice(-decimals).padStart(decimals, '0');
  return `${integerPart}.${decimalPart.slice(2)}`;
};

const parseAmount = (amount: string, decimals: number) => {
  const [integer, decimal] = amount.split('.');
  const integerPart = integer || '0';
  const decimalPart = decimal || '0';
  return integerPart + decimalPart.padEnd(decimals, '0');
}

const getDeposit = (amountPerLink: number, numberLinks: number) =>
  parseNearAmount(((0.0426 + amountPerLink) * numberLinks).toString());

const CreateTokenDrop = () => {
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
  const [balance, setBalance] = useState('0');
  const [token, setToken] = useState(null);
  const { tokens } = useTokens();

  useEffect(() => {
    if (!wallet || !signedAccountId || !tokens.length) return;
    setToken(tokens[0]);
  }, [wallet, signedAccountId, tokens]);

  useEffect(() => {
    if (!token) return;
    console.log(token);
    const balance = token.balance;
    const decimals = token.decimals;
    setBalance(formattedBalance(balance, decimals));
  }, [token]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!wallet) throw new Error('Wallet has not initialized yet');
    const dropId = Date.now().toString();
    try {
      const args = {
        deposit_per_use: token.contract_id === "near" ? parseNearAmount(data.amountPerLink.toString()) : '0',
        drop_id: dropId,
        metadata: JSON.stringify({
          dropName: data.dropName,
        }),
        public_keys: generateAndStore(data.dropName, data.numberLinks),
        ft: token.contract_id === "near" ? undefined : {
          sender_id: signedAccountId,
          contract_id: token.contract_id,
          balance_per_use: parseAmount(data.amountPerLink.toString(), token.decimals),
        }
      };

      const transactions = [
        {
          receiverId: 'v2.keypom.near',
          actions: [
            {
              type: 'FunctionCall',
              params: {
                methodName: 'create_drop',
                args,
                gas: '300000000000000',
                deposit: getDeposit(data.amountPerLink, data.numberLinks),
              },
            },
          ],
        }
      ]

      if (token.contract_id !== "near") {

        transactions.push({
          receiverId: token.contract_id,
          actions: [
            {
              type: 'FunctionCall',
              params: {
                methodName: 'ft_transfer_call',
                args: {
                  receiver_id: KEYPOM_CONTRACT_ADDRESS,
                  amount: parseAmount(data.amountPerLink.toString(), token.decimals),//TODO cambiar
                  msg: dropId,
                },
                gas: '300000000000000',
                deposit: 1,
              },
            },
          ],
        })
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
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Flex stack gap="l">
          <SelectFT tokens={tokens} setToken={setToken} />
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
          />
          <Input
            label="Amount per link"
            number={{
              allowNegative: false,
              allowDecimal: true,
            }}
            assistive={`${balance} available`}
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

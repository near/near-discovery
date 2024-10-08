import { Button, Flex, Form, Input, openToast, Text } from '@near-pagoda/ui';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import { useContext, useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import generateAndStore from '@/utils/linkdrops';

import { NearContext } from '../../wallet-selector/WalletSelector';

type FormData = {
  dropName: string;
  numberLinks: number;
  amountPerLink: number;
};

function displayBalance(balance: number) {
  let display = Math.floor(balance * 100) / 100;

  if (balance < 1) {
    display = Math.floor(balance * 100000) / 100000;
    if (balance && !display) return '< 0.00001';
    return display;
  }

  return display;
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
  const [currentNearAmount, setCurrentNearAmount] = useState(0);

  useEffect(() => {
    if (!wallet || !signedAccountId) return;

    const loadBalance = async () => {
      try {
        const balance = await wallet.getBalance(signedAccountId);
        const requiredGas = 0.00005;
        const cost = 0.0426;
        setCurrentNearAmount(balance - requiredGas - cost);
      } catch (error) {
        console.error(error);
      }
    };

    loadBalance();
  }, [wallet, signedAccountId]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!wallet) throw new Error('Wallet has not initialized yet');

    try {
      const args = {
        deposit_per_use: parseNearAmount(data.amountPerLink.toString()),
        metadata: JSON.stringify({
          dropName: data.dropName,
        }),
        public_keys: generateAndStore(data.dropName, data.numberLinks),
      };

      await wallet.signAndSendTransactions({
        transactions: [
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
          },
        ],
      });

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
      <Text size="text-l" style={{ marginBottom: '12px' }}>
        Create a LinkDrop
      </Text>
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
          />
          <Input
            label="Amount per link"
            number={{
              allowNegative: false,
              allowDecimal: true,
            }}
            assistive={`${displayBalance(currentNearAmount)} available`}
            placeholder="Enter an amount"
            error={errors.amountPerLink?.message}
            {...register('amountPerLink', {
              min: {
                message: 'Must be greater than 0',
                value: 0.0000000001,
              },
              max: {
                message: `Must be equal to or less than ${currentNearAmount}`,
                value: currentNearAmount,
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

import { Button, Flex, Form, handleClientError, Input, openToast, Text } from '@near-pagoda/ui';
import { utils } from 'near-api-js';
import { NEAR_NOMINATION } from 'near-api-js/lib/utils/format';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { NearContext } from '../wallet-selector/WalletSelector';
import { NEAR_NOMINATION } from 'near-api-js/lib/utils/format';

type FormData = {
  sendNearAmount: number;
  sendToAccountId: string;
};

export const SendNear = () => {
  const form = useForm<FormData>();
  const { wallet, signedAccountId } = useContext(NearContext);
  const [currentNearAmount, setCurrentNearAmount] = useState(0);

  useEffect(() => {
    if (!wallet || !signedAccountId) return;

    const loadBalance = async () => {
      try {
        const balanceYocto = await wallet.getBalance(signedAccountId);
        const balance = parseFloat((BigInt(balanceYocto) / NEAR_NOMINATION).toString());

        console.log('balance', balanceYocto, balance);
        const requiredGas = 0.00005;

        const availableBalance = Math.max(balance - requiredGas, 0);
        const formattedNumber = parseFloat(availableBalance.toFixed(4));
        setCurrentNearAmount(formattedNumber);
      } catch (error) {
        console.error(error);
      }
    };

    loadBalance();
  }, [wallet, signedAccountId]);

  const validSubmitHandler: SubmitHandler<FormData> = async (data) => {
    try {
      if (!wallet) throw new Error('Wallet has not initialized yet');
      const amount = utils.format.parseNearAmount(data.sendNearAmount.toString());
      if (!amount) throw new Error('Failed to parse amount');

      const sendNear = {
        actions: [
          {
            params: {
              deposit: amount,
            },
            type: 'Transfer',
          },
        ],
        signerId: signedAccountId,
        receiverId: data.sendToAccountId,
      };
      const result: any = await wallet.signAndSendTransactions({ transactions: [sendNear] });

      setCurrentNearAmount((value) => Math.max(value - (data.sendNearAmount || 0), 0));
      form.reset();

      openToast({
        type: 'success',
        title: 'Transaction Success',
        description: `${data.sendNearAmount} Ⓝ sent to ${data.sendToAccountId}`,
        duration: Infinity,
        actionText: 'View Transaction',
        action: () => {
          /*
            NOTE: When sending a transaction while signed in with a FastAuth account, 
            the request will succeed, however the result object is undefined.
          */

          if (result) {
            const transactionId = result.transaction_outcome.id;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            window.open(`https://nearblocks.io/txns/${transactionId}`, '_blank')!.focus();
          } else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            window.open(`https://nearblocks.io/address/${data.sendToAccountId}`, '_blank')!.focus();
          }
        },
      });
    } catch (error) {
      handleClientError({ error, title: 'Transaction Failed' });
    }
  };

  if (!signedAccountId) return <Text> Sign in to send NEAR </Text>;

  return (
    <Form onSubmit={form.handleSubmit(validSubmitHandler)}>
      <Flex stack gap="l">
        <Input
          label="Amount Ⓝ"
          placeholder="NEAR"
          number={{
            allowNegative: false,
            allowDecimal: true,
          }}
          assistive={`${currentNearAmount.toFixed(5)} available`}
          error={form.formState.errors.sendNearAmount?.message}
          {...form.register('sendNearAmount', {
            min: {
              message: 'Must be greater than 0',
              value: 0.0000000001,
            },
            max: {
              message: `Must be equal to or less than ${currentNearAmount}`,
              value: currentNearAmount,
            },
            valueAsNumber: true,
            required: 'Enter an amount',
          })}
        />

        <Input
          label="Send To"
          placeholder="Account ID"
          error={form.formState.errors.sendToAccountId?.message}
          {...form.register('sendToAccountId', { required: 'Enter an account ID' })}
        />

        <Button label="Continue" variant="affirmative" type="submit" loading={form.formState.isSubmitting} />
      </Flex>
    </Form>
  );
};

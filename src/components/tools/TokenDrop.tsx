import { Button, FileInput, Flex, Form, Input, openToast, Text } from '@near-pagoda/ui';
import { useContext, useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { NearContext } from '../WalletSelector';
import getKeysPair from '@/utils/keyPair';
import { parseNearAmount } from 'near-api-js/lib/utils/format';

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

const TokenDrop = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const { wallet, signedAccountId } = useContext(NearContext);
  const [currentNearAmount, setCurrentNearAmount] = useState(0);

  useEffect(() => {
    if (!wallet || !signedAccountId) return;

    const loadBalance = async () => {
      try {
        const balance = await wallet.getBalance(signedAccountId);
        const requiredGas = 0.00005;
        setCurrentNearAmount(balance - requiredGas);
      } catch (error) {
        console.error(error);
      }
    };

    loadBalance();
  }, [wallet, signedAccountId]);

  // get_drop_information

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!wallet) throw new Error('Wallet has not initialized yet');
    getKeysPair(data.numberLinks)
    try {
      const args = {
        deposit_per_use: parseNearAmount(data.amountPerLink.toString()),
        metadata: JSON.stringify({
            dropName: data.dropName,
        }),
        public_keys: getKeysPair(data.numberLinks),
      };

      // const amount = parseNearAmount(0.1426.toString());
      // if (!amount) throw new Error('Failed to parse amount');
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
                  deposit: parseNearAmount(((0.0426+data.amountPerLink)*data.numberLinks).toString()),
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
        Token Drop
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
            number={{allowDecimal: false, allowNegative: false}}
            placeholder="1 - 50"
            error={errors.numberLinks?.message}
            {...register('numberLinks', {
                min: {
                message: 'Must be greater than 0',
                value: 1
              },
              max: {
                message: `Must be equal to or less than 50`,
                value: 50,
              },
              valueAsNumber: true, 
              required: 'Number of links is required' })}
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
                value: 0.0000000001
              },
              max: {
                message: `Must be equal to or less than ${currentNearAmount}`,
                value: currentNearAmount,
              },
              valueAsNumber: true, 
              required: 'Amount per link is required' })}
          />
          <Button label="Create links" variant="affirmative" type="submit" loading={isSubmitting} />
        </Flex>
      </Form>
    </>
  );
};

export default TokenDrop;

// Arguments: {
//   "drop_id": "7bc5f708-dd9d-4dba-9f02-a117324346b5",
//   "deposit_per_use": "100000000000000000000000",
//   "metadata": "{\"dropName\":\"test\"}",
//   "public_keys": [
//     "ed25519:4JJwGg45WDmU14wsSG87K2Anf1g5wm6Yn1e4hEcfudAX",
//     "ed25519:HKAZwSeN85DgPGUW5JGRRsMe5kPBhCbBqf1qHMNZfdgz"
//   ]
// }

// Arguments: {
//   "drop_id": "7bc5f708-dd9d-4dba-9f02-a117324346b5",
//   "deposit_per_use": "100000000000000000000000",
//   "metadata": "{\"dropName\":\"test\"}",
//   "public_keys": [
//     "ed25519:4JJwGg45WDmU14wsSG87K2Anf1g5wm6Yn1e4hEcfudAX",
//     "ed25519:HKAZwSeN85DgPGUW5JGRRsMe5kPBhCbBqf1qHMNZfdgz"
//   ]
// }

// Arguments: {
//   "drop_id": "1725481443015",
//   "deposit_per_use": "10000000000000000000000",
//   "metadata": "{\"dropName\":\"test\"}",
//   "public_keys": [
//     "ed25519:FT6axDyL39LFE3cVN6PNJhejZZ6XMEDzvksW8uGhi2N5",
//     "ed25519:9H93DK5GedgTgDTabU8qxihELBzNdMH5HRWwCpg2FUoh"
//   ]
// }

// Arguments: {
//   "deposit_per_use": "10000000000000000000000",
//   "metadata": "{\"dropName\":\"test\"}",
//   "public_keys": [
//     "ed25519:Hzy9SMFyudC3bdNVKhwVZ4bCrhYnFaD9syW2bPNKsh6R",
//     "ed25519:3pZ3ue2pWkFfGehej21qPAx2ZK5Nw3gkKvHGSyLuHCZW",
//     "ed25519:3z8WguDt5whWoQ17t2XntvytxtBAL5XWSorD4zjtfeTM",
//     "ed25519:9NM7ohNWzyVd3bqvWrWvxj2PXHQwDHtv9uF9cqy9k7s8",
//     "ed25519:2z41giU3Mv696jDPEWnGmxS4Zp2m8P8nGs2feUHKngEw"
//   ]
// }


// Arguments: {
//   "drop_id": "1725547843208",
//   "deposit_per_use": "10000000000000000000000",
//   "metadata": "{\"dropName\":\"test keypom\"}",
//   "public_keys": [
//     "ed25519:GEzAmNgBE9vLVDfSvReHNSZ8aiPd1d43HMwyKKVGu6Ls",
//     "ed25519:H7wUQgGLeLyKWFJ8aeVUgzbPhjyVjtGnW1gfCfHo2mZp",
//     "ed25519:28F7bHSy73mfUErj2aQyyjRWtDrCGxYXPG6wRdsfE5Zp",
//     "ed25519:211USudaQFT7vBY8ruvyfwymuESCtZnFfFzcAcHY3ucy",
//     "ed25519:6ULFyadfVzoQBYqQLTmqrnQHZmFZtewHYcbFCVJe8KL5"
//   ]
// }
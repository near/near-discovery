import { Button, FileInput, Flex, Form, Grid, Input, openToast, Text } from '@near-pagoda/ui';
import React, { useContext } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

import { NearContext } from '@/components/WalletSelector';

type FormData = {
  total_supply: string;
  name: string;
  symbol: string;
  icon: FileList;
  decimals: number;
};

const FACTORY_CONTRACT = 'tkn.primitives.near';

const MAX_FILE_SIZE = 10 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];

const CreateTokenForm: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const { wallet, signedAccountId } = useContext(NearContext);

  const validateImage = (files: FileList) => {
    if (files.length === 0) return 'Image is required';
    const file = files[0];
    if (file.size > MAX_FILE_SIZE) return 'Image size should be less than 10KB';
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return 'Not a valid image format';
    return true;
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    let base64Image = '';
    if (data.icon[0]) {
      base64Image = await convertToBase64(data.icon[0]);
    }

    const total_supply = BigInt(data.total_supply) * BigInt(Math.pow(10, Number(data.decimals)));

    const args = {
      args: {
        owner_id: signedAccountId,
        total_supply: total_supply.toString(),
        metadata: {
          spec: 'ft-1.0.0',
          name: data.name,
          symbol: data.symbol,
          icon: base64Image,
          decimals: data.decimals,
        },
      },
      account_id: signedAccountId,
    };

    const requiredDeposit = await wallet?.viewMethod({ contractId: FACTORY_CONTRACT, method: 'get_required', args });

    try {
      const result = await wallet?.signAndSendTransactions({
        transactions: [
          {
            receiverId: FACTORY_CONTRACT,
            actions: [
              {
                type: 'FunctionCall',
                params: {
                  methodName: 'create_token',
                  args,
                  gas: '300000000000000',
                  deposit: requiredDeposit,
                },
              },
            ],
          },
        ],
      });

      if (result) {
        const transactionId = result[0].transaction_outcome.id;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        window.open(`https://nearblocks.io/txns/${transactionId}`, '_blank')!.focus();
      }

      openToast({
        type: 'success',
        title: 'Token Created',
        description: `Token ${data.name} (${data.symbol}) created successfully`,
        duration: 5000,
      });
    } catch (error) {
      openToast({
        type: 'error',
        title: 'Error',
        description: 'Failed to create token',
        duration: 5000,
      });
    }
  };

  return (
    <>
      <Text size="text-l" style={{ marginBottom: '12px' }}>
        Mint a Fungible Token
      </Text>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Flex stack gap="l">
          <Grid columns="1fr 1fr" columnsTablet="1fr" columnsPhone="1fr">
            <Input
              label="Total Supply"
              placeholder="e.g., 1000"
              error={errors.total_supply?.message}
              {...register('total_supply', { required: 'Total supply is required' })}
            />
            <Input
              label="Decimals"
              type="number"
              placeholder="e.g., 6"
              error={errors.decimals?.message}
              {...register('decimals', {
                required: 'Decimals is required',
                valueAsNumber: true,
                min: { value: 0, message: 'Decimals must be non-negative' },
                max: { value: 24, message: 'Decimals must be 24 or less' },
              })}
            />
          </Grid>
          <Grid columns="1fr 1fr" columnsTablet="1fr" columnsPhone="1fr">
            <Input
              label="Token Name"
              placeholder="e.g., Test Token"
              error={errors.name?.message}
              {...register('name', { required: 'Token name is required' })}
            />
            <Input
              label="Token Symbol"
              placeholder="e.g., TEST"
              error={errors.symbol?.message}
              {...register('symbol', { required: 'Token symbol is required' })}
            />
          </Grid>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Controller
              control={control}
              name="icon"
              rules={{
                required: 'Image is required',
                validate: validateImage,
              }}
              render={({ field, fieldState }) => (
                <FileInput
                  label="Image Upload"
                  accept={ACCEPTED_IMAGE_TYPES.join(',')}
                  error={fieldState.error?.message}
                  {...field}
                  value={field.value ? Array.from(field.value) : []}
                  onChange={(value: File[] | null) => {
                    const files = value;
                    field.onChange(files);
                  }}
                />
              )}
            />
            <span style={{ fontSize: '0.8rem', color: 'gray' }}>
              Accepted Formats: PNG, JPEG, GIF, SVG | Ideal dimension: 1:1 | Max size: 10kb
            </span>
          </div>

          <Button label="Create Token" variant="affirmative" type="submit" loading={isSubmitting} />
        </Flex>
      </Form>
    </>
  );
};

export default CreateTokenForm;

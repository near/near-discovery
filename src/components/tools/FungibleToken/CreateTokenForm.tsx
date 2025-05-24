import { formatNearAmount } from '@near-js/utils';
import { Button, FileInput, Flex, Form, Grid, Input, openToast, Text } from '@near-pagoda/ui';
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { network } from '@/config';

type FormData = {
  total_supply: string;
  name: string;
  symbol: string;
  icon: FileList;
  decimals: number;
};

const FACTORY_CONTRACT = network.ftContract;

const MAX_FILE_SIZE = 10 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];

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

const CreateTokenForm = ({ reload }: { reload: (delay: number) => void }) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const { viewFunction, callFunction, getBalance, signedAccountId } = useWalletSelector();
  const [requiredDeposit, setRequiredDeposit] = useState('0');

  const symbolAvailable = useCallback(
    async (symbol: string) => {
      try {
        await getBalance(`${symbol}.${FACTORY_CONTRACT}`);
        return `${symbol}.${FACTORY_CONTRACT} already exists`;
      } catch {
        return true;
      }
    },
    [getBalance],
  );

  // Watch all form fields
  const formData = watch();
  const onSubmit = useCallback(
    async ({ total_supply, decimals, icon, name, symbol }: FormData, actuallySubmit: boolean) => {
      if (!signedAccountId) return;

      total_supply = total_supply || '0';
      decimals = decimals || 0;
      name = name || '';
      symbol = symbol || '';
      icon = icon || [false];

      const base64Image = icon[0] ? await convertToBase64(icon[0]) : '';

      const supply = BigInt(total_supply) * BigInt(Math.pow(10, Number(decimals)));

      const args = {
        args: {
          owner_id: signedAccountId,
          total_supply: supply.toString(),
          metadata: {
            spec: 'ft-1.0.0',
            name,
            symbol,
            icon: base64Image,
            decimals,
          },
        },
        account_id: signedAccountId,
      };

      const deposit = (await viewFunction({ contractId: FACTORY_CONTRACT, method: 'get_required', args })) as string;

      setRequiredDeposit(formatNearAmount(deposit, 2));

      if (!actuallySubmit) return;

      let result = false;

      try {
        result = (await callFunction({
          contractId: FACTORY_CONTRACT,
          method: 'create_token',
          args,
          gas: '300000000000000',
          deposit: deposit,
        })) as any;
      } catch (error) {}

      if (result) {
        openToast({
          type: 'success',
          title: 'Token Created',
          description: `Token ${name} (${symbol}) created successfully`,
          duration: 5000,
        });
        reload(5000);
      } else {
        openToast({
          type: 'error',
          title: 'Error',
          description: 'Failed to create token',
          duration: 5000,
        });
      }
    },
    [signedAccountId, viewFunction, callFunction, reload],
  );

  useEffect(() => {
    onSubmit(formData, false);
  }, [onSubmit, formData]);

  return (
    <>
      <Text size="text-l"> Mint a Fungible Token </Text>
      <Text size="text-s" style={{ marginBottom: 'var(--gap-s)' }}>
        This tool allows you to deploy your own NEP-141 smart contract (Fungible Tokens)
      </Text>

      <Form onSubmit={handleSubmit((data) => onSubmit(data, true))}>
        <Flex stack gap="l" style={{ border: '1px solid var(--violet3)', padding: '1rem', borderRadius: '10px' }}>
          <Grid columns="1fr 1fr" columnsTablet="1fr" columnsPhone="1fr">
            <Input
              label="Token Name"
              placeholder="e.g. Test Token"
              error={errors.name?.message}
              {...register('name', { required: 'Token name is required' })}
              disabled={!signedAccountId}
            />
            <Controller
              control={control}
              name="symbol"
              rules={{
                required: 'Symbol is required',
                validate: symbolAvailable,
              }}
              render={({ field, fieldState }) => (
                <Input
                  label="Token Symbol"
                  placeholder="e.g. TEST"
                  error={fieldState.error?.message}
                  {...field}
                  disabled={!signedAccountId}
                />
              )}
            />
          </Grid>
          <Grid columns="1fr 1fr" columnsTablet="1fr" columnsPhone="1fr">
            <Input
              label="Total Supply"
              placeholder="e.g. 1000"
              error={errors.total_supply?.message}
              {...register('total_supply', {
                required: 'Total supply is required',
                pattern: {
                  value: /^[1-9][0-9]*$/,
                  message: 'Total supply must be a whole number greater than 0',
                },
              })}
              disabled={!signedAccountId}
            />
            <Input
              label="Decimals"
              type="number"
              placeholder="e.g. 6"
              error={errors.decimals?.message}
              {...register('decimals', {
                required: 'Decimals is required',
                valueAsNumber: true,
                min: { value: 0, message: 'Decimals must be non-negative' },
                max: { value: 24, message: 'Decimals must be 24 or less' },
              })}
              disabled={!signedAccountId}
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
                  disabled={!signedAccountId}
                />
              )}
            />
            <span style={{ fontSize: '0.8rem', color: 'gray' }}>
              Accepted Formats: PNG, JPEG, GIF, SVG | Ideal dimension: 1:1 | Max size: 10kb
            </span>
          </div>

          <Button
            label={signedAccountId ? `Create Token - Cost: ${requiredDeposit} N` : 'Please login'}
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

export default CreateTokenForm;

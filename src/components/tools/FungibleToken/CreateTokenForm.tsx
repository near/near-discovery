import { NearContext } from '@/components/WalletSelector';
import { Button, FileInput, Flex, Form, Input, openToast } from '@near-pagoda/ui';
import React, { useContext, useState } from 'react';
import type { SubmitHandler} from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
  owner_id: string;
  total_supply: string;
  name: string;
  symbol: string;
  icon: FileList;
  decimals: number;
};

const FACTORY_CONTRACT = 'tkn.primitives.near';

const MAX_FILE_SIZE = 10 * 1024 ;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];

const CreateTokenForm: React.FC = () => {
  const { control, register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

  const { wallet, signedAccountId } = useContext(NearContext);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const validateImage = (files: FileList) => {
    if (files.length === 0) return 'Image is required';
    const file = files[0];
    if (file.size > MAX_FILE_SIZE) return 'Image size should be less than 10KB';
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return 'Not a valid image format';
    return true;
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
    try {
      let base64Image = '';
      if (data.icon[0]) {
        base64Image = await convertToBase64(data.icon[0]);
      }
      const args = {
        args: {
          owner_id: data.owner_id,
          total_supply: data.total_supply,
          metadata: {
            spec: "ft-1.0.0",
            name: data.name,
            symbol: data.symbol,
            icon: base64Image,
            decimals: data.decimals,
          },
        },
        account_id: data.owner_id,
      };

      const requiredDeposit = await wallet?.viewMethod({ contractId: FACTORY_CONTRACT, method: 'get_required', args });

      const result = await wallet?.signAndSendTransactions({
        transactions: [{
          receiverId: FACTORY_CONTRACT,
          actions: [
            {
              type: 'FunctionCall',
              params: {
                methodName: 'create_token',
                args,
                gas: "300000000000000",
                deposit: requiredDeposit
              },
            },
          ],
        }]
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Flex stack gap="l">
        <Input
          label="Owner ID"
          placeholder="e.g., bob.near"
          error={errors.owner_id?.message}
          {...register('owner_id', { required: 'Owner ID is required', value: signedAccountId })}
        />
        <Input
          label="Total Supply"
          placeholder="e.g., 1000000000"
          error={errors.total_supply?.message}
          {...register('total_supply', { required: 'Total supply is required' })}
        />
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
          {...register('symbol', {})}
        />
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
        <Input
          label="Decimals"
          type="number"
          placeholder="e.g., 18"
          error={errors.decimals?.message}
          {...register('decimals', {
            required: 'Decimals is required',
            valueAsNumber: true,
            min: { value: 0, message: 'Decimals must be non-negative' },
            max: { value: 24, message: 'Decimals must be 24 or less' }
          })}
        />
        <Button
          label="Create Token"
          variant="affirmative"
          type="submit"
          loading={isSubmitting}
        />
      </Flex>
    </Form>
  );
};


export default CreateTokenForm;
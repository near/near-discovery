import { formatNearAmount } from '@near-js/utils';
import { Button, FileInput, Flex, Form, Input, openToast, Text } from '@near-pagoda/ui';
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { network } from '@/config';

type FormData = {
  title: string;
  description: string;
  image: FileList;
};

interface IPFSResponse {
  cid: string;
}

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];

const MintNft = ({ reload }: { reload: (delay: number) => void }) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const { callFunction, signedAccountId } = useWalletSelector();
  const [requiredDeposit, setRequiredDeposit] = useState('0');
  const formData = watch();

  const validateImage = (files: FileList) => {
    if (files.length === 0) return 'Image is required';
    const file = files[0];
    if (file.size > MAX_FILE_SIZE) return 'Image size should be less than 5MB';
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return 'Not a valid image format';
    return true;
  };

  const onSubmit = useCallback(
    async ({ image, title, description }: FormData, actuallySubmit: boolean) => {
      let file = '';
      image = image || [false];
      title = title || '';
      description = description || '';

      if (image[0]) {
        const res = await fetch('https://ipfs.near.social/add', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: image[0],
        });
        const fileData: IPFSResponse = await res.json();
        file = fileData.cid;
      }

      const args = {
        receiver_id: signedAccountId,
        token_id: crypto.randomUUID(),
        token_metadata: {
          media: `https://ipfs.near.social/ipfs/${file}`,
          title,
          description,
        },
      };

      const string_args = JSON.stringify(args);

      // TODO: Improve, we estimate the cost as 4 times the cost of storing the args
      const cost_per_byte = '10000000000000000000';
      const estimated_cost = BigInt(string_args.length) * BigInt(cost_per_byte) * BigInt(4);
      setRequiredDeposit(formatNearAmount(estimated_cost.toString(), 2));

      if (!actuallySubmit) return;

      try {
        await callFunction({
          contractId: network.nftContract,
          method: 'nft_mint',
          args,
          gas: '300000000000000',
          deposit: estimated_cost.toString(),
        });

        openToast({
          type: 'success',
          title: 'Token Minted',
          description: 'Your NFT has been minted',
          duration: 5000,
        });

        reload(5000);
      } catch (error) {
        console.error(error);

        openToast({
          type: 'error',
          title: 'Error',
          description: 'Failed to mint token',
          duration: 5000,
        });
      }
    },
    [reload, signedAccountId, callFunction],
  );

  useEffect(() => {
    onSubmit(formData, false);
  }, [onSubmit, formData]);

  return (
    <>
      <Text size="text-l"> Mint a Non-Fungible Token </Text>
      <Text size="text-s" style={{ marginBottom: 'var(--gap-s)' }}>
        This tool allows you to deploy your own NEP-171 smart contract (Non-Fungible Tokens)
      </Text>
      <Form onSubmit={handleSubmit((data) => onSubmit(data, true))}>
        <Flex stack gap="l" style={{ border: '1px solid var(--violet3)', padding: '1rem', borderRadius: '10px' }}>
          <Input
            label="Title"
            placeholder="Enter title"
            error={errors.title?.message}
            {...register('title', { required: 'Title is required' })}
            disabled={!signedAccountId}
          />
          <Input
            label="Description"
            placeholder="Enter description"
            error={errors.description?.message}
            {...register('description', { required: 'Description is required' })}
            disabled={!signedAccountId}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Controller
              control={control}
              name="image"
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
              Accepted Formats: PNG, JPEG, GIF, SVG | Ideal dimension: 1:1 | Max size: 3MB
            </span>
          </div>
          <Button
            variant="affirmative"
            type="submit"
            loading={isSubmitting}
            label={signedAccountId ? `Mint - Cost: ${requiredDeposit} N` : 'Please login'}
            disabled={!signedAccountId}
          />
        </Flex>
      </Form>
    </>
  );
};

export default MintNft;

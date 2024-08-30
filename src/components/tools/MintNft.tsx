import { Button, Flex, Form, Input, openToast, Text } from '@near-pagoda/ui';
import { useContext, useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { NearContext } from '../WalletSelector';

type FormData = {
  title: string;
  description: string;
  image: FileList;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];

const MintNft = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { wallet, signedAccountId } = useContext(NearContext);

  const validateImage = (files: FileList) => {
    if (files.length === 0) return 'Image is required';
    const file = files[0];
    if (file.size > MAX_FILE_SIZE) return 'Image size should be less than 5MB';
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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!wallet) throw new Error('Wallet has not initialized yet');
    console.log(crypto.randomUUID());
    try {
      let file = '';

      if (data.image[0]) {
        const res = await fetch('https://ipfs.near.social/add', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data.image[0],
        });
        file = await res.json();
        file = file.cid;
      }

      const args = {
        receiver_id: signedAccountId,
        token_id: crypto.randomUUID(),
        token_metadata: {
          media: `https://ipfs.near.social/ipfs/${file}`,
          title: data.title,
          description: data.description,
        },
      };

      const string_args = JSON.stringify(args);

      // TODO: Improve, we estimate the cost as 3 times the cost of storing the args
      const cost_per_byte = 10 ** 19;
      const estimated_cost = string_args.length * cost_per_byte * 3;

      const result = await wallet.signAndSendTransactions({
        transactions: [
          {
            receiverId: storeSelected.name,
            actions: [
              {
                type: 'FunctionCall',
                params: {
                  methodName: 'nft_mint',
                  args,
                  gas: '300000000000000',
                  deposit: estimated_cost,
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
      <Text size="text-l" style={{marginBottom:"12px"}}> Mint NFT </Text>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Flex stack gap="l">
          <Input
            label="Title"
            placeholder="Enter title"
            error={errors.title?.message}
            {...register('title', { required: 'Title is required' })}
          />
          <Input
            label="Description"
            placeholder="Enter description"
            error={errors.description?.message}
            {...register('description', { required: 'Description is required' })}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="image">Image Upload</label>
            <input
              type="file"
              id="image"
              accept={ACCEPTED_IMAGE_TYPES.join(',')}
              {...register('image', {
                required: 'Image is required',
                validate: validateImage,
              })}
              onChange={onImageChange}
            />
            {errors.image && <span style={{ color: 'red' }}>{errors.image.message}</span>}
            {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
            <span style={{ fontSize: '0.8rem', color: 'gray' }}>
              Accepted Formats: PNG, JPEG, GIF, SVG | Ideal dimension: 1:1 | Max size: 5MB
            </span>
          </div>
          <Button label="Mint me" variant="affirmative" type="submit" loading={isSubmitting} />
        </Flex>
      </Form>
    </>
  );
};

export default MintNft;

import { Button, FileInput, Flex, Form, Grid, Input, openToast, Text } from '@near-pagoda/ui';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import React, { useCallback, useContext, useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { NearContext } from '@/components/wallet-selector/WalletSelector';
import { network } from '@/config';

import LabelWithTooltip from '../Shared/LabelWithTooltip';

type FormData = {
  display_name: string;
  account_prefix: string;
  description: string;
  councils: string[];
  logo: FileList;
  cover: FileList;
};

const KILOBYTE = 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const DEFAULT_LOGO_CID = 'bafkreiad5c4r3ngmnm7q6v52joaz4yti7kgsgo6ls5pfbsjzclljpvorsu';
const DEFAULT_COVER_CID = 'bafkreicd7wmjfizslx72ycmnsmo7m7mnvfsyrw6wghsaseq45ybslbejvy';

const ACCOUNT_ID_REGEX = /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/;

/**
 * Validates the Account ID according to the NEAR protocol
 * [Account ID rules](https://nomicon.io/DataStructures/Account#account-id-rules).
 *
 * @param accountId - The Account ID string you want to validate.
 */
export function validateAccountId(accountId: string): boolean {
  return accountId.length >= 2 && accountId.length <= 64 && ACCOUNT_ID_REGEX.test(accountId);
}

function objectToBase64(obj: any): string {
  return btoa(JSON.stringify(obj));
}

/**
 *
 * @param file File
 * @returns IPFS CID
 */
async function uploadFileToIpfs(file: File): Promise<string> {
  const res = await fetch('https://ipfs.near.social/add', {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: file,
  });
  console.log('res', res.ok);
  const fileData: { cid: string } = await res.json();
  console.log('res json', fileData);
  return fileData.cid;
}

const FACTORY_CONTRACT = network.daoContract;
const REQUIRED_DEPOSIT = '6'; // 6 Near

type Props = {
  reload: (delay: number) => void;
};

const CreateDaoForm = ({ reload }: Props) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    mode: 'all',
  });
  const { fields, append, remove, prepend } = useFieldArray({
    // @ts-expect-error don't know error
    name: 'councils',
    control: control,
  });

  const { wallet, signedAccountId } = useContext(NearContext);

  const isAccountPrefixAvailable = useCallback(
    async (account_prefix: string) => {
      // we use regex explicitly here as one symbol account_prefix is allowed
      const isValidAccountPrefix = ACCOUNT_ID_REGEX.test(account_prefix);
      if (!isValidAccountPrefix) return 'Sub-account name contains unsupported symbols';

      const doesAccountPrefixIncludeDots = account_prefix.includes('.');
      if (doesAccountPrefixIncludeDots) return 'Sub-account name must be without dots';

      const accountId = `${account_prefix}.${FACTORY_CONTRACT}`;
      const isValidAccount = validateAccountId(accountId);
      if (!isValidAccount) return `Account name is too long`;

      try {
        await wallet?.getBalance(accountId);
        return `${accountId} already exists`;
      } catch {
        return true;
      }
    },
    [wallet],
  );

  const isCouncilAccountNameValid = useCallback((accountId: string) => {
    if (validateAccountId(accountId)) return true;

    return `Account name is invalid`;
  }, []);

  const addCouncil = useCallback(() => {
    append('');
  }, [append]);

  const removeCouncilAtIndex = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove],
  );

  const isImageFileValid = useCallback((files: FileList, maxFileSize: number, allowedFileTypes: string[]) => {
    // image is non-required
    if (!files || files.length === 0) return true;

    const file = files[0];
    if (file.size > maxFileSize) return 'Image is too big';
    if (!allowedFileTypes.includes(file.type)) return 'Not a valid image format';

    return true;
  }, []);

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (!isValid) return;

      if (!signedAccountId || !wallet) return;

      const logoFile = data.logo?.[0];
      const logoCid = logoFile ? await uploadFileToIpfs(logoFile) : DEFAULT_LOGO_CID;

      const coverFile = data.cover?.[0];
      const coverCid = coverFile ? await uploadFileToIpfs(coverFile) : DEFAULT_COVER_CID;

      const deposit = parseNearAmount(REQUIRED_DEPOSIT) as string;

      const metadataBase64 = objectToBase64({
        displayName: data.display_name,
        flagLogo: `https://ipfs.near.social/ipfs/${logoCid}`,
        flagCover: `https://ipfs.near.social/ipfs/${coverCid}`,
      });
      const argsBase64 = objectToBase64({
        config: {
          name: data.account_prefix,
          purpose: data.description,
          metadata: metadataBase64,
        },
        policy: Array.from(new Set(data.councils)),
      });

      const args = {
        name: data.account_prefix,
        // base64-encoded args to be passed in "new" function
        args: argsBase64,
      };

      let result = false;

      try {
        result = await wallet?.callMethod({
          contractId: FACTORY_CONTRACT,
          method: 'create',
          args,
          gas: '300000000000000',
          deposit: deposit,
        });
      } catch (error) {}

      if (result) {
        // clean form data
        reset();

        openToast({
          type: 'success',
          title: 'DAO Created',
          description: `DAO ${data.display_name} was created successfully`,
          duration: 5000,
        });
        reload(2000); // in 2 seconds
      } else {
        openToast({
          type: 'error',
          title: 'Error',
          description: 'Failed to create DAO',
          duration: 5000,
        });
      }
    },
    [isValid, signedAccountId, wallet, reset, reload],
  );

  // adds current user as a council by default
  useEffect(() => {
    if (!signedAccountId) return;

    prepend(signedAccountId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signedAccountId]);

  return (
    <>
      <Text size="text-l"> Create a Decentralized Autonomous Organization </Text>
      <Text size="text-s">This tool allows you to deploy your own Sputnik DAO smart contract (DAOs)</Text>

      <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <Flex stack gap="s" style={{ border: '1px solid var(--violet3)', padding: '1rem', borderRadius: '10px' }}>
          <Text size="text-base"> Public Information </Text>
          <Flex stack gap="m" style={{ border: '1px solid var(--violet3)', padding: '1rem', borderRadius: '10px' }}>
            <Grid columns="1fr 1fr" columnsTablet="1fr" columnsPhone="1fr">
              <Input
                label="Organization Name"
                placeholder="Enter Public Name"
                error={errors.display_name?.message}
                {...register('display_name', { required: 'Display name is required' })}
                disabled={!signedAccountId}
                required
              />
              <Controller
                control={control}
                name="account_prefix"
                rules={{
                  required: 'Sub-account name is required',
                  validate: isAccountPrefixAvailable,
                }}
                render={({ field, fieldState }) => (
                  <Input
                    // @ts-expect-error it expects string, not ReactElement
                    label={
                      <LabelWithTooltip
                        label="Account ID"
                        tooltip="Name of the sub-account to which contract will be deployed"
                      />
                    }
                    placeholder="Enter account name"
                    error={fieldState.error?.message}
                    {...field}
                    disabled={!signedAccountId}
                    assistive={field.value && `${field.value}.${FACTORY_CONTRACT} will be your DAO account`}
                    required
                  />
                )}
              />
            </Grid>

            <Input
              label="Description"
              placeholder="Enter description"
              error={errors.description?.message}
              {...register('description', { required: 'Description is required' })}
              disabled={!signedAccountId}
            />
          </Flex>

          <Text size="text-base" style={{ marginTop: '1rem' }}>
            Councils
          </Text>
          <Flex stack gap="m" style={{ border: '1px solid var(--violet3)', padding: '1rem', borderRadius: '10px' }}>
            {fields.map((field, index) => (
              <Grid key={field.id} columns="6fr 1fr">
                <Controller
                  control={control}
                  name={`councils.${index}`}
                  rules={{
                    required: 'Account name is required',
                    validate: isCouncilAccountNameValid,
                  }}
                  render={({ field, fieldState }) => (
                    <Input
                      placeholder="Enter account name"
                      error={fieldState.error?.message}
                      {...field}
                      disabled={!signedAccountId}
                      required={true}
                    />
                  )}
                />
                <Button
                  label="Remove"
                  onClick={() => removeCouncilAtIndex(index)}
                  disabled={!signedAccountId || (index === 0 && fields.length === 1)}
                />
              </Grid>
            ))}
            <Button label="Add" onClick={addCouncil} disabled={!signedAccountId} />
          </Flex>

          <Text size="text-base" style={{ marginTop: '1rem' }}>
            Design
          </Text>
          <Flex stack gap="m" style={{ border: '1px solid var(--violet3)', padding: '1rem', borderRadius: '10px' }}>
            <Grid columns="1fr 1fr" justify="space-between">
              <Controller
                control={control}
                name="logo"
                rules={{
                  required: false,
                  validate: (files) => isImageFileValid(files, 500 * KILOBYTE, ALLOWED_IMAGE_TYPES),
                }}
                render={({ field, fieldState }) => (
                  <div>
                    <FileInput
                      label="Logo"
                      accept={'image/jpeg,image/png,image/webp'}
                      error={fieldState.error?.message}
                      {...field}
                      value={field.value ? Array.from(field.value) : []}
                      onChange={(value: File[] | null) => {
                        const files = value;
                        field.onChange(files);
                      }}
                      disabled={!signedAccountId}
                    />
                    <span style={{ fontSize: '0.8rem', color: 'gray' }}>
                      Accepted Formats: PNG, JPEG, WebP | Ideal dimension: 1:1 | Max size: 500kb
                    </span>
                  </div>
                )}
              />
              <Controller
                control={control}
                name="cover"
                rules={{
                  required: false,
                  validate: (files) => isImageFileValid(files, 3_000 * KILOBYTE, ALLOWED_IMAGE_TYPES),
                }}
                render={({ field, fieldState }) => (
                  <div>
                    <FileInput
                      label="Cover"
                      accept={'image/jpeg,image/png,image/webp'}
                      error={fieldState.error?.message}
                      {...field}
                      value={field.value ? Array.from(field.value) : []}
                      onChange={(value: File[] | null) => {
                        const files = value;
                        field.onChange(files);
                      }}
                      disabled={!signedAccountId}
                    />
                    <span style={{ fontSize: '0.8rem', color: 'gray' }}>
                      Accepted Formats: PNG, JPEG, WebP | Ideal dimension: 2:1 | Max size: 3mb
                    </span>
                  </div>
                )}
              />
            </Grid>
          </Flex>

          <Button
            label={signedAccountId ? `Create DAO - Cost: ${REQUIRED_DEPOSIT} N` : 'Please login'}
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

export default CreateDaoForm;

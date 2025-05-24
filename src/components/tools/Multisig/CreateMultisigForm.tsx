import { parseNearAmount } from '@near-js/utils';
import { Button, Flex, Form, Grid, Input, openToast, Text } from '@near-pagoda/ui';
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import React, { useCallback, useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { network } from '@/config';

import LabelWithTooltip from '../Shared/LabelWithTooltip';

type FormData = {
  num_confirmations: number;
  account_prefix: string;
  members: string[];
};

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

const FACTORY_CONTRACT = network.multisigContract;
const REQUIRED_DEPOSIT = '3.5'; // Near tokens

const CreateMultisigForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    mode: 'all',
    defaultValues: {
      account_prefix: '',
      members: [],
      num_confirmations: 1,
    },
  });
  const { fields, append, remove, prepend } = useFieldArray({
    // @ts-expect-error don't know error
    name: 'members',
    control: control,
  });

  const { getBalance, callFunction, signedAccountId } = useWalletSelector();

  const isAccountPrefixAvailable = useCallback(
    async (accountPrefix: string) => {
      // we use regex explicitly here as one symbol account_prefix is allowed
      const isValidAccountPrefix = ACCOUNT_ID_REGEX.test(accountPrefix);
      if (!isValidAccountPrefix) return 'Sub-account name contains unsupported symbols';

      const doesAccountPrefixIncludeDots = accountPrefix.includes('.');
      if (doesAccountPrefixIncludeDots) return 'Sub-account name must be without dots';

      const accountId = `${accountPrefix}.${FACTORY_CONTRACT}`;
      const isValidAccount = validateAccountId(accountId);
      if (!isValidAccount) return `Account name is too long`;

      try {
        await getBalance(accountId);
        return `${accountId} already exists`;
      } catch {
        return true;
      }
    },
    [getBalance],
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

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (!isValid) return;

      if (!signedAccountId) return;

      const deposit = parseNearAmount(REQUIRED_DEPOSIT) as string;

      const args = {
        name: data.account_prefix,
        members: data.members.map((member) => ({ account_id: member })),
        num_confirmations: data.num_confirmations,
      };

      let result = false;

      try {
        result = (await callFunction({
          contractId: FACTORY_CONTRACT,
          method: 'create',
          args,
          gas: '300000000000000', // 300 TGas
          deposit: deposit,
        })) as any;
      } catch (error) {}

      if (result) {
        openToast({
          type: 'success',
          title: 'DAO Created',
          description: `Multisig ${data.account_prefix} was created successfully`,
          duration: 5000,
        });
      } else {
        openToast({
          type: 'error',
          title: 'Error',
          description: 'Failed to create Multisig',
          duration: 5000,
        });
      }
    },
    [isValid, signedAccountId, callFunction],
  );

  // adds current user as a council by default
  useEffect(() => {
    if (!signedAccountId) return;

    prepend(signedAccountId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signedAccountId]);

  return (
    <>
      <Text size="text-l"> Create a Multi-Signature Contract</Text>
      <Text size="text-s" style={{ marginBottom: 'var(--gap-s)' }}>
        This tool allows you to roll out your own Multisig smart contract
      </Text>

      <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <Flex stack gap="s" style={{ border: '1px solid var(--violet3)', padding: '1rem', borderRadius: '10px' }}>
          <Text size="text-base"> General Settings </Text>
          <Flex stack gap="m" style={{ border: '1px solid var(--violet3)', padding: '1rem', borderRadius: '10px' }}>
            <Grid columns="2fr 1fr">
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
                    assistive={field.value && `${field.value}.${FACTORY_CONTRACT} will be your Multisig account`}
                    required
                  />
                )}
              />
              <Input
                // @ts-expect-error it expects string, not ReactElement
                label={
                  <LabelWithTooltip
                    label="Number of Confirmations"
                    tooltip="Minimal number of confirmations required to authorize requests"
                  />
                }
                type="number"
                placeholder="e.g. 1"
                error={errors.num_confirmations?.message}
                {...register('num_confirmations', {
                  required: 'Number of confirmations is required',
                  valueAsNumber: true,
                  validate: (value, formValues) => {
                    if (!Number.isSafeInteger(value)) return 'Value must be an integer';

                    if (value < 1) return 'Value must be bigger than 1';

                    const membersCount = formValues.members.length;
                    if (value > membersCount) return 'Value cannot exceed number of members';

                    return undefined;
                  },
                })}
                disabled={!signedAccountId}
              />
            </Grid>
          </Flex>

          <Text size="text-base" style={{ marginTop: '1rem' }}>
            Members
          </Text>
          <Flex stack gap="m" style={{ border: '1px solid var(--violet3)', padding: '1rem', borderRadius: '10px' }}>
            {fields.map((field, index) => (
              <Grid key={field.id} columns="6fr 1fr">
                <Controller
                  control={control}
                  name={`members.${index}`}
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

          <Button
            label={signedAccountId ? `Create Multisig - Cost: ${REQUIRED_DEPOSIT} N` : 'Please login'}
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

export default CreateMultisigForm;

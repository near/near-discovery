import { Button } from '@near-pagoda/ui';
import { Text } from '@near-pagoda/ui';
import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { useFlags } from '@/hooks/useFlags';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGrid = styled.label`
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

type FormData = {
  bosLoaderUrl: string;
};

const FlagsPage: NextPageWithLayout = () => {
  const [flags, setFlags] = useFlags();
  const form = useForm<FormData>();

  useEffect(() => {
    form.setValue('bosLoaderUrl', flags?.bosLoaderUrl || '');
  }, [form, flags]);

  const submitHandler: SubmitHandler<FormData> = (data) => {
    setFlags(data);
  };

  return (
    <Container>
      <Text as="h1" size="text-3xl">
        Flags
      </Text>

      <Form onSubmit={form.handleSubmit(submitHandler)}>
        <InputGrid>
          <Text as="span" size="text-s" weight="500">
            BOS Loader Url
          </Text>

          <input
            className="form-control"
            placeholder="e.g. http://127.0.0.1:3030/, https://my-loader.ngrok.io"
            id="bosLoaderUrl"
            {...form.register('bosLoaderUrl')}
          />
        </InputGrid>

        <Button label="Save Flags" variant="affirmative" size="large" type="submit" style={{ marginLeft: 'auto' }} />
      </Form>
    </Container>
  );
};

FlagsPage.getLayout = useDefaultLayout;

export default FlagsPage;

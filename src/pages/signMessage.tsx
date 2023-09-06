import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { Button } from '@/components/lib/Button';
import { Text } from '@/components/lib/Text';
import { useClearCurrentComponent } from '@/hooks/useClearCurrentComponent';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
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

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const SignMessagePage: NextPageWithLayout = () => {
  const { register, handleSubmit } = useForm();

  const requestSignMessage = useAuthStore((store) => store.requestSignMessage);
  useClearCurrentComponent();

  const onSubmit = handleSubmit(async ({ msg }) => {
    requestSignMessage(msg);
  });

  return (
    <Container className="container-xl">
      <Text as="h1" font="text-3xl">
        Test sign message
      </Text>

      <Form onSubmit={onSubmit}>
        <InputGrid>
          <Text as="label" font="text-s" weight="500" htmlFor="msg">
            Message to sign
          </Text>

          <input
            className="form-control"
            placeholder="e.g. this could be literally anything"
            id="msg"
            {...register('msg')}
          />
        </InputGrid>

        <Button label="Sign Message" variant="affirmative" size="large" type="submit" style={{ marginLeft: 'auto' }} />
      </Form>
    </Container>
  );
};

SignMessagePage.getLayout = useDefaultLayout;

export default SignMessagePage;

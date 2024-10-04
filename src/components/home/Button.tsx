import { Button as Btn } from '@near-pagoda/ui';
import styled from 'styled-components';

export const Button = styled(Btn)`
  &[data-variant='primary'][data-fill='solid']:hover {
    --button-color-background: var(--violet8);
  }

  &[data-variant='primary'][data-fill='solid'] {
    --button-color-background: var(--violet9);
    --button-color-border: var(--sand12);
    --button-color-text: var(--bs-body-bg);
    --button-color-icon: var(--bs-body-bg);
    border: 0;
  }
`;

export const BigButton = styled(Button)`
  &[data-variant='primary'][data-fill='solid'] {
    --button-color-background: var(--violet9);
    --button-color-border: var(--sand12);
    --button-color-text: var(--bs-body-bg);
    --button-color-icon: var(--bs-body-bg);
    border: 0;
    height: 3rem;
    border-radius: 0.8rem;
  }
`;

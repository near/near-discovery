import * as Primitive from '@radix-ui/react-tooltip';
import styled from 'styled-components';

export const Content = styled(Primitive.Content)`
  border-radius: 0.25rem;
  padding: 0.3rem 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--sand12);
  background-color: var(--white);
  z-index: 1000;
  max-width: 20rem;
  font-size: 0.8rem;
  line-height: 1.5;
  word-break: break-word;
  font-family: sans-serif;
  box-shadow: 0 0 0 1px var(--sand6), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

export const ArrowBorder = styled(Primitive.Arrow)`
  fill: var(--sand6);
  stroke: var(--sand6);
  stroke-width: 2px;
  margin-top: 1px;
  margin-right: 1px;

  [data-side='bottom'] &,
  [data-side='left'] & {
    margin-right: -1px;
  }
`;

export const ArrowFill = styled(Primitive.Arrow)`
  fill: var(--white);
`;

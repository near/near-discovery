import { memo } from 'react';
import styled from 'styled-components';

const InputLabel = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: rgba(151, 154, 190, 0.5);
`;

const Select = ({ label }: { label: string }) => {
  return <InputLabel>{label}</InputLabel>;
};

export default memo(Select);

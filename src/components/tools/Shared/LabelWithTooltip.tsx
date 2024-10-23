import { Tooltip } from '@near-pagoda/ui';
import { Question } from '@phosphor-icons/react';
import React from 'react';

interface Props {
  label: string;
  tooltip: string;
}

const LabelWithTooltip: React.FC<Props> = ({ label, tooltip }: Props) => {
  return (
    <span style={{ display: 'flex' }}>
      {label}
      <Tooltip content={tooltip}>
        <Question color="gray" size="1rem" style={{ marginLeft: '0.25rem' }} />
      </Tooltip>
    </span>
  );
};

export default LabelWithTooltip;

import React from 'react';

import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';

type Props = {
  focusChange: (value: boolean) => void;
  term: string;
};

export const TypeAheadDropdown = (props: Props) => {
  const components = useBosComponents();

  return (
    <div
      tabIndex={-1}
      onFocus={() => {
        props.focusChange(true);
      }}
      onBlur={() => {
        props.focusChange(false);
      }}
    >
      <VmComponent
        src={components.search.typeAheadDropdown}
        props={{ term: props.term, focusChange: props.focusChange }}
      />
    </div>
  );
};

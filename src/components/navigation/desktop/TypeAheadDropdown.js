import React from 'react';

import { VmComponent } from '@/components/client/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';

const TypeAheadDropdown = (props) => {
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
      <VmComponent src={components.search.typeAheadDropdown} props={{ term: props.term }} />
    </div>
  );
};

export default TypeAheadDropdown;

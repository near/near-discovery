import React from 'react';

import { VmComponent } from '@/components/client/VmComponent';
import { useWidgets } from '@/hooks/useWidgets';

const TypeAheadDropdown = (props) => {
  const widgets = useWidgets();

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
      <VmComponent src={widgets.search.typeAheadDropdown} props={{ term: props.term }} />
    </div>
  );
};

export default TypeAheadDropdown;

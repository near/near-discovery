import React from 'react';

import { VmWidgetWrapper } from '@/components/client/VmWidgetWrapper';

const TypeAheadDropdown = (props) => {
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
      <VmWidgetWrapper src={props.widgetSrc} props={{ term: props.term }} />
    </div>
  );
};

export default TypeAheadDropdown;

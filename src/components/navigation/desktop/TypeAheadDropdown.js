import React from 'react';

import { VmWidgetWrapper } from '@/components/client/VmWidgetWrapper';
import useRedirectMap from '@/hooks/useRedirectMap';

const TypeAheadDropdown = (props) => {
  const [shouldWaitForMap, redirectMap] = useRedirectMap();

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
      {(!shouldWaitForMap || redirectMap) && (
        <VmWidgetWrapper config={{ redirectMap }} src={props.widgetSrc} props={{ term: props.term }} />
      )}
    </div>
  );
};

export default TypeAheadDropdown;

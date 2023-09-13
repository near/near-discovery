import React from 'react';
import styled from 'styled-components';

import { VmComponent } from '@/components/vm/VmComponent';
// import { useBosComponents } from '@/hooks/useBosComponents';

const StyledNotificationButton = styled.div`
  margin: 0 15px;
  height: 46px;
  width: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// just for preview
const PreviewItems = () => (
  <div className='mx-2'>
    <p>Some really important notification with long content</p>
    <p>Some really important notification with long content</p>
    <p>Some really important notification with long content</p>
    <p>Some really important notification with long content</p>
    <p>Some really important notification with long content</p>
    <p>Some really important notification with long content</p>
    <p>Some really important notification with long content</p>
    <p>Some really important notification with long content</p>
    <p>Some really important notification with long content</p>
    <p>Some really important notification with long content</p>
  </div>
);

export function NotificationButton({ preview = false }) {
  // const components = useBosComponents();

  return (
    <StyledNotificationButton className="nav-notification-button">
      <VmComponent
        src="sheleg3.testnet/widget/NearOrg.Notifications.NotificationButton"
        props={{
          preview,
          previewItems: <PreviewItems />
        }}
      />
      {/* <VmComponent src={components.notificationButton} /> */}
    </StyledNotificationButton>
  );
}

import React from 'react';
import styled from 'styled-components';

import { VmComponent } from '@/components/client/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';

const StyledNotificationButton = styled.div`
  margin: 0 15px;
  border: 0.5px solid #e3e3e0;
  background-color: #f3f3f2;
  height: 46px;
  width: 46px;
  border-radius: 50%;

  > div,
  a {
    width: 100%;
    height: 100%;
  }

  a {
    color: #1b1b18 !important;
    background-color: #f3f3f2 !important;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 18px !important;
    }
  }

  :hover {
    a,
    i {
      color: white;
    }
  }
`;

export function NotificationButton({ onMouseEnter }) {
  const components = useBosComponents();

  return (
    <StyledNotificationButton className="nav-notification-button" onMouseOver={onMouseEnter}>
      <VmComponent src={components.notificationButton} />
    </StyledNotificationButton>
  );
}

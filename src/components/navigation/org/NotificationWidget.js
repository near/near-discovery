import React from 'react';
import styled from 'styled-components';

import { VmWidgetWrapper } from '@/components/client/VmWidgetWrapper';

const StyledNotificationWidget = styled.div`
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

export function NotificationWidget({ notificationButtonSrc, onMouseEnter }) {
  return (
    <StyledNotificationWidget className="nav-notification-widget" onMouseOver={onMouseEnter}>
      <VmWidgetWrapper src={notificationButtonSrc} />
    </StyledNotificationWidget>
  );
}

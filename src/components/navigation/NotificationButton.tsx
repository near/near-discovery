import React from 'react';
import styled from 'styled-components';

import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';

const Button = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: #2b2f31;
  color: #ecedee;
  transition: all 200ms;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;

  &:hover {
    color: #fff;
    background: rgb(60 65 68);
  }

  &:focus {
    box-shadow: 0 0 0 1px #fff;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  span {
    min-width: 13px;
    height: 13px;
    padding: 0 3px;
    display: block;
    color: #fff;
    background: #e5484d;
    border-radius: 100px;
    font-size: 10px;
    line-height: 13px;
    text-align: center;
    font-weight: 600;
    position: absolute;
    top: -2px;
    right: -1px;
  }
`;

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

export function NotificationButton() {
  const components = useBosComponents();

  const nHref = components.nearOrg.notifications.page;

  return (
    <StyledNotificationButton className="nav-notification-button">
      <Button href={nHref} aria-label="View Notifications">
        <svg viewBox="0 0 25 24" fill="none">
          <path
            d="M5.60205 9.74986C5.6008 8.86072 5.77547 7.98011 6.11601 7.15876C6.45654 6.33741 6.95622 5.59155 7.58624 4.96414C8.21627 4.33673 8.9642 3.84016 9.78696 3.50304C10.6097 3.16592 11.491 2.99491 12.3802 2.99986C16.0927 3.02799 19.0645 6.11236 19.0645 9.83424V10.4999C19.0645 13.8561 19.7677 15.8061 20.3864 16.8749C20.4521 16.9887 20.4868 17.1178 20.4869 17.2492C20.487 17.3806 20.4526 17.5098 20.3871 17.6237C20.3216 17.7377 20.2273 17.8324 20.1136 17.8984C20 17.9644 19.871 17.9994 19.7395 17.9999H4.92705C4.79562 17.9994 4.66662 17.9644 4.55297 17.8984C4.43933 17.8324 4.34502 17.7377 4.27951 17.6237C4.21399 17.5098 4.17957 17.3806 4.17969 17.2492C4.1798 17.1178 4.21446 16.9887 4.28017 16.8749C4.89892 15.8061 5.60205 13.8561 5.60205 10.4999V9.74986Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.33331 18V18.75C9.33331 19.5456 9.64938 20.3087 10.212 20.8713C10.7746 21.4339 11.5377 21.75 12.3333 21.75C13.129 21.75 13.892 21.4339 14.4546 20.8713C15.0172 20.3087 15.3333 19.5456 15.3333 18.75V18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      {/* <VmComponent src={components.notificationButton} /> */}
    </StyledNotificationButton>
  );
}

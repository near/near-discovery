import React from 'react';

import { post } from '@/utils/http';

export const report = ({ address, code }: { address: string; code: string }) => {
  post('/track', { address, code });
};

type OnClickEvent = (message: any) => void;

interface InitReactTrack {
  onClickEvent?: OnClickEvent;
}

const getReactFCInitializer = ({ onClickEvent }: InitReactTrack) => {
  const originalCreateElement = React.createElement;

  const propsWithTrackEvents = function (props: any) {
    if (props['data-bp']) {
      const reactClick = props.onClick;
      props.onClick = (e: any) => {
        onClickEvent && onClickEvent(props['data-bp']);
        reactClick && reactClick(e);
      };
    }
    return props;
  };
  // @ts-ignore
  React.createElement = function () {
    const args = Array.prototype.slice.call(arguments);

    let props = args[1];
    if (props && props['data-bp']) {
      props = propsWithTrackEvents(props || {});
    }
    // @ts-ignore
    return originalCreateElement.apply(null, args);
  };
};

export const initReactTrack = ({ onClickEvent }: InitReactTrack) => getReactFCInitializer({ onClickEvent });

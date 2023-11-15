import React from 'react';

export default function MainLoader({ mainLoader }) {
  return (
    mainLoader && (
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: '0px',
          background: '#fff',
          zIndex: '1000',
        }}
      ></div>
    )
  );
}

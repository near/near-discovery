import { memo } from 'react';

const Steps = ({ step }: { step: number }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
      <rect y="8.4209" width="4.21052" height="5.05262" rx="1" fill="#EBF479" />
      <rect
        opacity={step > 1 ? '1' : '0.3'}
        x="5.89478"
        y="5.05371"
        width="4.21052"
        height="8.42104"
        rx="1"
        fill="#EBF479"
      />
      <rect opacity={step > 2 ? '1' : '0.3'} x="11.7896" width="4.21052" height="13.4737" rx="1" fill="#EBF479" />
    </svg>
  );
};

export default memo(Steps);

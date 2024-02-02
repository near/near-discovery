import { memo, useState } from 'react';
import Modal from '@/components/Modal';
import SwapPanel from './SwapPanel';
import BridgePanel from './BridgePanel';
import LendingPanel from './LendingPanel';
import LiquidityPanel from './LiquidityPanel';

const Panel = memo(({ type, chainId, setTitle, ...restProps }: any) => {
  if (type === 'swap') {
    return (
      <SwapPanel
        {...restProps}
        chainId={chainId}
        onLoad={(_title: string) => {
          setTitle(_title);
        }}
      />
    );
  }
  if (type === 'lending') {
    return (
      <LendingPanel
        {...restProps}
        chainId={chainId}
        onLoad={(_title: string) => {
          setTitle(_title);
        }}
      />
    );
  }

  if (type === 'liquidity') {
    return (
      <LiquidityPanel
        {...restProps}
        chainId={chainId}
        onLoad={(_title: string) => {
          setTitle(_title);
        }}
      />
    );
  }

  if (type === 'bridge') {
    return (
      <BridgePanel
        {...restProps}
        chainId={chainId}
        onLoad={(_title: string) => {
          setTitle(_title);
        }}
      />
    );
  }
});

const ExecutionModal = ({ open, type, chainId, onClose, ...restProps }: any) => {
  const [title, setTitle] = useState('');

  return (
    <Modal
      title={title}
      display={open}
      width={450}
      content={<Panel type={type} chainId={chainId} setTitle={setTitle} {...restProps} />}
      onClose={onClose}
    />
  );
};

export default ExecutionModal;

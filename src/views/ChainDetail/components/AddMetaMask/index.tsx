import { memo } from 'react';
import { useSetChain } from '@web3-onboard/react';
import { StyledAddMeta } from './styles';

const AddMetaMask = ({ chainId }: any) => {
  const [{}, setChain] = useSetChain();
  return (
    <StyledAddMeta
      onClick={() => {
        setChain({ chainId: `0x${chainId.toString(16)}` });
      }}
    >
      <div>Add to MetaMask</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
        <path
          d="M0.646447 5.64645C0.451184 5.84171 0.451184 6.15829 0.646447 6.35355C0.841709 6.54882 1.15829 6.54882 1.35355 6.35355L0.646447 5.64645ZM6.5 1C6.5 0.723857 6.27614 0.5 6 0.5L1.5 0.5C1.22386 0.5 1 0.723857 1 1C1 1.27614 1.22386 1.5 1.5 1.5L5.5 1.5L5.5 5.5C5.5 5.77614 5.72386 6 6 6C6.27614 6 6.5 5.77614 6.5 5.5L6.5 1ZM1.35355 6.35355L6.35355 1.35355L5.64645 0.646446L0.646447 5.64645L1.35355 6.35355Z"
          fill="#979ABE"
        />
      </svg>
    </StyledAddMeta>
  );
};

export default memo(AddMetaMask);

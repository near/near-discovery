import { Text } from '@near-pagoda/ui';
import Image from 'next/image';
import styled from 'styled-components';

import MintBase from '@/assets/images/mintbase.svg';
import Paras from '@/assets/images/paras.svg';

const StyledButton = styled.a`
  background-color: #1e2030;
  color: #fff;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #101124;
  }
`;

const MintbaseButton = styled(StyledButton)`
  background-color: #1e2030;
  &:hover {
    background-color: #282b3b;
  }
`;

const ParasButton = styled(StyledButton)`
  background-color: #050330;
  &:hover {
    background-color: #101438;
  }
`;

const CommunityTools = () => {
  return (
    <>
      <Text>For more advanced options please use tools created by the community:</Text>
      <MintbaseButton href="https://www.mintbase.xyz/" target="_blank">
        <Image alt="Mintbase Logo" src={MintBase} height={20} />{' '}
      </MintbaseButton>
      <ParasButton href="https://paras.id/" target="_blank">
        <Image alt="Paras Logo" src={Paras} height={18} />{' '}
      </ParasButton>
    </>
  );
};

export default CommunityTools;

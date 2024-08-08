import styled from 'styled-components';

import { useBosComponents } from '@/hooks/useBosComponents';

import { VmComponent } from './vm/VmComponent';
import { useCookieStore } from '@/stores/cookieData';

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const CookiePrompt = () => {
  const cookieData = useCookieStore((state) => state.cookieData);
  const components = useBosComponents();
  return (
    <Wrapper>
      <VmComponent src={components.nearOrg.cookiePrompt} props={{ cookiesAcknowleged: cookieData }} />
    </Wrapper>
  );
};

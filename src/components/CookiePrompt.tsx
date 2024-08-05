import styled from 'styled-components';

import { useBosComponents } from '@/hooks/useBosComponents';
import { useCookiePreferences } from '@/hooks/useCookiePreferences';

import { VmComponent } from './vm/VmComponent';

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const CookiePrompt = () => {
  const cookieData = useCookiePreferences();
  const components = useBosComponents();
  return (
    <Wrapper>
      <VmComponent src={components.nearOrg.cookiePrompt} props={{ cookiesAcknowleged: cookieData }} />
    </Wrapper>
  );
};

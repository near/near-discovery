import styled from 'styled-components';

import { Button } from '@/components/lib/Button';
import { Text } from '@/components/lib/Text';
import { useAuthStore } from '@/stores/auth';

type Props = {
  inline?: boolean;
};

type FlexProps = {
  gap?: string;
  alignItems?: string;
  justifyContent?: string;
  direction?: string;
  wrap?: string;
};

const Wrapper = styled.div<{
  inline?: boolean;
}>`
  --bs-gutter-x: 1.5rem;
  padding: 8px calc(var(--bs-gutter-x) * 0.5);
  background: var(--amber5);
  border-radius: ${(p) => (p.inline ? '5px' : 0)};

  .banner-text {
    @media (max-width: 600px) {
      font-size: 12px;
    }
  }
  .close-button {
    all: unset;
    width: 14px;
    height: 14px;
    line-height: 14px;
    color: #664d04;
    background: transparent;
    outline: none;
    border: none;
    transition: color 0.2s;
    cursor: pointer;

    &:hover {
      border: none;
      background: transparent;
    }
  }
`;

const Flex = styled.div<FlexProps>`
  display: flex;
  gap: ${(p) => p.gap};
  align-items: ${(p) => p.alignItems};
  justify-content: ${(p) => p.justifyContent};
  flex-direction: ${(p) => p.direction ?? 'row'};
  flex-wrap: ${(p) => p.wrap ?? 'nowrap'};

  @media (max-width: 576px) {
    gap: 10px;
  }
`;

const TextLink = styled.a`
  color: var(--amber12);
  font-weight: 700;
  text-decoration: underline;
  transition: color 0.2s;

  &:hover {
    color: var(--amber11);
  }
`;

export const MigrationBanner = (props: Props) => {
  const signedIn = useAuthStore((store) => store.signedIn);
  const isNearDotOrg = ['https://near.org', 'https://beta.near.org'].some(
    (url) => process.env.NEXT_PUBLIC_HOSTNAME === url,
  );
  const params = typeof window === 'undefined' ? '' : `${window.location.pathname}${window.location.search}`;

  return (
    <>
      {signedIn && isNearDotOrg ? (
        <Wrapper inline={props.inline}>
          <Flex gap="14px" alignItems="center" justifyContent="center">
            <Text className="banner-text" weight="500" color="amber12">
              The near.org Gateway is moving! Bookmark the new developer-focused experience at&nbsp;
              <TextLink href={`https://dev.near.org${params}`} target="_blank">
                dev.near.org
              </TextLink>
            </Text>
          </Flex>
        </Wrapper>
      ) : null}
    </>
  );
};

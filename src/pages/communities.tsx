import { Card, Flex, Grid, Section, SvgIcon, Text } from '@near-pagoda/ui';
import { CaretRight } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import FAQS from '@/components/communities/faqs';
import { useCommunities } from '@/hooks/useCommunities';
import useDeviceType from '@/hooks/useDeviceType';
import { useGatewayEvents } from '@/hooks/useGatewayEvents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

export const IconLink = styled(Link)<{ iconColor: string }>`
  all: unset;
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  font: var(--text-s);
  font-weight: 700;
  color: currentColor;
  text-decoration: none !important;
  cursor: pointer;
  transition: all 150ms;

  i {
    font-size: 20px;
    color: var(--${(p) => p.iconColor ?? 'currentColor'});
    transition: all 150ms;

    &.ph-caret-right {
      font-size: 16px;
    }
  }

  &:hover,
  &:focus {
    span {
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    i {
      color: currentColor;
    }
  }
`;

const ContactUsPage: NextPageWithLayout = () => {
  const { emitGatewayEvent } = useGatewayEvents();
  const { featuredCommunities, channels, urls } = useCommunities();
  const deviceType = useDeviceType();

  function openGleapWidget() {
    emitGatewayEvent &&
      emitGatewayEvent({
        type: 'GLEAP',
        action: 'OPEN',
      });
  }

  return (
    <Section grow="available">
      <Flex stack gap="l" style={{ padding: deviceType === 'mobile' ? '0' : '0 var(--gap-l)' }}>
        <Flex style={{ padding: '24px 0' }}>
          <Text size="text-3xl" weight="500">
            Get Support
          </Text>
        </Flex>

        <Grid columns="2fr 1fr" gap="m" columnsTablet="1fr">
          <Card background="green5" style={{ padding: '48px 28px', boxShadow: 'none' }}>
            <Text size="text-l" weight="700">
              Have a question? Ask our experts
            </Text>

            <Text color="green12">
              NEAR is a global community of Web3 enthusiasts and innovators. Dive into one of our social channels to
              engage in discussion with our lively community.
            </Text>

            <Text
              color="green12"
              size="text-s"
              weight="700"
              style={{ textTransform: 'uppercase', marginTop: '1.5rem' }}
            >
              Channels
            </Text>

            <Grid columns="1fr 1fr 1fr" columnsPhone="1fr 1fr" gap="m">
              {channels.map((channel) => (
                <IconLink key={channel.url} href={channel.url} target="_blank" iconColor="green11">
                  <i className={`ph-bold ${channel.icon}`} />
                  <span>{channel.label}</span>
                  <SvgIcon icon={<CaretRight />} size="xs" />
                </IconLink>
              ))}
            </Grid>
          </Card>

          <Flex gap="m" style={{ flexDirection: 'column' }}>
            <Card background="violet5" color="violet12" style={{ flexGrow: 1, boxShadow: 'none' }}>
              <Text size="text-l" color="violet12" weight={700}>
                Office Hours:
              </Text>
              <Text color="violet11">Jump in a voice call with our developers</Text>
              <Text color="violet11">Thursdays: 11:00hs & 18:00hs GMT</Text>

              <IconLink href={urls.discord} target="_blank" iconColor="violet12" style={{ marginTop: 'auto' }}>
                <i className="ph-bold ph-chat-circle-dots" />
                <span>Join our Discord</span>
              </IconLink>
            </Card>

            <Card background="amber5" style={{ flexGrow: 1, boxShadow: 'none' }}>
              <Text size="text-l" weight="700" color="amber12">
                Resolve an issue
              </Text>

              <Text color="amber12">Get in touch with our customer care team</Text>

              <IconLink
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  openGleapWidget();
                }}
                target="_blank"
                iconColor="violet12"
                style={{ marginTop: 'auto' }}
              >
                <i className="ph-bold ph-chat-circle-dots" />
                <span>Launch support form</span>
              </IconLink>
            </Card>
          </Flex>
        </Grid>

        <Flex style={{ padding: '24px 0' }}>
          <Text size="text-3xl" weight="500">
            Join the communities
          </Text>
        </Flex>
        <Grid columns="1fr 1fr 1fr" gap="m" columnsTablet="1fr 1fr" columnsPhone="1fr">
          {featuredCommunities.map((community) => (
            <Card
              key={community.name}
              href={`https://t.me/${community.telegram}`}
              target="_blank"
              style={{
                padding: '16px 8px',
                border: 0,
                textDecoration: 'none',
              }}
            >
              <Flex
                align="center"
                style={{
                  height: '100%',
                  width: '100%',
                  gap: '12px',
                }}
              >
                <Image
                  src={community.icon}
                  alt={community.name}
                  width={60}
                  height={60}
                  style={{ borderRadius: '50%' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Text size="text-l" style={{ marginBottom: '4px' }}>
                    {community.name}
                  </Text>
                  <Text size="text-s">{community.summary}</Text>
                </div>
              </Flex>
            </Card>
          ))}
        </Grid>

        <Flex style={{ padding: '24px 0' }}>
          <Text size="text-3xl" weight="500">
            FAQ
          </Text>
        </Flex>
        <FAQS />
      </Flex>
    </Section>
  );
};

ContactUsPage.getLayout = useDefaultLayout;

export default ContactUsPage;

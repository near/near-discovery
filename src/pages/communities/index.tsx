/* eslint-disable @next/next/no-img-element */
import { Button, Card, Container, Flex, Grid, Section, Text } from '@near-pagoda/ui';
import Link from 'next/link';
import styled from 'styled-components';

import { useCommunities } from '@/hooks/useCommunities';
import { useGatewayEvents } from '@/hooks/useGatewayEvents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

import FAQS from './faqs';

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

  function openGleapWidget() {
    emitGatewayEvent &&
      emitGatewayEvent({
        type: 'GLEAP',
        action: 'OPEN',
      });
  }

  return (
    <Section style={{ border: 'none', paddingTop: '2rem' }}>
      <Container style={{ maxWidth: '960px' }}>
        <Flex style={{ padding: '24px 0' }}>
          <Text size="text-3xl" weight="500">
            Get Support
          </Text>
        </Flex>

        <Grid columns="2fr 1fr" gap="m">
          <Card background="green5" style={{ padding: '60px 28px', boxShadow: 'none' }}>
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

            <Grid columns="1fr 1fr 1fr" gap="m">
              {channels.map((channel) => (
                <IconLink key={channel.url} href={channel.url} target="_blank" iconColor="green11">
                  <i className={`ph-bold ${channel.icon}`} />
                  <span>{channel.label}</span>
                  <i className="ph ph-caret-right" />
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
            Communities
          </Text>
        </Flex>
        <Grid columns="1fr 1fr 1fr" columnsPhone="1">
          {featuredCommunities.map((community) => (
            <Card
              key={community.name}
              style={{
                border: '3px solid black',
                flexDirection: 'column',
              }}
            >
              <Flex align="center" style={{ marginBottom: '10px' }}>
                <img src={community.icon} alt={community.name} width={80} height={80} style={{ borderRadius: '50%' }} />
                <div>
                  <Text size="text-l">{community.name}</Text>
                  <p>{community.summary}</p>
                </div>
              </Flex>
              <Flex justify="end" style={{ marginTop: 'auto' }}>
                <Button label="Join Telegram" href={`https://t.me/${community.telegram}`} />
              </Flex>
            </Card>
          ))}
        </Grid>

        <Flex style={{ padding: '24px 0' }}>
          <Text size="text-3xl" weight="500">
            FAQ
          </Text>
        </Flex>
        <FAQS urls={urls} />
      </Container>
    </Section>
  );
};

ContactUsPage.getLayout = useDefaultLayout;

export default ContactUsPage;

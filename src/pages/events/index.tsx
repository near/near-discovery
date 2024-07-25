/* eslint-disable @next/next/no-img-element */

import styled from 'styled-components';

import { Article, ArticleImage } from '@/components/lib/Article';
import { Button } from '@/components/lib/Button';
import { Container } from '@/components/lib/Container';
import { Flex } from '@/components/lib/Flex';
import { Grid } from '@/components/lib/Grid';
import { PatternContent } from '@/components/lib/Pattern';
import { Section } from '@/components/lib/Section';
import { H1, Text } from '@/components/lib/Text';
import { Wrapper } from '@/components/lib/Wrapper';
import { useGoogleEvents } from '@/hooks/useGoogleEvents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { MappedEvent } from '@/hooks/useLumaEvents';
import { useLumaEvents } from '@/hooks/useLumaEvents';
import {
  devhubCommunityCalendarId,
  lumaNearAICalendarId,
  lumaNearCalendarId,
  lumaNearHZNCalendarId,
} from '@/utils/config';
import type { NextPageWithLayout } from '@/utils/types';

function returnImageSrc(image: string) {
  return `/images/events/${image}.jpeg`;
}

const backgroundAsset1 = 'bafkreibocppns3yi7yakmhgsj53qdgw74kzs25dulfbrrif5g3gtzm45zy';
const backgroundAsset2 = 'bafkreibupkdrjsmnxcmcu4yvtlex3rmioj3eoqlb2jlccdkeujzfwmvzhy';
const backgroundAsset3 = 'bafkreidovdxkcy6f3rb5xm3ack7tdujxngx6xn6bnkl7t72u7fds4vt53i';
const backgroundAsset4 = 'bafkreic632ok3wpcjcqjem43e7y3er4pxtt457akiw6coevu43aksy4ctu';

const Pattern = styled.div`
  width: 100%;
  min-height: 540px;
  display: flex;
  align-items: center;
  background-image: url('${returnImageSrc(backgroundAsset1)}'), url('${returnImageSrc(backgroundAsset2)}'),
    url('${returnImageSrc(backgroundAsset3)}'), url('${returnImageSrc(backgroundAsset4)}'),
    url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGeSURBVHgB7doxTisxEAbgeY/mvQro6NiSDo6QkpJbcA2OwjWooKQMJ2DpKENJBV7FEYoBeQSIZr9PGk2cItWvsdfZnSBjKHVf6rnUbdD1N8g4K7VX6jhIEaycofaTIEWwcoam0yFYOYe179WiQ7Byhk8+8wnB6munlHNWgmD1tUGyFSYIVl8bJFcOCYLV106s/aBrJ2hNE+qo1GmpRanz2J5aB6X+x/oQv/l+FWz5E/O1iHU4pom0W/u0/uoZahnrgN2VGuv6Jpidl1+o2T5BznkrfKj9MdZT6l9836r+3k2pq1KXMVNz3gpbU7hOmj49AQ7x/lJ0WWsK5xhv2+AYkHQR29vbddDluqFvbNZPQZdg9S07az4gWH3tHZVgJQhW3xjb4XIZyo+Z3nffHN79CZ1gYuXc1b4KEytFsHLGptMhWDlj7Q9BimDlbJ4Ex4AftggHdwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIpXoUVLSWulnzoAAAAASUVORK5CYII=');
  background-size: 13%, 14%, 14%, 25%, 75px 75px;
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, repeat;
  background-position: top left, top right 7%, bottom left 14%, bottom right, center top;

  @media (min-width: 576px) and (max-width: 1020px) {
    min-height: 570px;
  }

  @media (max-width: 575px) {
    min-height: 390px;
  }
`;

const CoverCard = styled.a`
  display: grid;
  gap: 24px;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  border: 4px solid transparent;
  cursor: pointer;
  transition: all 200ms;

  i {
    color: var(--sand12);
  }

  &:hover {
    text-decoration: none;

    .title {
      text-decoration: underline;
    }

    img {
      filter: brightness(1);
      transform: scale(1.02);
    }
  }

  &:focus-within {
    border: 4px solid var(--violet4);
    border-radius: 12px;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const CoverCardImageWrapper = styled.div`
  width: 100%;
  height: 471px;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 200ms;
    filter: brightness(0.9);
  }
`;

const EventsPage: NextPageWithLayout = () => {
  const { events, hasMoreEvents } = useLumaEvents([lumaNearCalendarId, lumaNearAICalendarId, lumaNearHZNCalendarId], 7);
  const dateNow = new Date().toISOString();
  const devhubEvents = useGoogleEvents(devhubCommunityCalendarId, dateNow, 9);

  const featuredEvent = events[0] as MappedEvent | undefined;
  const otherEvents = events.filter((event) => event.title !== featuredEvent?.title);

  return (
    <Wrapper>
      <Section backgroundColor="#fff" style={{ padding: '0' }}>
        <Container center>
          <Pattern>
            <PatternContent maxWidth="470px">
              <Flex gap="32px" direction="column" alignItems="center">
                <H1>Events</H1>

                <Text size="text-l">Come together IRL and online, and be part of building the Open Web together.</Text>
              </Flex>
            </PatternContent>
          </Pattern>
        </Container>
      </Section>

      {featuredEvent && (
        <Section backgroundColor="#fff" style={{ padding: '72px 24px' }}>
          <Container gap="48px">
            <Flex direction="column" gap="80px" mobileGap="40px">
              <Text size="text-3xl" weight="500">
                Upcoming Event
              </Text>
            </Flex>

            <CoverCard href={featuredEvent.url} target="_blank">
              <CoverCardImageWrapper>
                <img src={featuredEvent.thumbnail} alt={featuredEvent.title} />
              </CoverCardImageWrapper>

              <Flex gap="1rem" direction="column">
                <Text className="title" clampLines={3} size="text-3xl" mobileSize="text-2xl" weight="500">
                  {featuredEvent.title}
                </Text>

                <Text clampLines={7}>{featuredEvent.description}</Text>

                <Flex alignItems="center" gap="32px" style={{ minWidth: 0 }}>
                  <Flex alignItems="center" gap="8px">
                    <i className="ph-bold ph-calendar-blank" />
                    <Text color="sand11" size="text-s" style={{ whiteSpace: 'nowrap' }}>
                      {featuredEvent.date}
                    </Text>
                  </Flex>
                  <Flex alignItems="center" gap="8px" style={{ minWidth: 0 }}>
                    <i className="ph-bold ph-map-pin-line" />
                    <Text
                      color="sand11"
                      size="text-s"
                      style={{
                        whiteSpace: 'nowrap',
                        minWidth: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {featuredEvent.location}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </CoverCard>
          </Container>
        </Section>
      )}

      {otherEvents.length > 0 && (
        <Section backgroundColor="#fff" style={{ padding: '72px 24px' }}>
          <Container gap="48px">
            <Flex gap="80px" mobileGap="40px" alignItems="center" justifyContent="space-between">
              <Text size="text-3xl" mobileSize="text-2xl" weight="500">
                Our Events
              </Text>
              {hasMoreEvents && (
                <Button
                  href="https://lu.ma/NEAR-community"
                  target="_blank"
                  label="View All"
                  variant="secondary"
                  size="small"
                />
              )}
            </Flex>

            <Grid columns="1fr 1fr 1fr" gap="24px">
              {otherEvents.map((event) => {
                return (
                  <Article key={event.title} href={event.url} target="_blank" style={{ minWidth: 0 }}>
                    <ArticleImage>
                      <img src={event.thumbnail} alt={event.title} />
                    </ArticleImage>
                    <Text color="sand12" size="text-l" weight="500" as="h3">
                      {event.title}
                    </Text>
                    <Flex alignItems="center" gap="32px" style={{ minWidth: 0 }}>
                      <Flex alignItems="center" gap="8px">
                        <i className="ph-bold ph-calendar-blank" />
                        <Text color="sand11" size="text-s" style={{ whiteSpace: 'nowrap' }}>
                          {event.date}
                        </Text>
                      </Flex>
                      <Flex alignItems="center" gap="8px" style={{ minWidth: 0 }}>
                        <i className="ph-bold ph-map-pin-line" />
                        <Text
                          color="sand11"
                          size="text-s"
                          style={{
                            whiteSpace: 'nowrap',
                            minWidth: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {event.location}
                        </Text>
                      </Flex>
                    </Flex>
                  </Article>
                );
              })}
            </Grid>
          </Container>
        </Section>
      )}

      {otherEvents.length === 0 && (
        <Section backgroundColor="#fff" style={{ padding: '72px 24px' }}>
          <Container>
            <Flex direction="column" gap="24px" alignItems="center">
              <Text size="text-3xl" mobileSize="text-2xl" weight="500">
                New events coming soon!
              </Text>
              <Text size="text-xl" mobileSize="text-l" style={{ maxWidth: '808px', textAlign: 'center' }}>
                Subscribe to our Luma calendar to stay up to date with our events.
              </Text>
            </Flex>
          </Container>
        </Section>
      )}

      <Section backgroundColor="#fff" style={{ padding: '72px 24px' }}>
        <Container gap="48px">
          <Flex gap="80px" mobileGap="40px" alignItems="center" justifyContent="space-between">
            <Text size="text-3xl" mobileSize="text-2xl" weight="500">
              DevHub Community Events
            </Text>
          </Flex>

          <Grid columns="1fr 1fr 1fr" gap="24px">
            {devhubEvents.map((event) => {
              return (
                <Article key={event.id} href={event.htmlLink} target="_blank" style={{ minWidth: 0 }}>
                  <ArticleImage>
                    <img
                      src={`https://lh3.googleusercontent.com/d/${event.attachments?.[0]?.fileId}=w1000`}
                      alt={event.summary}
                    />
                  </ArticleImage>
                  <Text color="sand12" size="text-l" weight="500" as="h3">
                    {event.summary}
                  </Text>
                  <Flex alignItems="center" gap="32px" style={{ minWidth: 0 }}>
                    <Flex alignItems="center" gap="8px">
                      <i className="ph-bold ph-calendar-blank" />
                      <Text color="sand11" size="text-s" style={{ whiteSpace: 'nowrap' }}>
                        {event.start.dateTime}
                      </Text>
                    </Flex>
                  </Flex>
                </Article>
              );
            })}
          </Grid>
        </Container>
      </Section>

      <Section backgroundColor="var(--violet6)">
        <Container>
          <Flex direction="column" gap="24px" alignItems="center">
            <Text size="text-3xl" mobileSize="text-2xl" weight="500" style={{ maxWidth: '808px', textAlign: 'center' }}>
              Hosting an event?
            </Text>

            <Text size="text-xl" mobileSize="text-l" style={{ maxWidth: '808px', textAlign: 'center' }}>
              Do you want your NEAR community event posted here? Submit your event details via Luma to be considered.
            </Text>

            <Button
              label="Submit Event"
              variant="primary"
              size="large"
              href="https://lu.ma/NEAR-community"
              target="_blank"
            />
          </Flex>
        </Container>
      </Section>
    </Wrapper>
  );
};

EventsPage.getLayout = useDefaultLayout;

export default EventsPage;

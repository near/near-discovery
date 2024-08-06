/* eslint-disable @next/next/no-img-element */
import { Button } from '@near-pagoda/ui';
import { Text } from '@near-pagoda/ui';
import { Grid } from '@near-pagoda/ui';
import { Container } from '@near-pagoda/ui';
import { Flex } from '@near-pagoda/ui';
import { Section } from '@near-pagoda/ui';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';

import { useEvents } from '@/hooks/useEvents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { formatEventDateTime } from '@/utils/events';
import type { NextPageWithLayout } from '@/utils/types';

const HighlightedEvent = styled.div`
  display: flex;
  background: linear-gradient(264deg, #cfccf5 0%, #a39cec 99.35%);
  border-radius: 24px;
  padding: 55px 24px 55px 48px;
`;

const CoverCard = styled.a`
  display: grid;
  gap: 24px;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  border: 4px solid transparent;
  cursor: pointer;
  transition: all 200ms;
  text-decoration: none;

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

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const CommunityEventWrapper = styled.div`
  animation: ${fadeIn} 200ms;
`;

export const CommunityEvent = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-decoration: none !important;
  outline: none;
  box-shadow: 0 0 0 0px var(--violet4);

  i {
    color: var(--sand12);
  }

  &:hover {
    h3 {
      text-decoration: underline;
    }

    div:first-child {
      &::before {
        opacity: 1;
      }
    }
  }

  &:focus {
    div:first-child {
      box-shadow: 0 0 0 4px var(--violet4);
    }
  }
`;

export const EventImage = styled.div`
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  height: 220px;
  transition: all 200ms;
  margin-bottom: 10px;
  position: relative;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: 5;
  }

  &::before {
    content: '';
    display: block;
    inset: 0;
    background: var(--whiteA6);
    z-index: 10;
    position: absolute;
    opacity: 0;
    transition: all 200ms;
  }
`;

const EventsPage: NextPageWithLayout = () => {
  const { highlightedEvent, communityEvents, fetchMore, lastElements, hasMoreEvents } = useEvents();

  return (
    <div>
      {highlightedEvent && (
        <Section style={{ border: 'none' }}>
          <Container>
            <Flex style={{ padding: '24px 0' }}>
              <Text size="text-3xl" weight="500">
                Upcoming Event
              </Text>
            </Flex>
            <HighlightedEvent>
              <CoverCard href={highlightedEvent.url} target="_blank">
                <CoverCardImageWrapper>
                  <img src={highlightedEvent.thumbnail} alt={highlightedEvent.title} />
                </CoverCardImageWrapper>

                <Flex style={{ flexDirection: 'column' }}>
                  <Text className="title" clampLines={3} size="text-3xl" weight="500">
                    {highlightedEvent.title}
                  </Text>

                  <Flex align="center" style={{ minWidth: 0 }}>
                    <Flex align="center">
                      <i className="ph-bold ph-calendar-blank" />
                      <Text color="sand11" size="text-s" style={{ whiteSpace: 'nowrap' }}>
                        {formatEventDateTime(highlightedEvent.start)}
                      </Text>
                    </Flex>
                    <Flex align="center" style={{ minWidth: 0 }}>
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
                        {highlightedEvent.location}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </CoverCard>
            </HighlightedEvent>
          </Container>
        </Section>
      )}

      <Section style={{ padding: '42px 24px' }}>
        <Container>
          <Flex gap="xl" align="center" justify="space-between">
            <Text size="text-3xl" weight="500">
              Community Events
            </Text>
          </Flex>

          <Grid columns="1fr 1fr 1fr" style={{ gap: '32px', padding: '42px 0' }}>
            {communityEvents.map((event) => {
              return (
                <CommunityEvent key={event.id} href={event.url} target="_blank" style={{ minWidth: 0 }}>
                  <EventImage>
                    <img src={event.thumbnail} alt={event.title} />
                  </EventImage>
                  <Text color="sand12" size="text-l" weight="500" as="h3">
                    {event.title}
                  </Text>
                  <Flex align="center" style={{ minWidth: 0, gap: '32px' }}>
                    <Flex align="center">
                      <i className="ph-bold ph-calendar-blank" />
                      <Text color="sand11" size="text-s" style={{ whiteSpace: 'nowrap' }}>
                        {event.start}
                      </Text>
                    </Flex>
                  </Flex>
                </CommunityEvent>
              );
            })}

            {lastElements.map((event) => {
              return (
                <CommunityEventWrapper key={event.id}>
                  <CommunityEvent href={event.url} target="_blank" style={{ minWidth: 0 }}>
                    <EventImage>
                      <img src={event.thumbnail} alt={event.title} />
                    </EventImage>
                    <Text color="sand12" size="text-l" weight="500" as="h3">
                      {event.title}
                    </Text>
                    <Flex align="center" style={{ minWidth: 0 }}>
                      <Flex align="center">
                        <i className="ph-bold ph-calendar-blank" />
                        <Text color="sand11" size="text-s" style={{ whiteSpace: 'nowrap' }}>
                          {event.start}
                        </Text>
                      </Flex>
                    </Flex>
                  </CommunityEvent>
                </CommunityEventWrapper>
              );
            })}
          </Grid>

          {hasMoreEvents && (
            <Button variant="primary" label="Load More" size="large" style={{ width: '100%' }} onClick={fetchMore} />
          )}
        </Container>
      </Section>

      <Section style={{ background: 'var(--violet6)' }}>
        <Container style={{ padding: '48px' }}>
          <Flex align="center" style={{ flexDirection: 'column', gap: '24px' }}>
            <Text size="text-3xl" weight="500" style={{ maxWidth: '808px', textAlign: 'center' }}>
              Hosting an event?
            </Text>

            <Text size="text-xl" weight="400" style={{ maxWidth: '808px', textAlign: 'center' }}>
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
    </div>
  );
};

EventsPage.getLayout = useDefaultLayout;

export default EventsPage;

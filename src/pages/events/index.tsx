/* eslint-disable @next/next/no-img-element */
import styled, { keyframes } from 'styled-components';

import { Article, ArticleImage } from '@/components/lib/Article';
import { Button } from '@/components/lib/Button';
import { Container } from '@/components/lib/Container';
import { Flex } from '@/components/lib/Flex';
import { Grid } from '@/components/lib/Grid';
import { Section } from '@/components/lib/Section';
import { Text } from '@/components/lib/Text';
import { Wrapper } from '@/components/lib/Wrapper';
import { useEvents } from '@/hooks/useEvents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { formatEventDateTime } from '@/utils/events';
import type { NextPageWithLayout } from '@/utils/types';

const Pattern = styled.div`
  display: flex;
  width: 100%;
  background: linear-gradient(264deg, #cfccf5 0%, #a39cec 99.35%);
  border-radius: 24px;
`;

const PatternContent = styled.div`
  padding: 55px 24px 55px 48px;
  width: 100%;
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

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ArticleWrapper = styled.div`
  animation: ${fadeIn} 200ms;
`;

const EventsPage: NextPageWithLayout = () => {
  const { highlightedEvent, communityEvents, fetchMore, lastElements, hasMoreEvents } = useEvents();

  return (
    <Wrapper>
      {highlightedEvent && (
        <Section backgroundColor="#fff" style={{ padding: '24px 24px' }}>
          <Container gap="48px">
            <Flex direction="column" gap="80px" mobileGap="40px">
              <Text size="text-3xl" weight="500">
                Upcoming Event
              </Text>
            </Flex>
            <Pattern border-radius="16px">
              <PatternContent>
                <CoverCard href={highlightedEvent.url} target="_blank">
                  <CoverCardImageWrapper>
                    <img src={highlightedEvent.thumbnail} alt={highlightedEvent.title} />
                  </CoverCardImageWrapper>

                  <Flex gap="1rem" direction="column">
                    <Text className="title" clampLines={3} size="text-3xl" mobileSize="text-2xl" weight="500">
                      {highlightedEvent.title}
                    </Text>

                    <Flex alignItems="center" gap="32px" style={{ minWidth: 0 }}>
                      <Flex alignItems="center" gap="8px">
                        <i className="ph-bold ph-calendar-blank" />
                        <Text color="sand11" size="text-s" style={{ whiteSpace: 'nowrap' }}>
                          {formatEventDateTime(highlightedEvent.start)}
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
                          {highlightedEvent.location}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </CoverCard>
              </PatternContent>
            </Pattern>
          </Container>
        </Section>
      )}

      <Section backgroundColor="#fff" style={{ padding: '24px 24px' }}>
        <Container gap="48px">
          <Flex gap="80px" mobileGap="40px" alignItems="center" justifyContent="space-between">
            <Text size="text-3xl" mobileSize="text-2xl" weight="500">
              Community Events
            </Text>
          </Flex>

          <Grid columns="1fr 1fr 1fr" gap="24px">
            {communityEvents.map((event) => {
              return (
                <Article key={event.id} href={event.url} target="_blank" style={{ minWidth: 0 }}>
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
                        {event.start}
                      </Text>
                    </Flex>
                  </Flex>
                </Article>
              );
            })}

            {lastElements.map((event) => {
              return (
                <ArticleWrapper key={event.id}>
                  <Article href={event.url} target="_blank" style={{ minWidth: 0 }}>
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
                          {event.start}
                        </Text>
                      </Flex>
                    </Flex>
                  </Article>
                </ArticleWrapper>
              );
            })}
          </Grid>

          {hasMoreEvents && <Button variant="primary" label="Load More" size="large" onClick={fetchMore} />}
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

/* eslint-disable @next/next/no-img-element */
import { Container, Flex, Section, Text } from '@near-pagoda/ui';
import Link from 'next/link';
import styled from 'styled-components';

import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

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

const NewsletterBanner = styled.div`
  background-color: #0072ce;
  color: white;
  padding: 8px;
  text-align: center;
  font-size: 14px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  @media (max-width: 1240px) {
    top: 60px;
  }
`;

type GridItem = {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  date: string;
};

const gridItems: GridItem[] = [
  {
    id: '36',
    title: 'Dev News #36',
    thumbnail: 'newsletter/36.png',
    url: 'https://mailchi.mp/neardevhub/near-dev-news-36',
    date: '2024-11-04',
  },
  {
    id: '35',
    title: 'Dev News #35',
    thumbnail: 'newsletter/35.jpg',
    url: 'https://mailchi.mp/neardevhub/near-dev-news-35',
    date: '2024-10-28',
  },
  {
    id: '34',
    title: 'Dev News #34',
    thumbnail: 'newsletter/34.jpg',
    url: 'https://mailchi.mp/neardevhub/near-dev-news-34',
    date: '2024-10-21',
  },
  {
    id: '33',
    title: 'Dev News #33',
    thumbnail: 'newsletter/33.jpg',
    url: 'https://mailchi.mp/neardevhub/near-dev-news-33',
    date: '2024-10-14',
  },
  {
    id: '32',
    title: 'Dev News #32',
    thumbnail: 'newsletter/32.jpg',
    url: 'https://mailchi.mp/neardevhub/near-dev-news-32',
    date: '2024-10-07',
  },
];

const FlexibleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 42px 0;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const CommunityNews = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const NewsImage = styled.div`
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const NewsPage: NextPageWithLayout = () => {
  return (
    <div>
      <Section style={{ border: 'none', paddingTop: '2rem' }}>
        <NewsletterBanner>
          Stay updated!{' '}
          <a href="https://bit.ly/devhubnews" style={{ color: 'white', textDecoration: 'underline' }}>
            Sign up for our newsletter →
          </a>
        </NewsletterBanner>
        <Container>
          <Flex style={{ padding: '24px 0' }}>
            <Text size="text-3xl" weight="500">
              Recent Newsletters
            </Text>
          </Flex>
          <Flex style={{ padding: '5px 0' }}>
            <Text size="text-s" weight="300">
              Click on the newsletter to view it.
            </Text>
          </Flex>

          <FlexibleGrid>
            {gridItems.map((item) => (
              <CommunityNews key={item.id} href={item.url} target="_blank">
                <NewsImage>
                  <img src={item.thumbnail} alt={item.title} />
                </NewsImage>
                <Text color="sand12" size="text-l" weight="500" as="h3">
                  {item.title}
                </Text>
                <Flex align="center" gap="s">
                  <i className="ph-bold ph-calendar-blank" />
                  <Text color="sand11" size="text-s" style={{ whiteSpace: 'nowrap' }}>
                    {item.date}
                  </Text>
                </Flex>
              </CommunityNews>
            ))}
          </FlexibleGrid>
        </Container>
        <Container>
          <Flex justify="center" style={{ padding: '48px 0' }}>
            <Link
              href="/nearweekapp.near/widget/nearweek.com"
              style={{
                display: 'block',
                padding: '24px 48px',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                textDecoration: 'none',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
              }}
            >
              <Text size="text-xl" weight="500" color="sand12">
                Looking for more NEAR news? Visit NEARWEEK →
              </Text>
            </Link>
          </Flex>
        </Container>
      </Section>
    </div>
  );
};

NewsPage.getLayout = useDefaultLayout;

export default NewsPage;

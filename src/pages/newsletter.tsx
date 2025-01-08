/* eslint-disable @next/next/no-img-element */
import { Button, Flex, Form, Grid, Section, Text } from '@near-pagoda/ui';
import { sanitize } from 'dompurify';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import styled, { keyframes } from 'styled-components';
import useSWR from 'swr';

import ScrollToTop from '@/components/scrollToTop';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const GreenBox = styled.div`
  background: #00ec97;
  border-radius: 6px;
  padding: 1rem 10px;
  margin-bottom: 1rem;
`;

const Confirmation = styled.div`
  background: white;
  border-radius: 6px;
  padding: 5px 10px;
  animation: ${fadeIn} ease 0s;
`;

const SubscribeForm = styled(Flex)`
  border-right-radius: 6px;
  border: 2px solid transparent;
  border-radius: 0 22px 22px 0;
  transition: border-color 0.2s ease-in;

  &:focus-within {
    transition: border-color 0.2s ease-in;
    border-color: black;
    border-radius: 0 22px 22px 0
  }

  input { 
    border: none;
    padding: 5px 10px; 
    width: 100%; 
  }

  input:focus {
    border: none;
    outline: none;
`;

const LinksList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
`;

const Fixed = styled.div`
  @media (min-width: 1000px) {
    position: fixed;
    padding: 0 1rem 0 0;
  }
`;

type SubscribeForm = {
  email: string;
};

type Issue = {
  id: string;
  settings: {
    subject_line: string;
  };
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function parseCampaignHTML(htmlString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const header = doc.querySelector('tbody[data-block-id="4"].mceWrapper');
  const footer = doc.querySelector('tbody[data-block-id="60"].mceWrapper');
  const style = doc.querySelector('style');

  [footer, header].forEach((element) => {
    if (element) {
      element.innerHTML = '';
    }
  });

  return style?.outerHTML + doc.body.innerHTML;
}

const NewsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [responseError, setResponseError] = useState<string | null>(null);

  const { data: campaigns, isLoading: campaignLoading } = useSWR('/api/newsletter', fetcher);
  const issueId = useMemo(() => id || campaigns?.[0]?.id, [id, campaigns]);
  const { data: issueDetails, isLoading: issueLoading } = useSWR(
    issueId ? `/api/newsletter/${issueId}` : null,
    fetcher,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscribeForm>();

  const onSubmit: SubmitHandler<SubscribeForm> = async (data) => {
    try {
      setResponseError(null);
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });

      await response;
      const responseData = await response.json();

      if (response.ok) {
        setIsFormSubmitted(true);
      } else {
        setResponseError(responseData?.message || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (campaignLoading) return;
  if ('error' in campaigns) return <Section grow="available"> Failed to load newsletter </Section>;

  return (
    <Section grow="available">
      <Head>
        <title>NEAR Newsletter</title>
      </Head>
      <Grid columns="2fr 1fr" columnsPhone="minmax(0, 1fr)" columnsTablet="minmax(0, 1fr)">
        {issueLoading ? (
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <div dangerouslySetInnerHTML={{ __html: sanitize(parseCampaignHTML(issueDetails)) }}></div>
          </div>
        )}

        <Flex style={{ flexDirection: 'column' }}>
          <Fixed>
            <GreenBox style={{ padding: '15px' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>
                <Text size="text-l">Subscribe to the newsletter</Text>
              </h3>
              {isFormSubmitted ? (
                <>
                  <Confirmation style={{ background: 'white', padding: '15px, 10px' }}>
                    <Text size="text-s">
                      <Text weight={600}>Thank you!</Text> Please visit your e-mail to confirm your subscription.
                    </Text>
                  </Confirmation>
                </>
              ) : (
                <>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    {errors.email && <span style={{ color: 'red' }}> This field is required!</span>}
                    {responseError && <span style={{ color: 'red' }}>{responseError}</span>}
                    <SubscribeForm gap="none">
                      <input
                        {...register('email', { required: true })}
                        placeholder="dev@youremail.com"
                        type="email"
                        onChange={() => {
                          setResponseError(null);
                        }}
                      />
                      <Button
                        label="Subscribe"
                        style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
                        type="submit"
                      />
                    </SubscribeForm>
                  </Form>
                </>
              )}
            </GreenBox>
            <GreenBox>
              <h3>
                <Text size="text-l">Recent Issues</Text>
              </h3>
            </GreenBox>
            <LinksList>
              {campaigns.map((issue: Issue) => (
                <li key={issue.id} style={{ fontWeight: issueId === issue.id ? 'bold' : 'normal' }}>
                  <Link href={{ pathname: '/newsletter', query: { id: issue.id } }} prefetch={true}>
                    {issue.settings.subject_line}
                  </Link>
                </li>
              ))}
            </LinksList>
            <hr />
            <GreenBox>
              <h3>
                <Text size="text-l">Looking for more?</Text>
              </h3>
            </GreenBox>
            <LinksList>
              <li>
                <Link href={'https://nearweek.com'}> NEARWEEK →</Link>
              </li>
              <li>
                <Link href={'https://x.com/neardevhub'}> DevHub on X →</Link>
              </li>
              <li>
                <Link href={'https://x.com/NEARProtocol'}> NEAR on X →</Link>
              </li>
              <li>
                <Link href={'https://near.org/blog'}> NEAR Blog →</Link>
              </li>
            </LinksList>
            <hr />
          </Fixed>
          <ScrollToTop />
        </Flex>
      </Grid>
    </Section>
  );
};

NewsPage.getLayout = useDefaultLayout;

export default NewsPage;

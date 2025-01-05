/* eslint-disable @next/next/no-img-element */
import { Button, Container, Flex, Form, Grid, Section, Text } from '@near-pagoda/ui';
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

const IssueCover = styled.img`
  border-radius: 6px;
`;

const GreenBox = styled.div`
  background: #00ec97;
  border-radius: 6px;
  padding: 5px 10px;
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

      if (response.ok) {
        setIsFormSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (campaignLoading) return;

  return (
    <>
      <Head>
        <title>News</title>
      </Head>
      <Section grow="available" style={{ border: 'none', paddingTop: '2rem' }}>
        <Container>
          <Grid columns="2fr 1fr" columnsPhone="minmax(0, 1fr)" columnsTablet="minmax(0, 1fr)" gap="l">
            {issueLoading ? (
              <>
                <div className="spinner-border text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </>
            ) : (
              <div>
                <div dangerouslySetInnerHTML={{ __html: parseCampaignHTML(issueDetails) }}></div>
              </div>
            )}

            <Flex style={{ flexDirection: 'column' }}>
              <div>
                <IssueCover src={`newsletter/${issueId}.jpg`} alt="" />
              </div>
              <GreenBox style={{ padding: '15px' }}>
                <h3>
                  <Text size="text-l">Subscribe to the newsletter</Text>
                </h3>
                {isFormSubmitted ? (
                  <>
                    <Confirmation style={{ background: 'white', padding: '15px, 10px' }}>
                      <Text size="text-s">
                        <Text weight={600}>Thank you!</Text> Please visit your e-mail to confirm your subscibtion.
                      </Text>
                    </Confirmation>{' '}
                  </>
                ) : (
                  <>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      {errors.email && <span style={{ color: 'red' }}> This field is required!</span>}
                      <SubscribeForm gap="none">
                        <input
                          {...register('email', { required: true })}
                          placeholder="dev@youremail.com"
                          type="email"
                          className=""
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
              <div>
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
              </div>
              <div>
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
              </div>
            </Flex>
          </Grid>
        </Container>
      </Section>
      <ScrollToTop />
    </>
  );
};

NewsPage.getLayout = useDefaultLayout;

export default NewsPage;

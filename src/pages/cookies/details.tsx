import { Card, Container, Flex, Section, SvgIcon, Table, Tabs, Text } from '@near-pagoda/ui';
import { Cookie, HandHeart } from '@phosphor-icons/react';
import { useRouter } from 'next/router';

import { MetaTags } from '@/components/MetaTags';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const ContactUsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const selectedTab = (router.query.tab as string) || 'firstPartyCookies';
  return (
    <>
      <MetaTags
        title="Near.org Cookie Policy"
        description="This Cookie Policy explains how Discovery Domain, Ltd. and its group companies use cookies and similar technologies when you visit our websites such as pagoda.co and other managed websites that link to this policy"
      />
      <Section grow="available" style={{ background: 'var(--sand3)' }}>
        <Container size="m" style={{ display: 'flex', justifyContent: 'center' }}>
          <Flex stack gap="l">
            <Text as="h1" size="text-2xl">
              Cookies
            </Text>

            <Card style={{ paddingTop: 0 }}>
              <Tabs.Root value={selectedTab}>
                <Tabs.List style={{ marginBottom: 'var(--gap-m)' }}>
                  <Tabs.Trigger href="?tab=firstPartyCookies" value="firstPartyCookies">
                    <SvgIcon icon={<Cookie fill="bold" />} />
                    1st Party Cookies
                  </Tabs.Trigger>

                  <Tabs.Trigger href="?tab=thirdPartyCookies" value="thirdPartyCookies">
                    <SvgIcon icon={<HandHeart fill="bold" />} />
                    3rd Party Cookies
                  </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="firstPartyCookies">
                  <Table.Root>
                    <Table.Head>
                      <Table.Row>
                        <Table.HeaderCell>Identifer</Table.HeaderCell>
                        <Table.HeaderCell>Purpose</Table.HeaderCell>
                        <Table.HeaderCell>Provider</Table.HeaderCell>
                        <Table.HeaderCell>Domain</Table.HeaderCell>
                        <Table.HeaderCell>Details</Table.HeaderCell>
                        <Table.HeaderCell>Duration</Table.HeaderCell>
                        <Table.HeaderCell>Actual Purpose</Table.HeaderCell>
                      </Table.Row>
                    </Table.Head>

                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>rl_user_id</Table.Cell>
                        <Table.Cell>product analytics</Table.Cell>
                        <Table.Cell>Rudderstack</Table.Cell>
                        <Table.Cell>.near.org</Table.Cell>
                        <Table.Cell>
                          <a href="https://cookiedatabase.org/?lang=en&s=rl_user_id" target="_blank">
                            Link
                          </a>
                        </Table.Cell>
                        <Table.Cell>1 year</Table.Cell>
                        <Table.Cell>to store a unique user ID.</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>rl_trait</Table.Cell>
                        <Table.Cell>product analytics</Table.Cell>
                        <Table.Cell>Rudderstack</Table.Cell>
                        <Table.Cell>.near.org</Table.Cell>
                        <Table.Cell>
                          <a href="https://cookiedatabase.org/?lang=en&s=rl_trait" target="_blank">
                            Link
                          </a>
                        </Table.Cell>
                        <Table.Cell>1 year</Table.Cell>
                        <Table.Cell>to store performed actions on the website.</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>rl_session</Table.Cell>
                        <Table.Cell>product analytics</Table.Cell>
                        <Table.Cell>Rudderstack</Table.Cell>
                        <Table.Cell>.near.org</Table.Cell>
                        <Table.Cell>
                          <a href="https://cookiedatabase.org/?lang=en&s=rl_session" target="_blank">
                            Link
                          </a>
                        </Table.Cell>
                        <Table.Cell>1 year</Table.Cell>
                        <Table.Cell>Stores the session-related information including the ID.</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>rl_page_init_referring_domain</Table.Cell>
                        <Table.Cell>product analytics</Table.Cell>
                        <Table.Cell>Rudderstack</Table.Cell>
                        <Table.Cell>.near.org</Table.Cell>
                        <Table.Cell>
                          <a href="https://cookiedatabase.org/?lang=en&s=rl_page_init_referring_domain" target="_blank">
                            Link
                          </a>
                        </Table.Cell>
                        <Table.Cell>1 year</Table.Cell>
                        <Table.Cell>to store referring website.</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>rl_page_init_referrer</Table.Cell>
                        <Table.Cell>product analytics</Table.Cell>
                        <Table.Cell>Rudderstack</Table.Cell>
                        <Table.Cell>.near.org</Table.Cell>
                        <Table.Cell>
                          <a href="https://cookiedatabase.org/?lang=en&s=rl_page_init_referrer" target="_blank">
                            Link
                          </a>
                        </Table.Cell>
                        <Table.Cell>1 year</Table.Cell>
                        <Table.Cell>to store referring website.</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>user-country-code</Table.Cell>
                        <Table.Cell>product analytics</Table.Cell>
                        <Table.Cell>Discovery Domain</Table.Cell>
                        <Table.Cell>.near.org</Table.Cell>
                        <Table.Cell>n/a</Table.Cell>
                        <Table.Cell>1 year</Table.Cell>
                        <Table.Cell>to store a visitor&apos;s country code</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table.Root>
                </Tabs.Content>

                <Tabs.Content value="thirdPartyCookies">
                  <Table.Root>
                    <Table.Head>
                      <Table.Row>
                        <Table.HeaderCell>Identifer</Table.HeaderCell>
                        <Table.HeaderCell>Purpose</Table.HeaderCell>
                        <Table.HeaderCell>Provider</Table.HeaderCell>
                        <Table.HeaderCell>Domain</Table.HeaderCell>
                        <Table.HeaderCell>Duration</Table.HeaderCell>
                      </Table.Row>
                    </Table.Head>

                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>aeb0-187febdb30e5R...1hgeca2o5.1hgeca2o6.9.0.9</Table.Cell>
                        <Table.Cell>Functional/Essential</Table.Cell>
                        <Table.Cell>Fractal iDOS</Table.Cell>
                        <Table.Cell>.idos.network</Table.Cell>
                        <Table.Cell>1 year</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>idOS-signer-public-key</Table.Cell>
                        <Table.Cell>Functional/Essential</Table.Cell>
                        <Table.Cell>Fractal iDOS</Table.Cell>
                        <Table.Cell>enclave.idos.network</Table.Cell>
                        <Table.Cell>1 year</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>idOS-signer-address</Table.Cell>
                        <Table.Cell>Functional/Essential</Table.Cell>
                        <Table.Cell>Fractal iDOS</Table.Cell>
                        <Table.Cell>enclave.idos.network</Table.Cell>
                        <Table.Cell>1 year</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>idOS-password</Table.Cell>
                        <Table.Cell>Functional/Essential</Table.Cell>
                        <Table.Cell>Fractal iDOS</Table.Cell>
                        <Table.Cell>enclave.idos.network</Table.Cell>
                        <Table.Cell>1 year</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>idOS-human-id</Table.Cell>
                        <Table.Cell>Functional/Essential</Table.Cell>
                        <Table.Cell>Fractal iDOS</Table.Cell>
                        <Table.Cell>enclave.idos.network</Table.Cell>
                        <Table.Cell>1 year</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table.Root>
                </Tabs.Content>
              </Tabs.Root>
            </Card>
          </Flex>
        </Container>
      </Section>
    </>
  );
};

ContactUsPage.getLayout = useDefaultLayout;

export default ContactUsPage;

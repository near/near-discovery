import { Accordion, Card, Container, Flex, Section, Text } from '@near-pagoda/ui';
import Link from 'next/link';

import { MetaTags } from '@/components/MetaTags';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const ContactUsPage: NextPageWithLayout = () => {
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
              <Accordion.Root type="multiple">
                <Accordion.Item value="one">
                  <Accordion.Trigger>Overview</Accordion.Trigger>

                  <Accordion.Content>
                    <Text>
                      This Cookie Policy explains how Discovery Domain, Ltd. and its group companies
                      (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot; and &quot;our&quot;) use cookies and similar
                      technologies when you visit our websites such as pagoda.co and other managed websites that link to
                      this policy (each a “Site” and collectively the &quot;Sites&quot;), and/or when you interact with
                      online advertisements or marketing emails (the Sites, and associated services are collectively
                      referred to as the &quot;Services&quot;). It explains what these technologies are and why we use
                      them, as well as your rights to control our use of them. In some cases, we may use cookies and
                      similar technologies to collect personal information, or information that becomes personal
                      information if we combine it with other information. In such cases, the Privacy Policy will apply
                      in addition to this Cookie Policy. You can review your cookie preferences and update your choices
                      by visiting our Cookie Preferences Manager. This is in addition to any other controls that may be
                      available to you.
                    </Text>
                  </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="two">
                  <Accordion.Trigger>WHAT ARE COOKIES?</Accordion.Trigger>

                  <Accordion.Content>
                    <Text>
                      {' '}
                      Browser cookies are text files with small pieces of data downloaded onto your computer or mobile
                      device. Browser cookies and other similar technologies (collectively called “Cookies” in this
                      Cookies Policy) enable websites and apps to store information or facilitate access to information
                      stored on your device to enable certain features and distinguish you from other visitors. These
                      technologies are used by most website and app providers to let users navigate between pages
                      efficiently, ensure security of the webpage or application, understand how their websites are
                      used, remember user preferences and generally improve the user experience. More information on
                      cookies and their use can be found at www.aboutcookies.org or www.allaboutcookies.org. Cookies set
                      by the website operator are called &quot;first party cookies&quot; and cookies set by parties
                      other than the website operator are called &quot;third party cookies”. The Privacy Policy may
                      include more information on how third parties use cookies.
                    </Text>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="three">
                  <Accordion.Trigger>WHAT ARE COOKIES?</Accordion.Trigger>

                  <Accordion.Content>
                    <Text>
                      When you access our Sites and Services, we, or companies we work with, may place cookies and
                      similar technologies (such as web beacons, software development kits (“SDKs”), pixels, APIs,
                      mobile advertising identifiers, tags and local storage) on your computer or other device. We use
                      cookies for the following purposes: Strictly Necessary purposes Strictly Necessary Cookies are
                      essential for our Services to function and therefore cannot be switched off. They are usually only
                      set in response to actions made by you which amount to a request for services, such as setting
                      your privacy preferences, logging in, or filling in forms. These also include cookies we may rely
                      on for security purposes, such as to prevent unauthorized access attempts. You can set your
                      browser to block or alert you about these cookies at any time, but some features of our Services
                      may not work. Performance purposes We use these Cookies to count visits and traffic sources so we
                      can measure and improve the performance of our Services. They help us to know which pages are the
                      most and least popular and see how visitors move around the Sites, and to resolve any errors that
                      occur on the Services quickly to provide you with a better experience. Functional purposes We use
                      these Cookies to remember the choices you make (e.g. country or language selection) and to tailor
                      our Services to your preferences. For example, our first party cookies may remember your cookie
                      preferences. Targeting purposes First party and third party cookies are used for advertising and
                      measurement purposes. These advertising cookies are used to serve personalized advertising on our
                      Services or to serve advertising on other third party sites that may be relevant to you or your
                      interests. This means that after you have been to our Services, you may see advertisements about
                      our Services elsewhere on the Internet. These cookies are also used to help measure the
                      effectiveness of advertising campaigns. The information collected through this process does not
                      enable these third party service providers to identify your name, contact details or other
                      personal information that directly identifies you. For example, our Google Analytics cookie is
                      used to surface targeted ads on Google and measure conversion rates. Our third-party service
                      providers may place cookies on your browser or device to help us keep our Services safe and
                      secure, promote our Services on other apps and websites, and enable us, our advertisers and
                      measurement partners to measure the effectiveness of advertising campaigns.{' '}
                    </Text>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="four">
                  <Accordion.Trigger>HOW LONG WILL COOKIES STAY ON MY BROWSING DEVICE?</Accordion.Trigger>

                  <Accordion.Content>
                    <Text>
                      The length of time a cookie will stay on your browsing device depends on whether it is a
                      &quot;persistent&quot; or &quot;session&quot; cookie. Session cookies will only stay on your
                      device until you close your browser. Persistent cookies are set to automatically expire after a
                      defined duration (for example, a few days, weeks or months).{' '}
                    </Text>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="five">
                  <Accordion.Trigger>
                    HOW TO MANAGE COOKIES, SIMILAR TECHNOLOGIES AND TARGETED ONLINE MOBILE ADVERTISING
                  </Accordion.Trigger>

                  <Accordion.Content>
                    <Text>
                      You have the right to decide whether to accept or reject cookies (except strictly necessary
                      cookies). You can enable or disable categories of cookies by visiting our Cookie Preferences
                      Manager. This includes both first party and third party cookies. You can also use the browser with
                      which you are viewing this website to enable, disable or delete cookies. To do this, follow the
                      instructions provided by your browser (usually located within the &quot;Help&quot;,
                      &quot;Tools&quot; or &quot;Edit&quot; settings). However, please note, if you set your browser to
                      disable cookies, you may not be able to access secure areas of our Services. Also, if you disable
                      cookies, other parts of our Services may not function properly.
                    </Text>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="six">
                  <Accordion.Trigger>WILL THIS COOKIE POLICY BE UPDATED?</Accordion.Trigger>

                  <Accordion.Content>
                    <Text>
                      {' '}
                      We may update this Cookie Policy from time to time to reflect, for example, changes to the cookies
                      we use or for other operational, legal or regulatory reasons. You can also revisit this page if
                      you wish to keep yourself informed.
                    </Text>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="seven">
                  <Accordion.Trigger>WHAT ARE COOKIES?</Accordion.Trigger>

                  <Accordion.Content>
                    <Text>
                      See details on all cookies in use on near.org <Link href="/cookies/details">here</Link>
                    </Text>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </Card>
          </Flex>
        </Container>
      </Section>
    </>
  );
};

ContactUsPage.getLayout = useDefaultLayout;

export default ContactUsPage;

// NOTE: This page is a temporary hack to solve SEO. Don't convert to TSX - leave as JSX.

import styled from 'styled-components';

import { VmComponent } from '@/components/vm/VmComponent';
import { recordClick } from '@/utils/analytics';
import { useBosComponents } from '@/hooks/useBosComponents';

export function NearOrgEcosystemCommunityPage() {
  const components = useBosComponents();

  const Wrapper = styled.div`
    --section-gap: 162px;
    --large-gap: 82px;
    --medium-gap: 48px;
    padding: calc(var(--section-gap) / 2) 0 0;
    position: relative;

    @media (max-width: 900px) {
      --section-gap: 60px;
      --large-gap: 48px;
      --medium-gap: 24px;
    }
  `;
  const H1 = styled.h1`
    font: var(--text-hero);
    text-align: center;
    letter-spacing: -0.015em;
    color: var(--sand12);
    margin: 0;
    max-width: 960px;

    @media (max-width: 900px) {
      font: var(--text-2xl);
      font-weight: 600;
    }
  `;

  const Text = styled.p`
    font: var(--${(p) => p.size ?? 'text-base'});
    font-weight: ${(p) => p.fontWeight};
    color: var(--${(p) => p.color ?? 'sand10'});
    margin: 0;
    text-align: ${(p) => p.align};

    [href] {
      color: var(--violet8);
      &:hover {
        color: var(--violet11);
        text-decoration: none;
      }
      &:focus {
        text-decoration: underline;
        outline: none;
      }
    }

    ${(p) =>
      p.flex &&
      `
    display: flex;
    align-items: center;
    gap: 16px;
  `}
  `;
  const Flex = styled.div`
    display: flex;
    gap: ${(p) => p.gap};
    align-items: ${(p) => p.alignItems};
    justify-content: ${(p) => p.justifyContent};
    flex-direction: ${(p) => p.direction ?? 'row'};
    flex-wrap: ${(p) => p.wrap ?? 'nowrap'};

    ${(p) =>
      p.mobileStack &&
      `
    @media (max-width: 900px) {
      flex-direction: column;
      gap: ${(p) => (p.mobileStack === true ? 'var(--section-gap)' : p.mobileStack)};
    }
  `}
  `;
  const Section = styled.div`
    display: flex;
    padding: calc(var(--section-gap) / 2);
    gap: ${(p) => p.gap ?? 'var(--medium-gap)'};
    flex-direction: column;
    align-items: ${(p) => (p.center ? 'center' : undefined)};
    justify-content: ${(p) => (p.center ? 'center' : undefined)};
    text-align: ${(p) => (p.center ? 'center' : undefined)};
    background: ${(p) => p.background};

    @media (max-width: 900px) {
      padding-left: var(--medium-gap);
      padding-right: var(--medium-gap);
    }
  `;
  const Card = styled.div`
    display: flex;
    flex-direction: ${(p) => p.direction ?? 'column'};
    gap: ${(p) => p.gap ?? '24px'};
    width: 100%;
    padding: ${(p) => p.padding ?? '32px'};
    border-radius: 8px;
    border: ${(p) => p.border ?? '1px solid var(--sand4)'};
    align-items: ${(p) => (p.center ? 'center' : 'flex-star')};
    justify-content: ${(p) => (p.center ? 'center' : undefined)};
    text-align: ${(p) => (p.center ? 'center' : undefined)};
    background: ${(p) => p.background ?? 'var(--sand1)'};
  `;
  const SocialIcon = styled.i`
    font-size: ${(p) => p.size ?? '30px'};
    text-align: ${(p) => p.align};
    color: ${(p) => p.color};
  `;

  function returnIpfsImage(cfid) {
    return {
      ipfs_cid: cfid,
    };
  }

  const ipfsImages = {
    logoCreatebase: 'bafkreignv7fxrwquqr66wsow76amhghyrdd3k3ecb7up6dzem6vhz2cgki',
    logoCypherpunkGuild: 'bafkreie25aa7gfb5u3p7bouxc6xknismfgtdtlt3yi7pqau3nqtksvvnsm',
    logo4NTSGuild: 'bafkreifrjw7dyg7ff3jrvzq35napmpiwcxdt2wrmo4hkysma7scr3jwake',
  };

  const involvedCards = [
    {
      iconClassName: 'ph ph-binoculars',
      iconColor: 'violet7',
      title: 'Find your Tribe',
      content: 'Make friends and connections pursuing a mission you’re passionate about.',
    },
    {
      iconClassName: 'ph ph-chart-pie-slice',
      iconColor: 'red7',
      title: 'Make an Impact',
      content: 'Help give power (money, data, and governance) back to the people.',
    },
    {
      iconClassName: 'ph ph-hand-heart',
      iconColor: 'cyan7',
      title: 'Give Back',
      content: 'When you contribute to building a better future, good things happen.',
    },
    {
      iconClassName: 'ph ph-chart-line-up',
      iconColor: 'green7',
      title: 'Make a Living',
      content: 'Work when you want, how you want, and get paid based on your contribution.',
    },
  ];
  const getStartedCards = [
    {
      iconClassName: 'ph ph-graduation-cap',
      iconColor: 'violet7',
      title: 'Education',
      content: 'Learn the basics, explore the ecosystem, or dive deep into the tech.',
      href: 'https://near.org/learn/learn-more',
      hrefText: 'See all Learn Resources',
      internal: false,
    },
    {
      iconClassName: 'ph ph-chats',
      iconColor: 'cyan7',
      title: 'Join our Discord',
      content: 'Join ongoing topical conversations about all things NEAR.',
      href: 'https://near.chat',
      hrefText: 'Go to Discord',
      internal: true,
    },
    {
      iconClassName: 'ph ph-check-square-offset',
      iconColor: 'red7',
      title: 'Community Events',
      content: 'Worldwide opportunities to attend, participate, connect and more.',
      href: 'https://near.events',
      hrefText: 'Go to Events Site',
      internal: true,
    },
  ];
  const featuredGuildsCards = [
    {
      ipfsImage: ipfsImages.logoCreatebase,
      title: 'Createbase',
      content:
        'A community for Creators/Projects launching on Mintbase. Get support/funding and connect with other creatives!',
    },
    {
      ipfsImage: ipfsImages.logoCypherpunkGuild,
      title: 'Cypherpunk Guild',
      content: 'A guild focussed on incentivizing builders to create privacy-enhancing technologies on NEAR.',
    },
    {
      ipfsImage: ipfsImages.logo4NTSGuild,
      title: '4NTS Guild',
      content: 'A community building and marketing-focused guild.',
    },
  ];
  const connectChannelsLinks = [
    {
      key: 'discord',
      href: 'http://near.chat',
      hrefText: 'Discord',
      internal: true,
    },
    {
      key: 'governance_forum',
      href: 'https://gov.near.org',
      hrefText: 'Governance Forum',
      internal: true,
    },
    {
      key: 'twitter',
      href: 'https://twitter.com/nearprotocol',
      hrefText: 'Twitter',
      internal: true,
    },
    {
      key: 'reddit',
      href: 'https://www.reddit.com/r/nearprotocol',
      hrefText: 'Reddit',
      internal: true,
    },
    {
      key: 'telegram',
      href: 'https://t.me/cryptonear',
      hrefText: 'Telegram',
      internal: true,
    },
    {
      key: 'github',
      href: 'https://github.com/near',
      hrefText: 'Github',
      internal: true,
    },
    {
      key: 'we_chat',
      href: 'https://near.org/ecosystem/community/wechat',
      hrefText: 'WeChat',
      internal: false,
    },
  ];

  return (
    <>
      <Wrapper className="container-xl" onPointerUp={recordClick}>
        <Section>
          <Flex gap="16px" direction="column" alignItems="start">
            <H1>Community</H1>
            <Text size="text-xl" color="sand12" style={{ maxWidth: '662px' }}>
              The NEAR community is a globally distributed home to innovators, developers, and contributors supporting
              the protocol’s platform, ecosystem, and applications. We’re all here to build a stronger ecosystem.
            </Text>
          </Flex>
        </Section>

        <Section background="linear-gradient(to right, hsla(0, 0%, 100%, 0), var(--sand3), hsla(0, 0%, 100%, 0))">
          <Text size="text-3xl" color="sand12">
            Why get involved?
          </Text>

          <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1 g-4">
            {involvedCards.map((item) => (
              <div className="col" key={item.title}>
                <Card center>
                  <SocialIcon className={item.iconClassName} color={`var(--${item.iconColor})`} />
                  <Text size="text-xl" color="sand12" fontWeight="600">
                    {item.title}
                  </Text>
                  <Text size="text-m" color="sand12">
                    {item.content}
                  </Text>
                </Card>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <Text size="text-3xl" color="sand12">
            Get Started
          </Text>
          <Text size="text-m" color="sand12">
            The NEAR Community provides a number of ways for you to start learning, earning, and growing.
          </Text>

          <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 g-4">
            {getStartedCards.map((item) => (
              <div className="col" key={item.title}>
                <Card center style={{ height: '100%' }}>
                  <SocialIcon className={item.iconClassName} color={`var(--${item.iconColor})`} />
                  <Text size="text-xl" color="sand12" fontWeight="600">
                    {item.title}
                  </Text>
                  <Text size="text-m" color="sand12">
                    {item.content}
                  </Text>
                  {item.internal ? (
                    <VmComponent
                      src={components.digButton}
                      props={{
                        href: item.href,
                        iconRight: 'ph-bold ph-arrow-up-right',
                        label: item.hrefText,
                        variant: 'primary',
                        fill: 'outline',
                        size: 'large',
                        as: 'a',
                        target: '_blank',
                      }}
                    />
                  ) : (
                    <VmComponent
                      src={components.digButton}
                      props={{
                        href: item.href,
                        iconRight: 'ph-bold ph-arrow-right',
                        label: item.hrefText,
                        variant: 'primary',
                        fill: 'outline',
                        size: 'large',
                      }}
                    />
                  )}
                </Card>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <Text size="text-3xl" color="sand12" style={{ maxWidth: '662px' }}>
            Guilds: Opening the web through community initiatives.
          </Text>
          <Text size="text-m" color="sand12" style={{ maxWidth: '662px' }}>
            Guilds are collectives that make up the greater NEAR community. Each guild shares a specific vision and
            mission related to driving a more open, interconnected, and consumer-empowered world.
          </Text>
          <Text size="text-l" color="sand12" style={{ maxWidth: '662px' }}>
            Featured Guilds
          </Text>

          <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 g-4">
            {featuredGuildsCards.map((item) => (
              <div className="col" key={item.title}>
                <Card style={{ height: '100%' }}>
                  <VmComponent
                    src={components.image}
                    props={{
                      image: returnIpfsImage(item.ipfsImage),
                      style: { width: '52px', height: '52px' },
                    }}
                  />
                  <Text size="text-xl" color="sand12" fontWeight="600">
                    {item.title}
                  </Text>
                  <Text size="text-m" color="sand12">
                    {item.content}
                  </Text>
                </Card>
              </div>
            ))}
          </div>
        </Section>

        <Section background="linear-gradient(to right, hsla(0, 0%, 100%, 0), var(--sand3), hsla(0, 0%, 100%, 0))">
          <div className="row row-cols-md-3 row-cols-1 g-4">
            <div className="col">
              <Card background="transparent" border="none" padding="32px 0" style={{ height: '100%' }}>
                <SocialIcon className="ph ph-video" color="var(--red7)" />
                <Text size="text-xl" color="sand12" fontWeight="600">
                  Watch
                </Text>
                <div>
                  <VmComponent
                    src={components.digButton}
                    props={{
                      href: 'https://www.youtube.com/channel/UCuKdIYVN8iE3fv8alyk1aMw',
                      iconRight: 'ph-bold ph-arrow-up-right',
                      label: 'NEAR YouTube Channel',
                      variant: 'primary',
                      fill: 'outline',
                      size: 'small',
                      as: 'a',
                      target: '_blank',
                    }}
                  />
                </div>
              </Card>
            </div>

            <div className="col">
              <Card background="transparent" border="none" padding="32px 0" style={{ height: '100%' }}>
                <SocialIcon className="ph ph-lightbulb" color="var(--violet7)" />
                <Text size="text-xl" color="sand12" fontWeight="600">
                  Read
                </Text>
                <Flex gap="24px" direction="column" alignItems="start">
                  <VmComponent
                    src={components.digButton}
                    props={{
                      href: 'https://near.org/blog',
                      iconRight: 'ph-bold ph-arrow-right',
                      label: 'NEAR Blog',
                      variant: 'primary',
                      fill: 'outline',
                      size: 'small',
                    }}
                  />
                  <VmComponent
                    src={components.digButton}
                    props={{
                      href: 'https://medium.com/nearprotocol',
                      iconRight: 'ph-bold ph-arrow-up-right',
                      label: 'Community Blog',
                      variant: 'primary',
                      fill: 'outline',
                      size: 'small',
                      as: 'a',
                      target: '_blank',
                    }}
                  />
                </Flex>
              </Card>
            </div>

            <div className="col">
              <Card background="transparent" border="none" padding="32px 0" style={{ height: '100%' }}>
                <SocialIcon className="ph ph-chats" color="var(--cyan7)" />
                <Text size="text-xl" color="sand12" fontWeight="600">
                  Connect
                </Text>
                <div className="row row-cols-md-2 row-cols-1 g-4">
                  {connectChannelsLinks.map((item) => (
                    <div key={item.key} className="col">
                      {item.internal ? (
                        <VmComponent
                          src={components.digButton}
                          props={{
                            href: item.href,
                            iconRight: 'ph-bold ph-arrow-up-right',
                            label: item.hrefText,
                            variant: 'primary',
                            fill: 'outline',
                            size: 'small',
                            as: 'a',
                            target: '_blank',
                          }}
                        />
                      ) : (
                        <VmComponent
                          src={components.digButton}
                          props={{
                            href: item.href,
                            iconRight: 'ph-bold ph-arrow-right',
                            label: item.hrefText,
                            variant: 'primary',
                            fill: 'outline',
                            size: 'small',
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Section>
      </Wrapper>
      <VmComponent src={components.nearOrg.footer} />
    </>
  );
}

// NOTE: This page is a temporary hack to solve SEO. Don't convert to TSX - leave as JSX.

import styled from 'styled-components';

import { VmComponent } from '@/components/vm/VmComponent';
import { recordClick } from '@/utils/analytics';
import { useBosComponents } from '@/hooks/useBosComponents';

export function NearOrgEcosystemOverviewPage() {
  const components = useBosComponents();

  const nearOrgLinks = {
    getFundingPage: '/near/widget/NearOrg.Ecosystem.GetFundingPage',
    communityPage: '/near/widget/NearOrg.Ecosystem.CommunityPage',
    workAndEarnPage: '/near/widget/NearOrg.Ecosystem.WorkAndEarnPage',
  };

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
  const Small = styled.span`
    font: inherit;
    color: inherit;
    margin: 0;
    font-size: ${(p) => p.size};
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
  const NumericLabel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 14px 21px 14px 21px;
    border-radius: 10px;
    background-color: ${(p) => p.backgroundColor ?? 'var(--white)'};
  `;
  const SocialLink = styled.a`
    color: var(--sand12);
    text-decoration: none;
    transition: all 200ms;
    &:hover {
      color: var(--sand10);
    }
  `;
  const SocialIcon = styled.i`
    font-size: ${(p) => p.size ?? '30px'};
    text-align: ${(p) => p.align};
    color: ${(p) => p.color};
  `;

  const navLinks = [
    {
      name: 'Projects & DAOs',
      href: 'anker_projects_daos',
    },
    {
      name: 'Community',
      href: 'anker_community',
    },
    {
      name: 'Venture support',
      href: 'anker_venture_support',
    },
    {
      name: 'Tech base',
      href: 'anker_tech_base',
    },
    {
      name: 'Regional hubs',
      href: 'anker_regional_hubs',
    },
    {
      name: 'Web3 career',
      href: 'anker_web3_career',
    },
  ];

  function returnIpfsImage(cfid) {
    return {
      ipfs_cid: cfid,
    };
  }

  const ipfsImages = {
    headerImage: 'bafkreifzci2sberaa2xixrvmziefyankzeydqesv662e6egpea6gd3tedu',
    projectDAOs: 'bafkreibj5poz4hg4acprnn4mo4ohn6hpku256gs2mvewo2nthzy65fvwiu',
    homepageApps: 'bafkreihmam4sppi5p3jpzynzh5gjx6zgr2gbp5kmutbwywjj5le4tvohvu',
    nearWeek: 'bafkreidcxi2e77yqguht7csjxsn42uk7f7rlxqvryrxog5m2y7acffgnli',
    humanGuild: 'bafkreia2q267cf7apo6r3o3uw35lpbrp43jb3c5udfgquee2clbkdbks4e',
    tenkDao: 'bafkreiajzdfp6vwyfn27dfvplczqrp24ncuppt7qlvgpvvraks6vx234wu',
    unchainLogo: 'bafkreiath5t7igknmarvotq7u6ly7gd6yfqygbuhueo6q4vwjdgc7vg32m',
    ecosystemCommunity: 'bafkreih4l27eegfkvkr4t4hqvnwq2bsxw4rx6o74sty62mhyao2o6waiia',
    ecosystemBanner: 'bafkreicbkkhc52wxqcrsva7d4rmg4zt2k4mcqcb2bax552yzk6zy37z2da',
    ecosystemBlog: 'bafkreighn22rod4goppcqn4etb3ss27wg2o6xwjoi5i2rdidgtrwa6cyim',
    ecosystemVenue: 'bafkreiavzhz2qks4rvucj5nkttv5izkvldirlhhsfvcs3vmpw22hjaqhfu',
    ecosystemOwcLogo: 'bafkreiczr4ykowwpw46pilg5wuldpq6d7o6mlxydqr3p2vi5betdfs54wa',
    fundingArrows: 'bafkreict6kdekqm6u4nnneewrmnffr656uxvkv2vjkruyx4gl34w46fjxi',
    logoAurora: 'bafkreieoq7wpdctcx42uywfdaoi4k3uq6rgodbjjz6mhz3qesrmaben2ju',
    logoCreativeDao: 'bafkreictzvvz2irr7tr7fhkdne2i7xpr4mf7x5b5i2vhgoqdswb73lbyyu',
    logoDevDao: 'bafkreibvh3qys5z7qbekqqhmgump4iy32nw5wfvcyegejfs4gckrbqp7pq',
    logoMarketingDao: 'bafkreifnwvfi7x5bzzxrjjvp7xbfqd3xpojtlohcgzrowtvyygogrt2emq',
    logoProximity: 'bafkreiazqis67kprs5ofbdruktmtvtun4g4bb2nbrqpwxzocuz77io6vyy',
    logoOctopus: 'bafkreibzcnifufde5ft6hx3qkwzxhzq66avfbholirvrmaf5jbojwqggey',
    logoFlux: 'bafkreifqjofqj5v4a4cl5ycdpphgyna2qdzedrvxyrdivc2mpcwlgckqsy',
    ecosystemTechnicalBase: 'bafkreifn5tsqnornzex2ezgretfgmqmv7y2f5faypzxk7pgzbuhsw4wrrq',
    ecosystemCareer: 'bafkreiei3xbvnmjiwfffso7hp333uud3gto6x7ug7namypifq375mr63am',
    jsIcon: 'bafkreih7lfumu4zbnwir5qcfzon3nam5oylsknialxei3udk3y56s4ogxu',
    rustIcon: 'bafkreigxguerx7ifrt6homkapurh2apreyhhraubpyx4ilyupzzezjikfq',
    logoBitgo: 'bafkreib7vssn35gqk3spmf26adnvjanw7r2q6b7fsxdgocrgihm7zc6jyi',
    logoFireblocks: 'bafkreif52a6b7xl2rgurr4t7jvam2evwb6sqensdvqs5wdb4mb4e2fapmu',
    logoFinoa: 'bafkreiehh6s4z6bfd5qxfr3jwoa2lr5dvezictwojrjtfqqi6grshsz6yi',
    sectionAnkerRegionalHubs: 'bafkreigdpe6rddrtrym6dzmuen4jjei7fvuitf2wrnehpllopto7obgjfu',
    logoSankore: 'bafkreidkhx655kdwmtb4mhqrs36ynbp4xgu2jlysyddsro6cnf3nilxgey',
    nearLogoKorea: 'bafkreigljspwl7cuqy54hbdcpxhabcgdy7ebmpmdaw7zvsjpa3t5karwci',
    nearLogoBalkans: 'bafkreidbhhztr4z7u3oxt453jb5qt2x3ccwdrvoe656e4i75olsvrexp3u',
    nearLogoVietnam: 'bafkreiaokaifsncqmq7ob6o7zgue2c6ao6a2e227ey4soa6daam6zzmcou',
    nearLogoIndia: 'bafkreignqxbsg7c4up2g56mxksqlm2pt5ilwfi75jng2h7kxfjnhnn3eym',
  };
  const fundingRows = {
    firstRow: [
      {
        ipfsImage: ipfsImages.logoProximity,
        title: 'Proximity Labs',
        content:
          'Proximity works to support the NEAR and Aurora DeFi ecosytems through grants, advisory services, as well as publishing open-source software for developers.',
        href: 'https://www.proximity.dev',
      },
      {
        ipfsImage: ipfsImages.humanGuild,
        title: 'Human Guild',
        content:
          'The Human Guild is an open group of founders and creators who believe everyone should be able to earn what they need in order to do what they love.',
        href: 'https://humanguild.io',
      },
      {
        ipfsImage: ipfsImages.logoAurora,
        title: 'Aurora',
        content:
          'Grow your Ethereum project on Aurora! Access funding, dedicated technical support, recruiting assistance, and more.',
        href: 'https://aurora.dev/grants',
      },
    ],
    secondRow: [
      {
        ipfsImage: ipfsImages.logoMarketingDao,
        title: 'Marketing DAO',
        content:
          'The MarketingDAO is a NEAR Community-run organization, which engage with the NEAR Community to facilitate the allocation of Community funds for marketing activities under $10,000.',
        href: 'https://gov.near.org/c/marketing/marketingdao/91',
      },
      {
        ipfsImage: ipfsImages.logoCreativeDao,
        title: 'Creative DAO',
        content:
          'The Creatives DAO will focus on enabling and supporting artists, makers, and creative projects building on NEAR.',
        href: 'https://gov.near.org/c/creatives/creatives-dao/61',
      },
      {
        ipfsImage: ipfsImages.logoDevDao,
        title: 'Developer DAO',
        content:
          'Developer DAO will cover everything development related, from a ZK working group to security audits, fixing bugs in the APIs to sourcing the next SDK to meet community needs.',
        href: 'https://www.neardevgov.org',
      },
    ],
  };
  const ventureCards = [
    {
      ipfsImage: 'bafkreiggouknmgvowdtfvtzg22p7gajl4gbfcz7tyqdcraaesfcp2von6m',
      title: 'Orderly Network raised $20M Series A',
      content: 'Key investors: Pantera Capital, Dragonfly Captial, MetaWeb',
      hrefText: 'Read on CoinDesk',
      href: 'https://www.coindesk.com/business/2022/06/09/orderly-network-raises-20m-for-defi-infrastructure-on-near-protocol',
    },
    {
      ipfsImage: 'bafkreichhms4aeb7psmwcaxg3ofcqyhrhzrjyqgl4fqopm5suk5hyvtbge',
      title: 'Sweat Economy raised $13M',
      content: 'Key investors: Spartan Capital, Electric Capital, OKX Blockdream Ventures, Goodwater Capital',
      hrefText: 'Read on CoinDesk',
      href: 'https://www.coindesk.com/business/2022/07/28/health-and-fitness-app-sweat-economy-raises-13m-in-private-token-sale-to-move-to-web3',
    },
    {
      ipfsImage: 'bafkreiewpsaoremj5vxmnbernptcarrvfvsr3tbue3wbf67mpockou3dlm',
      title: 'Connect3 raised a strategic round',
      content: 'Key investors: MetaWeb',
      hrefText: 'Read on Medium',
      href: 'https://medium.com/metaweb-vc/connect3-announces-strategic-investment-from-metaweb-ventures-c1a1ddb48294',
    },
    {
      ipfsImage: 'bafkreibie3umc2jdsdwk5pemo6vty2imc57dlmjywzy62xqvaefkv3asfq',
      title: 'Request Finance raised $5.5M seed round',
      content: 'Key investors: Animoca Brands, Balderton Capital, XAnge',
      hrefText: 'Read on yahoo finance',
      href: 'https://finance.yahoo.com/news/request-finance-raises-5-5m-044500764.html',
    },
  ];
  const rpcCards = [
    {
      ipfsImage: 'bafkreiffcutd2yya4sejyojcb6f3h4lje7rno4gdfwh3672phybriwtj3q',
      title: 'Infura',
      content: 'NEAR and Aurora',
      href: 'https://docs.infura.io/infura/networks/near',
    },
    {
      ipfsImage: 'bafkreibmoqhmmo4apt3to4tmfoer6g3fst4looifzbpnh4inlxr7pcccvm',
      title: 'Ankr',
      content: 'NEAR',
      href: 'https://www.ankr.com/docs/build-blockchain/chains/v2/near',
    },
    {
      ipfsImage: 'bafkreifhhjluhhqzoyakw3bvex64s3th23g7duitlddnlutlq3sfciuory',
      title: 'Alchemy',
      content: 'NEAR and Aurora',
      href: 'https://docs.alchemy.com/docs/how-to-add-near-aurora-to-metamask#what-is-aurora',
    },
  ];
  const storageCards = [
    {
      ipfsImage: 'bafkreidszx6usrvjvlqd6jlrqd5fwuv5hsix5nsnvzmrwqtzxnkjlq5osa',
      title: 'IPFS',
      content: 'NEAR and Aurora',
      href: 'https://docs.near.org/concepts/storage/storage-solutions#ipfs',
      hrefText: 'How to integrate',
      internal: true,
    },
    {
      ipfsImage: 'bafkreigin7ctsgww36didndjzppvq34qajk4ajhmlfuo4s6cr46lzvn7ee',
      title: 'Arweave',
      content: 'NEAR',
      href: 'https://docs.near.org/concepts/storage/storage-solutions#arweave',
      hrefText: 'How to integrate',
      internal: true,
    },
    {
      ipfsImage: 'bafkreiexs6yxjpcq4fe2p55a6ft5wf46fcvzfgkgu4zatqrtsf4eqssope',
      title: 'SIA',
      content: 'NEAR and Aurora',
      href: 'https://docs.near.org/concepts/storage/storage-solutions#sia',
      hrefText: 'How to integrate',
      internal: true,
    },
    {
      ipfsImage: 'bafkreifsxwd3svdzqcegfsultrlg5xixuyzamd5t77unjmmqmedavh3cw4',
      title: 'Machina',
      content: 'Coming soon',
      href: 'https://machina.storage',
      hrefText: 'Learn more',
      internal: true,
    },
    {
      ipfsImage: 'bafkreibn2jk7bzazc7dzzxles7oib56nfwqnvwecqgr7mw7wioievt6e2m',
      title: 'Ceramic',
      content: null,
      href: 'https://near.org/blog/near-partners-with-ceramic',
      hrefText: 'Read announcement',
      internal: false,
    },
  ];
  const oracleCards = [
    {
      ipfsImage: ipfsImages.logoFlux,
      title: 'Flux Protocol',
      content: 'Coming soon',
      href: 'https://docs.fluxprotocol.org/docs',
    },
    {
      ipfsImage: ipfsImages.logoProximity,
      title: 'Proximity',
      content: null,
      href: 'https://docs.near.org/develop/relevant-contracts/oracles',
    },
  ];
  const assetsCards = [
    {
      ipfsImage: ipfsImages.logoBitgo,
      title: 'BitGo',
      content: 'Coming soon',
      href: 'https://www.bitgo.com',
    },
    {
      ipfsImage: ipfsImages.logoFireblocks,
      title: 'Fireblocks',
      content: null,
      href: 'https://www.fireblocks.com',
    },
    {
      ipfsImage: ipfsImages.logoFinoa,
      title: 'Fiona',
      content: null,
      href: 'https://www.finoa.io',
    },
  ];
  const nearHubsCards = [
    {
      ipfsImage: ipfsImages.logoSankore,
      title: 'Kenya Regional Hub: Sankore 2.0',
      content:
        'Started in May 2022, the African-focused hub organizes events, meetups and local educational activities.',
      href: 'https://www.sankore2.com',
      hrefText: 'Visit Sankore 2.0',
    },
    {
      ipfsImage: ipfsImages.nearLogoKorea,
      title: 'NEAR Korea',
      content:
        'The Korea Hub is dedicated to driving Web3 innovation through business development and education initiatives throughout South Korea.',
      href: 'https://nearkorea.org',
      hrefText: 'Visit NEAR Korea',
    },
    {
      ipfsImage: ipfsImages.nearLogoBalkans,
      title: 'NEAR Balkans Hub',
      content:
        'NEAR Balkans is the regional hub open for everyone interested in learning about, using or building on the NEAR protocol in the Balkan countries.',
      href: 'https://nearbalkans.org',
      hrefText: 'Visit NEAR Balkans',
    },
    {
      ipfsImage: ipfsImages.nearLogoVietnam,
      title: 'NEAR Vietnam',
      content:
        'NEAR Vietnam Hub is the regional hub open for everyone interested in learning about, using or building on the NEAR protocol in Vietnam.',
      href: 'https://nearvietnamhub.org',
      hrefText: 'Visit NEAR Vietman',
    },
    {
      ipfsImage: ipfsImages.nearLogoIndia,
      title: 'NEAR India',
      content:
        'The NEAR India Hub provides resources and support for developers, entrepreneurs, and businesses in India who want to use or build on NEAR in India.',
      href: 'https://nearindiahub.com',
      hrefText: 'Visit NEAR India ',
    },
  ];

  return (
    <>
      <Wrapper className="container-xl" onPointerUp={recordClick}>
        <Section center style={{ position: 'relative' }}>
          <Flex gap="16px" direction="column" alignItems="center">
            <H1>Building the Open Web together</H1>
            <Text size="text-xl" color="sand12" style={{ maxWidth: '662px' }}>
              Projects building on NEAR are at the center. The Ecosystem is supporting them with everything they need to
              succeed.
            </Text>
          </Flex>
          <Flex gap="16px" alignItems="center" wrap="wrap" justifyContent="center">
            {navLinks.map((nav) => (
              <Text key={nav.href} as="a" href={`#${nav.href}`}>
                {nav.name}
              </Text>
            ))}
          </Flex>
        </Section>
        <Section center>
          <Flex gap="var(--large-gap)" wrap="wrap" justifyContent="center">
            <VmComponent
              src={components.image}
              props={{
                image: returnIpfsImage(ipfsImages.headerImage),
                className: 'img-fluid',
              }}
            />
          </Flex>
        </Section>
        <Section background="linear-gradient(to right, hsla(0, 0%, 100%, 0), var(--sand3), hsla(0, 0%, 100%, 0))">
          <div className="row row-cols-md-2 row-cols-1 g-4 text-md-start text-center">
            <div className="col order-md-0 order-1">
              <Flex gap="16px" direction="column">
                <Text size="text-3xl" color="sand12">
                  Hundreds of Projects and DAOs
                </Text>
                <Text size="text-xl" color="sand12">
                  Projects and DAOs bring value to users, and change to the world.
                </Text>
                <Flex gap="32px" className="justify-content-md-start justify-content-center">
                  <NumericLabel>
                    <Text size="text-3xl" color="cyan8" fontWeight="600">
                      750
                    </Text>
                    <Text size="text-l" color="sand12">
                      Active projects
                    </Text>
                  </NumericLabel>
                  <NumericLabel>
                    <Text size="text-3xl" color="cyan8" fontWeight="600">
                      125
                    </Text>
                    <Text size="text-l" color="sand12">
                      DAOs
                    </Text>
                  </NumericLabel>
                </Flex>
              </Flex>
            </div>
            <div className="col order-md-1 order-0">
              <VmComponent
                src={components.image}
                props={{
                  image: returnIpfsImage(ipfsImages.projectDAOs),
                  className: 'img-fluid',
                }}
              />
            </div>
          </div>

          <Section center id="anker_projects_daos">
            <Text size="text-3xl" color="sand12">
              Projects: Building the future on NEAR
            </Text>
            <VmComponent
              src={components.image}
              props={{
                image: returnIpfsImage(ipfsImages.homepageApps),
                className: 'img-fluid px-5',
              }}
            />
            <Text size="text-3xl" color="sand12">
              Explore hundreds of dApps already built on NEAR
            </Text>
            <VmComponent
              src={components.digButton}
              props={{
                href: 'https://awesomenear.com/',
                iconRight: 'ph-bold ph-arrow-up-right',
                label: 'Visit AwesomeNEAR',
                variant: 'affirmative',
                size: 'large',
                as: 'a',
                target: '_blank',
              }}
            />
          </Section>

          <Section center>
            <Text size="text-3xl" color="sand12">
              DAOs: A new way to organize, fund, and empower communities
            </Text>
            <Text size="text-xl" color="sand12">
              DAOs offer a new way for communities to collaborate. Members own the organization and receive rewards in
              proportion to their contributions. There are no bosses and no hierarchy. Instead, a common purpose unites
              the participants. One way to think of a DAO is a Facebook group with its own bank account.
            </Text>
          </Section>

          <Section center>
            <Text size="text-3xl" color="sand12">
              Explore DAOs, participate or get funding
            </Text>
            <Flex gap="24px" mobileStack="24px">
              <Card center>
                <VmComponent
                  src={components.image}
                  props={{
                    image: returnIpfsImage(ipfsImages.nearWeek),
                    className: 'img-fluid',
                  }}
                />
                <Flex direction="column" gap="8px">
                  <Text size="text-xl" fontWeight="600" color="sand12">
                    NEARWEEK
                  </Text>
                  <Text>
                    NEARWEEK is a Web3 news & community platform. Community members earn rewards by submitting news
                    items to the NEARWEEK DAO.
                  </Text>
                </Flex>
                <VmComponent
                  src={components.digButton}
                  props={{
                    href: 'https://nearweek.com/',
                    iconRight: 'ph-bold ph-arrow-up-right',
                    label: 'Learn more',
                    variant: 'primary',
                    fill: 'outline',
                    size: 'large',
                    as: 'a',
                    target: '_blank',
                  }}
                />
              </Card>

              <Card center>
                <VmComponent
                  src={components.image}
                  props={{
                    image: returnIpfsImage(ipfsImages.humanGuild),
                    className: 'img-fluid',
                  }}
                />
                <Flex direction="column" gap="8px">
                  <Text size="text-xl" fontWeight="600" color="sand12">
                    Human Guild
                  </Text>
                  <Text>
                    Human Guild awards grants to promising gaming projects building on NEAR and supports them in an
                    advisory role along with other services.
                  </Text>
                </Flex>
                <VmComponent
                  src={components.digButton}
                  props={{
                    href: 'https://humanguild.io/',
                    iconRight: 'ph-bold ph-arrow-up-right',
                    label: 'Learn more',
                    variant: 'primary',
                    fill: 'outline',
                    size: 'large',
                    as: 'a',
                    target: '_blank',
                  }}
                />
              </Card>

              <Card center>
                <VmComponent
                  src={components.image}
                  props={{
                    image: returnIpfsImage(ipfsImages.tenkDao),
                    className: 'img-fluid',
                  }}
                />
                <Flex direction="column" gap="8px">
                  <Text size="text-xl" fontWeight="600" color="sand12">
                    TenK DAO
                  </Text>
                  <Text>
                    TenK DAO offers professional services to help artists build generative art projects. The DAO is
                    compensated with a percentage of sales and royalties.
                  </Text>
                </Flex>
                <VmComponent
                  src={components.digButton}
                  props={{
                    href: 'https://tenk.dev/',
                    iconRight: 'ph-bold ph-arrow-up-right',
                    label: 'Learn more',
                    variant: 'primary',
                    fill: 'outline',
                    size: 'large',
                    as: 'a',
                    target: '_blank',
                  }}
                />
              </Card>
            </Flex>
            <Flex gap="32px" mobileStack="32px">
              <Card center direction="row" className="flex-md-nowrap flex-wrap">
                <VmComponent
                  src={components.image}
                  props={{
                    image: returnIpfsImage(ipfsImages.unchainLogo),
                    className: 'img-fluid me-4',
                  }}
                />
                <Flex
                  direction="column"
                  gap="16px"
                  className="align-items-center align-items-md-start justify-content-center justify-content-md-start"
                >
                  <Text size="text-xl" fontWeight="600" color="sand12">
                    How crypto became a major source of relief for embattled Ukraine
                  </Text>
                  <Text className="text-center text-md-start">
                    Created on AstroDAO, a DAO-launching platform built on NEAR, Unchain Fund raises funds for
                    humanitarian efforts in in Ukraine, including evacuation, shelter, food, and more. In under a month,
                    Unchain has collected over $7 million USD and counting across a range of cryptocurrencies including,
                    BSC, ETH, Harmony, NEAR, and Polygon.
                  </Text>
                  <VmComponent
                    src={components.digButton}
                    props={{
                      href: 'https://unchain.fund/',
                      iconRight: 'ph-bold ph-arrow-up-right',
                      label: 'Learn more',
                      variant: 'primary',
                      fill: 'outline',
                      size: 'large',
                      as: 'a',
                      target: '_blank',
                    }}
                  />
                </Flex>
              </Card>
            </Flex>
            <Flex gap="32px">
              <VmComponent
                src={components.digButton}
                props={{
                  href: 'https://astrodao.com/',
                  iconRight: 'ph-bold ph-arrow-up-right',
                  label: 'Browse DAOs on AstroDAO',
                  variant: 'affirmative',
                  size: 'large',
                  as: 'a',
                  target: '_blank',
                }}
              />
            </Flex>
          </Section>
          <Section gap="24px">
            <Card>
              <Text size="text-xl" fontWeight="600" color="sand12" align="left">
                Looking for funding to start a project or DAO?
              </Text>
              <Text align="left">
                The NEAR ecosystem has plenty of options available to fund promising projects or initiatives that bring
                the ecosystem forward.
              </Text>
              <div>
                <VmComponent
                  src={components.digButton}
                  props={{
                    href: nearOrgLinks.getFundingPage,
                    iconRight: 'ph-bold ph-arrow-right',
                    label: 'Explore funding options',
                    variant: 'affirmative',
                    size: 'large',
                  }}
                />
              </div>
            </Card>

            <Card>
              <Text size="text-xl" fontWeight="600" color="sand12" align="left">
                Thinking about starting a DAO?
              </Text>
              <Text align="left">
                Whether you want to organize your annual tailgate party so you can enjoy it more or manage the budget of
                your first film, you can set up a DAO that supports your needs. Platforms like SputnikDAO and AstroDAO
                are ways for organizations around the world to represent membership, facilitate governance, make
                decisions, and interact with other DAOs. Create your own DAO today!
              </Text>
              <div>
                <VmComponent
                  src={components.digButton}
                  props={{
                    href: 'https://app.astrodao.com/all/daos',
                    iconRight: 'ph-bold ph-arrow-up-right',
                    label: 'Create a new DAO',
                    variant: 'affirmative',
                    size: 'large',
                    as: 'a',
                    target: '_blank',
                  }}
                />
              </div>
            </Card>
          </Section>
        </Section>

        <Section gap="32px" id="anker_community">
          <div className="row row-cols-md-2 row-cols-1 g-4 text-md-start text-center">
            <div className="col order-md-0 order-1">
              <Flex gap="16px" direction="column">
                <Text size="text-3xl" color="sand12">
                  A vibrant, welcoming community
                </Text>
                <Text size="text-xl" color="sand12">
                  NEAR’s vibrant community is a globally distributed home for developers, token holders, validators, and
                  members supporting the protocol’s platform, ecosystem, and applications.
                </Text>
                <Flex gap="32px" wrap="wrap" className="justify-content-md-start justify-content-center">
                  <NumericLabel backgroundColor="var(--sand3)">
                    <Text size="text-3xl" color="cyan8" fontWeight="600">
                      550<Small size="20px">k</Small>
                    </Text>
                    <Text size="text-l" color="sand12">
                      Members
                    </Text>
                  </NumericLabel>
                  <NumericLabel backgroundColor="var(--sand3)">
                    <Text size="text-3xl" color="cyan8" fontWeight="600">
                      4<Small size="20px">k</Small>
                    </Text>
                    <Text size="text-l" color="sand12">
                      Developers
                    </Text>
                  </NumericLabel>
                  <NumericLabel backgroundColor="var(--sand3)">
                    <Text size="text-3xl" color="cyan8" fontWeight="600">
                      120
                    </Text>
                    <Text size="text-l" color="sand12">
                      Guilds
                    </Text>
                  </NumericLabel>
                </Flex>
              </Flex>
            </div>
            <div className="col order-md-1 order-0">
              <VmComponent
                src={components.image}
                props={{
                  image: returnIpfsImage(ipfsImages.ecosystemCommunity),
                  className: 'img-fluid mx-auto',
                }}
              />
            </div>
          </div>
          <Flex className="justify-content-md-start justify-content-center">
            <VmComponent
              src={components.digButton}
              props={{
                href: nearOrgLinks.communityPage,
                iconRight: 'ph-bold ph-arrow-right',
                label: 'Explore all parts of the Community',
                variant: 'affirmative',
                size: 'large',
              }}
            />
          </Flex>
        </Section>

        <Section className="mx-auto" style={{ maxWidth: '1000px' }}>
          <Text size="text-3xl" color="sand12" align="center">
            Join the NEAR community
          </Text>
          <Card gap="0" padding="0" direction="row" background="var(--violet3)" style={{ overflow: 'hidden' }}>
            <div className="row">
              <div className="col-12 col-sm-6">
                <VmComponent
                  src={components.image}
                  props={{
                    image: returnIpfsImage(ipfsImages.ecosystemBanner),
                    className: 'img-fluid',
                    style: {
                      objectFit: 'cover',
                      width: '100%',
                      height: 'calc(100% + 1px)',
                    },
                  }}
                />
              </div>
              <div className="col-12 col-sm-6 p-4">
                <Flex gap="24px" direction="column">
                  <Text size="text-2xl" color="sand12">
                    Join the NEAR Governance Forum
                  </Text>
                  <Text size="text-xl" color="sand12">
                    Here, NEAR Community members, developers, and the NEAR Foundation team come together to build
                    something great and expand the NEAR ecosystem.
                  </Text>
                  <div>
                    <VmComponent
                      src={components.digButton}
                      props={{
                        href: 'https://gov.near.org/',
                        iconRight: 'ph-bold ph-arrow-up-right',
                        label: 'Browse Governance Forum',
                        variant: 'affirmative',
                        size: 'large',
                        as: 'a',
                        target: '_blank',
                      }}
                    />
                  </div>
                </Flex>
              </div>
            </div>
          </Card>

          <Card gap="0" padding="0" direction="row" background="var(--red3)" style={{ overflow: 'hidden' }}>
            <div className="row">
              <div className="col-12 col-sm-6">
                <VmComponent
                  src={components.image}
                  props={{
                    image: returnIpfsImage(ipfsImages.ecosystemBlog),
                    className: 'img-fluid',
                    style: {
                      objectFit: 'cover',
                      width: '100%',
                      height: 'calc(100% + 1px)',
                    },
                  }}
                />
              </div>
              <div className="col-12 col-sm-6 p-4">
                <Flex gap="24px" direction="column">
                  <Text size="text-2xl" color="sand12">
                    Explore the NEAR Community Blog
                  </Text>
                  <Text size="text-xl" color="sand12">
                    Read articles from all across the ecosystem, easily accessible through Medium.
                  </Text>
                  <div>
                    <VmComponent
                      src={components.digButton}
                      props={{
                        href: 'https://medium.com/nearprotocol',
                        iconRight: 'ph-bold ph-arrow-up-right',
                        label: 'Read on Medium',
                        variant: 'destructive',
                        size: 'large',
                        as: 'a',
                        target: '_blank',
                      }}
                    />
                  </div>
                </Flex>
              </div>
            </div>
          </Card>
          <Flex gap="24px" justifyContent="center">
            <SocialLink title="Official Discord server" href="http://near.chat" target="_blank">
              <SocialIcon className="bi bi-discord" />
            </SocialLink>
            <SocialLink title="Official Twitter account" href="https://twitter.com/nearprotocol" target="_blank">
              <SocialIcon className="bi bi-twitter" />
            </SocialLink>
            <SocialLink
              title="Official YouTube channel"
              href="https://www.youtube.com/channel/UCuKdIYVN8iE3fv8alyk1aMw"
              target="_blank"
            >
              <SocialIcon className="bi bi-youtube" />
            </SocialLink>
            <SocialLink title="Main reddit" href="https://www.reddit.com/r/nearprotocol" target="_blank">
              <SocialIcon className="bi bi-reddit" />
            </SocialLink>
          </Flex>
          <Flex justifyContent="center">
            <VmComponent
              src={components.digButton}
              props={{
                href: nearOrgLinks.communityPage,
                iconRight: 'ph-bold ph-arrow-right',
                label: 'Explore all parts of the Community',
                variant: 'affirmative',
                size: 'large',
              }}
            />
          </Flex>
        </Section>

        <Section
          id="anker_venture_support"
          background="linear-gradient(to right, hsla(0, 0%, 100%, 0), var(--sand3), hsla(0, 0%, 100%, 0))"
          gap="32px"
        >
          <div className="row row-cols-md-2 row-cols-1 g-4 text-md-start text-center">
            <div className="col order-md-0 order-1">
              <Flex gap="16px" direction="column">
                <Text size="text-3xl" color="sand12">
                  Strong venture support
                </Text>
                <Text size="text-xl" color="sand12">
                  The ecosystem offers financial support, advice and networking to projects to help them become thriving
                  businesses.
                </Text>
                <Flex gap="32px" className="justify-content-md-start justify-content-center">
                  <NumericLabel>
                    <Text size="text-3xl" color="cyan8" fontWeight="600">
                      $120<Small size="20px">M+</Small>
                    </Text>
                    <Text size="text-l" color="sand12">
                      Awarded
                    </Text>
                  </NumericLabel>
                  <NumericLabel>
                    <Text size="text-3xl" color="cyan8" fontWeight="600">
                      2000<Small size="20px">+</Small>
                    </Text>
                    <Text size="text-l" color="sand12">
                      Projects funded
                    </Text>
                  </NumericLabel>
                </Flex>
              </Flex>
            </div>
            <div className="col order-md-1 order-0">
              <VmComponent
                src={components.image}
                props={{
                  image: returnIpfsImage(ipfsImages.ecosystemVenue),
                  className: 'img-fluid',
                }}
              />
            </div>
          </div>
          <Flex className="justify-content-md-start justify-content-center">
            <VmComponent
              src={components.digButton}
              props={{
                href: nearOrgLinks.getFundingPage,
                iconRight: 'ph-bold ph-arrow-right',
                label: 'Learn more about funding',
                variant: 'affirmative',
                size: 'large',
              }}
            />
          </Flex>
        </Section>

        <Section>
          <Text size="text-3xl" color="sand12" align="center">
            Funding
          </Text>
          <Text size="text-xl" color="sand12" align="center">
            There are several options to get financial support for your idea
          </Text>
          <Flex gap="var(--large-gap)" justifyContent="center" className="d-none d-md-flex">
            <VmComponent
              src={components.image}
              props={{
                image: returnIpfsImage(ipfsImages.fundingArrows),
                className: 'img-fluid',
                style: { padding: '0 10%' },
              }}
            />
          </Flex>
          <div className="row justify-content-center text-center">
            <div className="col-md-3 col-12 align-items-center">
              <SocialIcon className="ph ph-circles-three-plus" color="var(--red7)" />
              <Text size="text-m" color="sand12">
                Ecosystem Grants
              </Text>
            </div>
            <div className="col-md-3 col-12">
              <SocialIcon className="ph ph-trend-up" color="var(--red7)" />
              <Text size="text-m" color="sand12">
                Accelerators & Incubators
              </Text>
            </div>
            <div className="col-md-3 col-12">
              <SocialIcon className="ph ph-users-four" color="var(--red7)" />
              <Text size="text-m" color="sand12">
                Community-led DAOs
              </Text>
            </div>
            <div className="col-md-3 col-12">
              <SocialIcon className="ph ph-planet" color="var(--red7)" />
              <Text size="text-m" color="sand12">
                Regional hubs
              </Text>
            </div>
          </div>
        </Section>
        <Section>
          <Flex gap="24px" mobileStack="24px">
            {fundingRows.firstRow.map((item) => (
              <Card key={item.ipfsImage} direction="row" padding="32px 0" background="transparent" border="none">
                <VmComponent
                  src={components.image}
                  props={{
                    image: returnIpfsImage(item.ipfsImage),
                    style: { width: '80px', height: '80px' },
                  }}
                />
                <Flex direction="column" gap="8px">
                  <Text size="text-xl" fontWeight="600" color="sand12" align="left">
                    {item.title}
                  </Text>
                  <Text color="sand12" align="left">
                    {item.content}
                  </Text>
                  <VmComponent
                    src={components.digButton}
                    props={{
                      href: item.href,
                      iconRight: 'ph-bold ph-arrow-up-right',
                      label: 'Learn more',
                      variant: 'primary',
                      fill: 'outline',
                      size: 'large',
                      as: 'a',
                      target: '_blank',
                    }}
                  />
                </Flex>
              </Card>
            ))}
          </Flex>
          <Flex gap="24px" mobileStack="24px">
            {fundingRows.secondRow.map((item) => (
              <Card key={item.ipfsImage} direction="row" padding="32px 0" background="transparent" border="none">
                <VmComponent
                  src={components.image}
                  props={{
                    image: returnIpfsImage(item.ipfsImage),
                    style: { width: '80px', height: '80px' },
                  }}
                />
                <Flex direction="column" gap="8px">
                  <Text size="text-xl" fontWeight="600" color="sand12" align="left">
                    {item.title}
                  </Text>
                  <Text color="sand12" align="left">
                    {item.content}
                  </Text>
                  <VmComponent
                    src={components.digButton}
                    props={{
                      href: item.href,
                      iconRight: 'ph-bold ph-arrow-up-right',
                      label: 'Learn more',
                      variant: 'primary',
                      fill: 'outline',
                      size: 'large',
                      as: 'a',
                      target: '_blank',
                    }}
                  />
                </Flex>
              </Card>
            ))}
          </Flex>
          <Flex justifyContent="center">
            <VmComponent
              src={components.digButton}
              props={{
                href: nearOrgLinks.getFundingPage,
                iconRight: 'ph-bold ph-arrow-right',
                label: 'See all funding options',
                variant: 'affirmative',
                size: 'large',
              }}
            />
          </Flex>
        </Section>

        <Section background="linear-gradient(to right, hsla(0, 0%, 100%, 0), var(--sand3), hsla(0, 0%, 100%, 0))">
          <Text size="text-3xl" color="sand12" align="center">
            Company builders
          </Text>
          <Text size="text-xl" color="sand12" align="center">
            Join a company builder to get all the support you need from experienced startup founders and other experts.
          </Text>
          <Flex gap="32px" mobileStack="32px">
            <Card center direction="row" background="var(--black)" className="flex-md-nowrap flex-wrap">
              <VmComponent
                src={components.image}
                props={{
                  image: returnIpfsImage(ipfsImages.ecosystemOwcLogo),
                  className: 'img-fluid me-4',
                }}
              />
              <Flex
                direction="column"
                gap="16px"
                className="align-items-center align-items-md-start justify-content-center justify-content-md-start"
              >
                <Text size="text-xl" fontWeight="600" color="white" className="text-center text-md-start">
                  Boost your project with OWC
                </Text>
                <Text color="white" className="text-center text-md-start">
                  Open Web Collective is a blockchain accelerator program supporting entrepreneurs building the
                  decentralized web. By bringing together capital and seasoned advisors, OWC helps founders de-risk,
                  accelerate, and advance Web 3.0.
                </Text>
                <VmComponent
                  src={components.digButton}
                  props={{
                    href: 'https://www.openwebcollective.com/',
                    iconRight: 'ph-bold ph-arrow-up-right',
                    label: 'Contact OWC',
                    variant: 'primary',
                    fill: 'outline',
                    size: 'large',
                    as: 'a',
                    target: '_blank',
                  }}
                />
              </Flex>
            </Card>
          </Flex>

          <Section className="mx-auto" style={{ maxWidth: '1020px' }}>
            <Text size="text-3xl" color="sand12" align="center">
              Venture capital
            </Text>
            <Text size="text-xl" color="sand12" align="center">
              Many VCs are investing in projects building on NEAR. Recent examples include:
            </Text>
            <div className="row row-cols-lg-2 row-cols-1 g-4">
              {ventureCards.map((item) => (
                <div className="col" key={item.ipfsImage}>
                  <Card gap="12px" direction="row" style={{ height: '100%' }}>
                    <VmComponent
                      src={components.image}
                      props={{
                        image: returnIpfsImage(item.ipfsImage),
                        style: { width: '80px', height: '80px' },
                      }}
                    />
                    <Flex direction="column" gap="16px" alignItems="start" justifyContent="start">
                      <Text size="text-l" fontWeight="600" align="left" color="sand12">
                        {item.title}
                      </Text>
                      <Text align="left" color="sand12" size="text-m">
                        {item.content}
                      </Text>
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
                    </Flex>
                  </Card>
                </div>
              ))}
            </div>
          </Section>
        </Section>

        <Section id="anker_tech_base">
          <div className="row row-cols-md-2 row-cols-1 g-4 text-md-start text-center">
            <div className="col order-md-0 order-1">
              <Flex gap="16px" direction="column">
                <Text size="text-3xl" color="sand12">
                  NEAR’s strong technical base
                </Text>
                <Text size="text-xl" color="sand12">
                  Everything a developer needs to build amazing dApps.
                </Text>
              </Flex>
            </div>
            <div className="col order-md-1 order-0">
              <VmComponent
                src={components.image}
                props={{
                  image: returnIpfsImage(ipfsImages.ecosystemTechnicalBase),
                  className: 'img-fluid',
                }}
              />
            </div>
          </div>
        </Section>

        <Section gap="24px" center className="mx-auto" style={{ maxWidth: '1000px' }}>
          <Text size="text-3xl" color="sand12">
            NEAR’s core platform
          </Text>
          <Text size="text-xl" color="sand12">
            The simple, yet powerful base to build on
          </Text>
          <Flex gap="24px">
            <Card>
              <Text size="text-3xl" color="sand12">
                Use familiar Programming Languages
              </Text>
              <Text size="text-l" color="sand12">
                Write your smart contracts in the most used or most loved language. No need to wrestle with Solidity or
                Vyper.
              </Text>
              <Section>
                <Flex gap="48px" mobileStack="32px" justifyContent="center">
                  <Flex gap="24px" alignItems="center">
                    <VmComponent
                      src={components.image}
                      props={{
                        image: returnIpfsImage(ipfsImages.jsIcon),
                        className: 'img-fluid',
                      }}
                    />
                    <VmComponent
                      src={components.digButton}
                      props={{
                        href: 'https://docs.near.org/develop/quickstart-guide',
                        iconRight: 'ph-bold ph-arrow-up-right',
                        label: 'Start building',
                        variant: 'primary',
                        fill: 'outline',
                        size: 'large',
                        as: 'a',
                        target: '_blank',
                      }}
                    />
                  </Flex>
                  <Flex gap="24px" alignItems="center">
                    <VmComponent
                      src={components.image}
                      props={{
                        image: returnIpfsImage(ipfsImages.rustIcon),
                        className: 'img-fluid',
                      }}
                    />
                    <VmComponent
                      src={components.digButton}
                      props={{
                        href: 'https://www.near-sdk.io',
                        iconRight: 'ph-bold ph-arrow-up-right',
                        label: 'Start building',
                        variant: 'primary',
                        fill: 'outline',
                        size: 'large',
                        as: 'a',
                        target: '_blank',
                      }}
                    />
                  </Flex>
                </Flex>
                <div>
                  <VmComponent
                    src={components.digButton}
                    props={{
                      href: 'https://docs.near.org',
                      iconRight: 'ph-bold ph-arrow-up-right',
                      label: 'Just take me to the docs',
                      variant: 'primary',
                      fill: 'outline',
                      size: 'large',
                      as: 'a',
                      target: '_blank',
                    }}
                  />
                </div>
              </Section>
            </Card>
          </Flex>
          <Flex gap="24px" mobileStack="24px">
            <Card>
              <SocialIcon className="ph ph-lightning" />
              <Text size="text-xl" color="sand12" fontWeight="600">
                Be super-productive with our dev-tools
              </Text>
              <Text size="text-m" color="sand12">
                We have all you need – powerful CLI, easy-to-use SDKs, and more
              </Text>
              <VmComponent
                src={components.digButton}
                props={{
                  href: 'https://near.org/developers/tools',
                  iconRight: 'ph-bold ph-arrow-right',
                  label: 'Get started with our dev tools',
                  variant: 'primary',
                  fill: 'outline',
                  size: 'large',
                }}
              />
            </Card>
            <Card>
              <SocialIcon className="ph ph-lightbulb" />
              <Text size="text-xl" color="sand12" fontWeight="600">
                Help yourself with excellent documentations
              </Text>
              <Text size="text-m" color="sand12">
                Docs that answer almost any question. Loads of tutorials and examples
              </Text>
              <VmComponent
                src={components.digButton}
                props={{
                  href: 'https://near.org/developers/documentation',
                  iconRight: 'ph-bold ph-arrow-right',
                  label: 'Explore all documentations',
                  variant: 'primary',
                  fill: 'outline',
                  size: 'large',
                }}
              />
            </Card>
          </Flex>
        </Section>

        <Section center className="mx-auto" style={{ maxWidth: '1000px' }}>
          <Text size="text-3xl" color="sand12">
            Bridges and emulators
          </Text>
          <Text size="text-xl" color="sand12">
            Highly interoperable for a multi-chain world
          </Text>

          <Flex gap="24px" mobileStack="24px">
            <Card center>
              <VmComponent
                src={components.image}
                props={{
                  image: returnIpfsImage(ipfsImages.logoAurora),
                  style: { width: '80px', height: '80px' },
                }}
              />
              <Text size="text-xl" color="sand12" fontWeight="600">
                Ethereum & EVM
              </Text>
              <Text size="text-m" color="sand12">
                Easily migrate your Solidity contracts to the Aurora EVM. Use the Rainbow Bridge to transfer assets
                between Ethereum, NEAR and Aurora EVM. EVM.
              </Text>
              <VmComponent
                src={components.digButton}
                props={{
                  href: 'https://aurora.dev',
                  iconRight: 'ph-bold ph-arrow-up-right',
                  label: 'Go to Aurora',
                  variant: 'primary',
                  fill: 'outline',
                  size: 'large',
                  as: 'a',
                  target: '_blank',
                }}
              />
            </Card>
            <Card center>
              <VmComponent
                src={components.image}
                props={{
                  image: returnIpfsImage(ipfsImages.logoOctopus),
                  style: { width: '80px', height: '80px' },
                }}
              />
              <Text size="text-xl" color="sand12" fontWeight="600">
                AppChains on Substrate
              </Text>
              <Text size="text-m" color="sand12">
                Build app-specific chains with substrate on the Octopus network.
              </Text>
              <VmComponent
                src={components.digButton}
                props={{
                  href: 'https://oct.network',
                  iconRight: 'ph-bold ph-arrow-up-right',
                  label: 'Go to Octopus',
                  variant: 'primary',
                  fill: 'outline',
                  size: 'large',
                  as: 'a',
                  target: '_blank',
                }}
              />
            </Card>
          </Flex>
        </Section>

        <Section center>
          <Text size="text-3xl" color="sand12">
            Infrastructure providers
          </Text>
          <Text size="text-xl" color="sand12">
            Connecting NEAR to the outside world
          </Text>
        </Section>

        <Section center gap="24px" className="mx-auto" style={{ maxWidth: '1000px' }}>
          <Text size="text-3xl" color="sand12">
            RPC-Providers
          </Text>
          <Flex gap="24px" mobileStack="24px" style={{ width: '100%' }}>
            {rpcCards.map((item) => (
              <Card center key={item.ipfsImage}>
                <VmComponent
                  src={components.image}
                  props={{
                    image: returnIpfsImage(item.ipfsImage),
                    style: { width: '80px', height: '80px' },
                  }}
                />
                <Text size="text-xl" color="sand12" fontWeight="600">
                  {item.title}
                </Text>
                <Text size="text-l" color="sand12">
                  {item.content}
                </Text>
                <VmComponent
                  src={components.digButton}
                  props={{
                    href: item.href,
                    iconRight: 'ph-bold ph-arrow-up-right',
                    label: 'How to use',
                    variant: 'primary',
                    fill: 'outline',
                    size: 'large',
                    as: 'a',
                    target: '_blank',
                  }}
                />
              </Card>
            ))}
          </Flex>
        </Section>

        <Section center gap="24px" className="mx-auto" style={{ maxWidth: '1000px' }}>
          <Text size="text-3xl" color="sand12">
            Storage
          </Text>

          <div className="row row-cols-md-3 row-cols-1 g-4">
            {storageCards.map((item) => (
              <div className="col" key={item.ipfsImage}>
                <Card center>
                  <VmComponent
                    src={components.image}
                    props={{
                      image: returnIpfsImage(item.ipfsImage),
                      style: { width: '80px', height: '80px' },
                    }}
                  />
                  <Text size="text-xl" color="sand12" fontWeight="600">
                    {item.title}
                  </Text>
                  <Text size="text-l" color="sand12">
                    {item.content ?? <span className="invisible">&nbsp;</span>}
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

        <Section center gap="24px" className="mx-auto" style={{ maxWidth: '1000px' }}>
          <Text size="text-3xl" color="sand12">
            Oracles
          </Text>
          <Flex gap="24px" mobileStack="24px" style={{ width: '100%' }}>
            {oracleCards.map((item) => (
              <Card center key={item.ipfsImage}>
                <VmComponent
                  src={components.image}
                  props={{
                    image: returnIpfsImage(item.ipfsImage),
                    style: { width: '80px', height: '80px' },
                  }}
                />
                <Text size="text-xl" color="sand12" fontWeight="600">
                  {item.title}
                </Text>
                <Text size="text-l" color="sand12">
                  {item.content ?? <span className="invisible">&nbsp;</span>}
                </Text>
                <VmComponent
                  src={components.digButton}
                  props={{
                    href: item.href,
                    iconRight: 'ph-bold ph-arrow-up-right',
                    label: 'How to integrate',
                    variant: 'primary',
                    fill: 'outline',
                    size: 'large',
                    as: 'a',
                    target: '_blank',
                  }}
                />
              </Card>
            ))}
          </Flex>
        </Section>

        <Section center gap="24px" className="mx-auto" style={{ maxWidth: '1000px' }}>
          <Text size="text-3xl" color="sand12" fontWeight="600">
            Institutional custodians
          </Text>
          <Text size="text-xl" color="sand12">
            Safely storing the NEAR-token and other assets
          </Text>
          <Flex gap="24px" mobileStack="24px" style={{ width: '100%' }}>
            {assetsCards.map((item) => (
              <Card center key={item.ipfsImage}>
                <VmComponent
                  src={components.image}
                  props={{
                    image: returnIpfsImage(item.ipfsImage),
                    style: { width: '80px', height: '80px' },
                  }}
                />
                <Text size="text-xl" color="sand12" fontWeight="600">
                  {item.title}
                </Text>
                <Text size="text-l" color="sand12">
                  {item.content ?? <span className="invisible">&nbsp;</span>}
                </Text>
                <VmComponent
                  src={components.digButton}
                  props={{
                    href: item.href,
                    iconRight: 'ph-bold ph-arrow-up-right',
                    label: 'Visit website',
                    variant: 'primary',
                    fill: 'outline',
                    size: 'large',
                    as: 'a',
                    target: '_blank',
                  }}
                />
              </Card>
            ))}
          </Flex>
        </Section>

        <Section
          id="anker_regional_hubs"
          background="linear-gradient(to right, hsla(0, 0%, 100%, 0), var(--sand3), hsla(0, 0%, 100%, 0))"
        >
          <div className="row row-cols-md-2 row-cols-1 g-4 text-md-start text-center">
            <div className="col order-md-0 order-1">
              <Flex gap="16px" direction="column">
                <Text size="text-3xl" color="sand12">
                  Local presence: Regional Hubs
                </Text>
                <Text size="text-xl" color="sand12">
                  Regional Hubs organize and foster a local community of builders, entrepreneurs, and users.
                </Text>
              </Flex>
            </div>
            <div className="col order-md-1 order-0">
              <VmComponent
                src={components.image}
                props={{
                  image: returnIpfsImage(ipfsImages.sectionAnkerRegionalHubs),
                  className: 'img-fluid',
                }}
              />
            </div>
          </div>

          <Section center gap="24px" className="mx-auto" style={{ maxWidth: '1020px' }}>
            <Text size="text-3xl" color="sand12">
              NEAR hubs around the world
            </Text>

            <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 g-4">
              {nearHubsCards.map((item) => (
                <div className="col" key={item.ipfsImage}>
                  <Card center>
                    <VmComponent
                      src={components.image}
                      props={{
                        image: returnIpfsImage(item.ipfsImage),
                        style: { height: '92px' },
                      }}
                    />
                    <Text size="text-xl" color="sand12" fontWeight="600">
                      {item.title}
                    </Text>
                    <Text size="text-m" color="sand12">
                      {item.content}
                    </Text>
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
                  </Card>
                </div>
              ))}
            </div>
          </Section>
        </Section>

        <Section id="anker_web3_career">
          <div className="row row-cols-md-2 row-cols-1 g-4 text-md-start text-center">
            <div className="col order-md-0 order-1">
              <Flex gap="16px" direction="column">
                <Text size="text-3xl" color="sand12">
                  Start your web3 сareer with NEAR
                </Text>
                <Text size="text-xl" color="sand12">
                  Regardless of your background or experience, there is ample opportunity to participate in this rapidly
                  evolving space.
                </Text>
                <Flex gap="32px" className="justify-content-md-start justify-content-center">
                  <NumericLabel backgroundColor="var(--sand3)">
                    <Text size="text-3xl" color="cyan8" fontWeight="600">
                      150<Small size="20px">+</Small>
                    </Text>
                    <Text size="text-l" color="sand12">
                      Active openings
                    </Text>
                  </NumericLabel>
                </Flex>
              </Flex>
            </div>
            <div className="col order-md-1 order-0">
              <VmComponent
                src={components.image}
                props={{
                  image: returnIpfsImage(ipfsImages.ecosystemCareer),
                  className: 'img-fluid',
                }}
              />
            </div>
          </div>
        </Section>

        <Section gap="24px" center className="mx-auto" style={{ maxWidth: '1000px' }}>
          <Text size="text-3xl" color="sand12">
            Career and earning opportunities
          </Text>

          <Flex gap="24px" mobileStack="24px" style={{ width: '100%' }}>
            <Card>
              <SocialIcon className="ph ph-binoculars" />
              <Text size="text-l" color="sand12" fontWeight="600">
                Find a web3-job
              </Text>
              <VmComponent
                src={components.digButton}
                props={{
                  href: 'https://careers.near.org/jobs',
                  iconRight: 'ph-bold ph-arrow-up-right',
                  label: 'See open positions',
                  variant: 'primary',
                  fill: 'outline',
                }}
              />
            </Card>
            <Card>
              <SocialIcon className="ph ph-read-cv-logo" />
              <Text size="text-l" color="sand12" fontWeight="600">
                Get a grant for your project
              </Text>
              <VmComponent
                src={components.digButton}
                props={{
                  href: 'https://near.org/ecosystem/get-funding',
                  iconRight: 'ph-bold ph-arrow-right',
                  label: 'Explore funding options',
                  variant: 'primary',
                  fill: 'outline',
                }}
              />
            </Card>
            <Card>
              <SocialIcon className="ph ph-crosshair" />
              <Text size="text-l" color="sand12" fontWeight="600">
                Complete a bounty
              </Text>
              <VmComponent
                src={components.digButton}
                props={{
                  href: 'https://gitcoin.co/near/active',
                  iconRight: 'ph-bold ph-arrow-up-right',
                  label: 'See active bounties',
                  variant: 'primary',
                  fill: 'outline',
                }}
              />
            </Card>
          </Flex>
          <Flex gap="24px">
            <VmComponent
              src={components.digButton}
              props={{
                href: nearOrgLinks.workAndEarnPage,
                iconRight: 'ph-bold ph-arrow-right',
                label: 'Explore all earning opportunities',
                variant: 'affirmative',
                size: 'large',
              }}
            />
          </Flex>
        </Section>

        <Section
          center
          background="linear-gradient(to right, hsla(0, 0%, 100%, 0), var(--sand3), hsla(0, 0%, 100%, 0))"
          className="mx-auto"
          style={{ maxWidth: '1000px' }}
        >
          <Text size="text-3xl" color="sand12">
            Need help?
            <br />
            There are many ways!
          </Text>

          <Flex gap="24px" mobileStack="24px" style={{ width: '100%' }}>
            <Card>
              <SocialIcon className="ph ph-check-square-offset" />
              <Text size="text-l" color="sand12" fontWeight="600">
                DevRel Office Hours
              </Text>
            </Card>
            <Card>
              <SocialIcon className="ph ph-chats" />
              <Text size="text-l" color="sand12" fontWeight="600">
                Active Community
              </Text>
            </Card>
            <Card>
              <SocialIcon className="ph ph-users-three" />
              <Text size="text-l" color="sand12" fontWeight="600">
                Forum & Wiki
              </Text>
            </Card>
          </Flex>
          <Flex gap="24px">
            <VmComponent
              src={components.digButton}
              props={{
                href: 'https://near.org/developers/get-help/',
                iconRight: 'ph-bold ph-arrow-right',
                label: 'See all ways to get help',
                variant: 'affirmative',
                size: 'large',
              }}
            />
          </Flex>
          <Section style={{ width: '100%' }}>
            <VmComponent src={components.nearOrg.learningLinks} />
          </Section>
        </Section>
      </Wrapper>

      <VmComponent src={components.nearOrg.footer} />
    </>
  );
}

import styled from 'styled-components';

import { VmWidgetWrapper } from '@/components/client/VmWidgetWrapper';
import { useAuthStore } from '@/stores/auth';

export function NearOrgHomePage() {
  const signedIn = useAuthStore((store) => store.signedIn);

  const ipfsImages = {
    logos: {
      aurora: 'bafkreicg4rzob4zentugf5s27slr7glc7qpuouyfkm6njrwf6f3zb4vbca',
      calimero: 'bafkreicsj7wp7qac3nword4uiv3kju4xaxuibtwycheidv6h5tjvna633i',
      octopusNetwork: 'bafkreieqo3eru3ihffo5fobhwvlgtnbqtoavod4z3jxueakszrtsdriwm4',
      pagoda: 'bafkreicbpshopxasqhivaqugynulw6oan4lnypsphvwez3f5qidpa374ui',
      proximity: 'bafkreibi3xrwxlf5betvgmetaruwvpllc2ila4bg5ehfszoqow7f6edvom',
      sweatcoin: 'bafkreiggpunisrhikhrdzfkx552aeitrj2f3sgmqckjxizcjsxb565fvae',
    },
  };

  const web3Teams = [
    {
      url: 'https://aurora.dev',
      name: 'Aurora',
      ipfsImage: ipfsImages.logos.aurora,
    },
    {
      url: 'https://www.calimero.network',
      name: 'Calimero',
      ipfsImage: ipfsImages.logos.calimero,
    },
    {
      url: 'https://sweatco.in',
      name: 'Sweatcoin',
      ipfsImage: ipfsImages.logos.sweatcoin,
    },
    {
      url: 'https://www.proximity.dev',
      name: 'Proximity',
      ipfsImage: ipfsImages.logos.proximity,
    },
    {
      url: 'https://oct.network',
      name: 'Octopus Network',
      ipfsImage: ipfsImages.logos.octopusNetwork,
    },
    {
      url: 'https://www.pagoda.co',
      name: 'Pagoda',
      ipfsImage: ipfsImages.logos.pagoda,
    },
  ];

  function returnIpfsImage(cfid) {
    return {
      ipfs_cid: cfid,
    };
  }

  const Wrapper = styled.div`
    --section-gap: 82px;
    padding-top: 100px;

    @media (max-width: 1160px) {
      .line-rounded-corners {
        display: none !important;
      }
    }

    @media (max-width: 900px) {
      padding-top: 0;
    }
  `;

  const H1 = styled.h1`
    font-family: 'FK Grotesk', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 90px;
    line-height: 1;
    text-align: center;
    letter-spacing: -0.03em;
    color: #000;
    margin: 0;
    max-width: 700px;

    span {
      display: inline-block;
      background: #00ec97;
      border-radius: 20px;
      position: relative;
      padding: 0.1em 0.2em 0;

      svg {
        position: absolute;
        bottom: -8px;
        right: -10px;
        width: 24px;
      }
    }

    @media (max-width: 900px) {
      font-size: 50px;

      span {
        border-radius: 12px;
        svg {
          position: absolute;
          bottom: -6px;
          right: -7px;
          width: 16px;
        }
      }
    }
  `;

  const Text = styled.p`
    font-family: 'FK Grotesk', sans-serif;
    font-size: ${(p) => p.size ?? '18px'};
    line-height: ${(p) => p.lineHeight ?? '1.5'};
    font-weight: ${(p) => p.weight ?? '400'};
    color: ${(p) => p.color ?? '#000'};
    margin: 0;
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
      gap: var(--section-gap);
    }
  `}
  `;

  const Grid = styled.div`
    display: grid;
    gap: ${(p) => p.gap};
    grid-template-columns: ${(p) => p.columns};
    align-items: ${(p) => p.alignItems};

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  `;

  const Section = styled.div`
    position: relative;
    background-color: ${(p) => p.backgroundColor};
    padding: 208px 24px ${(p) => p.paddingBottom ?? 'var(--section-gap)'};
    overflow: hidden;

    @media (max-width: 900px) {
      padding-top: var(--section-gap);
      padding-bottom: ${(p) => p.paddingBottomMobile ?? 'var(--section-gap)'};
    }
  `;

  const SectionBgPattern = styled.div`
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;
    right: 0;
    height: 540px;
    background-size: 96px 96px;
    background-repeat: repeat;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFPSURBVHgB7dq9TQNBEAXgx08OJWwJdIBLIKQb6AQ6oARKACqAEiAjg0U2WieW5cAe+e77pCdtcOHOamZvEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYCruV6HIeah03fMVyiiAWpc9LTBTP6tQ5DRUaRvWHJACqNPW1lehxFk4tNaz6LnN2PjfGcPwZ2BC7nqeet4zev5teel5jivSvdMC7d9Jlrc9u5zsu34PR6Nl2QI9Zpz4Dz03MQwzI38b/r8AFoGZaRkF0AIz5EdYMU8han3EsFtKAdR667kIZRRArdcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACT8QtLwSc2g2xt5QAAAABJRU5ErkJggg==');
    filter: ${(p) => p.filter};

    @media (max-width: 900px) {
      height: 400px;
    }
  `;

  const SectionBgShape1 = styled.div`
    position: absolute;
    z-index: 0;
    inset: 0;
    overflow: hidden;

    svg {
      position: absolute;
      max-width: 70%;
      top: -70px;
      right: -150px;
      width: 846px;

      @media (max-width: 650px) {
        max-width: 100%;
        width: 270px;
        top: 0;
        right: -100px;
      }
    }
  `;

  const SectionBgShape2 = styled.div`
    position: absolute;
    z-index: 0;
    inset: 0;
    overflow: hidden;

    svg {
      position: absolute;
      max-width: 80%;
      top: 0;
      left: -30px;
      width: 790px;

      @media (max-width: 900px) {
        max-width: 100%;
        width: 370px;
        top: 0;
        left: -40px;
      }
    }
  `;

  const SectionBgShape3 = styled.div`
    position: absolute;
    z-index: 0;
    inset: 0;
    overflow: hidden;

    svg {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
  `;

  const SectionTitle = styled.div`
    position: relative;
    z-index: 15;
    display: inline-block;
    background: #fff;
    padding: 16px 42px;
    border-radius: 20px;
    align-self: ${(p) => (p.center ? 'center' : undefined)};
    margin-left: ${(p) => (p.center ? '0px' : p.marginLeft)};

    @media (max-width: 1365px) {
      margin-left: ${(p) => (p.center ? '0px' : '-100px')};
    }

    @media (max-width: 1160px) {
      margin-left: 0;
    }

    @media (max-width: 900px) {
      margin-left: ${(p) => (p.center ? '0px' : '-42px')};
      margin-bottom: calc(var(--section-gap) * -0.5);

      h2 {
        font-size: 42px;
      }
    }
  `;

  const SectionContent = styled.div`
    position: relative;
    display: flex;
    gap: ${(p) => p.gap ?? 'var(--section-gap)'};
    flex-direction: column;
    align-items: flex-start;
    z-index: 15;
    max-width: 790px;
    max-width: 900px;
    margin: 0 auto;

    @media (max-width: 900px) {
      h3 {
        font-size: 30px;
      }
    }
  `;

  const Container = styled.div`
    display: flex;
    max-width: 1060px;
    margin: 0 auto;
    gap: ${(p) => p.gap ?? 'var(--section-gap)'};
    flex-direction: column;
    align-items: ${(p) => (p.center ? 'center' : undefined)};
    justify-content: ${(p) => (p.center ? 'center' : undefined)};
    text-align: ${(p) => (p.center ? 'center' : undefined)};
    padding: var(--section-gap) 24px;
  `;

  const LogoLinks = styled.div`
    display: flex;
    gap: 72px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;

    a {
      display: block;
      height: 24px;
      color: var(--sand10);

      img {
        display: block;
        height: 100%;
        margin: 0 auto;
      }
    }

    @media (max-width: 550px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;

      a {
        height: 20px;
      }
    }
  `;

  const IconAndContent = styled.div`
    display: flex;
    gap: 32px;
    align-items: flex-start;
    position: relative;

    svg {
      width: 48px;
      flex-shrink: 0;
      flex-grow: 0;
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: flex-start;
    }
  `;

  const Line = styled.div`
    --size: 10px;
    --radius: 80px;
    --color: #fff;
    --left: -45px;
    border: var(--size) solid var(--color);
    position: absolute;
    z-index: 10;
    pointer-events: none;

    ${(p) =>
      p.straightVertical &&
      `
    border: none;
    width: var(--size);
    background: var(--color);
  `}

    ${(p) =>
      p.straightHorizontal &&
      `
    border: none;
    height: var(--size);
    background: var(--color);
  `}

  @media (max-width: 1160px) {
      display: none !important;
    }
  `;

  const LineSpacer = styled.div`
    @media (max-width: 1160px) {
      display: none;
    }
  `;

  const LineRoundedCorners = (props) => {
    return (
      <svg
        width="50"
        height="20"
        viewBox="0 0 50 20"
        {...props}
        className="line-rounded-corners"
        style={{
          zIndex: 10,
          position: 'absolute',
          pointerEvents: 'none',
          ...props.style,
        }}
      >
        <path
          d="M 30.015 0 L 50 0 C 39.059 0 30.171 8.763 30.017 19.63 L 30.017 20.003 L 19.982 20.003 L 19.982 19.57 C 19.795 8.733 10.919 0.004 0 0.004 L 19.982 0.004 L 19.982 0.003 L 30.015 0.003 L 30.015 0 Z"
          fill="#fff"
        ></path>
      </svg>
    );
  };

  return (
    <Wrapper>
      <Container center>
        <Flex gap="32px" direction="column" alignItems="center">
          <H1>
            The{' '}
            <span>
              OS{' '}
              <svg viewBox="0 0 26 24" fill="none" aria-hidden="true">
                <path
                  d="M24.3767 8.06326L1.51965 0.0649912C1.10402 -0.0830767 0.639031 0.026026 0.327308 0.340346C0.0181841 0.657263 -0.0831256 1.12225 0.0701378 1.53788L8.071 23.2519C8.23726 23.7013 8.66587 24 9.14385 24H9.14644C9.62702 24 10.0556 23.6961 10.2167 23.2441L13.734 13.495L24.3325 10.2349C24.8053 10.0895 25.13 9.65824 25.1378 9.16468C25.1482 8.67112 24.8391 8.22691 24.3715 8.06326H24.3767Z"
                  fill="#7269E1"
                />
              </svg>
            </span>{' '}
            for an open web
          </H1>

          <Text style={{ maxWidth: '670px' }}>
            Effortlessly create and distribute innovative decentralized apps across any blockchain, while helping build
            a more open web, with the NEAR Blockchain Operating System (BOS).
          </Text>

          <VmWidgetWrapper
            src="near/widget/DIG.Button"
            props={{
              href: '/onboarding',
              label: 'Try It Now',
              variant: 'affirmative',
              size: 'large',
            }}
          />
        </Flex>

        <Text size="14px" weight="600" style={{ textTransform: 'uppercase', letterSpacing: '0.17em' }}>
          Trusted by Web3’s MOST innovative teams
        </Text>

        <LogoLinks>
          {web3Teams.map((team) => {
            return (
              <a href={team.url} target="_blank" title={team.name} key={team.name}>
                <VmWidgetWrapper
                  src="mob.near/widget/Image"
                  props={{
                    image: returnIpfsImage(team.ipfsImage),
                    alt: team.name,
                  }}
                />
              </a>
            );
          })}
        </LogoLinks>
      </Container>

      <Section backgroundColor="#096D50">
        <SectionBgPattern filter="invert(72%) sepia(66%) saturate(1723%) hue-rotate(103deg) brightness(95%) contrast(101%)" />
        <SectionBgShape1>
          <svg viewBox="0 0 854 679" fill="none">
            <path
              d="M280.885 359.024C-87.1896 433.77 -10.5074 150.819 73.843 0H850V614.234L801.99 629.806C142.857 823.592 740.978 265.591 280.885 359.024Z"
              fill="#04A46E"
            />
          </svg>
        </SectionBgShape1>

        <SectionContent>
          <LineRoundedCorners
            style={{
              left: -65,
              top: -208,
            }}
          />
          <LineRoundedCorners
            style={{
              left: -65,
              top: -20,
              transform: 'rotate(180deg)',
            }}
          />
          <LineRoundedCorners
            style={{
              left: -65,
              top: 104,
            }}
          />
          <Line straightVertical style={{ left: 'var(--left)', top: -500, bottom: -500 }} />

          <SectionTitle marginLeft="-200px">
            <Text as="h2" size="72px" lineHeight="1" weight="500" color="#096D50">
              Create
            </Text>
          </SectionTitle>

          <Flex direction="column" gap="24px" style={{ maxWidth: '440px', backgroundColor: '#096D50' }}>
            <Text as="h3" size="36px" lineHeight="1.2" weight="500" color="#fff">
              Don&apos;t just move the needle, create a new gauge
            </Text>
            <Text color="#00EC97">
              The Blockchain Operating System (BOS) makes it easy to use the tools you already know to build apps that
              engage users, while fostering an open web free from centralized platforms
            </Text>
          </Flex>

          <Grid columns="1fr 1fr" gap="45px">
            <IconAndContent>
              <svg viewBox="0 0 49 48" fill="none">
                <path
                  d="M24.0168 47.9968C17.9964 47.9968 11.976 47.9968 5.95564 47.9968C2.26284 47.9968 0.00559515 45.7619 0.00239792 42.0883C-0.000799307 30.0188 -0.000799307 17.9524 0.00239792 5.8861C0.00559515 2.999 1.60101 0.79611 4.11723 0.223806C4.76307 0.0767335 5.43769 0.0127889 6.09632 0.0127889C18.0316 0 29.9668 0.00639446 41.9021 0C44.2552 0 46.1736 0.770532 47.3598 2.92866C47.8777 3.87184 47.9896 4.90775 47.9896 5.94685C48.0024 18.0132 48.0088 30.0827 47.9896 42.1491C47.9832 45.8355 45.7675 47.9936 42.0811 47.9968C36.0607 48 30.0404 47.9968 24.02 47.9968H24.0168ZM24.0168 8.61014C30.7565 8.61014 37.4931 8.61014 44.2329 8.61014C44.4727 8.61014 44.7124 8.60374 44.9522 8.61014C45.3391 8.61973 45.5533 8.46626 45.5469 8.05062C45.5373 7.0403 45.5853 6.02358 45.5213 5.01645C45.4702 4.18517 45.0609 3.51056 44.3416 3.03097C43.667 2.58336 42.9316 2.45227 42.1419 2.45227C30.05 2.45867 17.958 2.45547 5.86612 2.45547C5.6519 2.45547 5.43769 2.45227 5.22667 2.47146C3.55452 2.63771 2.50903 3.75355 2.46746 5.42889C2.45148 6.1195 2.46107 6.81329 2.46107 7.50709C2.46107 8.60694 2.46107 8.61014 3.56091 8.61014C10.3806 8.61014 17.1971 8.61014 24.0168 8.61014ZM39.5841 27.9438C39.5457 27.6049 39.2772 27.4066 39.0565 27.186C35.8945 24.0272 32.7292 20.8683 29.5608 17.7126C29.4297 17.5816 29.2986 17.4473 29.1483 17.3386C28.8158 17.0988 28.4641 16.8654 28.0741 17.2203C27.6744 17.5816 27.8087 17.9876 28.0357 18.3777C28.1284 18.5375 28.2531 18.6782 28.3682 18.8253C30.4784 21.5653 32.5662 24.3245 34.7115 27.0358C35.2423 27.7072 35.2327 28.174 34.6955 28.8326C33.4007 30.4184 32.1761 32.0618 30.9292 33.6892C29.9732 34.9329 29.0173 36.1798 28.0773 37.4364C27.8471 37.7433 27.7064 38.0918 27.9398 38.4723C28.0933 38.7248 28.3235 38.8335 28.6144 38.7952C28.8926 38.76 29.1068 38.5969 29.2954 38.4083C32.6269 35.08 35.9584 31.7485 39.2899 28.417C39.421 28.2859 39.5681 28.1644 39.5905 27.947L39.5841 27.9438ZM20.2089 17.751C20.2025 17.4952 20.0746 17.2363 19.7805 17.1116C19.3296 16.9165 18.9939 17.2075 18.719 17.4792C15.3907 20.782 12.0751 24.0975 8.75002 27.4034C8.35676 27.7935 8.40472 28.0941 8.78838 28.4713C12.0751 31.7389 15.3491 35.0224 18.6295 38.2964C18.9907 38.6577 19.4128 39.0733 19.9339 38.6289C20.4902 38.1557 20.1226 37.6698 19.8124 37.2221C19.7517 37.1358 19.6813 37.0527 19.6174 36.9696C17.5232 34.2455 15.4514 31.5055 13.3157 28.8134C12.7721 28.1292 12.8233 27.6688 13.338 27.0166C15.4962 24.2766 17.6063 21.495 19.7357 18.7326C19.9499 18.4544 20.1545 18.1794 20.2057 17.751H20.2089Z"
                  fill="#00EC97"
                />
              </svg>
              <div>
                <Text weight="500" color="#fff">
                  Code in a language you already know
                </Text>
                <Text size="13px" color="#C7F5D8">
                  The BOS is built on JavaScript, so you can get started creating new apps right away, without needing
                  to learn a new language
                </Text>
                <VmWidgetWrapper
                  src="near/widget/DIG.Button"
                  props={{
                    href: 'https://docs.near.org/discovery',
                    target: '_blank',
                    label: 'Read the Docs',
                    iconRight: 'ph-bold ph-arrow-right',
                    variant: 'secondary',
                  }}
                />
              </div>
            </IconAndContent>

            <IconAndContent>
              <svg viewBox="0 0 49 49" fill="none">
                <path
                  d="M25.2055 31.8963C25.2055 33.952 25.2247 36.0044 25.1959 38.06C25.1863 38.726 25.4233 38.9406 26.0796 38.9278C27.7318 38.8925 29.3904 38.8765 31.0426 38.9342C31.8463 38.963 32.1281 38.726 32.0961 37.9031C32.0384 36.4079 32.301 34.9894 33.3736 33.8175C34.3086 32.7993 35.4325 32.2165 36.8157 32.2037C38.8713 32.1813 40.9238 32.1845 42.9794 32.1973C45.7522 32.2133 47.8303 34.1313 47.9392 36.9009C48.0256 39.0302 48.0288 41.1723 47.936 43.3016C47.8143 46.02 45.7298 47.9508 43.0082 47.986C41.1927 48.0084 39.3804 47.9956 37.5649 47.9924C34.1421 47.986 32.1953 46.1225 32.0929 42.6868C32.0448 41.1211 32.1697 41.2748 30.6456 41.2748C26.1885 41.2716 21.7346 41.2684 17.2776 41.2748C15.6254 41.2748 15.8015 41.1019 15.8175 42.7156C15.8399 44.8289 14.9882 46.4235 13.1247 47.4513C12.4587 47.8195 11.7318 47.986 10.973 47.9892C8.94617 47.9924 6.91615 48.0148 4.88933 47.9892C2.07164 47.9476 0.0288173 45.8663 0.0128077 43.0422C0 41.0154 -0.00640384 38.9854 0.0160096 36.9586C0.0448269 34.2978 2.08765 32.2422 4.74204 32.2101C6.82329 32.1845 8.90454 32.1877 10.9858 32.2101C13.6146 32.2357 15.7022 34.2786 15.8047 36.8977C15.858 38.249 16.5539 38.9246 17.8923 38.9246C19.2788 38.9246 20.6684 38.9086 22.0548 38.931C22.5735 38.9406 22.7657 38.7517 22.7593 38.2297C22.74 36.5487 22.7368 34.8677 22.7593 33.1867C22.7689 32.6104 22.5319 32.4407 21.994 32.4631C21.3024 32.4919 20.6076 32.4727 19.9127 32.4695C17.1015 32.4471 15.0234 30.4331 14.9145 27.6058C14.8857 26.8341 14.8889 26.0592 14.9081 25.2844C14.921 24.8073 14.732 24.612 14.2485 24.6216C13.3168 24.6408 12.3818 24.6376 11.4469 24.6216C8.88213 24.5768 6.78167 22.4827 6.73684 19.9212C6.71763 18.8261 6.71443 17.7342 6.73684 16.6392C6.74645 16.1173 6.53832 15.9124 6.02922 15.9316C5.1711 15.9604 4.32259 15.8771 3.4965 15.6466C1.46968 15.0702 0.0448269 13.258 0.0192115 11.1543C-0.00640384 9.01862 -0.00640384 6.88614 0.0192115 4.75046C0.0480288 2.23375 2.03322 0.13969 4.55633 0.0564402C6.79448 -0.0172039 9.03902 -0.0204059 11.2772 0.0564402C13.7843 0.146094 15.7406 2.29458 15.8047 4.88174C15.8399 6.28418 15.5197 6.30659 17.2391 6.30339C21.9876 6.29698 26.736 6.28418 31.4877 6.3194C32.2978 6.3258 32.5988 6.08886 32.5155 5.27557C32.2433 2.60837 34.5551 -0.138877 37.7571 0.0116133C39.4605 0.0916614 41.1703 0.0148153 42.8801 0.027623C45.7971 0.0500364 47.8431 1.9872 47.9456 4.90415C48.0128 6.8221 48.0096 8.74645 47.9456 10.6676C47.8527 13.4597 45.7683 15.4449 42.973 15.4769C41.1319 15.4961 39.2908 15.4993 37.4497 15.4769C34.648 15.4449 32.5635 13.354 32.5091 10.5523C32.4856 9.35695 31.8719 8.75926 30.668 8.75926C26.0508 8.75926 21.4369 8.77847 16.8197 8.74005C16.0032 8.73365 15.7342 8.96739 15.7951 9.78067C15.9039 11.2375 15.7663 12.6496 14.8281 13.8855C13.6466 15.4417 12.0136 15.8995 10.1789 15.922C9.45314 15.9305 9.08919 16.303 9.08705 17.0394C9.08705 17.8399 9.07104 18.6404 9.09346 19.4409C9.14469 21.1699 10.1885 22.2105 11.9208 22.2586C12.6412 22.2778 13.3648 22.2329 14.082 22.2746C14.7 22.3098 14.9338 22.1017 14.9242 21.4613C14.9081 20.4783 14.8185 19.4857 15.017 18.5091C15.5197 16.0308 17.4088 14.4491 19.9352 14.4299C22.4967 14.4107 25.0582 14.4203 27.6198 14.4235C30.8377 14.4267 32.8229 16.0981 32.9958 19.3C33.1559 22.3034 33.2135 25.3292 32.9254 28.3326C32.7108 30.5772 30.5271 32.4695 28.3338 32.4695C27.7318 32.4695 27.4725 32.2454 27.402 31.653C27.1587 29.671 26.8801 27.6922 26.608 25.7102C26.5791 25.5021 26.5439 25.2844 26.4575 25.0955C26.3262 24.8073 26.0861 24.6312 25.753 24.6952C25.4585 24.7529 25.2952 24.9706 25.2632 25.2588C25.2279 25.5501 25.2151 25.8447 25.2151 26.1361C25.2119 28.0572 25.2151 29.9784 25.2151 31.8995L25.2055 31.8963Z"
                  fill="#00EC97"
                />
              </svg>
              <div>
                <Text weight="500" color="#fff">
                  Build quickly with existing components
                </Text>
                <Text size="13px" color="#C7F5D8">
                  Explore, experiment with, and combine community built components to quickly create your own app, or
                  build and publish your own from the ground up
                </Text>
                <VmWidgetWrapper
                  src="near/widget/DIG.Button"
                  props={{
                    href: '/onboarding',
                    label: 'Try it now',
                    iconRight: 'ph-bold ph-arrow-right',
                    variant: 'secondary',
                  }}
                />
              </div>
            </IconAndContent>

            <IconAndContent>
              <svg viewBox="0 0 48 49" fill="none">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.3029 8.70865C15.2965 13.5157 19.1627 17.4044 23.9505 17.414C28.8154 17.4237 32.7266 13.5671 32.7266 8.7504C32.7298 3.95618 28.7672 -0.0127825 23.9923 6.20461e-05C19.2366 0.0129066 15.3062 3.95297 15.3029 8.70865ZM13.3666 38.5145V38.5177L13.3634 38.5145H13.3666ZM13.3731 38.5145H13.3666V31.4564C13.3666 31.3977 13.3674 31.3389 13.3681 31.2803C13.37 31.124 13.3719 30.9683 13.3602 30.8142C13.3345 30.4321 13.2928 30.005 12.8111 29.9697C12.3166 29.9376 12.2331 30.355 12.1817 30.7404C11.912 32.7794 11.6455 34.8185 11.3789 36.8576C11.2749 37.6618 11.1722 38.4661 11.0695 39.2703L11.0695 39.2707L11.0695 39.2707C10.8205 41.2213 10.5715 43.1713 10.3032 45.1198C10.1812 46.0061 9.97568 46.0928 9.12152 45.8455C6.52371 45.0909 4.0383 44.0441 1.57536 42.933C0.512474 42.4546 -0.00130704 41.7321 0.0179598 40.5054L0.0316548 39.6692C0.0832192 36.5501 0.134814 33.4292 0.00511523 30.3165C-0.120119 27.3526 2.0763 25.0631 5.281 25.0438C7.68935 25.0277 10.0945 25.0245 12.5028 25.0502C13.1065 25.0566 13.4437 24.9314 13.6685 24.2763C14.4038 22.1377 16.1475 20.9079 18.5141 20.879C22.3128 20.834 26.1116 20.834 29.9072 20.879C32.277 20.9079 33.9821 22.1602 34.7785 24.3598C34.9679 24.88 35.2409 25.0502 35.7771 25.047C38.1309 25.0245 40.4846 25.0149 42.8384 25.047C45.1023 25.0791 46.7913 26.0489 47.6936 28.2003C47.8831 28.6467 47.9987 29.1059 47.9987 29.5972C47.9923 33.3414 47.9891 37.0855 47.9987 40.8329C47.9987 41.7481 47.5716 42.3454 46.7849 42.7339C44.3862 43.9253 41.904 44.9014 39.3511 45.7074C38.3525 46.0221 38.2144 45.9418 38.0795 44.8758C37.7268 42.093 37.3776 39.3102 37.0284 36.5274C36.7958 34.6733 36.5631 32.8192 36.3294 30.9651L36.3247 30.9255C36.3072 30.7805 36.2893 30.6317 36.2363 30.4963C36.1271 30.2137 35.9698 29.9376 35.6134 29.9761C35.2601 30.0146 35.1413 30.294 35.1188 30.6087C35.0996 30.8752 35.0996 31.1417 35.0996 31.4115V45.2129C35.0996 46.8341 35.0964 46.8347 33.5076 47.1305L33.4587 47.1396C29.7948 47.8268 26.102 48.1607 22.3771 48.0227C19.5994 47.9199 16.8443 47.5892 14.1084 47.0882C13.4983 46.9758 13.3634 46.613 13.3666 46.0574C13.3783 44.2288 13.3764 42.4002 13.3745 40.5716C13.3738 39.8859 13.3731 39.2002 13.3731 38.5145ZM9.1825 11.3738C12.3551 11.3771 14.8823 13.901 14.8919 17.0768C14.9015 20.2013 12.3262 22.7894 9.18571 22.8119C6.03559 22.8344 3.42172 20.2109 3.43778 17.0351C3.45062 13.8817 6.00347 11.3674 9.18571 11.3706L9.1825 11.3738ZM44.2866 17.1153C44.2994 13.962 41.7337 11.3738 38.59 11.3738C35.4239 11.3706 32.8164 13.9524 32.8357 17.0736C32.855 20.2012 35.456 22.7926 38.59 22.8054C41.6406 22.8183 44.2738 20.1884 44.2866 17.1153Z"
                  fill="#00EC97"
                />
              </svg>
              <div>
                <Text weight="500" color="#fff">
                  Onboard users in seconds without crypto
                </Text>
                <Text size="13px" color="#C7F5D8">
                  Accessibility is key to a more open web, so we made it possible for you to onboard to the BOS, and for
                  your users to onboard to your app, without any crypto
                </Text>
                <VmWidgetWrapper
                  src="near/widget/DIG.Button"
                  props={{
                    href: 'https://wiki.near.org/overview/BOS/fast-auth',
                    target: '_blank',
                    label: 'Learn about FastAuth',
                    iconRight: 'ph-bold ph-arrow-right',
                    variant: 'secondary',
                  }}
                />
              </div>
            </IconAndContent>

            <IconAndContent>
              <svg viewBox="0 0 48 48" fill="none">
                <path
                  d="M39.017 6.42747C39.0331 10.6204 35.0842 13.7089 31.0229 12.6398C30.4996 12.5017 30.2428 12.6141 29.9827 13.0475C29.1641 14.428 28.3293 15.7989 27.4721 17.1537C27.2121 17.5679 27.2313 17.8375 27.6005 18.1779C28.3935 18.9066 29.0388 19.7638 29.5044 20.7366C29.6777 21.1026 29.8639 21.2599 30.3102 21.1187C31.4563 20.7559 32.6185 20.4412 33.7807 20.133C34.2463 20.011 34.4068 19.7638 34.4357 19.2855C34.6251 16.014 36.8082 13.5483 40.0251 13.1213C42.8054 12.7553 45.7751 14.2418 46.8924 17.3881C47.7239 19.7221 47.3129 21.8988 45.6724 23.7481C44.0158 25.6166 41.9065 26.2908 39.4408 25.7674C37.6654 25.3886 36.317 24.4062 35.3988 22.862C35.1388 22.4221 34.8723 22.3451 34.426 22.4735C33.296 22.801 32.1659 23.1252 31.0261 23.4077C30.5446 23.5265 30.3776 23.7256 30.4418 24.2393C30.5702 25.3148 30.3616 26.3742 30.0566 27.4016C29.774 28.3615 29.4883 28.4418 28.7146 27.8286C27.1414 26.5829 25.5779 25.3276 24.008 24.0819C23.8411 23.9503 23.6709 23.8155 23.4783 23.7288C23.2118 23.6036 22.9518 23.6485 22.7656 23.9054C22.6018 24.1301 22.6211 24.3645 22.788 24.5731C23.0224 24.8653 23.2568 25.1575 23.5136 25.4303C26.6823 28.766 29.8607 32.0889 33.0166 35.4374C33.4597 35.9094 33.8064 36.0378 34.4549 35.7328C36.9013 34.5802 39.8229 35.1389 41.64 37.0106C43.6337 39.0685 44.0992 41.9612 42.8472 44.5006C41.6336 46.9567 38.6575 48.4142 35.9061 47.9038C33.0905 47.3805 30.9844 45.0464 30.7115 42.2276C30.5735 40.8118 30.8817 39.5148 31.5751 38.3044C31.7967 37.9159 31.7999 37.6687 31.482 37.3316C30.0437 35.8195 28.6215 34.2945 27.2217 32.7503C26.8172 32.304 26.5026 32.2173 25.9311 32.5352C22.5151 34.439 19.1794 34.2335 15.9946 31.9701C15.5837 31.678 15.3172 31.6747 14.9576 31.999C14.1037 32.7695 13.24 33.5272 12.3572 34.2624C11.9783 34.5802 12.1709 34.8596 12.3154 35.1806C14.216 39.4409 11.134 44.2663 6.45307 44.2631C3.69847 44.2631 1.6887 42.889 0.603559 40.3816C-0.452692 37.9416 -0.10917 35.5915 1.68549 33.585C3.57326 31.4789 5.92655 30.9331 8.61051 31.7935C8.96367 31.9059 9.35856 32.0118 9.63145 32.243C10.2864 32.792 10.7391 32.5705 11.2688 32.0407C11.9302 31.3826 12.6654 30.7951 13.3845 30.1979C13.7505 29.8961 13.8147 29.6425 13.5675 29.1834C11.7247 25.7386 11.9558 22.4061 14.2513 19.2502C14.6238 18.7397 14.643 18.4475 14.2224 17.966C12.8901 16.4313 11.6091 14.855 10.3217 13.2819C10.0456 12.9415 9.81445 12.8581 9.37782 13.0507C6.99243 14.1005 4.72903 13.7377 2.76422 12.1229C0.629242 10.3667 -0.105959 8.02308 0.683821 5.34875C1.43186 2.80925 3.21047 1.27785 5.81418 0.854062C8.56557 0.407804 10.7648 1.44158 12.2673 3.77561C13.7056 6.01011 13.6831 8.32808 12.2673 10.5754C11.9173 11.1308 11.9077 11.4551 12.3411 11.9495C13.6446 13.4392 14.8966 14.9706 16.1487 16.502C16.4666 16.8904 16.7266 17.006 17.2178 16.7492C19.539 15.542 21.9597 15.3655 24.4318 16.2291C24.9294 16.4025 25.1927 16.3286 25.4624 15.8631C26.1944 14.5885 26.936 13.314 27.7514 12.094C28.1849 11.4455 28.1239 11.0249 27.6359 10.4245C24.8138 6.9572 26.3677 1.70163 30.5767 0.337174C34.8241 -1.03692 39.001 1.97452 39.0203 6.42747H39.017Z"
                  fill="#00EC97"
                />
              </svg>

              <div>
                <Text weight="500" color="#fff">
                  Contribute to a more open web
                </Text>
                <Text size="13px" color="#C7F5D8">
                  Every component, even this page, is live on NEAR&apos;s public blockchain platform - the source code
                  is available to anyone to inspect, fork, modify, and reuse
                </Text>
                <VmWidgetWrapper
                  src="near/widget/DIG.Button"
                  props={{
                    href: 'https://wiki.near.org/overview/BOS/open-source',
                    target: '_blank',
                    label: 'Learn more',
                    iconRight: 'ph-bold ph-arrow-right',
                    variant: 'secondary',
                  }}
                />
              </div>
            </IconAndContent>
          </Grid>
        </SectionContent>
      </Section>

      <Section backgroundColor="#17D9D4" paddingBottom="324px">
        <SectionBgPattern filter="invert(48%) sepia(84%) saturate(2311%) hue-rotate(150deg) brightness(99%) contrast(90%)" />
        <SectionBgShape2>
          <svg viewBox="0 0 790 624" fill="none">
            <path
              d="M604 148C748.8 121.6 788.333 38.3333 790 0H2.99999C1.33332 157.333 -1.00001 479.4 2.99999 509C7.99999 546 54 624 164 624C274 624 304 507 307 380C310 253 423 181 604 148Z"
              fill="#88E8E3"
            />
          </svg>
        </SectionBgShape2>

        <SectionContent>
          <LineRoundedCorners
            style={{
              left: 199,
              top: 43,
              transform: 'rotate(90deg)',
            }}
          />
          <LineRoundedCorners
            style={{
              right: 199,
              top: 43,
              transform: 'rotate(-90deg)',
            }}
          />
          <Line
            style={{
              left: 'var(--left)',
              top: -442,
              height: 500,
              width: 500,
              borderBottomLeftRadius: 'var(--radius)',
              borderTopWidth: 0,
              borderRightWidth: 0,
            }}
          />
          <Line
            style={{
              left: 442,
              top: 48,
              height: 360,
              width: 500,
              borderTopRightRadius: 'var(--radius)',
              borderBottomRightRadius: 'var(--radius)',
              borderLeftWidth: 0,
            }}
          />
          <Line
            style={{
              left: 98,
              top: 398,
              width: 500,
            }}
            straightHorizontal
          />

          <SectionTitle center>
            <Text as="h2" size="72px" lineHeight="1" weight="500" color="#17D9D4">
              Distribute
            </Text>
          </SectionTitle>

          <Flex
            direction="column"
            gap="24px"
            alignItems="center"
            style={{
              textAlign: 'center',
              alignSelf: 'center',
            }}
          >
            <Text as="h3" size="36px" lineHeight="1.2" weight="500">
              Take a direct flight, skip the layover
            </Text>
            <Text style={{ maxWidth: '414px', backgroundColor: '#17D9D4' }}>
              The BOS lets you cut out intermediaries and connect directly with users by publishing, storing, and
              hosting your app directly on chain
            </Text>
          </Flex>

          <LineSpacer />

          <Grid columns="1fr 1fr 1fr" gap="45px">
            <IconAndContent>
              <Line
                style={{
                  left: 20,
                  top: -100,
                  height: 80,
                  width: 80,
                  borderTopLeftRadius: 'var(--radius)',
                  borderRightWidth: 0,
                  borderBottomWidth: 0,
                }}
              />
              <Line
                style={{
                  left: 20,
                  top: 66,
                  height: 1000,
                }}
                straightVertical
              />
              <Line
                style={{
                  left: 20,
                  top: 320,
                  height: 80,
                  width: 564,
                  borderTopLeftRadius: 'var(--radius)',
                  borderRightWidth: 0,
                  borderBottomWidth: 0,
                }}
              />
              <svg viewBox="0 0 48 49" fill="none">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.3029 8.70865C15.2965 13.5157 19.1627 17.4044 23.9505 17.414C28.8154 17.4237 32.7266 13.5671 32.7266 8.7504C32.7298 3.95618 28.7672 -0.0127825 23.9923 6.20461e-05C19.2366 0.0129066 15.3062 3.95297 15.3029 8.70865ZM13.3666 38.5145V38.5177L13.3634 38.5145H13.3666ZM13.3731 38.5145H13.3666V31.4564C13.3666 31.3977 13.3674 31.3389 13.3681 31.2803C13.37 31.124 13.3719 30.9683 13.3602 30.8142C13.3345 30.4321 13.2928 30.005 12.8111 29.9697C12.3166 29.9376 12.2331 30.355 12.1817 30.7404C11.912 32.7794 11.6455 34.8185 11.3789 36.8576C11.2749 37.6618 11.1722 38.4661 11.0695 39.2703L11.0695 39.2707L11.0695 39.2707C10.8205 41.2213 10.5715 43.1713 10.3032 45.1198C10.1812 46.0061 9.97568 46.0928 9.12152 45.8455C6.52371 45.0909 4.0383 44.0441 1.57536 42.933C0.512474 42.4546 -0.00130704 41.7321 0.0179598 40.5054L0.0316548 39.6692C0.0832192 36.5501 0.134814 33.4292 0.00511523 30.3165C-0.120119 27.3526 2.0763 25.0631 5.281 25.0438C7.68935 25.0277 10.0945 25.0245 12.5028 25.0502C13.1065 25.0566 13.4437 24.9314 13.6685 24.2763C14.4038 22.1377 16.1475 20.9079 18.5141 20.879C22.3128 20.834 26.1116 20.834 29.9072 20.879C32.277 20.9079 33.9821 22.1602 34.7785 24.3598C34.9679 24.88 35.2409 25.0502 35.7771 25.047C38.1309 25.0245 40.4846 25.0149 42.8384 25.047C45.1023 25.0791 46.7913 26.0489 47.6936 28.2003C47.8831 28.6467 47.9987 29.1059 47.9987 29.5972C47.9923 33.3414 47.9891 37.0855 47.9987 40.8329C47.9987 41.7481 47.5716 42.3454 46.7849 42.7339C44.3862 43.9253 41.904 44.9014 39.3511 45.7074C38.3525 46.0221 38.2144 45.9418 38.0795 44.8758C37.7268 42.093 37.3776 39.3102 37.0284 36.5274C36.7958 34.6733 36.5631 32.8192 36.3294 30.9651L36.3247 30.9255C36.3072 30.7805 36.2893 30.6317 36.2363 30.4963C36.1271 30.2137 35.9698 29.9376 35.6134 29.9761C35.2601 30.0146 35.1413 30.294 35.1188 30.6087C35.0996 30.8752 35.0996 31.1417 35.0996 31.4115V45.2129C35.0996 46.8341 35.0964 46.8347 33.5076 47.1305L33.4587 47.1396C29.7948 47.8268 26.102 48.1607 22.3771 48.0227C19.5994 47.9199 16.8443 47.5892 14.1084 47.0882C13.4983 46.9758 13.3634 46.613 13.3666 46.0574C13.3783 44.2288 13.3764 42.4002 13.3745 40.5716C13.3738 39.8859 13.3731 39.2002 13.3731 38.5145ZM9.1825 11.3738C12.3551 11.3771 14.8823 13.901 14.8919 17.0768C14.9015 20.2013 12.3262 22.7894 9.18571 22.8119C6.03559 22.8344 3.42172 20.2109 3.43778 17.0351C3.45062 13.8817 6.00347 11.3674 9.18571 11.3706L9.1825 11.3738ZM44.2866 17.1153C44.2994 13.962 41.7337 11.3738 38.59 11.3738C35.4239 11.3706 32.8164 13.9524 32.8357 17.0736C32.855 20.2012 35.456 22.7926 38.59 22.8054C41.6406 22.8183 44.2738 20.1884 44.2866 17.1153Z"
                  fill="#000"
                />
              </svg>
              <div>
                <Text weight="500">Take control of your app distribution</Text>
                <Text size="13px">
                  The BOS moves everything on chain, eliminating the need for providers and intermediaries, and allowing
                  you to connect directly with your users
                </Text>
                <VmWidgetWrapper
                  src="near/widget/DIG.Button"
                  props={{
                    href: '/onboarding',
                    label: 'Try it out',
                    iconRight: 'ph-bold ph-arrow-right',
                    variant: 'primary',
                    size: 'small',
                  }}
                />
              </div>
            </IconAndContent>

            <IconAndContent>
              <Line
                style={{
                  left: 20,
                  top: -100,
                  height: 80,
                  width: 80,
                  borderTopLeftRadius: 'var(--radius)',
                  borderRightWidth: 0,
                  borderBottomWidth: 0,
                }}
              />
              <Line
                style={{
                  left: -48,
                  top: 66,
                  height: 264,
                  width: 80,
                  borderBottomRightRadius: 'var(--radius)',
                  borderTopWidth: 0,
                  borderLeftWidth: 0,
                }}
              />
              <svg viewBox="0 0 49 48" fill="none">
                <path
                  d="M24.0168 47.9968C17.9964 47.9968 11.976 47.9968 5.95564 47.9968C2.26284 47.9968 0.00559515 45.7619 0.00239792 42.0883C-0.000799307 30.0188 -0.000799307 17.9524 0.00239792 5.8861C0.00559515 2.999 1.60101 0.79611 4.11723 0.223806C4.76307 0.0767335 5.43769 0.0127889 6.09632 0.0127889C18.0316 0 29.9668 0.00639446 41.9021 0C44.2552 0 46.1736 0.770532 47.3598 2.92866C47.8777 3.87184 47.9896 4.90775 47.9896 5.94685C48.0024 18.0132 48.0088 30.0827 47.9896 42.1491C47.9832 45.8355 45.7675 47.9936 42.0811 47.9968C36.0607 48 30.0404 47.9968 24.02 47.9968H24.0168ZM24.0168 8.61014C30.7565 8.61014 37.4931 8.61014 44.2329 8.61014C44.4727 8.61014 44.7124 8.60374 44.9522 8.61014C45.3391 8.61973 45.5533 8.46626 45.5469 8.05062C45.5373 7.0403 45.5853 6.02358 45.5213 5.01645C45.4702 4.18517 45.0609 3.51056 44.3416 3.03097C43.667 2.58336 42.9316 2.45227 42.1419 2.45227C30.05 2.45867 17.958 2.45547 5.86612 2.45547C5.6519 2.45547 5.43769 2.45227 5.22667 2.47146C3.55452 2.63771 2.50903 3.75355 2.46746 5.42889C2.45148 6.1195 2.46107 6.81329 2.46107 7.50709C2.46107 8.60694 2.46107 8.61014 3.56091 8.61014C10.3806 8.61014 17.1971 8.61014 24.0168 8.61014ZM39.5841 27.9438C39.5457 27.6049 39.2772 27.4066 39.0565 27.186C35.8945 24.0272 32.7292 20.8683 29.5608 17.7126C29.4297 17.5816 29.2986 17.4473 29.1483 17.3386C28.8158 17.0988 28.4641 16.8654 28.0741 17.2203C27.6744 17.5816 27.8087 17.9876 28.0357 18.3777C28.1284 18.5375 28.2531 18.6782 28.3682 18.8253C30.4784 21.5653 32.5662 24.3245 34.7115 27.0358C35.2423 27.7072 35.2327 28.174 34.6955 28.8326C33.4007 30.4184 32.1761 32.0618 30.9292 33.6892C29.9732 34.9329 29.0173 36.1798 28.0773 37.4364C27.8471 37.7433 27.7064 38.0918 27.9398 38.4723C28.0933 38.7248 28.3235 38.8335 28.6144 38.7952C28.8926 38.76 29.1068 38.5969 29.2954 38.4083C32.6269 35.08 35.9584 31.7485 39.2899 28.417C39.421 28.2859 39.5681 28.1644 39.5905 27.947L39.5841 27.9438ZM20.2089 17.751C20.2025 17.4952 20.0746 17.2363 19.7805 17.1116C19.3296 16.9165 18.9939 17.2075 18.719 17.4792C15.3907 20.782 12.0751 24.0975 8.75002 27.4034C8.35676 27.7935 8.40472 28.0941 8.78838 28.4713C12.0751 31.7389 15.3491 35.0224 18.6295 38.2964C18.9907 38.6577 19.4128 39.0733 19.9339 38.6289C20.4902 38.1557 20.1226 37.6698 19.8124 37.2221C19.7517 37.1358 19.6813 37.0527 19.6174 36.9696C17.5232 34.2455 15.4514 31.5055 13.3157 28.8134C12.7721 28.1292 12.8233 27.6688 13.338 27.0166C15.4962 24.2766 17.6063 21.495 19.7357 18.7326C19.9499 18.4544 20.1545 18.1794 20.2057 17.751H20.2089Z"
                  fill="#000"
                />
              </svg>
              <div>
                <Text weight="500">Build on any (or every) chain</Text>
                <Text size="13px">
                  You can build on Ethereum and more, while taking advantage of NEAR protocol&apos;s speed, low cost,
                  and scalability, and never getting stuck <span style={{ whiteSpace: 'nowrap' }}>in a silo</span>
                </Text>
                <VmWidgetWrapper
                  src="near/widget/DIG.Button"
                  props={{
                    href: 'https://wiki.near.org/overview/BOS/multi-chain',
                    target: '_blank',
                    label: 'Learn more',
                    iconRight: 'ph-bold ph-arrow-right',
                    variant: 'primary',
                    size: 'small',
                  }}
                />
              </div>
            </IconAndContent>

            <IconAndContent>
              <Line
                style={{
                  left: 20,
                  top: -100,
                  height: 80,
                  width: 80,
                  borderTopLeftRadius: 'var(--radius)',
                  borderRightWidth: 0,
                  borderBottomWidth: 0,
                }}
              />
              <Line
                style={{
                  left: -48,
                  top: 66,
                  height: 264,
                  width: 80,
                  borderBottomRightRadius: 'var(--radius)',
                  borderTopWidth: 0,
                  borderLeftWidth: 0,
                }}
              />
              <svg viewBox="0 0 49 49" fill="none">
                <path
                  d="M25.2055 31.8963C25.2055 33.952 25.2247 36.0044 25.1959 38.06C25.1863 38.726 25.4233 38.9406 26.0796 38.9278C27.7318 38.8925 29.3904 38.8765 31.0426 38.9342C31.8463 38.963 32.1281 38.726 32.0961 37.9031C32.0384 36.4079 32.301 34.9894 33.3736 33.8175C34.3086 32.7993 35.4325 32.2165 36.8157 32.2037C38.8713 32.1813 40.9238 32.1845 42.9794 32.1973C45.7522 32.2133 47.8303 34.1313 47.9392 36.9009C48.0256 39.0302 48.0288 41.1723 47.936 43.3016C47.8143 46.02 45.7298 47.9508 43.0082 47.986C41.1927 48.0084 39.3804 47.9956 37.5649 47.9924C34.1421 47.986 32.1953 46.1225 32.0929 42.6868C32.0448 41.1211 32.1697 41.2748 30.6456 41.2748C26.1885 41.2716 21.7346 41.2684 17.2776 41.2748C15.6254 41.2748 15.8015 41.1019 15.8175 42.7156C15.8399 44.8289 14.9882 46.4235 13.1247 47.4513C12.4587 47.8195 11.7318 47.986 10.973 47.9892C8.94617 47.9924 6.91615 48.0148 4.88933 47.9892C2.07164 47.9476 0.0288173 45.8663 0.0128077 43.0422C0 41.0154 -0.00640384 38.9854 0.0160096 36.9586C0.0448269 34.2978 2.08765 32.2422 4.74204 32.2101C6.82329 32.1845 8.90454 32.1877 10.9858 32.2101C13.6146 32.2357 15.7022 34.2786 15.8047 36.8977C15.858 38.249 16.5539 38.9246 17.8923 38.9246C19.2788 38.9246 20.6684 38.9086 22.0548 38.931C22.5735 38.9406 22.7657 38.7517 22.7593 38.2297C22.74 36.5487 22.7368 34.8677 22.7593 33.1867C22.7689 32.6104 22.5319 32.4407 21.994 32.4631C21.3024 32.4919 20.6076 32.4727 19.9127 32.4695C17.1015 32.4471 15.0234 30.4331 14.9145 27.6058C14.8857 26.8341 14.8889 26.0592 14.9081 25.2844C14.921 24.8073 14.732 24.612 14.2485 24.6216C13.3168 24.6408 12.3818 24.6376 11.4469 24.6216C8.88213 24.5768 6.78167 22.4827 6.73684 19.9212C6.71763 18.8261 6.71443 17.7342 6.73684 16.6392C6.74645 16.1173 6.53832 15.9124 6.02922 15.9316C5.1711 15.9604 4.32259 15.8771 3.4965 15.6466C1.46968 15.0702 0.0448269 13.258 0.0192115 11.1543C-0.00640384 9.01862 -0.00640384 6.88614 0.0192115 4.75046C0.0480288 2.23375 2.03322 0.13969 4.55633 0.0564402C6.79448 -0.0172039 9.03902 -0.0204059 11.2772 0.0564402C13.7843 0.146094 15.7406 2.29458 15.8047 4.88174C15.8399 6.28418 15.5197 6.30659 17.2391 6.30339C21.9876 6.29698 26.736 6.28418 31.4877 6.3194C32.2978 6.3258 32.5988 6.08886 32.5155 5.27557C32.2433 2.60837 34.5551 -0.138877 37.7571 0.0116133C39.4605 0.0916614 41.1703 0.0148153 42.8801 0.027623C45.7971 0.0500364 47.8431 1.9872 47.9456 4.90415C48.0128 6.8221 48.0096 8.74645 47.9456 10.6676C47.8527 13.4597 45.7683 15.4449 42.973 15.4769C41.1319 15.4961 39.2908 15.4993 37.4497 15.4769C34.648 15.4449 32.5635 13.354 32.5091 10.5523C32.4856 9.35695 31.8719 8.75926 30.668 8.75926C26.0508 8.75926 21.4369 8.77847 16.8197 8.74005C16.0032 8.73365 15.7342 8.96739 15.7951 9.78067C15.9039 11.2375 15.7663 12.6496 14.8281 13.8855C13.6466 15.4417 12.0136 15.8995 10.1789 15.922C9.45314 15.9305 9.08919 16.303 9.08705 17.0394C9.08705 17.8399 9.07104 18.6404 9.09346 19.4409C9.14469 21.1699 10.1885 22.2105 11.9208 22.2586C12.6412 22.2778 13.3648 22.2329 14.082 22.2746C14.7 22.3098 14.9338 22.1017 14.9242 21.4613C14.9081 20.4783 14.8185 19.4857 15.017 18.5091C15.5197 16.0308 17.4088 14.4491 19.9352 14.4299C22.4967 14.4107 25.0582 14.4203 27.6198 14.4235C30.8377 14.4267 32.8229 16.0981 32.9958 19.3C33.1559 22.3034 33.2135 25.3292 32.9254 28.3326C32.7108 30.5772 30.5271 32.4695 28.3338 32.4695C27.7318 32.4695 27.4725 32.2454 27.402 31.653C27.1587 29.671 26.8801 27.6922 26.608 25.7102C26.5791 25.5021 26.5439 25.2844 26.4575 25.0955C26.3262 24.8073 26.0861 24.6312 25.753 24.6952C25.4585 24.7529 25.2952 24.9706 25.2632 25.2588C25.2279 25.5501 25.2151 25.8447 25.2151 26.1361C25.2119 28.0572 25.2151 29.9784 25.2151 31.8995L25.2055 31.8963Z"
                  fill="#000"
                />
              </svg>
              <div>
                <Text weight="500">Meet your users wherever they are</Text>
                <Text size="13px">
                  Make your app available as an embedded blockchain experience on any browser, app, or connected device
                  capable of running a few lines of Javascript
                </Text>
                <VmWidgetWrapper
                  src="near/widget/DIG.Button"
                  props={{
                    href: 'https://wiki.near.org/overview/BOS/gateways',
                    target: '_blank',
                    label: 'Explore Gateways',
                    iconRight: 'ph-bold ph-arrow-right',
                    variant: 'primary',
                    size: 'small',
                  }}
                />
              </div>
            </IconAndContent>
          </Grid>
        </SectionContent>
      </Section>

      <Section backgroundColor="#9797F8" paddingBottom="368px" paddingBottomMobile="256px">
        <SectionBgPattern filter="invert(23%) sepia(57%) saturate(2967%) hue-rotate(237deg) brightness(85%) contrast(93%)" />
        <SectionBgShape3>
          <svg viewBox="0 0 1599 696" fill="none">
            <path
              d="M250 20.6906C114 -34.5094 26.6667 33.6906 0 74.6906L5 695.691H1599V343.691C1270 338.691 1124 723.691 1032 514.691C940 305.691 644 190.691 347 249.691C50 308.691 420 89.6906 250 20.6906Z"
              fill="#7269E1"
            />
          </svg>
        </SectionBgShape3>

        <SectionContent>
          <LineRoundedCorners
            style={{
              left: 0,
              top: -20,
              transform: 'rotate(180deg)',
            }}
          />
          <LineRoundedCorners
            style={{
              left: 0,
              top: 104,
            }}
          />
          <Line
            style={{
              left: 20,
              top: -500,
              height: 1336,
              width: 358,
              borderBottomLeftRadius: 'var(--radius)',
              borderTopWidth: 0,
              borderRightWidth: 0,
            }}
          />
          <Line
            style={{
              margin: '0 auto',
              left: -70,
              right: 0,
              top: 826,
              height: 335,
              width: 80,
              borderTopRightRadius: 'var(--radius)',
              borderBottomWidth: 0,
              borderLeftWidth: 0,
            }}
          />

          <SectionTitle marginLeft="-168px">
            <Text as="h2" size="72px" lineHeight="1" weight="500" color="#9797FF">
              Discover
            </Text>
          </SectionTitle>

          <Grid columns="400px 181px" gap="100px" style={{ alignSelf: 'center' }}>
            <Flex
              direction="column"
              gap="24px"
              style={{
                maxWidth: '482px',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <svg viewBox="0 0 48 49" fill="none" style={{ width: '72px' }}>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.3029 8.70865C15.2965 13.5157 19.1627 17.4044 23.9505 17.414C28.8154 17.4237 32.7266 13.5671 32.7266 8.7504C32.7298 3.95618 28.7672 -0.0127825 23.9923 6.20461e-05C19.2366 0.0129066 15.3062 3.95297 15.3029 8.70865ZM13.3666 38.5145V38.5177L13.3634 38.5145H13.3666ZM13.3731 38.5145H13.3666V31.4564C13.3666 31.3977 13.3674 31.3389 13.3681 31.2803C13.37 31.124 13.3719 30.9683 13.3602 30.8142C13.3345 30.4321 13.2928 30.005 12.8111 29.9697C12.3166 29.9376 12.2331 30.355 12.1817 30.7404C11.912 32.7794 11.6455 34.8185 11.3789 36.8576C11.2749 37.6618 11.1722 38.4661 11.0695 39.2703L11.0695 39.2707L11.0695 39.2707C10.8205 41.2213 10.5715 43.1713 10.3032 45.1198C10.1812 46.0061 9.97568 46.0928 9.12152 45.8455C6.52371 45.0909 4.0383 44.0441 1.57536 42.933C0.512474 42.4546 -0.00130704 41.7321 0.0179598 40.5054L0.0316548 39.6692C0.0832192 36.5501 0.134814 33.4292 0.00511523 30.3165C-0.120119 27.3526 2.0763 25.0631 5.281 25.0438C7.68935 25.0277 10.0945 25.0245 12.5028 25.0502C13.1065 25.0566 13.4437 24.9314 13.6685 24.2763C14.4038 22.1377 16.1475 20.9079 18.5141 20.879C22.3128 20.834 26.1116 20.834 29.9072 20.879C32.277 20.9079 33.9821 22.1602 34.7785 24.3598C34.9679 24.88 35.2409 25.0502 35.7771 25.047C38.1309 25.0245 40.4846 25.0149 42.8384 25.047C45.1023 25.0791 46.7913 26.0489 47.6936 28.2003C47.8831 28.6467 47.9987 29.1059 47.9987 29.5972C47.9923 33.3414 47.9891 37.0855 47.9987 40.8329C47.9987 41.7481 47.5716 42.3454 46.7849 42.7339C44.3862 43.9253 41.904 44.9014 39.3511 45.7074C38.3525 46.0221 38.2144 45.9418 38.0795 44.8758C37.7268 42.093 37.3776 39.3102 37.0284 36.5274C36.7958 34.6733 36.5631 32.8192 36.3294 30.9651L36.3247 30.9255C36.3072 30.7805 36.2893 30.6317 36.2363 30.4963C36.1271 30.2137 35.9698 29.9376 35.6134 29.9761C35.2601 30.0146 35.1413 30.294 35.1188 30.6087C35.0996 30.8752 35.0996 31.1417 35.0996 31.4115V45.2129C35.0996 46.8341 35.0964 46.8347 33.5076 47.1305L33.4587 47.1396C29.7948 47.8268 26.102 48.1607 22.3771 48.0227C19.5994 47.9199 16.8443 47.5892 14.1084 47.0882C13.4983 46.9758 13.3634 46.613 13.3666 46.0574C13.3783 44.2288 13.3764 42.4002 13.3745 40.5716C13.3738 39.8859 13.3731 39.2002 13.3731 38.5145ZM9.1825 11.3738C12.3551 11.3771 14.8823 13.901 14.8919 17.0768C14.9015 20.2013 12.3262 22.7894 9.18571 22.8119C6.03559 22.8344 3.42172 20.2109 3.43778 17.0351C3.45062 13.8817 6.00347 11.3674 9.18571 11.3706L9.1825 11.3738ZM44.2866 17.1153C44.2994 13.962 41.7337 11.3738 38.59 11.3738C35.4239 11.3706 32.8164 13.9524 32.8357 17.0736C32.855 20.2012 35.456 22.7926 38.59 22.8054C41.6406 22.8183 44.2738 20.1884 44.2866 17.1153Z"
                  fill="#000"
                />
              </svg>
              <Text as="h3" size="36px" lineHeight="1.2" weight="500">
                Learn, connect, and collaborate
              </Text>
              <Text>
                Join a vibrant community of builders who understand that a more free and open web is better for
                developers, users, and the world as a whole.
              </Text>
              <VmWidgetWrapper
                src="near/widget/DIG.Button"
                props={{
                  href: '/sandbox',
                  label: 'Get Started',
                  iconRight: 'ph-bold ph-arrow-right',
                  variant: 'secondary',
                  size: 'large',
                }}
              />
            </Flex>

            <Flex direction="column" gap="68px">
              <Flex direction="column" gap="16px">
                <VmWidgetWrapper
                  src="near/widget/DIG.Button"
                  props={{
                    href: '/people',
                    label: 'Community',
                    iconRight: 'ph-bold ph-arrow-right',
                    variant: 'primary',
                    size: 'small',
                  }}
                />
                <Text size="13px">Connect with like minded people ready to support you on your journey</Text>
              </Flex>

              <Flex direction="column" gap="16px">
                <VmWidgetWrapper
                  src="near/widget/DIG.Button"
                  props={{
                    href: '/events',
                    label: 'Events',
                    iconRight: 'ph-bold ph-arrow-right',
                    variant: 'primary',
                    size: 'small',
                  }}
                />
                <Text size="13px">Come meet us at conferences, hackathons, and meetups across the globe</Text>
              </Flex>

              <Flex direction="column" gap="16px">
                <VmWidgetWrapper
                  src="near/widget/DIG.Button"
                  props={{
                    href: '/news',
                    label: 'News',
                    iconRight: 'ph-bold ph-arrow-right',
                    variant: 'primary',
                    size: 'small',
                  }}
                />
                <Text size="13px">Keep up to date with all things BOS and the future of an open web</Text>
              </Flex>
            </Flex>
          </Grid>
        </SectionContent>
      </Section>

      <Section backgroundColor="#FF7966">
        <SectionBgPattern filter="invert(99%) sepia(54%) saturate(283%) hue-rotate(301deg) brightness(103%) contrast(90%)" />

        <SectionContent>
          <LineRoundedCorners
            style={{
              left: 0,
              right: 0,
              top: -20,
              margin: '0 auto',
              transform: 'rotate(180deg)',
            }}
          />
          <Line
            style={{
              margin: '0 auto',
              left: 0,
              right: 0,
              top: -500,
              height: 530,
            }}
            straightVertical
          />

          <SectionTitle center>
            <Text as="h2" size="72px" lineHeight="1" weight="500" color="#FF7966">
              Ready?
            </Text>
          </SectionTitle>

          <Flex
            direction="column"
            gap="24px"
            alignItems="center"
            style={{
              textAlign: 'center',
              alignSelf: 'center',
              backgroundColor: '#FF7966',
            }}
          >
            <Text size="24px" lineHeight="1.2" weight="500" style={{ maxWidth: '392px' }}>
              Ready to try the OS for an open web?
            </Text>

            {!signedIn ? (
              <VmWidgetWrapper
                src="near/widget/DIG.Button"
                props={{
                  href: 'https://wallet.near.org/create',
                  label: 'Create Account',
                  variant: 'primary',
                  size: 'large',
                }}
              />
            ) : (
              <VmWidgetWrapper
                src="near/widget/DIG.Button"
                props={{
                  href: '/sandbox',
                  label: 'Try It Now',
                  variant: 'primary',
                  size: 'large',
                }}
              />
            )}
          </Flex>
        </SectionContent>
      </Section>

      <VmWidgetWrapper src="near/widget/NearOrg.Footer" />
    </Wrapper>
  );
}

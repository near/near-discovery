import { memo } from 'react';
import { useRouter } from 'next/router';
import {
  StyledContainer,
  StyledTitle,
  StyledSubtitle,
  StyledImageWrapper,
  StyledImage,
  StyledCards,
  StyledCard,
  StyledCardIcon,
  StyledCardBg,
  StyledCardContent,
  StyledCardHeader,
  StyledCardTitle,
  StyledCardName,
  StyledCardArrow,
} from './styles';

const CARDS = [
  // {
  //   name: 'Polygon zkEVM',
  //   icon: '/images/chains/polygon_zkevm_white.svg',
  //   bg: 'linear-gradient(180deg, #a55fff 0%, #21232a 100%)',
  // },
  {
    name: 'Linea',
    icon: '/images/chains/linea_white.svg',
    bg: 'linear-gradient(180deg, #2697ff 0%, #21232a 100%)',
    path: '/onboarding/linea',
  },
];

const QuickOnboarding = () => {
  const router = useRouter();
  return (
    <StyledContainer>
      <StyledTitle>️Quick Onboarding</StyledTitle>
      <StyledSubtitle>
        Your portal to real-time dApp analytics, effortless one-click functionality, and a comprehensive archive of
        transaction history.
      </StyledSubtitle>
      <StyledImageWrapper>
        <video controls>
          <source
            src="https://s3.amazonaws.com/dapdap.prod/images/479251d01b196e1f3c46848c6a7f087c.mov"
            type="video/mp4"
          />
        </video>
        <StyledCards>
          {CARDS.map((card: any) => (
            <StyledCard
              key={card.name}
              style={{ background: card.bg }}
              data-bp="1001-009"
              onClick={() => {
                if (card.path) router.push(card.path);
              }}
            >
              <StyledCardContent>
                <StyledCardHeader>
                  <StyledCardTitle>
                    <div>Quick onboarding</div>
                    <StyledCardName>{card.name}</StyledCardName>
                  </StyledCardTitle>
                  <StyledCardArrow>
                    {' '}
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="16" viewBox="0 0 28 16" fill="none">
                      <path
                        d="M1 7C0.447715 7 -4.82823e-08 7.44772 0 8C4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM27.7071 8.7071C28.0976 8.31658 28.0976 7.68342 27.7071 7.29289L21.3431 0.92893C20.9526 0.538406 20.3195 0.538406 19.9289 0.928931C19.5384 1.31945 19.5384 1.95262 19.9289 2.34314L25.5858 8L19.9289 13.6569C19.5384 14.0474 19.5384 14.6805 19.9289 15.0711C20.3195 15.4616 20.9526 15.4616 21.3431 15.0711L27.7071 8.7071ZM1 9L27 9L27 7L1 7L1 9Z"
                        fill="white"
                      />
                    </svg>
                  </StyledCardArrow>
                </StyledCardHeader>
              </StyledCardContent>
              <StyledCardIcon src={card.icon} />
              <StyledCardBg />
            </StyledCard>
          ))}
        </StyledCards>
      </StyledImageWrapper>
    </StyledContainer>
  );
};

export default memo(QuickOnboarding);

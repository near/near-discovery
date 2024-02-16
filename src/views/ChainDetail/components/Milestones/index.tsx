import { memo, useMemo } from 'react';
import { StyledContainer, StyledItem, StyledLeft, StyledStar, StyledRight, StyledTitle, StyledDesc } from './styles';

const Milestones = ({ milestones }: any) => {
  const mergedMilestones = useMemo<any>(() => {
    if (!milestones) return [];
    return JSON.parse(milestones);
  }, [milestones]);

  return (
    <StyledContainer>
      {mergedMilestones?.map((item: any, i: number) => (
        <StyledItem key={item.title + i}>
          <StyledLeft>
            <StyledStar>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                <g filter="url(#filter0_d_4493_1577)">
                  <path
                    d="M18 10L19.1694 15.1769L23.6569 12.3431L20.8231 16.8306L26 18L20.8231 19.1694L23.6569 23.6569L19.1694 20.8231L18 26L16.8306 20.8231L12.3431 23.6569L15.1769 19.1694L10 18L15.1769 16.8306L12.3431 12.3431L16.8306 15.1769L18 10Z"
                    fill="#EBF479"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_4493_1577"
                    x="0"
                    y="0"
                    width="36"
                    height="36"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.921569 0 0 0 0 0.956863 0 0 0 0 0.47451 0 0 0 1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4493_1577" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4493_1577" result="shape" />
                  </filter>
                </defs>
              </svg>
            </StyledStar>
            <svg xmlns="http://www.w3.org/2000/svg" width="2" height="40" viewBox="0 0 2 40" fill="none">
              <path d="M1 1L0.999998 39" stroke="url(#paint0_linear_4493_1580)" stroke-linecap="round" />
              <defs>
                <linearGradient
                  id="paint0_linear_4493_1580"
                  x1="1"
                  y1="1"
                  x2="0.999997"
                  y2="42.5625"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#EBF479" />
                  <stop offset="1" stop-color="#EBF479" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </StyledLeft>
          <StyledRight>
            <StyledTitle>{item.title}</StyledTitle>
            <StyledDesc>{item.date}</StyledDesc>
            {item.url && (
              <div>
                <span>Learn more</span>{' '}
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 22 16" fill="none">
                  <path
                    d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9V7ZM21.7071 8.70711C22.0976 8.31658 22.0976 7.68342 21.7071 7.29289L15.3431 0.928932C14.9526 0.538408 14.3195 0.538408 13.9289 0.928932C13.5384 1.31946 13.5384 1.95262 13.9289 2.34315L19.5858 8L13.9289 13.6569C13.5384 14.0474 13.5384 14.6805 13.9289 15.0711C14.3195 15.4616 14.9526 15.4616 15.3431 15.0711L21.7071 8.70711ZM1 9H21V7H1V9Z"
                    fill="#EBF479"
                  />
                </svg>
              </div>
            )}
          </StyledRight>
        </StyledItem>
      ))}
    </StyledContainer>
  );
};

export default memo(Milestones);

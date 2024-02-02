import { memo, useRef, useState, useEffect } from 'react';
import {
  StyledContainer,
  StyledTitle,
  StyledContent,
  StyledList,
  StyledItem,
  StyledItemImg,
  StyledItemTitle,
  StyledItemDesc,
  StyledItemRead,
  StyledIcons,
  StyledIcon,
} from './styles';

const ITEMS = [
  {
    icon: '/images/home/learning-1.jpg',
    title: 'User Journey',
    desc: 'Explore a vast array of decentralized applications (dApps) easily and find your favorites.',
    path: 'https://dapdapnet.notion.site/Dap-Dap-The-Beginning-of-a-New-Web3-Experience-471b4ceb6757464b9fe59708f7cfb0e8',
  },
  {
    icon: '/images/home/learning-2.jpg',
    title: 'L2s Research',
    desc: 'Explore a vast array of decentralized applications (dApps) easily and find your favorites.',
    path: 'https://dapdapnet.notion.site/Dap-Dap-The-Beginning-of-a-New-Web3-Experience-471b4ceb6757464b9fe59708f7cfb0e8',
  },
  {
    icon: '/images/home/learning-3.jpg',
    title: 'Discover DApps',
    desc: 'Explore a vast array of decentralized applications (dApps) easily and find your favorites.',
    path: 'https://dapdapnet.notion.site/Dap-Dap-The-Beginning-of-a-New-Web3-Experience-471b4ceb6757464b9fe59708f7cfb0e8',
  },
];

const Learn = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (carouselRef.current) {
      setPage(Math.ceil(carouselRef.current.clientWidth / 540));
    }
  }, []);
  return (
    <StyledContainer>
      <StyledTitle>Learn</StyledTitle>
      <StyledContent ref={carouselRef}>
        <StyledList length={ITEMS.length} current={current}>
          {ITEMS.map((item: any, index: number) => (
            <StyledItem key={item.title}>
              <StyledItemImg src={item.icon} />
              <div>
                <StyledItemTitle>{item.title}</StyledItemTitle>
                <StyledItemDesc>{item.desc}</StyledItemDesc>
                <StyledItemRead
                  onClick={() => {
                    if (item.path) window.open(item.path, '_blank');
                  }}
                  data-bp="1001-012"
                >
                  Read
                </StyledItemRead>
              </div>
            </StyledItem>
          ))}
        </StyledList>
      </StyledContent>
      <StyledIcons>
        <StyledIcon
          className={` ${current === 0 && 'disabled'}`}
          onClick={() => {
            if (current > 0) setCurrent((prev) => prev - 1);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path d="M9 1L2 8L9 15" stroke="#979ABE" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </StyledIcon>
        <StyledIcon
          className={`${current === ITEMS.length - 1 && 'disabled'}`}
          onClick={() => {
            if (current < page - 1) setCurrent(current + 1);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path d="M1 1L8 8L1 15" stroke="#979ABE" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </StyledIcon>
      </StyledIcons>
    </StyledContainer>
  );
};

export default memo(Learn);

import { memo, useState } from 'react';
import chainsConfig from '@/config/all-in-one/chains';
import GoMore from '@/components/GoMore';
import useAllInOneOpen from '@/hooks/useAllInOneOpen';
import ItemColorBg from './ItemBg';
import {
  StyledContainer,
  StyledTitle,
  StyledSubtitle,
  StyledList,
  StyledItem,
  StyledItemBg,
  StyledItemContent,
  StyledItemTitle,
  StyledItemColorBg,
  StyledItemComing,
} from './styles';

const MENUS = [
  {
    label: 'BRIDGE',
    key: 'Bridge',
  },
  {
    label: 'SWAP',
    key: 'Swap',
  },
  {
    label: 'LEND',
    key: 'Lending',
  },
  {
    label: 'LIQUIDITY',
    key: 'Liquidity',
  },
];

const QuickOnboarding = ({ path }: any) => {
  const network = chainsConfig[path];
  const [showBg, setShowBg] = useState('');
  const { open } = useAllInOneOpen();
  return (
    <StyledContainer>
      <StyledTitle>Quick Onboarding</StyledTitle>
      <StyledSubtitle>
        <span>The most popular actions from other users</span>
        <GoMore label="More" path="" bp="100121-006" />
      </StyledSubtitle>
      <StyledList>
        {MENUS.map((item: any) => (
          <StyledItem
            data-bp="100121-008"
            key={item.key}
            onMouseEnter={() => {
              setShowBg(item.label);
            }}
            onMouseLeave={() => {
              setShowBg('');
            }}
            $disbaled={!network.menuConfig[item.key]}
            onClick={() => {
              console.log(network.menuConfig[item.key]);
              if (!network.menuConfig[item.key]) return;
              open(network, item.key);
            }}
          >
            <StyledItemBg />
            {showBg === item.label && (
              <StyledItemColorBg style={{ color: network.selectBgColor }}>
                <ItemColorBg />
              </StyledItemColorBg>
            )}
            <StyledItemContent>
              <StyledItemTitle $disbaled={!network.menuConfig[item.key]}>{item.label}</StyledItemTitle>
              {network.menuConfig[item.key] ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="16" viewBox="0 0 28 16" fill="none">
                  <path
                    d="M1 7C0.447715 7 -4.82823e-08 7.44772 0 8C4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM27.7071 8.7071C28.0976 8.31658 28.0976 7.68342 27.7071 7.29289L21.3431 0.92893C20.9526 0.538406 20.3195 0.538406 19.9289 0.928931C19.5384 1.31945 19.5384 1.95262 19.9289 2.34314L25.5858 8L19.9289 13.6569C19.5384 14.0474 19.5384 14.6805 19.9289 15.0711C20.3195 15.4616 20.9526 15.4616 21.3431 15.0711L27.7071 8.7071ZM1 9L27 9L27 7L1 7L1 9Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <StyledItemComing>COMING SOON</StyledItemComing>
              )}
            </StyledItemContent>
          </StyledItem>
        ))}
      </StyledList>
    </StyledContainer>
  );
};

export default memo(QuickOnboarding);

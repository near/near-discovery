import {
  StyledItemContainer,
  StyledItemLeft,
  StyledItemRight,
  StyledIconBox,
  StyledExpandContainer,
  StyledItemTop,
  StyledDesc,
  StyledDapps,
  StyledDapp,
  StyledDappIcon,
  StyledMore,
  StyledExpandButton,
  StyledExpandButtonBox,
  StyledExpand,
} from './styles';

import { AnimatePresence } from 'framer-motion';

import { memo, useState } from 'react';

const ActionItem = ({ action }: { action: any }) => {
  const [open, setOpen] = useState(false);
  return (
    <StyledItemContainer>
      <StyledItemTop initial={false}>
        <StyledItemLeft>
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
            <circle cx="11.5" cy="11.5" r="11" fill="#1E2028" stroke="#EBF479" />
          </svg>
          {/* <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="23" height="23" fill="#1E1E1E" />
          <circle cx="11.5" cy="11.5" r="11" fill="#EBF479" stroke="#EBF479" />
          <path
            d="M8 11.5L10.6667 14L16 9"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg> */}
          <span>{action.name}</span>
        </StyledItemLeft>
        <StyledItemRight>
          <StyledIconBox
            className={open ? 'open' : ''}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="17" viewBox="0 0 13 17" fill="none">
              <path
                d="M11.7507 7.82802C12.3448 8.2238 12.3448 9.09671 11.7507 9.49249L1.55441 16.285C0.889837 16.7277 -7.10367e-07 16.2513 -6.75462e-07 15.4528L-8.1642e-08 1.86775C-4.67367e-08 1.06921 0.889838 0.592786 1.55442 1.03551L11.7507 7.82802Z"
                fill="#979ABE"
              />
            </svg>
          </StyledIconBox>
          <StyledIconBox>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M17.9694 2.74403C17.9583 2.30211 17.6217 2.0236 17.1395 2.03375C16.6565 2.0439 16.4077 2.33856 16.3284 2.78066C16.2872 3.00993 16.3005 3.24978 16.2981 3.48498C16.294 3.88625 16.297 4.2876 16.297 4.68895C16.2343 4.71739 16.1715 4.74585 16.1088 4.77433C15.898 4.57183 15.6909 4.36551 15.476 4.16744C13.5399 2.38251 11.2428 1.71802 8.67025 2.11296C5.03807 2.67054 2.34694 5.69455 2.03115 9.46951C1.73491 13.0107 4.01941 16.4321 7.44848 17.5831C10.9174 18.7475 14.7771 17.3923 16.7281 14.3215C16.8537 14.1238 16.9842 13.9208 17.0609 13.7023C17.2097 13.2777 17.135 12.8825 16.7156 12.6556C16.3116 12.4371 15.9286 12.5249 15.6418 12.8958C15.4983 13.0812 15.3892 13.2928 15.2553 13.4862C14.0457 15.2329 12.3841 16.1846 10.2579 16.2883C7.41089 16.4271 4.80107 14.5804 3.97136 11.8585C3.11442 9.04731 4.29969 6.01831 6.83492 4.54063C9.29931 3.10418 12.4631 3.5164 14.4574 5.54183C14.6034 5.69015 14.7018 5.8854 14.9386 6.22593C14.16 6.22593 13.5606 6.19423 12.9662 6.2352C12.4172 6.27307 12.1265 6.59973 12.131 7.05832C12.1354 7.50482 12.4465 7.87427 12.9747 7.88726C14.3534 7.92118 15.7336 7.90887 17.1129 7.89418C17.5674 7.88934 17.9436 7.6292 17.9574 7.18014C18.0027 5.70242 18.0063 4.22199 17.9694 2.74403Z"
                fill="#979ABE"
              />
            </svg>
          </StyledIconBox>
        </StyledItemRight>
      </StyledItemTop>
      {/* <StyledExpandContainer>
        <StyledDesc>Choose one dapp to swapping.</StyledDesc>
        <StyledDapps>
          <StyledDapp>
            <StyledDappIcon />
            <span>SyncSwap</span>
          </StyledDapp>
          <StyledDapp>
            <StyledDappIcon />
            <span>SyncSwap</span>
          </StyledDapp>
          <StyledDapp>
            <StyledDappIcon />
            <span>SyncSwap</span>
          </StyledDapp>
        </StyledDapps>
        <StyledMore>View all Dapps</StyledMore>
      </StyledExpandContainer> */}
      <AnimatePresence initial={false}>
        {open && (
          <StyledExpandContainer
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <StyledExpand>
              <StyledDesc>
                💡Dap Dap is a one-stop dApp aggregator designed to serve as the universal entry point to Layer 2s (L2).
              </StyledDesc>
              <StyledExpandButtonBox>
                <StyledExpandButton>Got it</StyledExpandButton>
              </StyledExpandButtonBox>
            </StyledExpand>
          </StyledExpandContainer>
        )}
      </AnimatePresence>
    </StyledItemContainer>
  );
};

export default memo(ActionItem);

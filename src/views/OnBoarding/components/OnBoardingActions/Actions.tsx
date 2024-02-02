import { memo, useState } from 'react';
import ActionColorBg from './ActionColorBg';
import {
  StyledActions,
  StyledAction,
  StyledActionContent,
  StyledActionBg,
  StyledActionColorBg,
  StyledActionTitle,
  StyledActionSubTitle,
  StyledActionDesc,
  StyledActionButton,
} from './styles';

const ACTIONS = [
  {
    label: 'Bridge',
    text: (
      <span>
        Bridge <span className="gray">0.01</span> ETH to{' '}
      </span>
    ),
    key: 'bridge',
  },
  {
    label: 'Swap',
    text: (
      <span>
        Swap <span className="gray">0.01</span> ETH to USDC
      </span>
    ),
    key: 'swap',
  },
  {
    label: 'Lend',
    text: (
      <span>
        Supply <span className="gray">10</span> USDC
      </span>
    ),
    key: 'lending',
  },
  {
    label: 'Liquidity',
    text: (
      <span>
        Deposit <span className="gray">0.01</span> WETH-USDC
      </span>
    ),
    key: 'liquidity',
  },
];

const Actions = ({ bgColor, openModal, chainName }: any) => {
  const [showBg, setShowBg] = useState('');
  return (
    <StyledActions>
      {ACTIONS.map((action: any) => (
        <StyledAction
          key={action.label}
          onMouseEnter={() => {
            setShowBg(action.label);
          }}
          onMouseLeave={() => {
            setShowBg('');
          }}
        >
          <StyledActionBg />
          {showBg === action.label && (
            <StyledActionColorBg className="action_color_bg" style={{ color: bgColor }}>
              <ActionColorBg />
            </StyledActionColorBg>
          )}
          <StyledActionContent>
            <StyledActionTitle>{action.label}</StyledActionTitle>
            <StyledActionSubTitle>
              {action.text}
              {action.key === 'bridge' && chainName}
            </StyledActionSubTitle>
            <StyledActionDesc>Total Execution 223</StyledActionDesc>
            <StyledActionButton
              onClick={() => {
                openModal(action.key);
              }}
              data-bp="100131-001"
            >
              One-Click Execution
            </StyledActionButton>
          </StyledActionContent>
        </StyledAction>
      ))}
    </StyledActions>
  );
};

export default memo(Actions);

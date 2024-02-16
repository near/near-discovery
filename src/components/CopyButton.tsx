import React, { useState } from 'react';
import styled from 'styled-components';

import CopyIcon from '@/components/Icons/Copy';
import { copyText } from '@/utils/copy';

const Tooltip = styled.div<{
  isTooltipDisplayed: boolean;
  tooltipTop: number;
  tooltipRight: number;
  tooltipFontSize?: number;
}>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline' : 'none')};
  position: absolute;
  padding: 8px;
  top: ${({ tooltipTop }) => `${tooltipTop}px`};
  right: ${({ tooltipRight }) => (tooltipRight ? `${tooltipRight}px` : 0)};
  text-align: center;
  font-size: ${({ tooltipFontSize }) => `${tooltipFontSize}px` ?? '100%'};
  background-color: #979abe;
  color: #fff;
  border-radius: 16px;
  opacity: 0.7;
  width: max-content;
  z-index: 20;
`;
const StyledCopyButton = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  position: relative;
`;

interface CopyButtonProps {
  size: number;
  text: string;
  tooltipMessage: string;
  tooltipTop: number;
  tooltipRight?: number;
  tooltipFontSize?: number;
  buttonColor?: string;
  cb?: () => void;
}

const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  tooltipMessage,
  size,
  tooltipTop,
  tooltipRight = 0,
  tooltipFontSize = 12,
  buttonColor = '#979abe',
  cb,
  ...props
}) => {
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false);

  const displayTooltip = () => {
    setIsTooltipDisplayed(true);
    setTimeout(() => {
      setIsTooltipDisplayed(false);
    }, 1000);
  };
  return (
    <StyledCopyButton color={buttonColor}>
      <CopyIcon
        size={size}
        onCopy={() => {
          copyText(text, displayTooltip);
          cb?.();
        }}
        {...props}
      />
      <Tooltip
        isTooltipDisplayed={isTooltipDisplayed}
        tooltipTop={tooltipTop}
        tooltipRight={tooltipRight}
        tooltipFontSize={tooltipFontSize}
      >
        {tooltipMessage}
      </Tooltip>
    </StyledCopyButton>
  );
};

export default CopyButton;

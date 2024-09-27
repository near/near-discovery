import { CaretDown } from '@phosphor-icons/react';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

import NearIconSvg from '@/assets/images/near-icon.svg';
import TokenDefault from '@/assets/images/token_default.svg';
import type { Token } from '@/hooks/useTokens';

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectButton = styled.button`
  width: 100%;
  padding: 2px 8px;
  text-align: left;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  }
`;

const OptionsList = styled.div`
  position: absolute;
  z-index: 10;
  width: 100%;
  max-height: 15rem;
  overflow-y: auto;
  margin-top: 0.25rem;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const Option = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #f3f4f6;
  }
`;

const CurrencyInfo = styled.div`
  display: flex;
  align-items: center;
`;

const nearCoin = {
  contract_id: 'near',
  symbol: 'NEAR',
  icon: NearIconSvg,
};

const SelectFT = ({ tokens, setToken }: { tokens: Token[]; setToken: (token: any) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(nearCoin);

  return (
    <SelectContainer>
      <SelectButton onClick={() => setIsOpen(!isOpen)} type="button">
        <CurrencyInfo>
          <Image
            src={selectedCurrency.icon || TokenDefault}
            alt={selectedCurrency.symbol}
            width={16}
            height={16}
            style={{ marginRight: '8px' }}
          />
          <span>{selectedCurrency.symbol}</span>
        </CurrencyInfo>
        <CaretDown />
      </SelectButton>

      {isOpen && (
        <OptionsList>
          {tokens.map((token) => (
            <Option
              key={token.contract_id}
              onClick={() => {
                setSelectedCurrency(token);
                setIsOpen(false);
                setToken(token);
              }}
            >
              <CurrencyInfo>
                <Image
                  src={token.icon || TokenDefault}
                  alt={token.symbol}
                  width={16}
                  height={16}
                  style={{ marginRight: '8px' }}
                />
                <span>
                  {token.contract_id} ({token.symbol})
                </span>
              </CurrencyInfo>
            </Option>
          ))}
        </OptionsList>
      )}
    </SelectContainer>
  );
};

export default SelectFT;

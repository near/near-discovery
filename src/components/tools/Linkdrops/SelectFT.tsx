import { CaretDown } from '@phosphor-icons/react';
import { useState } from 'react';
import styled from 'styled-components';
import NearIconSvg from './near-icon.svg';
import Image from 'next/image';

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectButton = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
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

const Label = styled.label`
    display: block;
    font: var(--text-xs);
    font-weight: 600;
    color: var(--sand12);
    margin-bottom: 4px;
`
const nearCoin = {
  contract_id: 'near',
  symbol: 'NEAR',
  icon: NearIconSvg,
}

const ImgDefault = () => {
  return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="11" fill="#FAFAFA" stroke="#D5D4D8" stroke-width="2"></circle><path d="M15.6317 6.60497L13.1233 10.3034C13.0876 10.3567 13.0725 10.421 13.0808 10.4845C13.0892 10.5479 13.1204 10.6063 13.1686 10.6487C13.2169 10.691 13.279 10.7146 13.3435 10.7151C13.4079 10.7155 13.4703 10.6928 13.5192 10.651L15.9883 8.52414C16.0028 8.51128 16.0207 8.50289 16.0399 8.49998C16.0591 8.49707 16.0788 8.49977 16.0964 8.50776C16.1141 8.51574 16.129 8.52867 16.1394 8.54495C16.1498 8.56123 16.1553 8.58017 16.155 8.59945V15.2582C16.155 15.2786 16.1487 15.2985 16.1369 15.3152C16.1251 15.3319 16.1084 15.3446 16.0891 15.3515C16.0698 15.3585 16.0489 15.3594 16.029 15.3541C16.0092 15.3488 15.9915 15.3376 15.9783 15.3219L8.515 6.44938C8.39495 6.3086 8.24548 6.19548 8.07696 6.11788C7.90844 6.04027 7.72492 6.00005 7.53917 6H7.27833C6.9393 6 6.61415 6.13375 6.37442 6.37183C6.13468 6.60991 6 6.93282 6 7.26952V16.6477C6 16.9844 6.13468 17.3073 6.37442 17.5454C6.61415 17.7835 6.9393 17.9172 7.27833 17.9172C7.49693 17.9173 7.71189 17.8617 7.90271 17.7558C8.09353 17.6499 8.25384 17.4972 8.36833 17.3123L10.8767 13.6138C10.9124 13.5605 10.9275 13.4962 10.9192 13.4328C10.9108 13.3693 10.8796 13.311 10.8314 13.2686C10.7831 13.2262 10.721 13.2026 10.6566 13.2022C10.5921 13.2017 10.5297 13.2245 10.4808 13.2662L8.01167 15.3931C7.9972 15.406 7.97927 15.4144 7.96008 15.4173C7.94088 15.4202 7.92125 15.4175 7.90358 15.4095C7.8859 15.4015 7.87095 15.3886 7.86055 15.3723C7.85015 15.356 7.84475 15.3371 7.845 15.3178V8.65738C7.84501 8.63699 7.85133 8.61711 7.86311 8.60041C7.8749 8.58372 7.89157 8.57103 7.91086 8.56407C7.93016 8.55711 7.95114 8.55622 7.97096 8.56151C7.99078 8.5668 8.00849 8.57803 8.02167 8.59366L15.4842 17.4679C15.6042 17.6086 15.7537 17.7218 15.9222 17.7994C16.0907 17.877 16.2742 17.9172 16.46 17.9172H16.7208C16.8888 17.9174 17.0551 17.8846 17.2103 17.8208C17.3655 17.7571 17.5065 17.6636 17.6253 17.5457C17.7441 17.4278 17.8383 17.2878 17.9026 17.1337C17.9669 16.9797 18 16.8145 18 16.6477V7.26952C18 6.93282 17.8653 6.60991 17.6256 6.37183C17.3859 6.13375 17.0607 6 16.7217 6C16.5031 5.99994 16.2881 6.05552 16.0973 6.16143C15.9065 6.26733 15.7462 6.42004 15.6317 6.60497Z" fill="#D5D4D8"></path></svg>
}

const SelectFT = ({ tokens, setToken }: { tokens: any, setToken: (token: any) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(nearCoin);

  return (
    <div>
      <Label>Select Token</Label>
      <SelectContainer>
        <SelectButton onClick={() => setIsOpen(!isOpen)} type='button'>
          <CurrencyInfo>
            {selectedCurrency.icon && <Image src={selectedCurrency.icon} alt={selectedCurrency.symbol} width={20} height={20} style={{ marginRight: "8px" }} />}
            {!selectedCurrency.icon && <ImgDefault />}
            <span>{selectedCurrency.contract_id} ({selectedCurrency.symbol})</span>
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
                  {token.icon && <Image src={token.icon} alt={token.symbol} width={20} height={20} style={{ marginRight: "8px" }} />}
                  {!token.icon && <ImgDefault />}
                  <span>{token.contract_id} ({token.symbol})</span>
                </CurrencyInfo>
              </Option>
            ))}
          </OptionsList>
        )}
      </SelectContainer>
    </div>
  );
};

export default SelectFT;
import { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Modal from '@/components/Modal';

import type { Chain, Token } from '../types';
import CurrencyList from './CurrencyList';

const InputWarpper = styled.div`
  height: 46px;
  border-bottom: 1px solid #332c4b;
  padding: 14px 30px 6px;
`;
const Input = styled.input`
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  width: 100%;
  background-color: transparent;
  outline: none;
  border: none;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
`;
const Empty = styled.div`
  min-height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 18px;
  color: #fff;
`;

const DialogTokens = ({
  display,
  tokens,
  chains,
  currentToken,
  currentChainId,
  onClose,
  onSelect,
}: {
  display: boolean;
  tokens: Token[];
  chains: { [key: number]: Chain };
  currentToken?: string;
  currentChainId?: number;
  onClose: () => void;
  onSelect: (chain: Token) => void;
}) => {
  const [data, setData] = useState<Token[]>(tokens || []);
  const [searchVal, setSearchValue] = useState<string>();
  const filterTokens = useCallback(
    (ev?: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(ev?.target.value);
      const _tokens = ev?.target.value
        ? tokens.filter((token) => {
            return (
              token.address === ev.target.value || token.name?.toLowerCase().includes(ev.target.value?.toLowerCase())
            );
          })
        : tokens;
      setData(
        _tokens.sort((a, b) => {
          if (a.chainId === currentChainId) return -1;
          return 1;
        }),
      );
    },
    [tokens],
  );

  useEffect(() => {
    filterTokens();
  }, [tokens]);

  const handleClose = useCallback(() => {
    onClose();
    setSearchValue('');
    filterTokens();
  }, [onClose]);

  return (
    <Modal
      display={display}
      title="Select Token"
      onClose={handleClose}
      content={
        <>
          <InputWarpper>
            <Input placeholder="Search name or paste address" value={searchVal} onChange={filterTokens} />
          </InputWarpper>
          {!data.length && <Empty>No token.</Empty>}
          {!!data.length && (
            <CurrencyList
              tokens={data}
              chains={chains}
              selectedCurrency={currentToken}
              onClick={(currency) => {
                onSelect(currency);
                handleClose();
              }}
            />
          )}
        </>
      }
    />
  );
};

export default memo(DialogTokens);

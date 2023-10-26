import styled from 'styled-components';

const CurrencyIconWrapper = styled.div<{ mr: number }>`
  position: relative;
  margin-right: ${({ mr }) => mr}px;
`;
const CurrencyIcon = styled.img<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
`;
const ChainIcon = styled.img<{ size: number }>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 4px;
  right: -${({ size }) => size / 3}px;
  bottom: -3px;
  border: 3px solid #1f2121;
`;
const Empty = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background-color: #979abe;
`;

export default ({
  token,
  chain,
  size = 38,
  mr = 20,
}: {
  token?: string;
  chain?: string;
  size?: number;
  mr?: number;
}) => {
  return (
    <CurrencyIconWrapper mr={mr}>
      {token && <CurrencyIcon size={size} src={token} />}
      {chain && <ChainIcon size={size * 0.6} src={chain} />}
      {!token && <Empty size={size} />}
    </CurrencyIconWrapper>
  );
};

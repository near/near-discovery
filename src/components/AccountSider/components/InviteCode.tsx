import { memo } from 'react';
import styled from 'styled-components';

import CopyButton from '@/components/CopyButton';
import Loading from '@/components/Icons/Loading';

import useInviteCode from '../hooks/useInviteCode';

const StyledInviteCode = styled.div<{ display?: number }>`
  width: 145px;
  background: linear-gradient(
    98.9deg,
    rgba(79, 113, 232, 1) 8.51%,
    rgba(147, 63, 255, 1) 47.69%,
    rgba(255, 213, 132, 1) 94.97%
  );
  border-radius: 12px;
  position: absolute;
  right: 0px;
  top: 34px;
  display: ${({ display }) => (display ? 'block' : 'none')};
  z-index: 100;
`;
const Header = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 16px;
`;
const List = styled.div`
  padding-top: 10px;
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  padding: 16px;
`;
const StyledLoading = styled.div`
  text-align: center;
`;
const Item = styled.div<{ deleted?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  align-items: center;
  color: #fff;
  ${({ deleted }) => deleted && 'text-decoration: line-through; opacity: 0.3;'}
`;
const Code = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #fff;
`;

const InviteCode = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const { list, loading } = useInviteCode(show);
  return (
    <StyledInviteCode
      display={show ? 1 : 0}
      onClick={(ev) => {
        ev.stopPropagation();
      }}
    >
      <Header>Invite Code</Header>
      <List>
        {list
          ?.filter((item) => !item.is_used)
          .map((record) => (
            <Item deleted={record.is_used} key={record.code}>
              <Code>{record.code}</Code>
              <CopyButton
                size={10}
                text={record.code}
                tooltipMessage="Copied"
                tooltipTop={-31}
                tooltipRight={-12}
                tooltipFontSize={12}
                buttonColor="rgba(255,255,255,0.6)"
                cb={onClose}
              />
            </Item>
          ))}
        {loading && !list?.filter((item) => !item.is_used).length && (
          <StyledLoading>
            <Loading size={30} />
          </StyledLoading>
        )}
      </List>
    </StyledInviteCode>
  );
};

export default memo(InviteCode);

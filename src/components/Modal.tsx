import type { ReactNode} from 'react';
import { memo } from 'react';
import styled from 'styled-components';

import CloseIcon from './Icons/Close';

const Dialog = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: none;

  &.display {
    display: block;
  }
`;
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: absolute;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 900px) {
    align-items: flex-end;
  }
`;
const Main = styled.div<{ width: number }>`
  width: ${({ width }) => width + 'px'};
  border-radius: 16px;
  border: 1px solid #2c334b;
  background-color: #181a27;
  @media (max-width: 900px) {
    width: 100%;
    border-radius: 16px 16px 0px 0px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 30px 30px 0px 30px;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const Content = styled.div`
  border-radius: 0px 0px 16px 16px;
`;

const Modal = ({
  display,
  title,
  width = 460,
  content,
  onClose,
}: {
  display: boolean;
  title: string | ReactNode;
  width?: number;
  content: ReactNode;
  onClose: () => void;
}) => {
  return (
    <Dialog className={display ? 'display' : ''}>
      <Overlay onClick={onClose}>
        <Main
          width={width}
          onClick={(ev) => {
            ev.stopPropagation();
          }}
        >
          <Header>
            <Title>{title}</Title>
            <CloseIcon onClose={onClose} />
          </Header>
          <Content>{content}</Content>
        </Main>
      </Overlay>
    </Dialog>
  );
};

export default memo(Modal);

import { memo } from 'react';

import Explores from './Explores';
import Menu from './Menu';
import { MaskLayer, MenuContainer, MenuContent } from './styles';

const DropdownMenuPanel = ({ show, setShow }: any) => {
  return (
    <>
      <MaskLayer onClick={() => setShow(false)} />
      <MenuContainer className={show ? 'show' : ''}>
        <MenuContent>
          <Explores setShow={setShow} />
          <Menu setShow={setShow} />
        </MenuContent>
      </MenuContainer>
    </>
  );
};

export default memo(DropdownMenuPanel);

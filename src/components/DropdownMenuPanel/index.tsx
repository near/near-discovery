import { memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import Explores from './Explores';
import Menu from './Menu';
import { container, overlay } from '@/components/animation';
import { MaskLayer, MenuContainer, MenuContent } from './styles';

const DropdownMenuPanel = ({ show, setShow }: any) => {
  return (
    <AnimatePresence mode="wait">
      {show && (
        <>
          <MaskLayer onClick={() => setShow(false)} {...overlay} />
          <MenuContainer {...container}>
            <MenuContent>
              <Explores setShow={setShow} />
              <Menu setShow={setShow} />
            </MenuContent>
          </MenuContainer>
        </>
      )}
    </AnimatePresence>
  );
};

export default memo(DropdownMenuPanel);

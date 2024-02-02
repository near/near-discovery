import { memo, useState } from 'react';
import SelectPanel from './SelectPanel';
import { StyledSelect, StyledDapp, StyledDappIcon, StyledDappName, Overlay } from './styles';

const SelectDapps = ({ currentDapp, dapps, onSelect }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <StyledSelect
        onClick={() => {
          if (dapps.length > 1) setOpen((prev) => !prev);
        }}
      >
        <StyledDapp>
          <StyledDappIcon src={currentDapp.icon || currentDapp.logo} />
          <StyledDappName>{currentDapp.name}</StyledDappName>
        </StyledDapp>
        {dapps.length > 1 && (
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
            <path d="M1 1L6 5L11 1" stroke="#979ABE" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}

        <SelectPanel dapps={dapps} currentDapp={currentDapp} open={open} onSelect={onSelect} />
      </StyledSelect>
      {open && (
        <Overlay
          onClick={() => {
            setOpen(false);
          }}
        />
      )}
    </>
  );
};

export default memo(SelectDapps);

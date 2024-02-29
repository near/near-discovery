import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import { styled } from '@stitches/react';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

type group = {
  groupLabel: string;
  groupItems: {
    label: string;
    value: string;
  }[];
};
interface IProps {
  placeholder?: string;
  data: group[];
  onChange: (chainId: string) => void;
}

// [{
//     groupLabel: '',
//     groupItems: [{
//         label: '',
//         value: ''
//     }]
// }]
export const MySelect: FC<IProps> = ({ placeholder, data, onChange }) => {
  const [value, setValue] = useState<any>();

  useEffect(() => {
    if (data.length && data[0].groupItems.length) {
      setValue(data[0]?.groupItems[0]?.value);
    }
  }, [data]);

  const onValueChange = (v: string) => {
    setValue(v);
    onChange(v);
  };
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <SelectTrigger
      // aria-label="Food"
      >
        <Select.Value placeholder={placeholder || ''} />
        <SelectIcon>
          <ChevronDownIcon />
        </SelectIcon>
      </SelectTrigger>
      <Select.Portal>
        <SelectContent>
          <SelectScrollUpButton>
            <ChevronUpIcon />
          </SelectScrollUpButton>
          <SelectViewport>
            {data.map((item: any) => (
              <Select.Group key={item?.groupLabel}>
                {item?.groupLabel ? <SelectLabel>{item.groupLabel}</SelectLabel> : null}
                {item?.groupItems.map((item: any) => (
                  <SelectItem value={item.value} key={item.value}>
                    {/* <img src={item.icon} style={{ width: 18, height: 18, marginRight: 5, verticalAlign: 'middle' }} /> */}
                    <span>{item.label}</span>
                  </SelectItem>
                ))}
              </Select.Group>
            ))}
          </SelectViewport>
          <SelectScrollDownButton>
            <ChevronDownIcon />
          </SelectScrollDownButton>
        </SelectContent>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectTrigger = styled(Select.SelectTrigger, {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 15px',
  fontSize: 14,
  lineHeight: 1,
  height: 35,
  gap: 5,
  backgroundColor: '#2E3142',
  borderRadius: '8px',
  border: '1px solid #373A53',
  color: '#979ABE',
  // boxShadow: `0 2px 10px #000`,
  fontFamily: 'Montserrat',
  //   '&:hover': { backgroundColor: mauve.mauve3 },
  // '&:focus': { boxShadow: `0 0 0 2px black` },
  //   '&[data-placeholder]': { color: violet.violet9 },
});

const SelectIcon = styled(Select.SelectIcon, {
  //   color: violet.violet11,
});

const SelectContent = styled(Select.Content, {
  overflow: 'hidden',
  backgroundColor: '#303142',
  borderRadius: 6,
  color: 'white',
  boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
});

const SelectViewport = styled(Select.Viewport, {
  padding: 5,
});

const SelectItemComp = ({ children, ...props }: any, forwardedRef: any) => {
  return (
    <StyledItem {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <StyledItemIndicator>
        <CheckIcon />
      </StyledItemIndicator>
    </StyledItem>
  );
};
const SelectItem = React.forwardRef(SelectItemComp);

const StyledItem = styled(Select.Item, {
  fontSize: 13,
  lineHeight: 1,
  //   color: violet.violet11,
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 35px 0 25px',
  position: 'relative',
  userSelect: 'none',
  gap: '5px',
  '&[data-disabled]': {
    // color: mauve.mauve8,
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    outline: 'none',
    backgroundColor: 'rgba(24, 26, 39, 0.3)',
    color: 'white',
  },
});

const SelectLabel = styled(Select.Label, {
  padding: '0 25px',
  fontSize: 12,
  lineHeight: '25px',
  //   color: mauve.mauve11,
});

const SelectSeparator = styled(Select.Separator, {
  height: 1,
  //   backgroundColor: violet.violet6,
  margin: 5,
});

const StyledItemIndicator = styled(Select.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const scrollButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 25,
  backgroundColor: '#303142',
  color: 'white',
  cursor: 'default',
};

const SelectScrollUpButton = styled(Select.ScrollUpButton, scrollButtonStyles);

const SelectScrollDownButton = styled(Select.ScrollDownButton, scrollButtonStyles);

export default MySelect;

import { memo } from 'react';
import { StyledItem, StyledItemBox, StyledLabel, StyledValue, StyledItemImg, StyledItemImgBox } from './styles';

const Item = ({ action_title, count, logo, name, bgColor, network_id }: any) => {
  return (
    <StyledItem onClick={() => {}}>
      <div
        dangerouslySetInnerHTML={{
          __html: action_title.replace(
            /\d+/g,
            (match: string) => `<span style="color: rgba(151, 154, 190, 1);">${match}</span>`,
          ),
        }}
        className="item-title"
      />
      <StyledItemBox>
        <StyledLabel>Total Execution</StyledLabel>
        <StyledValue>{count}</StyledValue>
      </StyledItemBox>
      <StyledItemBox style={{ marginTop: '12px' }}>
        <StyledItemImgBox style={{ background: bgColor }}>
          <StyledItemImg src={logo} alt="" />
        </StyledItemImgBox>
        <StyledLabel>{name}</StyledLabel>
      </StyledItemBox>
    </StyledItem>
  );
};

export default memo(Item);

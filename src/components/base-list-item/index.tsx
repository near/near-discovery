import type { FC, ReactNode } from 'react';
import React from 'react';
import styled from 'styled-components';

interface IProps {
  title?: string;
  children?: ReactNode;
}

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
`;

const ItemKey = styled.span`
  color: rgba(151, 154, 190, 1);
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`;
const ItemValue = styled.span`
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-weight: 500;
`;

const BaseListItem: FC<IProps> = ({ title, children }) => {
  return (
    <ItemWrapper>
      <ItemKey>{title}</ItemKey>
      <ItemValue>{children}</ItemValue>
    </ItemWrapper>
  );
};

export default BaseListItem;

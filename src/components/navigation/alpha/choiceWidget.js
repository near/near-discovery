import React from 'react';
import styled from 'styled-components';

const WidgetContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 1px solid #ccc;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

const ActionButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

const Widget = ({ onClose, onSelectAction }) => {
  return (
    <WidgetContainer>
      <ActionButton onClick={() => onSelectAction('Explore near Nfts')}>Watch Football</ActionButton>
      <ActionButton onClick={() => onSelectAction('Explore EVM nfts')}>Watch NBA</ActionButton>
      <ActionButton onClick={onClose}>Close</ActionButton>
    </WidgetContainer>
  );
};

export default Widget;

import React from 'react';
import styled from 'styled-components';

interface PageButtonProps {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const PageButton = styled.button<PageButtonProps>`
  padding: 4px 12px;
  border-radius: 9999px;
  background-color: ${(props) => (props.active ? '#3b82f6' : 'transparent')};
  color: ${(props) => (props.active ? 'white' : 'inherit')};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  border: 1px solid #eee;

  &:hover:not(:disabled) {
    background-color: ${(props) => (props.active ? '#3b82f6' : '#e5e7eb')};
  }
`;

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers: (number | string)[] = [];
  const maxVisiblePages = 3;

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const leftOffset = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    const rightOffset = Math.min(leftOffset + maxVisiblePages - 1, totalPages);

    if (leftOffset > 2) {
      pageNumbers.push(1, '...');
    } else if (leftOffset === 2) {
      pageNumbers.push(1);
    }

    for (let i = leftOffset; i <= rightOffset; i++) {
      pageNumbers.push(i);
    }

    if (rightOffset < totalPages - 1) {
      pageNumbers.push('...', totalPages);
    } else if (rightOffset === totalPages - 1) {
      pageNumbers.push(totalPages);
    }
  }

  return (
    <PaginationContainer>
      <PageButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <i className="ph ph-caret-left"></i>
      </PageButton>
      {pageNumbers.map((number, index) => (
        <PageButton
          key={index}
          onClick={() => typeof number === 'number' && onPageChange(number)}
          active={number === currentPage}
          disabled={typeof number !== 'number'}
        >
          {number}
        </PageButton>
      ))}
      <PageButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <i className="ph ph-caret-right"></i>
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;

import { memo } from 'react';
import { StyledMoreButton, StyledArrowIcon } from './styles';

const MoreButton = ({ isMore, onClick, bp }: any) => {
  return (
    <StyledMoreButton onClick={onClick} data-bp={bp}>
      <div>View {isMore ? 'less' : 'more'}</div>
      <StyledArrowIcon className={isMore && 'more'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
          <path d="M1 1L6.5 6L12 1" stroke="#979ABE" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </StyledArrowIcon>
    </StyledMoreButton>
  );
};

export default memo(MoreButton);

import { memo } from 'react';
import {
  StyledEmpty,
  StyledEmptyTitle,
  StyledEmptyImg,
  StyledEmptyDesc,
  StyledEmptyItems,
  StyledEmptyItem,
} from './styles';

const Empty = () => {
  return (
    <StyledEmpty>
      <StyledEmptyTitle>
        <StyledEmptyImg src="/images/onboarding/empty_title.png" />
        <div>My Actions</div>
      </StyledEmptyTitle>
      <StyledEmptyDesc>
        You can add a quest when making transaction, and the quest will be listed here after successful transaction.
      </StyledEmptyDesc>
      <StyledEmptyItems>
        <StyledEmptyItem>Input what you want to do by searching bar and execute.</StyledEmptyItem>
        <StyledEmptyItem>Follow the onboarding actions or quest trends which are executed by others.</StyledEmptyItem>
      </StyledEmptyItems>
    </StyledEmpty>
  );
};

export default memo(Empty);

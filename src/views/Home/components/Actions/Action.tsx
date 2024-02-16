import { memo } from 'react';
import { useRouter } from 'next/router';
import { StyledActionContainer, StyledActionTitle, StyledActionDesc } from './styles';

const Action = ({ title, desc, icon, path, bg, bp }: any) => {
  const router = useRouter();
  return (
    <StyledActionContainer
      onClick={() => {
        if (path) router.push(path);
      }}
      clickable={!!path}
      style={{ background: bg }}
      data-bp={bp}
    >
      <StyledActionTitle>{title}</StyledActionTitle>
      <StyledActionDesc>{desc}</StyledActionDesc>
      {icon}
    </StyledActionContainer>
  );
};

export default memo(Action);

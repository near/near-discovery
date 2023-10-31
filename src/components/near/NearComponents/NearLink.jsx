import Link from 'next/link';
import styled from 'styled-components';

const NearLink = ({ href, children }) => {
  return (
    <Link prefetch href={href} passHref>
      <StyledLink>{children}</StyledLink>
    </Link>
  );
};

const StyledLink = styled.a`
  color: inherit;
  text-decoration: none;
`;

export default NearLink;

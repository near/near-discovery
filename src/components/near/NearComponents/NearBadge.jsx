import styled from 'styled-components';

import { nearStyleVar } from '../NearStyleVar';

const NearBadge = ({ children, className, padding, background }) => {
  return (
    <Badge className={className} background={background}>
      <BadgeInner padding={padding}>{children}</BadgeInner>
    </Badge>
  );
};

const Badge = styled.div`
  border-radius: 30px;
  background: ${(p) => p.background ?? 'linear-gradient(45deg, #A55BFE, #FD2B94)'};
  padding: 1px;
  display: inline-block;
`;

const BadgeInner = styled.div`
  background: ${nearStyleVar.bgColor};
  border-radius: 50px;
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
  padding: ${(p) => p.padding ?? '10px 20px 12px'};
`;

export default NearBadge;

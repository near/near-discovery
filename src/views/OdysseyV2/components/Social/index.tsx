import Title from '../Title';
import SocialCard from './Card';
import { StyledContainer, StyledContent } from './styles';

export default function Social({ list, userInfo, authConfig, onRefreshDetail }: any) {
  return (
    <StyledContainer>
      <Title title="Social" />
      <StyledContent>
        {list.map((item: any) => (
          <SocialCard
            key={item.id}
            {...item}
            authConfig={authConfig}
            userInfo={userInfo}
            onRefreshDetail={onRefreshDetail}
          />
        ))}
      </StyledContent>
    </StyledContainer>
  );
}

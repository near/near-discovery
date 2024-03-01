import Title from '../Title';
import DappCard from '../DappCard';
import { StyledContainer, StyledContent } from './styles';

export default function Lending({ list }: any) {
  return (
    <StyledContainer>
      <Title title="Lending" />
      <StyledContent>
        {list.map((item: any) => (
          <DappCard key={item.id} {...item} />
        ))}
      </StyledContent>
    </StyledContainer>
  );
}

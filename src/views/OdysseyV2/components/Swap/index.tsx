import Title from '../Title';
import DappCard from '../DappCard';
import { StyledContainer, StyledContent } from './styles';

export default function Swap({ list }: any) {
  return (
    <StyledContainer>
      <Title title="Swap" />
      <StyledContent>
        {list.map((item: any) => (
          <DappCard key={item.id} {...item} />
        ))}
      </StyledContent>
    </StyledContainer>
  );
}

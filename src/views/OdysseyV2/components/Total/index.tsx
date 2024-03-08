import { formateValueWithThousandSeparator } from '@/utils/formate';
import Skeleton from 'react-loading-skeleton';
import { StyledContainer, StyledCard, StyledCardLabel, StyledCardValue } from './styles';

const ITEMS = [
  {
    label: 'Participants',
    key: 'total_users',
  },
  {
    label: 'Spent Energy',
    key: 'total_players',
  },
  {
    label: 'Accumulated reward [PTS]',
    key: 'claimed_reward',
  },
];

export default function Total({ detail, loading }: any) {
  return (
    <StyledContainer>
      {ITEMS.map((item) => (
        <StyledCard key={item.key}>
          <StyledCardLabel>{item.label}</StyledCardLabel>
          <StyledCardValue>
            {loading ? (
              <Skeleton width="195px" height="27px" borderRadius="16px" containerClassName="skeleton" />
            ) : (
              formateValueWithThousandSeparator(detail[item.key], 0)
            )}
          </StyledCardValue>
        </StyledCard>
      ))}
    </StyledContainer>
  );
}

import QuestItem from '@/views/Quest/components/QuestItem';
import { motion, AnimatePresence } from 'framer-motion';
import { memo } from 'react';
import { container } from '@/components/animation';
import Loading from '@/components/Icons/Loading';
import useUserParticipations from '../../hooks/useUserParticipations';
import {
  StyledContainer,
  StyledHeader,
  StyledTitle,
  StyledLabels,
  StyledLabel,
  StyledQuests,
  LoadingWrapper,
  Empty,
} from './styles';

export const QuestPanel = ({ title, info, list, loading }: any) => {
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>
          {title} ({list.length})
        </StyledTitle>
        <StyledLabels>
          <StyledLabel>In process ({info.inprocess})</StyledLabel>
          <StyledLabel>Completed ({info.completed})</StyledLabel>
          <StyledLabel>Unclaimed ({info.unclaimed})</StyledLabel>
        </StyledLabels>
      </StyledHeader>
      {loading ? (
        <LoadingWrapper>
          <Loading size={40} />
        </LoadingWrapper>
      ) : list.length > 0 ? (
        <>
          <StyledQuests>
            {list.map((item: any) => (
              <QuestItem
                key={item.id}
                quest={{ ...item, live: Date.now() < item.end_time && Date.now() > item.start_time }}
                mt={30}
              />
            ))}
          </StyledQuests>
        </>
      ) : (
        <Empty>No Quests.</Empty>
      )}
    </StyledContainer>
  );
};

const Quests = (props: any) => {
  const { loading, list, info } = useUserParticipations();
  return (
    <AnimatePresence mode="wait">
      <motion.div {...container}>
        <QuestPanel {...props} info={info} list={list} loading={loading} title="Quest of participation" />
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Quests);

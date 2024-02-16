import { AnimatePresence, motion } from 'framer-motion';
import { memo, useMemo, useState } from 'react';

import { container } from '@/components/animation';
import Loading from '@/components/Icons/Loading';
import QuestItem from '@/views/Quest/components/QuestItem';

import useUserParticipations from '../../hooks/useUserParticipations';
import {
  Empty,
  LoadingWrapper,
  StyledContainer,
  StyledHeader,
  StyledLabel,
  StyledLabels,
  StyledQuests,
  StyledTitle,
} from './styles';

const LABELS = ['All', 'In process', 'Completed'];

export const QuestPanel = ({ title, info, list, loading }: any) => {
  const [type, setType] = useState('All');

  const filteredList = useMemo(() => {
    return list.filter((item: any) => {
      if (type === 'All') return true;
      if (type === 'In process') return item.participation_status === 'in_process';
      if (type === 'Completed') return item.participation_status === 'completed';
      return true;
    });
  }, [list, type]);

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>
          {title} ({filteredList.length})
        </StyledTitle>
        <StyledLabels>
          {LABELS.map((label) => (
            <StyledLabel
              onClick={() => {
                setType(label);
              }}
              $active={label === type}
              key={label}
              whileTap={{ opacity: 0.6 }}
              whileHover={{ opacity: 0.8 }}
            >
              {label}
              {label === 'In process' && `(${info.inprocess})`}
              {label === 'Completed' && `(${info.completed})`}
            </StyledLabel>
          ))}
        </StyledLabels>
      </StyledHeader>
      {loading ? (
        <LoadingWrapper>
          <Loading size={40} />
        </LoadingWrapper>
      ) : list.length > 0 ? (
        <>
          <StyledQuests>
            {filteredList.map((item: any) => (
              <QuestItem
                key={item.id}
                quest={{ ...item, live: Date.now() < item.end_time && Date.now() > item.start_time }}
                mt={30}
                bp="40011-001"
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

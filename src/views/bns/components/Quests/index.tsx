import Loading from '@/components/Icons/Loading';
import { container } from '@/components/animation';
import { AnimatePresence, motion } from 'framer-motion';
import { memo } from 'react';
import Narratives from '../Narratives';
import QuestCampaign from '../QuestCampaign';

import { StyledLoadingWrapper } from './styles';
const Quests = ({
  onLoad,
  id,
  campaignLoading,
  campaigns,
  questingLoading,
  quests,
  categoryLoading,
  categories,
  userInfo,
  loading,
}: any) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div {...container}>
        {campaignLoading || categoryLoading ? (
          <StyledLoadingWrapper>
            <Loading size={60} />
          </StyledLoadingWrapper>
        ) : (
          <>
            <QuestCampaign
              onLoad={onLoad}
              loading={campaignLoading}
              campaigns={campaigns.filter((campaign: any) => !campaign.category)}
              categoryLoading={categoryLoading}
              categories={categories}
              bp={{ wrap: '10015-003', card: '100151-001' }}
            />
            <Narratives
              onLoad={onLoad}
              loading={campaignLoading}
              campaigns={campaigns.filter((campaign: any) => campaign.category)}
              categoryLoading={categoryLoading}
              categories={categories}
              bp="10015-004"
            />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Quests);

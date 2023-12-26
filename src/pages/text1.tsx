import { MetaTags } from '@/components/MetaTags';
import { NearOrgUsePage } from '@/components/near-org/NearOrg.UsePage';
import { useClearCurrentComponent } from '@/hooks/useClearCurrentComponent';
import { useDefaultLayout } from '@/hooks/useLayout';

import { QuestLiquidityModal } from '@/components';

const UsePage = () => {
  return (
    <>
      <QuestLiquidityModal
        item={{
          account_id: '0xc25d79fc4970479b88068ce8891ed9be5799210d',
          account_info: 'b1fe48f8-a954-4819-8f8b-c64768896bf9',
          action_id: 1131,
          action_title: 'Swap 10 DAI on QuickSwap',
          action_tokens: '["DAI","ETH"]',
          count_number: 2,
          template: 'QuickSwap',
          timestamp: 1703538199,
        }}
      ></QuestLiquidityModal>
    </>
  );
};

UsePage.getLayout = useDefaultLayout;

export default UsePage;

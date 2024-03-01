import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

import { fetchEventsList } from '@/utils/events';

const EventsPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  return (
    <ComponentWrapperPage
      src={components.eventsPage}
      meta={{
        title: 'NEAR | Events',
        description: 'Join NEAR for one of our upcoming in-person, virtual, or hybrid events.',
      }}
      componentProps={{
        fetchEventsList,
      }}
    />
  );
};

EventsPage.getLayout = useDefaultLayout;

export default EventsPage;

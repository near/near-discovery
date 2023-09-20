import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import { useAuthStore } from '@/stores/auth';
import {
  handleOnCancel,
  handleOnCancelBanner,
  handlePushManagerUnsubscribe,
  handleTurnOn,
} from '@/utils/notifications';
import {
  isLocalStorageSupported,
  isNotificationSupported,
  isPermisionGranted,
  isPushManagerSupported,
} from '@/utils/notificationsHelpers';
import { getNotificationLocalStorage } from '@/utils/notificationsLocalStorage';
import type { NextPageWithLayout } from '@/utils/types';

const NotificationsSettingsPage: NextPageWithLayout = () => {
  const components = useBosComponents();
  const accountId = useAuthStore((store) => store.accountId);

  return (
    <ComponentWrapperPage
      src={components.nearOrg.notifications.settings}
    />
  );
};

NotificationsSettingsPage.getLayout = useDefaultLayout;

export default NotificationsSettingsPage;

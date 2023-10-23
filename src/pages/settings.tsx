import { useDefaultLayout } from '@/hooks/useLayout';
import { VmComponent } from '@/components/vm/VmComponent';
import type { NextPageWithLayout } from '@/utils/types';
import { useBosComponents } from '@/hooks/useBosComponents';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isLocalStorageSupported } from '@/utils/notificationsHelpers';

const SettingsPage: NextPageWithLayout = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const components = useBosComponents();
  let betaFeatures: any;
  let accountId: any;
  const router = useRouter();

  if (isLocalStorageSupported()) {
    betaFeatures = JSON.parse(localStorage.getItem('beta_features') || '{}');
    accountId = localStorage.getItem('accountId');
    console.log('beta features', betaFeatures);
  }

  useEffect(() => {
    if (!betaFeatures[accountId] || (betaFeatures[accountId] && !betaFeatures[accountId].settings_ui_enabled)) {
      setDialogIsOpen(true);
    }
  }, [accountId]);

  const handleCancelFunction = useCallback(() => {
    setRedirect(true);
    setTimeout(() => {
      router.push('/');
    }, 2500);
  }, []);

  const handleConfirmFunction = useCallback(() => {
    localStorage.setItem(
      'beta_features',
      JSON.stringify({
        ...(betaFeatures || {}),
        [accountId]: {
          ...(betaFeatures || {})[accountId],
          settings_ui_enabled: true,
        },
      }),
    );
  }, []);

  return (
    <>
      {redirect && (
        <VmComponent
          src="near/widget/DIG.Dialog"
          props={{
            type: 'dialog',
            title: 'Redirecting...',
            description: "Ok, let's get you back home.",
            confirmButton: false,
            cancelButton: false,
            open,
          }}
        />
      )}
      <VmComponent
        src="near/widget/DIG.Dialog"
        props={{
          type: 'alert',
          title: 'Join the Beta program for Personalized Settings?',
          description: (
            <span>
              <p>Your data is yours to manage. </p>Get early access to advanced data management and customization
              features, and help us make them better prior to a general public release.
            </span>
          ),
          onCancel: handleCancelFunction,
          onConfirm: handleConfirmFunction,
          cancelButtonText: 'Cancel',
          confirmButtonText: 'Confirm',
          open: dialogIsOpen,
          onOpenChange: (value: boolean) => setDialogIsOpen(value),
        }}
      />
      <ComponentWrapperPage
        src={components.nearOrg.ecosystemPage}
        meta={{
          title: 'NEAR.org | Settings',
          description: 'WIP Settings Area.',
        }}
      />
    </>
  );
};

SettingsPage.getLayout = useDefaultLayout;

export default SettingsPage;

import { useDefaultLayout } from '@/hooks/useLayout';
import { useRouter } from 'next/router';
import type { NextPageWithLayout } from '@/utils/types';
import ExecuteRecords from '@/views/OnBoarding/ExecuteRecords';

const ExecuteRecordsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const chain = router.query.chain as string;

  return chain ? <ExecuteRecords chain={chain} /> : null;
};

ExecuteRecordsPage.getLayout = useDefaultLayout;

export default ExecuteRecordsPage;

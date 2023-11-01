import { useDefaultLayout } from '@/hooks/useLayout';
import NewHomePage from '@/views/Home';

NewHomePage.getLayout = useDefaultLayout;

export default NewHomePage;

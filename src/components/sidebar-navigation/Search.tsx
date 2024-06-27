import { useBosComponents } from '@/hooks/useBosComponents';

import { VmComponent } from '../vm/VmComponent';
import * as S from './styles';

export const Search = () => {
  const components = useBosComponents();
  return (
    <S.SearchWrapper>
      <VmComponent
        src={components.navigation.search}
        props={{
          placeholder: 'Search for apps...',
        }}
      />
    </S.SearchWrapper>
  );
};

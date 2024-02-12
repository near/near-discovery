import { memo } from 'react';
import useMyActions from '../../hooks/useMyActions';
import Total from './Total';
import Empty from './Empty';
import Table from './Table';
import { StyledContainer } from './styles';

const MyActions = ({ chain, openModal }: any) => {
  const { loading, list, deleting, handleDelete } = useMyActions(chain?.chainId, 20);
  return (
    <StyledContainer>
      <Total chainId={chain.chainId} />
      {list?.length && <Table {...{ loading, list, deleting, handleDelete, openModal }} />}
      {list?.length === 0 && !loading && <Empty />}
    </StyledContainer>
  );
};

export default memo(MyActions);

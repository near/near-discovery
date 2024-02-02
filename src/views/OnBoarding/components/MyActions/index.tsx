import { memo } from 'react';
import useMyQuests from '../../hooks/useMyQuests';
import Total from './Total';
import Empty from './Empty';
import Table from './Table';
import { StyledContainer } from './styles';

const MyActions = ({ chain, handleModal }: any) => {
  const { loading, list, deleting, handleDelete } = useMyQuests(chain?.chainId);
  return (
    <StyledContainer>
      <Total chainId={chain.chainId} />
      {list?.length && <Table {...{ loading, list, deleting, handleDelete, handleModal }} />}
      {list?.length === 0 && !loading && <Empty />}
    </StyledContainer>
  );
};

export default memo(MyActions);

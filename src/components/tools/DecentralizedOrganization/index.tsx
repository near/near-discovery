import CreateDaoForm from './CreateDaoForm';
import ListDao from './ListDao';

type Props = {
  loading: boolean;
  user_daos: any[];
  reload: (delay: number) => void;
};

const DAO = ({ loading, user_daos, reload }: Props) => {
  return (
    <>
      <CreateDaoForm reload={reload} />
      <ListDao loading={loading} daos={user_daos} />
    </>
  );
};
export default DAO;

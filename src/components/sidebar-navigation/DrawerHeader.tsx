import * as S from './styles';

type Props = {
  title: string;
};

export const DrawerHeader = ({ title }: Props) => {
  return (
    <S.DrawerHeader>
      <S.DrawerTitle>{title}</S.DrawerTitle>
    </S.DrawerHeader>
  );
};

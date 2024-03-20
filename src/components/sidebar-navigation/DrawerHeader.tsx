import * as S from './styles';

type Props = {
  title: string;
};

export const DrawerHeader = ({ title }: Props) => {
  return (
    <S.Section $screen="larger">
      <S.DrawerTitle>{title}</S.DrawerTitle>
    </S.Section>
  );
};

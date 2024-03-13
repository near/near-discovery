import * as Primitive from '@radix-ui/react-tooltip';
import type { ComponentProps, ReactElement, ReactNode } from 'react';

import * as S from './styles';

type RootProps = Omit<ComponentProps<typeof Primitive.Root>, 'children'>;
type ContentProps = ComponentProps<typeof Primitive.Content>;

type Props = ContentProps & {
  children: ReactElement;
  content: ReactNode;
  disabled?: boolean;
  root?: RootProps;
};

export const Tooltip = ({
  children,
  content,
  disabled,
  root = { disableHoverableContent: true },
  side = 'top',
  sideOffset = 3,
  ...props
}: Props) => {
  const delayDuration = root?.delayDuration || 300;

  return (
    <Primitive.Provider>
      <Primitive.Root delayDuration={delayDuration} open={disabled ? false : undefined} {...root}>
        <Primitive.Trigger asChild>{children}</Primitive.Trigger>

        <Primitive.Portal>
          <S.Content side={side} sideOffset={sideOffset} {...props} ref={undefined}>
            {content}
            <S.ArrowBorder />
            <S.ArrowFill />
          </S.Content>
        </Primitive.Portal>
      </Primitive.Root>
    </Primitive.Provider>
  );
};

// originally copied from https://github.com/near/pagoda-experiments/blob/main/packages/ui/src/components/Input.tsx
import type { ComponentPropsWithRef, FormEventHandler, ReactElement } from 'react';
import { forwardRef } from 'react';

import * as S from './styles';

type Props = ComponentPropsWithRef<'input'> & {
  assistive?: string;
  error?: string;
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
  label?: string;
  left?: ReactElement;
  name: string;
  right?: ReactElement;
  success?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      // assistive,
      autoComplete,
      error,
      iconLeft,
      iconRight,
      inputMode,
      label,
      left,
      name,
      right,
      style,
      success,
      type = 'text',
      ...props
    },
    ref,
  ) => {
    // const assistiveTextId = `${name}-assistive-text`;
    const variant: 'default' | 'success' | 'error' = error ? 'error' : success ? 'success' : 'default';

    if (type === 'search' && !iconLeft) {
      iconLeft = <i className="ph-bold ph-magnifying-glass" />;
    }

    const onInput: FormEventHandler<HTMLInputElement> = (event) => {
      props.onInput && props.onInput(event);
    };

    return (
      <S.Wrapper
        data-disabled={props.disabled}
        data-grow={typeof style?.width === 'undefined'}
        data-type={type}
        data-variant={variant}
        style={style}
      >
        <S.LabelWrapper>
          {label && <S.Label>{label}</S.Label>}

          <S.InputWrapper>
            {iconLeft && <S.Icon aria-hidden="true">{iconLeft}</S.Icon>}

            {left}

            <S.Input
              // aria-errormessage={error ? assistiveTextId : undefined}
              aria-invalid={!!error}
              autoComplete={autoComplete}
              data-1p-ignore={!autoComplete}
              inputMode={inputMode ?? undefined}
              name={name}
              ref={ref}
              type={type}
              {...props}
              onInput={onInput}
              style={{
                textAlign: style?.textAlign,
              }}
            />

            {right}

            {iconRight && <S.Icon aria-hidden="true">{iconRight}</S.Icon>}
          </S.InputWrapper>

          {/* I'm going to leave this as an idea to implement such in future */}
          {/* <AssistiveText variant={variant} message={error || success || assistive} id={assistiveTextId} /> */}
        </S.LabelWrapper>
      </S.Wrapper>
    );
  },
);
Input.displayName = 'Input';

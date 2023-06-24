import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import styled from 'styled-components';

type Variant = 'primary' | 'secondary' | 'affirmative' | 'destructive';

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> & {
  disabled?: boolean;
  fill?: 'solid' | 'outline' | 'ghost';
  href?: string;
  icon?: string;
  iconLeft?: string;
  iconRight?: string;
  label: string;
  loading?: boolean;
  size?: 'small' | 'default' | 'large';
  type?: 'button' | 'submit';
  variant?: Variant;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      disabled,
      fill = 'solid',
      href,
      icon,
      iconLeft,
      iconRight,
      label,
      loading,
      size = 'default',
      type = 'button',
      variant = 'primary',
      ...forwardedProps
    },
    ref,
  ) => {
    const conditionalAttributes: Record<string, unknown> = href
      ? {
          as: 'a',
          href,
        }
      : {
          type,
          disabled: disabled || loading,
        };

    if (icon) {
      conditionalAttributes['aria-label'] = label;
    }

    const variants: Record<Variant, any> = {
      primary: {
        outline: {
          background: 'var(--sand1)',
          border: 'var(--sand6)',
          color: 'var(--violet8)',
          iconColor: 'var(--violet9)',
          hover: {
            border: 'var(--violet6)',
          },
          focus: {
            border: 'var(--violet9)',
          },
          active: {
            background: 'var(--violet2)',
            border: 'var(--violet7)',
          },
        },
        solid: {
          background: 'var(--sand12)',
          border: 'var(--sand12)',
          color: 'var(--sand1)',
          iconColor: 'var(--sand9)',
          hover: {
            background: 'var(--sand11)',
            border: 'var(--sand11)',
          },
          focus: {},
          active: {},
        },
      },
      secondary: {
        outline: {
          background: 'var(--sand1)',
          border: 'var(--sand6)',
          color: 'var(--sand12)',
          iconColor: 'var(--sand10)',
          hover: {
            border: 'var(--sand8)',
          },
          focus: {
            border: 'var(--violet8)',
          },
          active: {
            background: 'var(--sand3)',
            border: 'var(--sand8)',
          },
        },
        solid: {
          background: 'var(--sand3)',
          border: 'var(--sand6)',
          color: 'var(--sand12)',
          iconColor: 'var(--sand11)',
          hover: {
            background: 'var(--sand4)',
          },
          focus: {
            border: 'var(--violet8)',
          },
          active: {
            background: 'var(--sand5)',
          },
        },
      },
      destructive: {
        outline: {
          background: 'var(--sand1)',
          border: 'var(--sand6)',
          color: 'var(--red8)',
          iconColor: 'var(--red9)',
          hover: {
            border: 'var(--red6)',
          },
          focus: {
            border: 'var(--violet8)',
          },
          active: {
            background: 'var(--red2)',
            border: 'var(--red7)',
          },
        },
        solid: {
          background: 'var(--red9)',
          border: 'var(--red8)',
          color: 'var(--red12)',
          iconColor: 'var(--red11)',
          hover: {
            background: 'var(--red10)',
          },
          focus: {
            border: 'var(--red11)',
          },
          active: {
            background: 'var(--red8)',
          },
        },
      },
      affirmative: {
        outline: {
          background: 'var(--sand1)',
          border: 'var(--sand6)',
          color: 'var(--green11)',
          iconColor: 'var(--green10)',
          hover: {
            border: 'var(--green9)',
          },
          focus: {
            border: 'var(--violet8)',
          },
          active: {
            background: 'var(--green2)',
            border: 'var(--green8)',
          },
        },
        solid: {
          background: 'var(--green9)',
          border: 'var(--green8)',
          color: 'var(--green12)',
          iconColor: 'var(--green11)',
          hover: {
            background: 'var(--green10)',
          },
          focus: {
            border: 'var(--green11)',
          },
          active: {
            background: 'var(--green8)',
          },
        },
      },
    };
    variants.primary.ghost = {
      ...variants.primary.outline,
      border: 'hsla(0, 0%, 100%, 0)',
      background: 'hsla(0, 0%, 100%, 0)',
    };
    variants.secondary.ghost = {
      ...variants.secondary.outline,
      border: 'hsla(0, 0%, 100%, 0)',
      background: 'hsla(0, 0%, 100%, 0)',
    };
    variants.destructive.ghost = {
      ...variants.destructive.outline,
      border: 'hsla(0, 0%, 100%, 0)',
      background: 'hsla(0, 0%, 100%, 0)',
    };
    variants.affirmative.ghost = {
      ...variants.affirmative.outline,
      border: 'hsla(0, 0%, 100%, 0)',
      background: 'hsla(0, 0%, 100%, 0)',
    };

    const sizes = {
      small: {
        font: 'var(--text-xs)',
        gap: '6px',
        height: '32px',
        icon: '14px',
        paddingX: '16px',
      },
      default: {
        font: 'var(--text-s)',
        gap: '8px',
        height: '40px',
        icon: '18px',
        paddingX: '20px',
      },
      large: {
        font: 'var(--text-base)',
        gap: '8px',
        height: '48px',
        icon: '18px',
        paddingX: '24px',
      },
    };

    function returnColor(state: string, key: string) {
      if (state === 'default') return variants[variant][fill][key];
      return variants[variant][fill][state][key] || variants[variant][fill][key];
    }

    const StyledButton = styled.button`
      all: unset;
      box-sizing: border-box;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: ${icon ? sizes[size].height : undefined};
      height: ${sizes[size].height};
      padding: ${icon ? '0' : `0 ${sizes[size].paddingX}`};
      font: ${sizes[size].font};
      font-weight: 600;
      line-height: 1;
      border-radius: 100px;
      background: ${returnColor('default', 'background')};
      color: ${returnColor('default', 'color')};
      border: 1px solid ${returnColor('default', 'border')};
      box-shadow: 0 0 0 0px var(--violet4);
      cursor: pointer;
      transition: all 200ms;
      text-decoration: none !important;

      &:hover {
        background: ${returnColor('hover', 'background')};
        color: ${returnColor('hover', 'color')};
        border: 1px solid ${returnColor('hover', 'border')};
      }
      &:focus {
        background: ${returnColor('focus', 'background')};
        color: ${returnColor('focus', 'color')};
        border: 1px solid ${returnColor('focus', 'border')};
        box-shadow: 0 0 0 4px var(--violet4);
      }
      &:active {
        background: ${returnColor('active', 'background')};
        color: ${returnColor('active', 'color')};
        border: 1px solid ${returnColor('active', 'border')};
      }

      ${loading &&
      `
        pointer-events: none;
      `}

      ${disabled &&
      `
        opacity: 1;
        background: ${fill === 'ghost' ? 'hsla(0, 0%, 100%, 0)' : 'var(--sand3)'};
        border-color: var(--sand3);
        color: var(--sand8);
        pointer-events: none;
    
        i {
          color: var(--sand8) !important;
        }
      `}
    `;

    const Inner = styled.span`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: ${sizes[size].gap};

      i {
        font-size: ${sizes[size].icon};
        line-height: ${sizes[size].icon};
        color: ${icon ? undefined : returnColor('default', 'iconColor')};
      }

      ${loading &&
      `
        opacity: 0;
      `}
    `;

    const Label = styled.span``;

    const Spinner = styled.i`
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      margin: calc(${sizes[size].icon} * -0.5) auto 0;
      width: ${sizes[size].icon};
      height: ${sizes[size].icon};
      font-size: ${sizes[size].icon};
      line-height: ${sizes[size].icon};
      animation: spin 800ms infinite linear;

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `;

    return (
      <StyledButton ref={ref} {...conditionalAttributes} {...forwardedProps}>
        <>
          {loading && <Spinner className="ph-bold ph-circle-notch" />}
          <Inner>
            {icon ? (
              <i className={icon} />
            ) : (
              <>
                {iconLeft && <i className={iconLeft} />}
                <Label>{label}</Label>
                {iconRight && <i className={iconRight} />}
              </>
            )}
          </Inner>
        </>
      </StyledButton>
    );
  },
);

Button.displayName = 'Button';

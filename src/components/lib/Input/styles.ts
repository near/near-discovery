// originally copied from https://github.com/near/pagoda-experiments/blob/main/packages/ui/src/components/Input.module.scss
import styled from 'styled-components';

export const Wrapper = styled.div`
  --input-icon-size: 1rem;
  --input-color-background: var(--sand1);
  --input-color-border: var(--sand6);
  --input-color-text: var(--sand12);
  --input-color-icon: var(--sand10);
  --transition-speed: 200ms;

  position: relative;
  flex-shrink: 0;

  &[data-grow='true'] {
    width: 100%;
    flex-grow: 1;
    flex-basis: 0;
  }
`;

export const LabelWrapper = styled.label`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.span`
  display: block;
  font: var(--text-xs);
  font-weight: 600;
  color: var(--sand12);
`;

export const Icon = styled.i`
  display: block;
  width: var(--input-icon-size);
  height: var(--input-icon-size);
  pointer-events: none;
  transition: all var(--transition-speed);
  color: var(--input-color-icon);
`;

export const Input = styled.input`
  display: block;
  flex-grow: 1;
  border: none;
  background: none;
  margin: 0;
  min-width: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0;
  color: var(--sand12);
  font: var(--text-base);
  font-size: 16px; // Make sure we always use 16px to prevent iOS auto-zoom
  outline: none !important;
  text-align: left;
  transition: color var(--transition-speed), opacity var(--transition-speed);

  &::placeholder {
    color: var(--sand10);
    font: var(--text-base);
    font-size: 16px; // Make sure we always use 16px to prevent iOS auto-zoom
    opacity: 1;
  }

  [data-disabled='true'] & {
    opacity: 1;
    color: var(--sand9);

    &::placeholder {
      color: var(--sand9);
    }
  }

  [data-textarea='true'] & {
    line-height: 1.5;
    padding: 8px 12px;
    height: unset;
    min-height: 4rem;
    field-sizing: content; // Progressive enhancement for browsers that support it: https://caniuse.com/?search=field-sizing
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: 'none';
    margin: 0;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
  column-gap: 10px;
  position: relative;
  border-radius: 6px;
  color: var(--input-color-text);
  border: 1px solid var(--input-color-border);
  background-color: var(--input-color-background);
  transition: background-color var(--transition-speed), border-color var(--transition-speed),
    color var(--transition-speed), box-shadow var(--transition-speed);

  &:hover {
    --input-color-border: var(--sand7);
    --input-color-background: var(--sand2);
  }

  [data-type='search'] & {
    border-radius: 100px;

    input::-webkit-search-cancel-button {
      -webkit-appearance: none;
      height: 1.25rem;
      width: 1.25rem;
      border-radius: 100px;
      background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgZmlsbD0iIzAwMDAwMCIgdmlld0JveD0iMCAwIDI1NiAyNTYiPjxwYXRoIGQ9Ik0xMjgsMjRBMTA0LDEwNCwwLDEsMCwyMzIsMTI4LDEwNC4xMSwxMDQuMTEsMCwwLDAsMTI4LDI0Wm0zNy42NiwxMzAuMzRhOCw4LDAsMCwxLTExLjMyLDExLjMyTDEyOCwxMzkuMzFsLTI2LjM0LDI2LjM1YTgsOCwwLDAsMS0xMS4zMi0xMS4zMkwxMTYuNjksMTI4LDkwLjM0LDEwMS42NmE4LDgsMCwwLDEsMTEuMzItMTEuMzJMMTI4LDExNi42OWwyNi4zNC0yNi4zNWE4LDgsMCwwLDEsMTEuMzIsMTEuMzJMMTM5LjMxLDEyOFoiPjwvcGF0aD48L3N2Zz4=)
        no-repeat 50% 50%;
      background-size: contain;
      opacity: 0.35;
      position: relative;
      right: -5px;
      cursor: pointer;
      transition: var(--transition-speed);

      &:hover {
        opacity: 0.5;
      }
    }
  }

  [data-variant='error'] & {
    --input-color-background: var(--red1);
    --input-color-border: var(--red9);
    ${Icon} {
      --input-color-icon: var(--red9);
    }
    ${Input} {
      --input-color-icon: var(--red12);
    }
    &:hover {
      --input-color-background: var(--red2);
      --input-color-border: var(--red8);
    }
  }

  [data-variant='success'] & {
    --input-color-background: var(--green1);
    --input-color-border: var(--green9);
    ${Icon} {
      --input-color-icon: var(--green8);
    }
    ${Input} {
      --input-color-icon: var(--green12);
    }
    &:hover {
      --input-color-background: var(--green2);
      --input-color-border: var(--green8);
    }
  }

  [data-disabled='true'] & {
    pointer-events: none;
    --input-color-background: var(--sand3);
    --input-color-border: var(--sand3);
    ${Icon} {
      --input-color-icon: var(--sand8);
    }
  }

  [data-textarea='true'] & {
    padding: 0;
  }

  [data-open='true'] & {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:focus-within {
    --input-color-border: var(--violet8) !important;
    --input-color-background: var(--white) !important;
    outline: none;
    box-shadow: 0 0 0 4px var(--violet4);
    ${Icon} {
      --input-color-icon: var(--violet7);
    }
    ${Input} {
      --input-color-icon: var(--violet12);
    }
  }
`;

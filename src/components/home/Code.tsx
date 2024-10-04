import React from 'react';
import { CodeBlock } from 'react-code-block/dist/code-block';
import styled from 'styled-components';

const CodeWrapper = styled.div<{
  height?: number;
}>`
  background-color: rgb(41, 45, 62);
  padding: 1rem;
  border-radius: 0.4rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  max-height: ${({ height }) => (height ? `${height}px` : 'none')};
  overflow-y: auto;
  overflow-x: hidden;
`;

const LineContent = styled(CodeBlock.LineContent)`
  padding: 2px 0 2px 8px;
  &:hover {
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const Code = ({ height, code, language }: { height?: number; code: string; language: string }) => {
  return (
    <CodeBlock code={code} language={language}>
      <CodeWrapper height={height}>
        <CodeBlock.Code style={{ marginBottom: 0, overflowX: 'hidden' }}>
          <LineContent>
            <CodeBlock.Token />
          </LineContent>
        </CodeBlock.Code>
      </CodeWrapper>
    </CodeBlock>
  );
};

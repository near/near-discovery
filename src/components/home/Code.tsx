import { Button, copyTextToClipboard } from "@near-pagoda/ui";
import { Copy } from '@phosphor-icons/react';
import React from "react";
import { CodeBlock } from "react-code-block/dist/code-block";
import styled from "styled-components";

const CodeWrapper = styled.div`
  background-color: rgb(41, 45, 62);
  padding: 1rem;
  border-radius: .4rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow-x: scroll;
`

export const Code = ({ height, code, language }: { height?: number, code: string, language: string }) => {
  return (
    <CodeBlock code={code} language={language}>
      <CodeWrapper style={{ maxHeight: height && `${height}px` }}>
        <CodeBlock.Code style={{ marginBottom: 0 }}>
          <CodeBlock.LineContent>
            <CodeBlock.Token />
          </CodeBlock.LineContent>
        </CodeBlock.Code>
        {/* <Button
          label="Copy Code"
          icon={<Copy />}
          size="small"
          fill="outline"
          onClick={() => copyTextToClipboard("Hello world")}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        /> */}
      </CodeWrapper>
    </CodeBlock>
  );
};
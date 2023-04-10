import React, { useEffect, useRef } from "react";
import { useQuery } from "../hooks/useQuery";
import { iframeResizer } from 'iframe-resizer';
import styled from "styled-components";


const StyledIframe = styled.iframe`
    iframe {
        width: 1px;
        min-width: 100%;
    }
`;

export default function Pages(props) {
  const query = useQuery();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      iframeResizer({log: true }, 'near-foundation-pages');
      initialized.current = true;
    }
  }, []);

  return (
        <div className="container-xl">
        <div className="row">
            <div
            className="d-inline-block position-relative overflow-hidden"
            style={{
                "--body-top-padding": "24px",
                paddingTop: "var(--body-top-padding)",
            }}
            >
            <StyledIframe>
                <iframe 
                    id="near-foundation-pages" 
                    title={"near.foundation-"+window.location.href}
                    src="http://near-foundation-pages.local" 
                    width="1100" 
                    height="15000"/>
            </StyledIframe>
            </div>
        </div>
        </div>
  );
}

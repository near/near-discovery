import styled from 'styled-components';

import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const arrow = (
    <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L4 4L1 7" stroke="#979ABE" stroke-linecap="round" />
    </svg>
);

const BlockchainsPage = styled.div`
    color: #ffffff;
  padding: 0 12% 80px 12%;
  position: relative;
`

const BreadCrumbs = styled.div`
  color: #979abe;
  font-size: 14px;
  margin-bottom: 30px;
  svg {
    margin: 0 8px;
  }
  span {
    color: #ffffff;
  }
`;

const BlockchainsColumn: NextPageWithLayout = () => {

    return (
        <BlockchainsPage>

            <BreadCrumbs>
                Home
                {arrow}
                <span>L2 Blockchains</span>
            </BreadCrumbs>

        </BlockchainsPage>
    );
};

BlockchainsColumn.getLayout = useDefaultLayout;

export default BlockchainsColumn;
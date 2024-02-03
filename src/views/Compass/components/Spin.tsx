import styled from 'styled-components';

const SpinWapper = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
    font-family: '5squared pixel';
`

const BgTable = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    background: #000;
`

const BgHor = styled.div`
    height: 0px;
    margin-top: -1px;
    border-bottom: 1px solid rgba(172, 252, 237, .1);
    position: absolute;
    left: 0;
    right: 0;
    overflow: hidden;
`

const BgVer = styled.div`
    width: 0;
    margin-left: -1px;
    border-right: 1px solid rgba(172, 252, 237, .1);
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: hidden;
`

const ChildBox = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
`

const size = 10
const horList = Array.from({ length: 5 }, (x, index) => size * (index + 1))
const verList = Array.from({ length: 80 }, (x, index) => size * (index + 1))

export default function Spin({ renderChildren }: { renderChildren: any }) {
    return <SpinWapper>
        <BgTable>
            {
                horList.map((item, index) => {
                    return <BgHor key={item} style={{ top: item + 'px' }} />
                })
            }
            {
                verList.map((item, index) => {
                    return <BgVer key={item} style={{ left: item + 'px' }} />
                })
            }
        </BgTable>
        <ChildBox>
            {renderChildren()}
        </ChildBox>
    </SpinWapper>
}
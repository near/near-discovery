import styled from 'styled-components';
import Panel from './Panel'

import lightImg from './img/light.svg'

const NextWapper = styled.div`
    background: #000 url(${lightImg.src}) 28% top no-repeat;
    padding: 58px 0;
    margin-top: 50px;
`

const MidWapper = styled.div`
    width: 1244px;
    margin: 0 auto;
`

const Title = styled.div`
    color: #fff;
    font-size: 36px;
    font-weight: 700;
    line-height: 59px;
`

export default function Index() {
    return <NextWapper>
        <MidWapper>
            <Title>The next Compass</Title>
            <Panel />
        </MidWapper>
    </NextWapper>
}
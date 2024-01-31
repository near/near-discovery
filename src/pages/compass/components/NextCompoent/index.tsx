import styled from 'styled-components';
import CompassSwipper from './CompassSwipper';

import lightImg from './img/light.svg'

const NextWapper = styled.div`
    background: #000 url(${lightImg.src}) 6% top no-repeat;
    padding: 58px 0;
    margin-top: 50px;
`

const MidWapper = styled.div`
    width: 1344px;
    margin: 0 auto;
`

const Title = styled.div`
    color: #fff;
    font-size: 36px;
    font-weight: 700;
    line-height: 59px;
`

export default function() {
    return <NextWapper>
        <MidWapper>
            <Title>The next Compass</Title>
            <CompassSwipper />
        </MidWapper>
    </NextWapper>
}
import styled from 'styled-components';
import Swipper from '../Swipper'

import Panel from './Panel'

const Content = styled.div`
    margin-top: 20px;
`

export default function CompassSwipper() {
    return <Content>
        <Swipper navigation pagination={false}>
            <Panel />
            <div>2</div>
            <div>3</div>
        </Swipper>
    </Content>
}
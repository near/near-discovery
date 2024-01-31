import styled from 'styled-components';
import Swipper from '../Swipper'

import Panel from './Panel'

const Content = styled.div`
    width: var(--main-width);
    margin: 100px auto 0;
`

const ProjectLine = styled.div`
    display: flex;
    gap: 13px;
`

export default function () {
    return <Content>
        <Swipper>
            <ProjectLine>
                <Panel />
                <Panel />
                <Panel />
                <Panel />
            </ProjectLine>
            <div>2</div>
            <div>3</div>
        </Swipper>
    </Content>
}
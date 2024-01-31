import styled from 'styled-components';
import Swipper from '../Swipper'
import Panel from './Panel'

const Content = styled.div`
    width: var(--main-width);
    margin: 100px auto 0;
`

const ShareWapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
`

export default function() {
    return <Content>
        <Swipper>
            <ShareWapper>
                <Panel />
                <Panel />
            </ShareWapper>
            <div>2</div>
            <div>3</div>
        </Swipper>
    </Content>
}
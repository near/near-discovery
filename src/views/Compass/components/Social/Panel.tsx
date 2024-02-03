import styled from 'styled-components';

import ShareImg from './img/share.svg'
import FollowImg from './img/follow.svg'
import Spin from '../Spin';
import Fresh from '../Fresh';
import useQuestStatus from '../../hooks/useQuestStatus';

const Panel = styled.div`
    flex: 1;
    padding: 30px 70px;
`

const LogoWapper = styled.div`
    position: relative;
`

const Logo = styled.div`
    margin: 0 auto;
    width: 105px;
    height: 84px;
`

const DescImg = styled.img`
    position: absolute;
    bottom: 0;
    right: 21%;
`

const MidText = styled.div`
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    margin-top: 50px;
`

const ActionBtnWapper = styled.div`
    display: flex;
    margin-top: 25px;
`

const BtnPrimary = styled.div`
    width: 284px;
    height: 69px;
    border-radius: 12px;
    background: rgba(235, 244, 121, 1);
    color: rgba(0, 0, 0, 1);
    text-align: center;
    line-height: 69px;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    
`

const FreshWapper = styled.div`
    display: flex;
    align-items: center;
    height: 69px;
    justify-content: center;
    margin-left: 18px;
`

const SpinWapper = styled.div`
    width: 120px;
    border-radius: 12px;
    border: 2px;
    height: 69px;
    overflow: hidden;
    margin-right: 10px;
`

const SpinText = styled.div`
    font-size: 16px;
    font-weight: 400;
    height: 69px;
    line-height: 69px;
    text-align: center;
    color: rgba(0, 61, 50, 1);
`

interface Props {
    icon: string;
    mark: string;
    mainText: string;
    btnText: string;
    spin: number;
    totalSpin: number;
    id: number;
}

const twitter_url = 'https://twitter.com/i/oauth2/authorize?response_type=code&client_id=VjNVVEJZRndDM1lva1BZNUpGS2M6MTpjaQ&redirect_uri=https://test.dapdap.net/quest/detail?id=24&scope=tweet.read%20users.read%20follows.read%20like.read&state=state&code_challenge=challenge&code_challenge_method=plain'

export default function SocialPanel({
    icon,
    mark,
    mainText,
    btnText,
    spin,
    totalSpin,
    id,
}: Props) {
    const { isQuestSuccess, checkQuestStatus } = useQuestStatus(id)

    return <Panel onClick={() => {
        console.log(1)
    }}>
        <LogoWapper>
            <Logo>
                <img src={icon} />
                <DescImg src={mark} />
            </Logo>
        </LogoWapper>

        <MidText>{mainText}</MidText>

        <ActionBtnWapper>
            <BtnPrimary onClick={ () => {
                window.open(twitter_url)
            } }>{btnText}</BtnPrimary>
            <FreshWapper>
                <SpinWapper>
                    <Spin renderChildren={() => <SpinText>+ {spin}/{ totalSpin } SPIN</SpinText>} />
                </SpinWapper>
                <Fresh onCheck={ checkQuestStatus }/>
            </FreshWapper>

        </ActionBtnWapper>


    </Panel>
}
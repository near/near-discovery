import styled from 'styled-components';
import Step from '../Step'
import Panel from './Panel'

import shareImg from './img/share.svg'
import followImg from './img/follow.svg'
import userImg from './img/user.svg'
import xImg from './img/x.svg'

const Content = styled.div`
    width: var(--main-width);
    margin: 100px auto 0;
`

const ShareWapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
`

interface Props {
    list: any[];
}

const icons: any = {
    'twitter_quote': userImg.src,
    'twitter_follow': xImg.src,
}

const marks: any = {
    'twitter_quote': shareImg.src,
    'twitter_follow': followImg.src,
}

const btnTexts: any = {
    'twitter_quote': 'Refer',
    'twitter_follow': 'Follow us',
}

export default function SocialIndex({ list }: Props) {

    return <Content>
        <ShareWapper>
            {
                list.map(item => {
                    return <Panel
                        key={item.name}
                        icon={icons[item.category]}
                        mark={marks[item.category]}
                        btnText={btnTexts[item.category]}
                        spin={item.spins}
                        totalSpin={item.total_spins}
                        id={item.id}
                        mainText={item.name} 
                        />
                })
            }
        </ShareWapper>
        <Step count={3} step={3} />
    </Content>
}
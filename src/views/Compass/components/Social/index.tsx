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
    onShare?: () => void;
    onFollow?: () => void;
    getQuestGroupList: () => void;
    getSumaryDetail: () => void;
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

export default function SocialIndex({ 
    list, 
    onShare, 
    onFollow, 
    getQuestGroupList, 
    getSumaryDetail 
}: Props) {
    const actions: any = {
        'twitter_quote': onShare,
        'twitter_follow': onFollow,
    }

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
                        onAction={actions[item.category]}
                        mainText={item.name}
                        source={item.source}
                        value={item}
                        getQuestGroupList={getQuestGroupList}
                        getSumaryDetail={getSumaryDetail}
                    />
                })
            }
        </ShareWapper>
        <Step count={3} step={3} />
    </Content>
}
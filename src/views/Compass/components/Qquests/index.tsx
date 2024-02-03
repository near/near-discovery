import { useEffect, useState } from 'react'
import styled from 'styled-components';


import Step from '../Step'
import Panel from './Panel'
import titleNameImg from './img/titleName.svg'

const Content = styled.div`
    width: var(--main-width);
    margin: 100px auto 0;
`

const SlideWapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    gap: 10px;
`

const PanelTitle = styled.div`
    width: 380px;
    height: 250px;
    border-radius: 20px;
    text-align: center;
    padding-top: 10px;
`

const TitleDesc = styled.div`
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;
    margin-top: 40px;
    color: rgba(151, 154, 190, 1);
    text-align: center;
`

interface Props {
    list: any[];
    getQuestGroupList: () => void;
    getSumaryDetail: () => void;
}

export default function Qquests({ list = [], getQuestGroupList, getSumaryDetail }: Props) {
    return <Content>
        <SlideWapper>
            <PanelTitle>
                <img src={titleNameImg.src} />
                <TitleDesc>Complete Qquests to win more spins</TitleDesc>
            </PanelTitle>
            {
                list.map(item => {
                    return <Panel 
                    getQuestGroupList={getQuestGroupList} 
                    getSumaryDetail={getSumaryDetail}
                    value={item} 
                    key={item.id} />
                })
            }
        </SlideWapper>
        <Step count={3} step={1}/>
    </Content>
}
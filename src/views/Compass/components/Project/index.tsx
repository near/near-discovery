import styled from 'styled-components';
import { useEffect, useState } from 'react';
import _ from 'lodash'

import Step from '../Step'
import Panel from './Panel'

const Content = styled.div`
    width: var(--main-width);
    margin: 100px auto 0;
    position: relative;
`

const ProjectLine = styled.div`
    display: flex;
    gap: 13px;
`

interface Props {
    list: any[];
    currentChainIndex: number;
    getQuestGroupList: () => void;
    getSumaryDetail: () => void;
}

export default function Index({ list, currentChainIndex, getQuestGroupList, getSumaryDetail }: Props) {

    useEffect(() => {

    }, [currentChainIndex, list])

    return <Content>
        <ProjectLine>
            {
                list.map(item => {
                    return <Panel
                        currentChainIndex={currentChainIndex}
                        key={item.id}
                        value={item}
                        getQuestGroupList={getQuestGroupList}
                        getSumaryDetail={getSumaryDetail}
                    />
                })
            }
        </ProjectLine>
        <Step count={3} step={2} />
    </Content>
}
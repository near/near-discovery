import styled from 'styled-components';

import useQuestStatus from '../../hooks/useQuestStatus';
import Spin from '../Spin'
import Fresh from '../Fresh';

import maskImg from '../../img/mask.svg'

const PanelWapper = styled.div`
    width: 25%;
    height: 250px;
    border-radius: 20px;
    padding: 20px;
    text-align: center;
    padding: 38px 0 24px;
    background: rgba(33, 35, 42, 0.9) url(${maskImg.src}) right bottom no-repeat;
`

const Title = styled.div`
    font-size: 26px;
    font-weight: 700;
    line-height: 31px;
    color: #fff;
`

const TitleArrow = styled.div`
    margin-top: 15px;
`

const FreshWapper = styled.div`
    display: flex;
    align-items: center;
    height: 42px;
    margin-top: 45px;
    justify-content: center;
`

const SpinWapper = styled.div`
    width: 127px;
    border-radius: 12px;
    border: 2px;
    height: 42px;
    overflow: hidden;
    margin-right: 10px;
`

const SpinText = styled.div`
    font-size: 16px;
    font-weight: 400;
    height: 42px;
    line-height: 38px;
    text-align: center;
    color: rgba(0, 255, 209, 1);
`

const Amount = styled.div`
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    color: rgba(151, 154, 190, 1);
    margin-top: 10px;
` 

interface Props {
    value: any;
    currentChainIndex: number;
}

const chainIndexes = ['linea', 'base', 'manta', 'scroll', 'zksync']

export default function Panel({ value, currentChainIndex }: Props) {
    const { isQuestSuccess, checkQuestStatus } = useQuestStatus(value.id)

    return <PanelWapper onClick={() => {
        window.open(`/all-in-one/${chainIndexes[currentChainIndex]}`)
    }}>
        <Title>{ value.name }</Title>
        <TitleArrow>
            <svg width="28" height="16" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7C0.447715 7 -4.82823e-08 7.44772 0 8C4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM27.7071 8.7071C28.0976 8.31658 28.0976 7.68342 27.7071 7.29289L21.3431 0.92893C20.9526 0.538406 20.3195 0.538406 19.9289 0.928931C19.5384 1.31945 19.5384 1.95262 19.9289 2.34314L25.5858 8L19.9289 13.6569C19.5384 14.0474 19.5384 14.6805 19.9289 15.0711C20.3195 15.4616 20.9526 15.4616 21.3431 15.0711L27.7071 8.7071ZM1 9L27 9L27 7L1 7L1 9Z" fill="white"/>
            </svg>
        </TitleArrow>
        <FreshWapper>
            <SpinWapper>
                <Spin renderChildren={() => 
                <SpinText>+ { value.total_spins }{ value.times === 0 ? '' : '/' + (value.times * value.spins)} SPIN</SpinText>} />
            </SpinWapper>
            <Fresh onCheck={checkQuestStatus}/>
        </FreshWapper>
        
        <Amount>{ value.times > 0 ? 'Participate:' + (value.total_spins / value.times) : '' }</Amount>
    </PanelWapper>
}
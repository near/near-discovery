import styled from 'styled-components';

import Modal from '../Modal'

import r1Img from './img/r1.jpg'
import r2Img from './img/r2.png'
import r3Img from './img/r3.png'
import r4Img from './img/r4.png'
import { memo } from 'react';

const Title = styled.div`
    font-size: 26px;
    font-weight: 500;
    line-height: 31px;
    color: #fff;
    padding-top: 10px;
`

const Context = styled.div`
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    color: rgba(151, 154, 190, 1);
    margin-top: 27px;
` 

const SubTitle = styled.div`
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    color: #fff;
    margin-top: 27px;
`

const Img = styled.img`
    margin-top: 5px;
`



function RuleModal({ show, onClose } : { show: boolean; onClose: () => void }) {
    return <Modal 
    onClose={onClose}
    show={show} 
    width={760} 
    renderChild={() => {
        return <>
            <Title>DapDap Slot Machine Rules</Title>
            <Context>The DapDap slot machine has a total of six patterns, five of which are the L2 chain icon and the dapdap logo. Each participation will consume one spin.</Context>
            <Context>When the slot machine rolls out five save icon, it is the grand prize, with a prize of 10,000 PTS.</Context>
            <Img src={r1Img.src} style={{ width: 300}}/>
            <Context>4 of the same pattern, reward 500PTS.</Context>
            <Img src={r2Img.src} style={{ width: 167}}/>
            <Context>3 of the same pattern, reward 50PTS.</Context>
            <Img src={r3Img.src} style={{ width: 135}}/>
            <Context>The special prize is 5 chain icons (excluding DapDap logo) ,awarding 1000PTS</Context>
            <Img src={r4Img.src} style={{ width: 300}}/>
            <SubTitle>How to get more spins?</SubTitle>
            <Context>{"You can get a chance to win a prize by browsing the DapDap function pages, doing simple on-chain operations to experience DapDap's smooth experience, or sharing by social accounts."}</Context>
        </>
    }} />
}

export default memo(RuleModal)
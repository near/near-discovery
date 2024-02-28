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
            <Title>Welcome to the DapDap Odyssey!</Title>
            <Context>Embark on a novel journey with our latest spin-to-win experience, featuring five Layer-2s and the DapDap icon! To participate, you need one spin.</Context>
            <SubTitle>Prizes:</SubTitle>
            <Context>Grand Prize: Align five matching icons to win an impressive 10,000 DapDap PTS!</Context>
            <Img src={r1Img.src} style={{ width: 300}}/>
            <Context>Four-of-a-Kind: Secure 500 PTS with four matching patterns</Context>
            <Img src={r2Img.src} style={{ width: 167}}/>
            <Context>Three-of-a-Kind: Earn 100 PTS when three icons align</Context>
            <Img src={r3Img.src} style={{ width: 157}}/>
            <Context>Special Prize: Collect 1,000 PTS for landing five chain icons (DapDap logo excluded)</Context>
            <Img src={r4Img.src} style={{ width: 300}}/>
            <SubTitle>Earning More Spins:</SubTitle>
            <Context>Unlock additional spins and enhance your winning chances by:</Context>
            <Context/>
            <Context>{"Navigating through DapDap's partner quests"}<br/>
            Performing simple on-chain actions to enjoy the seamless DapDap experience<br/>Sharing your Odyssey on social media!</Context>
            
        </>
    }} />
}

export default memo(RuleModal)
import styled from 'styled-components';

import Modal from '../Modal'

import lbImg from './img/lb.svg'
import smImg from './img/sm.svg'
import ccmg from './img/cc.svg'

const Iocn = styled.img`
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translate(-50%);
    &.fail {
        top: 30px;
    }
`

const Title = styled.div`
    font-family: Gantari;
    font-size: 32px;
    font-weight: 700;
    line-height: 38px;
    text-align: center;
    color: #fff;
    padding-top: 70px;
    
`

const Content = styled.div`
    font-family: Gantari;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    text-align: center;
    color: rgba(235, 244, 121, 1);
    margin-top: 15px;
    &.fail {
        color: #fff;
    }
`

const Btn = styled.div`
    width: 360px;
    height: 48px;
    border-radius: 10px;
    line-height: 48px;
    background: rgba(235, 244, 121, 1);
    font-family: Gantari;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    margin-top: 45px;
    cursor: pointer;
`

const CcImg = styled.img`
    width: 20px;
    height: 20px;
    margin-top: -4px;
`

export default function PrizeModal({ 
    show, 
    onClose,
    prize,
} : { 
    show: boolean; 
    onClose: () => void;
    prize: number;
 }) {
    return <Modal 
    onClose={onClose}
    show={show} 
    width={450} 
    renderChild={() => {
        if (prize <= 0) {
            return <>
            <Iocn className='fail' src={smImg.src} />
            <Title>Oops!</Title>
            <Content className='fail'>{"You haven't won this round."}</Content>
            <Btn onClick={ onClose }>Kepp trying</Btn>
        </>
        }

        return <>
            <Iocn src={lbImg.src} />
            <Title>Congrats!!!!</Title>
            <Content>You’ve got 10000 <CcImg src={ccmg.src}/> PTS</Content>
            <Btn onClick={ onClose }>Get Prize</Btn>
        </>
    }} 
    />
}
import styled from 'styled-components';

import Spin from '../Spin'
import maskImg from '../../img/mask.svg'

const PanelWapper = styled.div`
    width: 380px;
    height: 250px;
    border-radius: 20px;
    padding: 20px;
    background: rgba(33, 35, 42, 0.9) url(${maskImg.src}) right bottom no-repeat;
`

const TitleWapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 40px;
`

const Title = styled.div`
    font-size: 26px;
    font-weight: 700;
    line-height: 31px;
    color: rgba(255, 255, 255, 1);
`

const TitleArrow = styled.div`

`

const Content = styled.div`
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    color: rgba(151, 154, 190, 1);
    margin-top: 18px;
`

const SpinWapper = styled.div`
    width: 127px;
    height: 42px;
    border: 2px solid;
    border-image-source: linear-gradient(180deg, #0B0D13 0%, #373940 100%);
    border-radius: 12px;
    overflow: hidden;
    margin-top: 28px;
    margin-left: auto;
`

const SpinText = styled.div`
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    height: 100%;
    line-height: 35px;
    color: rgba(0, 255, 209, 1);
`

export default function Panel() {
    return <PanelWapper>
        <TitleWapper>
            <Title>EXPLORE BLOCKCHAIN</Title>
            <TitleArrow>
                <svg width="28" height="16" viewBox="0 0 28 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7C0.447715 7 -4.82823e-08 7.44772 0 8C4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM27.7071 8.7071C28.0976 8.31658 28.0976 7.68342 27.7071 7.29289L21.3431 0.92893C20.9526 0.538406 20.3195 0.538406 19.9289 0.928931C19.5384 1.31945 19.5384 1.95262 19.9289 2.34314L25.5858 8L19.9289 13.6569C19.5384 14.0474 19.5384 14.6805 19.9289 15.0711C20.3195 15.4616 20.9526 15.4616 21.3431 15.0711L27.7071 8.7071ZM1 9L27 9L27 7L1 7L1 9Z" fill="white" />
                </svg>
            </TitleArrow>
        </TitleWapper>
        <Content>DapDap’s L2 BlockChains page brings together many public chains under L2 including these 5 chains.</Content>
        <SpinWapper>
            <Spin renderChildren={() => <SpinText>+ 1/1 SPIN</SpinText>} />
        </SpinWapper>
    </PanelWapper>
}
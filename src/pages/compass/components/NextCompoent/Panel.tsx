import styled from 'styled-components';

import LineImg from './img/line.svg'
import g2Img from '../../img/g2.svg'
import compassImg from '../../img/compass.svg'
import winImg from '../../img/win.svg'

const ProjectLine = styled.div`
    display: flex;
    padding: 30px;
    background: linear-gradient(0deg, #21232A, #21232A), linear-gradient(180deg, #464B56 0%, rgba(0, 0, 0, 0) 100%);
    height: 380px;
    border-radius: 32px;
    position: relative;
    margin-top: 10px;
`

const IconBox = styled.img`
    width: 646px;
    height: 323px;
`

const DescBox = styled.div`
    margin-left: 40px;
`

const TopIcon = styled.img`
    width: 56px;
    height: 56px;
`

const DescTitle = styled.div`
    color: #fff;
    font-size: 36px;
    font-weight: 700;
    line-height: 44px;
    text-align: left;
    color: #fff;
    margin-top: 24px;
`

const DescFull = styled.div`
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
    margin-top: 16px;
    color: rgba(151, 154, 190, 1);
`

const ComingSoon = styled.div`
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    color: rgba(0, 226, 255, 1);
    margin-top: 56px;
`

const CompassIcon = styled.img`
    position: absolute;
    right: 30px;
    top: -60px;
`

const WinIcon = styled.img`
    position: absolute;
    right: -30px;
    top: -30px;
`

export default function() {
    return <ProjectLine>
        <IconBox src={LineImg.src} />
        <DescBox>
            <TopIcon src={g2Img.src}/>
            <DescTitle>Linea Compass</DescTitle>
            <DescFull>Effortlessly sift through a curated selection of dApps and identify your favourites.</DescFull>
            <ComingSoon>Coming soon...</ComingSoon>
        </DescBox>
        <CompassIcon src={compassImg.src} />
        <WinIcon src={winImg.src} />
    </ProjectLine>
}
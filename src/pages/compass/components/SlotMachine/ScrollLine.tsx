import styled from 'styled-components';


import g1Img from '../../img/g1.svg'
import g2Img from '../../img/g2.svg'
import g3Img from '../../img/g3.svg'
import g4Img from '../../img/g4.svg'
import g5Img from '../../img/g5.svg'
import { useEffect, useState } from 'react';


const ScrollLineWapper = styled.div`
    width: 140px;
    height: 140px;
    overflow: hidden;
`

const ScrollIcons = styled.div`
    width: 100%;
    transform: translateY(-65px); // -90 * n + (140 - 90) / 2
    transition: all 2s ease-out;
    @keyframes move {
        0% {
            transform: translateY(-515px);
        }
        100% {
            transform: translateY(-65px);
        }
    }
    &.ani {
        animation: move .5s linear infinite;
    }
    
`

const ScrollIconItems = styled.div`
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ScrollIconItemsImg = styled.img`
    width: 50%;
`

const list = [g5Img.src, g1Img.src, g2Img.src, g3Img.src, g4Img.src, g5Img.src, g1Img.src]

export default function ScrollLine({
    no
}: {
    no: number
}) {
    const [isScoll, setIsScroll] = useState<boolean>(false)
    const [location, setLocation] = useState<number | undefined>()

    useEffect(() => {
        setIsScroll(true)

        setTimeout(() => {
            setIsScroll(false)
            const _location = -90 * no + (140 - 90) / 2
            setTimeout(() => {
                setLocation(_location)
            }, 0)
        }, 3000)
    }, [no])

    const transformStyle = location ? { transform: `translateY(${location}px)` } : {}

    return <ScrollLineWapper>
        <ScrollIcons className={isScoll ? 'ani' : ''} style={transformStyle}>
            {
                list.map(item => {
                    return <ScrollIconItems>
                        <ScrollIconItemsImg src={item} />
                    </ScrollIconItems>
                })
            }
        </ScrollIcons>
    </ScrollLineWapper>
}
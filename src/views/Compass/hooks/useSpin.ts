import { useEffect, useState } from 'react'
import { postSpin, postClaim } from '../http/index'
import useToast from '@/hooks/useToast';
import { getRandomInt } from '@/utils/formate'

function getRandomSpin() {
    return Array.from({ length: 5 }, () => getRandomInt(1, 6))
}

const initSpin = getRandomSpin()

export default function useSpin(
    id: string,
    setAvailableSpins: (arg: number) => void,
    setTotalSpins: (arg: number) => void,
    setUnclaimedReward: (arg: number) => void
) {
    const [chainList, setChainList] = useState<number[]>(initSpin)
    const { fail, success } = useToast()
    const [isSpining, setIsSpining] = useState(false)
    const [isClaiming, setIsClaiming] = useState(false)

    async function startSpin() {
        setIsSpining(true)
        const res = await postSpin(id)
        if (res.code !== 0) {
            fail({
                title: 'Fail',
                text: res.msg,
            })
            setIsSpining(false)
            return
        }

        const { rand, reward, unclaimed_reward, available_spins } = res.data

        const _chainList = rand.split('').map(Number)

        setChainList(_chainList)
        // setAvailableSpins(available_spins)
        // setUnclaimedReward(unclaimed_reward)
        setIsSpining(false)

        return reward
    }

    async function startCliam() {
        setIsClaiming(true)
        const res = await postClaim(id)

        if (res.code !== 0) {
            fail({
                title: 'Fail',
                text: res.msg,
            })
            setIsClaiming(false)
            return
        }

        if (res.code === 0) {
            success({
                title: 'Success',
                text: res.msg,
            })
            setIsClaiming(false)
        }
    }

    return {
        chainList,
        startSpin,
        startCliam,
        isSpining,
        isClaiming,
    }
}  
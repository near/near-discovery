import { useCallback, useState } from 'react'
import useToast from '@/hooks/useToast';
import { checkQuest } from '../http/index'

export default function useQuestStatus(id: number) {
    const { fail, success } = useToast()
    const [isQuestSuccess, setIsQuestSuccess] = useState(false)

    const checkQuestStatus = useCallback(async () => {
        setIsQuestSuccess(true)
        const res = await checkQuest(id)
        if (res.code === 0) {
            success({
                title: 'Success',
                text: res.msg,
            })
        }

        if (res.code === 1) {
            fail({
                title: 'Fail',
                text: res.msg,
            })
        }
        setIsQuestSuccess(false)
    }, [])

    return {
        isQuestSuccess,
        checkQuestStatus,
    }
}
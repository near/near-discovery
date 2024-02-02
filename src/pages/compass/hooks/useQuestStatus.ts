import { useState } from 'react'
import useToast from '@/hooks/useToast';
import { checkQuest } from '../http/index'

export default function useQuestStatus(id: number) {
    const { fail, success } = useToast()
    const [isQuestSuccess, setIsQuestSuccess] = useState(false)

    async function checkQuestStatus() {
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
    }

    return {
        isQuestSuccess,
        checkQuestStatus,
    }
}
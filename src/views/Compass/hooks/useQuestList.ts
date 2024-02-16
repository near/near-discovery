import { useEffect, useState } from 'react'
import { getQuestList } from '../http/index'


export default function useQuestList(id: string) {
    const [questList, setQuestList] = useState<{
        twitter: any[],
        page: any[],
        dapp: any[],
    }>({
        twitter: [],
        page: [],
        dapp: [],
    })

    function getQuestGroupList() {
        return getQuestList(id)
            .then((quest) => {
                setQuestList(quest)
            })
    }

    useEffect(() => {
        getQuestList(id)
            .then((quest) => {
                setQuestList(quest)
            })
    }, [])

    return {
        questList,
        getQuestGroupList,
    }
}
import _ from 'lodash'
import { get, post } from '@/utils/http'

const COMPASS_DETAIL_URL = '/api/compass'
const COMPASS_SPIN_URL = '/api/compass/spin'
const COMPASS_CLAIN_URL = '/api/compass/claim'
const COMPASS_QUEST_LIST = '/api/compass/quest_list'
const COMPASS_SAVE_SOURCE_URL = '/api/compass/source'
const COMPASS_CHECK_QUEST_URL = '/api/compass/check_quest'

export async function getCompassDetail(id: string) {
    const res = await get(COMPASS_DETAIL_URL, { id })
    if (res.code === 0) {
        const { data } = res
        return data
    }

    return null
}

export async function postSpin(id: string) {
    return post(COMPASS_SPIN_URL, { id })
}

export async function postClaim(id: string) {
    return post(COMPASS_CLAIN_URL, { id })
}

export async function getQuestList(id: string) {
    const res: any = await get(COMPASS_QUEST_LIST, { id })

    const twitter: any[] = []
    const page: any[] = []
    const dapp: any[] = []


    const result = {
        twitter,
        page,
        dapp,
    }

    if (res.code !== 0) {
        return result
    }


    const { data } = res

    result.page = data.visit_quests || page
    result.dapp = data.chain_quests || dapp
    result.twitter = data.social_quests
        ? data.social_quests.sort((a: any, b: any) => a.category.length - b.category.length)
        : twitter

    return result
}

export async function saveSource(quest_id: number) {
    return post(COMPASS_SAVE_SOURCE_URL, { quest_id })
}

export async function checkQuest(id: number) {
    return get(COMPASS_CHECK_QUEST_URL, { id })
}
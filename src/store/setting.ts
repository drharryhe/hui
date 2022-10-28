import {defineStore} from 'pinia'

export const useStoreSetting = defineStore('setting', {
    state: () => {
        return {
            lang: 'zh-CN',
            dark: true,
        }
    },
})
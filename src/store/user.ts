import { defineStore } from 'pinia'

const useUser = defineStore('user',{
    state: () => ({
        token: null,
        info:{
            name: ""
        }
    }),
    getters: {
        name(state) {
            return state.info.name
        }
    },
    actions: {
        
    }
})

export default useUser

import { createStore } from 'vuex'
import rootMutations from './mutations.js'
import rootActions from './actions.js'
import rootGetters from './getters.js'

const store = createStore({
    state() {
        return {
            overlay: false,
            lastListId: 3,
            lastCardId: 3,
            currentData: null,
            lists: [],
            cards: [],
            card:{},
            comments:[]
             
        }
    }, 
    mutations: rootMutations,
    actions: rootActions,
    getters: rootGetters
})

export default store
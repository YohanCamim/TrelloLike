import secret from '@/secret.js'

export default {
    getPosts({ commit }) {
        const url = secret.url + 'posts?per_page=100'

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            res.json().then((data) => {
                console.log(data)
                commit('setPosts', data)
            })
        })
    },
    getPost({ commit }, id) {
        const url = secret.url + 'posts/' + id
        console.log(url)

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            res.json().then((data) => {
                console.log(data)
                commit('setPost', data)
            })
        })
    },
    getLists({ commit }) {
        const url = secret.url + 'categories'

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            res.json().then((data) => {
                console.log(data)
                commit('setLists', data)
            })
        })
    },

    getComments({ commit }, id) {
        const url = secret.url + 'comments?post=' + id
        console.log(url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            res.json().then((data) => {
                console.log(data)
                commit('setComments', data)
            })
        })
    },
    createList(context, payload) {
        context.commit("createNewList", payload)
    },
    createCard(context, payload) {
        context.commit("createNewCard", payload)
    },
    toggleOverlay(context) {
        context.commit("toggleOverlay")
    },
    openForm(context, payload) {
        context.commit("openForm", payload)
    },
    saveCard(context, payload) {
        context.commit("saveCard", payload)
    },
    deleteCard(context, payload) {
        context.commit("deleteCard", payload)
    }
}
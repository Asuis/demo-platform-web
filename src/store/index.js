import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user: {
            namespaced:  true,
            state: {
                token: undefined,
                name: undefined,
                avatar: undefined
            },
            getters:{
                isAdmin() {
                },
            },
            mutations: {
                signInSuccess(state, payload) {
                    state.token = payload.t
                    state.name = payload.n
                    state.avatar = payload.ava
                },
                signInFailed(state, payload) {
                    state.token = payload.t
                    state.name = payload.n
                    state.avatar = payload.ava
                }
            },
            actions:{
                signIn() {},
                signUp() {},
                signOut() {}
            }
        },
        repo: {
            namespaced: true,
            state: {
                
            },
            mutations: {},
            actions: {}
        }
    }
})

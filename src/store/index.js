import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/api/api'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user: {
            namespaced:  true,
            state: {
                ac: '',
                token: undefined,
                name: undefined,
                avatar: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
                isLogined: false
            },
            getters:{
                isAdmin() {
                },
                getUser(state) {
                    return {
                        name: state.name,
                        avatar: state.avatar,
                    }
                },
                getToken(state) {
                    return state.token
                }
            },
            mutations: {
                signInSuccess(state, payload) {
                    let token = payload.t.split('.')
                    const data = JSON.parse(window.atob(token[1]))
                    state.token = payload.t
                    state.name = data.n
                    state.isLogined = true
                    state.ac = data.ac
                    sessionStorage.setItem("token", payload.t)
                    console.log('signInsuccess:', state)
                    Vue.prototype.$Message({ type: 'error',
                    message: `Σ(;ﾟдﾟ)  服务器崩坏，需要联系管理员维修`,
                    duration: 6.5})
                },
                signInFailed(state, payload) {
                    state.token = payload.t
                    state.name = payload.n
                    state.avatar = payload.ava
                },
                fetchUserFromSession(state) {
                    const t = sessionStorage.getItem('token')
                    if (t !== null && t !== '') {
                        let token = t.split('.')
                        const data = JSON.parse(window.atob(token[1]))
                        state.token = token
                        state.name = data.n
                        state.isLogined = true
                        state.ac = data.ac
                    }
                }
            },
            actions:{
                signIn({ commit }, payload) {
                    return Api.user.SignIn(payload).then(({ data }) => {
                        console.log(data)
                        commit('signInSuccess', data)
                    })
                },
                signUp({ commit }, payload) {
                    return Api.user.SignUp(payload).then(({ data }) => {
                        commit('signInSuccess', data)
                    })
                },
                signOut() {}
            }
        },
        repo: {
            namespaced: true,
            state: {
                repo: [],
                info: {},
                files: [],
                fileInfo: ''
            },
            getters: {
                listRepositories(state) {
                    return state.repo
                },
                infoRepo(state) {
                    return state.info
                },
                files(state) {
                    return state.files
                },
                fileInfo(state) {
                    return state.fileInfo
                }
            },
            mutations: {
                listRepositories(state, payload) {
                    state.repo = payload
                },
                infoRepo(state, payload) {
                    state.info = payload
                },
                files(state, payload) {
                    state.files = payload
                },
                fileInfo(state, payload) {
                    state.fileInfo = payload
                }
            },
            actions: {
                getRepositories({commit}, payload) {
                    return Api.repo.List(payload).then(({ data }) => {
                        commit('listRepositories', data)
                    })
                },
                info({commit}, payload) {
                    return Api.repo.Info(payload).then(({ data }) => {
                        commit('infoRepo', data)
                    })
                },
                files({commit}, payload) {
                    return Api.repo.Files(payload).then(({data}) => {
                        commit('files', data)
                    })
                },
                fileInfo({commit}, payload) {
                    return Api.repo.FileInfo(payload).then(({data}) => {
                        commit('fileInfo', data)
                    })
                }
            }
        }
    }
})

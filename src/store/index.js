import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/api/api'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user: {
            namespaced: true,
            state: {
                ac: '',
                token: undefined,
                name: undefined,
                avatar: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
                isLogined: false,
                isAdmin: false
            },
            getters: {
                isAdmin(state) {
                    return state.isAdmin
                },
                getUser(state) {
                    return {
                        name: state.name,
                        avatar: state.avatar,
                    }
                },
                getToken() {
                    const token = sessionStorage.getItem('token')
                    return token
                }
            },
            mutations: {
                signInSuccess(state, payload) {
                    let t = payload.t.concat()
                    let token = t.split('.')
                    const data = JSON.parse(window.atob(token[1]))
                    state.token = payload.t
                    console.log(state.token)
                    state.name = data.n
                    state.isLogined = true
                    state.isAdmin = data.admin
                    state.ac = data.ac
                    sessionStorage.setItem("token", payload.t)
                    console.log('signInsuccess:', state)
                    Vue.prototype.$Message({
                        type: 'error',
                        message: `Σ(;ﾟдﾟ)  服务器崩坏，需要联系管理员维修`,
                        duration: 6.5
                    })
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
            actions: {
                signIn({
                    commit
                }, payload) {
                    return Api.user.SignIn(payload).then(({
                        data
                    }) => {
                        console.log(data)
                        commit('signInSuccess', data)
                    })
                },
                signUp({
                    commit
                }, payload) {
                    return Api.user.SignUp(payload).then(({
                        data
                    }) => {
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
                getRepositories({
                    commit
                }, payload) {
                    return Api.repo.List(payload).then(({
                        data
                    }) => {
                        commit('listRepositories', data)
                    })
                },
                info({
                    commit
                }, payload) {
                    return Api.repo.Info(payload).then(({
                        data
                    }) => {
                        commit('infoRepo', data)
                    })
                },
                files({
                    commit
                }, payload) {
                    return Api.repo.Files(payload).then(({
                        data
                    }) => {
                        commit('files', data)
                    })
                },
                fileInfo({
                    commit
                }, payload) {
                    return Api.repo.FileInfo(payload).then(({
                        data
                    }) => {
                        commit('fileInfo', data)
                    })
                },
                create(_, payload) {
                    return Api.repo.Create(payload)
                }
            }
        },
        container: {
            namespaced: true,
            state: {
                containerList: [],
                page: {},
                stat: {},
                images: []
            },
            getters: {
                List(state) {
                    return state.containerList
                }
            },
            mutations: {
                List(state, payload) {
                    state.containerList = payload
                },
                Images(state, payload) {
                    state.images = payload.list
                }
            },
            actions: {
                list({commit }, payload) {
                    return Api.container.List(payload).then(({
                        data
                    }) => {
                        commit('List', data)
                    })
                },
                stat(_, payload) {
                    return Api.container.Stat(payload)
                },
                run(_, payload) {
                    return Api.container.Run(payload)
                },
                stop(_, payload) {
                    return Api.container.Stop(payload)
                },
                delete(_, payload) {
                    return Api.container.Delete(payload)
                },
                update(_, payload) {
                    return Api.container.Delete(payload)
                },
                create(_, payload) {
                    return Api.container.Create(payload)
                },
                loadImages({commit}, payload) {
                    return Api.container.Images(payload).then(({
                        data
                    }) => {
                        commit('List', data)
                    })
                }
            }
        },
        admin: {
            namespaced: true,
            state: {},
            getters: {},
            mutations: {},
            actions: {
                listUser(_, payload){
                    return Api.admin.UserList(payload)
                },
                infoUser(_, payload) {
                    return Api.admin.User(payload)
                }
            }
        }
    }
})
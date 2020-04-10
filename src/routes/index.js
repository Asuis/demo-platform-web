import Vue from 'vue'
import Router from 'vue-router'
import Term from '@/components/Terminal.vue'
import Login from '@/components/LoginCard.vue'
import RepoView from '@/components/RepoView.vue'
import Terminal from '@/components/Terminal.vue'
import RepoForm from '@/components/RepoForm.vue'
import Container from '@/views/container/ContainerPage.vue'
import Home from '@/views/Home.vue'
import AdminPage from '@/views/admin/AdminPage.vue'
import AdminLogin from '@/views/admin/LoginPage.vue'
import UserPage from '@/views/admin/user/UserPage.vue'
import NewsEditPage from '@/views/admin/contest/news/NewsEditPage.vue'
import ContestPage from '@/views/admin/contest/manage/ContestPage.vue'
import ProcessPage from '@/views/admin/contest/process/ProcessPage.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/admin',
            name: 'admin',
            component: AdminPage,
            children: [{
                path: 'login',
                name: 'login',
                component: Login
            },{
                path: 'user',
                name: 'user',
                component: UserPage
            },{
                path: 'news',
                name: 'news',
                component: NewsEditPage
            },{
                path: 'contest',
                name: 'contest',
                component: ContestPage
            }, {
                path: 'process',
                name: 'process',
                component: ProcessPage
            }, {
                path: 'audit_conf',
                name: 'audit_conf',
                component: ProcessPage
            },{
                path: 'audit',
                name: 'audit',
                component: ProcessPage
            },{
                path: 'repo',
                name: 'repo',
                component: ProcessPage
            },{
                path: 'display',
                name: 'display',
                component: ProcessPage
            }, {
                path: 'sys',
                name: 'sys',
                component: ProcessPage
            }, {
                path: 'data',
                name: 'data',
                component: ProcessPage
            }]
        },
        {
            path: '/backend/login',
            name: 'backend',
            component: AdminLogin,
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [{
                path: 'login',
                component: Login
            }]
        },
        {
            path: '/terminal/:container_id',
            name: 'terminal',
            component: Term
        },
        {
            path: '/repo/:username/:repo/:relpath*',
            name: 'repo',
            component: RepoView
        },
        {
            path: '/cloud/console/:container_id',
            name: 'console',
            component: Terminal
        },
        {
            path: '/form/test',
            name: 'test',
            component: RepoForm
        },
        {
            path: '/container/list',
            name: 'container',
            component: Container
        },
        {
            path: '/mycontainer',
            name: 'mycontainer',
            component: Container
        },
        {
            path: '/mycontroller',
            name: 'mycontroller',
            component: Container
        }
    ]
})
import Vue from 'vue'
import Router from 'vue-router'
import Term from '@/components/Terminal.vue'
import Login from '@/components/Login.vue'
import RepoView from '@/components/RepoView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Login
    },
    {
      path: '/console',
      name: 'console',
      component: Term
    },
    {
      path: '/repo/:username/:repo',
      name: 'repo',
      component: RepoView
    }
  ]
})

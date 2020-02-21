import Vue from 'vue'
import Router from 'vue-router'
import Term from '@/components/Terminal.vue'
import Login from '@/components/Login.vue'
import RepoView from '@/components/RepoView.vue'
import Terminal from '@/components/Terminal.vue'
import RepoForm from '@/components/RepoForm.vue'

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
    }
  ]
})

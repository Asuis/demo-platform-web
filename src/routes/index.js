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
import NewsAdminListView from '@/views/admin/contest/news/NewsSearchPage.vue'
import ContestPage from '@/views/admin/contest/manage/ContestPage.vue'
import ProcessPage from '@/views/admin/contest/process/ProcessPage.vue'
import NewsDetails from '@/components/news/NewsDetails.vue'
import IndexView from '@/views/index/IndexView.vue'
import RegisterView from '@/components/user/RegisterView.vue'
import NewsListView from '@/views/contest/NewsListView.vue'
import ContestListView from '@/views/contest/ContestListView.vue'
import RepoListView from '@/views/repo/RepoListView.vue'
import UserDetails from '@/views/admin/user/UserDetails.vue'
import MyRepository from '@/components/MyRepository.vue'
import MyGroupPage from '@/views/user/MyGroupView.vue'
import MyContainerPage from '@/views/user/MyContainerView.vue'
import MyDisplayPage from '@/views/user/MyDisplayView.vue'
import ContestDetailPage from '@/views/admin/contest/manage/ContestDetailPage'
import RepositoryPage from '@/views/admin/repository/RepoPage'
import DisplayPage from '@/views/admin/repository/DisplayPage'
import ContainerPage from '@/views/admin/container/ContainerPage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    
    {
      path: '/terminal/:container_id',
      name: 'terminal',
      component: Term
    },
    
    {
      path: '/admin',
      name: 'admin',
      component: AdminPage,
      children: [{
          path: 'login',
          name: 'login',
          component: Login
        }, {
          path: 'user',
          name: 'user',
          component: UserPage
        }, {
          path: 'user/details/:ID',
          name: 'userdetails',
          component: UserDetails
        }, {
          path: 'news/list',
          name: 'newslist',
          component: NewsAdminListView
        }, {
          path: 'news/edit/:id',
          name: 'newsedit',
          component: NewsEditPage
        }, {
          path: 'news/preview/:id',
          name: 'newspreview',
          component: NewsDetails
        }, {
          path: 'contest',
          name: 'contest',
          component: ContestPage
        },
        {
          path: 'contestdetails/:id',
          name: 'contestdetilas',
          component: ContestDetailPage
        },
        {
          path: 'process',
          name: 'process',
          component: ProcessPage
        }, {
          path: 'audit_conf',
          name: 'audit_conf',
          component: ProcessPage
        }, {
          path: 'audit',
          name: 'audit',
          component: ProcessPage
        }, {
          path: 'repo',
          name: 'repo',
          component: RepositoryPage
        }, {
          path: 'display',
          name: 'display',
          component: DisplayPage
        }, {
          path: 'sys',
          name: 'sys',
          component: ProcessPage
        },
        {
          path: 'container',
          name: 'container',
          component: ContainerPage
        },
        {
          path: 'data',
          name: 'data',
          component: ProcessPage
        }, {
          path: 'group',
          name: 'group',
          component: ProcessPage
        }, {
          path: 'question',
          name: 'question',
          component: ProcessPage
        }
      ]
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
        }, {
          path: 'news/:id',
          name: 'news',
          component: NewsDetails
        }, {
          path: '/register',
          name: 'register',
          component: RegisterView
        }, {
          path: 'list/news',
          name: 'newslist',
          component: NewsListView
        }, {
          path: 'list/contest',
          name: 'contestlist',
          component: ContestListView
        }, {
          path: 'list/repo',
          name: 'repolist',
          component: RepoListView
        },

        {
          path: '/myrepository',
          name: 'myrepository',
          component: MyRepository
        },
        {
          path: '/mygroup',
          name: 'mygroup',
          component: MyGroupPage
        },
        {
          path: '/mycontainer',
          name: 'mycontainer',
          component: MyContainerPage
        },
        {
          path: '/mydisplay',
          name: 'mydisplay',
          component: MyDisplayPage
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
          path: '*',
          name: 'index',
          component: IndexView
        }
      ]
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
      path: '/mycontroller',
      name: 'mycontroller',
      component: Container
    }
  ]
})
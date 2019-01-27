import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'account',
      component: require('@/components/Account/Index').default
    },
    {
      path: '/demo',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/index',
      name: 'index',
      component: require('@/components/Panel/Index').default
    },
    {
      path: '/test',
      name: 'test',
      component: require('@/components/Test').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

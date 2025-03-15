import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'


Vue.use(Router)

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

Vue.use(Vuex)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Login',
    //   component: Login,
    // },
    { 
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/generate',
          name: 'generate',
         component: () => import('../views/generate/generate'),
          meta: {
            keepAlive: true,
            isTab: false,
            isAuth: false
          }
        },
        {
          path: '/evaluation',
          name: 'evaluation',
          component: () => import('../views/evaluation/evaluation'),
          meta: {
            keepAlive: true,
            isTab: false,
            isAuth: false
          }
        },
        // {
        //   path: '/library',
        //   name: 'library',
        //   component: () => import('../views/library/library'),
        //   meta: {
        //     keepAlive: true,
        //     isTab: false,
        //     isAuth: false
        //   }
        // },
      ],
    },
  ]
})

//../views/generate/generate
//../views/library/library
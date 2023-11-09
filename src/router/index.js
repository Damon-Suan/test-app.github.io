import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/home.vue"
import User from "../views/user.vue"
import Main from "../views/main.vue"
import Mall from "../views/mall.vue"
import PageOne from "../views/page-one.vue"
import PageTwo from "../views/page-two.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    redirect: "/home",//重定向
    children: [
      { path: 'home', component: Home },
      { path: 'user', component: User },
      { path: 'mall', component: Mall },
      { path: 'page-one', component: PageOne },
      { path: 'page-two', component: PageTwo },
    ]
  }

]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

export default router

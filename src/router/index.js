import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ViewUser from '@/components/ViewUser.vue'
import EditUser from '@/components/EditUser.vue'
import CreateUser from '@/components/CreateUser.vue'
import DelUser from '@/components/DelUser.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/viewuser',
    name: 'ViewUser',
    component: ViewUser
  },
  {
    path: '/edit-user/:userId',
    name: 'edit-user',
    component: EditUser,
    props: true
  },
  {
    path: '/createuser',
    name: 'CreateUser',
    component: CreateUser
  },
  {
    path: '/delUser/:userId',
    name: 'delUser',
    component: DelUser
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

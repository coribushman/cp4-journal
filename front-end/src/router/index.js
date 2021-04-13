import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateEntry from '../views/CreateEntry.vue'
import CreateTag from '../views/CreateTag.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create-entry',
    name: 'CreateEntry',
    component: CreateEntry
  },
  {
    path: '/create-tag',
    name: 'CreateTag',
    component: CreateTag
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

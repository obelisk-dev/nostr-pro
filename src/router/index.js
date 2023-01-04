import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView'
import ConvertView from '../components/ConvertView'
import ProfileView from '../components/ProfileView'
import RelayView from '../components/RelayView'
import ThreadView from '../components/ThreadView'

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/convert",
    name: "convert",
    component: ConvertView,
  },
  {
    path: "/profile/:pk",
    name: "profile",
    component: ProfileView,
    props: true
  },
  {
    path: "/relays",
    name: "RelayView",
    component: RelayView,
  },
  {
    path: "/thread/:id",
    name: "ThreadView",
    component: ThreadView,
    props: true
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
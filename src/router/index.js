import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView'
import ConvertView from '../components/ConvertView'
import ProfileView from '../components/ProfileView'

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
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
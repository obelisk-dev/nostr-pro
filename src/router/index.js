import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView'
import ConvertView from '../components/ConvertView'
import FeedView from '../components/FeedView'

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
    path: "/feed",
    name: "feed",
    component: FeedView,
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Offers from '../views/Offers.vue'
import Profile from '../views/Profile.vue'
import ListingsView from '../views/ListingsView.vue'
import ListingsDetailView from '../views/ListingDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/offers',
      name: 'offers',
      component: Offers,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/listings/:tipo',
      name: 'listings',
      component: ListingsView,
    },
    {
      path: '/listings/:id',
      component: ListingsDetailView,
    }
  ],
})

export default router

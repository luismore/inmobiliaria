import { createRouter, createWebHistory } from 'vue-router'
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import Home from '../views/Home.vue'
import Offers from '../views/Offers.vue'
import Profile from '../views/Profile.vue'
import ListingsView from '../views/ListingsView.vue'
import ListingsDetailView from '../views/ListingDetailView.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import CreateHouse from '../views/CreateHouse.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/offers',
      component: Offers,
    },
    {
      path: '/profile',
      component: Profile,
      meta: {requiresAuth: true},
    },
    {
      path: '/listings/tipo/:tipo',
      component: ListingsView,
    },
    {
      path: '/listings/id/:id',
      component: ListingsDetailView,
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/createHouse',
      component: CreateHouse,
      meta: {requiresAuth: true},

    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (to.meta.requiresAuth && !user) {
    next({ name: 'Login' });
  } else {
    next();
  }
});



export default router

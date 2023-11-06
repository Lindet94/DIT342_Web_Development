import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Cocktails from './views/Cocktail.vue'
import Bars from './views/Bar.vue'
import CreateCocktail from './views/CreateCocktail.vue'
import CreateIngredient from './views/CreateIngredient.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cocktails',
      name: 'cocktail',
      component: Cocktails
    },
    {
      path: '/bars',
      name: 'bar',
      component: Bars
    },
    {
      path: '/createCocktail',
      name: 'createCocktail',
      component: CreateCocktail
    },
    {
      path: '/createIngredient',
      name: 'createIngredient',
      component: CreateIngredient
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/')
  }
  next()
})

export default router

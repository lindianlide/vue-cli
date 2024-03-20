import { createRouter, createWebHistory } from 'vue-router'
import { storedRoute } from '@/utils/menu'

// const getToken = (to) => {
//   const token = localStorage.getItem("token")

//   if (!(token && token.split(".") && token.split(".").length > 2))
//     return {
//       name: "login",
//       query: { redirect: encodeURIComponent(to.fullPath) }
//     }
//   return null
// }
const router = createRouter({
  //history: createWebHistory(window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/layouts/BasicLayout.vue'),
      children: [
        {
          path: '/:pathMatch(.*)*',
          name: 'not-found',
          component: () => import('@/layouts/NotFoundLayout.vue')
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      redirect: '/user/login',
      hidden: true,
      children: [
        {
          path: '/user/login',
          name: 'login',
          component: () => import('@/views/user/UserLogin.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  if (to.name === 'login') return null

  //validate token todo ldl
  //getToken(to)
  //add routes
  if (to.path === '/' || router.getRoutes().some((route) => route.path === to.path)) return null
  const route = await storedRoute(to)

  if (!route) return null
  router.addRoute('index', route)
  return to.fullPath
})

export default router

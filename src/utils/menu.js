import orderBy from 'lodash/orderBy'
import { startsWithSlash } from '@/utils'

import { getMenus } from '@/api/user/login'

export const storedMenus = async () => {
  const menus = sessionStorage.getItem('menus')

  if (menus) return JSON.parse(menus)
  let { data } =
    (await getMenus({
      pageable: false,
      category: 'DESKTOP',
      sort: 'priority,asc'
    })) || []
  //过滤外包商
  data = data.filter((x) => x.outsource)
  const computedData = orderBy(
    data.filter((menu) => !menu.suspended),
    ['priority']
  ).map((menu) => ({ ...menu, zhCN: menu.name, enUS: menu.english }))
  sessionStorage.setItem('menus', JSON.stringify(computedData))
  return computedData
}

export const storedRoute = async (to) => {
  const menus = await storedMenus()
  if (!menus || !menus.length) return null

  const matchedMenu = menus.find((x) => x.route === to.path)

  if (!matchedMenu || matchedMenu.suspended || matchedMenu.route.trim() === '/') return null
  const route = menuToRoute(matchedMenu)
  if (!route) return null
  return route
}

const menuToRoute = (menuItem) => {
  const route = startsWithSlash(menuItem.route.trim())
  let component = menuItem.component ? startsWithSlash(menuItem.component.trim()) : route
  if (component.length < 2) return undefined
  //let componentName = "/pl/pages/project/print/definition"
  return {
    path: route,
    meta: {
      requiresAuth: true,
      title: { zhCN: menuItem.name, enUS: menuItem.english },
      icon: menuItem.icon,
      depth: menuItem.depth,
      id: menuItem.id,
      location: `@/views${component}.vue`
    },
    id: menuItem.id,
    parentId: menuItem.parentId,
    component: () => import('@/views' + component)
  }
}

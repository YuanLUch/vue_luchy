import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    // component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/users',
    component: () => import('@/views/user/userList.vue'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/sample',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'sample',
        component: () => import('@/views/sample/index'),
        meta: { title: '任务管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/task',
    name: 'test',
    meta: { title: '测试任务', icon: 'sys' },
    children: [
      {
        path: 'task',
        name: 'task',
        component: () => import('@/views/test/task'),
        meta: { title: '新建测试', icon: 'userManage' }
      },
      {
        path: 'result',
        name: 'result',
        // component: () => import('@/views/sqldraw/index'),
        meta: { title: 'sql画像', icon: 'roleManage' },
        component: () => import('@/views/sqldraw/index'),
        // redirect: '/draw',
        // children: [
        //   {
        //     path:'draw',
        //     name:'draw',
        //     component: () => import('@/views/sqldraw/index'),
        //     meta: { title: '图形展示', icon: 'roleManage'},
        //   },
        //   {
        //     path: 'table',
        //     name: 'table',
        //     component: () => import('@/views/sqltable/index'),
        //     meta: { title: '表格展示', icon:'roleManage'}
        //   }
        // ]
      },
      {
        path: 'match',
        name: 'patch',
        component: () => import('@/views/match/index'),
        meta: {title: '语法匹配', icon:'userManage'}
      }
      // {
      //   path: 'statistic',
      //   name: 'statistic',
      //   component: () => import('@/views/test/statistic'),
      //   meta: { title: '描述统计', icon: 'roleManage' }
      // }
      // {
      //   path: 'statistic',
      //   name: 'statistic',
      //   component: () => import('@/views/sqldraw/index'),
      //   meta: { title: '描述统计', icon: 'roleManage' }
      // }
    ]
  },
  // {
  //   path: '/log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'log',
  //       component: () => import('@/views/log/index'),
  //       meta: { title: '日志管理', icon: 'form' }
  //     }
  //   ]
  // },
  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/user',
    name: 'sysManage',
    meta: { title: '系统管理', icon: 'sys' },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/sys/user'),
        meta: { title: '用户管理', icon: 'userManage' }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/sys/role'),
        meta: { title: '权限管理', icon: 'roleManage' }
      },
      // {
      //   path: 'config',
      //   name: 'config',
      //   component: () => import('@/views/sys/config'),
      //   meta: { title: '相关配置', icon: 'sys' }
      // }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router


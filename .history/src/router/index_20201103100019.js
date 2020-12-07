import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    // 设置该路由进入的权限，支持多个权限叠加
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: (resolve) => require(['@/views/redirect'], resolve)
      }
    ]
  },
  {
    path: '/login',
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
	path: '/basics',
	component: Layout,
	  hidden: true,
	redirect: '/basics',
	children: [
	  {
		path: '/basics',
		component: (resolve) => require(['@/views/basics'], resolve),
		name: '基础设置',
		meta: { title: '基础设置', icon: 'dashboard', noCache: false, affix: false }
	  }
	]
  },{
	path: '/home',
	component: Layout,
	  hidden: true,
	redirect: '/home',
	children: [
	  {
		path: '/home',
		component: (resolve) => require(['@/views/home'], resolve),
		name: '首页配置',
		meta: { title: '首页配置', icon: 'dashboard', noCache: false, affix: false }
	  }
	]
  },
  {
	  path: '/signup',
	  component: Layout,
		hidden: true,
	  redirect: '/signup',
	  children: [
	    {
	      path: '/signup',
	      component: (resolve) => require(['@/views/signup'], resolve),
	      name: '报名管理',
	      meta: { title: '报名管理', icon: 'dashboard', noCache: false, affix: false }
	    }
	  ]
	},
	{
	  path: '/user',
	  component: Layout,
		hidden: true,
	  redirect: '/user',
	  children: [
	    {
	      path: '/user',
	      component: (resolve) => require(['@/views/user'], resolve),
	      name: '用户管理',
	      meta: { title: '用户管理', icon: 'dashboard', noCache: false, affix: false }
	    }
	  ]
	},
	{
	  path: '/pattern',
	  component: Layout,
		hidden: true,
	  redirect: '/pattern',
	  children: [
	    {
	      path: '/pattern',
	      component: (resolve) => require(['@/views/pattern'], resolve),
	      name: '模式管理',
	      meta: { title: '模式管理', icon: 'dashboard', noCache: false, affix: false }
	    }
	  ]
	},
	{
	  path: '/tasks',
	  component: Layout,
		hidden: true,
	  redirect: '/tasks',
	  children: [
	    {
	      path: '/tasks',
	      component: (resolve) => require(['@/views/tasks'], resolve),
	      name: '任务管理',
	      meta: { title: '任务管理', icon: 'dashboard', noCache: false, affix: false }
	    }
	  ]
	},
	{
	  path: '/salesPerformance',
	  component: Layout,
		hidden: true,
	  redirect: '/salesPerformance',
	  children: [
	    {
	      path: '/salesPerformance',
	      component: (resolve) => require(['@/views/salesPerformance'], resolve),
	      name: '业绩管理',
	      meta: { title: '业绩管理', icon: 'dashboard', noCache: false, affix: false }
	    }
	  ]
	},
	{
	  path: '/remuneration',
	  component: Layout,
		hidden: true,
	  redirect: '/remuneration',
	  children: [
	    {
	      path: '/remuneration',
	      component: (resolve) => require(['@/views/remuneration'], resolve),
	      name: '薪酬管理',
	      meta: { title: '薪酬管理', icon: 'dashboard', noCache: false, affix: false }
	    }
	  ]
	},
	{
	  path: '/message',
	  component: Layout,
		hidden: true,
	  redirect: '/message',
	  children: [
	    {
	      path: '/message',
	      component: (resolve) => require(['@/views/message'], resolve),
	      name: '消息推送',
	      meta: { title: '消息推送', icon: 'dashboard', noCache: false, affix: false }
	    }
	  ]
	},
  {
    path: '/users',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: (resolve) => require(['@/views/system/user/profile/index'], resolve),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },















	// {
	//   path: '/permission',
	//   component: (resolve) => require(['@/views/permission'], resolve),
	//   hidden: true
	// },
	{
	  path: '/permission',
	  component: Layout,
		hidden: true,
	  redirect: '/permission',
	  children: [
	    {
	      path: '/permission',
	      component: (resolve) => require(['@/views/permission'], resolve),
	      name: '权限管理',
	      meta: { title: '权限管理', icon: 'dashboard', noCache: false, affix: false }
	    }
	  ]
	},
  {
    path: '/404',
    component: (resolve) => require(['@/views/error/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/error/401'], resolve),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: (resolve) => require(['@/views/index'], resolve),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: (resolve) => require(['@/views/system/user/profile/index'], resolve),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  {
    path: '/dict',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'type/data/:dictId(\\d+)',
        component: (resolve) => require(['@/views/system/dict/data'], resolve),
        name: 'Data',
        meta: { title: '字典数据', icon: '' }
      }
    ]
  },
  {
    path: '/job',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'log',
        component: (resolve) => require(['@/views/monitor/job/log'], resolve),
        name: 'JobLog',
        meta: { title: '调度日志' }
      }
    ]
  },
  {
    path: '/gen',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'edit',
        component: (resolve) => require(['@/views/tool/gen/editTable'], resolve),
        name: 'GenEdit',
        meta: { title: '修改生成配置' }
      }
    ]
  }
]

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
})

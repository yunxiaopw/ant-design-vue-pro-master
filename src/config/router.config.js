// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
          },
          // 外部链接
          // {
          //   path: 'https://www.baidu.com/',
          //   name: 'Monitor',
          //   meta: { title: 'menu.dashboard.monitor', target: '_blank' }
          // },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      // 人员管理
      {
        path: '/user-manage',
        name: 'UserManage',
        component: () => import('@/views/userManage/index.vue'),
        meta: { title: '人员管理', icon: 'table' }
      },
      // 人脸库
      {
        path: '/face-library',
        name: 'FaceLibrary',
        component: () => import('@/views/faceLibrary/index.vue'),
        meta: { title: '人脸库', icon: 'table' }
      },
      // 告警
      {
        path: '/alarm',
        name: 'Alarm',
        component: () => import('@/views/alarm/alarmTable.vue'),
        meta: { title: 'menu.alarm', icon: 'table' }
      },
      // 通道管理
      {
        path: '/channel-manage',
        name: 'ChannelManage',
        component: () => import('@/views/channelManage/index.vue'),
        meta: { title: 'menu.channelManage', icon: 'table' }
      },
      // 算法部署
      {
        path: '/algo-config',
        name: 'AlgoManage',
        component: () => import('@/views/algorithmConfig/index.vue'),
        meta: { title: '算法部署', icon: 'table' }
      },
      // 系统管理
      {
        path: '/system-manage',
        name: 'systemManage',
        component: RouteView,
        redirect: '/system-manage/sound-manage',
        meta: { title: '系统管理', icon: 'table' },
        children: [
          {
            path: '/system-manage/sound-manage',
            name: 'SoundManage',
            hideChildrenInMenu: true,
            component: () => import('@/views/systemManage/soundManage/index.vue'),
            meta: { title: '语音播报', keepAlive: true }
          },
          {
            path: '/system-manage/message-push',
            name: 'MessagePush',
            hideChildrenInMenu: true,
            component: () => import('@/views/systemManage/messagePush/index.vue'),
            meta: { title: '消息推送', keepAlive: true }
          },
          {
            path: '/system-manage/system-monitor',
            name: 'SystemMonitor',
            hideChildrenInMenu: true,
            component: () => import('@/views/systemManage/systemMonitor/index.vue'),
            meta: { title: '系统监控', keepAlive: true }
          },
          {
            path: '/system-manage/management-authority',
            name: 'ManagementAuthority',
            hideChildrenInMenu: true,
            component: () => import('@/views/systemManage/managementAuthority/index.vue'),
            meta: { title: '权限管理', keepAlive: true }
          },
          // 网络设置
          {
            path: '/system-manage/network-setting',
            name: 'NetworkSetting',
            hideChildrenInMenu: true,
            component: () => import('@/views/systemManage/networkSetting/index.vue'),
            meta: { title: '网络设置', keepAlive: true }
          },
          // 平台设置
          {
            path: '/system-manage/platform-setting',
            name: 'PlatformSetting',
            hideChildrenInMenu: true,
            component: () => import('@/views/systemManage/platformSetting/index.vue'),
            meta: { title: '平台设置', keepAlive: true }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        hidden: true,
        meta: { title: 'menu.account', icon: 'user', hideHeader: true, keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: 'menu.account.settings', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/basic',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/basic',
                name: 'BasicSettings',
                hidden: true,
                component: () => import('@/views/account/settings/BasicSetting'),
                meta: { title: 'account.settings.menuMap.basic', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: {
                  title: 'account.settings.menuMap.security',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                hidden: true,
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: 'account.settings.menuMap.custom', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: 'account.settings.menuMap.binding', hidden: true, keepAlive: true, permission: ['user'] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: {
                  title: 'account.settings.menuMap.notification',
                  hidden: true,
                  keepAlive: true,
                  permission: ['user']
                }
              }
            ]
          }
        ]
      }

      // other
      /*
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: { title: '业务布局', icon: 'layout', permission: [ 'support' ] },
            redirect: '/other/list/tree-list',
            children: [
              {
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: { title: '树目录表格', keepAlive: true }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: { title: '内联编辑表格', keepAlive: true }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: { title: '用户列表', keepAlive: true }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: { title: '角色列表', keepAlive: true }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: { title: '角色列表2', keepAlive: true }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: { title: '权限列表', keepAlive: true }
              }
            ]
          }
        ]
      }
      */
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]

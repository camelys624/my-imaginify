export const menuList = [
  {
    path: '/',
    name: 'dashboard',
    label: 'Dashboard',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    label: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/restore',
    name: 'restore',
    label: '修复',
    component: () => import('../views/RestoreView.vue')
  },
  {
    path: '/removeObj',
    name: 'removeObj',
    label: '物体擦除',
    component: () => import('../views/RemoveObjView.vue')
  },
  {
    path: '/removeBg',
    name: 'removeBg',
    label: '去除背景',
    component: () => import('../views/RemoveBgView.vue')
  }
]

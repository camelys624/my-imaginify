import IconHome from '@/components/icons/IconHome.vue'
import IconRestore from '@/components/icons/IconRestore.vue'
import IconObjRemove from '@/components/icons/IconObjRemove.vue'
import IconBgRemove from '@/components/icons/IconBgRemove.vue'
import IconImg2Text from '@/components/icons/IconImg2Text.vue'

export const menuList = [
  {
    path: '/',
    name: 'home',
    label: 'Home',
    component: () => import('../views/HomeView.vue'),
    icon: IconHome
  },
  {
    path: '/restore',
    name: 'restore',
    label: '修复',
    component: () => import('../views/RestoreView.vue'),
    icon: IconRestore
  },
  {
    path: '/removeObj',
    name: 'removeObj',
    label: '物体擦除',
    component: () => import('../views/RemoveObjView.vue'),
    icon: IconObjRemove
  },
  {
    path: '/removeBg',
    name: 'removeBg',
    label: '去除背景',
    component: () => import('../views/RemoveBgView.vue'),
    icon: IconBgRemove
  },
  {
    path: '/img2text',
    name: 'img2text',
    label: '文字识别',
    component: () => import('../views/Image2Text.vue'),
    icon: IconImg2Text
  }
]

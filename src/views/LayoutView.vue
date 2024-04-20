<template>
  <div class="common-layout">
    <el-container style="height: 100vh">
      <el-header class="imaginify-aside">
        <IconLogo style="width: auto" />
        <ul class="imaginify-menu">
          <li
            v-for="(menu, index) in sampleMenuList"
            :key="index"
            :class="checkRoute(menu.name) && 'select'"
            style="padding: 3px 0"
          >
            <router-link :to="menu.path" class="route-link">
              <component :is="menu.icon" :color="checkRoute(menu.name) && 'white'" />
              {{ menu.label }}
            </router-link>
          </li>
        </ul>
        <div class="user-wrapper">
          <el-popover
            :width="300"
            trigger="click"
            popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px;width: unset; padding: 0"
          >
            <template #reference>
              <div class="imaginify-avatar">
                <div class="avatar-img">
                  <img v-if="userInfo.avatar" src="" alt="avatar" />
                  <el-avatar v-else :size="46" :src="circleUrl" />
                </div>
              </div>
            </template>
            <template #default>
              <div class="action-item" @click="handleLogout">
                <div class="image-wrapper">
                  <img :src="Logout" alt="logout" />
                </div>
                <span>登出</span>
              </div>
            </template>
          </el-popover>
        </div>
      </el-header>
      <el-main class="imaginify-main">
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { menuList } from '@/router/menu.js'
import { RouterView, useRoute, RouterLink } from 'vue-router'
import { computed } from 'vue'
import IconLogo from '@/components/icons/IconLogo.vue'
import Logout from '@/assets/icons/logout.svg'

import { useCounterStore } from '@/stores/auth.js'

const authStore = useCounterStore()
const userInfo = authStore.user

const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const sampleMenuList = computed(() =>
  menuList.map(({ label, name, path, icon }) => ({ label, name, path, icon }))
)

const currentRouteInfo = useRoute()
const checkRoute = (routeName) => {
  const name = currentRouteInfo.name

  return routeName === name
}

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.open('/login', '_self')
}
</script>

<style scoped>
.imaginify-aside,
.imaginify-main {
  width: 100vw;
}

.imaginify-aside {
  padding: 10px;
}

.imaginify-main {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
  background-position: top;
  padding: 0;
}

.imaginify-aside {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.imaginify-main {
  background-color: var(--vt-c-white-soft);
}

.imaginify-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  /* flex: 1; */
  display: flex;
  gap: 10px;
}

.imaginify-menu .route-link {
  display: flex;
  gap: 10px;
  height: 50px;
  padding: 0 20px;
  border-radius: 10px;
  line-height: 50px;
  text-decoration: none;
  color: var(--color-text);
  align-items: center;
  width: 130px;
}

.imaginify-menu .select .route-link {
  background: var(--system-bg) !important;
  color: white;
}

.imaginify-menu .route-link:hover {
  background: var(--hover-bg);
}

.user-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
}

.imaginify-avatar {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: var(--system-bg);
  cursor: pointer;
}

.imaginify-avatar .avatar-img {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-img .avatar-img__holder {
  width: 100%;
  height: 100%;
  line-height: 46px;
  text-align: center;
  font-size: 25px;
  color: white;
  background-color: gray;
}

.action-item {
  display: flex;
  margin: 5px;
  padding: 5px 10px;
  gap: 20px;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
}

.action-item:hover {
  background: var(--hover-bg);
}

.action-item .image-wrapper {
  height: 30px;
  width: 30px;
}
</style>

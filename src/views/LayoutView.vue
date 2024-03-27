<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="260px" class="imaginify-aside">
        <IconLogo />
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
          <div class="imaginify-avatar">
            <div class="avatar-img">
              <img v-if="userInfo.avatar" src="" alt="avatar" />
              <div v-else class="avatar-img__holder">杨</div>
            </div>
          </div>
          <img
            :src="isLogin ? IconLogout : IconLogin"
            :alt="isLogin ? 'logout' : 'login'"
            style="width: 30px"
          />
        </div>
      </el-aside>
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
import IconLogin from '@/assets/icons/login.svg'
import IconLogout from '@/assets/icons/logout.svg'

import { useCounterStore } from '@/stores/auth.js'

const authStore = useCounterStore()
const userInfo = authStore.user

const sampleMenuList = computed(() =>
  menuList.map(({ label, name, path, icon }) => ({ label, name, path, icon }))
)

const isLogin = computed(() => !!userInfo.value)

const currentRouteInfo = useRoute()
const checkRoute = (routeName) => {
  const name = currentRouteInfo.name

  return routeName === name
}
</script>

<style scoped>
.imaginify-aside,
.imaginify-main {
  height: 100vh;
  overflow-y: auto;
  padding: 10px;
}

.imaginify-aside {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.imaginify-main {
  background-color: var(--vt-c-white-soft);
}

.imaginify-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  width: 100%;
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
}

.imaginify-menu .select .route-link {
  background: var(--system-bg) !important;
  color: white;
}

.imaginify-menu .route-link:hover {
  background: linear-gradient(-45deg, #e65d4e6b, #e120d756);
}

.user-wrapper {
  height: 120px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
}

.imaginify-avatar {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: var(--system-bg);
}

.imaginify-avatar .avatar-img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-img .avatar-img__holder {
  width: 100%;
  height: 100%;
  line-height: 56px;
  text-align: center;
  font-size: 30px;
  color: white;
  background-color: gray;
}
</style>

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
          >
            <router-link :to="menu.path" class="route-link">{{ menu.label }}</router-link>
          </li>
        </ul>
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

const sampleMenuList = computed(() =>
  menuList.map(({ label, name, path }) => ({ label, name, path }))
)

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
}

.imaginify-menu .select .route-link {
  background: var(--system-bg) !important;
  color: white;
}

.imaginify-menu .route-link:hover {
  background: linear-gradient(-45deg, #e65d4e6b, #e120d756);
}
</style>

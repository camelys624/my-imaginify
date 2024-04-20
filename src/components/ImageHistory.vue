<template>
  <el-popover
    :width="450"
    popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;max-height: 700px;"
  >
    <template #reference>
      <div class="history-wrapper">
        <IconHistory />
      </div>
    </template>
    <template #default>
      <ul class="history-list">
        <li v-for="(item, index) in historyList" :key="index">
          <div style="display: flex; align-items: center">
            <img :src="FORMET_URL + item.imageName" style="width: 30px; height: 30px" />
            {{ item.imageName }}
          </div>
          <el-button size="small" @click="handleEdit(item.imageName)">编辑</el-button>
        </li>
      </ul>
    </template>
  </el-popover>
</template>

<script setup>
import IconHistory from './icons/IconHistory.vue'
import { getHistory } from '@/api'
import { ref } from 'vue'
const emit = defineEmits(['updateEditImage'])

const FORMET_URL = 'http://sb9lsai7u.hn-bkt.clouddn.com/'

const props = defineProps({
  function: {
    type: String,
    default: '1'
  }
})

const historyList = ref([])

getHistory(props.function).then((res) => {
  if (res.code) {
    historyList.value = res.data
  }
})

const handleEdit = (item) => {
  emit('updateEditImage', item)
}
</script>

<style scoped>
.history-wrapper {
  position: absolute;
  left: 100px;
  top: 100px;
  cursor: pointer;
}

.history-list {
  list-style: none;
  padding: 0;
}

.history-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid var(--color-border);
}
</style>

<template>
  <div class="icon-wrapper">
    <img :src="icon" style="width: 35px" alt="icon" />
    <span>VisioNex AI</span>
  </div>
</template>

<script setup>
import icon from '@/assets/magic.svg'
</script>

<style scoped>
.icon-wrapper {
  width: 100%;
  height: 40px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 20px;
}

.icon-wrapper span {
  font-size: 30px;
  font-family: cursive, sans-serif;
  font-weight: bold;
  color: transparent;
  background: linear-gradient(-45deg, #e65d4e, #e120d7);
  background-clip: text;
}
</style>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goto = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="page-container">
    <section class="hero">
      <div class="section-wrapper">
        <div class="text-area">
          <h1>
            使用我们的<span style="background-color: white; border-radius: 6px; margin: 0 3px"
              ><span
                style="
                  background: var(--system-bg);
                  background-clip: text;
                  color: transparent;
                  font-weight: bold;
                "
              >
                AI 照片编辑器
              </span></span
            >使复杂的编辑变得简单
          </h1>
          <div style="margin-bottom: 40px">
            <p>
              控制图像的外观和感觉。
              <br />
              删除干扰因素或添加一些内容。
              <br />
              编辑整个图像或仅其中的一部分。
              <br />
              无论是社交媒体图像还是家庭相册，都可以使用 Imaginify 的 AI 照片编辑器立即进行编辑。
            </p>
            <el-button
              type="primary"
              style="background: var(--system-bg); border: none"
              @click="goto('/restore')"
              >立即开始</el-button
            >
          </div>
        </div>
        <div class="image-placeholder"></div>
      </div>
    </section>
    <div class="home-page-wrapper">
      <div style="display: flex; align-items: center; flex-direction: column">
        <h1 class="banner">我们可以做什么</h1>
        <h3 style="font-size: 30px">现已支持以下功能</h3>
      </div>
      <section class="page-section section-1">
        <div class="image-placeholder"></div>
        <div class="text-area">
          <h1>修复老旧照片</h1>
          <div>
            <p>
              想要修复老旧的照片，或者提高图片的清晰度，但是不会使用复杂的编辑软件？ 使用 Imagenify
              的 ai 修复功能，只需要上传您想要修复的图片，等待几秒，高清图片就能呈现在您面前。
            </p>
            <el-button
              type="primary"
              style="background: var(--system-bg); border: none"
              @click="goto('/restore')"
              >立即开始</el-button
            >
          </div>
        </div>
      </section>
      <section class="page-section section-2">
        <div class="text-area">
          <h1>移除任何东西</h1>
          <div>
            <p>
              拒绝使用钢笔工具频繁勾画路径，不用再创建蒙版图层。使用 Imaginify 的 ai
              移除物体功能，涂抹您想要删除的任何东西，无论是流浪猫、随机的路标，还是错误时间、错误地点的陌生人，
              我们的人工智能图片编辑器都可以轻松删除照片中不需要的部分，并保持其余部分完好无损。
            </p>
            <el-button
              type="primary"
              style="background: var(--system-bg); border: none"
              @click="goto('/removeObj')"
              >立即开始</el-button
            >
          </div>
        </div>
        <div class="image-placeholder"></div>
      </section>
      <section class="page-section section-1">
        <div class="image-placeholder"></div>
        <div class="text-area">
          <h1>删除背景</h1>
          <div>
            <p>
              如果您需要删除整个背景怎么办？不用担心。曾经棘手的背景去除过程现在通过我们强大的背景去除器或透明图像背景工具变得更加简单
              - 只需单击一下，任何产品或徽标都可以脱颖而出并闪闪发光。
            </p>
            <el-button
              type="primary"
              style="background: var(--system-bg); border: none"
              @click="goto('/removeBg')"
              >立即开始</el-button
            >
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  width: 100%;
  background: white;
  display: block;
  overflow: auto;
}

.home-page-wrapper {
  max-width: 1200px;
  margin: 80px auto;
  display: flex;
  gap: 120px;
  flex-direction: column;
}

.hero {
  height: 800px;
  width: 100%;
  background-image: url('../../public/hero-bg.png'),
    linear-gradient(
      to bottom,
      rgb(103 128 234 / 80%),
      rgb(242 26 6 / 71%) 25%,
      rgb(176 47 173 / 77%) 75%,
      rgb(9 173 244 / 82%)
    );
  background-size: cover;
  overflow: hidden;
}

.section-wrapper {
  display: flex;
  gap: 10px;
  backdrop-filter: blur(15px);
  height: 100%;
  padding: 160px calc((100% - 1200px) / 2);
}

.text-area {
  width: 50%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.image-placeholder {
  flex: 1;
  border-radius: 20px;
  background-color: gainsboro;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 32px;
  color: white;
  font-weight: bold;
}

p {
  font-size: 16px;
  color: white;
  margin-bottom: 30px;
  line-height: 40px;
}

.banner {
  font-size: 60px;
  color: transparent;
  background: var(--system-bg);
  background-clip: text;
  letter-spacing: 7px;
}

.page-section {
  height: 300px;
  display: flex;
  gap: 30px;
}

.page-section :is(h1, p) {
  color: var(--color-text);
  line-height: 30px;
}

.page-section .text-area {
  justify-content: start;
  gap: 60px;
}
</style>

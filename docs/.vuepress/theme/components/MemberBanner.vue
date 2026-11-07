<script setup lang="ts">
/**
 * Banner + 成员列表区块
 *
 * 结构完全复用主题内置的 `VPHomeBanner`（背景大图 / 遮罩蒙版 / hero 文案），
 * 并在其上叠加一层成员列表浮层，实现「成员列表绘制在 banner 区域上」的效果。
 *
 * 与 `VPHomeBanner` 的差异：
 * 1. 容器改为纵向 flex，hero 占据上半部分，成员列表浮于下半部分；
 * 2. 成员卡片使用毛玻璃（半透明 + 模糊）效果，使其能与背景大图自然融合；
 * 3. 成员列表内部横向排列，一行最多 4 个，超出自动换行。
 *
 * 数据来源：`docs/member.json`
 */
import { computed } from 'vue'
import { withBase } from 'vuepress/client'
import { isLinkHttp } from 'vuepress/shared'
// 注意：必须使用主题的 useData（vuepress-theme-plume/composables），
// 它在 VuePress 原生 useData 基础上额外提供 isDark（深色模式状态）。
// 从 'vuepress/client' 导入的 useData 没有 isDark，访问 isDark.value 会报错。
import { useData } from 'vuepress-theme-plume/composables'
// 必须使用主题的 VPButton 组件：其样式是 scoped 的，
// 手写 <a class="vp-button brand"> 无法命中 [data-v-xxx] 选择器，会丢失品牌背景色。
import VPButton from 'vuepress-theme-plume/components/VPButton.vue'
import MemberList from './MemberList.vue'

const props = defineProps<{
  banner?: string
  bannerMask?: number | { light?: number, dark?: number }
  hero?: {
    name?: string
    tagline?: string
    text?: string
    actions?: { theme?: 'brand' | 'alt', text: string, link?: string }[]
  }
}>()

const DEFAULT_BANNER = 'https://api.pengzhanbo.cn/wallpaper/bing'

const { isDark } = useData<'home'>()

/** 遮罩蒙版不透明度 */
const mask = computed(() => {
  const value = props.bannerMask
  if (typeof value !== 'object' || value === null)
    return value || 0

  return (isDark.value ? value.dark : value.light) || 0
})

/** 背景大图 */
const bannerStyle = computed(() => {
  const value = props.banner
  const link = value ? (isLinkHttp(value) ? value : withBase(value)) : DEFAULT_BANNER
  return { 'background-image': `url(${link})` }
})

const name = computed(() => props.hero?.name ?? 'Plume')
const tagline = computed(() => props.hero?.tagline ?? 'A VuePress Theme')
const text = computed(() => props.hero?.text)
const actions = computed(() => props.hero?.actions ?? [])
</script>

<template>
  <div class="vp-home-banner member-banner" :style="bannerStyle">
    <div class="banner-mask" :style="{ opacity: mask }" />

    <div class="container">
      <div class="content">
        <h2 v-if="name" class="hero-name">
          {{ name }}
        </h2>
        <p v-if="tagline" class="hero-tagline">
          <span class="line" /> <span>{{ tagline }}</span>
        </p>
        <p v-if="text" class="hero-text">
          {{ text }}
        </p>

        <div v-if="actions.length" class="actions">
          <div v-for="action in actions" :key="action.link" class="action">
            <VPButton
              tag="a"
              size="medium"
              :theme="action.theme"
              :text="action.text"
              :href="action.link"
            />
          </div>
        </div>
      </div>

      <!-- 成员列表浮层：绘制在 banner 区域之上 -->
      <div class="member-overlay">
        <MemberList />
      </div>
    </div>
  </div>
</template>

<style scoped>
.vp-home-banner {
  position: relative;
  width: 100%;
  min-height: calc(100vh - var(--vp-nav-height));
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: background-color var(--vp-t-color);
}

.vp-home-banner .banner-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0);
  transition: opacity var(--vp-t-color);
}

.vp-home-banner .container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 1152px;
  min-height: calc(100vh - var(--vp-nav-height));
  padding: 4rem 2rem 3rem;
  margin: 0 auto;
}

.vp-home-banner .content {
  width: 100%;
}

.vp-home-banner .content .hero-name {
  font-size: 72px;
  font-weight: 600;
  line-height: 1;
  color: var(--vp-c-text-hero-name);
}

.vp-home-banner .content .hero-tagline {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.25;
  color: var(--vp-c-text-hero-tagline);
}

.vp-home-banner .content .hero-tagline .line {
  display: inline-block;
  width: 80px;
  height: 0;
  margin-right: 1rem;
  border-top: solid 1px var(--vp-c-text-hero-tagline);
}

.vp-home-banner .content .hero-text {
  width: 100%;
  max-width: 700px;
  margin-top: 1.5rem;
  font-size: 16px;
  font-weight: 500;
  color: var(--vp-c-text-hero-text);
  border-radius: 5px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 24px;
  margin: -6px;
}

.action {
  flex-shrink: 0;
  min-width: 0;
  padding: 6px;
}

/* 成员列表浮层：覆盖在 banner 大图之上 */
.member-overlay {
  width: 100%;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgb(255 255 245 / 0.18);
}

@media (min-width: 960px) {
  .vp-home-banner .container {
    padding: 6rem 3rem 3.5rem;
  }

  .vp-home-banner .content .hero-name {
    font-size: 100px;
  }
}

@media (min-width: 1440px) {
  .vp-home-banner .content .hero-tagline {
    font-size: 32px;
  }
}
</style>

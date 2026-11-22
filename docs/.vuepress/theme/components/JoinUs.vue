<script setup lang="ts">
/**
 * 首页「招贤纳士 / JOIN US」区块
 *
 * 位于「查看作品」区块下方。排版与其他首页区块一致（左对齐标题 + 横线），
 * 整块可点击，跳转到加入我们页面。
 */
import { RouteLink } from 'vuepress/client'

// 首页区块由 VPHome 统一下发这些属性，声明后避免它们落到根元素上
defineProps<{
  full?: boolean
  index?: number
  onlyOnce?: boolean
}>()
</script>

<template>
  <section id="join-us" class="join-us">
    <div class="container">
      <div class="heading">
        <p class="eyebrow">
          JOIN US
        </p>
        <h2 class="title">
          招贤纳士
        </h2>
        <span class="rule" aria-hidden="true" />
      </div>

      <!-- 整块可点击：跳到加入我们页面（docs/blog/joinus.md，permalink: /blog/n4yb11ch/） -->
      <RouteLink class="join-card" to="/blog/n4yb11ch/">
        <span class="join-card-text">
          期待与你一同创造更多作品
        </span>
        <span class="hint">
          点击此处了解详情 →
        </span>
      </RouteLink>
    </div>
  </section>
</template>

<style scoped>
.join-us {
  width: 100%;
  scroll-margin-top: var(--vp-nav-height);
}

.container {
  width: 100%;
  max-width: 1152px;
  padding: 0 2rem 4.5rem;
  margin: 0 auto;
}

.eyebrow {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--vp-c-brand-1);
}

.title {
  margin: 0.75rem 0 0;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--vp-c-text-1);
}

.rule {
  display: block;
  width: 56px;
  height: 3px;
  margin-top: 1.25rem;
  border-radius: 2px;
  background-color: var(--vp-c-brand-1);
}

.join-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 40px;
  padding: 2rem 2.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  color: inherit;
  text-decoration: none;
  transition:
    border-color var(--vp-t-color),
    transform var(--vp-t-color);
}

.join-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.join-card-text {
  font-size: 17px;
  color: var(--vp-c-text-1);
}

.hint {
  font-size: 13px;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}

@media (max-width: 719px) {
  .container {
    padding: 0 1.5rem 3.5rem;
  }

  .title {
    font-size: 32px;
  }

  .join-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem 1.25rem;
  }
}
</style>

<script setup lang="ts">
/**
 * 首页「查看作品 / OURS ARTWORK」区块
 *
 * 位于「了解我们」区块下方。当前展示第一个作品《十年》的制作进度。
 */
import { RouteLink } from 'vuepress/client'

// 首页区块由 VPHome 统一下发这些属性，声明后避免它们落到根元素上
defineProps<{
  full?: boolean
  index?: number
  onlyOnce?: boolean
}>()

/** 制作流程节点，active 为当前所处阶段 */
const steps = [
  { label: '立项', active: true },
  { label: '规划', active: false },
  { label: '制作', active: false },
  { label: '完成', active: false },
  { label: '发布', active: false },
]
</script>

<template>
  <section id="our-artwork" class="artwork">
    <div class="container">
      <div class="heading">
        <p class="eyebrow">
          OURS ARTWORK
        </p>
        <h2 class="title">
          查看作品
        </h2>
        <span class="rule" aria-hidden="true" />
      </div>

      <!-- 整张卡片可点击：跳到 docs/blog/catalog-1/article-1.md（permalink: /blog/q1vz53kt/） -->
      <RouteLink class="work-card" to="/blog/q1vz53kt/">
        <span class="status">
          <span class="status-dot" aria-hidden="true" />
          制作中 MAKING
        </span>

        <h3 class="work-title">
          《十年》
        </h3>
        <p class="work-subtitle">
          同人动画·同人OP
        </p>

        <ol class="progress" aria-label="制作进度">
          <li
            v-for="step in steps"
            :key="step.label"
            class="step"
            :class="{ active: step.active }"
            :aria-current="step.active ? 'step' : undefined"
          >
            <span class="step-dot" aria-hidden="true" />
            <span class="step-label">{{ step.label }}</span>
          </li>
        </ol>
      </RouteLink>
    </div>
  </section>
</template>

<style scoped>
.artwork {
  width: 100%;
  /* 锚点定位时避开固定导航栏 */
  scroll-margin-top: var(--vp-nav-height);
}

.container {
  width: 100%;
  max-width: 1152px;
  padding: 4.5rem 2rem;
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

.work-card {
  display: block;
  margin-top: 2rem;
  padding: 2rem 2.5rem 2.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  color: inherit;
  text-decoration: none;
  transition:
    border-color var(--vp-t-color),
    transform var(--vp-t-color);
}

.work-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor;
}

.work-title {
  margin: 1.25rem 0 0;
  font-size: 36px;
  font-weight: 700;
  line-height: 1.25;
  color: var(--vp-c-text-1);
}

.work-subtitle {
  margin: 0.5rem 0 0;
  font-size: 15px;
  color: var(--vp-c-text-2);
}

/* 横向进度轴：五个等宽节点，连线从首尾节点中心延伸 */
.progress {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: 3rem 0 0;
  padding: 0;
  list-style: none;
}

.progress::before {
  content: '';
  position: absolute;
  top: 6px;
  right: 10%;
  left: 10%;
  height: 2px;
  background-color: var(--vp-c-divider);
}

.step {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.step-dot {
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 50%;
  background-color: var(--vp-c-bg-soft);
}

.step.active .step-dot {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 4px var(--vp-c-brand-soft);
}

.step-label {
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.step.active .step-label {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

@media (max-width: 719px) {
  .container {
    padding: 3.5rem 1.5rem;
  }

  .title {
    font-size: 32px;
  }

  .work-card {
    padding: 1.5rem 1.25rem 2rem;
  }

  .work-title {
    font-size: 28px;
  }

  .step-label {
    font-size: 12px;
  }
}
</style>

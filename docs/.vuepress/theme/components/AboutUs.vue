<script setup lang="ts">
/**
 * 首页「了解我们 / ABOUT US」区块
 *
 * 在首页 MemberBanner 下方展示社团简介。
 * 正文直接读取 `.vuepress/aboutus.txt`，避免文案在多处维护。
 */
import { computed } from 'vue'
import aboutText from '../../aboutus.txt?raw'

// 首页区块由 VPHome 统一下发这些属性，声明后避免它们落到根元素上
defineProps<{
  full?: boolean
  index?: number
  onlyOnce?: boolean
}>()

/** txt 中的换行只是排版换行，展示时合并为一段完整文字 */
const description = computed(() => aboutText.replace(/\s*\n\s*/g, '').trim())
</script>

<template>
  <section class="about-us">
    <div class="about-heading">
      <p class="eyebrow">
        ABOUT US
      </p>
      <h2 class="title">
        了解我们
      </h2>
      <span class="rule" aria-hidden="true" />
    </div>

    <div class="about-body">
      <p class="description">
        {{ description }}
      </p>

      <div class="facts">
        <div class="fact">
          <span class="fact-label">
            创立时间
          </span>
          <span class="fact-value">
            2026 年 7 月
          </span>
        </div>
        <div class="fact">
          <span class="fact-label">
            社团性质
          </span>
          <span class="fact-value">
            非盈利 · 同人动画
          </span>
        </div>
        <div class="fact">
          <span class="fact-label">
            团队成员
          </span>
          <span class="fact-value">
            来自全国的在校中小学生
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-us {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
  gap: 3rem;
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

.description {
  margin: 0;
  font-size: 17px;
  line-height: 1.9;
  color: var(--vp-c-text-1);
}

.facts {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem 2.5rem;
  margin-top: 2rem;
  padding-top: 1.75rem;
  border-top: 1px solid var(--vp-c-divider);
}

.fact {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.fact-label {
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-3);
}

.fact-value {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

@media (max-width: 719px) {
  .about-us {
    grid-template-columns: 1fr;
    gap: 1.75rem;
    padding: 3.5rem 1.5rem;
  }

  .title {
    font-size: 32px;
  }

  .description {
    font-size: 16px;
  }
}
</style>

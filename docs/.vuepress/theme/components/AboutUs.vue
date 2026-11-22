<script setup lang="ts">
/**
 * 首页「了解我们 / ABOUT US」区块
 *
 * 在首页 MemberBanner 下方展示社团简介与竖向发展历程。
 * 简介正文直接读取 `.vuepress/aboutus.txt`，避免文案在多处维护。
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

/** 社团发展历程，按时间先后顺序展示 */
const timeline = [
  { date: '2026 年 7 月', subject: '青瑶', event: '以「动画创作组」建立本社团' },
  { date: '2026 年 8 月', subject: '副社长 嘉靖Block', event: '加入本社' },
  { date: '2026 年 9 月末', subject: '', event: '本社正式更名为「嘉靖动画公社」' },
  { date: '2026 年 11 月', subject: '', event: '本网站上线' },
]
</script>

<template>
  <section id="about-us" class="about-us">
    <div class="about-intro">
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
    </div>

    <div class="timeline">
      <h3 class="timeline-title">
        发展历程
        <span class="timeline-title-en">
          OUR JOURNEY
        </span>
      </h3>

      <ol class="timeline-list">
        <li v-for="item in timeline" :key="item.date" class="timeline-item">
          <span class="timeline-date">
            {{ item.date }}
          </span>
          <span class="timeline-dot" aria-hidden="true" />
          <p class="timeline-event">
            <strong v-if="item.subject" class="timeline-subject">
              {{ item.subject }}
            </strong>
            <span>{{ item.event }}</span>
          </p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.about-us {
  width: 100%;
  max-width: 1152px;
  padding: 4.5rem 2rem;
  margin: 0 auto;
}

.about-intro {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
  gap: 3rem;
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

/* 发展历程：竖向时间轴 */
.timeline {
  margin-top: 4rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.timeline-title {
  margin: 0 0 2rem;
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.timeline-title-en {
  margin-left: 12px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-3);
}

.timeline-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.timeline-item {
  display: grid;
  grid-template-columns: 130px 20px minmax(0, 1fr);
  gap: 0 16px;
  align-items: start;
  padding-bottom: 1.75rem;
}

/* 竖线占满每一项的高度，相邻项首尾相接形成连续时间轴 */
.timeline-item::before {
  content: '';
  grid-column: 2;
  grid-row: 1;
  justify-self: center;
  width: 2px;
  height: 100%;
  background-color: var(--vp-c-divider);
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-item:last-child::before {
  height: 12px;
}

.timeline-date {
  grid-column: 1;
  grid-row: 1;
  padding-top: 1px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.7;
  text-align: right;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.timeline-dot {
  position: relative;
  z-index: 1;
  grid-column: 2;
  grid-row: 1;
  justify-self: center;
  width: 10px;
  height: 10px;
  margin-top: 8px;
  border-radius: 50%;
  background-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 4px var(--vp-c-bg);
}

.timeline-event {
  grid-column: 3;
  grid-row: 1;
  margin: 0;
  font-size: 15px;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}

.timeline-subject {
  margin-right: 8px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

@media (max-width: 719px) {
  .about-us {
    padding: 3.5rem 1.5rem;
  }

  .about-intro {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }

  .title {
    font-size: 32px;
  }

  .description {
    font-size: 16px;
  }

  .timeline {
    margin-top: 3rem;
    padding-top: 2rem;
  }

  .timeline-item {
    grid-template-columns: 14px minmax(0, 1fr);
    gap: 0 12px;
  }

  .timeline-item::before {
    grid-column: 1;
  }

  .timeline-date {
    grid-column: 2;
    grid-row: 1;
    text-align: left;
  }

  .timeline-dot {
    grid-column: 1;
    grid-row: 1;
    margin-top: 7px;
  }

  .timeline-event {
    grid-column: 2;
    grid-row: 2;
    margin-top: 4px;
  }
}
</style>

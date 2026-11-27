<script setup lang="ts">
/**
 * 加入我们（找人）页面
 *
 * 作为独立页面使用：在 `docs/blog/joinus.md` 中通过 `pageLayout: home` +
 * `config: [{ type: JoinUsPage }]` 挂载本组件，形成 /blog/n4yb11ch/ 路由。
 *
 * 页面内容来自原 `docs/blog/joinus.md`，按「引言 / 招聘岗位 / 加入条件 / 注意事项 / 加入方式」重组。
 */
import { computed, ref } from 'vue'
import { withBase } from 'vuepress/client'
import recruitData from '../../../recruit.json'

// 首页区块由 VPHome 统一下发这些属性，声明后避免它们落到根元素上
defineProps<{
  full?: boolean
  index?: number
  onlyOnce?: boolean
}>()

const bannerStyle = computed(() => ({
  'background-image': `url(${withBase('/images/banner.svg')})`,
}))

/** 招聘岗位：从 recruit.json 的 recruitlist 展开，保留所有字段 */
const recruitItems = Object.entries(recruitData.recruitlist).map(([key, item]) => ({
  key,
  title: item.title,
  description: item.description,
  states: item.states,
  maxPeople: Number(item.max_people),
  currentPeople: Number(item.current_people),
  urgent: item.urgent === 'true',
  needComputer: item.need_computer === 'true',
}))

/** 岗位状态文案：states 为字符串索引，未列出时回退为「招募中」 */
const stateText: Record<string, string> = {
  '0': '筹备中',
  '1': '招募中',
  '2': '已招满',
}

/** 加入条件：一条主说明，可带一组细分项 */
const requirements = [
  {
    text: '加入《如果历史是一群喵》圈时长 ≥ 一年（这很重要！）',
    strong: true,
    items: [] as string[],
  },
  {
    text: '我们不养闲人，因此你必须会以下任意一个才能加入我们：',
    strong: false,
    items: ['动画制作', '配音', '脚本/剧本制作', '绘画', '会一些计算机知识'],
  },
  {
    text: '有一个发过有关《如果历史是一群喵》内容 ≥ 2 个的社交平台账号，可以是以下平台：',
    strong: false,
    items: ['小红书', '哔哩哔哩', '快手', '抖音', '微博'],
  },
  {
    text: '以及一个能够正常使用的微信账号，方便我们联系你。',
    strong: false,
    items: [] as string[],
  },
]

/** 加入方式：内容沿用原文的三个标签页，第三个默认激活 */
const tabs = [
  { label: '通过常规渠道加入', content: '通过审核问卷：' },
  { label: '标题 2', content: '' },
  { label: '标题 3', content: '' },
]
const activeTab = ref(2)
</script>

<template>
  <div class="join-page">
    <header class="join-hero" :style="bannerStyle">
      <div class="banner-mask" />
      <div class="container">
        <p class="eyebrow">
          JOIN US
        </p>
        <h1 class="title">
          加入我们
        </h1>
        <p class="lead">
          首先，感谢您选择加入嘉靖动画公社，为我们，为历喵圈添砖加瓦。
        </p>
      </div>
    </header>

    <section class="join-section recruit-section">
      <div class="container">
        <div class="heading">
          <p class="eyebrow section-eyebrow">
            OPEN POSITIONS
          </p>
          <h2 class="section-title">
            正在招募
          </h2>
          <span class="rule" aria-hidden="true" />
        </div>

        <div class="recruit-grid">
          <article v-for="item in recruitItems" :key="item.key" class="recruit-card">
            <div class="recruit-card-head">
              <h3 class="recruit-title">
                {{ item.title }}
              </h3>
              <span v-if="item.urgent" class="badge badge-urgent">
                急招
              </span>
            </div>

            <p class="recruit-desc">
              {{ item.description }}
            </p>

            <div class="recruit-meta">
              <span class="badge badge-state">
                {{ stateText[item.states] ?? '招募中' }}
              </span>
              <span v-if="item.needComputer" class="badge">
                需要电脑
              </span>
            </div>

            <div class="recruit-people">
              <span class="people-label">已加入 {{ item.currentPeople }} / {{ item.maxPeople }} 人</span>
              <span class="people-track" aria-hidden="true">
                <span
                  class="people-fill"
                  :style="{ width: `${Math.min(100, (item.currentPeople / item.maxPeople) * 100)}%` }"
                />
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="join-section">
      <div class="container">
        <div class="heading">
          <p class="eyebrow section-eyebrow">
            REQUIREMENTS
          </p>
          <h2 class="section-title">
            加入条件
          </h2>
          <span class="rule" aria-hidden="true" />
        </div>

        <ol class="requirements">
          <li v-for="(item, index) in requirements" :key="item.text" class="requirement">
            <span class="requirement-index">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="requirement-body">
              <p class="requirement-text" :class="{ strong: item.strong }">
                {{ item.text }}
              </p>
              <ul v-if="item.items.length" class="requirement-items">
                <li v-for="sub in item.items" :key="sub">
                  {{ sub }}
                </li>
              </ul>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="join-section caution-section">
      <div class="container">
        <div class="caution">
          <div class="caution-head">
            <span class="caution-icon" aria-hidden="true">!</span>
            <span>注意事项</span>
          </div>
          <p>
            你在社交平台上发布的内容必须有利于《如果历史是一群喵》，这意味着你发布的内容
            <strong>不能带有抹黑《如果历史是一群喵》这部作品的内容</strong>，否则我们会立即拒绝你的加入。
          </p>
          <p>
            并且，请确认你没有被他人「避雷」（其他情况请说明）。
          </p>
        </div>
      </div>
    </section>

    <section class="join-section ways-section">
      <div class="container">
        <div class="heading">
          <p class="eyebrow section-eyebrow">
            HOW TO JOIN
          </p>
          <h2 class="section-title">
            加入方式
          </h2>
          <span class="rule" aria-hidden="true" />
        </div>

        <div class="tabs">
          <div class="tab-list" role="tablist">
            <button
              v-for="(tab, index) in tabs"
              :key="tab.label"
              type="button"
              role="tab"
              class="tab-button"
              :class="{ active: activeTab === index }"
              :aria-selected="activeTab === index"
              @click="activeTab = index"
            >
              {{ tab.label }}
            </button>
          </div>
          <div class="tab-panel" role="tabpanel">
            <p>{{ tabs[activeTab].content }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.join-page {
  min-height: calc(100vh - var(--vp-nav-height) - var(--vp-footer-height, 0px));
}

/* 横幅：与首页、所有成员页保持一致的深色大图 */
.join-hero {
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.banner-mask {
  position: absolute;
  inset: 0;
  background-color: #0a1620;
  opacity: 0.35;
}

.container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1152px;
  padding: 5rem 2rem 4rem;
  margin: 0 auto;
}

.eyebrow {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--vp-c-text-hero-tagline);
}

.title {
  margin: 0.75rem 0 0;
  font-size: 56px;
  font-weight: 700;
  line-height: 1.1;
  color: var(--vp-c-text-hero-name);
}

.lead {
  max-width: 620px;
  margin: 1rem 0 0;
  font-size: 16px;
  line-height: 1.7;
  color: var(--vp-c-text-hero-text);
}

.join-section {
  padding: 3.5rem 0;
  background-color: var(--vp-c-bg);
}

.join-section + .join-section {
  padding-top: 0;
}

.join-section .container {
  padding-top: 0;
  padding-bottom: 0;
}

.heading {
  margin-bottom: 2rem;
}

.section-eyebrow {
  color: var(--vp-c-brand-1);
}

.section-title {
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

/* 招聘岗位卡片 */
.recruit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

.recruit-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  transition:
    border-color var(--vp-t-color),
    transform var(--vp-t-color);
}

.recruit-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.recruit-card-head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem 0.75rem;
}

.recruit-title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  font-size: 12px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.badge-urgent {
  border-color: #e53935;
  background-color: #e53935;
  color: #fff;
  font-weight: 600;
}

.badge-state {
  border-color: var(--vp-c-brand-soft);
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.recruit-desc {
  margin: 0.75rem 0 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.recruit-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.recruit-people {
  margin-top: auto;
  padding-top: 1.25rem;
}

.people-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.people-track {
  display: block;
  height: 6px;
  border-radius: 999px;
  background-color: var(--vp-c-divider);
  overflow: hidden;
}

.people-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  background-color: var(--vp-c-brand-1);
  transition: width var(--vp-t-color);
}

.requirements {
  margin: 0;
  padding: 0;
  list-style: none;
}

.requirement {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  gap: 0 1rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.requirement:first-child {
  padding-top: 0;
}

.requirement:last-child {
  border-bottom: 0;
}

.requirement-index {
  padding-top: 2px;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.5;
  color: var(--vp-c-brand-1);
}

.requirement-text {
  margin: 0;
  font-size: 16px;
  line-height: 1.8;
  color: var(--vp-c-text-1);
}

.requirement-text.strong {
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.requirement-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.75rem;
  margin: 0.85rem 0 0;
  padding: 0;
  list-style: none;
}

.requirement-items li {
  padding: 0.3rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background-color: var(--vp-c-bg-soft);
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.caution {
  padding: 1.75rem 2rem;
  border-left: 3px solid #e53935;
  border-radius: 0 12px 12px 0;
  background-color: var(--vp-c-bg-soft);
}

.caution-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0.75rem;
  font-size: 16px;
  font-weight: 700;
  color: #e53935;
}

.caution-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #e53935;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}

.caution p {
  margin: 0.5rem 0 0;
  font-size: 15px;
  line-height: 1.8;
  color: var(--vp-c-text-2);
}

.caution p strong {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.tabs {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--vp-c-bg-soft);
}

.tab-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem 1.25rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.tab-button {
  padding: 0.6rem 1rem;
  border: 1px solid transparent;
  border-bottom: 0;
  border-radius: 8px 8px 0 0;
  background-color: transparent;
  font-size: 14px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition:
    color var(--vp-t-color),
    background-color var(--vp-t-color);
}

.tab-button:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.tab-button.active {
  border-color: var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.tab-panel {
  min-height: 120px;
  padding: 1.5rem 1.25rem;
}

.tab-panel p {
  margin: 0;
  font-size: 15px;
  line-height: 1.8;
  color: var(--vp-c-text-1);
}

@media (min-width: 960px) {
  .container {
    padding: 6rem 3rem 5rem;
  }

  .join-section .container {
    padding-top: 0;
    padding-bottom: 0;
  }

  .title {
    font-size: 72px;
  }
}

@media (max-width: 719px) {
  .container {
    padding: 3.5rem 1.5rem;
  }

  .join-section {
    padding: 2.5rem 0;
  }

  .join-section + .join-section {
    padding-top: 0;
  }

  .title,
  .section-title {
    font-size: 32px;
  }

  .recruit-grid {
    grid-template-columns: 1fr;
  }

  .requirement {
    grid-template-columns: 36px minmax(0, 1fr);
    gap: 0 0.5rem;
  }

  .requirement-index {
    font-size: 16px;
  }

  .caution {
    padding: 1.25rem 1.25rem;
  }
}
</style>

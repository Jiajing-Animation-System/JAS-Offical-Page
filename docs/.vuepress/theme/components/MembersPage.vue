<script setup lang="ts">
/**
 * 所有成员页面
 *
 * 作为独立页面使用：在 `docs/members.md` 中通过 `pageLayout: home` +
 * `config: [{ type: MembersPage }]` 挂载本组件，形成 /members/ 路由。
 *
 * 复用已有的 MemberList 组件读取 `docs/member.json`，
 * 页面自身只负责横幅标题、布局与配色适配。
 */
import { computed } from 'vue'
import { withBase } from 'vuepress/client'
import memberData from '../../../member.json'
import MemberList from './MemberList.vue'

const bannerStyle = computed(() => ({
  'background-image': `url(${withBase('/images/banner.svg')})`,
}))

/** 成员数量，用于横幅上的简单说明 */
const memberCount = computed(() => Object.keys(memberData ?? {}).length)
</script>

<template>
  <div class="members-page">
    <header class="members-hero" :style="bannerStyle">
      <div class="banner-mask" />
      <div class="container">
        <p class="eyebrow">
          JIAJING ANIMATION SYSTEM
        </p>
        <h1 class="title">
          所有成员
        </h1>
        <p class="lead">
          认识嘉靖动画公社的每一位伙伴，了解他们如何一起把动画做出来。
        </p>
        <p class="meta">
          当前共 {{ memberCount }} 位成员
        </p>
      </div>
    </header>

    <section class="members-section">
      <div class="container">
        <MemberList />
      </div>
    </section>
  </div>
</template>

<style scoped>
.members-page {
  min-height: calc(100vh - var(--vp-nav-height) - var(--vp-footer-height, 0px));
}

/* 横幅：复用首页的深色大图，保证与首页视觉一致 */
.members-hero {
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

.meta {
  margin: 1.5rem 0 0;
  font-size: 13px;
  color: var(--vp-c-text-hero-tagline);
}

/* 成员列表区域使用站点常规背景，需覆盖 MemberList 为深色横幅设计的配色 */
.members-section {
  padding: 3rem 0 5rem;
  background-color: var(--vp-c-bg);
}

.members-section :deep(.member-list-title) {
  color: var(--vp-c-text-1);
}

.members-section :deep(.member-list-title .en) {
  color: var(--vp-c-text-3);
}

.members-section :deep(.member-card) {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
}

.members-section :deep(.member-card:hover) {
  background-color: var(--vp-c-bg-alt);
  border-color: var(--vp-c-brand-2);
}

.members-section :deep(.member-avatar) {
  background-color: var(--vp-c-bg-alt);
  border-color: var(--vp-c-divider);
}

.members-section :deep(.member-name) {
  color: var(--vp-c-text-1);
}

.members-section :deep(.member-desc),
.members-section :deep(.member-tag),
.members-section :deep(.member-social) {
  color: var(--vp-c-text-2);
}

.members-section :deep(.member-tag) {
  background-color: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-soft);
}

.members-section :deep(.member-social:hover) {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-alt);
}

@media (min-width: 960px) {
  .container {
    padding: 6rem 3rem 5rem;
  }

  .title {
    font-size: 72px;
  }
}
</style>

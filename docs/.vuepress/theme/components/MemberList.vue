<script setup lang="ts">
/**
 * 成员列表区块
 *
 * 数据来源：`docs/member.json`
 *
 * 卡片布局：横向排列，一行最多 4 个，超出自动换行（flex-wrap）。
 * 卡片内容：头像 + 左侧对齐的两行文本（name 大字号 / description），
 * 下方为 tags 标签，最底部为 socials 社交链接。
 */
import { computed } from 'vue'
import { withBase } from 'vuepress/client'
import memberData from '../../../member.json'
import { socialIcons, socialNames } from './socialIcons'

interface SocialLink {
  [platform: string]: string
}

interface Member {
  name: string
  avator: string
  description: string
  tags: string
  socials: SocialLink
}

/**
 * 成员列表
 *
 * 对每条数据做容错处理：字段缺失时给出安全默认值，
 * 避免个别成员数据不完整（如缺少 socials / tags）时影响整体渲染。
 */
const members = computed<Member[]>(() => {
  const source = (memberData ?? {}) as Record<string, Partial<Member>>

  return Object.values(source).map((raw, index) => ({
    name: raw?.name ?? `成员 ${index + 1}`,
    avator: raw?.avator ?? '',
    description: raw?.description ?? '',
    tags: raw?.tags ?? '',
    socials: raw?.socials ?? {},
  }))
})

/** 社交平台 key 别名 → 图标表中的标准 key */
const socialAliases: Record<string, string> = {
  rednote: 'xiaohongshu',
  xhs: 'xiaohongshu',
  xiaohongshu: 'xiaohongshu',
  bili: 'bilibili',
  twitter: 'twitter',
  x: 'twitter',
}

/** 取平台图标，不存在则返回 undefined（退化为文字展示） */
function resolveSocialIcon(platform: string): string | undefined {
  const key = socialAliases[platform] ?? platform
  return socialIcons[key]
}

/** 头像路径：json 中为相对路径（./assets/...），需补全为站点绝对路径 */
function resolveAvatar(path: string): string {
  if (!path) return ''
  if (/^(https?:)?\/\//.test(path) || path.startsWith('/')) return path
  return withBase(path.replace(/^\.\//, ''))
}

/** 头像加载失败时隐藏破图标，露出占位底色 */
function handleAvatarError(event: Event): void {
  const el = event.target as HTMLImageElement | null
  if (el)
    el.style.visibility = 'hidden'
}

/** 拆分 tags 字段（逗号分隔） */
function resolveTags(tags: string): string[] {
  if (!tags) return []
  return tags
    .split(/[,，]/)
    .map(t => t.trim())
    .filter(Boolean)
}
</script>

<template>
  <div class="member-list">
    <h2 class="member-list-title">
      <span class="zh">成员列表</span>
      <span class="en">MEMBER LISTS</span>
    </h2>

    <div class="member-grid">
      <div v-for="(member, index) in members" :key="index" class="member-card">
        <img
          v-if="member.avator"
          class="member-avatar"
          :src="resolveAvatar(member.avator)"
          :alt="member.name"
          loading="lazy"
          @error="handleAvatarError"
        >
        <div v-else class="member-avatar member-avatar-empty" aria-hidden />

        <div class="member-body">
          <div class="member-info">
            <h3 class="member-name">
              {{ member.name }}
            </h3>
            <p class="member-desc">
              {{ member.description }}
            </p>
          </div>

          <div v-if="resolveTags(member.tags).length" class="member-tags">
            <span v-for="tag in resolveTags(member.tags)" :key="tag" class="member-tag">
              {{ tag }}
            </span>
          </div>

          <div v-if="member.socials && Object.keys(member.socials).length" class="member-socials">
            <a
              v-for="(url, platform) in member.socials"
              :key="platform"
              class="member-social"
              :href="url"
              :title="socialNames[platform] || platform"
              :aria-label="socialNames[platform] || platform"
              target="_blank"
              rel="noopener"
            >
              <span
                v-if="resolveSocialIcon(platform)"
                class="vp-icon is-svg"
                aria-hidden
                v-html="resolveSocialIcon(platform)"
              />
              <span v-else class="member-social-text">{{ platform }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.member-list {
  width: 100%;
}

.member-list-title {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin: 0 0 24px;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--vp-c-text-hero-name);
  transition: color var(--vp-t-color);
}

.member-list-title .en {
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-hero-tagline);
}

/* 横向排列，一行最多 4 个，超出自动换行 */
.member-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* 毛玻璃卡片：叠在 banner 大图之上时与背景融合 */
.member-card {
  display: flex;
  gap: 16px;
  /* 不使用 flex-grow，避免成员数量少时被拉伸占满整行 */
  flex: 0 1 calc(33.333% - 11px);
  min-width: 260px;
  padding: 18px;
  background-color: rgb(255 255 245 / 0.08);
  border: 1px solid rgb(255 255 245 / 0.16);
  border-radius: 12px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: background-color var(--vp-t-color), border-color var(--vp-t-color), transform var(--vp-t-color);
}

.member-card:hover {
  background-color: rgb(255 255 245 / 0.14);
  border-color: rgb(140 204 213 / 0.5);
  transform: translateY(-2px);
}

.member-avatar {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 50%;
  background-color: rgb(255 255 245 / 0.1);
  border: 1px solid rgb(255 255 245 / 0.16);
}

/* 无头像时的占位圆 */
.member-avatar-empty {
  display: block;
}

.member-body {
  flex: 1;
  min-width: 0;
}

/* 两行左对齐文本 */
.member-info {
  text-align: left;
}

.member-name {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--vp-c-text-hero-name);
}

.member-desc {
  margin: 2px 0 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-hero-tagline);
}

.member-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}

.member-tag {
  padding: 1px 8px;
  font-size: 12px;
  line-height: 1.6;
  color: var(--vp-c-text-hero-tagline);
  background-color: rgb(140 204 213 / 0.16);
  border: 1px solid rgb(140 204 213 / 0.28);
  border-radius: 4px;
}

.member-socials {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.member-social {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  color: var(--vp-c-text-hero-tagline);
  border-radius: 6px;
  transition: color var(--vp-t-color), background-color var(--vp-t-color);
}

.member-social:hover {
  color: var(--vp-c-text-hero-name);
  background-color: rgb(255 255 245 / 0.12);
}

.member-social :deep(.vp-icon.is-svg) {
  width: 18px;
  height: 18px;
}

.member-social-text {
  font-size: 12px;
}

/* 窄屏下改为单列 */
@media (max-width: 719px) {
  .member-card {
    flex: 0 0 100%;
    max-width: 100%;
  }
}

/* 成员较多时（≥3 个）每行 3 列；较少时按实际数量靠左排列 */
@media (min-width: 720px) {
  .member-card {
    max-width: calc(33.333% - 11px);
  }
}
</style>

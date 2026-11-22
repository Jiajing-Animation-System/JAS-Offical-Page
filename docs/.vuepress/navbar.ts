/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 *
 * 每个导航项都可通过 `icon` 字段配置图标，支持 iconify 名称或内联 SVG。
 * 这里统一使用 `.vuepress/icons.ts` 中定义的内联 SVG 图标，详见该文件顶部说明。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'
import { iconArchive, iconBlog, iconFile, iconHome, iconInfo, iconNote, iconTag, iconUsers, iconWorks } from './icons'

export const zhNavbar = defineNavbarConfig([

  { text: '首页', link: '/', icon: { svg: iconHome } },
  { text: '所有成员', link: '/members/', icon: { svg: iconUsers } },
  // 跳转到首页的「查看作品」区块（Artwork.vue 中 id="our-artwork"）
  { text: '查看作品', link: '/#our-artwork', icon: { svg: iconWorks } },
  { text: '博客', link: '/blog/', icon: { svg: iconBlog } },
  // 跳转到首页的「了解我们」区块（AboutUs.vue 中 id="about-us"）
  { text: '了解我们', link: '/#about-us', icon: { svg: iconInfo } },
])

export const enNavbar = defineNavbarConfig([

  { text: 'Home', link: '/en/', icon: { svg: iconHome } },
  { text: 'Blog', link: '/en/blog/', icon: { svg: iconBlog } },
  { text: 'Tags', link: '/en/blog/tags/', icon: { svg: iconTag } },
  { text: 'Archives', link: '/en/blog/archives/', icon: { svg: iconArchive } },
  {
    text: 'Notes',
    icon: { svg: iconNote },
    items: [
      { text: 'Example', link: '/en/demo/README.md', icon: { svg: iconFile } },
    ]
  },
])

/**
 * 查看以下文档了解主题配置
 * - @see https://theme-plume.vuejs.press/config/intro/ 配置说明
 * - @see https://theme-plume.vuejs.press/config/theme/ 主题配置项
 *
 * 请注意，对此文件的修改不会重启 vuepress 服务，而是通过热更新的方式生效
 * 但同时部分配置项不支持热更新，请查看文档说明
 * 对于不支持热更新的配置项，请在 `.vuepress/config.ts` 文件中配置
 *
 * 特别的，请不要在两个配置文件中重复配置相同的项，当前文件的配置项会覆盖 `.vuepress/config.ts` 文件中的配置
 */

import { defineThemeConfig } from 'vuepress-theme-plume'
import { enCollections, zhCollections } from './collections'
import { iconGithub } from './icons'
import { enNavbar, zhNavbar } from './navbar'

/**
 * @see https://theme-plume.vuejs.press/config/theme/
 */
export default defineThemeConfig({
  logo: 'https://theme-plume.vuejs.press/plume.png',

  /**
   * 页脚
   *
   * message：站点声明（含 Cloudflare 链接）
   * copyright：版权信息
   *
   * 注意：message 会覆盖主题默认的 Powered by 声明，此处保留原声明并追加一行说明。
   *
   * @see https://theme-plume.vuejs.press/config/theme/#footer
   */
  footer: {
    message:
      'Powered by <a href="https://v2.vuepress.vuejs.org/" target="_blank" rel="noopener">VuePress</a> &amp; <a href="https://theme-plume.vuejs.press" target="_blank" rel="noopener">vuepress-theme-plume</a><br>本网站由 <a href="https://github.com/Jiajing-Animation-System" target="_blank" rel="noopener">嘉靖Block</a> 创建并维护，托管在 <a href="https://www.cloudflare.com/" target="_blank" rel="noopener">Cloudflare</a> 上',
    copyright: 'Copyright © 2026 嘉靖动画公社',
  },

  social: [
    { icon: { svg: iconGithub, name: 'github' }, link: 'https://github.com/Jiajing-Animation-System' },
  ],

  locales: {
    '/': {
      /**
       * @see https://theme-plume.vuejs.press/config/theme/#profile
       */
      profile: {
        avatar: 'https://theme-plume.vuejs.press/plume.png',
        name: '嘉靖动画公社',
        description: '历喵 嘉靖动画公社官方网站',
      },

      navbar: zhNavbar,
      collections: zhCollections,
    },
    '/en/': {
      /**
       * @see https://theme-plume.vuejs.press/config/theme/#profile
       */
      profile: {
        avatar: 'https://theme-plume.vuejs.press/plume.png',
        name: 'Jiajing Animation System ',
        description: 'JAS Offical Pages',
      },

      navbar: enNavbar,
      collections: enCollections,
    },
  },
})

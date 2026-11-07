---
pageLayout: home
config:
  - type: banner
    full: true
    # 背景大图：放在 .vuepress/public/ 下，替换同名文件即可换图
    banner: /images/banner.svg
    # 遮罩蒙版不透明度（0 - 1）：浅色 / 深色模式可分别配置
    # 换用亮色背景图时适当调大，保证白色标题文字可读
    bannerMask:
      light: 0.15
      dark: 0.25
    hero:
      name: Jiajing Animation System
      tagline: 嘉靖动画公社
      text: The official site of Jiajing Animation System — we tell stories with animation and connect fellow creators.
      actions:
        - theme: brand
          text: Read the Blog
          link: /en/blog/
        - theme: alt
          text: About Us
          link: /en/demo/
title: Home
---

---
pageLayout: home
config:
  - type: MemberBanner
    full: true
    # 背景大图：放在 .vuepress/public/ 下，替换同名文件即可换图
    banner: /images/banner.svg
    # 遮罩蒙版不透明度（0 - 1）：浅色 / 深色模式可分别配置
    # 换用亮色背景图时适当调大，保证白色标题文字可读
    bannerMask:
      light: 0.15
      dark: 0.25
    hero:
      name: 嘉靖动画公社
      tagline: Jiajing Animation System
      text: 以动画连接美好，做历喵圈动画团队的领先者！
      actions:
        - theme: brand
          text: 加入我们
          link: /blog/
        - theme: alt
          text: 查看作品
          link: /demo/
        - theme: alt
          text: 了解我们
          link: /demo/
title: 首页
---

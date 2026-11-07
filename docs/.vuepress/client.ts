import { defineClientConfig } from 'vuepress/client'
import MemberBanner from './theme/components/MemberBanner.vue'
import MemberList from './theme/components/MemberList.vue'

// import './theme/styles/custom.css' // import your custom styles / 导入自定义样式

export default defineClientConfig({
  enhance({ app }) {
    // 注册首页区块组件，供首页 config 中以 `type: xxx` 引用
    // MemberBanner：banner 大图，成员列表以浮层形式绘制在其上
    // MemberList：独立的成员列表区块
    app.component('MemberBanner', MemberBanner)
    app.component('MemberList', MemberList)
  },
})

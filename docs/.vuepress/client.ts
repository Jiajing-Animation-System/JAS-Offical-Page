import { defineClientConfig } from 'vuepress/client'
import AboutUs from './theme/components/AboutUs.vue'
import Artwork from './theme/components/Artwork.vue'
import JoinUs from './theme/components/JoinUs.vue'
import MemberBanner from './theme/components/MemberBanner.vue'
import MemberList from './theme/components/MemberList.vue'
import MembersPage from './theme/components/MembersPage.vue'

import './theme/styles/custom.css' // import your custom styles / 导入自定义样式

export default defineClientConfig({
  enhance({ app }) {
    // 注册首页区块组件，供首页 config 中以 `type: xxx` 引用
    // AboutUs：首页横幅下方的「了解我们」区块
    // Artwork：「了解我们」下方的「查看作品」区块
    // JoinUs：「查看作品」下方的「招贤纳士」区块
    // MemberBanner：banner 大图，成员列表以浮层形式绘制在其上
    // MemberList：独立的成员列表区块
    // MembersPage：所有成员页面（/members/）
    app.component('AboutUs', AboutUs)
    app.component('Artwork', Artwork)
    app.component('JoinUs', JoinUs)
    app.component('MemberBanner', MemberBanner)
    app.component('MemberList', MemberList)
    app.component('MembersPage', MembersPage)
  },
})

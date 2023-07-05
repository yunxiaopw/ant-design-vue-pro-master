<template>
  <page-header-wrapper>
    <a-card class="card">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="微信推送">
          <WechatPush />
        </a-tab-pane>
        <a-tab-pane key="2" tab="邮件推送" force-render>
          <MailPush/>
        </a-tab-pane>
        <a-tab-pane key="3" tab="短信推送" force-render>
          <ShortMessagePush />
        </a-tab-pane>
        <a-tab-pane key="4" tab="平台设置" force-render>
          <PlatformSet />
        </a-tab-pane>
      </a-tabs>
    </a-card>

  </page-header-wrapper>
</template>

<script>
import WechatPush from './modules/wechatPush.vue'
import MailPush from './modules/mailPush.vue'
import ShortMessagePush from './modules/shortMessagePush.vue'
import PlatformSet from './modules/platformSet.vue'
export default {
  components: { MailPush, WechatPush, ShortMessagePush, PlatformSet },
  data () {
    return {
    }
  }
}
</script>
<style lang='less' scoped>
</style>

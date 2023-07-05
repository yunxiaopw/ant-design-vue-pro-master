
<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-tabs default-active-key="1" v-model="currentTab">
        <a-tab-pane key="1" tab="WAN设置">
          <a-form :form="form">
            <a-form-item
              label="IP地址"
              :labelCol="{lg: {span: 2}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 8}, sm: {span: 17} }">
              <a-input placeholder="192.168.1.1" />
            </a-form-item>
            <a-form-item
              label="子网掩码"
              :labelCol="{lg: {span: 2}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 8}, sm: {span: 17} }">
              <a-input placeholder="255.255.255.0" />
            </a-form-item>
            <a-form-item
              label="网关"
              :labelCol="{lg: {span: 2}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 8}, sm: {span: 17} }">
              <a-input placeholder="192.168.1.1" />
            </a-form-item>
            <a-form-item
              label="端口"
              :labelCol="{lg: {span: 2}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 8}, sm: {span: 17} }">
              <a-input placeholder="7443" />
            </a-form-item>
            <a-form-item
              label="链接状态"
              :labelCol="{lg: {span: 2}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 8}, sm: {span: 17} }">
              <a-input disabled />
            </a-form-item>
            <a-form-item
              label="当前IP"
              :labelCol="{lg: {span: 2}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 8}, sm: {span: 17} }">
              <a-input disabled />
            </a-form-item>
            <a-button style="margin-left: 110px;" type="primary">保存</a-button>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="2" tab="WIFI设置" force-render>
          <a-form :form="form">
            <a-form-item
              label="WIFI名称"
              :labelCol="{lg: {span: 2}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 8}, sm: {span: 17} }">
              <a-input />
            </a-form-item>
            <a-form-item
              label="IP地址"
              :labelCol="{lg: {span: 2}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 8}, sm: {span: 17} }">
              <a-input placeholder="192.168.1.1" />
            </a-form-item>
            <a-form-item
              label="子网掩码"
              :labelCol="{lg: {span: 2}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 8}, sm: {span: 17} }">
              <a-input placeholder="255.255.255.0" />
            </a-form-item>
            <a-form-item
              label="网关"
              :labelCol="{lg: {span: 2}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 8}, sm: {span: 17} }">
              <a-input placeholder="192.168.1.1" />
            </a-form-item>
            <a-form-item
              label="端口"
              :labelCol="{lg: {span: 2}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 8}, sm: {span: 17} }">
              <a-input placeholder="7443" />
            </a-form-item>
            <a-form-item
              label="链接状态"
              :labelCol="{lg: {span: 2}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 8}, sm: {span: 17} }">
              <a-input disabled />
            </a-form-item>
            <a-form-item
              label="当前IP"
              :labelCol="{lg: {span: 2}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 8}, sm: {span: 17} }">
              <a-input disabled />
            </a-form-item>
            <a-button style="margin-left: 110px;" type="primary">保存</a-button>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </page-header-wrapper>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      currentTab: '1',
      form: {}
    }
  },
  methods: {

  }
}
</script>
<style lang='less' scoped>

</style>

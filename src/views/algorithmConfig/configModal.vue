
<template>
  <a-modal
    title="配置参数"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form :form="form">
      <a-form-item
        label="分析间隔"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          name="name"
          :placeholder="$t('form.basic-form.title.placeholder')" />
      </a-form-item>
      <a-form-item
        label="报警间隔"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          name="name"
          :placeholder="$t('form.basic-form.title.placeholder')" />
      </a-form-item>
      <a-form-item
        label="告警阈值"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          name="name"
          :placeholder="$t('form.basic-form.title.placeholder')" />
      </a-form-item>
      <a-form-item
        label="告警等级"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          name="name"
          :placeholder="$t('form.basic-form.title.placeholder')" />
      </a-form-item>
      <a-form-item
        label="是否同步到其他算法"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-checkbox></a-checkbox>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: 'ConfigModal',
  data () {
    return {
      visible: false,
      form: {}
    }
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleOk () {
      this.visible = false
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
<style lang='less' scoped>

</style>

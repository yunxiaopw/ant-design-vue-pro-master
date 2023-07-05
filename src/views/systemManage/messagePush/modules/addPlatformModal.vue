
<template>
  <a-modal
    title="配置参数"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form :form="form">
      <a-form-item
        label="平台名称"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          name="name"
          :placeholder="$t('form.basic-form.title.placeholder')" />
      </a-form-item>
      <a-form-item
        label="上报设备"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          name="name"
          :placeholder="$t('form.basic-form.title.placeholder')" />
      </a-form-item>
      <a-form-item
        label="上报key"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          name="name"
          :placeholder="$t('form.basic-form.title.placeholder')" />
      </a-form-item>
      <a-form-item
        label="上报value"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          name="name"
          :placeholder="$t('form.basic-form.title.placeholder')" />
      </a-form-item>
      <a-form-item
        label="上报URL"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          name="name"
          :placeholder="$t('form.basic-form.title.placeholder')" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
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

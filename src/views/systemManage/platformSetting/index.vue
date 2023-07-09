
<template>
  <page-header-wrapper>
    <a-card :bordered="false" title="平台信息设置">
      <a-form :form="form">
        <a-form-item
          label="网站名称"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 8}, sm: {span: 17} }">
          <a-input placeholder="请输入网站名称" />
        </a-form-item>
        <a-form-item
          label="Logo名称"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 8}, sm: {span: 17} }">
          <a-input placeholder="请输入Logo名称" />
        </a-form-item>
        <a-form-item
          label="上传Logo"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 8}, sm: {span: 17} }">
          <a-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture-card"
            :defaultFileList="[]"
          >
            <div>
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-button style="margin-left: 110px;" type="primary">保存</a-button>
      </a-form>
    </a-card>
  </page-header-wrapper>
</template>

<script>
export default {
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

<template>
  <page-header-wrapper >
    <a-card class="card" title="重启" :bordered="false">
      <a-button type="primary">重启</a-button>
      <div style="margin-top: 20px;">重启过程中请不要断电</div>
    </a-card>

    <a-card class="card" title="在线升级" :bordered="false">
      <a-form>
        <a-form-item
          label="当前软件版本"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <span>1.1.0</span>
        </a-form-item>
        <a-form-item
          label="最新软件版本"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <span>1.1.1</span>
        </a-form-item>
        <a-form-item
          label="软件更新说明"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <span>修复已知问题</span>
        </a-form-item>
        <a-form-item
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <a-button style="margin-left: 30px;" type="primary">在线升级</a-button>
        </a-form-item>
      </a-form>
    </a-card>

    <a-card class="card" title="本地升级" :bordered="false">
      <a-form>
        <a-form-item
          label="当前硬件版本"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <span>1.1.0</span>
        </a-form-item>
        <a-form-item
          label="升级文件路径"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <div class="flex">
            <a-input style="width: 200px; margin-right: 10px;"></a-input>
            <a-button style="margin-right: 10px;" type="primary">浏览</a-button>
            <a-button style="margin-right: 10px;" type="primary">升级</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-card>

  </page-header-wrapper>
</template>

<script>

export default {

  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .card{
    margin-bottom: 24px;
  }
  .popover-wrapper {
    :deep(.antd-pro-pages-forms-style-errorPopover .ant-popover-inner-content) {
      min-width: 256px;
      max-height: 290px;
      padding: 0;
      overflow: auto;
    }
  }
  .antd-pro-pages-forms-style-errorIcon {
    user-select: none;
    margin-right: 24px;
    color: #f5222d;
    cursor: pointer;
    i {
          margin-right: 4px;
    }
  }
  .antd-pro-pages-forms-style-errorListItem {
    padding: 8px 16px;
    list-style: none;
    border-bottom: 1px solid #e8e8e8;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      background: #e6f7ff;
    }
    .antd-pro-pages-forms-style-errorIcon {
      float: left;
      margin-top: 4px;
      margin-right: 12px;
      padding-bottom: 22px;
      color: #f5222d;
    }
    .antd-pro-pages-forms-style-errorField {
      margin-top: 2px;
      color: rgba(0,0,0,.45);
      font-size: 12px;
    }
  }
</style>

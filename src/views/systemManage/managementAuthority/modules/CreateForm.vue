<template>
  <a-modal
    title="新建账号"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <a-form-item label="姓名">
          <a-input />
        </a-form-item>
        <a-form-item label="岗位">
          <a-input />
        </a-form-item>
        <a-form-item label="账号">
          <a-input />
        </a-form-item>
        <a-form-item label="密码">
          <a-input-password />
        </a-form-item>
        <a-form-item label="状态">
          <a-select style="width: 100%">
            <a-select-option :value="1">
              开启
            </a-select-option>
            <a-select-option :value="2">
              禁用
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="告警等级">
          <a-select style="width: 100%">
            <a-select-option :value="1">
              低
            </a-select-option>
            <a-select-option :value="2">
              中
            </a-select-option>
            <a-select-option :value="3">
              高
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['description', 'id']

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
    return {
      form: this.$form.createForm(this)
    }
  },
  created () {
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  }
}
</script>

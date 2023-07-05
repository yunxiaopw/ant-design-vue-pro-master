<template>
  <div class="mailPush">
    <a-card class="card" title="表单配置">
      <a-form :form="form">
        <a-form-item
          label="短信推送"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <a-switch checked-children="开" un-checked-children="关" default-checked />
        </a-form-item>
        <a-form-item
          label="短信服务商"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <a-radio-group style="width: 100%">
            <a-radio :value="0">阿里云</a-radio>
            <a-radio :value="1">腾讯云</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="运营商APPID"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <a-input />
        </a-form-item>
        <a-form-item
          label="运营商APPKEY"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <a-input />
        </a-form-item>
        <a-form-item
          label="短信签名"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <a-input />
        </a-form-item>
        <a-form-item
          label="测试手机号"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <div class="flex">
            <a-input />
            <a-button style="margin-left: 10px;">发送测试</a-button>
          </div>
        </a-form-item>
        <div class="flex justify-center">
          <a-button type="primary">保存</a-button>
        </div>
      </a-form>
    </a-card>

    <a-card title="短信用户表">
      <a-button style="margin-bottom: 20px;" type="primary" @click="handleOpenModal">添加收件人</a-button>
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        :loading="memberLoading"
      >
        <template slot="grade" slot-scope="text, record">
          <a-select :value="record.grade" :disabled="!record.isEdit" style="width: 120px">
            <a-select-option :value="0">
              全部
            </a-select-option>
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
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="flex justify-center align-center">
            <span v-if="record.isEdit" @click="toggle('add', record)">
              <DelBtn type="add" />
            </span>
            <span v-else>
              <DelBtn type="edit" @click="toggle('edit', record)" />
            </span>
            <a-divider type="vertical" />
            <DelBtn @click="toggle('del', record)" />
          </div>
        </template>
      </a-table>
    </a-card>
    <AddShortMessageModal ref="addShortMessageModal" />
  </div>
</template>

<script>
import DelBtn from '@/components/DelBtn'
import AddShortMessageModal from './addShortMessageModal.vue'
export default {
  components: { DelBtn, AddShortMessageModal },
  data () {
    return {
      form: {
        type: 1
      },
      memberLoading: false,
      columns: [
        {
          title: '用户名',
          dataIndex: 'name',
          key: 'name',
          width: '20%',
          align: 'center'
        },
        {
          title: '手机号',
          dataIndex: 'workId',
          key: 'workId',
          width: '20%',
          align: 'center'
        },
        {
          title: '告警等级',
          dataIndex: 'grade',
          key: 'grade',
          width: '20%',
          align: 'center',
          scopedSlots: { customRender: 'grade' }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      data: [
        {
          key: '1',
          name: '李四',
          workId: '123456789012',
          grade: 1,
          isEdit: false
        },
        {
          key: '2',
          name: '李四',
          workId: '123456789012',
          grade: 2,
          isEdit: false
        },
        {
          key: '3',
          name: '李四',
          workId: '123456789012',
          grade: 3,
          isEdit: false
        }
      ]
    }
  },
  methods: {
    toggle (type, record) {
      console.log('first')
      if (type === 'add') {
        record.isEdit = false
      } else if (type === 'edit') {
        record.isEdit = false
      } else if (type === 'del') {
        this.data = this.data.filter(item => item.key !== record.key)
      }
    },
    handleOpenModal () {
      this.$refs.addShortMessageModal.showModal()
    }
  },
  mounted () {
  }
}
</script>
<style lang='less' scoped>
.card {
  margin-bottom: 20px;
}
</style>

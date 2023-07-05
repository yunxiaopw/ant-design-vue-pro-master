<template>
  <div class="mailPush">
    <a-card class="card" title="表单配置">
      <a-form :form="form">
        <a-form-item
          label="邮件推送"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <a-switch checked-children="开" un-checked-children="关" default-checked />
        </a-form-item>
        <a-form-item
          label="SMTP地址"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <a-input />
        </a-form-item>
        <a-form-item
          label="SMTP端口"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <a-input />
        </a-form-item>
        <a-form-item
          label="发邮箱账号"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <a-input />
        </a-form-item>
        <a-form-item
          label="邮箱授权码"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <a-input />
        </a-form-item>
        <a-form-item
          label="收件测试"
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

    <a-card title="邮件用户表">
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
    <addMailUserModal ref="addMailUserModalRef" />
  </div>
</template>

<script>
import DelBtn from '@/components/DelBtn'
import AddMailUserModal from './addMailUserModal.vue'
export default {
  components: { DelBtn, AddMailUserModal },
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
          title: '邮箱',
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
          workId: 'abc@qq.com',
          grade: 1,
          isEdit: false
        },
        {
          key: '2',
          name: '李四',
          workId: 'abc@qq.com',
          grade: 2,
          isEdit: false
        },
        {
          key: '3',
          name: '李四',
          workId: 'abc@qq.com',
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
      this.$refs.addMailUserModalRef.showModal()
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

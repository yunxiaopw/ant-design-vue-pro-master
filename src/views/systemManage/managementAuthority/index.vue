<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="按名称">
                <a-input></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="按岗位">
                <a-input></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="!advanced && 4 || 24" :sm="24">
              <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
        <a-button type="danger" icon="delete" @click="handleAdd">删除</a-button>
        <a-button icon="vertical-align-bottom" style="background-color: #f3bf54; border-color: #f3bf54; color: #fff;" @click="handleAdd">导入</a-button>
        <a-button icon="vertical-align-top" style="background-color: #98c454; border-color: #98c454; color: #fff;" @click="handleAdd">导出</a-button>
        <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作 <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :alert="true"
        :rowSelection="rowSelection"
        showPagination="auto"
      >
        <span slot="status" slot-scope="text">
          <a-tag :color="text === 1 ? 'green' : 'red'">
            {{ text === 1 ? '启用' : '禁用' }}
          </a-tag>
        </span>
        <span slot="grade" slot-scope="text">
          {{ text === 1 ? '低' : text === 2 ? '中' : '高' }}
        </span>

        <span slot="action" style="display: flex; justify-content: center;" slot-scope="text, record">
          <template>
            <DelBtn style="margin-right: 10px;" type="edit" @click="handleEdit(record)" />
            <DelBtn @click="handleEdit(record)" />
          </template>
        </span>
      </s-table>

      <create-form
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk"
      />
      <step-by-step-modal ref="modal" @ok="handleOk"/>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getRoleList } from '@/api/manage'

import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'
import DelBtn from '@/components/DelBtn'
const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    align: 'center'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '账号',
    dataIndex: 'account',
    align: 'center'
  },
  {
    title: '岗位',
    dataIndex: 'job',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '告警等级',
    dataIndex: 'grade',
    align: 'grade',
    scopedSlots: { customRender: 'grade' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' },
    align: 'center'
  }
]

const tableData = [{
  id: 1,
  name: '章三',
  account: 'zhangsan',
  job: '文员',
  status: 1,
  grade: 1
},
{
  id: 2,
  name: '章三',
  account: 'zhangsan',
  job: '文员',
  status: 2,
  grade: 2
},
{
  id: 3,
  name: '章三',
  account: 'zhangsan',
  job: '文员',
  status: 2,
  grade: 3
}
]

export default {
  components: {
    STable,
    Ellipsis,
    CreateForm,
    StepByStepModal,
    DelBtn
  },
  data () {
    this.columns = columns
    return {
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: () => {
        return Promise.resolve({
          pageNo: 1,
          pageSize: 10,
          totalCount: 12,
          data: tableData,
          totalPage: 2
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
      imagesPreview: [],
      isShowPre: false
    }
  },
  created () {
    getRoleList({ t: new Date() })
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    handlePreview (url) {
      this.$VDPhoto.show({
          imgData: url,
          publish: (val) => {
              console.log(val)
          }
      })
    },
    handleAdd () {
      this.mdl = null
      this.visible = true
    },
    handleEdit (record) {
      this.visible = true
      this.mdl = { ...record }
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          if (values.id > 0) {
            // 修改 e.g.
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('修改成功')
            })
          } else {
            // 新增
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('新增成功')
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false

      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    handleSub (record) {
      if (record.status !== 0) {
        this.$message.info(`${record.no} 订阅成功`)
      } else {
        this.$message.error(`${record.no} 订阅失败，规则已关闭`)
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tips {
  .title {
    margin-right: 20px;
  }
}
</style>

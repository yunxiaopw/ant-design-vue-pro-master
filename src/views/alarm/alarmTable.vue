<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="日期范围">
                <a-range-picker v-model="queryParam.date" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item label="按算法">
                <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item label="按通道查">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item label="按处理查">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
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
        <!-- <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button> -->
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
        <span slot="operate" slot-scope="text">
          {{ text === 1 ? '已处理' : '未处理' }}
        </span>
        <span slot="realTimeIcon" slot-scope="text, record">
          <img class="icon" :src="text" alt="" @click="handlePreview(record)">
        </span>
        <span slot="alarmIcon" slot-scope="text, record">
          <img class="icon" :src="text" alt="" @click="handlePreview(record)">
        </span>

        <span slot="action" style="display: flex; justify-content: center;" slot-scope="text, record">
          <template>
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
      <PreviewModal ref="previewModalRef" />
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
import PreviewModal from './modules/PreviewModal.vue'
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    align: 'center'
  },
  {
    title: '时间',
    dataIndex: 'time',
    align: 'center'
  },
  {
    title: '算法',
    dataIndex: 'algorithm',
    align: 'center'
  },
  {
    title: '通道名称',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '岗位',
    dataIndex: 'job',
    align: 'center'
  },
  {
    title: '人员',
    dataIndex: 'user',
    align: 'center'
  },
  {
    title: '实时图片',
    dataIndex: 'realTimeIcon',
    scopedSlots: { customRender: 'realTimeIcon' },
    align: 'center'
  },
  {
    title: '告警图片',
    dataIndex: 'alarmIcon',
    scopedSlots: { customRender: 'alarmIcon' },
    align: 'center'
  },
  {
    title: '告警是否处理',
    dataIndex: 'operate',
    scopedSlots: { customRender: 'operate' },
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' },
    align: 'center'
  }
]

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}

const tableData = [{
  id: 1,
  time: '2023-06-10',
  algorithm: '桌面检测',
  name: '3楼办公室',
  job: '文员',
  user: '张三',
  realTimeIcon: 'https://p3-ug-imc.byteimg.com/img/tos-cn-i-gflu06s87d/9ff6abfac16d4c7b98c2620de5b4da73~tplv-gflu06s87d-image.jpeg',
  alarmIcon: 'https://p3-ug-imc.byteimg.com/img/tos-cn-i-gflu06s87d/9ff6abfac16d4c7b98c2620de5b4da73~tplv-gflu06s87d-image.jpeg',
  operate: 1
},
{
  id: 2,
  time: '2023-06-10',
  algorithm: '桌面检测',
  name: '4楼办公室',
  job: '文员',
  user: '王五',
  realTimeIcon: 'https://p3-ug-imc.byteimg.com/img/tos-cn-i-gflu06s87d/9ff6abfac16d4c7b98c2620de5b4da73~tplv-gflu06s87d-image.jpeg',
  alarmIcon: 'https://p3-ug-imc.byteimg.com/img/tos-cn-i-gflu06s87d/9ff6abfac16d4c7b98c2620de5b4da73~tplv-gflu06s87d-image.jpeg',
  operate: 1
},
{
  id: 4,
  time: '2023-06-10',
  algorithm: '桌面检测',
  name: '5楼办公室',
  job: '文员',
  user: '李四',
  realTimeIcon: 'https://p3-ug-imc.byteimg.com/img/tos-cn-i-gflu06s87d/9ff6abfac16d4c7b98c2620de5b4da73~tplv-gflu06s87d-image.jpeg',
  alarmIcon: 'https://p3-ug-imc.byteimg.com/img/tos-cn-i-gflu06s87d/9ff6abfac16d4c7b98c2620de5b4da73~tplv-gflu06s87d-image.jpeg',
  operate: 0
},
{
  id: 5,
  time: '2023-06-10',
  algorithm: '桌面检测',
  name: '5楼办公室',
  job: '文员',
  user: '李四',
  realTimeIcon: 'https://p3-ug-imc.byteimg.com/img/tos-cn-i-gflu06s87d/9ff6abfac16d4c7b98c2620de5b4da73~tplv-gflu06s87d-image.jpeg',
  alarmIcon: 'https://p3-ug-imc.byteimg.com/img/tos-cn-i-gflu06s87d/9ff6abfac16d4c7b98c2620de5b4da73~tplv-gflu06s87d-image.jpeg',
  operate: 0
},
{
  id: 6,
  time: '2023-06-10',
  algorithm: '桌面检测',
  name: '5楼办公室',
  job: '文员',
  user: '李四',
  realTimeIcon: 'https://p3-ug-imc.byteimg.com/img/tos-cn-i-gflu06s87d/9ff6abfac16d4c7b98c2620de5b4da73~tplv-gflu06s87d-image.jpeg',
  alarmIcon: 'https://p3-ug-imc.byteimg.com/img/tos-cn-i-gflu06s87d/9ff6abfac16d4c7b98c2620de5b4da73~tplv-gflu06s87d-image.jpeg',
  operate: 0
}
]

export default {
  components: {
    STable,
    Ellipsis,
    CreateForm,
    StepByStepModal,
    DelBtn,
    PreviewModal
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
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
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
    handlePreview (data) {
      this.$refs.previewModalRef.showModal(data)
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
.icon {
  width: 30px;
  height: 30px;
}
</style>

<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="4" :sm="24">
              <a-form-item label="姓名">
                <a-input placeholder="请输入姓名"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="3" :sm="24">
              <a-form-item label="性别">
                <a-select placeholder="请选择性别">
                  <a-select-option value="0">男</a-select-option>
                  <a-select-option value="1">女</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item label="岗位">
                <a-input placeholder="请输入岗位"></a-input>
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
        <div class="user-total">
          <span>人员总数</span>
          <span class="count">120</span>
        </div>
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
        <span slot="sex" slot-scope="text">
          {{ text === 0 ? '男' : '女' }}
        </span>
        <span slot="pic" slot-scope="text">
          <a-avatar :src="text" shape="square" size="large" />
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

import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'
import DelBtn from '@/components/DelBtn'
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    scopedSlots: { customRender: 'sex' }
  },
  {
    title: '部门',
    dataIndex: 'part',
    align: 'center'
  },
  {
    title: '岗位',
    dataIndex: 'post',
    align: 'center'
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    align: 'center'
  },
  {
    title: '照片',
    dataIndex: 'pic',
    align: 'center',
    scopedSlots: { customRender: 'pic' }
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
  name: '张三',
  sex: 1,
  part: '技术部',
  post: '前端开发',
  phone: '13888888888',
  pic: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4'

},
{
  id: 2,
  name: '小红',
  sex: 0,
  part: '技术部',
  post: '前端开发',
  phone: '13888888888',
  pic: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4'

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
.table-page-search-wrapper {
  position: relative;
  .user-total {
    position: absolute;
    right: 0;
    top: 0;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 8px;
    .count {
      margin-left: 20px;
    }
  }
}
</style>

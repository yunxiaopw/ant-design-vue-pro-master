<template>
  <page-header-wrapper>
    <a-card class="card" :bordered="false">
      <a-row>
        <a-col :sm="6" :xs="24">
          <info title="在线音柱" value="12" :bordered="true" />
        </a-col>
        <a-col :sm="6" :xs="24">
          <info title="已使用音柱" value="22" :bordered="true" />
        </a-col>
        <a-col :sm="6" :xs="24">
          <info title="未使用音柱" value="10" :bordered="true" />
        </a-col>
        <a-col :sm="6" :xs="24">
          <info title="下发次数" value="200" />
        </a-col>
      </a-row>
    </a-card>
    <a-card class="card" title="前场" :bordered="false">
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        :loading="memberLoading"
      >
        <template slot="name" slot-scope="text, record">
          <a-select :disabled="!record.editable" :value="record.name" style="width: 120px">
            <a-select-option :value="1">
              通道1
            </a-select-option>
          </a-select>
        </template>
        <template slot="workId" slot-scope="text, record">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, 'workId')"
          />
          <template v-else>{{ text }}</template>
        </template>
        <template slot="status" slot-scope="text, record">
          <a-select v-if="record.editable" :disabled="!record.editable" :value="record.status" @change="e => handleChangeStatus(e, record.key, 'status')" style="width: 120px">
            <a-select-option :value="1">
              离线
            </a-select-option>
            <a-select-option :value="2">
              在线
            </a-select-option>
          </a-select>
          <template v-else>
            <a-tag :color="text === 1 ? 'green' : 'red'">
              {{ text === 1 ? '在线' : '离线' }}
            </a-tag>
          </template>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="flex justify-center">
            <template v-if="record.editable">
              <span class="flex align-center">
                <span @click="saveRow(record)">
                  <DelBtn type="add" />
                </span>
                <a-divider type="vertical" />
                <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
                  <DelBtn @click="toggle(record.key)" />
                </a-popconfirm>
                <a-divider type="vertical" />
                <a-button style="background-color: #98c454; color: #fff;" size="small">测试</a-button>
                <a-divider type="vertical" />
                <a-switch></a-switch>
              </span>
            </template>
            <span class="flex align-center" v-else>
              <span @click="toggle(record.key)">
                <DelBtn type="edit" />
              </span>
              <a-divider type="vertical" />
              <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
                <DelBtn />
              </a-popconfirm>
              <a-divider type="vertical" />
              <a-button style="background-color: #98c454; color: #fff;" size="small">测试</a-button>
              <a-divider type="vertical" />
              <a-switch></a-switch>
            </span>
          </div>
        </template>
      </a-table>
      <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMember">新增</a-button>
    </a-card>

    <a-card class="card" title="后场" :bordered="false">
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        :loading="memberLoading"
      >
        <template slot="name" slot-scope="text, record">
          <a-select :disabled="!record.editable" v-model="record.name" style="width: 120px">
            <a-select-option :value="1">
              通道1
            </a-select-option>
          </a-select>
        </template>
        <template slot="workId" slot-scope="text, record">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, 'workId')"
          />
          <template v-else>{{ text }}</template>
        </template>
        <template slot="status" slot-scope="text, record">
          <a-select v-if="record.editable" :disabled="!record.editable" :value="record.status" @change="e => handleChangeStatus(e, record.key, 'status')" style="width: 120px">
            <a-select-option :value="1">
              离线
            </a-select-option>
            <a-select-option :value="2">
              在线
            </a-select-option>
          </a-select>
          <template v-else>
            <a-tag :color="text === 1 ? 'green' : 'red'">
              {{ text === 1 ? '在线' : '离线' }}
            </a-tag>
          </template>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="flex justify-center">
            <template v-if="record.editable">
              <span class="flex align-center">
                <span @click="saveRow(record)">
                  <DelBtn type="add" />
                </span>
                <a-divider type="vertical" />
                <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
                  <DelBtn @click="toggle(record.key)" />
                </a-popconfirm>
                <a-divider type="vertical" />
                <a-button style="background-color: #98c454; color: #fff;" size="small">测试</a-button>
                <a-divider type="vertical" />
                <a-switch></a-switch>
              </span>
            </template>
            <span class="flex align-center" v-else>
              <span @click="toggle(record.key)">
                <DelBtn type="edit" />
              </span>
              <a-divider type="vertical" />
              <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
                <DelBtn />
              </a-popconfirm>
              <a-divider type="vertical" />
              <a-button style="background-color: #98c454; color: #fff;" size="small">测试</a-button>
              <a-divider type="vertical" />
              <a-switch></a-switch>
            </span>
          </div>
        </template>
      </a-table>
      <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMember">新增</a-button>
    </a-card>

    <a-card title="播放配置" :bordered="false">
      <a-form :form="form">
        <a-form-item
          label="开启通道告警播报："
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <a-switch checked-children="开" un-checked-children="关" default-checked />
        </a-form-item>
        <a-form-item
          label="选择音源"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <a-radio-group name="radioGroup" :default-value="1">
            <a-radio :value="1">
              男生播报
            </a-radio>
            <a-radio :value="2">
              女生播报
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="选择播放方式"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 12}, sm: {span: 17} }">
          <div class="flex align-center">
            <a-radio-group v-model="form.type" name="radioGroup" :default-value="1">
              <a-radio :value="1">
                按分钟播放
              </a-radio>
              <a-radio :value="2">
                按时播放
              </a-radio>
              <a-radio :value="3">
                按天播放
              </a-radio>
            </a-radio-group>
            <div v-if="form.type === 1">
              <a-time-picker :default-open-value="moment('00:00:00', 'HH:mm:ss')" />
            </div>
            <div v-if="form.type === 2">
              <a-select style="width: 100px">
                <a-select-option v-for="item in plainOptions" :key="item">
                  {{ item }}
                </a-select-option>
              </a-select>
              小时
            </div>
            <div v-if="form.type === 3" style="height: 40px;">
            </div>
          </div>
        </a-form-item>
        <a-form-item
          label="播放时间段"
          :labelCol="{lg: {span: 2}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 15}, sm: {span: 17} }">
          <WeekDatetimePicker />
        </a-form-item>
        <div style="display: flex; justify-content: flex-end;">
          <a-button type="primary">提交</a-button>
        </div>

      </a-form>
    </a-card>

    <!-- fixed footer toolbar -->
    <!-- <footer-tool-bar>
    </footer-tool-bar> -->

  </page-header-wrapper>
</template>

<script>
import Info from '../components/Info.vue'
import moment from 'moment'
import DelBtn from '@/components/DelBtn'
import WeekDatetimePicker from '../components/WeekDatetimePicker.vue'
export default {
  components: { Info, DelBtn, WeekDatetimePicker },
  data () {
    return {
      form: {
        type: 1
      },
      moment,
      plainOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      memberLoading: false,
      columns: [
        {
          title: '通道名称',
          dataIndex: 'name',
          key: 'name',
          width: '20%',
          align: 'center',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '音柱IP',
          dataIndex: 'workId',
          key: 'workId',
          width: '20%',
          align: 'center',
          scopedSlots: { customRender: 'workId' }
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          width: '20%',
          align: 'center',
          scopedSlots: { customRender: 'status' }
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
          name: 1,
          workId: '10.10.10.12',
          editable: false,
          status: 1
        },
        {
          key: '2',
          name: 1,
          workId: '10.10.10.12',
          editable: false,
          status: 2
        },
        {
          key: '3',
          name: 1,
          workId: '10.10.10.12',
          editable: false,
          status: 2
        }
      ]
    }
  },
  methods: {
    handleChangeStatus (value, key, column) {
      console.log('value', value)
      const newData = [...this.data]
      const target = newData.find(item => key === item.key)
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    newMember () {
      const length = this.data.length
      this.data.push({
        key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
        name: '',
        workId: '',
        department: '',
        editable: true,
        isNew: true
      })
    },
    remove (key) {
      const newData = this.data.filter(item => item.key !== key)
      this.data = newData
    },
    toggle (key) {
      const target = this.data.find(item => item.key === key)
      target._originalData = { ...target }
      target.editable = !target.editable
    },
    saveRow (record) {
      this.memberLoading = true
      const { key, name, workId } = record
      console.log('asd', name, workId)
      if (!name || !workId) {
        this.memberLoading = false
        this.$message.error('请填写完整成员信息。')
        return
      }
      // 模拟网络请求、卡顿 800ms
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ loop: false })
        }, 800)
      }).then(() => {
        const target = this.data.find(item => item.key === key)
        target.editable = false
        target.isNew = false
        this.memberLoading = false
      })
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.find(item => key === item.key)
      if (target) {
        target[column] = value
        this.data = newData
      }
    }
  },
  mounted () {
  }
}
</script>
<style lang='less' scoped>
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

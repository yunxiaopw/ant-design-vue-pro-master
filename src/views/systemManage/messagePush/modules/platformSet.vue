<template>
  <div class="mailPush">
    <div style="margin-bottom: 20px">
      <span style="margin-right: 10px">平台设置</span>
      <a-switch checked-children="开" un-checked-children="关" default-checked />
    </div>

    <a-card title="上报管理">
      <a-button style="margin-bottom: 20px;" type="primary" @click="handleOpenModal">新增上报</a-button>
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        :loading="memberLoading"
      >
      </a-table>
    </a-card>

    <AddPlatformModal ref="addPlatformModalRef" />
  </div>
</template>

<script>
import DelBtn from '@/components/DelBtn'
import AddPlatformModal from './addPlatformModal.vue'
export default {
  components: { DelBtn, AddPlatformModal },
  data () {
    return {
      form: {
        type: 1
      },
      memberLoading: false,
      columns: [
        {
          title: '平台名称',
          dataIndex: 'name',
          key: 'name',
          width: '20%',
          align: 'center'
        },
        {
          title: '上报设备',
          dataIndex: 'workId',
          key: 'workId',
          width: '20%',
          align: 'center'
        },
        {
          title: '上报key',
          dataIndex: 'label',
          key: 'label',
          width: '20%',
          align: 'center'
        },
        {
          title: '上报value',
          dataIndex: 'value',
          key: 'value',
          width: '20%',
          align: 'center'
        },
        {
          title: '上报URL',
          dataIndex: 'url',
          key: 'gurlrade',
          width: '20%',
          align: 'center'
        }
      ],
      data: [
        {
          key: '1',
          name: '李四',
          workId: 'abc@qq.com',
          label: 'key',
          value: 'value',
          url: 'https://www.baidu.com'
        }
      ]
    }
  },
  methods: {
    handleOpenModal () {
      this.$refs.addPlatformModalRef.showModal()
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

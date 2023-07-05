<template>
  <page-header-wrapper>
    <a-card class="card" :bordered="false">
      <a-row>
        <a-col :sm="6" :xs="24">
          <info title="人员数量" value="12" :bordered="true" />
        </a-col>
        <a-col :sm="6" :xs="24">
          <info title="今日识别" value="22" :bordered="true" />
        </a-col>
        <a-col :sm="6" :xs="24">
          <info title="识别总数" value="10" :bordered="true" />
        </a-col>
      </a-row>
    </a-card>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="6" :sm="24">
              <a-form-item label="日期范围">
                <a-range-picker v-model="queryParam.date" style="width: 100%" />
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

      <div class="main-container">
        <div class="left-container">
          <div style="margin-bottom: 16px;">
            <span style="margin-right: 16px;">人脸识别</span>
            <a-switch />
          </div>
          <div class="swiper-container card">
            <swiper ref="mySwiper" :options="swiperOptions">
              <swiper-slide>Slide 1</swiper-slide>
              <swiper-slide>Slide 2</swiper-slide>
              <swiper-slide>Slide 3</swiper-slide>
              <swiper-slide>Slide 4</swiper-slide>
              <swiper-slide>Slide 5</swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
          <a-card class="card" title="识别结果">
            <a-list bordered>
              <a-list-item>
                <a-list-item-meta
                  avatar
                  :title="'数据来源'"
                  :description="'通道1'"
                />
              </a-list-item>
              <a-list-item>
                <a-list-item-meta
                  avatar
                  :title="'违规信息'"
                  :description="'未戴安全帽'"
                />
              </a-list-item>
              <a-list-item>
                <a-list-item-meta
                  avatar
                  :title="'时间'"
                  :description="'6月30日20:53:59'"
                />
              </a-list-item>
              <a-list-item>
                <a-list-item-meta
                  avatar
                  :title="'姓名'"
                  :description="'张三'"
                />
              </a-list-item>
              <a-list-item>
                <a-list-item-meta
                  avatar
                  :title="'表情'"
                  :description="'生气'"
                />
              </a-list-item>
              <a-list-item>
                <a-list-item-meta
                  avatar
                  :title="'相似度'"
                  :description="'75%'"
                />
              </a-list-item>
            </a-list>
          </a-card>
          <a-card title="识别参数">
            <a-form>
              <a-form-item
                :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
                label="阈值">
                <a-input></a-input>
              </a-form-item>
              <div class="submit-btn">
                <a-button type="primary">提交</a-button>
              </div>
            </a-form>
          </a-card>
        </div>
        <div class="right-container">
          <div style="height: 39px;">
            <!-- <span style="margin-right: 16px;">人脸识别</span>
            <a-switch /> -->
          </div>
          <a-card title="匹配结果">
            <div class="flex align-center" style="margin-bottom: 20px;">
              <span>按</span>
              <a-input style="width: 150px; margin: 0 16px;"></a-input>
              <span>排序</span>
            </div>
            <a-table
              :columns="columns"
              :dataSource="data"
              :pagination="false"
              :loading="memberLoading"
            >
              <template slot="image01" slot-scope="text, record">
                <a-avatar :src="record.image01" />
              </template>
              <template slot="image02" slot-scope="text, record">
                <a-avatar :src="record.image02" />
              </template>
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
        </div>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import Info from '@/views/systemManage/components/Info.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  components: { Info, Swiper, SwiperSlide },
  data () {
    return {
      queryParam: {},
      swiperOptions: {
          pagination: {
            el: '.swiper-pagination'
          }
          // ...
        },
        memberLoading: false,
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          align: 'center'
        },
        {
          title: '告警人脸',
          dataIndex: 'image01',
          key: 'image01',
          align: 'center',
          scopedSlots: { customRender: 'image01' }
        },
        {
          title: '人员照片',
          dataIndex: 'image02',
          key: 'image02',
          align: 'center',
          scopedSlots: { customRender: 'image02' }
        },
        {
          title: '相似度',
          dataIndex: 'workId',
          key: 'workId',
          align: 'center'
        },
        {
          title: '数据来源',
          dataIndex: 'fromData',
          key: 'fromData',
          align: 'center'
        },
        {
          title: '违规信息',
          dataIndex: 'info',
          key: 'info',
          align: 'center'
        },
        {
          title: '识别次数',
          dataIndex: 'count',
          key: 'count',
          align: 'center'
        },
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time',
          align: 'center'
        }
      ],
      data: [
        {
          key: '1',
          name: '李四',
          image01: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
          image02: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
          workId: '75%',
          fromData: '通道名称',
          info: '未戴安全帽',
          count: '1',
          time: '2020-06-30 20:53:59'
        },
        {
          key: '2',
          name: '小红',
          image01: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
          image02: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
          workId: '75%',
          fromData: '通道名称',
          info: '未戴安全帽',
          count: '1',
          time: '2020-06-30 20:53:59'
        }
      ]
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
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

  .main-container {
    display: flex;
    justify-content: space-between;
    height: 100%;
    .left-container {
      width: 30%;
      height: 100%;

      .swiper-container {
        height: 300px;
        border: 1px solid #e8e8e8;
      }
    }

    .right-container {
      width: 69%;
      height: 100%;
    }
  }
  .submit-btn {
    display: flex;
    justify-content: flex-end;
  }

  .card {
    margin-bottom: 20px;
  }

  .right-container {
    display: flex;
    height: 100%;
    flex-direction: column;
    .pic-group {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: space-between;
      .pic-item {
        width: 150px;
        height: 150px;
        border: 1px solid #e8e8e8;
      }
    }
  }
</style>

<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="first-part">
        <a-select class="select-channel" placeholder="请选择通道" style="width: 120px;">
          <a-select-option :value="1">通道1</a-select-option>
        </a-select>
        <div style="width: 50%; margin-right: 10px;">
          <div class="operate">
            <a-icon style="font-size: 20px;" type="edit" />
            <a-icon style="font-size: 20px; margin-left: 10px;" type="undo" />
            <a-icon style="font-size: 20px; margin-left: 10px;" type="delete" />
          </div>
          <div class="real-time-container"></div>
        </div>
        <div style="width: 50%;">
          <div style="height: 30px;"></div>
          <div class="form-container">
            <a-form :form="form">
              <a-form-item
                label="分析间隔"
                :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
                <a-input
                  name="name"
                  :placeholder="$t('form.basic-form.title.placeholder')" />
              </a-form-item>
              <a-form-item
                label="报警间隔"
                :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
                <a-input
                  name="name"
                  :placeholder="$t('form.basic-form.title.placeholder')" />
              </a-form-item>
              <a-form-item
                label="告警阈值"
                :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
                <a-input
                  name="name"
                  :placeholder="$t('form.basic-form.title.placeholder')" />
              </a-form-item>
              <a-form-item
                label="告警等级"
                :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
                <a-select placeholder="请选择等级" style="width: 100%;">
                  <a-select-option :value="1">低</a-select-option>
                  <a-select-option :value="2">中</a-select-option>
                  <a-select-option :value="3">高</a-select-option>
                </a-select>
              </a-form-item>

              <div class="submit-btn">
                <div style="margin-bottom: 20px;">
                  <a-checkbox></a-checkbox>
                  <span style="margin-left: 10px;">是否同步到其他算法</span>
                </div>
                <a-button type="primary">提交</a-button>
              </div>
            </a-form>
          </div>
        </div>
      </div>
      <div class="second-part">
        <div class="left-container">
          <div class="left-side">
            <div class="top"><a-icon type="up" /></div>
            <div class="main">
              <img class="icon" v-for="(item, index) in iconObj[currentIcon]" :key="index" :src="item" alt="">
            </div>
            <div class="bottom"><a-icon type="down" /></div>
          </div>
          <div class="right-content">
            <div class="wrap">
              <div class="item-icon"></div>
              <div class="item-icon"></div>
            </div>
            <div class="wrap">
              <div class="item-icon"></div>
              <div class="item-icon"></div>
            </div>
          </div>
        </div>
        <div class="right-container">
          <WeekDatetimePicker />
        </div>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import icon01 from '../../assets/icons/icon01.svg'
import icon02 from '../../assets/icons/icon02.svg'
import WeekDatetimePicker from './WeekDatetimePicker.vue'
export default {
  components: { WeekDatetimePicker },
  data () {
    return {
      form: {},
      icon01,
      icon02,
      currentIcon: 1,
      iconObj: {
        1: [icon01, icon01, icon01, icon01],
        2: [icon02, icon02, icon02, icon02]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.first-part {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  .select-channel {
    position: absolute;
    left: 0;
    top: -10px;
  }
}
.real-time-container {
  border: 1px solid #ccc;
  width: 100%;
  height: 400px;
}
.form-container {
  border: 1px solid #ccc;
  width: 100%;
  padding-top: 10px;
  box-sizing: border-box;
  padding-top: 60px;
  position: relative;
  height: 400px;
  .submit-btn {
    display: flex;
    flex-direction: column;
    width: 160px;
    position: absolute;
    right: 60px;
    bottom: 20px;
  }
}

.second-part {
  margin-top: 20px;
  display: flex;
  .left-container, .right-container {
    width: 50%;
    // height: 400px;
    border: 1px solid #ccc;
    display: flex;
    // padding: 10px;
  }
  .left-container {
    margin-right: 10px;
  }
  .left-side {
    display: flex;
    flex-direction: column;
    width: 150px;
    border-right: 1px solid #ccc;
    .top, .bottom {
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #0084fa;
      cursor: pointer;
      color: #fff;
    }
    .top {
      border-bottom: 1px solid #ccc;
    }
    .main {
      flex: 1;
      border-bottom: 1px solid #ccc;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon {
        width: 80px;
        margin-bottom: 30px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  .right-content {
    padding: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .wrap {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .item-icon {
      min-width: 200px;
      min-height: 200px;
      border: 1px solid #ccc;
    }
  }
  .right-container {
      padding: 10px;
    }
}

.operate {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>

<template>
  <a-modal
    :width="700"
    :visible="visible"
    @ok="() => { $emit('ok') }"
    @cancel="() => handleClose()"
  >
    <template slot="title">
      <h3>通道6-报警类型：未穿反光衣</h3>
    </template>

    <div class="content">
      <div class="desc-container">
        <div>
          <span>发生时间：</span>
          <span>2023年07月05日 05:27:56</span>
        </div>
        <div>
          <span>报警位置：</span>
          <span>南海公园</span>
        </div>
      </div>
      <div class="pic-container">
        <div>
          <div class="left"></div>
          <div style="text-align: center;">实时图片</div>
        </div>
        <div>
          <div class="left"></div>
          <div style="text-align: center;">告警图片</div>
        </div>
      </div>
      <div class="info-container">
        <div class="content">
          <div class="title">人脸对比</div>
          <div class="wrap">
            <div class="flex">
              <div class="flex-w">
                <div class="mr-20" style="margin-bottom: 20px;">
                  <span class="label">姓名：</span>
                  <span>章三</span>
                </div>
                <div>
                  <span class="label">对比度：</span>
                  <span>75%</span>
                </div>
              </div>
              <div class="flex-w">
                <div class="mr-20" style="margin-bottom: 20px;">
                  <span class="label">岗位：</span>
                  <span>文员</span>
                </div>
                <div>
                  <span class="label">对比数:</span>
                  <span>2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="image-user"></div>
      </div>
    </div>
  </a-modal>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleClose () {
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  .pic-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .left, .right {
      width: 300px;
      height: 200px;
      border: 1px solid #ccc;
    }
  }

  .info-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70%;
    }
  }

  .content {
    width: 300px;
  }
  .image-user {
    width: 300px;
    height: 200px;
    border: 1px solid #ccc;
  }
  .title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .mr-20 {
    margin-right: 20px;
  }

  .flex-w {
    width: 150px;
  }

  .label {
    font-weight: 600;
  }
}
</style>

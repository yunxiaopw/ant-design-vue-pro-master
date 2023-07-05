<template>
  <div class="w-100 h-100 overflow-hidden">
    <!-- <div class="row" style="height: 10px;">
    </div> -->
    <div class="row mx-0">
      <div class="flex align-center mr-8">
        <!-- <div class="flex align-center mr-8">
          <label class="mr-2" :for="uniqueId+'weekday-same'">同步到每天</label>
          <input type="checkbox" v-model="weekdaySame" :id="uniqueId+'weekday-same'">
        </div> -->
        <div class="flex align-center">
          <label class="mr-2" :for="uniqueId+'weekday-same'">同步到其他算法</label>
          <input type="checkbox" v-model="weekdaySame" :id="uniqueId+'weekday-same'">
        </div>
      </div>
      <!-- <div>
        <span>选择通道：</span>
        <a-select :value="currentChannel" style="width: 120px">
          <a-select-option :value="1">
            通道1
          </a-select-option>
        </a-select>
      </div> -->
    </div>
    <div class="row flex" v-for="(weekday, i) in weekdays" :key="uniqueId + '-weekday-' + i">
      <div class="mr-8 flex align-center">
        <label class="mr-2" :for="uniqueId+'weekday-selected'+i">星期{{ weekday }}</label>
        <input class="input-check" type="checkbox" v-model="dayStatus[i]" :id="uniqueId+'weekday-selected'+i">
      </div>
      <div style="margin-bottom: 40px; width: calc(100% - 80px)">
        <div class="d-flex">
          <div
            v-for="(item, j) in new Array(25).fill(0).map((v, i)=>i)"
            :key="uniqueId + '-time-label-' + i + '-' + j"
            class="time-label-sm"
          >
            <span v-if="j % 2 === 0">{{ item }}</span>
          </div>
        </div>
        <div class="time-tick-sm ml-1 mr-0">
        </div>
        <div class="time-bar-container">
          <div
            class="time-bar-sm ml-1 mr-0"
          >
            <div
              v-for="(item, j) in new Array(dayCellNum).fill(0).map((v, i)=>i)"
              :key="uniqueId + '-time-cell-' + i + '-' + j"
              :class="'time-cell-sm' + (cellStatus[i*dayCellNum+j] ? ' cell-selected' : '') + (dayStatus[i] ? '' : ' day-disabled')"
            >
              <!-- v-on:mousedown.stop="onTimeCellDown($event, i, j)"
              v-on:mouseover.stop="onTimeCellOver($event, i, j)"
              v-on:mouseout.stop="onTimeCellOut($event, i, j)"
              v-on:mouseup.stop="onTimeCellUp($event, i, j)" -->
            </div>
          </div>
          <div
            class="time-bar-sm-overlay ml-1 mr-0"
            @mousedown.stop="onTimeBarDown($event, i)"
            @mousemove.stop="onTimeBarMove($event, i)"
            @mouseout.stop="onTimeBarOut($event, i)"
            @mouseup.stop="onTimeBarUp($event, i)"
          >

          </div>
        </div>
      </div>
      <div class="pl-2 py-2 text-center" style="width: 4%;">
        <!-- <label class="mr-2" :for="uniqueId+'weekday-selected'+i">{{weekday}}</label> -->
        <a
          type="button"
          class="popover-dismiss"
          role="button"
          data-toggle="popover"
          title=""
          :data-content="getDayTimeDesc(i)"
          data-original-title="已设置时间段">
          <IconFont iconName="icon-xiangxixinxi"></IconFont>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

const TIME_CELL_WIDTH = 8

const WEEKDAY_NUM = 7
const TIME_CELL_SIZE = 30 // 分钟
const DAY_CELL_NUM = 24 * 60 / TIME_CELL_SIZE
const WEEK_CELL_NUMM = WEEKDAY_NUM * DAY_CELL_NUM

function initDefaultTimeCells () {
  const status = new Array(WEEK_CELL_NUMM).fill(0)
  const workingCells = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 40, 41, 42, 43, 44, 45, 46, 47]
  for (let i = 0; i < WEEKDAY_NUM; i++) {
    workingCells.forEach(v => { status[i * DAY_CELL_NUM + v] = 1 })
  }
  return status
}

export default {
  name: 'WeekDatetimePicker',
  components: {
  },
  data () {
    return {
      uniqueId: Math.random().toString(36).substr(2),
      currDay: -1, // 在星期几按下鼠标
      weekdayNum: WEEKDAY_NUM,
      dayCellNum: DAY_CELL_NUM,
      timeCellSize: TIME_CELL_SIZE,
      dayStatus: new Array(WEEKDAY_NUM).fill(true),
      cellStatus: initDefaultTimeCells(),
      weekdaySame: false,
      weekdays: ['一', '二', '三', '四', '五', '六', '日'],
      // 以下为鼠标操作数据
      cellStart: -1, // 鼠标按下的单元索引
      cellEnd: -1,
      cellBackup: null,
      currentChannel: 1
    }
  },
  props: {
    modelValue: {
      type: String
    }
  },
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  // emits: [
  //   'input'
  // ],
  computed: {
  },
  methods: {
    formatTimeValue (value) {
      if (value < 10) {
        return `0${value}`
      } else {
        return `${value}`
      }
    },
    getDayTimeSegs (currDay) {
      /**
       * 返回选择的分段。每一段是（起始分钟，结束分钟）
       */
      const segs = []
      let i = 0
      while (i < this.dayCellNum) {
        // 跳过未设置分片
        while (i < this.dayCellNum && !this.cellStatus[currDay * this.dayCellNum + i]) {
          i += 1
        }
        if (i < this.dayCellNum) {
          const start = i
          // 跳过已设置分片
          while (i < this.dayCellNum && this.cellStatus[currDay * this.dayCellNum + i]) {
            i += 1
          }
          const end = i
          segs.push([start * this.timeCellSize, end * this.timeCellSize])
        }
      }

      return segs
    },
    segsToCellStatus (modelValue) {
      /**
       * 将时间段转换为时间单元
       */
      // 先将当天的所有单元清0
      const cellStatus = new Array(WEEK_CELL_NUMM).fill(0)
      modelValue.forEach((v, currDay) => {
        // 再将已设置的时间段的单元设置为1
        v.segs.forEach(v => {
          const cellStart = Math.floor(v[0] / TIME_CELL_SIZE)
          const cellEnd = Math.ceil(v[1] / TIME_CELL_SIZE)
          for (let i = cellStart; i < cellEnd; i++) {
            cellStatus[currDay * this.dayCellNum + i] = 1
          }
        })
      })
      this.cellStatus = cellStatus
    },
    getDayTimeDesc (currDay) {
      let desc = ''

      const segs = this.getDayTimeSegs(currDay)

      desc = segs.map(v => `${this.formatTimeValue(Math.floor(v[0] / 60))}:${this.formatTimeValue(v[0] % 60)}-${this.formatTimeValue(Math.floor(v[1] / 60))}:${this.formatTimeValue(v[1] % 60)}`).join(';')

      return desc
    },
    getDateTimeSettings () {
      /***
       * 获取每天的设置，作为结果返回。
       * 返回结果为数组，每个元素是一天的数据
       */
      const results = []
      for (let i = 0; i < this.weekdayNum; i++) {
        results.push({
          enabled: this.dayStatus[i],
          segs: this.getDayTimeSegs(i)
        })
      }
      return results
    },
    setDateTimeSettings (modelValue) {
      /***
       * 从参数设置每天数据，与getDateTimeSettings互为逆运算
       */
      if (!modelValue || modelValue.length !== this.weekdayNum) {
        // 如果未初始化，就用默认值
        return
      }
      modelValue.forEach((v, i) => {
        // 仅当数值变化了再赋值
        if (this.dayStatus[i] ^ v.enabled) {
          this.dayStatus[i] = v.enabled
        }
      })
      this.segsToCellStatus(modelValue)
    },
    makeWeekdaySame (currDay) {
      for (let i = 0; i < this.weekdayNum; i++) {
        if (i === currDay) {
          continue
        }
        for (let j = 0; j < this.dayCellNum; j++) {
          this.cellStatus[i * this.dayCellNum + j] = this.cellStatus[currDay * this.dayCellNum + j]
        }
      }
    },
    barOffset2CellIndex (offsetX) {
      return parseInt(offsetX / TIME_CELL_WIDTH)
    },
    onTimeBarDown (event, i) {
      // console.log('onTimeBarDown', event, i, this.cellStatus)
      if (event.buttons !== 1) {
        return
      }
      if (!this.dayStatus[i]) {
        return
      }
      this.currDay = i

      const j = this.barOffset2CellIndex(event.offsetX)
      this.cellStart = j
      this.cellEnd = j
      this.cellBackup = this.cellStatus.slice(i * this.dayCellNum, (i + 1) * this.dayCellNum)

      this.cellStatus[i * this.dayCellNum + j] ^= 1
      this.cellStatus = [...this.cellStatus]

      if (this.weekdaySame) {
        this.makeWeekdaySame(this.currDay)
      }
    },
    onTimeBarMove (event, i) {
      // console.log('onTimeBarOver1', event, i)
      if (event.buttons !== 1) {
        return
      }
      if (this.currDay < 0 || i !== this.currDay) {
        return
      }

      const j = this.barOffset2CellIndex(event.offsetX)
      if (j === this.cellEnd) {
        return
      }

      this.cellEnd = j

      const status = this.cellStatus[i * this.dayCellNum + this.cellStart]

      this.cellStatus.splice(i * this.dayCellNum, this.dayCellNum, ...this.cellBackup)

      // console.log('onTimeBarOver2', this.cellStart, this.cellEnd)

      for (let k = Math.min(this.cellStart, this.cellEnd); k <= Math.max(this.cellStart, this.cellEnd); k++) {
        this.cellStatus[i * this.dayCellNum + k] = status
      }
      this.cellStatus = [...this.cellStatus]

      if (this.weekdaySame) {
        this.makeWeekdaySame(this.currDay)
      }
    },
    onTimeBarOut (event, i) {
      if (event.buttons !== 1) {
        return
      }
      if (this.currDay < 0 || i !== this.currDay) {
      }
      // console.log('onTimeBarOut', event, i)
    },
    onTimeBarUp (event, i) {
      // console.log('onTimeBarUp', event, i)
      if (event.buttons !== 1) {
        return
      }
      this.currDay = -1
    }
  },
  watch: {
    weekdaySame () {
      if (this.weekdaySame) {
        this.makeWeekdaySame(0)
      }
      // console.log('weekdaySame changed')
      this.$emit('input', JSON.stringify(this.getDateTimeSettings()))
    },
    dayStatus: {
      handler () {
        // console.log('dayStatus changed')
        this.$emit('input', JSON.stringify(this.getDateTimeSettings()))
      },
      deep: true
    },
    cellStatus () {
      this.$emit('input', JSON.stringify(this.getDateTimeSettings()))
    },
    modelValue (value) {
      if (value) {
        this.setDateTimeSettings(JSON.parse(value))
      } else {
        this.dayStatus = new Array(WEEKDAY_NUM).fill(true)
        this.cellStatus = initDefaultTimeCells()
      }
    }
  },
  mounted () {
    $(function () {
      $('[data-toggle="popover"]').popover()
    })
  }
}
</script>

<style lang="less" scoped>
  .time-tick {
    width: 481px;
    height: 6px;
    background-image:
      repeating-linear-gradient(to right, #000000 0, #000000 1px, transparent 0, transparent 20px),
      repeating-linear-gradient(to right, #000000 0, #000000 1px, transparent 0, transparent 10px);
    background-size: 100% 6px, 100% 4px;
    background-repeat: no-repeat;
    background-position: 0 100%, 0 100%;
  }
  .time-bar {
    overflow: hidden;
    white-space: nowrap;
    width: 481px;
    height: 20px;
    border: 1px solid #000000;
  }
  .time-label {
    font-size: 12px;
    width: 20px;
  }
  .time-cell {
    display: inline-block;
    height: 20px;
    width: 10px;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
    border-right: 0px dashed lightgray;
  }
  .cell-selected.day-disabled {
    background-color: gray;
  }
  .cell-selected {
    background-color: #215299;
  }

  /* Small version */
  .time-tick-sm {
    width: 100%;
    height: 6px;
    background-image:
      repeating-linear-gradient(to right, #000000 0, #000000 1px, transparent 0, transparent 16px),
      repeating-linear-gradient(to right, #000000 0, #000000 1px, transparent 0, transparent 8px);
    background-size: 100% 6px, 100% 4px;
    background-repeat: no-repeat;
    background-position: 0 100%, 0 100%;
  }
  .time-bar-container {
    position: relative;
  }
  .time-bar-sm {
    position: absolute;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    height: 20px;
    border: 1px solid #000000;
  }
  .time-bar-sm-overlay {
    position: absolute;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    height: 20px;
    border: 1px solid #000000;
  }
  .time-label-sm {
    font-size: 10px;
    width: calc(100%/24);
    line-height: 16px;
  }
  .time-cell-sm {
    display: inline-block;
    height: 20px;
    width: 8px;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
    border-right: 0px dashed lightgray;
    margin-bottom: 6px;
  }

  .d-flex {
    display: flex;
  }

  .w-100 {
    width: 100%;
  }
  .h-100 {
    width: 100%;
  }
  .mx-0 {
    margin: 0;
  }
  .row {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .ml-2 {
    margin-left: 4px;
  }
  .mr-2 {
    margin-right: 4px;
  }
  .pl-2 {
    padding-left: 4px;
  }

  .mr-8 {
    margin-right: 16px;
  }

  .operate-c {
    display: flex;
    justify-content: space-between;
  }
</style>

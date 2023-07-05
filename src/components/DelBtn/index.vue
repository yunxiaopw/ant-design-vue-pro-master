<template>
  <div class="del-btn">
    <div :class="['content', type]">
      <img v-if="type === 'del'" :src="deleteIcon" alt="">
      <img v-if="type === 'edit'" :src="editIcon" alt="">
      <img v-if="type === 'add'" :src="addIcon" alt="">
    </div>
  </div>
</template>

<script>
import deleteIcon from '@/assets/icons/delete.svg'
import editIcon from '@/assets/icons/edit.svg'
import addIcon from '@/assets/icons/add.svg'
export default {
  name: 'DeleteBtn',
  props: {
    type: {
      type: String,
      default: 'del'
    }
  },
  data () {
    return {
      deleteIcon,
      editIcon,
      addIcon
    }
  },
  methods: {

  }
}
</script>
<style lang='less' scoped>
.del-btn {
  width: 30px;
  height: 30px;
  cursor: pointer;
  .content {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    img {
      width: 16px;
      height: 16px;
    }
  }
  .del {
    background-color: #ba353e;
  }

  .edit {
    background-color: #215299;
  }

  .add {
    background-color: #98c454;
  }
}
</style>

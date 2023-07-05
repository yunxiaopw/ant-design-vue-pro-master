<template>
  <div :class="wrpCls">
    <img :src="iconMax" alt="">
    <img class="voice" v-if="isOpen" :src="voiceOpen" alt="">
    <img class="voice" v-else :src="voiceClose" alt="">
    <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" />
    <!-- <select-lang :class="prefixCls" /> -->

  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
import iconMax from '@/assets/icons/icon-max.svg'
import voiceClose from '@/assets/icons/voice-close.svg'
import voiceOpen from '@/assets/icons/voice-open.svg'
// import SelectLang from '@/components/SelectLang'
export default {
  name: 'RightContent',
  components: {
    AvatarDropdown
    // SelectLang
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showMenu: true,
      currentUser: {},
      iconMax,
      voiceClose,
      voiceOpen,
      isOpen: false
    }
  },
  computed: {
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.currentUser = {
        name: 'Serati Ma'
      }
    }, 1500)
  }
}
</script>

<style lang="less" scoped>
img {
  width: 20px;
  cursor: pointer;
}

.voice {
  margin-left: 20px;
  margin-right: 20px;
}
</style>

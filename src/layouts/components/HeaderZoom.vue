<script>
import { ref, onBeforeMount, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue'

const requestFullscreen = (dom) => {
  if (dom.requestFullscreen) {
    dom.requestFullscreen()
  } else if (dom.mozRequestFullScreen) {
    dom.mozRequestFullScreen()
  } else if (dom.webkitRequestFullscreen) {
    dom.webkitRequestFullscreen()
  } else if (dom.msRequestFullscreen) {
    dom.msRequestFullscreen()
  }
}

const exitFullscreen = () => {
  if (document.exitFullScreen) {
    document.exitFullScreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

const isFullScreen = () => {
  return !!(
    document.fullscreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen ||
    document.webkitFullScreen ||
    document.msFullScreen
  )
}

// const isFullscreenEnabled = () => {
//   return (
//     document.fullscreenEnabled ||
//     document.mozFullScreenEnabled ||
//     document.webkitFullscreenEnabled ||
//     document.msFullscreenEnabled
//   );
// };

// const getFullscreendomment = () => {
//   return (
//     document.fullscreendomment ||
//     document.mozFullScreendomment ||
//     document.msFullScreendomment ||
//     document.webkitFullscreendomment ||
//     null
//   );
// };

const addFullScreenListener = (fullScreenHandler) => {
  if ('onfullscreenchange' in document) {
    document.addEventListener('fullscreenchange', fullScreenHandler)
  }
  if ('onmozfullscreenchange' in document) {
    document.addEventListener('mozfullscreenchange', fullScreenHandler)
  }
  if ('onwebkitfullscreenchange' in document) {
    document.addEventListener('webkitfullscreenchange', fullScreenHandler)
  }
  if ('onmsfullscreenchange' in document) {
    document.onmsfullscreenchange = fullScreenHandler
  }
}

const removeFullScreenListener = (fullScreenHandler) => {
  if ('onfullscreenchange' in document) {
    document.removeEventListener('fullscreenchange', fullScreenHandler)
  }
  if ('onmozfullscreenchange' in document) {
    document.removeEventListener('mozfullscreenchange', fullScreenHandler)
  }
  if ('onwebkitfullscreenchange' in document) {
    document.removeEventListener('webkitfullscreenchange', fullScreenHandler)
  }
  if ('onmsfullscreenchange' in document) {
    document.removeEventListener('msfullscreenchange', fullScreenHandler)
  }
}

export default {
  components: {
    FullscreenOutlined,
    FullscreenExitOutlined
  },
  props: {
    dom: {
      type: HTMLElement,
      default: () => document.body
    }
  },
  setup(props) {
    const isFullScreenState = ref(isFullScreen())
    const zoom = () => {
      isFullScreenState.value = !isFullScreenState.value
      if (isFullScreenState.value) requestFullscreen(props.dom)
      else exitFullscreen()
    }
    const fullScreenHandler = () => {
      isFullScreenState.value = isFullScreen()
    }

    onBeforeMount(() => {
      addFullScreenListener(fullScreenHandler)
    })
    onBeforeUnmount(() => {
      removeFullScreenListener(fullScreenHandler)
    })
    return {
      isFullScreenState,
      fullScreenHandler,
      zoom,
      t: useI18n()['t']
    }
  }
}
</script>
<template>
  <div @click="zoom">
    <template v-if="isFullScreenState">
      <FullscreenExitOutlined />
    </template>
    <template v-else>
      <a-tooltip :mouseEnterDelay="1.2" :title="t('tooltip.zoom')">
        <FullscreenOutlined />
      </a-tooltip>
    </template>
  </div>
</template>

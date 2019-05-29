<template>
  <div class="editor">
    <div ref="toolbar" class="toolbar"></div>
    <div ref="editor" class="text" :style="{'height': editorHeight + 'px'}"></div>
  </div>
</template>

<script>
import E from 'wangeditor'
import {
  ARTICLE_RICHEDITOR_CONFIG,
  WORDS_MOOD_RICHEDITOR_CONFIG,
  EMOTIONS_LIST
} from '@/config'

export default {
  data () {
    return {
      editor: null
    }
  },
  props: {
    editorHeight: {
      type: Number,
      default: 450
    },
    editorConfig: {
      type: Number,
      default: 1
    },
    editorContent: {
      type: String,
      default: ''
    },
    clear: {
      type: Boolean,
      default: false
    },
    onContent: {
      type: Function,
      default: null
    }
  },
  watch: {
    clear (val) {
      if (val) {
        this.clearContent()
      }
    },
    editorContent (val) {
      if (this.editor) {
        this.editor.txt.html(val)
      }
    }
  },
  methods: {
    setEditor () {
      this.editor = new E(this.$refs.toolbar, this.$refs.editor)

      // 自定义菜单配置
      this.editor.customConfig.menus = this.editorConfig === 1 ? ARTICLE_RICHEDITOR_CONFIG : WORDS_MOOD_RICHEDITOR_CONFIG
      // 配置表情
      this.editor.customConfig.emotions = [
        {
          title: '默认',
          type: 'image',
          content: EMOTIONS_LIST
        },
        {
          title: 'emoji',
          type: 'emoji',
          content: ['😀', '😃', '😄', '😁', '😆']
        }
      ]
      // 配置服务器端地址
      this.editor.customConfig.uploadImgServer = '/api/images/upload'
      // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024
      // 限制一次最多上传 5 张图片
      this.editor.customConfig.uploadImgMaxLength = 5
      // 配置编辑区域的 z-index
      this.editor.customConfig.zIndex = 1
      /* this.editor.customConfig.onchange = (html) => {
        this.onContent(html)
      } */
      // 进入编辑器
      this.editor.customConfig.onfocus = () => {
        // console.log('进入编辑器')
      }
      this.editor.customConfig.onblur = (html) => {
        // console.log('离开编辑器')
        this.filterContent(html)
      }
      this.editor.create()
      this.editor.txt.html(this.editorContent)
      this.filterContent(this.editorContent)
    },
    filterContent (content) {
      this.onContent(content)
    },
    clearContent () {
      this.editor.txt.clear()
      this.$emit('letClearfalse', false)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setEditor()
    })
  }
}
</script>

<style scoped>
.editor {
  margin: 0 auto;
}
.toolbar {
  border: solid 1px #ccc;
}
.text {
  border: solid 1px #ccc;
}
</style>

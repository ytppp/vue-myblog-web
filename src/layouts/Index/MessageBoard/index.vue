<template>
  <section class="container">
    <a-back-top />
    <div class="content-center">
      <a-card :hoverable="true">
        <a-form :form="form" class="form">
          <a-form-item
            label="留言"
            :label-col="{ span: 1 }"
            :wrapper-col="{ span: 12 }"
          >
            <rich-editor
              :clear="isClearEditor"
              @letClearfalse="handleLetClearfalse"
              :onContent="getEditorContent"
              :editorContent="wordsObj.content"
              :editor-height="editorHeight"
              :editor-config="2"/>
          </a-form-item>
          <a-form-item
            label="位置"
            :label-col="{ span: 1 }"
            :wrapper-col="{ span: 12 }"
            :help="wordsObj.positionInfo"
          >
            <a-button @click="openModal">获取位置</a-button>
          </a-form-item>
          <a-form-item
            :wrapper-col="{ span: 8, offset: 1 }"
          >
            <a-button @click="submitWords" class="btns" type="primary">发表心情</a-button>
          </a-form-item>
        </a-form>
      </a-card>
      <a-card title="留言板" :hoverable="true" style="margin-top: 20px">
        <a-list
          class="comment-list"
          itemLayout="horizontal"
          :dataSource="wordsList"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-skeleton :loading="loading" active avatar>
              <a-comment
                :author="item.author"
                :avatar="item.avatar"
              >
                <div slot="content" v-html="item.content"></div>
                <span slot="datetime">{{item.datetime}}</span>
              </a-comment>
            </a-skeleton>
          </a-list-item>
        </a-list>
      </a-card>
    </div>
    <a-modal
      title="位置选择"
      okText="确认"
      cancelText="取消"
      v-model="selectPositionVisible"
      @ok="handlePositionSelected"
      @cancel="cancelPositionSelected"
      width="60%"
      style="top: 20px;"
    >
      <div class="map-area" id="wordsmap"></div>
      <div class="position-wrapper">
        <a-input placeholder="请选择位置" v-model="wordsObj.positionInfo" />
      </div>
    </a-modal>
  </section>
</template>

<script>
import RichEditor from '@/components/Common/Editor'
import { setTimeout } from 'timers'

export default {
  components: {
    RichEditor
  },
  data () {
    return {
      isClearEditor: false,
      editorHeight: 100,
      selectPositionVisible: false,
      map: null,
      wordsList: [],
      wordsObj: {
        content: '',
        positionInfo: ''
      },
      loading: false
    }
  },
  methods: {
    // 清除编辑器内容
    clearEditorContent () {
      this.isClearEditor = true
    },
    // 接受编辑器子组件传的参数
    handleLetClearfalse (data) {
      this.isClearEditor = data
    },
    // 获取编辑器内容
    getEditorContent (content) {
      this.wordsObj.content = content
    },
    initMap () {
      /* eslint-disable */
      // 创建Map实例
      if (this.map === null) {
        this.map = new window.BMap.Map('wordsmap')
      }
      // 初始化地图,设置中心点坐标和地图级别
      this.map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 15)

      let self = this
      let geolocation = new window.BMap.Geolocation()
      // 获取当前位置
      geolocation.getCurrentPosition(function (r) {
        if(this.getStatus() === BMAP_STATUS_SUCCESS){
            let mk = new window.BMap.Marker(r.point) // 创建标注
            mk.setAnimation(BMAP_ANIMATION_BOUNCE) // 创建标注跳动的动画
            let circle = new BMap.Circle(r.point, 500, { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5 }) // 创建圆

            self.map.addOverlay(mk) // 将标注添加到地图中
            self.map.addOverlay(circle) // 将圆注添加到地图中
            self.map.panTo(r.point) // 将地图中心移动到可视区中点
            let point = new BMap.Point(r.point.lng,r.point.lat) // 用所定位的经纬度查找所在地省市街道等信息

            let gc = new BMap.Geocoder()
            gc.getLocation(point, function (rs) {
              // console.log(rs.address) // 地址信息
              if (self.wordsObj.positionInfo === '') {
                self.wordsObj.positionInfo = rs.address
              }
            })
        } else {
            console.log('failed' + this.getStatus())
        }
      }, { enableHighAccuracy: true })
      /* this.map.addEventListener("dragend", function(){
        self.map.clearOverlays()  
        let center = self.map.getCenter()
        let mk = new window.BMap.Marker(center) // 创建标注
        self.map.addOverlay(mk)
        console.log("地图中心点变更为：" + center.lng + ", " + center.lat)  
      }) */
      /* eslint-enable */
    },
    openModal () {
      this.selectPositionVisible = true
      this.$nextTick(() => {
        this.initMap()
      })
    },
    // 位置选择确认后关闭
    handlePositionSelected () {
      this.selectPositionVisible = false
      this.map = null
    },
    // 取消位置选择
    cancelPositionSelected () {
      this.selectPositionVisible = false
      this.wordsObj.positionInfo = ''
      this.map = null
    },
    submitWords () {
      if (this.wordsObj.content === '') {
        this.$message.error('心情内容不能为空')
        return
      }
      this.$axios.post('/api/mood/addMood', {
        type: 2,
        content: this.wordsObj.content,
        position: this.wordsObj.positionInfo
      }).then((res) => {
        const result = res.data
        if (result.code === 1) {
          this.wordsList.unshift({
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            author: result.data.user_id,
            content: result.data.content,
            datetime: result.data.create_time
          })
          this.$message.success('提交留言成功', 2)
        } else {
          this.$message.error('提交留言失败', 2)
        }
      })
    },
    getMoodList () {
      let params = {
        type: 2
      }
      this.loading = true
      this.$axios.get('/api/mood/getMoodList', {
        params
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.wordsList = []
          setTimeout(() => {
            this.loading = false
          }, 1000)
          result.data.words_list.forEach(item => {
            this.wordsList.push({
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              author: item.user_id,
              content: item.content,
              datetime: item.create_time
            })
          })
          /* {
            actions: ['Reply to'],
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            datetime: moment().subtract(1, 'days')
          } */
        }
      })
    }
  },
  mounted () {
    this.getMoodList()
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  .content-center {
    max-width: 960px;
    margin: 0 auto 20px;
  }
}
</style>

<style>
.map-area {
  width: 100%;
  height: 500px;
}
</style>

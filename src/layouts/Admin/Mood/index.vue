<template>
  <div class="container">
    <a-card class="card" title="心情管理" :bordered="false">
      <a-form :form="form" class="form">
        <a-row class="form-row">
          <a-form-item
            label="心情"
            :label-col="{ span: 1 }"
            :wrapper-col="{ span: 8 }"
          >
            <rich-editor
              :clear="isClearEditor"
              @letClearfalse="handleLetClearfalse"
              :onContent="getEditorContent"
              :editorContent="moodObj.content"
              :editor-height="editorHeight"
              :editor-config="2"/>
          </a-form-item>
          <a-form-item
            label="是否私密"
            :label-col="{ span: 1 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-switch v-model="moodObj.status" />
            <a-button @click="openModal" style="margin-left: 32px">获取位置</a-button>
          </a-form-item>
          <a-form-item
            label="位置"
            :label-col="{ span: 1 }"
            :wrapper-col="{ span: 8 }"
            v-if="moodObj.positionInfo"
          >
            <a-input placeholder="请选择位置" v-model="moodObj.positionInfo" />
          </a-form-item>
          <a-form-item
            :wrapper-col="{ span: 8, offset: 1 }"
          >
            <a-button @click="submitMood" class="btns" type="primary">发表心情</a-button>
            <a-button class="btns" type="danger">取消</a-button>
          </a-form-item>
        </a-row>
      </a-form>
      <div class="top-wrapper">
        <div class="btns-wrapper">
          <a-radio-group v-model="searchParams.status" buttonStyle="solid" @change="handleStatusChange">
            <a-radio-button :value="2">全部</a-radio-button>
            <a-radio-button :value="1">公开</a-radio-button>
            <a-radio-button :value="0">私密</a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <a-table
        :columns="MOOD_COLUMNS_CONFIG"
        :dataSource="moodsList"
        :loading="tableLoading"
      >
        <template slot="content" slot-scope="content">
          <div v-html="content"></div>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            title="确定删除吗?"
            cancelText="取消"
            okText="确认"
            @confirm="() => handleMoodDelete(record.id)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
          <a-divider type="vertical" />
          <a-popconfirm
            title="确定切换留言状态吗?"
            cancelText="取消"
            okText="确认"
            @confirm="() => changeMoodsStatus('status', record.id, record.status)">
            <a href="javascript:;">
              {{ record.status === 1 ? '禁用' : '启用' }}
            </a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
    <a-modal
      title="Basic Modal"
      okText="确认"
      cancelText="取消"
      v-model="selectPositionVisible"
      @ok="handlePositionSelected"
      @cancel="cancelPositionSelected"
      width="60%"
      style="top: 20px;"
    >
      <div class="map-area" id="allmap"></div>
      <div class="position-wrapper">
        <a-input placeholder="请选择位置" v-model="moodObj.positionInfo" />
      </div>
    </a-modal>
  </div>
</template>

<script>
import RichEditor from '@/components/Common/Editor'
import {
  MOOD_COLUMNS_CONFIG
} from '@/config'

// 心情信息模拟数据
const mockMoosInfo = [
  {
    id: 1,
    content: '你好呀呀',
    position: '四川省宜宾市翠屏区',
    status: 1,
    create_time: '2015-08-27'
  }
]

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
      MOOD_COLUMNS_CONFIG,
      moodsList: mockMoosInfo,
      tableLoading: false,
      moodObj: {
        content: '',
        positionInfo: '',
        status: true
      },
      searchParams: {
        status: 2
      }
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
      this.moodObj.content = content
      // console.log(this.moodObj.content)
    },
    initMap () {
      /* eslint-disable */
      // 创建Map实例
      if (this.map === null) {
        this.map = new window.BMap.Map('allmap')
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
              if (self.moodObj.positionInfo === '') {
                self.moodObj.positionInfo = rs.address
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
      this.moodObj.positionInfo = ''
      this.map = null
    },
    handleStatusChange (e) {
      this.searchParams.status = parseInt(e.target.value)
      this.getMoodList()
    },
    getMoodList () {
      let params = {
        status: this.searchParams.status === 2 ? '' : this.searchParams.status
      }
      this.tableLoading = true
      this.$axios.get('/api/mood/getMoodList', {
        params
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.moodsList = result.data.mood_list
          this.tableLoading = false
        }
      })
    },
    changeMoodsStatus (text, id, status) {
      const moodsList = [...this.moodsList]
      moodsList.forEach(item => {
        if (item.id === id) {
          switch (text) {
            case 'status':
              item.status = status === 1 ? 0 : 1
              this.changeMoodStatus(id, 'status', item.status)
              break
          }
        }
      })
      this.moodsList = moodsList
    },
    changeMoodStatus (id, key, value) {
      this.$axios.get('/api/mood/changeMoodStatus', {
        params: {
          id,
          key,
          value
        }
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.$message.success('更改心情状态成功')
        } else {
          this.$message.error('更改心情状态失败')
        }
      })
    },
    handleMoodDelete (key) {
      const moodsList = [...this.moodsList]
      this.$axios.get('/api/mood/deleteMood', {
        params: {
          id: key
        }
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.moodsList = moodsList.filter(item => item.id !== key)
          this.$message.success('已删除心情')
        } else {
          this.$message.error('删除心情失败')
        }
      })
    },
    submitMood () {
      if (this.moodObj.content === '') {
        this.$message.error('心情内容不能为空')
        return
      }
      this.$axios.post('/api/mood/addMood', {
        content: this.moodObj.content,
        position: this.moodObj.positionInfo,
        status: this.moodObj.content === true ? 1 : 0
      }).then((res) => {
        const result = res.data
        if (result.code === 1) {
          this.moodsList.unshift({
            id: result.data.id,
            content: result.data.content,
            position: result.data.position,
            status: result.data.status,
            create_time: result.data.create_time
          })
          this.$message.success(result.message)
        } else {
          this.$message.error(result.message)
        }
      })
    }
  },
  beforeMount () {
    this.getMoodList()
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  }
}
</script>

<style lang="less" scoped>
.container {
  background-color: #ffffff;
  height: 100%;
  .form {
    .btns {
      margin-right: 8px;
    }
  }
  .top-wrapper {
    height: 60px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    .btns-wrapper {
      display: inline-block;
    }
  }
  .position-wrapper {
    margin: 20px 0;
    width: 60%;
  }
}
</style>

<style>
.map-area {
  width: 100%;
  height: 500px;
}
</style>
